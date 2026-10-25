import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CheckSquare } from 'lucide-react'
import { GuideCard } from '@/components/guides/guide-card'
import { Photo } from '@/components/shared/photo'
import { LinkButton } from '@/components/shared/link-button'
import { Breadcrumbs } from '@/components/shared/page-header'
import { Container, Section, SectionHeading } from '@/components/shared/section'
import { getGuide, guides } from '@/data/guides'
import { animalLabel } from '@/data/site'
import { formatDate } from '@/lib/format'
import { photoFor } from '@/lib/photos'

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Гайд не знайдено' }
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.excerpt, type: 'article', publishedTime: guide.publishedAt },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const isChecklist = guide.type === 'Чек-лист'
  const more = guides.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <>
      <article aria-labelledby="guide-title">
        <header className="border-b border-border bg-surface/60">
          <Container className="grid items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Breadcrumbs items={[{ href: '/guides', label: 'Гайди' }, { label: guide.title }]} />
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full bg-cream px-3 py-1 font-semibold text-primary">{guide.type}</span>
                {guide.animal !== 'all' ? <span>{animalLabel(guide.animal)}</span> : <span>Для всіх</span>}
                <span aria-hidden>·</span>
                <span>{guide.readingMinutes} хв читання</span>
                <span aria-hidden>·</span>
                <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
              </div>
              <h1 id="guide-title" className="mt-4 text-4xl leading-tight md:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{guide.excerpt}</p>
            </div>
            <div className="relative hidden h-64 overflow-hidden rounded-3xl bg-cream lg:block" aria-hidden>
              <Photo photo={photoFor(guide.slug, guide.animal === 'all' ? [] : [guide.animal])} sizes="40vw" decorative />
            </div>
          </Container>
        </header>

        <Container className="py-12">
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="mb-4 text-2xl md:text-3xl">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)} className="mb-4 text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
                {s.list ? (
                  <ul className={isChecklist ? 'flex flex-col gap-2' : 'flex list-disc flex-col gap-2 pl-6 marker:text-caramel'}>
                    {s.list.map((item) =>
                      isChecklist ? (
                        <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-cream p-3 leading-relaxed">
                          <CheckSquare className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                          {item}
                        </li>
                      ) : (
                        <li key={item} className="text-lg leading-relaxed">
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif text-lg">Готові переходити до покупок?</p>
              <LinkButton href="/kits">Стартові набори</LinkButton>
            </aside>
          </div>
        </Container>
      </article>

      <Section labelledBy="more-title" className="border-t border-border">
        <SectionHeading id="more-title" title="Читайте також" action={{ href: '/guides', label: 'Усі гайди' }} />
        <ul className="grid gap-4 md:grid-cols-3">
          {more.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
