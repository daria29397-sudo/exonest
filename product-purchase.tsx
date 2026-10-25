'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { CART_MAX_QTY } from '@/lib/cart-context'
import { AddToCartButton } from './add-to-cart-button'

export function ProductPurchase({ slug, name, inStock }: { slug: string; name: string; inStock: boolean }) {
  const [qty, setQty] = useState(1)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex h-12 items-center rounded-full border border-input bg-cream" role="group" aria-label="Кількість">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="inline-flex size-12 items-center justify-center rounded-full disabled:opacity-40"
          aria-label="Зменшити кількість"
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <output className="w-8 text-center font-semibold" aria-live="polite">
          {qty}
        </output>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(CART_MAX_QTY, q + 1))}
          disabled={qty >= CART_MAX_QTY}
          className="inline-flex size-12 items-center justify-center rounded-full disabled:opacity-40"
          aria-label="Збільшити кількість"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
      <AddToCartButton slug={slug} name={name} quantity={qty} disabled={!inStock} />
    </div>
  )
}
