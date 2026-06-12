'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef } from 'react';

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Decades of Experience',
    desc: 'Over 10 years of bringing authentic South Indian jewellery to Adelaide families.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Pure Gold Assurance',
    desc: 'Every piece certified for 22K & 24K purity. Guaranteed authenticity.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    title: 'Crafted with Love',
    desc: 'Handmade by skilled artisans using time-honoured techniques.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 10-16 0"/>
      </svg>
    ),
    title: 'Personal Service',
    desc: 'Private consultations to help you find or create your perfect piece.',
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px' });
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px', delay: 200 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px', delay: 400 });

  return (
    <section ref={ref} id="why-choose-us" className="overflow-hidden bg-[#f0ebe0]">
      <div className="flex flex-col lg:flex-row min-h-[700px] lg:min-h-[800px]">

        {/* ── LEFT: Large artisan photo ── */}
        <div
          className="relative w-full lg:w-1/2 min-h-[400px] sm:min-h-[500px] lg:min-h-full"
        >
          <img
            src="/craftsmanship.png"
            alt="Handcrafted jewellery craftsmanship"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.75) saturate(0.85)' }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a3a2a]/30 lg:to-[#1a3a2a]/50" />
          
          {/* Floating quote on image - desktop */}
          <motion.div
            className="hidden lg:block absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-elegant border border-[#c9a84c]/30"
            initial={{ opacity: 0, y: 30 }}
            animate={leftVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="font-fraunces text-[#1a3a2a] text-[18px] italic leading-[1.5] mb-3">
              &ldquo;We don&apos;t just create jewellery, we preserve heritage.&rdquo;
            </p>
            <p className="text-[#c9a84c] text-[11px] font-semibold uppercase tracking-[0.15em]">
              — The Au Emerald Promise
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT: emerald green content panel ── */}
        <div
          ref={rightRef}
          className="w-full lg:w-1/2 bg-[#1a3a2a] flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20"
        >
          {/* Header */}
          <motion.div
            className="mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          >
            <p className="text-[#c9a84c] text-[12px] font-bold uppercase tracking-[0.3em] mb-4">
              Why AU-Emerald
            </p>
            <h2 className="font-fraunces font-semibold text-white leading-[1.12] mb-6"
              style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)' }}>
              Crafted by Hand.<br />
              <span className="text-[#c9a84c] italic">Cherished for Life.</span>
            </h2>
            <div className="flex items-center gap-[6px]">
              <span className="block h-px w-10 bg-[#c9a84c]/60" />
              <svg width="28" height="9" viewBox="0 0 56 14" fill="none">
                <path d="M2 7 Q10 1 20 7 Q28 13 36 7 Q46 1 54 7" stroke="#c9a84c" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <circle cx="28" cy="7" r="1.8" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-10 bg-[#c9a84c]/60" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-white/70 text-[16px] sm:text-[17px] leading-[1.85] mb-10 lg:mb-14 max-w-[480px]"
            initial={{ opacity: 0, y: 20 }}
            animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          >
            Every Au Emerald piece tells a story. Handcrafted by skilled artisans 
            using techniques passed down through generations, our jewellery embodies 
            the rich heritage of South Indian craftsmanship.
          </motion.p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 + i * 0.1 }}
                className="group"
              >
                <div className="text-[#c9a84c] mb-3 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-white text-[14px] font-semibold uppercase tracking-[0.12em] mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-[13px] leading-[1.7]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/why-choose-us"
            className="inline-flex items-center gap-3 text-[#c9a84c] text-[12px] font-bold uppercase tracking-[0.15em] mt-10 lg:mt-14 hover:text-white transition-colors duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
          >
            Discover Our Craftsmanship
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
