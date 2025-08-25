// ==========================================
// app/api/webhooks/stripe/route.ts (UPDATED)
// ==========================================

import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { sendReceiptEmail } from '@/lib/email-sender'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('No Stripe signature found')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe() // This will throw if not configured
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err: unknown) {
    const error = err as Error
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`Received Stripe webhook: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleSuccessfulPayment(session)
        break
      }
      
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleExpiredSession(session)
        break
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleFailedPayment(invoice)
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ 
      error: 'Webhook processing failed' 
    }, { 
      status: 500 
    })
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const responseId = session.metadata?.response_id
  const customerEmail = session.customer_details?.email
  
  if (!responseId || !customerEmail) {
    console.error('Missing required data in session:', { responseId, customerEmail })
    return
  }

  console.log(`Processing successful payment for response ${responseId}`)

  try {
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        customer_email: customerEmail,
        stripe_customer_id: session.customer as string,
        updated_at: new Date().toISOString()
      })
      .eq('provider_checkout_id', session.id)

    if (orderError) {
      console.error('Failed to update order:', orderError)
    }

    const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responseId })
    })

    let pdfUrl = null
    if (pdfResponse.ok) {
      const contentType = pdfResponse.headers.get('content-type')
      
      if (contentType?.includes('application/json')) {
        const pdfData = await pdfResponse.json()
        pdfUrl = pdfData.pdfUrl
      } else {
        console.log('PDF generated successfully')
        pdfUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/pdf?rid=${responseId}`
      }
    } else {
      console.error('PDF generation failed:', await pdfResponse.text())
    }

    if (pdfUrl) {
      const emailResult = await sendReceiptEmail({
        to: customerEmail,
        orderId: responseId,
        pdfUrl,
        amount: 7.00
      })

      if (!emailResult.success) {
        console.error('Failed to send receipt email:', emailResult.error)
      }
    }

  } catch (error) {
    console.error('Error processing successful payment:', error)
  }
}

async function handleExpiredSession(session: Stripe.Checkout.Session) {
  const responseId = session.metadata?.response_id
  
  if (responseId) {
    await supabase
      .from('orders')
      .update({ status: 'expired' })
      .eq('provider_checkout_id', session.id)
  }
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  const responseId = invoice.metadata?.response_id
  
  if (responseId) {
    await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('response_id', responseId)
  }
}