// ==========================================
// app/refund/page.tsx
// ==========================================

import Link from 'next/link'

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
      
      <div className="space-y-8 text-gray-700">
        <p className="text-sm text-gray-600 mb-6">
          <strong>Last updated:</strong> August 23, 2025
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-3">7-Day No-Questions Refund Guarantee</h2>
          <p className="text-green-700">
            We're confident you'll find value in your AI-Resilience Plan. If you're not completely 
            satisfied for any reason, we offer a full refund within 7 days of purchase—no questions asked.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Refund Eligibility</h2>
          <p className="mb-4">You are eligible for a full refund if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You request the refund within <strong>7 days</strong> of your purchase date</li>
            <li>You purchased the AI-Resilience Plan ($7.00)</li>
            <li>You provide your order confirmation or session ID</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">2. How to Request a Refund</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">Easy Refund Process:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-blue-700">
              <li>Reply to your purchase receipt email, OR</li>
              <li>Send an email to <strong>willaitakemyjobquiz@gmail.com</strong></li>
              <li>Include "Refund Request" in the subject line</li>
              <li>Include your order ID or Stripe session ID</li>
            </ol>
          </div>
          
          <p className="mb-4">
            <strong>What to include in your refund request:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your email address used for the purchase</li>
            <li>Order confirmation number (if available)</li>
            <li>Stripe session ID (found in your receipt email)</li>
            <li>Purchase date</li>
          </ul>

          <p className="mt-4 text-sm text-gray-600">
            <strong>Note:</strong> No explanation required! We honor our no-questions policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">3. Refund Processing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Response Time:</strong> We'll acknowledge your refund request within 24 hours</li>
            <li><strong>Processing Time:</strong> Refunds are processed within 2-3 business days</li>
            <li><strong>Refund Method:</strong> Refunds are issued to your original payment method</li>
            <li><strong>Bank Processing:</strong> It may take 3-5 additional business days for the refund to appear in your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">4. What Happens After Refund</h2>
          <p className="mb-4">After processing your refund:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your access to the AI-Resilience Plan PDF will remain active (we don't revoke digital downloads)</li>
            <li>You'll receive a refund confirmation email</li>
            <li>No further action is required from you</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Free Quiz Results</h2>
          <p>
            The free quiz results and insights you receive before purchase are always free and 
            don't require any refund process. Only the paid AI-Resilience Plan ($7) is subject 
            to this refund policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">6. Technical Issues</h2>
          <p className="mb-4">
            If you experience technical difficulties downloading your plan or accessing your purchase:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email us immediately at willaitakemyjobquiz@gmail.com</li>
            <li>We'll resolve technical issues quickly, usually within a few hours</li>
            <li>Technical problems don't count against your 7-day refund window</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Contact Us</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-4">
              <strong>Questions about our refund policy?</strong>
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> willaitakemyjobquiz@gmail.com</p>
              <p><strong>Subject Line:</strong> "Refund Question" or "Refund Request"</p>
              <p><strong>Response Time:</strong> Within 24 hours</p>
            </div>
          </div>
        </section>

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mt-8">
          <p className="text-sm text-gray-600">
            <strong>Our Commitment:</strong> We stand behind our product and want you to be completely 
            satisfied. Our generous refund policy reflects our confidence in delivering value 
            and our commitment to customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  )
}
