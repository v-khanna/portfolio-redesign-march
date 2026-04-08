'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const POSTHOG_KEY = 'phc_xAkUMkc82fLX8qzqeRJ3xYTXvw4ei2BbBtCD5AymXNDo'
const POSTHOG_HOST = 'https://us.i.posthog.com'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: false, // we handle this manually
      capture_pageleave: true,
      persistence: 'memory', // cookieless mode — no banner needed
    })
  }, [])

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
