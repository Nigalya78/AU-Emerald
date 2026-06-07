'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { ArrowLeft } from 'lucide-react'

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

// Fallback products for static export
const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Gold Emerald Necklace',
    category: 'NECKLACES',
    description: 'Statement pieces that rest close to your heart.',
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80'],
    mainImage: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    purity: 'K22_GOLD',
    stoneType: 'EMERALD',
    weight: 25.5,
  },
  {
    id: '2',
    name: 'Gold Emerald Earrings',
    category: 'EARRINGS',
    description: 'Elegant earrings featuring emerald stones.',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'],
    mainImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    purity: 'K22_GOLD',
    stoneType: 'EMERALD',
    weight: 12.3,
  },
  {
    id: '3',
    name: 'Gold Emerald Bracelet',
    category: 'BRACELETS',
    description: 'Beautiful bracelet with emerald accents.',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220e?w=600&q=80'],
    mainImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220e?w=600&q=80',
    purity: 'K22_GOLD',
    stoneType: 'EMERALD',
    weight: 18.7,
  },
  {
    id: '4',
    name: 'Diamond Wedding Ring',
    category: 'RINGS',
    description: 'Stunning diamond ring for special occasions.',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80'],
    mainImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    purity: 'K18_GOLD',
    stoneType: 'DIAMOND',
    weight: 8.2,
  },
  {
    id: '5',
    name: 'Ruby Pendant Set',
    category: 'SETS',
    description: 'Elegant ruby pendant with matching earrings.',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'],
    mainImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    purity: 'K24_GOLD',
    stoneType: 'RUBY',
    weight: 32.1,
  },
  {
    id: '6',
    name: 'Pearl Silver Chain',
    category: 'CHAINS',
    description: 'Delicate silver chain with pearl pendant.',
    images: ['https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=600&q=80'],
    mainImage: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=600&q=80',
    purity: 'SILVER',
    stoneType: 'PEARL',
    weight: 15.4,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  useEffect(() => {
    if (product) {
      getRelatedProducts()
    }
  }, [product])

  const getRelatedProducts = () => {
    if (!product) return
    
    // Find products with same category, material, or stone
    const related = fallbackProducts
      .filter(p => p.id !== product.id)
      .filter(p => 
        p.category === product.category || 
        p.purity === product.purity || 
        p.stoneType === product.stoneType
      )
      .slice(0, 4) // Show up to 4 related products
    
    // If no related found, just show other products
    if (related.length === 0) {
      const others = fallbackProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4)
      setRelatedProducts(others)
    } else {
      setRelatedProducts(related)
    }
  }

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        // Use fallback product if API fails
        const fallbackProduct = fallbackProducts.find(p => p.id === params.id)
        setProduct(fallbackProduct || fallbackProducts[0])
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      const fallbackProduct = fallbackProducts.find(p => p.id === params.id)
      setProduct(fallbackProduct || fallbackProducts[0])
    } finally {
      setLoading(false)
    }
  }

  const getWhatsAppMessage = () => {
    if (!product) return ''
    const message = `Hi, I'm interested in this product:\n\n` +
      `Name: ${product.name}\n` +
      `Category: ${product.category.replace('_', ' ')}\n` +
      `Material: ${product.purity?.replace('_', ' ') || 'N/A'}\n` +
      `Stone: ${product.stoneType || 'N/A'}\n` +
      `Weight: ${product.weight ? `${product.weight}g` : 'N/A'}\n\n` +
      `Please provide more details.`
    return encodeURIComponent(message)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-forest-green">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-forest-green/60 text-lg mb-4">Product not found</p>
          <Link href="/collections" className="text-aged-gold hover:underline">
            Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-forest-green hover:text-aged-gold transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Back to Collections</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden border-2 border-aged-gold">
              <img
                src={product.mainImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Category */}
            <p className="text-aged-gold text-xs font-medium tracking-[0.3em] uppercase mb-3">
              {product.category.replace('_', ' ')}
            </p>

            {/* Name */}
            <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-forest-green mb-6">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-forest-green/70 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Product Specifications */}
            <div className="bg-forest-green/5 p-6 mb-8">
              <h2 className="font-fraunces text-lg font-semibold text-forest-green mb-4">
                Product Details
              </h2>
              <div className="space-y-3">
                {product.purity && (
                  <div className="flex justify-between">
                    <span className="text-forest-green/60 text-sm">Material</span>
                    <span className="text-forest-green font-medium text-sm">
                      {product.purity.replace('_', ' ')}
                    </span>
                  </div>
                )}
                {product.stoneType && (
                  <div className="flex justify-between">
                    <span className="text-forest-green/60 text-sm">Stone Type</span>
                    <span className="text-forest-green font-medium text-sm">
                      {product.stoneType}
                    </span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between">
                    <span className="text-forest-green/60 text-sm">Weight</span>
                    <span className="text-forest-green font-medium text-sm">
                      {product.weight} grams
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Enquiry Button */}
            <a
              href={`https://wa.me/610402399925?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-forest-green text-white px-8 py-4 font-medium hover:bg-transparent hover:text-forest-green transition-all border-2 border-forest-green"
            >
              <WhatsAppIcon size={20} />
              ENQUIRE ON WHATSAPP
            </a>

            <p className="text-forest-green/50 text-xs mt-4 text-center">
              Click to enquire about this product via WhatsApp
            </p>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-forest-green/10"
          >
            <h2 className="font-fraunces text-2xl font-semibold text-forest-green text-center mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 block"
                  >
                    <div className="aspect-[4/5] overflow-hidden border-2 border-aged-gold">
                      <img
                        src={relatedProduct.mainImage || relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-aged-gold text-xs font-medium tracking-widest uppercase mb-1">
                        {relatedProduct.category.replace('_', ' ')}
                      </p>
                      <h3 className="font-fraunces text-sm font-semibold text-forest-green mb-3">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-aged-gold text-xs font-medium hover:text-dark-gold transition-colors uppercase tracking-wider">
                        EXPLORE
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
