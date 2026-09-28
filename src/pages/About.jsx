import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

const ease = [0.23, 1, 0.32, 1]

const faqs = [
  { q: 'WHO IS ESPORTS ELITE FOR?', a: 'Esports Elite is built for BGMI players who want a more structured approach to improvement — from players developing their fundamentals to competitive players preparing for scrims and tournaments.' },
  { q: 'WHICH MAPS ARE COVERED?', a: 'Map coverage depends on the training and analysis features currently available on the platform. We continue expanding coverage as the platform evolves.' },
  { q: 'DO I NEED TO BE A GOOD PLAYER TO JOIN?', a: 'No. Esports Elite is not built around your current rank. It is built around helping you improve from wherever you are.' },
  { q: 'IS THERE A FREE TRIAL?', a: 'We are currently in development. Join the waitlist to get early access when we launch.' },
  { q: 'HOW IS THIS DIFFERENT FROM WATCHING YOUTUBE GUIDES?', a: 'YouTube can teach you individual concepts. Esports Elite is designed to connect those concepts into a structured improvement process — training, tracking, analysis and progression in one place.' },
]

const timeline = [
  { year: '2023',       accent: '#1769FF', title: 'THE PROBLEM',       desc: 'We were grinding BGMI every day but kept running into the same problem: more hours did not always mean more improvement. YouTube had information. The game had practice modes. But there was no clear system connecting practice, performance and progression.' },
  { year: 'Early 2024', accent: '#4A8AFF', title: 'THE IDEA',           desc: 'The first version started as a personal practice tracker. We began mapping the skills that actually needed to be developed and turned them into a structured progression system. That became the foundation of the 10-stage roadmap.' },
  { year: 'Mid 2024',   accent: '#7137FF', title: 'THE BUILD',          desc: 'The idea grew into a complete platform. We built the first versions of the training system, Match Logger, Map Knowledge, Strategy Maker and AI-powered analysis — then started testing with BGMI players.' },
  { year: '2025',       accent: '#FF1838', title: 'THE BUILD CONTINUES', desc: 'We are still building. The platform is in development — being tested, refined and shaped around what BGMI players actually need before we open the doors.' },
]

const G = {
  background: 'linear-gradient(90deg,#1769FF,#7137FF,#FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const missionCards = [
  { n: '01', title: 'STRUCTURED',   desc: 'A clear progression system that gives your practice direction instead of leaving you wondering what to work on next.' },
  { n: '02', title: 'DATA-DRIVEN',  desc: 'Turn your match and practice data into useful feedback, identify patterns and understand where you need to improve.' },
  { n: '03', title: 'PLAYER-BUILT', desc: 'Designed around the real problems competitive BGMI players face — inconsistent practice, unclear weaknesses and the lack of a structured improvement path.' },
]

const values = [
  { n: '01', label: 'DISCIPLINE FIRST', title: 'THERE ARE NO SHORTCUTS TO BECOMING A BETTER PLAYER.', desc: 'We believe consistent, purposeful practice beats mindless grinding. Every feature we build is designed to help players practice with intent and improve over time.' },
  { n: '02', label: 'BUILT FOR SQUADS', title: 'BGMI IS MORE THAN AN INDIVIDUAL GAME.',              desc: 'Individual mechanics matter, but communication, coordination and decision-making matter just as much. Esports Elite is built to support both individual development and squad improvement.' },
  { n: '03', label: 'PLAYERS FIRST',    title: 'EVERY FEATURE STARTS WITH ONE QUESTION.',            desc: 'Does this actually help the player improve? No unnecessary complexity. No distractions. Just tools designed around the grind.' },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar activePage="about" />

      {/* ════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════ */}
      <section aria-label="Hero" style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #DCE4EF' }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,#DCE4EF 1.5px,transparent 1.5px)', backgroundSize: '32px 32px', opacity: 0.5, pointerEvents: 'none' }} />
        {/* Blue tint top-left */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 600, height: 400, background: 'radial-gradient(circle,rgba(23,105,255,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className="ab-hero-inner">
          {/* H1 lines — staggered */}
          <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.02em', color: '#111827' }} className="ab-h1">
            {[
              { text: 'WE BUILT',  gradient: false },
              { text: 'WHAT WE',   gradient: false },
              { text: 'NEEDED.',   gradient: true  },
            ].map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, transform: 'translateY(60px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.9, ease, delay: i * 0.12 }}
                style={{ display: 'block', ...(line.gradient ? G : {}) }}
              >
                {line.text}
              </motion.span>
            ))}
          </div>

          {/* Body copy */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            style={{ maxWidth: 520, marginTop: 40 }}
          >
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, lineHeight: 1.7, color: '#536174', margin: 0 }}>
              As BGMI players, we could not find a clear, structured way to improve. There were guides, stats and endless hours of gameplay — but no system that connected them.
            </p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, lineHeight: 1.7, color: '#111827', fontWeight: 600, marginTop: 16, marginBottom: 0 }}>
              So we built one.
            </p>
          </motion.div>

          {/* Metadata row */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            style={{ display: 'flex', flexDirection: 'row', gap: 64, marginTop: 64 }}
          >
            {[{ num: 'BGMI', label: 'FOCUSED' }, { num: 'INDIA', label: 'BASED' }].map(stat => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 32, height: 1, background: '#DCE4EF', marginBottom: 12 }} />
                <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 40, color: '#111827', lineHeight: 1 }}>{stat.num}</span>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', color: '#9BAABB', marginTop: 4, textTransform: 'uppercase' }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — MISSION
      ════════════════════════════════════════ */}
      <section aria-label="Our mission" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '128px 0' }}>
        <div className="ab-inner ab-mission-grid">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#1769FF', textTransform: 'uppercase', marginBottom: 24 }}>OUR MISSION</div>
            <div className="ab-mission-h2">
              <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, color: '#111827', display: 'block' }}>DISCIPLINE</span>
              <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, color: '#111827', display: 'block' }}>BUILDS</span>
              <span style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, display: 'block', ...G }}>FREEDOM.</span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, lineHeight: 1.75, color: '#536174', margin: 0 }}>Most players do not need another random tip.</p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, lineHeight: 1.75, color: '#536174', marginTop: 16, marginBottom: 0 }}>They need to know what to practice, why they are practicing it, and whether they are actually improving.</p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 17, lineHeight: 1.75, color: '#536174', marginTop: 16, marginBottom: 0 }}>Esports Elite exists to bring structure to that process. We combine guided training, match tracking, performance analysis and progression into one system — helping players turn hours of grinding into deliberate improvement.</p>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 48 }}>
              {missionCards.map((card, i) => (
                <motion.div
                  key={card.n}
                  initial={{ opacity: 0, transform: 'translateY(20px)' }}
                  whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                  className="ab-mission-card"
                  style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 12, padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}
                >
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 20, ...G, flexShrink: 0, width: 32 }}>{card.n}</div>
                  <div>
                    <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 20, color: '#111827', marginBottom: 6 }}>{card.title}</div>
                    <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.6, color: '#536174' }}>{card.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — VALUES
      ════════════════════════════════════════ */}
      <section aria-label="Our values" style={{ background: '#FFFFFF', padding: '128px 0' }}>
        <div className="ab-inner">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ marginBottom: 80 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 16 }}>WHAT WE STAND FOR</div>
            <div className="ab-values-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, color: '#111827' }}>
              OUR <span style={G}>VALUES</span>
            </div>
          </motion.div>

          {/* Editorial blocks */}
          <div>
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, transform: 'translateY(30px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.15 }}
                className="ab-val-block"
                style={{ borderTop: '1px solid #DCE4EF', paddingTop: 48, paddingBottom: 48, display: 'flex', gap: 64, alignItems: 'flex-start', ...(i === values.length - 1 ? { borderBottom: '1px solid #DCE4EF' } : {}) }}
              >
                {/* Left — number + label */}
                <div className="ab-val-left">
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 80, color: '#F0F4F8', lineHeight: 1, userSelect: 'none' }}>{v.n}</div>
                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, fontSize: 18, color: '#111827', marginTop: -8 }}>{v.label}</div>
                </div>
                {/* Right — title + desc */}
                <div style={{ flex: 1 }}>
                  <div className="ab-val-title" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, color: '#111827', marginBottom: 16 }}>{v.title}</div>
                  <div className="ab-val-desc" style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.75, color: '#536174', maxWidth: 640 }}>{v.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 — FOUNDER
      ════════════════════════════════════════ */}
      <section aria-label="The founder" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', borderBottom: '1px solid #DCE4EF', padding: '128px 0' }}>
        <div className="ab-inner ab-founder-grid">
          {/* LEFT — heading + image */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateX(-40px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#1769FF', textTransform: 'uppercase', marginBottom: 24 }}>THE BUILDER</div>

            <div className="ab-founder-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, color: '#111827', marginBottom: 40 }}>
              <span style={{ display: 'block' }}>THE PLAYER</span>
              <span style={{ display: 'block' }}>BEHIND</span>
              <span style={{ display: 'block', ...G }}>THE PLATFORM.</span>
            </div>

            {/* Clean image card — no spinning border */}
            <div style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', background: '#F7F9FC' }}>
              <img
                src="/sparkop.jpeg"
                alt="Karthik - SparkOp, Founder of Esports Elite"
                loading="eager"
                onError={(e) => { e.target.style.display = 'none' }}
                style={{
                  width: '100%',
                  height: '460px',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  borderRadius: '18px',
                }}
              />
            </div>

            {/* Name / tag / pills — below image */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, fontSize: 36, color: '#111827', lineHeight: 1 }}>KARTHIK</div>
              <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 700, fontSize: 18, marginTop: 4, background: 'linear-gradient(90deg,#1769FF,#FF1838)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SparkOp</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#536174', marginTop: 6 }}>Founder · Esports Elite</div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                {['🎮 BGMI Player', '🏆 Founder', '📍 Karnataka'].map(pill => (
                  <span key={pill} style={{ background: '#F7F9FC', border: '1px solid #DCE4EF', borderRadius: 20, padding: '6px 14px', fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#536174' }}>{pill}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — quote + metrics + CTA */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateX(40px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            {/* Quote */}
            <div style={{ borderLeft: '3px solid #1769FF', paddingLeft: 24, marginBottom: 40 }}>
              <p className="ab-quote" style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.75, color: '#536174', fontStyle: 'italic', margin: 0 }}>
                "I started Esports Elite because I experienced the problem firsthand. I could spend hours grinding BGMI and still struggle to understand what I was actually improving.
              </p>
              <p className="ab-quote" style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.75, color: '#536174', fontStyle: 'italic', marginTop: 16, marginBottom: 0 }}>
                There were plenty of guides, stats and practice tools — but no clear system connecting them.
              </p>
              <p className="ab-quote" style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.75, color: '#536174', fontStyle: 'italic', marginTop: 16, marginBottom: 0 }}>
                Esports Elite started as my attempt to build that system."
              </p>
            </div>

            {/* CTA */}
            <Link to="/pricing" style={{ textDecoration: 'none' }}>
              <RadialRevealButton
                label="JOIN THE PLATFORM →"
                padding="14px 32px"
                rounded={8}
                font={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5 — TIMELINE
      ════════════════════════════════════════ */}
      <section aria-label="Our journey" style={{ background: '#FFFFFF', padding: '128px 0' }}>
        <div className="ab-inner-narrow">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ marginBottom: 80 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 16 }}>HOW WE GOT HERE</div>
            <div className="ab-tl-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.92, ...G }}>THE JOURNEY</div>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Left gradient line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#1769FF,#7137FF,#FF1838)', pointerEvents: 'none' }} />

            {timeline.map((item, i) => (
              <div key={item.title} style={{ paddingLeft: 48, position: 'relative', marginBottom: i < timeline.length - 1 ? 64 : 0 }}>
                <motion.div
                  initial={{ opacity: 0, transform: 'translateX(-30px)' }}
                  whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: i * 0.15 }}
                >
                  {/* Timeline node */}
                  <div style={{ position: 'absolute', left: -5, top: 8, width: 12, height: 12, borderRadius: '50%', background: item.accent, border: '2px solid #FFFFFF', boxShadow: `0 0 0 3px ${item.accent}40` }} />

                  <div style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', color: item.accent, marginBottom: 8, textTransform: 'uppercase' }}>{item.year}</div>
                  <div className="ab-tl-title" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 800, color: '#111827', marginBottom: 12 }}>{item.title}</div>
                  <div className="ab-tl-desc" style={{ fontFamily: 'Inter,sans-serif', lineHeight: 1.7, color: '#536174', maxWidth: 600 }}>{item.desc}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 6 — FAQ
      ════════════════════════════════════════ */}
      <section aria-label="Frequently asked questions" style={{ background: '#F7F9FC', borderTop: '1px solid #DCE4EF', padding: '128px 0' }}>
        <div className="ab-inner-narrow">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.35em', color: '#536174', textTransform: 'uppercase', marginBottom: 16 }}>COMMON QUESTIONS</div>
            <div className="ab-faq-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88, color: '#111827' }}>
              <span style={{ display: 'block' }}>QUESTIONS,</span>
              <span style={{ display: 'block', ...G }}>ANSWERED.</span>
            </div>
          </motion.div>

          {/* Accordion */}
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              role="button"
              aria-expanded={openFaq === i}
              aria-label={faq.q}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ background: '#FFFFFF', border: '1px solid #DCE4EF', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', marginBottom: 8 }}
              className="ab-faq-item"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px' }}>
                <span className="ab-faq-q" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 700, color: '#111827', letterSpacing: '0.02em' }}>{faq.q}</span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  style={{ flexShrink: 0, marginLeft: 16 }}
                >
                  <Plus size={20} color="#1769FF" strokeWidth={1.5} />
                </motion.div>
              </div>

              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, lineHeight: 1.7, color: '#536174', padding: '0 28px 24px', margin: 0 }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 7 — CTA
      ════════════════════════════════════════ */}
      <section aria-label="Join Esports Elite" style={{ background: '#07111F', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(23,105,255,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,24,56,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(30px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="ab-cta-h2" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, lineHeight: 0.88 }}>
              <span style={{ color: '#FFFFFF', display: 'block' }}>READY TO START</span>
              <span style={{ display: 'block', ...G }}>YOUR JOURNEY?</span>
            </div>

            <p className="ab-cta-p" style={{ fontFamily: 'Inter,sans-serif', color: '#AAB8C8', marginTop: 24, lineHeight: 1.65, maxWidth: 520, margin: '24px auto 0' }}>
              Stop guessing what to practice. Start training with a system built around improvement.
            </p>

            <div style={{ marginTop: 40 }}>
              <span className="ab-price-num" style={{ fontFamily: 'Barlow Condensed,sans-serif', fontWeight: 900, ...G }}>₹149</span>
              <span style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: '0.2em', color: '#AAB8C8', marginLeft: 8, verticalAlign: 'middle' }}>/MONTH</span>
            </div>

            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#6B7B8D', marginTop: 8 }}>Launching soon · Join the waitlist</p>

            <div style={{ marginTop: 32 }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START TRAINING →"
                  padding="18px 56px"
                  rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 18 }}
                  colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </Link>
            </div>

            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.3em', color: '#4A5568', marginTop: 24, textTransform: 'uppercase' }}>
              WHERE GRIND BECOMES GREATNESS.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Layout containers ── */
        .ab-hero-inner   { max-width: 1280px; margin: 0 auto; padding: 160px 64px; position: relative; z-index: 1; }
        .ab-inner        { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
        .ab-inner-narrow { max-width: 900px;  margin: 0 auto; padding: 0 64px; }

        /* ── Hero H1 ── */
        .ab-h1 { font-size: clamp(64px, 10vw, 120px); }

        /* ── Mission grid ── */
        .ab-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 96px; align-items: start; }
        .ab-mission-h2   { font-size: 64px; }

        /* ── Mission cards hover — gated to pointer devices ── */
        @media (hover: hover) and (pointer: fine) {
          .ab-mission-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(7,17,31,0.06);
            transition: transform 200ms cubic-bezier(0.23,1,0.32,1), box-shadow 200ms cubic-bezier(0.23,1,0.32,1);
          }
        }

        /* ── Values ── */
        .ab-values-h2  { font-size: 72px; }
        .ab-val-left   { flex-shrink: 0; width: 160px; }
        .ab-val-title  { font-size: 28px; }
        .ab-val-desc   { font-size: 16px; }

        /* ── Founder grid ── */
        .ab-founder-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: center; }
        .ab-founder-h2   { font-size: 56px; }
        .ab-quote        { font-size: 17px; }

        /* ── Timeline ── */
        .ab-tl-h2    { font-size: 72px; }
        .ab-tl-title { font-size: 28px; }
        .ab-tl-desc  { font-size: 16px; }

        /* ── FAQ ── */
        .ab-faq-h2 { font-size: 64px; }
        .ab-faq-q  { font-size: 18px; }
        @media (hover: hover) and (pointer: fine) {
          .ab-faq-item:hover { border-color: rgba(23,105,255,0.2); transition: border-color 200ms ease; }
        }

        /* ── CTA ── */
        .ab-cta-h2    { font-size: 88px; }
        .ab-cta-p     { font-size: 18px; }
        .ab-price-num { font-size: 56px; }

        /* ── Spinning border (CSS animation — off main thread) ── */
        .ab-spin-border {
          position: absolute;
          left: 50%; top: 50%;
          width: 300%; height: 300%;
          transform: translate(-50%, -50%);
          background: conic-gradient(from 0deg, #1769FF, #7137FF, #FF1838, #1769FF);
          animation: ab-spin 6s linear infinite;
          will-change: transform;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes ab-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .ab-hero-inner   { padding: 100px 20px !important; }
          .ab-inner        { padding: 0 20px !important; }
          .ab-inner-narrow { padding: 0 20px !important; }

          .ab-h1           { font-size: clamp(48px, 14vw, 80px) !important; }
          .ab-mission-grid { grid-template-columns: 1fr !important; gap: 48px !important; padding: 80px 20px !important; }
          .ab-mission-h2   { font-size: 40px !important; }
          .ab-values-h2    { font-size: 44px !important; }
          .ab-val-block    { flex-direction: column !important; gap: 24px !important; }
          .ab-val-left     { width: auto !important; }
          .ab-val-title    { font-size: 22px !important; }
          .ab-val-desc     { font-size: 15px !important; }
          .ab-founder-grid { grid-template-columns: 1fr !important; gap: 48px !important; padding: 80px 20px !important; }
          .ab-founder-h2   { font-size: 36px !important; }
          .ab-quote        { font-size: 15px !important; }
          .ab-tl-h2        { font-size: 44px !important; }
          .ab-tl-title     { font-size: 22px !important; }
          .ab-tl-desc      { font-size: 15px !important; }
          .ab-faq-h2       { font-size: 40px !important; }
          .ab-faq-q        { font-size: 16px !important; }
          .ab-cta-h2       { font-size: 48px !important; }
          .ab-cta-p        { font-size: 16px !important; }
          .ab-price-num    { font-size: 40px !important; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .ab-spin-border { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
