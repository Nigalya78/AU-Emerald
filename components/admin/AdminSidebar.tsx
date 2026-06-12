'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/products/new', label: 'Add Product' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-forest-green text-white flex flex-col">
      <div className="p-6 border-b border-white/20">
        <Link href="/" className="flex items-center">
          <Image
            src="/Au-logo.png"
            alt="Au Emerald"
            width={200}
            height={70}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
        <p className="text-aged-gold text-xs uppercase tracking-wider mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-3 rounded transition-colors ${
                  pathname === item.href
                    ? 'bg-aged-gold text-forest-green'
                    : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20">
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('adminAuth')
            }
            router.push('/admin/login')
          }}
          className="w-full px-4 py-3 text-left hover:bg-white/10 rounded transition-colors text-red-300"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
