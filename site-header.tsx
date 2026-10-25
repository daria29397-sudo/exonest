'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { mainNav, secondaryNav } from '@/data/site'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'
import { Wordmark } from './wordmark'

function SearchForm({ className, onSubmitted }: { className?: string; onSubmitted?: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  return (
    <form
      role="search"
      className={cn('relative', className)}
      onSubmit={(e) => {
        e.preventDefault()
        const q = query.trim()
        router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog')
        onSubmitted?.()
      }}
    >
      <label htmlFor={onSubmitted ? 'search-mobile' : 'search-desktop'} className="sr-only">
        Пошук по каталогу
      </label>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        id={onSubmitted ? 'search-mobile' : 'search-desktop'}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук товарів"
        className="h-10 w-full rounded-full border border-input bg-cream pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
      />
    </form>
  )
}

function CartLink() {
  const { count } = useCart()
  return (
    <Link
      href="/cart"
      className="relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-cream text-foreground transition-colors hover:bg-surface"
      aria-label={count > 0 ? `Кошик, товарів: ${count}` : 'Кошик порожній'}
    >
      <ShoppingBag className="size-5" aria-hidden />
      {count > 0 ? (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold leading-5 text-primary-foreground"
        >
          {count}
        </span>
      ) : null}
    </Link>
  )
}

function AccountLink() {
  return (
    <Link
      href="/account"
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-cream text-foreground transition-colors hover:bg-surface"
      aria-label="Особистий кабінет"
    >
      <User className="size-5" aria-hidden />
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 rounded-md" aria-label="ExoNest — на головну">
          <Wordmark className="h-8 w-auto" />
        </Link>

        <nav aria-label="Основна навігація" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-surface',
                    isActive(item.href) ? 'bg-surface text-primary' : 'text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <SearchForm className="hidden w-52 md:block xl:w-60" />
          <AccountLink />
          <CartLink />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-cream lg:hidden"
              aria-label="Відкрити меню"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-background">
              <SheetHeader>
                <SheetTitle className="font-serif text-xl">Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-8">
                <SearchForm onSubmitted={() => setOpen(false)} />
                <nav aria-label="Мобільна навігація">
                  <ul className="flex flex-col">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          className={cn(
                            'block border-b border-border py-3 font-serif text-lg',
                            isActive(item.href) && 'text-primary',
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link href="/account" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">
                      Особистий кабінет
                    </Link>
                  </li>
                  {secondaryNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
