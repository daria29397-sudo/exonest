import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { AddToCartButton } from '@/components/catalog/add-to-cart-button'
import { FadeIn } from '@/components/shared/fade-in'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'
import { kits } from '@/data/kits'
import { getProduct } from '@/data/products'
import { formatPrice } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Стартові набори',
  description:
    'Набори «Перша змія», «Перший геккон», «Перша шиншила» та «Перший їжак»: перевірене обладнання, сумісне між собою, і друкований чек-лист.',
  alternates: { canonical: '/kits' },
  openGraph: { title: 'Стартові набори ExoNest', description: 'Усе потрібне на перший місяць в одній коробці.' },
}

export default function KitsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Набори' }]}
        eyebrow="Стартові набори"
        title="Почніть з набору, а не зі списку покупок"
        intro="Ми зібрали чотири набори під найпопулярніших домашніх екзотів. Кожен елемент підібраний під розмір тераріуму чи клітки, а потужність обігріву розрахована заздалегідь."
      />
      <Container className="flex flex-col gap-8 py-12">
        {kits.map((kit, i) => {
          const product = getProduct(kit.productSlug)
          return (
            <FadeIn key={kit.productSlug}>
              <article
                id={kit.productSlug}
                aria-labelledby={`${kit.productSlug}-title`}
                className="grid scroll-mt-24 gap-8 rounded-3xl border border-border bg-cream p-6 md:p-10 lg:grid-cols-[1fr_1.3fr]"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface ${i % 2 ? 'lg:order-2' : ''}`}
                >
                  <Image
                    src={kit.image}
                    alt={kit.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: kit.imagePosition }}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wider text-caramel">Рівень: {kit.level}</p>
                  <h2 id={`${kit.productSlug}-title`} className="mt-2 text-3xl md:text-4xl">
                    {kit.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">Для кого: {kit.forWhom}</p>

                  <h3 className="mt-6 font-sans text-sm font-semibold">Що всередині</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {kit.contents.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm leading-relaxed">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>

                  {product ? (
                    <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                      <span className="font-serif text-2xl text-primary">{formatPrice(product.price)}</span>
                      <AddToCartButton slug={product.slug} name={product.name} />
                      <Link
                        href={`/catalog/${product.slug}`}
                        className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        Характеристики
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            </FadeIn>
          )
        })}
      </Container>
    </>
  )
}
