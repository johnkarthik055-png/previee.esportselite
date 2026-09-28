import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, Check, Gamepad2, Target, Brain, Trophy,
  Settings, Move, Zap, Calendar, BookOpen, Dumbbell,
  ClipboardCheck, BarChart2, TrendingUp, ArrowRight, Map,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ─── Gradient helpers ─── */
const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}
const GB = {
  background: 'linear-gradient(90deg,#1769FF,#4A8AFF)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}
const GR = {
  background: 'linear-gradient(90deg,#C62DCE,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const E = [0.23, 1, 0.32, 1]

/* ─── Stage data ─── */
const stages = [
  { id:1,  label:'STAGE 01', name:'Foundation',    sub:'Build Your Base',          color:'#1769FF', bgLight:'#EEF5FF', chips:['Controls','Sensitivity','Movement','Camera','Gyroscope'] },
  { id:2,  label:'STAGE 02', name:'Aim Fundamentals', sub:'Build Reliable Aim',    color:'#1769FF', bgLight:'#EEF5FF', chips:['Crosshair','ADS','Tracking','Flicks','Switching'] },
  { id:3,  label:'STAGE 03', name:'Recoil & Spray',   sub:'Control Your Weapons',  color:'#4A8AFF', bgLight:'#EEF5FF', chips:['Patterns','Spray','Burst','Familiarity','Distance'] },
  { id:4,  label:'STAGE 04', name:'Close-Range',    sub:'Win The Fight',            color:'#7137FF', bgLight:'#F0EAFF', chips:['Pre-fire','Peek','Hip fire','Movement','Timing'] },
  { id:5,  label:'STAGE 05', name:'Game Sense',     sub:'Make Better Decisions',    color:'#7137FF', bgLight:'#F0EAFF', chips:['Information','Timing','Risk','Prediction','Position'] },
  { id:6,  label:'STAGE 06', name:'Strategy',       sub:'Control The Game',         color:'#9B3FFF', bgLight:'#F0EAFF', chips:['Zone','Rotations','Position','Control','Fallback'] },
  { id:7,  label:'STAGE 07', name:'Teamplay',       sub:'Play As One',              color:'#C62DCE', bgLight:'#FDF0FF', chips:['Communication','Roles','Trading','Spacing','Movement'] },
  { id:8,  label:'STAGE 08', name:'Competitive',    sub:'Perform Under Pressure',   color:'#C62DCE', bgLight:'#FDF0FF', chips:['Scrims','Adaptation','Pressure','Review','Clutch'] },
  { id:9,  label:'STAGE 09', name:'Advanced Meta',  sub:'Read The Game',            color:'#FF1838', bgLight:'#FFF0F2', chips:['Meta','Positioning','Gunfight selection','Timing','Adaptation'] },
  { id:10, label:'STAGE 10', name:'Go Elite',       sub:'Become Tournament Ready',  color:'#FF1838', bgLight:'#FFF0F2', chips:['Consistency','Decisions','Execution','Analysis','Growth'] },
]

/* ─── Loop cards ─── */
const loopCards = [
  { step:'STEP 01', color:'#1769FF', Icon:BookOpen,      title:'LEARN',     desc:'Real material per stage — structured lessons built around what you actually need.', bottom:'BUILD KNOWLEDGE' },
  { step:'STEP 02', color:'#4A8AFF', Icon:Dumbbell,      title:'PRACTICE',  desc:'Structured drills directly linked to the concept you just studied.', bottom:'DEVELOP CONSISTENCY' },
  { step:'STEP 03', color:'#7137FF', Icon:ClipboardCheck, title:'ASSESS',   desc:'A scored assessment — not a quiz for the sake of it. Real feedback.', bottom:'ANALYZE & ADJUST' },
  { step:'STEP 04', color:'#C62DCE', Icon:BarChart2,     title:'RESULT',    desc:'An honest read on where you stand based on your actual performance.', bottom:'TRACK PROGRESS' },
  { step:'STEP 05', color:'#FF1838', Icon:TrendingUp,    title:'NEXT STEP', desc:'A specific weakness to work on before the next stage unlocks.', bottom:'KEEP EVOLVING' },
]

/* ─── Reusable tagline ─── */
function Tagline({ text, lineW = 80 }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:48 }}>
      <div style={{ width:lineW, height:1, background:'#DCE4EF' }} />
      <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.3em', color:'#9BAABB', textTransform:'uppercase', whiteSpace:'nowrap' }}>{text}</span>
      <div style={{ width:lineW, height:1, background:'#DCE4EF' }} />
    </div>
  )
}

/* ─── Stage card (shared left/right) ─── */
function StageCard({ s, idx, isActive, onToggle, fromLeft }) {
  return (
    <motion.div
      initial={{ opacity:0, transform:`translateX(${fromLeft ? -40 : 40}px)` }}
      whileInView={{ opacity:1, transform:'translateX(0px)' }}
      viewport={{ once:true }}
      transition={{ duration:0.55, ease:E, delay:idx * 0.06 }}
      whileHover={{ y:-3, borderColor:s.color, boxShadow:'0 8px 30px rgba(7,17,31,0.08)' }}
      role="button"
      aria-expanded={isActive}
      aria-label={`${s.label}: ${s.name}`}
      onClick={onToggle}
      style={{ background:'#FFFFFF', border:'1px solid #DCE4EF', borderRadius:12, padding:20, cursor:'pointer', maxWidth:380, width:'100%', transition:'border-color 0.2s,box-shadow 0.25s', boxSizing:'border-box' }}
    >
      <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.2em', color:s.color, textTransform:'uppercase', marginBottom:4 }}>{s.label}</div>
      <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:22, color:'#111827', lineHeight:1 }}>{s.name}</div>
      <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#536174', marginTop:4 }}>{s.sub}</div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="chips"
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.3, ease:[0.25,0.46,0.45,0.94] }}
            style={{ overflow:'hidden' }}
          >
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:12 }}>
              {s.chips.map(chip => (
                <span key={chip} style={{ background:`${s.color}14`, border:`1px solid ${s.color}26`, padding:'4px 10px', borderRadius:20, fontFamily:'Inter,sans-serif', fontSize:12, color:s.color }}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Roadmap() {
  const [activeStage, setActiveStage] = useState(null)

  const toggleStage = (idx) => setActiveStage(prev => prev === idx ? null : idx)

  return (
    <div style={{ background:'#FFFFFF', minHeight:'100vh' }}>
      <Navbar />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section aria-label="Hero" style={{ position:'relative', overflow:'hidden', minHeight:'75vh', background:'#FFFFFF', display:'flex', alignItems:'center', paddingTop:64 }}>
        {/* Glows */}
        <div style={{ position:'absolute', left:-200, top:-200, width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle,rgba(23,105,255,0.09) 0%,transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:-200, bottom:-100, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,24,56,0.07) 0%,transparent 60%)', pointerEvents:'none' }} />
        {/* Shards */}
        <div style={{ position:'absolute', top:0, left:0, width:300, height:380, clipPath:'polygon(0 0,100% 0,55% 100%,0 85%)', background:'#1769FF', opacity:0.05, pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:0, right:0, width:260, height:340, clipPath:'polygon(45% 0,100% 0,100% 85%,0 100%)', background:'#FF1838', opacity:0.05, pointerEvents:'none' }} />
        {/* Dot grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize:'28px 28px', opacity:0.6, pointerEvents:'none' }} />
        {/* Watermark */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:'min(20vw,200px)', color:'#111827', opacity:0.02, pointerEvents:'none', userSelect:'none', whiteSpace:'nowrap' }}>ROADMAP</div>

        <div className="rm-hero-inner">
          {/* Eyebrow */}
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} animate={{ opacity:1, transform:'translateY(0px)' }} transition={{ duration:0.6, ease:E }} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ width:40, height:2, background:'#1769FF', borderRadius:1 }} />
            <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.35em', color:'#536174', textTransform:'uppercase' }}>YOUR JOURNEY STARTS HERE</span>
          </motion.div>

          {/* H1 line 1 */}
          <motion.div initial={{ opacity:0, transform:'translateY(40px)' }} animate={{ opacity:1, transform:'translateY(0px)' }} transition={{ duration:0.7, ease:E, delay:0.1 }} className="rm-h1">
            A CLEAR ROADMAP
          </motion.div>

          {/* H1 line 2 */}
          <motion.div initial={{ opacity:0, transform:'translateY(40px)' }} animate={{ opacity:1, transform:'translateY(0px)' }} transition={{ duration:0.7, ease:E, delay:0.2 }} className="rm-h1">
            TO <span style={G}>GREATNESS</span>
          </motion.div>

          {/* Desc */}
          <motion.p initial={{ opacity:0, transform:'translateY(20px)' }} animate={{ opacity:1, transform:'translateY(0px)' }} transition={{ duration:0.6, ease:E, delay:0.3 }} className="rm-desc">
            Stop guessing what to practice. Esports Elite gives you a structured path from foundational mechanics to competitive-level performance.
          </motion.p>

          {/* Pills */}
          <motion.div initial={{ opacity:0, transform:'translateY(20px)' }} animate={{ opacity:1, transform:'translateY(0px)' }} transition={{ duration:0.6, ease:E, delay:0.4 }} style={{ display:'flex', flexWrap:'wrap', gap:12, marginTop:32 }}>
            {['STRUCTURED LEARNING','MEASURABLE PROGRESS','COMPETITIVE READY','CONSISTENT GROWTH'].map(pill => (
              <motion.div key={pill} whileHover={{ background:'#FFFFFF', y:-2, boxShadow:'0 4px 16px rgba(7,17,31,0.08)' }} style={{ display:'flex', alignItems:'center', gap:8, background:'#F7F9FC', border:'1px solid #DCE4EF', padding:'8px 16px', borderRadius:20 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#1769FF', flexShrink:0 }} />
                <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:700, fontSize:12, letterSpacing:'0.1em', color:'#536174', textTransform:'uppercase', whiteSpace:'nowrap' }}>{pill}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity:0, transform:'translateY(20px)' }} animate={{ opacity:1, transform:'translateY(0px)' }} transition={{ duration:0.6, ease:E, delay:0.5 }} className="rm-btns">
            <Link to="/pricing" style={{ textDecoration:'none' }}>
              <RadialRevealButton fill="#0B1220" hoverFill="#1769FF" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', borderRadius:8, background:'#0B1220', border:'none', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:15, color:'#FFFFFF', cursor:'pointer', whiteSpace:'nowrap' }}>
                START YOUR JOURNEY <ArrowRight size={15} strokeWidth={2.5} />
              </RadialRevealButton>
            </Link>
            <button aria-label="Watch how it works" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', borderRadius:8, background:'#FFFFFF', border:'1.5px solid #DCE4EF', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:15, color:'#111827', cursor:'pointer', whiteSpace:'nowrap' }}>
              ▶ WATCH HOW IT WORKS
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — PLAYER PROGRESSION
      ══════════════════════════════════════════ */}
      <section aria-label="Player progression" style={{ background:'#F7F9FC', borderTop:'1px solid #DCE4EF', borderBottom:'1px solid #DCE4EF', padding:'96px 0' }}>
        <div className="rm-inner">
          {/* Heading */}
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} whileInView={{ opacity:1, transform:'translateY(0px)' }} viewport={{ once:true }} transition={{ duration:0.6, ease:E }} style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
              <div style={{ width:60, height:1, background:'linear-gradient(to right,#1769FF,#7137FF)' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#536174', textTransform:'uppercase' }}>PLAYER PROGRESSION</span>
              <div style={{ width:60, height:1, background:'linear-gradient(to left,#FF1838,#7137FF)' }} />
            </div>
            <div className="rm-section-h2" style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, lineHeight:0.93, letterSpacing:'0.01em' }}>
              FROM PLAYER TO <span style={G}>COMPETITOR</span>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'#536174', marginTop:16 }}>A structured path. Real improvement. Measurable results.</p>
          </motion.div>

          {/* 4 cards */}
          <div className="rm-prog-row">
            {[
              { accent:'#1769FF', num:'01', Icon:Gamepad2, title:'FOUNDATION',  desc:'Build the fundamentals.',                r:'16px 0 0 16px' },
              { accent:'#4A8AFF', num:'02', Icon:Target,   title:'MECHANICS',   desc:'Build mechanical consistency.',           r:'0' },
              { accent:'#7137FF', num:'03', Icon:Brain,    title:'GAME IQ',     desc:'Understand situations and decisions.',    r:'0' },
              { accent:'#FF1838', num:'04', Icon:Trophy,   title:'COMPETITION', desc:'Perform under pressure.',                 r:'0 16px 16px 0' },
            ].map((c, i, arr) => (
              <div key={c.num} style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }} className="rm-prog-wrap">
                <motion.div
                  initial={{ opacity:0, transform:'translateY(30px)' }}
                  whileInView={{ opacity:1, transform:'translateY(0px)' }}
                  viewport={{ once:true }}
                  transition={{ duration:0.6, ease:E, delay:i*0.1 }}
                  whileHover={{ y:-4, boxShadow:'0 12px 40px rgba(7,17,31,0.08)' }}
                  style={{ flex:1, background:'#FFFFFF', border:'1px solid #DCE4EF', borderRadius:c.r, padding:32, position:'relative', overflow:'hidden', transition:'box-shadow 0.25s' }}
                  className="rm-prog-card"
                >
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:c.accent }} />
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:700, fontSize:13, color:c.accent, opacity:0.6, letterSpacing:'0.1em', marginBottom:8 }}>0{i+1}</div>
                  <c.Icon size={32} strokeWidth={1.8} color={c.accent} style={{ display:'block', marginBottom:12 }} />
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:24, color:'#111827' }}>{c.title}</div>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#536174', marginTop:8 }}>{c.desc}</div>
                </motion.div>
                {i < arr.length - 1 && (
                  <ChevronRight size={20} color="#DCE4EF" strokeWidth={2} style={{ flexShrink:0 }} className="rm-chevron" />
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
      <section aria-label="Foundation prerequisites" style={{ background:'#FFFFFF', padding:'96px 0' }}>
        <div className="rm-inner">
          {/* Heading */}
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} whileInView={{ opacity:1, transform:'translateY(0px)' }} viewport={{ once:true }} transition={{ duration:0.6, ease:E }} style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
              <div style={{ width:60, height:1, background:'linear-gradient(to right,#1769FF,#7137FF)' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#536174', textTransform:'uppercase' }}>BEFORE YOU START</span>
              <div style={{ width:60, height:1, background:'linear-gradient(to left,#FF1838,#7137FF)' }} />
            </div>
            <div className="rm-section-h2" style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, lineHeight:0.93, letterSpacing:'0.01em' }}>
              BUILD THE <span style={GB}>FOUNDATION</span> <span style={GR}>FIRST</span>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'#536174', maxWidth:700, margin:'16px auto 0', lineHeight:1.65 }}>
              Elite performance starts with fundamentals. Make sure your setup, mechanics and habits are ready before chasing advanced skills.
            </p>
          </motion.div>

          {/* 6-card grid */}
          <div className="rm-found-grid">
            {[
              { n:'01', accent:'#1769FF', Icon:Settings,  title:'DEVICE & SETTINGS',  bullets:['Stable FPS','Correct sensitivity','Gyroscope setup','Comfortable controls'] },
              { n:'02', accent:'#4A8AFF', Icon:Move,      title:'CONTROL & MOVEMENT', bullets:['Movement basics','Camera control','Peeking','Positioning'] },
              { n:'03', accent:'#7137FF', Icon:Target,    title:'AIM FUNDAMENTALS',   bullets:['Crosshair placement','ADS control','Tracking','Flick control'] },
              { n:'04', accent:'#9B3FFF', Icon:Zap,       title:'RECOIL CONTROL',     bullets:['Weapon patterns','Spray control','Burst discipline','Vertical recoil'] },
              { n:'05', accent:'#C62DCE', Icon:Calendar,  title:'GAME ROUTINE',       bullets:['Consistent practice','Warm-up routine','Review sessions','Recovery'] },
              { n:'06', accent:'#FF1838', Icon:Brain,     title:'MENTAL DISCIPLINE',  bullets:['Patience','Decision making','Composure','Learning mindset'] },
            ].map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity:0, transform:'translateY(30px)' }}
                whileInView={{ opacity:1, transform:'translateY(0px)' }}
                viewport={{ once:true }}
                transition={{ duration:0.55, ease:E, delay:i*0.08 }}
                whileHover={{ y:-4, boxShadow:'0 12px 40px rgba(7,17,31,0.08)', borderColor:'rgba(23,105,255,0.15)' }}
                style={{ background:'#FFFFFF', border:'1px solid #DCE4EF', borderRadius:16, padding:28, position:'relative', overflow:'hidden', transition:'border-color 0.2s,box-shadow 0.25s' }}
              >
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:c.accent }} />
                <div style={{ position:'absolute', top:16, left:20, fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:36, color:c.accent, opacity:0.25, pointerEvents:'none', userSelect:'none' }}>{c.n}</div>
                <c.Icon size={28} strokeWidth={1.8} color={c.accent} style={{ display:'block', marginTop:32, marginBottom:12 }} />
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:20, color:'#111827' }}>{c.title}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:12 }}>
                  {c.bullets.map(b => (
                    <div key={b} style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <Check size={13} color="#1769FF" strokeWidth={2.5} style={{ flexShrink:0 }} />
                      <span style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#536174' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:11, letterSpacing:'0.15em', color:c.accent, marginTop:16, cursor:'pointer', textTransform:'uppercase' }}>LEARN MORE →</div>
              </motion.div>
            ))}
          </div>

          <Tagline text="SMALL HABITS. BIGGER RESULTS." />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — 10 STAGES VERTICAL TIMELINE
      ══════════════════════════════════════════ */}
      <section aria-label="10-stage training timeline" style={{ background:'#F7F9FC', borderTop:'1px solid #DCE4EF', padding:'96px 0' }}>
        <div className="rm-inner">
          {/* Heading */}
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} whileInView={{ opacity:1, transform:'translateY(0px)' }} viewport={{ once:true }} transition={{ duration:0.6, ease:E }} style={{ textAlign:'center', marginBottom:64 }}>
            <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#536174', textTransform:'uppercase', marginBottom:12 }}>THE PATH</div>
            <div className="rm-section-h2" style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, lineHeight:0.93, letterSpacing:'0.01em' }}>
              10 STAGES. <span style={G}>ONE OBJECTIVE.</span>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'#536174', marginTop:16, lineHeight:1.65 }}>
              Every stage builds on the previous one. Learn the skill, train it, prove it, then move forward.
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{ position:'relative' }}>
            {/* Center line */}
            <div className="rm-tl-line" />

            {stages.map((s, idx) => {
              const isOdd  = idx % 2 === 0
              const isAct  = activeStage === idx

              return (
                <div key={s.id} style={{ display:'flex', alignItems:'center', minHeight:110, position:'relative', marginBottom:8 }} className="rm-tl-row">
                  {/* Left slot */}
                  <div style={{ flex:1, display:'flex', justifyContent:'flex-end', paddingRight:32 }} className="rm-tl-left">
                    {isOdd && (
                      <StageCard s={s} idx={idx} isActive={isAct} onToggle={() => toggleStage(idx)} fromLeft={true} />
                    )}
                  </div>

                  {/* Node */}
                  <div style={{ flexShrink:0, width:56, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:2 }} className="rm-tl-node-wrap">
                    {s.id === 10 && (
                      <div style={{ position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)', fontSize:14, color:'#FF1838', userSelect:'none' }}>♛</div>
                    )}
                    <motion.div
                      whileHover={{ scale:1.15 }}
                      animate={isAct ? { scale:1.15, boxShadow:`0 0 30px ${s.color}66` } : { scale:1, boxShadow:`0 0 20px ${s.color}33` }}
                      transition={{ duration:0.2, ease:E }}
                      role="button"
                      aria-expanded={isAct}
                      aria-label={`${s.label}: ${s.name}, click to expand`}
                      onClick={() => toggleStage(idx)}
                      style={{ width:48, height:48, borderRadius:'50%', border:`2px solid ${s.color}`, background:s.bgLight, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
                    >
                      <div style={{ width:36, height:36, borderRadius:'50%', background:s.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:14, color:'#fff' }}>{String(s.id).padStart(2,'0')}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right slot */}
                  <div style={{ flex:1, display:'flex', justifyContent:'flex-start', paddingLeft:32 }} className="rm-tl-right">
                    {!isOdd && (
                      <StageCard s={s} idx={idx} isActive={isAct} onToggle={() => toggleStage(idx)} fromLeft={false} />
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
      <section aria-label="Development loop" style={{ background:'#FFFFFF', borderTop:'1px solid #DCE4EF', padding:'96px 0' }}>
        <div className="rm-inner">
          {/* Heading */}
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} whileInView={{ opacity:1, transform:'translateY(0px)' }} viewport={{ once:true }} transition={{ duration:0.6, ease:E }} style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
              <div style={{ width:60, height:1, background:'#1769FF' }} />
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:12, letterSpacing:'0.3em', color:'#536174', textTransform:'uppercase' }}>THE DEVELOPMENT LOOP</span>
              <div style={{ width:60, height:1, background:'#FF1838' }} />
            </div>
            <div className="rm-loop-h2" style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, lineHeight:0.93, letterSpacing:'0.01em' }}>
              LEARN → PRACTICE → ASSESS → <span style={G}>IMPROVE</span>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'#536174', marginTop:16, lineHeight:1.65 }}>
              Every stage runs the same cycle. Finish it and the next stage unlocks.
            </p>
          </motion.div>

          {/* 5 loop cards */}
          <div className="rm-loop-row">
            {loopCards.map((c, i, arr) => (
              <div key={c.step} style={{ display:'flex', alignItems:'center', flex:1, minWidth:0 }} className="rm-loop-wrap">
                <motion.div
                  initial={{ opacity:0, transform:'translateY(30px)' }}
                  whileInView={{ opacity:1, transform:'translateY(0px)' }}
                  viewport={{ once:true }}
                  transition={{ duration:0.55, ease:E, delay:i*0.1 }}
                  whileHover={{ y:-5, borderColor:c.color, boxShadow:'0 16px 48px rgba(7,17,31,0.1)' }}
                  style={{ flex:1, background:'#FFFFFF', border:'1px solid #DCE4EF', borderRadius:16, padding:28, position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', transition:'border-color 0.25s,box-shadow 0.25s' }}
                  className="rm-loop-card"
                >
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:c.color }} />
                  <div style={{ position:'absolute', top:12, right:12, fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:64, color:'#F7F9FC', pointerEvents:'none', userSelect:'none', lineHeight:1 }}>{String(i+1).padStart(2,'0')}</div>

                  <div style={{ fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:c.color, textTransform:'uppercase', marginBottom:8, marginTop:8 }}>{c.step}</div>
                  <div style={{ width:44, height:44, borderRadius:10, background:`${c.color}1A`, border:`1px solid ${c.color}26`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, flexShrink:0 }}>
                    <c.Icon size={22} color={c.color} strokeWidth={1.8} />
                  </div>
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:22, color:'#111827' }}>{c.title}</div>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.6, color:'#536174', marginTop:8, flex:1 }}>{c.desc}</div>
                  <div style={{ marginTop:'auto', paddingTop:16, borderTop:'1px solid #DCE4EF', fontFamily:'Rajdhani,sans-serif', fontWeight:600, fontSize:10, letterSpacing:'0.25em', color:'#9BAABB', textTransform:'uppercase' }}>{c.bottom}</div>
                </motion.div>
                {i < arr.length - 1 && (
                  <div style={{ flexShrink:0, padding:'0 4px' }} className="rm-loop-arrow">
                    <ArrowRight size={16} color="#DCE4EF" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} whileInView={{ opacity:1, transform:'translateY(0px)' }} viewport={{ once:true }} transition={{ duration:0.6, ease:E, delay:0.2 }} style={{ display:'flex', alignItems:'center', justifyContent:'center', marginTop:56, flexWrap:'wrap' }}>
            {[
              { num:'10K+', label:'Players on the journey' },
              { num:'10',   label:'Structured stages' },
              { num:'1',    label:'Clear objective' },
            ].map((stat, i, arr) => (
              <div key={stat.num} style={{ display:'flex', alignItems:'center' }}>
                <div style={{ padding:'0 48px', textAlign:'center' }} className="rm-stat">
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:44, ...G }}>{stat.num}</div>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#536174', marginTop:4 }}>{stat.label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width:1, height:56, background:'#DCE4EF', flexShrink:0 }} />}
              </div>
            ))}
          </motion.div>

          <Tagline text="CONSISTENT EFFORT CREATES ELITE PLAYERS" lineW={100} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — CTA
      ══════════════════════════════════════════ */}
      <section aria-label="Join Esports Elite" style={{ background:'#07111F', padding:'160px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', bottom:-100, left:-100, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:-100, right:-100, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1, maxWidth:800, margin:'0 auto', padding:'0 32px', textAlign:'center' }}>
          <motion.div initial={{ opacity:0, transform:'translateY(30px)' }} whileInView={{ opacity:1, transform:'translateY(0px)' }} viewport={{ once:true }} transition={{ duration:0.7, ease:E }}>
            <div className="rm-cta-h2" style={{ fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.01em' }}>
              <span style={{ color:'#FFFFFF', display:'block' }}>ARE YOU READY TO</span>
              <span style={G}>GO ELITE?</span>
            </div>
            <p className="rm-cta-desc" style={{ fontFamily:'Inter,sans-serif', color:'#AAB8C8', marginTop:16, lineHeight:1.65 }}>
              Master the fundamentals. Build your mechanics. Understand the game. Execute under pressure.
            </p>
            <div style={{ marginTop:40 }}>
              <Link to="/pricing" style={{ textDecoration:'none' }}>
                <RadialRevealButton fill="#FFFFFF" hoverFill="#1769FF" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'18px 56px', borderRadius:8, background:'#FFFFFF', border:'none', fontFamily:'Inter,sans-serif', fontWeight:800, fontSize:18, color:'#0B1220', cursor:'pointer' }}>
                  JOIN NOW — ₹149/MONTH <ArrowRight size={18} strokeWidth={2.5} />
                </RadialRevealButton>
              </Link>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#6B7B8D', marginTop:16 }}>GST inclusive · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── Responsive + animation CSS ── */}
      <style>{`
        /* ── Layout helpers ── */
        .rm-hero-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 128px 64px; position: relative; z-index: 1; width: 100%;
        }
        .rm-inner { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
        .rm-h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: 80px; color: #111827;
          line-height: 0.92; letter-spacing: -0.01em; display: block;
        }
        .rm-desc {
          font-family: 'Inter', sans-serif; font-size: 18px;
          line-height: 1.6; color: #536174; max-width: 580px; margin-top: 20px;
        }
        .rm-btns {
          display: flex; flex-direction: row; gap: 16px; margin-top: 32px; flex-wrap: wrap;
        }
        .rm-section-h2 { font-size: 64px; }
        .rm-loop-h2    { font-size: 64px; }
        .rm-cta-h2     { font-size: 80px; }
        .rm-cta-desc   { font-size: 18px; }

        /* ── Prog cards ── */
        .rm-prog-row { display: flex; align-items: stretch; gap: 0; }
        .rm-prog-wrap { flex: 1; }

        /* ── Found grid ── */
        .rm-found-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }

        /* ── Timeline ── */
        .rm-tl-line {
          position: absolute; left: 50%; transform: translateX(-50%);
          top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #1769FF, #7137FF 50%, #FF1838);
          pointer-events: none;
        }

        /* ── Loop row ── */
        .rm-loop-row { display: flex; align-items: stretch; gap: 0; }
        .rm-loop-wrap { flex: 1; }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .rm-hero-inner { padding: 80px 20px !important; }
          .rm-inner      { padding: 0 20px !important; }
          .rm-h1         { font-size: 44px !important; }
          .rm-desc       { font-size: 16px !important; }
          .rm-btns       { flex-direction: column !important; }
          .rm-section-h2 { font-size: 36px !important; }
          .rm-loop-h2    { font-size: 28px !important; }
          .rm-cta-h2     { font-size: 44px !important; }
          .rm-cta-desc   { font-size: 16px !important; }

          /* Prog: stack */
          .rm-prog-row   { flex-direction: column !important; gap: 16px !important; }
          .rm-prog-card  { border-radius: 16px !important; }
          .rm-chevron    { display: none !important; }
          .rm-prog-wrap  { flex: none !important; }

          /* Found: 1 col */
          .rm-found-grid { grid-template-columns: 1fr !important; }

          /* Timeline: left-aligned */
          .rm-tl-line    { left: 20px !important; transform: none !important; }
          .rm-tl-row     { align-items: flex-start !important; }
          .rm-tl-left    { flex: none !important; padding-right: 0 !important; }
          .rm-tl-right   { flex: 1 !important; padding-left: 12px !important; }

          /* Loop: stack */
          .rm-loop-row   { flex-direction: column !important; gap: 16px !important; }
          .rm-loop-wrap  { flex: none !important; }
          .rm-loop-arrow { display: none !important; }
          .rm-stat       { padding: 0 24px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  )
}
