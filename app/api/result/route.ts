// ==========================================
// app/api/result/route.ts (FIXED - DYNAMIC ROUTE)
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { scoreQuiz } from '@/lib/scoring'
import { generateInsights } from '@/lib/insights'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const responseId = searchParams.get('rid')

    if (!responseId) {
      return NextResponse.json({ error: 'Response ID required' }, { status: 400 })
    }

    // Try to fetch from database if available
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: response, error } = await supabase
        .from('responses')
        .select('*')
        .eq('id', responseId)
        .single()

      if (!error && response) {
        // Recalculate scores to ensure consistency
        const scores = scoreQuiz(response.answers, response.industry)
        const insights = generateInsights(response.answers, scores)

        return NextResponse.json({
          responseId,
          jobTitle: response.job_title,
          industry: response.industry,
          ...scores,
          insights: insights.free
        })
      }
    } catch (error) {
      console.warn('Database not available:', error)
    }

    // Mock response for development/build
    const mockResponse = {
      id: responseId,
      job_title: 'Marketing Manager',
      industry: 'technology',
      answers: [2, 3, 1, 3, 2, 2, 1, 3, 2] // Sample answers
    }

    const scores = scoreQuiz(mockResponse.answers, mockResponse.industry)
    const insights = generateInsights(mockResponse.answers, scores)

    return NextResponse.json({
      responseId,
      jobTitle: mockResponse.job_title,
      industry: mockResponse.industry,
      ...scores,
      insights: insights.free
    })

  } catch (error) {
    console.error('Result fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 })
  }
}
