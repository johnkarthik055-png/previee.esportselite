import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

const platformLinks = [
  { label: 'Home',     to: '/'        },
  { label: 'Features', to: '/features' },
  { label: 'Roadmap',  to: '/roadmap'  },
  { label: 'Pricing',  to: '/pricing'  },
  { label: 'About',    to: '/about'    },
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
      whileHover={{ x: 4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <Link
        to={to}
        onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: 14,
          color: '#536174',
          textDecoration: 'none',
          display: 'block',
          lineHeight: 1.5,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
        onMouseLeave={e => (e.currentTarget.style.color = '#536174')}
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
      fontSize: 11,
      letterSpacing: '0.12em',
      color: '#536174',
      textTransform: 'uppercase',
      margin: '0 0 16px',
    }}>
      {children}
    </p>
  )
}

const DIVIDER = (
  <div style={{
    height: 1,
    background: 'rgba(220,228,239,0.08)',
    margin: '48px 0',
  }} />
)

export default function Footer() {
  return (
    <footer style={{ background: '#020913', borderTop: '2px solid #1769FF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>

        {/* ── Top brand row ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 32,
              color: '#FFFFFF',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}>
              ESPORTS ELITE
            </div>
            <div style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              color: '#1769FF',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 8,
            }}>
              India's BGMI Training Platform
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="https://app.esportselite.in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              display: 'inline-block',
              background: '#1769FF',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 24px',
              borderRadius: 6,
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              alignSelf: 'flex-start',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1254CC')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1769FF')}
          >
            Get Started Free →
          </motion.a>
        </motion.div>

        {DIVIDER}

        {/* ── 4-column grid ─────────────────────────────────────────── */}
        <div className="ft-grid-4">

          {/* Col 1 — About + socials */}
          <motion.div {...fadeUp(0.1)}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: '#536174',
              lineHeight: 1.65,
              margin: 0,
            }}>
              Built for serious BGMI players. Train smarter, rank faster, dominate every lobby.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 4, marginTop: 24 }}>

              {/* Facebook */}
              <motion.a
                href="https://www.facebook.com/people/Esports-Elite/61593453920293/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Esports Elite on Facebook"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                  borderRadius: 6,
                  color: '#536174',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.background = 'rgba(23,105,255,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#536174'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/esportselite.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Esports Elite on Instagram"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                  borderRadius: 6,
                  color: '#536174',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.background = 'rgba(23,105,255,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#536174'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>

            </div>
          </motion.div>

          {/* Col 2 — Platform */}
          <motion.div {...fadeUp(0.2)}>
            <ColHead>Platform</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {platformLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

          {/* Col 3 — Features */}
          <motion.div {...fadeUp(0.3)}>
            <ColHead>Features</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {featureLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

          {/* Col 4 — Legal */}
          <motion.div {...fadeUp(0.4)}>
            <ColHead>Legal</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {legalLinks.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

        </div>

        {DIVIDER}

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.5)}
          className="ft-bottom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            paddingBottom: 40,
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
            © {new Date().getFullYear()} Esports Elite. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
            Crafted for champions 🏆
          </p>
        </motion.div>

      </div>

      <style>{`
        .ft-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        @media (max-width: 1023px) {
          .ft-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 32px; }
        }
        @media (max-width: 767px) {
          .ft-grid-4 { grid-template-columns: 1fr; gap: 28px; }
          .ft-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>
    </footer>
  )
}
