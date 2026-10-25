import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { EmailSignupForm } from '@/components/shared/email-signup-form'
import { Photo } from '@/components/shared/photo'
import { photos } from '@/lib/photos'
import { Section, SectionHeading } from '@/components/shared/section'

const faq = [
  {
    q: 'Ви продаєте тварин?',
    a: 'Ні, ми не зоомагазин. У нашому магазині живе кілька тварин як приклад правильного утримання. Тварину можна замовити лише після чек-листу умов, і ми підбираємо перевіреного постачальника з документами про походження.',
  },
  {
    q: 'Чим набір кращий за окремі товари?',
    a: 'Усі елементи набору сумісні: потужність обігріву розрахована під об’єм тераріуму, термостат підходить до килимка, а субстрату вистачає на перше заповнення. Ви не докуповуєте забуте в перший тиждень.',
  },
  {
    q: 'Як ви доставляєте живий корм?',
    a: 'Кормових комах відправляємо у вентильованих контейнерах із запасом корму, лише з понеділка по середу, щоб посилка не залежувалась на вихідних. Узимку додаємо термопакет.',
  },
  {
    q: 'Що, якщо обладнання не підійде?',
    a: 'Нерозпаковане обладнання можна повернути протягом 14 днів. Якщо сумніваєтесь, візьміть його в прокат на тиждень перед покупкою.',
  },
  {
    q: 'Чи допомагаєте ви з налаштуванням?',
    a: 'Так. До кожного набору додаємо друкований чек-лист, а в месенджері відповідаємо на питання щодо температур, освітлення й годування.',
  },
]

export function Faq() {
  return (
    <Section labelledBy="faq-title" className="bg-surface/60">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="Питання"
          title="Що нас найчастіше питають"
          intro="Не знайшли відповідь? Напишіть нам у Telegram, відповідаємо в робочі години."
        />
        <Accordion className="rounded-2xl border border-border bg-cream px-5">
          {faq.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="py-5 font-serif text-lg hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}

export function Newsletter() {
  return (
    <Section labelledBy="newsletter-title">
      <div className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-cream p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div className="flex items-center gap-6">
          <div className="relative hidden size-24 shrink-0 overflow-hidden rounded-2xl bg-surface sm:block" aria-hidden>
            <Photo photo={photos.hedgehogBaby} sizes="96px" decorative />
          </div>
          <div>
            <h2 id="newsletter-title" className="text-3xl leading-tight">
              Один лист на місяць
            </h2>
            <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">
              Сезонні поради, нові гайди та попередження про зміни в асортименті. Без реклами щодня.
            </p>
          </div>
        </div>
        <EmailSignupForm id="newsletter-email" />
      </div>
    </Section>
  )
}
