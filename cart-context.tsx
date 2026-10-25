'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { getProduct } from '@/data/products'
import type { Product } from '@/data/types'

const MAX_QTY = 20

interface CartLine {
  slug: string
  quantity: number
}

export interface CartItem extends CartLine {
  product: Product
}

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  add: (slug: string, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  remove: (slug: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const clampQty = (q: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(q)))

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  const add = useCallback((slug: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug)
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, quantity: clampQty(l.quantity + quantity) } : l,
        )
      }
      return [...prev, { slug, quantity: clampQty(quantity) }]
    })
  }, [])

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, quantity: clampQty(quantity) } : l)))
  }, [])

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((l) => {
      const product = getProduct(l.slug)
      return product ? [{ ...l, product }] : []
    })
    return {
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
      add,
      setQuantity,
      remove,
      clear,
    }
  }, [lines, add, setQuantity, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CART_MAX_QTY = MAX_QTY
