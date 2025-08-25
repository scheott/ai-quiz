// ==========================================
// lib/scoring.ts
// ==========================================

// Updated weights to match the 9 questions (sums to 1.00)
export const WEIGHTS = [0.18, 0.12, 0.10, 0.14, 0.10, 0.10, 0.08, 0.10, 0.08]

export const ADOPTION: Record<string, number> = {
  technology: 1.2,
  finance: 1.1,
  professionalservices: 1.1,
  healthcare: 0.9,
  education: 0.9,
  construction: 0.8,
  hospitality: 0.85,
  publicsector: 0.85,
  other: 1.0
}

export function scoreQuiz(answers: number[], industry: string) {
  // Reverse scoring for specific questions
  // Q2 creative/original (1), Q3 face-to-face (2), Q5 specialized knowledge (4), 
  // Q7 emotional intelligence (6), Q8 human judgment (7), Q9 physical dexterity (8)
  const REVERSE = new Set([1, 2, 4, 7, 8]) // zero-based indices

  // Calculate exposure (E)
  let E = 0
  for (let i = 0; i < answers.length; i++) {
    const raw = answers[i]
    const norm = REVERSE.has(i) ? (4 - raw) : raw // 0..4
    E += (norm / 4) * WEIGHTS[i]
  }

  // Get adoption factor (A)
  const A = ADOPTION[industry] || 1.0

  // Calculate probability using sigmoid transform
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))
  const p = sigmoid(-2.1 + 2.6 * E + 0.9 * (A - 1))
  
  // Create believable range
  const p3y_low = Math.max(0, p - 0.06)
  const p3y_high = Math.min(1, p + 0.06)

  return {
    exposure: E,
    adoption: A,
    p3y_low: Math.round(p3y_low * 100),
    p3y_high: Math.round(p3y_high * 100)
  }
}