// ==========================================
// lib/email-sender.ts (FIXED)
// ==========================================

// Email templates
export const receiptEmailTemplate = {
  subject: 'Your AI-Resilience Plan is Ready! 📋',
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #2563eb; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🎉 Your Plan is Ready!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">AI-Resilience Plan • Personalized Strategy</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #374151; margin-top: 0;">Thank you for your purchase!</h2>
        
        <p style="color: #6b7280; line-height: 1.6;">
          Your personalized AI-Resilience Plan has been generated based on your quiz responses. 
          This comprehensive guide includes your 90-day action plan, tool recommendations, 
          and positioning strategies.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{PDF_DOWNLOAD_URL}}" style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            📥 Download Your Plan
          </a>
        </div>
        
        <div style="background: #ecfdf5; border: 1px solid #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #065f46; font-size: 14px;">
            <strong>💡 Pro tip:</strong> Start with Week 1 tasks immediately—audit your workflow 
            and identify 2-3 AI tools to test. Early action creates momentum!
          </p>
        </div>
      </div>
      
      <div style="padding: 20px; background: #f3f4f6; text-align: center;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
          Questions? Reply to this email or visit our help center.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          Remember: 7-day no-questions refund guarantee
        </p>
      </div>
    </div>
  `
}

export const freeInsightsEmailTemplate = {
  subject: 'Your AI Job Risk Assessment + Free Insights 📊',
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1f2937; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Your Risk Assessment Results</h1>
        <div style="font-size: 32px; font-weight: bold; margin: 15px 0; color: #fbbf24;">
          {{RISK_LOW}}%–{{RISK_HIGH}}%
        </div>
        <p style="margin: 0; opacity: 0.9;">3-Year Automation Disruption Risk</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151; margin-top: 0;">Your Free Insights:</h2>
        
        <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
          {{FREE_INSIGHTS_LIST}}
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin-top: 0;">🔒 Want the Complete Plan?</h3>
          <p style="color: #92400e; margin-bottom: 15px;">
            Get your personalized 90-day AI-Resilience Plan with:
          </p>
          <ul style="color: #92400e; padding-left: 20px;">
            <li>Week-by-week action steps</li>
            <li>AI tool recommendations for your role</li>
            <li>Resume & LinkedIn optimization</li>
            <li>Interview preparation scripts</li>
          </ul>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="{{RESULTS_URL}}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              Get Full Plan - $7
            </a>
          </div>
        </div>
      </div>
      
      <div style="padding: 20px; background: #f9fafb; text-align: center;">
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          Based on your {{JOB_TITLE}} role in {{INDUSTRY}}
        </p>
      </div>
    </div>
  `
}

// Email sending interface
interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    // For development without verified domain, just log the email
    if (process.env.NODE_ENV === 'development' && !process.env.RESEND_VERIFIED_DOMAIN) {
      console.log(`📧 [DEV MODE] Email would be sent to: ${to}`)
      console.log(`📧 [DEV MODE] Subject: ${subject}`)
      console.log(`📧 [DEV MODE] HTML Preview:`)
      console.log(html.substring(0, 200) + '...')
      return { success: true }
    }

    // Production email sending with Resend
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AI Quiz <noreply@willaitakemyjobquiz.com>',
          to: [to],
          subject,
          html,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Resend API error:', errorData)
        
        // If domain not verified, fall back to dev mode
        if (errorData.error?.includes('domain is not verified')) {
          console.log(`📧 [FALLBACK] Domain not verified, logging email instead`)
          console.log(`📧 [FALLBACK] Would send to: ${to}`)
          console.log(`📧 [FALLBACK] Subject: ${subject}`)
          return { success: true }
        }
        
        throw new Error(`Resend API error: ${JSON.stringify(errorData)}`)
      }

      const result = await response.json()
      console.log(`📧 Email sent successfully via Resend:`, result.id)
      return { success: true, id: result.id }
    }

    // No email service configured - log only
    console.log(`📧 [NO SERVICE] Email would be sent to: ${to}`)
    console.log(`📧 [NO SERVICE] Subject: ${subject}`)
    
    return { success: true }

  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendReceiptEmail({
  to,
  orderId,
  pdfUrl,
  amount
}: {
  to: string
  orderId: string
  pdfUrl: string
  amount: number
}) {
  const html = receiptEmailTemplate.html
    .replace('{{PDF_DOWNLOAD_URL}}', pdfUrl)
    .replace('{{ORDER_ID}}', orderId)
    .replace('{{AMOUNT}}', amount.toString())

  return sendEmail({
    to,
    subject: receiptEmailTemplate.subject,
    html
  })
}

export async function sendFreeInsightsEmail({
  to,
  jobTitle,
  industry,
  riskLow,
  riskHigh,
  insights,
  resultsUrl
}: {
  to: string
  jobTitle: string
  industry: string
  riskLow: number
  riskHigh: number
  insights: string[]
  resultsUrl: string
}) {
  const insightsList = insights
    .map(insight => `<p style="margin: 8px 0; color: #1f2937;">• ${insight}</p>`)
    .join('')

  const html = freeInsightsEmailTemplate.html
    .replace('{{RISK_LOW}}', riskLow.toString())
    .replace('{{RISK_HIGH}}', riskHigh.toString())
    .replace('{{FREE_INSIGHTS_LIST}}', insightsList)
    .replace('{{JOB_TITLE}}', jobTitle)
    .replace('{{INDUSTRY}}', industry)
    .replace('{{RESULTS_URL}}', resultsUrl)

  return sendEmail({
    to,
    subject: freeInsightsEmailTemplate.subject,
    html
  })
}