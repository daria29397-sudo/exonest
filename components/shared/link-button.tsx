import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-caramel/50 bg-transparent text-foreground hover:bg-surface',
  cream: 'bg-cream text-primary hover:bg-cream/90',
}

export function LinkButton({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
