'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="bg-forest-green py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="w-12 h-0.5 bg-aged-gold mb-4"></div>
            <p className="text-aged-gold text-sm font-medium tracking-widest uppercase mb-4">
              ABOUT AU EMERALD
            </p>
            
            <h2 className="font-fraunces text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
              AU EMERALD
            </h2>
            
            <div className="text-white/90 text-base leading-relaxed max-w-md mb-8 space-y-4">
              <p>
                Au Emerald is Adelaide&apos;s premier destination for authentic South Indian jewellery. We specialize in timeless handcrafted pieces that celebrate the rich heritage, artistry, and elegance of traditional South Indian designs.
              </p>
              <p>
                Our collection is carefully curated for those who wish to stay connected to their roots while embracing exceptional craftsmanship. Every piece tells a story, combining heritage, beauty, and quality that can be cherished for generations.
              </p>
              <p>
                Whether you are searching for a statement bridal piece, traditional temple jewellery, or a meaningful family heirloom, Au Emerald brings you jewellery that feels like home.
              </p>
            </div>

            <a
              href="#collections"
              className="inline-flex items-center gap-2 border border-aged-gold text-aged-gold px-6 py-3 font-medium hover:bg-aged-gold hover:text-forest-green transition-all"
            >
              EXPLORE COLLECTIONS
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-square bg-forest-green border-2 border-aged-gold overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
                alt="Emerald Jewellery Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
