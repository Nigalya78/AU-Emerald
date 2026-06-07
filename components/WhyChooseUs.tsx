'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gem, HandHeart, MapPin, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Gem,
      title: 'Authentic South Indian Jewellery',
      description: 'Experience genuine South Indian jewellery crafted with traditional artistry and timeless appeal.',
    },
    {
      icon: HandHeart,
      title: 'Exceptional Craftsmanship',
      description: 'Every piece reflects authentic South Indian craftsmanship, showcasing intricate detailing and superior quality.',
    },
    {
      icon: MapPin,
      title: 'Exclusive Designs',
      description: 'Discover unique and exclusive collections that cannot be found elsewhere.',
    },
    {
      icon: Clock,
      title: 'Perfect for Every Occasion',
      description: 'From weddings and celebrations to cherished family moments, our jewellery is designed to be treasured for generations.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="why-choose-us" className="bg-white pt-6 sm:pt-10 lg:pt-14 pb-3 sm:pb-5 lg:pb-7 overflow-x-hidden">
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
            WHY AU EMERALD
          </p>
          <h2 className="font-fraunces text-2xl sm:text-4xl lg:text-5xl font-semibold text-forest-green">
            WHY CHOOSE AU EMERALD?
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white border-t-2 border-aged-gold p-8 hover:shadow-lg transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-aged-gold mb-6" strokeWidth={1.5} />
              <h3 className="font-fraunces text-xl font-semibold text-forest-green mb-3">
                {feature.title}
              </h3>
              <p className="text-forest-green/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
