// ==========================================
// app/results/page.tsx (FIXED - SUSPENSE)
// ==========================================

import type { Metadata } from 'next'
import { Suspense } from 'react'
import ClientResults from './ClientResults'
import { decodeResult } from '@/lib/token'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export function generateMetadata({ searchParams }: { searchParams: { t?: string } }): Metadata {
  const band = (() => {
    if (!searchParams?.t) return undefined
    const d = decodeResult(searchParams.t)
    if (!d) return undefined
    return `${d.p3y_low}-${d.p3y_high}`
  })()
  
  const ogImage = band
    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://willaitakemyjobquiz.com'}/api/og?band=${band}`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://willaitakemyjobquiz.com'}/api/og`

  return {
    openGraph: { 
      images: [ogImage], 
      title: band ? `My 3-Year AI Automation Risk: ${band}%` : undefined 
    },
    twitter: { images: [ogImage] }
  }
}

function ResultsLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your results...</p>
      </div>
    </div>
  )
}

export default function Page({ searchParams }: { searchParams: { t?: string; rid?: string } }) {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ClientResults token={searchParams.t} rid={searchParams.rid} />
    </Suspense>
  )
}