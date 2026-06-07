import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Motto from '@/components/Motto';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Collections from '@/components/Collections';
import SavingsScheme from '@/components/SavingsScheme';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Motto />
      <About />
      <WhyChooseUs />
      <Collections />
      <SavingsScheme />
      <Contact />
      <Footer />
    </main>
  );
}
