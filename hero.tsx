import { Photo } from '@/components/shared/photo'
import { FadeIn } from '@/components/shared/fade-in'
import { LinkButton } from '@/components/shared/link-button'
import { Container } from '@/components/shared/section'
import { photos } from '@/lib/photos'

const facts = [
  { value: '4', label: 'перевірені стартові набори' },
  { value: '6', label: 'гайдів і чек-листів' },
  { value: '0', label: 'тварин «на вітрині» для імпульсної покупки' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-border">
      <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2">
        <FadeIn>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-caramel">
            Магазин і сервіс для рептилій та дрібних екзотів
          </p>
          <h1 id="hero-title" className="text-5xl leading-[1.05] md:text-6xl">
            Усе для екзотів без здогадок
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ми збираємо перевірені набори, вирощуємо власних кормових комах і пояснюємо, як усе налаштувати. Спокійно, по
            кроках, без зайвих покупок.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/kits">Обрати набір</LinkButton>
            <LinkButton href="/guides" variant="outline">
              Почати з гайдів
            </LinkButton>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-3xl text-primary">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{f.label}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
        <FadeIn delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
          <Photo photo={photos.leopardGecko} sizes="(min-width: 1024px) 50vw, 100vw" priority />
        </FadeIn>
      </Container>
    </section>
  )
}
