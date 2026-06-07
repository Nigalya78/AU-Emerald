'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gem } from 'lucide-react';

export default function Motto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-forest-green/5 to-white"></div>
      
      {/* Top and bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-green/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-green/30 to-transparent"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 lg:py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Top decorative element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-aged-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-aged-gold"></div>
            <div className="w-20 h-px bg-aged-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-aged-gold"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-aged-gold"></div>
          </motion.div>

          {/* Main Motto Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center px-2"
          >
            <h2 className="font-fraunces text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-forest-green text-center">
              <span className="inline">PREMIUM QUALITY</span>
              <span className="hidden sm:inline text-aged-gold mx-2 sm:mx-3 text-base sm:text-xl md:text-2xl lg:text-3xl">|</span>
              <br className="sm:hidden" />
              <span className="inline">TIMELESS CONNECTION</span>
            </h2>
          </motion.div>

          {/* Tagline with elegant styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4"
          >
            <p className="text-forest-green/70 text-sm sm:text-base tracking-[0.25em] uppercase font-medium">
              Crafting Heirlooms Since 2015
            </p>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-aged-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-aged-gold"></div>
            <div className="w-20 h-px bg-aged-gold"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-aged-gold"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-aged-gold"></div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
