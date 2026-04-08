import posthog from 'posthog-js'

export function trackEvent(event: string, properties?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}
