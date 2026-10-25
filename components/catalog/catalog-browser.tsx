'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { animalTypes, categories } from '@/data/site'
import { products } from '@/data/products'
import type { AnimalType, CategoryId } from '@/data/types'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

type SortKey = 'popular' | 'new' | 'price-asc' | 'price-desc'

const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'popular', label: 'Спершу популярні' },
  { id: 'new', label: 'Спершу нові' },
  { id: 'price-asc', label: 'Ціна: від низької' },
  { id: 'price-desc', label: 'Ціна: від високої' },
]

export interface CatalogInitial {
  q: string
  animals: AnimalType[]
  categories: CategoryId[]
  sort: SortKey
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3.5 py-2 text-sm transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-cream text-foreground hover:border-caramel/60',
      )}
    >
      {children}
    </button>
  )
}

export function CatalogBrowser({ initial }: { initial: CatalogInitial }) {
  const router = useRouter()
  const pathname = usePathname()
  const [q, setQ] = useState(initial.q)
  const [animals, setAnimals] = useState<AnimalType[]>(initial.animals)
  const [cats, setCats] = useState<CategoryId[]>(initial.categories)
  const [sort, setSort] = useState<SortKey>(initial.sort)

  const syncUrl = (next: { q?: string; animals?: AnimalType[]; cats?: CategoryId[]; sort?: SortKey }) => {
    const params = new URLSearchParams()
    const nq = next.q ?? q
    const na = next.animals ?? animals
    const nc = next.cats ?? cats
    const ns = next.sort ?? sort
    if (nq.trim()) params.set('q', nq.trim())
    if (na.length) params.set('animal', na.join(','))
    if (nc.length) params.set('category', nc.join(','))
    if (ns !== 'popular') params.set('sort', ns)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const filtered = products.filter((p) => {
      if (animals.length && !p.animals.some((a) => animals.includes(a))) return false
      if (cats.length && !cats.includes(p.category)) return false
      if (needle && !`${p.name} ${p.short} ${p.description}`.toLowerCase().includes(needle)) return false
      return true
    })
    const sorted = [...filtered]
    switch (sort) {
      case 'new':
        sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt))
        break
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        sorted.sort((a, b) => b.popularity - a.popularity)
    }
    return sorted
  }, [q, animals, cats, sort])

  const hasFilters = animals.length > 0 || cats.length > 0 || q.trim() !== ''

  const resetAll = () => {
    setQ('')
    setAnimals([])
    setCats([])
    syncUrl({ q: '', animals: [], cats: [] })
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside aria-label="Фільтри каталогу" className="flex flex-col gap-8">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            syncUrl({ q })
          }}
          className="relative"
        >
          <label htmlFor="catalog-search" className="sr-only">
            Пошук у каталозі
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            id="catalog-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => syncUrl({ q })}
            placeholder="Назва або призначення"
            className="h-11 w-full rounded-full border border-input bg-cream pl-10 pr-4 text-sm placeholder:text-muted-foreground"
          />
        </form>

        <fieldset>
          <legend className="mb-3 flex items-center gap-2 font-serif text-lg">
            <SlidersHorizontal className="size-4 text-caramel" aria-hidden />
            Тварина
          </legend>
          <div className="flex flex-wrap gap-2">
            {animalTypes.map((a) => (
              <Chip
                key={a.id}
                active={animals.includes(a.id)}
                onClick={() => {
                  const next = toggle(animals, a.id)
                  setAnimals(next)
                  syncUrl({ animals: next })
                }}
              >
                {a.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-serif text-lg">Категорія</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip
                key={c.id}
                active={cats.includes(c.id)}
                onClick={() => {
                  const next = toggle(cats, c.id)
                  setCats(next)
                  syncUrl({ cats: next })
                }}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        {hasFilters ? (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            <X className="size-4" aria-hidden />
            Скинути фільтри
          </button>
        ) : null}
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Знайдено товарів: <strong className="text-foreground">{results.length}</strong>
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-sm text-muted-foreground">
              Сортування
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => {
                const next = e.target.value as SortKey
                setSort(next)
                syncUrl({ sort: next })
              }}
              className="h-10 rounded-full border border-input bg-cream px-4 text-sm"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-caramel/50 bg-cream p-10 text-center">
            <p className="font-serif text-xl">Нічого не знайшли</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Спробуйте інший запит або приберіть частину фільтрів.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 text-sm font-semibold text-primary underline underline-offset-4"
            >
              Показати всі товари
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
