import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ─── Inline SVG social icons ─────────────────────────────────────────── */
function FacebookSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/* ─── Social icon button ──────────────────────────────────────────────── */
function SocialBtn({ Icon, href, aria }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 6,
        background: 'transparent',
        color: '#536174',
        textDecoration: 'none',
        flexShrink: 0,
        transition: 'color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#FFFFFF'
        e.currentTarget.style.background = 'rgba(23,105,255,0.13)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#536174'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <Icon />
    </motion.a>
  )
}

/* ─── Animated nav link with slide-right on hover ────────────────────── */
function NavLink({ label, to }) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
      <Link
        to={to}
        onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#536174',
          textDecoration: 'none',
          display: 'block',
          lineHeight: 1.5,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
        onMouseLeave={e => e.currentTarget.style.color = '#536174'}
      >
        {label}
      </Link>
    </motion.div>
  )
}

/* ─── Column heading ──────────────────────────────────────────────────── */
function ColHead({ children }) {
  return (
    <p style={{
      fontFamily: 'Rajdhani, sans-serif',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.1em',
      color: '#536174',
      textTransform: 'uppercase',
      margin: '0 0 16px',
    }}>
      {children}
    </p>
  )
}

/* ─── Link lists ──────────────────────────────────────────────────────── */
const PLATFORM = [
  { label: 'Home',     to: '/'         },
  { label: 'Features', to: '/features'  },
  { label: 'Roadmap',  to: '/roadmap'   },
  { label: 'Pricing',  to: '/pricing'   },
  { label: 'About',    to: '/about'     },
]

const FEATURES = [
  { label: 'Map Knowledge',  to: '/features/map-knowledge'  },
  { label: 'AI Coach',       to: '/features/ai-coach'       },
  { label: 'Match Logger',   to: '/features/match-logger'   },
  { label: 'Strategy Maker', to: '/features/strategy-maker' },
]

const LEGAL = [
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Terms of Service', to: '/terms'   },
  { label: 'Refund Policy',    to: '/refunds' },
]

const ease = [0.22, 1, 0.36, 1]

/* ─── Footer ─────────────────────────────────────────────────────────── */
export default function Footer() {
  const [ctaHov, setCtaHov] = useState(false)

  return (
    <footer style={{ background: '#07111F' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }} className="ft-outer">

        {/* ── Top brand bar ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="ft-top"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(220,228,239,0.08)',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 36,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}>
              ESPORTS ELITE
            </div>
            <div style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              fontSize: 13,
              color: '#1769FF',
              letterSpacing: '0.08em',
              marginTop: 6,
            }}>
              India's BGMI Training Platform
            </div>
          </div>

          {/* CTA button */}
          <a
            href="https://app.esportselite.in"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display: 'inline-block',
              background: ctaHov ? '#1254CC' : '#1769FF',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 24px',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Get Started Free →
          </a>
        </motion.div>

        {/* ── Main 4-col grid ───────────────────────────────────────── */}
        <div className="ft-grid">

          {/* Col 1 — About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#536174',
              lineHeight: 1.65,
              maxWidth: 200,
              margin: 0,
            }}>
              Built for serious BGMI players. Train smarter, rank faster, dominate every lobby.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <SocialBtn
                Icon={FacebookSVG}
                href="https://www.facebook.com/people/Esports-Elite/61593453920293/"
                aria="Follow Esports Elite on Facebook"
              />
              <SocialBtn
                Icon={InstagramSVG}
                href="https://www.instagram.com/esportselite.in/"
                aria="Follow Esports Elite on Instagram"
              />
            </div>
          </motion.div>

          {/* Col 2 — Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
          >
            <ColHead>Platform</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PLATFORM.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

          {/* Col 3 — Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.3 }}
          >
            <ColHead>Features</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FEATURES.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

          {/* Col 4 — Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.4 }}
          >
            <ColHead>Legal</ColHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LEGAL.map(l => <NavLink key={l.to} {...l} />)}
            </div>
          </motion.div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.5 }}
          className="ft-bottom"
          style={{
            borderTop: '1px solid rgba(220,228,239,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
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
        .ft-outer { padding: 0 64px; }
        .ft-top   { padding: 48px 0; }
        .ft-grid  {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          padding: 48px 0;
        }
        .ft-bottom { padding: 24px 0 40px; }

        @media (max-width: 1023px) {
          .ft-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
        }
        @media (max-width: 767px) {
          .ft-outer { padding: 0 24px; }
          .ft-grid  { grid-template-columns: 1fr; gap: 28px; }
          .ft-top   { flex-direction: column; align-items: flex-start; }
          .ft-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
