import { useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const CATEGORIES = ['All', 'Aim', 'Recoil', 'Scrim', 'Strategy', 'Mental', 'Practice', 'Device', 'Analysis']

const POSTS = [
  {
    category:'Recoil', title:'How to Fix Spray Control in 7 Days',
    excerpt:"Most players try to learn spray control by just spraying. That's the wrong approach. Here's the structured 7-day method that actually builds muscle memory and delivers measurable improvement.",
    date:'Aug 12, 2026', readTime:'6 min',
  },
  {
    category:'Analysis', title:"Why You're Losing Fights Despite Good Aim",
    excerpt:'Aim is only one component of winning engagements. This analysis breaks down the other factors — positioning, timing, decision-making, and weapon choice — that determine who wins most fights.',
    date:'Aug 5, 2026', readTime:'8 min',
  },
  {
    category:'Practice', title:'Building a Consistent Daily Training Routine',
    excerpt:"The players who improve fastest aren't the ones who train the hardest on weekends. They're the ones who train consistently every day. Here's how to structure a sustainable BGMI training routine.",
    date:'Jul 28, 2026', readTime:'7 min',
  },
  {
    category:'Recoil', title:'Understanding Recoil Patterns: A Technical Guide',
    excerpt:"Every weapon in BGMI has a unique recoil pattern. Understanding these patterns at a mechanical level — not just feeling them — is what separates players who spray reliably from those who don't.",
    date:'Jul 20, 2026', readTime:'10 min',
  },
  {
    category:'Mental', title:'Mental Fortitude in Competitive BGMI',
    excerpt:'Tilt is the number one performance killer in competitive play. This guide covers practical techniques for maintaining composure, managing losses, and showing up consistently when the pressure is highest.',
    date:'Jul 12, 2026', readTime:'5 min',
  },
]

function BlogCard({ post, delay, visible }) {
  return (
    <div className="ee-card" style={{
      padding:'28px', display:'flex', flexDirection:'column',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition:`opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', flexWrap:'wrap', gap:'8px' }}>
        <span style={{ background:'rgba(59,130,246,0.1)', color:'#3B82F6', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'20px', letterSpacing:'0.06em' }}>
          {post.category.toUpperCase()}
        </span>
        <span style={{ fontSize:'12px', color:'#64748B' }}>{post.date}</span>
      </div>
      <h3 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'clamp(18px,2vw,22px)', color:'#F8FAFC', lineHeight:1.3, marginBottom:'12px', flex:1 }}>
        {post.title}
      </h3>
      <p style={{ fontSize:'16px', color:'#94A3B8', lineHeight:1.6, marginBottom:'20px' }}>{post.excerpt}</p>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto' }}>
        <a href="#" style={{ color:'#3B82F6', fontSize:'14px', fontWeight:600, textDecoration:'none', fontFamily:'Oxanium, sans-serif', letterSpacing:'0.03em', transition:'opacity 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}>
          Read More →
        </a>
        <span style={{ fontSize:'12px', color:'#64748B' }}>{post.readTime} read</span>
      </div>
    </div>
  )
}

export default function Blog() {
  const [active, setActive] = useState('All')
  const [heroRef, heroVisible] = useScrollAnimation({ threshold:0.1 })
  const [postsRef, postsVisible] = useScrollAnimation()

  const filtered = active === 'All' ? POSTS : POSTS.filter(p => p.category === active)

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom:'1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth:'760px' }}>
          <div className="section-label"><span>BLOG & INSIGHTS</span></div>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,52px)', color:'#F8FAFC', lineHeight:1.1, marginBottom:'16px' }}>
            Learn from data and competition.
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,18px)', color:'#94A3B8', lineHeight:1.7, maxWidth:'560px' }}>
            Strategy guides, training breakdowns, and platform updates from the Esports Elite team.
          </p>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'80px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          {/* Category filter */}
          <div className="blog-filters">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  background: active === cat ? '#3B82F6' : 'transparent',
                  color: active === cat ? '#fff' : '#94A3B8',
                  border: `1px solid ${active === cat ? '#3B82F6' : '#1E293B'}`,
                  borderRadius:'20px', padding:'8px 16px',
                  fontSize:'14px', fontWeight:500, fontFamily:'Inter, sans-serif', cursor:'pointer',
                  transition:'all 0.2s ease',
                  minHeight:'44px', whiteSpace:'nowrap', flexShrink:0,
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div ref={postsRef} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px' }}>
            {filtered.map((post, i) => (
              <BlogCard key={post.title} post={post} delay={0.1 + i * 0.08} visible={postsVisible} />
            ))}
          </div>

          <p style={{ textAlign:'center', fontSize:'15px', color:'#64748B', marginTop:'56px' }}>
            More articles coming soon. Follow us on Discord for the latest updates.
          </p>
        </div>
      </section>
    </>
  )
}
