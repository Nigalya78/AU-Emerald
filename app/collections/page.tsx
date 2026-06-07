import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ProductsPage from './ProductsPage';
import Footer from '@/components/Footer';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <ProductsPage />
      </Suspense>
      <Footer />
    </main>
  );
}
