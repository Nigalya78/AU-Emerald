'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const PLANS = [
  {
    duration: '6 Month Plan',
    price: 'From $100 AUD / month',
    features: [
      'Save for 6 months',
      'Redeem against any jewellery purchase',
      '10% OFF on making charges',
    ],
    href: "https://wa.me/61402399925?text=Hi, I'd like to join the 6 Month Gold Savings Scheme",
  },
  {
    duration: '12 Month Plan',
    price: 'From $100 AUD / month',
    featured: true,
    features: [
      'Save for 12 months',
      'Redeem against any jewellery purchase',
      '10% OFF on making charges',
      'Priority access to new collections',
    ],
    href: "https://wa.me/61402399925?text=Hi, I'd like to join the 12 Month Gold Savings Scheme",
  },
];

export default function HomeSavings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="savings" className="bg-[#1a3a2a] overflow-hidden">
      <div ref={ref} className="flex flex-col lg:flex-row lg:min-h-[480px]">

        {/* ── LEFT: image panel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="relative w-full lg:w-[42%] min-h-[56vw] sm:min-h-[380px] lg:min-h-0 shrink-0"
        >
          <img
            src="/savings.png"
            alt="Gold Savings Scheme"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.78) saturate(0.85)' }}
          />
          {/* dark bottom fade on mobile */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none lg:hidden"
            style={{ background: 'linear-gradient(to bottom, transparent, #1a3a2a)' }}
          />
        </motion.div>

        {/* ── RIGHT: content panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
          className="flex-1 bg-[#1a3a2a] flex flex-col justify-center p-6 sm:p-10 lg:p-14 xl:p-16"
        >
          {/* heading block */}
          <div className="mb-7">
            <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
              Exclusive Offer
            </p>
            <h2
              className="font-fraunces font-semibold text-white uppercase leading-[1.18] mb-3"
              style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)' }}
            >
              Gold Savings<br />Scheme
            </h2>
            {/* ornament */}
            <div className="flex items-center gap-[6px] mb-4">
              <span className="block h-px w-7 bg-[#c9a84c]/65" />
              <svg width="28" height="9" viewBox="0 0 56 14" fill="none">
                <path d="M2 7 Q10 1 20 7 Q28 13 36 7 Q46 1 54 7" stroke="#c9a84c" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <circle cx="28" cy="7" r="1.8" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-7 bg-[#c9a84c]/65" />
            </div>
            <p className="text-white/55 text-[13px] leading-[1.7] max-w-[360px]">
              Our motto is to make everyone buy gold. Start saving from $100 AUD/month and redeem against any jewellery purchase.
            </p>
          </div>

          {/* ── Two plan cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.duration}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                className={`flex flex-col p-5 border ${
                  plan.featured
                    ? 'border-[#c9a84c]/70 bg-[#c9a84c]/[0.06]'
                    : 'border-[#c9a84c]/25 bg-white/[0.03]'
                }`}
              >
                {plan.featured && (
                  <span className="text-[#c9a84c] text-[8.5px] font-bold uppercase tracking-[0.25em] mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className="font-fraunces text-white text-[1.05rem] font-semibold mb-1">
                  {plan.duration}
                </h3>
                <p className="text-[#c9a84c] text-[11.5px] font-medium mb-4">{plan.price}</p>

                <ul className="space-y-2 mb-5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#c9a84c] shrink-0 mt-[2px]" strokeWidth={2.5} />
                      <span className="text-white/60 text-[12px] leading-[1.55]">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] px-4 py-[9px] transition-all duration-250 ${
                    plan.featured
                      ? 'bg-[#c9a84c] text-[#1a3a2a] hover:bg-[#d4b55e]'
                      : 'border border-[#c9a84c]/55 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#1a3a2a]'
                  }`}
                >
                  <WhatsAppIcon size={12} />
                  Join This Plan
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-white/25 text-[10.5px] tracking-wide">
            Terms and conditions apply. Contact us on WhatsApp to enroll.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
