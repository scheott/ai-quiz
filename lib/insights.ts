// ==========================================
// lib/insights.ts (FIXED TYPES)
// ==========================================

interface ScoresData {
  exposure: number
  adoption: number
  p3y_low: number
  p3y_high: number
}

interface InsightsResult {
  free: string[]
  premium: string[]
}

export function generateInsights(answers: number[], scores: ScoresData): InsightsResult {
  const insights: string[] = []

  // Analysis based on answers
  if (answers[0] >= 3) { // High repetitive tasks
    insights.push("Focus on developing creative problem-solving skills that AI struggles with")
  }

  if (answers[2] <= 2) { // Low face-to-face interaction
    insights.push("Build stronger relationships with clients and colleagues—human connection is your edge")
  }

  if (answers[4] <= 2) { // Low specialized knowledge use
    insights.push("Invest in learning specialized skills or certifications in your field")
  }

  if (answers[6] <= 2) { // Low emotional intelligence requirement
    insights.push("Develop your emotional intelligence and interpersonal skills")
  }

  // Default insights if we don't have enough specific ones
  const defaultInsights: string[] = [
    "Learn to work alongside AI tools rather than being replaced by them",
    "Focus on tasks that require human judgment and creativity",
    "Build a network of relationships that value human expertise",
    "Continuously update your skills to stay ahead of automation"
  ]

  // Ensure we have exactly 3 insights
  while (insights.length < 3) {
    const remaining = defaultInsights.filter(insight => !insights.includes(insight))
    if (remaining.length > 0) {
      insights.push(remaining[0])
    } else {
      break
    }
  }

  return {
    free: insights.slice(0, 3),
    premium: [
      "Week 1-4: Complete workflow audit and AI tool integration plan",
      "Week 5-8: Develop your unique human-edge competitive advantages", 
      "Week 9-12: Position yourself as an AI-savvy leader in your organization",
      "90-day strategic positioning roadmap",
      "Resume and LinkedIn optimization templates",
      "Interview preparation for AI-enhanced roles",
      "Networking scripts for industry connections"
    ]
  }
}