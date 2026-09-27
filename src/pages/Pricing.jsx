import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, BarChart2, Activity, Trophy, Check, Plus, Minus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

const GRAD = 'linear-gradient(90deg,#1769FF,#7047FF,#FF2448)'

const SOLO_FEATURES = [
  'Full Map Knowledge — all maps',
  'Strategy Maker — unlimited saves',
  'Match Logger with AI import',
  'AI Coach — personalized feedback',
  'Performance analytics',
  'All 10 roadmap stages',
]

const SQUAD_FEATURES = [
  'Everything in Solo plan',
  'Squad strategy sharing',
  'Team performance comparison',
  'Shared strategy library',
  'Squad match analysis',
  'Priority AI Coach responses',
]

const FAQ_DATA = [
  {
    q: "What’s included in the ₹149/month plan?",
    a: 'Everything — Map Knowledge for all maps, Strategy Maker with unlimited saves, Match Logger with AI screenshot import, AI Coach with personalized feedback, full analytics, and all 10 roadmap stages.',
  },
  {
    q: 'Is there a free trial?',
    a: 'No free trial currently. Full access from day one for ₹149/month. Cancel anytime.',
  },
  {
    q: 'How does squad payment work?',
    a: 'Each squad member pays their own ₹149/month subscription independently. Squad features activate when teammates are also subscribed.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from your account settings. No questions, no cancellation fees.',
  },
  {
    q: 'Is GST included?',
    a: 'Yes. ₹149/month is GST inclusive. No surprise charges.',
  },
]

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const ctaContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const ctaItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <>
      <Navbar activePage="pricing" />

      {/* ══ HERO ══ */}
      <section style={{ background: '#FFFFFF', minHeight: '760px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* CSS-only decorations */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 400, clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)', background: '#1769FF', opacity: 0.07, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 200, height: 300, clipPath: 'polygon(0 20%, 80% 0, 100% 100%, 0 100%)', background: '#1769FF', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 360, clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)', background: '#FF2448', opacity: 0.07, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 40, top: 120, width: 120, height: 120, backgroundImage: 'radial-gradient(circle, #1769FF 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', opacity: 0.25, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 112, left: 112, color: '#1769FF', fontSize: 22, fontWeight: 300, opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>+</div>
        <div style={{ position: 'absolute', top: '50%', right: '43%', color: '#1769FF', fontSize: 18, opacity: 0.4, pointerEvents: 'none', userSelect: 'none' }}>+</div>

        {/* Right artwork */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '52%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
          <img src="/pricing-hero.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 250, height: '100%', background: 'linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.9) 50%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, #FFFFFF 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
          {/* Right microcopy */}
          <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', textAlign: 'right', zIndex: 2 }}>
            {['MORE', 'SKILLS', 'A BRIGHTER', 'TOMORROW'].map(line => (
              <div key={line} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', color: '#FF2448', opacity: 0.5, lineHeight: 2 }}>{line}</div>
            ))}
            <div style={{ width: 24, height: 1, background: '#FF2448', marginTop: 8, marginLeft: 'auto' }} />
          </div>
        </div>

        {/* Left content */}
        <div style={{ position: 'relative', zIndex: 1, width: '46%', minWidth: '500px', paddingLeft: '64px', paddingRight: '32px', paddingTop: '120px', paddingBottom: '80px' }}>
          <motion.div variants={heroContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Eyebrow */}
            <motion.div variants={heroItem} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 2, background: '#1769FF', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.35em', color: '#1769FF' }}>PRICING</span>
            </motion.div>

            {/* H1 — capped at 68px to fit at 1366px */}
            <motion.h1 variants={heroItem} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '64px', lineHeight: 0.94, letterSpacing: '-0.02em', margin: 0, color: '#08111F' }}>
              ONE PLAN.
              <span style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'block' }}>EVERYTHING</span>
              IN IT.
            </motion.h1>

            {/* Description */}
            <motion.p variants={heroItem} style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.55, color: '#52647D', maxWidth: 520, marginTop: 22, marginBottom: 0 }}>
              Whether you grind solo or as a squad, Esports Elite gives you the tools, data, and guidance to improve, compete, and go further. No hidden fees. No limits on your grind.
            </motion.p>

            {/* Feature strip — nowrap, 16px icons, 11px labels */}
            <motion.div variants={heroItem} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: 28, flexWrap: 'nowrap', gap: 0 }}>
              {[
                { Icon: Zap,       color: '#1769FF', label: 'TRAIN',   sub: 'Build skills' },
                { Icon: BarChart2, color: '#4A8AFF', label: 'ANALYZE', sub: 'Track progress' },
                { Icon: Activity,  color: '#7047FF', label: 'IMPROVE', sub: 'See results' },
                { Icon: Trophy,    color: '#FF2448', label: 'COMPETE', sub: 'Reach higher' },
              ].map(({ Icon, color, label, sub }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: 1, height: 32, background: '#D9E3F0', flexShrink: 0 }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingLeft: i === 0 ? 0 : 16, paddingRight: i === 3 ? 0 : 16 }}>
                    <Icon size={16} color={color} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 11, color: '#08111F', lineHeight: 1.2, whiteSpace: 'nowrap' }}>{label}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#71829A', whiteSpace: 'nowrap' }}>{sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Buttons — nowrap, smaller, gap 24 */}
            <motion.div variants={heroItem} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', gap: 24, marginTop: 28 }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(23,105,255,0.4)', transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: GRAD, color: '#FFFFFF', padding: '14px 28px', borderRadius: 30, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', flexShrink: 0 }}
              >
                VIEW PLANS &rarr;
              </motion.button>
              <button
                onClick={() => document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'transparent', color: '#08111F', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, whiteSpace: 'nowrap' }}
              >
                SEE WHAT&apos;S INCLUDED
              </button>
            </motion.div>

            {/* Bottom microcopy */}
            <motion.div variants={heroItem} style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 1, background: '#A8B3C4', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.3em', color: '#71829A' }}>SAME GAME. DIFFERENT MINDSET.</span>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ══ PRICING CARDS ══ */}
      <section id="pricing-cards" style={{ background: '#F7F9FC', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.3em', color: '#6D7B90', marginBottom: 12 }}>CHOOSE YOUR PLAN</div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(36px,4vw,56px)', color: '#08111F', margin: 0 }}>
              ONE PRICE.{' '}
              <span style={{ background: 'linear-gradient(90deg,#1769FF,#FF2448)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>EVERYTHING INCLUDED.</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#526078', marginTop: 16, marginBottom: 0, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
              &#x20B9;149/month. No hidden fees. No tiers. Everything in one plan.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>

            {/* SOLO PLAYER */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              style={{ background: '#FFFFFF', borderRadius: 20, padding: 40, border: '1px solid #E8EEF5', boxShadow: '0 8px 40px rgba(7,17,31,0.08)', width: 460, flexShrink: 0, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', color: '#1769FF', marginBottom: 16 }}>SOLO PLAYER</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 64, color: '#08111F', lineHeight: 1 }}>&#x20B9;149</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 18, color: '#526078' }}>/month</span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#526078', marginTop: 0, marginBottom: 24 }}>
                Perfect for the individual grinder who wants to improve systematically.
              </p>
              <div style={{ height: 1, background: '#E8EEF5', marginBottom: 24 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                {SOLO_FEATURES.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Check size={16} color="#1769FF" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#374151' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <RadialRevealButton
                  label="GET STARTED &rarr;"
                  padding="14px 24px"
                  rounded={10}
                  font={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}
                  style={{ width: '100%', justifyContent: 'center' }}
                  colors={{ fill: '#0B0F16', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9BAABB', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>GST inclusive</p>
            </motion.div>

            {/* SQUAD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
              style={{ position: 'relative', paddingTop: 16, flexShrink: 0 }}
            >
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: GRAD, color: '#FFFFFF', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', padding: '6px 20px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 10 }}>
                MOST POPULAR
              </div>
              <div style={{ background: '#07111F', borderRadius: 20, padding: 40, border: '2px solid #1769FF', boxShadow: '0 20px 60px rgba(23,105,255,0.2)', width: 460, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.25em', color: '#1769FF', marginBottom: 16 }}>SQUAD</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 64, color: '#FFFFFF', lineHeight: 1 }}>&#x20B9;149</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#AAB8C8' }}>/member/month</span>
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#AAB8C8', marginTop: 0, marginBottom: 24 }}>
                  For squads who train together. Each member pays their own subscription.
                </p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {SQUAD_FEATURES.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <Check size={16} color="#1769FF" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#C8D8F0' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32 }}>
                  <RadialRevealButton
                    label="START YOUR SQUAD &rarr;"
                    padding="14px 24px"
                    rounded={10}
                    font={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}
                    style={{ width: '100%', justifyContent: 'center' }}
                    colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                    border={{ borderWidth: 0 }}
                  />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7B8D', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>Per member &middot; GST inclusive</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(32px,4vw,48px)', color: '#08111F', textAlign: 'center', marginBottom: 40 }}>COMMON QUESTIONS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ_DATA.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  background: '#FFFFFF',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: openIndex === i ? 'rgba(23,105,255,0.3)' : '#E8EEF5',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#08111F' }}>{faq.q}</span>
                  {openIndex === i
                    ? <Minus size={18} color="#1769FF" style={{ flexShrink: 0 }} />
                    : <Plus size={18} color="#1769FF" style={{ flexShrink: 0 }} />
                  }
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ padding: '0 24px 20px', fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6, color: '#526078', margin: 0 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: '#080D15', minHeight: 320, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(23,105,255,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,36,72,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
          <motion.div
            variants={ctaContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.h2 variants={ctaItem} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(40px,5vw,64px)', color: '#FFFFFF', margin: 0, lineHeight: 1 }}>
              READY TO{' '}
              <span style={{ background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>LEVEL UP?</span>
            </motion.h2>
            <motion.p variants={ctaItem} style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#AAB8C8', marginTop: 16, marginBottom: 0 }}>
              Join thousands of players already on the path to greatness.
            </motion.p>
            <motion.div variants={ctaItem} style={{ marginTop: 32 }}>
              <RadialRevealButton
                label="START FOR &#x20B9;149/MONTH &rarr;"
                padding="16px 44px"
                rounded={8}
                font={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15 }}
                colors={{ fill: '#FFFFFF', textColor: '#0B1220', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                border={{ borderWidth: 0 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
