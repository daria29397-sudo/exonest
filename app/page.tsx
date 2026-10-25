import { Hero } from '@/components/home/hero'
import { Faq, Newsletter } from '@/components/home/faq-newsletter'
import {
  Audiences,
  KitsRow,
  LatestGuides,
  ServicesStrip,
  SmartTeaser,
  SubscriptionTeaser,
} from '@/components/home/home-sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Audiences />
      <KitsRow />
      <SmartTeaser />
      <ServicesStrip />
      <SubscriptionTeaser />
      <LatestGuides />
      <Faq />
      <Newsletter />
    </>
  )
}
