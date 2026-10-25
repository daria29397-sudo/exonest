import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, Truck } from 'lucide-react'
import { ProductCard } from '@/components/catalog/product-card'
import { ProductGallery } from '@/components/catalog/product-gallery'
import { ProductPurchase } from '@/components/catalog/product-purchase'
import { Breadcrumbs } from '@/components/shared/page-header'
import { Container, Section, SectionHeading } from '@/components/shared/section'
import { getProduct, getRelated, products } from '@/data/products'
import { animalLabel, categoryLabel } from '@/data/site'
import { formatPrice } from '@/lib/format'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Товар не знайдено' }
  return {
    title: product.name,
    description: product.short,
    alternates: { canonical: `/catalog/${product.slug}` },
    openGraph: { title: `${product.name} · ExoNest`, description: product.short, type: 'website' },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelated(product, 4).slice(0, 4)

  return (
    <>
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { href: '/catalog', label: 'Каталог' },
            { href: `/catalog?category=${product.category}`, label: categoryLabel(product.category) },
            { label: product.name },
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-caramel">{categoryLabel(product.category)}</p>
              <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{product.name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.short}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-primary">{formatPrice(product.price)}</span>
              <span className={product.inStock ? 'text-sm text-foreground' : 'text-sm text-destructive'}>
                {product.inStock ? 'В наявності' : 'Немає в наявності'}
              </span>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold font-sans">Підходить для</h2>
              <ul className="flex flex-wrap gap-2">
                {product.animals.map((a) => (
                  <li key={a}>
                    <Link
                      href={`/catalog?animal=${a}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm hover:text-primary"
                    >
                      <Check className="size-3.5 text-primary" aria-hidden />
                      {animalLabel(a)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <ProductPurchase slug={product.slug} name={product.name} inStock={product.inStock} />

            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <Truck className="mt-0.5 size-4 shrink-0 text-caramel" aria-hidden />
              <span>
                Доставка Новою поштою 1–3 дні. Повернення нерозпакованого обладнання протягом 14 днів.{' '}
                <Link href="/delivery-returns" className="text-primary underline underline-offset-4">
                  Умови
                </Link>
              </span>
            </p>

            <div className="border-t border-border pt-6">
              <h2 className="mb-3 text-2xl">Опис</h2>
              <p className="leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl">Характеристики</h2>
              <dl className="overflow-hidden rounded-2xl border border-border">
                {product.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`grid grid-cols-[40%_1fr] gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-cream' : 'bg-surface/60'}`}
                  >
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>

      {related.length ? (
        <Section labelledBy="related-title" className="border-t border-border">
          <SectionHeading id="related-title" title="Також знадобиться" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  )
}
