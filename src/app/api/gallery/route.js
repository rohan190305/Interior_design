// app/api/gallery/route.js
import { getImages } from '@/lib/galleryStorage'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const images = await getImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';