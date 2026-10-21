/**
 * Utility for client-side image reading, canvas downscaling, and compression.
 * Ensures uploaded photos render smoothly without crashing memory or sessionStorage limits.
 */

export interface ProcessedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export function compressAndResizeImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1600,
  quality = 0.88
): Promise<ProcessedImageResult> {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read the selected file from disk.'));
    
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        return reject(new Error('Image reader returned empty result.'));
      }

      const img = new Image();
      img.onerror = () => {
        // Fallback: return raw data URL without canvas transformation
        resolve({
          dataUrl: rawDataUrl,
          width: 800,
          height: 1066,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || 'image/jpeg',
        });
      };

      img.onload = () => {
        let width = img.naturalWidth || img.width || 800;
        let height = img.naturalHeight || img.height || 1066;

        // Calculate aspect-ratio preserved dimensions
        let targetWidth = width;
        let targetHeight = height;

        if (targetWidth > maxWidth || targetHeight > maxHeight) {
          const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
          targetWidth = Math.round(targetWidth * ratio);
          targetHeight = Math.round(targetHeight * ratio);
        }

        try {
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            return resolve({
              dataUrl: rawDataUrl,
              width,
              height,
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type || 'image/jpeg',
            });
          }

          // Render with smooth bilinear interpolation
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Export compressed JPEG dataUrl
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

          resolve({
            dataUrl: compressedDataUrl,
            width: targetWidth,
            height: targetHeight,
            fileName: file.name,
            fileSize: Math.round(compressedDataUrl.length * 0.75),
            mimeType: 'image/jpeg',
          });
        } catch {
          // If canvas transformation fails (e.g. security policy), use raw dataUrl
          resolve({
            dataUrl: rawDataUrl,
            width,
            height,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type || 'image/jpeg',
          });
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}
