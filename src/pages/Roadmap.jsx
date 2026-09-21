import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ── Data ── */
const STAGE_DATA = [
  { id:1,  cx:60,   cy:420, name:'Foundation',     sub:'Build Your Base',           color:'#1769FF', objective:'Build your competitive base',    description:'Master the fundamentals before everything else.',                    skills:['Stable FPS setup','Sensitivity calibration','Gyroscope control','Movement fundamentals','Camera discipline','Mental baseline'] },
  { id:2,  cx:180,  cy:260, name:'Aim Fundamentals',sub:'Build Reliable Aim',        color:'#2D7FFF', objective:'Build reliable aim',             description:'Aim is your primary weapon. Build it systematically.',               skills:['Crosshair placement','ADS control','Tracking targets','Flick shots','Target switching','Aim consistency'] },
  { id:3,  cx:280,  cy:220, name:'Recoil & Spray',  sub:'Control Your Weapons',      color:'#4A8AFF', objective:'Control your weapons',           description:'Spray control separates good players from great ones.',              skills:['Recoil patterns','Spray transfers','Burst discipline','Weapon familiarity','Distance control','Attachment setup'] },
  { id:4,  cx:380,  cy:340, name:'Close-Range',     sub:'Win The Fight',             color:'#7137FF', objective:'Win the close fight',            description:'CQC mechanics decide most BGMI gunfights.',                          skills:['Pre-fire angles','Peek mechanics','Hip fire accuracy','Movement in fights','Shot timing','Escape routes'] },
  { id:5,  cx:480,  cy:380, name:'Map Knowledge',   sub:'Know The Battlefield',      color:'#9B5BFF', objective:'Know the battlefield',           description:'Understand every POI, rotation and zone pattern.',                   skills:['POI callouts','Rotation routes','Zone patterns','Vehicle spawn points','Compound knowledge','Loot paths'] },
  { id:6,  cx:580,  cy:200, name:'Game Sense',      sub:'Make Better Decisions',     color:'#C060FF', objective:'Make better decisions',          description:'Stop reacting. Start predicting.',                                   skills:['Information gathering','Risk assessment','Enemy prediction','Positioning logic','Timing awareness','Adaptive play'] },
  { id:7,  cx:680,  cy:160, name:'Strategy',        sub:'Control The Game',          color:'#E040A0', objective:'Control the game',              description:'Zone control and rotation mastery.',                                  skills:['Zone prediction','Rotation timing','Position selection','Compound control','Fallback planning','Team coordination'] },
  { id:8,  cx:780,  cy:300, name:'Teamplay',        sub:'Play As One',               color:'#FF4060', objective:'Play as one',                   description:'Solo skills mean nothing without team execution.',                    skills:['Communication','Role discipline','Trade mechanics','Squad spacing','Combined pushes','Support rotations'] },
  { id:9,  cx:880,  cy:340, name:'Competitive',     sub:'Perform Under Pressure',    color:'#FF2A40', objective:'Perform under pressure',         description:'Scrims, tournaments, pressure environments.',                        skills:['Scrim mentality','Adaptation speed','Tilt control','Performance review','Tournament preparation','Clutch execution'] },
  { id:10, cx:1100, cy:80,  name:'Go Elite',        sub:'Become Tournament Ready',   color:'#FF1838', objective:'Become tournament ready',        description:'The final stage. Consistency at the highest level.',                 skills:['Elite consistency','Advanced decision making','Team synergy','Performance analysis','Mental toughness','Continuous improvement'] },
]

const PREREQS = [
  { icon:'⚙️', n:'01', title:'DEVICE & SETTINGS',  bullets:['Stable FPS','Correct sensitivity','Gyroscope setup','Comfortable controls'] },
  { icon:'🏃', n:'02', title:'CONTROL & MOVEMENT', bullets:['Movement basics','Camera control','Peeking','Positioning'] },
  { icon:'🎯', n:'03', title:'AIM FUNDAMENTALS',   bullets:['Crosshair placement','ADS control','Tracking','Flick control'] },
  { icon:'💥', n:'04', title:'RECOIL CONTROL',     bullets:['Weapon familiarity','Spray control','Burst discipline','Vertical recoil'] },
  { icon:'📅', n:'05', title:'GAME ROUTINE',       bullets:['Consistent practice','Warm-up routine','Review sessions','Recovery'] },
  { icon:'🧠', n:'06', title:'MENTAL DISCIPLINE',  bullets:['Patience','Decision making','Composure','Learning mindset'] },
]

const PROGRESSION = [
  { icon:'🎮', n:'01', label:'FOUNDATION',  desc:'Build the fundamentals.', color:'#1769FF' },
  { icon:'🎯', n:'02', label:'MECHANICS',   desc:'Build mechanical consistency.', color:'#4A90FF' },
  { icon:'🧩', n:'03', label:'GAME IQ',     desc:'Understand situations and decisions.', color:'#7137FF' },
  { icon:'🏆', n:'04', label:'COMPETITION', desc:'Perform under pressure.', color:'#FF1838' },
]

const LOOP_STEPS = [
  { icon:'📚', label:'LEARN',     desc:'Real material per stage — not a wall of generic tips.',                   border:'#1769FF' },
  { icon:'🎮', label:'PRACTICE',  desc:'Structured drills linked directly to what you just studied.',             border:'#4A90FF' },
  { icon:'📊', label:'ASSESS',    desc:'A scored assessment — not a quiz for the sake of it.',                    border:'#7137FF' },
  { icon:'🏆', label:'RESULT',    desc:'An honest read on where you stand based on your actual answers.',         border:'#C060FF' },
  { icon:'➡️', label:'NEXT STEP', desc:'A specific weakness to work on before the next stage unlocks.',          border:'#FF1838' },
]

const PROGRESS_STAGES = [
  { label:'Foundation',  state:'completed' },
  { label:'Aim',         state:'completed' },
  { label:'Recoil',      state:'completed' },
  { label:'Close-Range', state:'current'   },
  { label:'Map',         state:'locked'    },
  { label:'Game Sense',  state:'locked'    },
  { label:'Strategy',    state:'locked'    },
  { label:'Teamplay',    state:'locked-red'},
  { label:'Performance', state:'locked-red'},
  { label:'Go Elite',    state:'elite'     },
]

const SVG_PATH = 'M 60,420 C 100,420 140,260 220,220 S 320,380 420,380 S 520,180 620,160 S 720,340 820,340 S 920,140 1020,100 L 1140,60'

/* ── Helpers ── */
const GR = 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)'

function Eyebrow({ children, center = false, color = '#6D7B90' }) {
  return (
    <div style={{
      fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11,
      letterSpacing: '0.35em', textTransform: 'uppercase', color,
      marginBottom: 12, textAlign: center ? 'center' : 'left',
    }}>
      {children}
    </div>
  )
}

function GradText({ children, gradient = GR }) {
  return (
    <span style={{
      background: gradient,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    }}>
      {children}
    </span>
  )
}

function SectionWrap({ children, bg = '#FFFFFF', py = '120px 0', id }) {
  return (
    <section id={id} style={{ background: bg, padding: py, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)' }}>
        {children}
      </div>
    </section>
  )
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function FadeIn({ children, delay = 0, y = 24, x = 0, once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function RoadmapPage() {
  const [activeStage, setActiveStage] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)

  const active = activeStage !== null ? STAGE_DATA[activeStage] : null

  function toggleStage(i) { setActiveStage(prev => prev === i ? null : i) }

  return (
    <div style={{ background: '#FFFFFF', overflowX: 'hidden' }}>
      <Navbar activePage="roadmap" />

      {/* ══ SECTION 2: HERO ══ */}
      <section style={{ background: '#FFFFFF', minHeight: 580, overflow: 'hidden', position: 'relative' }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, #DCE4EF 1px, transparent 1px)',
          backgroundSize: '28px 28px', opacity: 0.4, pointerEvents: 'none',
        }} />
        {/* Shards */}
        <div style={{ position:'absolute', top:-40, left:-40, width:300, height:340, background:'#1769FF', opacity:0.07, clipPath:'polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:-30, right:-30, width:260, height:300, background:'#FF1838', opacity:0.07, clipPath:'polygon(0% 0%, 100% 20%, 100% 100%, 40% 80%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-20, left:80, width:180, height:200, background:'#1769FF', opacity:0.04, clipPath:'polygon(20% 0%, 100% 10%, 80% 100%, 0% 90%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, right:80, width:160, height:180, background:'#FF1838', opacity:0.04, clipPath:'polygon(0% 10%, 100% 0%, 100% 90%, 10% 100%)', pointerEvents:'none' }} />
        {/* Left vertical text */}
        <div style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#C0CAD6', writingMode:'vertical-rl', textTransform:'uppercase', pointerEvents:'none', userSelect:'none' }}>
          TRAIN ANALYZE DOMINATE
        </div>
        {/* Right vertical text */}
        <div style={{ position:'absolute', right:24, top:'50%', transform:'translateY(-50%)', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#C0CAD6', writingMode:'vertical-rl', textTransform:'uppercase', pointerEvents:'none', userSelect:'none' }}>
          DISCIPLINE BUILDS FREEDOM
        </div>

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(48px,6vw,96px)', display:'flex', alignItems:'center', gap:'clamp(40px,5vw,64px)', minHeight:580, flexWrap:'wrap' }}>
          {/* Left */}
          <motion.div
            style={{ flex:'1 1 420px', minWidth:0 }}
            variants={stagger} initial="hidden" animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow color="#6D7B90">YOUR JOURNEY STARTS HERE</Eyebrow>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily:'Barlow Condensed,sans-serif', fontWeight:700,
                fontSize:'clamp(48px,7vw,88px)', lineHeight:0.92,
                letterSpacing:'-0.02em', color:'#0B1220', margin:'0 0 24px',
              }}
            >
              A CLEAR ROADMAP<br />
              TO <GradText>GREATNESS</GradText>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily:'Inter,sans-serif', fontSize:16, lineHeight:1.6, color:'#536174', maxWidth:520, margin:'0 0 32px' }}
            >
              Stop guessing what to practice. Esports Elite gives you a structured path from foundational mechanics to competitive-level performance.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'center' }}>
              <RadialRevealButton
                label="START YOUR JOURNEY →"
                padding="14px 32px" rounded={8}
                font={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:16, letterSpacing:'0.06em' }}
                colors={{ fill:'#0B1220', textColor:'#FFFFFF', hoverFill:'#1769FF', hoverTextColor:'#FFFFFF' }}
                border={{ borderWidth:0 }}
              />
              <RadialRevealButton
                label="▶ WATCH HOW IT WORKS"
                padding="14px 28px" rounded={8}
                font={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14 }}
                colors={{ fill:'#FFFFFF', textColor:'#111827', hoverFill:'#111827', hoverTextColor:'#FFFFFF' }}
                border={{ borderWidth:1.5, borderStyle:'solid', borderColor:'#B8C4D3' }}
              />
            </motion.div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            style={{ flex:'1 1 340px', minWidth:0, position:'relative' }}
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}
            whileHover={{ y:-4 }}
          >
            {/* Blue ambient glow */}
            <div style={{ position:'absolute', right:-80, top:'50%', transform:'translateY(-50%)', width:500, height:500, background:'radial-gradient(circle, rgba(23,105,255,0.10) 0%, transparent 70%)', zIndex:0, pointerEvents:'none' }} />
            <div style={{ position:'relative', width:'100%', height:520, borderRadius:16, overflow:'hidden', zIndex:1 }}>
              {/* Placeholder (always rendered behind) */}
              <div style={{ position:'absolute', inset:0, background:'#07111F', borderRadius:16, border:'1px solid #1769FF33', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
                <div style={{ fontSize:64, opacity:0.3 }}>🏆</div>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:13, fontWeight:600, letterSpacing:'0.3em', color:'#536174' }}>[ ROADMAP HERO IMAGE ]</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#3D4F63' }}>Drop roadmap-hero.png in public/</div>
              </div>
              {/* Real image on top */}
              <img
                src="/roadmap-hero.png" alt="Roadmap Hero"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', borderRadius:16 }}
                onError={e => { e.target.style.display = 'none' }}
              />
              {/* Corner brackets */}
              <div style={{ position:'absolute', top:12, left:12, width:20, height:20, borderTop:'2px solid #1769FF66', borderLeft:'2px solid #1769FF66', zIndex:2 }} />
              <div style={{ position:'absolute', bottom:12, right:12, width:20, height:20, borderBottom:'2px solid #FF183866', borderRight:'2px solid #FF183866', zIndex:2 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 3: PLAYER PROGRESSION ══ */}
      <SectionWrap bg="#FFFFFF" py="120px 0 100px">
        <FadeIn>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <Eyebrow center color="#6D7B90">PLAYER PROGRESSION</Eyebrow>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(32px,5vw,58px)', lineHeight:0.92, color:'#0B1220', margin:'0 0 16px' }}>
              FROM PLAYER TO <GradText>COMPETITOR</GradText>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#536174', margin:0 }}>
              A structured path. Real improvement. Measurable results.
            </p>
          </div>
        </FadeIn>

        <div style={{ display:'flex', alignItems:'stretch', gap:0, justifyContent:'center', flexWrap:'wrap' }}>
          {PROGRESSION.map((p, i) => (
            <div key={p.label} style={{ display:'flex', alignItems:'center' }}>
              <motion.div
                initial={{ opacity:0, y:40 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration:0.55, delay:i*0.1, ease:[0.22,1,0.36,1] }}
                whileHover={{ y:-6, boxShadow:`0 20px 48px ${p.color}28`, transition:{ duration:0.25 } }}
                style={{
                  background:'#FFFFFF', borderRadius:14,
                  border:`1px solid #DCE4EF`,
                  padding:'28px 24px', textAlign:'center',
                  width:'clamp(160px,18vw,210px)', flexShrink:0,
                  boxShadow:'0 8px 32px rgba(7,17,31,0.06)',
                  position:'relative', overflow:'hidden',
                }}
              >
                {/* Top accent bar */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:p.color, borderRadius:'3px 3px 0 0' }} />
                <div style={{ fontSize:32, marginBottom:8 }}>{p.icon}</div>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, color:p.color, letterSpacing:'0.2em', marginBottom:4 }}>{p.n}</div>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:22, color:'#0B1220', letterSpacing:'0.02em', marginBottom:8 }}>{p.label}</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.6, color:'#536174' }}>{p.desc}</div>
              </motion.div>
              {i < PROGRESSION.length - 1 && (
                <div style={{ padding:'0 10px', fontSize:18, fontWeight:700, background:GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', flexShrink:0 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </SectionWrap>

      {/* ══ SECTION 4: PREREQUISITES ══ */}
      <SectionWrap bg="#F7F9FC" py="120px 0">
        <FadeIn>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <Eyebrow center color="#6D7B90">BEFORE YOU START</Eyebrow>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(32px,5vw,58px)', lineHeight:0.92, color:'#0B1220', margin:'0 0 16px' }}>
              BUILD THE{' '}
              <GradText gradient="linear-gradient(90deg,#1769FF,#3D8BFF)">FOUNDATION</GradText>
              {' '}
              <GradText gradient="linear-gradient(90deg,#FF5060,#FF1838)">FIRST</GradText>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#536174', maxWidth:680, margin:'0 auto' }}>
              Elite performance starts with fundamentals. Make sure your setup, mechanics and habits are ready before chasing advanced skills.
            </p>
          </div>
        </FadeIn>

        <div className="prereq-grid">
          {PREREQS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.15 }}
              transition={{ duration:0.5, delay:i*0.08, ease:[0.22,1,0.36,1] }}
              whileHover={{ y:-4, borderColor:'#1769FF44', transition:{ duration:0.2 } }}
              style={{
                background:'#FFFFFF', borderRadius:14,
                border:'1px solid #DCE4EF',
                padding:'28px 24px',
                boxShadow:'0 4px 20px rgba(7,17,31,0.05)',
              }}
            >
              <div style={{ fontSize:32, marginBottom:12 }}>{p.icon}</div>
              <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, color:'#1769FF', letterSpacing:'0.2em', marginBottom:6 }}>{p.n}</div>
              <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:20, color:'#0B1220', letterSpacing:'0.02em', marginBottom:12 }}>{p.title}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {p.bullets.map(b => (
                  <div key={b} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:16, height:16, borderRadius:'50%', background:'#1769FF15', border:'1px solid #1769FF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:9, color:'#1769FF', fontWeight:700 }}>✓</div>
                    <span style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#536174' }}>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrap>

      {/* ══ SECTION 5: MAIN ROADMAP ══ */}
      <SectionWrap bg="#FFFFFF" py="120px 0">
        <FadeIn>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <Eyebrow center color="#6D7B90">THE PATH</Eyebrow>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(36px,5.5vw,64px)', lineHeight:0.92, color:'#0B1220', margin:'0 0 16px' }}>
              10 STAGES.{' '}<GradText gradient="linear-gradient(90deg,#1769FF,#FF1838)">ONE OBJECTIVE.</GradText>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#536174' }}>
              Every stage builds on the previous one. Learn the skill, train it, prove it, then move forward.
            </p>
          </div>
        </FadeIn>

        {/* Roadmap visual container */}
        <div style={{ position:'relative', width:'100%', height:560, borderRadius:16, overflow:'hidden' }}>
          {/* Background image / fallback */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#EEF4FF 0%,#F0ECFF 40%,#FFEEF2 100%)', borderRadius:16 }}>
            <img
              src="/roadmap-environment.png" alt=""
              style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:16 }}
              onError={e => { e.target.style.display='none' }}
            />
          </div>
          {/* White overlay */}
          <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.60)', borderRadius:16 }} />

          {/* SVG */}
          <svg
            viewBox="0 0 1200 500"
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1 }}
          >
            <defs>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1769FF" />
                <stop offset="50%" stopColor="#7137FF" />
                <stop offset="100%" stopColor="#FF1838" />
              </linearGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Track */}
            <path d={SVG_PATH} fill="none" stroke="#DCE4EF" strokeWidth="6" strokeLinecap="round" />

            {/* Glow layer */}
            <path d={SVG_PATH} fill="none" stroke="url(#roadGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.12" />

            {/* Animated gradient path */}
            <motion.path
              d={SVG_PATH}
              fill="none"
              stroke="url(#roadGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 3, ease: 'easeInOut', delay: 0.2 }}
            />

            {/* Nodes */}
            {STAGE_DATA.map((s, i) => {
              const isActive = activeStage === i
              const isHovered = hoveredNode === i
              const labelAbove = i % 2 === 0
              return (
                <g
                  key={i}
                  onClick={() => toggleStage(i)}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glow */}
                  <circle
                    cx={s.cx} cy={s.cy} r={isHovered || isActive ? 34 : 26}
                    fill={s.color} opacity={isHovered || isActive ? 0.28 : 0.14}
                    style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
                  />
                  {/* Active ring */}
                  {isActive && (
                    <circle cx={s.cx} cy={s.cy} r={22} fill="none" stroke={s.color} strokeWidth="2.5" opacity="0.8" />
                  )}
                  {/* Main circle */}
                  <motion.circle
                    cx={s.cx} cy={s.cy}
                    r={isHovered ? 20 : 18}
                    fill={isActive ? s.color : '#FFFFFF'}
                    stroke={s.color}
                    strokeWidth="2.5"
                    style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', transition: 'r 0.15s ease' }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.25 + 3, type: 'spring', stiffness: 200, damping: 16 }}
                  />
                  {/* Crown for stage 10 */}
                  {i === 9 && (
                    <motion.text
                      x={s.cx} y={s.cy - 32}
                      textAnchor="middle" fill={s.color} fontSize="14"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      transition={{ delay: 9 * 0.25 + 3.4 }}
                    >♛</motion.text>
                  )}
                  {/* Number */}
                  <motion.text
                    x={s.cx} y={s.cy + 5}
                    textAnchor="middle" dominantBaseline="central"
                    fill={isActive ? '#FFFFFF' : s.color}
                    fontSize="11" fontFamily="Barlow Condensed, sans-serif" fontWeight="700"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.25 + 3.3 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.text>
                  {/* Stage label */}
                  <motion.text
                    x={s.cx} y={labelAbove ? s.cy - 34 : s.cy + 34}
                    textAnchor="middle"
                    fill="#0B1220" fontSize="13"
                    fontFamily="Barlow Condensed, sans-serif" fontWeight="700"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.25 + 3.4 }}
                  >
                    {s.name}
                  </motion.text>
                  <motion.text
                    x={s.cx} y={labelAbove ? s.cy - 20 : s.cy + 49}
                    textAnchor="middle"
                    fill="#536174" fontSize="11"
                    fontFamily="Inter, sans-serif"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.25 + 3.5 }}
                  >
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
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                background: '#07111F',
                borderRadius: 16,
                padding: '40px 40px 36px',
                marginTop: 24,
                border: `1px solid ${active.color}44`,
                boxShadow: `0 30px 80px rgba(23,105,255,0.20)`,
              }}
            >
              {/* Close */}
              <button
                onClick={() => setActiveStage(null)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#1A2840', border: 'none', cursor: 'pointer',
                  color: '#FFFFFF', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = active.color }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1A2840' }}
              >
                ×
              </button>

              <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.25em', color:active.color, marginBottom:8 }}>
                STAGE {String(active.id).padStart(2,'0')}
              </div>
              <h3 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,48px)', color:'#FFFFFF', lineHeight:0.9, margin:'0 0 8px' }}>
                {active.name.toUpperCase()}
              </h3>
              <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.3em', color:'#AAB8C8', marginBottom:16, textTransform:'uppercase' }}>
                {active.objective}
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#AAB8C8', lineHeight:1.6, maxWidth:600, margin:'0 0 24px' }}>
                {active.description}
              </p>
              <div className="skills-grid">
                {active.skills.map(sk => (
                  <div key={sk} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:20, height:20, borderRadius:'50%', background:`${active.color}18`, border:`1px solid ${active.color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:10, color:active.color, fontWeight:700 }}>✓</div>
                    <span style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#C8D8F0' }}>{sk}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <RadialRevealButton
                  label={`NEXT STAGE →`}
                  padding="12px 28px" rounded={8}
                  font={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14 }}
                  colors={{ fill: active.color, textColor:'#FFFFFF', hoverFill:'#0B1220', hoverTextColor:'#FFFFFF' }}
                  border={{ borderWidth:0 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionWrap>

      {/* ══ SECTION 6: DEVELOPMENT LOOP ══ */}
      <SectionWrap bg="#FFFFFF" py="100px 0">
        <FadeIn>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <Eyebrow center color="#6D7B90">THE DEVELOPMENT LOOP</Eyebrow>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(28px,4.5vw,52px)', lineHeight:0.92, color:'#0B1220', margin:'0 0 16px' }}>
              LEARN → PRACTICE → ASSESS → <GradText>IMPROVE</GradText>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#536174' }}>
              Every stage runs the same cycle. Finish it and the next stage unlocks.
            </p>
          </div>
        </FadeIn>

        <div style={{ display:'flex', alignItems:'stretch', gap:0, justifyContent:'center', flexWrap:'wrap' }}>
          {LOOP_STEPS.map((step, i) => (
            <div key={step.label} style={{ display:'flex', alignItems:'center' }}>
              <motion.div
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration:0.5, delay:i*0.09, ease:[0.22,1,0.36,1] }}
                style={{
                  background:'#FFFFFF', borderRadius:12,
                  border:'1px solid #DCE4EF',
                  borderLeft:`3px solid ${step.border}`,
                  padding:'24px 20px',
                  width:'clamp(140px,16vw,190px)', flexShrink:0,
                  boxShadow:'0 4px 16px rgba(7,17,31,0.05)',
                }}
              >
                <div style={{ fontSize:28, marginBottom:8 }}>{step.icon}</div>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:18, color:'#0B1220', letterSpacing:'0.03em', marginBottom:8 }}>{step.label}</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, lineHeight:1.6, color:'#536174' }}>{step.desc}</div>
              </motion.div>
              {i < LOOP_STEPS.length - 1 && (
                <div style={{ padding:'0 8px', fontSize:18, fontWeight:700, background:GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', flexShrink:0 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </SectionWrap>

      {/* ══ SECTION 7: PROGRESS DASHBOARD ══ */}
      <section style={{ background:'#07111F', padding:'100px 0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 clamp(20px,5vw,64px)' }}>
          <FadeIn>
            <div style={{ textAlign:'center', marginBottom:48 }}>
              <Eyebrow center color="#AAB8C8">INSIDE THE APP</Eyebrow>
              <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(28px,4.5vw,52px)', color:'#FFFFFF', margin:0 }}>
                YOUR PROGRESS, TRACKED.
              </h2>
            </div>
          </FadeIn>

          <motion.div
            initial={{ opacity:0, y:32 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, amount:0.2 }}
            transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
            style={{
              background:'#0B1828', borderRadius:20, padding:'40px 36px',
              border:'1px solid #1769FF22',
              boxShadow:'0 30px 80px rgba(23,105,255,0.12)',
            }}
          >
            {/* Header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:36, flexWrap:'wrap', gap:12 }}>
              <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.3em', color:'#AAB8C8', textTransform:'uppercase' }}>
                ROADMAP PROGRESS — YOUR ACCOUNT
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:28, color:'#FFFFFF' }}>STAGE 04 / 10</div>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.2em', color:'#7137FF', textTransform:'uppercase' }}>CLOSE-RANGE MECHANICS</div>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:22, background:GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>40% COMPLETE</div>
              </div>
            </div>

            {/* Progress track */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:0 }}>
              {PROGRESS_STAGES.map((ps, i) => {
                const completed = ps.state === 'completed'
                const current   = ps.state === 'current'
                const elite     = ps.state === 'elite'
                const lockedRed = ps.state === 'locked-red'

                const circleBg = completed ? '#1769FF' : current ? '#7137FF' : elite ? 'linear-gradient(135deg,#1769FF22,#FF183822)' : '#0D1F35'
                const circleBorder = completed ? 'none' : current ? `2px solid #7137FF44` : elite ? `1px solid #7137FF44` : lockedRed ? `1px solid #FF183833` : `1px solid #1769FF33`
                const connectorBg = completed ? '#1769FF' : current ? 'linear-gradient(90deg,#7137FF,#9B5BFF)' : '#1A2840'

                return (
                  <div key={i} style={{ display:'flex', alignItems:'center', flex:1 }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, width:44 }}>
                      <motion.div
                        initial={{ scale:0, opacity:0 }}
                        whileInView={{ scale:1, opacity:1 }}
                        viewport={{ once:true }}
                        transition={{ delay:i*0.06, type:'spring', stiffness:200 }}
                        style={{
                          width:44, height:44, borderRadius:'50%',
                          background: circleBg,
                          border: circleBorder,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          flexShrink:0,
                        }}
                      >
                        {completed && <span style={{ color:'#FFFFFF', fontSize:16, fontWeight:700 }}>✓</span>}
                        {current && <span style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:14, color:'#FFFFFF' }}>04</span>}
                        {elite && <span style={{ color:'#7137FF', fontSize:16 }}>♛</span>}
                        {!completed && !current && !elite && <span style={{ fontSize:14, opacity:0.5 }}>🔒</span>}
                      </motion.div>
                      <div style={{ fontFamily:'Inter,sans-serif', fontSize:9, color:completed ? '#1769FF' : current ? '#7137FF' : '#536174', textAlign:'center', marginTop:6, lineHeight:1.3, width:52 }}>
                        {ps.label}
                      </div>
                      {(completed || current) && (
                        <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:8, letterSpacing:'0.12em', color:completed ? '#1769FF' : '#7137FF', textTransform:'uppercase', marginTop:3 }}>
                          {completed ? 'DONE' : 'IN PROGRESS'}
                        </div>
                      )}
                    </div>
                    {/* Connector */}
                    {i < PROGRESS_STAGES.length - 1 && (
                      <div style={{ flex:1, height:2, background:connectorBg, marginTop:-28, marginLeft:-2, marginRight:-2 }} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div style={{ display:'flex', gap:24, marginTop:32, flexWrap:'wrap' }}>
              {[['#1769FF','Completed'],['#7137FF','Current'],['#1A2840','Locked']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#AAB8C8' }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 8: MAP KNOWLEDGE ══ */}
      <SectionWrap bg="#FFFFFF" py="120px 0">
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(40px,6vw,64px)', flexWrap:'wrap' }}>
          {/* Left image */}
          <motion.div
            style={{ flex:'1 1 340px', minWidth:0 }}
            initial={{ opacity:0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.15 }}
            transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
            whileHover={{ y:-5, scale:1.01, transition:{ duration:0.3 } }}
          >
            <div style={{ width:'100%', height:390, borderRadius:16, overflow:'hidden', position:'relative', border:'1px solid #1769FF44', boxShadow:'0 25px 80px rgba(23,105,255,0.18)' }}>
              <div style={{ position:'absolute', inset:0, background:'#07111F', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12 }}>
                <div style={{ fontSize:64, opacity:0.3 }}>🗺️</div>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontSize:13, fontWeight:600, letterSpacing:'0.3em', color:'#536174' }}>[ MAP KNOWLEDGE IMAGE ]</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#3D4F63' }}>Drop map-knowledge.png in public/</div>
              </div>
              <img
                src="/map-knowledge.png" alt="Map Knowledge"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
                onError={e => { e.target.style.display='none' }}
              />
            </div>
          </motion.div>

          {/* Right text */}
          <motion.div
            style={{ flex:'1 1 380px', minWidth:0 }}
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.15 }}
            transition={{ duration:0.8, delay:0.15, ease:[0.22,1,0.36,1] }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:40, height:2, background:'#1769FF' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, color:'#1769FF', letterSpacing:'0.25em' }}>05</span>
              <span style={{ color:'#536174' }}>—</span>
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, color:'#536174', letterSpacing:'0.2em' }}>MAP KNOWLEDGE</span>
            </div>
            <h2 style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(32px,5vw,58px)', lineHeight:0.92, color:'#0B1220', margin:'0 0 20px' }}>
              KNOW THE<br />
              <GradText gradient="linear-gradient(90deg,#1769FF,#FF1838)">BATTLEFIELD</GradText>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, lineHeight:1.6, color:'#536174', maxWidth:480, margin:'0 0 24px' }}>
              Understand rotations, compounds, loot routes, vehicle spawns and zone patterns before the match forces you to.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
              {['POIs & callouts', 'Rotations & zones', 'Vehicle spawns', 'Compound knowledge'].map(b => (
                <div key={b} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:'#1769FF15', border:'1px solid #1769FF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11, color:'#1769FF', fontWeight:700 }}>✓</div>
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#536174' }}>{b}</span>
                </div>
              ))}
            </div>
            <RadialRevealButton
              label="EXPLORE MAP KNOWLEDGE →"
              padding="13px 28px" rounded={8}
              font={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14 }}
              colors={{ fill:'#0B1220', textColor:'#FFFFFF', hoverFill:'#1769FF', hoverTextColor:'#FFFFFF' }}
              border={{ borderWidth:0 }}
            />
          </motion.div>
        </div>
      </SectionWrap>

      {/* ══ SECTION 9: ELITE CTA ══ */}
      <section style={{ position:'relative', minHeight:380, overflow:'hidden' }}>
        {/* Background image */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#07111F 0%,#0B1220 60%,#1A0808 100%)', zIndex:0 }}>
          <img
            src="/elite-cta.png" alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }}
            onError={e => { e.target.style.display='none' }}
          />
        </div>
        {/* Overlays */}
        <div style={{ position:'absolute', inset:0, background:'rgba(7,17,31,0.70)', zIndex:1 }} />
        <div style={{ position:'absolute', bottom:-100, left:-100, width:600, height:600, background:'radial-gradient(circle,rgba(23,105,255,0.20) 0%,transparent 70%)', zIndex:1 }} />
        <div style={{ position:'absolute', top:-100, right:-100, width:600, height:600, background:'radial-gradient(circle,rgba(255,24,56,0.20) 0%,transparent 70%)', zIndex:1 }} />

        {/* Content */}
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:380, padding:'80px clamp(20px,5vw,64px)', textAlign:'center' }}>
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once:true, amount:0.3 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}
          >
            <motion.div variants={fadeUp} style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.35em', color:'#AAB8C8', textTransform:'uppercase', marginBottom:16 }}>
              DISCIPLINE BUILDS FREEDOM
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:'clamp(40px,6.5vw,68px)', lineHeight:0.9, color:'#FFFFFF', margin:'0 0 16px' }}
            >
              ARE YOU READY TO GO{' '}
              <GradText>ELITE?</GradText>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#AAB8C8', maxWidth:560, lineHeight:1.7, margin:'0 0 32px' }}
            >
              Master the fundamentals. Build your mechanics. Understand the game. Execute under pressure.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
              <RadialRevealButton
                label="START YOUR JOURNEY →"
                padding="16px 44px" rounded={8}
                font={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:18, letterSpacing:'0.06em' }}
                colors={{ fill:'#FFFFFF', textColor:'#0B1220', hoverFill:'#1769FF', hoverTextColor:'#FFFFFF' }}
                border={{ borderWidth:0 }}
              />
              <RadialRevealButton
                label="EXPLORE FEATURES →"
                padding="16px 36px" rounded={8}
                font={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:18, letterSpacing:'0.06em' }}
                colors={{ fill:'transparent', textColor:'#FFFFFF', hoverFill:'#FFFFFF', hoverTextColor:'#0B1220' }}
                border={{ borderWidth:2, borderStyle:'solid', borderColor:'rgba(255,255,255,0.30)' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        .prereq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 1024px) {
          .prereq-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .prereq-grid  { grid-template-columns: 1fr; }
          .skills-grid  { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
