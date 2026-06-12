'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import WhatsAppIcon from './WhatsAppIcon';
import Link from 'next/link';

const WA_HREF = `https://wa.me/61402399925?text=${encodeURIComponent(
  "Hi Au Emerald team, I'm interested in your jewellery collection."
)}`;

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '-100px' });

  return (
    <section
      ref={ref}
      id="home"
      className="relative w-full bg-[#f8f6f0]"
      style={{ paddingTop: '60px' }}
    >
      {/* ── Mobile: Overlay Layout ── */}
      <div className="lg:hidden relative h-[70vh] min-h-[500px]">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 1.1, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img
            src="/hero-section.png"
            alt="Exquisite South Indian Gold Jewellery"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2a]/95 via-[#1a3a2a]/50 to-[#1a3a2a]/30" />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-[#c9a84c]/50 rounded-full px-4 py-2 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-white text-[11px] font-semibold uppercase tracking-[0.15em]">
                Adelaide&apos;s #1 South Indian Jeweller
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="font-fraunces font-bold text-white leading-[1.05] mb-3"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            >
              Wear Your
              <span className="text-[#c9a84c] italic"> Heritage</span>
              <br />
              With Pride
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-white/80 text-[14px] leading-[1.7] mb-4 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              Handcrafted 22K gold jewellery, infused with the legacy of 
              South Indian artistry.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-row gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
            >
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] text-[#1a3a2a] text-[11px] font-bold uppercase tracking-[0.12em] px-5 py-3 hover:bg-[#b8983f] transition-all duration-300 shadow-lg"
              >
                <WhatsAppIcon size={14} />
                Enquire
              </a>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white text-[11px] font-bold uppercase tracking-[0.12em] px-5 py-3 hover:bg-white hover:text-[#1a3a2a] transition-all duration-300"
              >
                View Collections
              </Link>
            </motion.div>

            {/* Stats - Overlay at bottom */}
            <motion.div
              className="flex justify-around gap-2 pt-4 border-t border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            >
              {[
                { value: '10+', label: 'Years' },
                { value: '5000+', label: 'Customers' },
                { value: '22K', label: 'Gold' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="font-fraunces text-[#c9a84c] text-[1.25rem] font-bold">{stat.value}</p>
                  <p className="text-white/60 text-[9px] uppercase tracking-[0.1em] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Desktop: Split Layout ── */}
      <div className="hidden lg:grid min-h-[calc(100vh-60px)] grid-cols-2">
        
        {/* ── Left: Content ── */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-20 py-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="max-w-xl"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#1a3a2a]/5 border border-[#c9a84c]/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.15em]">
                Adelaide&apos;s #1 South Indian Jeweller
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="font-fraunces font-bold text-[#1a3a2a] leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            >
              Wear Your
              <span className="text-[#c9a84c] italic"> Heritage</span>
              <br />
              With Pride
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-[#1a3a2a]/60 text-[17px] leading-[1.8] mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              Handcrafted 22K gold jewellery, infused with the legacy of 
              South Indian artistry. Each piece tells a story of tradition.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              {['Certified Gold', 'Custom Designs'].map((item, i) => (
                <span
                  key={item}
                  className="text-[#1a3a2a]/50 text-[11px] uppercase tracking-[0.12em] border border-[#c9a84c]/25 px-3 py-1.5 bg-white/50"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
            >
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#1a3a2a] text-white text-[12px] font-bold uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#152d21] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <WhatsAppIcon size={16} />
                Enquire Now
              </a>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1a3a2a] text-[#1a3a2a] text-[12px] font-bold uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#1a3a2a] hover:text-white transition-all duration-300"
              >
                View Collections
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-10 pt-8 border-t border-[#c9a84c]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            >
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '5000+', label: 'Happy Customers' },
                { value: '22K', label: 'Pure Gold' },
              ].map((stat, i) => (
                <div key={stat.label}>
                  <p className="font-fraunces text-[#c9a84c] text-[1.5rem] sm:text-[1.75rem] font-bold">{stat.value}</p>
                  <p className="text-[#1a3a2a]/50 text-[10px] uppercase tracking-[0.12em] mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right: Image ── */}
        <div className="relative h-auto">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: isVisible ? 1 : 1.1, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <img
              src="/hero-section.png"
              alt="Exquisite South Indian Gold Jewellery"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f0] via-transparent to-transparent via-[#f8f6f0]/20" />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            className="hidden lg:flex absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-elegant border border-[#c9a84c]/30 items-center gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#1a3a2a] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p className="text-[#1a3a2a] text-[12px] font-bold">Since 2015</p>
              <p className="text-[#1a3a2a]/50 text-[10px]">Family Owned</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}