'use client';

import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-white pt-16 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl font-semibold text-forest-green leading-tight">
              HEIRLOOMS
              <br />
              THAT LIVE
              <br />
              FOREVER
            </h1>
            
            <div className="w-16 h-0.5 bg-aged-gold mt-6 mb-6"></div>
            
            <p className="text-forest-green text-base leading-relaxed max-w-md mb-8">
              Au Emerald is a legacy of love, passed down through generations. Exquisite antique jewellery, crafted in gold and brought to life with the timeless beauty of emeralds.
            </p>

            <a
              href={`https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team,\n\nI'm interested in exploring your beautiful South Indian jewellery collection.\n\nCould you please share more details about:\n• Your latest designs\n• Available gold purity options (22K, 24K, 18K)\n• Custom jewellery services\n• Pricing and current offers\n\nThank you!").replace(/%0A/g, '%0A')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-forest-green text-white px-8 py-4 font-medium hover:bg-transparent hover:text-forest-green transition-all border-2 border-forest-green"
            >
              <WhatsAppIcon size={18} />
              ENQUIRE ON WHATSAPP
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-square bg-forest-green border-2 border-aged-gold overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                alt="Gold and Emerald Jewellery"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
