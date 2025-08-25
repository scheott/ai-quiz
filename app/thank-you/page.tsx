// ==========================================
// app/thank-you/page.tsx (FIXED - SUSPENSE)
// ==========================================

import { Suspense } from 'react'
import ThankYouContent from './ThankYouContent'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}