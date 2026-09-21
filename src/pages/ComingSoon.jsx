import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/* ── Countdown helpers ── */
function getTarget() {
  const d = new Date()
  d.setDate(d.getDate() + 90)
  return d
}

function calcTime(target) {
  const diff = Math.max(0, target - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

function CountBox({ value, label, isBlue }) {
  return (
    <div
      className="cs-box"
      style={{
        background: '#0A0A12',
        border: `1px solid ${isBlue ? '#00AAFF' : '#FF1A00'}`,
        boxShadow: `0 0 20px ${isBlue ? '#00AAFF44' : '#FF1A0044'}`,
        borderRadius: 8,
        padding: '20px 24px',
        minWidth: 90,
        textAlign: 'center',
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 'clamp(40px,8vw,64px)', color: '#FFFFFF', lineHeight: 1 }}>
        {pad(value)}
      </div>
      <div style={{ fontSize: 11, color: '#888899', marginTop: 6, letterSpacing: '2px', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

export default function ComingSoon() {
  const logoRef  = useRef(null)
  const nameRef  = useRef(null)
  const tagRef   = useRef(null)
  const emailRef = useRef(null)

  const [email, setEmail]     = useState('')
  const [notified, setNotified] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  const target = useRef(getTarget())
  const [time, setTime] = useState(() => calcTime(target.current))

  /* Countdown */
  useEffect(() => {
    const id = setInterval(() => setTime(calcTime(target.current)), 1000)
    return () => clearInterval(id)
  }, [])

  /* GSAP entrance + float */
  useEffect(() => {
    gsap.set(logoRef.current,  { scale: 0.85, opacity: 0 })
    gsap.set(nameRef.current,  { y: 20, opacity: 0 })
    gsap.set(tagRef.current,   { y: 15, opacity: 0 })
    gsap.set('.cs-box',        { scale: 0.9, opacity: 0 })
    gsap.set(emailRef.current, { y: 15, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(logoRef.current,  { scale: 1, opacity: 1, duration: 1 }, 0)
      .to(nameRef.current,  { y: 0, opacity: 1, duration: 0.7 }, 0.4)
      .to(tagRef.current,   { y: 0, opacity: 1, duration: 0.6 }, 0.6)
      .to('.cs-box',        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.75)
      .to(emailRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.1)

    gsap.to(logoRef.current, {
      y: -12, duration: 3,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    })

    return () => { tl.kill() }
  }, [])

  const handleNotify = (e) => {
    e.preventDefault()
    if (email.includes('@')) setNotified(true)
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#050508',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Oxanium', sans-serif",
    }}>
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: '-10%', top: '-10%',
        width: '60%', height: '60%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, #0055FF 0%, transparent 70%)',
        animation: 'glowPulseBlue 3s ease-in-out infinite alternate',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', right: '-10%', top: '-10%',
        width: '60%', height: '60%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, #CC0000 0%, transparent 70%)',
        animation: 'glowPulseRed 3s ease-in-out infinite alternate',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

        {/* Logo */}
        <img
          ref={logoRef}
          src="/hero-art.png"
          alt="Esports Elite"
          style={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block', marginBottom: 8 }}
        />

        {/* Brand name */}
        <div ref={nameRef} style={{
          fontWeight: 800,
          fontSize: 'clamp(32px, 6vw, 56px)',
          letterSpacing: '0.06em',
          background: 'linear-gradient(90deg, #00AAFF 0%, #FFFFFF 50%, #FF1A00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 12,
          lineHeight: 1.1,
        }}>
          ESPORTS ELITE
        </div>

        {/* Tagline */}
        <div ref={tagRef} style={{
          fontWeight: 600,
          fontSize: 'clamp(11px, 2vw, 16px)',
          letterSpacing: '6px',
          color: '#888899',
          textTransform: 'uppercase',
          marginBottom: 48,
        }}>
          TRAIN. ANALYZE. DOMINATE.
        </div>

        {/* Countdown */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          <CountBox value={time.days}    label="DAYS"    isBlue={true} />
          <CountBox value={time.hours}   label="HOURS"   isBlue={true} />
          <CountBox value={time.minutes} label="MINUTES" isBlue={false} />
          <CountBox value={time.seconds} label="SECONDS" isBlue={false} />
        </div>

        {/* Email capture */}
        <form ref={emailRef} onSubmit={handleNotify}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}
        >
          {notified ? (
            <div style={{ color: '#00AAFF', fontWeight: 700, fontSize: 16, letterSpacing: '2px', padding: '14px 0' }}>
              ✓ WE'LL NOTIFY YOU!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  background: '#0A0A12',
                  border: '1px solid #1A1A2E',
                  color: '#FFFFFF',
                  fontFamily: "'Oxanium', sans-serif",
                  fontSize: 15,
                  padding: '14px 20px',
                  width: 280,
                  outline: 'none',
                  borderRadius: 6,
                }}
              />
              <button
                type="submit"
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  background: 'linear-gradient(90deg, #0055FF, #FF1A00)',
                  color: '#FFFFFF',
                  fontFamily: "'Oxanium', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: '2px',
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  filter: btnHover ? 'brightness(1.15)' : 'brightness(1)',
                  transform: btnHover ? 'scale(1.03)' : 'scale(1)',
                  transition: 'filter 0.2s ease, transform 0.15s ease',
                }}
              >
                NOTIFY ME
              </button>
            </>
          )}
        </form>

        {/* Copyright */}
        <p style={{ color: '#888899', fontFamily: "'Oxanium', sans-serif", fontSize: 12, letterSpacing: '1px' }}>
          © 2025 Esports Elite
        </p>
      </div>
    </div>
  )
}
