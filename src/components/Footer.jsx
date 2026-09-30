import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const platformLinks = [
  { label: 'Home',     to: '/'         },
  { label: 'Features', to: '/features'  },
  { label: 'Roadmap',  to: '/roadmap'   },
  { label: 'Pricing',  to: '/pricing'   },
  { label: 'About',    to: '/about'     },
]

const featureLinks = [
  { label: 'Map Knowledge',  to: '/features/map-knowledge'  },
  { label: 'AI Coach',       to: '/features/ai-coach'       },
  { label: 'Match Logger',   to: '/features/match-logger'   },
  { label: 'Strategy Maker', to: '/features/strategy-maker' },
]

const legalLinks = [
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Terms of Service', to: '/terms'   },
  { label: 'Refund Policy',    to: '/refunds' },
]

function NavLink({ label, to }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ duration: 0.15 }}
    >
      <Link
        to={to}
        onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#8899AA',
          textDecoration: 'none',
          padding: '4px 0',
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
        onMouseLeave={e => (e.currentTarget.style.color = '#8899AA')}
      >
        {label}
      </Link>
    </motion.div>
  )
}

function ColHead({ children }) {
  return (
    <p style={{
      fontFamily: 'Rajdhani, sans-serif',
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: '0.15em',
      color: '#536174',
      textTransform: 'uppercase',
      margin: '0 0 20px',
    }}>
      {children}
    </p>
  )
}

function SocialLink({ href, aria, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      style={{
        width: 36,
        height: 36,
        border: '1px solid rgba(220,228,239,0.12)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#536174',
        textDecoration: 'none',
        flexShrink: 0,
        transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#1769FF'
        e.currentTarget.style.borderColor = '#1769FF'
        e.currentTarget.style.background = 'rgba(23,105,255,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#536174'
        e.currentTarget.style.borderColor = 'rgba(220,228,239,0.12)'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {children}
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer style={{
      background: '#07111F',
      borderTop: '1px solid rgba(23,105,255,0.3)',
      boxShadow: '0 -1px 30px rgba(23,105,255,0.12)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background radial glow — top-left */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0,
        width: 600, height: 300,
        background: 'radial-gradient(ellipse at 0% 0%, rgba(23,105,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 32px', position: 'relative' }}>

        {/* ── Top header row: brand left, CTA right ───────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 48,
        }}>
          {/* Brand mark */}
          <motion.div {...fadeUp(0)}>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <img
                src="/ee-logo.png"
                alt="Esports Elite"
                style={{ height: 40, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  fontSize: 20,
                  color: '#FFFFFF',
                  letterSpacing: '0.1em',
                  lineHeight: 1,
                }}>
                  ESPORTS ELITE
                </div>
                <div style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  fontSize: 11,
                  color: '#1769FF',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}>
                  India's BGMI Training Platform
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Get Started CTA */}
          <motion.a
            href="https://app.esportselite.in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #1769FF, #7137FF)',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 28px',
              borderRadius: 8,
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              alignSelf: 'flex-start',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get Started Free →
          </motion.a>
        </div>

        {/* ── 5-column grid (col-1 spans 2) ───────────────────────── */}
        <div className="ft5-grid">

          {/* Col 1 — Brand description + socials */}
          <motion.div {...fadeUp(0)} className="ft5-brand">
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#536174',
              lineHeight: 1.75,
              maxWidth: 260,
              margin: '0 0 24px',
            }}>
              Built for India's most serious BGMI players. Train smarter, rotate faster, and dominate every lobby.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialLink
                href="https://www.facebook.com/people/Esports-Elite/61593453920293/"
                aria="Follow Esports Elite on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialLink>

              <SocialLink
                href="https://www.instagram.com/esportselite.in/"
                aria="Follow Esports Elite on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialLink>
            </div>
          </motion.div>

          {/* Col 2 — Platform */}
          <motion.div {...fadeUp(0.1)}>
            <ColHead>Platform</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {platformLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

          {/* Col 3 — Features */}
          <motion.div {...fadeUp(0.2)}>
            <ColHead>Features</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {featureLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

          {/* Col 4 — Legal */}
          <motion.div {...fadeUp(0.3)}>
            <ColHead>Legal</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {legalLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

        </div>

        {/* ── Gradient divider ─────────────────────────────────────── */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(23,105,255,0.4) 30%, rgba(113,55,255,0.4) 70%, transparent)',
          margin: '48px 0 24px',
        }} />

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.4)}
          className="ft5-bottom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
            © {new Date().getFullYear()} Esports Elite. All rights reserved.
          </p>

          {/* Pill tags — hidden on mobile */}
          <div className="ft5-pills" style={{ display: 'flex', gap: 8 }}>
            {['BGMI', 'Strategy', 'Training'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                color: '#1769FF',
                border: '1px solid rgba(23,105,255,0.3)',
                borderRadius: 20,
                padding: '2px 10px',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
            Crafted for champions 🏆
          </p>
        </motion.div>

      </div>

      <style>{`
        /* 5-col grid: brand col spans 2 of 5 */
        .ft5-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .ft5-brand { /* no extra rules needed — 2fr handles the width */ }

        @media (max-width: 1023px) {
          .ft5-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
          .ft5-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 767px) {
          .ft5-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ft5-brand { grid-column: auto; }
          .ft5-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .ft5-pills { display: none !important; }
        }
      `}</style>
    </footer>
  )
}
