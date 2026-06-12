'use client';

import { motion } from 'framer-motion';

const SECTIONS = [
  {
    title: '1. Gold Savings Scheme',
    content: [
      {
        heading: '1.1 Non-Refundable Policy',
        text: 'All amounts deposited under our Gold Savings Scheme are strictly non-refundable in cash. The accumulated amount can only be redeemed for gold jewellery or gold products of equivalent value.',
      },
      {
        heading: '1.2 Minimum Tenure',
        text: 'The minimum tenure for the savings scheme is 11 months. Premature closure before completing 11 months will not qualify for any bonus or scheme benefits.',
      },
      {
        heading: '1.3 Monthly Installments',
        text: 'Customers must pay the agreed monthly installment amount on or before the due date. A grace period of 7 days is provided for each installment.',
      },
      {
        heading: '1.4 Bonus Entitlement',
        text: 'Upon completion of the scheme tenure, customers are entitled to receive a bonus amount as per the scheme terms at the time of enrollment. This bonus can only be used for purchasing gold products.',
      },
      {
        heading: '1.5 Redemption',
        text: 'The saved amount plus applicable bonus can only be redeemed by purchasing gold jewellery, coins, or other gold products from Au Emerald. Cash redemption is strictly prohibited.',
      },
    ],
  },
  {
    title: '2. Product Sales & Purchases',
    content: [
      {
        heading: '2.1 Gold Purity',
        text: 'All gold products sold are certified for their purity (22K as marked). Certificates of authenticity are provided with all purchases above $500.',
      },
      {
        heading: '2.2 Making Charges',
        text: 'Making charges vary by product design and complexity. These charges are non-refundable and non-transferable.',
      },
      {
        heading: '2.3 Wastage',
        text: 'Applicable wastage charges as per industry standards will be added to the product cost. Wastage rates are displayed at our showroom.',
      },
      {
        heading: '2.4 Price Fluctuations',
        text: 'Gold prices are subject to daily market fluctuations. The final price will be determined at the time of purchase or redemption based on the prevailing gold rate.',
      },
    ],
  },
  {
    title: '3. Exchange & Buyback Policy',
    content: [
      {
        heading: '3.1 Exchange Eligibility',
        text: 'Products can be exchanged within 15 days of purchase, provided the item is unused, in original condition, and accompanied by the purchase receipt.',
      },
      {
        heading: '3.2 Exchange Value',
        text: 'The exchange value will be calculated based on the gold weight at the prevailing gold rate, excluding making charges and wastage.',
      },
      {
        heading: '3.3 Buyback Terms',
        text: 'Buyback is available only for gold products purchased from Au Emerald. The buyback value is determined by the current gold rate minus applicable deductions.',
      },
      {
        heading: '3.4 Non-Exchangeable Items',
        text: 'Custom-made, engraved, or altered items cannot be exchanged or returned. Special orders are final and non-refundable.',
      },
    ],
  },
  {
    title: '4. Repairs & Services',
    content: [
      {
        heading: '4.1 Warranty',
        text: 'Au Emerald provides a 6-month warranty on manufacturing defects. This does not cover damage due to misuse, accidents, or normal wear and tear.',
      },
      {
        heading: '4.2 Repair Charges',
        text: 'Repair services may incur charges based on the nature of work required. Estimates will be provided before commencing any repairs.',
      },
      {
        heading: '4.3 Service Timeline',
        text: 'Standard repairs typically take 7-14 business days. Complex repairs or custom work may require additional time.',
      },
    ],
  },
  {
    title: '5. Custom Orders',
    content: [
      {
        heading: '5.1 Advance Payment',
        text: 'Custom orders require a minimum 50% advance payment. The balance is due upon completion and before delivery.',
      },
      {
        heading: '5.2 Design Approval',
        text: 'Customers must approve the final design before production begins. Changes after production starts may incur additional charges.',
      },
      {
        heading: '5.3 Cancellation',
        text: 'Custom orders cancelled after design approval will forfeit the advance payment. Orders cancelled before approval may receive a partial refund minus design fees.',
      },
    ],
  },
  {
    title: '6. Privacy & Data Protection',
    content: [
      {
        heading: '6.1 Information Collection',
        text: 'We collect personal information necessary for order processing, scheme enrollment, and customer service. This includes name, contact details, and identification documents.',
      },
      {
        heading: '6.2 Data Security',
        text: 'Customer information is stored securely and used only for business purposes. We do not share personal information with third parties.',
      },
    ],
  },
  {
    title: '7. General Terms',
    content: [
      {
        heading: '7.1 Jurisdiction',
        text: 'All disputes shall be subject to the jurisdiction of courts in Adelaide, South Australia.',
      },
      {
        heading: '7.2 Amendments',
        text: 'Au Emerald reserves the right to amend these terms and conditions at any time. Changes will be effective immediately upon posting.',
      },
      {
        heading: '7.3 Contact',
        text: 'For any queries regarding these terms, please contact us at auemerald1@gmail.com or visit our showroom at 466 Grand Junction Road, Northfield SA 5085.',
      },
    ],
  },
];

export default function TermsClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#1a3a2a] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a84c] text-[12px] font-bold uppercase tracking-[0.3em] mb-4"
          >
            Legal Information
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-fraunces font-semibold text-white leading-[1.15]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Terms & <span className="text-[#c9a84c] italic">Conditions</span>
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#1a3a2a]/60 text-[15px] leading-[1.8] mb-12 text-center"
          >
            Please read these terms and conditions carefully before enrolling in our Gold Savings Scheme 
            or making any purchase. By using our services, you agree to be bound by these terms.
          </motion.p>

          <div className="space-y-12">
            {SECTIONS.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
                className="border-b border-[#c9a84c]/20 pb-12 last:border-0"
              >
                <h2 className="font-fraunces text-[#1a3a2a] text-[20px] sm:text-[22px] font-semibold mb-6">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="pl-4 border-l-2 border-[#c9a84c]/30">
                      <h3 className="text-[#1a3a2a] text-[14px] font-semibold uppercase tracking-[0.1em] mb-2">
                        {item.heading}
                      </h3>
                      <p className="text-[#1a3a2a]/70 text-[14px] leading-[1.8]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 pt-8 border-t border-[#c9a84c]/20 text-center"
          >
            <p className="text-[#1a3a2a]/50 text-[13px]">
              Last Updated: June 2025
            </p>
            <p className="text-[#1a3a2a]/50 text-[13px] mt-2">
              Au Emerald Jewellery • 466 Grand Junction Road, Northfield SA 5085
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
