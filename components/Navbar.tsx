'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const pathname = usePathname();

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
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-removebg-preview.png"
              alt="Au Emerald"
              width={240}
              height={85}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-xs font-medium transition-colors uppercase tracking-wider ${
                isActive('/') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-xs font-medium transition-colors uppercase tracking-wider ${
                isActive('/about') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'
              }`}
            >
              About
            </Link>
            <Link 
              href="/why-choose-us" 
              className={`text-xs font-medium transition-colors uppercase tracking-wider ${
                isActive('/why-choose-us') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'
              }`}
            >
              Why Choose Us?
            </Link>
            
            {/* Collections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <Link 
                href="/collections" 
                className={`text-xs font-medium transition-colors uppercase tracking-wider flex items-center gap-1 ${
                  isActive('/collections') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'
                }`}
              >
                Collections
                <ChevronDown size={14} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
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
              className={`text-xs font-medium transition-colors uppercase tracking-wider ${
                isActive('/savings') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'
              }`}
            >
              Savings Scheme
            </Link>
            <Link 
              href="/contact" 
              className={`text-xs font-medium transition-colors uppercase tracking-wider ${
                isActive('/contact') ? 'text-aged-gold' : 'text-forest-green hover:text-aged-gold'
              }`}
            >
              Contact
            </Link>
          </div>

          <a
            href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team,\n\nI'm interested in your South Indian jewellery collection.\n\nPlease share details about your products, pricing, and current offers.\n\nThank you!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-forest-green px-5 py-2.5 text-sm font-medium hover:bg-forest-green hover:text-white transition-all border border-forest-green"
          >
            <WhatsAppIcon size={16} />
            <span className="hidden sm:inline">ENQUIRE ON WHATSAPP</span>
            <span className="sm:hidden">ENQUIRE</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
