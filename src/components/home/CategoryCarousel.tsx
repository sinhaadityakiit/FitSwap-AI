'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '../common/Icons';
import { CATEGORY_PHOTO_FALLBACKS } from '@/data/clothing-image-registry';

export default function CategoryCarousel() {
  const quickCategories = [
    {
      name: 'Casual Wear',
      id: 'tops',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['tops'].imageUrl,
    },
    {
      name: 'Dresses',
      id: 'dresses',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['dresses'].imageUrl,
    },
    {
      name: 'Traditional',
      id: 'sarees',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['sarees'].imageUrl,
    },
    {
      name: 'Lingerie',
      id: 'underwear',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['underwear'].imageUrl,
    },
    {
      name: 'Sportswear',
      id: 'sportswear',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['sportswear'].imageUrl,
    },
    {
      name: 'Swimwear',
      id: 'swimwear',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['swimwear'].imageUrl,
    },
    {
      name: 'Outerwear',
      id: 'jackets-coats',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['jackets-coats'].imageUrl,
    },
    {
      name: 'Accessories',
      id: 'accessories',
      imageUrl: CATEGORY_PHOTO_FALLBACKS['accessories'].imageUrl,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0f0c1b] border-y border-zinc-200 dark:border-[#262142] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              From everyday wear to special occasions, find every style you need.
            </p>
          </div>

          <Link
            href="/all-categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* Category Cards Carousel / Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {quickCategories.map((cat) => (
            <Link
              key={cat.name}
              href={`/try-on?category=${cat.id}`}
              className="group block rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#18142a] border border-zinc-200 dark:border-[#2b2447] hover:border-pink-500/60 dark:hover:border-pink-500/60 shadow-sm hover:shadow-md transition-all text-center p-2 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-2 bg-zinc-200 dark:bg-black/30">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 truncate">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
