import Image from 'next/image'
import Link from 'next/link'
import { getProduct } from '@/data/products'
import type { Kit } from '@/data/types'
import { formatPrice } from '@/lib/format'

export function KitCard({ kit }: { kit: Kit }) {
  const product = getProduct(kit.productSlug)
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-cream p-5">
      <div className="relative mb-5 aspect-[5/3] overflow-hidden rounded-xl bg-surface">
        <Image
          src={kit.image}
          alt={kit.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: kit.imagePosition }}
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-caramel">{kit.level}</p>
      <h3 className="mt-1 font-serif text-xl">{kit.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{kit.forWhom}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        {product ? <span className="font-semibold">від {formatPrice(product.price)}</span> : <span />}
        <Link
          href={`/kits#${kit.productSlug}`}
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Що всередині
          <span className="sr-only"> набору «{kit.title}»</span>
        </Link>
      </div>
    </article>
  )
}
