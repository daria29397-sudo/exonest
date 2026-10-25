import { cn } from '@/lib/utils'

export function Wordmark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  const ink = inverted ? '#F6EFE4' : '#722F37'
  return (
    <svg
      viewBox="0 0 168 40"
      className={cn('h-8 w-auto', className)}
      role="img"
      aria-label="ExoNest"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>ExoNest</title>
      <path d="M4 26 C4 14 14 6 24 6 C34 6 40 14 40 22" fill="none" stroke="#9A5B3C" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M6 30 C14 36 30 36 38 30" fill="none" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M10 25 C16 30 28 30 34 25" fill="none" stroke="#C2A878" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="15" r="2.4" fill={ink} />
      <text
        x="50"
        y="29"
        fill={ink}
        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 25, fontWeight: 600, letterSpacing: '-0.01em' }}
      >
        ExoNest
      </text>
    </svg>
  )
}
