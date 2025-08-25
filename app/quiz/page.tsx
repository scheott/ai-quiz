// ==========================================
// app/quiz/page.tsx (FIXED - SUSPENSE)
// ==========================================

import { Suspense } from 'react'
import QuizContent from './QuizContent'

function QuizLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading quiz...</p>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizContent />
    </Suspense>
  )
}