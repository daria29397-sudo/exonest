import type { Metadata } from 'next'
import Link from 'next/link'
import { GuideCard } from '@/components/guides/guide-card'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'
import { latestGuides } from '@/data/guides'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Гайди й чек-листи',
  description:
    'Статті та чек-листи про утримання змій, гекконів, шиншил і їжаків: облаштування тераріуму, температури, годування, підготовка до появи тварини.',
  alternates: { canonical: '/guides' },
  openGraph: { title: 'Гайди ExoNest', description: 'Спершу прочитати, потім купувати.' },
}

const filters = [
  { id: 'all', label: 'Усі' },
  { id: 'article', label: 'Статті', type: 'Стаття' },
  { id: 'checklist', label: 'Чек-листи', type: 'Чек-лист' },
] as const

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { type } = await searchParams
  const active = filters.find((f) => f.id === type) ?? filters[0]
  const list = latestGuides(Number.POSITIVE_INFINITY).filter((g) => !('type' in active) || g.type === active.type)

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Гайди' }]}
        eyebrow="Гайди"
        title="Знання, перевірені практикою"
        intro="Пишемо з досвіду утримання власних тварин і консультацій з ветеринарами-партнерами. Без міфів і зайвих покупок."
      />
      <Container className="py-12">
        <nav aria-label="Тип матеріалу" className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <li key={f.id}>
                <Link
                  href={f.id === 'all' ? '/guides' : `/guides?type=${f.id}`}
                  aria-current={active.id === f.id ? 'page' : undefined}
                  className={cn(
                    'inline-flex rounded-full border px-4 py-2 text-sm transition-colors',
                    active.id === f.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-cream hover:border-caramel/60',
                  )}
                >
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
