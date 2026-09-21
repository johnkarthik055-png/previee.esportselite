import { useEffect } from 'react'
import { Crown, ArrowRight } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import StatsBar from '../components/StatsBar'
import TestimonialCarousel from '../components/TestimonialCarousel'
import VerticalLabel from '../components/VerticalLabel'

/* Photo placeholders — same pattern as the homepage hero. Drop the real file
 * in as src/assets/<name>.<ext> and it's picked up automatically. Until then
 * each falls back to a dark navy gradient. */
const aboutHeroModules    = import.meta.glob('../assets/about-hero.{jpg,jpeg,png,webp}',    { eager: true, import: 'default' })
const aboutMissionModules = import.meta.glob('../assets/about-mission.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const aboutVisionModules  = import.meta.glob('../assets/about-vision.{jpg,jpeg,png,webp}',  { eager: true, import: 'default' })
const founderAvatarModules = import.meta.glob('../assets/founder-avatar.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

const aboutHeroBg    = Object.values(aboutHeroModules)[0] || null
const aboutMissionBg = Object.values(aboutMissionModules)[0] || null
const aboutVisionBg  = Object.values(aboutVisionModules)[0] || null
const founderAvatar  = Object.values(founderAvatarModules)[0] || null

const GRADIENT_FALLBACK = 'linear-gradient(160deg, #050816 0%, #0A1428 45%, #050816 100%)'

function photoBg(img) {
  return img
    ? `linear-gradient(180deg, rgba(5,8,22,0.55) 0%, rgba(5,8,22,0.75) 55%, rgba(5,8,22,0.96) 100%), url(${img})`
    : GRADIENT_FALLBACK
}


const VALUES = [
  { title: 'Player First',       desc: 'Everything we build is designed around the needs of competitive players.' },
  { title: 'Real Progress',      desc: 'We focus on measurable improvement, not just activity.' },
  { title: 'Stronger Together',  desc: 'We grow through community, collaboration, and shared ambition.' },
  { title: 'Built Different',    desc: 'We challenge the average and aim higher — in performance, mindset, and opportunities.' },
]

export default function About() {
  useEffect(() => { document.title = 'About Us | Esports Elite' }, [])

  const [heroRef, heroVisible]       = useScrollAnimation({ threshold: 0.1 })
  const [storyRef, storyVisible]     = useScrollAnimation()
  const [missionRef, missionVisible] = useScrollAnimation()
  const [valuesRef, valuesVisible]   = useScrollAnimation()
  const [visionRef, visionVisible]   = useScrollAnimation()
  const [ctaRef, ctaVisible]         = useScrollAnimation()

  return (
    <>
      {/* ── 1. HERO (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(90px,11vw,150px) clamp(16px,5vw,48px) clamp(70px,8vw,90px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(aboutHeroBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={heroRef} className={`anim-section ${heroVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div className="section-label"><span>ABOUT ESPORTS ELITE</span></div>
          <h1 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(32px,6vw,60px)', color: '#F8FAFC', lineHeight: 1.05, textTransform: 'uppercase', marginBottom: '20px' }}>
            Built by players.<br /><span style={{ color: '#3B82F6' }}>For players.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.8vw,18px)', color: '#94A3B8', lineHeight: 1.75, maxWidth: '560px', marginBottom: '32px' }}>
            Esports Elite exists to give every competitive player the structure, tools, and support to improve with
            purpose. No more guessing. No more grinding in the dark. A better tomorrow for esports — built today.
          </p>
          <a href="#story" className="btn-primary">OUR STORY ↓</a>
        </div>
      </section>

      {/* ── 2. STATS BAR (dark) ── */}
      <StatsBar />

      {/* ── 3. THE STORY (light) ── */}
      <section id="story" style={{ background: '#F4F7FC', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div ref={storyRef} className={`anim-section ${storyVisible ? 'visible' : ''}`}
          style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 'clamp(40px,6vw,72px)', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ width: '40px', height: '2px', background: '#3B82F6', marginBottom: '16px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#2563EB', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '18px' }}>THE STORY</p>
            <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#0B1220', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '22px' }}>
              From frustrated player to platform builder.
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '16px' }}>
              I played BGMI seriously for over two years. I watched guides, practiced daily, played ranked matches — but
              my improvement was slow, inconsistent, and impossible to measure. I had no idea which skills were actually
              improving or which mistakes were costing me fights.
            </p>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '16px' }}>
              I looked for tools that could help. There was nothing built for BGMI players who wanted real structure —
              not just stat trackers, but a full training system. So I built it myself.
            </p>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '28px' }}>
              Esports Elite is the platform I wished existed when I was trying to get better. It's built to solve the
              real problems competitive players face — and to help the next generation go further, faster.
            </p>
            <a href="/roadmap" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: '15px', letterSpacing: '0.03em', textTransform: 'uppercase',
              color: '#0B1220', background: 'transparent', border: '1px solid #94A3B8', borderRadius: '12px',
              padding: '13px 26px', textDecoration: 'none',
            }}>
              OUR JOURNEY →
            </a>
          </div>

          {/* Founder card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: '#FFFFFF', border: '1px solid #DCE4F0', borderRadius: '18px',
              boxShadow: '0 12px 40px rgba(15,23,42,0.08)', padding: 'clamp(28px,4vw,36px)',
              width: 'min(100%, 340px)', textAlign: 'center',
            }}>
              <div style={{ position: 'relative', width: '92px', height: '92px', margin: '0 auto 18px' }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
                  background: founderAvatar ? `url(${founderAvatar}) center/cover` : 'linear-gradient(160deg,#1D4ED8,#0B1220)',
                  border: '2px solid rgba(37,99,235,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {!founderAvatar && (
                    <span style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: '32px', color: '#fff' }}>K</span>
                  )}
                </div>
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px', width: '30px', height: '30px', borderRadius: '50%',
                  background: '#3B82F6', border: '2px solid #fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}>
                  <Crown size={14} />
                </div>
              </div>
              <h3 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0B1220', marginBottom: '4px' }}>
                Karthik (SparkOp)
              </h3>
              <p style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Founder</p>
              <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>Karnataka, India</p>
              <div style={{ height: '1px', background: '#E2E8F0', margin: '0 0 20px' }} />
              <p style={{ fontFamily: 'Oxanium, sans-serif', fontStyle: 'italic', fontWeight: 600, fontSize: '14px', color: '#334155', letterSpacing: '0.02em', lineHeight: 1.5, marginBottom: '18px' }}>
                &ldquo;A higher standard for competitive gaming.&rdquo;
              </p>
              <p style={{ fontFamily: 'cursive', fontStyle: 'italic', fontSize: '24px', color: '#2563EB' }}>Karthik</p>
            </div>
          </div>

          <VerticalLabel dark={false}>Idea · Grind · Build · Repeat</VerticalLabel>
        </div>
      </section>

      {/* ── 4. OUR MISSION (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(aboutMissionBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={missionRef} className={`anim-section ${missionVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>
          <div className="section-label"><span>OUR MISSION</span></div>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', color: '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '20px' }}>
            A higher standard for competitive gaming.
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.8, marginBottom: '28px' }}>
            We believe competitive gaming is more than just talent — it's a system. Our mission is to make
            high-quality training, performance tracking, and structured improvement accessible to every serious
            player in India and beyond.
          </p>
          <a href="#story" className="btn-outline">OUR MISSION →</a>
        </div>
        <VerticalLabel>Better Players · A Stronger Tomorrow</VerticalLabel>
      </section>

      {/* ── 5. OUR CORE VALUES (light) ── */}
      <section style={{ background: '#F4F7FC', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div ref={valuesRef} className={`anim-section ${valuesVisible ? 'visible' : ''}`} style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <div>
              <div style={{ width: '40px', height: '2px', background: '#3B82F6', marginBottom: '16px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: '#2563EB', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px' }}>OUR CORE VALUES</p>
              <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,3.5vw,44px)', color: '#0B1220', lineHeight: 1.1, textTransform: 'uppercase' }}>
                What drives us forward.
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', textAlign: 'right', lineHeight: 1.6, maxWidth: '220px' }}>
              MORE THAN A PLATFORM.<br />A MOVEMENT.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))', gap: '16px' }}>
            {VALUES.map((v, i) => (
              <div key={v.title} style={{
                position: 'relative', background: '#FFFFFF', border: '1px solid #DCE4F0', borderRadius: '14px',
                padding: '26px', boxShadow: '0 4px 20px rgba(15,23,42,0.05)',
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#3B82F6', marginBottom: '18px' }} />
                <h3 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 700, fontSize: '16px', color: '#0B1220', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6 }}>{v.desc}</p>
                <span style={{ position: 'absolute', right: '16px', bottom: '14px', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#CBD5E1', letterSpacing: '0.1em' }}>
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUR VISION (dark, photo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: photoBg(aboutVisionBg), backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div ref={visionRef} className={`anim-section ${visionVisible ? 'visible' : ''}`} style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>
          <div className="section-label"><span>OUR VISION</span></div>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4vw,44px)', color: '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '20px' }}>
            Building the infrastructure for esports growth.
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: 1.8, marginBottom: '28px' }}>
            Our long-term vision goes beyond individual players. We're building tools for teams, coaches, and
            organizations — a full ecosystem where training is structured, performance is measured, and improvement
            is a system, not an accident.
          </p>
          <a href="/roadmap" className="btn-primary">SEE THE ROADMAP →</a>
        </div>
        <VerticalLabel>Same Game. Different Mindset.</VerticalLabel>
      </section>

      {/* ── 7. TESTIMONIALS (light) ── */}
      <section style={{ background: '#F4F7FC', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <TestimonialCarousel theme="light" />
        </div>
      </section>

      {/* ── 8. FINAL CTA (dark) ── */}
      <section style={{ background: 'rgba(10,15,28,0.8)', borderTop: '1px solid #1E293B', padding: 'clamp(80px,10vw,110px) clamp(16px,5vw,48px)', textAlign: 'center' }}>
        <div ref={ctaRef} className={`anim-section ${ctaVisible ? 'visible' : ''}`} style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', color: '#F8FAFC', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '18px' }}>
            Your next level awaits.
          </h2>
          <p style={{ fontSize: '17px', color: '#94A3B8', lineHeight: 1.75, marginBottom: '32px' }}>
            Join thousands of players who train with purpose, track their progress, and compete at the highest level.
          </p>
        </div>
      </section>
    </>
  )
}
