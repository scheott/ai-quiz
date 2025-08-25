// ==========================================
// app/thank-you/ThankYouContent.tsx (NEW FILE)
// ==========================================

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'

export default function ThankYouContent() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const responseId = searchParams.get('rid')
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const generatePDF = async () => {
      if (!responseId) {
        setError('No response ID found')
        setIsGenerating(false)
        return
      }

      try {
        setIsGenerating(true)
        const response = await fetch('/api/pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ responseId })
        })

        if (response.ok) {
          // Check if we're getting a direct PDF download or a URL
          const contentType = response.headers.get('content-type')
          
          if (contentType === 'application/pdf') {
            // Direct PDF download - create blob URL
            const pdfBlob = await response.blob()
            const url = URL.createObjectURL(pdfBlob)
            setPdfUrl(url)
          } else {
            // JSON response with PDF URL
            const data = await response.json()
            setPdfUrl(data.pdfUrl)
          }
        } else {
          const errorData = await response.json()
          setError(errorData.error || 'PDF generation failed')
        }
      } catch (error) {
        console.error('PDF generation failed:', error)
        setError('Failed to generate PDF. Please try again.')
      } finally {
        setIsGenerating(false)
      }
    }

    generatePDF()

    // Cleanup blob URL on unmount
    return () => {
      if (pdfUrl && pdfUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [responseId])

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your plan is ready!
        </h1>
        <p className="text-gray-600">
          We've also emailed a copy to your inbox
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500 mt-2">
            Order ID: {sessionId}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-8 text-center">
        {isGenerating ? (
          <div className="text-gray-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p>Generating your personalized plan...</p>
            <p className="text-sm mt-2">This usually takes 10-15 seconds</p>
          </div>
        ) : pdfUrl ? (
          <div>
            <a
              href={pdfUrl}
              download={`ai-resilience-plan-${responseId}.pdf`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Your AI-Resilience Plan
            </a>
            <p className="text-sm text-gray-600 mt-3">
              PDF includes your 90-day action plan, tool recommendations, and positioning strategies
            </p>
          </div>
        ) : (
          <div className="text-gray-600">
            <p>PDF generation in progress...</p>
          </div>
        )}
      </div>

      {/* Success tips */}
      {pdfUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🚀 Quick Start Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">1.</span>
              <span>Start with the Week 1 workflow audit—document your current tasks today</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">2.</span>
              <span>Pick one AI tool from the recommendations and create an account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">3.</span>
              <span>Update your LinkedIn headline using the positioning strategies</span>
            </li>
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This is an informational estimate of task automation exposure, 
          not a prediction of individual job loss. Actual impact varies by employer adoption.
        </p>
      </div>

      {/* Guarantee */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          <strong>7-day refund guarantee</strong> — no questions asked
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Reply to your receipt email for refund requests
        </p>
      </div>
    </div>
  )
}