import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Au Emerald | Premium Gold & Emerald Jewellery in Adelaide',
  description: 'Handcrafted gold and emerald jewellery in Adelaide, Australia. Premium quality, timeless connection. Enquire via WhatsApp.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
