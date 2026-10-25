import type { Metadata } from 'next'
import Image from 'next/image'
import { Scale } from 'lucide-react'
import { AnimalRequestForm } from '@/components/animals/request-form'
import { Stepper } from '@/components/animals/stepper'
import { PageHeader } from '@/components/shared/page-header'
import { Section, SectionHeading } from '@/components/shared/section'

export const metadata: Metadata = {
  title: 'Тварини під замовлення',
  description:
    'ExoNest не продає тварин з вітрини. Замовити рептилію чи дрібного ссавця можна лише після чек-листу умов, від перевіреного постачальника з документами про походження.',
  alternates: { canonical: '/animals' },
  openGraph: { title: 'Тварини під замовлення · ExoNest', description: 'Спершу умови, потім тварина.' },
}

const residents = [
  {
    name: 'Леопардовий геккон',
    image: '/images/animals/leopard-gecko.jpg',
    alt: 'Леопардовий геккон на камені в тераріумі',
    position: 'center',
  },
  {
    name: 'Королівський пітон',
    image: '/images/animals/royal-python.jpg',
    alt: 'Королівський пітон, обвитий навколо гілки',
    position: 'center 60%',
  },
  {
    name: 'Шиншила',
    image: '/images/animals/chinchilla.jpg',
    alt: 'Молода шиншила на білому покривалі',
    position: 'left center',
  },
  {
    name: 'Африканський їжак',
    image: '/images/animals/hedgehog.jpg',
    alt: 'Малюк африканського їжака на долоні',
    position: 'center',
  },
]

export default function AnimalsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Тварини' }]}
        eyebrow="Тварини"
        title="Спершу умови, потім тварина"
        intro="У магазині є кілька тварин як декор і приклад. Купити тварину можна лише під замовлення."
      />

      <Section labelledBy="residents-title">
        <SectionHeading
          id="residents-title"
          eyebrow="Мешканці магазину"
          title="Ті, хто живе в нас постійно"
          intro="Вони не продаються. На їхньому прикладі ми показуємо, як виглядає правильно облаштований тераріум чи вольєр."
        />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {residents.map((r) => (
            <li key={r.name} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-cream">
              <div className="relative aspect-square">
                <Image
                  src={r.image}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: r.position }}
                />
              </div>
              <p className="p-4 text-center font-serif text-lg">{r.name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="steps-title" className="bg-surface/60">
        <SectionHeading id="steps-title" eyebrow="Як це працює" title="П’ять кроків до передачі тварини" />
        <Stepper />
      </Section>

      <Section labelledBy="request-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="request-title"
              eyebrow="Запит"
              title="Залиште запит на тварину"
              intro="Ми зв’яжемося, уточнимо умови утримання та надішлемо чек-лист. Якщо щось ще не готово, допоможемо підготуватися."
            />
            <aside className="flex gap-3 rounded-2xl border border-caramel/40 bg-cream p-5 text-sm leading-relaxed">
              <Scale className="mt-0.5 size-5 shrink-0 text-caramel" aria-hidden />
              <div>
                <h3 className="mb-1 font-sans font-semibold">Правова примітка</h3>
                <p className="text-muted-foreground">
                  Види, що підпадають під дію Конвенції CITES, передаються лише з дозволами та документами, які
                  підтверджують законне походження (розведення в неволі). Ми не працюємо з тваринами, вилученими з
                  природи, і відмовимо, якщо документи неповні.
                </p>
              </div>
            </aside>
          </div>
          <div className="rounded-3xl border border-border bg-cream p-6 md:p-8">
            <AnimalRequestForm />
          </div>
        </div>
      </Section>
    </>
  )
}
