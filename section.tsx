import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string
  className?: string
  children: React.ReactNode
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-16 md:py-20', className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
}: {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-caramel">{eyebrow}</p>
        ) : null}
        <h2 id={id} className="text-3xl leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {intro ? <p className="mt-3 text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  )
}

export function Divider() {
  return (
    <Container>
      <div className="flex items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-border" />
        <span className="size-1.5 rounded-full bg-sand" />
        <span className="h-px flex-1 bg-border" />
      </div>
    </Container>
  )
}
