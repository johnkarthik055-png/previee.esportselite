import { useEffect, useRef, useState } from 'react'
import { Users, Target, TrendingUp, Handshake } from 'lucide-react'

/*
 * Shared stats bar — same 4 real numbers everywhere it's used (homepage,
 * About, ...). Self-contained: owns its own count-up trigger, no props needed.
 */
function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function Stat({ icon: Icon, num, suffix, label, active, comma }) {
  const count = useCountUp(num, 2000, active)
  const display = comma ? count.toLocaleString('en-US') : count
  return (
    <div style={{ textAlign: 'center', padding: '36px 16px' }}>
      <Icon size={20} style={{ color: '#3B82F6', marginBottom: '10px' }} />
      <div style={{
        fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)',
        color: '#F8FAFC', lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {display}{suffix}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px',
        color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '10px',
      }}>
        {label}
      </div>
    </div>
  )
}

const STATS = [
  { icon: Users,      num: 100,  suffix: '+', label: 'Active Players',     comma: false },
  { icon: Target,     num: 1200, suffix: '+', label: 'Training Sessions',  comma: true  },
  { icon: TrendingUp, num: 800,  suffix: '+', label: 'Matches Tracked',    comma: false },
  { icon: Handshake,  num: 1,    suffix: '',  label: 'Official Partner',   comma: false },
]

export default function StatsBar() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      background: 'rgba(10,15,28,0.9)',
      borderTop: '1px solid #1E293B', borderBottom: '1px solid #1E293B',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div className="stats-bar-grid">
        {STATS.map((s, i, arr) => (
          <div key={i} style={{ borderRight: i < arr.length - 1 ? '1px solid #1E293B' : 'none' }}>
            <Stat {...s} active={active} />
          </div>
        ))}
      </div>
    </div>
  )
}
