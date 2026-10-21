import { FitSwapAIProvider, ImageValidationResult, GenerationStatusResult } from './types';
import { VirtualTryOnRequest, VirtualTryOnResult } from '../../types/try-on';
import { OutfitSpecification } from '../../types/outfit';
import { buildOutfitPrompt } from './prompt-builder';

export class ReplicateAIProvider implements FitSwapAIProvider {
  name = 'Replicate Virtual Try-On API';
  private apiToken: string | undefined;

  constructor(apiToken?: string) {
    this.apiToken = apiToken || process.env.REPLICATE_API_TOKEN;
  }

  isConfigured(): boolean {
    return Boolean(this.apiToken && this.apiToken.trim().length > 10 && !this.apiToken.includes('your_'));
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
        'Replicate API token is not configured. Please set REPLICATE_API_TOKEN in .env.local to enable Replicate try-on models.'
      );
    }

    const compiledPrompt = this.buildOutfitPrompt(request.outfit);

    try {
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: 'c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d05e1330f', // IDM-VTON
          input: {
            human_img: request.originalImage,
            description: compiledPrompt,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Replicate API returned status ${response.status}: ${errorText}`);
      }

      const prediction = await response.json();
      const generatedImageUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output || request.originalImage;
      const processingTimeMs = Date.now() - startTime;

      const outfitSummary = request.outfit.layers
        .filter((l) => l.isVisible)
        .map((l) => `${l.customization.color || ''} ${l.garment.name}`.trim())
        .join(', ');

      return {
        id: `replicate-${Date.now()}`,
        success: true,
        originalImageUrl: request.originalImage,
        generatedImageUrl,
        compiledPrompt,
        provider: this.name,
        modelName: 'yisol/idm-vton',
        isTestingModeMock: false,
        processingTimeMs,
        createdAt: Date.now(),
        outfitSummary: outfitSummary || 'Custom Outfit',
        layersCount: request.outfit.layers.filter((l) => l.isVisible).length,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown Replicate error';
      throw new Error(`FitSwap AI Replicate Integration Error: ${errorMsg}`);
    }
  }

  async getGenerationStatus(taskId: string): Promise<GenerationStatusResult> {
    return { taskId, status: 'completed' };
  }
}
