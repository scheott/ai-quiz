// ==========================================
// components/EmailCapture.tsx (FIXED)
// ==========================================

'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

interface EmailCaptureProps {
  responseId: string
  insights: string[]
  jobTitle: string
  industry: string
  riskLow: number
  riskHigh: number
  token?: string // Add token prop
}

export default function EmailCapture({ 
  responseId, 
  insights, 
  jobTitle, 
  industry, 
  riskLow, 
  riskHigh,
  token 
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          responseId,
          insights,
          jobTitle,
          industry,
          riskLow,
          riskHigh,
          token // Include token for stateless flow
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Track email capture event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'email_capture_submit', {
            event_category: 'engagement',
            response_id: responseId
          })
        }
      } else {
        console.error('Email capture failed')
        alert('Failed to send email. Please try again.')
      }
    } catch (error) {
      console.error('Email capture error:', error)
      alert('Failed to send email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Check className="w-5 h-5 text-green-600" />
        <span className="text-green-800">Free summary sent to your email!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <label htmlFor="email-input" className="sr-only">
        Email address for free summary
      </label>
      <div className="flex gap-2">
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Send me the free summary"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={!email || isSubmitting}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send free summary"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Mail className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  )
}