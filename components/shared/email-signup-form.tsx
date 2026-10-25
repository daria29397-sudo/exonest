'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().trim().min(1, 'Вкажіть email').email('Перевірте формат email'),
})

type Values = z.infer<typeof schema>

export function EmailSignupForm({
  id,
  buttonLabel = 'Підписатися',
  successTitle = 'Дякуємо!',
  successText = 'Ми надішлемо лист підтвердження.',
  tone = 'light',
}: {
  id: string
  buttonLabel?: string
  successTitle?: string
  successText?: string
  tone?: 'light' | 'dark'
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400))
    toast.success(successTitle, { description: successText })
    reset()
  }

  const errorId = `${id}-error`

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full max-w-md flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email
        </label>
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="ваш@email.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId : undefined}
          {...register('email')}
          className={cn(
            'h-12 flex-1 rounded-full border px-5 text-sm focus-visible:outline-2',
            tone === 'dark'
              ? 'border-cream/40 bg-transparent text-cream placeholder:text-cream/70 focus-visible:outline-cream'
              : 'border-input bg-cream text-foreground placeholder:text-muted-foreground',
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'h-12 rounded-full px-6 text-sm',
            tone === 'dark' && 'bg-cream text-primary hover:bg-cream/90 focus-visible:ring-cream/60',
          )}
        >
          {isSubmitting ? 'Надсилаємо…' : buttonLabel}
        </Button>
      </div>
      {errors.email ? (
        <p id={errorId} role="alert" className={cn('px-5 text-sm', tone === 'dark' ? 'text-cream' : 'text-destructive')}>
          {errors.email.message}
        </p>
      ) : null}
    </form>
  )
}
