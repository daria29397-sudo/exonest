'use client'

import { Plus, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

export function AddToCartButton({
  slug,
  name,
  quantity = 1,
  disabled,
  compact,
  className,
}: {
  slug: string
  name: string
  quantity?: number
  disabled?: boolean
  compact?: boolean
  className?: string
}) {
  const { add } = useCart()

  const onClick = () => {
    add(slug, quantity)
    toast.success('Додано до кошика', { description: name })
  }

  if (compact) {
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        size="icon-lg"
        className={cn('size-11 rounded-full', className)}
        aria-label={disabled ? `${name}: немає в наявності` : `Додати до кошика: ${name}`}
      >
        <Plus className="size-5" aria-hidden />
      </Button>
    )
  }

  return (
    <Button onClick={onClick} disabled={disabled} className={cn('h-12 rounded-full px-6 text-base', className)}>
      <ShoppingBag className="size-5" aria-hidden />
      {disabled ? 'Немає в наявності' : 'Додати до кошика'}
    </Button>
  )
}
