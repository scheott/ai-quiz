import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://willaitakemyjobquiz.com'),
  title: 'Will AI Take My Job? - 3-Year Risk Assessment Quiz',
  description: 'Task-based, science-informed estimate—plus a personalized plan to stay ahead.',
  keywords: 'AI, job automation, career planning, future of work',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Will AI Take My Job? - 3-Year Risk Assessment Quiz',
    description: 'Task-based, science-informed estimate—plus a personalized plan to stay ahead.',
    url: 'https://willaitakemyjobquiz.com',
    siteName: 'Will AI Take My Job Quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will AI Take My Job? - 3-Year Risk Assessment Quiz',
    description: 'Task-based, science-informed estimate—plus a personalized plan to stay ahead.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <a href="/methodology" className="hover:text-gray-900">Methodology</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
              <a href="/refund" className="hover:text-gray-900">Refund Policy</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              7-day no-questions refund policy
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}