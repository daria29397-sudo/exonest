import Link from 'next/link'
import { contacts, mainNav, secondaryNav } from '@/data/site'
import { Wordmark } from './wordmark'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Wordmark className="h-8 w-auto self-start" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Обладнання, стартові набори, власні кормові комахи та послуги для рептилій і дрібних екзотичних ссавців.
          </p>
        </div>

        <nav aria-label="Розділи сайту">
          <h2 className="mb-4 font-serif text-base text-primary">Розділи</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Інформація">
          <h2 className="mb-4 font-serif text-base text-primary">Інформація</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-serif text-base text-primary">Контакти</h2>
          <address className="flex flex-col gap-2 text-sm not-italic">
            <span>{contacts.address}</span>
            <a href={`tel:${contacts.phone.replace(/\s/g, '')}`} className="hover:text-primary hover:underline">
              {contacts.phone}
            </a>
            <a href={`mailto:${contacts.email}`} className="hover:text-primary hover:underline">
              {contacts.email}
            </a>
            <span className="text-muted-foreground">{contacts.hours}</span>
          </address>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Соцмережі">
            {contacts.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-caramel/40 px-3 py-1.5 text-xs font-medium hover:bg-background"
                >
                  {s.label}
                  <span className="sr-only"> (відкриється в новій вкладці)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ExoNest. Усі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}
