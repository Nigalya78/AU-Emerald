import type { Metadata, Viewport } from 'next'
import './globals.css'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import Preloader from '@/components/Preloader'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a3a2a',
}

export const metadata: Metadata = {
  title: {
    default: 'Au Emerald | Premium Gold & Emerald Jewellery Adelaide',
    template: '%s | Au Emerald Jewellery',
  },
  description: 'Adelaide\'s premier destination for authentic South Indian gold and emerald jewellery. Handcrafted 22K gold pieces, custom designs, and traditional craftsmanship. Visit our Northfield showroom or enquire via WhatsApp.',
  keywords: [
    'gold jewellery Adelaide',
    'emerald jewellery Australia',
    'South Indian jewellery',
    '22K gold jewellery',
    'custom gold jewellery Adelaide',
    'bridal jewellery Adelaide',
    'traditional Indian jewellery',
    'gold necklace Adelaide',
    'gold earrings Australia',
    'jewellery shop Northfield',
    'Au Emerald',
  ],
  authors: [{ name: 'Au Emerald' }],
  creator: 'Au Emerald',
  publisher: 'Au Emerald',
  metadataBase: new URL('https://auemerald.com.au'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://auemerald.com.au',
    siteName: 'Au Emerald',
    title: 'Au Emerald | Premium Gold & Emerald Jewellery Adelaide',
    description: 'Adelaide\'s premier destination for authentic South Indian gold and emerald jewellery. Handcrafted 22K gold pieces.',
    images: [
      {
        url: '/Au-logo.png',
        width: 512,
        height: 512,
        alt: 'Au Emerald Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Au Emerald | Premium Gold & Emerald Jewellery Adelaide',
    description: 'Adelaide\'s premier destination for authentic South Indian gold and emerald jewellery.',
    images: ['/Au-logo.png'],
  },
  icons: {
    icon: [
      { url: '/Au-logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/Au-logo.png',
    apple: '/Au-logo.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'geo.region': 'AU-SA',
    'geo.placename': 'Adelaide',
    'geo.position': '-34.8549;138.6017',
    ICBM: '-34.8549, 138.6017',
    'business:contact_data:locality': 'Northfield',
    'business:contact_data:region': 'South Australia',
    'business:contact_data:country': 'Australia',
    'business:contact_data:postal_code': '5085',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'JewelryStore',
              name: 'Au Emerald',
              image: 'https://auemerald.com.au/Au-logo.png',
              description: 'Adelaide\'s premier destination for authentic South Indian gold and emerald jewellery.',
              url: 'https://auemerald.com.au',
              telephone: ['+61 402 399 925', '+61 430 464 545'],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '466 Grand Junction Road',
                addressLocality: 'Northfield',
                addressRegion: 'SA',
                postalCode: '5085',
                addressCountry: 'AU',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -34.8549,
                longitude: 138.6017,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday'],
                  opens: '09:00',
                  closes: '16:00',
                },
              ],
              priceRange: '$$$',
              areaServed: {
                '@type': 'City',
                name: 'Adelaide',
                containedInPlace: {
                  '@type': 'State',
                  name: 'South Australia',
                },
              },
              sameAs: [
                'https://wa.me/61402399925',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Preloader />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
