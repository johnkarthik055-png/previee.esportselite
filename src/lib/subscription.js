/**
 * subscription.js — website checkout helpers.
 *
 *  - createRazorpayOrder()  : calls the shared Cloud Function (main app's
 *                             functions/createRazorpayOrder.js) to create a
 *                             Razorpay subscription tied to the signed-in uid.
 *  - loadRazorpayCheckout() : lazy-loads Razorpay's Checkout.js exactly once.
 *  - watchSubscription()    : live-reads users/{uid}.subscription so the page
 *                             can wait for the WEBHOOK (source of truth) to
 *                             flip status to 'active' — never trusts the
 *                             client-side checkout callback for activation.
 *
 * No Razorpay key material lives here — the publishable key id is returned by
 * the Cloud Function at call time.
 */
import { httpsCallable } from 'firebase/functions'
import { doc, onSnapshot } from 'firebase/firestore'
import { functions, db } from './firebase'

const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

/**
 * @param {{ email?: string, name?: string, contact?: string }} profile
 * @returns {Promise<{
 *   subscriptionId: string, keyId: string, planId: string, status: string,
 *   shortUrl: string|null, amountPaise: number, currency: string,
 *   prefill: { name: string, email: string, contact: string }
 * }>}
 */
export async function createRazorpayOrder(profile = {}) {
  const call = httpsCallable(functions, 'createRazorpayOrder')
  const res = await call({
    email: profile.email || '',
    name: profile.name || '',
    contact: profile.contact || '',
  })
  return res.data
}

let checkoutPromise = null

/** Resolves to `true` once window.Razorpay is available. */
export function loadRazorpayCheckout() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.Razorpay) return Promise.resolve(true)
  if (checkoutPromise) return checkoutPromise

  checkoutPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay Checkout.')))
      if (window.Razorpay) resolve(true)
      return
    }
    const s = document.createElement('script')
    s.src = CHECKOUT_SRC
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => {
      checkoutPromise = null
      reject(new Error('Failed to load Razorpay Checkout. Check your connection and retry.'))
    }
    document.body.appendChild(s)
  })
  return checkoutPromise
}

/**
 * Open Razorpay Checkout for a subscription.
 * @returns {Promise<{ razorpay_payment_id: string, razorpay_subscription_id: string, razorpay_signature: string }>}
 *          resolves on the client-side success callback (OPTIMISTIC only —
 *          activation still comes from the webhook), rejects on dismiss/failure.
 */
export async function openRazorpayCheckout(order, { name, email, contact } = {}) {
  await loadRazorpayCheckout()

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.keyId,
      subscription_id: order.subscriptionId,
      name: 'Esports Elite',
      description: 'Pro — ₹99/month',
      image: '/ee-logo.png',
      prefill: {
        name: name || order.prefill?.name || '',
        email: email || order.prefill?.email || '',
        contact: contact || order.prefill?.contact || '',
      },
      notes: { plan: 'pro' },
      theme: { color: '#2563EB' },
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error('Checkout closed before payment completed.')),
        escape: true,
      },
    })
    rzp.on('payment.failed', (resp) => {
      const d = resp?.error?.description || 'Payment failed.'
      reject(new Error(d))
    })
    rzp.open()
  })
}

/**
 * Subscribe to users/{uid}.subscription. `cb` gets the subscription object
 * (or null) on every change. Returns the unsubscribe fn.
 */
export function watchSubscription(uid, cb) {
  if (!uid) {
    cb(null)
    return () => {}
  }
  return onSnapshot(
    doc(db, 'users', uid),
    (snap) => cb(snap.exists() ? snap.data()?.subscription ?? null : null),
    () => cb(null),
  )
}

export function isSubscriptionActive(subscription, at = Date.now()) {
  if (!subscription || subscription.status !== 'active') return false
  const raw = subscription.expiresAt
  if (!raw) return true
  const ms = typeof raw?.toMillis === 'function' ? raw.toMillis() : Date.parse(raw)
  return Number.isFinite(ms) ? ms > at : true
}
