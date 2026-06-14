'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Product {
  id: string
  name: string
  category: string
  purity?: string
  stoneType?: string
  weight?: number
  description: string
  images: string[]
  mainImage?: string
}

interface ProductDetailProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mainImgLoaded, setMainImgLoaded] = useState(false)
  const [relatedImgLoaded, setRelatedImgLoaded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setProduct(null)
    setRelatedProducts([])
    setLoading(true)
    setMainImgLoaded(false)
    setRelatedImgLoaded({})
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`)
      if (res.ok) {
        const data: Product = await res.json()
        setProduct(data)
        fetchRelated(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelated = async (currentProduct: Product) => {
    try {
      // First try same category
      const res = await fetch(`/api/products?category=${currentProduct.category}`)
      if (res.ok) {
        const data: Product[] = await res.json()
        let filtered = data.filter(p => p.id !== currentProduct.id).slice(0, 4)

        // If fewer than 4, top up from all products
        if (filtered.length < 4) {
          const allRes = await fetch(`/api/products`)
          if (allRes.ok) {
            const allData: Product[] = await allRes.json()
            const existing = new Set(filtered.map(p => p.id))
            const extras = allData
              .filter(p => p.id !== currentProduct.id && !existing.has(p.id))
              .slice(0, 4 - filtered.length)
            filtered = [...filtered, ...extras]
          }
        }
        setRelatedProducts(filtered)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getWhatsAppMessage = () => {
    if (!product) return ''
    return encodeURIComponent(
      `Hi Au Emerald team, I'm interested in:\n\nName: ${product.name}\nCategory: ${product.category.replace(/_/g, ' ')}\nMaterial: ${product.purity?.replace(/_/g, ' ') || 'N/A'}\nStone: ${product.stoneType?.replace(/_/g, ' ') || 'N/A'}\nWeight: ${product.weight ? `${product.weight}g` : 'N/A'}\n\nPlease provide more details.`
    )
  }

  const SPECS = product ? [
    product.purity && { label: 'Material', value: product.purity.replace(/_/g, ' ') },
    product.stoneType && product.stoneType !== 'NO_STONE' && { label: 'Stone', value: product.stoneType.replace(/_/g, ' ') },
    product.weight && { label: 'Weight', value: `${product.weight}g` },
    { label: 'Category', value: product.category.replace(/_/g, ' ') },
  ].filter(Boolean) as { label: string; value: string }[] : []

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe0]">
        <Navbar />
        <div className="pt-[88px] flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#c9a84c]/40 border-t-[#c9a84c] rounded-full animate-spin" />
            <p className="text-[#1a3a2a]/40 text-[11px] uppercase tracking-[0.2em]">Loading</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0ebe0]">
        <Navbar />
        <div className="pt-[88px] flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-[#1a3a2a]/50 text-[13px] uppercase tracking-[0.2em]">Product not found</p>
          <Link href="/collections" className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#c9a84c] hover:underline">
            Back to Collections
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0]">
      <Navbar />

      <main className="pt-[88px] pb-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* ── Breadcrumb ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 py-6 mb-2"
          >
            <Link href="/collections" className="inline-flex items-center gap-[6px] text-[#1a3a2a]/50 text-[10.5px] font-semibold uppercase tracking-[0.15em] hover:text-[#c9a84c] transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Collections
            </Link>
            <span className="text-[#c9a84c]/50 text-[10px]">/</span>
            <span className="text-[#1a3a2a]/35 text-[10.5px] uppercase tracking-[0.15em] truncate max-w-[200px]">{product.name}</span>
          </motion.div>

          {/* ── Main grid ── */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative aspect-[4/5] bg-[#f0ebe0] p-[8px]" style={{ boxShadow: '0 2px 20px rgba(26,58,42,0.08)' }}>
                {/* shimmer */}
                {!mainImgLoaded && (
                  <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#f0ebe0] via-[#e8e0d0] to-[#f0ebe0] animate-shimmer bg-[length:200%_100%]" />
                )}
                {/* inner gold hairline frame */}
                <div className="absolute inset-[8px] border border-[#c9a84c]/40 z-10 pointer-events-none" />
                {/* image sits inside the border */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={product.mainImage || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ opacity: mainImgLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
                    onLoad={() => setMainImgLoaded(true)}
                    onError={() => setMainImgLoaded(true)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {/* category label */}
              <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
                {product.category.replace(/_/g, ' ')}
              </p>

              {/* name */}
              <h1
                className="font-fraunces font-semibold text-[#1a3a2a] leading-[1.12] mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}
              >
                {product.name}
              </h1>

              {/* ornament */}
              <div className="flex items-center gap-[6px] mb-5">
                <span className="block h-px w-8 bg-[#c9a84c]" />
                <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
                  <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                  <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
                </svg>
                <span className="block h-px w-8 bg-[#c9a84c]" />
              </div>

              {/* description */}
              <p className="text-[#1a3a2a]/60 text-[13.5px] leading-[1.8] mb-8">
                {product.description}
              </p>

              {/* specs */}
              {SPECS.length > 0 && (
                <div className="border border-[#c9a84c]/25 bg-white mb-8">
                  <div className="px-5 py-3 border-b border-[#c9a84c]/20">
                    <p className="text-[#1a3a2a] text-[10px] font-bold uppercase tracking-[0.22em]">Product Details</p>
                  </div>
                  <div className="divide-y divide-[#c9a84c]/12">
                    {SPECS.map(s => (
                      <div key={s.label} className="flex items-center justify-between px-5 py-[10px]">
                        <span className="text-[#1a3a2a]/45 text-[11.5px] uppercase tracking-[0.12em]">{s.label}</span>
                        <span className="text-[#1a3a2a] text-[11.5px] font-semibold uppercase tracking-[0.1em]">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <a
                href={`https://wa.me/61402399925?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#1a3a2a] text-white text-[11px] font-bold uppercase tracking-[0.18em] px-8 py-[14px] hover:bg-[#152d21] transition-colors duration-250 mb-3"
              >
                <WhatsAppIcon size={15} />
                Enquire on WhatsApp
              </a>
              <p className="text-[#1a3a2a]/35 text-[10.5px] text-center tracking-[0.1em]">
                Private & personal — available upon enquiry only
              </p>
            </motion.div>
          </div>

          {/* ── Related Products ── */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 pt-12 border-t border-[#c9a84c]/20"
            >
              {/* heading */}
              <div className="text-center mb-10">
                <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">Discover More</p>
                <h2
                  className="font-fraunces font-semibold text-[#1a3a2a] italic"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                >
                  You May Also Like
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {relatedProducts.map((rp, i) => (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                    className="group bg-white"
                    style={{ boxShadow: '0 2px 8px rgba(26,58,42,0.08)' }}
                    whileHover={{ y: -8, scale: 1.02, boxShadow: '0 12px 24px rgba(26,58,42,0.15)', transition: { duration: 0.3, ease: 'easeOut' } }}
                  >
                    <Link href={`/products/${rp.id}`} className="block">
                      <div className="aspect-[4/5] relative bg-gradient-to-br from-[#f8f6f0] to-[#f0ebe0] p-[6px]">
                        {/* shimmer */}
                        {!relatedImgLoaded[rp.id] && (
                          <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#f0ebe0] via-[#e8e0d0] to-[#f0ebe0] animate-shimmer bg-[length:200%_100%]" />
                        )}
                        {/* gold border */}
                        <motion.div
                          className="absolute inset-[6px] border border-[#c9a84c]/35 z-10 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                        />
                        {/* image sits inside the border */}
                        <div className="w-full h-full overflow-hidden">
                          <motion.img
                            src={rp.mainImage || rp.images[0]}
                            alt={rp.name}
                            className="w-full h-full object-cover"
                            style={{ opacity: relatedImgLoaded[rp.id] ? 1 : 0, transition: 'opacity 0.4s ease', transformOrigin: 'center center' }}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: 'easeOut' }}
                            whileHover={{ scale: 1.08 }}
                            onLoad={() => setRelatedImgLoaded((prev) => ({ ...prev, [rp.id]: true }))}
                            onError={() => setRelatedImgLoaded((prev) => ({ ...prev, [rp.id]: true }))}
                          />
                        </div>
                        <motion.span
                          className="absolute top-3 left-3 z-20 bg-[#1a3a2a]/80 text-[#c9a84c] text-[7.5px] font-bold uppercase tracking-[0.22em] px-2 py-[3px]"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.08 + 0.4 }}
                        >
                          {rp.category.replace(/_/g, ' ')}
                        </motion.span>
                      </div>
                      <div className="px-3 pt-3 pb-4 text-center border-x border-b border-[#c9a84c]/20">
                        <h3 className="font-fraunces text-[14px] font-semibold text-[#1a3a2a] leading-snug mb-3 line-clamp-2">
                          {rp.name}
                        </h3>
                        <div className="flex items-center justify-center gap-[5px] mb-3">
                          <span className="block h-px w-5 bg-[#c9a84c]/40" />
                          <span className="block w-[4px] h-[4px] rotate-45 bg-[#c9a84c]/55" />
                          <span className="block h-px w-5 bg-[#c9a84c]/40" />
                        </div>
                        <span className="inline-flex items-center gap-[5px] text-[#1a3a2a] text-[9.5px] font-bold uppercase tracking-[0.2em] group-hover:text-[#c9a84c] transition-colors">
                          View Details
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
