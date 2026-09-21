import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import RadialRevealButton from './ui/RadialRevealButton'

const LINKS = ['Home', 'Features', 'Roadmap', 'Pricing', 'About']

const PAGE_MAP = {
  'Home':     'home',
  'Features': 'features',
  'Roadmap':  'roadmap',
  'Pricing':  'pricing',
  'About':    'about',
}

function NavLink({ link, activePage }) {
  const isActive = activePage
    ? PAGE_MAP[link] === activePage
    : link === 'Home'
  const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`
  const [hov, setHov] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: 14,
        color: isActive || hov ? '#1769FF' : '#526071',
        textDecoration: 'none',
        paddingBottom: 6,
        transition: 'color 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {link}
      {isActive ? (
        <span style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 24, height: 2,
          background: '#1769FF',
          borderRadius: 2, display: 'block',
        }} />
      ) : (
        <motion.span
          animate={{ width: hov ? '100%' : '0%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'absolute', bottom: 0, left: 0,
            height: 2,
            background: 'linear-gradient(90deg, #1769FF, #FF1838)',
            borderRadius: 2, display: 'block',
          }}
        />
      )}
    </a>
  )
}

export default function Navbar({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 12))
    return unsub
  }, [scrollY])

  return (
    <>
      <motion.header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(220,227,236,0.7)',
          boxShadow: scrolled ? '0 4px 24px rgba(7,17,31,0.08)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            paddingLeft: 32,
            paddingRight: 32,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
          className="nav-inner"
        >
          {/* Logo + brand name */}
          <a href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="/hero-art.png"
                alt="Esports Elite"
                style={{ width: 80, height: 80, objectFit: 'contain', display: 'block', flexShrink: 0 }}
              />
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '28px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                background: 'linear-gradient(90deg, #1769FF 0%, #7B35FF 50%, #FF1838 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}>ESPORTS ELITE</span>
            </div>
          </a>

          {/* Center links */}
          <nav className="nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {LINKS.map(link => <NavLink key={link} link={link} activePage={activePage} />)}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="nav-cta">
              <RadialRevealButton
                label="JOIN WAITLIST →"
                padding="10px 24px"
                rounded={8}
                font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }}
                colors={{
                  fill: '#0B0F16',
                  textColor: '#FFFFFF',
                  hoverFill: '#1769FF',
                  hoverTextColor: '#FFFFFF',
                }}
                border={{ borderWidth: 0 }}
              />
            </div>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#111827', display: 'none' }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'fixed', inset: 0, top: 80,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          zIndex: 49, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 0,
        }}
      >
        {LINKS.map((link, i) => (
          <motion.a
            key={link}
            href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            initial={{ y: 16, opacity: 0 }}
            animate={menuOpen ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
            transition={{ delay: menuOpen ? i * 0.06 : 0, duration: 0.25 }}
            style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 42,
              color: activePage && PAGE_MAP[link] === activePage ? '#1769FF' : '#111827',
              textDecoration: 'none', padding: '14px 0',
              width: '100%', textAlign: 'center', borderBottom: '1px solid #DCE3EC',
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
          <RadialRevealButton
            label="JOIN WAITLIST →"
            padding="14px 40px"
            rounded={8}
            font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15 }}
            colors={{
              fill: '#0B0F16',
              textColor: '#FFFFFF',
              hoverFill: '#1769FF',
              hoverTextColor: '#FFFFFF',
            }}
            border={{ borderWidth: 0 }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 767px) {
          .nav-inner { padding-left: 20px !important; padding-right: 20px !important; height: 68px !important; }
          .nav-links  { display: none !important; }
          .nav-cta    { display: none !important; }
          .hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
