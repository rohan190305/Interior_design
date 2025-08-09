// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { addImage } from '@/lib/galleryStorage';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const title = formData.get('title');
    const category = formData.get('category') || 'Uncategorized';
    const description = formData.get('description') || '';

    if (!file || !title) {
      return NextResponse.json(
        { error: 'Image and title are required' },
        { status: 400 }
      );
    }

    // Save the file
    const extension = file.name.split('.').pop();
    const filename = `${uuidv4()}.${extension}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));

    // Save to storage
    const image = await addImage({
      title,
      category,
      description,
      imageUrl: `/uploads/${filename}`
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}