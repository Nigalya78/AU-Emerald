'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Search } from 'lucide-react';
import Image from 'next/image';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC and lock body scroll when mobile menu is open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (!mounted) return false;
    return pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const handleSearchIconClick = () => {
    if (searchFocused && searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchFocused(false);
    } else {
      setSearchFocused(true);
      searchInputRef.current?.focus();
    }
  };

  const collectionCategories = [
    { name: 'All Collections', href: '/collections', type: 'header' },
    { name: 'Gold', href: '/collections?purity=K22_GOLD&purity=K24_GOLD&purity=K18_GOLD', type: 'item' },
    { name: 'Silver', href: '/collections?purity=SILVER', type: 'item' },
    { name: 'Diamond', href: '/collections?stone=DIAMOND', type: 'item' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center h-20 gap-8" suppressHydrationWarning>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 -my-10">
            <Image
              src="/logo-removebg-preview.png"
              alt="Au Emerald"
              width={400}
              height={145}
              className="h-[100px] md:h-28 w-auto object-contain"
              priority
            />
          </Link>

          {/* Nav Links - Left Side */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium uppercase tracking-wider relative group ${
                isActive('/') ? 'text-aged-gold' : 'text-forest-green'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-aged-gold transition-all duration-300 ease-out ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium uppercase tracking-wider relative group ${
                isActive('/about') ? 'text-aged-gold' : 'text-forest-green'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-aged-gold transition-all duration-300 ease-out ${isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            
            {/* Collections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <Link 
                href="/collections" 
                className={`text-sm font-medium uppercase tracking-wider flex items-center gap-1 relative group ${
                  isActive('/collections') ? 'text-aged-gold' : 'text-forest-green'
                }`}
              >
                Collections
                <ChevronDown size={14} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-aged-gold transition-all duration-300 ease-out ${isActive('/collections') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              
              {collectionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-5 px-5 w-[280px]">
                    {/* Header */}
                    <p className="text-aged-gold text-xs font-semibold tracking-widest uppercase mb-4">
                      Browse by Category
                    </p>
                    
                    {/* Category List */}
                    <div className="space-y-1 mb-4">
                      {/* Gold */}
                      <Link
                        href="/collections?purity=K22_GOLD"
                        className="block py-2 px-3 text-forest-green font-medium text-sm hover:text-aged-gold hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Gold
                      </Link>
                      
                      {/* Silver */}
                      <Link
                        href="/collections?purity=SILVER"
                        className="block py-2 px-3 text-forest-green font-medium text-sm hover:text-aged-gold hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Silver
                      </Link>
                      
                      {/* Diamond */}
                      <Link
                        href="/collections?stone=DIAMOND"
                        className="block py-2 px-3 text-forest-green font-medium text-sm hover:text-aged-gold hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Diamond
                      </Link>
                    </div>
                    
                    {/* View All Link */}
                    <Link
                      href="/collections"
                      className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 text-aged-gold font-medium text-sm hover:text-forest-green transition-colors"
                    >
                      View All Products
                      <ChevronDown size={16} className="-rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/savings" 
              className={`text-sm font-medium uppercase tracking-wider relative group ${
                isActive('/savings') ? 'text-aged-gold' : 'text-forest-green'
              }`}
            >
              Savings
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-aged-gold transition-all duration-300 ease-out ${isActive('/savings') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium uppercase tracking-wider relative group ${
                isActive('/contact') ? 'text-aged-gold' : 'text-forest-green'
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-aged-gold transition-all duration-300 ease-out ${isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          </div>

          {/* Right Side - Search and Enquiry */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className={`flex items-center bg-gray-100 rounded-full overflow-hidden transition-all duration-300 ${searchFocused ? 'w-64 ring-2 ring-aged-gold/30' : 'w-40'}`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => !searchQuery && setSearchFocused(false)}
                  className="w-full h-9 px-4 text-sm text-forest-green placeholder:text-gray-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  onClick={handleSearchIconClick}
                  className="p-2 text-forest-green hover:text-aged-gold transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Enquire button */}
            <a
              href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your South Indian jewellery collection.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest-green text-white px-4 py-2 text-sm font-medium hover:bg-transparent hover:text-forest-green border-2 border-forest-green transition-all"
            >
              <WhatsAppIcon size={16} />
              Enquire
            </a>
          </div>

          {/* Mobile hamburger - pushed to right */}
          <div className="lg:hidden flex items-center ml-auto">
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((s) => !s)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2"
            >
              {/* Animated hamburger lines */}
              <span className={`block w-6 h-0.5 bg-forest-green transition-all duration-300 ease-out ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-forest-green transition-all duration-300 ease-out ${mobileOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-forest-green transition-all duration-300 ease-out ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Enquiry button removed from header; available inside mobile menu */}
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* sliding panel */}
            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 right-0 z-50 h-full w-[320px] bg-white shadow-xl"
            >
              {/* Header with Logo and Close */}
              <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                  <Image src="/logo-removebg-preview.png" alt="Au Emerald" width={160} height={55} className="h-11 w-auto object-contain" />
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-forest-green hover:text-aged-gold transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg text-sm text-forest-green placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-aged-gold/50"
                  />
                </div>
              </div>

              {/* Menu Links */}
              <div className="px-4 py-2 overflow-y-auto h-[calc(100vh-280px)] scrollbar-modern">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-gray-50 ${isActive('/') ? 'text-aged-gold' : 'text-forest-green'}`}
                >
                  <span className="font-medium">Home</span>
                  <ChevronDown size={16} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Collections Dropdown */}
                <div className="border-b border-gray-50">
                  <button
                    className="w-full flex items-center justify-between py-3 text-forest-green"
                    onClick={() => setMobileCollectionsOpen((s) => !s)}
                    aria-expanded={mobileCollectionsOpen}
                  >
                    <span className="font-medium">Collections</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${mobileCollectionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileCollectionsOpen && (
                    <div className="pb-3 pl-4 space-y-2">
                      {collectionCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-forest-green/70 hover:text-aged-gold py-1"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* About */}
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-gray-50 ${isActive('/about') ? 'text-aged-gold' : 'text-forest-green'}`}
                >
                  <span className="font-medium">About</span>
                  <ChevronDown size={16} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Why Choose Us */}
                <Link
                  href="/why-choose-us"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-gray-50 ${isActive('/why-choose-us') ? 'text-aged-gold' : 'text-forest-green'}`}
                >
                  <span className="font-medium">Why Choose Us</span>
                  <ChevronDown size={16} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Savings Scheme */}
                <Link
                  href="/savings"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-gray-50 ${isActive('/savings') ? 'text-aged-gold' : 'text-forest-green'}`}
                >
                  <span className="font-medium">Savings Scheme</span>
                  <ChevronDown size={16} className="-rotate-90 text-gray-400" />
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-gray-50 ${isActive('/contact') ? 'text-aged-gold' : 'text-forest-green'}`}
                >
                  <span className="font-medium">Contact</span>
                  <ChevronDown size={16} className="-rotate-90 text-gray-400" />
                </Link>
              </div>

              {/* Footer CTA */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white border-t border-gray-100">
                <a
                  href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your jewellery collection.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-aged-gold text-forest-green py-3 rounded-lg font-medium text-sm hover:bg-forest-green hover:text-white transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <WhatsAppIcon size={18} />
                  Enquire on WhatsApp
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
