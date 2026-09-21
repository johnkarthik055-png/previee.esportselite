import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => { document.title = 'Page Not Found | Esports Elite' }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #050816 0%, #0A1428 45%, #050816 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'clamp(80px, 10vw, 120px) clamp(16px, 5vw, 48px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: "'Oxanium', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(96px, 20vw, 180px)',
          color: '#3B82F6',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          marginBottom: '8px',
          textShadow: '0 0 60px rgba(59,130,246,0.4)',
        }}>
          404
        </p>

        <h1 style={{
          fontFamily: "'Oxanium', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(20px, 3vw, 32px)',
          color: '#F8FAFC',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(15px, 1.5vw, 17px)',
          color: '#94A3B8',
          lineHeight: 1.7,
          maxWidth: '420px',
          marginBottom: '40px',
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Oxanium', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: '#2563EB',
              color: '#FFFFFF',
              padding: '13px 28px',
              borderRadius: '10px',
              border: '1px solid #3B82F6',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
            onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
          >
            GO HOME →
          </Link>

          <Link
            to="/features"
            style={{
              fontFamily: "'Oxanium', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: '#F8FAFC',
              padding: '13px 28px',
              borderRadius: '10px',
              border: '1px solid #334155',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#3B82F6'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}
          >
            VIEW FEATURES →
          </Link>
        </div>
      </div>
    </section>
  )
}
