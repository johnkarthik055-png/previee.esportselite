import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Target, BarChart2, Cpu, TrendingUp, Users, Star, Gamepad2, Dumbbell } from 'lucide-react'
import partnersHero from '../assets/partners-hero.jpg'

const WHAT_R4W_GETS = [
  { Icon: Target,    title: 'Structured Training',         desc: 'Data-driven training programs built around player performance.' },
  { Icon: BarChart2, title: 'Match Analytics',             desc: 'Detailed analysis to identify mistakes, patterns and opportunities.' },
  { Icon: Cpu,       title: 'AI-Powered Coaching',         desc: 'Personalized insights to help players improve faster.' },
  { Icon: TrendingUp,title: 'Performance Tracking',        desc: 'Track development over time instead of relying on guesswork.' },
  { Icon: Users,     title: 'Team Support',                desc: 'Tools designed for coordinated team improvement.' },
  { Icon: Star,      title: 'Priority Partnership Access', desc: 'Early access to selected features and dedicated support.' },
]

const FLOW_STEPS = [
  { Icon: Gamepad2,   label: 'PLAY',     sub: 'Compete.'         },
  { Icon: BarChart2,  label: 'ANALYZE',  sub: 'Find insights.'   },
  { Icon: Target,     label: 'IDENTIFY', sub: 'Pinpoint gaps.'   },
  { Icon: Dumbbell,   label: 'TRAIN',    sub: 'Put in the work.' },
  { Icon: TrendingUp, label: 'IMPROVE',  sub: 'See results.'     },
]

export default function Partners() {
  const pageRef = useRef(null)

  useEffect(() => { document.title = 'Partners | Esports Elite' }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    const els = pageRef.current?.querySelectorAll('.fade-in') || []
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={pageRef}
      style={{ background: '#050816', color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}
    >

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO  (left text / right logo lockup)
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Photo background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${partnersHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Gradient overlay — heavier on left so text pops */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(5,8,22,0.96) 0%, rgba(5,8,22,0.88) 55%, rgba(5,8,22,0.70) 100%)',
          }}
        />

        {/* Vertical text — left */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'rgba(248,250,252,0.09)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          CHAOS BUILDS CHAMPIONS
        </div>

        {/* Vertical text — right */}
        <div
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'rgba(248,250,252,0.09)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          FEAR NONE RESPECT FEW
        </div>

        {/* 2-col content wrapper */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 clamp(16px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* ── LEFT COL (full width) — eyebrow + headline + subtext + tagline ── */}
          <div style={{ flex: 1, textAlign: 'left', maxWidth: 680 }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 12,
                letterSpacing: '0.22em',
                color: '#3B82F6',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              PARTNERS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: 'easeOut' }}
              style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 'clamp(34px, 5.5vw, 72px)',
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#F8FAFC',
                marginBottom: 22,
              }}
            >
              BUILDING THE FUTURE
              <br />
              OF ESPORTS
              <br />
              <span style={{ color: '#EF4444' }}>TOGETHER.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                lineHeight: 1.72,
                color: '#94A3B8',
                maxWidth: 520,
                marginBottom: 24,
              }}
            >
              Esports Elite partners with competitive organizations to bring structured
              training, performance analytics, and AI-powered coaching to serious players
              and teams.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontStyle: 'italic',
                letterSpacing: '0.12em',
                color: 'rgba(248,250,252,0.28)',
                textTransform: 'uppercase',
              }}
            >
              SAME PASSION. A HIGHER STANDARD.
            </motion.p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — FEATURED PARTNER
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#050816', padding: '96px 32px 80px', textAlign: 'center' }}>
        <div className="fade-in" style={{ maxWidth: 900, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 12,
              letterSpacing: '0.22em',
              color: '#3B82F6',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 22,
            }}
          >
            FEATURED PARTNER
          </p>
          <h2
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 'clamp(30px, 5vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#F8FAFC',
              marginBottom: 20,
            }}
          >
            ESPORTS ELITE ×{' '}
            <span style={{ color: '#EF4444' }}>R4W ESPORTS</span>
          </h2>
          <p
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 'clamp(12px, 1.4vw, 14px)',
              letterSpacing: '0.18em',
              color: '#94A3B8',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 40,
            }}
          >
            OFFICIAL PERFORMANCE &amp; TRAINING PARTNERSHIP
          </p>
          <div
            style={{
              width: 56,
              height: 3,
              background: 'linear-gradient(90deg, #3B82F6, #EF4444)',
              borderRadius: 2,
              margin: '0 auto',
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — PARTNERSHIP DETAIL  (2-col)
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#050816', padding: '20px 32px 120px' }}>
        <div
          className="fade-in"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left — collab card using real hero image */}
          <div
            style={{
              position: 'relative',
              minHeight: 320,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #1E293B',
            }}
          >
            {/* Photo layer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${partnersHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Dark overlay so text is readable */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(rgba(5,8,22,0.50), rgba(5,8,22,0.50))',
              }}
            />
            {/* min-height spacer so the card stays tall */}
            <div style={{ minHeight: 320 }} />
          </div>

          {/* Right — copy */}
          <div>
            <h2
              style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 'clamp(26px, 3.8vw, 50px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#F8FAFC',
                marginBottom: 28,
              }}
            >
              A SHARED VISION FOR A
              <br />
              <span style={{ color: '#3B82F6' }}>STRONGER TOMORROW.</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 17,
                lineHeight: 1.76,
                color: '#94A3B8',
                marginBottom: 20,
              }}
            >
              Esports Elite is the official performance and training partner of R4W Esports,
              supporting the team with structured training, match analytics, performance
              tracking, and AI-powered coaching.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 17,
                lineHeight: 1.76,
                color: '#94A3B8',
                marginBottom: 44,
              }}
            >
              R4W Esports uses Esports Elite to turn competitive data into actionable
              improvements and help its players compete at the highest level.
            </p>

            {/* Quote block */}
            <div style={{ borderLeft: '3px solid #EF4444', paddingLeft: 24 }}>
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 68,
                  lineHeight: 0.8,
                  color: '#EF4444',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontFamily: 'Oxanium, sans-serif',
                  fontSize: 'clamp(15px, 2vw, 21px)',
                  fontWeight: 800,
                  color: '#F8FAFC',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                DISCIPLINE TODAY. DOMINANCE TOMORROW.
              </p>
              <p
                style={{
                  fontFamily: 'Oxanium, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                — R4W ESPORTS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — WHAT R4W GETS  (light bg, dark cards)
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F4F7FC', padding: '100px 32px' }}>
        <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p
              style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 12,
                letterSpacing: '0.22em',
                color: '#050816',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              WHAT R4W GETS
            </p>
            <h2
              style={{
                fontFamily: 'Oxanium, sans-serif',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#050816',
              }}
            >
              REAL TOOLS. REAL IMPACT.
            </h2>
          </div>

          {/* 3×2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: 24,
            }}
          >
            {WHAT_R4W_GETS.map(({ Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: '#0A0F1C',
                  border: '1px solid #1E293B',
                  borderRadius: 12,
                  padding: '32px 28px',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(59,130,246,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    background: 'rgba(59,130,246,0.10)',
                    border: '1px solid rgba(59,130,246,0.22)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Icon size={20} color="#3B82F6" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Oxanium, sans-serif',
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#F8FAFC',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: '#94A3B8',
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — PARTNERSHIP IMPACT  (icon flow, no circles)
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          padding: '120px 32px',
          overflow: 'hidden',
        }}
      >
        {/* Dark bg with subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 20% 60%, rgba(59,130,246,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(239,68,68,0.04) 0%, transparent 55%), #050816',
          }}
        />
        {/* Dot grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(248,250,252,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Vertical text — left */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'rgba(248,250,252,0.07)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          BETTER PLAYERS BRIGHTER ESPORTS
        </div>

        {/* Vertical text — right */}
        <div
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'rgba(248,250,252,0.07)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          DATA DRIVES DISCIPLINE
        </div>

        <div
          className="fade-in"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1100,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 12,
              letterSpacing: '0.22em',
              color: '#3B82F6',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            PARTNERSHIP IMPACT
          </p>
          <h2
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 'clamp(28px, 4.5vw, 58px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#F8FAFC',
              marginBottom: 72,
            }}
          >
            FROM MATCHES TO
            <br />
            <span style={{ color: '#3B82F6' }}>MEASURABLE IMPROVEMENT.</span>
          </h2>

          {/* Flow steps — icon + label + subtitle, no circles, blue arrows */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '32px 4px',
            }}
          >
            {FLOW_STEPS.map(({ Icon: StepIcon, label, sub }, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Step column: icon + name + sub */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                    minWidth: 96,
                  }}
                >
                  <StepIcon
                    size={28}
                    color={i === 4 ? '#3B82F6' : '#F8FAFC'}
                    strokeWidth={1.5}
                  />
                  <span
                    style={{
                      fontFamily: 'Oxanium, sans-serif',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#F8FAFC',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      color: '#94A3B8',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {sub}
                  </span>
                </div>

                {/* Blue arrow between steps */}
                {i < FLOW_STEPS.length - 1 && (
                  <span
                    style={{
                      fontSize: 22,
                      color: '#3B82F6',
                      margin: '0 12px',
                      paddingBottom: 24,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — BECOME A PARTNER CTA  (hero photo bg)
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Hero photo background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${partnersHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(5,8,22,0.75), rgba(5,8,22,0.75))',
          }}
        />

        {/* Watermark — left */}
        <div
          style={{
            position: 'absolute',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900,
            color: 'rgba(248,250,252,0.04)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            userSelect: 'none',
            textTransform: 'uppercase',
          }}
        >
          ESPORTS
          <br />
          ELITE
        </div>

        {/* Watermark — right */}
        <div
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Oxanium, sans-serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900,
            color: 'rgba(239,68,68,0.06)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            userSelect: 'none',
            textTransform: 'uppercase',
            textAlign: 'right',
          }}
        >
          R4W
        </div>

        <div
          className="fade-in"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: 780,
            padding: '60px 32px',
          }}
        >
          <p
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 12,
              letterSpacing: '0.22em',
              color: '#3B82F6',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            PARTNER WITH US
          </p>
          <h2
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 'clamp(28px, 5vw, 64px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#F8FAFC',
              marginBottom: 28,
            }}
          >
            BUILT FOR TEAMS THAT
            <br />
            <span style={{ color: '#3B82F6' }}>REFUSE</span>{' '}
            <span style={{ color: '#F8FAFC' }}>TO STAY AVERAGE.</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.72,
              color: '#94A3B8',
              maxWidth: 540,
              margin: '0 auto 44px',
            }}
          >
            Interested in partnering with Esports Elite? Let&apos;s create a stronger, more
            competitive esports ecosystem together.
          </p>

          <a
            href="mailto:johnkarthik055@gmail.com"
            style={{
              display: 'inline-block',
              background: '#3B82F6',
              color: '#ffffff',
              fontFamily: 'Oxanium, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '16px 44px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563EB'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3B82F6'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            BECOME A PARTNER →
          </a>
        </div>
      </section>

    </div>
  )
}
