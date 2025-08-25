// ==========================================
// components/ShareCard.tsx
// ==========================================

'use client'

import { Twitter, Linkedin, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareCardProps {
  riskBand: string
}

export default function ShareCard({ riskBand }: ShareCardProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `My 3-year AI job disruption risk: ${riskBand}. What's yours? Take the science-based quiz: willaitakemyjobquiz.com`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://willaitakemyjobquiz.com')}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleTwitterShare}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </button>
        
        <button
          onClick={handleLinkedInShare}
          className="flex items-center gap-2 px-3 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </button>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="mt-3 text-sm text-gray-600 bg-white p-2 rounded border">
        {shareText}
      </div>
    </div>
  )
}