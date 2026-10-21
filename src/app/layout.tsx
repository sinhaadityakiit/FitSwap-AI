import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'FitSwap AI — Virtual Dressing Room & AI Outfit Try-On',
  description:
    'FitSwap AI allows users to upload a photo and virtually try on thousands of clothing styles with AI precision. Preserves identity, background, and posture.',
  keywords: [
    'virtual dressing room',
    'AI try on',
    'virtual fitting room',
    'fashion AI',
    'clothing replacement',
    'FitSwap AI'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0b0914] text-white selection:bg-pink-500 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col min-h-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
