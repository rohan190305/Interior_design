import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
import { getImages, deleteImage } from '@/lib/galleryStorage';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Validate ID
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      );
    }

    // Get all images to find the specific one
    const images = await getImages();
    const image = images.find(img => img.id === id);

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Validate imageUrl
    if (!image.imageUrl || typeof image.imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Invalid image URL' },
        { status: 400 }
      );
    }

    // Construct safe file path
    const safePath = path.join(process.cwd(), 'public', ...image.imageUrl.split('/').filter(Boolean));
    
    // Verify file exists before deleting
    try {
      await unlink(safePath);
    } catch (fileError) {
      console.error('File deletion error:', fileError);
      // Continue even if file deletion fails, as we still want to remove the record
    }

    // Delete from storage (JSON file)
    await deleteImage(id);

    return NextResponse.json({ 
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete image',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'; 