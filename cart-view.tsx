'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Photo } from '@/components/shared/photo'
import { LinkButton } from '@/components/shared/link-button'
import { CART_MAX_QTY, useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'
import { photoFor, photos } from '@/lib/photos'
import { OrderSummary } from './order-summary'

export function CartView() {
  const { items, setQuantity, remove } = useCart()

  if (!items.length) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-caramel/50 bg-cream p-12 text-center">
        <div className="relative size-24 overflow-hidden rounded-full" aria-hidden>
          <Photo photo={photos.hedgehogBaby} sizes="96px" decorative />
        </div>
        <h2 className="text-2xl">Кошик порожній</h2>
        <p className="max-w-sm text-muted-foreground">Почніть зі стартового набору: там уже є все потрібне на перший місяць.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <LinkButton href="/kits">Стартові набори</LinkButton>
          <LinkButton href="/catalog" variant="outline">
            Каталог
          </LinkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-cream">
        {items.map(({ product, quantity }) => (
          <li key={product.slug} className="flex gap-4 p-4 sm:p-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface sm:size-24" aria-hidden>
              <Photo photo={photoFor(product.slug, product.animals, product.category)} sizes="96px" decorative />
            </div>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link href={`/catalog/${product.slug}`} className="font-serif text-lg hover:text-primary hover:underline">
                  {product.name}
                </Link>
                <p className="text-sm text-muted-foreground">{formatPrice(product.price)} за шт.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-10 items-center rounded-full border border-input" role="group" aria-label={`Кількість: ${product.name}`}>
                  <button
                    type="button"
                    onClick={() => setQuantity(product.slug, quantity - 1)}
                    disabled={quantity <= 1}
                    className="inline-flex size-10 items-center justify-center rounded-full disabled:opacity-40"
                    aria-label="Зменшити"
                  >
                    <Minus className="size-4" aria-hidden />
                  </button>
                  <output className="w-7 text-center text-sm font-semibold">{quantity}</output>
                  <button
                    type="button"
                    onClick={() => setQuantity(product.slug, quantity + 1)}
                    disabled={quantity >= CART_MAX_QTY}
                    className="inline-flex size-10 items-center justify-center rounded-full disabled:opacity-40"
                    aria-label="Збільшити"
                  >
                    <Plus className="size-4" aria-hidden />
                  </button>
                </div>
                <span className="w-24 text-right font-semibold">{formatPrice(product.price * quantity)}</span>
                <button
                  type="button"
                  onClick={() => remove(product.slug)}
                  className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-surface hover:text-destructive"
                  aria-label={`Видалити ${product.name}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <OrderSummary>
        <LinkButton href="/checkout" className="w-full">
          Оформити замовлення
        </LinkButton>
      </OrderSummary>
    </div>
  )
}
