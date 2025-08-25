
// ==========================================
// app/terms/page.tsx (FIXED)
// ==========================================

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="space-y-8 text-gray-700">
        <p className="text-sm text-gray-600 mb-6">
          <strong>Last updated:</strong> August 23, 2025
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using willaitakemyjobquiz.com (the "Service"), you accept and agree to be bound 
            by the terms and provision of this agreement. If you do not agree to abide by the above, 
            please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">2. Service Description</h2>
          <p className="mb-4">
            Will AI Take My Job Quiz provides an informational assessment of task automation exposure 
            based on your role and industry factors. The Service includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A 9-question assessment analyzing job automation exposure</li>
            <li>Personalized risk assessment results</li>
            <li>Free insights and recommendations</li>
            <li>Optional paid AI-Resilience Plan with detailed strategies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">3. Important Disclaimers</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="font-semibold text-yellow-800 mb-2">Educational and Informational Purposes Only</p>
            <p className="text-yellow-700">
              This assessment is an informational estimate of task automation exposure, 
              <strong> not a prediction of individual job loss</strong>. Actual impact varies significantly 
              by employer adoption, regulatory changes, economic factors, and the emergence of new roles.
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Not Career Advice:</strong> This Service does not provide professional career counseling or personalized career advice</li>
            <li><strong>No Employment Guarantees:</strong> We make no guarantees about employment outcomes or job security</li>
            <li><strong>Individual Results Vary:</strong> Your actual experience may differ significantly from the assessment results</li>
            <li><strong>Use Professional Judgment:</strong> Always consult with qualified career professionals for important career decisions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">4. Payment Terms</h2>
          <p className="mb-4">
            The AI-Resilience Plan is available for a one-time payment of $7.00 USD. Payment processing 
            is handled securely through Stripe.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All sales are processed in USD</li>
            <li>Payment is due immediately upon checkout</li>
            <li>Digital products are delivered via email and download link</li>
            <li>See our Refund Policy for refund terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by 
            Will AI Take My Job Quiz and are protected by international copyright, trademark, 
            patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">6. User Data and Privacy</h2>
          <p>
            Your privacy is important to us. Our collection and use of personal information 
            is governed by our Privacy Policy. By using the Service, you consent to the 
            collection and use of your information as outlined in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">7. Limitation of Liability</h2>
          <p>
            In no event shall Will AI Take My Job Quiz, nor its directors, employees, partners, 
            agents, suppliers, or affiliates, be liable for any indirect, incidental, special, 
            consequential, or punitive damages arising out of your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">8. Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed by the laws of the United States, 
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision 
            is material, we will provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>Email:</strong> willaitakemyjobquiz@gmail.com</p>
            <p><strong>Website:</strong> willaitakemyjobquiz.com</p>
          </div>
        </section>
      </div>
    </div>
  )
}