'use client'

import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'

export const FREE_SHIPPING_FROM = 2000
const SHIPPING = 90

export function OrderSummary({ children, compact }: { children?: React.ReactNode; compact?: boolean }) {
  const { items, total } = useCart()
  const shipping = total >= FREE_SHIPPING_FROM || total === 0 ? 0 : SHIPPING

  return (
    <aside aria-labelledby="summary-title" className="flex h-fit flex-col gap-4 rounded-2xl border border-border bg-cream p-6 lg:sticky lg:top-24">
      <h2 id="summary-title" className="text-2xl">
        Ваше замовлення
      </h2>
      {compact ? (
        <ul className="flex flex-col gap-2 text-sm">
          {items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-3">
              <span>
                {i.product.name} <span className="text-muted-foreground">× {i.quantity}</span>
              </span>
              <span className="shrink-0">{formatPrice(i.product.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Товари</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Доставка</dt>
          <dd>{shipping ? formatPrice(shipping) : 'Безкоштовно'}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
          <dt>Разом</dt>
          <dd className="font-serif text-xl text-primary">{formatPrice(total + shipping)}</dd>
        </div>
      </dl>
      {shipping ? (
        <p className="text-xs text-muted-foreground">
          До безкоштовної доставки: {formatPrice(FREE_SHIPPING_FROM - total)}
        </p>
      ) : null}
      {children}
    </aside>
  )
}
