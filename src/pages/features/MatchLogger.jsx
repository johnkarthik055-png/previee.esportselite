import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, Upload, BarChart2, GitCompare } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RadialRevealButton from '../../components/ui/RadialRevealButton'

const ease = [0.23, 1, 0.32, 1]

const accent = '#00C48C'
const lightBg = '#E8FFF6'
const borderColor = 'rgba(0,196,140,0.15)'

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

const INSIDE_CARDS = [
  {
    Icon: Upload,
    title: 'AUTO IMPORT',
    desc: 'Upload your post-match stats screenshot. The AI reads the numbers automatically — no typing, no manual logging, no mistakes.',
  },
  {
    Icon: BarChart2,
    title: 'PERFORMANCE GRAPHS',
    desc: 'Visualize your K/D, damage and placement over time. Spot upward trends, identify slumps and track consistency.',
  },
  {
    Icon: GitCompare,
    title: 'SESSION COMPARISON',
    desc: 'Compare your performance across sessions, days and weeks. See whether your recent practice is actually translating into results.',
  },
]

const HOW_BULLETS = [
  'Know exactly how your stats trend over time',
  'Identify which sessions you perform best in',
  'See whether practice changes are working',
  'Build a full history of your BGMI performance',
]

const ML_BARS = [
  { d: 'M', h: 55 }, { d: 'T', h: 42 }, { d: 'W', h: 70 }, { d: 'T', h: 48 },
  { d: 'F', h: 78 }, { d: 'S', h: 62 }, { d: 'S', h: 88 },
]
const ML_STATS = [{ v: '2.4', l: 'K/D RATIO' }, { v: '312', l: 'AVG DMG' }, { v: '#6', l: 'AVG PLACE' }]
const ML_SESSIONS = [
  { num: '#47', map: 'Erangel · Squad · 24 min ago', kills: '3', dmg: '287', place: '#8', recent: true },
  { num: '#46', map: 'Miramar · Duo · Yesterday', kills: '5', dmg: '410', place: '#3', recent: false },
]

function TrafficDots() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
    </div>
  )
}

function MatchLoggerVisual() {
  return (
    <div style={{ background: '#07111F', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,196,140,0.2)', boxShadow: '0 30px 80px rgba(0,196,140,0.1)' }}>
      {/* Top bar */}
      <div style={{ background: '#0D1526', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrafficDots />
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>MATCH LOGGER</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C48C', animation: 'radarPulse 2s infinite' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C' }}>SYNCED</span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ background: '#0D1526', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {ML_STATS.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{ borderRight: i < ML_STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', padding: '16px 20px', textAlign: 'center' }}
          >
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 32, color: '#fff' }}>{s.v}</div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, letterSpacing: '0.15em', color: '#536174', marginTop: 4 }}>{s.l}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#AAB8C8', letterSpacing: '0.12em' }}>K/D TREND — LAST 7 SESSIONS</span>
          <div style={{ background: 'rgba(0,196,140,0.1)', border: '1px solid rgba(0,196,140,0.2)', padding: '3px 8px', borderRadius: 20 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: '#00C48C' }}>↑ 12%</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 }}>
          {ML_BARS.map((b, i) => {
            const isLast = i === ML_BARS.length - 1
            return (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                <div style={{ background: '#0D1526', borderRadius: '6px 6px 0 0', height: '100%', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${b.h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      width: '100%', background: 'linear-gradient(to top,#00C48C,rgba(0,196,140,0.4))', borderRadius: '6px 6px 0 0',
                      boxShadow: isLast ? '0 0 12px rgba(0,196,140,0.3)' : 'none',
                    }}
                  />
                </div>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: '#536174', textAlign: 'center', marginTop: 4 }}>{b.d}</div>
              </div>
            )
          })}
        </div>

        {/* Session cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {ML_SESSIONS.map(s => (
            <div
              key={s.num}
              style={{
                background: '#0D1526', borderRadius: 10, padding: '10px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderLeft: `2px solid ${s.recent ? '#00C48C' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff' }}>Session {s.num}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#536174', marginTop: 2 }}>{s.map}</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[{ v: s.kills, l: 'KILLS' }, { v: s.dmg, l: 'DMG' }, { v: s.place, l: 'PLACE' }].map(stat => (
                  <div key={stat.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff' }}>{stat.v}</span>
                    <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 8, color: '#536174' }}>{stat.l}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: '#07111F', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#536174' }}>47 matches logged</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C', letterSpacing: '0.1em' }}
        >
          IMPORT SCREENSHOT →
        </motion.button>
      </div>
    </div>
  )
}

export default function MatchLogger() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="features" />

      {/* ── SECTION 1 — HERO ── */}
      <section
        aria-label="Match Logger hero"
        style={{ background: '#FFFFFF', minHeight: '65vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #DCE4EF' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: 600, height: 400, background: 'radial-gradient(circle,rgba(0,196,140,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 500, height: 400, background: 'radial-gradient(circle,rgba(255,24,56,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />

        <div className="ml-hero-inner">
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
            <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase' }}>MATCH LOGGER</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.01em', color: '#111827' }}
            className="ml-h1"
          >
            TRACK EVERY<br />MATCH.
          </motion.div>

          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="ml-desc"
          >
            Log your K/D, damage, survival time and placement automatically — just upload your stats screenshot. No manual entry. Full performance history with visual analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}
          >
            {['AI SCREENSHOT IMPORT', 'K/D TRACKING', 'SESSION HISTORY', 'TREND GRAPHS'].map(pill => (
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
      <section aria-label="What's inside Match Logger" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="ml-inner">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>WHAT'S INSIDE</div>
            <div className="ml-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, color: '#111827' }}>
              LOGGING MADE<br /><span style={G}>EFFORTLESS.</span>
            </div>
          </motion.div>

          <div className="ml-cards-grid">
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
      <section aria-label="How Match Logger helps" style={{ background: '#FFFFFF', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="ml-inner">
          <div className="ml-how-grid">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(-40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            >
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: accent, textTransform: 'uppercase', marginBottom: 16 }}>HOW IT HELPS</div>
              <div className="ml-how-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.9, color: '#111827' }}>
                STOP FORGETTING<br /><span style={G}>YOUR STATS.</span>
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 20, maxWidth: 480 }}>
                Without tracking, you have no idea if you're actually improving. Sessions blur together and you repeat the same mistakes.
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

            {/* RIGHT — Stats dashboard */}
            <motion.div
              initial={{ opacity: 0, transform: 'translateX(40px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              <MatchLoggerVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section aria-label="Start logging matches" style={{ background: '#07111F', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,196,140,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          >
            <div className="ml-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, color: '#FFFFFF' }}>
              READY TO TRACK<br /><span style={G}>YOUR PROGRESS?</span>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, color: '#AAB8C8', lineHeight: 1.65, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
              Stop guessing how you're doing. Start measuring every match, every session, every improvement.
            </p>
            <div style={{ marginTop: 40 }}>
              <a href="https://app.esportselite.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START LOGGING →"
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
        .ml-hero-inner { max-width:1280px; margin:0 auto; padding:128px 64px; position:relative; z-index:1; width:100%; }
        .ml-inner      { max-width:1280px; margin:0 auto; padding:0 64px; }
        .ml-h1         { font-size:clamp(56px,8vw,100px); }
        .ml-desc       { font-family:'Inter',sans-serif; font-size:18px; line-height:1.6; color:#536174; max-width:560px; margin-top:20px; }
        .ml-section-h2 { font-size:clamp(36px,5vw,64px); }
        .ml-how-h2     { font-size:clamp(36px,5vw,56px); }
        .ml-cta-h2     { font-size:clamp(48px,7vw,88px); }
        .ml-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .ml-how-grid   { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }

        @media (max-width:900px) {
          .ml-hero-inner { padding:96px 20px !important; }
          .ml-inner      { padding:0 20px !important; }
          .ml-desc       { font-size:16px !important; }
          .ml-cards-grid { grid-template-columns:1fr !important; }
          .ml-how-grid   { grid-template-columns:1fr !important; gap:48px !important; }
        }
        @media (prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>
    </div>
  )
}
