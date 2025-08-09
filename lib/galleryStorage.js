// lib/galleryStorage.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storagePath = path.join(__dirname, '../../data/gallery.json');

async function ensureStorageExists() {
  try {
    await fs.access(storagePath);
  } catch {
    await fs.mkdir(path.dirname(storagePath), { recursive: true });
    await fs.writeFile(storagePath, JSON.stringify([]));
  }
}

export async function getImages() {
  await ensureStorageExists();
  const data = await fs.readFile(storagePath, 'utf-8');
  return JSON.parse(data);
}

export async function addImage(imageData) {
  const images = await getImages();
  const newImage = {
    id: Date.now().toString(),
    ...imageData,
    createdAt: new Date().toISOString()
  };
  images.push(newImage);
  await fs.writeFile(storagePath, JSON.stringify(images, null, 2));
  return newImage;
}

export async function deleteImage(id) {
  const images = await getImages();
  const filtered = images.filter(img => img.id !== id);
  await fs.writeFile(storagePath, JSON.stringify(filtered, null, 2));
  return true;
}