import { Photo } from '@/components/shared/photo'
import { LinkButton } from '@/components/shared/link-button'
import { Container } from '@/components/shared/section'
import { photos } from '@/lib/photos'

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center">
      <div className="relative size-32 overflow-hidden rounded-full" aria-hidden>
        <Photo photo={photos.treePython} sizes="128px" decorative />
      </div>
      <p className="font-serif text-6xl text-primary">404</p>
      <h1 className="text-3xl md:text-4xl">Ця сторінка сховалася під корч</h1>
      <p className="max-w-md text-muted-foreground">
        Можливо, посилання застаріло або в адресі помилка. Спробуйте почати з головної або каталогу.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <LinkButton href="/">На головну</LinkButton>
        <LinkButton href="/catalog" variant="outline">
          Каталог
        </LinkButton>
      </div>
    </Container>
  )
}
