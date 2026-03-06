import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'flex items-center gap-3 text-sm font-bold uppercase tracking-widest',
        'text-lightest-slate mb-8',
        // Mobile: sticky top heading with backdrop
        'sticky top-0 z-10 py-4 -mx-6 px-6 lg:static lg:mx-0 lg:px-0 lg:py-0',
        'bg-navy/90 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none',
        className
      )}
    >
      <span className="text-teal font-mono">{children}</span>
    </h2>
  )
}
