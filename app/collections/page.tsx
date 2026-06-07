import Navbar from '@/components/Navbar';
import ProductsPage from './ProductsPage';
import Footer from '@/components/Footer';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductsPage />
      <Footer />
    </main>
  );
}
