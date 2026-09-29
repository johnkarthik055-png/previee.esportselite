import { Camera, PlayCircle, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SOCIALS = [
  { Icon: Camera,        label: 'Instagram', href: '#' },
  { Icon: PlayCircle,    label: 'YouTube',   href: '#' },
  { Icon: MessageCircle, label: 'Discord',   href: '#' },
  { Icon: Send,          label: 'Twitter',   href: '#' },
]

const NAV_LINKS = [
  { label: 'Home',     to: '/'        },
  { label: 'Features', to: '/features'},
  { label: 'Roadmap',  to: '/roadmap' },
  { label: 'Pricing',  to: '/pricing' },
  { label: 'About',    to: '/about'   },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',    to: '/privacy' },
  { label: 'Terms of Service',  to: '/terms'   },
  { label: 'Refund Policy',     to: '/refunds' },
]

function SocialIcon({ Icon, label, href }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 6,
        color: hov ? '#1769FF' : '#536174',
        transition: 'color 0.2s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none',
      }}
    >
      <Icon size={20} strokeWidth={1.8} />
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 64px 32px' }} className="footer-inner">

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48 }} className="footer-row">

          {/* LEFT: logo + tagline */}
          <div style={{ flex: '0 0 auto' }}>
            <Link to="/" aria-label="Esports Elite home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <img src="/hero-art.png" alt="Esports Elite" style={{ width: 44, height: 44, objectFit: 'contain', display: 'block' }} />
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 18, color: '#111827', letterSpacing: '0.06em' }}>ESPORTS ELITE</div>
            </Link>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', margin: '12px 0 0' }}>
              TRAIN · ANALYZE · DOMINATE.
            </p>
          </div>

          {/* CENTER: nav links */}
          <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="footer-nav">
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.25em', color: '#536174', textTransform: 'uppercase', margin: '0 0 4px' }}>
              NAVIGATE
            </p>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: '#536174',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#1769FF'}
                onMouseLeave={e => e.currentTarget.style.color = '#536174'}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: socials */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.20em', color: '#536174', textTransform: 'uppercase', margin: 0 }}>
              FOLLOW US
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {SOCIALS.map(s => <SocialIcon key={s.label} {...s} />)}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 32, borderTop: '1px solid #DCE4EF', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, color: '#9BAABB', margin: 0 }}>
            © {new Date().getFullYear()} Esports Elite. Operated by Guruswamy Reddy Sai Karthik Reddy.
          </p>
          <a
            href="mailto:support@esportselite.in"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9BAABB', textDecoration: 'none' }}
          >
            support@esportselite.in
          </a>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#9BAABB', textTransform: 'uppercase', margin: 0 }}>
            PLAY A BETTER YOU.
          </p>
        </div>

        {/* Legal links row */}
        <div
          className="footer-legal-row"
          style={{
            borderTop: '1px solid #DCE4EF', marginTop: 16, paddingTop: 16,
            display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
          }}
        >
          {LEGAL_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9BAABB',
                textDecoration: 'none', transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#536174'}
              onMouseLeave={e => e.currentTarget.style.color = '#9BAABB'}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-inner { padding: 40px 20px 28px !important; }
          .footer-row   { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .footer-nav   { align-items: center !important; }
        }
      `}</style>
    </footer>
  )
}
