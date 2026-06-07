'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Products', value: 0 },
    { label: 'Featured Products', value: 0 },
    { label: 'Visible Products', value: 0 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const products = await res.json();
        setStats([
          { label: 'Total Products', value: products.length },
          { label: 'Featured Products', value: products.filter((p: any) => p.featured).length },
          { label: 'Visible Products', value: products.filter((p: any) => p.visible).length },
        ]);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-fraunces text-3xl font-semibold text-forest-green mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 border-l-4 border-aged-gold">
            <p className="text-sm text-forest-green/60 uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className="font-fraunces text-4xl font-semibold text-forest-green">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-8">
        <h2 className="font-fraunces text-xl font-semibold text-forest-green mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/products/new"
            className="inline-flex items-center px-6 py-3 bg-forest-green text-white hover:bg-opacity-90 transition-colors"
          >
            Add New Product
          </a>
          <a
            href="/admin/products"
            className="inline-flex items-center px-6 py-3 border border-forest-green text-forest-green hover:bg-forest-green hover:text-white transition-colors"
          >
            Manage Products
          </a>
        </div>
      </div>
    </div>
  );
}
