'use client'

import Link from 'next/link'
import { useSyncExternalStore, useState } from 'react'
import { Button } from '@/components/ui/button'

const KEY = 'exonest-cookie-consent'

const subscribe = () => () => {}
const getStored = () => window.localStorage.getItem(KEY)
const getServer = () => 'pending'

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, getStored, getServer)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || stored !== null) return null

  const decide = (value: 'all' | 'necessary') => {
    window.localStorage.setItem(KEY, value)
    setDismissed(true)
  }

  return (
    <section
      aria-label="Повідомлення про cookie"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-caramel/40 bg-cream p-5 sm:inset-x-6"
    >
      <p className="text-sm leading-relaxed">
        Ми використовуємо лише необхідні cookie для роботи кошика та анонімну аналітику, щоб покращувати сайт.{' '}
        <Link href="/privacy" className="font-medium text-primary underline underline-offset-4">
          Детальніше
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => decide('all')} className="h-10 rounded-full px-5">
          Прийняти
        </Button>
        <Button variant="outline" onClick={() => decide('necessary')} className="h-10 rounded-full px-5">
          Лише необхідні
        </Button>
      </div>
    </section>
  )
}
