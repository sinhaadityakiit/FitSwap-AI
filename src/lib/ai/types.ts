import { VirtualTryOnRequest, VirtualTryOnResult } from '../../types/try-on';
import { OutfitSpecification } from '../../types/outfit';

export interface ImageValidationResult {
  isValid: boolean;
  format?: string;
  fileSizeMb?: number;
  width?: number;
  height?: number;
  error?: string;
}

export interface GenerationStatusResult {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progressPercentage?: number;
  result?: VirtualTryOnResult;
  error?: string;
}

export interface FitSwapAIProvider {
  name: string;
  isConfigured(): boolean;
  validateImage(imageBufferOrBase64: string): Promise<ImageValidationResult>;
  buildOutfitPrompt(outfit: OutfitSpecification): string;
  editImage(request: VirtualTryOnRequest): Promise<VirtualTryOnResult>;
  getGenerationStatus(taskId: string): Promise<GenerationStatusResult>;
}
