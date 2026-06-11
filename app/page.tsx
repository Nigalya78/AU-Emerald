import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Collections from '@/components/Collections';
import HomeSavings from '@/components/HomeSavings';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Collections />
      <HomeSavings />
      <About />
      <WhyChooseUs />
      
      
      <Contact />
      <Footer />
    </main>
  );
}
