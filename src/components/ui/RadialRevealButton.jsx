import { useState } from 'react'

export default function RadialRevealButton({
  label,
  font,
  showText,
  padding = '12px 24px',
  rounded = 8,
  fill,
  textColor,
  colors = {},
  addIcon,
  icon,
  gap = 8,
  border = {},
  hover,
  link,
  transition = '0.5s',
  newTab,
  style,
}) {
  const [hov, setHov] = useState(false)

  const baseFill    = colors.fill          || fill      || '#0B0F16'
  const baseText    = colors.textColor     || textColor || '#FFFFFF'
  const hoverFill   = colors.hoverFill     || '#1769FF'
  const hoverText   = colors.hoverTextColor || baseText

  const bw = border.borderWidth != null ? border.borderWidth : 0
  const bs = border.borderStyle || 'solid'
  const bc = border.borderColor || 'transparent'

  const inner = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: addIcon && icon ? gap : 0,
        padding,
        borderRadius: rounded,
        background: baseFill,
        border: bw > 0 ? `${bw}px ${bs} ${bc}` : 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        color: hov ? hoverText : baseText,
        transition: `color ${transition} ease`,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...font,
        ...style,
      }}
    >
      {/* Radial reveal disc */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${hov ? 1 : 0})`,
          width: '220%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: hoverFill,
          transition: `transform ${transition} cubic-bezier(0.23, 1, 0.32, 1)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Icon (before label) */}
      {addIcon && icon && (
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}

      {/* Label */}
      {showText !== false && (
        <span style={{ position: 'relative', zIndex: 1 }}>
          {label}
        </span>
      )}
    </div>
  )

  if (link) {
    return (
      <a
        href={link}
        target={newTab ? '_blank' : '_self'}
        rel={newTab ? 'noopener noreferrer' : undefined}
        style={{ textDecoration: 'none', display: 'inline-block' }}
      >
        {inner}
      </a>
    )
  }

  return inner
}
