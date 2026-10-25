'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, ShoppingBag } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Wordmark } from './wordmark'
import { mainNav, secondaryNav } from '@/data/site'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

function SearchForm({ id, className }: { id: string; className?: string }) {
  return (
    <form action="/catalog" role="search" className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        Пошук товарів
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Пошук: термостат, сіно…"
        className="h-10 w-full rounded-full border border-input bg-cream pr-4 pl-9 text-sm placeholder:text-muted-foreground"
      />
    </form>
  )
}

export function Header() {
  const pathname = usePathname()
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 rounded-md" aria-label="ExoNest — на головну">
          <Wordmark />
        </Link>

        <nav aria-label="Основна навігація" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
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

        <div className="ml-auto flex items-center gap-2">
          <SearchForm id="header-search" className="hidden w-56 md:block xl:w-64" />

          <Link
            href="/cart"
            className="relative inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-surface"
            aria-label={`Кошик, товарів: ${count}`}
          >
            <ShoppingBag className="size-5" aria-hidden />
            {count > 0 ? (
              <span
                aria-hidden
                className="absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground"
              >
                {count}
              </span>
            ) : null}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-surface lg:hidden"
              aria-label="Відкрити меню"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] bg-background">
              <SheetHeader className="border-b">
                <SheetTitle className="font-serif text-lg">Меню</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-8">
                <SearchForm id="mobile-search" />
                <nav aria-label="Мобільна навігація">
                  <ul className="flex flex-col">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          className={cn(
                            'block border-b py-3 font-serif text-xl',
                            isActive(item.href) ? 'text-primary' : 'text-foreground',
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ul className="flex flex-col gap-2 text-sm">
                  {secondaryNav.slice(0, 3).map((item) => (
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
