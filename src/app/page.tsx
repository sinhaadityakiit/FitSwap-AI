'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import HowItWorksPreview from '@/components/home/HowItWorksPreview';
import ClothingTypeGrid from '@/components/home/ClothingTypeGrid';
import TrustSection from '@/components/home/TrustSection';
import Link from 'next/link';
import { ArrowRightIcon, SparklesIcon } from '@/components/common/Icons';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does FitSwap AI replace clothes while preserving my face and background?',
      a: 'FitSwap AI utilizes targeted AI inpainting and multi-layer virtual try-on pipelines. It calculates the garment boundaries from your uploaded photo, synthesizes the selected clothing texture and drape conforming to your body pose, and preserves your facial identity, hairstyle, lighting direction, and background untouched.'
    },
    {
      q: 'Can I combine multiple clothing pieces into a layered outfit?',
      a: 'Yes! FitSwap AI features a Layered Outfit Builder that allows you to combine undergarments, tops, jeans or skirts, outerwear jackets, footwear, and accessories into a unified prompt before generation, avoiding conflicting edits.'
    },
    {
      q: 'Are my uploaded photographs saved or used for AI model training?',
      a: 'No. FitSwap AI maintains strict privacy safeguards. Uploaded photographs are processed ephemerally in session memory and are never used to train public AI models. Saved creations are stored locally in your browser storage and can be deleted anytime.'
    },
    {
      q: 'What formats and resolutions work best?',
      a: 'We accept JPEG, PNG, and WebP images up to 15MB. For best fitting results, upload well-lit photos with clear visibility of your torso and limbs, facing forward with natural posture.'
    },
    {
      q: 'How does instant try-on work?',
      a: 'FitSwap AI processes your selected garments instantly using our neural styling engine. You can select fabrics, customize colors, and layer multiple garments to preview realistic draping and fit in real time.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Explore by Category */}
      <CategoryCarousel />

      {/* 3. How It Works (4 steps + phone slider) */}
      <HowItWorksPreview />

      {/* 4. Shop by Clothing Type + Outfit Builder Callout */}
      <ClothingTypeGrid />

      {/* 5. Trust & Security Grid */}
      <TrustSection />

      {/* 6. Frequently Asked Questions Section */}
      <section className="py-16 bg-[#0e0b1c] border-t border-[#262142]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Learn how FitSwap AI guarantees privacy, photo-realism, and seamless virtual styling.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#151226] border border-[#262142] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-zinc-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <span className="text-pink-400 font-bold text-lg flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-[#262142]/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick CTA Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-indigo-950/60 border border-pink-500/30 text-center space-y-4 shadow-glow">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to Transform Your Wardrobe?</h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
              Jump into the virtual dressing room, try on our 490+ curated styles, and experiment with your look.
            </p>
            <div className="pt-2">
              <Link
                href="/try-on"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-glow hover:opacity-95 transition-opacity"
              >
                <SparklesIcon size={16} />
                <span>Launch Virtual Try-On</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
