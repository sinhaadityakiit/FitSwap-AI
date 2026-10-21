'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LeftPanelCatalogue from '@/components/try-on/LeftPanelCatalogue';
import CenterPanelPreview from '@/components/try-on/CenterPanelPreview';
import RightPanelCustomizer from '@/components/try-on/RightPanelCustomizer';
import { UserUploadedImage, VirtualTryOnResult } from '@/types/try-on';
import { GarmentItem, GarmentCustomizationOptions } from '@/types/catalogue';
import { OutfitSpecification, SelectedGarmentLayer } from '@/types/outfit';
import { CLOTHING_CATALOGUE, getGarmentById } from '@/data/catalogue';
import { DEMO_MODELS } from '@/data/demo-models';
import { saveCreation } from '@/lib/storage/creations-store';
import { synthesizeVirtualTryOn } from '@/lib/ai/virtual-tryon-engine';
import { SparklesIcon, SlidersIcon, EyeIcon } from '@/components/common/Icons';

function TryOnWorkspaceContent() {
  const searchParams = useSearchParams();

  // State
  const [uploadedImage, setUploadedImage] = useState<UserUploadedImage | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [latestResult, setLatestResult] = useState<VirtualTryOnResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active outfit layers & prompt
  const [outfit, setOutfit] = useState<OutfitSpecification>({
    layers: [],
    customPromptDescription: '',
    globalOccasion: 'Casual / Everyday',
  });

  // Undo history stack
  const [history, setHistory] = useState<OutfitSpecification[]>([]);

  // Mobile active tab ('catalogue' | 'mirror' | 'customizer')
  const [mobileTab, setMobileTab] = useState<'catalogue' | 'mirror' | 'customizer'>('mirror');

  // Auto-load garment from URL query params or initialize with demo model
  useEffect(() => {
    // 1. If URL has ?garment=...
    const garmentId = searchParams.get('garment');
    if (garmentId) {
      const g = getGarmentById(garmentId);
      if (g) {
        handleAddGarment(g);
      }
    }

    // 2. Check if a photo was uploaded from the homepage or prior session
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('fitswap_uploaded_photo') || localStorage.getItem('fitswap_uploaded_photo');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.dataUrl) {
            setUploadedImage(parsed);
          }
        }
      } catch (err) {
        console.error('Error loading stored upload:', err);
      }
    }
  }, [searchParams]);

  // Push state to undo stack
  const pushHistory = (current: OutfitSpecification) => {
    setHistory((prev) => [...prev.slice(-10), JSON.parse(JSON.stringify(current))]);
  };

  // Add garment to outfit stack
  const handleAddGarment = (garment: GarmentItem) => {
    pushHistory(outfit);

    const newLayer: SelectedGarmentLayer = {
      layerId: `layer-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      garment,
      layerType: garment.layerType,
      customization: { ...garment.defaultOptions },
      isVisible: true,
      addedAt: Date.now(),
    };

    setOutfit((prev) => {
      // If already added, don't duplicate identical item unless intentional
      const exists = prev.layers.some((l) => l.garment.id === garment.id);
      if (exists) {
        return prev;
      }
      return {
        ...prev,
        layers: [...prev.layers, newLayer],
      };
    });

    setSelectedLayerId(newLayer.layerId);

    // On mobile viewports, move to styling or mirror
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileTab('customizer');
    }
  };

  // Remove layer
  const handleRemoveLayer = (layerId: string) => {
    pushHistory(outfit);
    setOutfit((prev) => {
      const remaining = prev.layers.filter((l) => l.layerId !== layerId);
      if (selectedLayerId === layerId) {
        setSelectedLayerId(remaining[0]?.layerId || null);
      }
      return { ...prev, layers: remaining };
    });
  };

  // Toggle visibility
  const handleToggleVisibility = (layerId: string) => {
    setOutfit((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.layerId === layerId ? { ...l, isVisible: !l.isVisible } : l
      ),
    }));
  };

  // Update customization
  const handleUpdateLayerCustomization = (
    layerId: string,
    updates: Partial<GarmentCustomizationOptions>
  ) => {
    setOutfit((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.layerId === layerId
          ? { ...l, customization: { ...l.customization, ...updates } }
          : l
      ),
    }));
  };

  // Undo last selection
  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setOutfit(previous);
    setSelectedLayerId(previous.layers[0]?.layerId || null);
  };

  // Reset to original photo
  const handleResetOriginal = () => {
    if (confirm('Reset dressing mirror to your original photo and clear current generation?')) {
      setLatestResult(null);
      setErrorMessage(null);
    }
  };

  // Trigger AI generation
  const handleGenerateOutfit = async () => {
    if (!uploadedImage) {
      setErrorMessage('Please upload or select a photo in the dressing mirror first.');
      setMobileTab('mirror');
      return;
    }

    if (outfit.layers.length === 0 && !outfit.customPromptDescription) {
      setErrorMessage('Please pick at least one garment or describe your desired outfit.');
      setMobileTab('catalogue');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    // Switch view to mirror on mobile
    setMobileTab('mirror');

    try {
      // 1. Synthesize photorealistic virtual try-on fitting the garment directly onto the user's photo/body
      const fittedLookUrl = await synthesizeVirtualTryOn(uploadedImage.dataUrl, outfit);

      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalImage: uploadedImage.dataUrl,
          outfit,
          synthesizedImage: fittedLookUrl,
          preserveFace: true,
          preserveBackground: true,
          preservePose: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate virtual try-on outfit.');
      }

      const result = data as VirtualTryOnResult;
      // Guarantee the final output is the user actually wearing the selected garment
      result.generatedImageUrl = fittedLookUrl;
      setLatestResult(result);

      // Persist to user creations storage
      saveCreation({
        id: result.id,
        originalImageUrl: result.originalImageUrl,
        generatedImageUrl: result.generatedImageUrl,
        outfit,
        compiledPrompt: result.compiledPrompt,
        outfitSummary: result.outfitSummary,
        createdAt: result.createdAt,
        provider: result.provider,
        isTestingModeMock: result.isTestingModeMock,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error during generation';
      setErrorMessage(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0b0914] text-white overflow-y-auto lg:overflow-hidden lg:h-[calc(100vh-5rem)] lg:max-h-[calc(100vh-5rem)]">
      {/* Mobile Tab Selector */}
      <div className="lg:hidden flex items-center justify-around bg-[#120f21] border-b border-[#262142] p-2 text-xs flex-shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('catalogue')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
            mobileTab === 'catalogue' ? 'bg-pink-600 text-white' : 'text-zinc-400'
          }`}
        >
          <SparklesIcon size={14} />
          <span>1. Wardrobe</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('mirror')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
            mobileTab === 'mirror' ? 'bg-pink-600 text-white' : 'text-zinc-400'
          }`}
        >
          <EyeIcon size={14} />
          <span>2. Mirror Preview</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('customizer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
            mobileTab === 'customizer' ? 'bg-pink-600 text-white' : 'text-zinc-400'
          }`}
        >
          <SlidersIcon size={14} />
          <span>3. Styling ({outfit.layers.length})</span>
        </button>
      </div>

      {/* Global Error Banner if present */}
      {errorMessage && (
        <div className="bg-red-950/80 border-b border-red-500/50 px-4 py-2 text-xs text-red-200 flex items-center justify-between flex-shrink-0">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="font-bold text-white px-2">✕</button>
        </div>
      )}

      {/* 3-Panel Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 h-full overflow-hidden">
        {/* Left Panel: Clothing Catalogue */}
        <div className={`h-full min-h-0 max-h-full overflow-y-auto lg:col-span-3 lg:flex lg:flex-col ${mobileTab === 'catalogue' ? 'flex flex-col' : 'hidden'}`}>
          <LeftPanelCatalogue
            onAddGarment={handleAddGarment}
            activeGarmentIds={outfit.layers.map((l) => l.garment.id)}
          />
        </div>

        {/* Center Panel: Photo & Generation Mirror */}
        <div className={`h-full min-h-0 max-h-full overflow-y-auto lg:col-span-6 lg:flex lg:flex-col ${mobileTab === 'mirror' ? 'flex flex-col' : 'hidden'}`}>
          <CenterPanelPreview
            uploadedImage={uploadedImage}
            latestResult={latestResult}
            isGenerating={isGenerating}
            onImageSelected={(img) => {
              setUploadedImage(img);
              setLatestResult(null);
            }}
            onImageRemoved={() => {
              setUploadedImage(null);
              setLatestResult(null);
              try {
                sessionStorage.removeItem('fitswap_uploaded_photo');
                localStorage.removeItem('fitswap_uploaded_photo');
              } catch (e) {}
            }}
            onResetOriginal={handleResetOriginal}
            onUndoLastSelection={handleUndo}
            canUndo={history.length > 0}
          />
        </div>

        {/* Right Panel: Outfit Customizer & Layer Builder */}
        <div className={`h-full min-h-0 max-h-full overflow-y-auto lg:col-span-3 lg:flex lg:flex-col ${mobileTab === 'customizer' ? 'flex flex-col' : 'hidden'}`}>
          <RightPanelCustomizer
            outfit={outfit}
            selectedLayerId={selectedLayerId}
            isGenerating={isGenerating}
            hasPhoto={Boolean(uploadedImage)}
            onSelectLayer={(id) => setSelectedLayerId(id)}
            onRemoveLayer={handleRemoveLayer}
            onToggleVisibility={handleToggleVisibility}
            onUpdateLayerCustomization={handleUpdateLayerCustomization}
            onUpdateCustomPrompt={(p) => setOutfit((prev) => ({ ...prev, customPromptDescription: p }))}
            onUpdateOccasion={(o) => setOutfit((prev) => ({ ...prev, globalOccasion: o }))}
            onGenerateOutfit={handleGenerateOutfit}
          />
        </div>
      </div>
    </div>
  );
}

export default function TryOnWorkspacePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading Dressing Room...</div>}>
      <TryOnWorkspaceContent />
    </Suspense>
  );
}
