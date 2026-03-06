import { cn } from '@/lib/utils'

interface SkillBadgeProps {
  skill: string
  className?: string
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        'bg-teal/10 text-teal/70 border border-teal/20',
        'transition-all duration-200 hover:bg-teal/20 hover:border-teal/40 hover:text-teal hover:shadow-[0_0_10px_rgba(100,255,218,0.12)]',
        className
      )}
    >
      {skill}
    </span>
  )
}
