'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Hardcoded credentials
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'auemerald123'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple hardcoded authentication
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store auth in localStorage
      localStorage.setItem('adminAuth', 'true')
      // Use replace instead of push to avoid back button going to login
      router.replace('/admin')
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-forest-green flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="font-fraunces text-3xl font-semibold text-forest-green mb-2">
            Au Emerald
          </h1>
          <p className="text-aged-gold text-sm uppercase tracking-wider">
            Admin Login
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-forest-green mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-forest-green mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-forest-green/30 focus:border-aged-gold focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-green text-white py-3 font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-forest-green/60 hover:text-aged-gold transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  )
}
