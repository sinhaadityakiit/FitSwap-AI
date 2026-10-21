import { FitSwapAIProvider } from './types';
import { GeminiAIProvider } from './gemini-adapter';
import { FalAIProvider } from './fal-adapter';
import { ReplicateAIProvider } from './replicate-adapter';
import { TestingAIProvider } from './testing-adapter';

export interface ProviderStatus {
  id: string;
  name: string;
  isConfigured: boolean;
  isActive: boolean;
  envVarNeeded: string;
  notes: string;
}

export function getActiveAIProvider(): FitSwapAIProvider {
  const chosen = (process.env.FITSWAP_AI_PROVIDER || 'testing').toLowerCase();

  if (chosen === 'gemini') {
    const gemini = new GeminiAIProvider();
    if (gemini.isConfigured()) return gemini;
  }

  if (chosen === 'fal') {
    const fal = new FalAIProvider();
    if (fal.isConfigured()) return fal;
  }

  if (chosen === 'replicate') {
    const replicate = new ReplicateAIProvider();
    if (replicate.isConfigured()) return replicate;
  }

  // Fallback to testing provider
  return new TestingAIProvider();
}

export function getAllProvidersStatus(): ProviderStatus[] {
  const gemini = new GeminiAIProvider();
  const fal = new FalAIProvider();
  const replicate = new ReplicateAIProvider();
  const testing = new TestingAIProvider();

  const chosen = (process.env.FITSWAP_AI_PROVIDER || 'testing').toLowerCase();

  return [
    {
      id: 'testing',
      name: testing.name,
      isConfigured: true,
      isActive: chosen === 'testing' || (!gemini.isConfigured() && !fal.isConfigured() && !replicate.isConfigured()),
      envVarNeeded: 'NEXT_PUBLIC_TESTING_MODE=true',
      notes: 'Safe local simulation mode for interface testing, UI verification, and rapid prototyping without API costs.'
    },
    {
      id: 'gemini',
      name: gemini.name,
      isConfigured: gemini.isConfigured(),
      isActive: chosen === 'gemini' && gemini.isConfigured(),
      envVarNeeded: 'GEMINI_API_KEY',
      notes: 'Google Gemini 2.5 Flash / Imagen 3 multimodal neural editing. Free-tier available on Google AI Studio.'
    },
    {
      id: 'fal',
      name: fal.name,
      isConfigured: fal.isConfigured(),
      isActive: chosen === 'fal' && fal.isConfigured(),
      envVarNeeded: 'FAL_KEY',
      notes: 'Fast IDM-VTON & CatVTON specialized virtual dressing room models with cloth warping.'
    },
    {
      id: 'replicate',
      name: replicate.name,
      isConfigured: replicate.isConfigured(),
      isActive: chosen === 'replicate' && replicate.isConfigured(),
      envVarNeeded: 'REPLICATE_API_TOKEN',
      notes: 'Cloud inference for SDXL inpainting and IDM-VTON try-on checkpoints.'
    }
  ];
}
