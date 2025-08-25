// ==========================================
// app/api/checkout/route.ts (SIMPLIFIED FOR BUILD)
// ==========================================

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { responseId } = await request.json()

    if (!responseId) {
      return NextResponse.json({ error: 'Response ID required' }, { status: 400 })
    }

    console.log('🔧 Environment check:')
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    console.log('- STRIPE_SKIP_FOR_DEV:', process.env.STRIPE_SKIP_FOR_DEV)

    // Always use development mode during build or when explicitly set
    const isDevelopment = !process.env.STRIPE_SECRET_KEY || 
                         process.env.STRIPE_SKIP_FOR_DEV === 'true' ||
                         !process.env.STRIPE_PRICE_ID

    if (isDevelopment) {
      console.log('🧪 DEVELOPMENT MODE: Skipping real Stripe checkout')
      
      // Simulate successful checkout creation
      const mockSessionId = `dev_session_${Date.now()}`
      const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/thank-you?rid=${responseId}&session_id=${mockSessionId}`
      
      // Try to save mock order to database if Supabase is available
      try {
        const { supabase } = await import('@/lib/supabase')
        await supabase.from('orders').insert({
          response_id: responseId,
          provider: 'stripe',
          price_cents: 700,
          status: 'pending',
          provider_checkout_id: mockSessionId
        })
        console.log('✅ Mock order saved')
      } catch (error) {
        console.log('⚠️ Could not save mock order:', error)
      }

      return NextResponse.json({ 
        url: successUrl,
        sessionId: mockSessionId,
        dev: true
      })
    }

    // Real Stripe integration (only when properly configured)
    console.log('💳 PRODUCTION MODE: Creating real Stripe checkout')
    
    const { getStripe, PRICE_ID } = await import('@/lib/stripe')
    const { supabase } = await import('@/lib/supabase')
    
    const stripe = getStripe()

    if (!PRICE_ID) {
      return NextResponse.json({ 
        error: 'Stripe price ID not configured' 
      }, { status: 500 })
    }

    const price = await stripe.prices.retrieve(PRICE_ID)
    console.log(`Creating checkout for $${price.unit_amount!/100}`)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?rid=${responseId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/results?rid=${responseId}`,
      metadata: { response_id: responseId },
      customer_creation: 'always'
    })

    try {
      await supabase.from('orders').insert({
        response_id: responseId,
        provider: 'stripe',
        price_cents: price.unit_amount,
        status: 'pending',
        provider_checkout_id: session.id
      })
    } catch (error) {
      console.error('Failed to create order record:', error)
    }

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    })

  } catch (error: any) {
    console.error('Checkout creation error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to create checkout session' 
    }, { status: 500 })
  }
}
