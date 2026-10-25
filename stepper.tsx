const steps = ['Запит', 'Чек-лист умов', 'Підбір перевіреного постачальника', 'Документи про походження', 'Передача']

export function Stepper() {
  return (
    <div>
      <div className="hidden overflow-x-auto md:block">
        <svg
          viewBox="0 0 1000 150"
          role="img"
          aria-labelledby="stepper-title"
          className="h-auto w-full"
          fontFamily="var(--font-sans), sans-serif"
        >
          <title id="stepper-title">Пять кроків замовлення тварини: {steps.join(', ')}</title>
          <line x1="100" y1="45" x2="900" y2="45" stroke="#9A5B3C" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 6" />
          {steps.map((s, i) => {
            const cx = 100 + i * 200
            const words = s.split(' ')
            const lines = words.length > 2 ? [words.slice(0, 2).join(' '), words.slice(2).join(' ')] : [s]
            return (
              <g key={s}>
                <circle cx={cx} cy={45} r={30} fill={i === 0 ? '#722F37' : '#F6EFE4'} stroke="#722F37" strokeWidth="2" />
                <text
                  x={cx}
                  y={52}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="700"
                  fill={i === 0 ? '#F6EFE4' : '#722F37'}
                >
                  {i + 1}
                </text>
                {lines.map((l, li) => (
                  <text key={l} x={cx} y={105 + li * 20} textAnchor="middle" fontSize="15" fill="#4A2420">
                    {l}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>
      <ol className="flex flex-col gap-3 md:sr-only">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-4 rounded-xl border border-border bg-cream p-4">
            <span
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-primary font-semibold text-primary"
              aria-hidden
            >
              {i + 1}
            </span>
            <span>
              <span className="sr-only">Крок {i + 1}: </span>
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
