// ==========================================
// app/quiz/QuizContent.tsx (NEW FILE - EXTRACTED FROM ORIGINAL)
// ==========================================

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import QuizStepper from '@/components/QuizStepper'
import ProgressBar from '@/components/ProgressBar'
import AdSlot from '@/components/AdSlot'

const quizSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  industry: z.string().min(1, 'Industry is required'),
  answers: z.array(z.number().int().min(-1).max(4)).length(9)
}).refine(data => data.answers.every(n => n >= 0), { 
  message: 'Please answer all questions', 
  path: ['answers'] 
})

type QuizData = z.infer<typeof quizSchema>

const QUESTIONS = [
  {
    id: 0,
    type: 'text',
    question: "What's your job title?",
    placeholder: "e.g., Marketing Manager, Software Engineer"
  },
  {
    id: 0.5,
    type: 'select',
    question: "Which industry best describes your work?",
    options: [
      'Technology',
      'Finance',
      'Professional Services',
      'Healthcare',
      'Education',
      'Construction',
      'Hospitality',
      'Public Sector',
      'Other'
    ]
  },
  {
    id: 1,
    question: "How much of your work involves repetitive, rule-based tasks?",
    options: ["None", "Minimal", "Some", "Most", "Almost all"]
  },
  {
    id: 2,
    question: "How often do you create original content or solve unique problems?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"]
  },
  {
    id: 3,
    question: "How much of your job requires face-to-face interaction?",
    options: ["None", "Minimal", "Some", "Most", "Almost all"]
  },
  {
    id: 4,
    question: "How predictable are the tasks you perform daily?",
    options: ["Highly unpredictable", "Somewhat unpredictable", "Mixed", "Mostly predictable", "Completely predictable"]
  },
  {
    id: 5,
    question: "How often do you use specialized knowledge or training?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"]
  },
  {
    id: 6,
    question: "How easily could someone learn your job tasks from documentation?",
    options: ["Impossible", "Very difficult", "Moderately difficult", "Fairly easy", "Very easy"]
  },
  {
    id: 7,
    question: "How much does your work require emotional intelligence?",
    options: ["None", "Minimal", "Some", "Significant", "Critical"]
  },
  {
    id: 8,
    question: "How often do you make decisions requiring human judgment?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"]
  },
  {
    id: 9,
    question: "How much of your work involves physical dexterity or manipulation?",
    options: ["None", "Minimal", "Some", "Most", "Almost all"]
  }
]

export default function QuizContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<QuizData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      answers: Array(9).fill(-1) as any
    }
  })

  const onSubmit = async (data: QuizData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      if (result.token) {
        router.push(`/results?t=${result.token}`)
      } else {
        console.error('No token received')
      }
    } catch (error) {
      console.error('Quiz submission error:', error)
    }
    setIsSubmitting(false)
  }

  const totalSteps = QUESTIONS.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ProgressBar progress={progress} />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <QuizStepper
          questions={QUESTIONS}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isSubmitting={isSubmitting}
        />

        {/* Ad slots */}
        {currentStep === 3 && <AdSlot id="quiz-mid-1" />}
        {currentStep === 7 && <AdSlot id="quiz-mid-2" />}
      </form>
    </div>
  )
}