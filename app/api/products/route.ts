import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  const visible = searchParams.get('visible')
  const search = searchParams.get('search')

  const where: any = {}

  if (category) where.category = category
  if (featured === 'true') where.featured = true
  if (visible === 'true') where.visible = true
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  const product = await prisma.product.create({
    data: {
      name: body.name,
      category: body.category,
      description: body.description,
      images: body.images || [],
      mainImage: body.mainImage,
      purity: body.purity || 'K22_GOLD',
      stoneType: body.stoneType || 'EMERALD',
      weight: body.weight || null,
      tags: body.tags || [],
      featured: body.featured || false,
      status: body.status || 'ACTIVE',
      order: body.order || 0,
    },
  })

  return NextResponse.json(product)
}

export async function PUT(request: Request) {
  const body = await request.json()
  
  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      name: body.name,
      category: body.category,
      description: body.description,
      images: body.images,
      mainImage: body.mainImage,
      purity: body.purity,
      stoneType: body.stoneType,
      weight: body.weight,
      tags: body.tags,
      featured: body.featured,
      status: body.status,
      order: body.order,
    },
  })

  return NextResponse.json(product)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  await prisma.product.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
