import { motion } from 'framer-motion'
import RadialRevealButton from './ui/RadialRevealButton'

const gradStyle = {
  background: 'linear-gradient(90deg, #1769FF, #7B35FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

function Shards() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 600 600"
      preserveAspectRatio="none"
    >
      <polygon points="40,80 120,40 140,130 60,160"   fill="#1769FF" opacity="0.10" />
      <polygon points="10,200 80,170 100,260 20,280"  fill="#1769FF" opacity="0.08" />
      <polygon points="60,350 150,310 170,400 70,430" fill="#1769FF" opacity="0.07" />
      <polygon points="100,480 180,450 200,520 110,550" fill="#2D8CFF" opacity="0.06" />
      <polygon points="0,120 50,90 70,180 10,200"    fill="#00A8FF" opacity="0.06" />
      <polygon points="460,50 550,20 560,110 470,130"  fill="#FF1838" opacity="0.10" />
      <polygon points="490,180 580,150 590,240 500,260" fill="#FF1838" opacity="0.08" />
      <polygon points="450,320 540,290 560,380 460,410" fill="#E60023" opacity="0.07" />
      <polygon points="510,460 590,430 595,510 520,530" fill="#FF1838" opacity="0.06" />
      <polygon points="480,100 560,70 575,160 485,185" fill="#FF1838" opacity="0.05" />
      <line x1="200" y1="0" x2="180" y2="600" stroke="rgba(23,105,255,0.06)" strokeWidth="1" />
      <line x1="320" y1="0" x2="300" y2="600" stroke="rgba(23,105,255,0.04)" strokeWidth="1" />
      <line x1="400" y1="0" x2="390" y2="600" stroke="rgba(255,24,56,0.04)" strokeWidth="1" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: 720,
      background: '#FFFFFF',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      <svg aria-hidden="true" style={{ position:'absolute', top:0, right:0, width:260, height:220, pointerEvents:'none' }} viewBox="0 0 260 220">
        <polygon points="260,0 260,220 80,0" fill="#FF1838" opacity="0.07" />
      </svg>
      <svg aria-hidden="true" style={{ position:'absolute', bottom:0, left:0, width:200, height:160, pointerEvents:'none' }} viewBox="0 0 200 160">
        <polygon points="0,160 200,160 0,40" fill="#1769FF" opacity="0.07" />
      </svg>
      <svg aria-hidden="true" style={{ position:'absolute', bottom:0, right:60, width:180, height:140, pointerEvents:'none' }} viewBox="0 0 180 140">
        <polygon points="0,140 180,140 180,0" fill="#FF1838" opacity="0.07" />
      </svg>

      <div style={{
        display: 'flex', alignItems: 'center',
        width: '100%', maxWidth: 1400,
        margin: '0 auto', position: 'relative', zIndex: 1,
      }} className="hero-row">

        {/* LEFT COLUMN */}
        <div style={{ flex: '0 0 55%', paddingLeft: '8vw', paddingTop: 80, paddingBottom: 80, maxWidth: 570 }}
          className="hero-left"
        >
          <motion.p {...fadeUp(0)} style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 12, letterSpacing: '0.35em', color: '#526071',
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            MORE THAN A GAME
          </motion.p>

          <motion.h1 {...fadeUp(0.1)} style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: 'clamp(52px, 7vw, 86px)', lineHeight: 0.92,
            letterSpacing: '-0.025em', color: '#111827',
            margin: 0, textTransform: 'uppercase',
          }}>
            WHERE GRIND<br />
            <span style={gradStyle}>BECOMES</span><br />
            GREATNESS
          </motion.h1>

          <motion.p {...fadeUp(0.2)} style={{
            fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.65,
            color: '#526071', maxWidth: 500, marginTop: 28,
          }}>
            Esports Elite is your personal training, analytics and growth platform built for competitive BGMI players. Train. Analyze. Dominate.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            <RadialRevealButton
              label="JOIN WAITLIST →"
              padding="14px 32px"
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
            <RadialRevealButton
              label="WATCH TRAILER"
              padding="14px 32px"
              rounded={8}
              font={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '0.06em' }}
              colors={{
                fill: '#FFFFFF',
                textColor: '#111827',
                hoverFill: '#111827',
                hoverTextColor: '#FFFFFF',
              }}
              border={{ borderWidth: 1.5, borderStyle: 'solid', borderColor: '#B8C4D3' }}
            />
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 44 }}>
            {[
              { num: '10K+', label: 'Players Training' },
              { num: '500+', label: 'Squads Signed Up' },
              { num: '1',    label: 'Mission'          },
            ].map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {i > 0 && <div style={{ width: 1, height: 36, background: '#D8E0EA', margin: '0 24px' }} />}
                <div>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                    fontSize: 28, color: '#111827', lineHeight: 1,
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                    fontSize: 11, color: '#526071', marginTop: 4,
                  }}>{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ARTWORK */}
        <div style={{ flex: '0 0 45%', position: 'relative', minHeight: 560, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="hero-right"
        >
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 55% 80% at 20% 50%, rgba(23,105,255,0.18) 0%, transparent 70%)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 55% 80% at 80% 50%, rgba(255,24,56,0.18) 0%, transparent 70%)',
          }} />
          <Shards />
          <motion.img
            src="/hero-art.png"
            alt="Esports Elite"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 560, objectFit: 'contain', display: 'block' }}
          />
          <div style={{
            position: 'absolute', right: 0, top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
          }} className="hero-vert-text">
            {['TRAIN', 'ANALYZE', 'DOMINATE'].map((word, i) => (
              <div key={word} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {i > 0 && (
                  <div style={{ width: 1, height: 16, background: i % 2 === 0 ? '#1769FF' : '#FF1838', margin: '4px 0' }} />
                )}
                <span style={{
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                  fontSize: 11, letterSpacing: '0.22em', color: '#273244',
                  writingMode: 'vertical-rl', textOrientation: 'mixed', textTransform: 'uppercase',
                }}>
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-row  { flex-direction: column !important; }
          .hero-left { flex: none !important; width: 100% !important; padding-left: 20px !important; padding-right: 20px !important; padding-top: 48px !important; }
          .hero-right { flex: none !important; width: 100% !important; min-height: 320px !important; }
          .hero-vert-text { display: none !important; }
        }
      `}</style>
    </section>
  )
}
