'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BeakerIcon, XIcon, ArrowRightIcon } from '../common/Icons';

export default function TestingModeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-purple-950 via-fuchsia-950/90 to-purple-950 border-b border-purple-800/40 px-4 py-2 text-xs text-purple-200 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="font-semibold text-pink-300">FitSwap AI Testing Mode Active:</span>
          <span className="text-zinc-300 hidden sm:inline">
            Prototype testing mode enabled. AI requests operate in diagnostic sandbox or connected Gemini/Fal APIs.
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/test-suite"
            className="flex items-center gap-1 font-semibold text-pink-300 hover:text-white underline underline-offset-2 transition-colors"
          >
            <span>Run Test Suite</span>
            <ArrowRightIcon size={12} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-purple-400 hover:text-white rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <XIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
