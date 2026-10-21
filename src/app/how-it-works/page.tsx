'use client';

import React from 'react';
import Link from 'next/link';
import { UploadIcon, SparklesIcon, ShieldCheckIcon, ArrowRightIcon, HangerIcon } from '@/components/common/Icons';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Upload Your Photograph',
      desc: 'Upload a clear full-length or torso photograph from your phone or desktop. Our client-side validator instantly verifies format (JPEG, PNG, WebP) and resolution without uploading to unencrypted third parties.',
      tips: ['Use even lighting (avoid harsh backlighting)', 'Stand upright facing the camera', 'Wear form-fitting clothes for best drape calculation']
    },
    {
      step: '02',
      title: 'Assemble Your Layered Wardrobe',
      desc: 'Browse through our 24 specialized clothing categories — from Banarasi sarees and lehengas to cocktail dresses, blazers, lingerie, and footwear. FitSwap AI lets you stack individual items into a coherent ensemble.',
      tips: ['Combine top + bottom + outerwear', 'Pair ethnic blouses with matching sarees', 'Add footwear and accessories for a complete finish']
    },
    {
      step: '03',
      title: 'Fine-Tune Colors, Textures & Custom Prompts',
      desc: 'Adjust specific fashion parameters: select from 26 curated colors, specify fabrics (silk, chiffon, velvet, linen), choose patterns (floral, houndstooth, traditional Indian zari), or describe specific custom flair in free-form natural language.',
      tips: ['Enter custom descriptions for unique prints', 'Select specific draping styles for sarees', 'Tailor necklines and sleeve lengths']
    },
    {
      step: '04',
      title: 'AI Synthesis & Photo-Preserving Inpainting',
      desc: 'Our AI provider adapter compiles your layered outfit specification and invokes neural diffusion models (Google Gemini / Imagen 3 or specialized IDM-VTON engines). The AI replaces garments while strictly locking your face, hair, body pose, and background.',
      tips: ['Facial geometry remains 100% identical', 'Background and lighting angles are preserved', 'Natural fabric shadows and folds are synthesized']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0914] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold">
            <SparklesIcon size={14} className="text-pink-400" />
            <span>Behind The AI Dressing Room</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            How FitSwap AI Works
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Discover how state-of-the-art generative computer vision transforms personal fashion styling with uncompromising privacy and fidelity.
          </p>
        </div>

        {/* 4 Step In-Depth Journey */}
        <div className="space-y-6">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-6 sm:p-8 rounded-3xl bg-[#151226] border border-[#262142] hover:border-pink-500/40 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-3">
                <span className="font-display text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {st.step}
                </span>
                <h3 className="font-bold text-lg text-white mt-1">{st.title}</h3>
              </div>

              <div className="md:col-span-9 space-y-4">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{st.desc}</p>
                <div className="p-3.5 rounded-xl bg-[#1c1733] border border-[#2d2650] space-y-1.5">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block">
                    Styling Pro Tips:
                  </span>
                  <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside">
                    {st.tips.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photography Guidelines Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-pink-950/40 to-[#151226] border border-pink-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon size={22} className="text-pink-400" />
            <h2 className="text-xl font-bold text-white">Guidelines for Best Virtual Try-On Results</h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            While FitSwap AI handles diverse photos gracefully, adhering to these standard guidelines maximizes fabric drape fidelity and seam alignment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <h4 className="text-xs font-bold text-emerald-400">✓ Recommended</h4>
              <p className="text-xs text-zinc-400">Clear lighting, standing straight with hands at sides or relaxed on hips, solid or simple background, full view of desired clothing area.</p>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <h4 className="text-xs font-bold text-red-400">✗ Avoid</h4>
              <p className="text-xs text-zinc-400">Heavy motion blur, extreme low-light shadows, oversized blankets covering the torso, severe lens distortion, or multiple overlapping people in frame.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/try-on"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all"
          >
            <HangerIcon size={18} />
            <span>Launch Virtual Dressing Room</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
