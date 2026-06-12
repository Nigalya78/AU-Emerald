import type { Metadata } from 'next';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';

import Navbar from '@/components/Navbar';
import ProductsPage from './ProductsPage';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gold & Emerald Jewellery Collections | Adelaide',
  description: 'Explore our exquisite collection of handcrafted South Indian gold jewellery. 22K gold necklaces, earrings, bangles, rings and more. Visit our Adelaide showroom.',
  keywords: [
    'gold jewellery collection Adelaide',
    'emerald necklace',
    'gold earrings Australia',
    '22K gold bangles',
    'bridal jewellery Adelaide',
    'South Indian jewellery collection',
    'custom gold designs',
  ],
  openGraph: {
    title: 'Gold & Emerald Jewellery Collections | Au Emerald Adelaide',
    description: 'Discover handcrafted South Indian gold and emerald jewellery. 22K gold pieces, custom designs.',
    images: ['/Au-logo.png'],
  },
}

export default async function CollectionsPage() {
  const rawProducts = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
  });

  const products = rawProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category as string,
    description: p.description,
    purity: p.purity as string,
    stoneType: p.stoneType as string,
    weight: p.weight ?? undefined,
    mainImage: p.mainImage ?? undefined,
    images: p.images,
  }));

  return (
    <main className="min-h-screen bg-white scrollbar-modern">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center" style={{ paddingTop: '60px' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-fraunces text-[#1a3a2a] text-lg italic">Loading Collection...</p>
          </div>
        </div>
      }>
        <ProductsPage initialProducts={products} />
      </Suspense>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
