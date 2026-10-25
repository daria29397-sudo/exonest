import { PageHeader } from './page-header'
import { Container } from './section'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} title={title} intro={intro} />
      <Container className="py-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <p className="text-sm text-muted-foreground">Оновлено: {updated}.</p>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 text-2xl">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mb-3 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.list ? (
                <ul className="flex list-disc flex-col gap-2 pl-6 leading-relaxed marker:text-caramel">
                  {s.list.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}
