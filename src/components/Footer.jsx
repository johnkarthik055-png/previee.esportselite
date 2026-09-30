import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
    <div style={{
      width: '40px', height: '40px',
      background: 'linear-gradient(135deg, #1769FF 0%, #7137FF 100%)',
      borderRadius: '8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 900, fontSize: '18px',
        color: '#FFFFFF', letterSpacing: '0.02em',
      }}>EE</span>
    </div>
    <div>
      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 900, fontSize: '22px',
        color: '#111827', letterSpacing: '0.06em', lineHeight: 1,
      }}>ESPORTS ELITE</div>
      <div style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 600, fontSize: '11px',
        color: '#1769FF', letterSpacing: '0.12em',
        textTransform: 'uppercase', lineHeight: 1, marginTop: '3px',
      }}>India's BGMI Training Platform</div>
    </div>
  </div>
)

const navLinks = {
  Platform: [
    ['Home',     '/'],
    ['Features', '/features'],
    ['Roadmap',  '/roadmap'],
    ['Pricing',  '/pricing'],
    ['About',    '/about'],
  ],
  Features: [
    ['Map Knowledge',  '/features/map-knowledge'],
    ['AI Coach',       '/features/ai-coach'],
    ['Match Logger',   '/features/match-logger'],
    ['Strategy Maker', '/features/strategy-maker'],
  ],
  Legal: [
    ['Privacy Policy',   '/privacy'],
    ['Terms of Service', '/terms'],
    ['Refund Policy',    '/refunds'],
  ],
}

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '3px solid #1769FF',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 0' }}>

        {/* TOP ROW */}
        <motion.div {...fadeUp(0)} style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px',
          paddingBottom: '48px', borderBottom: '1px solid #E5E7EB',
        }}>
          <Logo />
          <motion.a
            href="https://app.esportselite.in"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, #1769FF, #7137FF)',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600, fontSize: '14px',
              padding: '12px 28px', borderRadius: '8px',
              textDecoration: 'none', display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >Get Started Free →</motion.a>
        </motion.div>

        {/* MAIN GRID */}
        <div className="ft-main-grid">

          {/* COL 1 — About + Socials */}
          <motion.div {...fadeUp(0.1)}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '14px',
              color: '#536174', lineHeight: '1.75',
              maxWidth: '240px', margin: '0 0 20px',
            }}>
              Built for India's most serious BGMI players. Train smarter, rank faster, dominate every lobby.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://www.facebook.com/people/Esports-Elite/61593453920293/', Icon: FacebookIcon, hoverColor: '#1769FF', hoverBg: 'rgba(23,105,255,0.06)', aria: 'Follow Esports Elite on Facebook' },
                { href: 'https://www.instagram.com/esportselite.in/', Icon: InstagramIcon, hoverColor: '#E1306C', hoverBg: 'rgba(225,48,108,0.06)', aria: 'Follow Esports Elite on Instagram' },
              ].map(({ href, Icon, hoverColor, hoverBg, aria }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={aria}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = hoverColor
                    e.currentTarget.style.color = hoverColor
                    e.currentTarget.style.background = hoverBg
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E5E7EB'
                    e.currentTarget.style.color = '#536174'
                    e.currentTarget.style.background = 'transparent'
                  }}
                  style={{
                    width: '38px', height: '38px',
                    border: '1px solid #E5E7EB', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#536174', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* COLS 2-4 — Nav links */}
          {Object.entries(navLinks).map(([heading, links], i) => (
            <motion.div key={heading} {...fadeUp(0.15 + i * 0.05)}>
              <p style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                fontSize: '11px', color: '#9CA3AF',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                margin: '0 0 16px',
              }}>{heading}</p>
              {links.map(([label, to]) => (
                <motion.div key={to} whileHover={{ x: 4 }} transition={{ duration: 0.15 }} style={{ marginBottom: '10px' }}>
                  <Link
                    to={to}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#536174', textDecoration: 'none', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1769FF')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#536174')}
                  >{label}</Link>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* GRADIENT DIVIDER */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(23,105,255,0.4) 30%, rgba(113,55,255,0.4) 70%, transparent)',
        }} />

        {/* BOTTOM BAR */}
        <motion.div {...fadeUp(0.35)} className="ft-bottom-bar" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '12px',
          padding: '24px 0 32px',
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF' }}>
            © {new Date().getFullYear()} Esports Elite. All rights reserved.
          </span>
          <div className="ft-pills" style={{ display: 'flex', gap: '8px' }}>
            {['BGMI', 'Strategy', 'Training'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '11px',
                color: '#1769FF', border: '1px solid rgba(23,105,255,0.3)',
                borderRadius: '20px', padding: '2px 10px',
              }}>{tag}</span>
            ))}
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF' }}>
            Crafted for champions 🏆
          </span>
        </motion.div>

      </div>

      <style>{`
        .ft-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          padding: 48px 0;
        }
        @media (max-width: 768px) {
          .ft-main-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 480px) {
          .ft-main-grid { grid-template-columns: 1fr; gap: 28px; }
          .ft-bottom-bar { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .ft-pills { display: none !important; }
        }
      `}</style>
    </footer>
  )
}
