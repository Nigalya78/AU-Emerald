import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test API endpoint to verify connectivity
    return NextResponse.json({ 
      message: 'API is working',
      timestamp: new Date().toISOString(),
      success: true 
    })
  } catch (error) {
    return NextResponse.json({ 
      message: 'API test failed',
      error: error.message,
      success: false 
    }, { status: 500 })
  }
}
