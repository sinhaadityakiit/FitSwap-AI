import { OutfitSpecification } from './outfit';

export interface UserUploadedImage {
  id: string;
  dataUrl: string; // Base64 data URL for preview and generation
  fileName: string;
  fileSize: number; // in bytes
  mimeType: string;
  width: number;
  height: number;
  uploadedAt: number;
}

export interface VirtualTryOnRequest {
  originalImage: string; // Base64 or URL
  outfit: OutfitSpecification;
  maskImage?: string; // Optional segmentation/inpainting mask
  synthesizedImage?: string; // Pre-synthesized client try-on look
  provider?: 'gemini' | 'fal' | 'replicate' | 'testing';
  preserveBackground?: boolean;
  preserveFace?: boolean;
  preservePose?: boolean;
  fidelityLevel?: 'standard' | 'high' | 'ultra';
}

export interface VirtualTryOnResult {
  id: string;
  success: boolean;
  originalImageUrl: string;
  generatedImageUrl: string;
  compiledPrompt: string;
  provider: string;
  modelName: string;
  isTestingModeMock: boolean;
  processingTimeMs: number;
  createdAt: number;
  outfitSummary: string;
  layersCount: number;
  metadata?: Record<string, unknown>;
  error?: string;
}

export interface SavedCreation {
  id: string;
  originalImageUrl: string;
  generatedImageUrl: string;
  outfit: OutfitSpecification;
  compiledPrompt: string;
  outfitSummary: string;
  createdAt: number;
  provider: string;
  isTestingModeMock: boolean;
}
