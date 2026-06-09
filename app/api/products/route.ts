import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const visible = searchParams.get('visible')
    const search = searchParams.get('search')

    const where: any = {}

    if (category) where.category = category
    if (featured === 'true') where.featured = true
    if (visible === 'true') where.status = 'ACTIVE'
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('GET /api/products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Creating product with data:', JSON.stringify(body, null, 2))
    
    // Validate required fields
    if (!body.name || !body.category || !body.description) {
      return NextResponse.json(
        { error: 'Name, category, and description are required' },
        { status: 400 }
      )
    }

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

    console.log('Product created successfully:', product.id)
    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error creating product:', error)
    console.error('Error message:', error.message)
    if (error.code) console.error('Error code:', error.code)
    if (error.meta) console.error('Error meta:', error.meta)
    
    // Check for common database errors
    let errorMessage = error.message || 'Unknown error'
    if (error.message?.includes('database') || error.message?.includes('connection') || error.code === 'P1001') {
      errorMessage = 'Database connection failed. Please check your DATABASE_URL configuration.'
    }
    if (error.code === 'P2002') {
      errorMessage = 'A product with this name already exists.'
    }
    
    return NextResponse.json(
      { error: `Failed to create product: ${errorMessage}` },
      { status: 500 }
    )
  }
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
