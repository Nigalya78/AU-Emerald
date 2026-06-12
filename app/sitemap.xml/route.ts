import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const baseUrl = 'https://auemerald.com.au'
  
  // Static routes
  const staticRoutes = [
    '',
    '/collections',
    '/about',
    '/contact',
    '/savings',
    '/why-choose-us',
  ]

  // Fetch all active products
  const products = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true, updatedAt: true },
  })

  const now = new Date().toISOString()

  const staticUrls = staticRoutes.map((route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`).join('')

  const productUrls = products.map((product) => `
    <url>
      <loc>${baseUrl}/products/${product.id}</loc>
      <lastmod>${product.updatedAt.toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${productUrls}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
