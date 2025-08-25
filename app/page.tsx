// ==========================================
// app/page.tsx (Landing Page)
// ==========================================

import Link from 'next/link'
import { ArrowRight, Brain, Shield, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Will AI disrupt your job in 3 years?
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Task-based, science-informed estimate—plus a personalized plan to stay ahead.
        </p>
        <Link 
          href="/quiz"
          className="btn-primary text-lg inline-flex items-center gap-2"
        >
          Start the 60-second quiz
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Science-Based</h3>
          <p className="text-gray-600">Based on task analysis and industry adoption patterns</p>
        </div>
        <div className="text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Personalized Plan</h3>
          <p className="text-gray-600">Get a custom 7-step resilience strategy for your role</p>
        </div>
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Stay Ahead</h3>
          <p className="text-gray-600">90-day action plan to future-proof your career</p>
        </div>
      </div>

      {/* Secondary CTA */}
      <div className="text-center">
        <Link 
          href="/methodology"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Learn about our methodology →
        </Link>
      </div>
    </div>
  )
}