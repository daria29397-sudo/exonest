import type { AnimalType, IllustrationKey } from '@/data/types'

const C = {
  wine: '#722F37',
  caramel: '#9A5B3C',
  sand: '#C2A878',
  surface: '#E9DCC0',
  cream: '#F6EFE4',
  ink: '#4A2420',
  paper: '#F2E8D5',
}

interface IllProps {
  className?: string
  title?: string
}

function Svg({
  title,
  className,
  viewBox,
  children,
}: IllProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

/* ---------- Shapes (reusable <g> groups) ---------- */

function GeckoShape() {
  return (
    <g>
      <path
        d="M62 72 C34 74 22 92 32 104 C40 113 56 108 52 98"
        fill="none"
        stroke={C.caramel}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <g stroke={C.caramel} strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M78 78 L70 94 L62 96" />
        <path d="M84 60 L76 46 L68 44" />
        <path d="M124 80 L132 96 L140 98" />
        <path d="M120 58 L128 44 L136 42" />
      </g>
      <ellipse cx="100" cy="69" rx="42" ry="17" fill={C.caramel} />
      <ellipse cx="148" cy="64" rx="20" ry="14" fill={C.caramel} />
      <circle cx="88" cy="64" r="3.5" fill={C.sand} />
      <circle cx="102" cy="74" r="3" fill={C.sand} />
      <circle cx="112" cy="62" r="3.5" fill={C.sand} />
      <circle cx="76" cy="72" r="2.5" fill={C.sand} />
      <circle cx="155" cy="59" r="3.5" fill={C.ink} />
      <circle cx="156" cy="58" r="1" fill={C.cream} />
      <path d="M160 70 Q164 69 166 66" stroke={C.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  )
}

function SnakeShape() {
  return (
    <g>
      <path
        d="M30 100 C30 70 80 70 80 100 C80 125 130 125 130 95 C130 70 160 60 172 70"
        fill="none"
        stroke={C.wine}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M30 100 C30 70 80 70 80 100 C80 125 130 125 130 95 C130 70 160 60 172 70"
        fill="none"
        stroke={C.sand}
        strokeWidth="3"
        strokeDasharray="4 14"
        strokeLinecap="round"
      />
      <ellipse cx="178" cy="70" rx="14" ry="10" fill={C.wine} transform="rotate(20 178 70)" />
      <circle cx="182" cy="66" r="2.5" fill={C.cream} />
      <path d="M191 76 L200 78 M200 78 L204 75 M200 78 L204 81" stroke={C.wine} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  )
}

function ChinchillaShape() {
  return (
    <g>
      <path d="M52 104 C30 104 22 84 34 74" fill="none" stroke={C.sand} strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="96" cy="88" rx="44" ry="34" fill={C.sand} />
      <ellipse cx="126" cy="58" rx="30" ry="26" fill={C.sand} />
      <ellipse cx="110" cy="30" rx="12" ry="18" fill={C.sand} />
      <ellipse cx="142" cy="30" rx="12" ry="18" fill={C.sand} />
      <ellipse cx="110" cy="32" rx="6" ry="11" fill={C.caramel} opacity="0.55" />
      <ellipse cx="142" cy="32" rx="6" ry="11" fill={C.caramel} opacity="0.55" />
      <ellipse cx="96" cy="96" rx="26" ry="18" fill={C.surface} />
      <circle cx="134" cy="56" r="4" fill={C.ink} />
      <circle cx="135" cy="55" r="1.2" fill={C.cream} />
      <circle cx="152" cy="66" r="3" fill={C.wine} />
      <g stroke={C.ink} strokeWidth="1" strokeLinecap="round">
        <path d="M154 66 L172 62" />
        <path d="M154 68 L172 70" />
      </g>
      <ellipse cx="80" cy="120" rx="10" ry="5" fill={C.caramel} />
      <ellipse cx="116" cy="120" rx="10" ry="5" fill={C.caramel} />
    </g>
  )
}

function HedgehogShape() {
  return (
    <g>
      <path
        d="M30 104 L36 84 L40 96 L46 70 L52 90 L60 60 L66 84 L76 54 L82 80 L92 50 L98 78 L110 52 L114 80 L126 60 L128 86 L140 72 L138 104 Z"
        fill={C.caramel}
      />
      <path d="M40 104 C40 74 70 62 100 62 C126 62 140 80 140 104 Z" fill={C.wine} />
      <path d="M136 104 C136 88 150 78 170 92 C176 96 176 100 170 102 L140 106 Z" fill={C.sand} />
      <circle cx="174" cy="97" r="3.5" fill={C.ink} />
      <circle cx="152" cy="90" r="3" fill={C.ink} />
      <circle cx="153" cy="89" r="0.9" fill={C.cream} />
      <ellipse cx="72" cy="108" rx="9" ry="4" fill={C.sand} />
      <ellipse cx="124" cy="108" rx="9" ry="4" fill={C.sand} />
    </g>
  )
}

function TurtleShape() {
  return (
    <g>
      <ellipse cx="62" cy="104" rx="12" ry="7" fill={C.sand} />
      <ellipse cx="138" cy="104" rx="12" ry="7" fill={C.sand} />
      <path d="M150 84 C166 76 180 80 182 90 C184 98 172 100 156 94 Z" fill={C.sand} />
      <circle cx="172" cy="86" r="2.5" fill={C.ink} />
      <path d="M40 96 C40 54 76 40 100 40 C124 40 160 54 160 96 Z" fill={C.caramel} />
      <g fill="none" stroke={C.sand} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M88 52 L112 52 L120 68 L112 84 L88 84 L80 68 Z" />
        <path d="M80 68 L58 70 M120 68 L142 70 M88 84 L80 96 M112 84 L120 96 M88 52 L80 44 M112 52 L120 44" />
      </g>
      <rect x="36" y="94" width="128" height="8" rx="4" fill={C.wine} />
    </g>
  )
}

function LeavesShape() {
  return (
    <g>
      <path d="M100 150 C100 110 96 70 84 30" stroke={C.caramel} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M92 64 C70 50 50 56 40 72 C60 80 80 76 92 64 Z" fill={C.sand} />
      <path d="M96 96 C120 80 144 86 156 102 C134 112 110 108 96 96 Z" fill={C.caramel} />
      <path d="M88 44 C96 22 116 14 132 18 C126 38 108 48 88 44 Z" fill={C.wine} />
      <path d="M98 124 C78 112 56 118 46 132 C66 140 86 136 98 124 Z" fill={C.caramel} opacity="0.8" />
    </g>
  )
}

function HeatLampShape() {
  return (
    <g>
      <rect x="96" y="6" width="8" height="30" rx="3" fill={C.ink} />
      <path d="M50 76 C50 46 72 32 100 32 C128 32 150 46 150 76 Z" fill={C.wine} />
      <rect x="44" y="72" width="112" height="10" rx="5" fill={C.caramel} />
      <circle cx="100" cy="92" r="14" fill={C.cream} stroke={C.sand} strokeWidth="3" />
      <g stroke={C.caramel} strokeWidth="4" strokeLinecap="round">
        <path d="M100 116 L100 136" />
        <path d="M76 110 L64 126" />
        <path d="M124 110 L136 126" />
        <path d="M58 98 L40 104" />
        <path d="M142 98 L160 104" />
      </g>
    </g>
  )
}

function ThermometerShape() {
  return (
    <g>
      <rect x="86" y="14" width="28" height="110" rx="14" fill={C.cream} stroke={C.caramel} strokeWidth="4" />
      <rect x="96" y="54" width="8" height="80" rx="4" fill={C.wine} />
      <circle cx="100" cy="138" r="20" fill={C.wine} stroke={C.caramel} strokeWidth="4" />
      <g stroke={C.ink} strokeWidth="2.5" strokeLinecap="round">
        <path d="M122 30 L134 30" />
        <path d="M122 50 L130 50" />
        <path d="M122 70 L134 70" />
        <path d="M122 90 L130 90" />
        <path d="M122 110 L134 110" />
      </g>
    </g>
  )
}

function CageShape() {
  return (
    <g>
      <rect x="40" y="20" width="120" height="130" rx="10" fill="none" stroke={C.caramel} strokeWidth="5" />
      <g stroke={C.caramel} strokeWidth="2.5" opacity="0.7">
        {[56, 72, 88, 104, 120, 136, 148].map((x) => (
          <path key={x} d={`M${x} 22 L${x} 148`} />
        ))}
      </g>
      <rect x="44" y="60" width="64" height="7" rx="3" fill={C.sand} />
      <rect x="92" y="100" width="64" height="7" rx="3" fill={C.sand} />
      <rect x="36" y="146" width="128" height="10" rx="5" fill={C.wine} />
      <path d="M60 60 L60 40 L84 40 L84 60" fill={C.caramel} />
    </g>
  )
}

function JarShape() {
  return (
    <g>
      <rect x="62" y="22" width="76" height="20" rx="6" fill={C.wine} />
      <rect x="54" y="40" width="92" height="110" rx="18" fill={C.cream} stroke={C.caramel} strokeWidth="4" />
      <rect x="66" y="74" width="68" height="42" rx="6" fill={C.sand} />
      <g fill={C.caramel}>
        <ellipse cx="84" cy="96" rx="7" ry="3.5" transform="rotate(-20 84 96)" />
        <ellipse cx="104" cy="90" rx="7" ry="3.5" transform="rotate(15 104 90)" />
        <ellipse cx="118" cy="102" rx="7" ry="3.5" transform="rotate(-10 118 102)" />
      </g>
    </g>
  )
}

function BagShape() {
  return (
    <g>
      <path d="M58 40 L142 40 L156 150 L44 150 Z" fill={C.sand} />
      <path d="M58 40 L142 40 L138 56 L62 56 Z" fill={C.caramel} />
      <rect x="70" y="80" width="60" height="40" rx="8" fill={C.cream} />
      <path d="M84 108 C90 92 100 88 116 90" stroke={C.wine} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="96" r="4" fill={C.wine} />
    </g>
  )
}

function BoxShape() {
  return (
    <g>
      <path d="M30 70 L100 50 L170 70 L100 90 Z" fill={C.sand} />
      <path d="M30 70 L100 90 L100 160 L30 140 Z" fill={C.caramel} />
      <path d="M170 70 L100 90 L100 160 L170 140 Z" fill={C.wine} />
      <path d="M30 70 L10 94 L80 114 L100 90 Z" fill={C.surface} stroke={C.caramel} strokeWidth="2" />
      <path d="M170 70 L190 94 L120 114 L100 90 Z" fill={C.surface} stroke={C.caramel} strokeWidth="2" />
      <path d="M100 50 C90 30 70 26 64 38 C60 48 80 52 100 50 Z" fill={C.cream} stroke={C.caramel} strokeWidth="2" />
      <path d="M100 50 C110 30 130 26 136 38 C140 48 120 52 100 50 Z" fill={C.cream} stroke={C.caramel} strokeWidth="2" />
    </g>
  )
}

/* ---------- Public illustrations ---------- */

export const Gecko = (p: IllProps) => (
  <Svg viewBox="0 0 200 130" {...p}>
    <GeckoShape />
  </Svg>
)
export const Snake = (p: IllProps) => (
  <Svg viewBox="0 0 210 140" {...p}>
    <SnakeShape />
  </Svg>
)
export const Chinchilla = (p: IllProps) => (
  <Svg viewBox="0 0 190 135" {...p}>
    <ChinchillaShape />
  </Svg>
)
export const Hedgehog = (p: IllProps) => (
  <Svg viewBox="0 0 190 125" {...p}>
    <HedgehogShape />
  </Svg>
)
export const Turtle = (p: IllProps) => (
  <Svg viewBox="0 0 200 125" {...p}>
    <TurtleShape />
  </Svg>
)
export const Leaves = (p: IllProps) => (
  <Svg viewBox="0 0 200 160" {...p}>
    <LeavesShape />
  </Svg>
)
export const HeatLamp = (p: IllProps) => (
  <Svg viewBox="0 0 200 145" {...p}>
    <HeatLampShape />
  </Svg>
)
export const Thermometer = (p: IllProps) => (
  <Svg viewBox="30 0 140 165" {...p}>
    <ThermometerShape />
  </Svg>
)
export const Cage = (p: IllProps) => (
  <Svg viewBox="20 10 160 155" {...p}>
    <CageShape />
  </Svg>
)
export const Jar = (p: IllProps) => (
  <Svg viewBox="20 10 160 150" {...p}>
    <JarShape />
  </Svg>
)
export const Bag = (p: IllProps) => (
  <Svg viewBox="20 20 160 145" {...p}>
    <BagShape />
  </Svg>
)
export const Box = (p: IllProps) => (
  <Svg viewBox="0 20 200 150" {...p}>
    <BoxShape />
  </Svg>
)

export function Terrarium({ className, title }: IllProps) {
  return (
    <Svg viewBox="0 0 480 400" className={className} title={title}>
      {/* lamp */}
      <g transform="translate(250 -6) scale(0.7)">
        <HeatLampShape />
      </g>
      {/* glass box */}
      <rect x="40" y="90" width="400" height="270" rx="16" fill={C.cream} />
      <rect x="40" y="90" width="400" height="270" rx="16" fill="none" stroke={C.ink} strokeWidth="6" />
      <rect x="40" y="90" width="400" height="22" rx="10" fill={C.ink} />
      <g stroke={C.cream} strokeWidth="3" opacity="0.6">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${62 + i * 21} 96 L${62 + i * 21} 106`} />
        ))}
      </g>
      {/* glass reflections */}
      <path d="M70 130 L110 130 L80 200 L60 200 Z" fill={C.paper} opacity="0.9" />
      {/* substrate */}
      <path d="M43 300 C120 288 200 296 280 290 C350 285 400 292 437 288 L437 344 C437 352 432 357 424 357 L56 357 C48 357 43 352 43 344 Z" fill={C.sand} />
      <g fill={C.caramel} opacity="0.5">
        <circle cx="90" cy="325" r="3" />
        <circle cx="160" cy="338" r="2.5" />
        <circle cx="230" cy="320" r="3" />
        <circle cx="320" cy="335" r="2.5" />
        <circle cx="390" cy="318" r="3" />
      </g>
      {/* rock / hide */}
      <path d="M300 300 C300 255 340 240 380 248 C410 254 425 280 420 300 Z" fill={C.caramel} />
      <path d="M340 300 C340 284 352 276 364 276 C376 276 386 286 386 300 Z" fill={C.ink} opacity="0.6" />
      {/* branch */}
      <path d="M60 270 C130 250 190 220 270 230" stroke={C.wine} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M180 236 C200 210 210 200 232 196" stroke={C.wine} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* plants */}
      <g transform="translate(40 150) scale(0.9)">
        <LeavesShape />
      </g>
      {/* gecko */}
      <g transform="translate(140 166) scale(0.8)">
        <GeckoShape />
      </g>
      {/* water bowl */}
      <ellipse cx="190" cy="312" rx="38" ry="12" fill={C.wine} />
      <ellipse cx="190" cy="309" rx="30" ry="7" fill={C.surface} />
      {/* thermometer on glass */}
      <g transform="translate(372 120) scale(0.42)">
        <ThermometerShape />
      </g>
      {/* stand */}
      <rect x="30" y="360" width="420" height="16" rx="8" fill={C.caramel} />
    </Svg>
  )
}

const illustrationMap: Record<IllustrationKey, (p: IllProps) => React.JSX.Element> = {
  terrarium: Terrarium,
  gecko: Gecko,
  snake: Snake,
  chinchilla: Chinchilla,
  hedgehog: Hedgehog,
  turtle: Turtle,
  leaves: Leaves,
  'heat-lamp': HeatLamp,
  thermometer: Thermometer,
  cage: Cage,
  jar: Jar,
  bag: Bag,
  box: Box,
}

export function Illustration({ name, ...props }: IllProps & { name: IllustrationKey }) {
  const Component = illustrationMap[name]
  return <Component {...props} />
}

const animalIllustration: Record<AnimalType, IllustrationKey> = {
  snakes: 'snake',
  geckos: 'gecko',
  turtles: 'turtle',
  chinchillas: 'chinchilla',
  hedgehogs: 'hedgehog',
  'small-mammals': 'chinchilla',
}

export const illustrationForAnimal = (animal: AnimalType) => animalIllustration[animal]
