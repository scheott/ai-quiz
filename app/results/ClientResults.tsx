// ==========================================
// app/results/ClientResults.tsx (FIXED)
// ==========================================

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Share2, Download } from 'lucide-react'
import BlurredList from '@/components/BlurredList'
import ShareCard from '@/components/ShareCard'
import EmailCapture from '@/components/EmailCapture'
import AdSlot from '@/components/AdSlot'
import { decodeResult } from '@/lib/token'
import { generateInsights } from '@/lib/insights'

interface ResultData {
  p3y_low: number
  p3y_high: number
  insights: string[]
  responseId: string
  jobTitle: string
  industry: string
}

interface ClientResultsProps {
  token?: string
  rid?: string
}

export default function ClientResults({ token, rid }: ClientResultsProps) {
  const [result, setResult] = useState<ResultData | null>(null)
  const [showShare, setShowShare] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isBuying, setIsBuying] = useState(false)

  useEffect(() => {
    const loadResults = async () => {
      // Try token first (stateless, fast)
      if (token) {
        const decoded = decodeResult(token)
        if (decoded) {
          const insights = generateInsights(decoded.answers, {
            exposure: decoded.exposure,
            adoption: decoded.adoption,
            p3y_low: decoded.p3y_low,
            p3y_high: decoded.p3y_high
          })

          setResult({
            p3y_low: decoded.p3y_low,
            p3y_high: decoded.p3y_high,
            insights: insights.free,
            responseId: rid || 'stateless',
            jobTitle: decoded.jobTitle,
            industry: decoded.industry
          })
          setIsLoading(false)
          
          // Track results view (fixed)
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'results_view', {
              event_category: 'quiz',
              risk_band: `${decoded.p3y_low}-${decoded.p3y_high}`
            })
          }
          return
        }
      }

      // Fall back to API fetch if token invalid or using rid
      if (rid) {
        try {
          const response = await fetch(`/api/result?rid=${rid}`)
          if (response.ok) {
            const data = await response.json()
            setResult(data)
          } else {
            console.error('Failed to fetch results')
          }
        } catch (error) {
          console.error('Error fetching results:', error)
        }
      }

      setIsLoading(false)
    }

    loadResults()
  }, [token, rid])

  const handleBuy = async () => {
    if (!result || isBuying) return
    
    setIsBuying(true)
    
    // Track checkout attempt (fixed)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'checkout_open', {
        event_category: 'ecommerce',
        response_id: result.responseId
      })
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-token': token || ''
        },
        body: JSON.stringify({ 
          responseId: result.responseId
        })
      })

      const data = await response.json()
      
      if (data.url) {
        // Track successful checkout creation (fixed)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'begin_checkout', {
            event_category: 'ecommerce',
            currency: 'USD',
            value: 7.00
          })
        }
        
        window.location.href = data.url
      } else {
        console.error('No checkout URL received:', data)
        alert('Failed to create checkout session. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsBuying(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Results not found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your quiz results.</p>
          <Link href="/quiz" className="btn-primary">
            Take the Quiz Again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div aria-live="polite" className="sr-only">
          Your automation disruption risk results are ready
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Your 3-Year Automation Disruption Risk: {result.p3y_low}%–{result.p3y_high}%
        </h1>
        <p className="text-gray-600">
          Based on your tasks + industry adoption{' '}
          <Link href="/methodology" className="text-blue-600 hover:underline">
            (see Methodology)
          </Link>
        </p>
      </div>

      {/* Free Insights */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Free Insights</h2>
        <ul className="space-y-3">
          {result.insights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                {i + 1}
              </span>
              <span className="text-gray-700">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Blurred Plan Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Personalized AI-Resilience Plan</h2>
        <BlurredList />
        
        <div className="text-center mt-6 space-y-4">
          <button 
            onClick={handleBuy}
            disabled={isBuying}
            aria-live="polite"
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isBuying ? 'Creating checkout...' : 'Unlock my personalized plan — $7'}
          </button>
          
          <EmailCapture
            responseId={result.responseId}
            insights={result.insights}
            jobTitle={result.jobTitle}
            industry={result.industry}
            riskLow={result.p3y_low}
            riskHigh={result.p3y_high}
            token={token}
          />
        </div>
      </div>

      {/* Share Section */}
      <div className="sticky bottom-4 bg-white rounded-lg p-4 shadow-lg border">
        <button
          onClick={() => {
            setShowShare(!showShare)
            // Track share click (fixed)
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'share_click', {
                event_category: 'engagement'
              })
            }
          }}
          className="w-full btn-secondary flex items-center justify-center gap-2"
          aria-label="Share my risk assessment results"
        >
          <Share2 className="w-4 h-4" />
          Share my risk band
        </button>
        {showShare && <ShareCard riskBand={`${result.p3y_low}%–${result.p3y_high}%`} />}
      </div>

      {/* Desktop Ad Slot */}
      <div className="hidden md:block mt-8">
        <AdSlot id="results-sidebar" />
      </div>

      {/* Mobile Footer Ad */}
      <div className="md:hidden mt-8">
        <AdSlot id="results-footer" />
      </div>
    </div>
  )
}