// ==========================================
// app/api/score/route.ts (BUILD-SAFE)
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { scoreQuiz } from '@/lib/scoring'
import { generateInsights } from '@/lib/insights'
import { encodeResult } from '@/lib/token'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { jobTitle, industry, answers } = data

    // Validate input
    if (!jobTitle || !industry || !Array.isArray(answers) || answers.length !== 9) {
      return NextResponse.json({ 
        error: 'Invalid input data' 
      }, { status: 400 })
    }

    // Calculate risk score
    const scores = scoreQuiz(answers, industry)
    
    // Generate insights
    const insights = generateInsights(answers, scores)

    // Try to save to Supabase if available
    let responseId = `temp_${Date.now()}`
    
    try {
      const { supabase } = await import('@/lib/supabase')
      const { data: response, error } = await supabase
        .from('responses')
        .insert({
          job_title: jobTitle,
          industry: industry,
          answers: answers,
          exposure: scores.exposure,
          adoption: scores.adoption,
          p3y_low: scores.p3y_low,
          p3y_high: scores.p3y_high,
          ua: request.headers.get('user-agent')
        })
        .select()
        .single()

      if (!error && response) {
        responseId = response.id
      }
    } catch (error) {
      console.warn('Could not save to database:', error)
    }

    // Create stateless token for immediate results
    const token = encodeResult({
      jobTitle,
      industry,
      answers,
      exposure: scores.exposure,
      adoption: scores.adoption,
      p3y_low: scores.p3y_low,
      p3y_high: scores.p3y_high
    })

    return NextResponse.json({
      responseId,
      token,
      ...scores,
      insights: insights.free
    })

  } catch (error) {
    console.error('Score calculation error:', error)
    return NextResponse.json({ 
      error: 'Failed to calculate score' 
    }, { status: 500 })
  }
}