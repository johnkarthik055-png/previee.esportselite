import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const ease = [0.23, 1, 0.32, 1]
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const SECTIONS = [
  {
    heading: '1. ACCEPTANCE OF TERMS',
    blocks: [
      { type: 'p', text: 'By accessing or using Esports Elite (esportselite.in or app.esportselite.in), you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.' },
    ],
  },
  {
    heading: '2. ABOUT THE PLATFORM',
    blocks: [
      { type: 'p', text: 'Esports Elite is a BGMI training and performance platform that provides structured training content, match tracking, strategy tools and AI-powered coaching. The platform is operated by Guruswamy Reddy Sai Karthik Reddy, Karnataka, India.' },
    ],
  },
  {
    heading: '3. ELIGIBILITY',
    blocks: [
      { type: 'p', text: 'You must be at least 13 years of age to use Esports Elite. By using the platform, you confirm that you meet this requirement.' },
    ],
  },
  {
    heading: '4. ACCOUNT REGISTRATION',
    blocks: [
      { type: 'p', text: 'You must create an account to access Esports Elite features. You are responsible for:' },
      { type: 'ul', items: [
        'Keeping your account credentials secure',
        'All activity that occurs under your account',
        'Providing accurate account information',
      ] },
      { type: 'p', text: 'We reserve the right to suspend or terminate accounts that violate these terms.' },
    ],
  },
  {
    heading: '5. SUBSCRIPTION AND PAYMENT',
    blocks: [
      { type: 'p', text: 'Esports Elite is available via subscription at ₹149/month (GST inclusive). Subscriptions are billed monthly. Payment is processed securely via our payment provider. By subscribing, you authorise us to charge your payment method on a recurring monthly basis until you cancel.' },
    ],
  },
  {
    heading: '6. CANCELLATION',
    blocks: [
      { type: 'p', text: 'You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period. You will retain access until the period ends.' },
    ],
  },
  {
    heading: '7. ACCEPTABLE USE',
    blocks: [
      { type: 'p', text: 'You agree not to:' },
      { type: 'ul', items: [
        'Use the platform for any unlawful purpose',
        'Share your account with others',
        'Attempt to reverse-engineer or copy platform features',
        'Upload content that is offensive, illegal or harmful',
        'Abuse or misuse the AI coaching feature',
      ] },
      { type: 'p', text: 'Violation of these terms may result in account suspension.' },
    ],
  },
  {
    heading: '8. INTELLECTUAL PROPERTY',
    blocks: [
      { type: 'p', text: 'All content, features and functionality on Esports Elite — including training material, roadmap content, and AI analysis output — are owned by Esports Elite and protected by applicable intellectual property laws. You may not reproduce or redistribute platform content without written permission.' },
    ],
  },
  {
    heading: '9. USER CONTENT',
    blocks: [
      { type: 'p', text: 'When you upload match screenshots or other content for AI analysis, you grant Esports Elite a limited licence to process that content to provide the service. We do not claim ownership of your content.' },
    ],
  },
  {
    heading: '10. DISCLAIMER',
    blocks: [
      { type: 'p', text: 'Esports Elite provides training tools and guidance for BGMI players. We do not guarantee specific in-game results, rank improvements or competitive outcomes. Performance improvement depends on individual effort and practice.' },
    ],
  },
  {
    heading: '11. LIMITATION OF LIABILITY',
    blocks: [
      { type: 'p', text: 'To the maximum extent permitted by law, Esports Elite shall not be liable for any indirect, incidental or consequential damages arising from your use of the platform.' },
    ],
  },
  {
    heading: '12. CHANGES TO TERMS',
    blocks: [
      { type: 'p', text: 'We may update these Terms of Service. We will notify you of significant changes via email. Continued use of the platform after changes constitutes acceptance of the new terms.' },
    ],
  },
  {
    heading: '13. GOVERNING LAW',
    blocks: [
      { type: 'p', text: 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Karnataka, India.' },
    ],
  },
  {
    heading: '14. CONTACT',
    blocks: [
      { type: 'p', text: 'For questions about these terms, contact us at support@esportselite.in' },
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

export default function TermsOfService() {
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
            TERMS OF{' '}
            <span style={{ background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SERVICE.
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
            By using Esports Elite, you agree to these terms. Please read them carefully.
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
