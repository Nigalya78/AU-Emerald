'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import Image from 'next/image';
import Link from 'next/link';

const WA_HREF = `https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your jewellery collection.")}`;

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Legacy', href: '/', scrollTo: 'about' },
  { label: 'Craftsmanship', href: '/', scrollTo: 'why-choose-us' },
  { label: 'Collections', href: '/collections' },
  { label: 'Savings Scheme', href: '/savings' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const COLLECTIONS = [
  { label: 'Gold Jewellery', href: '/collections?purity=GOLD_22K' },
  { label: 'Silver Jewellery', href: '/collections?purity=SILVER' },
  { label: 'Diamond Collection', href: '/collections?stone=DIAMOND' },
  { label: 'Custom Made', href: '/contact' },
];

function FacebookIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollLink = useCallback((scrollTo: string) => {
    if (pathname === '/') {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${scrollTo}`);
    }
  }, [pathname, router]);

  return (
    <footer className="bg-[#1a3a2a] overflow-hidden">
      {/* thin gold top line */}
      <div className="h-px bg-[#c9a84c]/30" />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-10">

          {/* ── Col 1: Logo + description + social icons ── */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/Au-logo.png"
                alt="Au Emerald"
                width={72}
                height={72}
                className="w-[72px] h-[72px] object-contain"
              />
            </Link>
            <p className="text-white/45 text-[12.5px] leading-[1.75] max-w-[220px]">
              Adelaide&apos;s premier destination for authentic South Indian jewellery. Premium quality, timeless connection.
            </p>
            {/* social icons */}
            <div className="flex items-center gap-3 mt-1">
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#c9a84c]/35 flex items-center justify-center text-[#c9a84c]/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                <WhatsAppIcon size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#c9a84c]/35 flex items-center justify-center text-[#c9a84c]/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                <FacebookIcon size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#c9a84c]/35 flex items-center justify-center text-[#c9a84c]/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                <InstagramIcon size={14} />
              </a>
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h5 className="text-white/80 text-[10px] font-bold uppercase tracking-[0.22em] mb-4">
              Quick Links
            </h5>
            <ul className="space-y-[9px]">
              {QUICK_LINKS.map((l) => (
                <li key={l.label} className="flex items-center gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#c9a84c]/45 shrink-0" />
                  {l.scrollTo ? (
                    <button onClick={() => handleScrollLink(l.scrollTo!)} className="text-white/45 text-[11.5px] hover:text-[#c9a84c] transition-colors text-left">
                      {l.label}
                    </button>
                  ) : (
                    <Link href={l.href} className="text-white/45 text-[11.5px] hover:text-[#c9a84c] transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Collections ── */}
          <div>
            <h5 className="text-white/80 text-[10px] font-bold uppercase tracking-[0.22em] mb-4">
              Collections
            </h5>
            <ul className="space-y-[9px]">
              {COLLECTIONS.map((l) => (
                <li key={l.label} className="flex items-center gap-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#c9a84c]/45 shrink-0" />
                  <Link href={l.href} className="text-white/45 text-[11.5px] hover:text-[#c9a84c] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Get In Touch ── */}
          <div>
            <h5 className="text-white/80 text-[10px] font-bold uppercase tracking-[0.22em] mb-4">
              Get In Touch
            </h5>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2.5">
                <svg className="w-[13px] h-[13px] text-[#c9a84c]/60 shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-white/45 text-[11.5px] leading-[1.65]">466 Grand Junction Road<br />Northfield SA 5085</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-[13px] h-[13px] text-[#c9a84c]/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-white/45 text-[11.5px]">0402 399 925 / 0430 464 545</span>
              </li>
            </ul>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#c9a84c]/55 text-[#c9a84c] text-[10px] font-semibold uppercase tracking-[0.13em] px-4 py-[8px] hover:bg-[#c9a84c] hover:text-[#1a3a2a] transition-all duration-250"
            >
              <WhatsAppIcon size={12} />
              Enquire on WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-[10px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/22 text-[9.5px] uppercase tracking-[0.2em]">
            © 2025 Au Emerald. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/22 text-[9.5px] uppercase tracking-[0.16em] hover:text-[#c9a84c]/60 transition-colors">Privacy Policy</a>
            <Link href="/terms" className="text-white/22 text-[9.5px] uppercase tracking-[0.16em] hover:text-[#c9a84c]/60 transition-colors">Terms & Conditions</Link>
            <a href="#" className="text-white/22 text-[9.5px] uppercase tracking-[0.16em] hover:text-[#c9a84c]/60 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
