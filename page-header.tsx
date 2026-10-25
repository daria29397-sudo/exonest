import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from './section'

export interface Crumb {
  href?: string
  label: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ href: '/', label: 'Головна' }, ...items]
  return (
    <nav aria-label="Хлібні крихти">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {all.map((c, i) => {
          const last = i === all.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {last || !c.href ? (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-foreground' : undefined}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-primary hover:underline">
                  {c.label}
                </Link>
              )}
              {!last ? <ChevronRight className="size-3.5" aria-hidden /> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[]
  eyebrow?: string
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <div className="border-b border-border">
      <Container className="py-10 md:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-caramel">{eyebrow}</p>
            ) : null}
            <h1 className="text-4xl leading-tight md:text-5xl">{title}</h1>
            {intro ? <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p> : null}
          </div>
          {children}
        </div>
      </Container>
    </div>
  )
}
