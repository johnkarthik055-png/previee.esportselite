/**
 * AuthContext — website-side Firebase Auth.
 *
 * Minimal on purpose: the marketing site only needs to know WHO is logged in
 * so the pricing page can attach the right uid to a Razorpay subscription.
 * No localStorage mirroring, no bootstrap writes, no profile writes —
 * that all belongs to the main app.
 *
 * Supports the same sign-in methods the app does: email/password and Google.
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

const AuthContext = createContext({
  user: null,
  loading: true,
  signInEmail: async () => {},
  signUpEmail: async () => {},
  signInGoogle: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }) {
  /* undefined = not resolved yet, null = signed out, object = signed in */
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => setUser(fbUser ?? null))
    return unsub
  }, [])

  const signInEmail = useCallback(async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
    return cred.user
  }, [])

  const signUpEmail = useCallback(async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
    if (displayName && cred.user) {
      try {
        await updateProfile(cred.user, { displayName: displayName.trim() })
      } catch {
        /* non-fatal */
      }
    }
    return cred.user
  }, [])

  const signInGoogle = useCallback(async () => {
    const cred = await signInWithPopup(auth, googleProvider)
    return cred.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
    } catch {
      /* swallow */
    }
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: user === undefined,
        signInEmail,
        signUpEmail,
        signInGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

/** Map Firebase auth error codes to friendly, inline-displayable messages. */
export function authErrorMessage(err) {
  const code = err?.code || ''
  switch (code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'That email is already registered — sign in instead.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again in a few minutes.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and retry.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was cancelled.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google popup. Allow popups and retry.'
    default:
      return err?.message || 'Sign-in failed. Please try again.'
  }
}
