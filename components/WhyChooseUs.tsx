'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="why-choose-us" className="overflow-hidden">
      <div ref={ref} className="flex flex-col lg:flex-row lg:min-h-[480px]">

        {/* ── LEFT: artisan photo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="relative w-full lg:w-1/2 min-h-[56vw] sm:min-h-[400px] lg:min-h-0"
        >
          <img
            src="/craftsmanship.png"
            alt="Handcrafted jewellery craftsmanship"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.82) saturate(0.88)' }}
          />
        </motion.div>

        {/* ── RIGHT: emerald green panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
          className="w-full lg:w-1/2 bg-[#1a3a2a] flex items-center p-6 sm:p-10 lg:p-14 xl:p-16"
        >
          {/* Inner gold border */}
          <div className="border border-[#c9a84c]/35 p-5 sm:p-7 lg:p-10 w-full">
            <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
              Why AU-Emerald
            </p>
            <h2
              className="font-fraunces font-semibold text-white leading-[1.18] mb-4"
              style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
            >
              Crafted by Hand.<br />
              Cherished for Life.
            </h2>
            

            {/* ornament */}
            <div className="flex items-center gap-[6px] mb-5">
              <span className="block h-px w-7 bg-[#c9a84c]/65" />
              <svg width="28" height="9" viewBox="0 0 56 14" fill="none">
                <path d="M2 7 Q10 1 20 7 Q28 13 36 7 Q46 1 54 7" stroke="#c9a84c" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <circle cx="28" cy="7" r="1.8" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-7 bg-[#c9a84c]/65" />
            </div>

            <p className="text-white/60 text-[13.5px] leading-[1.78] mb-7 max-w-[380px]">
              Every Au Emerald piece is handcrafted by skilled artisans using
              time-honoured techniques passed down through generations.
              We don&apos;t just create jewellery, we preserve heritage.
            </p>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
