'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CLOTHING_CATEGORIES } from '@/data/categories';
import { CLOTHING_CATALOGUE, searchGarments } from '@/data/catalogue';
import { getGarmentImageUrl, getCategoryFallback, getGarmentImageRecord } from '@/data/garment-images';
import { GarmentItem } from '@/types/catalogue';
import { SearchIcon, SparklesIcon } from '../common/Icons';

interface LeftPanelCatalogueProps {
  onAddGarment: (garment: GarmentItem) => void;
  activeGarmentIds: string[];
  initialCategory?: string;
}

export default function LeftPanelCatalogue({
  onAddGarment,
  activeGarmentIds,
  initialCategory,
}: LeftPanelCatalogueProps) {
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory || 'tops');
  const [searchQuery, setSearchQuery] = useState('');

  // Priority sort: Everyday fashion and outerwear categories first
  const sortedCategories = useMemo(() => {
    const priority = [
      'tops',
      'shirts-blouses',
      'dresses',
      'jackets-coats',
      'jeans',
      'skirts',
      'sarees',
      'sweaters-knitwear',
      'trousers-pants',
      'shorts',
      'party-evening',
      'co-ord-sets',
    ];
    return [...CLOTHING_CATEGORIES].sort((a, b) => {
      const idxA = priority.indexOf(a.id);
      const idxB = priority.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
  }, []);

  // Auto-sync category from query string if present (e.g. ?category=bras)
  useEffect(() => {
    const cat = searchParams?.get('category');
    if (cat && CLOTHING_CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategoryId(cat);
    }
  }, [searchParams]);

  // Filter garments based on search or category
  const displayedGarments = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return searchGarments(searchQuery);
    }
    return CLOTHING_CATALOGUE.filter((item) => item.categoryId === selectedCategoryId);
  }, [searchQuery, selectedCategoryId]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#120f21] border-r border-[#262142] p-4 overflow-hidden">
      {/* Panel Header */}
      <div className="mb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <SparklesIcon size={14} className="text-pink-400" />
            <span>Wardrobe Catalogue</span>
          </h2>
          <span className="text-[11px] text-zinc-400">490+ Garments</span>
        </div>
        <p className="text-xs text-zinc-400">Select garments to build your outfit</p>
      </div>

      {/* Search Input */}
      <div className="relative mb-3 flex-shrink-0">
        <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search saree, bikini, blazer, gown..."
          className="w-full pl-9 pr-3 py-2 text-xs bg-[#1a162b] border border-[#2d2750] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills (horizontal scroll) */}
      {!searchQuery && (
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none flex-shrink-0">
          {sortedCategories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                    : 'bg-[#181427] text-zinc-400 hover:text-zinc-200 hover:bg-[#201b33] border border-[#262142]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-black/30'}`}>
                  {cat.garmentCount}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Garment Cards List with Image Thumbnails */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1">
        {displayedGarments.length === 0 ? (
          <div className="p-6 text-center text-xs text-zinc-400">
            No clothing found matching &ldquo;{searchQuery}&rdquo;. Try another term.
          </div>
        ) : (
          displayedGarments.map((garment) => {
            const isAdded = activeGarmentIds.includes(garment.id);
            const imageUrl = getGarmentImageUrl(garment);
            const imgRecord = getGarmentImageRecord(garment.name, garment.categoryId);
            const fitStyle = imgRecord.displayFit === 'contain' ? 'object-contain p-1' : 'object-cover';

            return (
              <div
                key={garment.id}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isAdded
                    ? 'border-pink-500/60 bg-pink-950/25'
                    : 'border-[#262142] bg-[#17132a] hover:border-pink-500/40 hover:bg-[#1e1935]'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#0d0a18] flex-shrink-0 border border-white/5 relative flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={garment.name}
                    className={`w-full h-full ${fitStyle}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = getCategoryFallback(garment.categoryId);
                    }}
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="text-xs font-bold text-white truncate">{garment.name}</h4>
                  </div>
                  <p className="text-[10px] text-zinc-400 line-clamp-1">{garment.description}</p>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/40 text-purple-300 font-medium inline-block mt-1">
                    {garment.categoryName}
                  </span>
                </div>

                {/* Add button */}
                <button
                  type="button"
                  onClick={() => onAddGarment(garment)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-all ${
                    isAdded
                      ? 'bg-pink-600/30 text-pink-300 border border-pink-500/50 hover:bg-pink-600/50'
                      : 'bg-[#2a2447] text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600'
                  }`}
                >
                  {isAdded ? 'Added ✓' : '+ Select'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
