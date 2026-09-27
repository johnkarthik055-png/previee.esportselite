import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Map, Brain, BarChart2, PenTool } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ── Gradient text styles ── */
const gBlueRed = { background: 'linear-gradient(90deg,#1769FF,#FF1838)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
const gFull    = { background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }

/* ── Stagger helpers ── */
const fadeUpVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
}

/* ── 15 ambient particles with stable values (no Math.random in render) ── */
const PARTICLES = [
  { w:3, h:3, bg:'#1769FF', op:0.35, l:'8%',  t:'15%', dur:'4.2s', del:'0s'   },
  { w:2, h:2, bg:'#FF1838', op:0.28, l:'18%', t:'72%', dur:'3.5s', del:'0.8s' },
  { w:4, h:4, bg:'#7137FF', op:0.25, l:'27%', t:'38%', dur:'5.1s', del:'0.3s' },
  { w:2, h:2, bg:'#1769FF', op:0.32, l:'35%', t:'85%', dur:'3.8s', del:'1.2s' },
  { w:3, h:3, bg:'#FF1838', op:0.30, l:'44%', t:'22%', dur:'4.6s', del:'0.5s' },
  { w:2, h:2, bg:'#7137FF', op:0.22, l:'52%', t:'60%', dur:'3.2s', del:'1.5s' },
  { w:4, h:4, bg:'#1769FF', op:0.20, l:'61%', t:'11%', dur:'5.4s', del:'0.7s' },
  { w:3, h:3, bg:'#FF1838', op:0.35, l:'70%', t:'78%', dur:'4.0s', del:'0.2s' },
  { w:2, h:2, bg:'#7137FF', op:0.28, l:'79%', t:'45%', dur:'3.6s', del:'1.0s' },
  { w:3, h:3, bg:'#1769FF', op:0.25, l:'88%', t:'30%', dur:'4.8s', del:'0.4s' },
  { w:4, h:4, bg:'#FF1838', op:0.20, l:'14%', t:'55%', dur:'5.0s', del:'1.8s' },
  { w:2, h:2, bg:'#1769FF', op:0.38, l:'23%', t:'88%', dur:'3.3s', del:'0.6s' },
  { w:3, h:3, bg:'#7137FF', op:0.30, l:'56%', t:'92%', dur:'4.4s', del:'1.3s' },
  { w:2, h:2, bg:'#FF1838', op:0.22, l:'75%', t:'5%',  dur:'3.7s', del:'0.9s' },
  { w:4, h:4, bg:'#1769FF', op:0.18, l:'93%', t:'65%', dur:'5.2s', del:'1.6s' },
]

/* ── Feature cards data ── */
const FEATURES = [
  {
    num: '01', Icon: Map, color: '#1769FF', bg: '#EEF5FF', borderColor: 'rgba(23,105,255,0.15)',
    title: 'MAP KNOWLEDGE',
    desc: 'Explore every drop zone on Erangel, Miramar and Rondo with interactive tactical overlays and rotation paths.',
  },
  {
    num: '02', Icon: Brain, color: '#7137FF', bg: '#F0EAFF', borderColor: 'rgba(113,55,255,0.15)',
    title: 'AI COACH',
    desc: 'Get personalized feedback on every match from your stats screenshot using advanced AI analysis.',
  },
  {
    num: '03', Icon: BarChart2, color: '#00C48C', bg: '#E8FFF6', borderColor: 'rgba(0,196,140,0.15)',
    title: 'MATCH LOGGER',
    desc: 'Track your K/D and stats automatically with AI-powered screenshot import and performance history.',
  },
  {
    num: '04', Icon: PenTool, color: '#FF1838', bg: '#FFF0F2', borderColor: 'rgba(255,24,56,0.15)',
    title: 'STRATEGY MAKER',
    desc: 'Draw and save custom squad strategies on interactive maps in real time. Share with your team.',
  },
]

/* ── Stats ── */
const STATS = [
  { num: '10K+', label: 'Players Training' },
  { num: '4',    label: 'Maps Covered'    },
  { num: 'AI',   label: 'Powered Coach'   },
]

/* ── Roadmap teaser data ── */
const ROADMAP_CARDS = [
  {
    badge: 'LIVE NOW', badgeBg: 'rgba(23,105,255,0.12)', badgeColor: '#1769FF',
    range: '01–03', rangeColor: '#1769FF',
    title: 'FOUNDATION',
    bg: '#EEF5FF', border: 'rgba(23,105,255,0.2)',
    hoverShadow: 'rgba(23,105,255,0.12)',
    items: ['→ Map Knowledge', '→ Match Logger', '→ Strategy Maker'],
    itemColor: '#536174',
    titleColor: '#111827',
    dir: -60,
  },
  {
    badge: 'IN PROGRESS', badgeBg: '#F7F9FC', badgeColor: '#9BAABB',
    range: '04–07', rangeColor: '#9BAABB',
    title: 'INTELLIGENCE',
    bg: '#F7F9FC', border: '#DCE4EF',
    hoverShadow: 'rgba(7,17,31,0.08)',
    items: ['→ AI Coach', '→ Game Sense', '→ Strategy'],
    itemColor: '#C0CAD6',
    titleColor: '#9BAABB',
    dir: 0,
  },
  {
    badge: 'COMING SOON', badgeBg: 'rgba(255,24,56,0.1)', badgeColor: '#FF1838',
    range: '08–10', rangeColor: '#FF1838',
    title: 'DOMINATION',
    bg: '#FFF0F2', border: 'rgba(255,24,56,0.2)',
    hoverShadow: 'rgba(255,24,56,0.1)',
    items: ['→ Teamplay', '→ Performance', '→ Go Elite'],
    itemColor: '#536174',
    titleColor: '#111827',
    dir: 60,
  },
]

export default function Home() {
  return (
    <>
      <Navbar activePage="home" />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', background: '#FFFFFF', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        {/* Background layers */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Blue glow */}
          <div className="glow-blue" style={{ position: 'absolute', left: -200, top: -200, width: 700, height: 700, background: 'radial-gradient(circle, rgba(23,105,255,0.1) 0%, transparent 60%)', borderRadius: '50%' }} />
          {/* Red glow */}
          <div className="glow-red" style={{ position: 'absolute', right: -200, bottom: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,24,56,0.08) 0%, transparent 60%)', borderRadius: '50%' }} />

          {/* Corner shards */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: 360, background: '#1769FF', opacity: 0.06, clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 80%)' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: 260, height: 320, background: '#FF1838', opacity: 0.06, clipPath: 'polygon(40% 0, 100% 0, 100% 80%, 0 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 200, height: 260, background: '#1769FF', opacity: 0.04, clipPath: 'polygon(0 20%, 80% 0, 100% 100%, 0 100%)' }} />

          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #DCE4EF 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5 }} />

          {/* Floating particles */}
          {PARTICLES.map((p, i) => (
            <div key={i} style={{ position: 'absolute', width: p.w, height: p.h, borderRadius: '50%', background: p.bg, opacity: p.op, left: p.l, top: p.t, animation: `particle-drift ${p.dur} ease-in-out ${p.del} infinite` }} />
          ))}
        </div>

        {/* Left vertical microcopy */}
        <div style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', writingMode: 'vertical-rl', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#C0CAD6', userSelect: 'none', pointerEvents: 'none' }} className="vert-side">
          TRAIN · ANALYZE · DOMINATE
        </div>

        {/* Main grid */}
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 64px', display: 'flex', alignItems: 'center', gap: 64, position: 'relative', zIndex: 2 }} className="hero-inner">

          {/* ── LEFT: copy ── */}
          <div style={{ flex: 1, maxWidth: 600 }}>

            {/* Eyebrow */}
            <motion.div
              initial="hidden" animate="visible" custom={0} variants={fadeUpVariants}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
            >
              <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#1769FF', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase' }}>
                INDIA'S #1 BGMI TRAINING PLATFORM
              </span>
            </motion.div>

            {/* H1 — 3 staggered lines */}
            {['WHERE GRIND', 'BECOMES', 'GREATNESS.'].map((line, i) => (
              <motion.div
                key={line}
                initial="hidden" animate="visible" custom={i + 1} variants={fadeUpVariants}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 7vw, 88px)',
                  lineHeight: 0.90,
                  letterSpacing: '-0.02em',
                  color: i === 1 ? 'transparent' : '#111827',
                  background: i === 1 ? 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)' : undefined,
                  WebkitBackgroundClip: i === 1 ? 'text' : undefined,
                  WebkitTextFillColor: i === 1 ? 'transparent' : undefined,
                  backgroundClip: i === 1 ? 'text' : undefined,
                  textTransform: 'uppercase',
                  marginBottom: i < 2 ? 4 : 0,
                }}>
                  {line}
                </div>
              </motion.div>
            ))}

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 80, height: 2, background: 'linear-gradient(to right, #1769FF, transparent)', marginTop: 24, marginBottom: 24, transformOrigin: 'left' }}
            />

            {/* Description */}
            <motion.p
              initial="hidden" animate="visible" custom={5} variants={fadeUpVariants}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.6, color: '#536174', maxWidth: 520, margin: 0 }}
            >
              India's first BGMI training and strategy platform. Structured roadmap, AI coaching, and real-time match analytics to take you from casual to competitive.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial="hidden" animate="visible" custom={7} variants={fadeUpVariants}
              style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}
            >
              <motion.button
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(23,105,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#0B1220', color: '#FFFFFF', padding: '14px 32px', borderRadius: 8, border: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'box-shadow 0.2s', whiteSpace: 'nowrap' }}
              >
                LAUNCH APP →
              </motion.button>
              <motion.button
                whileHover={{ y: -3, borderColor: '#1769FF' }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#FFFFFF', color: '#111827', padding: '14px 32px', borderRadius: 8, border: '1.5px solid #DCE4EF', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'border-color 0.2s', whiteSpace: 'nowrap' }}
              >
                EXPLORE FEATURES →
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden" animate="visible" custom={9} variants={fadeUpVariants}
              style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 48, flexWrap: 'wrap' }}
            >
              {STATS.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  {i > 0 && <div style={{ width: 1, height: 44, background: '#DCE4EF', margin: '0 32px' }} />}
                  <div style={{ paddingLeft: i === 0 ? 0 : 0 }}>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: 1, background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.num}</div>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.15em', color: '#536174', marginTop: 4, textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: hero image ── */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="hero-img-col">
            {/* Blue glow behind image */}
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)' }} />
            <motion.img
              src="/hero-art.png"
              alt="Esports Elite"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%', maxWidth: 520, position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 20px 60px rgba(23,105,255,0.25)) drop-shadow(0 0 30px rgba(255,24,56,0.15))',
              }}
            />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-inner    { flex-direction: column !important; padding: 100px 20px 60px !important; gap: 0 !important; }
            .hero-img-col  { display: none !important; }
            .vert-side     { display: none !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES STRIP
      ═══════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '20px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { Icon: Map,      label: 'MAP KNOWLEDGE'  },
            { Icon: Brain,    label: 'AI COACH'       },
            { Icon: BarChart2,label: 'MATCH LOGGER'   },
            { Icon: PenTool,  label: 'STRATEGY MAKER' },
          ].map(({ Icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ color: '#111827' }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#536174', transition: 'color 0.2s' }}
            >
              <Icon size={16} color="#1769FF" />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES — 2×2 GRID
      ═══════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '128px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-section-inner">

          {/* Center heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.9, color: '#111827', margin: 0, textTransform: 'uppercase' }}>
              BUILT FOR{' '}
              <span style={gFull}>CHAMPIONS</span>
            </h2>
          </motion.div>

          {/* 2×2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="feat-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(7,17,31,0.1)', transition: { duration: 0.3 } }}
                style={{
                  background: '#FFFFFF', border: '1px solid #DCE4EF',
                  borderRadius: 16, padding: 40, position: 'relative', overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(7,17,31,0.06)',
                  cursor: 'default',
                }}
              >
                {/* Large bg number */}
                <div style={{ position: 'absolute', top: 16, right: 24, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 100, color: '#DCE4EF', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {f.num}
                </div>

                {/* Icon wrapper */}
                <div style={{ width: 52, height: 52, borderRadius: 12, background: f.bg, border: `1px solid ${f.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <f.Icon size={24} color={f.color} />
                </div>

                {/* Title */}
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 28, color: '#111827', letterSpacing: '0.01em', marginBottom: 12 }}>{f.title}</div>

                {/* Desc */}
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6, color: '#536174', margin: 0 }}>{f.desc}</p>

                {/* Arrow */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: f.color, marginTop: 24, cursor: 'pointer', display: 'inline-block' }}
                >→</motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .feat-section-inner { padding: 0 20px !important; }
            .feat-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          STATS
      ═══════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', display: 'flex', flexWrap: 'wrap' }} className="stats-inner">
          {[
            { num: '10K+', label: 'Players Trained'  },
            { num: '50+',  label: 'Pro Strategies'   },
            { num: '4',    label: 'Maps Covered'     },
            { num: 'AI',   label: 'Powered Coach'    },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: 1, minWidth: 200, textAlign: 'center',
                padding: '32px 16px',
                borderRight: i < 3 ? '1px solid #DCE4EF' : 'none',
              }}
            >
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 56, lineHeight: 1, background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.num}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', marginTop: 8 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .stats-inner { padding: 0 20px !important; }
            .stats-inner > div { border-right: none !important; border-bottom: 1px solid #DCE4EF; }
            .stats-inner > div:last-child { border-bottom: none; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          ROADMAP TEASER
      ═══════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '128px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="roadmap-inner">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#FF1838', textTransform: 'uppercase', marginBottom: 16 }}>
              THE JOURNEY
            </p>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>
              <span style={{ color: '#111827' }}>10 STAGES.</span><br />
              <span style={gFull}>ONE OBJECTIVE.</span>
            </h2>
          </motion.div>

          {/* 3 cards */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }} className="roadmap-cards">
            {ROADMAP_CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: c.dir }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: `0 20px 60px ${c.hoverShadow}`, borderColor: i !== 1 ? (i === 0 ? '#1769FF' : '#FF1838') : '#DCE4EF', transition: { duration: 0.3 } }}
                style={{ flex: 1, minWidth: 280, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 16, padding: 32, cursor: 'default', transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                {/* Badge */}
                <span style={{ background: c.badgeBg, color: c.badgeColor, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 16 }}>
                  {c.badge}
                </span>

                {/* Range */}
                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', color: c.rangeColor, margin: '0 0 8px' }}>
                  {c.range}
                </p>

                {/* Title */}
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 32, color: c.titleColor, margin: '0 0 20px', textTransform: 'uppercase' }}>{c.title}</h3>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.items.map(item => (
                    <p key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: c.itemColor, margin: 0 }}>{item}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View full roadmap link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <a href="/roadmap" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#1769FF', textDecoration: 'none', letterSpacing: '0.03em', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              VIEW FULL ROADMAP →
            </a>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .roadmap-inner { padding: 0 20px !important; }
            .roadmap-cards { flex-direction: column !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}
      <section style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Glows */}
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(60px, 8vw, 88px)', lineHeight: 0.9, margin: '0 0 8px', textTransform: 'uppercase', color: '#FFFFFF' }}>
              READY TO
            </h2>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(60px, 8vw, 88px)', lineHeight: 0.9, margin: '0 0 24px', textTransform: 'uppercase', background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              DOMINATE?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#AAB8C8', maxWidth: 480, margin: '0 auto 40px' }}>
              Join India's most serious BGMI training platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -4, boxShadow: '0 20px 60px rgba(23,105,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #1769FF, #FF1838)',
                color: '#FFFFFF', border: 'none', cursor: 'pointer',
                padding: '18px 56px', borderRadius: 8,
                fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18,
                letterSpacing: '0.02em', transition: 'box-shadow 0.2s',
              }}
            >
              JOIN NOW — ₹149/MONTH →
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
