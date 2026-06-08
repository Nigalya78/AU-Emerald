'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function SavingsScheme() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    {
      duration: '6 Month Plan',
      price: 'From $100 AUD/month',
      features: [
        'Save for 6 months',
        'Redeem against any jewellery purchase',
        '10% OFF on making charges',
      ],
      link: 'https://wa.me/610402399925?text=Hi, I\'d like to join the 6 Month Gold Savings Scheme',
    },
    {
      duration: '12 Month Plan',
      price: 'From $100 AUD/month',
      features: [
        'Save for 12 months',
        'Redeem against any jewellery purchase',
        '10% OFF on making charges',
        'Priority access to new collections',
      ],
      link: 'https://wa.me/610402399925?text=Hi, I\'d like to join the 12 Month Gold Savings Scheme',
    },
  ];

  return (
    <section id="savings" className="bg-white py-8 sm:py-12 lg:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-6 sm:mb-10"
        >
          <div className="w-12 h-0.5 bg-aged-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-aged-gold text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
            EXCLUSIVE OFFER
          </p>
          <h2 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl font-semibold text-forest-green mb-3 sm:mb-4">
            Gold Savings Scheme
          </h2>
          <p className="text-forest-green/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Our motto is to make everyone buy gold. Start from $100 AUD/month.
          </p>
        </motion.div>

        <div className="md:grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto justify-center max-h-[500px] overflow-y-auto scrollbar-hide snap-y snap-mandatory md:max-h-none md:overflow-visible">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              className="bg-white border-2 border-aged-gold p-8 lg:p-10 hover:shadow-lg transition-all duration-300 snap-start"
            >
              <h3 className="font-fraunces text-2xl font-semibold text-forest-green mb-2">
                {plan.duration}
              </h3>
              <p className="text-aged-gold font-medium mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-aged-gold flex-shrink-0 mt-0.5" />
                    <span className="text-forest-green/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-forest-green text-white px-6 py-3 font-medium hover:bg-opacity-90 transition-all border border-forest-green"
              >
                <WhatsAppIcon size={16} />
                Join This Plan
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-forest-green/60 text-sm mt-8"
        >
          Terms and conditions apply. Contact us on WhatsApp to enroll.
        </motion.p>
      </div>
    </section>
  );
}
