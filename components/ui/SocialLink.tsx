import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialLinkProps {
  href: string
  icon: LucideIcon
  label: string
  download?: boolean
  className?: string
}

export function SocialLink({ href, icon: Icon, label, download, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download}
      aria-label={label}
      title={label}
      className={cn(
        'group flex items-center justify-center w-9 h-9 text-slate transition-all duration-200',
        'hover:text-teal hover:-translate-y-1 focus-visible:text-teal focus-visible:outline-none',
        className
      )}
    >
      <Icon size={20} strokeWidth={1.5} />
    </a>
  )
}
