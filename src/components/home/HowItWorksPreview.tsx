'use client';

import React from 'react';
import BeforeAfterSlider from '../try-on/BeforeAfterSlider';
import { UploadIcon, SparklesIcon, DownloadIcon, HangerIcon } from '../common/Icons';

export default function HowItWorksPreview() {
  const steps = [
    {
      num: 1,
      title: 'Upload Your Photo',
      desc: 'Add a clear photo of yourself from your device.',
      icon: <UploadIcon size={18} />,
    },
    {
      num: 2,
      title: 'Choose Your Outfit',
      desc: 'Browse and select from thousands of clothing options.',
      icon: <HangerIcon size={18} />,
    },
    {
      num: 3,
      title: 'Customize & Generate',
      desc: 'Adjust colours, fabric, style and more. Let AI work its magic!',
      icon: <SparklesIcon size={18} />,
    },
    {
      num: 4,
      title: 'Download & Share',
      desc: 'Save your new look or try another style.',
      icon: <DownloadIcon size={18} />,
    },
  ];

  return (
    <section className="py-16 bg-[#0b0914] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">How It Works</h2>
          <p className="text-sm text-zinc-400 mt-1">Get your new look in just a few simple steps.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 4 Steps Row / Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-2xl bg-[#151226] border border-[#262142] hover:border-pink-500/40 transition-all space-y-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-glow">
                    {st.num}
                  </div>
                  <div className="p-2 rounded-xl bg-[#1e1935] text-pink-400 border border-[#2d2650]">
                    {st.icon}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-pink-300 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Smartphone Before/After Mockup */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[270px] rounded-[36px] p-3 bg-gradient-to-b from-[#2a2245] to-[#120f21] border-4 border-[#3a305e] shadow-glow-lg">
              {/* Phone speaker & camera notch */}
              <div className="w-24 h-4 bg-[#120f21] rounded-full mx-auto mb-2 border border-white/10" />

              <div className="rounded-[24px] overflow-hidden">
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
                  afterImage="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=600&q=80"
                  beforeLabel="Before"
                  afterLabel="After"
                  aspectRatio="aspect-[9/16]"
                />
              </div>

              {/* Decorative label */}
              <div className="text-center pt-3">
                <span className="font-display italic text-xs text-pink-300">Your style in seconds ~ ♡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
