'use client';

import React from 'react';
import { FASHION_FABRICS } from '@/data/customization-options';

interface FabricSelectorProps {
  selectedFabric?: string;
  compatibleFabrics?: string[];
  onFabricChange: (fabric: string) => void;
}

export default function FabricSelector({
  selectedFabric,
  compatibleFabrics,
  onFabricChange,
}: FabricSelectorProps) {
  // Use compatible fabrics if provided, otherwise all fashion fabrics
  const list = compatibleFabrics && compatibleFabrics.length > 0 ? compatibleFabrics : FASHION_FABRICS;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-300">Fabric & Material</label>
        <span className="text-[11px] text-zinc-400">Suitable for garment</span>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
        {list.map((fab) => {
          const isSelected = selectedFabric === fab;
          return (
            <button
              key={fab}
              type="button"
              onClick={() => onFabricChange(fab)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-pink-600 text-white shadow-sm ring-1 ring-pink-400'
                  : 'bg-[#1e1935] text-zinc-300 hover:text-white hover:bg-[#282245] border border-[#2d2750]'
              }`}
            >
              {fab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
