import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | Au Emerald - South Indian Jewellery Adelaide',
  description: 'Learn about Au Emerald - Adelaide\'s trusted destination for authentic South Indian gold jewellery since 2015. Our legacy of craftsmanship and commitment to quality.',
  keywords: [
    'about Au Emerald',
    'South Indian jewellery Adelaide',
    'gold jewellery history',
    'family jewellery business Adelaide',
    'traditional Indian jewellery',
    'jewellery craftsmanship',
  ],
  openGraph: {
    title: 'About Au Emerald | South Indian Jewellery Heritage in Adelaide',
    description: 'Discover our legacy of bringing authentic South Indian gold jewellery to Adelaide since 2015.',
    images: ['/Au-logo.png'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  );
}
