import { useEffect } from 'react'
import { Compass, Repeat, ArrowRight, Trophy } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const STAGES = [
  { title: 'Know Yourself',          desc: 'Find your honest starting point across every core area before you begin.' },
  { title: 'Build Your Foundation',  desc: 'Discipline, consistency, training habits, and how to learn effectively.' },
  { title: 'Master Your Mechanics',  desc: 'Aim, recoil, movement, and the raw mechanical skill that wins fights.' },
  { title: 'Develop Game Sense',     desc: 'Reading fights, rotations, and decisions before they cost you.' },
  { title: 'Find Your Role',         desc: 'Discover the in-game role that actually fits how you play.' },
  { title: 'Become a Team Player',   desc: 'Teamwork, communication, and playing as a real squad.' },
  { title: 'Train With Purpose',     desc: 'Turn practice into a structured, trackable routine.' },
  { title: 'Review & Improve',       desc: "Look back at what worked, what didn't, and fix it." },
  { title: 'Compete',                desc: 'Mental strength and performing when it actually counts.' },
  { title: 'Build Your Future',      desc: 'Where this goes next — on your own timeline.' },
]

const CYCLE = [
  { label: 'Learn',   desc: 'Real material for this stage — not a wall of generic tips.' },
  { label: 'Assess',  desc: 'A real, scored assessment. Not a quiz for the sake of it.' },
  { label: 'Result',  desc: 'An honest read on where you stand, based on your actual answers.' },
  { label: 'Improve', desc: 'A specific weakness to work on, tied to real training modules.' },
]

function StageRow({ n, title, desc, delay, visible }) {
  return (
    <div style={{
      display: 'flex', gap: '24px',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '14px', color: '#60A5FA',
          flexShrink: 0,
        }}>
          {String(n).padStart(2, '0')}
        </div>
        {n < 10 && <div style={{ width: '1px', flex: 1, background: '#1E293B', margin: '4px 0' }} />}
      </div>
      <div style={{ paddingBottom: '36px' }}>
        <h3 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '20px', color: '#F8FAFC', marginBottom: '6px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '460px' }}>{desc}</p>
      </div>
    </div>
  )
}

export default function Roadmap() {
  useEffect(() => { document.title = 'The Road to Esports | Esports Elite' }, [])

  const [heroRef, heroVisible]     = useScrollAnimation({ threshold: 0.1 })
  const [stagesRef, stagesVisible] = useScrollAnimation({ threshold: 0.05 })
  const [cycleRef, cycleVisible]   = useScrollAnimation()
  const [roleRef, roleVisible]     = useScrollAnimation()
  const [ctaRef, ctaVisible]       = useScrollAnimation()

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'rgba(5,8,22,0.80)', padding: 'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom: '1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth: '760px' }}>
          <div className="section-label"><span>ROADMAP</span></div>
          <h1 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: 'clamp(28px,5vw,52px)', color: '#F8FAFC', lineHeight: 1.1, marginBottom: '20px' }}>
            The Road to Esports.
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: '#94A3B8', lineHeight: 1.7, maxWidth: '620px' }}>
            A structured, 10-stage player-development journey built into the app — not a reading list. Every stage runs a real
            Learn → Assess → Result → Improve cycle with scored assessments, and you move at your own pace. Nothing is locked
            behind a calendar.
          </p>
        </div>
      </section>

      {/* ── 10-STAGE TIMELINE ── */}
      <section style={{ background: 'rgba(10,15,28,0.82)', padding: '100px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label center"><span>THE 10 STAGES</span></div>
            <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,40px)', color: '#F8FAFC', lineHeight: 1.15 }}>
              One journey, in order.
            </h2>
          </div>
          <div ref={stagesRef}>
            {STAGES.map((s, i) => (
              <StageRow key={s.title} n={i + 1} title={s.title} desc={s.desc} delay={0.03 * i} visible={stagesVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CYCLE ── */}
      <section style={{ background: 'rgba(5,8,22,0.75)', padding: '100px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div ref={cycleRef} className={`anim-section ${cycleVisible ? 'visible' : ''}`}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div className="section-label center"><span>EVERY STAGE, THE SAME CYCLE</span></div>
              <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,40px)', color: '#F8FAFC', lineHeight: 1.15, marginBottom: '20px' }}>
                Learn → Assess → Result → Improve.
              </h2>
              <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 56px' }}>
                Real scored assessments, not just material to read. Finish the cycle and the next stage unlocks — whenever
                that happens to be for you.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px' }}>
              {CYCLE.map((c, i) => (
                <div key={c.label} className="ee-card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', margin: '0 auto 16px',
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '13px', color: '#3B82F6',
                  }}>
                    {i + 1}
                  </div>
                  <h3 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '17px', color: '#F8FAFC', marginBottom: '8px' }}>
                    {c.label}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.55 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELF-PACED ── */}
      <section style={{ background: 'rgba(10,15,28,0.82)', padding: '80px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D4FF',
          }}>
            <Repeat size={22} />
          </div>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: 'clamp(22px,3vw,32px)', color: '#F8FAFC', lineHeight: 1.2 }}>
            Your pace, not a calendar.
          </h2>
          <p style={{ fontSize: '17px', color: '#94A3B8', lineHeight: 1.75, maxWidth: '560px' }}>
            Progress unlocks the next stage — it's never locked behind a day count. Move through the roadmap as fast or as
            slowly as your actual improvement takes.
          </p>
        </div>
      </section>

      {/* ── ROLE DISCOVERY ── */}
      <section style={{ background: 'rgba(5,8,22,0.75)', padding: '100px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div ref={roleRef} className={`anim-section ${roleVisible ? 'visible' : ''}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>
            <div>
              <div className="section-label"><span>ROLE DISCOVERY</span></div>
              <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: 'clamp(24px,3.5vw,36px)', color: '#F8FAFC', marginBottom: '18px', lineHeight: 1.15 }}>
                Part of Stage 5: Find Your Role.
              </h2>
              <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.75, marginBottom: '16px' }}>
                A dedicated assessment identifies your primary and secondary in-game role, with a confidence score behind
                each — not a guess.
              </p>
              <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.75 }}>
                Every role has its own full deep-dive page: what the role actually does, what it takes, and how to tell if
                it fits you.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="ee-card" style={{ padding: '36px', width: 'min(100%, 320px)', textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 20px',
                  background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6',
                }}>
                  <Compass size={28} />
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Primary Role
                </p>
                <p style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '18px', color: '#F8FAFC', marginBottom: '20px' }}>
                  + Secondary Role
                </p>
                <div style={{ height: '1px', background: '#1E293B', margin: '0 0 20px' }} />
                <p style={{ fontSize: '12px', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Confidence Score
                </p>
                <div className="mock-bar-track" style={{ marginBottom: '4px' }}>
                  <div className="mock-bar-fill" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'rgba(10,15,28,0.8)', borderTop: '1px solid #1E293B', padding: '100px clamp(16px,5vw,48px)', textAlign: 'center' }}>
        <div ref={ctaRef} className={`anim-section ${ctaVisible ? 'visible' : ''}`} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%', margin: '0 auto 20px',
            background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6',
          }}>
            <Trophy size={22} />
          </div>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: 'clamp(26px,3.5vw,40px)', color: '#F8FAFC', marginBottom: '16px', lineHeight: 1.15 }}>
            Start Stage 1: Know Yourself.
          </h2>
          <p style={{ fontSize: '17px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '32px' }}>
            The roadmap lives inside the app. Log in to see exactly where you stand.
          </p>
          <a href="https://app.esportselite.in/roadmap" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '14px 32px' }}>
            OPEN THE ROADMAP <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
