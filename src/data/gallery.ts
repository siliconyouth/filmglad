export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// Generate gallery images array
export const galleryImages: GalleryImage[] = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/${String(i + 1).padStart(2, "0")}-glad-still.webp`,
  alt: `GLAD film still ${i + 1}`,
}));

// Featured images for homepage (hand-picked selection)
export const featuredImageIds = [1, 5, 10, 14, 8, 17];
export const featuredImages = featuredImageIds.map(id =>
  galleryImages.find(img => img.id === id)!
);
