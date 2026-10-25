export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 168 36"
      className={className}
      role="img"
      aria-labelledby="exonest-wordmark-title"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="exonest-wordmark-title">ExoNest</title>
      <g>
        <path d="M18 3 C27 3 33 10 33 18 C33 27 26 33 18 33 C9 33 3 27 3 18 C3 10 9 3 18 3 Z" fill="#722F37" />
        <path
          d="M10 22 C13 16 19 14 25 15 C22 17 20 20 19 25"
          fill="none"
          stroke="#F6EFE4"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path d="M11 25 C15 26 21 26 26 24" fill="none" stroke="#C2A878" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="23" cy="12" r="1.8" fill="#F6EFE4" />
      </g>
      <text
        x="42"
        y="25"
        fill="#4A2420"
        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '21px', fontWeight: 600 }}
      >
        Exo
        <tspan fill="#722F37">Nest</tspan>
      </text>
    </svg>
  )
}
