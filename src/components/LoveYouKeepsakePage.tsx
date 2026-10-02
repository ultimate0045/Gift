import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Camera, Heart, Sparkles, Upload } from 'lucide-react';
import { sound } from '../utils/sound';
import { useCustomPhotos, fileToDataUrl } from '../utils/photoStore';

interface LoveYouKeepsakePageProps {
  onBack: () => void;
  onNext?: () => void;
  onOpenPhotoCustomizer?: (slotId: string) => void;
}

export const LoveYouKeepsakePage: React.FC<LoveYouKeepsakePageProps> = ({
  onBack,
  onNext,
  onOpenPhotoCustomizer,
}) => {
  const { getUrl, setPhoto } = useCustomPhotos();
  const [showLoveModal, setShowLoveModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDirectMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      for (let i = 0; i < Math.min(files.length, 12); i++) {
        const dataUrl = await fileToDataUrl(files[i]);
        setPhoto(`keepsake-${i + 1}`, dataUrl);
      }
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#fda4af', '#f472b6', '#ffffff', '#ffd166'],
      });
    } catch (err) {
      console.error('Failed to upload keepsake photos', err);
    } finally {
      setIsUploading(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = '';
    }
  };

  const handleNextClick = () => {
    sound.playVictory();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { x: 0.9, y: 0.5 },
      colors: ['#9f1239', '#f48fb1', '#fce7ef', '#fff59d', '#ffffff'],
    });

    if (onNext) {
      onNext();
    } else {
      setShowLoveModal(true);
    }
  };

  const handlePhotoClick = (index: number) => {
    setActivePhoto(index);
    sound.playSparkle();
    confetti({
      particleCount: 20,
      spread: 55,
      origin: { y: 0.5 },
      colors: ['#f48fb1', '#fff59d', '#ffffff'],
    });
    if (onOpenPhotoCustomizer) {
      onOpenPhotoCustomizer(`keepsake-${index}`);
    }
  };

  const handleStickerTap = (label: string) => {
    sound.playPop();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#e11d48', '#fbcfe8', '#ffffff'],
    });
  };

  return (
    <div className="bg-gingham-keepsake min-h-screen w-full flex items-center justify-center p-3 md:p-6 overflow-x-hidden select-none font-sans text-stone-800 relative">
      {/* Top Navigation: Back to Bouquets button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#9f1239] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bouquets</span>
        </button>
      </div>

      {/* Main Scrapbook Board Canvas */}
      <main className="relative w-full max-w-[1180px] min-h-[720px] bg-transparent flex flex-col items-center justify-center px-4 sm:px-8 py-6">
        {/* Decorative Daisy Flower: Upper Left */}
        <div
          className="absolute top-4 left-6 md:top-8 md:left-12 pointer-events-none animate-float"
          data-purpose="decorative-flower"
          style={{ animationDelay: '0.5s' }}
        >
          <svg className="opacity-85 drop-shadow-sm" fill="none" height="68" viewBox="0 0 100 100" width="68">
            <circle cx="50" cy="22" fill="#FFF59D" r="18" />
            <circle cx="78" cy="42" fill="#FFF59D" r="18" />
            <circle cx="68" cy="74" fill="#FFF59D" r="18" />
            <circle cx="32" cy="74" fill="#FFF59D" r="18" />
            <circle cx="22" cy="42" fill="#FFF59D" r="18" />
            <circle cx="50" cy="50" fill="#F48FB1" r="13" />
          </svg>
        </div>

        {/* Decorative Daisy Flower: Bottom Center */}
        <div
          className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-12 pointer-events-none animate-float"
          data-purpose="decorative-flower"
          style={{ animationDelay: '1.8s' }}
        >
          <svg className="opacity-85 drop-shadow-sm" fill="none" height="74" viewBox="0 0 100 100" width="74">
            <circle cx="50" cy="22" fill="#FFF59D" r="18" />
            <circle cx="78" cy="42" fill="#FFF59D" r="18" />
            <circle cx="68" cy="74" fill="#FFF59D" r="18" />
            <circle cx="32" cy="74" fill="#FFF59D" r="18" />
            <circle cx="22" cy="42" fill="#FFF59D" r="18" />
            <circle cx="50" cy="50" fill="#F48FB1" r="13" />
          </svg>
        </div>

        {/* Header Title Section with smooth slide down animation */}
        <header className="relative mb-6 text-center z-10 animate-slide-down" data-purpose="header-title">
          <div className="flex items-center justify-center gap-1.5 md:gap-3">
            <span className="font-romantic-script text-5xl sm:text-6xl md:text-7xl text-[#9f1239] font-normal leading-none drop-shadow-sm">
              love
            </span>
            <span className="inline-block transform translate-y-1 mx-1">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#9f1239] fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span className="font-romantic-script text-5xl sm:text-6xl md:text-7xl text-[#9f1239] font-normal leading-none drop-shadow-sm">
              you!
            </span>
          </div>

          {/* Quick Customize & Direct Multi-Upload Controls for 12 Collage Photos */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <input
              ref={multiFileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleDirectMultiUpload}
              id="keepsake-multi-upload"
            />
            <button
              onClick={() => multiFileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading & Saving 12 Photos...' : '📸 Upload All 12 Keepsake Photos at Once'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
            <button
              onClick={() => onOpenPhotoCustomizer?.('keepsake-1')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-rose-50 border border-pink-300 text-rose-700 font-bold text-xs sm:text-sm shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
            >
              <Camera className="w-3.5 h-3.5 text-rose-500" />
              <span>Click individual photos to customize</span>
            </button>
          </div>
        </header>

        {/* Balanced Horizontal Rows of Alternating Small-Big Photo Pairs with Sliding Entrance */}
        <section
          className="relative z-10 w-full max-w-[860px] mx-auto flex flex-col items-center gap-4 sm:gap-6 select-none"
          data-purpose="photo-grid-collage"
        >
          {/* Row 1: [Small] [Big] - [Small] [Big] (Sliding in from Left) */}
          <div
            className="flex items-center justify-center gap-3 sm:gap-5 w-full animate-slide-left"
            style={{ animationDelay: '0.1s' }}
          >
            {/* Pair 1: Small Photo */}
            <div
              onClick={() => handlePhotoClick(1)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-20 sm:w-24 md:w-28 rotate-[-2.5deg] shrink-0 cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Couple cozy smiling portrait"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-1')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3 h-3" />
                </span>
              </div>
            </div>
            {/* Pair 1: Big Photo */}
            <div
              onClick={() => handlePhotoClick(2)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-32 sm:w-40 md:w-44 rotate-[1.5deg] shrink-0 shadow-md cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Couple laughing in sweet embrace"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-2')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            {/* Pair 2: Small Photo */}
            <div
              onClick={() => handlePhotoClick(3)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-20 sm:w-24 md:w-28 rotate-[-1.5deg] shrink-0 cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Couple forehead kiss romantic"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-3')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3 h-3" />
                </span>
              </div>
            </div>
            {/* Pair 2: Big Photo */}
            <div
              onClick={() => handlePhotoClick(4)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-32 sm:w-40 md:w-44 rotate-[2.5deg] shrink-0 shadow-md cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Warm intimate couple embrace"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-4')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: [Big] [Small] - [Big] [Small] (Sliding in from Right) */}
          <div
            className="flex items-center justify-center gap-3 sm:gap-5 w-full animate-slide-right"
            style={{ animationDelay: '0.25s' }}
          >
            {/* Pair 3: Big Photo */}
            <div
              onClick={() => handlePhotoClick(5)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-32 sm:w-40 md:w-44 rotate-[-2deg] shrink-0 shadow-md cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Romantic piggyback ride hug"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-5')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            {/* Pair 3: Small Photo */}
            <div
              onClick={() => handlePhotoClick(6)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-20 sm:w-24 md:w-28 rotate-[2deg] shrink-0 cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Fun smiling sunglasses selfie"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-6')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3 h-3" />
                </span>
              </div>
            </div>
            {/* Pair 4: Big Photo */}
            <div
              onClick={() => handlePhotoClick(7)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-32 sm:w-40 md:w-44 rotate-[-1.5deg] shrink-0 shadow-md cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Cute indoor casual couple"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-7')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            {/* Pair 4: Small Photo */}
            <div
              onClick={() => handlePhotoClick(8)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-20 sm:w-24 md:w-28 rotate-[3deg] shrink-0 cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Couple posing stylishly in black and white"
                className="w-full h-full object-cover grayscale contrast-110 pointer-events-none"
                src={getUrl('keepsake-8')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: [Small] [Big] - [Small] [Big] (Sliding in from Left) */}
          <div
            className="flex items-center justify-center gap-3 sm:gap-5 w-full animate-slide-left"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Pair 5: Small Photo */}
            <div
              onClick={() => handlePhotoClick(9)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-20 sm:w-24 md:w-28 rotate-[-2deg] shrink-0 cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Sunset beach walk couple"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-9')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3 h-3" />
                </span>
              </div>
            </div>
            {/* Pair 5: Big Photo */}
            <div
              onClick={() => handlePhotoClick(10)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-32 sm:w-40 md:w-44 rotate-[2deg] shrink-0 shadow-md cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Couple cozy moment outdoors"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-10')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            {/* Pair 6: Small Photo */}
            <div
              onClick={() => handlePhotoClick(11)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-20 sm:w-24 md:w-28 rotate-[-3deg] shrink-0 cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Close portrait of smiling couple"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-11')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3 h-3" />
                </span>
              </div>
            </div>
            {/* Pair 6: Big Photo */}
            <div
              onClick={() => handlePhotoClick(12)}
              className="photo-card rounded-sm overflow-hidden bg-white aspect-[3/4] w-32 sm:w-40 md:w-44 rotate-[1.5deg] shrink-0 shadow-md cursor-pointer relative group"
              title="Click to customize or view photo 📷"
            >
              <img
                alt="Romantic couple holding hands in nature"
                className="w-full h-full object-cover pointer-events-none"
                src={getUrl('keepsake-12')}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1 rounded-full bg-white/90 text-rose-600 shadow">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Stickers & Characters with Slide Up Entrance */}
        {/* Bottom-Left Kawaii Bunny with Love Letter */}
        <div
          onClick={() => handleStickerTap('Bunny Love Letter')}
          title="Click the cute bunny!"
          className="absolute bottom-6 left-4 sm:left-12 md:left-20 z-20 transition-transform duration-300 hover:scale-115 cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.45s' }}
          data-purpose="bunny-sticker"
        >
          <div className="absolute -top-3 -left-2 text-[#e11d48] animate-bounce text-sm font-bold">
            ❤️
          </div>
          <svg className="drop-shadow-md" fill="none" height="110" viewBox="0 0 120 120" width="105">
            <ellipse cx="44" cy="28" fill="#FFFFFF" rx="8" ry="24" stroke="#262626" strokeWidth="2.5" />
            <ellipse cx="44" cy="28" fill="#FBCFE8" rx="4.5" ry="16" />
            <ellipse cx="76" cy="28" fill="#FFFFFF" rx="8" ry="24" stroke="#262626" strokeWidth="2.5" />
            <ellipse cx="76" cy="28" fill="#FBCFE8" rx="4.5" ry="16" />
            <ellipse cx="60" cy="62" fill="#FFFFFF" rx="34" ry="30" stroke="#262626" strokeWidth="2.5" />
            <ellipse cx="40" cy="68" fill="#FDA4AF" rx="5.5" ry="3.5" />
            <ellipse cx="80" cy="68" fill="#FDA4AF" rx="5.5" ry="3.5" />
            <circle cx="48" cy="58" fill="#262626" r="3.2" />
            <circle cx="72" cy="58" fill="#262626" r="3.2" />
            <path d="M57 65 Q60 67 63 65" fill="none" stroke="#262626" strokeLinecap="round" strokeWidth="2" />
            <path d="M60 67 L60 70" stroke="#262626" strokeLinecap="round" strokeWidth="2" />
            <circle cx="36" cy="88" fill="#FFFFFF" r="7" stroke="#262626" strokeWidth="2" />
            <circle cx="84" cy="88" fill="#FFFFFF" r="7" stroke="#262626" strokeWidth="2" />
            <rect fill="#FFFFFF" height="32" rx="3" stroke="#262626" strokeWidth="2" width="48" x="36" y="80" />
            <path d="M37 81 L60 98 L83 81" fill="none" stroke="#262626" strokeLinejoin="round" strokeWidth="2" />
            <path d="M60 98 m -6, -4 a 4,4 0 0,1 6,0 a 4,4 0 0,1 6,0 q 0,5 -6,8 q -6,-3 -6,-8 z" fill="#E11D48" />
          </svg>
        </div>

        {/* Bottom-Right Kawaii Teddy Bear Hugging Big Red Heart */}
        <div
          onClick={() => handleStickerTap('Teddy Bear Heart')}
          title="Click the cozy teddy bear!"
          className="absolute bottom-6 right-4 sm:right-12 md:right-24 z-20 transition-transform duration-300 hover:scale-115 cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.45s' }}
          data-purpose="teddy-bear-sticker"
        >
          <svg className="drop-shadow-md" fill="none" height="115" viewBox="0 0 120 120" width="115">
            <circle cx="34" cy="38" fill="#D97706" r="14" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="34" cy="38" fill="#FDE68A" r="7.5" />
            <circle cx="86" cy="38" fill="#D97706" r="14" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="86" cy="38" fill="#FDE68A" r="7.5" />
            <circle cx="60" cy="58" fill="#E59B40" r="30" stroke="#451a03" strokeWidth="2.5" />
            <ellipse cx="60" cy="67" fill="#FEF3C7" rx="14" ry="10" />
            <ellipse cx="60" cy="63" fill="#451a03" rx="4" ry="2.5" />
            <path d="M60 65.5 L60 69.5 M57 70 Q60 72.5 63 70" fill="none" stroke="#451a03" strokeLinecap="round" strokeWidth="2" />
            <circle cx="48" cy="55" fill="#1C1917" r="4" />
            <circle cx="46.5" cy="53.5" fill="#FFFFFF" r="1.5" />
            <circle cx="72" cy="55" fill="#1C1917" r="4" />
            <circle cx="70.5" cy="53.5" fill="#FFFFFF" r="1.5" />
            <line stroke="#78350F" strokeLinecap="round" strokeWidth="1.8" x1="39" x2="43" y1="46" y2="50" />
            <line stroke="#78350F" strokeLinecap="round" strokeWidth="1.8" x1="44" x2="48" y1="46" y2="50" />
            <path d="M52 108 C26 92 20 74 38 68 C47 65 52 72 52 72 C52 72 57 65 66 68 C84 74 78 92 52 108 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <ellipse cx="40" cy="74" fill="#FFFFFF" fillOpacity="0.3" rx="4" ry="2" transform="rotate(-30 40 74)" />
            <circle cx="36" cy="80" fill="#E59B40" r="7.5" stroke="#451a03" strokeWidth="2" />
            <circle cx="68" cy="80" fill="#E59B40" r="7.5" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="32" cy="103" fill="#D97706" rx="10" ry="8" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="32" cy="103" fill="#FEF3C7" rx="5" ry="4" />
            <ellipse cx="76" cy="103" fill="#D97706" rx="10" ry="8" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="76" cy="103" fill="#FEF3C7" rx="5" ry="4" />
          </svg>
        </div>

        {/* Right Side Red Pointer Arrow Button */}
        <button
          onClick={handleNextClick}
          aria-label="Next slide"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 animate-next-arrow hover:scale-125 focus:outline-none transition-transform cursor-pointer"
          data-purpose="navigation-next-arrow"
          type="button"
        >
          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#991b1b] drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </button>
      </main>

      {/* Love Keepsake Modal */}
      {showLoveModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowLoveModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl p-6 sm:p-8 shadow-2xl bg-white border-4 border-pink-200 w-11/12 max-w-sm text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
          >
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-3xl mb-3 text-pink-600 shadow-inner">
              📸💖✨
            </div>
            <h3 className="text-2xl font-bold text-[#9f1239] font-['Fredoka'] mb-2">
              Our Forever Keepsake
            </h3>
            <p className="text-slate-600 text-sm mb-6 font-['Nunito']">
              Every picture holds a memory, and every memory holds my whole heart for you! Happy Boyfriend Day! 🥰
            </p>
            <button
              onClick={() => setShowLoveModal(false)}
              className="w-full py-2.5 px-6 rounded-full bg-[#9f1239] hover:bg-[#881337] text-white font-bold text-sm transition-colors duration-200 shadow cursor-pointer font-['Fredoka']"
            >
              Love You to the Moon &amp; Back! 🚀💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
