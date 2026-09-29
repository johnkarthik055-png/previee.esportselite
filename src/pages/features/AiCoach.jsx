import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, Brain, MessageSquare, TrendingUp } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RadialRevealButton from '../../components/ui/RadialRevealButton'

const ease = [0.23, 1, 0.32, 1]

const accent = '#7137FF'
const lightBg = '#F0EAFF'
const borderColor = 'rgba(113,55,255,0.15)'

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const INSIDE_CARDS = [
  {
    Icon: Brain,
    title: 'MATCH ANALYSIS',
    desc: 'Upload your post-match screenshot and the AI reads your stats — K/D, damage, survival time — and identifies exactly what went wrong.',
  },
  {
    Icon: MessageSquare,
    title: 'PERSONAL FEEDBACK',
    desc: 'Not generic tips. Specific, actionable improvement areas based on YOUR match data, every session.',
  },
  {
    Icon: TrendingUp,
    title: 'PROGRESS TRACKING',
    desc: 'See how your performance changes week over week. Identify patterns, track improvement and stay accountable.',
  },
]

const HOW_BULLETS = [
  'Pinpoint your exact weaknesses per session',
  'Get specific improvement tasks not generic advice',
  'Track whether your changes are actually working',
  'Compare your stats against your own baseline',
]

function TypingDot({ delay }) {
  return (
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }}
    />
  )
}

export default function AiCoach() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="features" />

      {/* ── SECTION 1 — HERO ── */}
      <section
        aria-label="AI Coach hero"
        style={{ background: '#FFFFFF', minHeight: '65vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #DCE4EF' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: 600, height: 400, background: 'radial-gradient(circle,rgba(113,55,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 500, height: 400, background: 'radial-gradient(circle,rgba(255,24,56,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />

        <div className="ai-hero-inner">
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
            <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase' }}>AI COACH</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.01em', color: '#111827' }}
            className="ai-h1"
          >
            YOUR PERSONAL<br />COACH.
          </motion.div>

          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="ai-desc"
          >
            Upload a screenshot of your match stats and get personalized AI feedback on exactly what to improve — positioning, accuracy, decision-making and rotation timing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}
          >
            {['SCREENSHOT ANALYSIS', 'PERSONALIZED FEEDBACK', 'WEEKLY SUMMARIES', 'IMPROVEMENT TRACKING'].map(pill => (
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
      <section aria-label="What's inside AI Coach" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="ai-inner">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>WHAT'S INSIDE</div>
            <div className="ai-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, color: '#111827' }}>
              COACHING THAT<br /><span style={G}>ACTUALLY WORKS.</span>
            </div>
          </motion.div>

          <div className="ai-cards-grid">
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
      <section aria-label="How AI Coach helps" style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="ai-inner">
          <div className="ai-how-grid">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(-40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            >
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>HOW IT HELPS</div>
              <div className="ai-how-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.9, color: '#111827' }}>
                STOP GUESSING<br /><span style={G}>WHAT TO FIX.</span>
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 20, maxWidth: 480 }}>
                After every match, most players don't know what actually needs improving. They guess, repeat the same mistakes and plateau.
              </p>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 16, maxWidth: 480 }}>
                The AI Coach reads your actual match data and tells you exactly what to work on next.
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

            {/* RIGHT — Chat mockup */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 20, padding: 32, boxShadow: '0 20px 60px rgba(7,17,31,0.06)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 16, color: '#111827' }}>AI COACH</span>
                  <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', color: accent }}>ANALYZING...</span>
                </div>

                {/* User bubble */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                  <div style={{ background: '#F7F9FC', border: '1px solid #DCE4EF', borderRadius: '12px 12px 0 12px', padding: '10px 14px', maxWidth: '85%' }}>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174', margin: 0 }}>
                      Match uploaded — K/D 1.2, Damage 245, Placement 8
                    </p>
                  </div>
                </div>

                {/* AI bubble */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
                  <div style={{ background: accent, borderRadius: '0 12px 12px 12px', padding: '10px 14px', maxWidth: '90%' }}>
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#FFFFFF', margin: 0, lineHeight: 1.5 }}>
                      Your damage is solid but placement suggests early rotation issues. Focus on reading the second circle before committing to fights.
                    </p>
                  </div>
                </div>

                {/* Typing indicator */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
                  <div style={{ background: `${accent}22`, borderRadius: '0 12px 12px 12px', padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center' }}>
                    <TypingDot delay={0} />
                    <TypingDot delay={0.2} />
                    <TypingDot delay={0.4} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section aria-label="Get AI Coaching" style={{ background: '#07111F', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(113,55,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          >
            <div className="ai-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, color: '#FFFFFF' }}>
              READY TO IMPROVE<br /><span style={G}>FASTER?</span>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: '#AAB8C8', lineHeight: 1.65, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
              Stop guessing. Start training with data that actually tells you what to fix.
            </p>
            <div style={{ marginTop: 40 }}>
              <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="GET AI COACHING →"
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
        .ai-hero-inner { max-width:1280px; margin:0 auto; padding:128px 64px; position:relative; z-index:1; width:100%; }
        .ai-inner      { max-width:1280px; margin:0 auto; padding:0 64px; }
        .ai-h1         { font-size:clamp(56px,8vw,100px); }
        .ai-desc       { font-family:'Inter',sans-serif; font-size:18px; line-height:1.6; color:#536174; max-width:560px; margin-top:20px; }
        .ai-section-h2 { font-size:clamp(36px,5vw,64px); }
        .ai-how-h2     { font-size:clamp(36px,5vw,56px); }
        .ai-cta-h2     { font-size:clamp(48px,7vw,88px); }
        .ai-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .ai-how-grid   { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }

        @media (max-width:900px) {
          .ai-hero-inner { padding:96px 20px !important; }
          .ai-inner      { padding:0 20px !important; }
          .ai-desc       { font-size:16px !important; }
          .ai-cards-grid { grid-template-columns:1fr !important; }
          .ai-how-grid   { grid-template-columns:1fr !important; gap:48px !important; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>
    </div>
  )
}
