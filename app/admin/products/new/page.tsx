'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const categories = ['NECKLACES', 'EARRINGS', 'BANGLES', 'RINGS', 'SETS', 'BRACELETS', 'CHAINS', 'PENDANTS', 'ANKLETS', 'CUSTOM_ORDERS']
  const purities = [
    { value: 'K22_GOLD', label: '22K Gold' },
    { value: 'K24_GOLD', label: '24K Gold' },
    { value: 'K18_GOLD', label: '18K Gold' },
    { value: 'SILVER', label: 'Silver' },
    { value: 'GOLD_PLATED', label: 'Gold Plated' },
    { value: 'CUSTOM', label: 'Custom' }
  ]
  const stoneTypes = [
    { value: 'EMERALD', label: 'Emerald' },
    { value: 'RUBY', label: 'Ruby' },
    { value: 'DIAMOND', label: 'Diamond' },
    { value: 'PEARL', label: 'Pearl' },
    { value: 'KUNDAN', label: 'Kundan' },
    { value: 'NO_STONE', label: 'No Stone' },
    { value: 'OTHER', label: 'Other' }
  ]
  const productStatuses = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'HIDDEN', label: 'Hidden' },
    { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
    { value: 'COMING_SOON', label: 'Coming Soon' }
  ]
  const availableTags = ['Bridal', 'Traditional', 'Temple Jewellery', 'Wedding', 'Party Wear', 'Daily Wear', 'South Indian', 'Emerald Collection', 'Gold', 'Silver', 'Diamond']

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          category: formData.get('category'),
          description: formData.get('description'),
          images: images,
          mainImage: images[0] || null,
          purity: formData.get('purity'),
          stoneType: formData.get('stoneType'),
          weight: parseFloat(formData.get('weight') as string) || null,
          tags: selectedTags,
          featured: formData.get('featured') === 'on',
          status: formData.get('status'),
          order: parseInt(formData.get('order') as string) || 0,
        }),
      })

      if (response.ok) {
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setSaving(false)
    }
  }

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()])
      setNewImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-fraunces text-3xl font-semibold text-forest-green mb-8">
        Add New Product
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
            Product Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Elegant handcrafted gold necklace featuring emerald stones, designed for weddings and special occasions."
            required
            className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-forest-green mb-2">
            Product Images *
          </label>
          {images.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-forest-green/70 mb-2">Main Image</p>
              <div className="w-32 h-32 border-2 border-aged-gold">
                <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
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

          {images.length > 0 && (
            <div>
              <p className="text-sm text-forest-green/70 mb-2">Additional Images</p>
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((image, index) => (
                  <div key={index + 1} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 2}`}
                      className="w-full h-24 object-cover border border-aged-gold"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index + 1)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-forest-green/20 pt-6">
          <h3 className="font-fraunces text-lg font-semibold text-forest-green mb-4">Product Details</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="purity" className="block text-sm font-medium text-forest-green mb-2">
                Purity
              </label>
              <select
                id="purity"
                name="purity"
                defaultValue="K22_GOLD"
                className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
              >
                {purities.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="stoneType" className="block text-sm font-medium text-forest-green mb-2">
                Stone Type
              </label>
              <select
                id="stoneType"
                name="stoneType"
                defaultValue="EMERALD"
                className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
              >
                {stoneTypes.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-forest-green mb-2">
            Approximate Weight (grams)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            placeholder="35.5"
            className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-forest-green mb-3">
            Product Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-forest-green text-white border-forest-green'
                    : 'bg-white text-forest-green border-forest-green/30 hover:border-aged-gold'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-forest-green/20 pt-6">
          <h3 className="font-fraunces text-lg font-semibold text-forest-green mb-4">Product Settings</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="order" className="block text-sm font-medium text-forest-green mb-2">
                Display Order
              </label>
              <input
                id="order"
                name="order"
                type="number"
                defaultValue="0"
                className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-forest-green mb-2">
                Product Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue="ACTIVE"
                className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none"
              >
                {productStatuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              className="w-5 h-5 border-forest-green/30 text-aged-gold focus:ring-aged-gold"
            />
            <span className="text-sm text-forest-green">Featured Product - appears on homepage</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-forest-green text-white font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Create Product'}
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
