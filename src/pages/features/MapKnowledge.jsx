import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, Map, Route, Target } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RadialRevealButton from '../../components/ui/RadialRevealButton'

const ease = [0.23, 1, 0.32, 1]

const accent = '#1769FF'
const lightBg = '#EEF5FF'
const borderColor = 'rgba(23,105,255,0.15)'

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const INSIDE_CARDS = [
  {
    Icon: Map,
    title: 'ZONE BREAKDOWN',
    desc: 'Every compound, open area and building on Erangel, Miramar and Rondo mapped out with entry points and control positions.',
  },
  {
    Icon: Route,
    title: 'ROTATION PATHS',
    desc: 'Pre-planned rotation routes for every circle scenario. Know exactly which path to take before the zone closes.',
  },
  {
    Icon: Target,
    title: 'HOT DROP INTEL',
    desc: 'Detailed analysis of every major hot drop — loot quality, player traffic, early fight risk and squad positioning.',
  },
]

const MAP_CARDS = [
  {
    num: '01', name: 'ERANGEL', bg: lightBg, border: 'rgba(23,105,255,0.2)', cardAccent: accent,
    desc: 'The classic. Military compound, Pochinki, Georgopol and Sosnovka — every key location covered.',
    bullets: ['Military Base rotations', 'School & Pochinki control', 'Bridge chokepoints', 'Final zone positions'],
  },
  {
    num: '02', name: 'MIRAMAR', bg: '#F7F9FC', border: '#DCE4EF', cardAccent: '#7137FF',
    desc: 'The desert map. Los Leones, El Pozon and Hacienda del Patron — long-range positioning and vehicle rotations.',
    bullets: ['Los Leones rooftop control', 'Long range sniping positions', 'Vehicle rotation routes', 'Hacienda fights'],
  },
  {
    num: '03', name: 'RONDO', bg: '#FFF0F2', border: 'rgba(255,24,56,0.15)', cardAccent: '#FF1838',
    desc: 'The newest map. Unique vertical compound fights and dense urban zones — the most different map in BGMI.',
    bullets: ['Vertical compound control', 'Urban rotation paths', 'Hot drop zones', 'Safe zone prediction'],
  },
]

const HOW_BULLETS = [
  'Know where to land for the best loot vs fewest fights',
  'Plan rotations before the circle shows',
  'Understand compound control and entry angles',
  'Predict final zones and position early',
]

/* ─── Tactical map viewer illustration ─── */
const MAP_TABS = [
  { label: 'ERANGEL', file: '/maps/erangel.jpg', badge: 'ERANGEL · 8×8 KM' },
  { label: 'MIRAMAR', file: '/maps/miramar.jpg', badge: 'MIRAMAR · 8×8 KM' },
  { label: 'RONDO',   file: '/maps/rondo.jpg',   badge: 'RONDO · 6×6 KM' },
]

const ZONE_COLORS = ['#FF1838', '#1769FF', '#7137FF', '#00C48C', '#FFB800']

const ZONE_POSITIONS = [
  [{ top: '45%', left: '40%' }, { top: '18%', left: '68%' }, { top: '32%', left: '22%' }, { top: '68%', left: '58%' }, { top: '75%', left: '32%' }],
  [{ top: '40%', left: '35%' }, { top: '22%', left: '62%' }, { top: '55%', left: '25%' }, { top: '72%', left: '65%' }, { top: '30%', left: '72%' }],
  [{ top: '38%', left: '45%' }, { top: '20%', left: '70%' }, { top: '60%', left: '28%' }, { top: '65%', left: '60%' }, { top: '78%', left: '38%' }],
]

const MK_LEGEND = [
  { color: '#FF1838', label: 'HOT DROP' },
  { color: '#1769FF', label: 'CONTROL' },
  { color: '#7137FF', label: 'ROTATION' },
  { color: '#00C48C', label: 'SAFE' },
  { color: '#FFB800', label: 'LOOT' },
]

function TrafficDots() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
    </div>
  )
}

function TacticalMapVisual() {
  const [activeMap, setActiveMap] = useState(0)
  const t = MAP_TABS[activeMap]
  const zones = ZONE_POSITIONS[activeMap].map((pos, i) => ({ ...pos, color: ZONE_COLORS[i] }))

  return (
    <div style={{ background: '#07111F', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(23,105,255,0.2)', boxShadow: '0 30px 80px rgba(23,105,255,0.15)' }}>
      {/* Top bar */}
      <div style={{ background: '#0D1526', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrafficDots />
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>TACTICAL OVERVIEW</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C48C', animation: 'radarPulse 2s infinite' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C' }}>LIVE</span>
        </div>
      </div>

      {/* Map tabs */}
      <div style={{ background: '#0D1526', padding: '0 20px', display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {MAP_TABS.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setActiveMap(i)}
            style={{
              position: 'relative', padding: '12px 20px',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.15em',
              color: activeMap === i ? '#1769FF' : '#536174',
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}
          >
            {m.label}
            {activeMap === i && (
              <motion.div
                layoutId="mapTab"
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#1769FF,#7137FF)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Map area */}
      <div style={{ position: 'relative', height: 320, background: '#0A1628', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMap}
            src={t.file}
            alt={`${t.label} tactical map`}
            loading="eager"
            onError={(e) => { e.target.style.opacity = '0' }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </AnimatePresence>

        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,17,31,0.5) 0%, rgba(7,17,31,0.3) 40%, rgba(7,17,31,0.6) 100%)' }} />

        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(23,105,255,0.08) 0, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(23,105,255,0.08) 0, transparent 1px, transparent 60px)',
            backgroundSize: '60px 60px',
          }}
        />

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          {/* Dashed connectors between markers */}
          <line x1={zones[0].left} y1={zones[0].top} x2={zones[1].left} y2={zones[1].top} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="4,4" />
          <line x1={zones[2].left} y1={zones[2].top} x2={zones[3].left} y2={zones[3].top} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="4,4" />
        </svg>

        {/* Zone markers */}
        <AnimatePresence>
          {zones.map((zone, i) => (
            <motion.div
              key={i + activeMap}
              initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}
              style={{ position: 'absolute', top: zone.top, left: zone.left, width: 44, height: 44, pointerEvents: 'none' }}
            >
              <div
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: 44, height: 44, borderRadius: '50%', border: `1px solid ${zone.color}`, opacity: 0.25,
                  animation: 'ringPulse 2.5s infinite', animationDelay: `${i * 0.15}s`,
                }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${zone.color}`, opacity: 0.5 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 16, borderRadius: '50%', background: `${zone.color}26`, border: `1.5px solid ${zone.color}`, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 6, height: 6, borderRadius: '50%', background: zone.color, boxShadow: `0 0 10px ${zone.color}` }} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Coordinate corners */}
        <span style={{ position: 'absolute', top: 8, left: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.12)' }}>A1</span>
        <span style={{ position: 'absolute', top: 8, right: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.12)' }}>H1</span>
        <span style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.12)' }}>A8</span>
        <span style={{ position: 'absolute', bottom: 8, right: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.12)' }}>H8</span>

        {/* Map name badge */}
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(7,17,31,0.8)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 14px' }}>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff' }}>{t.badge}</span>
        </div>

        {/* Scan lines */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
          }}
        />
      </div>

      {/* Bottom bar */}
      <div style={{ background: '#07111F', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {MK_LEGEND.map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', border: `1.5px solid ${l.color}`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 4, height: 4, borderRadius: '50%', background: l.color }} />
              </div>
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: '#AAB8C8' }}>{l.label}</span>
            </div>
          ))}
        </div>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#536174' }}>5 ZONES MAPPED</span>
      </div>
    </div>
  )
}

export default function MapKnowledge() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="features" />

      {/* ── SECTION 1 — HERO ── */}
      <section
        aria-label="Map Knowledge hero"
        style={{ background: '#FFFFFF', minHeight: '65vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #DCE4EF' }}
      >
        {/* Backgrounds */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 600, height: 400, background: 'radial-gradient(circle,rgba(23,105,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 500, height: 400, background: 'radial-gradient(circle,rgba(255,24,56,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />

        <div className="mk-hero-inner">
          {/* Back link */}
          <Link
            to="/features"
            onClick={scrollTop}
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter', fontSize: 14, color: '#536174', cursor: 'pointer', marginBottom: 32 }}
            >
              <ArrowLeft size={16} />
              Back to Features
            </motion.div>
          </Link>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}
          >
            <div style={{ width: 40, height: 2, background: accent, borderRadius: 1 }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase' }}>MAP KNOWLEDGE</span>
          </motion.div>

          {/* H1 */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.01em', color: '#111827' }}
            className="mk-h1"
          >
            KNOW EVERY<br />DROP ZONE.
          </motion.div>

          {/* Desc */}
          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mk-desc"
          >
            Every major BGMI map broken down zone by zone. Interactive tactical overlays, rotation paths, hot drops and safe-zone strategies — so you always know where to land, where to rotate, and where to avoid.
          </motion.p>

          {/* Pills */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}
          >
            {['3 MAPS COVERED', 'ZONE BREAKDOWNS', 'ROTATION PATHS', 'HOT DROP GUIDES'].map(pill => (
              <span key={pill} style={{ background: lightBg, border: `1px solid ${borderColor}`, padding: '8px 16px', borderRadius: 20, fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: accent }}>
                {pill}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}
          >
            <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="GET STARTED →"
                padding="14px 32px" rounded={8}
                font={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: accent, hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </a>
            <Link to="/features" onClick={scrollTop} style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="← ALL FEATURES"
                padding="14px 32px" rounded={8}
                font={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15 }}
                colors={{ fill: '#FFFFFF', textColor: '#111827', hoverFill: '#111827', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 1.5, borderColor: '#DCE4EF' }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2 — WHAT'S INSIDE ── */}
      <section aria-label="What's inside Map Knowledge" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="mk-inner">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>WHAT'S INSIDE</div>
            <div className="mk-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, color: '#111827' }}>
              EVERYTHING YOU NEED<br /><span style={G}>TO KNOW THE MAP.</span>
            </div>
          </motion.div>

          {/* 3 cards */}
          <div className="mk-cards-grid">
            {INSIDE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(7,17,31,0.08)' }}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
                <div style={{ width: 48, height: 48, background: lightBg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <card.Icon size={22} color={accent} strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 22, color: '#111827' }}>{card.title}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.6, color: '#536174', marginTop: 8 }}>{card.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — THE 3 MAPS ── */}
      <section aria-label="The 3 maps" style={{ background: '#FFFFFF', padding: '96px 0' }}>
        <div className="mk-inner">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div className="mk-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93 }}>
              <span style={G}>3 MAPS.</span><br />
              <span style={{ color: '#111827' }}>FULLY COVERED.</span>
            </div>
          </motion.div>

          {/* 3 map cards */}
          <div className="mk-maps-row">
            {MAP_CARDS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(7,17,31,0.08)' }}
                style={{ flex: 1, borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden', background: m.bg, border: `1px solid ${m.border}`, transition: 'box-shadow 0.25s', minWidth: 0 }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: m.cardAccent }} />
                <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 80, color: m.cardAccent, opacity: 0.1, userSelect: 'none', lineHeight: 1 }}>{m.num}</div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 32, color: '#111827' }}>{m.name}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, color: '#536174', marginTop: 8 }}>{m.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  {m.bullets.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={13} color={m.cardAccent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — HOW IT HELPS ── */}
      <section aria-label="How map knowledge helps" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="mk-inner">
          <div className="mk-how-grid">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(-40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            >
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>HOW IT HELPS</div>
              <div className="mk-how-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.9, color: '#111827' }}>
                STOP DYING<br /><span style={G}>TO THE MAP.</span>
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 20, maxWidth: 480 }}>
                Most players lose fights because of positioning, not mechanics. They land in bad spots, rotate too late, and get caught in the open.
              </p>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 16, maxWidth: 480 }}>
                Map Knowledge gives you the information to make better decisions before the fight even starts.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                {HOW_BULLETS.map(b => (
                  <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, background: lightBg, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Check size={12} color={accent} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174', lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Tactical map viewer */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              <TacticalMapVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — CTA ── */}
      <section aria-label="Get Map Knowledge" className="py-16" style={{ background: '#07111F', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          >
            <div className="mk-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, color: '#FFFFFF' }}>
              READY TO KNOW<br /><span style={G}>THE MAP?</span>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: '#AAB8C8', lineHeight: 1.65, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
              Stop getting caught in bad positions. Start playing with information.
            </p>
            <div style={{ marginTop: 40 }}>
              <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="GET MAP KNOWLEDGE →"
                  padding="18px 48px" rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18 }}
                  colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: accent, hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </a>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>Included in ₹149/month · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        .mk-hero-inner { max-width:1280px; margin:0 auto; padding:128px 64px; position:relative; z-index:1; width:100%; }
        .mk-inner      { max-width:1280px; margin:0 auto; padding:0 64px; }
        .mk-h1         { font-size:clamp(56px,8vw,100px); }
        .mk-desc       { font-family:'Inter',sans-serif; font-size:18px; line-height:1.6; color:#536174; max-width:560px; margin-top:20px; }
        .mk-section-h2 { font-size:clamp(36px,5vw,64px); }
        .mk-how-h2     { font-size:clamp(36px,5vw,56px); }
        .mk-cta-h2     { font-size:clamp(48px,7vw,88px); }
        .mk-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .mk-maps-row   { display:flex; gap:20px; }
        .mk-how-grid   { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }

        @media (max-width:900px) {
          .mk-hero-inner { padding:96px 20px !important; }
          .mk-inner      { padding:0 20px !important; }
          .mk-desc       { font-size:16px !important; }
          .mk-cards-grid { grid-template-columns:1fr !important; }
          .mk-maps-row   { flex-direction:column !important; }
          .mk-how-grid   { grid-template-columns:1fr !important; gap:48px !important; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>
    </div>
  )
}
