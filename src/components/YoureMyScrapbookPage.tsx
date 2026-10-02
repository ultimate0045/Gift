import React, { useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Camera, Check, Sparkles, Upload } from 'lucide-react';
import { sound } from '../utils/sound';
import { useCustomPhotos, fileToDataUrl } from '../utils/photoStore';

interface YoureMyScrapbookPageProps {
  onBack: () => void;
  onNext?: () => void;
  onOpenPhotoCustomizer?: (slotId: string) => void;
}

const NICKNAMES = [
  { text: 'My Personal Problem 😂', color: '#1b324d', emoji: '😂' },
  { text: 'My Happiness ❤️', color: '#b91c37', emoji: '❤️' },
  { text: 'My Safe Place 🥹', color: '#1b324d', emoji: '🥹' },
  { text: 'My Favourite Human', color: '#1b324d', emoji: '✨' },
  { text: 'My Biggest Headache 😭😂', color: '#1b324d', emoji: '🤦‍♂️' },
  { text: 'My Partner in Crime', color: '#1b324d', emoji: '🕵️‍♀️' },
  { text: 'My Comfort Person', color: '#b91c37', emoji: '🧸' },
  { text: 'My Forever Teammate', color: '#1b324d', emoji: '🤝' },
  { text: 'The One Who Knows All My Drama', color: '#1b324d', emoji: '🍿' },
];

export const YoureMyScrapbookPage: React.FC<YoureMyScrapbookPageProps> = ({
  onBack,
  onNext,
  onOpenPhotoCustomizer,
}) => {
  const { getUrl, isCustom, setPhoto } = useCustomPhotos();
  const mainPhotoUrl = getUrl('youre-my-main');
  const hasCustomMain = isCustom('youre-my-main');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDirectUpload = async (file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      setPhoto('youre-my-main', dataUrl);
      sound.playVictory();
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { x: 0.35, y: 0.5 },
        colors: ['#e11d48', '#fda4af', '#f472b6', '#ffffff'],
      });
    } catch (err) {
      console.error('Failed to upload couple photo', err);
    }
  };

  const handleItemClick = (item: (typeof NICKNAMES)[0]) => {
    sound.playPop();
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#fca5bb', '#f797b4', '#c01737', '#ffffff'],
    });
  };

  const handleNextClick = () => {
    sound.playVictory();
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { x: 0.9, y: 0.5 },
      colors: ['#c01737', '#fca5bb', '#1b324d', '#ffffff'],
    });
    if (onNext) {
      onNext();
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-2 sm:p-6 select-none font-sans relative overflow-x-hidden">
      {/* Top Navigation: Back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#1b324d] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Scrapbook Page Ratio Container matching design */}
      <main
        className="relative w-full max-w-5xl min-h-[600px] md:aspect-[16/10] bg-gingham-blue rounded-xl shadow-2xl overflow-hidden border-4 sm:border-8 border-white flex flex-col justify-between p-5 sm:p-10 md:p-12 animate-in fade-in zoom-in-95 duration-300"
        data-purpose="scrapbook-page-canvas"
      >
        {/* BEGIN: Floating Background Stars */}
        <div className="absolute inset-0 pointer-events-none z-0" data-purpose="star-decorations">
          {/* Top Left Stars */}
          <svg
            className="scrapbook-star absolute top-6 left-6 w-9 h-9 rotate-[-12deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute top-8 left-[35%] w-10 h-10 rotate-[18deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute top-12 left-[48%] w-11 h-11 rotate-[-8deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>

          {/* Top Right Stars */}
          <svg
            className="scrapbook-star absolute top-7 right-7 w-9 h-9 rotate-[15deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute top-28 right-[24%] w-10 h-10 rotate-[-15deg] opacity-80"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>

          {/* Bottom Stars */}
          <svg
            className="scrapbook-star absolute bottom-12 left-6 w-11 h-11 rotate-[8deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute bottom-6 left-[30%] w-10 h-10 rotate-[-10deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute bottom-24 right-[38%] w-10 h-10 rotate-[22deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute bottom-20 right-[15%] w-11 h-11 rotate-[-6deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          <svg
            className="scrapbook-star absolute bottom-5 right-12 w-10 h-10 rotate-[25deg]"
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </div>
        {/* END: Floating Background Stars */}

        {/* BEGIN: Scrapbook Content Layout */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* Header Script Section: "You're my" */}
          <header className="w-full pl-2 sm:pl-6 md:pl-16 pt-0 sm:pt-2" data-purpose="page-title">
            <h1 className="font-brush text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-scriptNavy tracking-wide -rotate-[2deg] drop-shadow-sm select-none">
              You&apos;re my
            </h1>
          </header>

          {/* Main Central Section: Picture Frame + Romantic/Funny Nickname List */}
          <section
            className="w-full flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-4 sm:gap-6 mt-2 sm:mt-3"
            data-purpose="main-spread"
          >
            {/* Left Side: Scrapbook Picture Frame */}
            <div
              className="md:col-span-7 flex flex-col justify-center items-center pl-0 sm:pl-2 md:pl-8 cursor-pointer group"
              data-purpose="couple-photo-container"
              onClick={handlePhotoClick}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleDirectUpload(file);
              }}
              title="Click or Drop your couple photo! 📷💕"
            >
              {/* Hidden Direct File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleDirectUpload(file);
                }}
                className="hidden"
                id="couple-photo-input"
              />

              {/* Outer Pink Check Washi/Frame Border */}
              <div
                className={`relative bg-gingham-pink p-3 sm:p-5 md:p-6 rounded-sm shadow-md border max-w-[430px] w-full transform transition-all duration-300 ${
                  isDragging
                    ? 'scale-105 border-rose-500 ring-4 ring-rose-300 rotate-0'
                    : '-rotate-[1deg] group-hover:rotate-0 group-hover:scale-[1.02] border-pink-200/70'
                }`}
              >
                {/* Inner Torn Paper Masked Couple Photo */}
                <div className="torn-photo-border bg-white p-1 sm:p-1.5 overflow-hidden relative">
                  <img
                    alt="Loving couple portrait smiling together"
                    className="w-full h-48 sm:h-64 md:h-72 object-cover object-center rounded-sm filter contrast-[1.02] brightness-[1.02] pointer-events-none"
                    src={mainPhotoUrl}
                  />

                  {/* Camera overlay button on hover */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-rose-600 font-bold text-xs shadow-md flex items-center gap-1.5 font-['Fredoka']">
                      <Camera className="w-4 h-4 text-rose-500" />
                      <span>{hasCustomMain ? 'Tap to Replace Photo' : 'Tap or Drop Your Photo!'}</span>
                    </span>
                  </div>

                  {hasCustomMain && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                      <Check className="w-3 h-3" />
                      <span>Saved!</span>
                    </div>
                  )}
                </div>
                {/* Tape Accent Decor (Top Left corner of frame) */}
                <div className="absolute -top-3 left-6 w-16 h-6 bg-white/70 backdrop-blur-sm border border-white/50 rotate-[-12deg] shadow-xs pointer-events-none"></div>
              </div>

              {/* Explicit Tap Button under the Frame */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-3 px-4 py-1.5 rounded-full bg-white/90 hover:bg-rose-500 hover:text-white border border-rose-200 text-rose-600 font-bold text-xs shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer font-['Fredoka'] transition-all active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {hasCustomMain ? 'Change Couple Photo 📷' : '📸 Tap to Choose Couple Photo'}
                </span>
              </button>
            </div>

            {/* Right Side: Custom Romantic & Humorous Keyword List */}
            <article
              className="md:col-span-5 flex flex-col justify-center items-center sm:items-start pl-2 sm:pl-6 md:pl-8 space-y-1.5 md:space-y-2.5"
              data-purpose="keyword-vertical-list"
            >
              <ul className="text-center sm:text-left flex flex-col space-y-1 sm:space-y-1.5 md:space-y-2">
                {NICKNAMES.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleItemClick(item)}
                    className="font-italicSerif italic font-semibold text-scriptNavy text-sm sm:text-base md:text-lg lg:text-xl tracking-wide hover:scale-105 active:scale-95 transition-transform cursor-pointer hover:text-[#b91c37]"
                    title={`Click ${item.text}`}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
        {/* END: Scrapbook Content Layout */}

        {/* BEGIN: Scrapbook Navigation Arrow */}
        {/* Distinctive Origami/Sticker Style Crimson Next Arrow */}
        <aside
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
          data-purpose="page-navigation"
        >
          <button
            onClick={handleNextClick}
            aria-label="Next scrapbook page"
            className="group relative flex items-center justify-center p-2 focus:outline-none transition-transform hover:scale-110 active:scale-95 cursor-pointer animate-next-arrow"
            type="button"
            title="Next Keepsake 💖"
          >
            {/* Custom faceted arrow shape matching design */}
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-md"
              fill="none"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Main faceted dark red arrow body */}
              <polygon fill="#c01737" points="15,10 95,50 15,90 35,50" />
              {/* Subtle shaded facet for origami look */}
              <polygon fill="#a0122d" points="35,50 95,50 15,90" />
            </svg>
          </button>
        </aside>
        {/* END: Scrapbook Navigation Arrow */}
      </main>
    </div>
  );
};
