/**
 * ReceiptPrinter — an animated "receipt printer" that prints a payment invoice
 * with a print / tear-off interaction.
 *
 * Presentational only. Every value on the receipt comes from props — nothing
 * about a real transaction is hardcoded in here. The caller decides when to
 * mount this. In production it should be rendered ONLY after the Razorpay
 * webhook has confirmed a genuinely active subscription (that wiring happens
 * in a later session); for now it is exercised by /receipt-preview with mock
 * data.
 *
 * The printer HOUSING (navy body, screen panel, Print Invoice button, slot),
 * the feed-out staggered animation, and the tear-off interaction are stable.
 * The receipt "paper" itself is styled as a dark glowing HUD/tech card.
 *
 * Props:
 *   orderId         string  — Razorpay order id (also seeds the barcode)
 *   subscriptionId  string  — Razorpay subscription id
 *   amount          number  — plan price before tax (₹)
 *   tax             number  — tax component (₹)
 *   total           number  — amount actually charged (₹)
 *   paidWith        string  — e.g. "UPI •••• name@upi" or "Visa •••• 4242"
 *   completedAt     string  — ISO timestamp of payment completion
 *   planName        string  — e.g. "Pro Plan"
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  Check, Home, ArrowRight,
  Crown, Calculator, Percent,
  Clipboard, RefreshCw, CreditCard, CalendarDays,
  ShieldCheck, ChevronRight,
} from 'lucide-react'

const APP_URL = 'https://app.esportselite.in'

const ACCENT = '#3B82F6'
const TXT = '#E8EEF9'
const TXT_SOFT = '#8b98ae'
const OXA = "'Oxanium', sans-serif"
const MONO = "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"

const LINE_STAGGER = 62 // ms between receipt lines revealing
const FEED_MS = 2000 // paper feed-out duration
const TEAR_MS = 700 // tear-away duration
const LINE_COUNT = 20 // approximate — only used to size the feed timeout

/* faceted top corners + torn zig-zag bottom edge, shared by the border layer
   and the fill layer so the thin glow follows the whole silhouette */
const PAPER_CLIP =
  'polygon(' +
  '0 13px, 13px 0, calc(100% - 13px) 0, 100% 13px,' +
  '100% calc(100% - 10px),' +
  '91.6667% 100%, 83.3333% calc(100% - 10px),' +
  '75% 100%, 66.6667% calc(100% - 10px),' +
  '58.3333% 100%, 50% calc(100% - 10px),' +
  '41.6667% 100%, 33.3333% calc(100% - 10px),' +
  '25% 100%, 16.6667% calc(100% - 10px),' +
  '8.3333% 100%, 0 calc(100% - 10px))'

/* ── prefers-reduced-motion ── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(!!mq.matches)
    sync()
    if (mq.addEventListener) mq.addEventListener('change', sync)
    else mq.addListener(sync)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', sync)
      else mq.removeListener(sync)
    }
  }, [])
  return reduced
}

/* ── formatting helpers ── */
function formatMoney(n) {
  const v = Number(n)
  return `₹${(Number.isFinite(v) ? v : 0).toFixed(2)}`
}

function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso || '—')
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/* deterministic 12-digit "barcode number" derived from the order id */
function barcodeNumber(seed) {
  const src = String(seed || 'ESPORTSELITE')
  let out = ''
  for (let i = 0; i < src.length && out.length < 12; i++) {
    out += (src.charCodeAt(i) % 10).toString()
  }
  return out.padEnd(12, '0').slice(0, 12)
}

/* ── programmatic barcode ── bars of varying width from the order id bits ──
   (generation logic unchanged — only the bar colour is themeable) */
function Barcode({ seed, light = false }) {
  const { bars, width } = useMemo(() => {
    const src = String(seed || 'ESPORTSELITE')
    let bits = ''
    for (let i = 0; i < src.length; i++) {
      bits += src.charCodeAt(i).toString(2).padStart(8, '0')
    }
    while (bits.length < 128) bits += bits
    bits = bits.slice(0, 132)

    const out = []
    let x = 2
    for (let i = 0; i < bits.length; i++) {
      const one = bits[i] === '1'
      const w = one ? 2.6 : 1.5
      if (one) out.push({ x, w })
      x += w
    }
    return { bars: out, width: x + 2 }
  }, [seed])

  return (
    <svg
      viewBox={`0 0 ${width} 46`}
      width="100%"
      height="46"
      preserveAspectRatio="none"
      role="img"
      aria-label="Receipt barcode"
      style={light ? { filter: 'drop-shadow(0 0 3px rgba(150,190,255,0.45))' } : undefined}
    >
      <g fill={light ? '#EAF2FF' : '#1b1b1b'}>
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y="0" width={b.w} height="46" />
        ))}
      </g>
    </svg>
  )
}

/* small octagonal icon badge used down the left edge of each row */
function Badge({ children }) {
  return <span style={styles.badge}>{children}</span>
}

/* L-shaped corner tick marks for the barcode box */
function CornerTicks() {
  const c = 'rgba(59,130,246,0.7)'
  const b = { position: 'absolute', width: 9, height: 9, borderColor: c, borderStyle: 'solid', borderWidth: 0 }
  return (
    <>
      <span style={{ ...b, top: 4, left: 4, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...b, top: 4, right: 4, borderTopWidth: 2, borderRightWidth: 2 }} />
      <span style={{ ...b, bottom: 4, left: 4, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...b, bottom: 4, right: 4, borderBottomWidth: 2, borderRightWidth: 2 }} />
    </>
  )
}

export default function ReceiptPrinter({
  orderId,
  subscriptionId,
  amount,
  tax,
  total,
  paidWith,
  completedAt,
  planName = 'Pro Plan',
}) {
  const reduced = useReducedMotion()

  /* phase: 'idle' | 'printing' | 'printed' | 'tearing' | 'done' */
  const [phase, setPhase] = useState('idle')
  const [feeding, setFeeding] = useState(false)
  const [contentH, setContentH] = useState(0)

  const paperRef = useRef(null)
  const busyRef = useRef(false)
  const timerRef = useRef(null)

  /* measure the fully-rendered receipt so the slot can animate to its height */
  useLayoutEffect(() => {
    const el = paperRef.current
    if (!el) return
    const measure = () => setContentH(el.offsetHeight)
    measure()
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure)
      ro.observe(el)
    }
    window.addEventListener('resize', measure)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  function startPrint() {
    if (busyRef.current || phase !== 'idle') return
    busyRef.current = true
    setPhase('printing')
    setFeeding(true)
    const dur = reduced ? 60 : Math.max(FEED_MS, LINE_COUNT * LINE_STAGGER + 500)
    if (timerRef.current) clearTimeout(timerRef.current)
    // timeout drives the sequence; it also acts as the fallback that can never
    // get stuck (no reliance on a transitionend that might not fire).
    timerRef.current = setTimeout(() => {
      setPhase('printed')
      busyRef.current = false
    }, dur)
  }

  function tearOff() {
    if (busyRef.current || phase !== 'printed') return
    busyRef.current = true
    setPhase('tearing')
    const dur = reduced ? 60 : TEAR_MS
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setFeeding(false)
      setPhase('done')
      busyRef.current = false
    }, dur)
  }

  const slotOpen = phase === 'printing' || phase === 'printed' || phase === 'tearing'

  /* staggered reveal — line() is called in render order and bumps the index */
  let lineIndex = 0
  const line = (node, key) => {
    const delay = reduced ? 0 : lineIndex * LINE_STAGGER
    lineIndex += 1
    return (
      <div
        key={key}
        style={{
          opacity: feeding ? 1 : 0,
          transform: feeding ? 'translateY(0)' : 'translateY(-8px)',
          transition: reduced ? 'none' : 'opacity .3s ease, transform .3s ease',
          transitionDelay: `${delay}ms`,
        }}
      >
        {node}
      </div>
    )
  }

  const metaRow = (Icon, label, value, key) => line(
    <div style={styles.rMeta}>
      <Badge><Icon size={12} strokeWidth={2} /></Badge>
      <span style={styles.rMetaLabel}>{label}</span>
      <span style={styles.rMetaVal}>{value}</span>
      <ChevronRight size={13} style={{ color: 'rgba(138,151,173,0.55)', flexShrink: 0 }} />
    </div>,
    key,
  )

  const statusText =
    phase === 'printing' ? 'Printing your invoice…'
      : phase === 'printed' ? 'Invoice printed. Tear it off to continue.'
        : phase === 'done' ? 'Receipt torn off.'
          : 'Ready to print your invoice.'

  return (
    <div style={styles.wrap}>
      <style>{CSS}</style>

      <div style={styles.printer}>
        <a href="/" style={styles.homeBtn} aria-label="Back to Esports Elite home">
          <Home size={12} strokeWidth={2.4} />
          Home
        </a>

        <div style={styles.brandRow}>
          <span style={styles.brandDot} />
          <span style={styles.brandLabel}>ESPORTS ELITE · BILLING</span>
        </div>

        {/* ── built-in screen ── */}
        <div style={styles.screen}>
          <div style={styles.screenTop}>
            <div style={{ minWidth: 0 }}>
              <div style={styles.screenPlan}>{planName}</div>
              <div style={styles.screenSub}>Monthly subscription</div>
            </div>
            <div style={styles.screenAmount}>{formatMoney(total)}</div>
          </div>
          <div style={{ borderTop: '1px dashed #24324d', margin: '12px 0' }} />
          <div style={styles.screenPaid}>
            <span style={styles.checkCircle}>
              <Check size={12} strokeWidth={3} />
            </span>
            Payment complete
          </div>
        </div>

        {/* ── action ── */}
        <div style={styles.actionRow}>
          {(phase === 'idle' || phase === 'printing') && (
            <button
              type="button"
              className="rp-btn rp-btn-primary"
              onClick={startPrint}
              disabled={phase === 'printing'}
            >
              {phase === 'printing' ? 'Printing…' : 'Print Invoice'}
            </button>
          )}
          {(phase === 'printed' || phase === 'tearing') && (
            <button
              type="button"
              className="rp-btn rp-btn-ghost"
              onClick={tearOff}
              disabled={phase === 'tearing'}
            >
              Tear Off Receipt
            </button>
          )}
          {phase === 'done' && (
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rp-btn rp-btn-primary"
            >
              Continue to App <ArrowRight size={15} strokeWidth={2.4} />
            </a>
          )}
        </div>

        <p style={styles.status} aria-live="polite">{statusText}</p>

        {/* ── paper slot ── */}
        <div style={styles.slot}>
          <div style={styles.slit} />
        </div>

        {/* ── feed area — clips the paper so it "feeds" out of the slot ── */}
        <div
          style={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: slotOpen ? contentH : 6,
            transition: reduced
              ? 'none'
              : `height ${phase === 'printing' ? FEED_MS : 460}ms cubic-bezier(.22,1,.36,1)`,
          }}
        >
          <div
            ref={paperRef}
            className={`rp-paper-wrap${phase === 'tearing' ? ' rp-tear' : ''}`}
            style={{ paddingBottom: 10 }}
          >
            <div className="rp-paper">
              <div className="rp-paper-fill">
                <div style={styles.paperInner}>
                  {line(
                    <div style={styles.header}>
                      <img src="/ee-logo.png" alt="Esports Elite logo" style={styles.logoMark} />
                    </div>,
                    'logo',
                  )}
                  {line(<div style={styles.rBrand}>ESPORTS&nbsp;ELITE</div>, 'brand')}
                  {line(
                    <div style={styles.taglineRow}>
                      <span style={styles.flank} />
                      <ChevronRight size={10} style={{ color: ACCENT, opacity: 0.7, transform: 'scaleX(-1)' }} />
                      <span style={styles.rTagline}>WHERE GRIND BECOMES GREATNESS.</span>
                      <ChevronRight size={10} style={{ color: ACCENT, opacity: 0.7 }} />
                      <span style={styles.flank} />
                    </div>,
                    'tag',
                  )}
                  {line(<div style={styles.rule} />, 'rule1')}

                  {line(
                    <div style={styles.rRow}>
                      <Badge><Crown size={13} strokeWidth={2} /></Badge>
                      <span style={styles.rRowTitle}>{String(planName).toUpperCase()}</span>
                      <span style={styles.rRowPrice}>{formatMoney(amount)}</span>
                    </div>,
                    'item',
                  )}
                  {line(
                    <div style={styles.rSub}>BILLED MONTHLY • AUTO-RENEWS • CANCEL ANYTIME</div>,
                    'itemsub',
                  )}
                  {line(<div style={styles.rule} />, 'rule2')}

                  {line(
                    <div style={styles.rRow}>
                      <Badge><Calculator size={12} strokeWidth={2} /></Badge>
                      <span style={styles.rRowLabel}>SUBTOTAL</span>
                      <span style={styles.rNum}>{formatMoney(amount)}</span>
                    </div>,
                    'subtotal',
                  )}
                  {line(
                    <div style={styles.rRow}>
                      <Badge><Percent size={12} strokeWidth={2} /></Badge>
                      <span style={styles.rRowLabel}>TAX (GST 18%)</span>
                      <span style={styles.rNum}>{formatMoney(tax)}</span>
                    </div>,
                    'tax',
                  )}

                  {line(
                    <div style={styles.rTotal}>
                      <span style={styles.rTotalLabel}>TOTAL</span>
                      <span style={styles.rTotalPrice}>{formatMoney(total)}</span>
                    </div>,
                    'total',
                  )}
                  {line(<div style={styles.rule} />, 'rule3')}

                  {metaRow(Clipboard, 'ORDER ID', orderId || '—', 'oid')}
                  {metaRow(RefreshCw, 'SUBSCRIPTION', subscriptionId || '—', 'sid')}
                  {metaRow(CreditCard, 'PAID WITH', paidWith || '—', 'paid')}
                  {metaRow(CalendarDays, 'DATE', formatDate(completedAt), 'date')}

                  {line(
                    <div style={styles.barcodeBox}>
                      <CornerTicks />
                      <ChevronRight size={11} style={styles.bcChevronL} />
                      <ChevronRight size={11} style={styles.bcChevronR} />
                      <Barcode seed={orderId} light />
                      <div style={styles.rBarcodeText}>
                        {barcodeNumber(orderId).replace(/(\d{4})(\d{4})(\d{4})/, '$1  $2  $3')}
                      </div>
                    </div>,
                    'barcode',
                  )}

                  {line(
                    <div style={styles.rFoot}>
                      <span style={styles.footBadge}>
                        <ShieldCheck size={13} strokeWidth={2} />
                      </span>
                      <span>
                        This is a computer-generated receipt for your Esports Elite
                        subscription. No signature required. Questions?{' '}
                        <a
                          href="mailto:johnkarthik055@gmail.com"
                          style={{ color: ACCENT, textDecoration: 'none' }}
                        >
                          johnkarthik055@gmail.com
                        </a>
                      </span>
                    </div>,
                    'foot',
                  )}
                </div>
              </div>
            </div>

            {line(
              <div style={styles.tagline}>
                <span style={styles.taglineDash} />
                <span>STAY ELITE</span>
                <img src="/ee-logo.png" alt="Esports Elite logo" style={styles.taglineMark} />
                <span>KEEP GRINDING</span>
                <span style={styles.taglineDash} />
              </div>,
              'signoff',
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────── */

const styles = {
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontFamily: "'Inter', sans-serif",
  },
  printer: {
    position: 'relative',
    width: 'min(430px, 100%)',
    background: 'linear-gradient(160deg, #1B2A45 0%, #0D1528 100%)',
    border: '1px solid #24314d',
    borderRadius: 20,
    padding: '22px 22px 24px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  },
  homeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontFamily: "'Oxanium', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: '#9fb0c7',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 999,
    padding: '5px 11px',
    textDecoration: 'none',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
    marginBottom: 14,
  },
  brandDot: {
    width: 7,
    height: 7,
    borderRadius: 2,
    background: '#3B82F6',
    boxShadow: '0 0 10px #3B82F6',
  },
  brandLabel: {
    fontFamily: "'Oxanium', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.18em',
    color: '#64748B',
  },
  screen: {
    background: '#050816',
    border: '1px solid #1c2740',
    borderRadius: 14,
    padding: 16,
  },
  screenTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  screenPlan: {
    fontFamily: "'Oxanium', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: '#F8FAFC',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  screenSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  screenAmount: {
    fontFamily: "'Oxanium', sans-serif",
    fontWeight: 800,
    fontSize: 20,
    color: '#F8FAFC',
    whiteSpace: 'nowrap',
  },
  screenPaid: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12.5,
    color: '#86EFAC',
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 999,
    background: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 46,
    margin: '18px 0 8px',
  },
  status: {
    textAlign: 'center',
    fontSize: 11.5,
    color: '#64748B',
    margin: '0 0 14px',
    minHeight: 16,
  },
  slot: {
    position: 'relative',
    height: 14,
    background: 'linear-gradient(180deg, #0b1120 0%, #050912 100%)',
    borderRadius: 8,
    boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
  },
  slit: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '64%',
    height: 4,
    background: '#02040a',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
  },

  /* ── receipt paper — dark glowing HUD card ── */
  paperInner: {
    padding: '18px 18px 18px',
    fontFamily: OXA,
    color: TXT,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoMark: {
    width: 86,
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
    margin: '0 0 6px',
    filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.5))',
  },
  rBrand: {
    textAlign: 'center',
    fontFamily: OXA,
    fontWeight: 800,
    fontSize: 20,
    letterSpacing: '0.26em',
    paddingLeft: '0.26em',
    color: TXT,
    textShadow: '0 0 20px rgba(59,130,246,0.45)',
  },
  taglineRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 5,
  },
  flank: {
    width: 12,
    height: 1,
    flexShrink: 0,
    background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.75))',
  },
  rTagline: {
    fontFamily: OXA,
    fontWeight: 600,
    fontSize: 9.5,
    letterSpacing: '0.06em',
    whiteSpace: 'nowrap',
    color: ACCENT,
  },
  rule: {
    height: 0,
    borderTop: '1px dashed rgba(139,152,174,0.30)',
    margin: '13px 0',
  },
  badge: {
    width: 26,
    height: 26,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ACCENT,
    background: 'rgba(59,130,246,0.10)',
    border: '1px solid rgba(59,130,246,0.4)',
    boxShadow: '0 0 10px rgba(59,130,246,0.18)',
    clipPath:
      'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
  },
  rRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 11,
    padding: '3px 0',
  },
  rRowTitle: {
    flex: 1,
    minWidth: 0,
    fontFamily: OXA,
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.06em',
    color: TXT,
  },
  rRowLabel: {
    flex: 1,
    fontFamily: OXA,
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: '0.08em',
    color: TXT,
  },
  rRowPrice: {
    fontFamily: OXA,
    fontWeight: 700,
    fontSize: 13,
    color: TXT,
    whiteSpace: 'nowrap',
  },
  rNum: {
    fontFamily: OXA,
    fontWeight: 700,
    fontSize: 12.5,
    color: TXT,
    whiteSpace: 'nowrap',
  },
  rSub: {
    fontFamily: OXA,
    fontSize: 9,
    letterSpacing: '0.02em',
    color: TXT_SOFT,
    margin: '3px 0 0 37px',
  },
  rTotal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9px 14px',
    margin: '6px 0 2px',
    border: '1px solid rgba(59,130,246,0.5)',
    background:
      'repeating-linear-gradient(115deg, transparent 0 9px, rgba(59,130,246,0.07) 9px 11px),' +
      'linear-gradient(100deg, rgba(59,130,246,0.20), rgba(0,212,255,0.05))',
    boxShadow: 'inset 0 0 18px rgba(59,130,246,0.20)',
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%)',
  },
  rTotalLabel: {
    fontFamily: OXA,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: '0.12em',
    color: TXT,
  },
  rTotalPrice: {
    fontFamily: OXA,
    fontWeight: 800,
    fontSize: 21,
    color: ACCENT,
    textShadow: '0 0 16px rgba(59,130,246,0.5)',
    whiteSpace: 'nowrap',
  },
  rMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '5px 0',
  },
  rMetaLabel: {
    width: 78,
    flexShrink: 0,
    fontFamily: OXA,
    fontWeight: 600,
    fontSize: 10,
    letterSpacing: '0.1em',
    color: TXT_SOFT,
  },
  rMetaVal: {
    flex: 1,
    minWidth: 0,
    textAlign: 'right',
    fontFamily: MONO,
    fontSize: 10,
    color: TXT,
    wordBreak: 'break-all',
  },
  barcodeBox: {
    position: 'relative',
    margin: '8px 0 2px',
    padding: '15px 20px 9px',
    border: '1px solid rgba(59,130,246,0.4)',
    borderRadius: 10,
    background: 'rgba(10,20,38,0.6)',
  },
  bcChevronL: {
    position: 'absolute',
    left: 4,
    top: '50%',
    transform: 'translateY(-50%) scaleX(-1)',
    color: 'rgba(59,130,246,0.55)',
  },
  bcChevronR: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(59,130,246,0.55)',
  },
  rBarcodeText: {
    textAlign: 'center',
    fontFamily: MONO,
    fontSize: 12,
    letterSpacing: '0.3em',
    paddingLeft: '0.3em',
    color: TXT,
    marginTop: 7,
  },
  rFoot: {
    display: 'flex',
    gap: 9,
    alignItems: 'flex-start',
    marginTop: 12,
    fontFamily: OXA,
    fontSize: 9.5,
    lineHeight: 1.55,
    color: TXT_SOFT,
    textAlign: 'left',
  },
  footBadge: {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ACCENT,
    background: 'rgba(59,130,246,0.12)',
    border: '1px solid rgba(59,130,246,0.4)',
    borderRadius: '50%',
  },
  tagline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 13,
    fontFamily: OXA,
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: '0.18em',
    color: '#5b6678',
  },
  taglineDash: {
    width: 18,
    height: 1,
    background: 'rgba(120,150,200,0.35)',
  },
  taglineMark: {
    width: 14,
    height: 14,
    objectFit: 'contain',
    opacity: 0.85,
  },
}

const CSS = `
.rp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-family: 'Oxanium', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  padding: 11px 26px;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background .2s ease, box-shadow .2s ease, transform .15s ease, opacity .2s ease;
}
.rp-btn-primary {
  background: #3B82F6;
  color: #fff;
  box-shadow: 0 0 26px rgba(59,130,246,0.35);
}
.rp-btn-primary:hover {
  background: #2563EB;
  box-shadow: 0 0 40px rgba(59,130,246,0.5);
  transform: translateY(-1px);
}
.rp-btn-ghost {
  background: rgba(255,255,255,0.04);
  color: #cdd8ea;
  border-color: rgba(255,255,255,0.14);
}
.rp-btn-ghost:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(255,255,255,0.28);
}
.rp-btn:disabled {
  opacity: .55;
  cursor: default;
  box-shadow: none;
  transform: none;
}
.rp-btn:active {
  transform: translateY(0) scale(.98);
}

/* ── receipt paper: dark glowing tech card ── */
.rp-paper-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(320px, 88%);
}
.rp-paper {
  width: 100%;
  padding: 2px;
  background: linear-gradient(150deg, #5AA0FF 0%, #00D4FF 38%, #1b3350 68%, #3B82F6 100%);
  clip-path: ${PAPER_CLIP};
  filter:
    drop-shadow(0 0 16px rgba(59,130,246,0.45))
    drop-shadow(0 0 3px rgba(0,212,255,0.5))
    drop-shadow(0 16px 30px rgba(0,0,0,0.55));
}
.rp-paper-fill {
  clip-path: ${PAPER_CLIP};
  background:
    radial-gradient(120% 70% at 50% 0%, rgba(59,130,246,0.18), transparent 62%),
    radial-gradient(110% 55% at 50% 100%, rgba(0,212,255,0.12), transparent 55%),
    linear-gradient(180deg, #0a1120 0%, #060a14 100%);
}

@keyframes rp-tear-away {
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(70px) rotate(5deg); opacity: 0; }
}
.rp-tear {
  animation: rp-tear-away 700ms cubic-bezier(.5, 0, .75, 0) forwards;
  transform-origin: top center;
}

@media (prefers-reduced-motion: reduce) {
  .rp-tear { animation-duration: 60ms; }
  .rp-btn { transition: none; }
}
`
