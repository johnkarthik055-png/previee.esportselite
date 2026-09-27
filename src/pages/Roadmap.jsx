import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Check, Gamepad2, Target, Brain, Trophy, Settings, Move, Zap, Calendar, BookOpen, Dumbbell, ClipboardCheck, BarChart2, TrendingUp, ArrowRight, Map } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}
const GB = {
  background: 'linear-gradient(90deg,#1769FF,#4A8AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}
const GR = {
  background: 'linear-gradient(90deg,#C62DCE,#FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const stages = [
  { id: 1,  label: 'STAGE 01', name: 'Foundation',      sub: 'Build Your Base',           color: '#1769FF', chips: ['Controls','Sensitivity','Movement','Camera','Gyroscope'] },
  { id: 2,  label: 'STAGE 02', name: 'Aim Fundamentals', sub: 'Build Reliable Aim',        color: '#1769FF', chips: ['Crosshair','ADS','Tracking','Flicks','Switching'] },
  { id: 3,  label: 'STAGE 03', name: 'Recoil & Spray',  sub: 'Control Your Weapons',      color: '#4A8AFF', chips: ['Patterns','Spray','Burst','Familiarity','Distance'] },
  { id: 4,  label: 'STAGE 04', name: 'Close-Range',     sub: 'Win The Fight',             color: '#7137FF', chips: ['Pre-fire','Peek','Hip fire','Movement','Timing'] },
  { id: 5,  label: 'STAGE 05', name: 'Game Sense',      sub: 'Make Better Decisions',     color: '#7137FF', chips: ['Information','Timing','Risk','Prediction','Position'] },
  { id: 6,  label: 'STAGE 06', name: 'Strategy',        sub: 'Control The Game',          color: '#9B3FFF', chips: ['Zone','Rotations','Position','Control','Fallback'] },
  { id: 7,  label: 'STAGE 07', name: 'Teamplay',        sub: 'Play As One',               color: '#C62DCE', chips: ['Communication','Roles','Trading','Spacing','Movement'] },
  { id: 8,  label: 'STAGE 08', name: 'Competitive',     sub: 'Perform Under Pressure',    color: '#C62DCE', chips: ['Scrims','Adaptation','Pressure','Review','Clutch'] },
  { id: 9,  label: 'STAGE 09', name: 'Advanced Meta',   sub: 'Read The Game',             color: '#FF1838', chips: ['Meta','Positioning','Gunfight selection','Timing','Adaptation'] },
  { id: 10, label: 'STAGE 10', name: 'Go Elite',        sub: 'Become Tournament Ready',   color: '#FF1838', chips: ['Consistency','Decisions','Execution','Analysis','Growth'] },
]

const loopCards = [
  { step: 'STEP 01', color: '#1769FF', icon: <BookOpen />,      title: 'LEARN',     desc: 'Real material per stage — structured lessons built around what you actually need.', bottom: 'BUILD KNOWLEDGE' },
  { step: 'STEP 02', color: '#4A8AFF', icon: <Dumbbell />,      title: 'PRACTICE',  desc: 'Structured drills directly linked to the concept you just studied.',                bottom: 'DEVELOP CONSISTENCY' },
  { step: 'STEP 03', color: '#7137FF', icon: <ClipboardCheck />, title: 'ASSESS',    desc: 'A scored assessment — not a quiz for the sake of it. Real feedback.',              bottom: 'ANALYZE & ADJUST' },
  { step: 'STEP 04', color: '#C62DCE', icon: <BarChart2 />,      title: 'RESULT',    desc: 'An honest read on where you stand based on your actual performance.',               bottom: 'TRACK PROGRESS' },
  { step: 'STEP 05', color: '#FF1838', icon: <TrendingUp />,     title: 'NEXT STEP', desc: 'A specific weakness to work on before the next stage unlocks.',                    bottom: 'KEEP EVOLVING' },
]

const foundations = [
  { num: '01', color: '#1769FF', icon: <Settings />,  title: 'DEVICE & SETTINGS', bullets: ['Stable FPS','Correct sensitivity','Gyroscope setup','Comfortable controls'] },
  { num: '02', color: '#4A8AFF', icon: <Move />,      title: 'CONTROL & MOVEMENT', bullets: ['Movement basics','Camera control','Peeking','Positioning'] },
  { num: '03', color: '#7137FF', icon: <Target />,    title: 'AIM FUNDAMENTALS',  bullets: ['Crosshair placement','ADS control','Tracking','Flick control'] },
  { num: '04', color: '#9B3FFF', icon: <Zap />,       title: 'RECOIL CONTROL',    bullets: ['Weapon patterns','Spray control','Burst discipline','Vertical recoil'] },
  { num: '05', color: '#C62DCE', icon: <Calendar />,  title: 'GAME ROUTINE',      bullets: ['Consistent practice','Warm-up routine','Review sessions','Recovery'] },
  { num: '06', color: '#FF1838', icon: <Brain />,     title: 'MENTAL DISCIPLINE', bullets: ['Patience','Decision making','Composure','Learning mindset'] },
]

export default function Roadmap() {
  const [activeStage, setActiveStage] = useState(null)

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="roadmap" />

      {/* ─── SECTION 1 — HERO ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', background: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', left: -200, top: -200, width: 700, height: 700, background: 'radial-gradient(circle,rgba(23,105,255,0.09) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -200, bottom: -100, width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,24,56,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 380, clipPath: 'polygon(0 0,100% 0,55% 100%,0 85%)', background: '#1769FF', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 260, height: 340, clipPath: 'polygon(45% 0,100% 0,100% 85%,0 100%)', background: '#FF1838', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'min(20vw,200px)', color: '#111827', opacity: 0.02, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>ROADMAP</div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(80px,10vw,128px) clamp(20px,5vw,64px)', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>
          {/* Eyebrow */}
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 2, background: '#1769FF' }} />
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174' }}>YOUR JOURNEY STARTS HERE</span>
          </motion.div>

          {/* H1 line 1 */}
          <motion.div {...fadeUp(0.1)}>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(44px,7vw,80px)', color: '#111827', lineHeight: 0.92, marginBottom: 4 }}>A CLEAR ROADMAP</div>
          </motion.div>

          {/* H1 line 2 */}
          <motion.div {...fadeUp(0.2)} style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(44px,7vw,80px)', lineHeight: 0.92 }}>
              TO <span style={G}>GREATNESS</span>
            </div>
          </motion.div>

          {/* Desc */}
          <motion.div {...fadeUp(0.3)} style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(16px,1.5vw,18px)', lineHeight: 1.6, color: '#536174', maxWidth: 580 }}>
            Stop guessing what to practice. Esports Elite gives you a structured path from foundational mechanics to competitive-level performance.
          </motion.div>

          {/* Pills */}
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
            {['STRUCTURED LEARNING', 'MEASURABLE PROGRESS', 'COMPETITIVE READY', 'CONSISTENT GROWTH'].map((pill) => (
              <motion.div key={pill} whileHover={{ y: -2, background: '#FFFFFF', boxShadow: '0 4px 16px rgba(7,17,31,0.08)' }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F7F9FC', border: '1px solid #DCE4EF', padding: '8px 16px', borderRadius: 20, cursor: 'default' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1769FF' }} />
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: '#536174' }}>{pill}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 32 }}>
            <Link to="/pricing" style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="START YOUR JOURNEY →"
                padding="14px 32px"
                rounded={8}
                font={{ fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </Link>
            <RadialRevealButton
              label="▶ WATCH HOW IT WORKS"
              padding="14px 32px"
              rounded={8}
              font={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 15 }}
              colors={{ fill: '#FFFFFF', textColor: '#111827', hoverFill: '#111827', hoverTextColor: '#FFFFFF' }}
              border={{ borderWidth: 1.5, borderColor: '#DCE4EF' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2 — PLAYER PROGRESSION ─── */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', boxSizing: 'border-box' }}>
          {/* Heading */}
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to right,#1769FF,#7137FF)' }} />
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174' }}>PLAYER PROGRESSION</span>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to left,#FF1838,#7137FF)' }} />
            </div>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: '#111827', lineHeight: 1 }}>
              FROM PLAYER TO <span style={G}>COMPETITOR</span>
            </div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', marginTop: 16 }}>A structured path. Real improvement. Measurable results.</div>
          </motion.div>

          {/* Cards */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flexWrap: 'wrap' }}>
            {[
              { num: '01', color: '#1769FF', icon: <Gamepad2 />, title: 'FOUNDATION',  desc: 'Build the fundamentals.' },
              { num: '02', color: '#4A8AFF', icon: <Target />,    title: 'MECHANICS',   desc: 'Build mechanical consistency.' },
              { num: '03', color: '#7137FF', icon: <Brain />,     title: 'GAME IQ',     desc: 'Understand situations and decisions.' },
              { num: '04', color: '#FF1838', icon: <Trophy />,    title: 'COMPETITION', desc: 'Perform under pressure.' },
            ].map((card, i, arr) => (
              <div key={card.num} style={{ display: 'contents' }}>
                <motion.div
                  {...fadeUp(i * 0.1)}
                  whileHover={{ y: -4 }}
                  style={{
                    flex: '1 1 200px',
                    background: 'white',
                    border: '1px solid #DCE4EF',
                    position: 'relative',
                    padding: 32,
                    overflow: 'hidden',
                    borderRadius: i === 0 ? '16px 0 0 16px' : i === arr.length - 1 ? '0 16px 16px 0' : 0,
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.color }} />
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: 13, color: card.color, opacity: 0.6, letterSpacing: '0.1em', marginBottom: 8 }}>0{card.num.slice(-1)}</div>
                  <div style={{ color: card.color, marginBottom: 12 }}>
                    {card.icon && (() => {
                      const icons = { Gamepad2: <Gamepad2 size={32} strokeWidth={1.8} color={card.color} />, Target: <Target size={32} strokeWidth={1.8} color={card.color} />, Brain: <Brain size={32} strokeWidth={1.8} color={card.color} />, Trophy: <Trophy size={32} strokeWidth={1.8} color={card.color} /> }
                      const map = { '01': <Gamepad2 size={32} strokeWidth={1.8} color={card.color} />, '02': <Target size={32} strokeWidth={1.8} color={card.color} />, '03': <Brain size={32} strokeWidth={1.8} color={card.color} />, '04': <Trophy size={32} strokeWidth={1.8} color={card.color} /> }
                      return map[card.num]
                    })()}
                  </div>
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 24, color: '#111827' }}>{card.title}</div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174', marginTop: 8 }}>{card.desc}</div>
                </motion.div>
                {i < arr.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <ChevronRight size={20} color="#DCE4EF" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 80, height: 1, background: '#DCE4EF' }} />
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.3em', color: '#9BAABB' }}>WHERE GRIND BECOMES GREATNESS</span>
            <div style={{ width: 80, height: 1, background: '#DCE4EF' }} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 — BUILD THE FOUNDATION FIRST ─── */}
      <section style={{ background: '#FFFFFF', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', boxSizing: 'border-box' }}>
          {/* Heading */}
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to right,#1769FF,#7137FF)' }} />
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174' }}>BEFORE YOU START</span>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to left,#FF1838,#7137FF)' }} />
            </div>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: '#111827', lineHeight: 1 }}>
              BUILD THE <span style={GB}>FOUNDATION</span> <span style={GR}>FIRST</span>
            </div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', marginTop: 16, maxWidth: 700, margin: '16px auto 0' }}>
              Elite performance starts with fundamentals. Make sure your setup, mechanics and habits are ready before chasing advanced skills.
            </div>
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {foundations.map((card, i) => (
              <motion.div
                key={card.num}
                {...fadeUp(i * 0.08)}
                whileHover={{ y: -4 }}
                style={{ background: 'white', border: '1px solid #DCE4EF', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.color }} />
                <div style={{ position: 'absolute', top: 16, left: 20, fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 36, color: card.color, opacity: 0.25, pointerEvents: 'none' }}>{card.num}</div>
                <div style={{ marginTop: 32, marginBottom: 12, color: card.color }}>
                  {(() => {
                    const icoMap = [
                      <Settings size={28} strokeWidth={1.8} color={card.color} />,
                      <Move size={28} strokeWidth={1.8} color={card.color} />,
                      <Target size={28} strokeWidth={1.8} color={card.color} />,
                      <Zap size={28} strokeWidth={1.8} color={card.color} />,
                      <Calendar size={28} strokeWidth={1.8} color={card.color} />,
                      <Brain size={28} strokeWidth={1.8} color={card.color} />,
                    ]
                    return icoMap[i]
                  })()}
                </div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 20, color: '#111827' }}>{card.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                  {card.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={13} color="#1769FF" strokeWidth={2.5} />
                      <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.15em', color: card.color, marginTop: 16, cursor: 'pointer' }}>LEARN MORE →</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 — 10 STAGES VERTICAL TIMELINE ─── */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', boxSizing: 'border-box' }}>
          {/* Heading */}
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', marginBottom: 12 }}>THE PATH</div>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: '#111827', lineHeight: 1 }}>
              10 STAGES. <span style={G}>ONE OBJECTIVE.</span>
            </div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', marginTop: 16 }}>
              Every stage builds on the previous one. Learn the skill, train it, prove it, then move forward.
            </div>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Center line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom,#1769FF,#7137FF 50%,#FF1838)',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }} />

            {stages.map((stage, index) => {
              const isOdd = index % 2 === 0
              const isActive = activeStage === index

              const NodeEl = (
                <div
                  onClick={() => setActiveStage(isActive ? null : index)}
                  style={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${stage.color}`,
                    background: `${stage.color}18`,
                    boxShadow: `0 0 20px ${stage.color}33`,
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 2,
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {stage.id === 10 && (
                    <div style={{ position: 'absolute', top: -20, fontSize: 14, color: stage.color }}>♛</div>
                  )}
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: stage.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 16, color: 'white' }}>{stage.id}</span>
                  </div>
                </div>
              )

              const CardEl = (
                <motion.div
                  {...(isOdd
                    ? { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.05 } }
                    : { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.05 } }
                  )}
                  whileHover={{ y: -3, borderColor: stage.color, boxShadow: '0 8px 30px rgba(7,17,31,0.08)' }}
                  onClick={() => setActiveStage(isActive ? null : index)}
                  style={{
                    background: 'white',
                    border: `1px solid ${isActive ? stage.color : '#DCE4EF'}`,
                    borderRadius: 12,
                    padding: 20,
                    cursor: 'pointer',
                    maxWidth: 380,
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: stage.color, marginBottom: 4 }}>{stage.label}</div>
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 22, color: '#111827', lineHeight: 1 }}>{stage.name}</div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174', marginTop: 4 }}>{stage.sub}</div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="chips"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                          {stage.chips.map((chip) => (
                            <div key={chip} style={{
                              background: `${stage.color}14`,
                              border: `1px solid ${stage.color}26`,
                              padding: '4px 10px',
                              borderRadius: 20,
                              fontFamily: 'Inter,sans-serif',
                              fontSize: 12,
                              color: stage.color,
                            }}>
                              {chip}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )

              return (
                <div key={stage.id} style={{ display: 'flex', alignItems: 'center', minHeight: 110, position: 'relative', marginBottom: 16 }}>
                  {isOdd ? (
                    <>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 32 }}>{CardEl}</div>
                      {NodeEl}
                      <div style={{ flex: 1 }} />
                    </>
                  ) : (
                    <>
                      <div style={{ flex: 1 }} />
                      {NodeEl}
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: 32 }}>{CardEl}</div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 — DEVELOPMENT LOOP ─── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', boxSizing: 'border-box' }}>
          {/* Heading */}
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 60, height: 1, background: '#1769FF' }} />
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174' }}>THE DEVELOPMENT LOOP</span>
              <div style={{ width: 60, height: 1, background: '#FF1838' }} />
            </div>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(32px,5vw,64px)', color: '#111827', lineHeight: 1 }}>
              LEARN → PRACTICE → ASSESS → <span style={G}>IMPROVE</span>
            </div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', marginTop: 16 }}>
              Every stage runs the same cycle. Finish it and the next stage unlocks.
            </div>
          </motion.div>

          {/* Cards */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flexWrap: 'wrap' }}>
            {loopCards.map((card, i) => {
              const iconMap = [
                <BookOpen size={22} color={card.color} strokeWidth={1.8} />,
                <Dumbbell size={22} color={card.color} strokeWidth={1.8} />,
                <ClipboardCheck size={22} color={card.color} strokeWidth={1.8} />,
                <BarChart2 size={22} color={card.color} strokeWidth={1.8} />,
                <TrendingUp size={22} color={card.color} strokeWidth={1.8} />,
              ]
              return (
                <div key={card.step} style={{ display: 'contents' }}>
                  <motion.div
                    {...fadeUp(i * 0.1)}
                    whileHover={{ y: -5 }}
                    style={{
                      flex: '1 1 180px',
                      background: 'white',
                      border: '1px solid #DCE4EF',
                      borderRadius: 16,
                      padding: 28,
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.color }} />
                    <div style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 64, color: '#F7F9FC', pointerEvents: 'none', lineHeight: 1 }}>{i + 1}</div>
                    <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: card.color, marginBottom: 8, marginTop: 8 }}>{card.step}</div>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${card.color}1A`, border: `1px solid ${card.color}26`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      {iconMap[i]}
                    </div>
                    <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 22, color: '#111827' }}>{card.title}</div>
                    <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.6, color: '#536174', marginTop: 8, flex: 1 }}>{card.desc}</div>
                    <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #DCE4EF', fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#9BAABB' }}>{card.bottom}</div>
                  </motion.div>
                  {i < loopCards.length - 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, padding: '0 4px' }}>
                      <ArrowRight size={16} color="#DCE4EF" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Stats */}
          <motion.div {...fadeUp(0.2)} style={{ marginTop: 56, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { num: '10K+', label: 'Players on the journey' },
              { num: '10',   label: 'Structured stages' },
              { num: '1',    label: 'Clear objective' },
            ].map((stat, i) => (
              <div key={stat.num} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 48px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 44, ...G }}>{stat.num}</div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174', marginTop: 4 }}>{stat.label}</div>
                </div>
                {i < 2 && <div style={{ width: 1, height: 48, background: '#DCE4EF', flexShrink: 0 }} />}
              </div>
            ))}
          </motion.div>

          {/* Tagline */}
          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 100, height: 1, background: '#DCE4EF' }} />
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.35em', color: '#9BAABB' }}>CONSISTENT EFFORT CREATES ELITE PLAYERS</span>
            <div style={{ width: 100, height: 1, background: '#DCE4EF' }} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 — ELITE CTA ─── */}
      <section style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, background: 'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center', boxSizing: 'border-box' }}>
          <motion.div {...fadeUp(0)}>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(44px,7vw,80px)', color: 'white', lineHeight: 0.92 }}>ARE YOU READY TO</div>
          </motion.div>
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'clamp(44px,7vw,80px)', lineHeight: 0.92, ...G }}>GO ELITE?</div>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(16px,1.5vw,18px)', color: '#AAB8C8', marginTop: 16 }}>
              Master the fundamentals. Build your mechanics. Understand the game. Execute under pressure.
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.3)} style={{ marginTop: 40 }}>
            <Link to="/pricing" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <RadialRevealButton
                label="JOIN NOW — ₹149/MONTH →"
                padding="18px 56px"
                rounded={8}
                font={{ fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: 18 }}
                colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </Link>
          </motion.div>
          <motion.div {...fadeUp(0.4)}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>GST inclusive · Cancel anytime</div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
