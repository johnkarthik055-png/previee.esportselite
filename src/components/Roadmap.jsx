import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RadialRevealButton from './ui/RadialRevealButton'

const gradStyle = {
  background: 'linear-gradient(90deg, #1769FF, #7B35FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline',
}

const NODES = [
  {
    num: '01', stage: 'STAGE 01', label: 'LEARN BASICS',
    fill: '#1769FF', shadow: 'rgba(23,105,255,0.5)',
    size: 44, left: '8%',  bottom: '8%',
  },
  {
    num: '02', stage: 'STAGE 02', label: 'BUILD MECHANICS',
    fill: '#1769FF', shadow: 'rgba(23,105,255,0.5)',
    size: 44, left: '26%', bottom: '26%',
  },
  {
    num: '03', stage: 'STAGE 03', label: 'ANALYZE & IMPROVE',
    fill: '#7B35FF', shadow: 'rgba(123,53,255,0.5)',
    size: 44, left: '44%', bottom: '44%',
  },
  {
    num: '04', stage: 'STAGE 04', label: 'COMPETE IN SCRIMS',
    fill: '#FF1838', shadow: 'rgba(255,24,56,0.5)',
    size: 44, left: '62%', bottom: '62%',
  },
  {
    num: '05', stage: 'STAGE 05', label: 'GO ELITE',
    fill: '#FF1838', shadow: 'rgba(255,24,56,0.5)',
    size: 52, left: '80%', bottom: '78%',
  },
]

const PATH_D =
  'M70,438 C110,432 148,356 178,348 C208,340 256,266 286,258 C316,250 364,176 394,168 C440,152 480,100 506,84'

function RoadmapVisual() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: 500 }}>
      <svg
        viewBox="0 0 600 500"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="roadmapGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1769FF" />
            <stop offset="50%"  stopColor="#7B35FF" />
            <stop offset="100%" stopColor="#FF1838" />
          </linearGradient>
        </defs>
        <path d={PATH_D} fill="none" stroke="#DCE3EC" strokeWidth="2" strokeDasharray="6 4" />
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="url(#roadmapGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>

      {NODES.map((node, i) => (
        <motion.div
          key={node.num}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 2 + i * 0.2 }}
          style={{
            position: 'absolute',
            left: node.left,
            bottom: node.bottom,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{
            width: node.size,
            height: node.size,
            borderRadius: '50%',
            background: node.fill,
            boxShadow: `0 0 16px ${node.shadow}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {node.num === '05' && (
              <span style={{ fontSize: 10, color: 'white', lineHeight: 1, marginBottom: 1 }}>♛</span>
            )}
            <span style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1,
            }}>
              {node.num}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{
              fontFamily: 'Rajdhani, sans-serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.2em', color: '#888899',
            }}>
              {node.stage}
            </div>
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontSize: 20, fontWeight: 700,
              color: '#111827', whiteSpace: 'nowrap', lineHeight: 1,
            }}>
              {node.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Roadmap() {
  return (
    <section style={{ background: '#F7F9FC', padding: '140px 0', overflow: 'hidden', position: 'relative' }}>
      <img src="/hero-art.png" style={{
        position: 'absolute', left: '-60px', bottom: '-40px',
        width: '380px', opacity: 0.05,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }} alt="" aria-hidden="true" />

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 64px',
        display: 'flex', alignItems: 'center', gap: 80,
        position: 'relative', zIndex: 1,
      }}
        className="roadmap-inner"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: '0 0 42%', maxWidth: 450 }}
          className="roadmap-left"
        >
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.30em', color: '#526071',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            YOUR JOURNEY
          </p>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: 56, lineHeight: 0.95,
            color: '#111827', textTransform: 'uppercase', margin: 0,
          }}>
            A CLEAR ROADMAP TO{' '}
            <span style={gradStyle}>GREATNESS</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.65,
            color: '#526071', marginTop: 20, maxWidth: 450,
          }}>
            Step-by-step training plans designed for every stage of your competitive journey — from beginner to elite.
          </p>

          <div style={{ marginTop: 36 }}>
            <RadialRevealButton
              label="VIEW ROADMAP →"
              padding="14px 28px"
              rounded={8}
              font={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.06em' }}
              colors={{
                fill: '#0B0F16',
                textColor: '#FFFFFF',
                hoverFill: '#1769FF',
                hoverTextColor: '#FFFFFF',
              }}
              border={{ borderWidth: 0 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ flex: 1 }}
          className="roadmap-right"
        >
          <RoadmapVisual />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .roadmap-inner { flex-direction: column !important; gap: 48px !important; padding: 0 24px !important; }
          .roadmap-left  { flex: none !important; max-width: 100% !important; }
          .roadmap-right { width: 100% !important; }
        }
        @media (max-width: 767px) {
          .roadmap-inner { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  )
}
