'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      title: 'Premium Quality',
      description: 'Carefully selected jewellery crafted to meet the highest standards of quality and beauty.',
    },
    {
      title: 'Unique Designs',
      description: 'Exclusive collections inspired by South Indian heritage and artistry.',
    },
    {
      title: 'South Indian Tradition',
      description: 'Authentic pieces that celebrate the rich cultural traditions of South India.',
    },
    {
      title: 'Trust & Satisfaction',
      description: 'Committed to providing a trustworthy and satisfying jewellery-buying experience.',
    },
  ];

  return (
    <section id="contact" className="bg-white py-8 sm:py-12 lg:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-start">
          {/* Left Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-fraunces text-4xl sm:text-5xl font-semibold text-forest-green leading-tight mb-6">
              INTERESTED IN
              <br />
              A PIECE?
            </h2>
            
            <div className="w-16 h-0.5 bg-aged-gold mb-6"></div>

            <p className="text-forest-green/80 text-base leading-relaxed max-w-md mb-8">
              We don&apos;t sell online. Each piece is private, personal, and available only upon enquiry.
            </p>

            <a
              href="https://wa.me/610402399925?text=Hi, I'm interested in Au Emerald jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-aged-gold text-aged-gold px-8 py-4 font-medium hover:bg-aged-gold hover:text-forest-green transition-all"
            >
              <WhatsAppIcon size={18} />
              ENQUIRE ON WHATSAPP
            </a>
          </motion.div>

          {/* Right Side - Features with gold circle icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="space-y-8 lg:border-l lg:border-aged-gold/30 lg:pl-12"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Gold Circle Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-aged-gold flex items-center justify-center">
                  <span className="text-aged-gold text-lg font-semibold">{index + 1}</span>
                </div>
                
                <div>
                  <h3 className="text-forest-green font-semibold text-sm uppercase tracking-wider mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-forest-green/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
