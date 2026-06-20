'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          {/* Logo with pulse rings — wrapper has fixed size so rings never shift layout */}
          <div className="relative w-24 h-24 flex items-center justify-center mb-6 sm:mb-8">
            {/* outer ring */}
            <motion.span
              className="absolute inset-0 rounded-full border border-[#c9a84c]/30 pointer-events-none"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.9 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* middle ring */}
            <motion.span
              className="absolute inset-0 rounded-full border border-[#c9a84c]/50 pointer-events-none"
              style={{ willChange: 'transform, opacity' }}
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
            {/* logo circle */}
            <motion.div
              className="relative w-24 h-24 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-white shadow-lg"
              style={{ willChange: 'opacity' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/Au-logo.png"
                alt="Au Emerald"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.p
            className="font-fraunces text-[#1a3a2a] text-2xl sm:text-[1.6rem] font-semibold tracking-[0.12em] mb-1 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            Au Emerald
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-[#c9a84c] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.3em] mb-6 sm:mb-8 text-center px-6"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          >
            Premium Quality · Timeless Connection
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="w-32 sm:w-40 h-[2px] bg-[#c9a84c]/15 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#c9a84c]/60 via-[#c9a84c] to-[#c9a84c]/60 rounded-full"
              style={{ willChange: 'transform' }}
              initial={{ x: '-100%' }}
              animate={{ x: leaving ? '100%' : ['-100%', '100%'] }}
              transition={
                leaving
                  ? { duration: 0.4, ease: 'easeIn' }
                  : { duration: 1.4, repeat: Infinity, ease: 'linear' }
              }
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
