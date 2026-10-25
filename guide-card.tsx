import Link from 'next/link'
import { Photo } from '@/components/shared/photo'
import type { Guide } from '@/data/types'
import { formatDate } from '@/lib/format'
import { photoFor } from '@/lib/photos'

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cream">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface" aria-hidden>
        <Photo
          photo={photoFor(guide.slug, guide.animal === 'all' ? [] : [guide.animal])}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          decorative
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-surface px-2.5 py-1 font-semibold text-primary">{guide.type}</span>
          <span>{guide.readingMinutes} хв читання</span>
          <span aria-hidden>·</span>
          <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
        </div>
        <h3 className="font-serif text-xl leading-snug">
          <Link href={`/guides/${guide.slug}`} className="hover:text-primary hover:underline">
            {guide.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{guide.excerpt}</p>
      </div>
    </article>
  )
}
