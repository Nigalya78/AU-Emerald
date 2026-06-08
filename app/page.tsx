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
      
      {/* Divider */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="h-px bg-aged-gold/30"></div>
        </div>
      </div>
      
      <Collections />
      
      {/* Divider */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="h-px bg-aged-gold/30"></div>
        </div>
      </div>
      
      <SavingsScheme />
      
      {/* Divider */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="h-px bg-aged-gold/30"></div>
        </div>
      </div>
      
      <Contact />
      <Footer />
    </main>
  );
}
