'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormField, fieldAria, inputClass, textareaClass } from '@/components/shared/form-field'
import { LinkButton } from '@/components/shared/link-button'
import { useCart } from '@/lib/cart-context'
import { OrderSummary } from './order-summary'

const schema = z.object({
  name: z.string().trim().min(2, 'Вкажіть ім’я та прізвище').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{10,18}$/, 'Телефон у форматі +380…'),
  email: z.string().trim().min(1, 'Вкажіть email').email('Перевірте формат email'),
  delivery: z.enum(['np-branch', 'np-courier', 'pickup'], { error: 'Оберіть спосіб доставки' }),
  city: z.string().trim().max(60).optional(),
  branch: z.string().trim().max(120).optional(),
  comment: z.string().trim().max(500, 'До 500 символів').optional(),
}).superRefine((v, ctx) => {
  if (v.delivery !== 'pickup') {
    if (!v.city) ctx.addIssue({ code: 'custom', path: ['city'], message: 'Вкажіть місто' })
    if (!v.branch) ctx.addIssue({ code: 'custom', path: ['branch'], message: 'Вкажіть відділення або адресу' })
  }
})

type Values = z.infer<typeof schema>

const deliveryOptions = [
  { id: 'np-branch', label: 'Нова пошта, відділення' },
  { id: 'np-courier', label: 'Нова пошта, кур’єр' },
  { id: 'pickup', label: 'Самовивіз з магазину (Одеса)' },
] as const

export function CheckoutForm() {
  const { items, clear } = useCart()
  const [orderNo, setOrderNo] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { delivery: 'np-branch' } })

  const delivery = watch('delivery')

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600))
    const no = `EX-${Date.now().toString().slice(-6)}`
    setOrderNo(no)
    clear()
    toast.success('Замовлення прийнято', { description: `Номер ${no}. Менеджер зв’яжеться з вами для підтвердження.` })
  }

  if (orderNo) {
    return (
      <div role="status" className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-cream p-12 text-center">
        <CheckCircle2 className="size-12 text-primary" aria-hidden />
        <h2 className="text-3xl">Дякуємо за замовлення</h2>
        <p className="max-w-md text-muted-foreground">
          Номер замовлення <strong className="text-foreground">{orderNo}</strong>. Менеджер зв’яжеться з вами для
          підтвердження.
        </p>
        <LinkButton href="/guides">Поки чекаєте, почитайте гайди</LinkButton>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-caramel/50 bg-cream p-12 text-center">
        <h2 className="text-2xl">Кошик порожній</h2>
        <p className="text-muted-foreground">Додайте товари, щоб оформити замовлення.</p>
        <LinkButton href="/catalog">До каталогу</LinkButton>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <form
        id="checkout-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-8 rounded-2xl border border-border bg-cream p-6 md:p-8"
      >
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-serif text-2xl">Контактні дані</legend>
          <FormField id="co-name" label="Ім’я та прізвище" error={errors.name?.message} className="sm:col-span-2">
            <input {...fieldAria('co-name', errors.name?.message)} {...register('name')} autoComplete="name" className={inputClass} />
          </FormField>
          <FormField id="co-phone" label="Телефон" error={errors.phone?.message}>
            <input
              {...fieldAria('co-phone', errors.phone?.message)}
              {...register('phone')}
              type="tel"
              autoComplete="tel"
              placeholder="+380…"
              className={inputClass}
            />
          </FormField>
          <FormField id="co-email" label="Email" error={errors.email?.message}>
            <input
              {...fieldAria('co-email', errors.email?.message)}
              {...register('email')}
              type="email"
              autoComplete="email"
              className={inputClass}
            />
          </FormField>
        </fieldset>

        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-serif text-2xl">Доставка</legend>
          <div className="flex flex-col gap-3 sm:col-span-2" role="radiogroup" aria-label="Спосіб доставки">
            {deliveryOptions.map((o) => (
              <label
                key={o.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 text-sm has-[:checked]:border-primary"
              >
                <input type="radio" value={o.id} {...register('delivery')} className="size-4 accent-primary" />
                {o.label}
              </label>
            ))}
          </div>
          {delivery !== 'pickup' ? (
            <>
              <FormField id="co-city" label="Місто" error={errors.city?.message}>
                <input
                  {...fieldAria('co-city', errors.city?.message)}
                  {...register('city')}
                  autoComplete="address-level2"
                  className={inputClass}
                />
              </FormField>
              <FormField
                id="co-branch"
                label={delivery === 'np-courier' ? 'Адреса' : 'Номер відділення'}
                error={errors.branch?.message}
              >
                <input {...fieldAria('co-branch', errors.branch?.message)} {...register('branch')} className={inputClass} />
              </FormField>
            </>
          ) : null}
          <FormField id="co-comment" label="Коментар до замовлення" optional error={errors.comment?.message} className="sm:col-span-2">
            <textarea {...fieldAria('co-comment', errors.comment?.message)} {...register('comment')} className={textareaClass} />
          </FormField>
        </fieldset>

        <div className="rounded-xl bg-surface p-4 text-sm text-muted-foreground">
          Оплата при отриманні або за посиланням після підтвердження менеджером.
        </div>
      </form>

      <OrderSummary compact>
        <Button type="submit" form="checkout-form" disabled={isSubmitting} className="h-12 w-full rounded-full">
          {isSubmitting ? 'Оформлюємо…' : 'Підтвердити замовлення'}
        </Button>
      </OrderSummary>
    </div>
  )
}
