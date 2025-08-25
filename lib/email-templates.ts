// ==========================================
// lib/email-templates.ts (Bonus)
// ==========================================

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
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">What's included:</h3>
          <ul style="color: #6b7280; line-height: 1.6; padding-left: 20px;">
            <li>Your personalized 3-year risk assessment</li>
            <li>90-day milestone tracker with specific actions</li>
            <li>AI tool recommendations for your role</li>
            <li>Resume and LinkedIn optimization templates</li>
            <li>Interview preparation scripts</li>
            <li>Strategic positioning roadmap</li>
          </ul>
        </div>
        
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
              Get Full Plan - $9
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