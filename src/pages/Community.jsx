import { Users, Hash, Shield, Target, TrendingUp } from 'lucide-react'
import { IconDiscord } from '../components/SocialIcons'
import useScrollAnimation from '../hooks/useScrollAnimation'

function CommunityCard({ icon: Icon, platform, desc, btnLabel, href, delay, visible }) {
  return (
    <div className="ee-card" style={{
      padding:'32px', textAlign:'center',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition:`opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>
      <div style={{ width:'56px', height:'56px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#3B82F6', margin:'0 auto 16px' }}>
        <Icon size={24} />
      </div>
      <h3 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'24px', color:'#F8FAFC', marginBottom:'10px', lineHeight:1.3 }}>{platform}</h3>
      <p style={{ fontSize:'16px', color:'#94A3B8', lineHeight:1.6, marginBottom:'24px' }}>{desc}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'10px 22px' }}>
        {btnLabel}
      </a>
    </div>
  )
}

export default function Community() {
  const [heroRef,   heroVisible]   = useScrollAnimation({ threshold:0.1 })
  const [comRef,    comVisible]    = useScrollAnimation()
  const [featRef,   featVisible]   = useScrollAnimation()
  const [cultRef,   cultVisible]   = useScrollAnimation()

  const FEATURES = [
    { icon:Target,    text:'Weekly skill challenges with community leaderboards' },
    { icon:Users,     text:'Squad finder — connect with players at your level' },
    { icon:Shield,    text:'Respectful, competitive environment with clear rules' },
    { icon:TrendingUp,text:'Shared training tips and strategy breakdowns' },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom:'1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth:'760px' }}>
          <div className="section-label"><span>COMMUNITY</span></div>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,52px)', color:'#F8FAFC', lineHeight:1.1, marginBottom:'20px' }}>
            Train with players who want to improve.
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,18px)', color:'#94A3B8', lineHeight:1.7, maxWidth:'560px' }}>
            Esports Elite isn't just a platform — it's a community of serious players committed to getting better. Connect, compete, share, and improve together.
          </p>
        </div>
      </section>

      {/* ── COMMUNITY CHANNELS ── */}
      <section style={{ background:'rgba(10,15,28,0.82)', padding:'100px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
          <div ref={comRef} className={`anim-section ${comVisible ? 'visible' : ''}`} style={{ textAlign:'center', marginBottom:'56px' }}>
            <div className="section-label center"><span>JOIN US</span></div>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(26px,3.5vw,40px)', color:'#F8FAFC' }}>
              Find your community.
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'20px' }}>
            <CommunityCard icon={IconDiscord} platform="Discord Server" delay={0.1} visible={comVisible}
              desc="Our main hub. Chat with players, share clips, find squads, get coaching advice, and stay updated on platform changes."
              btnLabel="JOIN DISCORD" href="#" />
            <CommunityCard icon={Users} platform="WhatsApp Group" delay={0.2} visible={comVisible}
              desc="Quick updates, announcements, and casual chat. Perfect for staying in the loop without opening Discord."
              btnLabel="JOIN GROUP" href="#" />
            <CommunityCard icon={Hash} platform="Reddit Community" delay={0.3} visible={comVisible}
              desc="Share analysis posts, highlight clips, strategy breakdowns, and long-form content with the broader community."
              btnLabel="JOIN REDDIT" href="#" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'100px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div ref={featRef} className={`anim-section ${featVisible ? 'visible' : ''}`}
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(40px,5vw,80px)', alignItems:'center' }}>
            <div>
              <div className="section-label"><span>WHAT WE OFFER</span></div>
              <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(26px,3vw,38px)', color:'#F8FAFC', marginBottom:'24px', lineHeight:1.15 }}>
                More than a platform. A training culture.
              </h2>
              <p style={{ fontSize:'18px', color:'#94A3B8', lineHeight:1.7 }}>
                The Esports Elite community is built around the same values as the platform: consistency, data, and deliberate improvement. These aren't casual gamers — they're players who take their game seriously.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              {FEATURES.map(({ icon:Icon, text }, i) => (
                <div key={i} style={{
                  display:'flex', gap:'14px', alignItems:'flex-start',
                  opacity: featVisible ? 1 : 0, transform: featVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition:`opacity 0.4s ease ${0.1+i*0.08}s, transform 0.4s ease ${0.1+i*0.08}s`,
                }}>
                  <div style={{ width:'36px', height:'36px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#3B82F6', flexShrink:0, minHeight:'44px', minWidth:'44px' }}>
                    <Icon size={16} />
                  </div>
                  <p style={{ fontSize:'16px', color:'#94A3B8', lineHeight:1.6, paddingTop:'6px' }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'100px clamp(16px,5vw,48px)', borderTop:'1px solid #1E293B' }}>
        <div style={{ maxWidth:'800px', margin:'0 auto', textAlign:'center' }}>
          <div ref={cultRef} className={`anim-section ${cultVisible ? 'visible' : ''}`}>
            <div className="section-label center"><span>OUR CULTURE</span></div>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(26px,3vw,38px)', color:'#F8FAFC', marginBottom:'48px' }}>Four values. One community.</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:'24px' }}>
              {['Respect', 'Discipline', 'Consistency', 'Improvement'].map((v, i) => (
                <div key={i} style={{
                  opacity: cultVisible ? 1 : 0, transform: cultVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition:`opacity 0.4s ease ${0.1+i*0.1}s, transform 0.4s ease ${0.1+i*0.1}s`,
                }}>
                  <div style={{ fontFamily:'Oxanium, sans-serif', fontWeight:800, fontSize:'clamp(20px,3vw,30px)', color:'#F8FAFC' }}>{v}</div>
                  <div style={{ width:'32px', height:'2px', background:'#3B82F6', margin:'12px auto 0' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
