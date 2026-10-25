import type { Metadata } from 'next'
import { CatalogBrowser, type CatalogInitial } from '@/components/catalog/catalog-browser'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'
import { animalTypes, categories } from '@/data/site'
import type { AnimalType, CategoryId } from '@/data/types'

export const metadata: Metadata = {
  title: 'Каталог',
  description:
    'Тераріуми й вольєри, обігрів і світло, субстрат, корм і добавки для рептилій та дрібних екзотичних ссавців. Фільтри за видом тварини й категорією.',
  alternates: { canonical: '/catalog' },
  openGraph: { title: 'Каталог ExoNest', description: 'Обладнання, корм і стартові набори для екзотів.' },
}

const sortKeys = ['popular', 'new', 'price-asc', 'price-desc'] as const

const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? ''

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const animalIds = new Set(animalTypes.map((a) => a.id))
  const categoryIds = new Set(categories.map((c) => c.id))
  const sortRaw = pick(sp.sort)

  const initial: CatalogInitial = {
    q: pick(sp.q).slice(0, 80),
    animals: pick(sp.animal)
      .split(',')
      .filter((a): a is AnimalType => animalIds.has(a as AnimalType)),
    categories: pick(sp.category)
      .split(',')
      .filter((c): c is CategoryId => categoryIds.has(c as CategoryId)),
    sort: (sortKeys as readonly string[]).includes(sortRaw) ? (sortRaw as CatalogInitial['sort']) : 'popular',
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Каталог' }]}
        eyebrow="Каталог"
        title="Обладнання, корм і набори"
        intro="Лише те, що ми самі використовуємо в магазині. Біля кожного товару вказано, для кого він підходить."
      />
      <Container className="py-12">
        <CatalogBrowser
          key={`${initial.q}|${initial.animals.join()}|${initial.categories.join()}|${initial.sort}`}
          initial={initial}
        />
      </Container>
    </>
  )
}
