'use client';

import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';

const WA_HREF = `https://wa.me/610402399925?text=${encodeURIComponent(
  "Hi Au Emerald team, I'm interested in your jewellery collection."
)}`;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: '60px', minHeight: '100vh' }}
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <img
          src="/hero-section.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          draggable="false"
        />
        {/* light cream overlay so text is legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(255, 255, 255, 0.88) 0%, rgba(240,235,224,0.72) 38%, rgba(240,235,224,0.30) 65%, rgba(240,235,224,0.0) 100%)',
          }}
        />
        {/* subtle bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(240,235,224,0.55), transparent)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-60px)] px-6 sm:px-12 lg:px-20 xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="max-w-[560px]"
        >
          {/* eyebrow */}
          <p className="text-[#c9a84c] text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.3em] mb-4 drop-shadow-none">
            Adelaide&apos;s Finest South Indian Jewellery
          </p>

          <h1
            className="font-fraunces font-semibold text-forest-green leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
          >
            Heirloom Heritage.
            <br />
            Timeless Beauty.
          </h1>

          {/* ornament */}
          <div className="flex items-center gap-[6px] mb-6">
            <span className="block h-px w-10 bg-[#c9a84c]" />
            <svg width="32" height="11" viewBox="0 0 68 18" fill="none">
              <path d="M2 9 Q12 1 22 9 Q34 18 46 9 Q56 1 66 9" stroke="#c9a84c" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
              <circle cx="34" cy="9" r="2.2" fill="#c9a84c"/>
            </svg>
            <span className="block h-px w-10 bg-[#c9a84c]" />
          </div>

          <p className="text-[#1a3a2a]/65 text-[13.5px] sm:text-[15px] leading-[1.85] max-w-[380px] mb-10">
            Au Emerald is a celebration of Indian heritage,
            born from a grandmother&apos;s heirlooms and crafted for
            generations to come.
          </p>

          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] border border-[#1a3a2a] text-[#1a3a2a] text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] px-6 py-[13px] hover:bg-[#1a3a2a] hover:text-white transition-all duration-300"
          >
            <WhatsAppIcon size={14} />
            Inquire via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}