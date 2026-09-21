import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar     from './components/Navbar'
import Footer     from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'

import Home       from './pages/Home'
import Features   from './pages/Features'
import About      from './pages/About'
import Roadmap    from './pages/Roadmap'
import Products   from './pages/Products'
import Community  from './pages/Community'
import Blog       from './pages/Blog'
import Partners   from './pages/Partners'
import Contact    from './pages/Contact'
import Help       from './pages/Help'
import FAQ        from './pages/FAQ'
import Pricing    from './pages/Pricing'
import ReceiptPreview from './pages/ReceiptPreview'
import Privacy      from './pages/Privacy'
import Terms        from './pages/Terms'
import RefundPolicy from './pages/RefundPolicy'
import Cookies      from './pages/Cookies'
import NotFound     from './pages/NotFound'

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const el    = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

function Layout() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/about"     element={<About />} />
          <Route path="/products"  element={<Products />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/partners"  element={<Partners />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/help"      element={<Help />} />
          <Route path="/faq"       element={<FAQ />} />
          <Route path="/pricing"   element={<Pricing />} />
          {/* direct-URL-only demo of the receipt-printer widget — not in any nav */}
          <Route path="/receipt-preview" element={<ReceiptPreview />} />
          <Route path="/privacy"        element={<Privacy />} />
          <Route path="/terms"          element={<Terms />} />
          <Route path="/refund-policy"  element={<RefundPolicy />} />
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone pages — include their own Navbar/Footer */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/roadmap" element={<Roadmap />} />
          {/* All other routes go through the full Layout */}
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
