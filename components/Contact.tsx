'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const WA_HREF = `https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your jewellery collection.")}`;

/* Reusable wave ornament */
function WaveOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[6px] ${className}`}>
      <span className="block h-px w-8 bg-[#c9a84c]" />
      <svg width="32" height="11" viewBox="0 0 64 18" fill="none">
        <path d="M2 9 Q10 1 22 9 Q32 17 42 9 Q54 1 62 9" stroke="#c9a84c" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <circle cx="32" cy="9" r="2.2" fill="#c9a84c"/>
      </svg>
      <span className="block h-px w-8 bg-[#c9a84c]" />
    </div>
  );
}

const FEATURES = [
  {
    number: '1',
    title: 'Premium Quality',
    desc: 'Carefully selected jewellery crafted to meet the highest standards of quality and beauty.',
  },
  {
    number: '2',
    title: 'Unique Designs',
    desc: 'Exclusive collections inspired by South Indian heritage and artistry.',
  },
  {
    number: '3',
    title: 'South Indian Tradition',
    desc: 'Authentic pieces that celebrate the rich cultural traditions of South India.',
  },
  {
    number: '4',
    title: 'Trust & Satisfaction',
    desc: 'Committed to providing a trustworthy and satisfying jewellery-buying experience.',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contact" className="bg-white py-12 sm:py-14 lg:py-[70px] overflow-hidden">
      {/* thin gold top rule */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-px bg-[#c9a84c]/25 mb-10 lg:mb-14" />

        <div
          ref={ref}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
        >
          {/* ── Left: heading + tagline + CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:w-[40%] shrink-0"
          >
            <h2
              className="font-fraunces font-semibold text-forest-green uppercase leading-[1.12] mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Interested in<br />a Piece?
            </h2>

            <span className="block h-px w-10 bg-[#c9a84c] mb-5" />

            <p className="text-[#1a3a2a]/60 text-[13.5px] leading-[1.75] mb-8 max-w-[300px]">
              We don&apos;t sell online. Each piece is private, personal, and available only upon enquiry.
            </p>

            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[9px] border border-[#c9a84c] text-[#1a3a2a] text-[10.5px] font-bold uppercase tracking-[0.16em] px-6 py-[11px] hover:bg-[#1a3a2a] hover:text-white hover:border-[#1a3a2a] transition-all duration-250"
            >
              <WhatsAppIcon size={14} />
              Enquire on WhatsApp
            </a>
          </motion.div>

          {/* ── Right: numbered feature list ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.number}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                className="flex items-start gap-4"
              >
                {/* numbered circle */}
                <div className="w-9 h-9 rounded-full border border-[#c9a84c] flex items-center justify-center shrink-0 mt-[2px]">
                  <span className="font-fraunces text-[#c9a84c] text-[13px] font-semibold leading-none">
                    {f.number}
                  </span>
                </div>
                <div>
                  <h4 className="text-[#1a3a2a] text-[11px] font-bold uppercase tracking-[0.18em] mb-1">
                    {f.title}
                  </h4>
                  <p className="text-[#1a3a2a]/55 text-[12.5px] leading-[1.65]">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
