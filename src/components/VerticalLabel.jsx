/*
 * Shared faint decorative vertical label, used beside photo/hero sections
 * (About, Features, Pricing, ...). Hidden below 1024px via the
 * ".vertical-label" class — at narrower widths the content column runs wide
 * enough to genuinely overlap it, and it's purely decorative so cutting it
 * there is correct.
 * NOTE: the hide rule needs `!important` wherever it's declared, because this
 * component sets `display` inline (inline styles always beat a plain class).
 */
export default function VerticalLabel({ children, dark = true, side = 'right' }) {
  return (
    <div className="vertical-label" style={{
      position: 'absolute', top: '40px', bottom: '40px',
      [side]: 'clamp(16px,4vw,48px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
      pointerEvents: 'none',
    }}>
      <span style={{
        writingMode: 'vertical-rl', transform: side === 'right' ? 'rotate(180deg)' : 'none',
        fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '15px',
        letterSpacing: '0.3em', textTransform: 'uppercase', lineHeight: 1.6,
        color: dark ? 'rgba(248,250,252,0.14)' : 'rgba(11,18,32,0.1)',
        whiteSpace: 'nowrap',
      }}>
        {children}
      </span>
    </div>
  )
}
