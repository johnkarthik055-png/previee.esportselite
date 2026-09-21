/*
 * Shared squad-size price-tile picker (2–6 players, ₹129→₹89/player).
 * Extracted because the mobile layout here already had a real bug fixed once
 * (5 tiles overflowing their row at narrow widths, causing the wrapped tile
 * to stretch full-width) — reuse this rather than re-introducing it.
 * Controlled: parent owns `value`/`onChange`.
 */
export const SQUAD_TIERS = [
  { players: 2, price: 129 },
  { players: 3, price: 119 },
  { players: 4, price: 109 },
  { players: 5, price: 99 },
  { players: 6, price: 89, best: true },
]

export default function SquadTileSelector({ value, onChange }) {
  return (
    <>
      <div className="squad-tiles" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {SQUAD_TIERS.map(t => (
          <button
            key={t.players}
            type="button"
            className="squad-tile"
            onClick={() => onChange(t.players)}
            style={{
              position: 'relative',
              flex: '1 1 0', minWidth: '52px',
              fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: '15px',
              padding: '12px 6px', borderRadius: '10px', cursor: 'pointer',
              background: value === t.players ? 'rgba(37,99,235,0.15)' : 'transparent',
              border: `1px solid ${value === t.players ? '#3B82F6' : '#1E293B'}`,
              color: value === t.players ? '#60A5FA' : '#94A3B8',
              transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}
          >
            {t.players}
            {t.best && (
              <span className="squad-badge" style={{
                position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)',
                background: '#3B82F6', color: '#fff', fontSize: '7px', fontWeight: 700,
                letterSpacing: '0.06em', padding: '2px 6px', borderRadius: '100px', whiteSpace: 'nowrap',
              }}>BEST VALUE</span>
            )}
          </button>
        ))}
      </div>
      <style>{`
        @media (max-width: 420px) {
          .squad-tiles { gap: 5px !important; }
          .squad-tile { min-width: 40px !important; padding: 10px 2px !important; font-size: 13px !important; }
          .squad-badge { font-size: 5.5px !important; letter-spacing: 0.02em !important; padding: 1px 4px !important; }
        }
      `}</style>
    </>
  )
}

/*
 * Static comparison row — NOT selectable, no active/inactive state. Every
 * tile always shows its own price at the same time; the 6-member tile is
 * only ever visually emphasized (badge + border) via its `best` flag in the
 * data, never via interaction. Used on the Pricing page's Squad Elite card,
 * which wants a permanent price-comparison row rather than a picker.
 */
export function StaticSquadTiers() {
  return (
    <>
      <div className="squad-tiles-static" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {SQUAD_TIERS.map(t => (
          <div
            key={t.players}
            className="squad-tile-static"
            style={{
              position: 'relative', flex: '1 1 0', minWidth: '58px', textAlign: 'center',
              borderRadius: '10px', padding: '11px 3px',
              background: t.best ? 'rgba(37,99,235,0.1)' : 'transparent',
              border: `1px solid ${t.best ? '#3B82F6' : '#1E293B'}`,
              boxShadow: t.best ? '0 0 26px rgba(59,130,246,0.18), inset 0 0 24px rgba(59,130,246,0.06)' : 'none',
            }}
          >
            {t.best && (
              <span className="squad-badge" style={{
                position: 'absolute', top: '-9px', left: '50%', transform: 'translateX(-50%)',
                background: '#3B82F6', color: '#fff', fontSize: '7px', fontWeight: 700,
                letterSpacing: '0.06em', padding: '2px 6px', borderRadius: '100px', whiteSpace: 'nowrap',
              }}>BEST VALUE</span>
            )}
            <div className="squad-tile-static-num" style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '17px', color: '#F8FAFC', lineHeight: 1 }}>
              {t.players}
            </div>
            <div className="squad-tile-static-sub" style={{ fontSize: '8px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: '2px' }}>
              members
            </div>
            <div className="squad-tile-static-price" style={{
              fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: '14px', lineHeight: 1, marginTop: '8px',
              color: t.best ? '#60A5FA' : '#F8FAFC',
            }}>
              ₹{t.price}
            </div>
            <div className="squad-tile-static-sub" style={{ fontSize: '7px', color: '#64748B', lineHeight: 1.25, marginTop: '3px' }}>
              per player<br />/ month
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 420px) {
          .squad-tiles-static { gap: 4px !important; }
          .squad-tile-static { min-width: 46px !important; padding: 9px 2px !important; }
          .squad-tile-static-num { font-size: 14px !important; }
          .squad-tile-static-price { font-size: 11px !important; margin-top: 6px !important; }
          .squad-tile-static-sub { font-size: 6px !important; }
          .squad-badge { font-size: 5px !important; letter-spacing: 0 !important; padding: 1px 3px !important; }
        }
      `}</style>
    </>
  )
}
