'use client';

import React from 'react';
import { FASHION_PATTERNS } from '@/data/customization-options';

interface PatternSelectorProps {
  selectedPattern?: string;
  onPatternChange: (pattern: string) => void;
}

export default function PatternSelector({ selectedPattern, onPatternChange }: PatternSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-zinc-300 block">Pattern & Texture</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
        {FASHION_PATTERNS.map((pat) => {
          const isSelected = selectedPattern === pat;
          return (
            <button
              key={pat}
              type="button"
              onClick={() => onPatternChange(pat)}
              className={`px-2 py-1.5 rounded-lg text-left text-xs font-medium truncate transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white ring-1 ring-pink-400'
                  : 'bg-[#1e1935] text-zinc-300 hover:text-white hover:bg-[#282245] border border-[#2d2750]'
              }`}
              title={pat}
            >
              {pat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
