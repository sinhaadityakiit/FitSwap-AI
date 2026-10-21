'use client';

import React from 'react';
import { SelectedGarmentLayer } from '@/types/outfit';
import { getGarmentImageUrl, getCategoryFallback } from '@/data/garment-images';
import { TrashIcon, EyeIcon, EyeOffIcon, SlidersIcon } from '../common/Icons';

interface OutfitLayersListProps {
  layers: SelectedGarmentLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string) => void;
  onRemoveLayer: (layerId: string) => void;
  onToggleVisibility: (layerId: string) => void;
}

export default function OutfitLayersList({
  layers,
  selectedLayerId,
  onSelectLayer,
  onRemoveLayer,
  onToggleVisibility,
}: OutfitLayersListProps) {
  if (layers.length === 0) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-[#2d2750] bg-[#120f21] text-center text-xs text-zinc-400">
        <p className="font-medium text-zinc-300 mb-1">No garments selected yet</p>
        <p className="text-[11px]">Browse the left catalogue to add tops, sarees, skirts, lingerie, or shoes to your outfit stack.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          Active Outfit Stack ({layers.length})
        </span>
        <span className="text-[11px] text-zinc-400">Tap to customize</span>
      </div>

      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {layers.map((layer) => {
          const isSelected = layer.layerId === selectedLayerId;
          return (
            <div
              key={layer.layerId}
              onClick={() => onSelectLayer(layer.layerId)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                isSelected
                  ? 'border-pink-500 bg-pink-950/30 shadow-sm'
                  : 'border-[#262142] bg-[#151226] hover:border-[#383159]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Garment Image Thumbnail & Color Dot */}
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                  <img
                    src={getGarmentImageUrl(layer.garment)}
                    alt={layer.garment.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getCategoryFallback(layer.garment.categoryId);
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-black"
                    style={{ backgroundColor: layer.customization.customColorHex || '#ec4899' }}
                  />
                </div>

                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-xs font-semibold truncate ${isSelected ? 'text-pink-300' : 'text-zinc-200'}`}>
                      {layer.garment.name}
                    </p>
                  </div>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {layer.customization.fabric || 'Standard fabric'} • {layer.customization.pattern || 'Plain'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => onSelectLayer(layer.layerId)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSelected ? 'text-pink-400 bg-pink-500/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Customize Garment"
                >
                  <SlidersIcon size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleVisibility(layer.layerId)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  title={layer.isVisible ? 'Hide layer' : 'Show layer'}
                >
                  {layer.isVisible ? <EyeIcon size={13} /> : <EyeOffIcon size={13} className="text-zinc-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => onRemoveLayer(layer.layerId)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                  title="Remove garment"
                >
                  <TrashIcon size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
