// ==========================================
// app/methodology/page.tsx
// ==========================================

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Methodology</h1>

      <div className="space-y-8">
        <p className="text-lg text-gray-600">
          Our assessment combines task-based analysis with industry adoption patterns 
          to estimate automation disruption exposure over a 3-year timeframe.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-4">9-Question Task Exposure Model</h2>
          <p className="mb-4">
            We analyze your role across nine dimensions that correlate with automation exposure:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Repetitive vs. creative task balance</li>
            <li>Predictability of daily work</li>
            <li>Requirements for human interaction</li>
            <li>Use of specialized knowledge</li>
            <li>Need for emotional intelligence</li>
            <li>Physical dexterity requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Industry Adoption Factor</h2>
          <p>
            Different industries adopt automation at varying speeds. We adjust exposure estimates 
            based on your industry's historical and projected AI adoption patterns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Risk Band Calculation</h2>
          <p>
            We use a logistic transformation to convert task exposure and industry factors 
            into a realistic probability range. This prevents extreme predictions while 
            maintaining sensitivity to meaningful differences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Limitations</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>This is an estimate of task automation potential, not job displacement certainty</li>
            <li>Individual employer adoption varies significantly</li>
            <li>New roles and human-AI collaboration models may emerge</li>
            <li>Regulatory and social factors may slow adoption</li>
          </ul>
        </section>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-800">
            <strong>Remember:</strong> This assessment is designed to help you prepare and adapt, 
            not to predict the future with certainty. Use it as a starting point for career planning 
            and skill development.
          </p>
        </div>
      </div>
    </div>
  )
}