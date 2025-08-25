// ==========================================
// components/BlurredList.tsx
// ==========================================

import { Lock } from 'lucide-react'

export default function BlurredList() {
  const planItems = [
    "Week 1: Audit your current workflow and identify AI-enhanceable tasks",
    "Week 2: Learn 3 AI tools specific to your role (with tutorials)",
    "Week 3: Develop your unique human-edge skills (creativity & emotional intelligence)",
    "Week 4: Build strategic relationships within your industry",
    "Week 8: Create a portfolio showcasing human-AI collaboration",
    "Week 10: Practice advanced problem-solving scenarios",
    "Week 12: Position yourself as an AI-savvy leader in your field"
  ]

  return (
    <div className="relative">
      <div className="space-y-3">
        {planItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              index < 3 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
              index < 3 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
            }`}>
              {index < 3 ? '✓' : index + 1}
            </div>
            <span className={`flex-1 ${index < 3 ? 'text-gray-700' : 'text-gray-400'}`}>
              {item}
            </span>
            {index >= 3 && <Lock className="w-4 h-4 text-gray-400 mt-0.5" />}
          </div>
        ))}
      </div>
      
      {/* Blur overlay for locked items */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>
    </div>
  )
}