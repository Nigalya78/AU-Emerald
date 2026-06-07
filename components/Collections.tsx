'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Gold Emerald Necklace',
    category: 'NECKLACES',
    description: 'Statement pieces that rest close to your heart.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    purity: 'K22_GOLD',
    stoneType: 'EMERALD',
    weight: 25.5,
  },
  {
    id: '2',
    name: 'Gold Emerald Earrings',
    category: 'EARRINGS',
    description: 'Crafted to frame your legacy with grace.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    purity: 'K22_GOLD',
    stoneType: 'EMERALD',
    weight: 12.3,
  },
  {
    id: '3',
    name: 'Gold Emerald Bracelet',
    category: 'BRACELETS',
    description: 'Heirlooms for your wrist, stories for generations.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220b?w=600&q=80',
    purity: 'K22_GOLD',
    stoneType: 'EMERALD',
    weight: 18.7,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="collections" className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="w-12 h-0.5 bg-aged-gold mx-auto mb-6"></div>
          <p className="text-aged-gold text-sm font-medium tracking-widest uppercase mb-4">
            OUR COLLECTIONS
          </p>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-semibold text-forest-green tracking-wide">
            ANTIQUITY. ELEGANCE. EMERALDS.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'visible'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden border-2 border-aged-gold">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-fraunces text-lg font-semibold text-forest-green mb-1">
                  {product.category}
                </h3>
                <p className="text-forest-green/70 text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="text-aged-gold text-sm font-medium hover:text-dark-gold transition-colors uppercase tracking-wider"
                >
                  EXPLORE
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 border border-forest-green text-forest-green px-8 py-3 font-medium hover:bg-forest-green hover:text-white transition-all"
          >
            VIEW ALL
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
