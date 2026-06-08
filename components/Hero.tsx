'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WhatsAppIcon from './WhatsAppIcon';

export default function Hero() {
  return (
    <section id="home" className="bg-white overflow-x-hidden pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-1"
          >
            {/* Main Heading - Stacked All Caps Style */}
            <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-forest-green leading-[1.15] tracking-wide uppercase">
              Premium<br />
              Gold & Emerald<br />
              Jewellery
            </h1>

            {/* Gold Line Accent */}
            <div className="w-12 h-0.5 bg-aged-gold mt-6 mb-4"></div>

            {/* Body Text */}
            <p className="font-dm-sans text-forest-green/70 text-sm sm:text-base leading-relaxed max-w-md mb-6">
              Handcrafted pieces rooted in legacy. Timeless South Indian designs for every occasion, crafted with precision in Adelaide.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team,\n\nI'm interested in exploring your beautiful South Indian jewellery collection.\n\nCould you please share more details about:\n• Your latest designs\n• Available gold purity options (22K, 24K, 18K)\n• Custom jewellery services\n• Pricing and current offers\n\nThank you!").replace(/%0A/g, '%0A')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-forest-green text-white px-6 py-3 font-medium text-sm border-2 border-forest-green hover:bg-transparent hover:text-forest-green transition-all duration-300"
              >
                <WhatsAppIcon size={18} />
                <span>ENQUIRE ON WHATSAPP</span>
              </a>
              <Link
                href="/savings"
                className="inline-flex items-center gap-2 text-forest-green font-medium text-sm uppercase tracking-wider hover:text-aged-gold transition-colors group"
              >
                <span>View Schemes</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[3/2] bg-forest-green overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                  alt="Premium Gold and Emerald Jewellery"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
