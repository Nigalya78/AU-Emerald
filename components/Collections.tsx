'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  purity?: string;
  stoneType?: string;
  weight?: number;
  mainImage?: string;
  images: string[];
}

export default function Collections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?limit=4')
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <section id="collections" className="bg-white py-14 lg:py-[72px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 lg:mb-12"
        >
          <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
            Our Collections
          </p>
          <h2
            className="font-fraunces font-semibold text-[#1a3a2a] italic mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            Where Legacy Meets Luxury.
          </h2>
          <div className="flex items-center justify-center gap-[6px]">
            <span className="block h-px w-7 bg-[#c9a84c]" />
            <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
              <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
            </svg>
            <span className="block h-px w-7 bg-[#c9a84c]" />
          </div>
        </motion.div>

        {/* ── Product cards ── */}
        {products.length === 0 ? (
          /* skeleton placeholders while loading */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#f0ebe0]/60 animate-pulse">
                <div className="aspect-[4/5]" />
                <div className="px-3 py-4 border border-t-0 border-[#c9a84c]/15">
                  <div className="h-3 bg-[#c9a84c]/15 rounded mb-2 w-3/4 mx-auto" />
                  <div className="h-2 bg-[#c9a84c]/10 rounded w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09, ease: 'easeOut' }}
                className="group bg-white"
                style={{ boxShadow: '0 1px 4px rgba(26,58,42,0.07)' }}
              >
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <div className="absolute inset-[6px] border border-[#c9a84c]/35 z-10 pointer-events-none" />
                  <img
                    src={product.mainImage || product.images?.[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=85'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                  <span className="absolute top-3 left-3 z-20 bg-[#1a3a2a]/80 text-[#c9a84c] text-[7.5px] font-bold uppercase tracking-[0.22em] px-2 py-[3px]">
                    {product.category.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Info */}
                <div className="px-3 pt-3 pb-4 text-center border-x border-b border-[#c9a84c]/20">
                  <h3 className="font-fraunces text-[14px] sm:text-[15px] font-semibold text-[#1a3a2a] leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[#1a3a2a]/45 text-[11px] leading-[1.55] mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-center gap-[5px] mb-3">
                    <span className="block h-px w-5 bg-[#c9a84c]/40" />
                    <span className="block w-[4px] h-[4px] rotate-45 bg-[#c9a84c]/55" />
                    <span className="block h-px w-5 bg-[#c9a84c]/40" />
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-[5px] text-[#1a3a2a] text-[9.5px] font-bold uppercase tracking-[0.2em] hover:text-[#c9a84c] transition-colors"
                  >
                    Enquire Now
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── View All button ── */}
        <div className="text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 border border-[#1a3a2a] text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.17em] px-8 py-[10px] hover:bg-[#1a3a2a] hover:text-white transition-all duration-250"
          >
            View All Collections
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
