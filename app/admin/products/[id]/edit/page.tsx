'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Product {
  id: string
  name: string
  category: string
  description: string
  images: string[]
  featured: boolean
  visible: boolean
  order: number
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')

  const categories = ['NECKLACES', 'EARRINGS', 'BANGLES', 'RINGS', 'SETS', 'CUSTOM_ORDERS']

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product) return

    setSaving(true)
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          name: formData.get('name'),
          category: formData.get('category'),
          description: formData.get('description'),
          images: product.images,
          featured: formData.get('featured') === 'on',
          visible: formData.get('visible') === 'on',
          order: parseInt(formData.get('order') as string) || 0,
        }),
      })

      if (response.ok) {
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setSaving(false)
    }
  }

  const addImage = () => {
    if (newImageUrl.trim() && product) {
      setProduct({ ...product, images: [...product.images, newImageUrl.trim()] })
      setNewImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    if (product) {
      setProduct({ ...product, images: product.images.filter((_, i) => i !== index) })
    }
  }

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

  if (!product) {
    return (
      <div className="p-8">
        <p className="text-red-500">Product not found</p>
        <a href="/admin/products" className="text-aged-gold hover:underline mt-4 inline-block">
          ← Back to Products
        </a>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-fraunces text-3xl font-semibold text-forest-green mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-forest-green mb-2">
            Product Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product.name}
            required
            className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-forest-green mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product.category}
            required
            className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-forest-green mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={product.description}
            required
            className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-forest-green mb-2">
            Product Images
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="flex-1 px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-6 py-3 bg-forest-green text-white hover:bg-opacity-90"
            >
              Add
            </button>
          </div>

          {product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover border border-aged-gold"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-forest-green mb-2">
              Display Order
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={product.order}
              className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product.featured}
              className="w-5 h-5 border-forest-green/30 text-aged-gold focus:ring-aged-gold"
            />
            <span className="text-sm text-forest-green">Featured Product</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="visible"
              defaultChecked={product.visible}
              className="w-5 h-5 border-forest-green/30 text-aged-gold focus:ring-aged-gold"
            />
            <span className="text-sm text-forest-green">Visible on Website</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-forest-green text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Product'}
          </button>
          <a
            href="/admin/products"
            className="px-8 py-3 border border-forest-green text-forest-green font-medium hover:bg-forest-green hover:text-white transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
