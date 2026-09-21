/**
 * LoginModal — sign in / create account with your existing Esports Elite
 * account, right on the website. Same methods as app.esportselite.in:
 * email + password, or Google.
 *
 * Purely presentational + auth calls; the parent decides what to do after a
 * successful login (usually: enable the Subscribe button).
 */
import { useEffect, useRef, useState } from 'react'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth, authErrorMessage } from '../context/AuthContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginModal({ open, onClose, onSuccess }) {
  const { signInEmail, signUpEmail, signInGoogle } = useAuth()

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (open) {
      setError('')
      setBusy(false)
      setTimeout(() => firstFieldRef.current?.focus(), 50)
    }
  }, [open, mode])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape' && !busy) onClose?.() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, busy, onClose])

  if (!open) return null

  async function done(user) {
    setBusy(false)
    onSuccess?.(user)
    onClose?.()
  }

  async function handleEmail(e) {
    e.preventDefault()
    setError('')
    const em = email.trim()
    if (!EMAIL_RE.test(em)) { setError('Enter a valid email address.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (mode === 'signup' && !name.trim()) { setError('Enter a display name.'); return }

    setBusy(true)
    try {
      const user = mode === 'signin'
        ? await signInEmail(em, password)
        : await signUpEmail(em, password, name)
      await done(user)
    } catch (err) {
      setBusy(false)
      setError(authErrorMessage(err))
    }
  }

  async function handleGoogle() {
    setError('')
    setBusy(true)
    try {
      const user = await signInGoogle()
      await done(user)
    } catch (err) {
      setBusy(false)
      setError(authErrorMessage(err))
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Log in to Esports Elite"
      onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onClose?.() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, background: 'rgba(3,5,14,0.78)', backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 400, background: '#0A0F1C',
          border: '1px solid #1E293B', borderRadius: 16, padding: '28px 26px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55)', position: 'relative',
        }}
      >
        <button
          type="button" onClick={() => !busy && onClose?.()} aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14, background: 'none',
            border: 'none', color: '#64748B', cursor: 'pointer', padding: 4,
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800, fontSize: 22, color: '#F8FAFC', marginBottom: 4 }}>
          {mode === 'signin' ? 'Log in to subscribe' : 'Create your account'}
        </h2>
        <p style={{ fontSize: 13.5, color: '#94A3B8', marginBottom: 20 }}>
          {mode === 'signin'
            ? 'Use the same account as app.esportselite.in.'
            : 'This is the account you will use in the app and to manage billing.'}
        </p>

        <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'signup' && (
            <input
              ref={firstFieldRef}
              type="text" placeholder="Display name" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            ref={mode === 'signin' ? firstFieldRef : undefined}
            type="email" placeholder="Email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: 40 }}
            />
            <button
              type="button" tabIndex={-1} onClick={() => setShowPass((v) => !v)}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#64748B', cursor: 'pointer',
                padding: 6, display: 'flex',
              }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.28)',
              color: '#FCA5A5', fontSize: 12.5, padding: '9px 11px', borderRadius: 8,
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={busy} style={{ width: '100%', marginTop: 2 }}>
            {busy ? <Loader2 size={16} className="ee-spin" /> : (mode === 'signin' ? 'Log in' : 'Create account')}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#1E293B' }} />
          <span style={{ fontSize: 11, color: '#64748B' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#1E293B' }} />
        </div>

        <button
          type="button" onClick={handleGoogle} disabled={busy} className="btn-outline"
          style={{ width: '100%' }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.72.48-1.63.76-2.7.76-2.08 0-3.84-1.4-4.47-3.29H1.83v2.07A8 8 0 0 0 8.98 17z" />
            <path fill="#FBBC05" d="M4.51 10.52A4.8 4.8 0 0 1 4.26 9c0-.52.09-1.02.25-1.52V5.41H1.83a8 8 0 0 0 0 7.18l2.68-2.07z" />
            <path fill="#EA4335" d="M8.98 3.58c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.48c.64-1.87 2.4-3.9 4.48-3.9z" />
          </svg>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#94A3B8', marginTop: 16 }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
            style={{ background: 'none', border: 'none', color: '#60A5FA', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: 13 }}
          >
            {mode === 'signin' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>

      <style>{`
        .ee-spin { animation: ee-spin 0.9s linear infinite; }
        @keyframes ee-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  height: 42,
  padding: '0 12px',
  borderRadius: 8,
  border: '1px solid #1E293B',
  background: '#050816',
  color: '#F8FAFC',
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  outline: 'none',
}
