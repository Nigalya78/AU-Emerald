'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

interface ProductsPageProps {
  initialProducts: Product[];
}

export default function ProductsPage({ initialProducts }: ProductsPageProps) {
  console.log('ProductsPage component mounted');
  const searchParams = useSearchParams()
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-50px' });
  const { ref: filterRef, isVisible: filterVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-50px', delay: 200 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, rootMargin: '-50px', delay: 400 });
  
  const [products] = useState<Product[]>(initialProducts)
  console.log('ProductsPage products state:', products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading] = useState(false)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const itemsPerPageOptions = [8, 12, 16, 24, 48]
  
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
    filterProducts()
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, selectedCategories, selectedPurities, selectedStones, selectedWeightRanges, searchQuery])

  // Calculate paginated products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
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
    setCurrentPage(1)
  }

  /* ── Shared dropdown component ── */
  const FilterDropdown = ({
    label, count, children,
  }: { label: string; count: number; children: React.ReactNode }) => (
    <div className="relative group flex-shrink-0">
      <button className="h-9 px-3 sm:px-4 bg-white/8 border border-[#c9a84c]/30 text-white/85 text-[11px] font-semibold uppercase tracking-[0.14em] hover:border-[#c9a84c]/70 hover:text-white transition-all flex items-center gap-2 min-w-[110px] sm:min-w-[130px] whitespace-nowrap">
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-fraunces text-[#1a3a2a] text-lg italic">Loading Collection...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0]">

      {/* ── PAGE HERO ── */}
      <section ref={heroRef} className="bg-[#f0ebe0] pt-[88px] pb-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            {/* top ornament */}
            <motion.div 
              className="flex items-center justify-center gap-[6px] mb-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <span className="block h-px w-8 bg-[#c9a84c]" />
              <svg width="30" height="10" viewBox="0 0 60 16" fill="none">
                <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
              </svg>
              <span className="block h-px w-8 bg-[#c9a84c]" />
            </motion.div>
            <motion.p 
              className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.28em] mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            >
              Our Collections
            </motion.p>
            <motion.h1
              className="font-fraunces font-semibold text-[#1a3a2a] italic mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            >
              Where Legacy Meets Luxury.
            </motion.h1>
            <motion.p 
              className="text-[#1a3a2a]/55 text-[13.5px] leading-[1.7] max-w-[400px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              Discover our exquisite range of handcrafted South Indian jewellery
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <motion.section 
        ref={filterRef}
        className="bg-[#1a3a2a] border-y border-[#c9a84c]/20 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={filterVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">

            {/* Search */}
            <motion.div 
              className="relative w-full lg:w-52"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={filterVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              <input
                type="text"
                placeholder="Search designs…"
                value={pendingSearchQuery}
                onChange={(e) => setPendingSearchQuery(e.target.value)}
                className="w-full h-9 px-3 pl-9 bg-white/[0.07] border border-[#c9a84c]/30 text-white placeholder:text-white/35 focus:border-[#c9a84c]/70 focus:outline-none text-[12px] tracking-wide transition-all duration-300 focus:bg-white/[0.1]"
              />
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <AnimatePresence>
                {pendingSearchQuery && (
                  <motion.button 
                    onClick={() => setPendingSearchQuery('')} 
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Dropdowns - Scrollable on mobile, wrap on desktop */}
            <motion.div 
              className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide lg:flex-wrap lg:overflow-visible"
              initial={{ opacity: 0, x: -20 }}
              animate={filterVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
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
              <AnimatePresence>
                {(filtersApplied || hasPendingFilters) && (
                  <motion.button 
                    onClick={filtersApplied || hasPendingFilters ? clearAllFilters : applyFilters} 
                    className="h-9 px-5 bg-[#c9a84c] text-[#1a3a2a] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#d4b55e] transition-all duration-300 shadow-elegant hover:shadow-elegant-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filtersApplied ? 'Clear Filters' : 'Apply'}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Results count */}
          <AnimatePresence>
            <motion.p 
              className="text-white/40 text-[11px] uppercase tracking-[0.14em] mt-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {filteredProducts.length > 0 ? (
                <>
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} pieces
                  {hasFiltersApplied && ` (filtered from ${products.length} total)`}
                </>
              ) : (
                `No pieces found (total: ${products.length})`
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ── PRODUCT GRID ── */}
      <motion.div 
        ref={gridRef}
        className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={gridVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div 
              key="no-results"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* ornament */}
              <motion.div 
                className="flex items-center justify-center gap-[6px] mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              >
                <span className="block h-px w-8 bg-[#c9a84c]/50" />
                <span className="block w-[6px] h-[6px] rounded-full bg-[#c9a84c]/60" />
                <span className="block h-px w-8 bg-[#c9a84c]/50" />
              </motion.div>
              <motion.p 
                className="font-fraunces text-[#1a3a2a] text-xl italic mb-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              >
                No pieces found
              </motion.p>
              <motion.p 
                className="text-[#1a3a2a]/45 text-[13px] mb-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              >
                {searchQuery ? `No results for "${searchQuery}"` : 'Try adjusting your filters'}
              </motion.p>
              <motion.a
                href="/collections"
                className="inline-flex items-center gap-2 border border-[#1a3a2a] text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.16em] px-7 py-[10px] hover:bg-[#1a3a2a] hover:text-white transition-all duration-300 shadow-elegant hover:shadow-elegant-lg"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Collections
              </motion.a>
            </motion.div>
          ) : (
            <motion.div 
              key="product-grid"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
            >
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  className="group bg-white rounded-sm overflow-hidden shadow-elegant hover:shadow-elegant-xl transition-all duration-500"
                  whileHover={{ y: -8, scale: 1.02 }}
                  layout
                >
                  {/* ── Image ── */}
                  <div className="aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-[#f8f6f0] to-[#f0ebe0]">
                    {/* outer gold border frame */}
                    <motion.div 
                      className="absolute inset-[6px] border border-[#c9a84c]/35 z-10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    />
                    <motion.img
                      src={product.mainImage || product.images[0] || 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                      whileHover={{ scale: 1.08 }}
                      style={{ transformOrigin: 'center center' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    {/* category badge top-left */}
                    <motion.span 
                      className="absolute top-3 left-3 z-20 bg-[#1a3a2a]/90 backdrop-blur-sm text-[#c9a84c] text-[7.5px] font-bold uppercase tracking-[0.22em] px-2 py-[3px] rounded-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      {product.category.replace(/_/g, ' ')}
                    </motion.span>
                  </div>

                  {/* ── Info ── */}
                  <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5 text-center border-x border-b border-[#c9a84c]/20 bg-white">
                    <motion.h3 
                      className="font-fraunces text-[13px] sm:text-[15px] lg:text-[16px] font-semibold text-[#1a3a2a] leading-snug mb-1.5 sm:mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      {product.name}
                    </motion.h3>
                    <motion.p 
                      className="text-[#1a3a2a]/45 text-[10px] sm:text-[11px] leading-[1.5] sm:leading-[1.6] mb-3 sm:mb-4 line-clamp-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      {product.description}
                    </motion.p>

                    {/* meta pills */}
                    <motion.div 
                      className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-3 sm:mb-4"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      {product.purity && (
                        <span className="text-[#1a3a2a]/50 text-[8px] sm:text-[9.5px] uppercase tracking-[0.14em] sm:tracking-[0.16em] border border-[#c9a84c]/30 px-1.5 sm:px-2 py-[2px] bg-[#f8f6f0] rounded-sm">
                          {product.purity.replace(/_/g, ' ')}
                        </span>
                      )}
                      {product.stoneType && product.stoneType !== 'NO_STONE' && (
                        <span className="text-[#1a3a2a]/50 text-[8px] sm:text-[9.5px] uppercase tracking-[0.14em] sm:tracking-[0.16em] border border-[#c9a84c]/30 px-1.5 sm:px-2 py-[2px] bg-[#f8f6f0] rounded-sm">
                          {product.stoneType.replace(/_/g, ' ')}
                        </span>
                      )}
                      {product.weight && (
                        <span className="text-[#1a3a2a]/50 text-[8px] sm:text-[9.5px] uppercase tracking-[0.14em] sm:tracking-[0.16em] border border-[#c9a84c]/30 px-1.5 sm:px-2 py-[2px] bg-[#f8f6f0] rounded-sm">
                          {product.weight}g
                        </span>
                      )}
                    </motion.div>

                    {/* ornament + CTA */}
                    <motion.div 
                      className="flex items-center justify-center gap-[5px] mb-2 sm:mb-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <span className="block h-px w-4 sm:w-6 bg-[#c9a84c]/40" />
                      <span className="block w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] rotate-45 bg-[#c9a84c]/55" />
                      <span className="block h-px w-4 sm:w-6 bg-[#c9a84c]/40" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      <a
                        href={`https://wa.me/61402399925?text=${encodeURIComponent(
                          `Hi Au Emerald team, I'm interested in this piece:\n\nName: ${product.name}\nCategory: ${product.category.replace(/_/g, ' ')}${product.purity ? `\nPurity: ${product.purity.replace(/_/g, ' ')}` : ''}${product.stoneType && product.stoneType !== 'NO_STONE' ? `\nStone: ${product.stoneType.replace(/_/g, ' ')}` : ''}${product.weight ? `\nWeight: ${product.weight}g` : ''}\n\nPlease provide more details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-[6px] text-[#1a3a2a] text-[8px] sm:text-[9.5px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] hover:text-[#c9a84c] transition-all duration-300 group-hover:scale-105"
                      >
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          Enquire Now
                        </motion.span>
                        <motion.svg 
                          className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px]"
                          viewBox="0 0 12 12" 
                          fill="none"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </motion.svg>
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PAGINATION ── */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <motion.div 
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Items per page selector - Mobile: horizontal scroll, Desktop: flex */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[#1a3a2a]/60 text-[12px] uppercase tracking-[0.12em]">Show</span>
                <div className="flex items-center gap-1 bg-white border border-[#c9a84c]/30 rounded-sm overflow-hidden">
                  {itemsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleItemsPerPageChange(option)}
                      className={`px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                        itemsPerPage === option 
                          ? 'bg-[#1a3a2a] text-[#c9a84c]' 
                          : 'text-[#1a3a2a]/60 hover:bg-[#f8f6f0] hover:text-[#1a3a2a]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <span className="text-[#1a3a2a]/60 text-[12px] uppercase tracking-[0.12em]">per page</span>
              </div>

              <p className="text-[#1a3a2a]/50 text-[11px] tracking-wide">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Previous button */}
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white border border-[#c9a84c]/30 text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.12em] hover:border-[#c9a84c] hover:bg-[#f8f6f0] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#c9a84c]/30 disabled:hover:bg-white"
                whileHover={currentPage !== 1 ? { scale: 1.02 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.98 } : {}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Prev</span>
              </motion.button>

              {/* Page numbers - Hidden on mobile, show on sm+ */}
              <div className="hidden sm:flex items-center gap-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="w-9 h-9 flex items-center justify-center text-[12px] font-semibold text-[#1a3a2a]/70 hover:bg-[#f8f6f0] hover:text-[#1a3a2a] border border-transparent hover:border-[#c9a84c]/30 rounded-sm transition-all duration-200"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="px-1 text-[#1a3a2a]/40 text-[12px]">...</span>
                    )}
                  </>
                )}

                {/* Page range */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 5) return true
                    if (page === 1 || page === totalPages) return false
                    return page >= currentPage - 1 && page <= currentPage + 1
                  })
                  .map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 flex items-center justify-center text-[12px] font-semibold rounded-sm transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-[#1a3a2a] text-[#c9a84c] border border-[#1a3a2a]'
                          : 'text-[#1a3a2a]/70 hover:bg-[#f8f6f0] hover:text-[#1a3a2a] border border-transparent hover:border-[#c9a84c]/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="px-1 text-[#1a3a2a]/40 text-[12px]">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-9 h-9 flex items-center justify-center text-[12px] font-semibold text-[#1a3a2a]/70 hover:bg-[#f8f6f0] hover:text-[#1a3a2a] border border-transparent hover:border-[#c9a84c]/30 rounded-sm transition-all duration-200"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Mobile: Simple page indicator */}
              <div className="flex sm:hidden items-center gap-2 px-3">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center text-[11px] font-semibold rounded-sm transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-[#1a3a2a] text-[#c9a84c]'
                          : 'text-[#1a3a2a]/60 hover:bg-[#f8f6f0]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              {/* Next button */}
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white border border-[#c9a84c]/30 text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.12em] hover:border-[#c9a84c] hover:bg-[#f8f6f0] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#c9a84c]/30 disabled:hover:bg-white"
                whileHover={currentPage !== totalPages ? { scale: 1.02 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.98 } : {}}
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Show all results indicator when no pagination needed */}
        {filteredProducts.length > 0 && totalPages === 1 && filteredProducts.length > 8 && (
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[#1a3a2a]/50 text-[12px] tracking-wide">
              Showing all {filteredProducts.length} pieces
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
