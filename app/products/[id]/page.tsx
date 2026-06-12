import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductDetail from './ProductDetail'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      name: true,
      description: true,
      category: true,
      purity: true,
      stoneType: true,
      mainImage: true,
    },
  })

  if (!product) {
    return {
      title: 'Product Not Found | Au Emerald',
    }
  }

  const categoryName = product.category.replace(/_/g, ' ')
  const purityText = product.purity?.replace(/_/g, ' ') || ''
  const stoneText = product.stoneType?.replace(/_/g, ' ') || ''

  return {
    title: `${product.name} | ${categoryName} | Au Emerald Adelaide`,
    description: `${product.description.substring(0, 150)}... Handcrafted ${purityText} ${categoryName.toLowerCase()}${stoneText ? ` with ${stoneText}` : ''}. Enquire via WhatsApp at Au Emerald Adelaide.`,
    keywords: [
      product.name.toLowerCase(),
      `${categoryName.toLowerCase()} adelaide`,
      `${purityText.toLowerCase()} jewellery`,
      stoneText ? `${stoneText.toLowerCase()} jewellery` : '',
      'handcrafted jewellery',
      'custom gold jewellery',
      'au emerald',
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | ${categoryName} | Au Emerald`,
      description: product.description.substring(0, 200),
      images: product.mainImage ? [product.mainImage] : ['/Au-logo.png'],
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params
  
  // Verify product exists
  const product = await prisma.product.findUnique({
    where: { id, status: 'ACTIVE' },
    select: { id: true },
  })

  if (!product) {
    notFound()
  }

  return <ProductDetail productId={id} />
}
