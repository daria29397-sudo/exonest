import { Chinchilla, Gecko, Hedgehog, Snake, Turtle } from '@/components/illustrations'

type Walker = {
  Animal: (props: { className?: string }) => React.ReactElement
  bottom: string
  width: string
  duration: number
  delay: number
  opacity: number
  back?: boolean
}

// Усі векторні тварини дивляться праворуч; `back` розвертає їх і пускає справа наліво.
const walkers: Walker[] = [
  { Animal: Gecko, bottom: '4vh', width: 'w-24 md:w-36', duration: 90, delay: -25, opacity: 0.22 },
  { Animal: Hedgehog, bottom: '22vh', width: 'w-20 md:w-32', duration: 130, delay: -80, opacity: 0.18, back: true },
  { Animal: Turtle, bottom: '2vh', width: 'w-24 md:w-40', duration: 170, delay: -120, opacity: 0.2, back: true },
  { Animal: Chinchilla, bottom: '40vh', width: 'w-16 md:w-28', duration: 110, delay: -50, opacity: 0.16 },
  { Animal: Snake, bottom: '12vh', width: 'w-24 md:w-36', duration: 150, delay: -10, opacity: 0.2 },
]

export function AmbientAnimals() {
  return (
    <div aria-hidden className="exo-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {walkers.map(({ Animal, bottom, width, duration, delay, opacity, back }, i) => (
        <div
          key={i}
          className="exo-walker absolute left-0"
          data-dir={back ? 'back' : 'forward'}
          style={{ bottom, opacity, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
        >
          <div className="exo-bob" style={{ animationDuration: `${1.4 + (i % 3) * 0.5}s` }}>
            <div style={back ? { transform: 'scaleX(-1)' } : undefined}>
              <Animal className={`${width} h-auto`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
