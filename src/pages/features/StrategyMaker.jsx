import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, PenTool, BookOpen, Share2, Pencil, Move, Circle, Square, Minus, Undo2, Trash2 } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RadialRevealButton from '../../components/ui/RadialRevealButton'

const ease = [0.23, 1, 0.32, 1]

const accent = '#FF1838'
const lightBg = '#FFF0F2'
const borderColor = 'rgba(255,24,56,0.15)'

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const INSIDE_CARDS = [
  {
    Icon: PenTool,
    title: 'INTERACTIVE DRAWING',
    desc: 'Draw directly on live BGMI map overlays. Mark player positions, rotation arrows, compound assignments and drop zones with simple drawing tools.',
  },
  {
    Icon: BookOpen,
    title: 'UNLIMITED SAVES',
    desc: 'Save as many strategies as you need. Organize by map, scenario or opponent type. Access everything from any device.',
  },
  {
    Icon: Share2,
    title: 'SQUAD SHARING',
    desc: 'Share your strategies with squad members instantly via link. Everyone sees the same plan before the match starts.',
  },
]

const HOW_BULLETS = [
  'Plan drops and rotations before every session',
  'Assign specific roles to each squad member',
  'Build a library of strategies for different scenarios',
  'Share the plan so everyone is on the same page',
]

const BOARD_PLAYERS = [
  { id: 'P1', top: '62%', left: '28%', label: 'ENTRY',   grad: 'linear-gradient(135deg,#1769FF,#1040AA)', color: '#1769FF', anim: { x: [0, 3, 0], y: [0, -3, 0] }, dur: 3 },
  { id: 'P2', top: '48%', left: '18%', label: 'SUPPORT', grad: 'linear-gradient(135deg,#7137FF,#4A1D9C)', color: '#7137FF', anim: { x: [0, -3, 0] }, dur: 3.5 },
  { id: 'P3', top: '72%', left: '55%', label: 'FLANK',   grad: 'linear-gradient(135deg,#FF1838,#AA0F24)', color: '#FF1838', anim: { x: [0, 4, 0], y: [0, 2, 0] }, dur: 2.8 },
  { id: 'P4', top: '38%', left: '50%', label: 'COVER',   grad: 'linear-gradient(135deg,#00C48C,#007A58)', color: '#00C48C', anim: { y: [0, -4, 0] }, dur: 4 },
]

const TOOLS = [Pencil, Move, Circle, Square, Minus, Undo2, Trash2]
const SAVED_STRATEGIES = ['Alpha Push', 'Beta Flank', 'Safe Circle']

function TrafficDots() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
    </div>
  )
}

function ToolButton({ Icon }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: hover ? '#FF1838' : '#07111F',
        border: `1px solid ${hover ? '#FF1838' : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
        transform: hover ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <Icon size={14} color={hover ? '#fff' : '#AAB8C8'} />
    </div>
  )
}

function StrategyPill({ label }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#0D1526', border: `1px solid ${hover ? '#FF1838' : 'rgba(255,255,255,0.08)'}`,
        padding: '6px 12px', borderRadius: 20, flexShrink: 0, cursor: 'pointer',
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: hover ? '#FF1838' : '#AAB8C8',
        transition: 'border-color 0.2s ease, color 0.2s ease',
      }}
    >
      {label}
    </div>
  )
}

function StrategyBoardVisual() {
  return (
    <div style={{ background: '#07111F', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,24,56,0.2)', boxShadow: '0 30px 80px rgba(255,24,56,0.1)' }}>
      {/* Top bar */}
      <div style={{ background: '#0D1526', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrafficDots />
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>STRATEGY MAKER</span>
        </div>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C' }}>● SAVED</span>
      </div>

      {/* Strategy name row */}
      <div style={{ background: '#0D1526', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff' }}>ERANGEL — POCHINKI PUSH</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#536174', marginTop: 2 }}>Squad · 4 Players · Modified 2m ago</div>
        </div>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#FF1838', letterSpacing: '0.1em', cursor: 'pointer' }}>SHARE →</span>
      </div>

      {/* Map board */}
      <div style={{ position: 'relative', height: 260, background: '#0A1628', overflow: 'hidden' }}>
        <img
          src="/maps/erangel.jpg"
          alt="Erangel tactical map"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,17,31,0.5) 0%, rgba(7,17,31,0.35) 40%, rgba(7,17,31,0.6) 100%)' }} />

        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,24,56,0.06) 0, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,24,56,0.06) 0, transparent 1px, transparent 60px)',
            backgroundSize: '60px 60px',
          }}
        />

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          <defs>
            <marker id="sm-arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#1769FF" />
            </marker>
            <marker id="sm-arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#7137FF" />
            </marker>
          </defs>

          <rect x="42%" y="38%" width="18%" height="16%" rx="4" fill="rgba(255,24,56,0.1)" stroke="rgba(255,24,56,0.3)" strokeWidth="1" />

          <motion.path
            d="M 30% 70% Q 45% 50% 55% 35%"
            stroke="#1769FF" strokeWidth="1.5" strokeDasharray="8,4" fill="none" opacity="0.6"
            markerEnd="url(#sm-arrow-blue)"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M 70% 65% Q 60% 45% 55% 35%"
            stroke="#7137FF" strokeWidth="1.5" strokeDasharray="8,4" fill="none" opacity="0.6"
            markerEnd="url(#sm-arrow-purple)"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
          />
        </svg>

        {BOARD_PLAYERS.map(p => (
          <motion.div
            key={p.id}
            animate={p.anim}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: p.top, left: p.left, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.grad, border: '2px solid white', boxShadow: `0 0 16px ${p.color}80, 0 4px 8px rgba(0,0,0,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 13, color: '#fff', lineHeight: '36px', textAlign: 'center' }}>{p.id}</span>
            </div>
            <div style={{ background: 'rgba(7,17,31,0.8)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', border: `1px solid ${p.color}4D`, padding: '2px 6px', borderRadius: 4 }}>
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 8, color: p.color }}>{p.label}</span>
            </div>
          </motion.div>
        ))}

        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,24,56,0.15)', border: '1px solid rgba(255,24,56,0.3)', borderRadius: 8, padding: '6px 12px' }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 9, color: '#FF1838', letterSpacing: '0.15em' }}>⚡ HOT DROP</span>
        </div>
      </div>

      {/* Tools row */}
      <div style={{ background: '#0D1526', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
        {TOOLS.map((ToolIcon, i) => (
          <ToolButton key={i} Icon={ToolIcon} />
        ))}
        <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.06)', margin: '0 8px', alignSelf: 'center' }} />
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#FF1838', letterSpacing: '0.1em' }}>DRAW</span>
      </div>

      {/* Saved strategies row */}
      <div style={{ padding: '12px 20px', display: 'flex', gap: 8, overflowX: 'auto', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: '#536174', letterSpacing: '0.15em', marginRight: 4, flexShrink: 0 }}>SAVED</span>
        {SAVED_STRATEGIES.map(label => (
          <StrategyPill key={label} label={label} />
        ))}
      </div>
    </div>
  )
}

export default function StrategyMaker() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="features" />

      {/* ── SECTION 1 — HERO ── */}
      <section
        aria-label="Strategy Maker hero"
        style={{ background: '#FFFFFF', minHeight: '65vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #DCE4EF' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: 600, height: 400, background: 'radial-gradient(circle,rgba(255,24,56,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 500, height: 400, background: 'radial-gradient(circle,rgba(113,55,255,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />

        <div className="sm-hero-inner">
          {/* Back link */}
          <Link
            to="/features"
            onClick={scrollTop}
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter', fontSize: 14, color: '#536174', cursor: 'pointer', marginBottom: 32 }}
            >
              <ArrowLeft size={16} />
              Back to Features
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}
          >
            <div style={{ width: 40, height: 2, background: accent, borderRadius: 1 }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase' }}>STRATEGY MAKER</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.01em', color: '#111827' }}
            className="sm-h1"
          >
            BUILD YOUR<br />SQUAD STRATEGY.
          </motion.div>

          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="sm-desc"
          >
            Draw custom squad strategies on interactive BGMI maps. Mark rotations, drop zones, flanking paths and compound assignments — save unlimited strategies and share instantly with your team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}
          >
            {['DRAW ON MAPS', 'UNLIMITED SAVES', 'SQUAD SHARING', 'PRO TEMPLATES'].map(pill => (
              <span key={pill} style={{ background: lightBg, border: `1px solid ${borderColor}`, padding: '8px 16px', borderRadius: 20, fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: accent }}>
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}
          >
            <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="GET STARTED →"
                padding="14px 32px" rounded={8}
                font={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: accent, hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </a>
            <Link to="/features" onClick={scrollTop} style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="← ALL FEATURES"
                padding="14px 32px" rounded={8}
                font={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15 }}
                colors={{ fill: '#FFFFFF', textColor: '#111827', hoverFill: '#111827', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 1.5, borderColor: '#DCE4EF' }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2 — WHAT'S INSIDE ── */}
      <section aria-label="What's inside Strategy Maker" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="sm-inner">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>WHAT'S INSIDE</div>
            <div className="sm-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, color: '#111827' }}>
              STRATEGY BUILT<br /><span style={G}>FOR SQUADS.</span>
            </div>
          </motion.div>

          <div className="sm-cards-grid">
            {INSIDE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }} transition={{ duration: 0.55, ease, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(7,17,31,0.08)' }}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
                <div style={{ width: 48, height: 48, background: lightBg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <card.Icon size={22} color={accent} strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 22, color: '#111827' }}>{card.title}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.6, color: '#536174', marginTop: 8 }}>{card.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — HOW IT HELPS ── */}
      <section aria-label="How Strategy Maker helps" style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="sm-inner">
          <div className="sm-how-grid">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(-40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            >
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>HOW IT HELPS</div>
              <div className="sm-how-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.9, color: '#111827' }}>
                STOP WINGING<br /><span style={G}>YOUR DROPS.</span>
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 20, maxWidth: 480 }}>
                Squads that improvise on drop lose to squads with a plan. Visual strategy turns four separate players into one coordinated unit.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
                {HOW_BULLETS.map(b => (
                  <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, background: lightBg, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Check size={12} color={accent} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174', lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Strategy board */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              <StrategyBoardVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section aria-label="Start building squad strategy" style={{ background: '#07111F', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(113,55,255,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          >
            <div className="sm-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, color: '#FFFFFF' }}>
              READY TO BUILD<br /><span style={G}>YOUR STRATEGY?</span>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: '#AAB8C8', lineHeight: 1.65, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
              Stop improvising. Build a real plan, share it with your squad and go into every match prepared.
            </p>
            <div style={{ marginTop: 40 }}>
              <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START STRATEGIZING →"
                  padding="18px 48px" rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18 }}
                  colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: accent, hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </a>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>Included in ₹149/month · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        .sm-hero-inner { max-width:1280px; margin:0 auto; padding:128px 64px; position:relative; z-index:1; width:100%; }
        .sm-inner      { max-width:1280px; margin:0 auto; padding:0 64px; }
        .sm-h1         { font-size:clamp(56px,8vw,100px); }
        .sm-desc       { font-family:'Inter',sans-serif; font-size:18px; line-height:1.6; color:#536174; max-width:560px; margin-top:20px; }
        .sm-section-h2 { font-size:clamp(36px,5vw,64px); }
        .sm-how-h2     { font-size:clamp(36px,5vw,56px); }
        .sm-cta-h2     { font-size:clamp(48px,7vw,88px); }
        .sm-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .sm-how-grid   { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }

        @media (max-width:900px) {
          .sm-hero-inner { padding:96px 20px !important; }
          .sm-inner      { padding:0 20px !important; }
          .sm-desc       { font-size:16px !important; }
          .sm-cards-grid { grid-template-columns:1fr !important; }
          .sm-how-grid   { grid-template-columns:1fr !important; gap:48px !important; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>
    </div>
  )
}
