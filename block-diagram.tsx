const C = {
  box: '#F6EFE4',
  stroke: '#9A5B3C',
  primary: '#722F37',
  sand: '#C2A878',
  text: '#4A2420',
  surface: '#E9DCC0',
}

function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  strong,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub: string
  strong?: boolean
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={strong ? C.primary : C.box} stroke={C.stroke} strokeOpacity={0.5} />
      <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" fontSize="17" fontWeight="700" fill={strong ? C.box : C.text}>
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" fontSize="13" fill={strong ? C.sand : C.stroke}>
        {sub}
      </text>
    </g>
  )
}

function Arrow({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={C.primary} strokeWidth={2} markerEnd="url(#arrow)" />
}

export function BlockDiagram() {
  return (
    <figure className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-4">
        <svg
          viewBox="0 0 960 360"
          role="img"
          aria-labelledby="diagram-title diagram-desc"
          className="h-auto w-full min-w-[640px]"
          fontFamily="var(--font-sans), sans-serif"
        >
          <title id="diagram-title">Схема роботи smart-тераріуму</title>
          <desc id="diagram-desc">
            Датчики температури й вологості передають дані на плату ESP32. Плата керує реле обігріву та реле
            зволоження і надсилає сповіщення в Telegram-бот.
          </desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill={C.primary} />
            </marker>
          </defs>

          <Node x={20} y={50} w={200} h={90} title="Датчик температури" sub="DS18B20, 2 зони" />
          <Node x={20} y={220} w={200} h={90} title="Датчик вологості" sub="SHT31" />

          <Node x={380} y={120} w={200} h={120} title="ESP32" sub="логіка й розклад" strong />

          <Node x={740} y={20} w={200} h={90} title="Реле обігріву" sub="лампа / килимок" />
          <Node x={740} y={135} w={200} h={90} title="Реле зволоження" sub="туманоутворювач" />
          <Node x={740} y={250} w={200} h={90} title="Telegram-бот" sub="сповіщення й звіти" />

          <Arrow d="M220 95 C300 95 300 160 376 160" />
          <Arrow d="M220 265 C300 265 300 200 376 200" />
          <Arrow d="M580 150 C660 150 660 65 736 65" />
          <Arrow d="M580 180 L736 180" />
          <Arrow d="M580 210 C660 210 660 295 736 295" />

          <text x={298} y={40} textAnchor="middle" fontSize="12" fill={C.stroke}>
            вимірювання
          </text>
          <text x={658} y={40} textAnchor="middle" fontSize="12" fill={C.stroke}>
            керування
          </text>
        </svg>
      </div>
      <figcaption className="text-sm text-muted-foreground">
        Датчики {'→'} ESP32 {'→'} реле обігріву та зволоження, сповіщення в Telegram.
      </figcaption>
    </figure>
  )
}
