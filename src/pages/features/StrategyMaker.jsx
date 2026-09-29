import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, PenTool, BookOpen, Share2 } from 'lucide-react'
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

const PLAYERS = [
  { id: 'P1', color: '#1769FF', label: 'ENTRY',   row: 0, col: 1, animY: [-6, 2, -6], animX: [0, 3, 0] },
  { id: 'P2', color: '#7137FF', label: 'SUPPORT',  row: 1, col: 4, animY: [2, -6, 2], animX: [3, -2, 3] },
  { id: 'P3', color: '#FF1838', label: 'FLANK',    row: 2, col: 2, animY: [-4, 4, -4], animX: [-3, 2, -3] },
  { id: 'P4', color: '#00C48C', label: 'COVER',   row: 3, col: 5, animY: [4, -4, 4], animX: [2, -3, 2] },
]

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
            <Link to="/pricing" onClick={scrollTop} style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="GET STARTED →"
                padding="14px 32px" rounded={8}
                font={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: accent, hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </Link>
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

            {/* RIGHT — Squad map mockup */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 20, padding: 28, boxShadow: '0 20px 60px rgba(7,17,31,0.06)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 16, color: '#111827' }}>SQUAD STRATEGY</span>
                  <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: accent }}>ERANGEL</span>
                </div>

                {/* 6×4 grid */}
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 4 }}>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} style={{ background: '#FFF8F8', borderRadius: 2, height: 28 }} />
                    ))}
                  </div>

                  {/* Player dots */}
                  {PLAYERS.map((p, i) => (
                    <motion.div
                      key={p.id}
                      animate={{ y: p.animY, x: p.animX }}
                      transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                      style={{
                        position: 'absolute',
                        top: p.row * 32 + 6,
                        left: p.col * (100 / 6) + '%',
                        width: 18, height: 18,
                        borderRadius: '50%',
                        background: p.color,
                        border: '2px solid #FFFFFF',
                        boxShadow: `0 2px 8px ${p.color}66`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 800, fontSize: 7, color: '#FFFFFF' }}>{p.id}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Player labels */}
                <div style={{ borderTop: '1px solid #DCE4EF', marginTop: 16, paddingTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PLAYERS.map(p => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 10, color: '#536174', letterSpacing: '0.05em' }}>{p.id} {p.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section aria-label="Start building squad strategy" style={{ background: '#07111F', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
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
              <Link to="/pricing" onClick={scrollTop} style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START STRATEGIZING →"
                  padding="18px 48px" rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18 }}
                  colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: accent, hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </Link>
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
