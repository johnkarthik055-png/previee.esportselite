import { Camera, PlayCircle, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'

const SOCIALS = [
  { Icon: Camera,        label: 'Instagram' },
  { Icon: PlayCircle,    label: 'YouTube'   },
  { Icon: MessageCircle, label: 'Discord'   },
  { Icon: Send,          label: 'Twitter'   },
]

function SocialIcon({ Icon, label }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 6,
        color: hov ? '#1769FF' : '#526071',
        transition: 'color 0.2s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Icon size={20} strokeWidth={1.8} />
    </button>
  )
}

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E1E7EF',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '48px 64px 32px',
      }}
        className="footer-inner"
      >
        {/* Three-column top row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
          className="footer-row"
        >
          {/* LEFT: logo */}
          <div style={{ flex: '0 0 auto' }}>
            <img
              src="/hero-art.png"
              alt="Esports Elite"
              style={{ width: 100, height: 100, objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* CENTER: tagline */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
              fontSize: 11, letterSpacing: '0.35em', color: '#526071',
              textTransform: 'uppercase', margin: 0,
            }}>
              TRAIN · ANALYZE · DOMINATE.
            </p>
          </div>

          {/* RIGHT: socials */}
          <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <p style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
              fontSize: 11, letterSpacing: '0.20em', color: '#526071',
              textTransform: 'uppercase', margin: 0,
            }}>
              Follow Us
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {SOCIALS.map(s => <SocialIcon key={s.label} {...s} />)}
            </div>
          </div>
        </div>

        {/* Bottom divider row */}
        <div style={{
          marginTop: 32,
          borderTop: '1px solid #E1E7EF',
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 12, color: '#526071', margin: 0,
          }}>
            © 2026 Esports Elite. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 10, letterSpacing: '0.25em', color: '#526071',
            textTransform: 'uppercase', margin: 0,
          }}>
            PLAY A BETTER YOU.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-inner { padding: 40px 20px 28px !important; }
          .footer-row   { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>
    </footer>
  )
}
