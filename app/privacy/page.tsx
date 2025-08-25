// ==========================================
// app/privacy/page.tsx (Updated with correct email)
// ==========================================

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <p className="text-sm text-gray-600 mb-6">
          <strong>Last updated:</strong> August 23, 2025
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us when using willaitakemyjobquiz.com:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Quiz Responses:</strong> Your job title, industry, and answers to our 9 assessment questions</li>
            <li><strong>Contact Information:</strong> Email address (when you choose to provide it)</li>
            <li><strong>Payment Information:</strong> Processed securely through Stripe (we don't store payment details)</li>
            <li><strong>Technical Information:</strong> IP address, browser type, and usage analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Calculate your automation disruption exposure and risk assessment</li>
            <li>Generate personalized insights and recommendations</li>
            <li>Send you your quiz results and purchased AI-Resilience Plan</li>
            <li>Provide customer support and respond to your inquiries</li>
            <li>Improve our service through anonymous analytics</li>
            <li>Send follow-up emails with additional insights (only if you provide your email)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Information Sharing</h2>
          <p className="mb-4">
            <strong>We do not sell, trade, or otherwise transfer your personal information to third parties.</strong> 
            We may share information only in these limited circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> Trusted partners like Stripe (payments), Supabase (database), and Resend (email delivery)</li>
            <li><strong>Aggregated Data:</strong> Anonymous, aggregated statistics for research purposes</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, 
            please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email:</strong> willaitakemyjobquiz@gmail.com</p>
            <p><strong>Website:</strong> willaitakemyjobquiz.com</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
          </div>
        </section>
      </div>
    </div>
  )
}