import type { MetadataRoute } from 'next'
import { guides } from '@/data/guides'
import { products } from '@/data/products'
import { SITE_URL } from '@/data/site'

const staticRoutes = [
  '',
  '/catalog',
  '/kits',
  '/smart-terrarium',
  '/animals',
  '/services',
  '/guides',
  '/about',
  '/contacts',
  '/delivery-returns',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/catalog/${p.slug}`,
      lastModified: new Date(p.addedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...guides.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
