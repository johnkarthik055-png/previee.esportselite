import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

// ── Gradient text styles ──
const gBlue = {
  background: 'linear-gradient(90deg, #1769FF, #4A9EFF)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', display: 'inline',
}
const gRed = {
  background: 'linear-gradient(90deg, #FF1838, #E60023)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', display: 'inline',
}
const gBlueRed = {
  background: 'linear-gradient(90deg, #1769FF, #FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  backgroundClip: 'text', display: 'inline',
}

// ── Stagger animation variants ──
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Bullet item ──
function Bullet({ text, delay = 0, color = '#1769FF' }) {
  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        background: `${color}18`, border: `1px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color, fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#536174', lineHeight: 1.4 }}>{text}</span>
    </motion.div>
  )
}

// ── Feature number label ──
function FeatureNum({ num, label, lineColor = '#1769FF' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 40, height: 2, background: lineColor, flexShrink: 0 }} />
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, color: lineColor, letterSpacing: '0.25em' }}>{num}</span>
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, color: '#536174' }}>—</span>
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, color: '#536174', letterSpacing: '0.2em' }}>{label}</span>
    </div>
  )
}

// ── Image placeholder ──
function ImagePlaceholder({ color, glow, icon, label, animX = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: animX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 }}
      whileHover={{ y: -5, scale: 1.01 }}
      style={{
        flex: 1,
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        aspectRatio: '16/10',
        maxWidth: 580,
        border: `1px solid ${color}44`,
        boxShadow: `0 20px 60px ${glow}`,
        background: '#07111F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Top-left bracket */}
      <div style={{
        position: 'absolute', top: 12, left: 12,
        width: 20, height: 20,
        borderTop: `2px solid ${color}66`,
        borderLeft: `2px solid ${color}66`,
      }} />
      {/* Bottom-right bracket */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        width: 20, height: 20,
        borderBottom: `2px solid ${color}66`,
        borderRight: `2px solid ${color}66`,
      }} />

      {/* Center content */}
      <span style={{ fontSize: 48, opacity: 0.4, lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 13,
        letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase',
      }}>[ {label} SCREENSHOT ]</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3D4F63' }}>
        Image coming soon
      </span>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────
function FeaturesHero() {
  return (
    <section style={{ height: 520, background: '#FFFFFF', overflow: 'hidden', position: 'relative' }} className="feat-hero">
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #DCE4EF 1px, transparent 1px)',
        backgroundSize: '28px 28px', opacity: 0.4, pointerEvents: 'none',
      }} />
      {/* Shards */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: 380, background: '#1769FF', opacity: 0.08, clipPath: 'polygon(0 0, 100% 0, 55% 100%, 0 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 240, height: 340, background: '#FF1838', opacity: 0.08, clipPath: 'polygon(0 0, 100% 0, 100% 75%, 35% 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 180, height: 200, background: '#1769FF', opacity: 0.05, clipPath: 'polygon(0 40%, 80% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 160, height: 180, background: '#FF1838', opacity: 0.05, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)', pointerEvents: 'none' }} />

      {/* Left microcopy */}
      <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'none' }} className="feat-hero-side">
        {['TRAIN', 'ANALYZE', 'DOMINATE'].map(w => (
          <span key={w} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#B0BAC8' }}>{w}</span>
        ))}
      </div>
      {/* Right microcopy */}
      <div style={{ position: 'absolute', right: 32, top: '40%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, pointerEvents: 'none' }} className="feat-hero-side">
        {['MORE', 'THAN', 'A GAME'].map(w => (
          <span key={w} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.25em', color: '#B0BAC8' }}>{w}</span>
        ))}
      </div>

      {/* Center */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.35em', color: '#6D7B90', textTransform: 'uppercase', margin: '0 0 16px' }}>
            BUILT FOR COMPETITIVE MINDS
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 92, lineHeight: 0.88, color: '#0B1220', textTransform: 'uppercase', margin: 0, textAlign: 'center' }} className="feat-hero-h1">
            FEATU<span style={gBlueRed}>RES</span>
          </motion.h1>
          <motion.div variants={fadeUp} style={{ width: 120, height: 2, background: 'linear-gradient(90deg, #1769FF, #FF1838)', margin: '20px auto', borderRadius: 2 }} />
          <motion.p variants={fadeUp} style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 620, textAlign: 'center', margin: 0, padding: '0 24px' }}>
            Everything you need to understand the game, build better strategies, analyze your performance and improve faster — in one place.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 01 — MAP KNOWLEDGE
// ─────────────────────────────────────────────────
function MapKnowledgeSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} style={{ flex: '0 0 48%' }} className="feat-col">
            <FeatureNum num="01" label="MAP KNOWLEDGE" lineColor="#1769FF" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              MASTER<br />EVERY <span style={gBlueRed}>MAP</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Understand the battlefield before you enter it. Explore maps, rotations, loot routes, vehicle spawns, compounds and zone patterns.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Detailed POIs & callouts','Rotations & zone patterns','Vehicle spawns & loot paths','Pro-level map insights'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="EXPLORE MAP KNOWLEDGE →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>

          <ImagePlaceholder
            color="#1769FF"
            glow="rgba(23,105,255,0.15)"
            icon="🗺️"
            label="Map Knowledge"
            animX={40}
          />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 02 — STRATEGY MAKER
// ─────────────────────────────────────────────────
function StrategyMakerSection() {
  return (
    <section style={{ background: '#F7F9FC', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row feat-row-reverse">
          <ImagePlaceholder
            color="#FF1838"
            glow="rgba(255,24,56,0.12)"
            icon="⚔️"
            label="Strategy Maker"
            animX={-40}
          />

          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} style={{ flex: '0 0 48%' }} className="feat-col">
            <FeatureNum num="02" label="STRATEGY MAKER" lineColor="#FF1838" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              TURN <span style={gBlue}>PLANS</span><br />INTO <span style={gRed}>WINS</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Create, visualize and refine strategies with an easy-to-use tactical planner. Plan rotations, angles, utility usage and team movements like a pro.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Tactical map drawing tools','Plan & save strategy setups','Share with your squad','Professional strategy templates'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} color="#FF1838" />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="START PLANNING →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#FF1838', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 03 — MATCH LOGGER + AI
// ─────────────────────────────────────────────────
function MatchLoggerSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }} style={{ flex: '0 0 48%' }} className="feat-col">
            <FeatureNum num="03" label="MATCH LOGGER + AI" lineColor="#1769FF" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              LOG <span style={gBlue}>SMARTER</span><br />IMPROVE <span style={gRed}>FASTER</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Track every match and let AI turn your results into actionable insights.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Extract stats from match screenshots','Detailed match history','Identify strengths & weaknesses','Track progress over time','AI-powered performance analysis'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="START LOGGING →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>

          <ImagePlaceholder
            color="#1769FF"
            glow="rgba(23,105,255,0.15)"
            icon="📊"
            label="Match Logger"
            animX={40}
          />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FEATURE 04 — AI COACH
// ─────────────────────────────────────────────────
function AICoachSection() {
  return (
    <section style={{ background: '#F7F9FC', padding: '140px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px' }} className="feat-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="feat-row feat-row-reverse">
          <ImagePlaceholder
            color="#7137FF"
            glow="rgba(113,55,255,0.15)"
            icon="🤖"
            label="AI Coach"
            animX={-40}
          />

          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} style={{ flex: '0 0 48%' }} className="feat-col">
            <FeatureNum num="04" label="AI COACH" lineColor="#7137FF" />
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 58, lineHeight: 0.92, color: '#0B1220', textTransform: 'uppercase', marginTop: 16, marginBottom: 0 }} className="feat-h2">
              PERSONAL <span style={gBlue}>COACH</span><br />ALWAYS WITH <span style={gRed}>YOU</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.6, color: '#536174', maxWidth: 480, marginTop: 20 }}>
              Get instant feedback, personalized training plans and data-driven guidance from your AI Coach.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
              {['Match analysis & feedback','Personalized training recommendations','Answer to in-game questions','Identify your weak areas'].map((b,i) => <Bullet key={b} text={b} delay={i*0.08} color="#7137FF" />)}
            </div>
            <div style={{ marginTop: 32 }}>
              <RadialRevealButton label="CHAT WITH AI COACH →" padding="13px 28px" rounded={8} font={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14 }} colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#7137FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────
function FeaturesCTA() {
  return (
    <section style={{ height: 360, background: '#0B1220', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1200 360" preserveAspectRatio="none">
        <polygon points="0,0 200,0 100,180 0,200" fill="#1769FF" opacity="0.04" />
        <polygon points="300,360 500,360 400,180 280,200" fill="#FF1838" opacity="0.04" />
        <polygon points="900,0 1100,0 1000,200 880,160" fill="#FF1838" opacity="0.04" />
        <polygon points="1100,360 1200,360 1200,160 1050,200" fill="#1769FF" opacity="0.04" />
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1, padding: '0 24px', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.35em', color: '#AAB8C8', textTransform: 'uppercase', margin: '0 0 16px' }}>
            DISCIPLINE BUILDS FREEDOM
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 68, color: 'white', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 }} className="feat-cta-h2">
            READY TO <span style={gBlue}>LEVEL</span> <span style={gRed}>UP?</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#AAB8C8', marginTop: 16, maxWidth: 480 }}>
            Build better habits. Make better decisions. Become a better player.
          </motion.p>
          <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
            <RadialRevealButton label="JOIN WAITLIST →" padding="16px 44px" rounded={8} font={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '0.06em' }} colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }} border={{ borderWidth: 0 }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────────
export default function Features() {
  return (
    <>
      <Navbar activePage="features" />
      <main>
        <FeaturesHero />
        <MapKnowledgeSection />
        <StrategyMakerSection />
        <MatchLoggerSection />
        <AICoachSection />
        <FeaturesCTA />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .feat-hero { height: auto !important; min-height: 400px !important; padding: 60px 0 !important; }
          .feat-hero-h1 { font-size: 52px !important; }
          .feat-hero-side { display: none !important; }
          .feat-inner { padding: 0 20px !important; }
          .feat-row { flex-direction: column !important; gap: 40px !important; }
          .feat-row-reverse { flex-direction: column !important; }
          .feat-col { flex: none !important; width: 100% !important; }
          .feat-h2 { font-size: 40px !important; }
          .feat-cta-h2 { font-size: 44px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .feat-inner { padding: 0 32px !important; }
          .feat-h2 { font-size: 44px !important; }
          .feat-hero-h1 { font-size: 72px !important; }
          .feat-row { gap: 40px !important; }
        }
      `}</style>
    </>
  )
}
