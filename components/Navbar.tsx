'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import Image from 'next/image';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Legacy', href: '/', scrollTo: 'about' },
  { label: 'Craftsmanship', href: '/', scrollTo: 'why-choose-us' },
  { label: 'Collections', href: '/collections' },
  { label: 'Savings Scheme', href: '/savings' },
  { label: 'Contact', href: '/contact' },
];

const WA_HREF = `https://wa.me/61402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your jewellery collection.")}`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollLink = useCallback((scrollTo: string, closeMobile?: boolean) => {
    if (closeMobile) setMobileOpen(false);
    if (pathname === '/') {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${scrollTo}`);
    }
  }, [pathname, router]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [mobileOpen]);

  const active = (href: string) => mounted && pathname === href;

  return (
    <motion.nav 
      className={`fixed top-0 inset-x-0 z-50 bg-white border-b border-[#c9a84c]/25 transition-all duration-300 ${scrolled ? 'shadow-md backdrop-blur-sm bg-white/95' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-[60px] flex items-center gap-6">

        {/* ── Logo ── */}
        <motion.div 
          className="flex items-center shrink-0 mr-4 relative" 
          style={{ zIndex: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Link href="/" className="flex items-center">
            <Image 
              src="/Au-logo.png" 
              alt="Au Emerald" 
              width={96} 
              height={96} 
              className="object-contain lg:w-[76px] lg:h-[76px] xl:w-[96px] xl:h-[96px] transition-transform duration-300" 
              priority 
            />
          </Link>
        </motion.div>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-[14px] xl:gap-[22px] mx-auto">
          {NAV_LINKS.map((l, i) =>
            l.scrollTo ? (
              <motion.button
                key={l.label}
                onClick={() => handleScrollLink(l.scrollTo!)}
                className="text-[9.5px] xl:text-[10.5px] font-semibold uppercase tracking-[0.10em] xl:tracking-[0.13em] transition-colors relative group text-[#1a3a2a] hover:text-[#c9a84c]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -2 }}
              >
                {l.label}
                <motion.span 
                  className="absolute -bottom-[2px] left-0 h-[1.5px] bg-[#c9a84c] transition-all duration-300 w-0 group-hover:w-full"
                  layoutId="navbar-underline"
                />
              </motion.button>
            ) : (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={l.href}
                    className={`text-[9.5px] xl:text-[10.5px] font-semibold uppercase tracking-[0.10em] xl:tracking-[0.13em] transition-colors relative group ${
                      active(l.href) ? 'text-[#c9a84c]' : 'text-[#1a3a2a] hover:text-[#c9a84c]'
                    }`}
                  >
                    {l.label}
                    <motion.span 
                      className={`absolute -bottom-[2px] left-0 h-[1.5px] bg-[#c9a84c] transition-all duration-300 ${active(l.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                      layoutId={active(l.href) ? 'navbar-underline' : undefined}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            )
          )}
        </div>

        {/* ── Desktop CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[7px] bg-[#1a3a2a] text-white text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.12em] xl:tracking-[0.14em] px-3 xl:px-4 py-[9px] rounded-[3px] hover:bg-[#152d21] transition-all duration-300 shrink-0 ml-2 whitespace-nowrap hover:shadow-lg hover:shadow-[#1a3a2a]/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <WhatsAppIcon size={13} />
            Inquire via WhatsApp
          </motion.a>
        </motion.div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#1a3a2a]/5 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-6 h-6 text-[#1a3a2a]" strokeWidth={1.5} />
        </motion.button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} className="fixed inset-0 bg-black z-40" onClick={() => setMobileOpen(false)} />
            <motion.aside key="drw" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.26 }}
              className="fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl flex flex-col">
              <div className="h-[60px] flex items-center justify-between px-5 border-b border-gray-100">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                  <Image src="/Au-logo.png" alt="Au Emerald" width={40} height={40} className="w-10 h-10 object-contain" />
                </Link>
                <button onClick={() => setMobileOpen(false)} className="text-[#1a3a2a] hover:text-[#c9a84c]"><X size={22} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-3">
                {NAV_LINKS.map((l) =>
                  l.scrollTo ? (
                    <button key={l.label}
                      onClick={() => handleScrollLink(l.scrollTo!, true)}
                      className="flex items-center w-full py-3.5 border-b border-gray-50 text-sm font-medium tracking-wide text-[#1a3a2a] text-left">
                      {l.label}
                    </button>
                  ) : (
                    <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center py-3.5 border-b border-gray-50 text-sm font-medium tracking-wide ${active(l.href) ? 'text-[#c9a84c]' : 'text-[#1a3a2a]'}`}>
                      {l.label}
                    </Link>
                  )
                )}
              </div>
              <div className="px-5 py-4 border-t border-gray-100">
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#1a3a2a] text-white py-3 text-sm font-semibold tracking-wide"
                  onClick={() => setMobileOpen(false)}>
                  <WhatsAppIcon size={16} /> Inquire via WhatsApp
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
