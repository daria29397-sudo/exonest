import type { AnimalType, CategoryId } from '@/data/types'

export interface PhotoData {
  src: string
  alt: string
  position: string
}

export const photos = {
  leopardGecko: { src: '/images/animals/leopard-gecko.jpg', alt: 'Леопардовий геккон на камені', position: 'center 30%' },
  crestedGecko: { src: '/images/kits/gecko.jpg', alt: 'Чубатий геккон на корчі', position: 'center 40%' },
  royalPython: { src: '/images/animals/royal-python.jpg', alt: 'Королівський пітон на гілці', position: 'center 70%' },
  treePython: { src: '/images/kits/snake.jpg', alt: 'Зелений деревний пітон', position: 'center 30%' },
  chinchillaRock: { src: '/images/kits/chinchilla.jpg', alt: 'Шиншила на камені', position: 'center 40%' },
  chinchillaBaby: { src: '/images/animals/chinchilla.jpg', alt: 'Молода шиншила', position: 'left center' },
  hedgehogGrass: { src: '/images/kits/hedgehog.jpg', alt: 'Африканський їжак на траві', position: 'center 40%' },
  hedgehogBaby: { src: '/images/animals/hedgehog.jpg', alt: 'Малюк їжака на долоні', position: 'center' },
  terrarium: { src: '/images/smart-terrarium.jpg', alt: 'Облаштований тераріум з підсвічуванням', position: 'center' },
} satisfies Record<string, PhotoData>

const pools: Partial<Record<AnimalType, PhotoData[]>> = {
  snakes: [photos.treePython, photos.royalPython],
  geckos: [photos.crestedGecko, photos.leopardGecko],
  chinchillas: [photos.chinchillaRock, photos.chinchillaBaby],
  'small-mammals': [photos.chinchillaBaby, photos.chinchillaRock],
  hedgehogs: [photos.hedgehogGrass, photos.hedgehogBaby],
}

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

/** Підбирає фото для товару чи гайда за твариною й категорією. */
export function photoFor(key: string, animals: AnimalType[] = [], category?: CategoryId): PhotoData {
  const first = animals[0]
  if (category === 'enclosures' && (first === 'snakes' || first === 'geckos' || first === 'turtles')) {
    return photos.terrarium
  }
  const pool = first ? pools[first] : undefined
  if (!pool) return photos.terrarium
  return category === 'kits' ? pool[0] : pool[hash(key) % pool.length]
}
