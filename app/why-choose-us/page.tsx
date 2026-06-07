import Navbar from '@/components/Navbar';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <WhyChooseUs />
      </div>
      <Footer />
    </main>
  );
}
