'use client';

import React from 'react';
import ColorPicker from '../common/ColorPicker';
import FabricSelector from '../common/FabricSelector';
import PatternSelector from '../common/PatternSelector';
import OutfitLayersList from './OutfitLayersList';
import { OutfitSpecification, SelectedGarmentLayer } from '@/types/outfit';
import { GarmentCustomizationOptions } from '@/types/catalogue';
import {
  NECKLINE_OPTIONS,
  SLEEVE_OPTIONS,
  WAIST_RISE_OPTIONS,
  FIT_OPTIONS,
  SAREE_DRAPING_STYLES,
  SAREE_PALLU_STYLES,
  LEHENGA_SILHOUETTES,
  OCCASION_OPTIONS,
} from '@/data/customization-options';
import { SparklesIcon, SlidersIcon } from '../common/Icons';

interface RightPanelCustomizerProps {
  outfit: OutfitSpecification;
  selectedLayerId: string | null;
  isGenerating: boolean;
  hasPhoto: boolean;
  onSelectLayer: (layerId: string) => void;
  onRemoveLayer: (layerId: string) => void;
  onToggleVisibility: (layerId: string) => void;
  onUpdateLayerCustomization: (layerId: string, updates: Partial<GarmentCustomizationOptions>) => void;
  onUpdateCustomPrompt: (promptText: string) => void;
  onUpdateOccasion: (occasion: string) => void;
  onGenerateOutfit: () => void;
}

export default function RightPanelCustomizer({
  outfit,
  selectedLayerId,
  isGenerating,
  hasPhoto,
  onSelectLayer,
  onRemoveLayer,
  onToggleVisibility,
  onUpdateLayerCustomization,
  onUpdateCustomPrompt,
  onUpdateOccasion,
  onGenerateOutfit,
}: RightPanelCustomizerProps) {
  const currentLayer = outfit.layers.find((l) => l.layerId === selectedLayerId) || outfit.layers[0];

  const updateProp = (field: keyof GarmentCustomizationOptions, value: string) => {
    if (!currentLayer) return;
    onUpdateLayerCustomization(currentLayer.layerId, { [field]: value });
  };

  const isSaree = currentLayer?.garment.categoryId === 'sarees';
  const isLehenga = currentLayer?.garment.categoryId === 'lehengas';
  const isDress = currentLayer?.garment.layerType === 'dress';
  const isTop = currentLayer?.garment.layerType === 'top';
  const isBottom = currentLayer?.garment.layerType === 'bottom';

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#120f21] border-l border-[#262142] p-4 overflow-y-auto space-y-5">
      {/* Panel Header */}
      <div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <SlidersIcon size={14} className="text-pink-400" />
          <span>Outfit Styling & Layers</span>
        </h2>
        <p className="text-xs text-zinc-400">Customize colors, textures, and drape properties</p>
      </div>

      {/* Layers Stack List */}
      <OutfitLayersList
        layers={outfit.layers}
        selectedLayerId={currentLayer?.layerId || null}
        onSelectLayer={onSelectLayer}
        onRemoveLayer={onRemoveLayer}
        onToggleVisibility={onToggleVisibility}
      />

      {/* Selected Garment Customizer Section */}
      {currentLayer ? (
        <div className="p-4 rounded-2xl bg-[#161229] border border-[#2d2650] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#2d2650]">
            <div>
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Configuring</span>
              <h3 className="text-sm font-bold text-white">{currentLayer.garment.name}</h3>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-medium">
              {currentLayer.garment.categoryName}
            </span>
          </div>

          {/* Color Swatches */}
          <ColorPicker
            selectedColor={currentLayer.customization.color}
            onColorChange={(colorName, hex) => {
              if (currentLayer) {
                onUpdateLayerCustomization(currentLayer.layerId, {
                  color: colorName,
                  customColorHex: hex,
                });
              }
            }}
          />

          {/* Fabric Selector */}
          <FabricSelector
            selectedFabric={currentLayer.customization.fabric}
            compatibleFabrics={currentLayer.garment.compatibleFabrics}
            onFabricChange={(fab) => updateProp('fabric', fab)}
          />

          {/* Pattern Selector */}
          <PatternSelector
            selectedPattern={currentLayer.customization.pattern}
            onPatternChange={(pat) => updateProp('pattern', pat)}
          />

          {/* Specific Controls (Neckline, Sleeve, Fit) */}
          {(isTop || isDress) && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Neckline</label>
                <select
                  value={currentLayer.customization.neckline || 'Sweetheart'}
                  onChange={(e) => updateProp('neckline', e.target.value)}
                  className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
                >
                  {NECKLINE_OPTIONS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Sleeve Style</label>
                <select
                  value={currentLayer.customization.sleeveLength || 'Short Sleeves'}
                  onChange={(e) => updateProp('sleeveLength', e.target.value)}
                  className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
                >
                  {SLEEVE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {isBottom && (
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Waist Rise</label>
              <select
                value={currentLayer.customization.waistRise || 'High-Waisted'}
                onChange={(e) => updateProp('waistRise', e.target.value)}
                className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
              >
                {WAIST_RISE_OPTIONS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          )}

          {/* Saree Specific Options */}
          {isSaree && (
            <div className="space-y-3 pt-2 border-t border-[#2d2650]">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Traditional Saree Draping & Pallu
              </span>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Draping Style</label>
                <select
                  value={currentLayer.customization.drapingStyle || SAREE_DRAPING_STYLES[0]}
                  onChange={(e) => updateProp('drapingStyle', e.target.value)}
                  className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
                >
                  {SAREE_DRAPING_STYLES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Pallu Finish</label>
                <select
                  value={currentLayer.customization.palluStyle || SAREE_PALLU_STYLES[0]}
                  onChange={(e) => updateProp('palluStyle', e.target.value)}
                  className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
                >
                  {SAREE_PALLU_STYLES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Lehenga Specific Options */}
          {isLehenga && (
            <div className="space-y-3 pt-2 border-t border-[#2d2650]">
              <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider block">
                Lehenga Flair & Silhouette
              </span>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Silhouette & Flare</label>
                <select
                  value={currentLayer.customization.silhouette || LEHENGA_SILHOUETTES[0]}
                  onChange={(e) => updateProp('silhouette', e.target.value)}
                  className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
                >
                  {LEHENGA_SILHOUETTES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Silhouette & Fit */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Fit Preference</label>
            <select
              value={currentLayer.customization.fit || 'Regular Fit'}
              onChange={(e) => updateProp('fit', e.target.value)}
              className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
            >
              {FIT_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {/* Free-form Custom Description Input */}
      <div className="p-4 rounded-2xl bg-[#161229] border border-[#2d2650] space-y-2">
        <label className="text-xs font-bold text-white uppercase tracking-wider block">
          Describe Your Outfit
        </label>
        <p className="text-[11px] text-zinc-400">
          Enter any extra details (e.g., &ldquo;A red Banarasi saree with a gold embroidered blouse&rdquo;).
        </p>
        <textarea
          rows={3}
          value={outfit.customPromptDescription || ''}
          onChange={(e) => onUpdateCustomPrompt(e.target.value)}
          placeholder="E.g., A black oversized T-shirt with light-blue wide-leg jeans, golden jewelry, and white sneakers."
          className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl p-3 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
        />
      </div>

      {/* Occasion / Season Context */}
      <div>
        <label className="text-xs font-semibold text-zinc-300 block mb-1">Occasion / Context</label>
        <select
          value={outfit.globalOccasion || 'Casual / Everyday'}
          onChange={(e) => onUpdateOccasion(e.target.value)}
          className="w-full text-xs bg-[#1f1938] border border-[#352c5c] rounded-xl px-2.5 py-2 text-zinc-200 focus:outline-none focus:border-pink-500"
        >
          {OCCASION_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Primary Action Button: GENERATE OUTFIT */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerateOutfit}
          disabled={isGenerating || !hasPhoto || (outfit.layers.length === 0 && !outfit.customPromptDescription)}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-glow transition-all ${
            isGenerating || !hasPhoto || (outfit.layers.length === 0 && !outfit.customPromptDescription)
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white hover:opacity-95 hover:scale-[1.01]'
          }`}
        >
          <SparklesIcon size={18} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'Synthesizing Look...' : 'Generate Outfit'}</span>
        </button>
        {!hasPhoto && (
          <p className="text-[11px] text-amber-400/80 text-center mt-2">
            Upload or select a demonstration photo in the center mirror first.
          </p>
        )}
      </div>
    </div>
  );
}
