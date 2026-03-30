'use client'

import { Waves } from '@/components/ui/wave-background'

export function WaveBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Waves
        className="h-full w-full"
        backgroundColor="#0a192f"
        strokeColor="rgba(100, 255, 218, 0.08)"
        pointerSize={0.25}
      />
    </div>
  )
}
