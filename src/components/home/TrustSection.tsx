'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, LockIcon, SparklesIcon, SmartphoneIcon, ArrowRightIcon } from '../common/Icons';

export default function TrustSection() {
  const trustFeatures = [
    {
      title: 'Your Privacy Matters',
      desc: 'Your photos are only used for your outfit edits. We never share or train on your images.',
      linkText: 'Learn More',
      href: '/privacy',
      icon: <ShieldCheckIcon size={20} className="text-pink-400" />,
    },
    {
      title: 'Secure & Encrypted',
      desc: 'All data is transmitted securely and deleted after processing (where applicable).',
      linkText: 'Read More',
      href: '/privacy#security',
      icon: <LockIcon size={20} className="text-purple-400" />,
    },
    {
      title: 'AI-Powered Technology',
      desc: 'Get realistic, high-quality results with advanced image editing models.',
      linkText: 'How It Works',
      href: '/how-it-works',
      icon: <SparklesIcon size={20} className="text-pink-400" />,
    },
    {
      title: 'Works on All Devices',
      desc: 'Enjoy a seamless experience on desktop, tablet and mobile.',
      linkText: 'Try Now',
      href: '/try-on',
      icon: <SmartphoneIcon size={20} className="text-indigo-400" />,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0b0914] border-t border-zinc-200 dark:border-[#262142] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#151226] border border-zinc-200 dark:border-[#262142] hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 dark:bg-[#1e1935] flex items-center justify-center border border-pink-500/20">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{feat.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>

              <Link
                href={feat.href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors pt-2"
              >
                <span>{feat.linkText}</span>
                <ArrowRightIcon size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
