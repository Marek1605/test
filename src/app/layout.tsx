import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: {
    default: 'EshopBuilder | Vytvor si e-shop za 5 minút s AI',
    template: '%s | EshopBuilder',
  },
  description: 'Slovenská platforma pre vytváranie profesionálnych e-shopov pomocou AI. Bez programovania, s GoPay, Comgate a Stripe integráciou.',
  keywords: ['e-shop', 'eshop', 'vytvorenie eshopu', 'slovenský eshop', 'AI', 'shopify alternatíva'],
  authors: [{ name: 'EshopBuilder' }],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'EshopBuilder',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-white antialiased font-sans">
        <Providers>
          {children}
        </Providers>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
