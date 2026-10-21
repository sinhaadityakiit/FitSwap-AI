'use client';

import React, { useState, useRef } from 'react';
import { UploadIcon, TrashIcon, RefreshCwIcon, ShieldCheckIcon, SparklesIcon } from '../common/Icons';
import { validateImageFile, validateImageDimensions } from '@/lib/validation/image-validator';
import { compressAndResizeImage } from '@/lib/image-utils';
import { DEMO_MODELS } from '@/data/demo-models';
import { UserUploadedImage } from '@/types/try-on';

interface ImageUploaderProps {
  currentImage: UserUploadedImage | null;
  onImageSelected: (image: UserUploadedImage) => void;
  onImageRemoved: () => void;
}

export default function ImageUploader({
  currentImage,
  onImageSelected,
  onImageRemoved,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setErrorMessage(null);
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid file.');
      return;
    }

    try {
      const processed = await compressAndResizeImage(file, 1200, 1600, 0.88);
      const imgObj = {
        id: `img-${Date.now()}`,
        dataUrl: processed.dataUrl,
        fileName: processed.fileName,
        fileSize: processed.fileSize,
        mimeType: processed.mimeType,
        width: processed.width,
        height: processed.height,
        uploadedAt: Date.now(),
      };
      try {
        sessionStorage.setItem('fitswap_uploaded_photo', JSON.stringify(imgObj));
        localStorage.setItem('fitswap_uploaded_photo', JSON.stringify(imgObj));
      } catch (e) {}
      onImageSelected(imgObj);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Could not process the selected image file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectDemo = (modelImageUrl: string, modelName: string) => {
    const demoObj = {
      id: `demo-${Date.now()}`,
      dataUrl: modelImageUrl,
      fileName: `${modelName}.jpg`,
      fileSize: 1024 * 500,
      mimeType: 'image/jpeg',
      width: 800,
      height: 1066,
      uploadedAt: Date.now(),
    };
    try {
      sessionStorage.setItem('fitswap_uploaded_photo', JSON.stringify(demoObj));
      localStorage.setItem('fitswap_uploaded_photo', JSON.stringify(demoObj));
    } catch (e) {}
    onImageSelected(demoObj);
    setErrorMessage(null);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInputValue.trim()) return;
    onImageSelected({
      id: `url-${Date.now()}`,
      dataUrl: urlInputValue.trim(),
      fileName: 'web-photo.jpg',
      fileSize: 1024 * 400,
      mimeType: 'image/jpeg',
      width: 800,
      height: 1066,
      uploadedAt: Date.now(),
    });
    setShowUrlInput(false);
    setUrlInputValue('');
    setErrorMessage(null);
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-3 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-start justify-between animate-fadeIn">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="ml-2 font-bold hover:text-white">✕</button>
        </div>
      )}

      {currentImage ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#262142] bg-[#151226] p-3 shadow-xl">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/50">
            <img
              src={currentImage.dataUrl}
              alt="Uploaded Subject"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 flex items-center gap-1.5">
              <ShieldCheckIcon size={12} className="text-emerald-400" />
              <span>Photo Loaded & Ready</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#262142] text-xs">
            <div className="truncate max-w-[150px] text-zinc-300 font-medium" title={currentImage.fileName}>
              {currentImage.fileName}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    fileInputRef.current.click();
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#262142] hover:bg-[#342c5c] text-zinc-200 text-xs font-semibold transition-colors"
              >
                <RefreshCwIcon size={12} />
                <span>Replace Photo</span>
              </button>
              <button
                type="button"
                onClick={onImageRemoved}
                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs transition-colors"
                title="Remove Photo"
              >
                <TrashIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Quick Default Base Model Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-indigo-950/40 border border-pink-500/30 flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <img
                src={DEMO_MODELS[0].imageUrl}
                alt={DEMO_MODELS[0].name}
                className="w-11 h-13 rounded-xl object-cover border border-white/10 flex-shrink-0"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                  Ready-to-Style Base Model
                </span>
                <h4 className="text-xs font-bold text-white">Default Model (Neutral Clothes)</h4>
                <p className="text-[10px] text-zinc-300">Wear neutral base layer, ready to add panties, bras, shorts & shirts one by one.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectDemo(DEMO_MODELS[0].imageUrl, DEMO_MODELS[0].name)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs whitespace-nowrap shadow-glow flex-shrink-0 transition-all"
            >
              Use Default Model
            </button>
          </div>

          {/* Main Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
            onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
            onDrop={handleDrop}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
                fileInputRef.current.click();
              }
            }}
            className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-10 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-pink-500 bg-pink-950/30 shadow-glow scale-[1.01]'
                : 'border-[#382f61] hover:border-pink-500/70 bg-[#151226]/90 hover:bg-[#1a162e]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  processFile(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shadow-glow">
              <UploadIcon size={28} />
            </div>

            <h3 className="font-bold text-white text-base sm:text-lg mb-1">
              Upload Your Photo
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5">
              Click to browse files or drag and drop your photo here.<br />
              Supports JPG, JPEG, PNG, and WebP.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                    fileInputRef.current.click();
                  }
                }}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-glow hover:opacity-95 transition-opacity"
              >
                Browse Files
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold bg-[#262142] hover:bg-[#342c5c] text-purple-200 border border-purple-500/30 transition-colors"
              >
                {showUrlInput ? 'Hide URL' : 'Paste Image URL'}
              </button>
            </div>
          </div>

          {/* Direct URL input if toggled */}
          {showUrlInput && (
            <form onSubmit={handleUrlSubmit} className="flex gap-2 p-3 bg-[#19152e] border border-purple-500/30 rounded-2xl animate-fadeIn">
              <input
                type="url"
                value={urlInputValue}
                onChange={(e) => setUrlInputValue(e.target.value)}
                placeholder="Paste direct image URL (https://...jpg)"
                className="flex-1 text-xs bg-[#110e21] border border-[#2d2650] rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Load
              </button>
            </form>
          )}

          {/* Quick Demo Models Carousel / Strip */}
          <div className="p-4 rounded-2xl bg-[#141026] border border-[#262142]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider">
                <SparklesIcon size={13} className="text-pink-400" />
                <span>Or Select a Demonstration Model</span>
              </span>
              <span className="text-[10px] text-zinc-500">Instant 1-Click Try-On</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {DEMO_MODELS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelectDemo(m.imageUrl, m.name)}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-[#2d2650] hover:border-pink-500 transition-all bg-black/40 hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1.5">
                      <span className="text-[10px] font-bold text-pink-300">Click to Try</span>
                    </div>
                  </div>
                  <div className="p-1.5 text-center bg-[#18132d]">
                    <p className="text-[10px] font-semibold text-zinc-200 truncate">
                      {m.name.split(':')[1]?.trim() || m.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
