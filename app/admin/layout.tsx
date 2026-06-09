'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

  useEffect(() => {
    // Check localStorage for auth
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuth');
      setIsAuthenticated(auth === 'true');
      setLoading(false);
    };
    
    // Small delay to ensure localStorage is updated from login page
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-forest-green">Loading...</div>
      </div>
    );
  }

  // For login page, always render children
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, require authentication
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminContent>{children}</AdminContent>
  );
}
