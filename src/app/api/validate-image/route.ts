import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, fileName, fileSize } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ isValid: false, error: 'No image data received.' }, { status: 400 });
    }

    const matches = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json(
        { isValid: false, error: 'Invalid data URL format. Please upload JPEG, PNG, or WebP.' },
        { status: 400 }
      );
    }

    const mimeType = matches[1].toLowerCase();
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(mimeType)) {
      return NextResponse.json(
        { isValid: false, error: `Disallowed image type (${mimeType}). Only JPEG, PNG, and WebP are supported.` },
        { status: 400 }
      );
    }

    const byteLength = (matches[2].length * 3) / 4;
    const mb = byteLength / (1024 * 1024);
    if (mb > 15) {
      return NextResponse.json(
        { isValid: false, error: `Image size (${mb.toFixed(1)}MB) exceeds 15MB limit.` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      isValid: true,
      mimeType,
      sizeBytes: byteLength,
      sizeMb: parseFloat(mb.toFixed(2)),
      fileName: fileName || 'uploaded-photo'
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Validation failed';
    return NextResponse.json({ isValid: false, error: message }, { status: 500 });
  }
}
