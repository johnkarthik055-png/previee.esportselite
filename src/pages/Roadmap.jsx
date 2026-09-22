import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, Target, Users, Zap, Gamepad2, Crosshair, Brain, Trophy, Settings, Move, Calendar, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const STAGE_DATA = [
  {
    id: 1, cx: 72, cy: 420, name: 'FOUNDATION', sub: 'Build Your Base', color: '#1769FF',
    objective: 'Build your competitive base',
    why: 'Every elite player started by mastering the basics. Skipping foundations leads to a ceiling you can never break through.',
    prereqs: ['Device & Settings', 'Basic game knowledge'],
    training: ['Controls Drill', 'Sensitivity Setup', 'Movement Basics', 'Camera Control'],
    assessment: 'Complete a full foundation assessment covering settings, movement and camera discipline.',
    outcome: 'A solid, reliable technical base to build every other skill on.',
    next: 'AIM FUNDAMENTALS',
    skills: ['Controls', 'Sensitivity', 'Movement', 'Camera', 'Gyroscope'],
    image: '/roadmap-hero.png',
  },
  {
    id: 2, cx: 195, cy: 275, name: 'AIM FUNDAMENTALS', sub: 'Build Reliable Aim', color: '#2477FF',
    objective: 'Develop consistent crosshair placement, ADS control and target tracking.',
    why: 'Aim is your primary weapon. You cannot compete without a reliable aim foundation.',
    prereqs: ['Foundation'],
    training: ['Crosshair Placement Drill', 'ADS Control', 'Tracking Session', 'Flick Practice'],
    assessment: 'Complete structured aim sessions and hit consistency benchmarks.',
    outcome: 'Reliable aim you can count on under pressure.',
    next: 'RECOIL & SPRAY',
    skills: ['Crosshair placement', 'ADS', 'Tracking', 'Flicks', 'Target switching'],
    image: '/roadmap-hero.png',
  },
  {
    id: 3, cx: 295, cy: 235, name: 'RECOIL & SPRAY', sub: 'Control Your Weapons', color: '#3D8AFF',
    objective: 'Learn weapon-specific recoil patterns and build consistent spray control.',
    why: 'Spray control separates players who get lucky from those who win gunfights intentionally.',
    prereqs: ['Foundation', 'Aim Fundamentals'],
    training: ['Recoil Pattern Study', 'Spray Transfer Drill', 'Burst Control', 'Weapon Familiarity'],
    assessment: 'Demonstrate consistent spray control across at least three weapons.',
    outcome: 'Predictable, controllable weapon handling in real matches.',
    next: 'CLOSE-RANGE MECHANICS',
    skills: ['Recoil', 'Spray transfer', 'Burst control', 'Weapon familiarity', 'Distance control'],
    image: '/roadmap-hero.png',
  },
  {
    id: 4, cx: 390, cy: 355, name: 'CLOSE-RANGE MECHANICS', sub: 'Win The Fight', color: '#7137FF',
    objective: 'Become reliable in close-range engagements.',
    why: 'The majority of BGMI gunfights are decided at close range. Winning these consistently changes your game completely.',
    prereqs: ['Aim Fundamentals', 'Recoil & Spray', 'Movement'],
    training: ['Close Range Drill', 'Shot Timing', 'Movement Drill', 'Pre-fire Drill'],
    assessment: 'Complete structured close-range sessions.',
    outcome: 'Become more reliable during close-range engagements.',
    next: 'MAP KNOWLEDGE',
    skills: ['Pre-fire', 'Peeking', 'Movement', 'Hip fire', 'Shot timing'],
    image: '/roadmap-hero.png',
  },
  {
    id: 5, cx: 490, cy: 390, name: 'MAP KNOWLEDGE', sub: 'Know The Battlefield', color: '#9B5BFF',
    objective: 'Know the battlefield',
    why: 'Understand rotations, compounds, loot routes, vehicle spawns and zone patterns before the match forces you to.',
    prereqs: ['Close-Range Mechanics'],
    training: ['POI Study', 'Rotation Routes', 'Zone Pattern Analysis', 'Vehicle Spawns'],
    assessment: 'Complete map knowledge assessments for all major maps.',
    outcome: 'Stop reacting to the map. Start using it as a weapon.',
    next: 'GAME SENSE',
    skills: ['POIs', 'Rotations', 'Zones', 'Vehicles', 'Compound knowledge'],
    image: '/map-knowledge.png',
  },
  {
    id: 6, cx: 590, cy: 210, name: 'GAME SENSE', sub: 'Make Better Decisions', color: '#C060FF',
    objective: 'Make better decisions',
    why: 'The best players do not react — they predict. Game sense is the skill that multiplies everything below it.',
    prereqs: ['Map Knowledge', 'Close-Range Mechanics'],
    training: ['Information Gathering', 'Timing Study', 'Enemy Prediction', 'Positioning Logic'],
    assessment: 'Demonstrate correct decision-making in staged scenarios.',
    outcome: 'Fewer bad engagements. More wins from better timing.',
    next: 'STRATEGY & ROTATIONS',
    skills: ['Information gathering', 'Timing', 'Risk assessment', 'Enemy prediction', 'Positioning'],
    image: '/roadmap-hero.png',
  },
  {
    id: 7, cx: 690, cy: 170, name: 'STRATEGY & ROTATIONS', sub: 'Control The Game', color: '#E040A0',
    objective: 'Control the game',
    why: 'Random rotations lose games. Systematic zone control wins them.',
    prereqs: ['Game Sense', 'Map Knowledge'],
    training: ['Zone Prediction', 'Rotation Planning', 'Compound Control', 'Fallback Routes'],
    assessment: 'Demonstrate zone-based decision making in scrims.',
    outcome: 'Stop surviving by luck. Start controlling where the game goes.',
    next: 'TEAMPLAY',
    skills: ['Zone prediction', 'Rotation timing', 'Position selection', 'Compound control', 'Fallback planning'],
    image: '/roadmap-hero.png',
  },
  {
    id: 8, cx: 790, cy: 305, name: 'TEAMPLAY', sub: 'Play As One', color: '#FF4060',
    objective: 'Play as one',
    why: 'Individual skill has a ceiling. Team execution does not.',
    prereqs: ['Strategy & Rotations', 'Game Sense'],
    training: ['Communication Drills', 'Role Assignment', 'Trade Mechanics', 'Squad Spacing'],
    assessment: 'Complete coordinated team exercises with measurable outcomes.',
    outcome: 'Become a player that makes your whole squad better.',
    next: 'COMPETITIVE PERFORMANCE',
    skills: ['Communication', 'Roles', 'Trading', 'Spacing', 'Team movement'],
    image: '/roadmap-hero.png',
  },
  {
    id: 9, cx: 890, cy: 345, name: 'COMPETITIVE PERFORMANCE', sub: 'Perform Under Pressure', color: '#FF2A40',
    objective: 'Perform under pressure',
    why: 'Skills that disappear under pressure are not real skills. This stage builds the mental game that holds everything together.',
    prereqs: ['Teamplay', 'Strategy & Rotations'],
    training: ['Scrim Mentality', 'Pressure Management', 'Tournament Preparation', 'Tilt Control'],
    assessment: 'Complete tournament-format scrims and performance reviews.',
    outcome: 'Skills that hold up when the stakes are real.',
    next: 'GO ELITE',
    skills: ['Scrims', 'Tournament preparation', 'Adaptation', 'Pressure management', 'Performance review'],
    image: '/roadmap-hero.png',
  },
  {
    id: 10, cx: 1100, cy: 85, name: 'GO ELITE', sub: 'Become Tournament Ready', color: '#FF1838',
    objective: 'Become tournament ready',
    why: 'This is where it all comes together. Mechanics, game sense, strategy, teamwork and consistency into one competitive system.',
    prereqs: ['Competitive Performance', 'All previous stages'],
    training: ['Elite Consistency', 'Advanced Decision Making', 'Team Execution', 'Performance Analysis'],
    assessment: 'Compete in structured tournaments and demonstrate elite-level consistency.',
    outcome: 'A player ready to compete at the highest accessible level.',
    next: null,
    skills: ['Consistency', 'Advanced decision making', 'Team execution', 'Performance analysis', 'Continuous improvement'],
    image: '/roadmap-hero.png',
  },
]

const PREREQS = [
  { n:'01', title:'DEVICE & SETTINGS',  bullets:['Stable FPS','Correct sensitivity','Gyroscope setup','Comfortable controls'] },
  { n:'02', title:'CONTROL & MOVEMENT', bullets:['Movement basics','Camera control','Peeking','Positioning'] },
  { n:'03', title:'AIM FUNDAMENTALS',   bullets:['Crosshair placement','ADS control','Tracking','Flick control'] },
  { n:'04', title:'RECOIL CONTROL',     bullets:['Weapon familiarity','Spray control','Burst discipline','Vertical recoil'] },
  { n:'05', title:'GAME ROUTINE',       bullets:['Consistent practice','Warm-up routine','Review sessions','Recovery'] },
  { n:'06', title:'MENTAL DISCIPLINE',  bullets:['Patience','Decision making','Composure','Learning mindset'] },
]

const PROGRESSION = [
  { n:'01', label:'FOUNDATION',  desc:'Build the fundamentals.',               color:'#1769FF' },
  { n:'02', label:'MECHANICS',   desc:'Build mechanical consistency.',          color:'#4A90FF' },
  { n:'03', label:'GAME IQ',     desc:'Understand situations and decisions.',   color:'#7137FF' },
  { n:'04', label:'COMPETITION', desc:'Perform under pressure.',                color:'#FF1838' },
]

const LOOP = [
  { label:'LEARN',     desc:'Understand the concept.',      border:'#1769FF' },
  { label:'PRACTICE',  desc:'Train the skill.',             border:'#4A90FF' },
  { label:'ASSESS',    desc:'Prove your performance.',       border:'#7137FF' },
  { label:'RESULT',    desc:'Measure the outcome.',          border:'#C060FF' },
  { label:'NEXT STEP', desc:'Unlock the next stage.',        border:'#FF1838' },
]

const PROGRESS_STAGES = [
  { label:'Foundation',   state:'done'    },
  { label:'Aim',          state:'done'    },
  { label:'Recoil',       state:'done'    },
  { label:'Close-Range',  state:'current' },
  { label:'Map',          state:'locked'  },
  { label:'Game Sense',   state:'locked'  },
  { label:'Strategy',     state:'locked'  },
  { label:'Teamplay',     state:'locked-red' },
  { label:'Performance',  state:'locked-red' },
  { label:'Go Elite',     state:'elite'   },
]

const SVG_PATH = 'M 72,420 C 110,420 150,270 220,240 S 310,370 390,360 S 470,395 490,390 C 530,360 560,230 615,200 S 690,170 690,170 S 740,270 790,305 S 850,330 890,345 C 960,340 1050,150 1100,85'

/* ══════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════ */
const IconSettings = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)
const IconMove = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round">
    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>
  </svg>
)
const IconAim = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/>
  </svg>
)
const IconRecoil = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)
const IconRoutine = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const IconMind = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
)
const ICONS = [IconSettings, IconMove, IconAim, IconRecoil, IconRoutine, IconMind]

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
const GRAD = 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)'

function Eyebrow({ children, center = false, color = '#6D7B90' }) {
  return (
    <div style={{
      fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11,
      letterSpacing:'0.35em', textTransform:'uppercase', color,
      marginBottom:14, textAlign: center ? 'center' : 'left',
    }}>
      {children}
    </div>
  )
}

function GradSpan({ children, g = GRAD }) {
  return (
    <span style={{ background:g, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
      {children}
    </span>
  )
}

function FadeUp({ children, delay = 0, y = 24, x = 0 }) {
  return (
    <motion.div
      initial={{ opacity:0, y, x }}
      whileInView={{ opacity:1, y:0, x:0 }}
      viewport={{ once:true, amount:0.15 }}
      transition={{ duration:0.65, delay, ease:[0.22,1,0.36,1] }}
    >
      {children}
    </motion.div>
  )
}

function Wrap({ children, bg='#FFFFFF', py='120px 0' }) {
  return (
    <section style={{ background:bg, padding:py, overflow:'hidden' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,5vw,64px)' }}>
        {children}
      </div>
    </section>
  )
}

const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } }
const child   = { hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function RoadmapPage() {
  const [activeStage, setActiveStage] = useState(null)
  const [hoveredNode, setHoveredNode]  = useState(null)
  const active = activeStage !== null ? STAGE_DATA[activeStage] : null

  function toggle(i) { setActiveStage(p => p === i ? null : i) }

  return (
    <div style={{ background:'#FFFFFF', overflowX:'hidden' }}>
      <Navbar activePage="roadmap" />

      {/* ══ HERO ══ */}
      <section style={{ background:'#FFFFFF', minHeight:820, position:'relative', overflow:'hidden', paddingBottom:0 }}>

        {/* ── RIGHT: full-bleed artwork ── */}
        <div style={{ position:'absolute', top:0, right:0, width:'58%', height:'100%', zIndex:0 }}>
          {/* Fallback dark bg so placeholder looks intentional */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#0D1828,#1A2A42)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
            <div style={{ fontSize:72, opacity:0.18 }}>🏆</div>
            <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#3D5070' }}>[ ROADMAP-HERO.PNG ]</div>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#2A3E55' }}>Drop roadmap-hero.webp in /public</div>
          </div>
          <img
            src="/roadmap-hero.png"
            alt="Esports Elite — Roadmap Hero"
            loading="eager"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center right', display:'block' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          {/* White fade — left edge of artwork blends into page */}
          <div style={{ position:'absolute', top:0, left:0, width:320, height:'100%', background:'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.60) 65%, transparent 100%)', zIndex:1 }} />
          {/* Bottom fade — artwork blends into next section */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:200, background:'linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)', zIndex:2, pointerEvents:'none' }} />
        </div>

        {/* ── LEFT: content column ── */}
        <motion.div
          variants={stagger} initial="hidden" animate="visible"
          style={{
            position:'relative', zIndex:2,
            width:'44%', maxWidth:'560px', minWidth:'480px', minHeight:820,
            display:'flex', flexDirection:'column', justifyContent:'center',
            paddingLeft:'64px', paddingRight:'24px',
            paddingTop:80, paddingBottom:80,
          }}
          className="hero-left-col"
        >
          {/* Vertical side text */}
          <div style={{ position:'absolute', left:20, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#A8B3C4', writingMode:'vertical-rl', textTransform:'uppercase', userSelect:'none', pointerEvents:'none' }}>
            TRAIN · ANALYZE · DOMINATE
          </div>

          {/* Eyebrow */}
          <motion.div variants={child} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:13, letterSpacing:'0.35em', color:'#60708A', textTransform:'uppercase' }}>
              YOUR JOURNEY STARTS HERE
            </span>
            <div style={{ width:45, height:1, background:'#CBD5E1', flexShrink:0 }} />
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={child} style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'clamp(44px,6.5vw,80px)', lineHeight:0.92, letterSpacing:'-0.02em', margin:'0 0 20px' }}>
            <span style={{ color:'#080D16', display:'block' }}>A CLEAR ROADMAP</span>
            <span style={{ color:'#080D16' }}>TO </span>
            <span style={{ background:'linear-gradient(90deg, #1769FF 0%, #7047FF 50%, #FF2448 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>GREATNESS</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={child} style={{ fontFamily:'Inter,sans-serif', fontSize:18, lineHeight:1.55, color:'#526078', maxWidth:580, margin:0 }}>
            Stop guessing what to practice. Esports Elite gives you a structured path from foundational mechanics to competitive-level performance.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={child} style={{ display:'flex', flexDirection:'row', alignItems:'center', gap:'12px', marginTop:'28px', flexWrap:'nowrap' }}>
            <motion.button
              whileHover={{ y:-2, boxShadow:'0 8px 24px rgba(23,105,255,0.35)' }}
              whileTap={{ scale:0.97 }}
              style={{ background:'#080D16', color:'#FFFFFF', padding:'14px 20px', borderRadius:10, border:'none', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'13px', letterSpacing:'0.05em', cursor:'pointer', transition:'box-shadow 0.2s', whiteSpace:'nowrap', flexShrink:0 }}
            >
              START YOUR JOURNEY →
            </motion.button>
            <motion.button
              whileHover={{ y:-2, borderColor:'#1769FF' }}
              whileTap={{ scale:0.97 }}
              style={{ background:'#FFFFFF', color:'#172033', padding:'14px 20px', borderRadius:10, border:'1.5px solid #D2DCE8', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'13px', cursor:'pointer', transition:'border-color 0.2s', whiteSpace:'nowrap', flexShrink:0 }}
            >
              ▶&nbsp;&nbsp;WATCH HOW IT WORKS
            </motion.button>
          </motion.div>

          {/* Feature strip */}
          <motion.div variants={child} style={{ display:'flex', flexDirection:'row', flexWrap:'nowrap', alignItems:'center', gap:'10px', marginTop:'28px', width:'100%' }}>
            {[
              { Icon:BarChart2, color:'#1769FF', label:'STRUCTURED LEARNING'  },
              { Icon:Target,    color:'#FF2448', label:'MEASURABLE PROGRESS'  },
              { Icon:Users,     color:'#7047FF', label:'COMPETITIVE READY'    },
              { Icon:Zap,       color:'#FF2448', label:'CONSISTENT GROWTH'    },
            ].map((f, i) => (
              <React.Fragment key={f.label}>
                {i > 0 && <div style={{ width:'1px', height:'24px', background:'#D7DFEA', flexShrink:0 }} />}
                <div style={{ display:'flex', flexDirection:'row', alignItems:'center', gap:'6px', flexShrink:0 }}>
                  <f.Icon size={14} color={f.color} strokeWidth={1.8} />
                  <span style={{ fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:'10px', color:'#34435A', whiteSpace:'nowrap', letterSpacing:'0.03em', lineHeight:1.2 }}>{f.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* Bottom-left faded text */}
          <div style={{ position:'absolute', bottom:48, left:'clamp(40px,5vw,80px)', userSelect:'none', pointerEvents:'none' }}>
            {['DISCIPLINE','BUILDS','FREEDOM'].map(w => (
              <div key={w} style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:18, letterSpacing:'0.1em', color:'#1769FF', opacity:0.18, lineHeight:1.2 }}>{w}</div>
            ))}
          </div>

          {/* Bottom micro text */}
          <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', whiteSpace:'nowrap', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.3em', color:'#B8C2D0', userSelect:'none', pointerEvents:'none' }}>
            SAME PLAYER. DIFFERENT MINDSET. A HIGHER YOU.
          </div>
        </motion.div>

        {/* Section-level bottom fade over everything */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)', zIndex:3, pointerEvents:'none' }} />

        <style>{`
          @media (max-width: 900px) {
            .hero-left-col { width: 100% !important; padding-top: 100px !important; padding-bottom: 60px !important; }
          }
        `}</style>
      </section>

      {/* ══ PLAYER PROGRESSION ══ */}
      <section style={{ position:'relative', overflow:'hidden', padding:'80px 0 100px', background:'#FFFFFF' }}>
        {/* CSS-only decorative elements — no image dependency */}

        {/* Dot grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, #DCE4EF 1px, transparent 1px)', backgroundSize:'28px 28px', opacity:0.4, pointerEvents:'none', zIndex:0 }} />

        {/* Top-left blue shard */}
        <div style={{ position:'absolute', top:-20, left:0, width:200, height:300, clipPath:'polygon(0 0, 60% 0, 40% 100%, 0 100%)', background:'linear-gradient(135deg, #1769FF 0%, rgba(23,105,255,0.05) 100%)', opacity:0.12, zIndex:0, pointerEvents:'none' }} />

        {/* Bottom-right red shard */}
        <div style={{ position:'absolute', bottom:-20, right:0, width:200, height:300, clipPath:'polygon(40% 0, 100% 0, 100% 100%, 60% 100%)', background:'linear-gradient(225deg, #FF2448 0%, rgba(255,36,72,0.05) 100%)', opacity:0.12, zIndex:0, pointerEvents:'none' }} />

        {/* + crosshairs */}
        <div style={{ position:'absolute', top:24, left:24, color:'#1769FF', fontSize:18, opacity:0.4, userSelect:'none', zIndex:1 }}>+</div>
        <div style={{ position:'absolute', top:24, right:24, color:'#FF2448', fontSize:18, opacity:0.4, userSelect:'none', zIndex:1 }}>+</div>

        {/* Left vertical text */}
        <div style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#A8B3C4', writingMode:'vertical-rl', textTransform:'uppercase', userSelect:'none', opacity:0.6, zIndex:1 }}>
          TRAIN · ANALYZE · DOMINATE
        </div>
        {/* Right vertical text */}
        <div style={{ position:'absolute', right:24, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#A8B3C4', writingMode:'vertical-rl', textTransform:'uppercase', userSelect:'none', opacity:0.6, zIndex:1 }}>
          BETTER PLAYER · BETTER PERSON
        </div>

        {/* Content */}
        <div style={{ position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto', padding:'0 clamp(40px,6vw,80px)' }}>

          {/* Eyebrow row */}
          <FadeUp>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:20 }}>
              <div style={{ width:60, height:1, background:'linear-gradient(to right, #1769FF, #7047FF)' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#60708A', textTransform:'uppercase', whiteSpace:'nowrap' }}>PLAYER PROGRESSION</span>
              <div style={{ width:60, height:1, background:'linear-gradient(to left, #FF2448, #7047FF)' }} />
            </div>

            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'clamp(44px,5.5vw,72px)', lineHeight:0.92, color:'#080D16', textAlign:'center', margin:'0 0 16px' }}>
              FROM PLAYER TO{' '}
              <span style={{ background:'linear-gradient(90deg,#1769FF,#7047FF,#FF2448)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>COMPETITOR</span>
            </h2>

            <p style={{ fontFamily:'Inter,sans-serif', fontSize:18, color:'#526078', textAlign:'center', marginTop:16, marginBottom:0 }}>
              A structured path. Real improvement. Measurable results.
            </p>
          </FadeUp>

          {/* Cards */}
          <div style={{ display:'flex', flexDirection:'row', gap:0, marginTop:56, alignItems:'stretch' }}>
            {[
              { n:'01', label:'FOUNDATION',  desc:'Build the fundamentals.',                  Icon:Gamepad2,  color:'#1769FF', borderAlpha:'rgba(23,105,255,0.15)'   },
              { n:'02', label:'MECHANICS',   desc:'Build mechanical consistency.',             Icon:Crosshair, color:'#4A90FF', borderAlpha:'rgba(74,144,255,0.15)'   },
              { n:'03', label:'GAME IQ',     desc:'Understand situations and decisions.',     Icon:Brain,     color:'#7047FF', borderAlpha:'rgba(112,71,255,0.15)'   },
              { n:'04', label:'COMPETITION', desc:'Perform under pressure.',                  Icon:Trophy,    color:'#FF2448', borderAlpha:'rgba(255,36,72,0.15)'    },
            ].map((card, i) => (
              <div key={card.label} style={{ display:'flex', alignItems:'center', flex:1 }}>
                <motion.div
                  initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }}
                  transition={{ duration:0.55, delay:i*0.1, ease:[0.22,1,0.36,1] }}
                  whileHover={{ y:-5, transition:{ duration:0.2 } }}
                  style={{
                    flex:1,
                    position:'relative',
                    display:'flex', flexDirection:'column', alignItems:'flex-start',
                    padding:'32px',
                    background:'rgba(255,255,255,0.72)',
                    backdropFilter:'blur(6px)',
                    borderRadius:4,
                    border:`1px solid ${card.borderAlpha}`,
                    borderLeft:`3px solid ${card.color}`,
                    boxShadow:'0 8px 32px rgba(7,17,31,0.06)',
                  }}
                >
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:13, color:card.color, opacity:0.6, letterSpacing:'0.1em', marginBottom:12 }}>{card.n}</div>
                  <card.Icon size={36} strokeWidth={1.8} color={card.color} />
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:26, color:'#080D16', marginTop:12, letterSpacing:'0.02em' }}>{card.label}</div>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#526078', marginTop:8, lineHeight:1.55 }}>{card.desc}</div>
                </motion.div>

                {/* Arrow connector */}
                {i < 3 && (
                  <div style={{ flexShrink:0, width:32, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="url(#arrGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="arrGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1769FF"/>
                          <stop offset="100%" stopColor="#FF2448"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <FadeUp delay={0.3}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:48 }}>
              <div style={{ width:80, height:1, background:'linear-gradient(to right, #1769FF, #7047FF)' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.35em', color:'#9BAABB', textTransform:'uppercase', whiteSpace:'nowrap' }}>WHERE GRIND BECOMES GREATNESS</span>
              <div style={{ width:80, height:1, background:'linear-gradient(to left, #FF2448, #7047FF)' }} />
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══ FOUNDATION / PREREQUISITES ══ */}
      <section style={{ position:'relative', overflow:'hidden', padding:'100px 0 80px', background:'#F7F9FC' }}>
        {/* Top fade */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:80, background:'linear-gradient(to bottom, #FFFFFF 0%, transparent 100%)', zIndex:1, pointerEvents:'none' }} />
        {/* Bottom fade */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top, #FFFFFF 0%, transparent 100%)', zIndex:1, pointerEvents:'none' }} />

        {/* Left vertical text */}
        <div style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#A8B3C4', writingMode:'vertical-rl', textTransform:'uppercase', userSelect:'none', zIndex:2 }}>
          TRAIN · ANALYZE · DOMINATE
        </div>
        {/* Right vertical text */}
        <div style={{ position:'absolute', right:24, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#A8B3C4', writingMode:'vertical-rl', textTransform:'uppercase', userSelect:'none', zIndex:2 }}>
          BETTER PLAYER · BETTER PERSON
        </div>

        {/* Content */}
        <div style={{ position:'relative', zIndex:2, maxWidth:1280, margin:'0 auto', padding:'0 clamp(40px,6vw,80px)' }}>

          {/* Center text */}
          <FadeUp>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              {/* Eyebrow row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:20 }}>
                <div style={{ width:60, height:1, background:'linear-gradient(to right, #1769FF, #7047FF)' }} />
                <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#60708A', textTransform:'uppercase', whiteSpace:'nowrap' }}>BEFORE YOU START</span>
                <div style={{ width:60, height:1, background:'linear-gradient(to left, #FF2448, #7047FF)' }} />
              </div>
              <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'clamp(44px,5.5vw,72px)', lineHeight:0.92, color:'#080D16', margin:'0 0 16px' }}>
                BUILD THE{' '}
                <span style={{ background:'linear-gradient(90deg,#1769FF,#7047FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>FOUNDATION</span>
                {' '}
                <span style={{ background:'linear-gradient(90deg,#7047FF,#FF2448)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>FIRST</span>
              </h2>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'#526078', maxWidth:700, margin:'16px auto 0' }}>
                Elite performance starts with fundamentals. Make sure your setup, mechanics and habits are ready before chasing advanced skills.
              </p>
            </div>
          </FadeUp>

          {/* 6-card grid */}
          <div className="prereq-grid">
            {[
              { n:'01', color:'#1769FF', accent:'#1769FF', title:'DEVICE & SETTINGS',   Icon:Settings, bullets:['Stable FPS','Correct sensitivity','Gyroscope setup','Comfortable controls'] },
              { n:'02', color:'#4A90FF', accent:'#4A90FF', title:'CONTROL & MOVEMENT',  Icon:Move,     bullets:['Movement basics','Camera control','Peeking','Positioning'] },
              { n:'03', color:'#7047FF', accent:'#7047FF', title:'AIM FUNDAMENTALS',    Icon:Target,   bullets:['Crosshair placement','ADS control','Tracking','Flick control'] },
              { n:'04', color:'#9B3FFF', accent:'#9B3FFF', title:'RECOIL CONTROL',      Icon:Zap,      bullets:['Weapon familiarity','Spray control','Burst discipline','Vertical recoil'] },
              { n:'05', color:'#C62DCE', accent:'#C62DCE', title:'GAME ROUTINE',        Icon:Calendar, bullets:['Consistent practice','Warm-up routine','Review sessions','Recovery'] },
              { n:'06', color:'#FF2448', accent:'#FF2448', title:'MENTAL DISCIPLINE',   Icon:Brain,    bullets:['Patience','Decision making','Composure','Learning mindset'] },
            ].map((card, i) => (
              <motion.div key={card.n}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.15 }}
                transition={{ duration:0.5, delay:i*0.08, ease:[0.22,1,0.36,1] }}
                whileHover={{ y:-4, boxShadow:'0 16px 48px rgba(7,17,31,0.13)', transition:{ duration:0.25 } }}
                style={{
                  background:'#FFFFFF', borderRadius:16, border:'1px solid #E8EEF5',
                  boxShadow:'0 4px 24px rgba(7,17,31,0.07)',
                  padding:'28px', position:'relative', overflow:'hidden', minHeight:280,
                }}
              >
                {/* Top accent bar */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:card.color, borderRadius:'3px 3px 0 0' }} />
                {/* Large faded number */}
                <div style={{ position:'absolute', top:16, left:20, fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:42, color:card.color, opacity:0.25, letterSpacing:'-0.02em', lineHeight:1, userSelect:'none' }}>{card.n}</div>
                {/* Icon */}
                <div style={{ marginTop:32, marginBottom:12 }}>
                  <card.Icon size={28} strokeWidth={1.8} color={card.accent} />
                </div>
                {/* Title */}
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:22, color:'#080D16', marginTop:8, letterSpacing:'0.01em' }}>{card.title}</div>
                {/* Bullets */}
                <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:12 }}>
                  {card.bullets.map(b => (
                    <div key={b} style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <Check size={13} color="#1769FF" strokeWidth={2.5} style={{ flexShrink:0 }} />
                      <span style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#526078' }}>{b}</span>
                    </div>
                  ))}
                </div>
                {/* Learn more */}
                <div style={{ marginTop:16, fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.08em', color:card.accent, cursor:'pointer', transition:'opacity 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                  LEARN MORE →
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <FadeUp delay={0.2}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:56 }}>
              <div style={{ width:80, height:1, background:'#DCE4EF' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.3em', color:'#9BAABB', textTransform:'uppercase', whiteSpace:'nowrap' }}>SMALL HABITS. BIGGER RESULTS.</span>
              <div style={{ width:80, height:1, background:'#DCE4EF' }} />
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══ 10-STAGE ROADMAP ══ */}
      <Wrap bg="#FFFFFF" py="120px 0 80px">
        <FadeUp>
          <div style={{ textAlign:'center',marginBottom:40 }}>
            <Eyebrow center color="#6D7B90">THE PATH</Eyebrow>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(36px,5.5vw,64px)',lineHeight:0.92,color:'#0B1220',margin:'0 0 16px' }}>
              10 STAGES.{' '}<GradSpan g="linear-gradient(90deg,#1769FF,#FF1838)">ONE OBJECTIVE.</GradSpan>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif',fontSize:16,color:'#536174' }}>
              Every stage builds on the previous one. Learn the skill, train it, prove it, then move forward.
            </p>
          </div>
        </FadeUp>

        {/* Roadmap container */}
        <div style={{ position:'relative',width:'100%',height:'clamp(440px,38vw,600px)',borderRadius:20,overflow:'hidden' }}>
          {/* Environment background */}
          <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,#EEF4FF 0%,#F7F0FF 40%,#FFF0F2 100%)',borderRadius:20 }} />
          {/* Overlay for readability */}
          <div style={{ position:'absolute',inset:0,background:'rgba(255,255,255,0.85)',borderRadius:20 }} />
          {/* Side annotations */}
          <div style={{ position:'absolute',left:20,top:'55%',transform:'translateY(-50%)',fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:8,letterSpacing:'0.28em',color:'#B0BBC8',writingMode:'vertical-rl',textTransform:'uppercase',userSelect:'none' }}>LEARN PRACTICE IMPROVE</div>
          <div style={{ position:'absolute',right:20,top:'35%',transform:'translateY(-50%)',fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:8,letterSpacing:'0.28em',color:'#B0BBC8',writingMode:'vertical-rl',textTransform:'uppercase',userSelect:'none' }}>SAME PLAYERS DIFFERENT RESULTS</div>

          {/* SVG */}
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid meet" overflow="visible"
            style={{ position:'absolute',inset:0,width:'100%',height:'100%',zIndex:1 }}>
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1769FF"/>
                <stop offset="50%" stopColor="#7137FF"/>
                <stop offset="100%" stopColor="#FF1838"/>
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Track */}
            <path d={SVG_PATH} fill="none" stroke="#DCE4EF" strokeWidth="7" strokeLinecap="round"/>
            {/* Glow halo */}
            <path d={SVG_PATH} fill="none" stroke="url(#rg)" strokeWidth="16" strokeLinecap="round" opacity="0.13"/>
            {/* Animated gradient line */}
            <motion.path d={SVG_PATH} fill="none" stroke="url(#rg)" strokeWidth="4.5" strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength:0, opacity:0 }}
              whileInView={{ pathLength:1, opacity:1 }}
              viewport={{ once:true, amount:0.2 }}
              transition={{ duration:3.2, ease:'easeInOut', delay:0.3 }}
            />
            {/* Animated dot travelling */}
            <motion.circle r="7" fill="#FFFFFF" filter="url(#glow2)"
              initial={{ offsetDistance:'0%', opacity:0 }}
              whileInView={{ offsetDistance:'100%', opacity:[0,1,1,0] }}
              viewport={{ once:true, amount:0.2 }}
              style={{ offsetPath:`path("${SVG_PATH}")` }}
              transition={{ duration:3.2, ease:'easeInOut', delay:0.3 }}
            />

            {/* Nodes */}
            {STAGE_DATA.map((s, i) => {
              const isActive  = activeStage === i
              const isHovered = hoveredNode === i
              const above     = i % 2 === 0
              const ly        = above ? s.cy - 38 : s.cy + 38
              const ly2       = above ? s.cy - 24 : s.cy + 52
              return (
                <g key={i} onClick={() => toggle(i)}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor:'pointer' }}>
                  {/* Outer glow ring */}
                  <circle cx={s.cx} cy={s.cy} r={isActive || isHovered ? 36 : 27}
                    fill={s.color} opacity={isActive ? 0.30 : isHovered ? 0.22 : 0.14}
                    style={{ transition:'r 0.2s,opacity 0.2s' }}/>
                  {/* Active pulse ring */}
                  {isActive && <circle cx={s.cx} cy={s.cy} r={24} fill="none" stroke={s.color} strokeWidth="2" opacity="0.7"/>}
                  {/* Main circle */}
                  <motion.circle cx={s.cx} cy={s.cy}
                    r={isHovered ? 21 : 18}
                    fill={isActive ? s.color : '#FFFFFF'}
                    stroke={s.color} strokeWidth="2.5"
                    style={{ transformBox:'fill-box',transformOrigin:'50% 50%',transition:'r 0.15s' }}
                    initial={{ scale:0, opacity:0 }}
                    whileInView={{ scale:1, opacity:1 }}
                    viewport={{ once:true }}
                    transition={{ delay:i*0.25+3.2, type:'spring', stiffness:200, damping:16 }}/>
                  {/* Crown for stage 10 */}
                  {i === 9 && <motion.text x={s.cx} y={s.cy-32} textAnchor="middle" fill="#FF1838" fontSize="16"
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                    transition={{ delay:9*0.25+3.7 }}>♛</motion.text>}
                  {/* Number */}
                  <motion.text x={s.cx} y={s.cy+5} textAnchor="middle" dominantBaseline="central"
                    fill={isActive ? '#FFFFFF' : s.color} fontSize="11"
                    fontFamily="Barlow Condensed, sans-serif" fontWeight="700"
                    style={{ pointerEvents:'none',userSelect:'none' }}
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                    transition={{ delay:i*0.25+3.35 }}>
                    {String(i+1).padStart(2,'0')}
                  </motion.text>
                  {/* Connector tick */}
                  <line x1={s.cx} y1={above ? s.cy-20 : s.cy+20} x2={s.cx} y2={above ? s.cy-34 : s.cy+34}
                    stroke={s.color} strokeWidth="1.5" opacity="0.6"/>
                  {/* Name */}
                  <motion.text x={s.cx} y={ly} textAnchor="middle"
                    fill="#0B1220" fontSize="12" fontFamily="Barlow Condensed, sans-serif" fontWeight="700"
                    style={{ pointerEvents:'none',userSelect:'none' }}
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                    transition={{ delay:i*0.25+3.45 }}>
                    {s.name}
                  </motion.text>
                  <motion.text x={s.cx} y={ly2} textAnchor="middle"
                    fill="#536174" fontSize="10" fontFamily="Inter, sans-serif"
                    style={{ pointerEvents:'none',userSelect:'none' }}
                    initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
                    transition={{ delay:i*0.25+3.55 }}>
                    {s.sub}
                  </motion.text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Stage detail panel */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div key={activeStage}
              initial={{ opacity:0, y:-16 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
              style={{ display:'flex',borderRadius:20,overflow:'hidden',marginTop:24,border:`1px solid ${active.color}33`,boxShadow:`0 32px 80px rgba(7,17,31,0.35)` }}
            >
              {/* LEFT: info */}
              <div style={{ background:'#07111F',padding:'40px 36px',flex:'0 0 44%',position:'relative' }}>
                {/* Close */}
                <button onClick={() => setActiveStage(null)}
                  style={{ position:'absolute',top:16,right:16,width:32,height:32,borderRadius:'50%',background:'#1A2840',border:'none',cursor:'pointer',color:'#FFFFFF',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = active.color }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1A2840' }}>×</button>
                <div style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:10,letterSpacing:'0.28em',color:active.color,textTransform:'uppercase',marginBottom:6 }}>
                  STAGE {String(active.id).padStart(2,'0')}
                </div>
                <h3 style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(24px,3.5vw,42px)',color:'#FFFFFF',lineHeight:0.92,margin:'0 0 6px' }}>
                  {active.name}
                </h3>
                <div style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:11,letterSpacing:'0.22em',color:'#AAB8C8',textTransform:'uppercase',marginBottom:16 }}>{active.sub}</div>
                {/* Status badge */}
                <div style={{ display:'inline-flex',alignItems:'center',gap:6,background:`${active.color}18`,border:`1px solid ${active.color}44`,borderRadius:6,padding:'4px 12px',marginBottom:18 }}>
                  <div style={{ width:6,height:6,borderRadius:'50%',background:active.color }} />
                  <span style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:10,letterSpacing:'0.22em',color:active.color }}>IN PROGRESS</span>
                </div>
                <p style={{ fontFamily:'Inter,sans-serif',fontSize:14,color:'#94A3B8',lineHeight:1.7,marginBottom:24 }}>
                  {active.objective}. {active.why}
                </p>
                {/* Skills */}
                <div style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:700,fontSize:10,letterSpacing:'0.28em',color:'#AAB8C8',textTransform:'uppercase',marginBottom:12 }}>CORE SKILLS</div>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
                  {active.skills.map(sk => (
                    <div key={sk} style={{ display:'flex',alignItems:'center',gap:8 }}>
                      <div style={{ width:18,height:18,borderRadius:'50%',background:`${active.color}18`,border:`1px solid ${active.color}55`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:9,color:active.color,fontWeight:700 }}>✓</div>
                      <span style={{ fontFamily:'Inter,sans-serif',fontSize:13,color:'#C8D8F0' }}>{sk}</span>
                    </div>
                  ))}
                </div>
                {/* Next stage */}
                {active.next && (
                  <div style={{ marginTop:24,paddingTop:20,borderTop:'1px solid #1E2D42' }}>
                    <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:10,letterSpacing:'0.22em',color:'#536174',marginBottom:6 }}>NEXT STAGE</div>
                    <div style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:18,color:'#FFFFFF' }}>{active.next} →</div>
                  </div>
                )}
              </div>

              {/* RIGHT: image */}
              <div style={{ flex:1,position:'relative',minHeight:340,background:'#0B1220' }}>
                <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12 }}>
                  <div style={{ fontSize:56,opacity:0.2 }}>🗺️</div>
                  <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:13,fontWeight:600,letterSpacing:'0.3em',color:'#3D5070' }}>[ STAGE IMAGE ]</div>
                </div>
                <img src={active.image} alt={active.name}
                  style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover' }}
                  onError={e => { e.target.style.display='none' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrap>

      {/* ══ DEVELOPMENT LOOP ══ */}
      <Wrap bg="#FFFFFF" py="100px 0">
        <FadeUp>
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <Eyebrow center color="#6D7B90">THE DEVELOPMENT LOOP</Eyebrow>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(28px,4.5vw,52px)',lineHeight:0.92,color:'#0B1220',margin:'0 0 16px' }}>
              LEARN → PRACTICE → ASSESS → <GradSpan>IMPROVE</GradSpan>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif',fontSize:16,color:'#536174' }}>
              Every stage runs the same cycle. Finish it and the next stage unlocks.
            </p>
          </div>
        </FadeUp>
        <div style={{ display:'flex',alignItems:'stretch',justifyContent:'center',gap:0,flexWrap:'wrap' }}>
          {LOOP.map((step, i) => (
            <div key={step.label} style={{ display:'flex',alignItems:'center' }}>
              <motion.div
                initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,amount:0.2 }}
                transition={{ duration:0.5,delay:i*0.09,ease:[0.22,1,0.36,1] }}
                style={{ background:'#FFFFFF',borderRadius:12,border:'1px solid #DCE4EF',borderLeft:`3px solid ${step.border}`,padding:'24px 20px',width:'clamp(130px,15vw,185px)',flexShrink:0,boxShadow:'0 4px 16px rgba(7,17,31,0.05)' }}
              >
                <div style={{ width:32,height:32,borderRadius:'50%',background:`${step.border}12`,border:`1px solid ${step.border}33`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12 }}>
                  <div style={{ width:12,height:12,borderRadius:'50%',background:step.border }} />
                </div>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:18,color:'#0B1220',letterSpacing:'0.03em',marginBottom:8 }}>{step.label}</div>
                <div style={{ fontFamily:'Inter,sans-serif',fontSize:13,lineHeight:1.55,color:'#536174' }}>{step.desc}</div>
              </motion.div>
              {i < LOOP.length - 1 && (
                <div style={{ padding:'0 8px',fontSize:18,fontWeight:700,background:GRAD,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',flexShrink:0 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </Wrap>

      {/* ══ YOUR PROGRESS ══ */}
      <section style={{ background:'#07111F',padding:'100px 0' }}>
        <div style={{ maxWidth:1100,margin:'0 auto',padding:'0 clamp(20px,5vw,64px)' }}>
          <FadeUp>
            <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:40,flexWrap:'wrap',gap:12 }}>
              <div>
                <Eyebrow color="#AAB8C8">YOUR PROGRESS</Eyebrow>
                <h2 style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(28px,4vw,44px)',color:'#FFFFFF',margin:0 }}>
                  STAGE 04 / 10
                </h2>
                <div style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:11,letterSpacing:'0.22em',color:'#7137FF',textTransform:'uppercase',marginTop:4 }}>CLOSE-RANGE MECHANICS</div>
              </div>
              <div style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(22px,3vw,32px)',background:GRAD,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                40% COMPLETE
              </div>
            </div>
          </FadeUp>

          <motion.div
            initial={{ opacity:0,y:32 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true,amount:0.2 }}
            transition={{ duration:0.7,ease:[0.22,1,0.36,1] }}
            style={{ background:'#0B1828',borderRadius:20,padding:'36px 32px',border:'1px solid #1769FF1A',boxShadow:'0 24px 60px rgba(23,105,255,0.10)' }}
          >
            <div style={{ display:'flex',alignItems:'flex-start',gap:0 }}>
              {PROGRESS_STAGES.map((ps, i) => {
                const done    = ps.state === 'done'
                const current = ps.state === 'current'
                const elite   = ps.state === 'elite'
                const lockedR = ps.state === 'locked-red'

                const bg = done ? '#1769FF' : current ? '#7137FF' : elite
                  ? 'linear-gradient(135deg,#1769FF33,#FF183833)' : '#0D1F35'
                const border = done ? 'none' : current ? '2px solid #7137FF55' : elite
                  ? '1px solid #7137FF44' : lockedR ? '1px solid #FF183833' : '1px solid #1769FF22'
                const connector = done ? '#1769FF' : current ? 'linear-gradient(90deg,#7137FF,#9B5BFF)' : '#1A2840'

                return (
                  <div key={i} style={{ display:'flex',alignItems:'center',flex:1 }}>
                    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:44 }}>
                      <motion.div initial={{ scale:0,opacity:0 }} whileInView={{ scale:1,opacity:1 }} viewport={{ once:true }}
                        transition={{ delay:i*0.06,type:'spring',stiffness:200 }}
                        style={{ width:44,height:44,borderRadius:'50%',background:bg,border,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                        {done    && <span style={{ color:'#FFFFFF',fontSize:15,fontWeight:700 }}>✓</span>}
                        {current && <span style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:13,color:'#FFFFFF' }}>04</span>}
                        {elite   && <span style={{ color:'#7137FF',fontSize:15 }}>♛</span>}
                        {!done && !current && !elite && <span style={{ fontSize:13,opacity:0.5 }}>🔒</span>}
                      </motion.div>
                      <div style={{ fontFamily:'Inter,sans-serif',fontSize:9,color:done?'#1769FF':current?'#7137FF':'#3D5070',textAlign:'center',marginTop:6,lineHeight:1.3,width:52,wordBreak:'break-word' }}>{ps.label}</div>
                      {(done||current) && <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:8,letterSpacing:'0.12em',color:done?'#1769FF':'#7137FF',textTransform:'uppercase',marginTop:2 }}>{done?'DONE':'NOW'}</div>}
                    </div>
                    {i < PROGRESS_STAGES.length - 1 && (
                      <div style={{ flex:1,height:2,background:connector,marginTop:-28,marginLeft:-2,marginRight:-2 }} />
                    )}
                  </div>
                )
              })}
            </div>
            <div style={{ display:'flex',gap:24,marginTop:28,flexWrap:'wrap' }}>
              {[['#1769FF','Completed'],['#7137FF','Current'],['#1A2840','Locked']].map(([c,l]) => (
                <div key={l} style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:10,height:10,borderRadius:'50%',background:c }} />
                  <span style={{ fontFamily:'Inter,sans-serif',fontSize:12,color:'#AAB8C8' }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ MAP KNOWLEDGE ══ */}
      <Wrap bg="#FFFFFF" py="120px 0">
        <div style={{ display:'flex',alignItems:'center',gap:'clamp(40px,6vw,64px)',flexWrap:'wrap' }}>
          {/* Image left */}
          <motion.div style={{ flex:'1 1 340px',minWidth:0 }}
            initial={{ opacity:0,x:-40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true,amount:0.15 }}
            transition={{ duration:0.8,ease:[0.22,1,0.36,1] }}
            whileHover={{ y:-5,scale:1.01,transition:{ duration:0.3 } }}>
            <div style={{ width:'100%',height:390,borderRadius:16,overflow:'hidden',position:'relative',border:'1px solid #1769FF44',boxShadow:'0 25px 80px rgba(23,105,255,0.18)' }}>
              <div style={{ position:'absolute',inset:0,background:'#07111F',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12 }}>
                <div style={{ fontSize:64,opacity:0.25 }}>🗺️</div>
                <div style={{ fontFamily:'Rajdhani,sans-serif',fontSize:12,fontWeight:600,letterSpacing:'0.3em',color:'#3D5070' }}>[ MAP-KNOWLEDGE.PNG ]</div>
                <div style={{ fontFamily:'Inter,sans-serif',fontSize:11,color:'#2D3F55' }}>Drop map-knowledge.webp in /public</div>
              </div>
              <img src="/map-knowledge.png" alt="Map Knowledge"
                style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover' }}
                onError={e => { e.target.style.display='none' }} />
            </div>
          </motion.div>

          {/* Text right */}
          <motion.div style={{ flex:'1 1 380px',minWidth:0 }}
            initial={{ opacity:0,x:40 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true,amount:0.15 }}
            transition={{ duration:0.8,delay:0.15,ease:[0.22,1,0.36,1] }}>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
              <div style={{ width:40,height:2,background:'#1769FF' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:12,color:'#1769FF',letterSpacing:'0.25em' }}>05</span>
              <span style={{ color:'#C0CAD6' }}>—</span>
              <span style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:12,color:'#6D7B90',letterSpacing:'0.2em' }}>MAP KNOWLEDGE</span>
            </div>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(32px,5vw,58px)',lineHeight:0.92,color:'#0B1220',margin:'0 0 20px' }}>
              KNOW THE<br /><GradSpan g="linear-gradient(90deg,#1769FF,#FF1838)">BATTLEFIELD</GradSpan>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif',fontSize:16,lineHeight:1.6,color:'#536174',maxWidth:480,margin:'0 0 24px' }}>
              Understand rotations, compounds, loot routes, vehicle spawns and zone patterns before the match forces you to.
            </p>
            <div style={{ display:'flex',flexDirection:'column',gap:12,marginBottom:32 }}>
              {['POIs & callouts','Rotations & zones','Vehicle spawns','Compound knowledge'].map(b => (
                <div key={b} style={{ display:'flex',alignItems:'center',gap:12 }}>
                  <div style={{ width:22,height:22,borderRadius:'50%',background:'#1769FF12',border:'1px solid #1769FF55',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:11,color:'#1769FF',fontWeight:700 }}>✓</div>
                  <span style={{ fontFamily:'Inter,sans-serif',fontSize:14,color:'#536174' }}>{b}</span>
                </div>
              ))}
            </div>
            <RadialRevealButton label="EXPLORE MAP KNOWLEDGE →" padding="13px 28px" rounded={8}
              font={{ fontFamily:'Inter,sans-serif',fontWeight:600,fontSize:14 }}
              colors={{ fill:'#0B1220',textColor:'#FFFFFF',hoverFill:'#1769FF',hoverTextColor:'#FFFFFF' }}
              border={{ borderWidth:0 }} />
          </motion.div>
        </div>
      </Wrap>

      {/* ══ ELITE CTA ══ */}
      <section style={{ position:'relative',minHeight:380,overflow:'hidden',background:'#080D15' }}>
        <div style={{ position:'absolute',bottom:-100,left:-100,width:600,height:600,background:'radial-gradient(circle,rgba(23,105,255,0.20) 0%,transparent 70%)',zIndex:1 }} />
        <div style={{ position:'absolute',top:-100,right:-100,width:600,height:600,background:'radial-gradient(circle,rgba(255,24,56,0.20) 0%,transparent 70%)',zIndex:1 }} />

        <div style={{ position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:380,padding:'80px clamp(20px,5vw,64px)',textAlign:'center' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true,amount:0.3 }}
            style={{ display:'flex',flexDirection:'column',alignItems:'center' }}>
            <motion.div variants={child} style={{ fontFamily:'Rajdhani,sans-serif',fontWeight:600,fontSize:11,letterSpacing:'0.35em',color:'#AAB8C8',textTransform:'uppercase',marginBottom:20 }}>
              DISCIPLINE BUILDS FREEDOM
            </motion.div>
            <motion.h2 variants={child} style={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:'clamp(40px,6.5vw,68px)',lineHeight:0.9,color:'#FFFFFF',margin:'0 0 16px' }}>
              ARE YOU READY TO GO <GradSpan>ELITE?</GradSpan>
            </motion.h2>
            <motion.p variants={child} style={{ fontFamily:'Inter,sans-serif',fontSize:15,color:'#AAB8C8',maxWidth:560,lineHeight:1.7,margin:'0 0 32px' }}>
              Master the fundamentals. Build your mechanics. Understand the game. Execute under pressure.
            </motion.p>
            <motion.div variants={child} style={{ display:'flex',gap:16,flexWrap:'wrap',justifyContent:'center' }}>
              <RadialRevealButton label="START YOUR JOURNEY →" padding="16px 44px" rounded={8}
                font={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:18,letterSpacing:'0.06em' }}
                colors={{ fill:'#FFFFFF',textColor:'#0B1220',hoverFill:'#1769FF',hoverTextColor:'#FFFFFF' }}
                border={{ borderWidth:0 }} />
              <RadialRevealButton label="EXPLORE FEATURES →" padding="16px 36px" rounded={8}
                font={{ fontFamily:'Barlow Condensed,sans-serif',fontWeight:700,fontSize:18,letterSpacing:'0.06em' }}
                colors={{ fill:'transparent',textColor:'#FFFFFF',hoverFill:'#FFFFFF',hoverTextColor:'#0B1220' }}
                border={{ borderWidth:2,borderStyle:'solid',borderColor:'rgba(255,255,255,0.28)' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        .prereq-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }
        @media (max-width: 1023px) { .prereq-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 639px)  { .prereq-grid { grid-template-columns: 1fr; } }
        @media (max-width: 767px) {
          svg text { font-size: 9px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  )
}
