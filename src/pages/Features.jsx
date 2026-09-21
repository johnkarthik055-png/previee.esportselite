import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

// ── Gradient text styles ──
const gBlue = {
  background: 'linear-gradient(90deg, #1769FF, #4A9EFF)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', display: 'inline',
}
const gRed = {
  background: 'linear-gradient(90deg, #FF1838, #E60023)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', display: 'inline',
}
const gBlueRed = {
  background: 'linear-gradient(90deg, #1769FF, #FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', display: 'inline',
}

// ── Stagger animation variants ──
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Bullet item ──
function Bullet({ text, delay = 0, color = '#1769FF' }) {
  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        background: `${color}18`, border: `1px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color, fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#536174', lineHeight: 1.4 }}>{text}</span>
    </motion.div>
  )
}

// ── Feature number label ──
function FeatureNum({ num, label, lineColor = '#1769FF' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 40, height: 2, background: lineColor, flexShrink: 0 }} />
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, color: lineColor, letterSpacing: '0.25em' }}>{num}</span>
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, color: '#536174' }}>—</span>
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, color: '#536174', letterSpacing: '0.2em' }}>{label}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────
function FeaturesHero() {
  return (
    <section style={{ height: 520, background: '#FFFFFF', overflow: 'hidden', position: 'relative' }} className="feat-hero">
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #DCE4EF 1px, transparent 1px)',
        backgroundSize: '28px 28px', opacity: 0.4, pointerEvents: 'none',
      }} />
      {/* Shards */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: 380, background: '#1769FF', opacity: 0.08, clipPath: 'polygon(0 0, 100% 0, 55% 100%, 0 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 340, background: '#FF1838', opacity: 0.08, clipPath: 'polygon(0 0, 100% 0, 100% 75%, 35% 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 180, height: 200, background: '#1769FF', opacity: 0.05, clipPath: 'polygon(0 40%, 80% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 160, height: 180, background: '#FF1838', opacity: 0.05, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }} />

      {/* Left microcopy */}
      <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'none' }} className="feat-hero-side">
        {['TRAIN', 'ANALYZE', 'DOMINATE'].map(w => (
          <span key={w} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#B0BAC8' }}>{w}</span>
        ))}
      </div>
      {/* Right microcopy */}
      <div style={{ position: 'absolute', right: 32, top: '40%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, pointerEvents: 'none' }} className="feat-hero-side">
        {['MORE', 'THAN', 'A GAME'].map(w => (
          <span key={w} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#B0BAC8' }}>{w}</span>
        ))}
      </div>

      {/* Center */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.35em', color: '#6D7B90', textTransform: 'uppercase', margin: '0 0 16px' }}>
            BUILT FOR COMPETITIVE MINDS
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 92, lineHeight: 0.88, color: '#0B1220', textTransform: 'uppercase', margin: 0, textAlign: 'center' }} className="feat-hero-h1">
            FEATU<span style={gBlueRed}>RES</span>
          </motion.h1>
          <motion.div variants={fadeUp} style={{ width: 120, height: 2, background: 'linear-gradient(90deg, #1769FF, #FF1838)', margin: '20px auto', borderRadius: 2 }} />
          <motion.p variants={fadeUp} style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 620, textAlign: 'center', margin: 0, padding: '0 24px' }}>
            Everything you need to understand the game, build better strategies, analyze your performance and improve faster — in one place.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 01 — MAP KNOWLEDGE
// ─────────────────────────────────────────────────
const LEGEND = [
  { color: '#FF1838', label: 'Hot Drop',        type: 'circle' },
  { color: '#00A8FF', label: 'Rotation Route',  type: 'line'   },
  { color: '#FFD700', label: 'Vehicle Spawn',   type: 'circle' },
  { color: '#00FF88', label: 'High Loot',       type: 'circle' },
  { color: '#FFFFFF', label: 'Compound',        type: 'square' },
  { color: '#FF1838', label: 'Zone Prediction', type: 'ring'   },
]

function MapMockup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div ref={ref} whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.3 }}
      style={{ background: '#07111F', borderRadius: 16, border: '1px solid rgba(23,105,255,0.27)', boxShadow: '0 25px 80px rgba(23,105,255,0.18)', overflow: 'hidden', width: '100%', maxWidth: 620, position: 'relative', zIndex: 1 }}>
      {/* Top bar */}
      <div style={{ background: '#0B1828', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#FF5F57','#FFBD2E','#28CA42'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
          {['Erangel','Miramar','Sanhok','Vikendi','Rondo'].map(t => (
            <div key={t} style={{ padding: '5px 10px', borderRadius: 6, background: t === 'Erangel' ? 'rgba(23,105,255,0.15)' : 'transparent', borderBottom: t === 'Erangel' ? '2px solid #1769FF' : '2px solid transparent', cursor: 'pointer' }}>
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', color: t === 'Erangel' ? '#1769FF' : '#6B7B8D' }}>{t}</span>
            </div>
          ))}
        </div>
        <span style={{ color: '#6B7B8D', fontSize: 14, cursor: 'pointer', flexShrink: 0 }}>×</span>
      </div>

      {/* Map area */}
      <div style={{ position: 'relative', height: 320, background: '#0D1F35', overflow: 'hidden' }}>
        {/* Terrain SVG */}
        <svg viewBox="0 0 600 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <polygon points="0,0 600,0 600,320 0,320" fill="#0D1F35" />
          <polygon points="0,70 170,35 270,120 230,210 85,250 0,210" fill="#0F2B3D" />
          <polygon points="270,0 470,10 500,110 450,160 300,90 255,30" fill="#0F2B3D" />
          <polygon points="540,25 600,0 600,160 535,185 515,80" fill="#0F2B3D" />
          <polygon points="75,240 285,205 385,278 305,320 60,320" fill="#0F2B3D" />
          <polygon points="455,190 600,165 600,290 600,320 435,315" fill="#0F2B3D" />
          <polygon points="165,28 275,8 265,62 235,82 155,58" fill="#0A2A45" />
          <polygon points="375,108 498,98 485,192 405,178 385,138" fill="#0A2A45" />
          <rect x="0" y="148" width="600" height="5" fill="#1E3D5A" opacity="0.65" />
          <rect x="292" y="0" width="5" height="320" fill="#1E3D5A" opacity="0.55" />
          <line x1="0" y1="210" x2="600" y2="105" stroke="#1E3D5A" strokeWidth="3" opacity="0.45" />
          <circle cx="298" cy="153" r="108" fill="none" stroke="#FF1838" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.35" />
          <circle cx="298" cy="153" r="108" fill="#FF1838" opacity="0.04" />
        </svg>

        {/* Rotation route */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <motion.path d="M 65 265 Q 140 220 215 192 Q 295 166 375 138 Q 436 116 505 93"
            fill="none" stroke="#00A8FF" strokeWidth="2" strokeDasharray="8 4"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }} />
          <motion.polygon points="498,85 514,92 500,101" fill="#00A8FF"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.85 }} />
        </svg>

        {/* HOT DROP */}
        <div style={{ position: 'absolute', left: '35%', top: '42%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="map-pulse" style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,24,56,0.25)', border: '1.5px solid rgba(255,24,56,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF1838' }} />
            </div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 8, color: '#FFF', background: 'rgba(255,24,56,0.75)', padding: '1px 5px', borderRadius: 2, marginTop: 3, whiteSpace: 'nowrap' }}>HOT DROP</div>
          </div>
        </div>
        {/* VEHICLE SPAWN */}
        <div style={{ position: 'absolute', left: '18%', top: '66%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 14 }}>🚗</span>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 8, fontWeight: 600, color: '#FFD700', marginTop: 2, whiteSpace: 'nowrap', textShadow: '0 0 6px rgba(255,215,0,0.5)' }}>VEHICLE SPAWN</div>
          </div>
        </div>
        {/* HIGH LOOT */}
        <div style={{ position: 'absolute', left: '62%', top: '28%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 8px rgba(0,255,136,0.7)' }} />
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 8, fontWeight: 600, color: '#00FF88', marginTop: 2, whiteSpace: 'nowrap' }}>HIGH LOOT</div>
          </div>
        </div>
        {/* COMPOUND */}
        <div style={{ position: 'absolute', left: '72%', top: '62%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 11, height: 11, border: '1.5px solid rgba(255,255,255,0.8)', borderRadius: 2 }} />
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginTop: 2, whiteSpace: 'nowrap' }}>COMPOUND</div>
          </div>
        </div>

        {/* Legend panel */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 136, background: 'rgba(11,24,40,0.88)', backdropFilter: 'blur(8px)', borderLeft: '1px solid rgba(23,105,255,0.13)', padding: 14 }}>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, letterSpacing: '0.3em', color: '#6B7B8D', marginBottom: 10 }}>LEGEND</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LEGEND.map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {item.type === 'circle' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />}
                {item.type === 'line'   && <div style={{ width: 14, height: 2, background: item.color, flexShrink: 0, borderRadius: 1 }} />}
                {item.type === 'square' && <div style={{ width: 8, height: 8, border: `1.5px solid ${item.color}`, flexShrink: 0, borderRadius: 1 }} />}
                {item.type === 'ring'   && <div style={{ width: 9, height: 9, border: `1.5px dashed ${item.color}`, borderRadius: '50%', flexShrink: 0, opacity: 0.7 }} />}
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#8899AA' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: '#0B1828', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(23,105,255,0.13)' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8899AA' }}>Strategies for Every Situation</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1769FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: 12 }}>→</span>
        </div>
      </div>
    </motion.div>
  )
}

function MapKnowledgeSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} style={{ flex: '0 0 50%' }} className="feat-col">
            <FeatureNum num="01" label="MAP KNOWLEDGE" lineColor="#1769FF" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              MASTER<br />EVERY <span style={gBlueRed}>MAP</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Understand the battlefield before you enter it. Explore maps, rotations, loot routes, vehicle spawns, compounds and zone patterns.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Detailed POIs & callouts','Rotations & zone patterns','Vehicle spawns & loot paths','Pro-level map insights'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="EXPLORE MAP KNOWLEDGE →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>

          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} style={{ flex: '0 0 50%', position: 'relative' }} className="feat-col">
            <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(23,105,255,0.15) 0%, transparent 70%)', right: -80, top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }} />
            <MapMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 02 — STRATEGY MAKER
// ─────────────────────────────────────────────────
const TOOLS = [
  { icon: '↖', active: true }, { icon: '✏' }, { icon: '○' },
  { icon: '⊕' }, { icon: 'T' }, { icon: '⌫' },
]

function StrategyMockup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div ref={ref} whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.3 }}
      style={{ background: '#07111F', borderRadius: 16, border: '1px solid rgba(255,24,56,0.27)', boxShadow: '0 25px 80px rgba(255,24,56,0.12)', overflow: 'hidden', width: '100%', maxWidth: 620, position: 'relative', zIndex: 1 }}>
      {/* Top bar */}
      <div style={{ background: '#0B1828', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,24,56,0.1)' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: 'white' }}>Strategy Maker</span>
        <div style={{ display: 'flex', gap: 8, color: '#6B7B8D', fontSize: 14 }}>
          <span style={{ cursor: 'pointer' }}>−</span><span style={{ cursor: 'pointer' }}>×</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', height: 340 }}>
        {/* Toolbar */}
        <div style={{ width: 44, background: '#0B1828', borderRight: '1px solid rgba(23,105,255,0.13)', padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {TOOLS.map((t, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 6, background: t.active ? 'rgba(23,105,255,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: 13, color: t.active ? '#1769FF' : '#6B7B8D', fontWeight: t.active ? 700 : 400 }}>{t.icon}</span>
            </div>
          ))}
        </div>

        {/* Map area */}
        <div style={{ flex: 1, position: 'relative', background: '#0D1F35', overflow: 'hidden' }}>
          <svg viewBox="0 0 380 340" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="380" height="340" fill="#0D1F35" />
            <polygon points="0,0 190,25 175,130 95,165 0,145" fill="#0F2B3D" />
            <polygon points="210,0 380,0 380,130 320,155 250,85" fill="#0F2B3D" />
            <polygon points="55,185 210,160 270,245 195,305 40,285" fill="#0F2B3D" />
            <polygon points="305,165 380,145 380,310 350,325 295,225" fill="#0F2B3D" />
            <rect x="0" y="153" width="380" height="4" fill="#1E3D5A" opacity="0.55" />
            <rect x="185" y="0" width="4" height="340" fill="#1E3D5A" opacity="0.45" />
            <polygon points="95,28 175,8 155,68 118,80" fill="#0A2A45" />
          </svg>

          {/* Routes */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <motion.path d="M 35 278 Q 95 222 150 182 Q 210 142 285 104"
              fill="none" stroke="#1769FF" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
            <motion.polygon points="278,96 294,103 280,113" fill="#1769FF"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.55 }} />

            <motion.path d="M 345 295 Q 310 240 275 192 Q 240 144 210 95"
              fill="none" stroke="#FF1838" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.7 }} />
            <motion.polygon points="203,87 218,94 205,104" fill="#FF1838"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.95 }} />
          </svg>

          {/* Team labels */}
          <div style={{ position: 'absolute', left: '22%', top: '60%' }}>
            <div style={{ background: 'rgba(23,105,255,0.2)', border: '1px solid #1769FF', borderRadius: 3, padding: '2px 6px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 9, color: '#1769FF' }}>TEAM A</div>
          </div>
          <div style={{ position: 'absolute', left: '60%', top: '70%' }}>
            <div style={{ background: 'rgba(255,24,56,0.2)', border: '1px solid #FF1838', borderRadius: 3, padding: '2px 6px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 9, color: '#FF1838' }}>TEAM B</div>
          </div>
          {[{ l:'13%',t:'72%',n:'1' },{ l:'38%',t:'48%',n:'2' },{ l:'62%',t:'26%',n:'3' }].map(wp => (
            <div key={wp.n} style={{ position: 'absolute', left: wp.l, top: wp.t, transform: 'translate(-50%,-50%)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#0B1828', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 9, color: 'white' }}>{wp.n}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div style={{ width: 118, background: '#0B1828', borderLeft: '1px solid rgba(255,24,56,0.13)', padding: 10, flexShrink: 0, overflow: 'hidden' }}>
          {[{ label:'Team A', items:['Spawn','Route','Goal'] },{ label:'Team B', items:['Spawn','Route','Goal'] },{ label:'Tools', items:['Draw','Text','Erase','Clear'] }].map((g, gi) => (
            <div key={g.label} style={{ marginTop: gi === 0 ? 0 : 12 }}>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: '#6B7B8D', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>{g.label}</div>
              {g.items.map(item => (
                <div key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, padding: '4px 8px', borderRadius: 4, marginBottom: 2, background: item === 'Draw' ? 'rgba(23,105,255,0.15)' : 'transparent', color: item === 'Draw' ? '#1769FF' : '#8899AA', cursor: 'pointer' }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ background: '#0B1828', padding: '8px 16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,24,56,0.1)' }}>
        <button style={{ background: '#1769FF', color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, border: 'none', borderRadius: 6, padding: '8px 20px', cursor: 'pointer' }}>SAVE PLAN</button>
      </div>
    </motion.div>
  )
}

function StrategyMakerSection() {
  return (
    <section style={{ background: '#F7F9FC', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} style={{ flex: '0 0 50%', position: 'relative' }} className="feat-col">
            <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,24,56,0.12) 0%, transparent 70%)', left: -80, top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }} />
            <StrategyMockup />
          </motion.div>

          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} style={{ flex: '0 0 50%' }} className="feat-col">
            <FeatureNum num="02" label="STRATEGY MAKER" lineColor="#FF1838" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              TURN <span style={gBlue}>PLANS</span><br />INTO <span style={gRed}>WINS</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Create, visualize and refine strategies with an easy-to-use tactical planner. Plan rotations, angles, utility usage and team movements like a pro.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Tactical map drawing tools','Plan & save strategy setups','Share with your squad','Professional strategy templates'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} color="#FF1838" />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="START PLANNING →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#FF1838', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 03 — MATCH LOGGER + AI
// ─────────────────────────────────────────────────
const INSIGHTS = [
  { bg: '#0A2A1A', border: '#00FF8833', color: '#00FF88', text: '✓ Great early-game positioning' },
  { bg: '#0A1A2A', border: '#1769FF33', color: '#4A9EFF', text: '✓ Low mid-game engagement'      },
  { bg: '#2A1010', border: '#FF183833', color: '#FF6B6B', text: '⚠ Work on close-range reflexes' },
  { bg: '#2A1A0A', border: '#FFB74D33', color: '#FFB74D', text: '⚠ Improve zone timing'          },
]

function MatchLoggerMockup() {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.3 }}
      style={{ background: '#07111F', borderRadius: 16, border: '1px solid rgba(23,105,255,0.3)', boxShadow: '0 25px 80px rgba(23,105,255,0.15)', overflow: 'hidden', width: '100%', maxWidth: 620, position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(23,105,255,0.13)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: 'white' }}>Match #1247</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7B8D', marginTop: 3 }}>12 Sep 2026 · 9:45 PM</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Classic','Scrims','Tournament'].map(t => (
            <div key={t} style={{ background: t === 'Classic' ? '#1769FF' : 'transparent', color: t === 'Classic' ? 'white' : '#6B7B8D', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, padding: '4px 10px', borderRadius: 6, cursor: 'pointer' }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Middle */}
      <div style={{ display: 'flex', gap: 16, padding: 16 }}>
        {/* Left stats */}
        <div style={{ width: 175, flexShrink: 0 }}>
          <div style={{ background: 'linear-gradient(135deg, #0D1F35 0%, #1A3A5C 100%)', borderRadius: 10, height: 118, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(7,17,31,0.8) 100%)' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }} aria-hidden="true">
              <polygon points="0,0 175,0 175,75 0,118" fill="#0F2B3D" />
              <polygon points="0,55 120,35 175,118 0,118" fill="#0A2A45" />
            </svg>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 26, color: 'white', lineHeight: 1 }}>#1 / 100</div>
              <span style={{ fontSize: 16, marginTop: 2, display: 'block' }}>🏆</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {[{ n:'12',l:'KILLS',c:'white' },{ n:'1836',l:'DAMAGE',c:'white' },{ n:'28%',l:'HEADSHOT',c:'#4A9EFF' },{ n:'24m',l:'SURVIVAL',c:'white' }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 20, color: s.c, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: '#6B7B8D', letterSpacing: '0.1em', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right insights */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontSize: 13 }}>⚡</span>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.25em', color: '#1769FF', textTransform: 'uppercase' }}>AI INSIGHTS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {INSIGHTS.map((ins, i) => (
              <motion.div key={ins.text}
                initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
                style={{ background: ins.bg, border: `1px solid ${ins.border}`, borderRadius: 8, padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: ins.color, lineHeight: 1.4 }}>
                {ins.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(23,105,255,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6B7B8D' }}>Match analyzed by Esports Elite AI</span>
        <div className="pulse-glow" style={{ width: 8, height: 8, borderRadius: '50%', background: '#1769FF', boxShadow: '0 0 6px rgba(23,105,255,0.8)' }} />
      </div>
    </motion.div>
  )
}

function MatchLoggerSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} style={{ flex: '0 0 50%' }} className="feat-col">
            <FeatureNum num="03" label="MATCH LOGGER + AI" lineColor="#1769FF" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              LOG <span style={gBlue}>SMARTER</span><br />IMPROVE <span style={gRed}>FASTER</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Track every match and let AI turn your results into actionable insights.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Extract stats from match screenshots','Detailed match history','Identify strengths & weaknesses','Track progress over time','AI-powered performance analysis'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="START LOGGING →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>

          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} style={{ flex: '0 0 50%', position: 'relative' }} className="feat-col">
            <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)', right: -80, top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }} />
            <MatchLoggerMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 04 — AI COACH
// ─────────────────────────────────────────────────
const MSGS = [
  { from: 'user', text: 'How can I improve my close range fights?' },
  { from: 'ai',   text: 'Focus on pre-aiming corners and using peek mechanics. Practice in training mode with 3 targets at close range.' },
  { from: 'user', text: "What's the best rotation from Pochinki?" },
  { from: 'user', text: 'Analyze my last match.' },
]

function AICoachMockup() {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.3 }}
      style={{ background: '#07111F', borderRadius: 16, border: '1px solid rgba(23,105,255,0.35)', boxShadow: '0 25px 80px rgba(23,105,255,0.2)', overflow: 'hidden', width: '100%', maxWidth: 620, height: 460, display: 'flex', position: 'relative', zIndex: 1 }}>
      {/* Left: Avatar panel */}
      <div style={{ width: 165, background: '#0B1828', borderRight: '1px solid rgba(23,105,255,0.13)', padding: '20px 14px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 128, height: 168, background: 'radial-gradient(ellipse at 50% 40%, rgba(23,105,255,0.2) 0%, #07111F 70%)', borderRadius: 12, border: '1px solid rgba(23,105,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(23,105,255,0.2) 0%, transparent 70%)' }} />
          <svg viewBox="0 0 128 168" style={{ width: '100%', height: '100%', position: 'absolute' }} aria-hidden="true">
            <defs>
              <filter id="glow2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <polygon points="28,148 18,105 23,62 64,32 105,62 110,105 100,148" fill="#0D2040" stroke="#1769FF" strokeWidth="1.5" filter="url(#glow2)" />
            <polygon points="38,82 90,82 95,112 33,112" fill="#071828" stroke="#1769FF" strokeWidth="1" opacity="0.9" />
            <polygon points="41,85 87,85 91,109 37,109" fill="rgba(23,105,255,0.15)" />
            <line x1="64" y1="32" x2="64" y2="16" stroke="#1769FF" strokeWidth="1.5" opacity="0.6" />
            <polygon points="54,16 64,6 74,16" fill="none" stroke="#1769FF" strokeWidth="1.5" opacity="0.7" />
            <polygon points="18,105 28,148 13,122" fill="#0D2040" stroke="#1769FF" strokeWidth="1" opacity="0.7" />
            <polygon points="110,105 100,148 115,122" fill="#0D2040" stroke="#1769FF" strokeWidth="1" opacity="0.7" />
          </svg>
        </div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.3em', color: '#1769FF', marginTop: 12, textAlign: 'center' }}>AI COACH</div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 8, color: '#6B7B8D', letterSpacing: '0.2em', marginTop: 2 }}>ESPORTS ELITE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14 }}>
          <div className="online-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 6px rgba(0,255,136,0.8)' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#00FF88', letterSpacing: '0.1em' }}>ONLINE</span>
        </div>
      </div>

      {/* Right: Chat panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid rgba(23,105,255,0.13)', paddingBottom: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: 'white' }}>Ask your AI Coach...</span>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {MSGS.map((m, i) => (
            <motion.div key={i}
              initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.15 }}
              style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ background: m.from === 'user' ? 'rgba(23,105,255,0.2)' : '#0B1828', border: `1px solid ${m.from === 'user' ? 'rgba(23,105,255,0.33)' : 'rgba(23,105,255,0.13)'}`, borderRadius: m.from === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px', padding: '8px 12px', maxWidth: '85%', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#C8D8F0', lineHeight: 1.5 }}>
                {m.text}
              </div>
            </motion.div>
          ))}
          {/* Typing indicator */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: '#0B1828', border: '1px solid rgba(23,105,255,0.13)', borderRadius: '2px 12px 12px 12px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0,1,2].map(i => <div key={i} className={`typing-dot typing-dot-${i}`} style={{ width: 6, height: 6, borderRadius: '50%', background: '#1769FF' }} />)}
            </div>
          </div>
        </div>

        {/* Input */}
        <div style={{ borderTop: '1px solid rgba(23,105,255,0.13)', paddingTop: 12, marginTop: 10, display: 'flex', gap: 8 }}>
          <input type="text" placeholder="Suggest drills for recoil control" readOnly style={{ flex: 1, background: '#0B1828', border: '1px solid rgba(23,105,255,0.2)', borderRadius: 8, padding: '9px 13px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'white', outline: 'none' }} />
          <motion.button whileHover={{ scale: 1.05 }} style={{ width: 36, height: 36, flexShrink: 0, background: '#1769FF', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14 }}>→</motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function AICoachSection() {
  return (
    <section style={{ background: '#F7F9FC', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} style={{ flex: '0 0 50%', position: 'relative' }} className="feat-col">
            <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(23,105,255,0.15) 0%, transparent 70%)', left: -80, top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }} />
            <AICoachMockup />
          </motion.div>

          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} style={{ flex: '0 0 50%' }} className="feat-col">
            <FeatureNum num="04" label="AI COACH" lineColor="#1769FF" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              PERSONAL <span style={gBlue}>COACH</span><br />ALWAYS WITH <span style={gRed}>YOU</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Get instant feedback, personalized training plans and data-driven guidance from your AI Coach.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Match analysis & feedback','Personalized training recommendations','Answer to in-game questions','Identify your weak areas'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="CHAT WITH AI COACH →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────
function FeaturesCTA() {
  return (
    <section style={{ height: 360, background: '#0B1220', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1200 360" preserveAspectRatio="none">
        <polygon points="0,0 200,0 100,180 0,200" fill="#1769FF" opacity="0.04" />
        <polygon points="300,360 500,360 400,180 280,200" fill="#FF1838" opacity="0.04" />
        <polygon points="900,0 1100,0 1000,200 880,160" fill="#FF1838" opacity="0.04" />
        <polygon points="1100,360 1200,360 1200,160 1050,200" fill="#1769FF" opacity="0.04" />
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1, padding: '0 24px', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.35em', color: '#AAB8C8', textTransform: 'uppercase', margin: '0 0 16px' }}>
            DISCIPLINE BUILDS FREEDOM
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 68, color: 'white', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 }} className="feat-cta-h2">
            READY TO <span style={gBlue}>LEVEL</span> <span style={gRed}>UP?</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#AAB8C8', marginTop: 16, maxWidth: 480 }}>
            Build better habits. Make better decisions. Become a better player.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
            <RadialRevealButton label="JOIN WAITLIST →" padding="16px 44px" rounded={8} font={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '0.06em' }} colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────
export default function Features() {
  return (
    <>
      <Navbar activePage="features" />
      <main>
        <FeaturesHero />
        <MapKnowledgeSection />
        <StrategyMakerSection />
        <MatchLoggerSection />
        <AICoachSection />
        <FeaturesCTA />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .feat-hero { height: auto !important; min-height: 400px !important; padding: 60px 0 !important; }
          .feat-hero-h1 { font-size: 52px !important; }
          .feat-hero-side { display: none !important; }
          .feat-inner { padding: 0 20px !important; }
          .feat-row { flex-direction: column !important; gap: 40px !important; }
          .feat-col { flex: none !important; width: 100% !important; }
          .feat-h2 { font-size: 40px !important; }
          .feat-cta-h2 { font-size: 44px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .feat-inner { padding: 0 32px !important; }
          .feat-h2 { font-size: 44px !important; }
          .feat-hero-h1 { font-size: 72px !important; }
          .feat-row { gap: 40px !important; }
        }

        @keyframes mapPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.5; }
        }
        .map-pulse { animation: mapPulse 2s ease-in-out infinite; }

        @keyframes onlinePulse {
          0%,100% { box-shadow: 0 0 6px rgba(0,255,136,0.8); }
          50% { box-shadow: 0 0 14px rgba(0,255,136,0.3); }
        }
        .online-pulse { animation: onlinePulse 2s ease-in-out infinite; }

        @keyframes typingAnim {
          0%,100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .typing-dot-0 { animation: typingAnim 1.2s ease-in-out infinite 0s; }
        .typing-dot-1 { animation: typingAnim 1.2s ease-in-out infinite 0.2s; }
        .typing-dot-2 { animation: typingAnim 1.2s ease-in-out infinite 0.4s; }

        @keyframes glowPulse {
          0%,100% { opacity: 1; box-shadow: 0 0 6px rgba(23,105,255,0.8); }
          50% { opacity: 0.4; box-shadow: 0 0 12px rgba(23,105,255,0.3); }
        }
        .pulse-glow { animation: glowPulse 2s ease-in-out infinite; }

        input::placeholder { color: #6B7B8D; }
      `}</style>
    </>
  )
}
