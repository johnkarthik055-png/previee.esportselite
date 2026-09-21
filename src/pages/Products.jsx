import { useEffect } from 'react'
import { Map, PenTool, Upload, Brain, Check, ArrowRight, Pencil, Minus, MoveUpRight, Square } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import StatsBar from '../components/StatsBar'
import VerticalLabel from '../components/VerticalLabel'

/* Photo placeholders — same pattern as the homepage hero. Drop the real file
 * in as src/assets/<name>.<ext> and it's picked up automatically. Until then
 * each falls back to a dark navy gradient. */
const featuresHeroModules = import.meta.glob('../assets/features-hero.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const featuresCtaModules  = import.meta.glob('../assets/features-cta.{jpg,jpeg,png,webp}',  { eager: true, import: 'default' })
const featuresHeroBg = Object.values(featuresHeroModules)[0] || null
const featuresCtaBg  = Object.values(featuresCtaModules)[0]  || null

const GRADIENT_FALLBACK = 'linear-gradient(160deg, #050816 0%, #0A1428 45%, #050816 100%)'
function photoBg(img) {
  return img
    ? `linear-gradient(180deg, rgba(5,8,22,0.55) 0%, rgba(5,8,22,0.75) 55%, rgba(5,8,22,0.96) 100%), url(${img})`
    : GRADIENT_FALLBACK
}

/* ─────────────────────────────────────────
   Mock UI panels — illustrative CSS/HTML, not photography.
───────────────────────────────────────── */
function PanelShell({ title, icon: Icon, children }) {
  return (
    <div style={{
      background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: '16px',
      padding: '22px', boxShadow: '0 24px 60px rgba(0,0,0,0.35)', width: '100%', maxWidth: '440px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#94A3B8', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        <Icon size={14} style={{ color: '#3B82F6' }} /> {title}
      </div>
      {children}
    </div>
  )
}

function MapKnowledgePanel() {
  const dots = [
    { top: '26%', left: '22%', c: '#3B82F6' },
    { top: '55%', left: '62%', c: '#00D4FF' },
    { top: '72%', left: '32%', c: '#3B82F6' },
    { top: '38%', left: '80%', c: '#00D4FF' },
  ]
  return (
    <PanelShell title="Map Preview — Erangel" icon={Map}>
      <div style={{
        position: 'relative', height: '170px', borderRadius: '10px', overflow: 'hidden',
        background: 'radial-gradient(circle at 25% 30%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(circle at 75% 65%, rgba(0,212,255,0.12), transparent 50%), #0D1526',
        border: '1px solid #1E293B',
      }}>
        {dots.map((d, i) => (
          <span key={i} style={{
            position: 'absolute', top: d.top, left: d.left, width: '10px', height: '10px', borderRadius: '50%',
            background: d.c, boxShadow: `0 0 14px 4px ${d.c}55`,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '18px', marginTop: '14px', fontSize: '11px', color: '#94A3B8' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} /> Vehicle spawn
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D4FF' }} /> Boat spawn
        </span>
      </div>
    </PanelShell>
  )
}

function StrategyMakerPanel() {
  return (
    <PanelShell title="Strategy Board" icon={PenTool}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[Pencil, Minus, MoveUpRight, Square].map((Icon, i) => (
            <div key={i} style={{
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              background: i === 0 ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
              border: '1px solid #1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: i === 0 ? '#3B82F6' : '#64748B',
            }}>
              <Icon size={14} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative', height: '170px', borderRadius: '10px', background: '#0D1526', border: '1px solid #1E293B', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '18%', left: '14%', width: '48%', height: '38%', border: '1.5px dashed #3B82F6', borderRadius: '8px' }} />
          <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%">
            <defs>
              <marker id="fm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#00D4FF" />
              </marker>
            </defs>
            <line x1="30%" y1="78%" x2="72%" y2="32%" stroke="#00D4FF" strokeWidth="2" markerEnd="url(#fm-arrow)" />
          </svg>
        </div>
      </div>
    </PanelShell>
  )
}

function MatchLoggerPanel() {
  const rows = [['Map', 'Miramar'], ['Placement', '#2'], ['Kills', '7']]
  return (
    <PanelShell title="Match Summary" icon={Upload}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '11px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1E293B', borderRadius: '8px',
          }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>{k}</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC', fontFamily: "'Oxanium', sans-serif" }}>{v}</span>
          </div>
        ))}
      </div>
      <button type="button" style={{
        marginTop: '14px', width: '100%', padding: '11px', borderRadius: '8px', border: 'none',
        background: '#2563EB', color: '#fff', fontFamily: "'Oxanium', sans-serif", fontWeight: 700,
        fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'default',
      }}>
        Review &amp; Save
      </button>
    </PanelShell>
  )
}

function AICoachPanel() {
  const stats = [['28%', 'HS Rate'], ['31%', 'Accuracy']]
  return (
    <PanelShell title="AI Coach" icon={Brain}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6',
        }}>
          <Brain size={16} />
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid #1E293B', borderRadius: '4px 12px 12px 12px',
          padding: '11px 14px', fontSize: '12.5px', color: '#CBD5E1', lineHeight: 1.5,
        }}>
          Your headshot rate is trending up 6% this week. Focus on close-range fights next.
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {stats.map(([v, l]) => (
          <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid #1E293B', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: '#F8FAFC', fontFamily: "'Oxanium', sans-serif" }}>{v}</div>
            <div style={{ fontSize: '10px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{l}</div>
          </div>
        ))}
      </div>
    </PanelShell>
  )
}

/* ─────────────────────────────────────────
   Feature block — alternating light/dark, mirrored sides
───────────────────────────────────────── */
function FeatureBlock({ index, eyebrow, line1, line2, desc, bullets, ctaLabel, ctaHref, theme, reverse, panel }) {
  const [ref, visible] = useScrollAnimation()
  const light = theme === 'light'
  return (
    <section style={{ background: light ? '#F4F7FC' : 'rgba(10,15,28,0.85)', padding: 'clamp(70px,9vw,100px) clamp(16px,5vw,48px)' }}>
      <div ref={ref} className={`anim-section ${visible ? 'visible' : ''}`} style={{
        maxWidth: '1180px', margin: '0 auto', display: 'flex', gap: 'clamp(32px,5vw,72px)',
        alignItems: 'center', flexWrap: 'wrap', flexDirection: reverse ? 'row-reverse' : 'row',
      }}>
        <div style={{ flex: '1 1 340px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '13px',
            color: light ? '#2563EB' : '#3B82F6', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '18px',
          }}>
            {String(index).padStart(2, '0')} — {eyebrow}
          </p>
          <h2 style={{
            fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)',
            color: light ? '#0B1220' : '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '18px',
          }}>
            {line1}<br /><span style={{ color: light ? '#2563EB' : '#3B82F6' }}>{line2}</span>
          </h2>
          <p style={{ fontSize: '16px', color: light ? '#475569' : '#94A3B8', lineHeight: 1.75, marginBottom: '22px', maxWidth: '460px' }}>
            {desc}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '28px' }}>
            {bullets.map(b => (
              <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: light ? '#334155' : '#CBD5E1' }}>
                <Check size={16} style={{ color: '#3B82F6', flexShrink: 0, marginTop: 2 }} /> {b}
              </li>
            ))}
          </ul>
          {light ? (
            <a href={ctaHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.03em', textTransform: 'uppercase',
              color: '#0B1220', background: 'transparent', border: '1px solid #94A3B8', borderRadius: '12px',
              padding: '13px 26px', textDecoration: 'none',
            }}>
              {ctaLabel}
            </a>
          ) : (
            <a href={ctaHref} className="btn-outline">{ctaLabel}</a>
          )}
        </div>
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
          {panel}
        </div>
      </div>
    </section>
  )
}

export default function Products() {
  useEffect(() => { document.title = 'Features | Esports Elite' }, [])

  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })
  const [ctaRef, ctaVisible]   = useScrollAnimation()

  const FEATURES = [
    {
      index: 1, theme: 'light', reverse: false, eyebrow: 'MAP KNOWLEDGE',
      line1: 'KNOW EVERY', line2: 'SPAWN POINT.',
      desc: 'Verified vehicle and boat spawn locations across Erangel, Miramar, and Rondo — plan rotations around real data, not guesses.',
      bullets: [
        'Interactive maps for all 3 currently supported maps',
        'Verified vehicle & boat spawn data',
        'Plan drops and rotations with confidence',
        "More maps coming as they're added",
      ],
      ctaLabel: 'EXPLORE MAP KNOWLEDGE →', ctaHref: 'https://app.esportselite.in',
      panel: <MapKnowledgePanel />,
    },
    {
      index: 2, theme: 'dark', reverse: true, eyebrow: 'STRATEGY MAKER',
      line1: 'PLAN EVERY', line2: 'ROUND TOGETHER.',
      desc: 'A full drawing and planning toolkit for squads to map out strategies visually.',
      bullets: [
        'Freehand drawing, lines, arrows & zones',
        'Team rotation & drop planning',
        'Utility markers & distance measuring',
        'Built for real squad planning sessions',
      ],
      ctaLabel: 'EXPLORE STRATEGY MAKER →', ctaHref: 'https://app.esportselite.in',
      panel: <StrategyMakerPanel />,
    },
    {
      index: 3, theme: 'light', reverse: false, eyebrow: 'MATCH LOGGER',
      line1: 'LOG MATCHES', line2: 'IN SECONDS.',
      desc: 'Upload a results screenshot and let it extract your map, placement, and kills — reviewed by you before anything saves.',
      bullets: [
        'Screenshot-based match extraction',
        'Solo, duo, squad, scrims & tournament support',
        'Mandatory review before saving',
        'Coming soon',
      ],
      ctaLabel: 'EXPLORE MATCH LOGGER →', ctaHref: 'https://app.esportselite.in',
      panel: <MatchLoggerPanel />,
    },
    {
      index: 4, theme: 'dark', reverse: true, eyebrow: 'AI COACH',
      line1: 'YOUR PERSONAL', line2: 'AI COACH.',
      desc: 'Upload a stats screenshot and get a breakdown of your headshot rate, accuracy, and a practice plan built around your actual numbers.',
      bullets: [
        'Stats extraction from a single screenshot',
        'Strengths & weaknesses breakdown',
        'Personalized practice plan',
        'Coming soon',
      ],
      ctaLabel: 'EXPLORE AI COACH →', ctaHref: 'https://app.esportselite.in',
      panel: <AICoachPanel />,
    },
  ]

  return (
    <>
      {/* ── 1. HERO (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(90px,11vw,150px) clamp(16px,5vw,48px) clamp(70px,8vw,90px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(featuresHeroBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div className="section-label"><span>FEATURES</span></div>
          <h1 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(30px,5.5vw,54px)', color: '#F8FAFC', lineHeight: 1.05, textTransform: 'uppercase', marginBottom: '20px' }}>
            Four tools built<br />for a <span style={{ color: '#3B82F6' }}>higher standard.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.8vw,18px)', color: '#94A3B8', lineHeight: 1.75, maxWidth: '540px', marginBottom: '32px' }}>
            Everything you need to train, analyze, track and grow — built specifically for competitive BGMI players.
          </p>
          <a href="#features" className="btn-primary">EXPLORE FEATURES ↓</a>
        </div>
        <VerticalLabel>Train · Analyze · Improve · Compete</VerticalLabel>
      </section>

      {/* ── 2. STATS BAR (dark) ── */}
      <StatsBar />

      {/* ── 3. FEATURE BLOCKS ── */}
      <div id="features">
        {FEATURES.map(f => <FeatureBlock key={f.eyebrow} {...f} />)}
      </div>

      {/* ── 4. FINAL CTA (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(90px,11vw,140px) clamp(16px,5vw,48px)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(featuresCtaBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={ctaRef} className={`anim-section ${ctaVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <div className="section-label center"><span>ESPORTS ELITE</span></div>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '14px' }}>
            Same game.<br /><span style={{ color: '#3B82F6' }}>A bigger tomorrow.</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '32px' }}>
            Train. Analyze. Improve. Compete.
          </p>
        </div>
      </section>
    </>
  )
}
