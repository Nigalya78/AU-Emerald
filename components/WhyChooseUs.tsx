'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef } from 'react';
import Link from 'next/link';

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px' });
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px', delay: 200 });
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px', delay: 400 });

  return (
    <section ref={ref} id="why-choose-us" className="overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:min-h-[480px]">

        {/* ── LEFT: artisan photo ── */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={leftVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative w-full lg:w-1/2 min-h-[56vw] sm:min-h-[400px] lg:min-h-0"
        >
          <motion.img
            src="/craftsmanship.png"
            alt="Handcrafted jewellery craftsmanship"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.82) saturate(0.88)' }}
            initial={{ scale: 1.1 }}
            animate={leftVisible ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          />
        </motion.div>

        {/* ── RIGHT: emerald green panel ── */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 30 }}
          animate={rightVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="w-full lg:w-1/2 bg-[#1a3a2a] flex items-center p-6 sm:p-10 lg:p-14 xl:p-16"
        >
          {/* Inner gold border */}
          <motion.div 
            className="border border-[#c9a84c]/35 p-5 sm:p-7 lg:p-10 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={rightVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <motion.p 
              className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              Why AU-Emerald
            </motion.p>
            <motion.h2
              className="font-fraunces font-semibold text-white leading-[1.18] mb-4"
              style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
            >
              Crafted by Hand.<br />
              Cherished for Life.
            </motion.h2>
            

            {/* ornament */}
            <motion.div 
              className="flex items-center gap-[6px] mb-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={rightVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
            >
              <span className="block h-px w-7 bg-[#c9a84c]/65" />
              <svg width="28" height="9" viewBox="0 0 56 14" fill="none">
                <path d="M2 7 Q10 1 20 7 Q28 13 36 7 Q46 1 54 7" stroke="#c9a84c" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <circle cx="28" cy="7" r="1.8" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-7 bg-[#c9a84c]/65" />
            </motion.div>

            <motion.p 
              className="text-white/60 text-[13.5px] leading-[1.78] mb-7 max-w-[380px]"
              initial={{ opacity: 0, y: 20 }}
              animate={rightVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
            >
              Every Au Emerald piece is handcrafted by skilled artisans using
              time-honoured techniques passed down through generations.
              We don&apos;t just create jewellery, we preserve heritage.
            </motion.p>

            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
