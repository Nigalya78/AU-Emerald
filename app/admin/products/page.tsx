'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  status: 'ACTIVE' | 'HIDDEN' | 'OUT_OF_STOCK'
  order: number
  createdAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [search, filter])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (filter) params.append('category', filter)
      
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const toggleVisible = async (product: Product) => {
    try {
      const newStatus = product.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE'
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, status: newStatus }),
      })
      fetchProducts()
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const categories = ['NECKLACES', 'EARRINGS', 'BANGLES', 'RINGS', 'SETS', 'CUSTOM_ORDERS']

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="font-fraunces text-3xl font-semibold text-forest-green mb-4 md:mb-0">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center px-6 py-3 bg-forest-green text-white hover:bg-opacity-90 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      <div className="bg-white p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-forest-green text-white">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-medium w-16">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Category</th>
              <th className="px-6 py-4 text-center text-sm font-medium">Visible</th>
              <th className="px-6 py-4 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm font-medium text-forest-green hover:text-aged-gold"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-forest-green/70">
                  {product.category.replace('_', ' ')}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleVisible(product)}
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      product.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {product.status === 'ACTIVE' ? 'Yes' : 'No'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-aged-gold hover:text-dark-gold text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700 text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-8 text-center text-forest-green/60">
            No products found. Add your first product to get started.
          </div>
        )}
      </div>
    </div>
  )
}
