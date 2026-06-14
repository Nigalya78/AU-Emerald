import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

const EXT_TO_MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Resolve MIME type — browser may send empty string on some OS/browsers
    const fileExt = (file.name?.split('.').pop() || '').toLowerCase()
    const mimeType = file.type || EXT_TO_MIME[fileExt] || ''

    // Validate file type
    if (!MIME_TO_EXT[mimeType]) {
      return NextResponse.json(
        { error: `Invalid file type "${mimeType || fileExt}". Only JPG, PNG, and WebP are allowed.` },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'products')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const fileExtension = MIME_TO_EXT[mimeType] || fileExt || 'jpg'
    const fileName = `${randomUUID()}.${fileExtension}`
    const filePath = join(uploadDir, fileName)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return the public URL path
    const publicPath = `/uploads/products/${fileName}`

    return NextResponse.json({
      success: true,
      path: publicPath,
      url: publicPath,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    )
  }
}
