import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import WhyChooseUsContent from '@/components/whychooseus-content';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Craftsmanship | Why Choose Au Emerald Jewellery',
  description: 'Experience traditional South Indian jewellery craftsmanship. Certified 22K gold, expert artisans, custom designs, and lifetime service guarantee.',
  keywords: [
    'jewellery craftsmanship Adelaide',
    'certified gold jewellery',
    '22K gold purity',
    'custom jewellery design Adelaide',
    'South Indian artisans',
    'jewellery quality guarantee',
    'handcrafted gold jewellery',
  ],
  openGraph: {
    title: 'Our Craftsmanship | Why Choose Au Emerald Jewellery Adelaide',
    description: 'Traditional South Indian jewellery craftsmanship with certified 22K gold, expert artisans, and custom designs.',
    images: ['/Au-logo.png'],
  },
}

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-[#f0ebe0]">
      <Navbar />

      {/* Page hero header */}
      <section className="bg-[#f0ebe0] pt-[88px] pb-10 text-center">
        <div className="flex items-center justify-center gap-[6px] mb-5">
          <span className="block h-px w-8 bg-[#c9a84c]" />
          <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
            <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
          </svg>
          <span className="block h-px w-8 bg-[#c9a84c]" />
        </div>
        <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
          Our Craft
        </p>
        <h1
          className="font-fraunces font-semibold text-[#1a3a2a] leading-[1.1] mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Craftsmanship
        </h1>
        <p className="text-[#1a3a2a]/55 text-[13.5px] leading-[1.7] max-w-[400px] mx-auto">
          Every piece handcrafted by skilled artisans using time-honoured techniques
        </p>
      </section>
      
      <WhyChooseUsContent />
      <Footer />
    </main>
  );
}
