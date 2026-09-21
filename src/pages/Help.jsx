import { useState } from 'react'
import { Search, UserPlus, ClipboardList, Target, Brain, Star, CreditCard, Settings, Wrench } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const TOPICS = [
  { icon:UserPlus,     title:'Creating an Account',  desc:'Sign-up, Google login, email verification, and profile setup.' },
  { icon:ClipboardList,title:'Logging Matches',       desc:'How to add match entries, edit logs, and use match templates.' },
  { icon:Target,       title:'Training Modules',      desc:'Using drills, tracking sessions, and understanding module progress.' },
  { icon:Brain,        title:'AI Analysis',           desc:'Understanding your AI coaching reports and how to act on them.' },
  { icon:Star,         title:'XP and Levels',         desc:'How XP is earned, level thresholds, and what each tier means.' },
  { icon:CreditCard,   title:'Subscription Management',desc:'Free plan details, upcoming premium plans, and billing.' },
  { icon:Settings,     title:'Account Settings',      desc:'Changing email, password reset, notification preferences.' },
  { icon:Wrench,       title:'Technical Issues',      desc:'App not loading, data sync problems, browser compatibility.' },
]

const STEPS = [
  { num:'01', title:'Create your account', desc:'Sign up with Google or email in under 30 seconds. No credit card required.' },
  { num:'02', title:'Set up your profile', desc:'Add your player details, preferred weapons, and training goals.' },
  { num:'03', title:'Log your first match', desc:'Record your first match result — kills, placement, map, and any notes.' },
  { num:'04', title:'Start a training drill', desc:'Pick a training module and complete your first timed drill session.' },
]

export default function Help() {
  const [query, setQuery] = useState('')
  const [heroRef, heroVisible] = useScrollAnimation({ threshold:0.1 })
  const [topicsRef, topicsVisible] = useScrollAnimation()
  const [stepsRef, stepsVisible] = useScrollAnimation()

  const filtered = TOPICS.filter(t =>
    query === '' || t.title.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      {/* ── HERO + SEARCH ── */}
      <section style={{ background:'rgba(10,15,28,0.85)', padding:'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom:'1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth:'640px', margin:'0 auto', textAlign:'center' }}>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,52px)', color:'#E5E7EB', marginBottom:'32px', lineHeight:1.1 }}>
            How can we help?
          </h1>
          {/* Search bar */}
          <div style={{ position:'relative', maxWidth:'560px', margin:'0 auto' }}>
            <Search size={18} style={{ position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', color:'#64748B', pointerEvents:'none' }} />
            <input
              className="ee-input" placeholder="Search for answers..."
              value={query} onChange={e => setQuery(e.target.value)}
              style={{ paddingLeft:'48px', width:'100%' }}
            />
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'80px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(22px,2.5vw,30px)', color:'#E5E7EB', marginBottom:'32px' }}>
            Browse by topic
          </h2>
          <div ref={topicsRef} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'16px' }}>
            {filtered.map((t, i) => (
              <div key={t.title} className="ee-card" style={{
                padding:'24px', cursor:'pointer',
                opacity: topicsVisible ? 1 : 0, transform: topicsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition:`opacity 0.5s ease ${0.05+i*0.06}s, transform 0.5s ease ${0.05+i*0.06}s`,
              }}>
                <div style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                  <div style={{ width:'44px', height:'44px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', color:'#3B82F6', flexShrink:0, minHeight:'44px', minWidth:'44px' }}>
                    <t.icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'16px', color:'#E5E7EB', marginBottom:'6px' }}>{t.title}</h3>
                    <p style={{ fontSize:'14px', color:'#94A3B8', lineHeight:1.55, marginBottom:'10px' }}>{t.desc}</p>
                    <span style={{ fontSize:'14px', color:'#3B82F6', fontWeight:600 }}>View guides →</span>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'48px', color:'#94A3B8', fontSize:'16px' }}>
                No results for "{query}". <a href="/contact" style={{ color:'#3B82F6', textDecoration:'none' }}>Contact support →</a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── QUICK START ── */}
      <section style={{ background:'rgba(10,15,28,0.82)', padding:'100px clamp(16px,5vw,48px)', borderTop:'1px solid #1E293B' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div ref={stepsRef} className={`anim-section ${stepsVisible ? 'visible' : ''}`} style={{ textAlign:'center', marginBottom:'56px' }}>
            <div className="section-label center"><span>QUICK START</span></div>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(24px,3vw,36px)', color:'#E5E7EB' }}>Get started in 4 steps.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'24px' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                textAlign:'center',
                opacity: stepsVisible ? 1 : 0, transform: stepsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition:`opacity 0.5s ease ${0.1+i*0.1}s, transform 0.5s ease ${0.1+i*0.1}s`,
              }}>
                <div style={{ fontFamily:'Oxanium, sans-serif', fontWeight:800, fontSize:'32px', color:'rgba(0,212,255,0.4)', marginBottom:'12px' }}>{s.num}</div>
                <h3 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'18px', color:'#E5E7EB', marginBottom:'8px' }}>{s.title}</h3>
                <p style={{ fontSize:'14px', color:'#94A3B8', lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:'48px' }}>
            <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" className="btn-primary">
              OPEN THE APP
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'80px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'600px', margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(22px,2.5vw,30px)', color:'#E5E7EB', marginBottom:'10px' }}>
            Can't find what you're looking for?
          </h2>
          <p style={{ fontSize:'16px', color:'#94A3B8', marginBottom:'24px' }}>Our support team is here to help.</p>
          <a href="/contact" className="btn-primary">CONTACT SUPPORT</a>
        </div>
      </section>
    </>
  )
}
