import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

/* Shared testimonials carousel — placeholder quotes, real ones swapped in later.
 * Same component/content everywhere it's used; `theme` only swaps colors so it
 * can sit correctly in either a dark section (homepage) or a light one (About).
 * Self-contained scroll-reveal via useScrollAnimation — doesn't depend on the
 * page it's dropped into having its own IntersectionObserver bootstrap. */
const TESTIMONIALS = [
  {
    quote: 'Esports Elite gave me a real training structure instead of just grinding blindly. My aim and decision-making both improved within weeks.',
    name: 'Player One', role: 'Entry Fragger',
  },
  {
    quote: 'The analytics showed me exactly where I was losing fights. That alone changed how I play.',
    name: 'Player Two', role: 'IGL',
  },
  {
    quote: 'Training with a real plan instead of random matches made the biggest difference in my season.',
    name: 'Player Three', role: 'Support',
  },
]

const THEMES = {
  dark: {
    heading: '#F8FAFC', cardBg: 'rgba(13,21,38,0.85)', cardBorder: '#1E293B',
    quote: '#E2E8F0', name: '#F8FAFC', role: '#64748B',
    avatarBg: 'rgba(37,99,235,0.15)', avatarText: '#60A5FA',
    arrowBorder: '#334155', arrowColor: '#F8FAFC',
  },
  light: {
    heading: '#0B1220', cardBg: '#FFFFFF', cardBorder: '#E2E8F0',
    quote: '#334155', name: '#0B1220', role: '#64748B',
    avatarBg: 'rgba(37,99,235,0.1)', avatarText: '#2563EB',
    arrowBorder: '#CBD5E1', arrowColor: '#0B1220',
  },
}

export default function TestimonialCarousel({ theme = 'dark' }) {
  const [index, setIndex] = useState(0)
  const [ref, visible] = useScrollAnimation({ threshold: 0.15 })
  const t = TESTIMONIALS[index]
  const c = THEMES[theme]
  const go = dir => setIndex(i => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length)

  const arrowStyle = {
    width: '40px', height: '40px', borderRadius: '10px',
    background: 'transparent', border: `1px solid ${c.arrowBorder}`, color: c.arrowColor,
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  }

  return (
    <div ref={ref} className={`anim-section ${visible ? 'visible' : ''}`}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '20px', marginBottom: '40px',
      }}>
        <div>
          <div className="accent-line" />
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px',
            color: '#3B82F6', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '16px',
          }}>TESTIMONIALS</p>
          <h2 style={{
            fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)',
            color: c.heading, lineHeight: 1.1, textTransform: 'uppercase',
          }}>
            Real players. <span className={theme === 'dark' ? 'gradient-text' : ''} style={theme === 'light' ? { color: '#2563EB' } : undefined}>Real progress.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" style={arrowStyle}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" style={arrowStyle}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div style={{
        background: c.cardBg, border: `1px solid ${c.cardBorder}`, borderRadius: '18px',
        padding: 'clamp(28px,5vw,48px)', minHeight: '220px',
        boxShadow: theme === 'light' ? '0 4px 24px rgba(15,23,42,0.06)' : 'none',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 'clamp(17px,2vw,21px)',
          color: c.quote, lineHeight: 1.7,
        }}>
          &ldquo;{t.quote}&rdquo;
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
            background: c.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '16px', color: c.avatarText,
          }}>
            {t.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '15px', color: c.name }}>{t.name}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: c.role }}>{t.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
