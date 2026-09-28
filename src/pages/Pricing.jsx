import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Zap, BarChart2, Activity, Trophy, Plus, Minus, Users, Shield, Star, Map, Brain, PenTool } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ─── Constants ─── */
const squadPricing = {
  2: { per: 129, total: 258,  save: 20 },
  3: { per: 119, total: 357,  save: 30 },
  4: { per: 109, total: 436,  save: 40 },
  5: { per:  99, total: 495,  save: 50 },
  6: { per:  89, total: 534,  save: 60 },
}

const faqs = [
  { q: "What's included in the ₹149/month plan?",  a: "Everything — Map Knowledge for all maps, Strategy Maker with unlimited saves, Match Logger with AI screenshot import, AI Coach with personalized feedback, full analytics, and access to all 10 roadmap stages." },
  { q: "Is there a free trial?",                   a: "No free trial currently. Full access from day one for ₹149/month. Cancel anytime from your account settings." },
  { q: "How does squad payment work?",             a: "Each squad member pays their own subscription independently via their own payment link. Squad features activate when teammates are also subscribed." },
  { q: "Can I cancel anytime?",                    a: "Yes. Cancel anytime from your account settings. No questions, no cancellation fees." },
  { q: "Is GST included in the price?",            a: "Yes. ₹149/month is GST inclusive. No surprise charges at checkout." },
]

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const E = [0.23, 1, 0.32, 1]

const INCLUDED = [
  { accent: '#1769FF', Icon: Map,      title: 'MAP KNOWLEDGE',   desc: 'All 3 maps covered with zone breakdowns and rotation paths.' },
  { accent: '#7137FF', Icon: Brain,    title: 'AI COACH',        desc: 'Upload your screenshot and get personalized improvement feedback.' },
  { accent: '#00C48C', Icon: BarChart2, title: 'MATCH LOGGER',   desc: 'Auto-import stats from screenshots. No manual entry.' },
  { accent: '#FF1838', Icon: PenTool,  title: 'STRATEGY MAKER',  desc: 'Draw and save unlimited custom squad strategies.' },
  { accent: '#4A8AFF', Icon: Shield,   title: '10-STAGE ROADMAP',desc: 'Structured path from foundation to tournament-ready.' },
  { accent: '#C62DCE', Icon: Star,     title: 'SQUAD TOOLS',     desc: 'Strategy sharing, team analytics and squad coordination.' },
]

const SOLO_FEATURES = [
  'Full Map Knowledge — all maps',
  'Strategy Maker — unlimited saves',
  'Match Logger with AI import',
  'AI Coach — personalized feedback',
  'Performance analytics dashboard',
  'Access to all 10 roadmap stages',
]

const SQUAD_FEATURES = [
  'Everything in Individual Elite',
  'Squad strategy sharing & library',
  'Team performance comparison',
  '1 Owner/Coach + up to 5 Players',
  'Per-member payment links',
  'Priority AI Coach responses',
]

/* ─── Hero right: floating preview card ─── */
function PreviewCard() {
  const bars = [
    { label: 'MAP KNOWLEDGE', pct: '85%', accent: '#1769FF', light: '#4A8AFF' },
    { label: 'AI COACH',      pct: '92%', accent: '#7137FF', light: '#9B6AFF' },
    { label: 'MATCH LOGGER',  pct: '78%', accent: '#00C48C', light: '#33D9B0' },
  ]
  return (
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 24, padding: 40, maxWidth: 380, width: '100%', boxShadow: '0 40px 80px rgba(7,17,31,0.08)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Pulsing border glow */}
      <div className="pr-border-glow" style={{ position: 'absolute', inset: 0, borderRadius: 24, border: '1px solid rgba(23,105,255,0.2)', pointerEvents: 'none' }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 16, ...G }}>ESPORTS ELITE</span>
        <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: 16, color: '#1769FF' }}>₹149<span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 400, fontSize: 13, color: '#9BAABB' }}>/mo</span></span>
      </div>

      {/* Progress bars */}
      {bars.map((b, i) => (
        <div key={b.label} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', color: '#536174' }}>{b.label}</span>
            <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 12, color: '#111827' }}>{b.pct}</span>
          </div>
          <div style={{ background: '#F7F9FC', borderRadius: 4, height: 6, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: b.pct }}
              transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ height: '100%', background: `linear-gradient(90deg,${b.accent},${b.light})`, borderRadius: 4 }}
            />
          </div>
        </div>
      ))}

      {/* Divider */}
      <div style={{ borderTop: '1px solid #DCE4EF', margin: '24px 0' }} />

      {/* Price display */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 56, ...G, lineHeight: 1 }}>₹149</div>
        <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 400, fontSize: 16, color: '#536174', marginTop: 4 }}>/month</div>
        <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#9BAABB', marginTop: 4 }}>GST inclusive</div>
      </div>

      {/* Shimmer overlay */}
      <div className="pr-shimmer" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.6) 50%,transparent 60%)', backgroundSize: '200% 100%', pointerEvents: 'none', borderRadius: 24 }} />
    </motion.div>
  )
}

/* ─── FAQ item ─── */
function FaqItem({ faq, idx, open, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(20px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: E, delay: idx * 0.08 }}
      whileHover={{ borderColor: 'rgba(23,105,255,0.2)' }}
      role="button"
      aria-expanded={open}
      aria-label={faq.q}
      onClick={onToggle}
      style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
        <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 16, color: '#111827', paddingRight: 16 }}>{faq.q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: E }} style={{ flexShrink: 0 }}>
          <Plus size={20} color="#1769FF" strokeWidth={1.5} />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, lineHeight: 1.6, color: '#536174', padding: '0 24px 20px', margin: 0 }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Pricing() {
  const [selectedSize, setSelectedSize] = useState(4)
  const [openFaq, setOpenFaq] = useState(null)

  const sp = squadPricing[selectedSize]

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section aria-label="Hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', paddingTop: 64 }}>
        {/* BG elements */}
        <div style={{ position: 'absolute', left: -200, top: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.09) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -200, bottom: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 380, clipPath: 'polygon(0 0,100% 0,55% 100%,0 85%)', background: '#1769FF', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 260, height: 340, clipPath: 'polygon(45% 0,100% 0,100% 85%,0 100%)', background: '#FF1838', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />

        <div className="pr-hero-inner">
          {/* LEFT */}
          <div style={{ flex: 1, maxWidth: 600 }}>
            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 2, background: '#1769FF', borderRadius: 1 }} />
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: '#1769FF', textTransform: 'uppercase' }}>PRICING</span>
            </motion.div>

            {/* H1 */}
            <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.1 }} className="pr-h1" style={{ color: '#111827' }}>ONE PLAN.</motion.div>
            <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.2 }} className="pr-h1"><span style={G}>EVERYTHING</span></motion.div>
            <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.3 }} className="pr-h1" style={{ color: '#111827' }}>IN IT.</motion.div>

            {/* Desc */}
            <motion.p initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.4 }} className="pr-desc">
              Whether you grind solo or as a squad, Esports Elite gives you the tools, data, and guidance to improve, compete, and go further. No hidden fees. No limits on your grind.
            </motion.p>

            {/* Feature strip */}
            <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.5 }} style={{ display: 'flex', gap: 0, marginTop: 32, flexWrap: 'wrap' }}>
              {[
                { Icon: Zap,      color: '#1769FF', label: 'TRAIN',   sub: 'Build skills' },
                { Icon: BarChart2,color: '#4A8AFF', label: 'ANALYZE', sub: 'Track progress' },
                { Icon: Activity, color: '#7137FF', label: 'IMPROVE', sub: 'See results' },
                { Icon: Trophy,   color: '#FF1838', label: 'COMPETE', sub: 'Reach higher' },
              ].map((item, i) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px', borderRight: i < 3 ? '1px solid #DCE4EF' : 'none', paddingLeft: i === 0 ? 0 : undefined }}>
                  <item.Icon size={16} color={item.color} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: 13, color: '#111827', letterSpacing: '0.05em' }}>{item.label}</span>
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#536174', marginTop: 2 }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.6 }} style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'linear-gradient(90deg,#1769FF,#FF1838)', color: '#FFFFFF', padding: '16px 36px', borderRadius: 30, fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                VIEW PLANS →
              </motion.button>
              <button
                onClick={() => document.getElementById('whats-included')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 15, color: '#111827', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                SEE WHAT'S INCLUDED
              </button>
            </motion.div>

            {/* Microcopy */}
            <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.7 }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 48, paddingTop: 16 }}>
              <div style={{ width: 40, height: 1, background: '#DCE4EF' }} />
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.3em', color: '#9BAABB', textTransform: 'uppercase' }}>SAME GAME. DIFFERENT MINDSET.</span>
            </motion.div>
          </div>

          {/* RIGHT — floating preview card */}
          <div className="pr-hero-right">
            <PreviewCard />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — PRICING CARDS
      ══════════════════════════════════════════ */}
      <section id="pricing-cards" aria-label="Pricing plans" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="pr-inner">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>CHOOSE YOUR PLAN</div>
            <div className="pr-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em' }}>
              ONE PRICE. <span style={G}>EVERYTHING INCLUDED.</span>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', marginTop: 16 }}>₹149/month. No hidden fees. No tiers. Everything in one plan.</p>
          </motion.div>

          {/* Two cards */}
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>

            {/* CARD 1 — Individual */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(40px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: E, delay: 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(7,17,31,0.1)' }}
              style={{ background: '#FFFFFF', borderRadius: 20, padding: 40, border: '1px solid #DCE4EF', width: 460, boxShadow: '0 8px 40px rgba(7,17,31,0.06)', position: 'relative', maxWidth: '100%', transition: 'box-shadow 0.25s' }}
              className="pr-card"
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '3px 3px 0 0', background: '#1769FF' }} />

              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', color: '#1769FF', textTransform: 'uppercase', marginBottom: 4 }}>INDIVIDUAL ELITE</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174', marginBottom: 20 }}>For the solo grinder.</div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
                <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 64, color: '#111827', lineHeight: 1 }}>₹149</span>
                <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 400, fontSize: 18, color: '#536174', marginBottom: 10 }}>/month</span>
              </div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#9BAABB', marginBottom: 24 }}>GST inclusive · Cancel anytime</div>

              <div style={{ borderTop: '1px solid #DCE4EF', marginBottom: 24 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {SOLO_FEATURES.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: '#EEF5FF', border: '1px solid rgba(23,105,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={13} color="#1769FF" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#374151' }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/pricing" style={{ textDecoration: 'none', display: 'block' }}>
                <RadialRevealButton
                  label="GET STARTED →"
                  padding="15px 32px"
                  rounded={8}
                  font={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, letterSpacing: '0.06em' }}
                  colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                  style={{ width: '100%', justifyContent: 'center' }}
                />
              </Link>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#9BAABB', textAlign: 'center', marginTop: 12 }}>GST inclusive</div>
            </motion.div>

            {/* CARD 2 — Squad */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(40px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: E, delay: 0.2 }}
              whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(23,105,255,0.2)' }}
              style={{ background: '#07111F', borderRadius: 20, padding: 40, border: '2px solid #1769FF', width: 460, boxShadow: '0 20px 60px rgba(23,105,255,0.15)', position: 'relative', maxWidth: '100%', transition: 'box-shadow 0.25s' }}
              className="pr-card"
            >
              {/* Best value badge */}
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg,#1769FF,#FF1838)', color: '#FFFFFF', fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', padding: '6px 20px', borderRadius: 20, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>BEST VALUE</div>

              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', color: '#1769FF', textTransform: 'uppercase', marginBottom: 4 }}>SQUAD ELITE</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#AAB8C8', marginBottom: 20 }}>1 Owner/Coach + up to 5 Players</div>

              <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 52, color: '#FFFFFF', lineHeight: 1, marginBottom: 2 }}>FROM ₹89</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 400, fontSize: 14, color: '#AAB8C8', marginBottom: 4 }}>/member/month</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginBottom: 20 }}>Each member pays their own share</div>

              {/* Squad size selector */}
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#AAB8C8', textTransform: 'uppercase', marginBottom: 12 }}>SELECT SQUAD SIZE</div>
              <div role="radiogroup" aria-label="Select squad size" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {[2, 3, 4, 5, 6].map(size => (
                  <motion.button
                    key={size}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`${size} players`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '8px 16px', borderRadius: 8, fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'background 0.2s,color 0.2s,border-color 0.2s',
                      background: selectedSize === size ? '#1769FF' : '#0D1F35',
                      color: selectedSize === size ? '#FFFFFF' : '#AAB8C8',
                      border: `1px solid ${selectedSize === size ? '#1769FF' : '#1A2840'}`,
                    }}
                  >
                    {size} Players
                  </motion.button>
                ))}
              </div>

              {/* Price breakdown */}
              <div style={{ background: '#0B1828', borderRadius: 12, padding: 20, border: '1px solid rgba(23,105,255,0.15)', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: '#AAB8C8', textTransform: 'uppercase', marginBottom: 4 }}>PER PLAYER</div>
                    <AnimatePresence mode="wait">
                      <motion.div key={`per-${selectedSize}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                        <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 40, color: '#FFFFFF', lineHeight: 1 }}>₹{sp.per}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: '#AAB8C8', textTransform: 'uppercase', marginBottom: 4 }}>TOTAL/MONTH</div>
                    <AnimatePresence mode="wait">
                      <motion.div key={`total-${selectedSize}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                        <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 40, ...G, lineHeight: 1 }}>₹{sp.total}</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#6B7B8D', marginTop: 12 }}>Each member pays their own ₹{sp.per} share</div>
              </div>

              {/* Savings badge */}
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`save-${selectedSize}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.25 }}>
                    <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', color: '#00C48C', textTransform: 'uppercase' }}>Save ₹{sp.save}/member vs individual</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '20px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {SQUAD_FEATURES.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Check size={14} color="#1769FF" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#C8D8F0' }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/pricing" style={{ textDecoration: 'none', display: 'block' }}>
                <RadialRevealButton
                  label="START YOUR SQUAD →"
                  padding="15px 32px"
                  rounded={8}
                  font={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 16, letterSpacing: '0.06em' }}
                  colors={{ fill: '#1769FF', textColor: '#FFFFFF', hoverFill: '#FF1838', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                  style={{ width: '100%', justifyContent: 'center' }}
                />
              </Link>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#6B7B8D', textAlign: 'center', marginTop: 12 }}>All prices GST inclusive</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — WHAT'S INCLUDED
      ══════════════════════════════════════════ */}
      <section id="whats-included" aria-label="What is included" style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="pr-inner">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>EVERY PLAN INCLUDES</div>
            <div className="pr-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em', ...G }}>EVERYTHING.</div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', marginTop: 16 }}>No hidden tiers. No locked features. ₹149 gets you the full platform.</p>
          </motion.div>

          {/* 6 cards */}
          <div className="pr-feat-grid">
            {INCLUDED.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, transform: 'translateY(30px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: E, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(7,17,31,0.08)', borderColor: `${item.accent}33` }}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s,box-shadow 0.25s' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: item.accent }} />
                <div style={{ width: 48, height: 48, borderRadius: 10, background: `${item.accent}1A`, border: `1px solid ${item.accent}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <item.Icon size={22} color={item.accent} strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 20, color: '#111827', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.5, color: '#536174' }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — FAQ
      ══════════════════════════════════════════ */}
      <section aria-label="Frequently asked questions" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="pr-inner-narrow">
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="pr-faq-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
            COMMON QUESTIONS
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} idx={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — FINAL CTA
      ══════════════════════════════════════════ */}
      <section aria-label="Join Esports Elite" style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }}>
            <div className="pr-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              <span style={{ color: '#FFFFFF', display: 'block' }}>READY TO</span>
              <span style={G}>LEVEL UP?</span>
            </div>
            <p className="pr-cta-desc" style={{ fontFamily: 'Inter,sans-serif', color: '#AAB8C8', marginTop: 16, lineHeight: 1.65 }}>
              Join India's most serious BGMI training platform.
            </p>
            <div style={{ marginTop: 40 }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START FOR ₹149/MONTH →"
                  padding="18px 48px"
                  rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18 }}
                  colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </Link>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>GST inclusive · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Layout ── */
        .pr-hero-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; flex-direction: row; align-items: center; gap: 64px;
          padding: 128px 64px; position: relative; z-index: 1; width: 100%;
        }
        .pr-inner        { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
        .pr-inner-narrow { max-width: 800px;  margin: 0 auto; padding: 0 64px; }
        .pr-h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: 80px; line-height: 0.92;
          letter-spacing: -0.01em; display: block;
        }
        .pr-desc {
          font-family: 'Inter', sans-serif; font-size: 18px;
          line-height: 1.6; color: #536174; max-width: 520px; margin-top: 20px;
        }
        .pr-hero-right { flex: 1; display: flex; align-items: center; justify-content: center; }
        .pr-section-h2 { font-size: 56px; }
        .pr-faq-h2     { font-size: 48px; }
        .pr-cta-h2     { font-size: 88px; }
        .pr-cta-desc   { font-size: 18px; }
        .pr-feat-grid  { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }

        /* ── Card ── */
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(23,105,255,0); }
          50%      { box-shadow: 0 0 20px 0 rgba(23,105,255,0.2); }
        }
        .pr-border-glow { animation: borderGlow 3s ease-in-out infinite; }

        @keyframes shimmerSlide {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .pr-shimmer { animation: shimmerSlide 3s ease-in-out infinite 2s; }

        /* ── Mobile ── */
        @media (max-width: 960px) {
          .pr-hero-inner  { flex-direction: column !important; padding: 80px 20px !important; gap: 40px !important; }
          .pr-hero-right  { display: none !important; }
          .pr-inner       { padding: 0 20px !important; }
          .pr-inner-narrow{ padding: 0 20px !important; }
          .pr-h1          { font-size: 48px !important; }
          .pr-desc        { font-size: 15px !important; }
          .pr-section-h2  { font-size: 36px !important; }
          .pr-faq-h2      { font-size: 32px !important; }
          .pr-cta-h2      { font-size: 48px !important; }
          .pr-cta-desc    { font-size: 16px !important; }
          .pr-feat-grid   { grid-template-columns: 1fr !important; }
          .pr-card        { width: 100% !important; max-width: 100% !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  )
}
