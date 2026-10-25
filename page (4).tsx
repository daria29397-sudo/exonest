import type { Metadata } from 'next'
import { AccountView } from '@/components/account/account-view'
import { PageHeader } from '@/components/shared/page-header'
import { Container } from '@/components/shared/section'

export const metadata: Metadata = {
  title: 'Особистий кабінет',
  robots: { index: false },
}

export default function AccountPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Особистий кабінет' }]}
        title="Особистий кабінет"
        intro="Історія замовлень, накопичена знижка та бонуси в одному місці."
      />
      <Container className="py-12">
        <AccountView />
      </Container>
    </>
  )
}
