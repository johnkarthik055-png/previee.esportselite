import { useState } from 'react'
import { Link } from 'react-router-dom'

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const SOCIALS = [
  {
    Icon: FacebookIcon,
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Esports-Elite/61593453920293/',
    aria: 'Follow Esports Elite on Facebook',
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/esportselite.in/',
    aria: 'Follow Esports Elite on Instagram',
  },
]

const PLATFORM_LINKS = [
  { label: 'Home',     to: '/'        },
  { label: 'Features', to: '/features' },
  { label: 'Roadmap',  to: '/roadmap'  },
  { label: 'Pricing',  to: '/pricing'  },
  { label: 'About',    to: '/about'    },
]

const FEATURE_LINKS = [
  { label: 'Map Knowledge',   to: '/features/map-knowledge'  },
  { label: 'AI Coach',        to: '/features/ai-coach'       },
  { label: 'Match Logger',    to: '/features/match-logger'   },
  { label: 'Strategy Maker',  to: '/features/strategy-maker' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Terms of Service', to: '/terms'   },
  { label: 'Refund Policy',    to: '/refunds' },
]

function SocialIcon({ Icon, label, href, aria }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria || label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `1px solid ${hov ? 'rgba(23,105,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
        background: hov ? 'rgba(23,105,255,0.1)' : 'transparent',
        color: hov ? '#1769FF' : '#536174',
        transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      <Icon />
    </a>
  )
}

function FooterLink({ label, to }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        color: hov ? '#FFFFFF' : '#536174',
        textDecoration: 'none',
        transition: 'color 0.15s ease',
        lineHeight: 1.5,
      }}
    >
      {label}
    </Link>
  )
}

function ColHeading({ children }) {
  return (
    <p style={{
      fontFamily: 'Rajdhani, sans-serif',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.1em',
      color: '#536174',
      textTransform: 'uppercase',
      margin: 0,
    }}>
      {children}
    </p>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#07111F' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 64px 0' }} className="footer-wrap">

        {/* 4-column grid */}
        <div className="footer-grid-4">

          {/* Column 1 — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 22,
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
                marginTop: 4,
                letterSpacing: '0.02em',
              }}>
                India's BGMI Training Platform
              </div>
            </div>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#536174',
              lineHeight: 1.65,
              maxWidth: 220,
              margin: 0,
            }}>
              Master the map. Dominate the lobby. Built for serious BGMI players.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIALS.map(s => <SocialIcon key={s.label} {...s} />)}
            </div>
          </div>

          {/* Column 2 — Platform */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ColHeading>Platform</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PLATFORM_LINKS.map(l => <FooterLink key={l.to} {...l} />)}
            </div>
          </div>

          {/* Column 3 — Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ColHeading>Features</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FEATURE_LINKS.map(l => <FooterLink key={l.to} {...l} />)}
            </div>
          </div>

          {/* Column 4 — Legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ColHeading>Legal</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LEGAL_LINKS.map(l => <FooterLink key={l.to} {...l} />)}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar" style={{
          borderTop: '1px solid rgba(220,228,239,0.08)',
          marginTop: 48,
          paddingTop: 24,
          paddingBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
            © {new Date().getFullYear()} Esports Elite. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
            Made for BGMI players 🎮
          </p>
        </div>

      </div>

      <style>{`
        .footer-wrap {
          padding-left: 64px;
          padding-right: 64px;
        }
        .footer-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
        }
        .footer-bottom-bar {
          flex-direction: row;
          text-align: left;
        }
        @media (max-width: 1023px) {
          .footer-grid-4 {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }
        @media (max-width: 767px) {
          .footer-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 48px !important;
          }
          .footer-grid-4 {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
