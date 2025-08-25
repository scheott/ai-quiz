// ==========================================
// app/api/email-capture/route.ts (FIXED)
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { sendFreeInsightsEmail } from '@/lib/email-sender'
import { decodeResult } from '@/lib/token'

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      responseId, 
      insights, 
      jobTitle, 
      industry, 
      riskLow, 
      riskHigh,
      token 
    } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    console.log('Email capture request:', { email, responseId, jobTitle })

    // Try to save to database if we have a real response ID
    if (responseId && responseId !== 'stateless') {
      try {
        const { supabase } = await import('@/lib/supabase')
        const { error: updateError } = await supabase
          .from('responses')
          .update({ email })
          .eq('id', responseId)

        if (updateError) {
          console.error('Failed to update response with email:', updateError)
        } else {
          console.log('Successfully saved email to database')
        }
      } catch (error) {
        console.error('Database error:', error)
      }
    }

    // For stateless flow, try to create a new record with the decoded data
    if (responseId === 'stateless' && token) {
      try {
        const decoded = decodeResult(token)
        if (decoded) {
          const { supabase } = await import('@/lib/supabase')
          const { data: newResponse, error } = await supabase
            .from('responses')
            .insert({
              job_title: decoded.jobTitle,
              industry: decoded.industry,
              answers: decoded.answers,
              exposure: decoded.exposure,
              adoption: decoded.adoption,
              p3y_low: decoded.p3y_low,
              p3y_high: decoded.p3y_high,
              email: email
            })
            .select()
            .single()

          if (!error && newResponse) {
            console.log('Created new response record with email:', newResponse.id)
          }
        }
      } catch (error) {
        console.error('Failed to create new response record:', error)
      }
    }

    // Send email with insights
    const resultsUrl = responseId && responseId !== 'stateless' 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/results?rid=${responseId}`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/results?t=${token}`

    const emailResult = await sendFreeInsightsEmail({
      to: email,
      jobTitle: jobTitle || 'Professional',
      industry: industry || 'Various',
      riskLow: riskLow || 30,
      riskHigh: riskHigh || 50,
      insights: insights || ['Develop AI collaboration skills', 'Focus on human-edge capabilities', 'Build strategic relationships'],
      resultsUrl
    })

    if (!emailResult.success) {
      console.error('Failed to send insights email:', emailResult.error)
      
      // For development, still return success
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: treating email failure as success')
        return NextResponse.json({ 
          success: true, 
          note: 'Email would have been sent in production' 
        })
      }
      
      return NextResponse.json({ 
        error: 'Failed to send email' 
      }, { status: 500 })
    }

    console.log('Email sent successfully')
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Email capture error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
