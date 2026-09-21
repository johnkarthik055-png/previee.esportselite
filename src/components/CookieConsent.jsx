import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookieConsent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: '#0A0F1C',
      borderTop: '1px solid #1E293B',
      padding: 'clamp(14px, 2vw, 18px) clamp(16px, 4vw, 48px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#94A3B8',
        lineHeight: 1.6,
        margin: 0,
        flex: '1 1 280px',
      }}>
        We use cookies to improve your experience. By continuing, you agree to our{' '}
        <Link to="/privacy" style={{ color: '#60A5FA', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        .
      </p>

      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <Link
          to="/privacy"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            color: '#94A3B8',
            padding: '9px 18px',
            borderRadius: '8px',
            border: '1px solid #334155',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'border-color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#3B82F6'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}
        >
          Learn More
        </Link>
        <button
          type="button"
          onClick={accept}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            color: '#FFFFFF',
            background: '#3B82F6',
            padding: '9px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#3B82F6'}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
