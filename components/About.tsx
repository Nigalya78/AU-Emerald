'use client';

import { motion, useInView } from 'framer-motion';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" className="relative bg-white overflow-hidden">
      {/* Section-level gold corner ornaments */}
      <GoldCorner pos="tl" />
      <GoldCorner pos="tr" />
      <GoldCorner pos="bl" />
      <GoldCorner pos="br" />

      <div ref={ref} className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-[72px]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
              Our Legacy
            </p>
            <h2
              className="font-fraunces font-semibold text-[#1a3a2a] leading-[1.18] mb-4"
              style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.75rem)' }}
            >
              A Legacy Inherited.<br />
              A Story Continued.
            </h2>

            {/* ornament */}
            <div className="flex items-center gap-[6px] mb-5">
              <span className="block h-px w-7 bg-[#c9a84c]" />
              <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
                <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-7 bg-[#c9a84c]" />
            </div>

            <p className="text-[#1a3a2a]/60 text-[13.5px] leading-[1.8] max-w-[380px]">
              Rooted in tradition and nourished by love,
              Au Emerald brings forth rare antique jewellery
              that carries memories, blessings, and history.
              Each piece is a link between the past and the future.
            </p>
          </motion.div>

          {/* ── Right: Antique picture frame ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer gold frame band */}
              <div
                className="p-[10px]"
                style={{
                  background: 'linear-gradient(135deg, #7a5a10 0%, #d4aa50 30%, #9a7a20 55%, #d4aa50 80%, #7a5a10 100%)',
                }}
              >
                {/* Inner dark-brown mat */}
                <div className="p-[5px] bg-[#3d2a06]">
                  {/* Inner gold hairline */}
                  <div className="p-[3px] border border-[#c9a84c]/50">
                    <div className="w-[min(260px,70vw)] sm:w-[290px] lg:w-[310px] aspect-[9/10] overflow-hidden">
                      <img
                        src="/about.png"
                        alt="Heritage jewellery craftsmanship"
                        className="w-full h-full object-cover"
                        style={{ filter: 'sepia(15%) contrast(1.08) brightness(0.92)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Outer corner brackets */}
              {(['tl','tr','bl','br'] as const).map((p) => (
                <div
                  key={p}
                  className="absolute w-6 h-6"
                  style={{
                    top: p.startsWith('t') ? '-8px' : 'auto',
                    bottom: p.startsWith('b') ? '-8px' : 'auto',
                    left: p.endsWith('l') ? '-8px' : 'auto',
                    right: p.endsWith('r') ? '-8px' : 'auto',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    style={{ transform: `rotate(${{'tl':0,'tr':90,'bl':-90,'br':180}[p]}deg)` }}>
                    <path d="M2 2 L2 10 M2 2 L10 2" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="2" cy="2" r="1.5" fill="#c9a84c"/>
                  </svg>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
