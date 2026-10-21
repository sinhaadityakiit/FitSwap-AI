import { GarmentItem } from '../types/catalogue';
import { GarmentImageRecord } from '../types/clothing-image';
import {
  CLOTHING_IMAGE_REGISTRY,
  CATEGORY_PHOTO_FALLBACKS,
  lookupGarmentImageRecord,
} from './clothing-image-registry';

// Dictionary of every garment name to its high-resolution authentic photograph URL
export const LOCAL_GARMENT_IMAGES: Record<string, string> = Object.entries(
  CLOTHING_IMAGE_REGISTRY
).reduce((acc, [name, record]) => {
  acc[name] = record.imageUrl;
  return acc;
}, {} as Record<string, string>);

/**
 * Returns the photographic image fallback URL for a given category.
 * Guaranteed to return an authentic, high-quality fashion photograph, never an SVG.
 */
export function getCategoryFallback(categoryId: string): string {
  if (CATEGORY_PHOTO_FALLBACKS[categoryId]) {
    return CATEGORY_PHOTO_FALLBACKS[categoryId].imageUrl;
  }
  return CATEGORY_PHOTO_FALLBACKS['dresses'].imageUrl;
}

/**
 * Returns the full GarmentImageRecord (including photographer, attribution, license, and displayFit)
 * for a garment name and optional category.
 */
export function getGarmentImageRecord(garmentName: string, categoryId?: string): GarmentImageRecord {
  return lookupGarmentImageRecord(garmentName, categoryId);
}

/**
 * Primary function to resolve a garment's authentic photograph URL.
 * 1. Checks explicit garment.imageUrl if already a real photo URL
 * 2. Checks registry by garment name
 * 3. Falls back to category fashion photograph
 */
export function getGarmentImageUrl(garment: GarmentItem): string {
  // 1. Check registry first to guarantee the latest verified studio model photo is served
  const record = lookupGarmentImageRecord(garment.name, garment.categoryId);
  if (record && record.imageUrl) {
    return record.imageUrl;
  }

  // 2. If the garment already has a valid non-svg image URL, return it
  if (garment.imageUrl && !garment.imageUrl.endsWith('.svg')) {
    return garment.imageUrl;
  }

  // 3. Fallback to category fashion photograph
  return getCategoryFallback(garment.categoryId || 'dresses');
}
