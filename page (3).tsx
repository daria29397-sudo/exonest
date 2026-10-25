import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ClipboardList, Home, MapPin, MessageCircle, Repeat } from 'lucide-react'
import { GuideCard } from '@/components/guides/guide-card'
import { FadeIn } from '@/components/shared/fade-in'
import { LinkButton } from '@/components/shared/link-button'
import { PageHeader } from '@/components/shared/page-header'
import { Section, SectionHeading } from '@/components/shared/section'
import { latestGuides } from '@/data/guides'
import { plans, vetPartners } from '@/data/services'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Послуги',
  description:
    'Підписка на корм і витратні матеріали, ветеринарні клініки-партнери, прокат обладнання й тимчасове утримання, гайди та консультації для власників екзотів.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Послуги ExoNest', description: 'Підписка, вет-партнери, прокат і освіта.' },
}

const sectionNav = [
  { href: '#subscription', label: 'Підписка' },
  { href: '#vets', label: 'Вет-партнери' },
  { href: '#rental', label: 'Прокат' },
  { href: '#education', label: 'Освіта' },
]

const rental = [
  {
    icon: Repeat,
    title: 'Пробне обладнання',
    text: 'Візьміть лампу, термостат або туманоутворювач на 7 днів. Якщо підійде, вартість прокату зарахуємо в покупку.',
    price: 150,
    unit: 'тиждень',
  },
  {
    icon: Home,
    title: 'Тимчасове утримання',
    text: 'Доглянемо рептилію чи гризуна на час вашої відпустки. Лише за наявності довідки від ветеринара.',
    price: 120,
    unit: 'доба',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Послуги' }]}
        eyebrow="Послуги"
        title="Підтримка після покупки"
        intro="Товар це лише початок. Ми допомагаємо з кормом, ветеринарами, тимчасовим утриманням і знаннями."
      />
      <nav aria-label="Розділи сторінки" className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {sectionNav.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="inline-flex whitespace-nowrap rounded-full border border-border bg-cream px-4 py-2 text-sm hover:border-caramel/60">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="subscription" labelledBy="sub-title" className="scroll-mt-32">
        <SectionHeading
          id="sub-title"
          eyebrow="Підписка"
          title="Коробка раз на місяць"
          intro="Комахи з нашої ферми, витратні матеріали за графіком і гайд місяця. Пауза або скасування будь-коли."
        />
        <ul className="grid gap-4 lg:grid-cols-3">
          {plans.map((p, i) => (
            <li key={p.id}>
              <FadeIn delay={i * 0.05} className="h-full">
                <article
                  aria-labelledby={`${p.id}-title`}
                  className={cn(
                    'flex h-full flex-col rounded-2xl border p-6 md:p-8',
                    p.featured ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-cream',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 id={`${p.id}-title`} className={cn('font-serif text-2xl', p.featured && 'text-cream')}>
                      {p.name}
                    </h3>
                    {p.featured ? (
                      <span className="rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold text-cream">Найпопулярніший</span>
                    ) : null}
                  </div>
                  <p className={cn('mt-2 text-sm', p.featured ? 'text-cream/85' : 'text-muted-foreground')}>{p.description}</p>
                  <p className={cn('mt-6 font-serif text-4xl', p.featured ? 'text-cream' : 'text-primary')}>
                    {formatPrice(p.price)}
                    <span className="ml-1 font-sans text-base opacity-80">/ міс</span>
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className={cn('mt-0.5 size-4 shrink-0', p.featured ? 'text-sand' : 'text-primary')} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <LinkButton
                    href={`/contacts?topic=subscription-${p.id}`}
                    variant={p.featured ? 'cream' : 'outline'}
                    className="mt-8"
                  >
                    Оформити «{p.name}»
                  </LinkButton>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="vets" labelledBy="vets-title" className="scroll-mt-32 bg-surface/60">
        <SectionHeading
          id="vets-title"
          eyebrow="Вет-партнери"
          title="Клініки, які знають екзотів"
          intro="Не кожен ветеринар працює з рептиліями й гризунами. Ці клініки мають відповідну підготовку та обладнання."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vetPartners.map((v) => (
            <li key={v.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-cream p-6">
              <h3 className="font-serif text-xl">{v.name}</h3>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-caramel" aria-hidden />
                {v.city}
              </p>
              <ul className="flex flex-wrap gap-1.5" aria-label="Спеціалізація">
                {v.focus.map((f) => (
                  <li key={f} className="rounded-full bg-surface px-2.5 py-1 text-xs">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-auto text-xs leading-relaxed text-muted-foreground">{v.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="rental" labelledBy="rental-title" className="scroll-mt-32">
        <SectionHeading id="rental-title" eyebrow="Прокат" title="Спробувати перед покупкою" />
        <ul className="grid gap-4 md:grid-cols-2">
          {rental.map((r) => (
            <li key={r.title} className="flex flex-col gap-4 rounded-2xl border border-border bg-cream p-6 md:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-primary">
                <r.icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-serif text-2xl">{r.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{r.text}</p>
              <div className="mt-auto flex items-center gap-2 pt-2">
                <span className="font-semibold">
                  від {formatPrice(r.price)} / {r.unit}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" labelledBy="edu-title" className="scroll-mt-32 bg-surface/60">
        <SectionHeading
          id="edu-title"
          eyebrow="Освіта"
          title="Гайди, чек-листи й консультації"
          intro="Безкоштовні матеріали на сайті та коротка консультація в месенджері для кожного покупця набору."
          action={{ href: '/guides', label: 'Усі гайди' }}
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {latestGuides(3).map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <MessageCircle className="size-5 text-primary" aria-hidden />
            Маєте конкретне питання щодо утримання?
          </p>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/contacts" variant="outline">
              Написати нам
            </LinkButton>
            <Link
              href="/guides?type=checklist"
              className="inline-flex items-center gap-1.5 self-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              <ClipboardList className="size-4" aria-hidden />
              Чек-листи
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
