import { useState, useEffect } from 'react';

export interface PhotoSlotInfo {
  id: string;
  name: string;
  category: 'You\'re My Frame' | 'Film Strip (Dear Love)' | 'Keepsake Collage';
  defaultUrl: string;
}

export const PHOTO_SLOTS: PhotoSlotInfo[] = [
  {
    id: 'youre-my-main',
    name: 'Main Couple Framed Photo',
    category: "You're My Frame",
    defaultUrl: '/images/youre-my-main.jpg?v=2',
  },
  {
    id: 'film-1',
    name: 'Film Strip 1 (Top Left)',
    category: 'Film Strip (Dear Love)',
    defaultUrl: '/images/film-1.jpg',
  },
  {
    id: 'film-2',
    name: 'Film Strip 2 (Top Right)',
    category: 'Film Strip (Dear Love)',
    defaultUrl: '/images/film-2.jpg',
  },
  {
    id: 'film-3',
    name: 'Film Strip 3 (Bottom Left)',
    category: 'Film Strip (Dear Love)',
    defaultUrl: '/images/film-3.jpg',
  },
  {
    id: 'film-4',
    name: 'Film Strip 4 (Bottom Right)',
    category: 'Film Strip (Dear Love)',
    defaultUrl: '/images/film-4.jpg',
  },
  {
    id: 'keepsake-1',
    name: 'Keepsake Photo 1',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-1.jpg',
  },
  {
    id: 'keepsake-2',
    name: 'Keepsake Photo 2',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-2.jpg',
  },
  {
    id: 'keepsake-3',
    name: 'Keepsake Photo 3',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-3.jpg',
  },
  {
    id: 'keepsake-4',
    name: 'Keepsake Photo 4',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-4.jpg',
  },
  {
    id: 'keepsake-5',
    name: 'Keepsake Photo 5',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-5.jpg',
  },
  {
    id: 'keepsake-6',
    name: 'Keepsake Photo 6',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-6.jpg',
  },
  {
    id: 'keepsake-7',
    name: 'Keepsake Photo 7',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-7.jpg',
  },
  {
    id: 'keepsake-8',
    name: 'Keepsake Photo 8',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-8.jpg',
  },
  {
    id: 'keepsake-9',
    name: 'Keepsake Photo 9',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-9.jpg',
  },
  {
    id: 'keepsake-10',
    name: 'Keepsake Photo 10',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-10.jpg',
  },
  {
    id: 'keepsake-11',
    name: 'Keepsake Photo 11',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-11.jpg',
  },
  {
    id: 'keepsake-12',
    name: 'Keepsake Photo 12',
    category: 'Keepsake Collage',
    defaultUrl: '/images/keepsake-12.jpg',
  },
];

const STORAGE_KEY = 'boyfriend_day_custom_photos_v4';
const PHOTO_CHANGE_EVENT = 'boyfriend_day_photos_changed';

let serverManifest: Record<string, string> = {
  'youre-my-main': '/images/youre-my-main.jpg?v=2',
  'film-1': '/images/film-1.jpg?v=2',
  'film-2': '/images/film-2.jpg?v=2',
  'film-3': '/images/film-3.jpg?v=2',
  'film-4': '/images/film-4.jpg?v=2',
  'keepsake-1': '/images/keepsake-1.jpg?v=2',
  'keepsake-2': '/images/keepsake-2.jpg?v=2',
  'keepsake-3': '/images/keepsake-3.jpg?v=2',
  'keepsake-4': '/images/keepsake-4.jpg?v=2',
  'keepsake-5': '/images/keepsake-5.jpg?v=2',
  'keepsake-6': '/images/keepsake-6.jpg?v=2',
  'keepsake-7': '/images/keepsake-7.jpg?v=2',
  'keepsake-8': '/images/keepsake-8.jpg?v=2',
  'keepsake-9': '/images/keepsake-9.jpg?v=2',
  'keepsake-10': '/images/keepsake-10.jpg?v=2',
  'keepsake-11': '/images/keepsake-11.jpg?v=2',
  'keepsake-12': '/images/keepsake-12.jpg?v=2',
};

// Fetch latest server manifest on startup
if (typeof window !== 'undefined') {
  fetch('/images/manifest.json')
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && typeof data === 'object') {
        serverManifest = { ...serverManifest, ...data };
        window.dispatchEvent(new Event(PHOTO_CHANGE_EVENT));
      }
    })
    .catch(() => {});
}

// Reads current stored photos from localStorage
export function getSavedPhotos(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const cleaned: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'string' && !v.includes('lh3.googleusercontent.com/aida-public')) {
        cleaned[k] = v;
      }
    }
    return cleaned;
  } catch {
    return {};
  }
}

// Gets effective photo url for slot (custom if set, otherwise default)
export function getPhotoUrl(slotId: string): string {
  const saved = getSavedPhotos();
  if (saved[slotId] && !saved[slotId].includes('lh3.googleusercontent.com/aida-public')) {
    return saved[slotId];
  }
  if (serverManifest[slotId]) {
    return serverManifest[slotId];
  }
  const slot = PHOTO_SLOTS.find((s) => s.id === slotId);
  return slot?.defaultUrl || '';
}

// Saves a photo for a slot
export function setPhotoUrl(slotId: string, url: string): void {
  try {
    const saved = getSavedPhotos();
    saved[slotId] = url;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    window.dispatchEvent(new Event(PHOTO_CHANGE_EVENT));

    // Also persist permanently to disk via backend endpoint
    if (url && url.startsWith('data:image/')) {
      fetch('/api/save-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId, dataUrl: url }),
      }).catch(() => {
        // Fail silently if running offline or in static preview
      });
    }
  } catch (err) {
    console.error('Failed to save photo to localStorage', err);
  }
}

// Resets a specific slot back to default
export function resetPhotoSlot(slotId: string): void {
  try {
    const saved = getSavedPhotos();
    delete saved[slotId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    window.dispatchEvent(new Event(PHOTO_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to reset photo in localStorage', err);
  }
}

// Resets all slots back to original defaults
export function resetAllPhotos(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(PHOTO_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to reset all photos', err);
  }
}

// Batch set multiple photos (from config object)
export function batchSetPhotos(newPhotos: Record<string, string>): void {
  try {
    const saved = getSavedPhotos();
    const updated = { ...saved, ...newPhotos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(PHOTO_CHANGE_EVENT));
  } catch (err) {
    console.error('Failed to batch save photos', err);
  }
}

// Exports all currently customized photos as clean JSON
export function exportPhotosJSON(): string {
  const saved = getSavedPhotos();
  return JSON.stringify(saved, null, 2);
}

// Convert a local File object to base64 Data URL with automatic lightweight resizing
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Resize to reasonable dimensions (max 1200px width/height) to save localStorage space
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// React hook for live updating photo dictionary
export function useCustomPhotos() {
  const [photos, setPhotos] = useState<Record<string, string>>(() => getSavedPhotos());

  useEffect(() => {
    const handleUpdate = () => {
      setPhotos(getSavedPhotos());
    };
    window.addEventListener(PHOTO_CHANGE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(PHOTO_CHANGE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getUrl = (slotId: string): string => {
    const custom = photos[slotId];
    if (custom && !custom.includes('lh3.googleusercontent.com/aida-public')) {
      return custom;
    }
    if (serverManifest[slotId]) {
      return serverManifest[slotId];
    }
    return PHOTO_SLOTS.find((s) => s.id === slotId)?.defaultUrl || '';
  };

  const isCustom = (slotId: string): boolean => {
    const custom = photos[slotId];
    return Boolean(custom && !custom.includes('lh3.googleusercontent.com/aida-public'));
  };

  return {
    photos,
    getUrl,
    isCustom,
    setPhoto: setPhotoUrl,
    resetPhoto: resetPhotoSlot,
    resetAll: resetAllPhotos,
    batchSet: batchSetPhotos,
    exportJSON: exportPhotosJSON,
  };
}
