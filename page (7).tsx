import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contacts/contact-form'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'
import { contacts } from '@/data/site'

export const metadata: Metadata = {
  title: 'Контакти',
  description: 'Адреса магазину ExoNest в Одесі, години роботи, телефон, email і форма зворотного зв’язку.',
  alternates: { canonical: '/contacts' },
  openGraph: { title: 'Контакти ExoNest', description: 'Як нас знайти і як з нами зв’язатися.' },
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { topic } = await searchParams
  const defaultTopic = typeof topic === 'string' ? topic : 'general'

  const items = [
    { icon: MapPin, label: 'Адреса', value: contacts.address },
    { icon: Clock, label: 'Години роботи', value: contacts.hours },
    { icon: Phone, label: 'Телефон', value: contacts.phone, href: `tel:${contacts.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: contacts.email, href: `mailto:${contacts.email}` },
  ]

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Контакти' }]}
        eyebrow="Контакти"
        title="Напишіть або завітайте"
        intro="Найшвидше відповідаємо в Telegram. Для детальних питань зручніше скористатися формою."
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-6">
          <address className="not-italic">
            <ul className="flex flex-col gap-4">
              {items.map((i) => (
                <li key={i.label} className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-primary">
                    <i.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">{i.label}</span>
                    {i.href ? (
                      <a href={i.href} className="font-medium hover:text-primary hover:underline">
                        {i.value}
                      </a>
                    ) : (
                      <span className="font-medium">{i.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </address>
          <ul className="flex flex-wrap gap-2" aria-label="Соцмережі">
            {contacts.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-border bg-cream px-4 py-2 text-sm hover:border-caramel/60"
                >
                  {s.label}
                  <span className="sr-only"> (відкриється в новій вкладці)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <section aria-labelledby="form-title" className="rounded-3xl border border-border bg-cream p-6 md:p-8">
          <h2 id="form-title" className="mb-6 text-2xl">
            Форма зворотного зв’язку
          </h2>
          <ContactForm key={defaultTopic} defaultTopic={defaultTopic} />
        </section>
      </Container>
    </>
  )
}
