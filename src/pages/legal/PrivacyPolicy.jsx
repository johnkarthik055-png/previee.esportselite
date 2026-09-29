import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const ease = [0.23, 1, 0.32, 1]
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const SECTIONS = [
  {
    heading: '1. WHO WE ARE',
    blocks: [
      { type: 'p', text: 'Esports Elite is a BGMI training and performance platform operated by Guruswamy Reddy Sai Karthik Reddy, based in Karnataka, India. We can be reached at support@esportselite.in.' },
    ],
  },
  {
    heading: '2. WHAT DATA WE COLLECT',
    blocks: [
      { type: 'p', text: 'When you use Esports Elite, we may collect:' },
      { type: 'ul', items: [
        'Account information: name, email address, username',
        'Payment information: processed securely via our payment provider (we do not store card details)',
        'Usage data: features used, pages visited, session duration',
        'Match data: stats and screenshots you voluntarily upload for AI analysis',
        'Device information: browser type, operating system, IP address',
      ] },
    ],
  },
  {
    heading: '3. HOW WE USE YOUR DATA',
    blocks: [
      { type: 'p', text: 'We use your data to:' },
      { type: 'ul', items: [
        'Provide and improve the Esports Elite platform',
        'Process your subscription payments',
        'Send you account-related emails and updates',
        'Analyse platform usage to improve features',
        'Provide AI coaching feedback based on your uploaded match data',
      ] },
      { type: 'p', text: 'We do not sell your personal data to third parties.' },
    ],
  },
  {
    heading: '4. DATA STORAGE AND SECURITY',
    blocks: [
      { type: 'p', text: 'Your data is stored securely using Firebase (Google Cloud infrastructure). We implement industry-standard security measures including encrypted connections (HTTPS), secure authentication, and regular security reviews.' },
    ],
  },
  {
    heading: '5. COOKIES',
    blocks: [
      { type: 'p', text: 'We use essential cookies to keep you logged in and remember your preferences. We do not use advertising or tracking cookies.' },
    ],
  },
  {
    heading: '6. THIRD-PARTY SERVICES',
    blocks: [
      { type: 'p', text: 'We use the following third-party services:' },
      { type: 'ul', items: [
        'Firebase (Google): authentication, database, storage',
        'Cashfree: payment processing',
        'Anthropic Claude API: AI coaching analysis',
      ] },
      { type: 'p', text: 'These services have their own privacy policies.' },
    ],
  },
  {
    heading: '7. YOUR RIGHTS',
    blocks: [
      { type: 'p', text: 'You have the right to:' },
      { type: 'ul', items: [
        'Access the personal data we hold about you',
        'Request correction of inaccurate data',
        'Request deletion of your account and data',
        'Withdraw consent at any time',
      ] },
      { type: 'p', text: 'To exercise these rights, email support@esportselite.in.' },
    ],
  },
  {
    heading: '8. DATA RETENTION',
    blocks: [
      { type: 'p', text: 'We retain your data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where required by law.' },
    ],
  },
  {
    heading: '9. CHILDREN',
    blocks: [
      { type: 'p', text: 'Esports Elite is not intended for users under 13 years of age. We do not knowingly collect data from children under 13.' },
    ],
  },
  {
    heading: '10. CHANGES TO THIS POLICY',
    blocks: [
      { type: 'p', text: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on the platform.' },
    ],
  },
  {
    heading: '11. CONTACT',
    blocks: [
      { type: 'p', text: 'For privacy-related questions, contact us at support@esportselite.in' },
    ],
  },
]

function SectionBlock({ block }) {
  if (block.type === 'ul') {
    return (
      <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.8, color: '#536174' }}>
            <span style={{ color: '#1769FF', fontWeight: 700, marginRight: 4 }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.8, color: '#536174', marginBottom: 20 }}>
      {block.text}
    </p>
  )
}

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <Navbar activePage="" />

      {/* HERO */}
      <section
        style={{
          background: '#FFFFFF',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #DCE4EF',
        }}
      >
        <div className="dot-grid" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: -120, left: -120,
            width: 420, height: 420, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(23,105,255,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Link
          to="/"
          onClick={scrollTop}
          className="legal-back-link"
          style={{
            position: 'absolute', top: 100, left: 64,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
            color: '#536174', textDecoration: 'none', zIndex: 1,
          }}
        >
          <ArrowLeft size={16} /> Home
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="legal-hero-inner"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 64px', position: 'relative', zIndex: 1, width: '100%' }}
        >
          <motion.p
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease } } }}
            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#1769FF', marginBottom: 16 }}
          >
            LEGAL
          </motion.p>
          <motion.h1
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease } } }}
            className="legal-h1"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 72, lineHeight: 0.88, color: '#111827' }}
          >
            PRIVACY{' '}
            <span style={{ background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              POLICY.
            </span>
          </motion.h1>
          <motion.p
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease } } }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#9BAABB', marginTop: 12 }}
          >
            Last updated: September 2026
          </motion.p>
          <motion.p
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease } } }}
            className="legal-desc"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#536174', maxWidth: 560, marginTop: 16 }}
          >
            Your privacy matters to us. This policy explains what data we collect, how we use it, and your rights.
          </motion.p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section style={{ background: '#FFFFFF', padding: '0 0 96px' }}>
        <div className="legal-content" style={{ maxWidth: 800, margin: '0 auto', padding: '96px 64px 0' }}>
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              style={{ marginBottom: 48 }}
            >
              <h2
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 28,
                  color: '#111827', marginBottom: 16,
                  paddingBottom: 8, borderBottom: '2px solid #DCE4EF',
                }}
              >
                {section.heading}
              </h2>
              {section.blocks.map((block, bi) => (
                <SectionBlock key={bi} block={block} />
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .legal-hero-inner { padding: 40px 20px !important; }
          .legal-back-link { position: static !important; margin-bottom: 24px !important; }
          .legal-h1 { font-size: 44px !important; }
          .legal-desc { font-size: 16px !important; }
          .legal-content { padding: 40px 20px 0 !important; }
        }
      `}</style>
    </div>
  )
}
