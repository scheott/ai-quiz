// ==========================================
// components/AdSlot.tsx
// ==========================================

'use client'

import { useEffect, useRef } from 'react'

interface AdSlotProps {
  id: string
  className?: string
}

export default function AdSlot({ id, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reserve height to prevent CLS
    if (adRef.current) {
      adRef.current.style.minHeight = '250px'
      adRef.current.style.display = 'block'
      adRef.current.style.width = '100%'
    }

    // In production: load Google AdSense
    // const script = document.createElement('script')
    // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
    // script.async = true
    // script.crossOrigin = "anonymous"
    // document.head.appendChild(script)

    // For demo: show placeholder after delay to simulate ad loading
    const timer = setTimeout(() => {
      if (adRef.current) {
        adRef.current.innerHTML = `
          <div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-full" style="min-height: 250px;">
            <div class="text-center text-gray-500">
              <div class="text-sm">Advertisement</div>
              <div class="text-xs mt-1">Ad slot: ${id}</div>
            </div>
          </div>
        `
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  return (
    <div 
      ref={adRef}
      className={`ad-slot ${className}`}
      data-ad-slot={id}
      style={{ 
        minHeight: '250px',
        display: 'block',
        width: '100%'
      }}
      aria-label="Advertisement"
    />
  )
}