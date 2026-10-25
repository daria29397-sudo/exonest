'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { FormField, fieldAria, inputClass } from '@/components/shared/form-field'
import { useAccount } from '@/lib/account-context'
import { formatDate, formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'

interface Order {
  no: string
  date: string
  items: string
  status: 'Доставлено' | 'В дорозі' | 'Збирається'
  total: number
}

const orders: Order[] = [
  { no: 'EX-248613', date: '2026-10-18', items: 'Набір «Перший геккон»', status: 'В дорозі', total: 5400 },
  { no: 'EX-231077', date: '2026-09-02', items: 'Кормові цвіркуни, 500 шт. + кальцій з D3', status: 'Доставлено', total: 640 },
  { no: 'EX-214905', date: '2026-07-21', items: 'Підписка «Базовий», 3 місяці', status: 'Доставлено', total: 2100 },
  { no: 'EX-198342', date: '2026-05-09', items: 'Термостат з виносним датчиком', status: 'Доставлено', total: 1250 },
]

const tiers = [
  { from: 0, percent: 3 },
  { from: 3000, percent: 5 },
  { from: 7000, percent: 7 },
  { from: 12000, percent: 10 },
]

const statusClass: Record<Order['status'], string> = {
  Доставлено: 'bg-primary/10 text-primary',
  'В дорозі': 'bg-caramel/15 text-caramel',
  Збирається: 'bg-sand/40 text-ink',
}

function AuthForms() {
  const { login } = useAccount()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLogin = mode === 'login'

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-cream p-6 md:p-8">
      <div role="tablist" aria-label="Вхід або реєстрація" className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-surface p-1">
        {(['login', 'register'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              'h-10 rounded-full text-sm font-semibold transition-colors',
              mode === m ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-cream/70',
            )}
          >
            {m === 'login' ? 'Вхід' : 'Реєстрація'}
          </button>
        ))}
      </div>

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          login(email, isLogin ? undefined : name)
        }}
      >
        {!isLogin ? (
          <FormField id="acc-name" label="Ім’я">
            <input
              {...fieldAria('acc-name')}
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </FormField>
        ) : null}
        <FormField id="acc-email" label="Email">
          <input
            {...fieldAria('acc-email')}
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </FormField>
        <FormField id="acc-password" label="Пароль">
          <input
            {...fieldAria('acc-password')}
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </FormField>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {isLogin ? 'Увійти' : 'Створити акаунт'}
        </button>
      </form>
    </div>
  )
}

function Dashboard() {
  const { user, logout } = useAccount()
  const spent = orders.reduce((sum, o) => sum + o.total, 0)
  const tier = [...tiers].reverse().find((t) => spent >= t.from) ?? tiers[0]
  const next = tiers.find((t) => t.from > spent)
  const bonus = Math.floor(spent * 0.05)

  const stats = [
    { label: 'Накопичена знижка', value: `${tier.percent} %` },
    { label: 'Сума замовлень', value: formatPrice(spent) },
    { label: 'Бонусні бали', value: `${bonus}` },
    { label: 'Замовлень', value: `${orders.length}` },
  ]

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Ви увійшли як</p>
          <p className="font-serif text-2xl">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-caramel/50 px-5 text-sm font-semibold transition-colors hover:bg-surface"
        >
          <LogOut className="size-4" aria-hidden />
          Вийти
        </button>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-cream p-5">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 font-serif text-3xl text-primary">{s.value}</dd>
          </div>
        ))}
      </dl>

      {next ? (
        <p className="rounded-2xl bg-surface p-4 text-sm">
          До знижки {next.percent} % залишилось {formatPrice(next.from - spent)}.
        </p>
      ) : (
        <p className="rounded-2xl bg-surface p-4 text-sm">У вас максимальний рівень знижки.</p>
      )}

      <section aria-labelledby="orders-title">
        <h2 id="orders-title" className="mb-4 text-2xl">
          Історія замовлень
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">Історія замовлень</caption>
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">№</th>
                <th scope="col" className="px-4 py-3 font-semibold">Дата</th>
                <th scope="col" className="px-4 py-3 font-semibold">Товари</th>
                <th scope="col" className="px-4 py-3 font-semibold">Статус</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Сума</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.no} className={i % 2 === 0 ? 'bg-cream' : 'bg-surface/60'}>
                  <th scope="row" className="px-4 py-3 font-medium">{o.no}</th>
                  <td className="px-4 py-3">{formatDate(o.date)}</td>
                  <td className="px-4 py-3">{o.items}</td>
                  <td className="px-4 py-3">
                    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass[o.status])}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function AccountView() {
  const { user, ready } = useAccount()
  if (!ready) return <div className="min-h-64" aria-hidden />
  return user ? <Dashboard /> : <AuthForms />
}
