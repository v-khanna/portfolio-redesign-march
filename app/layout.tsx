import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://virkhanna.com'),
  title: 'Vir Khanna',
  description:
    'B.S. Computational Cognitive Science (Data & AI) from UC Davis. Building AI-powered systems and scalable web applications.',
  keywords: ['Vir Khanna', 'AI', 'machine learning', 'full-stack', 'UC Davis', 'cognitive science'],
  authors: [{ name: 'Vir Khanna' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://virkhanna.com',
    siteName: 'Vir Khanna',
    title: 'Vir Khanna',
    description:
      'B.S. Computational Cognitive Science (Data & AI) from UC Davis. Building AI-powered systems and scalable web applications.',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Vir Khanna',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vir Khanna',
    description:
      'Building AI-powered systems and scalable web applications. UC Davis Computational Cognitive Science.',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${cormorantGaramond.variable}`}>
      <body className="font-sans bg-navy text-lightest-slate antialiased">
        {children}
      </body>
    </html>
  )
}
