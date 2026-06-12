'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => setVisible(false), 800);
    }, 2200);
    return () => clearTimeout(timer);
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
          {/* Logo with pulse ring */}
          <motion.div
            className="relative flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* outer ring pulse */}
            <motion.span
              className="absolute rounded-full border border-[#c9a84c]/30"
              initial={{ width: 96, height: 96, opacity: 0.8 }}
              animate={{ width: 160, height: 160, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* middle ring pulse */}
            <motion.span
              className="absolute rounded-full border border-[#c9a84c]/50"
              initial={{ width: 96, height: 96, opacity: 0.8 }}
              animate={{ width: 130, height: 130, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            />
            {/* logo circle */}
            <motion.div
              className="relative w-24 h-24 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-white shadow-lg"
              animate={{ boxShadow: ['0 0 0px rgba(201,168,76,0.2)', '0 0 28px rgba(201,168,76,0.45)', '0 0 0px rgba(201,168,76,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
          </motion.div>

          {/* Brand name */}
          <motion.p
            className="font-fraunces text-[#1a3a2a] text-[1.6rem] font-semibold tracking-[0.12em] mb-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            Au Emerald
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-[0.35em] mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            Premium Quality · Timeless Connection
          </motion.p>

          {/* Loading bar */}
          <motion.div className="w-40 h-[2px] bg-[#c9a84c]/15 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#c9a84c]/60 via-[#c9a84c] to-[#c9a84c]/60 rounded-full"
              initial={{ x: '-100%' }}
              animate={{ x: leaving ? '100%' : ['-100%', '100%'] }}
              transition={
                leaving
                  ? { duration: 0.4, ease: 'easeIn' }
                  : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
