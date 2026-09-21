const gradStyle = {
  background: 'linear-gradient(90deg, #1769FF, #7B35FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline',
}

const EDGE = 'linear-gradient(90deg, #1769FF, #FF1838)'

const RIGHT_LINES = ['BETTER PLAYER', 'BETTER DECISIONS', 'BETTER RESULTS']

export default function ProTrainingBanner() {
  return (
    <section style={{
      width: '100%',
      minHeight: 260,
      background: '#07111F',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top/bottom edge lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: EDGE, zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: EDGE, zIndex: 3 }} />

      {/* Red radial glow — right */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,24,56,0.20) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Soldier image container with gradient fade overlays */}
      <div
        aria-hidden="true"
        className="banner-soldier"
        style={{
          position: 'absolute', left: 0, top: 0,
          height: '100%', width: 420,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Soldier image */}
        <img
          src="/pro-banner.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Right-edge fade: image → dark background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 60%, #07111F 100%)',
          zIndex: 1,
        }} />
        {/* Top-edge fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 40,
          background: 'linear-gradient(to bottom, #07111F 0%, transparent 100%)',
          zIndex: 1,
        }} />
        {/* Bottom-edge fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
          background: 'linear-gradient(to top, #07111F 0%, transparent 100%)',
          zIndex: 1,
        }} />
      </div>

      {/* hero-art.png watermark — top-right */}
      <img
        src="/hero-art.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', right: '-40px', top: '-20px',
          width: '260px', opacity: 0.07,
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}
      />

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        minHeight: 260,
        position: 'relative',
        zIndex: 2,
      }}>
        {/* LEFT spacer — matches soldier image width so center text stays centered */}
        <div style={{ width: 240, flexShrink: 0 }} className="banner-helm" />

        {/* CENTER */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 32px' }}>
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.32em', color: '#AAB8C8',
            textTransform: 'uppercase', marginBottom: 12,
          }}>
            DISCIPLINE BUILDS FREEDOM
          </p>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 52px)',
            color: '#FFFFFF', textTransform: 'uppercase', margin: 0,
            lineHeight: 1,
          }}>
            TRAIN LIKE A{' '}
            <span style={gradStyle}>PRO</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15,
            color: '#AAB8C8', marginTop: 12,
          }}>
            Structured. Data-Driven. Tournament Ready.
          </p>
        </div>

        {/* RIGHT: 3 stacked lines */}
        <div style={{
          width: 220,
          flexShrink: 0,
          alignSelf: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.20)',
          paddingLeft: 28,
          paddingRight: 16,
        }} className="banner-right">
          {RIGHT_LINES.map(line => (
            <p key={line} style={{
              display: 'block',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.18em',
              color: '#FFFFFF',
              lineHeight: 2.2,
              textTransform: 'uppercase',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .banner-helm    { display: none !important; }
          .banner-right   { display: none !important; }
          .banner-soldier { display: none !important; }
        }
      `}</style>
    </section>
  )
}
