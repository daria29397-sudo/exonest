import type { Metadata } from 'next'
import { Bug, HeartHandshake, ShieldCheck } from 'lucide-react'
import { FadeIn } from '@/components/shared/fade-in'
import { LinkButton } from '@/components/shared/link-button'
import { PageHeader } from '@/components/shared/page-header'
import Image from 'next/image'
import { Section, SectionHeading } from '@/components/shared/section'

export const metadata: Metadata = {
  title: 'Про нас',
  description:
    'ExoNest це магазин і сервіс для власників рептилій та дрібних екзотів. Ми не продаємо тварин з вітрини, вирощуємо власних кормових комах і вчимо правильного утримання.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'Про ExoNest', description: 'Чому ми не продаємо тварин з вітрини.' },
}

const principles = [
  {
    icon: ShieldCheck,
    title: 'Без імпульсних покупок',
    text: 'Тварина з’являється вдома лише після того, як готові умови. Тому ми не тримаємо тварин «на продаж».',
  },
  {
    icon: Bug,
    title: 'Власна ферма комах',
    text: 'Сверчки, тарганці й борошняні черв’яки вирощуються в нас на збалансованому кормі, без хімії.',
  },
  {
    icon: HeartHandshake,
    title: 'Чесні поради',
    text: 'Якщо дешевший варіант підійде, ми так і скажемо. Якщо тварина не для вас, теж скажемо.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Про нас' }]}
        eyebrow="Про нас"
        title="Ми починали як власники, а не як продавці"
        intro="ExoNest з’явився з власного досвіду: забагато грошей витрачено на непотрібне обладнання і забагато часу на пошук відповідей. Тепер ми робимо цей шлях коротшим для інших."
      />
      <Section labelledBy="story-title">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="story-title" className="text-3xl md:text-4xl">
              Магазин, де тварини живуть, а не продаються
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed">
              <p>
                У нашому магазині кілька тераріумів і вольєрів із постійними мешканцями. Вони показують, як виглядає
                облаштований простір і як поводиться тварина, якій комфортно.
              </p>
              <p>
                Ми продаємо обладнання, корм і стартові набори, ведемо підписку й допомагаємо з ветеринарами. Тварину можна
                замовити, але лише після чек-листу умов і з документами про походження.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/smart-terrarium.jpg"
              alt="Облаштований тераріум з пустельним ландшафтом і підсвічуванням"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="principles-title" className="bg-surface/60">
        <SectionHeading id="principles-title" eyebrow="Принципи" title="На чому ми стоїмо" />
        <ul className="grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title}>
              <FadeIn delay={i * 0.05} className="h-full rounded-2xl border border-border bg-cream p-6">
                <span className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-surface text-primary">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-serif text-xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="visit-title">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-cream p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 id="visit-title" className="text-3xl">
              Приходьте познайомитися
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Покажемо тераріуми наживо й допоможемо підібрати обладнання під ваш простір.
            </p>
          </div>
          <LinkButton href="/contacts">Контакти й адреса</LinkButton>
        </div>
      </Section>
    </>
  )
}
