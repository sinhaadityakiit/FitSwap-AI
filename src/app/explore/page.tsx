'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CLOTHING_CATEGORIES } from '@/data/categories';
import { CLOTHING_CATALOGUE } from '@/data/catalogue';
import { getGarmentImageUrl, getCategoryFallback, getGarmentImageRecord } from '@/data/garment-images';
import { GarmentItem } from '@/types/catalogue';
import QuickTryOnModal from '@/components/common/QuickTryOnModal';
import { SearchIcon, SparklesIcon, ArrowRightIcon } from '@/components/common/Icons';

export default function ExploreClothingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeGarmentForTryOn, setActiveGarmentForTryOn] = useState<GarmentItem | null>(null);

  const filteredGarments = useMemo(() => {
    let list = CLOTHING_CATALOGUE;
    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.categoryId === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, search]);

  return (
    <div className="min-h-screen bg-[#0b0914] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold shadow-glow">
            <SparklesIcon size={14} className="text-pink-400" />
            <span>Complete FitSwap Wardrobe (490+ Styles)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            Explore All Clothing Categories
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Browse our comprehensive female clothing catalogue including Indian traditional wear, western formal,
            intimate lingerie, beachwear, activewear, and outerwear.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#151226] border border-[#262142] shadow-lg">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search garments (e.g., Banarasi saree, corset top, pencil skirt)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#1e1935] border border-[#342c5c] rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Category Dropdown (Mobile) & Count */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between">
            <span className="text-xs text-zinc-400 font-medium">
              Showing <strong className="text-white">{filteredGarments.length}</strong> garments
            </span>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="md:hidden text-xs bg-[#1e1935] border border-[#342c5c] rounded-xl px-3 py-2 text-white"
            >
              <option value="all">All 24 Categories</option>
              {CLOTHING_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.garmentCount})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills (Desktop) */}
        <div className="hidden md:flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : 'bg-[#151226] text-zinc-400 hover:text-white border border-[#262142]'
            }`}
          >
            All Categories ({CLOTHING_CATALOGUE.length})
          </button>
          {CLOTHING_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                    : 'bg-[#151226] text-zinc-400 hover:text-white border border-[#262142]'
                }`}
              >
                {cat.name} ({cat.garmentCount})
              </button>
            );
          })}
        </div>

        {/* Garments Grid with Full Garment Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredGarments.map((garment) => {
            const imageUrl = getGarmentImageUrl(garment);
            const categoryCode = CLOTHING_CATEGORIES.find((c) => c.id === garment.categoryId)?.code || '';
            const imgRecord = getGarmentImageRecord(garment.name, garment.categoryId);
            const fitStyle = imgRecord.displayFit === 'contain' ? 'object-contain p-4' : 'object-cover';

            return (
              <div
                key={garment.id}
                className="rounded-2xl overflow-hidden bg-[#151226] border border-[#262142] hover:border-pink-500/50 transition-all flex flex-col justify-between shadow-lg hover:-translate-y-1 group"
              >
                {/* Garment Image Preview */}
                <div className="relative aspect-[4/5] bg-[#0d0a18] overflow-hidden flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={garment.name}
                    className={`w-full h-full ${fitStyle} group-hover:scale-105 transition-transform duration-300`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = getCategoryFallback(garment.categoryId);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151226] via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-pink-300 border border-white/10 shadow-sm">
                      Category {categoryCode}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/80 backdrop-blur-md text-purple-200 border border-purple-500/40 font-medium shadow-sm">
                      {garment.categoryName}
                    </span>
                  </div>

                  {/* Photo Attribution Pill */}
                  <div className="absolute bottom-2 right-2.5 pointer-events-none">
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10">
                      📷 {imgRecord.photographer}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-white group-hover:text-pink-300 transition-colors">
                      {garment.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {garment.description}
                    </p>

                    {/* Fabric badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {garment.compatibleFabrics.slice(0, 3).map((f) => (
                        <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-[#1e1935] text-zinc-300 border border-[#2e2650]">
                          {f}
                        </span>
                      ))}
                      {garment.compatibleFabrics.length > 3 && (
                        <span className="text-[10px] text-zinc-400 self-center">
                          +{garment.compatibleFabrics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#262142] flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveGarmentForTryOn(garment)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow hover:scale-[1.01]"
                    >
                      <SparklesIcon size={14} />
                      <span>✨ Try On This Cloth</span>
                    </button>
                    <Link
                      href={`/try-on?garment=${garment.id}&category=${garment.categoryId}`}
                      className="text-[11px] text-center text-zinc-400 hover:text-pink-400 transition-colors py-1"
                    >
                      Open in Full 3-Panel Dressing Room →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Try-On Modal */}
      <QuickTryOnModal
        garment={activeGarmentForTryOn}
        isOpen={Boolean(activeGarmentForTryOn)}
        onClose={() => setActiveGarmentForTryOn(null)}
      />
    </div>
  );
}
