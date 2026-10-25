'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormField, fieldAria, inputClass, textareaClass } from '@/components/shared/form-field'

const species = ['Змія', 'Геккон або ящірка', 'Черепаха', 'Шиншила', 'Їжак', 'Дегу', 'Цукровий летяга', 'Інше'] as const
const experience = ['Немає досвіду', 'До 1 року', '1–3 роки', 'Понад 3 роки'] as const

const conditions = [
  { id: 'enclosureReady', label: 'Тераріум або клітка вже готові' },
  { id: 'heatingSet', label: 'Обігрів налаштований і перевірений' },
  { id: 'hasVet', label: 'Є ветеринар, що працює з екзотами' },
] as const

const schema = z.object({
  species: z.enum(species, { error: 'Оберіть вид тварини' }),
  name: z.string().trim().min(2, 'Вкажіть ім’я').max(60, 'Занадто довге ім’я'),
  contact: z
    .string()
    .trim()
    .min(1, 'Вкажіть телефон або Telegram')
    .refine(
      (v) => /^\+?[\d\s()-]{10,18}$/.test(v) || /^@[a-zA-Z0-9_]{5,32}$/.test(v),
      'Телефон у форматі +380… або Telegram у форматі @нікнейм',
    ),
  experience: z.enum(experience, { error: 'Оберіть рівень досвіду' }),
  enclosureReady: z.boolean(),
  heatingSet: z.boolean(),
  hasVet: z.boolean(),
  comment: z.string().trim().max(600, 'До 600 символів').optional(),
})

type Values = z.infer<typeof schema>

export function AnimalRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { enclosureReady: false, heatingSet: false, hasVet: false, comment: '' },
  })

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 500))
    const ready = values.enclosureReady && values.heatingSet && values.hasVet
    toast.success('Запит надіслано', {
      description: ready
        ? 'Зв’яжемося протягом робочого дня, щоб пройти чек-лист.'
        : 'Ми надішлемо чек-лист підготовки умов. Тварину підбираємо лише після нього.',
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FormField id="req-species" label="Вид тварини" error={errors.species?.message}>
        <select {...fieldAria('req-species', errors.species?.message)} {...register('species')} className={inputClass} defaultValue="">
          <option value="" disabled>
            Оберіть вид
          </option>
          {species.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="req-experience" label="Досвід утримання" error={errors.experience?.message}>
        <select
          {...fieldAria('req-experience', errors.experience?.message)}
          {...register('experience')}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Оберіть варіант
          </option>
          {experience.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="req-name" label="Ім’я" error={errors.name?.message}>
        <input {...fieldAria('req-name', errors.name?.message)} {...register('name')} autoComplete="given-name" className={inputClass} />
      </FormField>

      <FormField id="req-contact" label="Телефон або Telegram" error={errors.contact?.message}>
        <input
          {...fieldAria('req-contact', errors.contact?.message)}
          {...register('contact')}
          placeholder="+380… або @нікнейм"
          className={inputClass}
        />
      </FormField>

      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-sm font-semibold">Що вже готово</legend>
        <div className="flex flex-col gap-3">
          {conditions.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" {...register(c.id)} className="size-5 rounded border-input accent-primary" />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <FormField id="req-comment" label="Коментар" optional error={errors.comment?.message} className="sm:col-span-2">
        <textarea
          {...fieldAria('req-comment', errors.comment?.message)}
          {...register('comment')}
          placeholder="Наприклад, бажаний морф або вік тварини"
          className={textareaClass}
        />
      </FormField>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isSubmitting} className="h-12 rounded-full px-8">
          {isSubmitting ? 'Надсилаємо…' : 'Надіслати запит'}
        </Button>
        <p className="text-xs text-muted-foreground">Запит ні до чого не зобов’язує. Ми не передаємо дані третім особам.</p>
      </div>
    </form>
  )
}
