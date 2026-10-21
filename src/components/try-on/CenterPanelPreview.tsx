'use client';

import React, { useState, useRef } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import ImageUploader from './ImageUploader';
import { UserUploadedImage, VirtualTryOnResult } from '@/types/try-on';
import { compressAndResizeImage } from '@/lib/image-utils';
import { DEMO_MODELS } from '@/data/demo-models';
import { DownloadIcon, RefreshCwIcon, UndoIcon, SparklesIcon, ShieldCheckIcon, TrashIcon, UploadIcon } from '../common/Icons';

interface CenterPanelPreviewProps {
  uploadedImage: UserUploadedImage | null;
  latestResult: VirtualTryOnResult | null;
  isGenerating: boolean;
  onImageSelected: (image: UserUploadedImage) => void;
  onImageRemoved: () => void;
  onResetOriginal: () => void;
  onUndoLastSelection: () => void;
  canUndo: boolean;
}

export default function CenterPanelPreview({
  uploadedImage,
  latestResult,
  isGenerating,
  onImageSelected,
  onImageRemoved,
  onResetOriginal,
  onUndoLastSelection,
  canUndo,
}: CenterPanelPreviewProps) {
  const [viewMode, setViewMode] = useState<'compare' | 'result' | 'original'>('compare');
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const hasPhoto = Boolean(uploadedImage && typeof uploadedImage.dataUrl === 'string' && uploadedImage.dataUrl.length > 20);

  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const processed = await compressAndResizeImage(file, 1200, 1600, 0.88);
        onImageSelected({
          id: `img-${Date.now()}`,
          dataUrl: processed.dataUrl,
          fileName: processed.fileName,
          fileSize: processed.fileSize,
          mimeType: processed.mimeType,
          width: processed.width,
          height: processed.height,
          uploadedAt: Date.now(),
        });
      } catch (err) {
        console.error('Error replacing file:', err);
      }
    }
  };

  // Download handler
  const handleDownload = () => {
    if (!latestResult && !hasPhoto) return;
    const url = latestResult ? latestResult.generatedImageUrl : uploadedImage!.dataUrl;
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitswap-outfit-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#0e0b1c] p-4 sm:p-6 overflow-y-auto">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>Virtual Dressing Mirror</span>
          </h2>
        </div>

        {hasPhoto && (
          <div className="flex items-center gap-2">
            {/* View Mode Toggles */}
            {latestResult && (
              <div className="bg-[#1b1730] p-1 rounded-xl border border-[#2d2750] flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('compare')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    viewMode === 'compare' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Compare Slider
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('result')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    viewMode === 'result' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Edited Look
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('original')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    viewMode === 'original' ? 'bg-pink-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Original
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onUndoLastSelection}
              disabled={!canUndo}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
                canUndo
                  ? 'border-[#332b57] bg-[#1a162b] text-zinc-300 hover:text-white hover:bg-[#251f3d]'
                  : 'border-[#221c38] text-zinc-600 cursor-not-allowed'
              }`}
              title="Undo last garment change"
            >
              <UndoIcon size={14} />
              <span className="hidden sm:inline">Undo</span>
            </button>

            <button
              type="button"
              onClick={onResetOriginal}
              className="p-2 rounded-xl border border-[#332b57] bg-[#1a162b] text-zinc-300 hover:text-white hover:bg-[#251f3d] text-xs flex items-center gap-1 transition-colors"
              title="Reset to original uploaded photo"
            >
              <RefreshCwIcon size={14} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Viewport Area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center max-w-xl mx-auto w-full">
        {!hasPhoto ? (
          <div className="w-full">
            <ImageUploader
              currentImage={uploadedImage}
              onImageSelected={onImageSelected}
              onImageRemoved={onImageRemoved}
            />
          </div>
        ) : isGenerating ? (
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-pink-500/50 bg-[#151226] flex flex-col items-center justify-center p-6 text-center shadow-glow">
            {/* Pulsing Avatar Preview */}
            <img
              src={uploadedImage!.dataUrl}
              alt="Processing outfit"
              className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-sm"
            />
            <div className="relative z-10 flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-glow mb-4 animate-bounce">
                <SparklesIcon size={32} />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Tailoring Your Virtual Outfit...</h3>
              <p className="text-xs text-zinc-300 mb-4">
                Analyzing photo geometry, wrapping garment textures, and preserving natural lighting & pose.
              </p>
              <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500 animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        ) : latestResult ? (
          <div className="w-full space-y-3">
            {viewMode === 'compare' ? (
              <div className="space-y-2">
                <BeforeAfterSlider
                  beforeImage={latestResult.originalImageUrl}
                  afterImage={latestResult.generatedImageUrl}
                  beforeLabel="Original Photo"
                  afterLabel="AI Fitted Look"
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
            ) : viewMode === 'result' ? (
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#262142] shadow-2xl bg-black">
                <img
                  src={latestResult.generatedImageUrl}
                  alt="FitSwap Result"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#262142] shadow-2xl bg-black">
                <img
                  src={latestResult.originalImageUrl}
                  alt="Original Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Result Details & Download Footer */}
            <div className="p-3.5 rounded-2xl bg-[#151226] border border-[#262142] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-white truncate">{latestResult.outfitSummary}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-medium">
                    AI Styled
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {latestResult.layersCount} layers styled • {latestResult.processingTimeMs}ms
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs shadow-glow hover:opacity-95 transition-opacity flex-shrink-0"
              >
                <DownloadIcon size={14} />
                <span>Download Look</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {/* Hidden replace input */}
            <input
              ref={replaceInputRef}
              type="file"
              accept="image/*,image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleReplaceFile}
              className="hidden"
            />

            <div className="relative aspect-[3/4] min-h-[380px] max-h-[600px] w-full rounded-2xl overflow-hidden border-2 border-pink-500/40 shadow-2xl bg-[#151226] group">
              <img
                src={uploadedImage!.dataUrl}
                alt="Selected model"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Top Floating Control Pill */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheckIcon size={12} />
                  <span>Photo Ready</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onImageSelected({
                        id: 'demo-default',
                        dataUrl: DEMO_MODELS[0].imageUrl,
                        fileName: 'default-base-model.jpg',
                        fileSize: 1024 * 500,
                        mimeType: 'image/jpeg',
                        width: 800,
                        height: 1066,
                        uploadedAt: Date.now(),
                      });
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 text-xs font-semibold backdrop-blur-md border border-purple-500/40 transition-all flex items-center gap-1 shadow-lg"
                    title="Switch to default model with base clothes"
                  >
                    <span>Default Model</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (replaceInputRef.current) {
                        replaceInputRef.current.value = '';
                        replaceInputRef.current.click();
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 shadow-lg"
                    title="Upload different photo"
                  >
                    <RefreshCwIcon size={12} />
                    <span>Change Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={onImageRemoved}
                    className="p-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 text-xs backdrop-blur-md border border-red-500/30 transition-all"
                    title="Remove Photo"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-pink-500/30 text-white text-xs text-center shadow-xl space-y-1">
                <div className="flex items-center justify-center gap-2 font-bold text-pink-300 text-xs">
                  <span>👤 Face Scanned & Identity Preserved</span>
                  <span>•</span>
                  <span>✨ Full-Body Try-On Ready</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Select any garment from the left catalogue to virtually try it on your full-body avatar!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
