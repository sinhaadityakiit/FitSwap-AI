'use client';

import React from 'react';
import { ShieldCheckIcon, LockIcon, SparklesIcon } from '@/components/common/Icons';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0b0914] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheckIcon size={14} className="text-emerald-400" />
            <span>FitSwap Privacy & Safety Charter</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            Privacy Policy & Image Safety
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Your trust is our paramount commitment. Read our unambiguous policies regarding photo handling, data retention, biometric preservation, and ethical AI usage.
          </p>
        </div>

        {/* 6 Core Privacy Pillars */}
        <div className="space-y-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-[#151226] border border-[#262142] space-y-2">
            <div className="flex items-center gap-2.5 text-pink-400 font-bold text-base">
              <LockIcon size={18} />
              <h3>1. Ephemeral Photo Processing</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Photographs you upload to FitSwap AI are processed ephemerally in volatile memory solely to compute virtual try-on garment inpainting. We do not store your original photos or face embeddings in permanent databases without your active, explicit consent.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-[#151226] border border-[#262142] space-y-2">
            <div className="flex items-center gap-2.5 text-purple-400 font-bold text-base">
              <SparklesIcon size={18} />
              <h3>2. Zero Training on User Images</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              We strictly enforce contracts and API configurations ensuring your personal images are never harvested or utilized to train or fine-tune public foundation models or computer vision networks. Your style choices remain entirely yours.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-[#151226] border border-[#262142] space-y-2">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
              <ShieldCheckIcon size={18} />
              <h3>3. Anti-Exploitation & Intimacy Safeguards</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              FitSwap AI enforces strict guardrails prohibiting non-consensual sexualized imagery, synthetic nudity, or any edits involving minors. Our pipelines never generate undressed intermediate frames; clothing is swapped directly between source and target garments.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-[#151226] border border-[#262142] space-y-2">
            <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-base">
              <LockIcon size={18} />
              <h3>4. Client-Side Browser Storage for Creations</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              The &ldquo;My Creations&rdquo; gallery persists try-on images directly inside your browser&rsquo;s local storage (LocalStorage / IndexedDB). They never touch public cloud buckets. You can clear this cache with one click at any time.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="p-6 rounded-2xl bg-[#151226] border border-[#262142] space-y-2">
            <div className="flex items-center gap-2.5 text-pink-400 font-bold text-base">
              <ShieldCheckIcon size={18} />
              <h3>5. API Security & Server Protection</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              All AI provider credentials (Google Gemini, Fal.ai, Replicate) reside securely on server-side environment variables and are never transmitted to client JavaScript bundles. Upload limits (15MB maximum) and rate limiters protect against Denial-of-Service attacks.
            </p>
          </div>

          {/* Pillar 6 */}
          <div id="contact" className="p-6 rounded-2xl bg-[#151226] border border-[#262142] space-y-2">
            <div className="flex items-center gap-2.5 text-zinc-200 font-bold text-base">
              <SparklesIcon size={18} />
              <h3>6. Data Rights & Contact Information</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              If you have any questions regarding data handling or wish to report anomalous AI generation behavior, please reach out to our privacy engineering team at <a href="mailto:privacy@fitswapai.example.com" className="text-pink-400 underline">privacy@fitswapai.example.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
