'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

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

// Jewellery Type Categories
const categories = [
  { value: 'ALL', label: 'All Jewellery Types' },
  { value: 'NECKLACES', label: 'Necklaces' },
  { value: 'EARRINGS', label: 'Earrings' },
  { value: 'RINGS', label: 'Rings' },
  { value: 'BANGLES', label: 'Bangles' },
  { value: 'BRACELETS', label: 'Bracelets' },
  { value: 'CHAINS', label: 'Chains' },
  { value: 'PENDANTS', label: 'Pendants' },
  { value: 'ANKLETS', label: 'Anklets' },
  { value: 'SETS', label: 'Jewellery Sets' },
  { value: 'CUSTOM_ORDERS', label: 'Custom Orders' },
]

// Material/Purity Categories
const purities = [
  { value: 'ALL', label: 'All Materials' },
  { value: 'K22_GOLD', label: '22K Gold' },
  { value: 'K24_GOLD', label: '24K Gold' },
  { value: 'K18_GOLD', label: '18K Gold' },
  { value: 'SILVER', label: 'Silver' },
  { value: 'GOLD_PLATED', label: 'Gold Plated' },
  { value: 'CUSTOM', label: 'Custom Material' },
]

// Stone/Gem Categories
const stones = [
  { value: 'ALL', label: 'All Stones' },
  { value: 'EMERALD', label: 'Emerald' },
  { value: 'RUBY', label: 'Ruby' },
  { value: 'DIAMOND', label: 'Diamond' },
  { value: 'PEARL', label: 'Pearl' },
  { value: 'KUNDAN', label: 'Kundan' },
  { value: 'NO_STONE', label: 'No Stone / Plain' },
  { value: 'OTHER', label: 'Other Stones' },
]

// Weight Range Categories
const weightRanges = [
  { value: 'UNDER_10', label: 'Under 10g', min: 0, max: 10 },
  { value: '10_TO_20', label: '10g - 20g', min: 10, max: 20 },
  { value: '20_TO_30', label: '20g - 30g', min: 20, max: 30 },
  { value: '30_TO_50', label: '30g - 50g', min: 30, max: 50 },
  { value: 'ABOVE_50', label: 'Above 50g', min: 50, max: Infinity },
]

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

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Applied filters (used for filtering products)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPurities, setSelectedPurities] = useState<string[]>([])
  const [selectedStones, setSelectedStones] = useState<string[]>([])
  const [selectedWeightRanges, setSelectedWeightRanges] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  // Pending filters (used for UI before Apply is clicked)
  const [pendingCategories, setPendingCategories] = useState<string[]>([])
  const [pendingPurities, setPendingPurities] = useState<string[]>([])
  const [pendingStones, setPendingStones] = useState<string[]>([])
  const [pendingWeightRanges, setPendingWeightRanges] = useState<string[]>([])
  const [pendingSearchQuery, setPendingSearchQuery] = useState('')
  
  const [showFilters, setShowFilters] = useState(false)
  const [filtersApplied, setFiltersApplied] = useState(false)

  const hasFiltersApplied = selectedCategories.length > 0 || selectedPurities.length > 0 || selectedStones.length > 0 || selectedWeightRanges.length > 0 || searchQuery !== ''
  const hasPendingFilters = pendingCategories.length > 0 || pendingPurities.length > 0 || pendingStones.length > 0 || pendingWeightRanges.length > 0 || pendingSearchQuery !== ''

  // Initialize filters from URL query parameters
  useEffect(() => {
    const category = searchParams.get('category')
    const purities = searchParams.getAll('purity')
    const stones = searchParams.getAll('stone')

    if (category) {
      setSelectedCategories([category])
      setPendingCategories([category])
    }
    if (purities.length > 0) {
      setSelectedPurities(purities)
      setPendingPurities(purities)
    }
    if (stones.length > 0) {
      setSelectedStones(stones)
      setPendingStones(stones)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategories, selectedPurities, selectedStones, selectedWeightRanges, searchQuery])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?visible=true')
      const data = await response.json()
      // Use API data if available, otherwise use fallback products
      if (data && data.length > 0) {
        setProducts(data)
      } else {
        setProducts(fallbackProducts)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Use fallback products on error
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Category filter (multiple selection)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category))
    }

    // Purity filter (multiple selection)
    if (selectedPurities.length > 0) {
      filtered = filtered.filter(p => selectedPurities.includes(p.purity || ''))
    }

    // Stone filter (multiple selection)
    if (selectedStones.length > 0) {
      filtered = filtered.filter(p => selectedStones.includes(p.stoneType || ''))
    }

    // Weight filter (multiple selection)
    if (selectedWeightRanges.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.weight) return false
        return selectedWeightRanges.some(rangeValue => {
          const range = weightRanges.find(r => r.value === rangeValue)
          if (!range) return false
          return p.weight! >= range.min && p.weight! < range.max
        })
      })
    }

    setFilteredProducts(filtered)
  }

  const toggleCategory = (value: string) => {
    setPendingCategories(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    )
  }

  const togglePurity = (value: string) => {
    setPendingPurities(prev =>
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    )
  }

  const toggleStone = (value: string) => {
    setPendingStones(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    )
  }

  const toggleWeight = (value: string) => {
    setPendingWeightRanges(prev =>
      prev.includes(value) ? prev.filter(w => w !== value) : [...prev, value]
    )
  }

  const applyFilters = () => {
    setSelectedCategories(pendingCategories)
    setSelectedPurities(pendingPurities)
    setSelectedStones(pendingStones)
    setSelectedWeightRanges(pendingWeightRanges)
    setSearchQuery(pendingSearchQuery)
    setFiltersApplied(true)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedPurities([])
    setSelectedStones([])
    setSelectedWeightRanges([])
    setSearchQuery('')
    setPendingCategories([])
    setPendingPurities([])
    setPendingStones([])
    setPendingWeightRanges([])
    setPendingSearchQuery('')
    setFiltersApplied(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-forest-green">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white pt-24 sm:pt-28 pb-4 sm:pb-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-12 h-0.5 bg-aged-gold mx-auto mb-4 sm:mb-6"></div>
            <p className="text-aged-gold text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
              Our Collections
            </p>
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-4 tracking-wide">
              Antiquity. Elegance. Emeralds.
            </h1>
            <p className="text-forest-green/60 max-w-lg mx-auto">
              Discover our exquisite range of handcrafted South Indian jewellery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters Bar */}
      <section className="bg-forest-green py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search - Reduced width */}
            <div className="relative w-full md:w-48 lg:w-56">
              <input
                type="text"
                placeholder="Search products..."
                value={pendingSearchQuery}
                onChange={(e) => setPendingSearchQuery(e.target.value)}
                className="w-full h-9 px-3 pl-9 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-aged-gold focus:outline-none text-sm"
              />
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {pendingSearchQuery && (
                <button onClick={() => setPendingSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Multi-Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Type Multi-Select */}
              <div className="relative group pb-2">
                <button className="h-9 px-3 bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all flex items-center gap-2 min-w-[130px]">
                  <span className="truncate">{pendingCategories.length > 0 ? `${pendingCategories.length} Type${pendingCategories.length > 1 ? 's' : ''}` : 'All Types'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-48 bg-forest-green border border-aged-gold shadow-lg py-2 hidden group-hover:block z-50 max-h-60 overflow-y-auto scrollbar-modern">
                  {categories.filter(c => c.value !== 'ALL').map((cat) => (
                    <label key={cat.value} className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pendingCategories.includes(cat.value)}
                        onChange={() => toggleCategory(cat.value)}
                        className="w-4 h-4 accent-aged-gold"
                      />
                      <span className="text-white text-sm">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Multi-Select */}
              <div className="relative group pb-2">
                <button className="h-9 px-3 bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all flex items-center gap-2 min-w-[130px]">
                  <span className="truncate">{pendingPurities.length > 0 ? `${pendingPurities.length} Material${pendingPurities.length > 1 ? 's' : ''}` : 'All Materials'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-48 bg-forest-green border border-aged-gold shadow-lg py-2 hidden group-hover:block z-50">
                  {purities.filter(p => p.value !== 'ALL').map((purity) => (
                    <label key={purity.value} className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pendingPurities.includes(purity.value)}
                        onChange={() => togglePurity(purity.value)}
                        className="w-4 h-4 accent-aged-gold"
                      />
                      <span className="text-white text-sm">{purity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stone Multi-Select */}
              <div className="relative group pb-2">
                <button className="h-9 px-3 bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all flex items-center gap-2 min-w-[130px]">
                  <span className="truncate">{pendingStones.length > 0 ? `${pendingStones.length} Stone${pendingStones.length > 1 ? 's' : ''}` : 'All Stones'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-48 bg-forest-green border border-aged-gold shadow-lg py-2 hidden group-hover:block z-50 max-h-60 overflow-y-auto scrollbar-modern">
                  {stones.filter(s => s.value !== 'ALL').map((stone) => (
                    <label key={stone.value} className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pendingStones.includes(stone.value)}
                        onChange={() => toggleStone(stone.value)}
                        className="w-4 h-4 accent-aged-gold"
                      />
                      <span className="text-white text-sm">{stone.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Weight Multi-Select */}
              <div className="relative group pb-2">
                <button className="h-9 px-3 bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all flex items-center gap-2 min-w-[130px]">
                  <span className="truncate">{pendingWeightRanges.length > 0 ? `${pendingWeightRanges.length} Weight Range${pendingWeightRanges.length > 1 ? 's' : ''}` : 'All Weights'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-48 bg-forest-green border border-aged-gold shadow-lg py-2 hidden group-hover:block z-50">
                  {weightRanges.map((range) => (
                    <label key={range.value} className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pendingWeightRanges.includes(range.value)}
                        onChange={() => toggleWeight(range.value)}
                        className="w-4 h-4 accent-aged-gold"
                      />
                      <span className="text-white text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply / Clear Filters Button */}
              {filtersApplied || hasFiltersApplied ? (
                <button onClick={clearAllFilters} className="h-9 px-4 bg-aged-gold text-forest-green font-medium text-sm hover:bg-white transition-all">
                  Clear Filters
                </button>
              ) : hasPendingFilters ? (
                <button onClick={applyFilters} className="h-9 px-4 bg-aged-gold text-forest-green font-medium text-sm hover:bg-white transition-all">
                  Apply
                </button>
              ) : null}
            </div>
          </div>

          {/* Results Count */}
          {hasFiltersApplied && (
            <p className="text-white/60 text-sm mt-4">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-forest-green/60 text-lg mb-4">No products found</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 border border-forest-green text-forest-green hover:bg-forest-green hover:text-white transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden border-2 border-aged-gold">
                  <img
                    src={product.mainImage || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-aged-gold text-xs font-medium tracking-widest uppercase mb-1">
                    {product.category.replace('_', ' ')}
                  </p>
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
          </div>
        )}
      </div>
    </div>
  )
}
