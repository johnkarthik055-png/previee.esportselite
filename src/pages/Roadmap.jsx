import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, Check, Gamepad2, Target, Brain, Trophy,
  Settings, Move, Zap, Calendar, BookOpen, Dumbbell,
  ClipboardCheck, BarChart2, TrendingUp, ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ─── Gradient text style ─── */
const G = {
  background: 'linear-gradient(90deg, #1769FF, #7137FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}
const GB = {
  background: 'linear-gradient(90deg, #1769FF, #4A8AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}
const GR = {
  background: 'linear-gradient(90deg, #C62DCE, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

/* ─── Ease curve ─── */
const E = [0.23, 1, 0.32, 1]

/* ─── Stage data ─── */
const STAGES = [
  { n: '01', accent: '#1769FF', bg: '#EEF5FF', label: 'STAGE 01', name: 'Foundation', sub: 'Build Your Base',           skills: ['Controls', 'Sensitivity', 'Movement', 'Camera', 'Gyroscope'] },
  { n: '02', accent: '#1769FF', bg: '#EEF5FF', label: 'STAGE 02', name: 'Aim Fundamentals', sub: 'Build Reliable Aim',  skills: ['Crosshair', 'ADS', 'Tracking', 'Flicks', 'Switching'] },
  { n: '03', accent: '#4A8AFF', bg: '#EEF5FF', label: 'STAGE 03', name: 'Recoil & Spray', sub: 'Control Your Weapons',  skills: ['Patterns', 'Spray', 'Burst', 'Familiarity', 'Distance'] },
  { n: '04', accent: '#7137FF', bg: '#F0EAFF', label: 'STAGE 04', name: 'Close-Range', sub: 'Win The Fight',            skills: ['Pre-fire', 'Peek', 'Hip fire', 'Movement', 'Timing'] },
  { n: '05', accent: '#7137FF', bg: '#F0EAFF', label: 'STAGE 05', name: 'Game Sense', sub: 'Make Better Decisions',     skills: ['Information', 'Timing', 'Risk', 'Prediction', 'Position'] },
  { n: '06', accent: '#9B3FFF', bg: '#F0EAFF', label: 'STAGE 06', name: 'Strategy', sub: 'Control The Game',            skills: ['Zone', 'Rotations', 'Position', 'Control', 'Fallback'] },
  { n: '07', accent: '#C62DCE', bg: '#FDF0FF', label: 'STAGE 07', name: 'Teamplay', sub: 'Play As One',                 skills: ['Communication', 'Roles', 'Trading', 'Spacing', 'Movement'] },
  { n: '08', accent: '#C62DCE', bg: '#FDF0FF', label: 'STAGE 08', name: 'Competitive', sub: 'Perform Under Pressure',   skills: ['Scrims', 'Adaptation', 'Pressure', 'Review', 'Clutch'] },
  { n: '09', accent: '#FF1838', bg: '#FFF0F2', label: 'STAGE 09', name: 'Advanced Meta', sub: 'Read The Game',          skills: ['Meta', 'Positioning', 'Gunfight selection', 'Timing', 'Adaptation'] },
  { n: '10', accent: '#FF1838', bg: '#FFF0F2', label: 'STAGE 10', name: 'Go Elite', sub: 'Become Tournament Ready',     skills: ['Consistency', 'Decisions', 'Execution', 'Analysis', 'Growth'] },
]

/* ─── Section-level eyebrow divider ─── */
function SectionEyebrow({ left, text, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
      {left && <div style={{ width: 60, height: 1, background: left }} />}
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase' }}>{text}</span>
      {right && <div style={{ width: 60, height: 1, background: right }} />}
    </div>
  )
}

/* ─── Small tagline row ─── */
function Tagline({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 48 }}>
      <div style={{ width: 80, height: 1, background: '#DCE4EF' }} />
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.3em', color: '#9BAABB', textTransform: 'uppercase' }}>{text}</span>
      <div style={{ width: 80, height: 1, background: '#DCE4EF' }} />
    </div>
  )
}

export default function Roadmap() {
  const [activeStage, setActiveStage] = useState(null)

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section style={{ minHeight: '75vh', background: '#FFFFFF', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', paddingTop: 64 }}>
        {/* Blue glow */}
        <div style={{ position: 'absolute', left: -200, top: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.09) 0%,transparent 60%)', pointerEvents: 'none' }} />
        {/* Red glow */}
        <div style={{ position: 'absolute', right: -200, bottom: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
        {/* Top-left shard */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 380, clipPath: 'polygon(0 0,100% 0,55% 100%,0 85%)', background: '#1769FF', opacity: 0.05, pointerEvents: 'none' }} />
        {/* Top-right shard */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 260, height: 340, clipPath: 'polygon(45% 0,100% 0,100% 85%,0 100%)', background: '#FF1838', opacity: 0.05, pointerEvents: 'none' }} />
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
        {/* Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'min(20vw,200px)', color: '#111827', opacity: 0.02, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>ROADMAP</div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '128px 64px', position: 'relative', zIndex: 1, width: '100%' }} className="hero-inner">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 2, background: '#1769FF', borderRadius: 1 }} />
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase' }}>YOUR JOURNEY STARTS HERE</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.08 }} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.01em', margin: 0 }} className="hero-h1">
            <span style={{ color: '#111827', display: 'block' }}>A CLEAR ROADMAP</span>
            <span style={{ display: 'inline' }}>TO </span><span style={G}>GREATNESS</span>
          </motion.h1>

          {/* Desc */}
          <motion.p initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.16 }} style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#536174', maxWidth: 580, marginTop: 20, lineHeight: 1.65 }} className="hero-desc">
            Stop guessing what to practice. Esports Elite gives you a structured path from foundational mechanics to competitive-level performance.
          </motion.p>

          {/* Pills */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.24 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
            {['STRUCTURED LEARNING', 'MEASURABLE PROGRESS', 'COMPETITIVE READY', 'CONSISTENT GROWTH'].map((pill) => (
              <motion.div key={pill} whileHover={{ background: '#FFFFFF', boxShadow: '0 4px 16px rgba(7,17,31,0.08)', y: -2 }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F7F9FC', border: '1px solid #DCE4EF', padding: '8px 16px', borderRadius: 20, cursor: 'default' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1769FF', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: '#536174', textTransform: 'uppercase' }}>{pill}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.32 }} style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }} className="hero-btns">
            <Link to="/pricing" style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                fill="#0B1220" hoverFill="#1769FF"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 8, background: '#0B1220', border: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF', cursor: 'pointer' }}
              >
                START YOUR JOURNEY <ArrowRight size={16} strokeWidth={2.5} />
              </RadialRevealButton>
            </Link>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 8, background: '#FFFFFF', border: '1.5px solid #DCE4EF', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#111827', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}>
              ▶ WATCH HOW IT WORKS
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — PLAYER PROGRESSION 4 CARDS
      ══════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '96px 0' }} className="sect-prog">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="inner-prog">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionEyebrow
              left="linear-gradient(to right,#1769FF,#7137FF)"
              text="PLAYER PROGRESSION"
              right="linear-gradient(to left,#FF1838,#7137FF)"
            />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em', margin: 0 }} className="prog-h2">
              FROM PLAYER TO <span style={G}>COMPETITOR</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', marginTop: 16 }}>A structured path. Real improvement. Measurable results.</p>
          </motion.div>

          {/* 4 Cards */}
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }} className="prog-cards">
            {[
              { accent: '#1769FF', num: '01', Icon: Gamepad2, title: 'FOUNDATION',  desc: 'Build the fundamentals.' },
              { accent: '#4A8AFF', num: '02', Icon: Target,   title: 'MECHANICS',   desc: 'Build mechanical consistency.' },
              { accent: '#7137FF', num: '03', Icon: Brain,    title: 'GAME IQ',     desc: 'Understand situations and decisions.' },
              { accent: '#FF1838', num: '04', Icon: Trophy,   title: 'COMPETITION', desc: 'Perform under pressure.' },
            ].map((card, i, arr) => (
              <div key={card.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }} className="prog-card-wrap">
                <motion.div
                  initial={{ opacity: 0, transform: 'translateY(30px)' }}
                  whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: E, delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(7,17,31,0.08)', zIndex: 1 }}
                  style={{ flex: 1, background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: i === 0 ? '16px 0 0 16px' : i === arr.length - 1 ? '0 16px 16px 0' : 0, padding: 32, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s' }}
                  className="prog-card"
                >
                  {/* Top accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.accent }} />
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 13, color: card.accent, opacity: 0.6, letterSpacing: '0.1em', marginBottom: 8 }}>0{i + 1}</div>
                  <card.Icon size={32} strokeWidth={1.8} color={card.accent} style={{ marginBottom: 12 }} />
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 24, color: '#111827' }}>{card.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#536174', marginTop: 8 }}>{card.desc}</div>
                </motion.div>
                {i < arr.length - 1 && (
                  <ChevronRight size={20} color="#DCE4EF" strokeWidth={2} style={{ flexShrink: 0 }} className="prog-chevron" />
                )}
              </div>
            ))}
          </div>

          <Tagline text="WHERE GRIND BECOMES GREATNESS" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — BUILD THE FOUNDATION FIRST
      ══════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '96px 0' }} className="sect-found">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="inner-found">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionEyebrow
              left="linear-gradient(to right,#1769FF,#7137FF)"
              text="BEFORE YOU START"
              right="linear-gradient(to left,#FF1838,#7137FF)"
            />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em', margin: 0 }} className="found-h2">
              BUILD THE <span style={GB}>FOUNDATION</span> <span style={GR}>FIRST</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', maxWidth: 700, margin: '16px auto 0', lineHeight: 1.65 }}>
              Elite performance starts with fundamentals. Make sure your setup, mechanics and habits are ready before chasing advanced skills.
            </p>
          </motion.div>

          {/* 6 Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="found-grid">
            {[
              { n: '01', accent: '#1769FF', Icon: Settings,  title: 'DEVICE & SETTINGS',  bullets: ['Stable FPS', 'Correct sensitivity', 'Gyroscope setup', 'Comfortable controls'] },
              { n: '02', accent: '#4A8AFF', Icon: Move,      title: 'CONTROL & MOVEMENT', bullets: ['Movement basics', 'Camera control', 'Peeking', 'Positioning'] },
              { n: '03', accent: '#7137FF', Icon: Target,    title: 'AIM FUNDAMENTALS',   bullets: ['Crosshair placement', 'ADS control', 'Tracking', 'Flick control'] },
              { n: '04', accent: '#9B3FFF', Icon: Zap,       title: 'RECOIL CONTROL',     bullets: ['Weapon patterns', 'Spray control', 'Burst discipline', 'Vertical recoil'] },
              { n: '05', accent: '#C62DCE', Icon: Calendar,  title: 'GAME ROUTINE',       bullets: ['Consistent practice', 'Warm-up routine', 'Review sessions', 'Recovery'] },
              { n: '06', accent: '#FF1838', Icon: Brain,     title: 'MENTAL DISCIPLINE',  bullets: ['Patience', 'Decision making', 'Composure', 'Learning mindset'] },
            ].map((card, i) => (
              <motion.div
                key={card.n}
                initial={{ opacity: 0, transform: 'translateY(30px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: E, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(7,17,31,0.08)', borderColor: 'rgba(23,105,255,0.1)' }}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s, box-shadow 0.25s' }}
              >
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.accent }} />
                {/* Background number */}
                <div style={{ position: 'absolute', top: 8, left: 20, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 36, color: card.accent, opacity: 0.25, pointerEvents: 'none', userSelect: 'none' }}>{card.n}</div>
                <card.Icon size={28} strokeWidth={1.8} color={card.accent} style={{ marginTop: 32, marginBottom: 12, display: 'block' }} />
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, color: '#111827' }}>{card.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  {card.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={13} color="#1769FF" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.15em', color: card.accent, marginTop: 16, cursor: 'pointer', textTransform: 'uppercase' }}>LEARN MORE →</div>
              </motion.div>
            ))}
          </div>

          <Tagline text="SMALL HABITS. BIGGER RESULTS." />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — 10 STAGES VERTICAL TIMELINE
      ══════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }} className="sect-timeline">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="inner-timeline">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>THE PATH</div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em', margin: 0 }} className="timeline-h2">
              10 STAGES. <span style={G}>ONE OBJECTIVE.</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', marginTop: 16, lineHeight: 1.65 }}>Every stage builds on the previous one. Learn the skill, train it, prove it, then move forward.</p>
          </motion.div>

          {/* Timeline container */}
          <div style={{ position: 'relative' }} className="timeline-wrap">
            {/* Center line */}
            <div className="timeline-line" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#1769FF,#7137FF 50%,#FF1838)', pointerEvents: 'none' }} />

            {STAGES.map((s, i) => {
              const isLeft = i % 2 === 0
              const isActive = activeStage === i

              return (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center', minHeight: 110, position: 'relative', marginBottom: 8 }} className="timeline-row">
                  {/* Left side */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 32 }} className="tl-left">
                    {isLeft && (
                      <motion.div
                        initial={{ opacity: 0, transform: 'translateX(-40px)' }}
                        whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: E, delay: i * 0.08 }}
                        whileHover={{ y: -3, borderColor: s.accent, boxShadow: '0 8px 30px rgba(7,17,31,0.08)' }}
                        onClick={() => setActiveStage(isActive ? null : i)}
                        style={{ maxWidth: 380, width: '100%', background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.25s' }}
                      >
                        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: s.accent, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 22, color: '#111827', lineHeight: 1 }}>{s.name}</div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', marginTop: 4 }}>{s.sub}</div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              key="chips"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                                {s.skills.map((sk) => (
                                  <span key={sk} style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}26`, padding: '4px 10px', borderRadius: 20, fontFamily: 'Inter, sans-serif', fontSize: 12, color: s.accent }}>{sk}</span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>

                  {/* Center node */}
                  <div style={{ flexShrink: 0, width: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} className="tl-node-wrap">
                    {i === 9 && (
                      <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 14, color: '#FF1838' }}>♛</div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      animate={isActive ? { scale: 1.15, boxShadow: `0 0 30px ${s.accent}66` } : { scale: 1, boxShadow: `0 0 20px ${s.accent}33` }}
                      transition={{ duration: 0.2, ease: E }}
                      style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid ${s.accent}`, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                      onClick={() => setActiveStage(isActive ? null : i)}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 14, color: '#fff' }}>{s.n}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right side */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: 32 }} className="tl-right">
                    {!isLeft && (
                      <motion.div
                        initial={{ opacity: 0, transform: 'translateX(40px)' }}
                        whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease: E, delay: i * 0.08 }}
                        whileHover={{ y: -3, borderColor: s.accent, boxShadow: '0 8px 30px rgba(7,17,31,0.08)' }}
                        onClick={() => setActiveStage(isActive ? null : i)}
                        style={{ maxWidth: 380, width: '100%', background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.25s' }}
                      >
                        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: s.accent, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 22, color: '#111827', lineHeight: 1 }}>{s.name}</div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', marginTop: 4 }}>{s.sub}</div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              key="chips"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                                {s.skills.map((sk) => (
                                  <span key={sk} style={{ background: `${s.accent}14`, border: `1px solid ${s.accent}26`, padding: '4px 10px', borderRadius: 20, fontFamily: 'Inter, sans-serif', fontSize: 12, color: s.accent }}>{sk}</span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — DEVELOPMENT LOOP
      ══════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF', padding: '96px 0' }} className="sect-loop">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="inner-loop">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 60, height: 1, background: '#1769FF' }} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase' }}>THE DEVELOPMENT LOOP</span>
              <div style={{ width: 60, height: 1, background: '#FF1838' }} />
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em', margin: 0 }} className="loop-h2">
              LEARN → PRACTICE → ASSESS → <span style={G}>IMPROVE</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', marginTop: 16, lineHeight: 1.65 }}>Every stage runs the same cycle. Finish it and the next stage unlocks.</p>
          </motion.div>

          {/* 5 loop cards */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }} className="loop-cards">
            {[
              { step: 'STEP 01', accent: '#1769FF', Icon: BookOpen,      title: 'LEARN',     desc: 'Real material per stage — structured lessons built around what you actually need.', bottom: 'BUILD KNOWLEDGE' },
              { step: 'STEP 02', accent: '#4A8AFF', Icon: Dumbbell,      title: 'PRACTICE',  desc: 'Structured drills directly linked to the concept you just studied.', bottom: 'DEVELOP CONSISTENCY' },
              { step: 'STEP 03', accent: '#7137FF', Icon: ClipboardCheck, title: 'ASSESS',   desc: 'A scored assessment — not a quiz for the sake of it. Real feedback.', bottom: 'ANALYZE & ADJUST' },
              { step: 'STEP 04', accent: '#C62DCE', Icon: BarChart2,     title: 'RESULT',    desc: 'An honest read on where you stand based on your actual performance.', bottom: 'TRACK PROGRESS' },
              { step: 'STEP 05', accent: '#FF1838', Icon: TrendingUp,    title: 'NEXT STEP', desc: 'A specific weakness to work on before the next stage unlocks.', bottom: 'KEEP EVOLVING' },
            ].map((card, i, arr) => (
              <div key={card.step} style={{ display: 'flex', alignItems: 'center', flex: 1 }} className="loop-card-wrap">
                <motion.div
                  initial={{ opacity: 0, transform: 'translateY(30px)' }}
                  whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: E, delay: i * 0.1 }}
                  whileHover={{ y: -5, borderColor: card.accent, boxShadow: '0 16px 48px rgba(7,17,31,0.1)' }}
                  style={{ flex: 1, background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, box-shadow 0.25s' }}
                  className="loop-card"
                >
                  {/* Top accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.accent }} />
                  {/* Big bg number */}
                  <div style={{ position: 'absolute', top: 8, right: 12, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 64, color: '#F7F9FC', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>

                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: card.accent, textTransform: 'uppercase', marginBottom: 8 }}>{card.step}</div>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${card.accent}1A`, border: `1px solid ${card.accent}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <card.Icon size={22} color={card.accent} strokeWidth={2} />
                  </div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 22, color: '#111827' }}>{card.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#536174', lineHeight: 1.6, marginTop: 8, flex: 1 }}>{card.desc}</div>
                  <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #DCE4EF', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#9BAABB', textTransform: 'uppercase' }}>{card.bottom}</div>
                </motion.div>
                {i < arr.length - 1 && (
                  <div style={{ flexShrink: 0, padding: '0 4px' }} className="loop-arrow">
                    <ArrowRight size={16} color="#DCE4EF" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E, delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { num: '10K+', label: 'Players on the journey' },
              { num: '10',   label: 'Structured stages' },
              { num: '1',    label: 'Clear objective' },
            ].map((stat, i, arr) => (
              <div key={stat.num} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 48px', textAlign: 'center' }} className="stat-item">
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 44, ...G }}>{stat.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', marginTop: 4 }}>{stat.label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, height: 56, background: '#DCE4EF', flexShrink: 0 }} />}
              </div>
            ))}
          </motion.div>

          <Tagline text="CONSISTENT EFFORT CREATES ELITE PLAYERS" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — CTA
      ══════════════════════════════════════════ */}
      <section style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }} className="sect-cta">
        {/* Blue glow */}
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        {/* Red glow */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }}>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.01em', margin: 0 }} className="cta-h2">
              <span style={{ color: '#FFFFFF', display: 'block' }}>ARE YOU READY TO</span>
              <span style={G}>GO ELITE?</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#AAB8C8', marginTop: 16, lineHeight: 1.65 }} className="cta-desc">
              Master the fundamentals. Build your mechanics. Understand the game. Execute under pressure.
            </p>
            <div style={{ marginTop: 40 }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  fill="#FFFFFF" hoverFill="#1769FF"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '18px 56px', borderRadius: 8, background: '#FFFFFF', border: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18, color: '#0B1220', cursor: 'pointer' }}
                >
                  JOIN NOW — ₹149/MONTH <ArrowRight size={18} strokeWidth={2.5} />
                </RadialRevealButton>
              </Link>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>GST inclusive · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Hero responsive ── */
        .hero-inner { padding: 128px 64px !important; }
        .hero-h1    { font-size: 80px; }
        .hero-desc  { font-size: 18px; }
        .hero-btns  { flex-direction: row; }

        /* ── Section headings responsive ── */
        .prog-h2, .found-h2, .timeline-h2, .loop-h2, .cta-h2 { font-size: 64px; }

        /* ── Timeline mobile ── */
        @media (max-width: 768px) {
          .hero-inner  { padding: 80px 20px !important; }
          .hero-h1     { font-size: 44px !important; }
          .hero-desc   { font-size: 16px !important; }
          .hero-btns   { flex-direction: column !important; }
          .inner-prog, .inner-found, .inner-timeline, .inner-loop { padding: 0 20px !important; }
          .sect-prog, .sect-found, .sect-timeline, .sect-loop { padding: 64px 0 !important; }
          .prog-h2, .found-h2, .timeline-h2, .cta-h2 { font-size: 36px !important; }
          .loop-h2     { font-size: 32px !important; }
          .cta-h2      { font-size: 44px !important; }
          .cta-desc    { font-size: 16px !important; }

          /* Progression cards: stack */
          .prog-cards  { flex-direction: column !important; }
          .prog-card   { border-radius: 16px !important; }
          .prog-chevron { display: none !important; }
          .prog-card-wrap { flex: none !important; }

          /* Foundation grid: 1 col */
          .found-grid  { grid-template-columns: 1fr !important; }

          /* Timeline: single column left-aligned */
          .timeline-line { left: 20px !important; transform: none !important; }
          .tl-left  { flex: none !important; padding-right: 0 !important; display: block !important; }
          .tl-right { flex: 1 !important; padding-left: 12px !important; }
          .tl-node-wrap { flex-shrink: 0 !important; }
          .timeline-row { align-items: flex-start !important; padding-left: 0 !important; }

          /* Loop cards: stack */
          .loop-cards    { flex-direction: column !important; }
          .loop-card-wrap { flex: none !important; }
          .loop-arrow    { display: none !important; }

          /* Stats */
          .stat-item { padding: 0 24px !important; }
        }

        /* ── Reduce motion ── */
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </>
  )
}
