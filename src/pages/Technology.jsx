import { Cpu, BarChart2, Brain, Shield } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const PILLARS = [
  {
    icon:Cpu,      label:'TRAINING ENGINE',
    title:'Structured Drill System',
    desc:'The training engine powers every module in Esports Elite. It manages drill sequences, tracks reps in real time, calculates session metrics, and stores your full history in a queryable format — so analysis is always working on real data, not approximations.',
    points:['Real-time rep and accuracy tracking','Configurable drill sequences and timing','Session history with exportable data','Streak tracking and consistency metrics'],
  },
  {
    icon:BarChart2, label:'ANALYTICS ENGINE',
    title:'Match Performance Processing',
    desc:'Every match you log is processed by the analytics engine, which extracts patterns, computes rolling averages, and builds performance curves over time. The engine normalizes data across different game modes and maps so comparisons are always fair.',
    points:['Rolling stat averages and trend lines','Cross-session performance correlation','Map and mode-specific breakdowns','Week-over-week comparison reports'],
  },
  {
    icon:Brain,     label:'AI INSIGHTS',
    title:'Coaching Intelligence',
    desc:'The AI layer sits on top of both the training engine and analytics engine — reading both datasets in parallel. It identifies the specific skills you train vs. the skills where your match performance suffers most, and generates targeted coaching recommendations.',
    points:['Cross-dataset skill gap analysis','Automated weekly coaching reports','Drill recommendation engine','Performance regression detection'],
  },
  {
    icon:Shield,    label:'SECURITY & RELIABILITY',
    title:'Data Protection & Uptime',
    desc:'Your training data is valuable. It\'s stored with end-to-end encryption via Firebase\'s secure infrastructure, with automatic backups and 99.9% uptime. Authentication uses industry-standard OAuth flows. Your data is yours, always.',
    points:['Firebase secure data storage','OAuth 2.0 authentication (Google + Email)','Encrypted data at rest and in transit','Automatic daily backups'],
  },
]

const TECH_STACK = [
  { name:'React 18',    desc:'Lightning-fast reactive UI with zero-lag interactions' },
  { name:'Firebase',    desc:'Real-time cloud database with offline support' },
  { name:'AI Engine',   desc:'Custom coaching model trained on BGMI performance data' },
  { name:'Secure Auth', desc:'Google OAuth + email auth with session management' },
]

export default function Technology() {
  const [heroRef, heroVisible]   = useScrollAnimation({ threshold:0.1 })
  const [diffRef, diffVisible]   = useScrollAnimation()
  const [techRef, techVisible]   = useScrollAnimation()

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom:'1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth:'760px' }}>
          <div className="section-label"><span>TECHNOLOGY</span></div>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,52px)', color:'#E5E7EB', lineHeight:1.1, marginBottom:'20px' }}>
            Built for performance.
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,18px)', color:'#94A3B8', lineHeight:1.7, maxWidth:'580px' }}>
            Every part of Esports Elite was engineered to serve one goal: helping players improve faster through structured, data-driven training. Here's how the platform works under the hood.
          </p>
        </div>
      </section>

      {/* ── 4 PILLARS ── */}
      {PILLARS.map((p, i) => (
        <PillarSection key={i} pillar={p} bg={i % 2 === 0 ? 'rgba(5,8,22,0.75)' : 'rgba(10,15,28,0.82)'} />
      ))}

      {/* ── WHAT MAKES IT DIFFERENT ── */}
      <section style={{ background:'rgba(10,15,28,0.85)', padding:'100px clamp(16px,5vw,48px)', borderTop:'1px solid #1E293B', borderBottom:'1px solid #1E293B' }}>
        <div style={{ maxWidth:'800px', margin:'0 auto', textAlign:'center' }}>
          <div ref={diffRef} className={`anim-section ${diffVisible ? 'visible' : ''}`}>
            <div className="section-label center"><span>PHILOSOPHY</span></div>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(24px,3.5vw,38px)', color:'#E5E7EB', lineHeight:1.2, marginBottom:'24px' }}>
              "Instead of simply storing statistics, Esports Elite focuses on helping players improve."
            </h2>
            <p style={{ fontSize:'18px', color:'#94A3B8', lineHeight:1.7, marginBottom:'20px' }}>
              Most stat trackers show you what happened. Esports Elite tells you what to do next. The platform's value isn't in the data — it's in the interpretation of that data into specific, actionable training guidance.
            </p>
            <p style={{ fontSize:'18px', color:'#94A3B8', lineHeight:1.7 }}>
              That's the core architectural difference: every data layer is connected back to the training system. Stats don't exist in isolation — they exist to inform your next session.
            </p>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'100px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div ref={techRef} className={`anim-section ${techVisible ? 'visible' : ''}`} style={{ textAlign:'center', marginBottom:'48px' }}>
            <div className="section-label center"><span>TECH STACK</span></div>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(26px,3.5vw,40px)', color:'#E5E7EB' }}>
              Powered by modern tools.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px' }}>
            {TECH_STACK.map((t, i) => (
              <div key={i} className="ee-card" style={{
                padding:'28px', textAlign:'center',
                opacity: techVisible ? 1 : 0, transform: techVisible ? 'translateY(0)' : 'translateY(20px)',
                transition:`opacity 0.5s ease ${0.1+i*0.1}s, transform 0.5s ease ${0.1+i*0.1}s`,
              }}>
                <h3 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'20px', color:'#E5E7EB', marginBottom:'8px' }}>{t.name}</h3>
                <p style={{ fontSize:'15px', color:'#94A3B8', lineHeight:1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* Pillar section — needs its own hook call */
function PillarSection({ pillar, bg }) {
  const [ref, visible] = useScrollAnimation()
  const { icon: Icon, label, title, desc, points } = pillar
  return (
    <section style={{ background: bg, padding:'80px clamp(16px,5vw,48px)' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div ref={ref} className={`anim-section ${visible ? 'visible' : ''}`}>
          <div style={{ display:'flex', gap:'20px', alignItems:'flex-start', flexWrap:'wrap' }}>
            <div style={{ width:'52px', height:'52px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', color:'#3B82F6', flexShrink:0, marginTop:'4px' }}>
              <Icon size={24} />
            </div>
            <div style={{ flex:'1 1 300px' }}>
              <div style={{ color:'#00D4FF', fontSize:'12px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'10px', fontFamily:'Inter' }}>{label}</div>
              <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(24px,3vw,36px)', color:'#E5E7EB', marginBottom:'14px', lineHeight:1.2 }}>{title}</h2>
              <p style={{ fontSize:'18px', color:'#94A3B8', lineHeight:1.7, marginBottom:'20px' }}>{desc}</p>
              <ul style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'8px' }}>
                {points.map((pt, i) => (
                  <li key={i} style={{ display:'flex', gap:'8px', fontSize:'15px', color:'#94A3B8', listStyle:'none' }}>
                    <span style={{ color:'#3B82F6', fontWeight:700, flexShrink:0 }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
