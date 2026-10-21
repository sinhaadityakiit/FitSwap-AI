'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { compressAndResizeImage } from '@/lib/image-utils';
import { UploadIcon, ArrowRightIcon, SparklesIcon, ShieldCheckIcon } from '../common/Icons';

export default function HeroSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const processed = await compressAndResizeImage(file, 1200, 1600, 0.88);
        const photoObj = {
          id: `upload-${Date.now()}`,
          dataUrl: processed.dataUrl,
          fileName: processed.fileName,
          fileSize: processed.fileSize,
          mimeType: processed.mimeType,
          width: processed.width,
          height: processed.height,
          uploadedAt: Date.now(),
        };
        try {
          sessionStorage.setItem('fitswap_uploaded_photo', JSON.stringify(photoObj));
          localStorage.setItem('fitswap_uploaded_photo', JSON.stringify(photoObj));
        } catch (storageErr) {
          console.warn('Storage warning:', storageErr);
        }
        router.push('/try-on');
      } catch (err) {
        console.error('Error processing upload:', err);
        router.push('/try-on');
      }
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#0b0914] via-[#120c24] to-[#0b0914]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold backdrop-blur-md shadow-glow">
              <SparklesIcon size={14} className="text-pink-400" />
              <span>AI POWERED VIRTUAL DRESSING ROOM</span>
            </div>

            {/* Main Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Try On Any Outfit{' '}
              <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                With AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Upload your photo, choose from thousands of clothing styles, and see yourself in your dream outfits — instantly!
            </p>

            {/* Hidden Direct File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold text-sm shadow-glow hover:opacity-95 hover:scale-105 transition-all cursor-pointer"
              >
                <UploadIcon size={18} />
                <span>Upload Photo</span>
              </button>

              <Link
                href="/try-on"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1e1935] hover:bg-[#282245] border border-[#3b3260] text-zinc-200 font-bold text-sm hover:text-white transition-all"
              >
                <span>Start Virtual Try-On</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-xs text-zinc-400 border-t border-[#262142]/60">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Realistic Results</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">👗</span>
                <span>Wide Range of Styles</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon size={14} className="text-emerald-400" />
                <span>100% Private & Secure</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Fashion Visual with Before & After Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Main Model Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#151226] aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="FitSwap AI Virtual Try-On Demonstration Model"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating "Before" Mini Card */}
              <div className="absolute -top-4 -left-4 sm:-left-8 w-28 sm:w-32 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/80 backdrop-blur-md transform -rotate-6 hover:rotate-0 transition-transform">
                <div className="aspect-[3/4] relative">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                    alt="Before demonstration"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 text-[9px] font-bold text-white">
                    Before
                  </span>
                </div>
              </div>

              {/* Floating "After" Mini Card */}
              <div className="absolute top-8 -right-4 sm:-right-8 w-36 sm:w-40 rounded-2xl overflow-hidden border-2 border-pink-400/40 shadow-glow bg-black/80 backdrop-blur-md transform rotate-6 hover:rotate-0 transition-transform">
                <div className="aspect-[3/4] relative">
                  <img
                    src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=400&q=80"
                    alt="After demonstration"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-pink-600 text-[10px] font-bold text-white shadow-sm">
                    After
                  </span>
                </div>
              </div>

              {/* Hand-drawn style note */}
              <div className="absolute -bottom-6 right-2 sm:right-6 bg-pink-950/80 backdrop-blur-md border border-pink-500/30 px-3.5 py-1.5 rounded-xl shadow-lg transform rotate-2">
                <p className="font-display italic text-xs text-pink-300 font-semibold">
                  Same you, New styles! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Address at Bottom-Right Corner of Banner */}
      <div className="absolute bottom-3 right-4 sm:right-6 lg:right-8 z-20 pointer-events-none select-none">
        <span className="text-xs sm:text-[13px] text-zinc-400 font-medium tracking-wide">
          fitswap-ai.vercel.app
        </span>
      </div>
    </section>
  );
}
