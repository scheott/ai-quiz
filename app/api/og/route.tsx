// ==========================================
// app/api/og/route.tsx
// ==========================================

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const band = searchParams.get('band') || '—'
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
          height: '630px',
          background: '#0b69f8',
          color: '#fff',
          fontSize: 72,
          fontWeight: 700,
          textAlign: 'center',
          padding: '40px'
        }}
      >
        <div>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🤖 Will AI Take My Job?</div>
          <div>Your 3-Year Risk: {band}%</div>
          <div style={{ fontSize: 32, marginTop: 20, fontWeight: 400 }}>
            Take the science-based quiz
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}