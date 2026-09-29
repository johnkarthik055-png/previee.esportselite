import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Map, Brain, BarChart2, PenTool,
  Check, ChevronRight,
  Zap, Target, Shield, Users, Clock, TrendingUp, Eye, Layers,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

const G = {
  background: 'linear-gradient(90deg, #1769FF, #7137FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const innerStyle = { maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }
const faqInnerStyle = { maxWidth: 800, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }

const FEATURE_KEYS = ['map', 'ai', 'logger', 'strategy']

const TABS = [
  {
    id: 0, icon: Map, label: 'Map Knowledge', accent: '#1769FF', detailPath: '/features/map-knowledge',
    eyebrow: 'FEATURE 01', title: 'MASTER EVERY\nDROP ZONE.',
    desc: 'Interactive layered maps for every BGMI and PUBG arena. Study rotations, mark hot zones, and memorize high-loot paths before you ever land.',
    bullets: [
      { icon: Eye,     text: 'Zone heat maps with real match data' },
      { icon: Target,  text: 'Custom pin sets for every squad role' },
      { icon: Layers,  text: 'Altitude-aware loot tier overlays' },
      { icon: Clock,   text: 'Ring shrink timelines built in' },
    ],
  },
  {
    id: 1, icon: Brain, label: 'AI Coach', accent: '#7137FF', detailPath: '/features/ai-coach',
    eyebrow: 'FEATURE 02', title: 'A COACH THAT\nNEVER SLEEPS.',
    desc: 'Upload your screenshots. Our AI parses damage dealt, survival time, and weapon accuracy — then delivers sharp, actionable feedback in seconds.',
    bullets: [
      { icon: Zap,        text: 'Screenshot analysis in under 5 seconds' },
      { icon: Brain,      text: 'Habit patterns detected over time' },
      { icon: TrendingUp, text: 'Drill prescriptions for your weak spots' },
      { icon: Shield,     text: 'Advice tuned to your rank bracket' },
    ],
  },
  {
    id: 2, icon: BarChart2, label: 'Stats Tracker', accent: '#00C48C', detailPath: '/features/match-logger',
    eyebrow: 'FEATURE 03', title: 'YOUR NUMBERS.\nYOUR EDGE.',
    desc: "Log matches manually or import them. Watch your K/D, damage, and survive-rate trend over every session — and know exactly where you're improving.",
    bullets: [
      { icon: BarChart2,  text: 'K/D, damage & win-rate dashboards' },
      { icon: TrendingUp, text: 'Weekly and monthly trend lines' },
      { icon: Target,     text: 'Per-weapon accuracy breakdown' },
      { icon: Clock,      text: 'Session length vs performance correlation' },
    ],
  },
  {
    id: 3, icon: PenTool, label: 'Strategy Maker', accent: '#FF1838', detailPath: '/features/strategy-maker',
    eyebrow: 'FEATURE 04', title: 'DRAW IT.\nDRILL IT. WIN.',
    desc: 'Build play blueprints on a live map canvas. Assign roles, sketch rotations, and share with your squad — all in one place before the lobby opens.',
    bullets: [
      { icon: PenTool, text: 'Freehand draw on any map layer' },
      { icon: Users,   text: '4-player role assignment per strategy' },
      { icon: Shield,  text: 'Save and version your playbooks' },
      { icon: Zap,     text: 'One-tap share to squad chat' },
    ],
  },
]

const COMPARE_ROWS = [
  { feature: 'Interactive BGMI / PUBG maps',       ee: true, yt: false, generic: false },
  { feature: 'AI screenshot analysis',             ee: true, yt: false, generic: false },
  { feature: 'Personal match stat tracking',       ee: true, yt: false, generic: true  },
  { feature: 'In-app strategy drawing canvas',     ee: true, yt: false, generic: false },
  { feature: 'Squad roster & role management',     ee: true, yt: false, generic: false },
  { feature: 'Structured training roadmap',        ee: true, yt: false, generic: false },
]

const FAQS = [
  {
    q: 'Does Esports Elite work for both BGMI and PUBG PC?',
    a: 'Yes. The map database, AI coach, and stat tracker are calibrated for both BGMI (mobile) and PUBG PC. When you log a match you select the platform — everything adjusts automatically.',
  },
  {
    q: 'How does the AI coach analyse my screenshots?',
    a: "You upload an end-of-match screenshot and our model reads your damage, kills, placement, and survival time. It cross-references your recent session history and flags the metrics that are dragging your rank down — then prescribes targeted drills.",
  },
  {
    q: 'Is my squad data shared with anyone?',
    a: "Never. All squad rosters, strategies, and match logs are private to your account. We don't sell data or surface individual stats to other users without explicit opt-in.",
  },
  {
    q: 'What does the free tier include?',
    a: 'Free gives you full access to Stages 1–3 of the roadmap: Map Knowledge, Match Logger, and Strategy Maker core features. AI Coach, Squad Tools, and advanced analytics unlock in the Pro plan.',
  },
]

/* ─── Mockup components ─── */
function MapMockup({ accent }) {
  const cells = Array.from({ length: 24 })
  const markers = [
    { top: '28%', left: '22%', label: 'HOT' },
    { top: '55%', left: '60%', label: 'MED' },
    { top: '72%', left: '35%', label: 'LOW' },
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: '#F0F5FF', borderRadius: 12, overflow: 'hidden', position: 'relative', padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: 4, height: '85%' }}>
        {cells.map((_, i) => (
          <div key={i} style={{ background: `rgba(23,105,255,${0.03 + (i % 3) * 0.02})`, borderRadius: 4, border: '1px solid rgba(23,105,255,0.08)' }} />
        ))}
      </div>
      {markers.map((m) => (
        <div key={m.label} style={{ position: 'absolute', top: m.top, left: m.left, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'map-pulse 2s ease-in-out infinite', boxShadow: `0 0 0 0 ${accent}66` }}>
            <Target size={12} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', color: accent, background: '#fff', padding: '1px 5px', borderRadius: 3, border: `1px solid ${accent}33` }}>{m.label}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', color: '#9BAABB' }}>ERANGEL · MIRAMAR · RONDO</div>
    </div>
  )
}

function AIChatMockup({ accent }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#F7F4FF', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ alignSelf: 'flex-end', background: '#fff', border: '1px solid #DCE4EF', borderRadius: '12px 12px 4px 12px', padding: '10px 14px', maxWidth: '80%' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>My K/D dropped to 1.8 this week. What's wrong?</p>
      </div>
      <div style={{ alignSelf: 'flex-start', background: accent, borderRadius: '12px 12px 12px 4px', padding: '10px 14px', maxWidth: '85%' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#fff', margin: 0, lineHeight: 1.5 }}>Your early-game aggression timing has shifted — you're engaging at 180m+ range before looting. Try holding for sub-100m engagements in the first ring.</p>
      </div>
      <div style={{ alignSelf: 'flex-end', background: '#fff', border: '1px solid #DCE4EF', borderRadius: '12px 12px 4px 12px', padding: '10px 14px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>What drill should I run?</p>
      </div>
      <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, background: accent, borderRadius: '12px 12px 12px 4px', padding: '10px 16px' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>ANALYZING YOUR MATCH</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', opacity: 0.7, animation: `typing-dot 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function BarChartMockup({ accent }) {
  const bars = [
    { label: 'MON', h: '65%' }, { label: 'TUE', h: '40%' },
    { label: 'WED', h: '80%' }, { label: 'THU', h: '55%' }, { label: 'FRI', h: '90%' },
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: '#F0FFF8', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 22, color: '#111827', margin: 0, letterSpacing: '0.03em' }}>K/D RATIO <span style={{ color: accent }}>2.4 ↑12%</span></p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9BAABB', margin: 0, marginTop: 2, letterSpacing: '0.1em' }}>LAST 5 SESSIONS</p>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        {bars.map((b, idx) => (
          <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: idx * 0.08 }}
              style={{ width: '100%', height: b.h, background: `linear-gradient(to top, ${accent}, ${accent}88)`, borderRadius: '4px 4px 0 0', transformOrigin: 'bottom' }}
            />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#9BAABB', fontWeight: 600, letterSpacing: '0.05em' }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StrategyMockup({ accent }) {
  const players = [
    { color: '#1769FF', label: 'IGL',     pos0: { top: '18%', left: '15%' }, pos1: { top: '35%', left: '55%' } },
    { color: '#FF1838', label: 'Sniper',  pos0: { top: '30%', left: '70%' }, pos1: { top: '15%', left: '30%' } },
    { color: '#00C48C', label: 'Fragger', pos0: { top: '65%', left: '40%' }, pos1: { top: '60%', left: '20%' } },
    { color: accent,    label: 'Support', pos0: { top: '75%', left: '75%' }, pos1: { top: '80%', left: '55%' } },
  ]
  const cells = Array.from({ length: 24 })
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFF5F6', borderRadius: 12, padding: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: 3, height: '85%' }}>
        {cells.map((_, i) => (
          <div key={i} style={{ background: `rgba(255,24,56,${0.02 + (i % 4) * 0.01})`, borderRadius: 3, border: '1px solid rgba(255,24,56,0.06)' }} />
        ))}
      </div>
      {players.map((p) => (
        <motion.div
          key={p.label}
          animate={{ top: [p.pos0.top, p.pos1.top, p.pos0.top], left: [p.pos0.left, p.pos1.left, p.pos0.left] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: players.indexOf(p) * 0.5 }}
          style={{ position: 'absolute', width: 28, height: 28, borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 10px ${p.color}66`, zIndex: 2 }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 7, color: '#fff', fontWeight: 800 }}>{p.label.slice(0, 3).toUpperCase()}</span>
        </motion.div>
      ))}
      <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', color: accent }}>STRATEGY: ALPHA PUSH</div>
    </div>
  )
}

const MOCKUPS = [MapMockup, AIChatMockup, BarChartMockup, StrategyMockup]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid #DCE4EF' }}>
      <button onClick={onToggle} aria-expanded={open} aria-label={q} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 20, color: '#111827', textAlign: 'left', letterSpacing: '0.02em' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'inline-block', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 300, fontSize: 28, color: '#1769FF', lineHeight: 1, flexShrink: 0 }}
        >+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#536174', lineHeight: 1.7, padding: '0 0 22px', margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [openFaq, setOpenFaq]     = useState(null)

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section aria-label="Hero" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: '#fff', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-10%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #DCE4EF 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '15%', right: '8%', width: 3, height: 120, background: 'linear-gradient(to bottom, #1769FF, transparent)', borderRadius: 2, opacity: 0.18, transform: 'rotate(22deg)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '55%', left: '5%', width: 2, height: 100, background: 'linear-gradient(to bottom, #FF1838, transparent)', borderRadius: 2, opacity: 0.12, transform: 'rotate(30deg)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,64px)', position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 40, height: 2, background: '#1769FF', borderRadius: 1 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.16em', color: '#1769FF', textTransform: 'uppercase' }}>PLATFORM FEATURES</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(52px, 8vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.01em', color: '#111827', marginBottom: 28, maxWidth: 780 }}>
            BUILT FOR<br /><span style={G}>PLAYERS WHO</span><br />TRAIN TO WIN.
          </motion.h1>

          <motion.p initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }} style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#536174', lineHeight: 1.65, maxWidth: 560, marginBottom: 48 }}>
            Four tools — maps, AI coaching, stat tracking, and strategy building — designed around how the top 1% of BGMI and PUBG players actually improve.
          </motion.p>

          {/* Pills — tab filter */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {TABS.map((t) => {
              const Icon = t.icon
              const active = activeFeature === t.id
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFeature(t.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 50,
                    background: active ? '#1769FF' : '#F7F9FC',
                    border: `1.5px solid ${active ? '#1769FF' : '#DCE4EF'}`,
                    cursor: 'pointer', transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                    color: active ? '#fff' : '#536174',
                  }}
                >
                  <Icon size={15} strokeWidth={2} />{t.label}<ChevronRight size={13} strokeWidth={2.5} />
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Feature sections (pill-filtered, one shown at a time) ── */}
      <AnimatePresence mode="wait">
        {TABS.filter(tab => tab.id === activeFeature).map((tab) => {
          const idx = tab.id
          const MockupComp = MOCKUPS[idx]
          const visualLeft = idx % 2 === 0
          const bg = idx % 2 === 0 ? '#F7F9FC' : '#FFFFFF'
          return (
            <motion.div
              key={FEATURE_KEYS[idx]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <section
                aria-label={tab.label}
                style={{ background: bg, padding: '96px 0', borderBottom: '1px solid #DCE4EF' }}
              >
                <div style={innerStyle}>
                  <motion.div
                    initial={{ opacity: 0, transform: 'translateY(24px)' }}
                    whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
                    className="feat-grid"
                  >
                    {/* Visual */}
                    <div style={{ order: visualLeft ? 0 : 1 }} className="feat-vis">
                      <div style={{ background: '#fff', border: `2px solid ${tab.accent}22`, borderRadius: 20, padding: 24, height: 380, boxShadow: `0 20px 60px ${tab.accent}14` }}>
                        <MockupComp accent={tab.accent} />
                      </div>
                    </div>

                    {/* Text */}
                    <div style={{ order: visualLeft ? 1 : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 2, background: tab.accent, borderRadius: 1 }} />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: tab.accent, textTransform: 'uppercase' }}>{tab.eyebrow}</span>
                      </div>
                      <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(38px, 4vw, 58px)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#111827', whiteSpace: 'pre-line', marginBottom: 20 }}>{tab.title}</h2>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginBottom: 32 }}>{tab.desc}</p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                        {tab.bullets.map((b, i) => {
                          const BIcon = b.icon
                          return (
                            <motion.div key={i} initial={{ opacity: 0, transform: 'translateX(-16px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.1 + i * 0.07 }} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${tab.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <BIcon size={15} color={tab.accent} strokeWidth={2} />
                              </div>
                              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#111827', fontWeight: 500 }}>{b.text}</span>
                            </motion.div>
                          )
                        })}
                      </div>

                      <Link to={tab.detailPath} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} style={{ textDecoration: 'none' }}>
                        <RadialRevealButton
                          label="EXPLORE FEATURE →"
                          padding="13px 28px"
                          rounded={8}
                          font={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em' }}
                          colors={{ fill: '#F7F9FC', textColor: '#111827', hoverFill: '#0B1220', hoverTextColor: '#FFFFFF' }}
                          border={{ borderWidth: 1, borderColor: '#DCE4EF' }}
                        />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* ── Comparison Table ── */}
      <section aria-label="Feature comparison" style={{ background: '#fff', padding: '100px 0' }}>
        <div style={innerStyle}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ marginBottom: 60, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, background: '#1769FF', borderRadius: 1 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: '#1769FF', textTransform: 'uppercase' }}>WHY US</span>
              <div style={{ width: 32, height: 2, background: '#1769FF', borderRadius: 1 }} />
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.93, color: '#111827', letterSpacing: '0.01em', marginBottom: 16 }}>
              VS THE <span style={G}>ALTERNATIVES</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', maxWidth: 500, margin: '0 auto' }}>Every tool here you could hunt across four different apps, four subscriptions. Or do it in one place.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.15 }} style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#9BAABB', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '2px solid #DCE4EF' }}>Feature</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '0.06em', color: '#1769FF', borderBottom: '2px solid #1769FF', background: 'rgba(23,105,255,0.04)', textAlign: 'center' }}>ESPORTS ELITE</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#536174', borderBottom: '2px solid #DCE4EF', textAlign: 'center' }}>YouTube Guides</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#536174', borderBottom: '2px solid #DCE4EF', textAlign: 'center' }}>Generic Apps</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F7F9FC' }}>
                    <td style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#111827', borderBottom: '1px solid #DCE4EF' }}>{row.feature}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid rgba(23,105,255,0.1)', background: 'rgba(23,105,255,0.03)' }}>{row.ee && <Check size={20} color="#1769FF" strokeWidth={2.5} />}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid #DCE4EF' }}>{row.yt ? <Check size={20} color="#00C48C" strokeWidth={2.5} /> : <span style={{ fontSize: 18, color: '#DCE4EF' }}>—</span>}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid #DCE4EF' }}>{row.generic ? <Check size={20} color="#00C48C" strokeWidth={2.5} /> : <span style={{ fontSize: 18, color: '#DCE4EF' }}>—</span>}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: '24px 20px' }} />
                  <td style={{ padding: '24px 20px', textAlign: 'center', background: 'rgba(23,105,255,0.03)' }}>
                    <Link to="/pricing" style={{ textDecoration: 'none' }}>
                      <RadialRevealButton
                        label="GET ESPORTS ELITE →"
                        padding="10px 22px"
                        rounded={8}
                        font={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em' }}
                        colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                        border={{ borderWidth: 0 }}
                      />
                    </Link>
                  </td>
                  <td /><td />
                </tr>
              </tbody>
            </table>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, color: '#9BAABB', textAlign: 'center', marginTop: 8, letterSpacing: '0.1em' }}>← Scroll to see more</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-label="Frequently asked questions" style={{ background: '#F7F9FC', padding: '100px 0' }}>
        <div style={faqInnerStyle}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, background: '#1769FF', borderRadius: 1 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: '#1769FF', textTransform: 'uppercase' }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.93, color: '#111827', letterSpacing: '0.01em' }}>
              QUESTIONS,<br /><span style={G}>ANSWERED.</span>
            </h2>
          </motion.div>

          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, transform: 'translateY(20px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}>
              <FaqItem q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-label="Join Esports Elite" style={{ background: '#07111F', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ ...innerStyle, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>GET STARTED</span>
              <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: 24 }}>
              <span style={G}>READY TO</span><br /><span style={{ color: '#ffffff' }}>DOMINATE?</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto 48px' }}>
              Join thousands of BGMI and PUBG players already training smarter. Free to start. No credit card needed.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START FREE TODAY →"
                  padding="15px 36px"
                  rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16 }}
                  colors={{ fill: '#1769FF', textColor: '#FFFFFF', hoverFill: '#0E54CC', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </Link>
              <Link to="/roadmap" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="VIEW ROADMAP →"
                  padding="14px 32px"
                  rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 16 }}
                  colors={{ fill: 'transparent', textColor: 'rgba(255,255,255,0.7)', hoverFill: 'rgba(255,255,255,0.1)', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)' }}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes map-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(23,105,255,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(23,105,255,0); }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30%            { opacity: 1;   transform: translateY(-4px); }
        }
        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .feat-vis  { order: 0 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .feat-grid * { animation: none !important; }
        }
      `}</style>
    </>
  )
}
