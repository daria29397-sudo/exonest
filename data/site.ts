import type { AnimalType, CategoryId } from './types'

export const SITE_URL = 'https://exonest.vercel.app'
export const SITE_NAME = 'ExoNest'

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'kits', label: 'Набори' },
  { id: 'enclosures', label: 'Тераріуми й вольєри' },
  { id: 'heat-light', label: 'Обігрів і світло' },
  { id: 'substrate-decor', label: 'Субстрат і декор' },
  { id: 'food', label: 'Корм' },
  { id: 'supplements', label: 'Добавки' },
]

export const animalTypes: { id: AnimalType; label: string }[] = [
  { id: 'snakes', label: 'Змії' },
  { id: 'geckos', label: 'Гекони й ящірки' },
  { id: 'turtles', label: 'Черепахи' },
  { id: 'chinchillas', label: 'Шиншили' },
  { id: 'hedgehogs', label: 'Їжаки' },
  { id: 'small-mammals', label: 'Інші дрібні ссавці' },
]

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id

export const animalLabel = (id: AnimalType) =>
  animalTypes.find((a) => a.id === id)?.label ?? id

export const mainNav = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/kits', label: 'Набори' },
  { href: '/smart-terrarium', label: 'Smart-тераріум' },
  { href: '/services', label: 'Послуги' },
  { href: '/animals', label: 'Тварини' },
  { href: '/guides', label: 'Гайди' },
]

export const secondaryNav = [
  { href: '/about', label: 'Про нас' },
  { href: '/contacts', label: 'Контакти' },
  { href: '/delivery-returns', label: 'Доставка й повернення' },
  { href: '/privacy', label: 'Конфіденційність' },
  { href: '/terms', label: 'Умови використання' },
]

export const contacts = {
  address: 'Одеса, вул. Басейна, 21',
  phone: '+380 48 737 41 26',
  email: 'hello@exonest.com.ua',
  hours: 'Пн–Сб 10:00–19:00, Нд 11:00–17:00',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'TikTok', href: 'https://tiktok.com' },
    { label: 'Telegram', href: 'https://t.me' },
  ],
}
