'use client';

import React from 'react';
import { FASHION_COLORS } from '@/data/customization-options';

interface ColorPickerProps {
  selectedColor?: string;
  onColorChange: (colorName: string, customHex?: string) => void;
}

export default function ColorPicker({ selectedColor = 'Black', onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-300">Garment Colour</label>
        <span className="text-xs font-medium text-pink-400">{selectedColor}</span>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
        {FASHION_COLORS.map((col) => {
          const isSelected = selectedColor === col.name;
          return (
            <button
              key={col.name}
              type="button"
              onClick={() => onColorChange(col.name, col.hex)}
              title={col.name}
              className={`group relative w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform flex items-center justify-center ${
                isSelected ? 'scale-110 ring-2 ring-pink-500 ring-offset-2 ring-offset-[#151226]' : 'hover:scale-105'
              }`}
              style={{
                background: col.hex,
                border: col.name === 'White' || col.name === 'Cream' ? '1px solid #444' : 'none',
              }}
            >
              {isSelected && (
                <span
                  className="text-xs font-bold"
                  style={{ color: col.textColor }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
