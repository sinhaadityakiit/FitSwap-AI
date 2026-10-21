'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { GarmentItem } from '@/types/catalogue';
import { getGarmentImageUrl, getCategoryFallback, getGarmentImageRecord } from '@/data/garment-images';
import { VirtualTryOnResult } from '@/types/try-on';
import { validateImageFile } from '@/lib/validation/image-validator';
import { compressAndResizeImage } from '@/lib/image-utils';
import { DEMO_MODELS } from '@/data/demo-models';
import { saveCreation } from '@/lib/storage/creations-store';
import { synthesizeVirtualTryOn } from '@/lib/ai/virtual-tryon-engine';
import BeforeAfterSlider from '../try-on/BeforeAfterSlider';
import {
  UploadIcon,
  SparklesIcon,
  DownloadIcon,
  XIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
} from './Icons';

interface QuickTryOnModalProps {
  garment: GarmentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickTryOnModal({ garment, isOpen, onClose }: QuickTryOnModalProps) {
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<VirtualTryOnResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens with a new garment
  useEffect(() => {
    if (isOpen) {
      setPhotoDataUrl(null);
      setPhotoFileName('');
      setIsGenerating(false);
      setResult(null);
      setError(null);
    }
  }, [isOpen, garment?.id]);

  if (!isOpen || !garment) return null;

  // Process user file and trigger instant generation
  const handleFileSelect = async (file: File) => {
    setError(null);
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid image file.');
      return;
    }

    try {
      const processed = await compressAndResizeImage(file, 1200, 1600, 0.88);
      setPhotoDataUrl(processed.dataUrl);
      setPhotoFileName(processed.fileName);

      // Persist to session & localStorage so Full Dressing Room carries the user's photo seamlessly
      const photoObj = {
        id: `user-upload-${Date.now()}`,
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
      } catch (e) {
        console.warn('Storage quota notice:', e);
      }

      triggerInstantTryOn(processed.dataUrl, processed.fileName);
    } catch (err: any) {
      setError(err?.message || 'Could not read image file.');
    }
  };

  // Select demo model and trigger instant generation
  const handleSelectDemoModel = (demoUrl: string, demoName: string) => {
    setError(null);
    setPhotoDataUrl(demoUrl);
    setPhotoFileName(demoName);

    const photoObj = {
      id: `demo-${Date.now()}`,
      dataUrl: demoUrl,
      fileName: `${demoName}.jpg`,
      fileSize: 1024 * 500,
      mimeType: 'image/jpeg',
      width: 800,
      height: 1066,
      uploadedAt: Date.now(),
    };
    try {
      sessionStorage.setItem('fitswap_uploaded_photo', JSON.stringify(photoObj));
      localStorage.setItem('fitswap_uploaded_photo', JSON.stringify(photoObj));
    } catch (e) {}

    triggerInstantTryOn(demoUrl, demoName);
  };

  // Trigger the AI Virtual Try-On
  const triggerInstantTryOn = async (imageUrl: string, fileName: string) => {
    setIsGenerating(true);
    setError(null);

    const outfitSpec = {
      layers: [
        {
          layerId: `layer-${Date.now()}`,
          garment,
          layerType: garment.layerType,
          customization: { ...garment.defaultOptions },
          isVisible: true,
          addedAt: Date.now(),
        },
      ],
      customPromptDescription: `Photo-realistic virtual try-on of ${garment.name} (${garment.categoryName}).`,
      globalOccasion: 'Casual / Everyday',
    };

    try {
      // 1. Synthesize photorealistic virtual try-on fitting the garment directly onto the user's photo/body
      const fittedLookUrl = await synthesizeVirtualTryOn(imageUrl, outfitSpec);

      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalImage: imageUrl,
          outfit: outfitSpec,
          synthesizedImage: fittedLookUrl,
          preserveFace: true,
          preserveBackground: true,
          preservePose: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate virtual try-on.');
      }

      const resData = data as VirtualTryOnResult;
      // Guarantee the final output is the user actually wearing the selected garment
      resData.generatedImageUrl = fittedLookUrl;
      setResult(resData);

      // Save to session history
      saveCreation({
        id: resData.id,
        originalImageUrl: resData.originalImageUrl,
        generatedImageUrl: resData.generatedImageUrl,
        outfit: outfitSpec,
        compiledPrompt: resData.compiledPrompt,
        outfitSummary: `${garment.name} (${garment.categoryName})`,
        createdAt: resData.createdAt,
        provider: resData.provider,
        isTestingModeMock: resData.isTestingModeMock,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Generation failed.';
      setError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download handler
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.generatedImageUrl;
    a.download = `fitswap-${garment.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#151226] border border-[#2d2650] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#262142] flex items-center justify-between bg-[#19152e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0d0a18] border border-white/10 flex-shrink-0 flex items-center justify-center">
              <img
                src={getGarmentImageUrl(garment)}
                alt={garment.name}
                className={`w-full h-full ${
                  getGarmentImageRecord(garment.name, garment.categoryId).displayFit === 'contain'
                    ? 'object-contain p-1'
                    : 'object-cover'
                }`}
                onError={(e) => {
                  e.currentTarget.src = getCategoryFallback(garment.categoryId);
                }}
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                Instant Virtual Try-On
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                {garment.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="font-bold text-white ml-2">✕</button>
            </div>
          )}

          {/* STATE 1: GENERATING SPINNER */}
          {isGenerating ? (
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-glow animate-bounce">
                <SparklesIcon size={36} />
              </div>
              <h4 className="text-lg font-bold text-white">Synthesizing Your New Look...</h4>
              <p className="text-xs text-zinc-300 max-w-sm">
                Fitting <span className="text-pink-400 font-semibold">{garment.name}</span> onto your photo while locking your face, pose, and background.
              </p>
              <div className="w-56 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500 animate-pulse w-3/4" />
              </div>
            </div>
          ) : result ? (
            /* STATE 2: NEW PHOTO CREATED WITH BEFORE/AFTER SLIDER */
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-emerald-400 inline-flex items-center gap-1 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  <ShieldCheckIcon size={13} />
                  <span>New Outfit Photo Created Successfully!</span>
                </span>
                <p className="text-xs text-zinc-400 mt-1">Drag the slider divider left or right to compare with your original photo.</p>
              </div>

              {/* Before/After Interactive Comparison Slider */}
              <div className="max-w-md mx-auto space-y-2">
                <BeforeAfterSlider
                  beforeImage={result.originalImageUrl}
                  afterImage={result.generatedImageUrl}
                  beforeLabel="Original Photo"
                  afterLabel={`FitSwap: ${garment.name}`}
                  aspectRatio="aspect-[3/4]"
                />
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <span className="text-[11px] font-semibold text-pink-300 bg-pink-950/60 px-2.5 py-0.5 rounded-full border border-pink-500/30 flex items-center gap-1">
                    👗 Garment Worn by Real Model
                  </span>
                  <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                    ✨ Authentic Studio Photography
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#262142]">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setPhotoDataUrl(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#262142] hover:bg-[#342c5c] text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCwIcon size={14} />
                  <span>Try Another Photo</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold text-xs shadow-glow hover:opacity-95 flex items-center gap-1.5 transition-all"
                  >
                    <DownloadIcon size={14} />
                    <span>Download New Photo</span>
                  </button>

                  <Link
                    href={`/try-on?garment=${garment.id}&category=${garment.categoryId}`}
                    className="px-4 py-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Full Dressing Room</span>
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* STATE 3: UPLOAD PHOTO OR SELECT DEMO */
            <div className="space-y-5">
              {/* Selected Garment Callout */}
              <div className="p-3.5 rounded-2xl bg-[#1c1733] border border-[#2e2650] flex items-center gap-3">
                <img
                  src={getGarmentImageUrl(garment)}
                  alt={garment.name}
                  className="w-14 h-16 rounded-xl object-cover border border-white/10"
                  onError={(e) => {
                    e.currentTarget.src = getCategoryFallback(garment.categoryId);
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-white truncate">{garment.name}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-1">{garment.description}</p>
                  <span className="text-[10px] text-pink-400 font-semibold mt-1 inline-block">
                    Default Color: {garment.defaultOptions.color || 'Fashion Style'} • {garment.defaultOptions.fabric || 'Premium Fabric'}
                  </span>
                </div>
              </div>

              {/* Big Upload Dropzone */}
              <div
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    fileInputRef.current.click();
                  }
                }}
                className="border-2 border-dashed border-pink-500/50 hover:border-pink-500 rounded-3xl p-6 sm:p-8 text-center bg-pink-950/20 hover:bg-pink-950/30 transition-all cursor-pointer shadow-glow"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-glow">
                  <UploadIcon size={26} />
                </div>

                <h4 className="font-bold text-white text-base mb-1">
                  Select Your Photo To Try On Immediately
                </h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto mb-4">
                  Upload your photo from your device. As soon as you select your photo, FitSwap AI will immediately create your new photo wearing this {garment.name}!
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-glow hover:opacity-95"
                >
                  Browse Photo from Device
                </button>
              </div>

              {/* Quick 1-Click Demo Models */}
              <div className="p-4 rounded-2xl bg-[#120f21] border border-[#262142]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <SparklesIcon size={12} className="text-pink-400" />
                    <span>Or Click a Demo Model for 1-Click Instant Try-On</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {DEMO_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleSelectDemoModel(model.imageUrl, model.name)}
                      className="group rounded-xl overflow-hidden border border-[#2d2650] hover:border-pink-500 transition-all text-left bg-black/40 hover:-translate-y-1 shadow-sm"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={model.imageUrl}
                          alt={model.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[10px] font-bold text-pink-300">Try with {model.name.split(':')[1]?.trim() || model.name}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
