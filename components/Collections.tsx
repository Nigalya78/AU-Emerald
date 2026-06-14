'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
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

interface CollectionsProps {
  products: Product[];
}

export default function Collections({ products }: CollectionsProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-50px' });
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05, rootMargin: '-100px' });
  const { ref: staggerRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(products.length, { threshold: 0.1, rootMargin: '-50px' });
  const [imgLoaded, setImgLoaded] = React.useState<Record<string, boolean>>({});

  const markLoaded = React.useCallback((id: string) => {
    setImgLoaded((prev) => prev[id] ? prev : { ...prev, [id]: true });
  }, []);

  const imgRef = React.useCallback((el: HTMLImageElement | null, id: string) => {
    if (el?.complete && el.naturalWidth > 0) markLoaded(id);
  }, [markLoaded]);

  return (
    <section id="collections" ref={sectionRef} className="bg-white py-14 lg:py-[72px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-10 lg:mb-12"
        >
          <motion.p 
            className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            Our Collections
          </motion.p>
          <motion.h2
            className="font-fraunces font-semibold text-[#1a3a2a] italic mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            initial={{ opacity: 0, y: 25 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            Where Legacy Meets Luxury.
          </motion.h2>
          <motion.div 
            className="flex items-center justify-center gap-[6px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headerVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <span className="block h-px w-7 bg-[#c9a84c]" />
            <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
              <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
            </svg>
            <span className="block h-px w-7 bg-[#c9a84c]" />
          </motion.div>
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
          <div ref={staggerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={visibleItems.has(i) ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                className="group bg-white"
                style={{ boxShadow: '0 2px 8px rgba(26,58,42,0.08)' }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 12px 24px rgba(26,58,42,0.15)',
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                {/* Image */}
                <div className="aspect-[4/5] relative bg-[#f0ebe0] p-[6px]">
                  {/* shimmer skeleton */}
                  {!imgLoaded[product.id] && (
                    <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#f0ebe0] via-[#e8e0d0] to-[#f0ebe0] animate-shimmer bg-[length:200%_100%]" />
                  )}
                  {/* gold border */}
                  <motion.div 
                    className="absolute inset-[6px] border border-[#c9a84c]/35 z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={visibleItems.has(i) ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                  />
                  {/* image sits inside the border */}
                  <div className="w-full h-full overflow-hidden">
                    <motion.img
                      ref={(el) => imgRef(el, product.id)}
                      src={product.mainImage || product.images?.[0] || ''}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ opacity: imgLoaded[product.id] ? 1 : 0, transition: 'opacity 0.4s ease' }}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.12 + 0.1, ease: 'easeOut' }}
                      whileHover={{ scale: 1.08, transition: { duration: 0.5, ease: 'easeOut' } }}
                      onLoad={() => markLoaded(product.id)}
                      onError={(e) => { e.currentTarget.style.display = 'none'; markLoaded(product.id); }}
                    />
                  </div>
                  <motion.span 
                    className="absolute top-3 left-3 z-20 bg-[#1a3a2a]/80 text-[#c9a84c] text-[7.5px] font-bold uppercase tracking-[0.22em] px-2 py-[3px]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={visibleItems.has(i) ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                  >
                    {product.category.replace(/_/g, ' ')}
                  </motion.span>
                </div>

                {/* Info */}
                <div className="px-3 pt-3 pb-4 text-center border-x border-b border-[#c9a84c]/20">
                  <h3 className="font-fraunces text-[14px] sm:text-[15px] font-semibold text-[#1a3a2a] leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[#1a3a2a]/45 text-[11px] leading-[1.55] mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <motion.div 
                    className="flex items-center justify-center gap-[5px] mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={visibleItems.has(i) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.5 }}
                  >
                    <span className="block h-px w-5 bg-[#c9a84c]/40" />
                    <span className="block w-[4px] h-[4px] rotate-45 bg-[#c9a84c]/55" />
                    <span className="block h-px w-5 bg-[#c9a84c]/40" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={visibleItems.has(i) ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 + 0.6 }}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-[5px] text-[#1a3a2a] text-[9.5px] font-bold uppercase tracking-[0.2em] hover:text-[#c9a84c] transition-colors group-hover:gap-2"
                    >
                      Enquire Now
                      <motion.svg 
                        width="9" 
                        height="9" 
                        viewBox="0 0 12 12" 
                        fill="none"
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── View All button ── */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 border border-[#1a3a2a] text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.17em] px-8 py-[10px] hover:bg-[#1a3a2a] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1a3a2a]/25"
            >
              View All Collections
              <motion.svg 
                width="10" 
                height="10" 
                viewBox="0 0 12 12" 
                fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
