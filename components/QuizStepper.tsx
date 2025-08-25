// ==========================================
// components/QuizStepper.tsx
// ==========================================

'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form'

interface Question {
  id: number
  type?: string
  question: string
  placeholder?: string
  options?: string[]
}

interface QuizData {
  jobTitle: string
  industry: string
  answers: number[]
}

interface QuizStepperProps {
  questions: Question[]
  currentStep: number
  onStepChange: (step: number) => void
  register: UseFormRegister<QuizData>
  setValue: UseFormSetValue<QuizData>
  watch: UseFormWatch<QuizData>
  errors: FieldErrors<QuizData>
  isSubmitting: boolean
}

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '')

export default function QuizStepper({
  questions,
  currentStep,
  onStepChange,
  register,
  setValue,
  watch,
  errors,
  isSubmitting
}: QuizStepperProps) {
  const currentQuestion = questions[currentStep]
  const isLastStep = currentStep === questions.length - 1
  
  const canGoNext = () => {
    if (currentQuestion.type === 'text') {
      return (watch('jobTitle') || '').length > 0
    }
    if (currentQuestion.type === 'select') {
      return (watch('industry') || '').length > 0
    }
    const answerIndex = typeof currentQuestion.id === 'number' ? currentQuestion.id - 1 : 0
    return (watch(`answers.${answerIndex}`) ?? -1) >= 0
  }

  const handleNext = () => {
    if (canGoNext() && !isLastStep) {
      onStepChange(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1)
    }
  }

  const handleOptionSelect = (value: number | string) => {
    if (currentQuestion.type === 'text') {
      setValue('jobTitle', value as string)
    } else if (currentQuestion.type === 'select') {
      setValue('industry', value as string)
    } else {
      setValue(`answers.${currentQuestion.id - 1}`, value as number)
    }
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>

        {currentQuestion.type === 'text' && (
          <div>
            <label htmlFor="job-title-input" className="sr-only">
              Your job title
            </label>
            <input
              {...register('jobTitle')}
              id="job-title-input"
              type="text"
              placeholder={currentQuestion.placeholder}
              className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-2">{errors.jobTitle.message}</p>
            )}
            
            {/* Job title suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Marketing Manager', 'Software Engineer', 'Data Analyst', 'Teacher', 'Sales Rep'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleOptionSelect(suggestion)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion.type === 'select' && (
          <div className="grid gap-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect(slug(option))}
                className={`p-4 text-left border-2 rounded-lg transition-colors ${
                  watch('industry') === slug(option)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {!currentQuestion.type && currentQuestion.options && (
          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect(index)}
                className={`p-4 text-left border-2 rounded-lg transition-colors ${
                  watch(`answers.${currentQuestion.id - 1}`) === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <span className="text-sm text-gray-500">{index}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Form Errors */}
      {errors.answers && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.answers.message}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {isLastStep ? (
          <button
            type="submit"
            disabled={!canGoNext() || isSubmitting}
            aria-live="polite"
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Calculating...' : 'Get My Results'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext()}
            className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}