'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Module-level init — runs once on import, before any component renders
if (typeof window !== 'undefined') {
  posthog.init('phc_xAkUMkc82fLX8qzqeRJ3xYTXvw4ei2BbBtCD5AymXNDo', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'memory',
    session_recording: {
      captureCanvas: {
        recordCanvas: true,
        canvasFps: 4,
        canvasQuality: '0.6',
      },
    },
    loaded: (ph) => { if (process.env.NODE_ENV === 'development') console.log('PostHog loaded', ph) },
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}

export function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams?.toString()) {
        url += '?' + searchParams.toString()
      }
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams])

  return null
}
