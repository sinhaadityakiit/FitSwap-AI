import { NextResponse } from 'next/server';
import { getAllProvidersStatus, getActiveAIProvider } from '@/lib/ai/provider-factory';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const active = getActiveAIProvider();
  const statuses = getAllProvidersStatus();

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    testingMode: process.env.NEXT_PUBLIC_TESTING_MODE === 'true',
    activeProvider: {
      name: active.name,
      isConfigured: active.isConfigured()
    },
    availableProviders: statuses,
    systemCapabilities: {
      maxUploadSizeMb: 15,
      supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
      catalogueCategoriesCount: 24,
      totalGarmentsCount: 490,
      safetySafeguardsEnabled: true
    }
  });
}
