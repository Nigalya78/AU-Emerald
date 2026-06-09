'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string
  name: string
  category: string
  description: string
  images: string[]
  mainImage?: string
  purity?: string
  stoneType?: string
  weight?: number
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?visible=true');
        const data = await response.json();
        // Use API data if available, limit to 4 most recent products for homepage
        if (data && Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // No fallback - only show database products
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="collections" className="bg-white py-6 sm:py-10 lg:py-14 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-10"
        >
          <div className="w-12 h-0.5 bg-aged-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-aged-gold text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            OUR COLLECTIONS
          </p>
          <h2 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-wide">
            ANTIQUITY. ELEGANCE. EMERALDS.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'visible'}
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-h-[500px] md:max-h-none overflow-y-auto snap-y snap-mandatory scrollbar-hide pb-4 md:pb-0 md:overflow-visible"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 snap-start"
            >
              <div className="aspect-[4/3] sm:aspect-[4/5] md:aspect-[4/5] overflow-hidden border-2 border-aged-gold">
                <img
                  src={product.mainImage || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-fraunces text-lg font-semibold text-forest-green mb-1">
                  {product.name}
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
        <div className="text-center mt-6">
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
