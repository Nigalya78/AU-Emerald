import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const jewelleryData = [
  // NECKLACES
  {
    name: "Traditional Kempu Necklace Set",
    category: "NECKLACES" as const,
    description: "Exquisite traditional South Indian kempu necklace with intricate gold work and ruby stones. Perfect for weddings and special occasions.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "RUBY" as const,
    weight: 45.8,
    tags: ["traditional", "wedding", "kempu", "bridal"],
    featured: true,
    status: "ACTIVE" as const,
    order: 1
  },
  {
    name: "Mango Mala Gold Necklace",
    category: "NECKLACES" as const,
    description: "Elegant mango mala design with delicate gold craftsmanship and emerald accents. A timeless piece for traditional attire.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "EMERALD" as const,
    weight: 38.5,
    tags: ["mango", "mala", "traditional", "emerald"],
    featured: false,
    status: "ACTIVE" as const,
    order: 2
  },
  {
    name: "Diamond Choker Necklace",
    category: "NECKLACES" as const,
    description: "Modern diamond choker with contemporary design, perfect for cocktail parties and evening events.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "DIAMOND" as const,
    weight: 28.3,
    tags: ["diamond", "choker", "modern", "contemporary"],
    featured: true,
    status: "ACTIVE" as const,
    order: 3
  },

  // EARRINGS
  {
    name: "Jhumka Gold Earrings",
    category: "EARRINGS" as const,
    description: "Traditional jhumka design with intricate gold work and pearl drops. Essential for every South Indian jewelry collection.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "PEARL" as const,
    weight: 12.7,
    tags: ["jhumka", "traditional", "pearl", "essential"],
    featured: false,
    status: "ACTIVE" as const,
    order: 4
  },
  {
    name: "Kundan Stud Earrings",
    category: "EARRINGS" as const,
    description: "Elegant kundan stud earrings with meenakari work. Perfect for daily wear and office attire.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "KUNDAN" as const,
    weight: 8.4,
    tags: ["kundan", "stud", "meenakari", "daily"],
    featured: false,
    status: "ACTIVE" as const,
    order: 5
  },
  {
    name: "Diamond Drop Earrings",
    category: "EARRINGS" as const,
    description: "Stunning diamond drop earrings with modern design. Perfect for weddings and formal events.",
    images: [
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "DIAMOND" as const,
    weight: 15.2,
    tags: ["diamond", "drop", "modern", "formal"],
    featured: true,
    status: "ACTIVE" as const,
    order: 6
  },

  // BANGLES
  {
    name: "Gold Kada Bangles Set",
    category: "BANGLES" as const,
    description: "Traditional gold kada bangles with intricate carvings. Set of 6 bangles perfect for festive occasions.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 65.4,
    tags: ["kada", "traditional", "carvings", "festive"],
    featured: false,
    status: "ACTIVE" as const,
    order: 7
  },
  {
    name: "Stone Studded Bangles",
    category: "BANGLES" as const,
    description: "Elegant gold bangles studded with precious stones. Perfect combination of tradition and elegance.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "EMERALD" as const,
    weight: 42.8,
    tags: ["studded", "emerald", "elegant", "traditional"],
    featured: false,
    status: "ACTIVE" as const,
    order: 8
  },

  // RINGS
  {
    name: "Gold Emerald Ring",
    category: "RINGS" as const,
    description: "Beautiful gold ring featuring a central emerald stone surrounded by diamonds. Perfect for engagements and special occasions.",
    images: [
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "EMERALD" as const,
    weight: 6.8,
    tags: ["emerald", "diamond", "engagement", "special"],
    featured: true,
    status: "ACTIVE" as const,
    order: 9
  },
  {
    name: "Traditional Gold Ring",
    category: "RINGS" as const,
    description: "Classic traditional gold ring with intricate temple design. Perfect for daily wear and religious occasions.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 8.2,
    tags: ["traditional", "temple", "daily", "religious"],
    featured: false,
    status: "ACTIVE" as const,
    order: 10
  },

  // SETS
  {
    name: "Bridal Jewellery Set",
    category: "SETS" as const,
    description: "Complete bridal jewellery set including necklace, earrings, and bangles. Intricate kempu work with traditional design.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "RUBY" as const,
    weight: 125.6,
    tags: ["bridal", "complete", "kempu", "wedding"],
    featured: true,
    status: "ACTIVE" as const,
    order: 11
  },
  {
    name: "Party Wear Jewellery Set",
    category: "SETS" as const,
    description: "Elegant party wear set with modern design and diamond accents. Includes necklace and earrings.",
    images: [
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "DIAMOND" as const,
    weight: 78.4,
    tags: ["party", "modern", "diamond", "elegant"],
    featured: false,
    status: "ACTIVE" as const,
    order: 12
  },

  // BRACELETS
  {
    name: "Gold Link Bracelet",
    category: "BRACELETS" as const,
    description: "Elegant gold link bracelet with secure clasp. Perfect for daily wear and office attire.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 24.7,
    tags: ["link", "daily", "office", "elegant"],
    featured: false,
    status: "ACTIVE" as const,
    order: 13
  },
  {
    name: "Tennis Bracelet",
    category: "BRACELETS" as const,
    description: "Modern tennis bracelet with continuous diamond setting. Perfect for formal occasions and parties.",
    images: [
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "DIAMOND" as const,
    weight: 18.9,
    tags: ["tennis", "diamond", "modern", "formal"],
    featured: false,
    status: "ACTIVE" as const,
    order: 14
  },

  // CHAINS
  {
    name: "Gold Mangalsutra Chain",
    category: "CHAINS" as const,
    description: "Traditional gold mangalsutra with black beads and gold pendant. Sacred symbol of marriage.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 15.3,
    tags: ["mangalsutra", "traditional", "sacred", "marriage"],
    featured: false,
    status: "ACTIVE" as const,
    order: 15
  },
  {
    name: "Lightweight Gold Chain",
    category: "CHAINS" as const,
    description: "Delicate lightweight gold chain perfect for daily wear. Subtle elegance for modern women.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 8.7,
    tags: ["lightweight", "daily", "delicate", "modern"],
    featured: false,
    status: "ACTIVE" as const,
    order: 16
  },

  // PENDANTS
  {
    name: "Ganesh Gold Pendant",
    category: "PENDANTS" as const,
    description: "Sacred Lord Ganesh gold pendant with intricate detailing. Perfect for religious occasions and blessings.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 7.2,
    tags: ["ganesh", "sacred", "religious", "blessings"],
    featured: false,
    status: "ACTIVE" as const,
    order: 17
  },
  {
    name: "Heart Diamond Pendant",
    category: "PENDANTS" as const,
    description: "Romantic heart-shaped pendant with diamond accents. Perfect gift for anniversaries and special occasions.",
    images: [
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "DIAMOND" as const,
    weight: 4.5,
    tags: ["heart", "diamond", "romantic", "gift"],
    featured: false,
    status: "ACTIVE" as const,
    order: 18
  },

  // ANKLETS
  {
    name: "Gold Payal Anklets",
    category: "ANKLETS" as const,
    description: "Traditional gold payal anklets with small bells. Perfect for traditional dance and festive occasions.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K22_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 18.4,
    tags: ["payal", "bells", "traditional", "dance"],
    featured: false,
    status: "ACTIVE" as const,
    order: 19
  },
  {
    name: "Silver Anklet Chain",
    category: "ANKLETS" as const,
    description: "Elegant silver anklet chain with modern design. Perfect for casual and daily wear.",
    images: [
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "SILVER" as const,
    stoneType: "NO_STONE" as const,
    weight: 12.8,
    tags: ["silver", "modern", "casual", "daily"],
    featured: false,
    status: "ACTIVE" as const,
    order: 20
  },

  // CUSTOM ORDERS
  {
    name: "Custom Temple Jewellery Set",
    category: "CUSTOM_ORDERS" as const,
    description: "Bespoke temple jewellery set designed to customer specifications. Intricate deity motifs and traditional craftsmanship.",
    images: [
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K24_GOLD" as const,
    stoneType: "EMERALD" as const,
    weight: 156.8,
    tags: ["custom", "temple", "bespoke", "deity"],
    featured: true,
    status: "ACTIVE" as const,
    order: 21
  },
  {
    name: "Personalized Name Necklace",
    category: "CUSTOM_ORDERS" as const,
    description: "Custom name necklace with elegant script font. Perfect personalized gift for loved ones.",
    images: [
      "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    mainImage: "https://images.pexels.com/photos/2910643/pexels-photo-2910643.jpeg?auto=compress&cs=tinysrgb&w=800",
    purity: "K18_GOLD" as const,
    stoneType: "NO_STONE" as const,
    weight: 9.6,
    tags: ["personalized", "name", "custom", "gift"],
    featured: false,
    status: "ACTIVE" as const,
    order: 22
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')
  
  try {
    // Clear existing products
    await prisma.product.deleteMany()
    console.log('🗑️  Cleared existing products')
    
    // Insert new products
    for (const product of jewelleryData) {
      await prisma.product.create({
        data: product
      })
      console.log(`✅ Created product: ${product.name}`)
    }
    
    console.log(`🎉 Successfully seeded ${jewelleryData.length} products`)
    
    // Display summary
    const categoryCounts = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        category: true
      }
    })
    
    console.log('\n📊 Products by category:')
    categoryCounts.forEach(count => {
      console.log(`   ${count.category}: ${count._count.category} items`)
    })
    
    const featuredCount = await prisma.product.count({
      where: { featured: true }
    })
    console.log(`\n⭐ Featured products: ${featuredCount}`)
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
