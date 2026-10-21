import { NextRequest, NextResponse } from 'next/server';
import { getActiveAIProvider } from '@/lib/ai/provider-factory';
import { VirtualTryOnRequest } from '@/types/try-on';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VirtualTryOnRequest;

    if (!body || !body.originalImage) {
      return NextResponse.json(
        { success: false, error: 'A photo must be provided before generating a virtual try-on.' },
        { status: 400 }
      );
    }

    if (!body.outfit || !Array.isArray(body.outfit.layers) || body.outfit.layers.length === 0) {
      if (!body.outfit?.customPromptDescription || body.outfit.customPromptDescription.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: 'Please select at least one garment or describe an outfit to try on.' },
          { status: 400 }
        );
      }
    }

    const provider = getActiveAIProvider();
    const result = await provider.editImage(body);

    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal virtual try-on error';
    console.error('API /api/try-on failure:', errorMsg);
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        provider: process.env.FITSWAP_AI_PROVIDER || 'testing'
      },
      { status: 500 }
    );
  }
}
