'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CLOTHING_CATEGORIES } from '@/data/categories';
import { CLOTHING_CATALOGUE } from '@/data/catalogue';
import { getGarmentImageUrl, getCategoryFallback, getGarmentImageRecord } from '@/data/garment-images';
import { GarmentItem } from '@/types/catalogue';
import QuickTryOnModal from '@/components/common/QuickTryOnModal';
import { SearchIcon, SparklesIcon } from '@/components/common/Icons';

function AllCategoriesContent() {
  const searchParams = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGarmentForTryOn, setActiveGarmentForTryOn] = useState<GarmentItem | null>(null);

  // Read ?category= from URL if present
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && (cat === 'all' || CLOTHING_CATEGORIES.some((c) => c.id === cat))) {
      setSelectedCategoryId(cat);
    }
  }, [searchParams]);

  // Priority sort for categories
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

  // Filter garments
  const displayedGarments = useMemo(() => {
    let list = CLOTHING_CATALOGUE;
    if (selectedCategoryId !== 'all') {
      list = list.filter((g) => g.categoryId === selectedCategoryId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.categoryName.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategoryId, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0b0914] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-bold shadow-glow">
            <SparklesIcon size={14} className="text-pink-400" />
            <span>All Categories • Complete Wardrobe Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            All Clothing Categories
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300">
            Browse all 490+ real garment styles below. Click <strong className="text-pink-400">&ldquo;✨ Try On This Cloth&rdquo;</strong> on any item to upload your photo and instantly see yourself in that outfit!
          </p>
        </div>

        {/* Search & Active Category Counter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#151226] border border-[#262142] shadow-lg">
          <div className="relative w-full md:w-96">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cloth name (e.g. saree, bikini, blazer, gown)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#1e1935] border border-[#342c5c] rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs text-zinc-400 font-medium">
            Showing <strong className="text-pink-400">{displayedGarments.length}</strong> clothing items
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategoryId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-glow'
                : 'bg-[#151226] text-zinc-400 hover:text-white border border-[#262142]'
            }`}
          >
            All Categories ({CLOTHING_CATALOGUE.length})
          </button>
          {sortedCategories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-glow'
                    : 'bg-[#151226] text-zinc-400 hover:text-white border border-[#262142]'
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

        {/* Garments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedGarments.map((garment) => {
            const categoryCode = CLOTHING_CATEGORIES.find((c) => c.id === garment.categoryId)?.code || '';
            const imgRecord = getGarmentImageRecord(garment.name, garment.categoryId);
            const fitStyle = imgRecord.displayFit === 'contain' ? 'object-contain p-4' : 'object-cover';

            return (
              <div
                key={garment.id}
                className="rounded-3xl overflow-hidden bg-[#151226] border border-[#262142] hover:border-pink-500/60 transition-all flex flex-col justify-between shadow-xl hover:-translate-y-1 group"
              >
                {/* Real Garment Photo Preview */}
                <div className="relative aspect-[4/5] bg-[#0d0a18] overflow-hidden flex items-center justify-center">
                  <img
                    src={getGarmentImageUrl(garment)}
                    alt={garment.name}
                    className={`w-full h-full ${fitStyle} group-hover:scale-105 transition-transform duration-300`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = getCategoryFallback(garment.categoryId);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151226] via-transparent to-transparent pointer-events-none" />

                  {/* Category Pills on Top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-pink-300 border border-white/10 shadow-sm">
                      Category {categoryCode}
                    </span>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-900/80 backdrop-blur-md text-purple-200 border border-purple-500/40 font-medium shadow-sm">
                      {garment.categoryName}
                    </span>
                  </div>

                  {/* Photo Attribution Pill */}
                  <div className="absolute bottom-2 right-3 pointer-events-none">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
                      📷 {imgRecord.photographer}
                    </span>
                  </div>
                </div>

                {/* Details & "Try On" CTA */}
                <div className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-white group-hover:text-pink-300 transition-colors">
                      {garment.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {garment.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {garment.compatibleFabrics.slice(0, 3).map((f) => (
                        <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-[#1e1935] text-zinc-300 border border-[#2e2650]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prominent Instant Try-On Button */}
                  <div className="pt-2 border-t border-[#262142]">
                    <button
                      type="button"
                      onClick={() => setActiveGarmentForTryOn(garment)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow hover:scale-[1.02]"
                    >
                      <SparklesIcon size={14} />
                      <span>✨ Try On This Cloth</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instant Try-On Modal */}
      <QuickTryOnModal
        garment={activeGarmentForTryOn}
        isOpen={Boolean(activeGarmentForTryOn)}
        onClose={() => setActiveGarmentForTryOn(null)}
      />
    </div>
  );
}

export default function AllCategoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading All Categories...</div>}>
      <AllCategoriesContent />
    </Suspense>
  );
}
