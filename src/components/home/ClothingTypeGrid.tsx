'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CLOTHING_CATEGORIES } from '@/data/categories';
import { SearchIcon, ArrowRightIcon, SparklesIcon } from '../common/Icons';

export default function ClothingTypeGrid() {
  const [search, setSearch] = useState('');

  const filteredCategories = CLOTHING_CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-zinc-50 dark:bg-[#0c0917] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Shop by Clothing Type
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Explore detailed categories with specific clothing types, colours, fabrics and more.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for any clothing type..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-[#161228] border border-zinc-300 dark:border-[#2d2650] rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Categories Grid (Left 8-9 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/all-categories?category=${cat.id}`}
                className="group p-3 rounded-2xl bg-white dark:bg-[#161229] border border-zinc-200 dark:border-[#262142] hover:border-pink-500/60 dark:hover:border-pink-500/60 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-between hover:-translate-y-1"
              >
                {/* Visual Garment Image Photo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-2 bg-zinc-100 dark:bg-black/30 p-1 flex items-center justify-center border border-zinc-200 dark:border-white/5 group-hover:scale-105 transition-transform">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">
                    {cat.garmentCount} types
                  </span>
                </div>
              </Link>
            ))}

            {/* Custom Outfit Card */}
            <Link
              href="/try-on"
              className="group p-3 rounded-2xl bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-indigo-500/10 dark:bg-[#1f1938] border border-pink-400/40 hover:border-pink-500 shadow-sm transition-all text-center flex flex-col items-center justify-between hover:-translate-y-1"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-pink-500/20 border border-pink-500/30 text-white flex items-center justify-center mb-2 shadow-glow group-hover:scale-105 transition-transform">
                <SparklesIcon size={24} className="text-pink-400" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-pink-600 dark:text-pink-300">Custom Outfit</h3>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">Create your own style</span>
              </div>
            </Link>
          </div>

          {/* Right Banner Card: Build Your Perfect Outfit */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-gradient-to-b from-[#e8d5ff]/40 via-[#f5d0fe]/30 to-[#fdf2f8]/40 dark:from-[#26183e] dark:via-[#1c1333] dark:to-[#120f21] border border-purple-200 dark:border-purple-500/30 shadow-xl flex flex-col justify-between">
            <div className="space-y-3 mb-6">
              <span className="text-[10px] font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase">
                Mix & Match Studio
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-zinc-900 dark:text-white leading-snug">
                Build Your Perfect Outfit
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Mix, match and create your own style with our layered outfit builder. Stack lingerie, tops, bottom-wear, outerwear, footwear, and accessories.
              </p>

              <Link
                href="/try-on"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Try Outfit Builder</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            {/* Model visual */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-300 dark:border-purple-500/30 aspect-[3/4] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
                alt="Model in tailored suit outfit"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-pink-300 text-[10px] font-bold">
                Style it your way! ♡
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
