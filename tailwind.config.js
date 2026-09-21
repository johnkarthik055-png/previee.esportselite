/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Barlow Condensed', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        label:   ['Rajdhani', 'sans-serif'],
        /* legacy */
        oxanium: ['Oxanium', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      colors: {
        blue: {
          primary:   '#1769FF',
          secondary: '#2D8CFF',
          electric:  '#00A8FF',
        },
        red: {
          primary:   '#FF1838',
          secondary: '#E60023',
        },
        dark: {
          navy:  '#07111F',
          black: '#0B0F16',
        },
        text: {
          primary:   '#111827',
          secondary: '#526071',
        },
        border: '#DCE3EC',
        light:  '#F7F9FC',
        /* legacy tokens kept for existing pages */
        bg:       '#050816',
        surface:  '#0A0F1C',
        card:     '#0D1526',
        electric: '#00D4FF',
        ivory:    '#F8FAFC',
        muted:    '#94A3B8',
        subtle:   '#64748B',
        success:  '#10B981',
        warning:  '#F59E0B',
      },
      fontSize: {
        'hero':    ['80px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'hero-sm': ['48px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'section': ['64px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'card':    ['22px', { lineHeight: '1.3' }],
        'body':    ['18px', { lineHeight: '1.7' }],
        'body-lg': ['19px', { lineHeight: '1.8' }],
        'btn':     ['16px', { lineHeight: '1' }],
        'nav':     ['16px', { lineHeight: '1' }],
        'stats':   ['64px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'label':   ['14px', { lineHeight: '1', letterSpacing: '0.14em' }],
        'footer':  ['15px', { lineHeight: '1.6' }],
      },
      borderRadius: {
        'xl2': '20px',
        'xl3': '24px',
      },
      boxShadow: {
        'blue-glow':  '0 0 30px rgba(23,105,255,0.25)',
        'blue-glow2': '0 0 40px rgba(23,105,255,0.35)',
        'card-hover': '0 20px 50px rgba(23,105,255,0.12)',
      },
    },
  },
  plugins: [],
}
