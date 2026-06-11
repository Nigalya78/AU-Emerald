import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Collections from '@/components/Collections';
import HomeSavings from '@/components/HomeSavings';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default async function Home() {
  const rawProducts = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    take: 4,
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
      <Hero />
      <Collections products={products} />
      <HomeSavings />
      <About />
      <WhyChooseUs />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
