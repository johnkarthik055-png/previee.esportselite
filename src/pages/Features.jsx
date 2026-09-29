import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Map, Brain, BarChart2, PenTool,
  Check, ChevronRight, ArrowRight,
  Pencil, ArrowUpRight, Circle, Square, Trash2,
  Zap, Target, Shield, Users, Clock, TrendingUp, Eye, Layers,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RadialRevealButton from '../components/ui/RadialRevealButton'

const G = {
  background: 'linear-gradient(90deg, #1769FF, #7137FF, #FF1838)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const innerStyle = { maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }
const faqInnerStyle = { maxWidth: 800, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }

const FEATURE_KEYS = ['map', 'ai', 'logger', 'strategy']

const TABS = [
  {
    id: 0, icon: Map, label: 'Map Knowledge', accent: '#1769FF', detailPath: '/features/map-knowledge',
    eyebrow: 'FEATURE 01', title: 'MASTER EVERY\nDROP ZONE.',
    desc: 'Interactive layered maps for every BGMI and PUBG arena. Study rotations, mark hot zones, and memorize high-loot paths before you ever land.',
    bullets: [
      { icon: Eye,     text: 'Zone heat maps with real match data' },
      { icon: Target,  text: 'Custom pin sets for every squad role' },
      { icon: Layers,  text: 'Altitude-aware loot tier overlays' },
      { icon: Clock,   text: 'Ring shrink timelines built in' },
    ],
  },
  {
    id: 1, icon: Brain, label: 'AI Coach', accent: '#7137FF', detailPath: '/features/ai-coach',
    eyebrow: 'FEATURE 02', title: 'A COACH THAT\nNEVER SLEEPS.',
    desc: 'Upload your screenshots. Our AI parses damage dealt, survival time, and weapon accuracy — then delivers sharp, actionable feedback in seconds.',
    bullets: [
      { icon: Zap,        text: 'Screenshot analysis in under 5 seconds' },
      { icon: Brain,      text: 'Habit patterns detected over time' },
      { icon: TrendingUp, text: 'Drill prescriptions for your weak spots' },
      { icon: Shield,     text: 'Advice tuned to your rank bracket' },
    ],
  },
  {
    id: 2, icon: BarChart2, label: 'Stats Tracker', accent: '#00C48C', detailPath: '/features/match-logger',
    eyebrow: 'FEATURE 03', title: 'YOUR NUMBERS.\nYOUR EDGE.',
    desc: "Log matches manually or import them. Watch your K/D, damage, and survive-rate trend over every session — and know exactly where you're improving.",
    bullets: [
      { icon: BarChart2,  text: 'K/D, damage & win-rate dashboards' },
      { icon: TrendingUp, text: 'Weekly and monthly trend lines' },
      { icon: Target,     text: 'Per-weapon accuracy breakdown' },
      { icon: Clock,      text: 'Session length vs performance correlation' },
    ],
  },
  {
    id: 3, icon: PenTool, label: 'Strategy Maker', accent: '#FF1838', detailPath: '/features/strategy-maker',
    eyebrow: 'FEATURE 04', title: 'DRAW IT.\nDRILL IT. WIN.',
    desc: 'Build play blueprints on a live map canvas. Assign roles, sketch rotations, and share with your squad — all in one place before the lobby opens.',
    bullets: [
      { icon: PenTool, text: 'Freehand draw on any map layer' },
      { icon: Users,   text: '4-player role assignment per strategy' },
      { icon: Shield,  text: 'Save and version your playbooks' },
      { icon: Zap,     text: 'One-tap share to squad chat' },
    ],
  },
]

const COMPARE_ROWS = [
  { feature: 'Interactive BGMI / PUBG maps',       ee: true, yt: false, generic: false },
  { feature: 'AI screenshot analysis',             ee: true, yt: false, generic: false },
  { feature: 'Personal match stat tracking',       ee: true, yt: false, generic: true  },
  { feature: 'In-app strategy drawing canvas',     ee: true, yt: false, generic: false },
  { feature: 'Squad roster & role management',     ee: true, yt: false, generic: false },
  { feature: 'Structured training roadmap',        ee: true, yt: false, generic: false },
]

const FAQS = [
  {
    q: 'Does Esports Elite work for both BGMI and PUBG PC?',
    a: 'Yes. The map database, AI coach, and stat tracker are calibrated for both BGMI (mobile) and PUBG PC. When you log a match you select the platform — everything adjusts automatically.',
  },
  {
    q: 'How does the AI coach analyse my screenshots?',
    a: "You upload an end-of-match screenshot and our model reads your damage, kills, placement, and survival time. It cross-references your recent session history and flags the metrics that are dragging your rank down — then prescribes targeted drills.",
  },
  {
    q: 'Is my squad data shared with anyone?',
    a: "Never. All squad rosters, strategies, and match logs are private to your account. We don't sell data or surface individual stats to other users without explicit opt-in.",
  },
  {
    q: 'What does the free tier include?',
    a: 'Free gives you full access to Stages 1–3 of the roadmap: Map Knowledge, Match Logger, and Strategy Maker core features. AI Coach, Squad Tools, and advanced analytics unlock in the Pro plan.',
  },
]

/* ─── Shared bits for the premium visuals ─── */
function TrafficDots() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5F57' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFBD2E' }} />
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28CA41' }} />
    </div>
  )
}

function ThinkingDots({ color, size = 4 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          style={{ width: size, height: size, borderRadius: '50%', background: color }}
        />
      ))}
    </div>
  )
}

function ToolButton({ Icon }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: hover ? '#1769FF' : '#07111F',
        border: `1px solid ${hover ? '#1769FF' : 'rgba(255,255,255,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <Icon size={14} color={hover ? '#fff' : '#AAB8C8'} />
    </div>
  )
}

/* ─── Premium CSS-only visuals ─── */
const mapData = [
  {
    name: 'erangel',
    file: '/maps/erangel.jpg',
    label: 'ERANGEL',
    zones: [
      { name: 'POCHINKI',      top: '45%', left: '40%', color: '#FF1838' },
      { name: 'MILITARY BASE', top: '20%', left: '65%', color: '#1769FF' },
      { name: 'SCHOOL',        top: '35%', left: '22%', color: '#7137FF' },
      { name: 'GEORGOPOL',     top: '65%', left: '55%', color: '#00C48C' },
      { name: 'SOSNOVKA',      top: '70%', left: '30%', color: '#FF1838' },
    ],
  },
  {
    name: 'miramar',
    file: '/maps/miramar.jpg',
    label: 'MIRAMAR',
    zones: [
      { name: 'LOS LEONES',      top: '45%', left: '40%', color: '#FF1838' },
      { name: 'HACIENDA',        top: '20%', left: '65%', color: '#1769FF' },
      { name: 'EL POZO',         top: '35%', left: '22%', color: '#7137FF' },
      { name: 'WATER TREATMENT', top: '65%', left: '55%', color: '#00C48C' },
      { name: 'IMPALA',          top: '70%', left: '30%', color: '#FF1838' },
    ],
  },
  {
    name: 'rondo',
    file: '/maps/rondo.jpg',
    label: 'RONDO',
    zones: [
      { name: 'HOT ZONE', top: '45%', left: '40%', color: '#FF1838' },
      { name: 'CONTROL',  top: '20%', left: '65%', color: '#1769FF' },
      { name: 'ROTATE',   top: '35%', left: '22%', color: '#7137FF' },
      { name: 'SAFE',     top: '65%', left: '55%', color: '#00C48C' },
      { name: 'LOOT',     top: '70%', left: '30%', color: '#FF1838' },
    ],
  },
]

const MAP_LEGEND = [
  { color: '#FF1838', label: 'HOT ZONE' },
  { color: '#1769FF', label: 'CONTROL' },
  { color: '#00C48C', label: 'SAFE' },
]

function MapVisual() {
  const [activeMap, setActiveMap] = useState(0)
  const active = mapData[activeMap]

  return (
    <motion.div
      whileHover={{ boxShadow: '0 40px 100px rgba(23,105,255,0.2)' }}
      style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(7,17,31,0.4), 0 0 0 1px rgba(23,105,255,0.15)',
      }}
    >
      {/* Top header bar */}
      <div
        style={{
          background: 'rgba(7,17,31,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrafficDots />
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>TACTICAL OVERVIEW</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C48C', animation: 'radarPulse 2s infinite' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C', letterSpacing: '0.15em' }}>LIVE</span>
        </div>
      </div>

      {/* Map tabs */}
      <div
        style={{
          background: 'rgba(13,21,38,0.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 0,
        }}
      >
        {mapData.map((map, i) => (
          <motion.button
            key={map.name}
            onClick={() => setActiveMap(i)}
            style={{
              padding: '12px 20px', position: 'relative',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: '0.2em',
              color: activeMap === i ? '#FFFFFF' : '#536174',
              background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s',
            }}
          >
            {map.label}
            {activeMap === i && (
              <motion.div
                layoutId="mapTab"
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#1769FF,#7137FF)', borderRadius: 2 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Map image area */}
      <div style={{ position: 'relative', height: 360, overflow: 'hidden', background: '#07111F' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeMap}
            src={active.file}
            alt={`${active.label} tactical map`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', position: 'absolute', top: 0, left: 0 }}
          />
        </AnimatePresence>

        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 40%, rgba(7,17,31,0.7) 100%)' }} />

        {/* Dark gradient top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(7,17,31,0.6) 0%, transparent 100%)' }} />

        {/* Dark gradient bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(7,17,31,0.8) 0%, transparent 100%)' }} />

        {/* Scan lines */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(23,105,255,0.04) 0, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(23,105,255,0.04) 0, transparent 1px, transparent 60px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Zone markers */}
        <AnimatePresence>
          {active.zones.map((zone, index) => (
            <motion.div
              key={zone.name + activeMap}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: index * 0.08 }}
              style={{ position: 'absolute', top: zone.top, left: zone.left, transform: 'translate(-50%,-50%)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ position: 'relative', width: 36, height: 36 }}>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${zone.color}` }}
                  />
                  <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `1px solid ${zone.color}`, opacity: 0.6 }} />
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `${zone.color}33`, border: `2px solid ${zone.color}`, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: zone.color, boxShadow: `0 0 8px ${zone.color}` }} />
                  </div>
                </div>
                <div style={{ background: 'rgba(7,17,31,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: `1px solid ${zone.color}4D`, padding: '3px 8px', borderRadius: 4 }}>
                  <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 9, color: zone.color, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>{zone.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Coordinate corners */}
        <span style={{ position: 'absolute', top: 8, left: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>A1</span>
        <span style={{ position: 'absolute', top: 8, right: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>H1</span>
        <span style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>A8</span>
        <span style={{ position: 'absolute', bottom: 8, right: 10, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>H8</span>

        {/* Map name badge */}
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(7,17,31,0.8)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 14px' }}>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '0.05em' }}>{active.label}</span>
        </div>

        {/* Crosshair center */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0.15 }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 40, height: 1, background: '#fff', transform: 'translate(-50%,-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 1, height: 40, background: '#fff', transform: 'translate(-50%,-50%)' }} />
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        style={{
          background: 'rgba(7,17,31,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          {MAP_LEGEND.map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.1em', color: '#AAB8C8' }}>{l.label}</span>
            </div>
          ))}
        </div>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#536174', letterSpacing: '0.1em' }}>{active.zones.length} ZONES MAPPED</span>
      </div>
    </motion.div>
  )
}

function AICoachVisual() {
  return (
    <div style={{ background: '#07111F', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(113,55,255,0.2)', boxShadow: '0 20px 60px rgba(113,55,255,0.15)' }}>
      {/* Top bar */}
      <div style={{ background: '#0D1526', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <TrafficDots />
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>AI COACH · ANALYZING</span>
        <ThinkingDots color="#7137FF" />
      </div>

      {/* Chat area */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 280 }}>
        <p style={{ textAlign: 'center', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '0.15em', color: '#536174', margin: '0 0 4px' }}>Match #247 uploaded</p>

        <div style={{ alignSelf: 'flex-end', maxWidth: '75%', background: '#1A2840', borderRadius: '12px 12px 0 12px', padding: '12px 16px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#AAB8C8', margin: 0 }}>K/D: 1.8 | Damage: 312 | Placement: #4</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#536174', margin: 0, marginTop: 4, textAlign: 'right' }}>10:32 AM</p>
        </div>

        <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: '#7137FF', borderRadius: '0 12px 12px 12px', padding: '12px 16px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#fff', lineHeight: 1.5, margin: 0 }}>Your damage output is strong but Placement #4 suggests rotation timing issues.</p>
        </div>

        <div style={{ alignSelf: 'flex-start', maxWidth: '85%', marginTop: -4, background: '#7137FF', borderRadius: '0 12px 12px 12px', padding: '12px 16px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#fff', margin: 0 }}>Focus area: Zone rotation — you are entering circles 15-20 seconds late on average.</p>
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 10, padding: 12, marginTop: 4 }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#7137FF', letterSpacing: '0.15em', margin: '0 0 6px' }}>THIS WEEK'S FOCUS</p>
          <div style={{ background: '#1A2840', borderRadius: 4, height: 6, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '68%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{ height: '100%', background: '#7137FF', borderRadius: 4 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAB8C8' }}>Rotation Timing</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#7137FF' }}>IMPROVING</span>
          </div>
        </div>

        <div style={{ alignSelf: 'flex-start', background: '#0D1526', borderRadius: '0 10px 10px 10px', padding: '10px 14px' }}>
          <ThinkingDots color="#7137FF" size={6} />
        </div>
      </div>

      {/* Input bar */}
      <div style={{ background: '#0D1526', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, background: '#1A2840', borderRadius: 8, padding: '8px 12px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#536174' }}>Upload match screenshot...</span>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7137FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowRight size={14} color="#fff" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

function MatchLoggerVisual() {
  const bars = [
    { d: 'M', h: '55%' }, { d: 'T', h: '40%' }, { d: 'W', h: '70%' }, { d: 'T', h: '45%' },
    { d: 'F', h: '80%' }, { d: 'S', h: '60%' }, { d: 'S', h: '90%' },
  ]
  const stats = [{ v: '2.4', l: 'K/D RATIO' }, { v: '312', l: 'AVG DAMAGE' }, { v: '#6', l: 'AVG PLACE' }]
  const lastMatch = [{ v: '3', l: 'KILLS' }, { v: '287', l: 'DMG' }, { v: '#8', l: 'PLACE' }]

  return (
    <div style={{ background: '#07111F', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,196,140,0.2)', boxShadow: '0 20px 60px rgba(0,196,140,0.1)' }}>
      {/* Top bar */}
      <div style={{ background: '#0D1526', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <TrafficDots />
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>MATCH LOGGER · SEASON STATS</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C48C' }} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C' }}>SYNCED</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ background: '#0D1526', padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {stats.map((s, i) => (
          <div key={s.l} style={{ textAlign: 'center', padding: '0 12px', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 28, color: '#fff' }}>{s.v}</div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, letterSpacing: '0.15em', color: '#536174', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#AAB8C8', letterSpacing: '0.15em' }}>K/D TREND — LAST 7 DAYS</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11, color: '#00C48C' }}>↑ 12%</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 100 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', background: '#0D1526', borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: b.h }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}
                  style={{ width: '100%', background: 'linear-gradient(to top, #00C48C, rgba(0,196,140,0.3))', borderRadius: '4px 4px 0 0' }}
                />
              </div>
              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 8, color: '#536174', marginTop: 4 }}>{b.d}</span>
            </div>
          ))}
        </div>

        {/* Last match card */}
        <div style={{ background: '#0D1526', borderRadius: 10, padding: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 9, color: '#536174', letterSpacing: '0.15em' }}>LAST MATCH</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAB8C8', marginTop: 2 }}>Erangel · Squad · 23 mins ago</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {lastMatch.map(s => (
              <div key={s.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff' }}>{s.v}</span>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 8, color: '#536174' }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ background: '#07111F', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#536174' }}>47 matches logged</span>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C', letterSpacing: '0.1em', cursor: 'pointer' }}>IMPORT SCREENSHOT →</span>
      </div>
    </div>
  )
}

function StrategyVisual() {
  const players = [
    { id: 'P1', top: '65%', left: '42%', color: '#1769FF', label: 'ENTRY',   anim: { x: [0, 3, 0], y: [0, -3, 0] }, dur: 3 },
    { id: 'P2', top: '50%', left: '28%', color: '#7137FF', label: 'SUPPORT', anim: { x: [0, -3, 0] },               dur: 3.5 },
    { id: 'P3', top: '75%', left: '58%', color: '#FF1838', label: 'FLANK',   anim: { x: [0, 4, 0], y: [0, 2, 0] },  dur: 2.8 },
    { id: 'P4', top: '40%', left: '52%', color: '#00C48C', label: 'COVER',   anim: { y: [0, -4, 0] },               dur: 4 },
  ]
  const lines = [
    { x1: '42%', y1: '65%', x2: '28%', y2: '50%' },
    { x1: '28%', y1: '50%', x2: '52%', y2: '40%' },
    { x1: '52%', y1: '40%', x2: '58%', y2: '75%' },
  ]
  const tools = [Pencil, ArrowUpRight, Circle, Square, Trash2]

  return (
    <div style={{ background: '#07111F', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,24,56,0.2)', boxShadow: '0 20px 60px rgba(255,24,56,0.1)' }}>
      {/* Top bar */}
      <div style={{ background: '#0D1526', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <TrafficDots />
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', color: '#AAB8C8' }}>STRATEGY MAKER · ALPHA PUSH</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Check size={12} color="#00C48C" strokeWidth={3} />
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#00C48C' }}>SAVED</span>
        </div>
      </div>

      {/* Strategy name row */}
      <div style={{ background: '#0D1526', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff' }}>ERANGEL — POCHINKI PUSH</span>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#536174' }}>Squad · 4 Players</span>
      </div>

      {/* Map board */}
      <div style={{ position: 'relative', height: 280, background: '#0A1628', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', width: '100%', height: '100%',
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,24,56,0.04) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,24,56,0.04) 0px, transparent 1px, transparent 40px)',
            backgroundSize: '40px 40px',
          }}
        />

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          {lines.map((ln, i) => (
            <motion.line
              key={i}
              x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
              stroke="#1769FF" strokeWidth="1" strokeDasharray="5,5" opacity="0.5"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </svg>

        {players.map(p => (
          <motion.div
            key={p.id}
            animate={p.anim}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: p.top, left: p.left, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: p.color, border: '2px solid white', boxShadow: `0 0 12px ${p.color}99`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 10, color: '#fff', lineHeight: '24px' }}>{p.id}</span>
            </div>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 8, color: p.color, marginTop: 2 }}>{p.label}</span>
          </motion.div>
        ))}

        <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,24,56,0.15)', border: '1px solid rgba(255,24,56,0.3)', borderRadius: 8, padding: '6px 10px' }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 9, color: '#FF1838', letterSpacing: '0.15em' }}>HOT DROP</span>
        </div>
      </div>

      {/* Tools row */}
      <div style={{ background: '#0D1526', padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 12 }}>
        {tools.map((ToolIcon, i) => (
          <ToolButton key={i} Icon={ToolIcon} />
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 10, color: '#536174' }}>3 strategies saved</span>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 10, color: '#FF1838', letterSpacing: '0.1em', cursor: 'pointer' }}>SHARE WITH SQUAD →</span>
      </div>
    </div>
  )
}

const MOCKUPS = [MapVisual, AICoachVisual, MatchLoggerVisual, StrategyVisual]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid #DCE4EF' }}>
      <button onClick={onToggle} aria-expanded={open} aria-label={q} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 20, color: '#111827', textAlign: 'left', letterSpacing: '0.02em' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'inline-block', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 300, fontSize: 28, color: '#1769FF', lineHeight: 1, flexShrink: 0 }}
        >+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#536174', lineHeight: 1.7, padding: '0 0 22px', margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [openFaq, setOpenFaq]     = useState(null)

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section aria-label="Hero" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: '#fff', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-10%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #DCE4EF 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', opacity: 0.5, pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '15%', right: '8%', width: 3, height: 120, background: 'linear-gradient(to bottom, #1769FF, transparent)', borderRadius: 2, opacity: 0.18, transform: 'rotate(22deg)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: '55%', left: '5%', width: 2, height: 100, background: 'linear-gradient(to bottom, #FF1838, transparent)', borderRadius: 2, opacity: 0.12, transform: 'rotate(30deg)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,64px)', position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 40, height: 2, background: '#1769FF', borderRadius: 1 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.16em', color: '#1769FF', textTransform: 'uppercase' }}>PLATFORM FEATURES</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, transform: 'translateY(30px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(52px, 8vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.01em', color: '#111827', marginBottom: 28, maxWidth: 780 }}>
            BUILT FOR<br /><span style={G}>PLAYERS WHO</span><br />TRAIN TO WIN.
          </motion.h1>

          <motion.p initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }} style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#536174', lineHeight: 1.65, maxWidth: 560, marginBottom: 48 }}>
            Four tools — maps, AI coaching, stat tracking, and strategy building — designed around how the top 1% of BGMI and PUBG players actually improve.
          </motion.p>

          {/* Pills — tab filter */}
          <motion.div initial={{ opacity: 0, transform: 'translateY(20px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {TABS.map((t) => {
              const Icon = t.icon
              const active = activeFeature === t.id
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFeature(t.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 50,
                    background: active ? '#1769FF' : '#F7F9FC',
                    border: `1.5px solid ${active ? '#1769FF' : '#DCE4EF'}`,
                    cursor: 'pointer', transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                    color: active ? '#fff' : '#536174',
                  }}
                >
                  <Icon size={15} strokeWidth={2} />{t.label}<ChevronRight size={13} strokeWidth={2.5} />
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Feature sections (pill-filtered, one shown at a time) ── */}
      <AnimatePresence mode="wait">
        {TABS.filter(tab => tab.id === activeFeature).map((tab) => {
          const idx = tab.id
          const MockupComp = MOCKUPS[idx]
          const visualLeft = idx % 2 === 0
          const bg = idx % 2 === 0 ? '#F7F9FC' : '#FFFFFF'
          return (
            <motion.div
              key={FEATURE_KEYS[idx]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <section
                aria-label={tab.label}
                style={{ background: bg, padding: '96px 0', borderBottom: '1px solid #DCE4EF' }}
              >
                <div style={innerStyle}>
                  <motion.div
                    initial={{ opacity: 0, transform: 'translateY(24px)' }}
                    whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
                    className="feat-grid"
                  >
                    {/* Visual */}
                    <div style={{ order: visualLeft ? 0 : 1 }} className="feat-vis">
                      <MockupComp />
                    </div>

                    {/* Text */}
                    <div style={{ order: visualLeft ? 1 : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 2, background: tab.accent, borderRadius: 1 }} />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: tab.accent, textTransform: 'uppercase' }}>{tab.eyebrow}</span>
                      </div>
                      <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(38px, 4vw, 58px)', lineHeight: 0.95, letterSpacing: '0.01em', color: '#111827', whiteSpace: 'pre-line', marginBottom: 20 }}>{tab.title}</h2>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', lineHeight: 1.7, marginBottom: 32 }}>{tab.desc}</p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                        {tab.bullets.map((b, i) => {
                          const BIcon = b.icon
                          return (
                            <motion.div key={i} initial={{ opacity: 0, transform: 'translateX(-16px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)' }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.1 + i * 0.07 }} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${tab.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <BIcon size={15} color={tab.accent} strokeWidth={2} />
                              </div>
                              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#111827', fontWeight: 500 }}>{b.text}</span>
                            </motion.div>
                          )
                        })}
                      </div>

                      <Link to={tab.detailPath} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} style={{ textDecoration: 'none' }}>
                        <RadialRevealButton
                          label="EXPLORE FEATURE →"
                          padding="13px 28px"
                          rounded={8}
                          font={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em' }}
                          colors={{ fill: '#F7F9FC', textColor: '#111827', hoverFill: '#0B1220', hoverTextColor: '#FFFFFF' }}
                          border={{ borderWidth: 1, borderColor: '#DCE4EF' }}
                        />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* ── Comparison Table ── */}
      <section aria-label="Feature comparison" style={{ background: '#fff', padding: '100px 0' }}>
        <div style={innerStyle}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ marginBottom: 60, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, background: '#1769FF', borderRadius: 1 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: '#1769FF', textTransform: 'uppercase' }}>WHY US</span>
              <div style={{ width: 32, height: 2, background: '#1769FF', borderRadius: 1 }} />
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.93, color: '#111827', letterSpacing: '0.01em', marginBottom: 16 }}>
              VS THE <span style={G}>ALTERNATIVES</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: '#536174', maxWidth: 500, margin: '0 auto' }}>Every tool here you could hunt across four different apps, four subscriptions. Or do it in one place.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.15 }} style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#9BAABB', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '2px solid #DCE4EF' }}>Feature</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '0.06em', color: '#1769FF', borderBottom: '2px solid #1769FF', background: 'rgba(23,105,255,0.04)', textAlign: 'center' }}>ESPORTS ELITE</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#536174', borderBottom: '2px solid #DCE4EF', textAlign: 'center' }}>YouTube Guides</th>
                  <th style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#536174', borderBottom: '2px solid #DCE4EF', textAlign: 'center' }}>Generic Apps</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F7F9FC' }}>
                    <td style={{ padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#111827', borderBottom: '1px solid #DCE4EF' }}>{row.feature}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid rgba(23,105,255,0.1)', background: 'rgba(23,105,255,0.03)' }}>{row.ee && <Check size={20} color="#1769FF" strokeWidth={2.5} />}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid #DCE4EF' }}>{row.yt ? <Check size={20} color="#00C48C" strokeWidth={2.5} /> : <span style={{ fontSize: 18, color: '#DCE4EF' }}>—</span>}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid #DCE4EF' }}>{row.generic ? <Check size={20} color="#00C48C" strokeWidth={2.5} /> : <span style={{ fontSize: 18, color: '#DCE4EF' }}>—</span>}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: '24px 20px' }} />
                  <td style={{ padding: '24px 20px', textAlign: 'center', background: 'rgba(23,105,255,0.03)' }}>
                    <Link to="/pricing" style={{ textDecoration: 'none' }}>
                      <RadialRevealButton
                        label="GET ESPORTS ELITE →"
                        padding="10px 22px"
                        rounded={8}
                        font={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em' }}
                        colors={{ fill: '#0B1220', textColor: '#FFFFFF', hoverFill: '#1769FF', hoverTextColor: '#FFFFFF' }}
                        border={{ borderWidth: 0 }}
                      />
                    </Link>
                  </td>
                  <td /><td />
                </tr>
              </tbody>
            </table>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: 11, color: '#9BAABB', textAlign: 'center', marginTop: 8, letterSpacing: '0.1em' }}>← Scroll to see more</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-label="Frequently asked questions" style={{ background: '#F7F9FC', padding: '100px 0' }}>
        <div style={faqInnerStyle}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(30px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 2, background: '#1769FF', borderRadius: 1 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: '#1769FF', textTransform: 'uppercase' }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.93, color: '#111827', letterSpacing: '0.01em' }}>
              QUESTIONS,<br /><span style={G}>ANSWERED.</span>
            </h2>
          </motion.div>

          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, transform: 'translateY(20px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}>
              <FaqItem q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-label="Join Esports Elite" style={{ background: '#07111F', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,105,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,24,56,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ ...innerStyle, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, transform: 'translateY(40px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>GET STARTED</span>
              <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: 24 }}>
              <span style={G}>READY TO</span><br /><span style={{ color: '#ffffff' }}>DOMINATE?</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto 48px' }}>
              Join thousands of BGMI and PUBG players already training smarter. Free to start. No credit card needed.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/pricing" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="START FREE TODAY →"
                  padding="15px 36px"
                  rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 16 }}
                  colors={{ fill: '#1769FF', textColor: '#FFFFFF', hoverFill: '#0E54CC', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 0 }}
                />
              </Link>
              <Link to="/roadmap" style={{ textDecoration: 'none' }}>
                <RadialRevealButton
                  label="VIEW ROADMAP →"
                  padding="14px 32px"
                  rounded={8}
                  font={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 16 }}
                  colors={{ fill: 'transparent', textColor: 'rgba(255,255,255,0.7)', hoverFill: 'rgba(255,255,255,0.1)', hoverTextColor: '#FFFFFF' }}
                  border={{ borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)' }}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .feat-vis  { order: 0 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .feat-grid * { animation: none !important; }
        }
      `}</style>
    </>
  )
}
