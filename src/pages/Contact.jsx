import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { IconInstagram, IconDiscord, IconYoutube, IconTwitter } from '../components/SocialIcons'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

const SUBJECTS = ['General Enquiry','Partnership Inquiry','Bug Report','Feature Request','Press / Media','Other']

export default function Contact() {
  useEffect(() => { document.title = 'Contact | Esports Elite' }, [])

  const [form, setForm]     = useState({ name:'', email:'', subject:'General Enquiry', message:'' })
  const [sent, setSent]     = useState(false)
  const [sending, setSending] = useState(false)
  const [heroRef, heroVisible] = useScrollAnimation({ threshold:0.1 })

  function update(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  async function submit(e) {
    e.preventDefault()
    setSending(true)
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      console.error('[Contact] Firestore write failed:', err)
    }
    setSending(false)
    setSent(true)
  }

  const SOCIALS = [
    { icon:IconInstagram, label:'Instagram', href:'#' },
    { icon:IconDiscord,   label:'Discord',   href:'#' },
    { icon:IconYoutube,   label:'YouTube',   href:'#' },
    { icon:IconTwitter,   label:'Twitter',   href:'#' },
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background:'rgba(5,8,22,0.80)', padding:'clamp(80px,10vw,140px) clamp(16px,5vw,48px) clamp(60px,7vw,80px)', borderBottom:'1px solid #1E293B' }}>
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ maxWidth:'760px' }}>
          <div className="section-label"><span>CONTACT</span></div>
          <h1 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'clamp(28px,5vw,52px)', color:'#F8FAFC', lineHeight:1.1 }}>
            We would love to hear from you.
          </h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ background:'rgba(5,8,22,0.75)', padding:'80px clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(40px,6vw,80px)', alignItems:'start' }}>

          {/* Left — Info */}
          <div>
            <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'24px', color:'#F8FAFC', marginBottom:'32px' }}>Contact Information</h2>

            {[
              { icon:Mail,    label:'Email',    value:'johnkarthik055@gmail.com' },
              { icon:Phone,   label:'Phone',    value:'+91 63644 789893' },
              { icon:MapPin,  label:'Location', value:'Karnataka, India' },
            ].map(({ icon:Icon, label, value }) => (
              <div key={label} style={{ display:'flex', gap:'14px', alignItems:'flex-start', marginBottom:'24px' }}>
                <div style={{ width:'44px', height:'44px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#3B82F6', flexShrink:0 }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize:'12px', color:'#64748B', letterSpacing:'0.06em', marginBottom:'3px', fontFamily:'Inter', fontWeight:500, textTransform:'uppercase' }}>{label}</div>
                  <div style={{ fontSize:'15px', color:'#F8FAFC', fontWeight:500 }}>{value}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop:'32px' }}>
              <p style={{ fontSize:'12px', color:'#64748B', letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:500, marginBottom:'14px' }}>FOLLOW US</p>
              <div style={{ display:'flex', gap:'14px' }}>
                {SOCIALS.map(({ icon:Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    style={{ width:'44px', height:'44px', background:'rgba(13,21,38,0.85)', border:'1px solid #1E293B', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#94A3B8', transition:'color 0.2s ease, border-color 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#F8FAFC'; e.currentTarget.style.borderColor='#3B82F6' }}
                    onMouseLeave={e => { e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.borderColor='#1E293B' }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <p style={{ fontSize:'16px', color:'#94A3B8', lineHeight:1.7, marginTop:'32px' }}>
              We typically respond within one to two business days.
            </p>
          </div>

          {/* Right — Form */}
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ background:'rgba(13,21,38,0.85)', border:'1px solid rgba(30,41,59,0.8)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', borderRadius:'8px', padding:'clamp(24px,4vw,40px)' }}>
            {sent ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontSize:'48px', marginBottom:'16px' }}>✓</div>
                <h3 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'24px', color:'#F8FAFC', marginBottom:'10px' }}>Message Sent</h3>
                <p style={{ fontSize:'16px', color:'#94A3B8', lineHeight:1.6 }}>Thanks for reaching out. We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                <h2 style={{ fontFamily:'Oxanium, sans-serif', fontWeight:700, fontSize:'20px', color:'#F8FAFC', marginBottom:'4px' }}>Send a Message</h2>

                <div className="form-2col">
                  <div>
                    <label style={{ fontSize:'12px', color:'#94A3B8', display:'block', marginBottom:'6px', letterSpacing:'0.05em', textTransform:'uppercase' }}>Name</label>
                    <input name="name" className="ee-input" placeholder="Your name" required value={form.name} onChange={update} />
                  </div>
                  <div>
                    <label style={{ fontSize:'12px', color:'#94A3B8', display:'block', marginBottom:'6px', letterSpacing:'0.05em', textTransform:'uppercase' }}>Email</label>
                    <input name="email" type="email" className="ee-input" placeholder="your@email.com" required value={form.email} onChange={update} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize:'12px', color:'#94A3B8', display:'block', marginBottom:'6px', letterSpacing:'0.05em', textTransform:'uppercase' }}>Subject</label>
                  <select name="subject" className="ee-input" value={form.subject} onChange={update}>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize:'12px', color:'#94A3B8', display:'block', marginBottom:'6px', letterSpacing:'0.05em', textTransform:'uppercase' }}>Message</label>
                  <textarea name="message" className="ee-input" placeholder="How can we help?" rows={5} required value={form.message} onChange={update} style={{ resize:'vertical', minHeight:'120px' }} />
                </div>

                <button type="submit" className="btn-primary" disabled={sending} style={{ width:'100%', justifyContent:'center', padding:'14px', opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'SENDING…' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>

          {/* Business Information */}
          <div style={{ background:'#0A0F1C', border:'1px solid #3B82F6', borderRadius:'8px', padding:'16px' }}>
            <p style={{ fontFamily:'Oxanium, sans-serif', fontWeight:600, fontSize:'14px', color:'#94A3B8', marginBottom:'12px' }}>Business Information</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px', fontFamily:'Inter, sans-serif', fontWeight:400, fontSize:'14px' }}>
              <div><span style={{ color:'#94A3B8' }}>Brand: </span><span style={{ color:'#FFFFFF' }}>Esports Elite</span></div>
              <div><span style={{ color:'#94A3B8' }}>Operated by: </span><span style={{ color:'#FFFFFF' }}>GURUSWAMY REDDY SAI KARTHIK REDDY</span></div>
              <div><span style={{ color:'#94A3B8' }}>Email: </span><a href="mailto:johnkarthik055@gmail.com" style={{ color:'#FFFFFF' }}>johnkarthik055@gmail.com</a></div>
              <div><span style={{ color:'#94A3B8' }}>Phone: </span><a href="tel:+917892338703" style={{ color:'#FFFFFF' }}>+91 7892338703</a></div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}
