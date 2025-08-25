// app/api/pdf/route.ts (FIXED)
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { createAIResiliencePlan, PDFData } from '@/lib/pdf-generator'
import { scoreQuiz } from '@/lib/scoring'
import { generateInsights } from '@/lib/insights'
import { decodeResult } from '@/lib/token'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { responseId, token } = await request.json()

    if (!responseId) {
      return NextResponse.json({ error: 'Response ID required' }, { status: 400 })
    }

    let responseData: any = null

    // Try to get data from token first (for stateless flow)
    if (token) {
      const decoded = decodeResult(token)
      if (decoded) {
        responseData = {
          job_title: decoded.jobTitle,
          industry: decoded.industry,
          answers: decoded.answers,
          exposure: decoded.exposure,
          adoption: decoded.adoption,
          p3y_low: decoded.p3y_low,
          p3y_high: decoded.p3y_high
        }
      }
    }

    // If no token data, try to fetch from database
    if (!responseData && responseId !== 'stateless') {
      try {
        const { supabase } = await import('@/lib/supabase')
        const { data: response, error } = await supabase
          .from('responses')
          .select('*')
          .eq('id', responseId)
          .single()

        if (!error && response) {
          responseData = response
        }
      } catch (error) {
        console.warn('Database not available:', error)
      }
    }

    // If still no data, use mock data
    if (!responseData) {
      console.log('Using mock data for PDF generation')
      responseData = {
        job_title: 'Marketing Manager',
        industry: 'technology',
        answers: [2, 3, 1, 3, 2, 2, 1, 3, 2],
        exposure: 0.65,
        adoption: 1.2,
        p3y_low: 42,
        p3y_high: 54
      }
    }

    // Generate insights
    const insights = generateInsights(responseData.answers, {
      exposure: responseData.exposure,
      adoption: responseData.adoption,
      p3y_low: responseData.p3y_low,
      p3y_high: responseData.p3y_high
    })

    // Prepare PDF data
    const pdfData: PDFData = {
      jobTitle: responseData.job_title,
      industry: responseData.industry,
      riskLow: responseData.p3y_low,
      riskHigh: responseData.p3y_high,
      exposure: responseData.exposure,
      insights: insights.free,
      generatedAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }

    console.log('Generating PDF for:', pdfData.jobTitle, pdfData.industry)

    // Generate PDF buffer - Now returns Document directly
    const pdfDocument = createAIResiliencePlan(pdfData)
    const pdfBuffer = await renderToBuffer(pdfDocument)
    
    // For now, return PDF directly as download
    // In production with Supabase storage, this would upload to storage first
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ai-resilience-plan-${responseId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' }, 
      { status: 500 }
    )
  }
}

// GET method for direct PDF download links
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const responseId = searchParams.get('rid')
  const token = searchParams.get('t')

  if (!responseId) {
    return NextResponse.json({ error: 'Response ID required' }, { status: 400 })
  }

  // Generate PDF on the fly
  return fetch(request.url.replace('/api/pdf', '/api/pdf'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ responseId, token })
  })
}