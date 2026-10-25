export type AnimalType =
  | 'snakes'
  | 'geckos'
  | 'turtles'
  | 'chinchillas'
  | 'hedgehogs'
  | 'small-mammals'

export type CategoryId =
  | 'kits'
  | 'enclosures'
  | 'heat-light'
  | 'substrate-decor'
  | 'food'
  | 'supplements'

export type IllustrationKey =
  | 'terrarium'
  | 'gecko'
  | 'snake'
  | 'chinchilla'
  | 'hedgehog'
  | 'turtle'
  | 'leaves'
  | 'heat-lamp'
  | 'thermometer'
  | 'cage'
  | 'jar'
  | 'bag'
  | 'box'

export interface Spec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  category: CategoryId
  animals: AnimalType[]
  price: number
  short: string
  description: string
  specs: Spec[]
  illustration: IllustrationKey
  photoHints: string[]
  popularity: number
  addedAt: string
  inStock: boolean
}

export interface Kit {
  productSlug: string
  title: string
  animal: AnimalType
  level: string
  forWhom: string
  contents: string[]
  illustration: IllustrationKey
  image: string
  imageAlt: string
  imagePosition?: string
}

export interface GuideSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export interface Guide {
  slug: string
  title: string
  excerpt: string
  type: 'Стаття' | 'Чек-лист'
  animal: AnimalType | 'all'
  readingMinutes: number
  publishedAt: string
  illustration: IllustrationKey
  sections: GuideSection[]
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  featured?: boolean
}

export interface VetPartner {
  id: string
  name: string
  city: string
  focus: string[]
  note: string
}
