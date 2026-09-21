import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ── Data ── */
const STAGES = [
  { n: 1,  title: 'Know Yourself',         desc: 'Find your honest starting point across every core area before you begin. A full baseline assessment sets where the roadmap starts for you.',                  tag: 'FOUNDATION' },
  { n: 2,  title: 'Build Your Foundation', desc: 'Discipline, consistency, training habits, and how to learn effectively. This stage shapes the player you will become before any mechanics come into play.',    tag: 'FOUNDATION' },
  { n: 3,  title: 'Master Your Mechanics', desc: 'Aim, recoil, movement, and the raw mechanical skill that wins fights. Structured drills, tracked results, and real benchmarks.',                              tag: 'MECHANICS'  },
  { n: 4,  title: 'Develop Game Sense',    desc: 'Reading fights, rotations, and decisions before they cost you. IQ that separates the consistent players from the good-game-only ones.',                       tag: 'GAME IQ'    },
  { n: 5,  title: 'Find Your Role',        desc: 'A dedicated assessment identifies your primary and secondary in-game role with a confidence score — not a guess. Every role gets a full deep-dive page.',     tag: 'GAME IQ'    },
  { n: 6,  title: 'Become a Team Player',  desc: 'Teamwork, communication, and playing as a real squad. Concepts, assessments, and callout discipline for coordinated play.',                                   tag: 'TEAM'       },
  { n: 7,  title: 'Train With Purpose',    desc: 'Turn practice into a structured, trackable routine. Log sessions, set targets, review what you actually hit. No more guessing if you improved.',              tag: 'TRAINING'   },
  { n: 8,  title: 'Review & Improve',      desc: "Look back at what worked, what didn't, and fix it. VOD review frameworks and the mental habit of honest self-assessment.",                                    tag: 'REVIEW'     },
  { n: 9,  title: 'Compete',               desc: 'Mental strength and performing when it actually counts. Pressure management, tilt control, and competing with intention.',                                    tag: 'COMPETE'    },
  { n: 10, title: 'Build Your Future',     desc: 'Where this goes next — on your own timeline. Career paths, content creation, coaching, and what elite actually means for you.',                              tag: 'ELITE'      },
]

const PREREQS = [
  { icon: '🖥️', title: 'Device & Settings',    desc: 'Hardware, display, audio, and game settings optimised for performance.' },
  { icon: '🎮', title: 'Control & Movement',    desc: 'Keybinds, sens, and body mechanics that hold up under pressure.'        },
  { icon: '🎯', title: 'Aim Fundamentals',      desc: 'Crosshair placement, tracking, flicking — the building blocks of aim.'  },
  { icon: '💥', title: 'Recoil Control',        desc: 'Pattern recognition and spray mastery for your primary weapons.'        },
  { icon: '📅', title: 'Game Routine',          desc: 'Warm-up habits, session structure, and sustainable daily practice.'     },
  { icon: '🧠', title: 'Mental Discipline',     desc: 'Tilt awareness, reset routines, and a growth mindset baseline.'        },
]

const PROGRESSION = [
  { icon: '🏗️', label: 'Foundation',  color: '#1769FF', desc: 'Habits, mindset, and baseline assessment' },
  { icon: '⚙️', label: 'Mechanics',   color: '#FF1838', desc: 'Aim, recoil, movement drills'            },
  { icon: '🧩', label: 'Game IQ',     color: '#7137FF', desc: 'Sense, roles, and team play'             },
  { icon: '🏆', label: 'Competition', color: '#1769FF', desc: 'Mental game and elite-level competing'   },
]

const LOOP = [
  { label: 'Learn',     icon: '📖', desc: 'Real material per stage — not a wall of generic tips.'                  },
  { label: 'Practice',  icon: '🎯', desc: 'Structured drills linked directly to the content you just studied.'     },
  { label: 'Assess',    icon: '📝', desc: 'A scored assessment — not a quiz for the sake of it.'                   },
  { label: 'Result',    icon: '📊', desc: 'An honest read on where you stand, based on your actual answers.'       },
  { label: 'Next Step', icon: '⬆️', desc: 'A specific weakness to work on before the next stage unlocks.'          },
]

/* ── SVG roadmap node positions (S-curve, 10 nodes) ── */
const NODES = [
  { cx: 80,  cy: 460 },
  { cx: 160, cy: 340 },
  { cx: 260, cy: 250 },
  { cx: 380, cy: 200 },
  { cx: 500, cy: 220 },
  { cx: 600, cy: 290 },
  { cx: 680, cy: 370 },
  { cx: 720, cy: 460 },
  { cx: 720, cy: 550 },
  { cx: 660, cy: 630 },
]

const S_PATH = `M 80 460 C 80 380 140 300 260 250 C 360 205 460 190 500 220 C 560 260 620 310 680 370 C 720 410 730 480 720 550 C 710 620 680 650 660 630`

const TAG_COLOR = { FOUNDATION: '#1769FF', MECHANICS: '#FF1838', 'GAME IQ': '#7137FF', TEAM: '#1769FF', TRAINING: '#FF1838', REVIEW: '#7137FF', COMPETE: '#FF1838', ELITE: '#1769FF' }

/* ── Reusable image placeholder ── */
function ImgBox({ src, alt, color = '#1769FF', icon = '🖼️', label, animX = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: animX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      whileHover={{ y: -4, scale: 1.01 }}
      style={{
        flex: 1, position: 'relative', borderRadius: 16, overflow: 'hidden',
        aspectRatio: '16/10', maxWidth: 560,
        border: `1px solid ${color}44`,
        boxShadow: `0 20px 60px ${color}22`,
        background: '#07111F',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 10,
      }}
    >
      {/* Corner brackets */}
      {[['0','0'],['auto','0'],['0','auto'],['auto','auto']].map(([t,b], i) => (
        <span key={i} style={{
          position: 'absolute',
          top: t === '0' ? 12 : 'auto', bottom: b === '0' ? 12 : t === '0' ? 'auto' : 12,
          left: i % 2 === 0 ? 12 : 'auto', right: i % 2 !== 0 ? 12 : 'auto',
          width: 18, height: 18,
          borderTop:    (i < 2) ? `2px solid ${color}88` : 'none',
          borderBottom: (i >= 2) ? `2px solid ${color}88` : 'none',
          borderLeft:   (i % 2 === 0) ? `2px solid ${color}88` : 'none',
          borderRight:  (i % 2 !== 0) ? `2px solid ${color}88` : 'none',
        }} />
      ))}
      <span style={{ fontSize: 40 }}>{icon}</span>
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', color: `${color}99`, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#52607188' }}>Image coming soon</span>
    </motion.div>
  )
}

/* ── Fade-in wrapper ── */
function FadeIn({ children, delay = 0, y = 24, x = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Eyebrow label ── */
function Eyebrow({ children, center = false, color = '#1769FF' }) {
  return (
    <div style={{
      fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11,
      letterSpacing: '0.32em', textTransform: 'uppercase',
      color, marginBottom: 12,
      textAlign: center ? 'center' : 'left',
    }}>
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function RoadmapPage() {
  const [activeStage, setActiveStage] = useState(null)

  useEffect(() => { document.title = 'Roadmap | Esports Elite' }, [])

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="roadmap" />

      {/* ── SECTION 2: HERO ── */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px) clamp(60px,7vw,100px)', overflow: 'hidden', position: 'relative' }}>
        {/* Shard decorations */}
        <div style={{ position: 'absolute', top: -60, right: '8%', width: 320, height: 320, background: 'linear-gradient(135deg,#1769FF11,#7137FF0A)', borderRadius: '30% 70% 70% 30%/30% 30% 70% 70%', transform: 'rotate(-20deg)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '4%', width: 220, height: 220, background: 'linear-gradient(135deg,#FF183811,#7137FF0A)', borderRadius: '60% 40%', transform: 'rotate(30deg)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'clamp(40px,6vw,80px)', flexWrap: 'wrap' }}>
          {/* Left: text */}
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <FadeIn delay={0}>
              <Eyebrow color="#1769FF">The Road to Esports</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800,
                fontSize: 'clamp(40px,7vw,80px)', lineHeight: 1.0,
                color: '#0B1220', letterSpacing: '-0.01em',
                marginBottom: 24,
              }}>
                A CLEAR<br />
                <span style={{
                  background: 'linear-gradient(90deg,#1769FF,#7137FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>ROADMAP</span><br />
                TO GREATNESS.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#526071', lineHeight: 1.75, maxWidth: 480, marginBottom: 36 }}>
                A structured, 10-stage player-development journey built into the app — not a reading list. Every stage runs a real Learn → Assess → Result cycle, and you move at your own pace.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <RadialRevealButton
                  label="START STAGE 1 →"
                  padding="14px 32px"
                  rounded={8}
                  font={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}
                  colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
                <a href="/features" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#526071', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                  See all features →
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: image placeholder */}
          <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <ImgBox color="#1769FF" icon="🗺️" label="Roadmap Hero" animX={60} />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PLAYER PROGRESSION ── */}
      <section style={{ background: '#F4F7FB', padding: 'clamp(64px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Eyebrow center color="#7137FF">How You Grow</Eyebrow>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#0B1220', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Four phases. One arc.
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
            {PROGRESSION.map((p, i) => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, boxShadow: `0 16px 40px ${p.color}28` }}
                  style={{
                    background: '#FFFFFF', borderRadius: 14,
                    border: `1px solid ${p.color}22`,
                    padding: '28px 24px', textAlign: 'center',
                    width: 210, flexShrink: 0,
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ width: 32, height: 3, background: p.color, borderRadius: 2, margin: '0 auto 12px' }} />
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, color: '#0B1220', letterSpacing: '0.04em', marginBottom: 8 }}>{p.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#526071', lineHeight: 1.5 }}>{p.desc}</div>
                </motion.div>
                {i < PROGRESSION.length - 1 && (
                  <div style={{ padding: '0 8px', color: '#DCE3EC', fontSize: 22, fontWeight: 300, flexShrink: 0, display: 'flex', alignItems: 'center' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PREREQUISITES ── */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(64px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Eyebrow center color="#FF1838">Before You Begin</Eyebrow>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#0B1220', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Prerequisites. Get these right first.
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#526071', maxWidth: 520, margin: '16px auto 0', lineHeight: 1.7 }}>
                These are not Stage 1 — they come before it. The foundation under the foundation.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
            {PREREQS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                style={{
                  background: '#F4F7FB', borderRadius: 12,
                  border: '1px solid #E1E7EF',
                  padding: '24px 22px',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <span style={{ fontSize: 28, marginBottom: 12, display: 'block' }}>{p.icon}</span>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 17, color: '#0B1220', letterSpacing: '0.02em', marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#526071', lineHeight: 1.6 }}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MAIN SVG ROADMAP ── */}
      <section style={{ background: '#07111F', padding: 'clamp(64px,8vw,100px) clamp(20px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>
        {/* Environment image placeholder overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #07111F 0%, #0B1A2E 50%, #07111F 100%)',
          opacity: 0.98,
        }} />

        <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <Eyebrow center color="#1769FF">The Journey</Eyebrow>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 12 }}>
                10 Stages. Your path.
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#64748B', maxWidth: 440, margin: '0 auto' }}>
                Click any stage to see what's inside.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
            {/* SVG roadmap */}
            <div style={{ width: '100%', maxWidth: 820, position: 'relative' }}>
              <svg viewBox="0 0 800 680" style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Roadmap path with 10 stages">
                {/* Glow filter */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1769FF" />
                    <stop offset="50%" stopColor="#7137FF" />
                    <stop offset="100%" stopColor="#FF1838" />
                  </linearGradient>
                </defs>

                {/* Track (dim background) */}
                <path d={S_PATH} fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                {/* Animated gradient path */}
                <motion.path
                  d={S_PATH}
                  fill="none"
                  stroke="url(#pathGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.3 }}
                />

                {/* Nodes */}
                {STAGES.map((stage, i) => {
                  const { cx, cy } = NODES[i]
                  const isActive = activeStage === i
                  const color = TAG_COLOR[stage.tag] || '#1769FF'
                  return (
                    <g key={i} onClick={() => setActiveStage(isActive ? null : i)} style={{ cursor: 'pointer' }}>
                      {/* Outer ring */}
                      <motion.circle
                        cx={cx} cy={cy} r={isActive ? 24 : 18}
                        fill="none"
                        stroke={color}
                        strokeWidth={isActive ? 2.5 : 1.5}
                        opacity={isActive ? 1 : 0.5}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: isActive ? 1 : 0.5 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.12, type: 'spring', stiffness: 200 }}
                      />
                      {/* Inner fill */}
                      <motion.circle
                        cx={cx} cy={cy} r={isActive ? 14 : 10}
                        fill={isActive ? color : '#0B1220'}
                        stroke={color}
                        strokeWidth="2"
                        filter={isActive ? 'url(#glow)' : undefined}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 260, damping: 16 }}
                      />
                      {/* Number */}
                      <text
                        x={cx} y={cy + 5}
                        textAnchor="middle"
                        fill={isActive ? '#FFFFFF' : color}
                        fontSize={isActive ? 12 : 10}
                        fontFamily="Rajdhani, sans-serif"
                        fontWeight="700"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </text>
                      {/* Stage label — offset alternate sides */}
                      <text
                        x={cx + (i % 2 === 0 ? -28 : 28)} y={cy - 26}
                        textAnchor={i % 2 === 0 ? 'end' : 'start'}
                        fill={isActive ? color : '#475569'}
                        fontSize="10"
                        fontFamily="Rajdhani, sans-serif"
                        fontWeight="600"
                        letterSpacing="0.06em"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {stage.title.toUpperCase()}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Detail panel */}
            {activeStage !== null && (
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: '#0B1A2E', border: `1px solid ${TAG_COLOR[STAGES[activeStage].tag]}44`,
                  borderRadius: 14, padding: '28px 32px',
                  maxWidth: 620, width: '100%',
                  boxShadow: `0 12px 40px ${TAG_COLOR[STAGES[activeStage].tag]}22`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.28em',
                    color: TAG_COLOR[STAGES[activeStage].tag],
                    background: `${TAG_COLOR[STAGES[activeStage].tag]}18`,
                    padding: '4px 10px', borderRadius: 4,
                    textTransform: 'uppercase',
                  }}>{STAGES[activeStage].tag}</span>
                  <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, color: '#475569', letterSpacing: '0.15em' }}>
                    STAGE {STAGES[activeStage].n} / 10
                  </span>
                </div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 26, color: '#FFFFFF', marginBottom: 12, letterSpacing: '0.01em' }}>
                  {STAGES[activeStage].title}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#94A3B8', lineHeight: 1.75 }}>
                  {STAGES[activeStage].desc}
                </div>
                <button
                  onClick={() => setActiveStage(null)}
                  style={{ marginTop: 18, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#475569', padding: 0 }}
                >
                  ✕ Close
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: DEVELOPMENT LOOP ── */}
      <section style={{ background: '#F4F7FB', padding: 'clamp(64px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <Eyebrow center color="#FF1838">Every Stage</Eyebrow>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#0B1220', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                The Development Loop.
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#526071', maxWidth: 520, margin: '16px auto 0', lineHeight: 1.7 }}>
                Every stage runs the same cycle. Finish it and the next stage unlocks — whenever that happens.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
            {LOOP.map((step, i) => {
              const color = i === 0 ? '#1769FF' : i === 2 ? '#7137FF' : i === 3 ? '#FF1838' : '#1769FF'
              return (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4, boxShadow: `0 14px 36px ${color}20` }}
                    style={{
                      background: '#FFFFFF', borderRadius: 12,
                      border: '1px solid #E1E7EF',
                      padding: '24px 20px', textAlign: 'center',
                      width: 175, flexShrink: 0,
                      transition: 'box-shadow 0.25s ease',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{step.icon}</div>
                    <div style={{ width: 24, height: 2.5, background: color, borderRadius: 2, margin: '0 auto 10px' }} />
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, color: '#0B1220', letterSpacing: '0.03em', marginBottom: 8 }}>{step.label.toUpperCase()}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#526071', lineHeight: 1.55 }}>{step.desc}</div>
                  </motion.div>
                  {i < LOOP.length - 1 && (
                    <div style={{ padding: '0 8px', color: '#DCE3EC', fontSize: 20, flexShrink: 0, display: 'flex', alignItems: 'center' }}>→</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: PROGRESS DASHBOARD ── */}
      <section style={{ background: '#0B1220', padding: 'clamp(64px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <Eyebrow center color="#1769FF">Inside the App</Eyebrow>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Your progress, tracked.
              </h2>
            </div>
          </FadeIn>

          {/* Dashboard card mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 20, padding: '36px 40px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
          >
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.30em', color: '#3A5A7A', textTransform: 'uppercase', marginBottom: 24 }}>
              ROADMAP PROGRESS — YOUR ACCOUNT
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 12 }}>
              {STAGES.map((stage, i) => {
                const state = i < 3 ? 'completed' : i === 3 ? 'current' : 'locked'
                const color = state === 'completed' ? '#22C55E' : state === 'current' ? '#1769FF' : '#1E293B'
                const textColor = state === 'completed' ? '#86EFAC' : state === 'current' ? '#93C5FD' : '#334155'
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, type: 'spring', stiffness: 200 }}
                    style={{
                      background: state === 'current' ? '#1769FF18' : state === 'completed' ? '#22C55E10' : '#0F1C2D',
                      border: `1px solid ${color}44`,
                      borderRadius: 10, padding: '14px 12px', textAlign: 'center',
                    }}
                  >
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 20, color, marginBottom: 4 }}>
                      {state === 'completed' ? '✓' : state === 'current' ? String(i + 1).padStart(2,'0') : '🔒'}
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: textColor, lineHeight: 1.4 }}>
                      {stage.title}
                    </div>
                    {state !== 'locked' && (
                      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 9, letterSpacing: '0.15em', color, textTransform: 'uppercase', marginTop: 6, opacity: 0.8 }}>
                        {state === 'completed' ? 'Done' : 'In progress'}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#22C55E' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#475569' }}>Completed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#1769FF' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#475569' }}>Current</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: '#1E293B' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#475569' }}>Locked</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 8: MAP KNOWLEDGE ── */}
      <section style={{ background: '#FFFFFF', padding: 'clamp(64px,8vw,100px) clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 'clamp(40px,6vw,80px)', flexWrap: 'wrap' }}>
          {/* Left: image */}
          <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
            <ImgBox color="#7137FF" icon="🗺️" label="Map Knowledge" animX={-60} />
          </div>

          {/* Right: text */}
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <FadeIn delay={0.1}>
              <Eyebrow color="#7137FF">Stage 4 Feature</Eyebrow>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,48px)', color: '#0B1220', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 20 }}>
                Map Knowledge,<br />built in.
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#526071', lineHeight: 1.75, marginBottom: 16 }}>
                Interactive map explorer with pinned callouts, rotation paths, and zone control overlays — covering every map your game ships with.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#526071', lineHeight: 1.75, marginBottom: 28 }}>
                Part of the Game IQ phase. Know the terrain before you try to read it under pressure.
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Interactive pins','Rotation paths','Zone control','Callout library'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.18em',
                    color: '#7137FF', background: '#7137FF12', border: '1px solid #7137FF28',
                    padding: '6px 14px', borderRadius: 6, textTransform: 'uppercase',
                  }}>{tag}</span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: ELITE CTA ── */}
      <section style={{ background: '#07111F', padding: 'clamp(80px,10vw,130px) clamp(20px,6vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Cinematic gradients */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, #1769FF1A 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: 300, height: 200, background: 'radial-gradient(ellipse, #FF18380F 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 250, height: 180, background: 'radial-gradient(ellipse, #7137FF0F 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <FadeIn>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.36em', color: '#1769FF', textTransform: 'uppercase', marginBottom: 20 }}>
              Begin Your Journey
            </div>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800,
              fontSize: 'clamp(36px,7vw,72px)', letterSpacing: '-0.01em', lineHeight: 1.0,
              color: '#FFFFFF', marginBottom: 24,
            }}>
              READY TO<br />
              <span style={{
                background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>GO ELITE?</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#64748B', lineHeight: 1.75, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
              The roadmap is built into the app. Start Stage 1 and find your honest baseline — the journey begins with knowing where you really stand.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <RadialRevealButton
                label="START STAGE 1 →"
                padding="16px 40px"
                rounded={8}
                font={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#1769FF', textColor: '#FFFFFF', hoverFill: '#0D4FBF', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
              <RadialRevealButton
                label="SEE ALL FEATURES"
                padding="16px 40px"
                rounded={8}
                font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15 }}
                colors={{ fill: '#0F1C2D', textColor: '#94A3B8', hoverFill: '#1E2D42', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 1, borderColor: '#1E2D42' }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
