import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { PhotoData } from '@/lib/photos'

/** Фото, що заповнює батьківський блок (він має бути relative з заданим розміром). */
export function Photo({
  photo,
  sizes,
  className,
  decorative = false,
  priority = false,
}: {
  photo: PhotoData
  sizes: string
  className?: string
  decorative?: boolean
  priority?: boolean
}) {
  return (
    <Image
      src={photo.src}
      alt={decorative ? '' : photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
      style={{ objectPosition: photo.position }}
    />
  )
}
