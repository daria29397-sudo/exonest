import type { Metadata } from 'next'
import { CheckoutForm } from '@/components/cart/checkout-form'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'

export const metadata: Metadata = {
  title: 'Оформлення замовлення',
  robots: { index: false },
}

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: '/cart', label: 'Кошик' }, { label: 'Оформлення' }]}
        title="Оформлення замовлення"
        intro="Перевірте дані. Менеджер зв’яжеться з вами для підтвердження замовлення."
      />
      <Container className="py-12">
        <CheckoutForm />
      </Container>
    </>
  )
}
