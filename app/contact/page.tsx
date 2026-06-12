import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us | Au Emerald Jewellery Adelaide',
  description: 'Visit our showroom at 466 Grand Junction Road, Northfield SA 5085. Call 0402 399 925 or enquire via WhatsApp for gold and emerald jewellery inquiries.',
  keywords: [
    'jewellery shop Northfield',
    'gold jewellery store Adelaide',
    'Au Emerald contact',
    'jewellery showroom Adelaide',
    'custom jewellery consultation',
    'Northfield SA jewellery',
  ],
  openGraph: {
    title: 'Contact Au Emerald | Premium Jewellery Store Adelaide',
    description: 'Visit our Northfield showroom or contact us via WhatsApp for inquiries about our gold and emerald jewellery collection.',
    images: ['/Au-logo.png'],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
