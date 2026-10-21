'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HangerIcon } from '../common/Icons';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on Try-On studio workspace so the dressing room fits 100% inside viewport
  if (pathname === '/try-on') {
    return null;
  }

  return (
    <footer className="bg-[#0b0914] border-t border-[#262142] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#262142]/60">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white">
              <HangerIcon size={18} />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white">FitSwap AI</span>
              <p className="text-[11px] text-zinc-400">Your Style. Your Choice. Your Virtual Wardrobe.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-zinc-300">
            <Link href="/" className="hover:text-pink-400 transition-colors">Home</Link>
            <Link href="/all-categories" className="hover:text-pink-400 transition-colors font-semibold text-pink-300">All Categories</Link>
            <Link href="/try-on" className="hover:text-pink-400 transition-colors">Virtual Try-On</Link>
            <Link href="/explore" className="hover:text-pink-400 transition-colors">Explore Clothing</Link>
            <Link href="/creations" className="hover:text-pink-400 transition-colors">My Creations</Link>
            <Link href="/how-it-works" className="hover:text-pink-400 transition-colors">How It Works</Link>
            <Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy</Link>
            <Link href="/privacy#contact" className="hover:text-pink-400 transition-colors">Contact</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hover:text-white cursor-pointer transition-colors" title="Instagram">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-colors" title="Facebook">Facebook</span>
            <span className="hover:text-white cursor-pointer transition-colors" title="X (Twitter)">X</span>
            <span className="hover:text-white cursor-pointer transition-colors" title="YouTube">YouTube</span>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© 2025 FitSwap AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-300">FitSwap AI • Real-Time Virtual Dressing Room</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
