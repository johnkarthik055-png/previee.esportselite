import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import ErrorBoundary from './components/ErrorBoundary'

import Home       from './pages/Home'
import Features   from './pages/Features'
import About      from './pages/About'
import Roadmap    from './pages/Roadmap'
import MapKnowledge  from './pages/features/MapKnowledge'
import AiCoach       from './pages/features/AiCoach'
import MatchLogger    from './pages/features/MatchLogger'
import StrategyMaker  from './pages/features/StrategyMaker'
import Products   from './pages/Products'
import Community  from './pages/Community'
import Blog       from './pages/Blog'
import Partners   from './pages/Partners'
import Contact    from './pages/Contact'
import Help       from './pages/Help'
import FAQ        from './pages/FAQ'
import Pricing    from './pages/Pricing'
import ReceiptPreview from './pages/ReceiptPreview'
import PrivacyPolicy   from './pages/legal/PrivacyPolicy'
import TermsOfService  from './pages/legal/TermsOfService'
import RefundPolicy    from './pages/legal/RefundPolicy'
import Cookies      from './pages/Cookies'
import NotFound     from './pages/NotFound'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #1769FF, #7137FF, #FF1838)',
        transformOrigin: 'left',
        scaleX,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}

function CustomCursor() {
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)
  const [isHovering, setIsHovering] = useState(false)
  const [clicked, setClicked] = useState(false)

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const target = e.target
      const isClickable = target.closest('a, button, [role="button"], [tabindex="0"]')
      setIsHovering(!!isClickable)
    }
    const click = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 600)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('click', click)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('click', click)
    }
  }, [])

  return (
    <>
      {/* Outer ring — follows with spring lag */}
      <motion.div
        aria-hidden="true"
        className="custom-cursor"
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? '#FF1838' : '#1769FF'}`,
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'normal',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
        animate={{
          x: '-50%',
          y: '-50%',
          scale: clicked ? [1, 1.8, 1] : 1,
          opacity: clicked ? [0.7, 0.3, 0.7] : 0.7,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Inner dot — follows mouse directly, no spring */}
      <motion.div
        aria-hidden="true"
        className="custom-cursor"
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          borderRadius: '50%',
          background: isHovering ? '#FF1838' : '#1769FF',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: isHovering
            ? '0 0 10px rgba(255,24,56,0.8), 0 0 20px rgba(255,24,56,0.4)'
            : '0 0 10px rgba(23,105,255,0.8), 0 0 20px rgba(23,105,255,0.4)',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.2s ease, box-shadow 0.2s ease',
        }}
        animate={{
          x: '-50%',
          y: '-50%',
          scale: clicked ? [1, 2.5, 0] : 1,
          opacity: clicked ? [1, 0.8, 0] : 1,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Click ripple — only shows on click */}
      {clicked && (
        <motion.div
          aria-hidden="true"
          className="custom-cursor"
          style={{
            position: 'fixed',
            left: mouseX,
            top: mouseY,
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '1px solid #1769FF',
            pointerEvents: 'none',
            zIndex: 9997,
          }}
          initial={{ x: '-50%', y: '-50%', scale: 0.3, opacity: 0.8 }}
          animate={{ x: '-50%', y: '-50%', scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />
      )}
    </>
  )
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/products"  element={<Products />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/partners"  element={<Partners />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/help"      element={<Help />} />
          <Route path="/faq"       element={<FAQ />} />
          <Route path="/receipt-preview" element={<ReceiptPreview />} />
          <Route path="/cookies"        element={<Cookies />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ScrollProgress />
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/home"     element={<Home />} />
            <Route path="/features/map-knowledge" element={<MapKnowledge />} />
            <Route path="/features/ai-coach"      element={<AiCoach />} />
            <Route path="/features/match-logger"  element={<MatchLogger />} />
            <Route path="/features/strategy-maker" element={<StrategyMaker />} />
            <Route path="/features" element={<Features />} />
            <Route path="/roadmap"  element={<Roadmap />} />
            <Route path="/pricing"  element={<Pricing />} />
            <Route path="/about"    element={<About />} />
            <Route path="/privacy"  element={<PrivacyPolicy />} />
            <Route path="/terms"    element={<TermsOfService />} />
            <Route path="/refunds"  element={<RefundPolicy />} />
            <Route path="/*"        element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}
