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
    const search = searchParams.get('search')

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
    if (search) {
      setSearchQuery(search)
      setPendingSearchQuery(search)
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
        p.category.toLowerCase().includes(query) ||
        (p.purity && p.purity.toLowerCase().includes(query)) ||
        (p.stoneType && p.stoneType.toLowerCase().includes(query))
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

  /* ── Shared dropdown component ── */
  const FilterDropdown = ({
    label, count, children,
  }: { label: string; count: number; children: React.ReactNode }) => (
    <div className="relative group pb-2">
      <button className="h-9 px-4 bg-white/8 border border-[#c9a84c]/30 text-white/85 text-[11px] font-semibold uppercase tracking-[0.14em] hover:border-[#c9a84c]/70 hover:text-white transition-all flex items-center gap-2 min-w-[130px]">
        <span className="truncate">{count > 0 ? `${count} ${label}${count > 1 ? 's' : ''}` : `All ${label}s`}</span>
        <svg className="w-3 h-3 ml-auto shrink-0 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 w-52 bg-[#152d21] border border-[#c9a84c]/35 shadow-2xl py-2 hidden group-hover:block z-50 max-h-60 overflow-y-auto scrollbar-thin">
        {children}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex items-center justify-center" style={{ paddingTop: '60px' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-px bg-[#c9a84c]" />
          <p className="font-fraunces text-[#1a3a2a] text-sm italic">Loading collection…</p>
          <div className="w-8 h-px bg-[#c9a84c]" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0]">

      {/* ── PAGE HERO ── */}
      <section className="bg-[#f0ebe0] pt-[88px] pb-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="text-center"
          >
            {/* top ornament */}
            <div className="flex items-center justify-center gap-[6px] mb-5">
              <span className="block h-px w-8 bg-[#c9a84c]" />
              <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
                <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-8 bg-[#c9a84c]" />
            </div>
            <p className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3">
              Our Collections
            </p>
            <h1
            className="font-fraunces font-semibold text-[#1a3a2a] italic mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            Where Legacy Meets Luxury.
          </h1>
            <p className="text-[#1a3a2a]/55 text-[13.5px] leading-[1.7] max-w-[400px] mx-auto">
              Discover our exquisite range of handcrafted South Indian jewellery
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="bg-[#1a3a2a] border-y border-[#c9a84c]/20 py-4">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">

            {/* Search */}
            <div className="relative w-full sm:w-52">
              <input
                type="text"
                placeholder="Search designs…"
                value={pendingSearchQuery}
                onChange={(e) => setPendingSearchQuery(e.target.value)}
                className="w-full h-9 px-3 pl-9 bg-white/[0.07] border border-[#c9a84c]/30 text-white placeholder:text-white/35 focus:border-[#c9a84c]/70 focus:outline-none text-[12px] tracking-wide"
              />
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {pendingSearchQuery && (
                <button onClick={() => setPendingSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <FilterDropdown label="Type" count={pendingCategories.length}>
                {categories.filter(c => c.value !== 'ALL').map((cat) => (
                  <label key={cat.value} className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" checked={pendingCategories.includes(cat.value)} onChange={() => toggleCategory(cat.value)} className="w-3.5 h-3.5 accent-[#c9a84c]" />
                    <span className="text-white/75 text-[12px]">{cat.label}</span>
                  </label>
                ))}
              </FilterDropdown>

              <FilterDropdown label="Material" count={pendingPurities.length}>
                {purities.filter(p => p.value !== 'ALL').map((purity) => (
                  <label key={purity.value} className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" checked={pendingPurities.includes(purity.value)} onChange={() => togglePurity(purity.value)} className="w-3.5 h-3.5 accent-[#c9a84c]" />
                    <span className="text-white/75 text-[12px]">{purity.label}</span>
                  </label>
                ))}
              </FilterDropdown>

              <FilterDropdown label="Stone" count={pendingStones.length}>
                {stones.filter(s => s.value !== 'ALL').map((stone) => (
                  <label key={stone.value} className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" checked={pendingStones.includes(stone.value)} onChange={() => toggleStone(stone.value)} className="w-3.5 h-3.5 accent-[#c9a84c]" />
                    <span className="text-white/75 text-[12px]">{stone.label}</span>
                  </label>
                ))}
              </FilterDropdown>

              <FilterDropdown label="Weight" count={pendingWeightRanges.length}>
                {weightRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" checked={pendingWeightRanges.includes(range.value)} onChange={() => toggleWeight(range.value)} className="w-3.5 h-3.5 accent-[#c9a84c]" />
                    <span className="text-white/75 text-[12px]">{range.label}</span>
                  </label>
                ))}
              </FilterDropdown>

              {/* Apply / Clear */}
              {filtersApplied || hasFiltersApplied ? (
                <button onClick={clearAllFilters} className="h-9 px-5 bg-[#c9a84c] text-[#1a3a2a] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#d4b55e] transition-colors">
                  Clear Filters
                </button>
              ) : hasPendingFilters ? (
                <button onClick={applyFilters} className="h-9 px-5 bg-[#c9a84c] text-[#1a3a2a] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#d4b55e] transition-colors">
                  Apply
                </button>
              ) : null}
            </div>
          </div>

          {/* Results count */}
          {hasFiltersApplied && (
            <p className="text-white/40 text-[11px] uppercase tracking-[0.14em] mt-3">
              Showing {filteredProducts.length} of {products.length} pieces
            </p>
          )}
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            {/* ornament */}
            <div className="flex items-center justify-center gap-[6px] mb-6">
              <span className="block h-px w-8 bg-[#c9a84c]/50" />
              <span className="block w-[6px] h-[6px] rounded-full bg-[#c9a84c]/60" />
              <span className="block h-px w-8 bg-[#c9a84c]/50" />
            </div>
            <p className="font-fraunces text-[#1a3a2a] text-xl italic mb-2">No pieces found</p>
            <p className="text-[#1a3a2a]/45 text-[13px] mb-7">
              {searchQuery ? `No results for "${searchQuery}"` : 'Try adjusting your filters'}
            </p>
            <a
              href="/collections"
              className="inline-flex items-center gap-2 border border-[#1a3a2a] text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.16em] px-7 py-[10px] hover:bg-[#1a3a2a] hover:text-white transition-all"
            >
              View All Collections
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.5), ease: 'easeOut' }}
                className="group bg-white"
                style={{ boxShadow: '0 1px 4px rgba(26,58,42,0.07)' }}
              >
                {/* ── Image ── */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  {/* outer gold border frame */}
                  <div className="absolute inset-[6px] border border-[#c9a84c]/35 z-10 pointer-events-none" />
                  <img
                    src={product.mainImage || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    style={{ transformOrigin: 'center center' }}
                  />
                  {/* category badge top-left */}
                  <span className="absolute top-3 left-3 z-20 bg-[#1a3a2a]/80 text-[#c9a84c] text-[7.5px] font-bold uppercase tracking-[0.22em] px-2 py-[3px]">
                    {product.category.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* ── Info ── */}
                <div className="px-4 pt-4 pb-5 text-center border-x border-b border-[#c9a84c]/20">
                  <h3 className="font-fraunces text-[15px] sm:text-[16px] font-semibold text-[#1a3a2a] leading-snug mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[#1a3a2a]/45 text-[11px] leading-[1.6] mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* meta pills */}
                  <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                    {product.purity && (
                      <span className="text-[#1a3a2a]/50 text-[9.5px] uppercase tracking-[0.16em] border border-[#c9a84c]/30 px-2 py-[2px]">
                        {product.purity.replace(/_/g, ' ')}
                      </span>
                    )}
                    {product.stoneType && product.stoneType !== 'NO_STONE' && (
                      <span className="text-[#1a3a2a]/50 text-[9.5px] uppercase tracking-[0.16em] border border-[#c9a84c]/30 px-2 py-[2px]">
                        {product.stoneType.replace(/_/g, ' ')}
                      </span>
                    )}
                    {product.weight && (
                      <span className="text-[#1a3a2a]/50 text-[9.5px] uppercase tracking-[0.16em] border border-[#c9a84c]/30 px-2 py-[2px]">
                        {product.weight}g
                      </span>
                    )}
                  </div>

                  {/* ornament + CTA */}
                  <div className="flex items-center justify-center gap-[5px] mb-3">
                    <span className="block h-px w-6 bg-[#c9a84c]/40" />
                    <span className="block w-[4px] h-[4px] rotate-45 bg-[#c9a84c]/55" />
                    <span className="block h-px w-6 bg-[#c9a84c]/40" />
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-[6px] text-[#1a3a2a] text-[9.5px] font-bold uppercase tracking-[0.22em] hover:text-[#c9a84c] transition-colors duration-200"
                  >
                    Enquire Now
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
