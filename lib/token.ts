// lib/token.ts
// ==========================================

export type ResultPayload = {
  jobTitle: string
  industry: string
  answers: number[]
  exposure: number
  adoption: number
  p3y_low: number
  p3y_high: number
}

// Server-side only (used in /api/score)
export function encodeResult(payload: ResultPayload): string {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
}

// Browser-safe decode
export function decodeResult(token: string): ResultPayload | null {
  try {
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '==='.slice((base64.length + 3) % 4)
    
    // atob works in browsers, and in Node 18+ via global, but we'll guard:
    const json = typeof atob === 'function'
      ? decodeURIComponent(escape(atob(padded)))
      : Buffer.from(padded, 'base64').toString('utf8')
    
    return JSON.parse(json)
  } catch {
    return null
  }
}