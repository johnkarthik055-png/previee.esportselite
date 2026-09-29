import { useEffect } from 'react'
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

function CursorGlow() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX - 20); mouseY.set(e.clientY - 20) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: springX, top: springY,
        width: 40, height: 40,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23,105,255,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9997,
        willChange: 'transform',
      }}
    />
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
          <Route path="/privacy"        element={<PrivacyPolicy />} />
          <Route path="/terms"          element={<TermsOfService />} />
          <Route path="/refunds"        element={<RefundPolicy />} />
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
        <CursorGlow />
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
            <Route path="/*"        element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}
