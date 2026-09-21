/**
 * Firebase for the marketing website (esportselite.in).
 *
 * SAME Firebase project as the main app (app.esportselite.in →
 * `esports-elite-daf06`), so a visitor logs in here with the exact account
 * they already use in the app, and the uid the webhook writes against is the
 * same one the app reads. The web config below is public identifying info
 * (not a secret) — real authorization is enforced by Firestore Security
 * Rules + the Cloud Functions auth checks. Values fall back to production so
 * the site boots with no .env, but can be overridden per-environment.
 */
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD8KitIGBVidSAGkHgzC-A2AVypiIE_7n4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'esports-elite-daf06.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'esports-elite-daf06',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'esports-elite-daf06.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '381439809052',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID || '1:381439809052:web:ff4bf41ad5a96f10e671d9',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-FNEK371V4Y',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const db = getFirestore(firebaseApp)

/* Region must match functions/ (setGlobalOptions region: 'us-central1'). */
export const functions = getFunctions(firebaseApp, 'us-central1')
