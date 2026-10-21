'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSavedCreations, deleteCreation, clearAllCreations } from '@/lib/storage/creations-store';
import { SavedCreation } from '@/types/try-on';
import BeforeAfterSlider from '@/components/try-on/BeforeAfterSlider';
import { DownloadIcon, TrashIcon, SparklesIcon, ArrowRightIcon, ShieldCheckIcon, EyeIcon } from '@/components/common/Icons';

export default function MyCreationsPage() {
  const [creations, setCreations] = useState<SavedCreation[]>([]);
  const [activeCompareCreation, setActiveCompareCreation] = useState<SavedCreation | null>(null);

  useEffect(() => {
    setCreations(getSavedCreations());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this creation from your session history?')) {
      const updated = deleteCreation(id);
      setCreations(updated);
      if (activeCompareCreation?.id === id) {
        setActiveCompareCreation(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all virtual try-on creations from your browser storage?')) {
      clearAllCreations();
      setCreations([]);
      setActiveCompareCreation(null);
    }
  };

  const handleDownload = (creation: SavedCreation) => {
    const a = document.createElement('a');
    a.href = creation.generatedImageUrl;
    a.download = `fitswap-look-${creation.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#0b0914] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262142]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
              <SparklesIcon size={14} className="text-pink-400" />
              <span>Session Wardrobe Gallery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              My Styled Creations ({creations.length})
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Outfits generated during your current styling session. Saved securely in your browser cache.
            </p>
          </div>

          {creations.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 text-red-200 text-xs font-semibold transition-colors self-start sm:self-auto"
            >
              <TrashIcon size={14} />
              <span>Clear Session History</span>
            </button>
          )}
        </div>

        {/* Privacy Callout */}
        <div className="p-4 rounded-2xl bg-[#151226] border border-[#262142] flex items-start gap-3 text-xs text-zinc-400">
          <ShieldCheckIcon size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-200">Local Privacy Guarantee:</strong> Your images and outfit combinations are cached exclusively on your local device. We never store them on public databases, never share them with advertisers, and never use your photos to train public generative AI algorithms.
          </p>
        </div>

        {/* Creations Grid or Empty State */}
        {creations.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#151226] border border-dashed border-[#2d2650] text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto">
              👗
            </div>
            <h3 className="text-base font-bold text-white">No Outfits Styled Yet</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Step into the Virtual Dressing Room, upload a photo, and try on your first combination of tops, sarees, skirts, or accessories!
            </p>
            <Link
              href="/try-on"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-glow hover:opacity-95 transition-opacity"
            >
              <span>Go to Dressing Room</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden bg-[#151226] border border-[#262142] hover:border-pink-500/40 transition-all flex flex-col justify-between shadow-lg group"
              >
                {/* Visual Preview */}
                <div className="relative aspect-[3/4] bg-black/40 overflow-hidden">
                  <img
                    src={item.generatedImageUrl}
                    alt={item.outfitSummary}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isTestingModeMock && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 text-[10px] font-bold backdrop-blur-md border border-purple-500/40">
                      Testing Mode Simulation
                    </span>
                  )}
                </div>

                {/* Info & Actions */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-white truncate">{item.outfitSummary}</h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Styled on {new Date(item.createdAt).toLocaleDateString()} via {item.provider}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#262142] text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveCompareCreation(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262142] hover:bg-[#342c5c] text-zinc-200 font-medium transition-colors"
                    >
                      <EyeIcon size={14} />
                      <span>Compare</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="p-2 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 transition-colors"
                        title="Download look"
                      >
                        <DownloadIcon size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                        title="Delete look"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Before / After Comparison Modal */}
        {activeCompareCreation && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#151226] border border-[#2d2650] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">Before & After Slider</h3>
                  <p className="text-xs text-zinc-400">{activeCompareCreation.outfitSummary}</p>
                </div>
                <button
                  onClick={() => setActiveCompareCreation(null)}
                  className="text-zinc-400 hover:text-white font-bold text-sm p-1"
                >
                  ✕
                </button>
              </div>

              <BeforeAfterSlider
                beforeImage={activeCompareCreation.originalImageUrl}
                afterImage={activeCompareCreation.generatedImageUrl}
                beforeLabel="Original"
                afterLabel="FitSwap Styled Look"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-zinc-400">Drag divider left/right</span>
                <button
                  type="button"
                  onClick={() => handleDownload(activeCompareCreation)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs shadow-glow"
                >
                  <DownloadIcon size={14} />
                  <span>Download Image</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
