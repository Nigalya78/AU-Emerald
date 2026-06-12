'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const WA_HREF = `https://wa.me/610402399925?text=${encodeURIComponent("Hi Au Emerald team, I'm interested in your jewellery collection.")}`;

/* Reusable wave ornament */
function WaveOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[6px] ${className}`}>
      <span className="block h-px w-8 bg-[#c9a84c]" />
      <svg width="32" height="11" viewBox="0 0 64 18" fill="none">
        <path d="M2 9 Q10 1 22 9 Q32 17 42 9 Q54 1 62 9" stroke="#c9a84c" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <circle cx="32" cy="9" r="2.2" fill="#c9a84c"/>
      </svg>
      <span className="block h-px w-8 bg-[#c9a84c]" />
    </div>
  );
}

const CONTACT_INFO = [
  {
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </>
    ),
    label: 'Visit Us',
    value: '466 Grand Junction Road\nNorthfield SA 5085',
  },
  {
    icon: (
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    ),
    label: 'Call Us',
    value: '0402 399 925\n0430 464 545',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </>
    ),
    label: 'Opening Hours',
    value: 'Mon-Fri: 9am - 5pm\nSaturday: 9am - 4pm',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p 
            className="text-[#c9a84c] text-[12px] font-bold uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="font-fraunces font-semibold text-[#1a3a2a] leading-[1.15] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            Interested in<br />
            <span className="text-[#c9a84c] italic">a Piece?</span>
          </motion.h2>
          <motion.div 
            className="flex items-center justify-center gap-[6px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <span className="block h-px w-12 bg-[#c9a84c]" />
            <svg width="32" height="11" viewBox="0 0 60 16" fill="none">
              <path d="M2 8 Q12 1 22 8 Q30 14 38 8 Q48 1 58 8" stroke="#c9a84c" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
              <circle cx="30" cy="8" r="2" fill="#c9a84c"/>
            </svg>
            <span className="block h-px w-12 bg-[#c9a84c]" />
          </motion.div>
        </motion.div>

        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* ── Left: CTA + Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="bg-[#f8f6f0] rounded-lg p-8 lg:p-10 border border-[#c9a84c]/20">
              <p className="text-[#1a3a2a]/70 text-[16px] sm:text-[17px] leading-[1.8] mb-8">
                We don&apos;t sell online. Each piece is private, personal, and available 
                only upon enquiry. Visit our showroom or reach out via WhatsApp to 
                discover our exclusive collection.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#1a3a2a] text-white text-[12px] font-bold uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#152d21] transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <WhatsAppIcon size={16} />
                  Enquire on WhatsApp
                </a>
                <a
                  href="tel:0402399925"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1a3a2a] text-[#1a3a2a] text-[12px] font-bold uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#1a3a2a] hover:text-white transition-all duration-300 whitespace-nowrap"
                >
                  Call Us Now
                </a>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-[#c9a84c]/20">
                {CONTACT_INFO.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                    className="text-center flex flex-col items-center"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] mb-2 sm:mb-3">
                      <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {info.icon}
                      </svg>
                    </div>
                    <p className="text-[#1a3a2a] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] mb-1">{info.label}</p>
                    <p className="text-[#1a3a2a]/60 text-[9px] sm:text-[11px] leading-[1.5] sm:leading-[1.6] whitespace-pre-line">{info.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            className="bg-[#f8f6f0] rounded-lg p-8 lg:p-10 border border-[#c9a84c]/20"
          >
            <h3 className="text-[#1a3a2a] text-[16px] font-bold uppercase tracking-[0.14em] mb-6">
              Send Us a Message
            </h3>
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1a3a2a] rounded-lg p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="font-fraunces text-white text-[18px] font-semibold mb-2">
                  Message Sent!
                </h4>
                <p className="text-white/70 text-[14px] leading-[1.6]">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-[#c9a84c] text-[12px] font-semibold uppercase tracking-[0.12em] hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
            <form 
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Web3Forms required field */}
              <input type="hidden" name="access_key" value="1fbcf155-fa5a-437c-9230-958c3137d497" />
              <input type="hidden" name="subject" value="New Contact Form Submission - Au Emerald" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-white border border-[#c9a84c]/30 rounded-md px-4 py-3 text-[14px] text-[#1a3a2a] placeholder:text-[#1a3a2a]/40 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#c9a84c]/30 rounded-md px-4 py-3 text-[14px] text-[#1a3a2a] placeholder:text-[#1a3a2a]/40 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="04XX XXX XXX"
                  className="w-full bg-white border border-[#c9a84c]/30 rounded-md px-4 py-3 text-[14px] text-[#1a3a2a] placeholder:text-[#1a3a2a]/40 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[#1a3a2a] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about the piece you're interested in..."
                  className="w-full bg-white border border-[#c9a84c]/30 rounded-md px-4 py-3 text-[14px] text-[#1a3a2a] placeholder:text-[#1a3a2a]/40 focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]/30 transition-all duration-200 resize-none"
                />
              </div>

              {/* Error Message */}
              {isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-md p-3 text-center"
                >
                  <p className="text-red-600 text-[13px]">
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#1a3a2a] text-white text-[12px] font-bold uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#152d21] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="20" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 7h12M7 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
