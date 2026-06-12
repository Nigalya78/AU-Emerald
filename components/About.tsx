'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef } from 'react';

/* ── Gold corner ornament ── */
function GoldCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rot = { tl: '0', tr: '90', bl: '-90', br: '180' }[pos];
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      className="absolute"
      style={{
        top: pos.startsWith('t') ? '-1px' : 'auto',
        bottom: pos.startsWith('b') ? '-1px' : 'auto',
        left: pos.endsWith('l') ? '-1px' : 'auto',
        right: pos.endsWith('r') ? '-1px' : 'auto',
        transform: `rotate(${rot}deg)`,
      }}
    >
      <path d="M2 2 L2 14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 2 L14 2" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 2 L8 8" stroke="#c9a84c" strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="2" cy="2" r="1.5" fill="#c9a84c"/>
    </svg>
  );
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px' });
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px', delay: 200 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-60px', delay: 400 });

  return (
    <section id="about" className="relative bg-white overflow-hidden">
      {/* Section-level gold corner ornaments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <GoldCorner pos="tl" />
        <GoldCorner pos="tr" />
        <GoldCorner pos="bl" />
        <GoldCorner pos="br" />
      </motion.div>

      <div ref={ref} className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-20 sm:py-24 lg:py-32">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p 
            className="text-[#c9a84c] text-[12px] font-bold uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            About Au Emerald
          </motion.p>
          <motion.h2
            className="font-fraunces font-semibold text-[#1a3a2a] leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            First South Indian<br />
            <span className="text-[#c9a84c] italic">Jewellery in Adelaide.</span>
          </motion.h2>
          <motion.div 
            className="flex items-center justify-center gap-[6px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <span className="block h-px w-12 bg-[#c9a84c]" />
            <svg width="32" height="11" viewBox="0 0 60 16" fill="none">
              <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
            </svg>
            <span className="block h-px w-12 bg-[#c9a84c]" />
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 40 }}
            animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.p 
              className="text-[#1a3a2a]/70 text-[16px] sm:text-[17px] leading-[1.9]"
              initial={{ opacity: 0, y: 20 }}
              animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              We are the first South Indian based jewellery store in Adelaide, bringing you 
              evergreen South Indian jewellery with unique designs you won&apos;t find anywhere else.
            </motion.p>

            <motion.p 
              className="text-[#1a3a2a]/70 text-[16px] sm:text-[17px] leading-[1.9]"
              initial={{ opacity: 0, y: 20 }}
              animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              If you are South Indian and looking for a jewellery experience just like home — 
              just walk in to our shop. You will never regret.
            </motion.p>

            {/* Values Grid */}
            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            >
              {[
                { icon: '✦', label: 'Premium Quality', desc: 'Finest South Indian Gold' },
                { icon: '◈', label: 'Unique Designs', desc: 'Exclusive to Au Emerald' },
                { icon: '◉', label: 'Feel at Home', desc: 'Walk In & Experience' },
              ].map((item, i) => (
                <div key={item.label} className="text-center">
                  <div className="text-[#c9a84c] text-[24px] mb-2">{item.icon}</div>
                  <p className="text-[#1a3a2a] text-[13px] font-semibold uppercase tracking-[0.12em] mb-1">{item.label}</p>
                  <p className="text-[#1a3a2a]/50 text-[11px]">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Antique picture frame ── */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={imageVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center"
            whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: 'easeOut' } }}
          >
            <div className="relative">
              {/* Outer gold frame band */}
              <motion.div
                className="p-[10px]"
                style={{
                  background: 'linear-gradient(135deg, #7a5a10 0%, #d4aa50 30%, #9a7a20 55%, #d4aa50 80%, #7a5a10 100%)',
                }}
                initial={{ opacity: 0 }}
                animate={imageVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                {/* Inner dark-brown mat */}
                <motion.div 
                  className="p-[5px] bg-[#3d2a06]"
                  initial={{ opacity: 0 }}
                  animate={imageVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  {/* Inner gold hairline */}
                  <div className="p-[3px] border border-[#c9a84c]/50">
                    <motion.div 
                      className="w-[min(260px,70vw)] sm:w-[290px] lg:w-[310px] aspect-[9/10] overflow-hidden"
                      initial={{ scale: 1.1 }}
                      animate={imageVisible ? { scale: 1 } : { scale: 1.1 }}
                      transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
                    >
                      <img
                        src="/about.png"
                        alt="Heritage jewellery craftsmanship"
                        className="w-full h-full object-cover"
                        style={{ filter: 'sepia(15%) contrast(1.08) brightness(0.92)' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Outer corner brackets */}
              {(['tl','tr','bl','br'] as const).map((p, i) => (
                <motion.div
                  key={p}
                  className="absolute w-6 h-6"
                  style={{
                    top: p.startsWith('t') ? '-8px' : 'auto',
                    bottom: p.startsWith('b') ? '-8px' : 'auto',
                    left: p.endsWith('l') ? '-8px' : 'auto',
                    right: p.endsWith('r') ? '-8px' : 'auto',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={imageVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    style={{ transform: `rotate(${{'tl':0,'tr':90,'bl':-90,'br':180}[p]}deg)` }}>
                    <path d="M2 2 L2 10 M2 2 L10 2" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="2" cy="2" r="1.5" fill="#c9a84c"/>
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
