export interface FileValidationOptions {
  maxSizeMb?: number;
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const DEFAULT_VALIDATION_OPTIONS: FileValidationOptions = {
  maxSizeMb: 25, // Generous 25MB limit to prevent mobile camera upload rejections
  allowedTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/pjpeg',
    'image/x-png',
    'image/bmp',
    'image/gif',
    'image/avif',
  ],
  minWidth: 50,
  minHeight: 50,
  maxWidth: 8192,
  maxHeight: 8192,
};

export function validateImageFile(
  file: File,
  options: FileValidationOptions = DEFAULT_VALIDATION_OPTIONS
): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: false, error: 'No file was selected.' };
  }

  const fileType = (file.type || '').toLowerCase();
  const fileName = (file.name || '').toLowerCase();
  const allowed = options.allowedTypes || DEFAULT_VALIDATION_OPTIONS.allowedTypes!;

  // Check MIME type OR file extension to avoid Windows/browser MIME mismatch
  const hasValidMime = fileType ? allowed.includes(fileType) || fileType.startsWith('image/') : false;
  const hasValidExtension = /\.(jpe?g|png|webp|jfif|bmp|gif|avif)$/i.test(fileName);

  if (!hasValidMime && !hasValidExtension) {
    return {
      isValid: false,
      error: `Unsupported image format (${fileType || fileName.split('.').pop() || 'unknown'}). Please upload a JPEG, PNG, or WebP photo.`,
    };
  }

  const maxMb = options.maxSizeMb || DEFAULT_VALIDATION_OPTIONS.maxSizeMb!;
  const fileMb = file.size / (1024 * 1024);
  if (fileMb > maxMb) {
    return {
      isValid: false,
      error: `Photo file is too large (${fileMb.toFixed(1)}MB). Please choose a photo under ${maxMb}MB.`,
    };
  }

  return { isValid: true };
}

export function validateImageDimensions(
  width: number,
  height: number,
  options: FileValidationOptions = DEFAULT_VALIDATION_OPTIONS
): { isValid: boolean; error?: string } {
  const minW = options.minWidth || 50;
  const minH = options.minHeight || 50;

  if (width < minW || height < minH) {
    return {
      isValid: false,
      error: `Image resolution is too low (${width}x${height}px). Minimum required is ${minW}x${minH}px for clear clothing fitting.`,
    };
  }

  return { isValid: true };
}
