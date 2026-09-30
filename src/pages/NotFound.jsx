import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RadialRevealButton from '../components/ui/RadialRevealButton'

const ease = [0.23, 1, 0.32, 1]

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function NotFound() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '64px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '32px 32px', opacity: 0.5, pointerEvents: 'none' }} />
        {/* Blue glow top-left */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        {/* Red glow bottom-right */}
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, transform: 'translateY(30px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.8, ease }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* 404 number */}
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(120px,20vw,200px)',
            lineHeight: 1,
            ...G,
          }}>
            404
          </div>

          {/* Title */}
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(28px,4vw,40px)',
            color: '#111827',
            marginTop: 8,
            letterSpacing: '0.02em',
          }}>
            PAGE NOT FOUND
          </div>

          {/* Divider */}
          <div style={{
            width: 60, height: 2,
            background: 'linear-gradient(90deg,#1769FF,#FF1838)',
            margin: '24px auto',
            borderRadius: 2,
          }} />

          {/* Body */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(15px,1.5vw,18px)',
            color: '#536174',
            lineHeight: 1.7,
            maxWidth: 400,
            margin: '0 auto',
          }}>
            The page you are looking for does not exist or has been moved.
          </p>

          {/* CTA */}
          <div style={{ marginTop: 40 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                fill="#0B1220"
                hoverFill="#1769FF"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 32px',
                  borderRadius: 8,
                  background: '#0B1220',
                  border: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                GO HOME →
              </RadialRevealButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
