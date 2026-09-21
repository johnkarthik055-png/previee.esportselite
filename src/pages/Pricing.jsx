/**
 * Pricing.
 *
 * The visible page is now the real Individual Elite (₹149/mo) / Squad Elite
 * (₹129→₹89/player) marketing content — same numbers as the homepage pricing
 * section. Buttons link out to the live app rather than triggering checkout,
 * because the actual Razorpay backend still only has the old ₹99 "Pro" plan
 * wired up; showing ₹149 here while silently charging ₹99 server-side would
 * be a real mismatch. See LEGACY_CHECKOUT_ENABLED below.
 *
 * LEGACY CHECKOUT (Pro, ₹99/month) — kept, not deleted, just not rendered:
 *   All the original login-gated Razorpay flow (ActionArea/AccountLine,
 *   createRazorpayOrder, the webhook-confirmed subscription watcher) is
 *   still here, intact and working, below the `LEGACY_CHECKOUT_ENABLED`
 *   flag. Flip it to `true` to bring the old single-plan checkout section
 *   back once Razorpay has real ₹149 / squad-tier plans configured, or wire
 *   the new buttons below directly to it at that point.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Check, Loader2, ShieldCheck, LogOut, AlertTriangle,
  User, Users, Zap, BarChart2, Activity, Trophy, Plus, ArrowRight,
} from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'
import StatsBar from '../components/StatsBar'
import VerticalLabel from '../components/VerticalLabel'
import ReceiptPrinter from '../components/ReceiptPrinter'
import {
  createRazorpayOrder,
  openRazorpayCheckout,
  watchSubscription,
  isSubscriptionActive,
} from '../lib/subscription'

const LEGACY_CHECKOUT_ENABLED = false

/* Photo placeholders — same pattern as the homepage hero. */
const pricingHeroModules = import.meta.glob('../assets/pricing-hero.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const pricingCtaModules  = import.meta.glob('../assets/pricing-cta.{jpg,jpeg,png,webp}',  { eager: true, import: 'default' })
const individualPhotoModules = import.meta.glob('../assets/pricing-individual-photo.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const pricingHeroBg = Object.values(pricingHeroModules)[0] || null
const pricingCtaBg  = Object.values(pricingCtaModules)[0]  || null
const individualPhoto = Object.values(individualPhotoModules)[0] || null

const GRADIENT_FALLBACK = 'linear-gradient(160deg, #050816 0%, #0A1428 45%, #050816 100%)'
function photoBg(img) {
  return img
    ? `linear-gradient(180deg, rgba(5,8,22,0.55) 0%, rgba(5,8,22,0.75) 55%, rgba(5,8,22,0.96) 100%), url(${img})`
    : GRADIENT_FALLBACK
}

const HERO_PILLS = [
  { icon: Zap,       label: 'Train' },
  { icon: BarChart2, label: 'Analyze' },
  { icon: Activity,  label: 'Improve' },
  { icon: Trophy,    label: 'Compete' },
]

const INDIVIDUAL_FEATURES = [
  'Personal performance tracking',
  'Advanced analytics & insights',
  'Structured training drills',
  'Progress & goal tracking',
  'Match / session tracking',
  'Elite player dashboard',
]

const SQUAD_FEATURES = [
  'All Individual features',
  'Squad progress tracking',
  'Team performance analytics',
  'Coach tools & insights',
  'Shared goals & milestones',
  'Built for serious teams',
]

const SQUAD_TIERS = [
  { members: 2, price: 129 },
  { members: 3, price: 119 },
  { members: 4, price: 109 },
  { members: 5, price: 99 },
  { members: 6, price: 89, isBestValue: true },
]

const COMPARISON_ROWS = [
  { label: 'Full training library',                         individual: true,  squad: true },
  { label: 'Match & session tracking',                       individual: true,  squad: true },
  { label: 'Advanced performance analytics',                 individual: true,  squad: true },
  { label: 'AI Coach (analysis & recommendations)',          individual: true,  squad: true },
  { label: 'Goal setting & progress tracking',                individual: true,  squad: true },
  { label: 'Squad/team progress tracking',                   individual: false, squad: true },
  { label: 'Coach tools (for owners/coaches)',                individual: false, squad: true },
  { label: 'Shared squad dashboard',                         individual: false, squad: true },
]

const FAQS = [
  { q: 'Is GST included in the price?', a: 'Yes, all prices are GST-inclusive. No hidden charges.' },
  { q: 'Can I switch from Individual to Squad later?', a: 'Yes, you can upgrade anytime. Your progress and data will be safe.' },
  { q: 'Can a coach be part of the squad?', a: 'Yes, 1 Owner/Coach + up to 5 players (total 6 members).' },
  { q: 'Does each squad member pay separately?', a: 'Yes, each member pays their own share.' },
  { q: 'What payment methods do you accept?', a: 'We currently accept Razorpay (UPI, Cards, Net Banking, Wallets, etc.).' },
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription anytime. No lock-in.' },
]

function PriceFeature({ children, light }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: light ? '#334155' : '#CBD5E1', lineHeight: 1.5 }}>
      <Check size={16} style={{ color: '#3B82F6', flexShrink: 0, marginTop: 2 }} />
      {children}
    </li>
  )
}

/* phase: 'idle' | 'creating' | 'checkout' | 'confirming' | 'active' | 'error' — legacy checkout only */
export default function Pricing() {
  useEffect(() => { document.title = 'Pricing | Esports Elite' }, [])

  const [searchParams] = useSearchParams()
  const { user, loading: authLoading, logout } = useAuth()
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })
  const [cardsRef, cardsVisible] = useScrollAnimation()
  const [compareRef, compareVisible] = useScrollAnimation()
  const [faqRef, faqVisible] = useScrollAnimation()
  const [ctaRef, ctaVisible] = useScrollAnimation()

  const [openFaq, setOpenFaq] = useState(-1)
  const [selectedMembers, setSelectedMembers] = useState(6)
  const selectedTier = SQUAD_TIERS.find(t => t.members === selectedMembers)

  /* ── legacy checkout state (kept, gated — see file header) ── */
  const [loginOpen, setLoginOpen] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [error, setError] = useState('')
  const [subscription, setSubscription] = useState(null)
  const [subLoaded, setSubLoaded] = useState(false)
  const confirmTimer = useRef(null)

  useEffect(() => {
    if (!user?.uid) {
      setSubscription(null)
      setSubLoaded(true)
      return
    }
    setSubLoaded(false)
    const unsub = watchSubscription(user.uid, (sub) => {
      setSubscription(sub)
      setSubLoaded(true)
    })
    return unsub
  }, [user?.uid])

  const alreadyActive = useMemo(() => isSubscriptionActive(subscription), [subscription])

  useEffect(() => {
    if (phase === 'confirming' && alreadyActive) {
      if (confirmTimer.current) clearTimeout(confirmTimer.current)
      setPhase('active')
    }
  }, [phase, alreadyActive])

  useEffect(() => () => { if (confirmTimer.current) clearTimeout(confirmTimer.current) }, [])

  if (searchParams.get('payment') === 'success') {
    const rawAmount = parseInt(searchParams.get('amount') || '149', 10)
    const base = Math.round(rawAmount / 1.18)
    const tax = rawAmount - base
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(80px,10vw,120px) clamp(16px,5vw,48px)',
        background: 'linear-gradient(160deg, #050816 0%, #0A1428 45%, #050816 100%)',
      }}>
        <ReceiptPrinter
          orderId={searchParams.get('pid') || ''}
          subscriptionId={searchParams.get('sid') || ''}
          amount={base}
          tax={tax}
          total={rawAmount}
          paidWith="Razorpay"
          completedAt={searchParams.get('ts') || new Date().toISOString()}
          planName={searchParams.get('plan') || 'Individual Elite'}
        />
        <a
          href="/pricing"
          style={{
            marginTop: '32px', fontFamily: "'Inter', sans-serif",
            fontSize: '14px', color: '#64748B', textDecoration: 'none',
            borderBottom: '1px solid #334155', paddingBottom: '2px',
          }}
        >
          ← Back to pricing
        </a>
      </div>
    )
  }

  async function handleSubscribe() {
    setError('')
    setPhase('creating')
    try {
      const order = await createRazorpayOrder({
        email: user?.email || '',
        name: user?.displayName || '',
      })

      setPhase('checkout')
      try {
        await openRazorpayCheckout(order, {
          name: user?.displayName || '',
          email: user?.email || '',
        })
      } catch (checkoutErr) {
        setPhase('error')
        setError(checkoutErr?.message || 'Payment was not completed.')
        return
      }

      setPhase('confirming')
      if (confirmTimer.current) clearTimeout(confirmTimer.current)
      confirmTimer.current = setTimeout(() => {
        setPhase((p) => (p === 'confirming' ? 'confirmSlow' : p))
      }, 12000)
    } catch (err) {
      setPhase('error')
      const code = err?.code || ''
      if (code === 'functions/unauthenticated') {
        setError('Your session expired — log in again to subscribe.')
      } else if (code === 'functions/failed-precondition') {
        setError('Payments aren’t switched on yet. Please try again later.')
      } else if (code === 'functions/not-found') {
        setError('Checkout isn’t live yet — the payment function still needs to be deployed.')
      } else {
        setError(err?.message || 'Could not start checkout. Please try again.')
      }
    }
  }

  function retry() {
    setError('')
    setPhase('idle')
  }

  const busy = phase === 'creating' || phase === 'checkout'

  return (
    <>
      {/* ── 1. HERO (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(90px,11vw,150px) clamp(16px,5vw,48px) clamp(70px,8vw,90px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(pricingHeroBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div className="section-label"><span>PRICING</span></div>
          <h1 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,6vw,58px)', color: '#F8FAFC', lineHeight: 1.05, textTransform: 'uppercase', marginBottom: '20px' }}>
            One plan.<br /><span style={{ color: '#3B82F6' }}>Everything</span> in it.
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.8vw,18px)', color: '#94A3B8', lineHeight: 1.75, maxWidth: '560px', marginBottom: '32px' }}>
            Whether you grind solo or as a squad, Esports Elite gives you the tools, data, and guidance to improve,
            compete, and go further. No hidden fees. No limits on your grind.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,36px)' }}>
            {HERO_PILLS.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={16} style={{ color: '#3B82F6' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px', color: '#CBD5E1', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <VerticalLabel>Same Game · Different Mindset</VerticalLabel>
      </section>

      {/* ── 2. PRICING CARDS (light) ── */}
      <section style={{ background: '#F4F7FC', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div ref={cardsRef} className={`anim-section ${cardsVisible ? 'visible' : ''}`} style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <div>
              <div style={{ width: '40px', height: '2px', background: '#3B82F6', marginBottom: '16px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#2563EB', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px' }}>PLANS</p>
              <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', color: '#0B1220', lineHeight: 1.1, textTransform: 'uppercase' }}>
                Choose how <span style={{ color: '#2563EB' }}>you grind.</span>
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', textAlign: 'right', lineHeight: 1.6, maxWidth: '220px' }}>
              SAME PLATFORM.<br />DIFFERENT PATHS.<br />ONE GOAL.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {/* Individual Elite */}
            <div style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(160deg, #0D1526 0%, #0A0F1C 100%)',
              border: '1px solid #1E293B', borderRadius: '18px',
              boxShadow: '0 0 30px rgba(59,130,246,0.08)',
              padding: 'clamp(28px,4vw,36px)', flex: '1 1 380px', maxWidth: '460px',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Background photo — placeholder-ready, right ~58% of the card, bottom-aligned */}
              <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, width: '58%', zIndex: 0,
                backgroundImage: individualPhoto ? `url(${individualPhoto})` : 'linear-gradient(90deg, #0A0F1C 30%, #0D1526 100%)',
                backgroundSize: 'cover', backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat',
              }} />
              {/* Contrast overlay so text stays readable over the photo */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(90deg, #0A0F1C 0%, rgba(10,15,28,0.4) 50%, rgba(10,15,28,0.15) 100%)',
              }} />

              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '18px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                    background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6',
                  }}>
                    <User size={20} />
                  </div>
                  <p style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '150px' }}>
                    For players who refuse to stay average.
                  </p>
                </div>
                <h3 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '20px', color: '#F8FAFC', textTransform: 'uppercase' }}>Individual Elite</h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '20px' }}>
                  <span style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '40px', color: '#F8FAFC' }}>₹149</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#64748B' }}>/ month</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#64748B', marginTop: '4px' }}>GST included</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginTop: '16px' }}>
                  Everything you need as an individual player to train, track, analyze and improve.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', margin: '22px 0 28px' }}>
                  {INDIVIDUAL_FEATURES.map(f => <PriceFeature key={f}>{f}</PriceFeature>)}
                </ul>

                <a href="https://app.esportselite.in/#/checkout" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}>
                  GET INDIVIDUAL ELITE →
                </a>
              </div>
            </div>

            {/* Squad Elite */}
            <div style={{
              background: 'linear-gradient(160deg, #0D1526 0%, #0A0F1C 100%)',
              border: '1px solid #1E293B', borderRadius: '18px',
              boxShadow: '0 0 30px rgba(59,130,246,0.08)',
              padding: 'clamp(28px,4vw,36px)', flex: '1 1 380px', maxWidth: '460px',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '18px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6',
                }}>
                  <Users size={20} />
                </div>
                <p style={{ fontSize: '11px', color: '#64748B', textAlign: 'right', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '150px' }}>
                  For teams, squads and coaches.
                </p>
              </div>
              <h3 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '20px', color: '#F8FAFC', textTransform: 'uppercase' }}>Squad Elite</h3>
              <p style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '13px', color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: '14px' }}>
                The more you grind together, the more you save.
              </p>

              <div className="squad-tiles" style={{ display: 'flex', gap: '8px', margin: '22px 0', flexWrap: 'wrap' }}>
                {SQUAD_TIERS.map(t => {
                  const selected = selectedMembers === t.members
                  return (
                    <button
                      key={t.members}
                      type="button"
                      className="squad-tile-select"
                      onClick={() => setSelectedMembers(t.members)}
                      style={{
                        position: 'relative',
                        flex: '1 1 0', minWidth: '54px', textAlign: 'center',
                        padding: '12px 6px', borderRadius: '10px', cursor: 'pointer',
                        background: selected ? '#1E3A8A' : '#0A0F1C',
                        border: `${selected ? '2px' : '1px'} solid ${selected ? '#3B82F6' : '#1E293B'}`,
                        color: selected ? '#FFFFFF' : '#94A3B8',
                        transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
                      }}
                    >
                      {t.isBestValue && (
                        <span className="squad-badge" style={{
                          position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)',
                          background: '#3B82F6', color: '#fff', fontSize: '7px', fontWeight: 700,
                          letterSpacing: '0.06em', padding: '2px 6px', borderRadius: '100px', whiteSpace: 'nowrap',
                        }}>BEST VALUE</span>
                      )}
                      <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '17px', lineHeight: 1 }}>
                        {t.members}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '3px' }}>
                        members
                      </div>
                    </button>
                  )
                })}
              </div>
              <style>{`
                .squad-tile-select:hover { border-color: #3B82F6 !important; }
                @media (max-width: 420px) {
                  .squad-tiles { gap: 5px !important; }
                  .squad-tile-select { min-width: 42px !important; padding: 10px 3px !important; }
                  .squad-badge { font-size: 5.5px !important; letter-spacing: 0.02em !important; padding: 1px 4px !important; }
                }
              `}</style>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '48px', color: '#FFFFFF' }}>₹{selectedTier.price}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#94A3B8' }}>/ player / month</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
                  GST included · billed monthly for {selectedMembers} members
                </p>
              </div>

              <ul style={{
                listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))',
                gap: '10px 16px', margin: '22px 0 28px',
              }}>
                {SQUAD_FEATURES.map(f => <PriceFeature key={f}>{f}</PriceFeature>)}
              </ul>

              <a href="https://app.esportselite.in/#/squad-checkout" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', marginTop: 'auto', justifyContent: 'center', gap: '8px' }}>
                <Users size={16} /> BUILD YOUR SQUAD →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2b. STATS BAR (dark) ── */}
      <StatsBar />

      {/* ── 3. COMPARISON TABLE (dark) ── */}
      <section style={{ background: 'rgba(10,15,28,0.9)', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 65%)',
        }} />
        <div ref={compareRef} className={`anim-section ${compareVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <div style={{ width: '40px', height: '2px', background: '#3B82F6', marginBottom: '16px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#3B82F6', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px' }}>COMPARE</p>
              <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', color: '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase' }}>
                Same features.<br />Different paths.
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', textAlign: 'right', lineHeight: 1.6, maxWidth: '220px' }}>
              BUILT FOR PLAYERS.<br />DESIGNED FOR TEAMS.<br />TRUSTED BY BOTH.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '520px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E293B' }}>
                  <th style={{ textAlign: 'left', padding: '14px 10px', fontFamily: "'Oxanium', sans-serif", fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Features</th>
                  <th style={{ textAlign: 'center', padding: '14px 10px', fontFamily: "'Oxanium', sans-serif", fontSize: '13px', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Individual Elite</th>
                  <th style={{ textAlign: 'center', padding: '14px 10px', fontFamily: "'Oxanium', sans-serif", fontSize: '13px', color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Squad Elite</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #16202F' }}>
                    <td style={{ padding: '14px 10px', fontSize: '14px', color: '#CBD5E1' }}>{row.label}</td>
                    <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                      {row.individual ? <Check size={16} style={{ color: '#3B82F6' }} /> : <span style={{ color: '#334155' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                      {row.squad ? <Check size={16} style={{ color: '#3B82F6' }} /> : <span style={{ color: '#334155' }}>—</span>}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: '18px 10px', fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '14px', color: '#F8FAFC' }}>Price (per player/month)</td>
                  <td style={{ padding: '18px 10px', textAlign: 'center', fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '18px', color: '#F8FAFC' }}>₹149</td>
                  <td style={{ padding: '18px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '18px', color: '#F8FAFC' }}>₹89 – ₹129</div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>(based on squad size)</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4. FAQ (light) ── */}
      <section style={{ background: '#F4F7FC', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div ref={faqRef} className={`anim-section ${faqVisible ? 'visible' : ''}`} style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <div style={{ width: '40px', height: '2px', background: '#3B82F6', marginBottom: '16px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#2563EB', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px' }}>FAQ</p>
              <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', color: '#0B1220', lineHeight: 1.1, textTransform: 'uppercase' }}>
                Still have <span style={{ color: '#2563EB' }}>questions?</span>
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', textAlign: 'right', lineHeight: 1.6, maxWidth: '220px' }}>
              CLEAR ANSWERS.<br />NO GUESSING.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '16px' }}>
            {FAQS.map((faq, i) => {
              const open = openFaq === i
              return (
                <div key={faq.q} style={{ background: '#FFFFFF', border: '1px solid #DCE4F0', borderRadius: '12px', padding: '4px 20px' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', gap: '16px', textAlign: 'left',
                      minHeight: '44px',
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', color: '#0B1220', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <Plus size={16} style={{ color: '#2563EB', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }} />
                  </button>
                  <div className={`faq-answer ${open ? 'open' : ''}`}>
                    <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.65, paddingBottom: '18px' }}>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(90px,11vw,140px) clamp(16px,5vw,48px)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(pricingCtaBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={ctaRef} className={`anim-section ${ctaVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <div className="section-label center"><span>ESPORTS ELITE</span></div>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '14px' }}>
            Same game.<br /><span style={{ color: '#3B82F6' }}>A bigger tomorrow.</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '32px' }}>
            Join thousands of players who train with purpose.
          </p>
        </div>
        <VerticalLabel side="left">Grind · Learn · Improve · Repeat</VerticalLabel>
        <VerticalLabel side="right">Play · Improve · Belong</VerticalLabel>
      </section>

      {/* ── LEGACY: original ₹99/month Pro checkout — see file header ── */}
      {LEGACY_CHECKOUT_ENABLED && (
        <>
          <section style={{ background: 'rgba(5,8,22,0.75)', padding: 'clamp(48px,7vw,80px) clamp(16px,5vw,48px) 100px' }}>
            <div style={{ maxWidth: 460, margin: '0 auto' }}>
              <div style={{
                background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 18,
                padding: 'clamp(24px,4vw,34px)', boxShadow: '0 24px 70px rgba(0,0,0,0.4)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 20, color: '#F8FAFC' }}>Pro</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 34, color: '#F8FAFC' }}>₹99</span>
                  <span style={{ fontSize: 13, color: '#64748B' }}>/ month</span>
                </div>
                <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Billed monthly via Razorpay. Cancel anytime.</p>
                <ActionArea
                  authLoading={authLoading}
                  user={user}
                  subLoaded={subLoaded}
                  alreadyActive={alreadyActive}
                  phase={phase}
                  busy={busy}
                  error={error}
                  onLogin={() => setLoginOpen(true)}
                  onSubscribe={handleSubscribe}
                  onRetry={retry}
                  onLogout={logout}
                />
              </div>
              <p style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', fontSize: 12, color: '#64748B', marginTop: 18 }}>
                <ShieldCheck size={14} /> Payments processed securely by Razorpay. We never see your card details.
              </p>
            </div>
          </section>
          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => setLoginOpen(false)} />
        </>
      )}
    </>
  )
}

function ActionArea({
  authLoading, user, subLoaded, alreadyActive, phase, busy, error,
  onLogin, onSubscribe, onRetry, onLogout,
}) {
  if (authLoading || (user && !subLoaded)) {
    return (
      <div style={centerRow}>
        <Loader2 size={16} className="ee-spin" /> <span style={{ fontSize: 13, color: '#94A3B8' }}>Loading…</span>
      </div>
    )
  }

  if (alreadyActive && phase !== 'active') {
    return (
      <div>
        <div style={{ ...noticeBox, borderColor: 'rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', color: '#86EFAC' }}>
          <Check size={16} /> You’re on Pro — it’s active across the app.
        </div>
        <AccountLine user={user} onLogout={onLogout} />
      </div>
    )
  }

  if (phase === 'active') {
    return (
      <div style={{ ...noticeBox, borderColor: 'rgba(34,197,94,0.35)', background: 'rgba(34,197,94,0.1)', color: '#86EFAC' }}>
        <Check size={16} /> Payment successful — Pro is now active on your account.
      </div>
    )
  }
  if (phase === 'confirming' || phase === 'confirmSlow') {
    return (
      <div>
        <div style={{ ...noticeBox, borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', color: '#93C5FD' }}>
          <Loader2 size={16} className="ee-spin" />
          Payment received, confirming your subscription…
        </div>
        {phase === 'confirmSlow' && (
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 10 }}>
            This is taking longer than usual. Your payment is safe — Pro will
            activate automatically once Razorpay confirms it, even if you leave
            this page.
          </p>
        )}
      </div>
    )
  }
  if (phase === 'error') {
    return (
      <div>
        <div style={{ ...noticeBox, borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#FCA5A5' }}>
          <AlertTriangle size={16} /> {error || 'Something went wrong.'}
        </div>
        <button type="button" className="btn-primary" onClick={onRetry} style={{ width: '100%', marginTop: 12 }}>
          Try again
        </button>
        <AccountLine user={user} onLogout={onLogout} />
      </div>
    )
  }

  if (!user) {
    return (
      <button type="button" className="btn-primary" onClick={onLogin} style={{ width: '100%' }}>
        Log in to Subscribe
      </button>
    )
  }

  return (
    <div>
      <button type="button" className="btn-primary" onClick={onSubscribe} disabled={busy} style={{ width: '100%' }}>
        {busy ? <Loader2 size={16} className="ee-spin" /> : 'Subscribe — ₹99/month'}
      </button>
      <AccountLine user={user} onLogout={onLogout} />
    </div>
  )
}

function AccountLine({ user, onLogout }) {
  if (!user) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 12.5, color: '#94A3B8' }}>
      <span>
        Paying as <strong style={{ color: '#CBD5E1' }}>{user.displayName || user.email}</strong>
        {user.displayName && user.email ? ` (${user.email})` : ''}
      </span>
      <button
        type="button" onClick={onLogout}
        style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: '#64748B', fontSize: 12, cursor: 'pointer', padding: 0 }}
      >
        <LogOut size={12} /> Not you?
      </button>
    </div>
  )
}

const centerRow = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0' }
const noticeBox = {
  display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, lineHeight: 1.5,
  padding: '11px 13px', borderRadius: 10, border: '1px solid transparent',
}
