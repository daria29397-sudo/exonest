import type { Metadata } from 'next'
import { CartView } from '@/components/cart/cart-view'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'

export const metadata: Metadata = {
  title: 'Кошик',
  robots: { index: false },
}

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: 'Кошик' }]} title="Кошик" />
      <Container className="py-12">
        <CartView />
      </Container>
    </>
  )
}
