import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('ee-cookie-consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('ee-cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('ee-cookie-consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80, x: '-50%' }}
          animate={{ opacity: 1, y: 0,  x: '-50%' }}
          exit={{ opacity: 0, y: 80,    x: '-50%' }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            zIndex: 99999,
            width: 'calc(100% - 48px)',
            maxWidth: 680,
          }}
        >
          <div
            style={{
              background: '#07111F',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              flexWrap: 'wrap',
            }}
          >
            {/* Left: icon + text */}
            <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(23,105,255,0.15)',
                  border: '1px solid rgba(23,105,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 14 }}>🍪</span>
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: '#AAB8C8',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                We use cookies to improve your experience and track analytics.{' '}
                <Link to="/privacy" style={{ color: '#1769FF', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Right: buttons */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexShrink: 0 }}>
              <motion.button
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.97 }}
                onClick={decline}
                style={{
                  background: 'transparent',
                  color: '#536174',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Decline
              </motion.button>
              <motion.button
                whileHover={{ y: -1, boxShadow: '0 4px 16px rgba(23,105,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={accept}
                style={{
                  background: '#1769FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: 8,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Accept All
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
