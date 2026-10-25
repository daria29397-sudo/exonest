'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormField, fieldAria, inputClass, textareaClass } from '@/components/shared/form-field'

export const contactTopics = [
  { id: 'general', label: 'Загальне питання' },
  { id: 'care', label: 'Консультація з утримання' },
  { id: 'subscription-start', label: 'Підписка «Старт»' },
  { id: 'subscription-standard', label: 'Підписка «Стандарт»' },
  { id: 'subscription-advanced', label: 'Підписка «Просунутий»' },
  { id: 'rental', label: 'Прокат або тимчасове утримання' },
  { id: 'wholesale', label: 'Гурт для заводчиків' },
] as const

const topicIds = contactTopics.map((t) => t.id) as [string, ...string[]]

const schema = z.object({
  topic: z.enum(topicIds, { error: 'Оберіть тему' }),
  name: z.string().trim().min(2, 'Вкажіть ім’я').max(60, 'Занадто довге ім’я'),
  email: z.string().trim().min(1, 'Вкажіть email').email('Перевірте формат email'),
  message: z.string().trim().min(10, 'Опишіть питання трохи детальніше').max(1000, 'До 1000 символів'),
})

type Values = z.infer<typeof schema>

export function ContactForm({ defaultTopic }: { defaultTopic: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { topic: topicIds.includes(defaultTopic) ? defaultTopic : 'general' },
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success('Повідомлення надіслано', {
      description: 'Відповімо протягом робочого дня.',
    })
    reset({ topic: 'general', name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FormField id="c-topic" label="Тема" error={errors.topic?.message} className="sm:col-span-2">
        <select {...fieldAria('c-topic', errors.topic?.message)} {...register('topic')} className={inputClass}>
          {contactTopics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="c-name" label="Ім’я" error={errors.name?.message}>
        <input {...fieldAria('c-name', errors.name?.message)} {...register('name')} autoComplete="name" className={inputClass} />
      </FormField>
      <FormField id="c-email" label="Email" error={errors.email?.message}>
        <input
          {...fieldAria('c-email', errors.email?.message)}
          {...register('email')}
          type="email"
          autoComplete="email"
          className={inputClass}
        />
      </FormField>
      <FormField id="c-message" label="Повідомлення" error={errors.message?.message} className="sm:col-span-2">
        <textarea {...fieldAria('c-message', errors.message?.message)} {...register('message')} className={textareaClass} />
      </FormField>
      <Button type="submit" disabled={isSubmitting} className="h-12 rounded-full px-8 sm:col-span-2 sm:justify-self-start">
        {isSubmitting ? 'Надсилаємо…' : 'Надіслати'}
      </Button>
    </form>
  )
}
