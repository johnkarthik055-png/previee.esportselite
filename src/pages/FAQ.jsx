import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const FAQS = [
  {
    q:'What is Esports Elite?',
    a:'Esports Elite is a professional BGMI training and analytics platform built for competitive players. It includes a structured Practice Tracker, Match Logger, AI Coach, XP progression system, and a Performance Dashboard — all designed to help you improve consistently through structured, data-driven training.',
  },
  {
    q:'Is Esports Elite free to use?',
    a:'Yes, the platform is currently free to use with full access to all features. No credit card is required to sign up. You can continue on the free tier or upgrade to a premium plan when available. You will never be charged without your explicit consent.',
  },
  {
    q:'Is my data safe?',
    a:"Yes. All training and match data is stored securely using Firebase's encrypted infrastructure. We use industry-standard OAuth authentication and do not share your personal data with third parties. Your data belongs to you — you can request a full export or deletion at any time.",
  },
  {
    q:'Which devices are supported?',
    a:'Any device with a modern browser — desktop, laptop, tablet, or mobile. The app is fully responsive. For the best experience with analytics and the training dashboard, we recommend a desktop or tablet. A dedicated mobile app is on the roadmap.',
  },
  {
    q:'When will premium plans launch?',
    a:'Premium plans are coming soon. They will include advanced analytics exports, extended match history, priority AI coaching, and early access to new features. Early adopters who join now will receive a special early-adopter rate.',
  },
  {
    q:'How does the AI Coach work?',
    a:'The AI Coach analyses your training data and match performance together. It identifies the specific skills you practice versus the skills where your in-game performance suffers most, then generates a weekly coaching report with targeted recommendations. It gets more accurate the more data you give it.',
  },
  {
    q:'Can I use it for squad training?',
    a:'Squad and team features are coming in Phase 4. This will include shared team dashboards, per-player analytics for coaches, and tournament performance tools. For now, each player in your team can sign up individually and use the platform independently.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [heroRef,  heroVisible]  = useScrollAnimation({ threshold:0.1 })
  const [faqsRef,  faqsVisible]  = useScrollAnimation()

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom:'1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth:'640px' }}>
          <div className="section-label"><span>FAQ</span></div>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,52px)', color:'#E5E7EB', lineHeight:1.1, marginBottom:'12px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,18px)', color:'#94A3B8', lineHeight:1.7 }}>
            Everything you need to know about Esports Elite.
          </p>
        </div>
      </section>

      {/* ── ACCORDION ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'80px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'760px', margin:'0 auto' }}>
          <div ref={faqsRef} className={`anim-section ${faqsVisible ? 'visible' : ''}`}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom:'1px solid #1E293B' }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'22px 0', background:'none', border:'none', cursor:'pointer', gap:'16px', textAlign:'left',
                    minHeight:'44px',
                  }}>
                  <span style={{ fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'clamp(17px,2vw,20px)', color:'#E5E7EB', lineHeight:1.3 }}>
                    {faq.q}
                  </span>
                  <ChevronRight
                    size={18}
                    style={{
                      color:'#64748B', flexShrink:0,
                      transform: open === i ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition:'transform 0.3s ease',
                    }}
                  />
                </button>
                <div className={`faq-answer ${open === i ? 'open' : ''}`}>
                  <p style={{ color:'#94A3B8', fontSize:'17px', lineHeight:1.7, paddingBottom:'22px' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div style={{ textAlign:'center', marginTop:'64px', padding:'48px clamp(24px,4vw,48px)', background:'rgba(13,21,38,0.85)', border:'1px solid rgba(30,41,59,0.8)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', borderRadius:'8px' }}>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'24px', color:'#E5E7EB', marginBottom:'10px' }}>
              Still have questions?
            </h2>
            <p style={{ fontSize:'16px', color:'#94A3B8', marginBottom:'24px' }}>
              We're happy to help. Send us a message and we'll get back to you within 1–2 business days.
            </p>
            <a href="/contact" className="btn-primary">CONTACT US</a>
          </div>
        </div>
      </section>
    </>
  )
}
