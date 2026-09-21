import { motion } from 'framer-motion'
import RadialRevealButton from './ui/RadialRevealButton'

const gradStyle = {
  background: 'linear-gradient(90deg, #1769FF, #7B35FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline',
}

export default function FinalCTA() {
  return (
    <section style={{
      background: '#080D15',
      minHeight: 360,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', left: '-5%', top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23,105,255,0.22) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,24,56,0.18) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(23,105,255,0.5), rgba(255,24,56,0.5), transparent)',
        zIndex: 0,
      }} />
      <img
        src="/hero-art.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', right: '-20px', top: '50%',
          transform: 'translateY(-50%)',
          width: '380px', height: 'auto',
          opacity: 0.08, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}
      />

      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', padding: '80px 24px',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.35em', color: '#7A8EAB',
            textTransform: 'uppercase', marginBottom: 20,
          }}
        >
          THE JOURNEY STARTS NOW
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.92,
            color: '#FFFFFF', textTransform: 'uppercase', margin: 0,
          }}
        >
          READY TO LEVEL{' '}
          <span style={gradStyle}>UP?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.65,
            color: '#7A8EAB', marginTop: 20, maxWidth: 480, margin: '20px auto 0',
          }}
        >
          Join thousands of players already training smarter. Your esports journey starts with one step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ marginTop: 36, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          <RadialRevealButton
            label="JOIN WAITLIST →"
            padding="16px 40px"
            rounded={8}
            font={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '0.06em' }}
            colors={{
              fill: '#FFFFFF',
              textColor: '#0B0F16',
              hoverFill: '#1769FF',
              hoverTextColor: '#FFFFFF',
            }}
            border={{ borderWidth: 0 }}
          />
          <RadialRevealButton
            label="LEARN MORE"
            padding="16px 40px"
            rounded={8}
            font={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '0.06em' }}
            colors={{
              fill: 'transparent',
              textColor: '#FFFFFF',
              hoverFill: '#FFFFFF',
              hoverTextColor: '#0B0F16',
            }}
            border={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.3)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
