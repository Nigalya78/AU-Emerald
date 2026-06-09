'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      if (base64) {
        setImages([...images, base64])
      }
    }
    reader.readAsDataURL(file)
    
    // Reset input
    e.target.value = ''
  }

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

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (images.length === 0) {
      setError('Please add at least one product image')
      return
    }

    // Check if images are too large (base64 can be large)
    const totalImageSize = images.reduce((acc, img) => acc + img.length, 0)
    console.log('Total image data size:', totalImageSize, 'characters')
    if (totalImageSize > 10000000) { // ~10MB of base64 data
      setError('Total image size is too large. Please use smaller images or fewer images.')
      return
    }

    setSaving(true)

    const formData = new FormData(e.currentTarget)
    
    // Debug: Log form data
    const payload = {
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
    }
    console.log('Submitting product:', payload)
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      console.log('Response status:', response.status)
      
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/products')
        }, 1500)
      } else {
        setError(data.error || `Failed to create product (Status: ${response.status})`)
      }
    } catch (err: any) {
      console.error('Error creating product:', err)
      setError(`Network error: ${err.message || 'Please check your connection and try again.'}`)
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

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 text-red-800 rounded">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
              {error.includes('500') && (
                <p className="text-xs mt-1 text-red-600">Please check the server console for more details.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
          Product created successfully! Redirecting...
        </div>
      )}

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
          
          {/* Image Upload Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setImageInputMode('upload')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                imageInputMode === 'upload'
                  ? 'bg-forest-green text-white'
                  : 'bg-white text-forest-green border border-forest-green/30 hover:border-aged-gold'
              }`}
            >
              Upload Image
            </button>
            <button
              type="button"
              onClick={() => setImageInputMode('url')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                imageInputMode === 'url'
                  ? 'bg-forest-green text-white'
                  : 'bg-white text-forest-green border border-forest-green/30 hover:border-aged-gold'
              }`}
            >
              Image URL
            </button>
          </div>

          {/* File Upload */}
          {imageInputMode === 'upload' && (
            <div className="mb-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-forest-green/30 hover:border-aged-gold cursor-pointer transition-colors"
                >
                  <svg className="w-5 h-5 text-forest-green/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-forest-green/70">Click to upload image</span>
                </label>
              </div>
              <p className="text-xs text-forest-green/50 mt-2">Supports JPG, PNG, WebP (max 5MB)</p>
            </div>
          )}

          {/* URL Input */}
          {imageInputMode === 'url' && (
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
          )}

          {/* Uploaded Images Preview */}
          {images.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-forest-green/70 mb-2">Main Image</p>
              <div className="w-32 h-32 border-2 border-aged-gold">
                <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {images.length > 1 && (
            <div>
              <p className="text-sm text-forest-green/70 mb-2">Additional Images ({images.length - 1})</p>
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
          
          <div className="grid grid-cols-1 gap-6 mb-6">
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
