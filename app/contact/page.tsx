// ==========================================
// app/contact/page.tsx
// ==========================================

import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
      
      <div className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Get in Touch</h2>
          <p className="text-blue-800 mb-4">
            We're here to help! Whether you have questions about your results, need technical support, 
            or want to request a refund, we typically respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Email Support</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700">Primary Contact</p>
                <p className="text-blue-600">willaitakemyjobquiz@gmail.com</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Response Time</p>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Business Hours</p>
                <p className="text-gray-600">Monday-Friday, 9 AM - 6 PM EST</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Help</h3>
            <div className="space-y-3">
              <div>
                <Link href="/methodology" className="text-blue-600 hover:underline font-medium">
                  Methodology & FAQ
                </Link>
                <p className="text-gray-600 text-sm">Learn how our assessment works</p>
              </div>
              <div>
                <Link href="/refund" className="text-blue-600 hover:underline font-medium">
                  Refund Policy
                </Link>
                <p className="text-gray-600 text-sm">7-day no-questions guarantee</p>
              </div>
              <div>
                <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
                <p className="text-gray-600 text-sm">How we handle your data</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Reasons to Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔄 Refund Requests</h3>
              <p className="text-gray-600 text-sm mb-3">
                Need a refund? Just reply to your receipt email or contact us directly. 
                Include your order ID for faster processing.
              </p>
              <p className="text-blue-600 text-sm font-medium">
                Subject: "Refund Request"
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🛠️ Technical Issues</h3>
              <p className="text-gray-600 text-sm mb-3">
                Can't download your PDF? Email not received? We'll resolve technical 
                problems quickly.
              </p>
              <p className="text-blue-600 text-sm font-medium">
                Subject: "Technical Support"
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">❓ Questions About Results</h3>
              <p className="text-gray-600 text-sm mb-3">
                Want to understand your risk assessment better? Have questions about 
                the methodology? We're happy to explain.
              </p>
              <p className="text-blue-600 text-sm font-medium">
                Subject: "Assessment Question"
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">💼 Business Inquiries</h3>
              <p className="text-gray-600 text-sm mb-3">
                Interested in partnerships, bulk assessments for your organization, 
                or media inquiries? Let's talk.
              </p>
              <p className="text-blue-600 text-sm font-medium">
                Subject: "Business Inquiry"
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-3">What to Include in Your Email</h2>
          <p className="text-green-700 mb-4">
            To help us assist you quickly, please include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-green-700">
            <li>Your email address used for the quiz</li>
            <li>Order ID or session ID (if applicable)</li>
            <li>A clear description of your question or issue</li>
            <li>Any error messages you've encountered</li>
            <li>Your job title and industry (for assessment questions)</li>
          </ul>
        </div>

        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Take our 60-second quiz to discover your AI automation risk and get personalized insights.
          </p>
          <Link 
            href="/quiz" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Take the Quiz
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}