import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { AmbientAnimals } from '@/components/layout/ambient-animals'
import { CookieBanner } from '@/components/layout/cookie-banner'
import { Toaster } from '@/components/ui/sonner'
import { AccountProvider } from '@/lib/account-context'
import { CartProvider } from '@/lib/cart-context'
import { SITE_NAME, SITE_URL } from '@/data/site'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — усе для екзотів без здогадок`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'ExoNest — український магазин і сервіс для власників рептилій та дрібних екзотичних ссавців: стартові набори, обладнання, власні кормові комахи, підписка й послуги.',
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — усе для екзотів без здогадок`,
    description:
      'Стартові набори, обладнання, кормові комахи, підписка та послуги для рептилій і дрібних екзотичних ссавців.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F2E8D5',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-dvh antialiased">
        <AccountProvider>
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Перейти до основного вмісту
          </a>
          <AmbientAnimals />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteFooter />
          </div>
          <CookieBanner />
          <Toaster theme="light" position="bottom-center" />
        </CartProvider>
        </AccountProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
