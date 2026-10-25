import Link from 'next/link'
import { Photo } from '@/components/shared/photo'
import { categoryLabel } from '@/data/site'
import type { Product } from '@/data/types'
import { formatPrice } from '@/lib/format'
import { photoFor } from '@/lib/photos'
import { AddToCartButton } from './add-to-cart-button'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream transition-colors hover:border-caramel/50">
      <Link
        href={`/catalog/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-surface"
        tabIndex={-1}
        aria-hidden
      >
        <Photo
          photo={photoFor(product.slug, product.animals, product.category)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          decorative
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-caramel">{categoryLabel(product.category)}</p>
        <h3 className="font-serif text-lg leading-snug">
          <Link href={`/catalog/${product.slug}`} className="hover:text-primary hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.short}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-foreground">{formatPrice(product.price)}</span>
          </div>
          <AddToCartButton slug={product.slug} name={product.name} disabled={!product.inStock} compact />
        </div>
      </div>
    </article>
  )
}
