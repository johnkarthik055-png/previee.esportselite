import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, Shield, Star, Users, Zap, MapPin, ChevronRight, Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

/* ─── Constants ─── */
const faqs = [
  { q: 'Who is Esports Elite for?', a: "Any BGMI player who wants to improve seriously — from beginners learning the basics to experienced players breaking into competitive. If you're willing to put in the work, this platform is built for you." },
  { q: 'Which maps are covered?', a: 'Erangel, Miramar and Rondo are fully covered with zone breakdowns, rotation paths and strategy overlays. Additional maps will be added based on the active competitive meta.' },
  { q: 'Do I need to be a good player to join?', a: "No. Esports Elite is designed to take you from wherever you are right now to the next level. The 10-stage roadmap starts from the very basics and builds up to tournament-ready performance." },
  { q: 'Is there a free trial?', a: 'No free trial currently. Full access from day one for ₹149/month. Cancel anytime, no questions asked.' },
  { q: 'How is this different from watching YouTube guides?', a: 'YouTube gives you random tips. Esports Elite gives you a structured system — a roadmap, AI feedback on your actual matches, and tools to track real improvement over time.' },
]

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

const E = [0.23, 1, 0.32, 1]

export default function About() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', paddingTop: 64 }}>
        {/* BG elements */}
        <div style={{ position: 'absolute', left: -200, top: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.09) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -200, bottom: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 380, clipPath: 'polygon(0 0,100% 0,55% 100%,0 85%)', background: '#1769FF', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 260, height: 340, clipPath: 'polygon(45% 0,100% 0,100% 85%,0 100%)', background: '#FF1838', opacity: 0.05, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 'min(20vw,200px)', color: '#111827', opacity: 0.02, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>ABOUT</div>

        <div className="ab-hero-inner">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 2, background: '#1769FF', borderRadius: 1 }} />
            <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: '#1769FF', textTransform: 'uppercase' }}>OUR STORY</span>
          </motion.div>

          {/* H1 */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.1 }} className="ab-h1" style={{ color: '#111827' }}>WE BUILT</motion.div>
          <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.2 }} className="ab-h1" style={{ color: '#111827' }}>WHAT WE</motion.div>
          <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: E, delay: 0.3 }} className="ab-h1"><span style={G}>NEEDED.</span></motion.div>

          {/* Desc */}
          <motion.p initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.4 }} className="ab-desc">
            As BGMI players ourselves, we couldn't find a structured way to improve. So we built one.
          </motion.p>

          {/* Divider line */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: E, delay: 0.5 }} style={{ width: 80, height: 2, background: 'linear-gradient(to right,#1769FF,transparent)', marginTop: 24, marginBottom: 24, transformOrigin: 'left' }} />

          {/* Quick stats */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: E, delay: 0.6 }} style={{ display: 'flex', flexDirection: 'row', gap: 32, marginTop: 8 }}>
            {[{ num: '2024', label: 'FOUNDED' }, { num: 'India', label: 'BASED' }].map(s => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 36, ...G, lineHeight: 1 }}>{s.num}</span>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.15em', color: '#536174', marginTop: 4, textTransform: 'uppercase' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — MISSION
      ══════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="ab-inner ab-mission-row">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateX(-40px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
            style={{ flex: 1 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#1769FF', textTransform: 'uppercase', marginBottom: 16 }}>OUR MISSION</div>

            <div className="ab-mission-h2">
              <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '0.01em', color: '#111827' }}>DISCIPLINE</div>
              <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '0.01em', color: '#111827' }}>BUILDS</div>
              <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '0.01em', ...G }}>FREEDOM.</div>
            </div>

            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 24, maxWidth: 480 }} className="ab-mission-p">
              Most BGMI players grind for hours with no real improvement plan. They repeat the same mistakes, plateau at the same rank, and eventually quit.
            </p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 16, maxWidth: 480 }} className="ab-mission-p">
              Esports Elite exists to change that. We believe every player — regardless of current rank — deserves access to the same structured training system that professional teams use.
            </p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginTop: 16, maxWidth: 480 }} className="ab-mission-p">
              Our platform gives you a clear 10-stage roadmap, AI-powered coaching on your actual matches, and the tools to analyze and improve every single session.
            </p>

            <div style={{ marginTop: 32 }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton fill="#0B1220" hoverFill="#1769FF" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 8, background: '#0B1220', border: 'none', fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF', cursor: 'pointer' }}>
                  JOIN FOR ₹149/MONTH <ChevronRight size={16} strokeWidth={2.5} />
                </RadialRevealButton>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateX(40px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}
            className="ab-mission-right"
          >
            {[
              { accent: '#1769FF', bg: '#EEF5FF', border: 'rgba(23,105,255,0.15)', shadow: 'rgba(23,105,255,0.1)', Icon: Target, title: 'STRUCTURED', desc: 'A clear path from beginner to competitive — no guessing, no wasted time.' },
              { accent: '#7137FF', bg: '#F0EAFF', border: 'rgba(113,55,255,0.15)', shadow: 'rgba(113,55,255,0.1)', Icon: Zap,    title: 'DATA-DRIVEN', desc: 'AI analysis on every match you play. Real feedback, not generic advice.' },
              { accent: '#FF1838', bg: '#FFF0F2', border: 'rgba(255,24,56,0.15)',  shadow: 'rgba(255,24,56,0.1)',  Icon: Shield, title: 'PROVEN SYSTEM', desc: 'Built by BGMI players, for BGMI players. We know exactly what holds you back.' },
            ].map(card => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4, boxShadow: `0 12px 40px ${card.shadow}` }}
                style={{ background: '#FFFFFF', border: `1px solid ${card.border}`, borderRadius: 16, padding: 24, borderLeft: `4px solid ${card.accent}`, display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'box-shadow 0.25s' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: card.bg, border: `1px solid ${card.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <card.Icon size={20} color={card.accent} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 22, color: '#111827' }}>{card.title}</div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174', marginTop: 4, lineHeight: 1.5 }}>{card.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — VALUES
      ══════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '96px 0' }}>
        <div className="ab-inner">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>WHAT WE STAND FOR</div>
            <div className="ab-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em' }}>
              OUR <span style={G}>VALUES</span>
            </div>
          </motion.div>

          {/* 3 value cards */}
          <div className="ab-val-row">
            {[
              { n: '01', accent: '#1769FF', iconBg: '#EEF5FF', iconBdr: 'rgba(23,105,255,0.15)', Icon: Target, title: 'DISCIPLINE FIRST', desc: "We don't believe in shortcuts. Every feature is designed around building real, long-term skill through structured practice and honest self-assessment." },
              { n: '02', accent: '#7137FF', iconBg: '#F0EAFF', iconBdr: 'rgba(113,55,255,0.15)', Icon: Users,  title: 'BUILT FOR SQUADS', desc: 'BGMI is a team game. Our platform is designed for individual improvement and squad coordination — everything your team needs in one place.' },
              { n: '03', accent: '#FF1838', iconBg: '#FFF0F2', iconBdr: 'rgba(255,24,56,0.15)',  Icon: Star,   title: 'PLAYERS FIRST',   desc: 'Every decision we make starts with one question: does this make our players better? No ads, no bloat, no distractions. Just tools that work.' },
            ].map((card, i) => (
              <motion.div
                key={card.n}
                initial={{ opacity: 0, transform: 'translateY(30px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: E, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(7,17,31,0.08)' }}
                style={{ flex: 1, background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.25s' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: card.accent }} />
                <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 80, color: '#F0F4F8', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>{card.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: card.iconBg, border: `1px solid ${card.iconBdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <card.Icon size={24} color={card.accent} strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 26, color: '#111827', marginBottom: 12 }}>{card.title}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, lineHeight: 1.6, color: '#536174' }}>{card.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — FOUNDER
      ══════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 64px', textAlign: 'center' }} className="ab-founder-inner">
          <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase', marginBottom: 32 }}>THE TEAM</div>

            {/* CSS Avatar */}
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#1769FF,#FF1838)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 40px rgba(23,105,255,0.3)' }}>
              <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 36, color: '#FFFFFF' }}>KR</span>
            </div>

            <div className="ab-founder-name" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, color: '#111827', lineHeight: 1 }}>KARTHIK REDDY</div>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: '0.15em', color: '#536174', marginTop: 8, textTransform: 'uppercase' }}>Founder · BGMI Player · Builder</div>

            {/* Divider */}
            <div style={{ width: 60, height: 2, background: 'linear-gradient(to right,#1769FF,#FF1838)', margin: '24px auto' }} />

            {/* Quote */}
            <p className="ab-founder-quote" style={{ fontFamily: 'Inter,sans-serif', color: '#536174', lineHeight: 1.7, maxWidth: 560, margin: '0 auto', fontStyle: 'italic' }}>
              "I've been playing BGMI competitively for years. The biggest thing holding players back isn't talent — it's the lack of a proper improvement system. I built Esports Elite to fix that."
            </p>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 }}>
              <MapPin size={14} color="#536174" strokeWidth={1.8} />
              <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174' }}>Karnataka, India</span>
            </div>

            {/* Social pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              {['🎮 BGMI Player', '💻 Builder', '📍 Karnataka'].map(pill => (
                <motion.div
                  key={pill}
                  whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(7,17,31,0.08)' }}
                  style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 20, padding: '8px 16px', fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                >
                  {pill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — TIMELINE / STORY
      ══════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '96px 0' }}>
        <div className="ab-inner">
          {/* Heading */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#536174', textTransform: 'uppercase', marginBottom: 12 }}>HOW WE GOT HERE</div>
            <div className="ab-section-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.93, letterSpacing: '0.01em', ...G }}>THE JOURNEY</div>
          </motion.div>

          {/* Timeline */}
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            {/* Center line */}
            <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#1769FF,#7137FF,#FF1838)', pointerEvents: 'none' }} />

            {[
              { accent: '#1769FF', year: '2023',      title: 'THE PROBLEM', desc: "We were grinding BGMI daily but hitting the same rank ceiling. YouTube gave tips but no structure. Coaching was expensive and inconsistent." },
              { accent: '#4A8AFF', year: 'Early 2024', title: 'THE IDEA',    desc: 'Started building a personal practice tracker. Mapped out the 10-stage skill progression that actually made us improve. Realized other players needed this.' },
              { accent: '#7137FF', year: 'Mid 2024',   title: 'THE BUILD',   desc: 'Built the first version of Esports Elite — Map Knowledge, Match Logger, Strategy Maker and the AI Coach. Tested with a small group of BGMI players.' },
              { accent: '#FF1838', year: '2025',       title: 'THE LAUNCH',  desc: "Launched publicly at ₹149/month. India's first structured BGMI training platform. The journey continues — with you." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, transform: 'translateX(-30px)' }}
                whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: E, delay: i * 0.15 }}
                style={{ paddingLeft: 64, position: 'relative', marginBottom: i < 3 ? 40 : 0 }}
              >
                {/* Node dot */}
                <div style={{ position: 'absolute', left: 16, top: 6, width: 16, height: 16, borderRadius: '50%', background: item.accent, border: '2px solid #FFFFFF', boxShadow: `0 0 0 3px ${item.accent}4D` }} />
                <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', color: item.accent, textTransform: 'uppercase', marginBottom: 4 }}>{item.year}</div>
                <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 22, color: '#111827', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, lineHeight: 1.6, color: '#536174' }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — FAQ
      ══════════════════════════════════════════ */}
      <section style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '96px 0' }}>
        <div className="ab-inner-narrow">
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="ab-faq-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
            COMMON QUESTIONS
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: E, delay: i * 0.08 }}
                whileHover={{ borderColor: 'rgba(23,105,255,0.2)' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 15, color: '#111827', paddingRight: 16 }}>{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3, ease: E }} style={{ flexShrink: 0 }}>
                    <Plus size={20} color="#1769FF" strokeWidth={1.5} />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ overflow: 'hidden' }}>
                      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 15, lineHeight: 1.6, color: '#536174', padding: '0 24px 20px', margin: 0 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — FINAL CTA
      ══════════════════════════════════════════ */}
      <section style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E }}>
            <div className="ab-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              <span style={{ color: '#FFFFFF', display: 'block' }}>READY TO START</span>
              <span style={G}>YOUR JOURNEY?</span>
            </div>
            <p className="ab-cta-desc" style={{ fontFamily: 'Inter,sans-serif', color: '#AAB8C8', marginTop: 16, lineHeight: 1.65 }}>
              Join India's most serious BGMI training platform. ₹149/month. Cancel anytime.
            </p>
            <div style={{ marginTop: 40 }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton fill="#FFFFFF" hoverFill="#1769FF" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '18px 56px', borderRadius: 8, background: '#FFFFFF', border: 'none', fontFamily: 'Inter,sans-serif', fontWeight: 800, fontSize: 18, color: '#0B1220', cursor: 'pointer' }}>
                  JOIN NOW — ₹149/MONTH →
                </RadialRevealButton>
              </Link>
            </div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 16 }}>GST inclusive · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Layout ── */
        .ab-hero-inner  { max-width: 1280px; margin: 0 auto; padding: 128px 64px; position: relative; z-index: 1; width: 100%; }
        .ab-inner       { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
        .ab-inner-narrow{ max-width: 800px;  margin: 0 auto; padding: 0 64px; }
        .ab-founder-inner { padding: 0 64px; }

        /* ── Typography ── */
        .ab-h1           { font-family: 'Barlow Condensed',sans-serif; font-weight:900; font-size:80px; line-height:0.92; letter-spacing:-0.01em; display:block; }
        .ab-desc         { font-family: 'Inter',sans-serif; font-size:20px; line-height:1.6; color:#536174; max-width:580px; margin-top:20px; }
        .ab-section-h2   { font-size: 64px; }
        .ab-mission-h2 div { font-size: 56px; }
        .ab-faq-h2       { font-size: 48px; }
        .ab-cta-h2       { font-size: 88px; }
        .ab-cta-desc     { font-size: 18px; }
        .ab-founder-name { font-size: 40px; }
        .ab-founder-quote{ font-size: 18px; }
        .ab-mission-p    { font-size: 17px; }

        /* ── Mission row ── */
        .ab-mission-row  { display: flex; flex-direction: row; align-items: center; gap: 80px; }
        .ab-mission-right{ flex: 1; }

        /* ── Values row ── */
        .ab-val-row { display: flex; flex-direction: row; gap: 24px; align-items: stretch; }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .ab-hero-inner   { padding: 80px 20px !important; }
          .ab-inner        { padding: 0 20px !important; }
          .ab-inner-narrow { padding: 0 20px !important; }
          .ab-founder-inner{ padding: 0 20px !important; }
          .ab-h1           { font-size: 48px !important; }
          .ab-desc         { font-size: 16px !important; }
          .ab-section-h2   { font-size: 36px !important; }
          .ab-mission-h2 div { font-size: 40px !important; }
          .ab-faq-h2       { font-size: 32px !important; }
          .ab-cta-h2       { font-size: 48px !important; }
          .ab-cta-desc     { font-size: 16px !important; }
          .ab-founder-name { font-size: 28px !important; }
          .ab-founder-quote{ font-size: 16px !important; }
          .ab-mission-p    { font-size: 15px !important; }
          .ab-mission-row  { flex-direction: column !important; gap: 48px !important; }
          .ab-mission-right{ width: 100% !important; }
          .ab-val-row      { flex-direction: column !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  )
}
