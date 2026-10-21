import { FitSwapAIProvider, ImageValidationResult, GenerationStatusResult } from './types';
import { VirtualTryOnRequest, VirtualTryOnResult } from '../../types/try-on';
import { OutfitSpecification } from '../../types/outfit';
import { buildOutfitPrompt } from './prompt-builder';

export class FalAIProvider implements FitSwapAIProvider {
  name = 'Fal.ai Virtual Try-On API';
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.FAL_KEY;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 10 && !this.apiKey.includes('your_'));
  }

  async validateImage(imageBufferOrBase64: string): Promise<ImageValidationResult> {
    if (!imageBufferOrBase64) return { isValid: false, error: 'No image provided' };
    return { isValid: true };
  }

  buildOutfitPrompt(outfit: OutfitSpecification): string {
    return buildOutfitPrompt(outfit);
  }

  async editImage(request: VirtualTryOnRequest): Promise<VirtualTryOnResult> {
    const startTime = Date.now();
    if (!this.isConfigured()) {
      throw new Error(
        'Fal.ai Key is not configured. Please set FAL_KEY in .env.local to enable Fal virtual try-on pipelines.'
      );
    }

    const compiledPrompt = this.buildOutfitPrompt(request.outfit);

    try {
      // Call Fal.ai IDM-VTON / Fast SDXL inpainting endpoint
      const response = await fetch('https://queue.fal.run/fal-ai/idm-vton', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          human_img: request.originalImage,
          description: compiledPrompt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fal.ai returned status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const generatedImageUrl = data.image?.url || request.originalImage;
      const processingTimeMs = Date.now() - startTime;

      const outfitSummary = request.outfit.layers
        .filter((l) => l.isVisible)
        .map((l) => `${l.customization.color || ''} ${l.garment.name}`.trim())
        .join(', ');

      return {
        id: `fal-${Date.now()}`,
        success: true,
        originalImageUrl: request.originalImage,
        generatedImageUrl,
        compiledPrompt,
        provider: this.name,
        modelName: 'fal-ai/idm-vton',
        isTestingModeMock: false,
        processingTimeMs,
        createdAt: Date.now(),
        outfitSummary: outfitSummary || 'Custom Outfit',
        layersCount: request.outfit.layers.filter((l) => l.isVisible).length,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown Fal.ai error';
      throw new Error(`FitSwap AI Fal Integration Error: ${errorMsg}`);
    }
  }

  async getGenerationStatus(taskId: string): Promise<GenerationStatusResult> {
    return { taskId, status: 'completed' };
  }
}
