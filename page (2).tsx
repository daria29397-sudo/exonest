import type { Metadata } from 'next'
import { BellRing, Gauge, Power } from 'lucide-react'
import { BlockDiagram } from '@/components/smart/block-diagram'
import { EmailSignupForm } from '@/components/shared/email-signup-form'
import { FadeIn } from '@/components/shared/fade-in'
import { PageHeader } from '@/components/shared/page-header'
import { Section, SectionHeading } from '@/components/shared/section'

export const metadata: Metadata = {
  title: 'Smart-тераріум',
  description:
    'Контролер клімату для тераріуму на ESP32: датчики температури й вологості, автоматичний обігрів і зволоження, сповіщення в Telegram. Запишіться в лист очікування.',
  alternates: { canonical: '/smart-terrarium' },
  openGraph: { title: 'Smart-тераріум ExoNest', description: 'Клімат у тераріумі під наглядом 24/7.' },
}

const ideas = [
  {
    icon: Gauge,
    title: 'Вимірює',
    text: 'Два датчики температури (тепла й прохолодна зони) та датчик вологості знімають показники щохвилини.',
  },
  {
    icon: Power,
    title: 'Керує',
    text: 'Плата вмикає обігрів і туманоутворювач за заданими межами та розкладом день/ніч.',
  },
  {
    icon: BellRing,
    title: 'Попереджає',
    text: 'Якщо температура вийшла за межі або зникло живлення, Telegram-бот одразу надсилає повідомлення.',
  },
]

const specs = [
  ['Контролер', 'ESP32, Wi-Fi 2,4 ГГц'],
  ['Датчики температури', '2 × DS18B20, точність ±0,5 °C'],
  ['Датчик вологості', 'SHT31, точність ±2 %'],
  ['Виходи', '2 реле, до 300 Вт кожне'],
  ['Сповіщення', 'Telegram-бот, щоденний звіт'],
  ['Живлення', '230 В, адаптер у комплекті'],
  ['Захист', 'Аварійне вимкнення обігріву при перегріві'],
  ['Статус', 'Прототип, тестується в магазині'],
]

export default function SmartTerrariumPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Smart-тераріум' }]}
        eyebrow="Скоро"
        title="Smart-тераріум: стабільний клімат, навіть коли вас немає вдома"
        intro="Більшість проблем зі здоров’ям рептилій пов’язані з температурою та вологістю. Ми розробляємо простий контролер, який стежить за ними замість вас."
      />

      <Section labelledBy="idea-title">
        <SectionHeading id="idea-title" eyebrow="Ідея" title="Три задачі одного пристрою" />
        <ul className="grid gap-4 md:grid-cols-3">
          {ideas.map((i, idx) => (
            <li key={i.title}>
              <FadeIn delay={idx * 0.05} className="h-full rounded-2xl border border-border bg-cream p-6">
                <span className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-surface text-primary">
                  <i.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-serif text-xl">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="diagram-heading" className="bg-surface/60">
        <SectionHeading id="diagram-heading" eyebrow="Схема" title="Як усе з’єднано" />
        <BlockDiagram />
      </Section>

      <Section labelledBy="specs-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            id="specs-title"
            eyebrow="Характеристики"
            title="Попередні специфікації"
            intro="Можуть змінитися за результатами тестування."
          />
          <table className="w-full overflow-hidden rounded-2xl border border-border text-sm">
            <caption className="sr-only">Попередні характеристики smart-тераріуму</caption>
            <tbody>
              {specs.map(([k, v], i) => (
                <tr key={k} className={i % 2 === 0 ? 'bg-cream' : 'bg-surface/60'}>
                  <th scope="row" className="w-2/5 px-4 py-3 text-left font-normal text-muted-foreground">
                    {k}
                  </th>
                  <td className="px-4 py-3 font-medium">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="waitlist-title" className="pt-0 md:pt-0">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-primary p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold text-cream">Скоро</p>
            <h2 id="waitlist-title" className="text-3xl text-cream">
              Лист очікування
            </h2>
            <p className="mt-2 max-w-md text-cream/85">
              Повідомимо першими, коли відкриємо передзамовлення. Перша партія буде невеликою.
            </p>
          </div>
          <EmailSignupForm
            id="waitlist-email"
            tone="dark"
            buttonLabel="Записатися"
            successTitle="Ви в списку"
            successText="Повідомимо про старт передзамовлення."
          />
        </div>
      </Section>
    </>
  )
}
