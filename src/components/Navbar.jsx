import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Roadmap', path: '/roadmap' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          zIndex: 1000,
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #DCE4EF' : 'none',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" onClick={scrollTop} aria-label="Esports Elite home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/hero-art.png" style={{ width: 44, height: 44, objectFit: 'contain' }} alt="Esports Elite" />
            <div>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, color: '#111827', letterSpacing: '0.06em' }}>ESPORTS </span>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, background: 'linear-gradient(90deg,#1769FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.06em' }}>ELITE</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={scrollTop}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    color: isActive ? '#1769FF' : '#536174',
                    textDecoration: 'none',
                    position: 'relative',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: '#1769FF' }} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="desktop-cta">
            <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" aria-label="Join Waitlist" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(23,105,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#0B1220', color: 'white',
                  padding: '10px 24px', borderRadius: 8,
                  fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14,
                  border: 'none', cursor: 'pointer',
                }}
              >
                JOIN WAITLIST →
              </motion.button>
            </a>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', alignItems: 'center', justifyContent: 'center' }}
          >
            <Menu size={24} color="#111827" />
          </button>

        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#FFFFFF',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            >
              <X size={28} color="#111827" />
            </button>

            {/* Logo at top */}
            <div style={{ position: 'absolute', top: 20, left: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/hero-art.png" style={{ width: 36, height: 36, objectFit: 'contain' }} alt="Logo" />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 18, color: '#111827' }}>ESPORTS ELITE</span>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    to={item.path}
                    onClick={() => { setMenuOpen(false); scrollTop() }}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    style={{
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontWeight: 900,
                      fontSize: 48,
                      color: location.pathname === item.path ? '#1769FF' : '#111827',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                      lineHeight: 1,
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{ marginTop: 48 }}
            >
              <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} aria-label="Join Waitlist" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'linear-gradient(90deg,#1769FF,#FF1838)',
                    color: 'white',
                    padding: '14px 48px',
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: 8,
                  }}
                >
                  JOIN WAITLIST →
                </button>
              </a>
            </motion.div>

            {/* Bottom tagline */}
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.3em', color: '#9BAABB', marginTop: 24 }}>
              TRAIN · ANALYZE · DOMINATE
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
