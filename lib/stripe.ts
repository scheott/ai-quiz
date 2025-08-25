// ==========================================
// lib/stripe.ts (BUILD-SAFE - UPDATED)
// ==========================================

import Stripe from 'stripe'

// Only initialize Stripe if the secret key is available
let stripe: Stripe | null = null

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: true,
  })
} else if (typeof window === 'undefined') {
  // Only warn on server-side (not in browser)
  console.warn('STRIPE_SECRET_KEY environment variable is not set')
}

// Export a function that throws if stripe isn't initialized
export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }
  return stripe
}

// Also export the stripe instance for backward compatibility
export { stripe }

// Single price ID - will be set after you create the test product
export const PRICE_ID = process.env.STRIPE_PRICE_ID || ''

// Log current configuration (only in development)
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  console.log('🔧 Stripe Configuration:')
  console.log('- Secret Key:', process.env.STRIPE_SECRET_KEY ? `${process.env.STRIPE_SECRET_KEY.substring(0, 15)}...` : 'NOT SET')
  console.log('- Price ID:', PRICE_ID || 'NOT SET')
}