// ==========================================
// lib/supabase.ts (BUILD-SAFE)
// ==========================================

let supabase: any = null

// Only initialize Supabase if environment variables are available
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  // Dynamic import to avoid build-time issues
  const createClient = require('@supabase/supabase-js').createClient
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
} else {
  // Mock Supabase client for build-time or when env vars aren't set
  supabase = {
    from: (table: string) => ({
      insert: (data: any) => Promise.resolve({ data, error: null }),
      update: (data: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data, error: null })
      }),
      select: (columns: string) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    storage: {
      from: (bucket: string) => ({
        upload: (path: string, file: any, options: any) => Promise.resolve({ data: null, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: `mock-url/${path}` } })
      })
    }
  }
  
  if (typeof window === 'undefined') {
    console.warn('Supabase environment variables not set, using mock client')
  }
}

export { supabase }

// Database types for TypeScript
export interface Response {
  id: string
  created_at: string
  job_title: string
  industry: string
  answers: number[]
  exposure: number
  adoption: number
  p3y_low: number
  p3y_high: number
  email?: string
  session_id?: string
  ua?: string
}

export interface Order {
  id: string
  created_at: string
  response_id: string
  provider: 'stripe' | 'lemonsqueezy'
  price_cents: number
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'expired'
  provider_checkout_id: string
  customer_email?: string
  stripe_customer_id?: string
  updated_at?: string
}

export interface Plan {
  id: string
  created_at: string
  response_id: string
  pdf_url: string
}
