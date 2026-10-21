import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BRAIN_DIR = 'C:/Users/KIIT/.gemini/antigravity/brain/08917eac-4fd8-4b18-a9d6-6e3d8d4d8682';
const USER_UPLOADED_IMG = path.join(BRAIN_DIR, '.user_uploaded', 'media_1792519621109_1e480202.png');
const PUBLIC_GARMENTS_DIR = path.join(process.cwd(), 'public', 'images', 'garments');

// Map of canonical product images generated or provided
const CANONICAL_FILES: Record<string, string> = {
  // User's exact uploaded red lace G-string product shot
  'g-string': USER_UPLOADED_IMG,
  'g-strings': USER_UPLOADED_IMG,
  'v-string': USER_UPLOADED_IMG,
  'v-strings': USER_UPLOADED_IMG,
  'thong': USER_UPLOADED_IMG,
  'thongs': USER_UPLOADED_IMG,

  // Photorealistic generated e-commerce panties on white studio background
  'classic-briefs': path.join(BRAIN_DIR, 'classic_briefs_1792520098977.jpg'),
  'full-briefs': path.join(BRAIN_DIR, 'classic_briefs_1792520098977.jpg'),
  'cotton-panties': path.join(BRAIN_DIR, 'classic_briefs_1792520098977.jpg'),
  'seamless-panties': path.join(BRAIN_DIR, 'classic_briefs_1792520098977.jpg'),

  'bikini-briefs': path.join(BRAIN_DIR, 'bikini_briefs_1792520131377.jpg'),
  'lace-panties': path.join(BRAIN_DIR, 'bikini_briefs_1792520131377.jpg'),
  'cheeky-panties': path.join(BRAIN_DIR, 'bikini_briefs_1792520131377.jpg'),
  'brazilian-cut-panties': path.join(BRAIN_DIR, 'bikini_briefs_1792520131377.jpg'),
  'microfiber-panties': path.join(BRAIN_DIR, 'bikini_briefs_1792520131377.jpg'),
  'satin-panties': path.join(BRAIN_DIR, 'bikini_briefs_1792520131377.jpg'),

  'boyshorts': path.join(BRAIN_DIR, 'boyshorts_1792520199609.jpg'),
  'hipster-panties': path.join(BRAIN_DIR, 'boyshorts_1792520199609.jpg'),
  'low-rise-panties': path.join(BRAIN_DIR, 'boyshorts_1792520199609.jpg'),
  'period-underwear': path.join(BRAIN_DIR, 'boyshorts_1792520199609.jpg'),

  'high-waisted-panties': path.join(BRAIN_DIR, 'high_waisted_panties_1792520307576.jpg'),
  'shaping-panties': path.join(BRAIN_DIR, 'high_waisted_panties_1792520307576.jpg'),
  'control-briefs': path.join(BRAIN_DIR, 'high_waisted_panties_1792520307576.jpg'),
  'maternity-panties': path.join(BRAIN_DIR, 'high_waisted_panties_1792520307576.jpg'),
  'postpartum-underwear': path.join(BRAIN_DIR, 'high_waisted_panties_1792520307576.jpg'),
  'high-cut-briefs': path.join(BRAIN_DIR, 'high_waisted_panties_1792520307576.jpg'),

  // Photorealistic generated e-commerce bras on white studio background
  't-shirt-bra': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  't-shirt-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'full-coverage-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'wireless-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'demi-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'lightly-lined-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'front-closure-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'minimizer-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'seamless-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'maternity-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),
  'nursing-bras': path.join(BRAIN_DIR, 't_shirt_bra_1792520123870.jpg'),

  'push-up-bra': path.join(BRAIN_DIR, 'push_up_bra_1792520161145.jpg'),
  'push-up-bras': path.join(BRAIN_DIR, 'push_up_bra_1792520161145.jpg'),
  'plunge-bras': path.join(BRAIN_DIR, 'push_up_bra_1792520161145.jpg'),
  'balconette-bras': path.join(BRAIN_DIR, 'push_up_bra_1792520161145.jpg'),
  'underwire-bras': path.join(BRAIN_DIR, 'push_up_bra_1792520161145.jpg'),
  'padded-bras': path.join(BRAIN_DIR, 'push_up_bra_1792520161145.jpg'),

  'sports-bra': path.join(BRAIN_DIR, 'sports_bra_1792520212360.jpg'),
  'sports-bras': path.join(BRAIN_DIR, 'sports_bra_1792520212360.jpg'),
  'racerback-bras': path.join(BRAIN_DIR, 'sports_bra_1792520212360.jpg'),

  'bralette': path.join(BRAIN_DIR, 'bralette_1792520221770.jpg'),
  'bralettes': path.join(BRAIN_DIR, 'bralette_1792520221770.jpg'),
  'triangle-bras': path.join(BRAIN_DIR, 'bralette_1792520221770.jpg'),
  'non-padded-bras': path.join(BRAIN_DIR, 'bralette_1792520221770.jpg'),
  'longline-bras': path.join(BRAIN_DIR, 'bralette_1792520221770.jpg'),

  'strapless-bra': path.join(BRAIN_DIR, 'strapless_bra_1792520240504.jpg'),
  'strapless-bras': path.join(BRAIN_DIR, 'strapless_bra_1792520240504.jpg'),
  'bandeau-bras': path.join(BRAIN_DIR, 'strapless_bra_1792520240504.jpg'),
  'convertible-bras': path.join(BRAIN_DIR, 'strapless_bra_1792520240504.jpg'),
  'adhesive-bras': path.join(BRAIN_DIR, 'strapless_bra_1792520240504.jpg'),
  'multiway-bras': path.join(BRAIN_DIR, 'strapless_bra_1792520240504.jpg'),

  // Saree blouses
  'saree-blouse': path.join(BRAIN_DIR, 'saree_blouse_1792520314404.jpg'),
  'saree-blouses': path.join(BRAIN_DIR, 'saree_blouse_1792520314404.jpg'),
  'short-sleeve-blouses': path.join(BRAIN_DIR, 'saree_blouse_1792520314404.jpg'),
  'embroidered-blouses': path.join(BRAIN_DIR, 'saree_blouse_1792520314404.jpg'),
  'brocade-blouses': path.join(BRAIN_DIR, 'saree_blouse_1792520314404.jpg'),
  'velvet-blouses': path.join(BRAIN_DIR, 'saree_blouse_1792520314404.jpg'),

  // Tops & Crop tops
  'crop-top': path.join(BRAIN_DIR, 'crop_top_framed_1792520348465.jpg'),
  'crop-tops': path.join(BRAIN_DIR, 'crop_top_framed_1792520348465.jpg'),
  'basic-t-shirts': path.join(BRAIN_DIR, 'crop_top_framed_1792520348465.jpg'),
  'fitted-t-shirts': path.join(BRAIN_DIR, 'crop_top_framed_1792520348465.jpg'),
  'ribbed-tops': path.join(BRAIN_DIR, 'crop_top_framed_1792520348465.jpg'),

  // Jeans
  'wide-leg-jeans': path.join(BRAIN_DIR, 'wide_leg_jeans_1792520392896.jpg'),
  'straight-leg-jeans': path.join(BRAIN_DIR, 'wide_leg_jeans_1792520392896.jpg'),
  'high-waisted-jeans': path.join(BRAIN_DIR, 'wide_leg_jeans_1792520392896.jpg'),
  'mom-jeans': path.join(BRAIN_DIR, 'wide_leg_jeans_1792520392896.jpg'),
  'baggy-jeans': path.join(BRAIN_DIR, 'wide_leg_jeans_1792520392896.jpg'),
  'boyfriend-jeans': path.join(BRAIN_DIR, 'wide_leg_jeans_1792520392896.jpg'),
};

// Auto-sync into public directory
try {
  if (!fs.existsSync(PUBLIC_GARMENTS_DIR)) {
    fs.mkdirSync(PUBLIC_GARMENTS_DIR, { recursive: true });
  }

  for (const [slug, srcPath] of Object.entries(CANONICAL_FILES)) {
    if (fs.existsSync(srcPath)) {
      const ext = path.extname(srcPath);
      const dest = path.join(PUBLIC_GARMENTS_DIR, `${slug}${ext}`);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(srcPath, dest);
      }
    }
  }
} catch (err) {
  console.error('Failed to sync canonical garment images:', err);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get('name') || '').toLowerCase().trim();
  const safeSlug = name.replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-');

  // 1. Direct canonical lookup
  const targetPath = CANONICAL_FILES[safeSlug] || CANONICAL_FILES[name];
  if (targetPath && fs.existsSync(targetPath)) {
    const buffer = fs.readFileSync(targetPath);
    const mime = targetPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  // 2. Partial match across canonical map
  for (const [key, filePath] of Object.entries(CANONICAL_FILES)) {
    if (safeSlug.includes(key) || key.includes(safeSlug)) {
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const mime = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': mime,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }
  }

  // 3. Fallback to user G-string if intimacy request
  if (name.includes('pant') || name.includes('under') || name.includes('brief') || name.includes('string')) {
    if (fs.existsSync(USER_UPLOADED_IMG)) {
      const buffer = fs.readFileSync(USER_UPLOADED_IMG);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  // 4. Fallback to bra if bra request
  if (name.includes('bra')) {
    const tShirtBra = CANONICAL_FILES['t-shirt-bra'];
    if (fs.existsSync(tShirtBra)) {
      const buffer = fs.readFileSync(tShirtBra);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  }

  return NextResponse.json({ error: 'Image not found' }, { status: 404 });
}
