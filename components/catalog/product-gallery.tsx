import { Photo } from '@/components/shared/photo'
import type { Product } from '@/data/types'
import { photoFor } from '@/lib/photos'

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
      <Photo
        photo={photoFor(product.slug, product.animals, product.category)}
        sizes="(min-width: 1024px) 45vw, 100vw"
        priority
      />
    </div>
  )
}
