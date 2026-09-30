import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import RadialRevealButton from './ui/RadialRevealButton'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '3px solid #1769FF',
      boxShadow: '0 -4px 40px rgba(23,105,255,0.08)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 0' }}>

        {/* TOP ROW */}
        <motion.div {...fadeUp(0)} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          paddingBottom: '48px',
          borderBottom: '1px solid #E5E7EB',
        }}>
          {/* Hero logo — same as Navbar */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/hero-art.png" alt="Esports Elite" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <div>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '20px', color: '#111827', letterSpacing: '0.06em' }}>ESPORTS </span>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '20px', background: 'linear-gradient(90deg,#1769FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.06em' }}>ELITE</span>
            </div>
          </Link>

          {/* RadialRevealButton CTA */}
          <RadialRevealButton
            label="Get Started Free"
            link="https://app.esportselite.in"
            newTab={true}
            fill="#1769FF"
            colors={{ fill: '#1769FF', hoverFill: '#0F50CC', textColor: '#FFFFFF', hoverTextColor: '#FFFFFF' }}
            font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '0.01em' }}
            padding="12px 28px"
            rounded={8}
          />
        </motion.div>

        {/* MAIN GRID */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          padding: '48px 0',
        }}>

          {/* COL 1 — Description + Socials */}
          <motion.div {...fadeUp(0.1)}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#536174',
              lineHeight: '1.75',
              maxWidth: '240px',
              margin: '0 0 20px',
            }}>
              Built for India's most serious BGMI players.
              Train smarter, rank faster, dominate every lobby.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Facebook */}
              <motion.a
                href="https://www.facebook.com/people/Esports-Elite/61593453920293/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Esports Elite on Facebook"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1769FF'
                  e.currentTarget.style.color = '#1769FF'
                  e.currentTarget.style.background = 'rgba(23,105,255,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.color = '#536174'
                  e.currentTarget.style.background = 'transparent'
                }}
                style={{
                  width: '38px', height: '38px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#536174', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/esportselite.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Esports Elite on Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#E1306C'
                  e.currentTarget.style.color = '#E1306C'
                  e.currentTarget.style.background = 'rgba(225,48,108,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.color = '#536174'
                  e.currentTarget.style.background = 'transparent'
                }}
                style={{
                  width: '38px', height: '38px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#536174', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* COL 2 — Platform */}
          <motion.div {...fadeUp(0.15)}>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>Platform</p>
            {[
              ['Home', '/'],
              ['Features', '/features'],
              ['Roadmap', '/roadmap'],
              ['Pricing', '/pricing'],
              ['About', '/about'],
            ].map(([label, to]) => (
              <motion.div key={to} whileHover={{ x: 4 }} transition={{ duration: 0.15 }} style={{ marginBottom: '10px' }}>
                <Link
                  to={to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#536174', textDecoration: 'none', display: 'block', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1769FF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#536174')}
                >{label}</Link>
              </motion.div>
            ))}
          </motion.div>

          {/* COL 3 — Features */}
          <motion.div {...fadeUp(0.2)}>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>Features</p>
            {[
              ['Map Knowledge', '/features/map-knowledge'],
              ['AI Coach', '/features/ai-coach'],
              ['Match Logger', '/features/match-logger'],
              ['Strategy Maker', '/features/strategy-maker'],
            ].map(([label, to]) => (
              <motion.div key={to} whileHover={{ x: 4 }} transition={{ duration: 0.15 }} style={{ marginBottom: '10px' }}>
                <Link
                  to={to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#536174', textDecoration: 'none', display: 'block', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1769FF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#536174')}
                >{label}</Link>
              </motion.div>
            ))}
          </motion.div>

          {/* COL 4 — Legal */}
          <motion.div {...fadeUp(0.25)}>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px' }}>Legal</p>
            {[
              ['Privacy Policy', '/privacy'],
              ['Terms of Service', '/terms'],
              ['Refund Policy', '/refunds'],
            ].map(([label, to]) => (
              <motion.div key={to} whileHover={{ x: 4 }} transition={{ duration: 0.15 }} style={{ marginBottom: '10px' }}>
                <Link
                  to={to}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#536174', textDecoration: 'none', display: 'block', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1769FF')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#536174')}
                >{label}</Link>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* GRADIENT DIVIDER */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(23,105,255,0.4) 30%, rgba(113,55,255,0.4) 70%, transparent)',
        }} />

        {/* BOTTOM BAR */}
        <motion.div {...fadeUp(0.35)} className="footer-bottom" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '24px 0 32px',
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF' }}>
            © {new Date().getFullYear()} Esports Elite. All rights reserved.
          </span>
          <div className="footer-pills" style={{ display: 'flex', gap: '8px' }}>
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
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          padding: 48px 0;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column; text-align: center; }
          .footer-pills { display: none; }
        }
      `}</style>
    </footer>
  )
}
