import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Heart, Camera } from 'lucide-react';
import { sound } from './utils/sound';
import { WhyNoPage } from './components/WhyNoPage';
import { BouquetPage } from './components/BouquetPage';
import { HappyBoyfriendCardPage } from './components/HappyBoyfriendCardPage';
import { ScrapbookPage } from './components/ScrapbookPage';
import { LoveYouKeepsakePage } from './components/LoveYouKeepsakePage';
import { SongRemindsMePage } from './components/SongRemindsMePage';
import { YoureMyScrapbookPage } from './components/YoureMyScrapbookPage';
import { SpideyKittyLovePage } from './components/SpideyKittyLovePage';
import { PhotoCustomizerModal } from './components/PhotoCustomizerModal';

interface FloatingClickHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

type PageState =
  | 'gift'
  | 'why-no'
  | 'bouquets'
  | 'happy-card'
  | 'scrapbook'
  | 'keepsake'
  | 'song'
  | 'youre-my'
  | 'thankful';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('gift');
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [clickHearts, setClickHearts] = useState<FloatingClickHeart[]>([]);
  const [unicornWiggle, setUnicornWiggle] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [customizerSlotId, setCustomizerSlotId] = useState<string>('youre-my-main');

  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenPhotoCustomizer = (slotId: string = 'youre-my-main') => {
    sound.playPop();
    setCustomizerSlotId(slotId);
    setIsPhotoModalOpen(true);
  };

  // Playful phrases for the "No" button when hovered
  const noButtonTexts = [
    "No",
    "Are you sure? 🥺",
    "Wait, really? 💔",
    "Think again! 🦄",
    "Wrong button! 💕",
    "Don't click me! 👉👈",
  ];

  const currentNoText = noButtonTexts[Math.min(noHoverCount, noButtonTexts.length - 1)];

  // Scale of YES button increases slightly as they hesitate
  const yesScale = Math.min(1 + noHoverCount * 0.06, 1.35);

  const toggleSound = () => {
    const newState = !isSoundOn;
    setIsSoundOn(newState);
    sound.enabled = newState;
    if (newState) {
      sound.playPop();
    }
  };

  // Screen click effect - spawn a sweet heart / sparkle
  const handleScreenClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    const colors = ['#d81b43', '#fca5bc', '#f9abbf', '#ff70a6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newHeart: FloatingClickHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      size: Math.floor(Math.random() * 12) + 16,
      color: randomColor,
    };

    setClickHearts((prev) => [...prev.slice(-12), newHeart]);
    sound.playSparkle();

    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  // Playful gentle tease when hovering over "No"
  const handleNoHover = () => {
    sound.playBoop();
    setIsDodging(true);

    const maxOffset = Math.min(60, 20 + noHoverCount * 10);
    const randomX = (Math.random() * 2 - 1) * maxOffset;
    const randomY = (Math.random() * 2 - 1) * (maxOffset * 0.5);

    setNoPos({ x: randomX, y: randomY });
    setNoHoverCount((prev) => prev + 1);

    setTimeout(() => setIsDodging(false), 200);
  };

  // Clicking "No" navigates to the "Why did you click NO!" page!
  const handleNoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playWhimper();
    setCurrentPage('why-no');
  };

  // Joyful acceptance -> navigates to the Bouquet Selector page!
  const handleYesClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playVictory();
    setCurrentPage('bouquets');

    // Multi-stage confetti burst
    const end = Date.now() + 2.2 * 1000;
    const colors = ['#d81b43', '#fca5bc', '#fed7e2', '#ffffff', '#ff4d6d'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleUnicornClick = () => {
    sound.playPop();
    setUnicornWiggle(true);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#fca5bc', '#fed7e2', '#ffccd5'],
    });
    setTimeout(() => setUnicornWiggle(false), 800);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center m-0 select-none text-slate-800"
    >
      {/* Top Floating Controls (Floating Top-Right) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Customize Photos Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenPhotoCustomizer();
          }}
          title="Add your own photos to the scrapbooks & keepsakes"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#b91c37] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <Camera className="w-4 h-4 text-[#b91c37]" />
          <span className="hidden sm:inline">Add Your Photos</span>
          <span className="sm:hidden">Photos</span>
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          title={isSoundOn ? 'Mute sound effects' : 'Unmute sound effects'}
          aria-label={isSoundOn ? 'Mute sound effects' : 'Unmute sound effects'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200 text-[#d81b43] text-sm font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          <span className="hidden sm:inline text-xs font-bold font-['Fredoka']">
            {isSoundOn ? 'Sound On' : 'Muted'}
          </span>
        </button>
      </div>

      {/* Floating Click Hearts / Sparkles Overlay */}
      {clickHearts.map((heart) => (
        <div
          key={heart.id}
          className="pointer-events-none fixed z-40 transition-all duration-700 ease-out"
          style={{
            left: heart.x - heart.size / 2,
            top: heart.y - heart.size / 2,
            animation: 'heartPop 1s ease-out forwards',
          }}
        >
          <Heart
            className="fill-current drop-shadow-md"
            style={{ width: heart.size, height: heart.size, color: heart.color }}
          />
        </div>
      ))}

      {/* PAGE 2: WHY DID YOU CLICK NO! */}
      {currentPage === 'why-no' && (
        <WhyNoPage
          onBackToGift={() => {
            sound.playPop();
            setCurrentPage('gift');
          }}
        />
      )}

      {/* PAGE 3: BOUQUET SELECTOR (AFTER CLICKING YES) */}
      {currentPage === 'bouquets' && (
        <BouquetPage
          onBack={() => {
            sound.playPop();
            setCurrentPage('gift');
          }}
          onOpenCard={() => {
            sound.playVictory();
            setCurrentPage('happy-card');
          }}
          onOpenScrapbook={() => {
            sound.playVictory();
            setCurrentPage('scrapbook');
          }}
          onOpenKeepsake={() => {
            sound.playVictory();
            setCurrentPage('keepsake');
          }}
          onOpenSong={() => {
            sound.playVictory();
            setCurrentPage('song');
          }}
        />
      )}

      {/* PAGE 7: SONG THAT REMINDS ME OF YOU (FROM ARROW BESIDE MIDDLE BOUQUET) */}
      {currentPage === 'song' && (
        <SongRemindsMePage
          onBack={() => {
            sound.playPop();
            setCurrentPage('bouquets');
          }}
          onNext={() => {
            sound.playVictory();
            setCurrentPage('youre-my');
          }}
        />
      )}

      {/* PAGE 8: YOU'RE MY SCRAPBOOK PAGE (AFTER CLICKING ARROW ON SONG PAGE) */}
      {currentPage === 'youre-my' && (
        <YoureMyScrapbookPage
          onBack={() => {
            sound.playPop();
            setCurrentPage('song');
          }}
          onNext={() => {
            sound.playVictory();
            setCurrentPage('thankful');
          }}
          onOpenPhotoCustomizer={handleOpenPhotoCustomizer}
        />
      )}

      {/* PAGE 9: SPIDEY & KITTY ROMANTIC SCRAPBOOK (LAST PAGE OPEN AFTER ARROW OF 2ND LAST PAGE) */}
      {currentPage === 'thankful' && (
        <SpideyKittyLovePage
          onBack={() => {
            sound.playPop();
            setCurrentPage('youre-my');
          }}
          onReplay={() => {
            sound.playPop();
            setCurrentPage('gift');
          }}
          onViewKeepsake={() => {
            sound.playVictory();
            setCurrentPage('keepsake');
          }}
        />
      )}

      {/* PAGE 4: HAPPY BOYFRIEND'S DAY CARD (AFTER CLICKING FIRST BOUQUET) */}
      {currentPage === 'happy-card' && (
        <HappyBoyfriendCardPage
          onBack={() => {
            sound.playPop();
            setCurrentPage('bouquets');
          }}
          onNext={() => {
            sound.playVictory();
            setCurrentPage('scrapbook');
          }}
        />
      )}

      {/* PAGE 5: SCRAPBOOK DEAR LOVE (AFTER CLICKING SECOND BOUQUET) */}
      {currentPage === 'scrapbook' && (
        <ScrapbookPage
          onBack={() => {
            sound.playPop();
            setCurrentPage('bouquets');
          }}
          onNext={() => {
            sound.playVictory();
            setCurrentPage('keepsake');
          }}
          onOpenPhotoCustomizer={handleOpenPhotoCustomizer}
        />
      )}

      {/* PAGE 6: LOVE YOU KEEPSAKE PHOTO COLLAGE (AFTER CLICKING THIRD BOUQUET) */}
      {currentPage === 'keepsake' && (
        <LoveYouKeepsakePage
          onBack={() => {
            sound.playPop();
            setCurrentPage('bouquets');
          }}
          onOpenPhotoCustomizer={handleOpenPhotoCustomizer}
        />
      )}

      {/* Universal Photo Customizer Modal */}
      <PhotoCustomizerModal
        isOpen={isPhotoModalOpen}
        initialSlotId={customizerSlotId}
        onClose={() => setIsPhotoModalOpen(false)}
      />

      {/* PAGE 1: PLEASE ACCEPT THE GIFT */}
      {currentPage === 'gift' && (
        <div className="gingham-bg min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center animate-in fade-in duration-300">
          {/* Decorative Stars Layer */}
          <div className="stars-layer absolute inset-0 pointer-events-none overflow-hidden" data-purpose="decorative-stars">
            {/* Star Top Left */}
            <svg
              onClick={(e) => {
                e.stopPropagation();
                sound.playSparkle();
              }}
              className="absolute w-7 h-7 text-[#fca5bc] fill-current floating-star opacity-80 cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
              style={{ top: '8%', left: '8%', animationDelay: '0s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Upper Mid Left */}
            <svg
              className="absolute w-5 h-5 text-[#f9abbf] fill-current floating-star opacity-75"
              style={{ top: '25%', left: '16%', animationDelay: '1.2s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Top Center */}
            <svg
              className="absolute w-6 h-6 text-[#fca5bc] fill-current floating-star opacity-85"
              style={{ top: '4%', left: '63%', animationDelay: '2.1s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Top Right */}
            <svg
              className="absolute w-7 h-7 text-[#fca5bc] fill-current floating-star opacity-80"
              style={{ top: '14%', right: '7%', animationDelay: '0.8s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Far Right */}
            <svg
              className="absolute w-5 h-5 text-[#f9abbf] fill-current floating-star opacity-70"
              style={{ top: '48%', right: '5%', animationDelay: '2.7s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Bottom Right */}
            <svg
              className="absolute w-6 h-6 text-[#fca5bc] fill-current floating-star opacity-85"
              style={{ bottom: '12%', right: '18%', animationDelay: '1.5s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Bottom Mid Left */}
            <svg
              className="absolute w-7 h-7 text-[#fca5bc] fill-current floating-star opacity-80"
              style={{ bottom: '15%', left: '32%', animationDelay: '3.2s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Star Bottom Far Left */}
            <svg
              className="absolute w-6 h-6 text-[#f9abbf] fill-current floating-star opacity-75"
              style={{ bottom: '6%', left: '3%', animationDelay: '0.5s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.8 6.5 7.2.6-5.4 4.8 1.6 7-6.2-3.6-6.2 3.6 1.6-7L2 9.1l7.2-.6L12 2z" />
            </svg>

            {/* Pastel Floating Hearts & Twinkles */}
            <svg
              className="absolute w-7 h-7 text-[#fca5bc] fill-current anim-drift-slow pointer-events-none"
              style={{ top: '20%', left: '10%', animationDelay: '0.6s', filter: 'drop-shadow(0 2px 6px rgba(252,165,188,0.45))' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            <svg
              className="absolute w-6 h-6 text-[#f9abbf] fill-current anim-drift-med pointer-events-none"
              style={{ top: '68%', left: '14%', animationDelay: '1.8s', filter: 'drop-shadow(0 2px 5px rgba(249,171,191,0.4))' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            <svg
              className="absolute w-8 h-8 text-[#fca5bc] fill-current anim-drift-slow pointer-events-none"
              style={{ top: '26%', right: '28%', animationDelay: '2.4s', filter: 'drop-shadow(0 2px 7px rgba(252,165,188,0.5))' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            <svg
              className="absolute w-6 h-6 text-[#fca5bc] fill-current anim-drift-fast pointer-events-none"
              style={{ bottom: '24%', right: '10%', animationDelay: '0.9s', filter: 'drop-shadow(0 2px 5px rgba(252,165,188,0.45))' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            <svg
              className="absolute w-6 h-6 text-[#fed7e2] fill-current anim-sparkle pointer-events-none"
              style={{ top: '18%', left: '45%', animationDelay: '0.4s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 0c.5 6 5.5 11.5 12 12-6.5.5-11.5 6-12 12-.5-6-5.5-11.5-12-12 6.5-.5 11.5-6 12-12z" />
            </svg>

            <svg
              className="absolute w-7 h-7 text-[#fed7e2] fill-current anim-sparkle pointer-events-none"
              style={{ bottom: '30%', left: '24%', animationDelay: '1.6s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 0c.5 6 5.5 11.5 12 12-6.5.5-11.5 6-12 12-.5-6-5.5-11.5-12-12 6.5-.5 11.5-6 12-12z" />
            </svg>

            <svg
              className="absolute w-6 h-6 text-[#fed7e2] fill-current anim-sparkle pointer-events-none"
              style={{ top: '36%', right: '14%', animationDelay: '2.2s' }}
              viewBox="0 0 24 24"
            >
              <path d="M12 0c.5 6 5.5 11.5 12 12-6.5.5-11.5 6-12 12-.5-6-5.5-11.5-12-12 6.5-.5 11.5-6 12-12z" />
            </svg>
          </div>

          {/* Main Stage */}
          <main className="relative z-10 w-full max-w-5xl px-6 py-8 flex flex-col items-center justify-center">
            {/* Title Prompt */}
            <h1
              className="kawaii-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-8 md:mb-14 drop-shadow-sm select-none"
              data-purpose="dialog-title"
            >
              Please accept the gift
            </h1>

            {/* Center Interaction & Character Section */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20">
              {/* Action Buttons */}
              <div
                className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 order-2 md:order-1 md:pr-4 relative"
                data-purpose="action-buttons"
              >
                {/* Button: Yes */}
                <button
                  onClick={handleYesClick}
                  style={{
                    transform: `scale(${yesScale})`,
                  }}
                  className="btn-kawaii bg-[#d81b43] text-white text-xl sm:text-2xl font-bold px-9 py-3 sm:px-12 sm:py-3.5 rounded-full cursor-pointer relative overflow-hidden group tracking-wide transition-transform duration-200"
                  type="button"
                  aria-label="Accept the gift"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Yes
                    {noHoverCount > 0 && <Heart className="w-5 h-5 fill-white inline animate-pulse" />}
                  </span>
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-full pointer-events-none" />
                </button>

                {/* Button: No (Clicking navigates to "Why did you click NO!") */}
                <div
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    transition: isDodging ? 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.3s ease',
                  }}
                  className="relative inline-block"
                >
                  <button
                    onMouseEnter={handleNoHover}
                    onClick={handleNoClick}
                    className="btn-kawaii bg-[#d81b43] text-white text-xl sm:text-2xl font-bold px-9 py-3 sm:px-12 sm:py-3.5 rounded-full cursor-pointer relative overflow-hidden group tracking-wide"
                    type="button"
                    aria-label="Decline the gift"
                  >
                    <span className="relative z-10 text-center whitespace-nowrap">
                      {currentNoText}
                    </span>
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-full pointer-events-none" />
                  </button>
                </div>
              </div>

              {/* Kawaii Unicorn Character Illustration */}
              <div
                onClick={handleUnicornClick}
                title="Click the adorable unicorn!"
                className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex-shrink-0 flex items-center justify-center order-1 md:order-2 unicorn-float cursor-pointer group ${
                  unicornWiggle ? 'animate-bounce' : ''
                }`}
                data-purpose="kawaii-unicorn-illustration"
              >
                <div className="absolute -bottom-2 w-52 h-8 bg-pink-300/35 rounded-full blur-md pointer-events-none" />

                <img
                  alt="Adorable kawaii baby unicorn holding a big plump pink heart"
                  className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHuiNd4McS0ofyUOmDdOItEtLuRxXt24rfrZZrl5sVQl39XGYFLrMdFdNjFD6gscgPxa4Le0-sRUor6LS3-3pwg2qqNdFc4uqu08k95UB-Rq83e0XQStkxdYxwCiy6aV2aSaQG59r0e3RlCTMGecWOqbMtcu1e063Fr8igtQHeFbNpxyZWbGXuXTCVHZa3fEqKkULaVY7mbP6fvBVvx3qZn4mebFDYstXFWjLqCBdf_z7i5JNquvT9"
                />

                <div className="absolute -top-3 -right-2 pointer-events-none anim-drift-med z-20" style={{ animationDelay: '0.3s' }}>
                  <svg className="w-6 h-6 text-[#fca5bc] fill-current filter drop-shadow" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                <div className="absolute top-2 left-6 pointer-events-none anim-sparkle z-20" style={{ animationDelay: '1.1s' }}>
                  <svg className="w-5 h-5 text-[#fed7e2] fill-current filter drop-shadow" viewBox="0 0 24 24">
                    <path d="M12 0c.5 6 5.5 11.5 12 12-6.5.5-11.5 6-12 12-.5-6-5.5-11.5-12-12 6.5-.5 11.5-6 12-12z" />
                  </svg>
                </div>

                <div className="absolute bottom-8 -left-3 pointer-events-none anim-sparkle z-20" style={{ animationDelay: '2.5s' }}>
                  <svg className="w-5 h-5 text-[#fed7e2] fill-current filter drop-shadow" viewBox="0 0 24 24">
                    <path d="M12 0c.5 6 5.5 11.5 12 12-6.5.5-11.5 6-12 12-.5-6-5.5-11.5-12-12 6.5-.5 11.5-6 12-12z" />
                  </svg>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
