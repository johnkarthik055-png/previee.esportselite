import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Map, Brain, BarChart2, PenTool, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── Gradient text helper ─── */
const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

/* ─── Feature card data ─── */
const FEATURES = [
  {
    num: '01', color: '#1769FF', accent: '#1769FF',
    iconBg: '#EEF5FF', iconBorder: 'rgba(23,105,255,0.15)',
    Icon: Map,
    title: 'MAP KNOWLEDGE',
    desc: 'Explore every drop zone on Erangel, Miramar and Rondo with interactive tactical overlays and rotation paths.',
  },
  {
    num: '02', color: '#7137FF', accent: '#7137FF',
    iconBg: '#F0EAFF', iconBorder: 'rgba(113,55,255,0.15)',
    Icon: Brain,
    title: 'AI COACH',
    desc: 'Get personalized feedback on your match performance using advanced AI that analyses your stats screenshot.',
  },
  {
    num: '03', color: '#00C48C', accent: '#00C48C',
    iconBg: '#E8FFF6', iconBorder: 'rgba(0,196,140,0.15)',
    Icon: BarChart2,
    title: 'MATCH LOGGER',
    desc: 'Track your K/D and stats automatically with AI-powered screenshot import and full performance history.',
  },
  {
    num: '04', color: '#FF1838', accent: '#FF1838',
    iconBg: '#FFF0F2', iconBorder: 'rgba(255,24,56,0.15)',
    Icon: PenTool,
    title: 'STRATEGY MAKER',
    desc: 'Draw, save and share custom squad strategies on interactive maps in real time.',
  },
]

/* ─── Stats ─── */
const HERO_STATS = [
  { num: '10K+', label: 'PLAYERS TRAINING' },
  { num: '4',    label: 'MAPS COVERED'     },
  { num: 'AI',   label: 'POWERED COACH'    },
]

const STATS_BAND = [
  { num: '10K+', label: 'Players Trained' },
  { num: '50+',  label: 'Pro Strategies'  },
  { num: '4',    label: 'Maps Covered'    },
  { num: 'AI',   label: 'Powered Coach'   },
]

/* ─── Roadmap teaser cards ─── */
const ROADMAP = [
  {
    badge: 'LIVE NOW',   badgeBg: 'rgba(23,105,255,0.12)', badgeColor: '#1769FF',
    badgeBdr: undefined,
    range: 'STAGES 01–03', rangeColor: '#1769FF',
    title: 'FOUNDATION', titleColor: '#111827',
    bg: '#EEF5FF', bdr: 'rgba(23,105,255,0.2)',
    corner: 'linear-gradient(135deg, rgba(23,105,255,0.15) 0%, transparent 60%)',
    items: ['→ Map Knowledge', '→ Match Logger', '→ Strategy Maker'],
    itemColor: '#536174',
    hover: { y: -6, boxShadow: '0 20px 60px rgba(23,105,255,0.12)', borderColor: '#1769FF' },
  },
  {
    badge: 'COMING SOON', badgeBg: '#F7F9FC', badgeColor: '#9BAABB',
    badgeBdr: '1px solid #DCE4EF',
    range: 'STAGES 04–07', rangeColor: '#9BAABB',
    title: 'INTELLIGENCE', titleColor: '#9BAABB',
    bg: '#F7F9FC', bdr: '#DCE4EF',
    corner: 'linear-gradient(135deg, rgba(150,166,186,0.1) 0%, transparent 60%)',
    items: ['→ AI Coach', '→ Game Sense', '→ Strategy'],
    itemColor: '#C0CAD6',
    hover: {},
  },
  {
    badge: 'COMING SOON', badgeBg: 'rgba(255,24,56,0.1)', badgeColor: '#FF1838',
    badgeBdr: undefined,
    range: 'STAGES 08–10', rangeColor: '#FF1838',
    title: 'DOMINATION',  titleColor: '#111827',
    bg: '#FFF0F2', bdr: 'rgba(255,24,56,0.2)',
    corner: 'linear-gradient(135deg, rgba(255,24,56,0.15) 0%, transparent 60%)',
    items: ['→ Teamplay', '→ Performance', '→ Go Elite'],
    itemColor: '#536174',
    hover: { y: -6, boxShadow: '0 20px 60px rgba(255,24,56,0.1)', borderColor: '#FF1838' },
  },
]

export default function Home() {
  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        @keyframes pulsedot {
          0%,100% { box-shadow: 0 0 0 0 rgba(23,105,255,0.5); }
          50%      { box-shadow: 0 0 0 8px rgba(23,105,255,0); }
        }
        .pdot { animation: pulsedot 2s ease-in-out infinite; flex-shrink: 0; }

        @media (max-width: 767px) {
          .hero-wrap  { flex-direction: column !important; padding: 96px 20px !important; }
          .hero-right { display: none !important; }
          .hero-h1    { font-size: 52px !important; }
          .hero-desc  { font-size: 16px !important; }
          .hero-btns  { flex-direction: column !important; }
          .hero-btn   { width: 100% !important; text-align: center !important; }
          .feat-wrap  { padding: 80px 20px !important; }
          .feat-grid  { grid-template-columns: 1fr !important; }
          .stats-wrap { padding: 0 20px !important; }
          .stats-wrap > div { border-right: none !important; border-bottom: 1px solid #DCE4EF !important; }
          .stats-wrap > div:last-child { border-bottom: none !important; }
          .road-wrap  { padding: 80px 20px !important; }
          .road-cards { flex-direction: column !important; }
          .cta-sect   { padding: 80px 0 !important; }
          .cta-h      { font-size: 48px !important; }
          .feat-wrap .section-heading { font-size: 48px !important; }
          .road-wrap .section-heading { font-size: 44px !important; }
        }
      `}</style>

      <Navbar activePage="home" />

      {/* ══════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', background: '#FFFFFF', display: 'flex', alignItems: 'center' }}>

        {/* Background decorations */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>

          {/* Blue glow orb */}
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: -200, top: -200, width: 700, height: 700, background: 'radial-gradient(circle, rgba(23,105,255,0.1) 0%, transparent 60%)', borderRadius: '50%' }}
          />

          {/* Red glow orb */}
          <motion.div
            animate={{ opacity: [0.06, 0.14, 0.06], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{ position: 'absolute', right: -200, bottom: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,24,56,0.08) 0%, transparent 60%)', borderRadius: '50%' }}
          />

          {/* Blue shard top-left */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 320, height: 400, clipPath: 'polygon(0 0, 100% 0, 55% 100%, 0 85%)', background: '#1769FF', opacity: 0.05 }} />

          {/* Red shard top-right */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 360, clipPath: 'polygon(45% 0, 100% 0, 100% 85%, 0 100%)', background: '#FF1838', opacity: 0.05 }} />

          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #DCE4EF 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.6 }} />

          {/* 15 ambient particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -(10 + i % 15), 0],
                x: [0, i % 2 === 0 ? 5 : -5, 0],
                opacity: [0.2 + (i % 3) * 0.1, 0.6 + (i % 3) * 0.1, 0.2 + (i % 3) * 0.1],
              }}
              transition={{ duration: 3 + i % 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{
                position: 'absolute',
                width: (i % 3 + 2) + 'px',
                height: (i % 3 + 2) + 'px',
                borderRadius: '50%',
                background: i % 3 === 0 ? '#1769FF' : i % 3 === 1 ? '#FF1838' : '#7137FF',
                left: ((i * 6.7 + 3) % 100) + '%',
                top:  ((i * 13.3 + 7) % 100) + '%',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          className="hero-wrap"
          style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '128px 64px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 64 }}
        >

          {/* LEFT */}
          <div style={{ flex: 1, maxWidth: 600 }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
            >
              <div className="pdot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#1769FF' }} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase' }}>
                INDIA'S #1 BGMI TRAINING PLATFORM
              </span>
            </motion.div>

            {/* H1 */}
            {[
              { text: 'WHERE GRIND', grad: false },
              { text: 'BECOMES',     grad: true  },
              { text: 'GREATNESS.',  grad: false },
            ].map((line, i) => (
              <motion.div
                key={line.text}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  className="hero-h1"
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 900,
                    fontSize: 88,
                    lineHeight: 0.90,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginBottom: i < 2 ? 2 : 0,
                    ...(line.grad ? G : { color: '#111827' }),
                  }}
                >
                  {line.text}
                </div>
              </motion.div>
            ))}

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 80, height: 2, background: 'linear-gradient(to right, #1769FF, transparent)', marginTop: 24, marginBottom: 24, transformOrigin: 'left' }}
            />

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hero-desc"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6, color: '#536174', maxWidth: 520, margin: 0 }}
            >
              India's first BGMI training and strategy platform. Structured roadmap, AI coaching, and real-time match analytics to take you from casual to competitive.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hero-btns"
              style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}
            >
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(23,105,255,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="hero-btn"
                  style={{ background: '#0B1220', color: 'white', padding: '14px 32px', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  JOIN NOW — ₹149/MONTH →
                </motion.button>
              </Link>

              <Link to="/features" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -3, borderColor: '#1769FF', color: '#1769FF' }}
                  whileTap={{ scale: 0.97 }}
                  className="hero-btn"
                  style={{ background: 'white', color: '#111827', border: '1.5px solid #DCE4EF', padding: '14px 32px', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                >
                  EXPLORE FEATURES →
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{ display: 'flex', gap: 0, marginTop: 48, flexWrap: 'wrap', alignItems: 'center' }}
            >
              {HERO_STATS.map((s, i) => (
                <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: 1, height: 40, background: '#DCE4EF', flexShrink: 0 }} />}
                  <div style={{ paddingLeft: i === 0 ? 0 : 32, paddingRight: 32 }}>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: 1, ...G }}>
                      {s.num}
                    </div>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.15em', color: '#536174', marginTop: 4, textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — hero image */}
          <div
            className="hero-right"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 0 }} />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <img
                  src="/hero-art.png"
                  alt="Esports Elite"
                  style={{ width: '100%', maxWidth: 500, display: 'block', filter: 'drop-shadow(0 20px 60px rgba(23,105,255,0.3)) drop-shadow(0 0 40px rgba(255,24,56,0.15))' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — FEATURE STRIP
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '20px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {[
            { Icon: Map,       label: 'MAP KNOWLEDGE'  },
            { Icon: Brain,     label: 'AI COACH'       },
            { Icon: BarChart2, label: 'MATCH LOGGER'   },
            { Icon: PenTool,   label: 'STRATEGY MAKER' },
          ].map(({ Icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              <Icon size={16} color="#1769FF" strokeWidth={1.8} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', color: '#536174', textTransform: 'uppercase' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — FEATURES GRID
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '128px 0' }}>
        <div className="feat-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>

          {/* Heading */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <div className="section-heading" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 72, color: '#111827', lineHeight: 0.9, textTransform: 'uppercase' }}>
              BUILT FOR
            </div>
            <div className="section-heading" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 72, lineHeight: 0.9, textTransform: 'uppercase', ...G }}>
              CHAMPIONS
            </div>
            <div style={{ width: 60, height: 2, background: 'linear-gradient(to right, #1769FF, #FF1838)', margin: '24px auto 0' }} />
          </motion.div>

          {/* 2×2 grid */}
          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(7,17,31,0.1)', borderColor: 'rgba(23,105,255,0.15)', transition: { duration: 0.3 } }}
                style={{ background: 'white', border: '1px solid #DCE4EF', borderRadius: 16, padding: 40, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 24px rgba(7,17,31,0.06)', cursor: 'default' }}
              >
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: f.accent }} />

                {/* Big bg number */}
                <div style={{ position: 'absolute', top: 16, right: 24, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 100, color: '#F0F4F8', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                  {f.num}
                </div>

                {/* Icon wrapper */}
                <div style={{ width: 52, height: 52, borderRadius: 12, background: f.iconBg, border: `1px solid ${f.iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <f.Icon size={24} color={f.color} />
                </div>

                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 28, color: '#111827', letterSpacing: '0.01em' }}>
                  {f.title}
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6, color: '#536174', marginTop: 12, marginBottom: 0 }}>
                  {f.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
                  <motion.div whileHover={{ x: 4 }} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                    <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.15em', color: f.color, textTransform: 'uppercase' }}>
                      EXPLORE
                    </span>
                    <ChevronRight size={14} color={f.color} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — STATS BAND
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '80px 0' }}>
        <div className="stats-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', display: 'flex', flexWrap: 'wrap' }}>
          {STATS_BAND.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: 1, textAlign: 'center', padding: '32px 16px', borderRight: i < 3 ? '1px solid #DCE4EF' : 'none', minWidth: 180 }}
            >
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 56, lineHeight: 1, ...G }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', marginTop: 8 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — ROADMAP TEASER
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '128px 0' }}>
        <div className="road-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }}>

          {/* Heading */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#FF1838', textTransform: 'uppercase', margin: '0 0 12px' }}>
              THE JOURNEY
            </p>
            <div className="section-heading" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 72, color: '#111827', lineHeight: 0.9, textTransform: 'uppercase' }}>
              10 STAGES.
            </div>
            <div className="section-heading" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 72, lineHeight: 0.9, textTransform: 'uppercase', ...G }}>
              ONE OBJECTIVE.
            </div>
          </motion.div>

          {/* 3 cards */}
          <div className="road-cards" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {ROADMAP.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={Object.keys(c.hover).length ? { ...c.hover, transition: { duration: 0.3 } } : {}}
                style={{ flex: 1, minWidth: 280, borderRadius: 16, padding: 32, background: c.bg, border: `1px solid ${c.bdr}`, position: 'relative', overflow: 'hidden', cursor: 'default' }}
              >
                {/* Corner decoration */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, background: c.corner, pointerEvents: 'none' }} />

                {/* Badge */}
                <span style={{
                  background: c.badgeBg, color: c.badgeColor,
                  border: c.badgeBdr,
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em',
                  padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 16,
                  textTransform: 'uppercase',
                }}>
                  {c.badge}
                </span>

                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', color: c.rangeColor, margin: '0 0 8px', textTransform: 'uppercase' }}>
                  {c.range}
                </p>

                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 32, color: c.titleColor, margin: '0 0 16px', textTransform: 'uppercase' }}>
                  {c.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.items.map(item => (
                    <p key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: c.itemColor, margin: 0 }}>
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View full roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <Link to="/roadmap" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#1769FF', textDecoration: 'none', letterSpacing: '0.03em' }}>
              VIEW FULL ROADMAP →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="cta-sect" style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>

        {/* Glows */}
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'min(40vw,400px)', color: 'white', opacity: 0.015, pointerEvents: 'none', userSelect: 'none', lineHeight: 1, whiteSpace: 'nowrap' }}>
          EE
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cta-h" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 88, color: 'white', lineHeight: 0.92, textTransform: 'uppercase' }}>
              READY TO
            </div>
            <div className="cta-h" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 88, lineHeight: 0.92, textTransform: 'uppercase', ...G }}>
              DOMINATE?
            </div>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#AAB8C8', marginTop: 16 }}>
              Join India's most serious BGMI training platform
            </p>

            <Link to="/pricing" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 60px rgba(23,105,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: 40, background: 'linear-gradient(135deg, #1769FF, #FF1838)', color: 'white', padding: '18px 56px', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, border: 'none', cursor: 'pointer', display: 'inline-block' }}
              >
                JOIN NOW — ₹149/MONTH →
              </motion.button>
            </Link>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>
              GST inclusive · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
