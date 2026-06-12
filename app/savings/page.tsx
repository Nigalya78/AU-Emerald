import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HomeSavings from '@/components/HomeSavings';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Gold Savings Scheme | Save & Buy Jewellery | Au Emerald',
  description: 'Join our Gold Savings Scheme - save monthly from $50 and redeem against any gold jewellery purchase. Flexible plans, no interest, instant redemption. Enquire now!',
  keywords: [
    'gold savings scheme Adelaide',
    'jewellery savings plan',
    'gold investment plan',
    'monthly gold savings',
    'jewellery layby Adelaide',
    'save for gold jewellery',
    'gold chit fund Adelaide',
  ],
  openGraph: {
    title: 'Gold Savings Scheme | Save Monthly & Buy Jewellery | Au Emerald',
    description: 'Save monthly from $50 and redeem against any gold jewellery purchase. Flexible plans with instant redemption at Au Emerald.',
    images: ['/Au-logo.png'],
  },
}

export default function SavingsPage() {
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
          Exclusive Offer
        </p>
        <h1
          className="font-fraunces font-semibold text-[#1a3a2a] leading-[1.1] mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Gold Savings Scheme
        </h1>
        <p className="text-[#1a3a2a]/55 text-[13.5px] leading-[1.7] max-w-[400px] mx-auto">
          Save monthly and redeem against any jewellery purchase
        </p>
      </section>

      <HomeSavings />
      <Footer />
    </main>
  );
}
