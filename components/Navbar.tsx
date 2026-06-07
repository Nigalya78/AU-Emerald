'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const pathname = usePathname();

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

  const isActive = (path: string) => pathname === path;

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
        scrolled ? 'border-b border-aged-gold' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-removebg-preview.png"
              alt="Au Emerald"
              width={240}
              height={85}
              className="h-12 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-forest-green border border-aged-gold shadow-lg py-2 min-w-[160px]">
                    {collectionCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="block px-4 py-2 text-sm text-white hover:text-aged-gold hover:bg-white/10 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
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
              Savings Scheme
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

          {/* Enquire button for lg+ screens (hidden on smaller screens) */}
          <a
            href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team,\n\nI'm interested in your South Indian jewellery collection.\n\nPlease share details about your products, pricing, and current offers.\n\nThank you!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-forest-green text-white px-4 py-2 text-sm font-medium hover:bg-transparent hover:text-forest-green hover:border-2 hover:border-forest-green transition-all"
          >
            <WhatsAppIcon size={16} />
            ENQUIRE ON WHATSAPP
          </a>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md border border-forest-green text-forest-green bg-white hover:bg-forest-green hover:text-white transition"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="fixed top-0 right-0 z-50 h-full w-[320px] bg-white shadow-lg border-l border-aged-gold"
            >
              <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                  <Image src="/logo-removebg-preview.png" alt="Au Emerald" width={140} height={50} className="h-10 w-auto object-contain" />
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-forest-green"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-4 py-4 overflow-y-auto h-[calc(100vh-80px)] scrollbar-modern space-y-3">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium uppercase tracking-wider ${isActive('/') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'}`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium uppercase tracking-wider ${isActive('/about') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'}`}
                >
                  About
                </Link>
                <Link
                  href="/why-choose-us"
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium uppercase tracking-wider ${isActive('/why-choose-us') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'}`}
                >
                  Why Choose Us?
                </Link>

                {/* Collections - tap to expand */}
                <div>
                  <button
                    className="w-full flex items-center justify-between text-sm font-medium uppercase tracking-wider text-forest-green"
                    onClick={() => setMobileCollectionsOpen((s) => !s)}
                    aria-expanded={mobileCollectionsOpen}
                  >
                    <span>Collections</span>
                    <ChevronDown size={14} className={`${mobileCollectionsOpen ? 'rotate-180' : ''} transition-transform`} />
                  </button>
                  {mobileCollectionsOpen && (
                    <div className="mt-2 space-y-1 pl-3">
                      {collectionCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-forest-green hover:text-aged-gold"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/savings"
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium uppercase tracking-wider ${isActive('/savings') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'}`}
                >
                  Savings Scheme
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium uppercase tracking-wider ${isActive('/contact') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'}`}
                >
                  Contact
                </Link>

                <a
                  href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team,\n\nI'm interested in your South Indian jewellery collection.\n\nPlease share details about your products, pricing, and current offers.\n\nThank you!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-white text-forest-green px-4 py-2 text-sm font-medium hover:bg-forest-green hover:text-white transition-all border border-forest-green"
                  onClick={() => setMobileOpen(false)}
                >
                  <WhatsAppIcon size={16} />
                  ENQUIRE
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
