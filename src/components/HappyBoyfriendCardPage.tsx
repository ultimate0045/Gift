import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';
import { sound } from '../utils/sound';

interface HappyBoyfriendCardPageProps {
  onBack: () => void;
  onNext?: () => void;
}

export const HappyBoyfriendCardPage: React.FC<HappyBoyfriendCardPageProps> = ({ onBack, onNext }) => {
  const [showNextModal, setShowNextModal] = useState(false);

  const handleNextClick = () => {
    sound.playVictory();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x: 0.9, y: 0.5 },
      colors: ['#c91834', '#fca5bc', '#fed7e2', '#ffffff', '#ffd166'],
    });

    if (onNext) {
      onNext();
    } else {
      setShowNextModal(true);
    }
  };

  const handleStickerTap = () => {
    sound.playSparkle();
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#fca5bc', '#fed7e2', '#ffffff'],
    });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 select-none overflow-x-hidden font-sans relative"
      style={{
        backgroundColor: '#f4f8fc',
        backgroundImage: `
          linear-gradient(90deg, rgba(162, 203, 237, 0.42) 50%, transparent 50%),
          linear-gradient(rgba(162, 203, 237, 0.42) 50%, transparent 50%)
        `,
        backgroundSize: '56px 56px',
      }}
    >
      {/* Navigation: Back to Bouquets button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#c91834] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bouquets</span>
        </button>
      </div>

      {/* Main 16:10 or 16:9 ratio greeting card window echoing exact layout */}
      <main
        className="relative w-full max-w-[1020px] aspect-[16/10] min-h-[580px] bg-transparent rounded-2xl overflow-hidden flex flex-col justify-between items-center py-6 px-6 sm:px-10 animate-in fade-in zoom-in-95 duration-300"
        data-purpose="greeting-card-canvas"
      >
        {/* BEGIN: BackgroundFloatingStars */}
        <div className="absolute inset-0 pointer-events-none z-0" data-purpose="decorative-stars">
          {/* Top edge star */}
          <svg className="floating-star absolute top-4 left-[64%] w-10 h-10 text-pink-300 opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
          {/* Top right star */}
          <svg className="floating-star absolute top-12 right-6 w-9 h-9 text-pink-300 opacity-75" fill="currentColor" style={{ animationDelay: '1s' }} viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
          {/* Top left behind web star */}
          <svg className="floating-star absolute top-6 left-[12%] w-8 h-8 text-pink-200 opacity-70" fill="currentColor" style={{ animationDelay: '2s' }} viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
          {/* Middle right star */}
          <svg className="floating-star absolute top-[52%] right-9 w-9 h-9 text-pink-300 opacity-80" fill="currentColor" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
          {/* Bottom center star */}
          <svg className="floating-star absolute bottom-5 left-[48%] w-11 h-11 text-pink-300 opacity-85" fill="currentColor" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
          {/* Bottom lower-left star */}
          <svg className="floating-star absolute bottom-8 right-[36%] w-9 h-9 text-pink-300 opacity-80" fill="currentColor" style={{ animationDelay: '2.8s' }} viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
          {/* Far bottom-left star */}
          <svg className="floating-star absolute bottom-6 left-1 w-9 h-9 text-pink-300 opacity-80" fill="currentColor" style={{ animationDelay: '3.2s' }} viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
          </svg>
        </div>
        {/* END: BackgroundFloatingStars */}

        {/* BEGIN: TopIllustrationBar */}
        <div className="w-full flex justify-between items-start z-10" data-purpose="top-illustrations">
          {/* Top Left: Spidey hanging upside down meeting Hello Kitty */}
          <div
            onClick={handleStickerTap}
            title="Click for love sparkles!"
            className="relative -top-2 left-2 sm:left-4 sticker-pop scale-110 sm:scale-125 origin-top-left transition-transform hover:scale-130 duration-200 cursor-pointer"
            data-purpose="spidey-kissing-kitty"
          >
            <svg fill="none" height="195" viewBox="0 0 220 195" width="220" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#1f2937" strokeWidth="2.5" x1="58" x2="58" y1="0" y2="40" />
              <g transform="translate(26, 32)">
                <path d="M18 6 L12 28 C12 36 32 40 40 40 C48 40 54 36 54 28 L48 6 Z" fill="#0284c7" stroke="#111827" strokeLinejoin="round" strokeWidth="3" />
                <path d="M22 6 L22 24 C28 26 38 26 44 24 L44 6 Z" fill="#e11d48" stroke="#111827" strokeLinejoin="round" strokeWidth="2.5" />
                <line stroke="#111827" strokeWidth="1.8" x1="33" x2="33" y1="6" y2="24" />
                <line stroke="#111827" strokeWidth="1.8" x1="22" x2="44" y1="15" y2="15" />
                <circle cx="33" cy="62" fill="#e11d48" r="30" stroke="#111827" strokeWidth="3.5" />
                <line stroke="#111827" strokeLinecap="round" strokeWidth="1.8" x1="33" x2="33" y1="32" y2="92" />
                <line stroke="#111827" strokeLinecap="round" strokeWidth="1.8" x1="3" x2="63" y1="62" y2="62" />
                <line stroke="#111827" strokeLinecap="round" strokeWidth="1.8" x1="12" x2="54" y1="41" y2="83" />
                <line stroke="#111827" strokeLinecap="round" strokeWidth="1.8" x1="12" x2="54" y1="83" y2="41" />
                <ellipse cx="33" cy="62" fill="none" rx="14" ry="14" stroke="#111827" strokeWidth="1.8" />
                <ellipse cx="33" cy="62" fill="none" rx="23" ry="23" stroke="#111827" strokeWidth="1.8" />
                <path d="M25 56 C26 46 12 48 10 58 C8 68 22 70 25 56 Z" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
                <path d="M41 56 C40 46 54 48 56 58 C58 68 44 70 41 56 Z" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
              </g>
              <g transform="translate(86, 44)">
                <path d="M28 85 L20 135 C20 138 48 140 58 135 L50 85 Z" fill="#ffffff" stroke="#111827" strokeLinejoin="round" strokeWidth="3" />
                <path d="M22 100 C30 106 48 106 56 100" fill="none" stroke="#111827" strokeWidth="2.5" />
                <path d="M20 120 C32 126 48 126 58 120" fill="none" stroke="#111827" strokeWidth="2.5" />
                <ellipse cx="30" cy="138" fill="#ffffff" rx="8" ry="5" stroke="#111827" strokeWidth="2.8" />
                <ellipse cx="48" cy="138" fill="#ffffff" rx="8" ry="5" stroke="#111827" strokeWidth="2.8" />
                <path d="M26 92 C14 96 10 110 18 116 C22 120 28 112 30 102 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                <g transform="translate(-10, 2) rotate(-8 45 42)">
                  <ellipse cx="44" cy="46" fill="#ffffff" rx="42" ry="32" stroke="#111827" strokeWidth="3.5" />
                  <path d="M12 28 C9 14 16 8 26 18 Z" fill="#ffffff" stroke="#111827" strokeLinejoin="round" strokeWidth="3.5" />
                  <path d="M62 18 C72 8 79 14 76 28 Z" fill="#ffffff" stroke="#111827" strokeLinejoin="round" strokeWidth="3.5" />
                  <g transform="translate(18, 4) rotate(-10)">
                    <ellipse cx="14" cy="14" fill="#fb7185" rx="7" ry="7" stroke="#111827" strokeWidth="2.5" />
                    <path d="M14 14 C4 4 2 24 14 17 Z" fill="#fb7185" stroke="#111827" strokeWidth="2.5" />
                    <path d="M14 14 C24 4 26 24 14 17 Z" fill="#fb7185" stroke="#111827" strokeWidth="2.5" />
                  </g>
                  <path d="M18 48 C21 44 26 44 29 48" fill="none" stroke="#111827" strokeLinecap="round" strokeWidth="3" />
                  <ellipse cx="48" cy="46" fill="#111827" rx="3.5" ry="5" />
                  <ellipse cx="32" cy="52" fill="#facc15" rx="4.5" ry="3.5" stroke="#111827" strokeWidth="2" />
                  <line stroke="#111827" strokeLinecap="round" strokeWidth="2.5" x1="12" x2="2" y1="48" y2="46" />
                  <line stroke="#111827" strokeLinecap="round" strokeWidth="2.5" x1="13" x2="3" y1="53" y2="54" />
                  <line stroke="#111827" strokeLinecap="round" strokeWidth="2.5" x1="14" x2="4" y1="58" y2="62" />
                  <line stroke="#111827" strokeLinecap="round" strokeWidth="2.5" x1="52" x2="62" y1="48" y2="46" />
                  <line stroke="#111827" strokeLinecap="round" strokeWidth="2.5" x1="51" x2="61" y1="53" y2="54" />
                  <line stroke="#111827" strokeLinecap="round" strokeWidth="2.5" x1="50" x2="60" y1="58" y2="62" />
                </g>
              </g>
            </svg>
          </div>

          {/* Top Right: Kitty wearing Spidey mask & Spidey hugging closely */}
          <div
            onClick={handleStickerTap}
            title="Click for love sparkles!"
            className="relative -top-2 right-2 sm:right-6 sticker-pop scale-110 sm:scale-125 origin-top-right transition-transform hover:scale-130 duration-200 cursor-pointer"
            data-purpose="hugging-kitty-spidey"
          >
            <svg fill="none" height="175" viewBox="0 0 190 175" width="190" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(42, 6)">
                <path d="M22 34 C12 20 0 14 0 6 C0 -2 8 -6 16 -2 C20 0 22 4 22 4 C22 4 24 0 28 -2 C36 -6 44 -2 44 6 C44 14 32 20 22 34 Z" fill="#ffffff" stroke="#ffffff" strokeLinejoin="round" strokeWidth="6" />
                <path d="M22 34 C12 20 0 14 0 6 C0 -2 8 -6 16 -2 C20 0 22 4 22 4 C22 4 24 0 28 -2 C36 -6 44 -2 44 6 C44 14 32 20 22 34 Z" fill="#dc2626" stroke="#111827" strokeLinejoin="round" strokeWidth="2.8" />
              </g>
              <g transform="translate(16, 42)">
                <g transform="translate(4, 18)">
                  <path d="M24 65 L18 100 C24 104 46 104 50 100 L44 65 Z" fill="#0284c7" stroke="#111827" strokeLinejoin="round" strokeWidth="3" />
                  <ellipse cx="26" cy="103" fill="#ffffff" rx="7" ry="4" stroke="#111827" strokeWidth="2.5" />
                  <ellipse cx="42" cy="103" fill="#ffffff" rx="7" ry="4" stroke="#111827" strokeWidth="2.5" />
                  <ellipse cx="34" cy="38" fill="#e11d48" rx="34" ry="26" stroke="#111827" strokeWidth="3" />
                  <path d="M8 24 C5 12 12 8 20 18 Z" fill="#e11d48" stroke="#111827" strokeWidth="3" />
                  <path d="M50 18 C58 8 65 12 62 24 Z" fill="#e11d48" stroke="#111827" strokeWidth="3" />
                  <line stroke="#111827" strokeWidth="1.6" x1="34" x2="34" y1="12" y2="64" />
                  <line stroke="#111827" strokeWidth="1.6" x1="4" x2="64" y1="38" y2="38" />
                  <ellipse cx="34" cy="38" fill="none" rx="14" ry="10" stroke="#111827" strokeWidth="1.6" />
                  <path d="M16 38 C18 28 30 30 30 40 C30 46 18 46 16 38 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                  <path d="M52 38 C50 28 38 30 38 40 C38 46 50 46 52 38 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                </g>
                <g transform="translate(56, 12)">
                  <ellipse cx="32" cy="36" fill="#e11d48" rx="28" ry="25" stroke="#111827" strokeWidth="3" />
                  <g transform="translate(42, 6)">
                    <circle cx="8" cy="8" fill="#fb7185" r="5" stroke="#111827" strokeWidth="2.2" />
                    <path d="M8 8 C0 2 0 14 8 9 Z" fill="#fb7185" stroke="#111827" strokeWidth="2.2" />
                    <path d="M8 8 C16 2 16 14 8 9 Z" fill="#fb7185" stroke="#111827" strokeWidth="2.2" />
                  </g>
                  <line stroke="#111827" strokeWidth="1.6" x1="32" x2="32" y1="11" y2="61" />
                  <line stroke="#111827" strokeWidth="1.6" x1="6" x2="58" y1="36" y2="36" />
                  <ellipse cx="32" cy="36" fill="none" rx="14" ry="11" stroke="#111827" strokeWidth="1.6" />
                  <path d="M16 36 C18 26 28 28 28 38 C28 44 18 44 16 36 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                  <path d="M48 36 C46 26 36 28 36 38 C36 44 46 44 48 36 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                  <path d="M18 61 L14 105 C20 108 44 108 48 105 L44 61 Z" fill="#0284c7" stroke="#111827" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M14 66 C-4 72 -8 86 6 88 C16 90 22 78 20 68 Z" fill="#e11d48" stroke="#111827" strokeWidth="3" />
                  <ellipse cx="22" cy="107" fill="#e11d48" rx="7" ry="4" stroke="#111827" strokeWidth="2.5" />
                  <ellipse cx="40" cy="107" fill="#e11d48" rx="7" ry="4" stroke="#111827" strokeWidth="2.5" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        {/* END: TopIllustrationBar */}

        {/* BEGIN: MainCenterStickerText */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20" data-purpose="center-greeting">
          <div className="text-center flex flex-col items-center leading-[1.05] tracking-wide -mt-2">
            <span className="sticker-text text-5xl sm:text-6xl md:text-7xl font-bold py-1">
              Happy
            </span>
            <span className="sticker-text text-5xl sm:text-7xl md:text-8xl font-bold py-1">
              Boyfriend&apos;s
            </span>
            <span className="sticker-text text-5xl sm:text-6xl md:text-7xl font-bold py-1">
              Day
            </span>
          </div>
        </div>
        {/* END: MainCenterStickerText */}

        {/* BEGIN: NextButtonArrow */}
        <div className="absolute right-4 sm:right-9 top-1/2 -translate-y-1/2 z-30 pointer-events-auto" data-purpose="interactive-arrow-button">
          <button
            onClick={handleNextClick}
            aria-label="Next slide"
            className="group relative flex items-center justify-center p-2 rounded-full focus:outline-none transition-transform hover:scale-125 active:scale-95 duration-200 cursor-pointer"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md text-[#991b1b] group-hover:text-[#b91c1c] transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3.5 L20 12 L5 20.5 L8.5 12 Z" />
            </svg>
            <span className="absolute right-3.5 top-3.5 w-2 h-2 bg-pink-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        {/* END: NextButtonArrow */}

        {/* BEGIN: BottomIllustrationBar */}
        <div className="w-full flex justify-between items-end z-10 mt-auto" data-purpose="bottom-illustrations">
          {/* Bottom Left: Heart Frame with Kitty and Spidey looking at each other */}
          <div
            onClick={handleStickerTap}
            title="Click for love sparkles!"
            className="relative bottom-1 left-2 sm:left-4 sticker-pop scale-110 sm:scale-125 origin-bottom-left transition-transform hover:scale-130 duration-200 cursor-pointer"
            data-purpose="heart-frame-kitty-spidey"
          >
            <svg fill="none" height="190" viewBox="0 0 220 190" width="220" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="heartClip">
                  <path d="M105 168 C40 120 10 90 10 50 C10 20 34 6 62 6 C82 6 97 18 105 28 C113 18 128 6 148 6 C176 6 200 20 200 50 C200 90 170 120 105 168 Z" />
                </clipPath>
              </defs>
              <path d="M105 174 C36 122 6 92 6 48 C6 16 32 0 62 0 C83 0 98 12 105 24 C112 12 127 0 148 0 C178 0 204 16 204 48 C204 92 174 122 105 174 Z" fill="#ffe4e6" stroke="#f472b6" strokeLinejoin="round" strokeWidth="7" />
              <g clipPath="url(#heartClip)">
                <g transform="translate(18, 55)">
                  <path d="M30 65 L24 100 C32 104 54 104 58 100 L54 65 Z" fill="#ffffff" stroke="#111827" strokeWidth="3" />
                  <ellipse cx="44" cy="40" fill="#ffffff" rx="34" ry="26" stroke="#111827" strokeWidth="3.2" />
                  <path d="M18 24 C14 12 22 8 30 18 Z" fill="#ffffff" stroke="#111827" strokeWidth="3.2" />
                  <path d="M60 18 C68 8 76 12 72 24 Z" fill="#ffffff" stroke="#111827" strokeWidth="3.2" />
                  <g transform="translate(60, 10)">
                    <ellipse cx="6" cy="6" fill="#e11d48" rx="4" ry="4" stroke="#111827" strokeWidth="2" />
                    <path d="M6 6 C0 1 0 11 6 7 Z" fill="#e11d48" stroke="#111827" strokeWidth="2" />
                    <path d="M6 6 C12 1 12 11 6 7 Z" fill="#e11d48" stroke="#111827" strokeWidth="2" />
                  </g>
                  <ellipse cx="38" cy="42" fill="#111827" rx="3.5" ry="4.5" />
                  <ellipse cx="56" cy="42" fill="#111827" rx="3.5" ry="4.5" />
                  <ellipse cx="48" cy="48" fill="#facc15" rx="4" ry="3" stroke="#111827" strokeWidth="1.8" />
                  <line stroke="#111827" strokeWidth="2" x1="24" x2="14" y1="42" y2="40" />
                  <line stroke="#111827" strokeWidth="2" x1="25" x2="15" y1="47" y2="47" />
                  <line stroke="#111827" strokeWidth="2" x1="68" x2="78" y1="42" y2="40" />
                  <line stroke="#111827" strokeWidth="2" x1="67" x2="77" y1="47" y2="47" />
                </g>
                <g transform="translate(100, 58)">
                  <path d="M22 62 L18 100 C24 104 46 104 50 100 L44 62 Z" fill="#0284c7" stroke="#111827" strokeWidth="3" />
                  <circle cx="34" cy="38" fill="#e11d48" r="28" stroke="#111827" strokeWidth="3.2" />
                  <line stroke="#111827" strokeWidth="1.8" x1="34" x2="34" y1="10" y2="66" />
                  <line stroke="#111827" strokeWidth="1.8" x1="6" x2="62" y1="38" y2="38" />
                  <ellipse cx="34" cy="38" fill="none" rx="14" ry="14" stroke="#111827" strokeWidth="1.8" />
                  <path d="M16 38 C18 28 28 30 28 40 C28 46 18 46 16 38 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                  <path d="M50 38 C48 28 38 30 38 40 C38 46 48 46 50 38 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.8" />
                </g>
              </g>
            </svg>
          </div>

          {/* Bottom Right: Gym Workout Duo - Spidey lifting Barbell & Kitty with Dumbbells */}
          <div
            onClick={handleStickerTap}
            title="Click for love sparkles!"
            className="relative bottom-1 right-2 sm:right-4 sticker-pop scale-110 sm:scale-125 origin-bottom-right transition-transform hover:scale-130 duration-200 cursor-pointer"
            data-purpose="gym-workout-spidey-kitty"
          >
            <svg fill="none" height="175" viewBox="0 0 340 175" width="340" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(8, 85)">
                <path d="M6 60 L6 10 L16 10 L16 60" fill="none" stroke="#475569" strokeLinecap="round" strokeWidth="4.5" />
                <path d="M0 60 L24 60" stroke="#475569" strokeLinecap="round" strokeWidth="5" />
                <circle cx="11" cy="24" fill="#ef4444" r="10" stroke="#111827" strokeWidth="2" />
                <circle cx="11" cy="46" fill="#3b82f6" r="12" stroke="#111827" strokeWidth="2" />
              </g>

              {/* Spider-Man Lifting Heavy Barbell */}
              <g transform="translate(68, 30)">
                <line stroke="#334155" strokeWidth="5" x1="0" x2="110" y1="20" y2="20" />
                <rect x="0" y="6" width="12" height="28" rx="3" fill="#ef4444" stroke="#111827" strokeWidth="2.5" />
                <rect x="98" y="6" width="12" height="28" rx="3" fill="#ef4444" stroke="#111827" strokeWidth="2.5" />
                <rect x="12" y="10" width="8" height="20" rx="2" fill="#3b82f6" stroke="#111827" strokeWidth="2" />
                <rect x="90" y="10" width="8" height="20" rx="2" fill="#3b82f6" stroke="#111827" strokeWidth="2" />

                <path d="M35 55 L30 22 L38 22" fill="none" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
                <path d="M75 55 L80 22 L72 22" fill="none" stroke="#e11d48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />

                <circle cx="55" cy="52" fill="#e11d48" r="22" stroke="#111827" strokeWidth="3" />
                <line stroke="#111827" strokeWidth="1.5" x1="55" x2="55" y1="30" y2="74" />
                <line stroke="#111827" strokeWidth="1.5" x1="33" x2="77" y1="52" y2="52" />
                <ellipse cx="55" cy="52" fill="none" rx="11" ry="11" stroke="#111827" strokeWidth="1.5" />
                <path d="M43 50 C45 42 51 44 51 52 C51 56 43 56 43 50 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.5" />
                <path d="M67 50 C65 42 59 44 59 52 C59 56 67 56 67 50 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.5" />

                <path d="M42 74 L38 105 C46 108 64 108 72 105 L68 74 Z" fill="#0284c7" stroke="#111827" strokeWidth="3" />
                <path d="M46 74 L46 96 C50 98 60 98 64 96 L64 74 Z" fill="#e11d48" stroke="#111827" strokeWidth="2.2" />
                <ellipse cx="44" cy="115" fill="#e11d48" rx="8" ry="5" stroke="#111827" strokeWidth="2.5" />
                <ellipse cx="66" cy="115" fill="#e11d48" rx="8" ry="5" stroke="#111827" strokeWidth="2.5" />
              </g>

              {/* Hello Kitty Workout Partner with Dumbbells */}
              <g transform="translate(200, 48)">
                <path d="M36 68 L30 102 C38 106 58 106 66 102 L60 68 Z" fill="#fb7185" stroke="#111827" strokeWidth="3" />
                <ellipse cx="38" cy="106" fill="#ffffff" rx="8" ry="5" stroke="#111827" strokeWidth="2.5" />
                <ellipse cx="58" cy="106" fill="#ffffff" rx="8" ry="5" stroke="#111827" strokeWidth="2.5" />

                <path d="M34 74 L18 64" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="6" />
                <line stroke="#475569" strokeWidth="3.5" x1="12" x2="22" y1="58" y2="70" />
                <circle cx="12" cy="58" fill="#f43f5e" r="5" stroke="#111827" strokeWidth="1.5" />
                <circle cx="22" cy="70" fill="#f43f5e" r="5" stroke="#111827" strokeWidth="1.5" />

                <path d="M62 74 L78 64" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="6" />
                <line stroke="#475569" strokeWidth="3.5" x1="74" x2="84" y1="70" y2="58" />
                <circle cx="74" cy="70" fill="#f43f5e" r="5" stroke="#111827" strokeWidth="1.5" />
                <circle cx="84" cy="58" fill="#f43f5e" r="5" stroke="#111827" strokeWidth="1.5" />

                <ellipse cx="48" cy="42" fill="#ffffff" rx="34" ry="26" stroke="#111827" strokeWidth="3.2" />
                <path d="M22 26 C18 14 26 10 34 20 Z" fill="#ffffff" stroke="#111827" strokeWidth="3.2" />
                <path d="M62 20 C70 10 78 14 74 26 Z" fill="#ffffff" stroke="#111827" strokeWidth="3.2" />
                <path d="M16 38 C32 32 64 32 80 38" fill="none" stroke="#ef4444" strokeLinecap="round" strokeWidth="4.5" />
                <g transform="translate(64, 12)">
                  <circle cx="6" cy="6" fill="#fb7185" r="5" stroke="#111827" strokeWidth="2" />
                  <path d="M6 6 C0 1 0 11 6 7 Z" fill="#fb7185" stroke="#111827" strokeWidth="2" />
                  <path d="M6 6 C12 1 12 11 6 7 Z" fill="#fb7185" stroke="#111827" strokeWidth="2" />
                </g>
                <ellipse cx="42" cy="45" fill="#111827" rx="3.5" ry="4.5" />
                <ellipse cx="58" cy="45" fill="#111827" rx="3.5" ry="4.5" />
                <ellipse cx="50" cy="51" fill="#facc15" rx="4" ry="3" stroke="#111827" strokeWidth="1.8" />
                <line stroke="#111827" strokeWidth="2" x1="28" x2="18" y1="44" y2="42" />
                <line stroke="#111827" strokeWidth="2" x1="29" x2="19" y1="49" y2="49" />
                <line stroke="#111827" strokeWidth="2" x1="70" x2="80" y1="44" y2="42" />
                <line stroke="#111827" strokeWidth="2" x1="69" x2="79" y1="49" y2="49" />
              </g>
            </svg>
          </div>
        </div>
        {/* END: BottomIllustrationBar */}
      </main>

      {/* Next Modal Prompt */}
      {showNextModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowNextModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl p-6 sm:p-8 shadow-2xl bg-white border-4 border-pink-200 w-11/12 max-w-sm text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
          >
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-3xl mb-3 text-pink-600 shadow-inner">
              🕷️💖🐱
            </div>
            <h3 className="text-2xl font-bold text-[#c91834] font-['Fredoka'] mb-2">
              You&apos;re My Superhero!
            </h3>
            <p className="text-slate-600 text-sm mb-6 font-['Nunito']">
              To my favorite duo in the whole universe — thank you for being the sweetest boyfriend ever!
            </p>
            <button
              onClick={() => setShowNextModal(false)}
              className="w-full py-2.5 px-6 rounded-full bg-[#c91834] hover:bg-[#a81329] text-white font-bold text-sm transition-colors duration-200 shadow cursor-pointer font-['Fredoka']"
            >
              Aww, Love You Too! 🥰
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
