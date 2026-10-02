import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, Heart, Camera, Upload, Check } from 'lucide-react';
import { sound } from '../utils/sound';
import { useCustomPhotos, fileToDataUrl } from '../utils/photoStore';

interface ScrapbookPageProps {
  onBack: () => void;
  onNext?: () => void;
  onOpenPhotoCustomizer?: (slotId: string) => void;
}

export const ScrapbookPage: React.FC<ScrapbookPageProps> = ({
  onBack,
  onNext,
  onOpenPhotoCustomizer,
}) => {
  const { getUrl, setPhoto, isCustom } = useCustomPhotos();
  const [showNextModal, setShowNextModal] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [activeDragSlot, setActiveDragSlot] = useState<string | null>(null);

  const fileInputRefs = {
    'film-1': useRef<HTMLInputElement>(null),
    'film-2': useRef<HTMLInputElement>(null),
    'film-3': useRef<HTMLInputElement>(null),
    'film-4': useRef<HTMLInputElement>(null),
  };

  const filmMultiInputRef = useRef<HTMLInputElement>(null);

  const handleFilmMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const slotIds = ['film-1', 'film-2', 'film-3', 'film-4'];
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        const dataUrl = await fileToDataUrl(files[i]);
        setPhoto(slotIds[i], dataUrl);
      }
      sound.playVictory();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { x: 0.3, y: 0.5 },
        colors: ['#b91336', '#f48fb1', '#ffffff', '#ffd166'],
      });
    } catch (err) {
      console.error('Failed to multi-upload film photos', err);
    } finally {
      if (filmMultiInputRef.current) filmMultiInputRef.current.value = '';
    }
  };

  const handleFilmDirectUpload = async (slotId: string, file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      setPhoto(slotId, dataUrl);
      sound.playVictory();
      confetti({
        particleCount: 40,
        spread: 65,
        origin: { x: 0.3, y: 0.5 },
        colors: ['#e11d48', '#fda4af', '#f472b6', '#ffffff'],
      });
    } catch (err) {
      console.error('Failed to upload film photo', err);
    }
  };

  // Full letter text for typewriter / progressive animation
  const letterParagraphs = [
    'I don’t know when or how it happened, but somehow you became such a special part of my life. Every little moment with you means so much to me. Your silly talks, our little arguments, the way we annoy each other and then make up—everything about us is precious to me. 🥹❤️',
    'You are someone with whom I can be completely myself and share my feelings without hesitation. We may fight, get annoyed, or misunderstand each other sometimes, but you still hold a very special place in my heart.',
    'I just want us to keep making beautiful memories together, understanding each other, supporting each other, and celebrating even the smallest moments together.',
  ];

  const fullText = letterParagraphs.join('\n\n');
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Smooth typewriter animation effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 2;
      if (index >= fullText.length) {
        setDisplayedChars(fullText.length);
        setIsTypingComplete(true);
        clearInterval(interval);
        sound.playSparkle();
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fbcfe8', '#ffd166', '#ffffff'],
        });
      } else {
        setDisplayedChars(index);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleSkipAnimation = () => {
    setDisplayedChars(fullText.length);
    setIsTypingComplete(true);
    sound.playSparkle();
  };

  const handleNextClick = () => {
    sound.playVictory();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#b91336', '#fca5bc', '#fed7e2', '#ffffff', '#ffd166'],
    });

    if (onNext) {
      onNext();
    } else {
      setShowNextModal(true);
    }
  };

  const handlePhotoClick = (index: number) => {
    setActivePhoto(index);
    sound.playSparkle();
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#fbcfe8', '#ffffff'],
    });
  };

  // Render paragraphs based on displayed characters count
  const renderAnimatedParagraphs = () => {
    let runningCharCount = 0;
    return letterParagraphs.map((para, pIdx) => {
      const paraStart = runningCharCount;
      const paraEnd = paraStart + para.length;
      runningCharCount = paraEnd + 2; // +2 for '\n\n'

      if (displayedChars < paraStart) {
        return null;
      }

      const visibleSlice = para.slice(0, Math.max(0, displayedChars - paraStart));
      const isCurrentTypingPara = displayedChars >= paraStart && displayedChars < paraEnd;

      return (
        <p key={pIdx} className="relative transition-opacity duration-300">
          {visibleSlice}
          {isCurrentTypingPara && !isTypingComplete && (
            <span className="inline-block w-2.5 h-5 ml-1 bg-pink-200/90 rounded-sm animate-pulse align-middle" />
          )}
        </p>
      );
    });
  };

  return (
    <div
      className="flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none relative min-h-screen overflow-x-hidden font-sans"
      style={{
        backgroundColor: '#fce7ec',
        backgroundImage: `
          linear-gradient(90deg, rgba(247, 187, 203, 0.45) 50%, transparent 50%),
          linear-gradient(rgba(247, 187, 203, 0.45) 50%, transparent 50%)
        `,
        backgroundSize: '56px 56px',
      }}
    >
      {/* Top Navigation: Back to Bouquets button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#b91336] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bouquets</span>
        </button>
      </div>

      {/* Decorative Background Flowers */}
      <div
        className="absolute top-10 left-6 sm:left-12 opacity-85 pointer-events-none transform -rotate-12 transition-transform duration-700 hover:rotate-45"
        data-purpose="retro-flower-mint"
      >
        <svg fill="none" height="68" viewBox="0 0 100 100" width="68">
          <circle cx="50" cy="22" fill="#d3f2e3" r="18" />
          <circle cx="50" cy="78" fill="#d3f2e3" r="18" />
          <circle cx="22" cy="50" fill="#d3f2e3" r="18" />
          <circle cx="78" cy="50" fill="#d3f2e3" r="18" />
          <circle cx="30" cy="30" fill="#d3f2e3" r="16" />
          <circle cx="70" cy="30" fill="#d3f2e3" r="16" />
          <circle cx="30" cy="70" fill="#d3f2e3" r="16" />
          <circle cx="70" cy="70" fill="#d3f2e3" r="16" />
          <circle cx="50" cy="50" fill="#ffffff" r="13" />
        </svg>
      </div>

      <div
        className="absolute bottom-8 left-6 sm:left-14 opacity-90 pointer-events-none transform rotate-12"
        data-purpose="retro-flower-yellow"
      >
        <svg fill="none" height="74" viewBox="0 0 100 100" width="74">
          <circle cx="50" cy="22" fill="#fdf0a6" r="19" />
          <circle cx="50" cy="78" fill="#fdf0a6" r="19" />
          <circle cx="22" cy="50" fill="#fdf0a6" r="19" />
          <circle cx="78" cy="50" fill="#fdf0a6" r="19" />
          <circle cx="31" cy="31" fill="#fdf0a6" r="17" />
          <circle cx="69" cy="31" fill="#fdf0a6" r="17" />
          <circle cx="31" cy="69" fill="#fdf0a6" r="17" />
          <circle cx="69" cy="69" fill="#fdf0a6" r="17" />
          <circle cx="50" cy="50" fill="#ffffff" r="13" />
        </svg>
      </div>

      <div
        className="absolute bottom-10 left-[41%] sm:left-[43%] opacity-85 pointer-events-none transform -rotate-6"
        data-purpose="retro-flower-pink"
      >
        <svg fill="none" height="60" viewBox="0 0 100 100" width="60">
          <circle cx="50" cy="22" fill="#fbcfe8" r="18" />
          <circle cx="50" cy="78" fill="#fbcfe8" r="18" />
          <circle cx="22" cy="50" fill="#fbcfe8" r="18" />
          <circle cx="78" cy="50" fill="#fbcfe8" r="18" />
          <circle cx="30" cy="30" fill="#fbcfe8" r="16" />
          <circle cx="70" cy="30" fill="#fbcfe8" r="16" />
          <circle cx="30" cy="70" fill="#fbcfe8" r="16" />
          <circle cx="70" cy="70" fill="#fbcfe8" r="16" />
          <circle cx="50" cy="50" fill="#ffffff" r="12" />
        </svg>
      </div>

      {/* Main Content Scrapbook Canvas */}
      <main className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-6 relative z-10 px-2 sm:px-4 animate-in fade-in zoom-in-95 duration-300">
        {/* Left 2x2 Filmstrip Photo Grid Section */}
        <section aria-label="Couple photo memory gallery" className="flex-shrink-0 w-full max-w-[390px] sm:max-w-[440px] lg:w-[460px]">
          {/* Header Action for Film Strip */}
          <div className="flex items-center justify-between px-3 pb-1.5">
            <span className="text-xs font-bold text-rose-900/80 font-['Fredoka']">🎞️ Film Memories</span>
            <input
              ref={filmMultiInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFilmMultiUpload}
              id="film-multi-upload"
            />
            <button
              onClick={() => filmMultiInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload 4 Photos at Once</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 p-2 sm:p-3" data-purpose="filmstrip-2x2-grid">
            {/* Film Photo 1 (Top Left) */}
            <div
              onClick={() => fileInputRefs['film-1'].current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setActiveDragSlot('film-1');
              }}
              onDragLeave={() => setActiveDragSlot(null)}
              onDrop={(e) => {
                e.preventDefault();
                setActiveDragSlot(null);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFilmDirectUpload('film-1', file);
              }}
              className={`film-card bg-[#151515] p-2 rounded-md border flex flex-col gap-1 relative cursor-pointer group transition-all duration-300 ${
                activeDragSlot === 'film-1'
                  ? 'scale-105 border-rose-500 ring-2 ring-rose-400 rotate-0'
                  : 'border-[#2d2d2d] transform -rotate-[3deg] hover:rotate-0 hover:scale-105'
              }`}
              data-purpose="film-frame-1"
              title="Click or Drop photo 1 (Outdoors with pink flower) 📷"
            >
              <input
                ref={fileInputRefs['film-1']}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFilmDirectUpload('film-1', file);
                }}
                className="hidden"
              />
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#a8a8a8] tracking-wider">
                <span>FUJI 400</span>
                <span>21A</span>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1.5 pl-0.5 pr-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
                <div className="w-full h-32 sm:h-36 overflow-hidden bg-neutral-800 rounded-[2px] relative">
                  <img
                    alt="Couple memory 1"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                    src={getUrl('film-1')}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-2 py-1 rounded-full bg-white/95 text-rose-600 font-bold text-[10px] shadow flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{isCustom('film-1') ? 'Change' : 'Upload'}</span>
                    </span>
                  </div>
                  {isCustom('film-1') && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold">
                      ✓ Saved
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 pr-0.5 pl-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
              </div>
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#8a8a8a]">
                <span>KODAK FILM</span>
                <span>● 22</span>
              </div>
            </div>

            {/* Film Photo 2 (Top Right) */}
            <div
              onClick={() => fileInputRefs['film-2'].current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setActiveDragSlot('film-2');
              }}
              onDragLeave={() => setActiveDragSlot(null)}
              onDrop={(e) => {
                e.preventDefault();
                setActiveDragSlot(null);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFilmDirectUpload('film-2', file);
              }}
              className={`film-card bg-[#151515] p-2 rounded-md border flex flex-col gap-1 relative cursor-pointer group transition-all duration-300 ${
                activeDragSlot === 'film-2'
                  ? 'scale-105 border-rose-500 ring-2 ring-rose-400 rotate-0'
                  : 'border-[#2d2d2d] transform rotate-[2.5deg] hover:rotate-0 hover:scale-105'
              }`}
              data-purpose="film-frame-2"
              title="Click or Drop photo 2 (Domino's selfie in red dress) 📷"
            >
              <input
                ref={fileInputRefs['film-2']}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFilmDirectUpload('film-2', file);
                }}
                className="hidden"
              />
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#a8a8a8] tracking-wider">
                <span>COLOR 400</span>
                <span>22A</span>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1.5 pl-0.5 pr-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
                <div className="w-full h-32 sm:h-36 overflow-hidden bg-neutral-800 rounded-[2px] relative">
                  <img
                    alt="Couple memory 2"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                    src={getUrl('film-2')}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-2 py-1 rounded-full bg-white/95 text-rose-600 font-bold text-[10px] shadow flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{isCustom('film-2') ? 'Change' : 'Upload'}</span>
                    </span>
                  </div>
                  {isCustom('film-2') && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold">
                      ✓ Saved
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 pr-0.5 pl-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
              </div>
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#8a8a8a]">
                <span>SAFETY FILM</span>
                <span>● 23</span>
              </div>
            </div>

            {/* Film Photo 3 (Bottom Left) */}
            <div
              onClick={() => fileInputRefs['film-3'].current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setActiveDragSlot('film-3');
              }}
              onDragLeave={() => setActiveDragSlot(null)}
              onDrop={(e) => {
                e.preventDefault();
                setActiveDragSlot(null);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFilmDirectUpload('film-3', file);
              }}
              className={`film-card bg-[#151515] p-2 rounded-md border flex flex-col gap-1 relative cursor-pointer group transition-all duration-300 ${
                activeDragSlot === 'film-3'
                  ? 'scale-105 border-rose-500 ring-2 ring-rose-400 rotate-0'
                  : 'border-[#2d2d2d] transform rotate-[2deg] hover:rotate-0 hover:scale-105'
              }`}
              data-purpose="film-frame-3"
              title="Click or Drop photo 3 (Close-up beaming smile) 📷"
            >
              <input
                ref={fileInputRefs['film-3']}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFilmDirectUpload('film-3', file);
                }}
                className="hidden"
              />
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#a8a8a8] tracking-wider">
                <span>FUJI 400</span>
                <span>23A</span>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1.5 pl-0.5 pr-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
                <div className="w-full h-32 sm:h-36 overflow-hidden bg-neutral-800 rounded-[2px] relative">
                  <img
                    alt="Couple memory 3"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                    src={getUrl('film-3')}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-2 py-1 rounded-full bg-white/95 text-rose-600 font-bold text-[10px] shadow flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{isCustom('film-3') ? 'Change' : 'Upload'}</span>
                    </span>
                  </div>
                  {isCustom('film-3') && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold">
                      ✓ Saved
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 pr-0.5 pl-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
              </div>
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#8a8a8a]">
                <span>KODAK FILM</span>
                <span>● 24</span>
              </div>
            </div>

            {/* Film Photo 4 (Bottom Right) */}
            <div
              onClick={() => fileInputRefs['film-4'].current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setActiveDragSlot('film-4');
              }}
              onDragLeave={() => setActiveDragSlot(null)}
              onDrop={(e) => {
                e.preventDefault();
                setActiveDragSlot(null);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFilmDirectUpload('film-4', file);
              }}
              className={`film-card bg-[#151515] p-2 rounded-md border flex flex-col gap-1 relative cursor-pointer group transition-all duration-300 ${
                activeDragSlot === 'film-4'
                  ? 'scale-105 border-rose-500 ring-2 ring-rose-400 rotate-0'
                  : 'border-[#2d2d2d] transform -rotate-[2.5deg] hover:rotate-0 hover:scale-105'
              }`}
              data-purpose="film-frame-4"
              title="Click or Drop photo 4 (Thumbs up & peace sign) 📷"
            >
              <input
                ref={fileInputRefs['film-4']}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFilmDirectUpload('film-4', file);
                }}
                className="hidden"
              />
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#a8a8a8] tracking-wider">
                <span>COLOR 400</span>
                <span>24A</span>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1.5 pl-0.5 pr-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
                <div className="w-full h-32 sm:h-36 overflow-hidden bg-neutral-800 rounded-[2px] relative">
                  <img
                    alt="Couple memory 4"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                    src={getUrl('film-4')}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-2 py-1 rounded-full bg-white/95 text-rose-600 font-bold text-[10px] shadow flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{isCustom('film-4') ? 'Change' : 'Upload'}</span>
                    </span>
                  </div>
                  {isCustom('film-4') && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold">
                      ✓ Saved
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 pr-0.5 pl-1 py-0.5">
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                  <div className="sprocket-hole" />
                </div>
              </div>
              <div className="flex justify-between items-center px-1 text-[7.5px] font-mono text-[#8a8a8a]">
                <span>SAFETY FILM</span>
                <span>● 25</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Romantic Scalloped Card Section */}
        <section aria-label="Love letter note" className="flex-1 max-w-2xl relative w-full mt-2 lg:mt-0">
          {/* Scalloped Card Container */}
          <article className="scalloped-love-card text-white px-7 sm:px-12 py-9 sm:py-11 relative overflow-visible" data-purpose="love-card">
            {/* Inner Romantic Stitching Border & Filigree Accents */}
            <div className="absolute inset-3 sm:inset-4 rounded-[36px] border-2 border-dashed border-pink-200/40 pointer-events-none z-0 shadow-[inset_0_0_15px_rgba(255,192,203,0.12)]" />
            <div className="absolute top-5 left-5 text-pink-200/40 text-xs pointer-events-none select-none z-0">✦</div>
            <div className="absolute top-5 right-5 text-pink-200/40 text-xs pointer-events-none select-none z-0">✦</div>
            <div className="absolute bottom-5 left-5 text-pink-200/40 text-xs pointer-events-none select-none z-0">✦</div>

            {/* Header: Dear Love */}
            <header className="mb-4 sm:mb-5 relative z-10 flex items-center justify-between">
              <div>
                <h1 className="font-romantic-heading text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">
                  Dear Love....
                </h1>
                {/* Romantic Flourish Accent Under Heading */}
                <div className="flex items-center gap-2 mt-2 opacity-80 max-w-xs">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-pink-200/80 via-pink-200/40 to-transparent" />
                  <span className="text-pink-200 text-sm">❦</span>
                  <div className="h-[1px] w-8 bg-pink-200/40" />
                </div>
              </div>

              {!isTypingComplete && (
                <button
                  onClick={handleSkipAnimation}
                  className="text-xs text-pink-200/80 hover:text-white bg-black/20 hover:bg-black/30 px-3 py-1 rounded-full transition-all cursor-pointer font-['Fredoka']"
                >
                  Skip Animation
                </button>
              )}
            </header>

            {/* Animated Body Text Content */}
            <div className="font-letter-body text-xl sm:text-2xl text-pink-50/95 leading-relaxed tracking-wide space-y-4 relative z-10 min-h-[260px]">
              {renderAnimatedParagraphs()}

              {/* Sign-off revealed once typing reaches towards the end */}
              {displayedChars > fullText.length * 0.85 && (
                <div className="pt-2 text-right sm:text-left animate-in fade-in duration-500">
                  <p className="text-2xl sm:text-3xl text-white font-bold italic tracking-wide drop-shadow-sm font-letter-body">
                    With all my heart,<br />
                    <span className="text-pink-100">your girl ♡</span>
                  </p>
                </div>
              )}
            </div>

            {/* Next Button Container */}
            <div className="mt-8 flex justify-center sm:justify-end items-center pr-2 sm:pr-8 relative z-10">
              <button
                onClick={handleNextClick}
                className="group inline-flex items-center gap-1.5 bg-[#960927] hover:bg-[#7e061f] active:scale-95 text-white font-bold text-base sm:text-lg px-7 py-2.5 rounded-full shadow-lg border border-pink-300/40 transition-all duration-200 cursor-pointer font-['Fredoka']"
                data-purpose="next-step-button"
                type="button"
              >
                <span>Next</span>
                <span className="transform group-hover:translate-x-1 transition-transform font-bold text-xl">&gt;</span>
              </button>
            </div>
          </article>

          {/* BEGIN: Flower Bouquet Illustration Overlay */}
          <div
            className="absolute -right-4 sm:-right-8 -bottom-10 sm:-bottom-12 w-32 sm:w-44 md:w-48 pointer-events-none filter drop-shadow-xl z-20"
            data-purpose="illustrated-flower-bouquet"
          >
            <svg className="w-full h-auto" fill="none" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 90 L100 220 L160 90 Z" fill="#f87171" opacity="0.15" />
              <path d="M50 85 C35 110 82 205 100 225 C118 205 165 110 150 85 C130 95 110 88 100 88 C90 88 70 95 50 85 Z" fill="#ffb4c2" stroke="#d63353" strokeLinejoin="round" strokeWidth="3" />
              <circle cx="82" cy="62" fill="#fb7185" r="17" />
              <circle cx="82" cy="62" fill="#f43f5e" r="11" />
              <circle cx="82" cy="62" fill="#ffe4e6" r="5" />
              <circle cx="118" cy="62" fill="#fb7185" r="17" />
              <circle cx="118" cy="62" fill="#f43f5e" r="11" />
              <circle cx="118" cy="62" fill="#ffe4e6" r="5" />
              <circle cx="100" cy="42" fill="#e11d48" r="18" />
              <circle cx="100" cy="42" fill="#be123c" r="12" />
              <circle cx="100" cy="42" fill="#fff1f2" r="5.5" />
              <circle cx="62" cy="74" fill="#f43f5e" r="15" />
              <circle cx="62" cy="74" fill="#fda4af" r="9" />
              <circle cx="138" cy="74" fill="#f43f5e" r="15" />
              <circle cx="138" cy="74" fill="#fda4af" r="9" />
              <circle cx="100" cy="76" fill="#fda4af" r="15" />
              <circle cx="100" cy="76" fill="#e11d48" r="8" />
              <path d="M48 88 L100 220 L76 100" stroke="#c01535" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M152 88 L100 220 L124 100" stroke="#c01535" strokeLinecap="round" strokeWidth="2.5" />
              <ellipse cx="90" cy="180" fill="#e11d48" rx="14" ry="7" transform="rotate(-20 90 180)" />
              <ellipse cx="110" cy="180" fill="#e11d48" rx="14" ry="7" transform="rotate(20 110 180)" />
              <circle cx="100" cy="180" fill="#9f1239" r="5" />
              <path d="M96 183 C92 195 86 205 84 212" stroke="#be123c" strokeLinecap="round" strokeWidth="3" />
              <path d="M104 183 C108 195 114 205 116 212" stroke="#be123c" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </div>
        </section>
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
              💌💖
            </div>
            <h3 className="text-2xl font-bold text-[#b91336] font-['Fredoka'] mb-2">
              Always &amp; Forever!
            </h3>
            <p className="text-slate-600 text-sm mb-6 font-['Nunito']">
              Every memory with you is stamped into my heart. Happy Boyfriend Day to the most amazing guy in the world!
            </p>
            <button
              onClick={() => setShowNextModal(false)}
              className="w-full py-2.5 px-6 rounded-full bg-[#b91336] hover:bg-[#960927] text-white font-bold text-sm transition-colors duration-200 shadow cursor-pointer font-['Fredoka']"
            >
              I Love You More! 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
