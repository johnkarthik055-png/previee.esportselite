import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const ease = [0.23, 1, 0.32, 1]
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const SECTIONS = [
  {
    heading: '1. OUR REFUND POLICY',
    blocks: [
      { type: 'p', text: 'Esports Elite subscriptions are billed monthly at ₹149/month (GST inclusive). We offer refunds in the following circumstances:' },
      { type: 'ul', items: [
        'You were charged after cancelling your subscription',
        'You experienced a technical issue that prevented access to the platform for more than 48 hours and we were unable to resolve it',
        'You were charged incorrectly or duplicately',
      ] },
      { type: 'p', text: 'We do not offer refunds simply for change of mind after the billing period has started.' },
    ],
  },
  {
    heading: '2. HOW TO REQUEST A REFUND',
    blocks: [
      { type: 'p', text: 'To request a refund, email support@esportselite.in with:' },
      { type: 'ul', items: [
        'Your registered email address',
        'The date of the charge',
        'The reason for your refund request',
      ] },
      { type: 'p', text: 'We will respond within 3 business days.' },
    ],
  },
  {
    heading: '3. REFUND PROCESSING',
    blocks: [
      { type: 'p', text: 'Approved refunds will be processed within 5-7 business days. Refunds are returned to the original payment method.' },
    ],
  },
  {
    heading: '4. FREE TRIAL',
    blocks: [
      { type: 'p', text: 'If a free trial is offered, no charge is made during the trial period. You may cancel before the trial ends to avoid being charged.' },
    ],
  },
  {
    heading: '5. SUBSCRIPTION CANCELLATION',
    blocks: [
      { type: 'p', text: 'You may cancel your subscription at any time. Cancellation stops future charges but does not automatically trigger a refund for the current billing period, unless covered under Section 1 above.' },
    ],
  },
  {
    heading: '6. CONTACT',
    blocks: [
      { type: 'p', text: 'Refund questions: support@esportselite.in' },
      { type: 'p', text: 'We aim to respond within 3 business days.' },
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

export default function RefundPolicy() {
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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="legal-hero-inner"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 64px', position: 'relative', zIndex: 1, width: '100%' }}
        >
          <Link
            to="/"
            onClick={scrollTop}
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter', fontSize: 14, color: '#536174', cursor: 'pointer', marginBottom: 32 }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </motion.div>
          </Link>

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
            REFUND{' '}
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
            We want you to be happy with Esports Elite. Here is our refund policy.
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
          .legal-h1 { font-size: 44px !important; }
          .legal-desc { font-size: 16px !important; }
          .legal-content { padding: 40px 20px 0 !important; }
        }
      `}</style>
    </div>
  )
}
