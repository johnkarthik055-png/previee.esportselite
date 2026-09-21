import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, BarChart2, Users, Star } from 'lucide-react'

const STATS = [
  { Icon: Trophy,    target: 95,   suffix: '%', label: 'Players Improved',    animate: true  },
  { Icon: BarChart2, target: 3,    suffix: 'x', label: 'Faster Progress',     animate: true  },
  { Icon: Users,     target: 250,  suffix: '+', label: 'Teams & Coaches',     animate: true  },
  { Icon: Star,      target: null, static: '4.9/5', label: 'Player Satisfaction', animate: false },
]

function useCounter(target, active, duration = 1400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || target === null) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(target * ease))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return count
}

function StatCell({ Icon, target, suffix, static: staticVal, label, animate, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCounter(target, animate && inView)
  const [hov, setHov] = useState(false)

  const displayValue = animate ? `${count}${suffix}` : staticVal

  const numberStyle = hov
    ? {
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700, fontSize: 38, lineHeight: 1, letterSpacing: '-0.01em',
        background: 'linear-gradient(90deg, #1769FF, #FF1838)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        transition: 'background 0.3s ease',
      }
    : {
        fontFamily: 'Barlow Condensed, sans-serif',
        fontWeight: 700, fontSize: 38, color: '#111827',
        lineHeight: 1, letterSpacing: '-0.01em',
        transition: 'color 0.3s ease',
      }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -4, scale: 1.03 }}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
        cursor: 'default',
      }}
      className="stat-cell"
    >
      <motion.div
        animate={hov
          ? { background: 'linear-gradient(135deg, rgba(23,105,255,0.15), rgba(255,24,56,0.1))', borderColor: 'rgba(23,105,255,0.3)' }
          : { background: 'linear-gradient(135deg, rgba(23,105,255,0.08), rgba(255,24,56,0.06))', borderColor: 'rgba(23,105,255,0.15)' }
        }
        transition={{ duration: 0.3 }}
        style={{
          width: 48, height: 48, borderRadius: 12,
          border: '1px solid rgba(23,105,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={22} color="#1769FF" strokeWidth={1.8} />
      </motion.div>
      <div>
        <div style={numberStyle}>
          {displayValue}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13, color: '#526071', marginTop: 4, whiteSpace: 'nowrap',
        }}>
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function StatsStrip() {
  return (
    <section style={{
      background: '#FFFFFF',
      borderTop: '1px solid #DCE3EC',
      borderBottom: '1px solid #DCE3EC',
      minHeight: 160,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <img src="/hero-art.png" style={{
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)',
        top: '-60px', width: '280px', opacity: 0.04,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }} alt="" aria-hidden="true" />

      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center',
        padding: '32px 64px', position: 'relative', zIndex: 1,
      }}
        className="stats-inner"
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            {i > 0 && (
              <div style={{ width: 1, height: 64, background: '#DCE3EC', flexShrink: 0 }} />
            )}
            <StatCell {...s} delay={i * 0.08} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .stats-inner {
            flex-direction: column !important;
            padding: 32px 20px !important;
          }
          .stat-cell {
            width: 100% !important;
            justify-content: flex-start !important;
            padding: 16px 0 !important;
            border-bottom: 1px solid #DCE3EC;
          }
          .stat-cell:last-child { border-bottom: none; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .stats-inner { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  )
}
