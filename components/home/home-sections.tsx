import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Cpu, GraduationCap, Package, Sprout, Stethoscope, Users, Warehouse } from 'lucide-react'
import { GuideCard } from '@/components/guides/guide-card'
import { KitCard } from '@/components/kits/kit-card'
import { FadeIn } from '@/components/shared/fade-in'
import { LinkButton } from '@/components/shared/link-button'
import { Section, SectionHeading } from '@/components/shared/section'
import { latestGuides } from '@/data/guides'
import { kits } from '@/data/kits'
import { plans } from '@/data/services'
import { formatPrice } from '@/lib/format'

const audiences = [
  {
    icon: Sprout,
    title: 'Новачки',
    text: 'Готовий набір, чек-лист і підтримка в месенджері, поки все не запрацює стабільно.',
    href: '/kits',
    cta: 'Стартові набори',
  },
  {
    icon: BookOpen,
    title: 'Любителі',
    text: 'Окреме обладнання, оновлення тераріуму, корми й добавки з прозорим складом.',
    href: '/catalog',
    cta: 'До каталогу',
  },
  {
    icon: Warehouse,
    title: 'Заводчики',
    text: 'Регулярні поставки кормових комах і субстрату за підпискою, гуртові умови за запитом.',
    href: '/services#subscription',
    cta: 'Підписка',
  },
  {
    icon: Users,
    title: 'Родини з дітьми',
    text: 'Допомагаємо обрати тварину, з якою дитина впорається, і пояснюємо правила безпеки.',
    href: '/guides/ekzot-u-rodyni-z-ditmy',
    cta: 'Гайд для родин',
  },
]

export function Audiences() {
  return (
    <Section labelledBy="audiences-title">
      <SectionHeading id="audiences-title" eyebrow="Для кого" title="Підбираємо під ваш рівень досвіду" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => (
          <li key={a.title}>
            <FadeIn delay={i * 0.05} className="h-full">
              <Link
                href={a.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-cream p-6 transition-colors hover:border-caramel/60"
              >
                <span className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-surface text-primary">
                  <a.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-serif text-xl">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {a.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function KitsRow() {
  return (
    <Section labelledBy="kits-title" className="bg-surface/60">
      <SectionHeading
        id="kits-title"
        eyebrow="Стартові набори"
        title="Один набір замість двадцяти вкладок"
        intro="Кожен набір ми зібрали й протестували в нашому магазині. Елементи сумісні між собою, а в коробці є друкований чек-лист."
        action={{ href: '/kits', label: 'Усі набори' }}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kits.map((kit, i) => (
          <li key={kit.productSlug}>
            <FadeIn delay={i * 0.05} className="h-full">
              <KitCard kit={kit} />
            </FadeIn>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function SmartTeaser() {
  return (
    <Section labelledBy="smart-title">
      <FadeIn className="grid items-center gap-10 rounded-3xl border border-border bg-cream p-8 md:p-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary">
            <Cpu className="size-3.5" aria-hidden />
            Скоро
          </p>
          <h2 id="smart-title" className="text-3xl leading-tight md:text-4xl">
            Smart-тераріум: клімат під наглядом
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Контролер на базі ESP32 стежить за температурою й вологістю, сам вмикає обігрів і зволоження, а якщо щось
            пішло не так, надсилає повідомлення в Telegram.
          </p>
          <LinkButton href="/smart-terrarium" className="mt-6">
            Як це працює
          </LinkButton>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
          <Image
            src="/images/smart-terrarium.jpg"
            alt="Тераріум з теплим підсвічуванням: корч, каміння й рослини в пустельному ландшафті"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </FadeIn>
    </Section>
  )
}

const services = [
  { icon: Package, title: 'Підписка', text: 'Корм і витратні матеріали щомісяця', href: '/services#subscription' },
  { icon: Stethoscope, title: 'Вет-партнери', text: 'Клініки, що працюють з екзотами', href: '/services#vets' },
  { icon: Warehouse, title: 'Прокат', text: 'Пробне обладнання й тимчасове утримання', href: '/services#rental' },
  { icon: GraduationCap, title: 'Освіта', text: 'Гайди, чек-листи й консультації', href: '/services#education' },
]

export function ServicesStrip() {
  return (
    <section aria-labelledby="services-title" className="border-y border-border bg-surface/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="services-title" className="sr-only">
          Послуги
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.title}>
              <Link href={s.href} className="group flex items-start gap-4 rounded-xl p-2">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-caramel/40 text-primary">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-serif text-lg group-hover:text-primary group-hover:underline">{s.title}</span>
                  <span className="block text-sm text-muted-foreground">{s.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SubscriptionTeaser() {
  const cheapest = Math.min(...plans.map((p) => p.price))
  return (
    <Section labelledBy="subscription-title">
      <FadeIn className="grid gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sand">Підписка ExoNest</p>
          <h2 id="subscription-title" className="text-3xl leading-tight text-cream md:text-4xl">
            Коробка раз на місяць, і ви більше не забуваєте про корм
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-cream/85">
            Кормові комахи з нашої ферми, субстрат за графіком заміни та короткий гайд місяця. Пауза або скасування в один
            клік.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-cream/25 p-6">
          <p className="text-sm text-cream/85">Три плани, від</p>
          <p className="font-serif text-4xl text-cream">
            {formatPrice(cheapest)}
            <span className="ml-1 font-sans text-base text-cream/80">/ міс</span>
          </p>
          <LinkButton href="/services#subscription" variant="cream" className="self-start">
            Порівняти плани
          </LinkButton>
        </div>
      </FadeIn>
    </Section>
  )
}

export function LatestGuides() {
  return (
    <Section labelledBy="guides-title" className="pt-0 md:pt-0">
      <SectionHeading
        id="guides-title"
        eyebrow="Гайди"
        title="Спершу прочитати, потім купувати"
        action={{ href: '/guides', label: 'Усі гайди' }}
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {latestGuides(3).map((g, i) => (
          <li key={g.slug}>
            <FadeIn delay={i * 0.05} className="h-full">
              <GuideCard guide={g} />
            </FadeIn>
          </li>
        ))}
      </ul>
    </Section>
  )
}
