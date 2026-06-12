'use client';

import { usePathname } from 'next/navigation';

const WA_HREF = `https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your jewellery collection.")}`;

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname === '/terms' || pathname.startsWith('/admin')) return null;

  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.45)' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="28"
        height="28"
        fill="white"
      >
        <path d="M24 4C12.95 4 4 12.95 4 24c0 3.6.97 7.01 2.66 9.96L4 44l10.3-2.62A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm0 36a16 16 0 0 1-8.18-2.25l-.58-.35-6.11 1.55 1.6-5.93-.38-.6A15.93 15.93 0 0 1 8 24c0-8.82 7.18-16 16-16s16 7.18 16 16-7.18 16-16 16zm8.77-11.9c-.48-.24-2.84-1.4-3.28-1.56-.44-.16-.76-.24-1.08.24-.32.48-1.24 1.56-1.52 1.88-.28.32-.56.36-1.04.12-.48-.24-2.04-.75-3.88-2.39-1.44-1.28-2.4-2.86-2.68-3.34-.28-.48-.03-.74.21-.98.22-.22.48-.56.72-.84.24-.28.32-.48.48-.8.16-.32.08-.6-.04-.84-.12-.24-1.08-2.6-1.48-3.56-.39-.93-.79-.8-1.08-.82-.28-.01-.6-.01-.92-.01-.32 0-.84.12-1.28.6-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.79 2.74 1.01 1.15.36 2.2.31 3.03.19.92-.14 2.84-1.16 3.24-2.28.4-1.12.4-2.08.28-2.28-.12-.2-.44-.32-.92-.56z"/>
      </svg>
    </a>
  );
}
