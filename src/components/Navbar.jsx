import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = ['Home', 'Features', 'Roadmap', 'Pricing', 'About']
const PAGE_MAP = { Home: 'home', Features: 'features', Roadmap: 'roadmap', Pricing: 'pricing', About: 'about' }

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

function NavLink({ link, activePage }) {
  const isActive = activePage ? PAGE_MAP[link] === activePage : link === 'Home'
  const to = link === 'Home' ? '/' : `/${link.toLowerCase()}`
  const [hov, setHov] = useState(false)

  return (
    <Link
      to={to}
      onClick={scrollTop}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: 14,
        color: isActive ? '#1769FF' : hov ? '#111827' : '#536174',
        textDecoration: 'none',
        paddingBottom: 6,
        transition: 'color 0.2s ease',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      {link}
      {/* Active underline */}
      {isActive && (
        <span style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 24, height: 2,
          background: '#1769FF',
          borderRadius: 2, display: 'block',
        }} />
      )}
      {/* Hover underline */}
      {!isActive && (
        <motion.span
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            position: 'absolute', bottom: 0, left: 0,
            height: 2, width: '100%',
            background: 'linear-gradient(90deg, #1769FF, #FF1838)',
            borderRadius: 2, display: 'block',
            transformOrigin: 'left',
          }}
        />
      )}
    </Link>
  )
}

export default function Navbar({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 80))
    return unsub
  }, [scrollY])

  return (
    <>
      <motion.header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.92)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
          borderBottom: '1px solid #DCE4EF',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.3s ease, background 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            paddingLeft: 32,
            paddingRight: 32,
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
          className="nav-inner"
        >
          {/* Logo */}
          <Link to="/" onClick={scrollTop} aria-label="Esports Elite home" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/hero-art.png" alt="Esports Elite" style={{ width: 44, height: 44, objectFit: 'contain' }} />
            <div>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, color: '#111827', letterSpacing: '0.06em' }}>ESPORTS </span>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, background: 'linear-gradient(90deg, #1769FF, #FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.06em' }}>ELITE</span>
            </div>
          </Link>

          {/* Center links */}
          <nav className="nav-links" aria-label="Main navigation" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {LINKS.map(link => <NavLink key={link} link={link} activePage={activePage} />)}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="nav-cta">
              <motion.a
                href="/pricing"
                onClick={scrollTop}
                aria-label="Join Waitlist"
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(23,105,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#0B1220', color: '#FFFFFF',
                  padding: '10px 24px', borderRadius: 8,
                  fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14,
                  textDecoration: 'none', cursor: 'pointer',
                  display: 'inline-block', transition: 'box-shadow 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                JOIN WAITLIST →
              </motion.a>
            </div>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#111827', display: 'none' }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed', inset: 0, top: 72,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          zIndex: 49, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 0,
        }}
      >
        {LINKS.map((link, i) => (
          <motion.a
            key={link}
            href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
            onClick={() => { setMenuOpen(false); scrollTop() }}
            aria-current={activePage && PAGE_MAP[link] === activePage ? 'page' : undefined}
            initial={{ y: 16, opacity: 0 }}
            animate={menuOpen ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
            transition={{ delay: menuOpen ? i * 0.06 : 0, duration: 0.25 }}
            style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 48,
              color: activePage && PAGE_MAP[link] === activePage ? '#1769FF' : '#111827',
              textDecoration: 'none', padding: '12px 0',
              width: '100%', textAlign: 'center',
              borderBottom: '1px solid #DCE4EF',
              letterSpacing: '0.02em',
            }}
          >
            {link.toUpperCase()}
          </motion.a>
        ))}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={menuOpen ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
          transition={{ delay: menuOpen ? LINKS.length * 0.06 : 0, duration: 0.25 }}
          style={{ marginTop: 32 }}
        >
          <motion.a
            href="/pricing"
            onClick={scrollTop}
            aria-label="Join Waitlist"
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(23,105,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: '#0B1220', color: '#FFFFFF',
              padding: '14px 40px', borderRadius: 8,
              fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15,
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            JOIN WAITLIST →
          </motion.a>
        </motion.div>
      </motion.nav>

      <style>{`
        @media (max-width: 767px) {
          .nav-inner { padding-left: 20px !important; padding-right: 20px !important; height: 64px !important; }
          .nav-links  { display: none !important; }
          .nav-cta    { display: none !important; }
          .hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
