import Navbar from '@/components/Navbar';
import SavingsScheme from '@/components/SavingsScheme';
import Footer from '@/components/Footer';

export default function SavingsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <SavingsScheme />
      </div>
      <Footer />
    </main>
  );
}
