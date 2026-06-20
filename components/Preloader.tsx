'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const leaveTimer = setTimeout(() => setLeaving(true), 2200);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 3000);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ring-outer {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes ring-middle {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bar-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .preloader-ring-outer {
          animation: ring-outer 1.8s ease-out infinite;
        }
        .preloader-ring-middle {
          animation: ring-middle 1.8s ease-out 0.5s infinite;
        }
        .preloader-logo {
          animation: fade-in 0.5s ease-out forwards;
        }
        .preloader-text {
          animation: fade-in 0.5s ease-out 0.3s both;
        }
        .preloader-tagline {
          animation: fade-in 0.5s ease-out 0.5s both;
        }
        .preloader-bar-wrap {
          animation: fade-in 0.5s ease-out 0.6s both;
        }
        .preloader-bar {
          animation: bar-slide 1.4s linear infinite;
        }
        .preloader-leaving {
          animation: fade-out 0.7s ease-in-out forwards;
          pointer-events: none;
        }
      `}</style>

      <div
        className={`fixed z-[9999] flex flex-col items-center justify-center bg-white${leaving ? ' preloader-leaving' : ''}`}
        style={{ top: 0, left: 0, width: '100dvw', height: '100dvh' }}
      >
        {/* Logo + rings */}
        <div className="relative flex items-center justify-center mb-6" style={{ width: 96, height: 96 }}>
          <span
            className="preloader-ring-outer absolute rounded-full border border-[#c9a84c]/30 pointer-events-none"
            style={{ width: 96, height: 96, top: '50%', left: '50%', marginTop: -48, marginLeft: -48 }}
          />
          <span
            className="preloader-ring-middle absolute rounded-full border border-[#c9a84c]/50 pointer-events-none"
            style={{ width: 96, height: 96, top: '50%', left: '50%', marginTop: -48, marginLeft: -48 }}
          />
          <div className="preloader-logo w-24 h-24 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-white shadow-lg" style={{ opacity: 0 }}>
            <Image
              src="/Au-logo.png"
              alt="Au Emerald"
              width={96}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        <p
          className="preloader-text font-fraunces text-[#1a3a2a] text-2xl font-semibold tracking-[0.12em] mb-1 text-center"
          style={{ opacity: 0 }}
        >
          Au Emerald
        </p>

        <p
          className="preloader-tagline text-[#c9a84c] text-[9px] font-bold uppercase tracking-[0.18em] mb-6 text-center px-6"
          style={{ opacity: 0 }}
        >
          Premium Quality · Timeless Connection
        </p>

        <div className="preloader-bar-wrap w-32 h-[2px] bg-[#c9a84c]/15 overflow-hidden rounded-full" style={{ opacity: 0 }}>
          <div className="preloader-bar h-full bg-gradient-to-r from-[#c9a84c]/60 via-[#c9a84c] to-[#c9a84c]/60 rounded-full" />
        </div>
      </div>
    </>
  );
}
