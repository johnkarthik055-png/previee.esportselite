import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crosshair, BarChart2, Brain, Users, ArrowRight } from 'lucide-react'

const gradStyle = {
  background: 'linear-gradient(90deg, #1769FF, #7B35FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline',
}

const CARDS = [
  {
    Icon: Crosshair,
    title: 'TRAINING SYSTEM',
    body: 'Drills, modules, weapon practice and personalized training plans.',
  },
  {
    Icon: BarChart2,
    title: 'MATCH LOGGER',
    body: 'Track your performance, identify weaknesses and see real progress.',
  },
  {
    Icon: Brain,
    title: 'AI ANALYSIS',
    body: 'Get intelligent insights and actionable feedback to improve faster.',
  },
  {
    Icon: Users,
    title: 'SQUAD SYSTEM',
    body: 'Train together, compete together. Built for teams and coaches.',
  },
]

function Card({ Icon, title, body, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(23,105,255,0.12)' }}
      style={{
        background: '#FFFFFF',
        border: `1px solid ${hov ? '#1769FF' : '#DCE3EC'}`,
        borderRadius: 14,
        boxShadow: '0 12px 40px rgba(7,17,31,0.06)',
        padding: 28,
        height: 250,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        zIndex: 1,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Icon */}
      <div style={{
        color: '#1769FF',
        transition: 'filter 0.3s ease',
        filter: hov ? 'drop-shadow(0 0 6px rgba(23,105,255,0.4))' : 'none',
      }}>
        <Icon
          size={32}
          strokeWidth={1.8}
          style={hov ? { stroke: 'url(#iconGrad)' } : {}}
        />
      </div>

      {/* Hidden SVG gradient for icon hover */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1769FF" />
            <stop offset="100%" stopColor="#FF1838" />
          </linearGradient>
        </defs>
      </svg>

      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700,
        fontSize: 22,
        color: '#111827',
        marginTop: 16,
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
      }}>
        {title}
      </div>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        lineHeight: 1.55,
        color: '#526071',
        marginTop: 8,
        flex: 1,
      }}>
        {body}
      </p>

      {/* Bottom-right arrow circle */}
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <motion.div
          animate={hov
            ? { rotate: 45, background: '#1769FF', borderColor: '#1769FF' }
            : { rotate: 0, background: 'transparent', borderColor: '#DCE3EC' }
          }
          transition={{ duration: 0.3 }}
          style={{
            width: 28, height: 28, borderRadius: '50%',
            border: '1px solid #DCE3EC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowRight size={13} color={hov ? '#FFFFFF' : '#DCE3EC'} style={{ transition: 'color 0.3s' }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function FeatureSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '140px 0', overflow: 'hidden', position: 'relative' }}>
      {/* hero-art.png watermark */}
      <img src="/hero-art.png" style={{
        position: 'absolute', right: '-80px', top: '50%',
        transform: 'translateY(-50%)',
        width: '500px', opacity: 0.04,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }} alt="" aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }} className="feat-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.30em', color: '#526071',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            BUILT FOR PLAYERS WHO WANT MORE
          </p>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 58px)', lineHeight: 0.95,
            color: '#111827', textTransform: 'uppercase', margin: 0,
          }}>
            EVERYTHING YOU NEED TO{' '}
            <span style={gradStyle}>IMPROVE</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6,
            maxWidth: 650, color: '#526071', textAlign: 'center',
            margin: '20px auto 0',
          }}>
            From structured training to AI-powered insights, Esports Elite gives you the tools to level up — on and off the battlefield.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="feat-grid">
          {CARDS.map((card, i) => (
            <Card key={card.title} {...card} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .feat-grid  { grid-template-columns: 1fr !important; }
          .feat-inner { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  )
}
