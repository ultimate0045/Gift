import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, ExternalLink, Heart, Music, Pause, Play, Sparkles, X, Youtube } from 'lucide-react';
import { sound } from '../utils/sound';

interface SongRemindsMePageProps {
  onBack: () => void;
  onNext?: () => void;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/i
  );
  return match ? match[1] : null;
}

const DEFAULT_YT_URL = 'https://youtu.be/LMnJp_dSdnw';
const DEFAULT_TITLE = 'Darkhaast - Shivaay';
const DEFAULT_ARTIST = 'Arijit Singh & Sunidhi Chauhan';

export const SongRemindsMePage: React.FC<SongRemindsMePageProps> = ({ onBack, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // YouTube integration state
  const [ytUrl, setYtUrl] = useState(DEFAULT_YT_URL);
  const [ytTitle, setYtTitle] = useState(DEFAULT_TITLE);
  const [ytArtist, setYtArtist] = useState(DEFAULT_ARTIST);
  const [isEmbedMode, setIsEmbedMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputArtist, setInputArtist] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load saved YouTube link from localStorage and server manifest
  useEffect(() => {
    try {
      const stored = localStorage.getItem('boyfriend_day_youtube_song_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.url) setYtUrl(parsed.url);
        if (parsed.title) setYtTitle(parsed.title);
        if (parsed.artist) setYtArtist(parsed.artist);
      }
    } catch {}

    fetch('/images/manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          if (data['youtube-song-url']) setYtUrl(data['youtube-song-url']);
          if (data['youtube-song-title']) setYtTitle(data['youtube-song-title']);
          if (data['youtube-song-artist']) setYtArtist(data['youtube-song-artist']);
        }
      })
      .catch(() => {});
  }, []);

  const videoId = extractYouTubeId(ytUrl) || 'LMnJp_dSdnw';

  useEffect(() => {
    return () => {
      sound.stopSongMusic();
    };
  }, []);

  // Update progress bar smoothly when playing
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying || isEmbedMode) {
      sound.stopSongMusic();
      setIsPlaying(false);
      setIsEmbedMode(false);
    } else {
      sound.stopSongMusic();
      setIsEmbedMode(true);
      setIsPlaying(true);
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#cc1d2f', '#f472b6', '#ffd8df', '#ffffff'],
      });
    }
  };

  const handleKittySpideyClick = () => {
    sound.playSparkle();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.2, y: 0.8 },
      colors: ['#d84d62', '#fca5bc', '#38bdf8', '#ffffff'],
    });
  };

  const handleNextClick = () => {
    sound.playVictory();
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { x: 0.9, y: 0.5 },
      colors: ['#c51b2e', '#f472b6', '#fed7e2', '#ffffff'],
    });
    if (onNext) {
      onNext();
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);
    sound.playPop();
  };

  const handleOpenEditModal = () => {
    setInputUrl(ytUrl);
    setInputTitle(ytTitle);
    setInputArtist(ytArtist);
    setSaveSuccess(false);
    setShowEditModal(true);
  };

  const handleSaveYouTubeLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsSaving(true);
    const newId = extractYouTubeId(inputUrl);
    const finalUrl = inputUrl.trim();
    const finalTitle = inputTitle.trim() || ytTitle || 'Our Song';
    const finalArtist = inputArtist.trim() || ytArtist || 'YouTube';

    try {
      setYtUrl(finalUrl);
      setYtTitle(finalTitle);
      setYtArtist(finalArtist);

      // Save locally
      localStorage.setItem(
        'boyfriend_day_youtube_song_v2',
        JSON.stringify({ url: finalUrl, title: finalTitle, artist: finalArtist })
      );

      // Save to server manifest so all visitors see it
      await fetch('/api/save-yt-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl, title: finalTitle, artist: finalArtist }),
      }).catch(() => {});

      sound.playSparkle();
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#f472b6', '#ffd700', '#ffffff'],
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setShowEditModal(false);
        setSaveSuccess(false);
        setIsEmbedMode(true);
        setIsPlaying(true);
      }, 700);
    } catch (err) {
      console.error('Failed to save YouTube link', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="gingham-bg-song min-h-screen w-full flex items-center justify-center m-0 p-4 select-none relative overflow-x-hidden font-sans text-stone-800">
      {/* Top Navigation: Back to Bouquets button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => {
            sound.stopSongMusic();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#8b1829] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bouquets</span>
        </button>
      </div>

      {/* Main Content Wrapper */}
      <main className="relative w-full max-w-4xl min-h-[640px] flex flex-col items-center justify-between py-6 px-4 animate-in fade-in zoom-in-95 duration-300">
        {/* BEGIN: Decorative Flowers */}
        {/* Flower: Top Left Yellow */}
        <div className="absolute top-6 left-12 md:left-24 pointer-events-none transform -rotate-12 opacity-85 hover:scale-110 transition-transform">
          <svg fill="none" height="44" viewBox="0 0 100 100" width="44">
            <circle cx="50" cy="22" fill="#fde68a" r="20" />
            <circle cx="78" cy="42" fill="#fde68a" r="20" />
            <circle cx="68" cy="76" fill="#fde68a" r="20" />
            <circle cx="32" cy="76" fill="#fde68a" r="20" />
            <circle cx="22" cy="42" fill="#fde68a" r="20" />
            <circle cx="50" cy="50" fill="#f59e0b" r="14" />
          </svg>
        </div>

        {/* Flower: Top Right Yellow */}
        <div className="absolute top-4 right-10 md:right-16 pointer-events-none transform rotate-12 opacity-80 hover:scale-110 transition-transform">
          <svg fill="none" height="48" viewBox="0 0 100 100" width="48">
            <circle cx="50" cy="22" fill="#fef08a" r="20" />
            <circle cx="78" cy="42" fill="#fef08a" r="20" />
            <circle cx="68" cy="76" fill="#fef08a" r="20" />
            <circle cx="32" cy="76" fill="#fef08a" r="20" />
            <circle cx="22" cy="42" fill="#fef08a" r="20" />
            <circle cx="50" cy="50" fill="#d97706" r="13" />
          </svg>
        </div>

        {/* Flower: Pink flower behind title */}
        <div className="absolute top-1 right-[26%] md:right-[32%] pointer-events-none transform rotate-6 opacity-75">
          <svg fill="none" height="42" viewBox="0 0 100 100" width="42">
            <circle cx="50" cy="24" fill="#f472b6" r="18" />
            <circle cx="76" cy="42" fill="#f472b6" r="18" />
            <circle cx="66" cy="74" fill="#f472b6" r="18" />
            <circle cx="34" cy="74" fill="#f472b6" r="18" />
            <circle cx="24" cy="42" fill="#f472b6" r="18" />
            <circle cx="50" cy="50" fill="#fbbf24" r="12" />
          </svg>
        </div>

        {/* Flower: Bottom Left Mint Green */}
        <div className="absolute bottom-4 left-6 md:left-12 pointer-events-none transform rotate-45 opacity-80">
          <svg fill="none" height="46" viewBox="0 0 100 100" width="46">
            <circle cx="50" cy="22" fill="#a7f3d0" r="20" />
            <circle cx="78" cy="42" fill="#a7f3d0" r="20" />
            <circle cx="68" cy="76" fill="#a7f3d0" r="20" />
            <circle cx="32" cy="76" fill="#a7f3d0" r="20" />
            <circle cx="22" cy="42" fill="#a7f3d0" r="20" />
            <circle cx="50" cy="50" fill="#fb7185" r="13" />
          </svg>
        </div>

        {/* Flower: Bottom Right Pale Mint */}
        <div className="absolute bottom-6 right-8 md:right-14 pointer-events-none transform -rotate-12 opacity-80">
          <svg fill="none" height="42" viewBox="0 0 100 100" width="42">
            <circle cx="50" cy="22" fill="#bbf7d0" r="19" />
            <circle cx="78" cy="42" fill="#bbf7d0" r="19" />
            <circle cx="68" cy="76" fill="#bbf7d0" r="19" />
            <circle cx="32" cy="76" fill="#bbf7d0" r="19" />
            <circle cx="22" cy="42" fill="#bbf7d0" r="19" />
            <circle cx="50" cy="50" fill="#f472b6" r="12" />
          </svg>
        </div>
        {/* END: Decorative Flowers */}

        {/* BEGIN: Header Section */}
        <header className="w-full text-center relative z-10 pt-2 mb-3">
          <h1 className="cursive-title text-4xl sm:text-5xl md:text-6xl text-[#522933] font-normal tracking-wide">
            Song that reminds me of you
          </h1>
        </header>
        {/* END: Header Section */}

        {/* BEGIN: YouTube Custom Link Bar */}
        <div className="w-full max-w-[560px] flex items-center justify-between gap-2 mb-2 px-1 z-20">
          <button
            type="button"
            onClick={handleOpenEditModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-rose-50 border border-rose-200 text-[#8b1829] text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer font-['Fredoka'] active:scale-95"
            title="Paste or change your YouTube video link"
          >
            <Youtube className="w-4 h-4 text-red-600 fill-current" />
            <span>Change YouTube Song / Link 🎵</span>
          </button>

          <a
            href={ytUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-semibold text-[#8b1829]/80 hover:text-[#8b1829] hover:underline transition-colors"
            title="Open video on YouTube"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        {/* END: YouTube Custom Link Bar */}

        {/* BEGIN: Video Player Card */}
        <div
          onClick={!isEmbedMode ? togglePlay : undefined}
          className="w-full max-w-[560px] aspect-[16/9.6] bg-black rounded-lg player-shadow overflow-hidden relative group border border-neutral-800 transition-transform duration-300 hover:scale-[1.01]"
          data-purpose="youtube-video-mockup"
          title={isEmbedMode ? 'YouTube Video Playing' : 'Click to play YouTube video'}
        >
          {isEmbedMode ? (
            /* Live YouTube Embed Player */
            <div className="w-full h-full relative bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&playsinline=1`}
                title={ytTitle}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEmbedMode(false);
                  setIsPlaying(false);
                }}
                className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/85 hover:bg-black text-white text-[10px] font-bold z-30 flex items-center gap-1 shadow backdrop-blur-sm cursor-pointer border border-white/20 hover:scale-105 active:scale-95 transition-all"
                title="Switch back to Card View"
              >
                <X className="w-3 h-3" />
                <span>Close Player</span>
              </button>
            </div>
          ) : (
            /* Video Background & Card Poster */
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-black overflow-hidden flex items-center justify-center cursor-pointer">
                {videoId && videoId !== 'AJtDXIazrMo' ? (
                  /* Custom YouTube Video Thumbnail */
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={ytTitle}
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* Monochromatic Artistic Face/Lips SVG Graphic matching Ellie Goulding Cover */
                  <svg
                    className={`w-full h-full object-cover filter contrast-125 transition-opacity duration-500 ${
                      isPlaying ? 'opacity-95' : 'opacity-80'
                    }`}
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 600 360"
                  >
                    <defs>
                      <radialGradient cx="50%" cy="40%" id="faceGrad" r="55%">
                        <stop offset="0%" stopColor="#d6d3d1" />
                        <stop offset="45%" stopColor="#78716c" />
                        <stop offset="85%" stopColor="#1c1917" />
                        <stop offset="100%" stopColor="#0c0a09" />
                      </radialGradient>
                      <linearGradient id="hairDark" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#09090b" />
                        <stop offset="25%" stopColor="#27272a" />
                        <stop offset="50%" stopColor="#e4e4e7" />
                        <stop offset="75%" stopColor="#27272a" />
                        <stop offset="100%" stopColor="#09090b" />
                      </linearGradient>
                    </defs>
                    <rect fill="url(#faceGrad)" height="360" width="600" />
                    <path d="M 0,0 C 120,40 180,180 190,360 L 0,360 Z" fill="#18181b" opacity="0.95" />
                    <path d="M 600,0 C 480,40 420,180 410,360 L 600,360 Z" fill="#18181b" opacity="0.95" />
                    <path d="M 0,50 C 90,120 160,240 170,360 L 0,360 Z" fill="#27272a" opacity="0.7" />
                    <path d="M 600,50 C 510,120 440,240 430,360 L 600,360 Z" fill="#27272a" opacity="0.7" />
                    <path
                      d="M 285,50 C 290,105 280,115 270,120 C 295,124 305,124 330,120 C 320,115 310,105 315,50 Z"
                      fill="#44403c"
                      opacity="0.5"
                    />
                    <ellipse cx="282" cy="120" fill="#1c1917" opacity="0.7" rx="8" ry="4" />
                    <ellipse cx="318" cy="120" fill="#1c1917" opacity="0.7" rx="8" ry="4" />
                    <path
                      d="M 245,150 C 275,142 292,148 300,154 C 308,148 325,142 355,150 C 335,162 318,160 300,162 C 282,160 265,162 245,150 Z"
                      fill="#292524"
                    />
                    <path d="M 255,156 Q 300,152 345,156 Q 300,165 255,156 Z" fill="#f5f5f4" opacity="0.9" />
                    <path
                      d="M 245,155 C 265,188 335,188 355,155 C 330,182 270,182 245,155 Z"
                      fill="#44403c"
                    />
                    <ellipse cx="300" cy="172" fill="#78716c" opacity="0.6" rx="28" ry="6" />
                    <path
                      d="M 250,215 C 280,230 320,230 350,215 C 330,280 270,280 250,215 Z"
                      fill="#1c1917"
                      opacity="0.55"
                    />
                    <path
                      d="M 240,250 C 270,300 330,300 360,250 L 390,360 L 210,360 Z"
                      fill="#0f0f10"
                      opacity="0.8"
                    />
                  </svg>
                )}
              </div>

              {/* Top Overlay: Video Channel & Title */}
              <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-white z-20 pointer-events-none">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-red-600 border border-white/50 flex-shrink-0 overflow-hidden flex items-center justify-center shadow">
                    <Youtube className="w-4 h-4 text-white fill-current" />
                  </div>
                  <div className="truncate text-left font-sans">
                    <p className="text-xs sm:text-sm font-semibold truncate drop-shadow text-neutral-100">
                      {ytTitle}
                    </p>
                    <p className="text-[10px] text-neutral-300 font-normal">{ytArtist}</p>
                  </div>
                </div>
              </div>

              {/* Center YouTube Classic Red Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-14 h-10 sm:w-16 sm:h-11 bg-[#ff0000] rounded-xl flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110">
                  <svg className="w-5 h-5 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Center-Bottom Typography */}
              <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-4">
                <h2 className="text-white text-sm sm:text-base md:text-lg font-bold tracking-[0.18em] uppercase font-['Montserrat',sans-serif] drop-shadow-md line-clamp-1">
                  {ytTitle}
                </h2>
                <h3 className="text-white/95 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-['Montserrat',sans-serif] font-medium mt-0.5 drop-shadow line-clamp-1">
                  {ytArtist}
                </h3>
              </div>

              {/* Bottom Overlay: VEVO & Watch on YouTube */}
              <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-white/90 z-20 text-[10px] sm:text-xs font-sans">
                <span className="font-extrabold tracking-tight text-white/90 text-sm italic font-['Montserrat'] drop-shadow">
                  love
                </span>
                <div className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] flex items-center space-x-1 border border-white/20">
                  <span className="text-neutral-300">Click to</span>
                  <span className="font-bold text-white flex items-center">
                    <svg className="w-3 h-3 text-red-500 fill-current inline mr-0.5" viewBox="0 0 24 24">
                      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 20c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 4c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                    </svg>
                    Play Video
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        {/* END: Video Player Card */}

        {/* BEGIN: Audio Controls Section */}
        <div className="w-full max-w-sm mt-5 mb-3 flex flex-col items-center relative" data-purpose="audio-media-controls">
          {/* Flower Sticker Beside Controls */}
          <div className="absolute -left-6 sm:-left-10 top-0 pointer-events-none transform -rotate-6">
            <svg fill="none" height="36" viewBox="0 0 100 100" width="36">
              <circle cx="50" cy="22" fill="#fef08a" r="20" />
              <circle cx="78" cy="42" fill="#fef08a" r="20" />
              <circle cx="68" cy="76" fill="#fef08a" r="20" />
              <circle cx="32" cy="76" fill="#fef08a" r="20" />
              <circle cx="22" cy="42" fill="#fef08a" r="20" />
              <circle cx="50" cy="50" fill="#be123c" r="13" />
            </svg>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-center space-x-6 sm:space-x-7 text-[#8b1829]">
            {/* Tiny Red Left Dot Control (Favorite) */}
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                sound.playPop();
                if (!isLiked) {
                  confetti({
                    particleCount: 20,
                    spread: 50,
                    origin: { y: 0.75 },
                    colors: ['#b91c1c', '#f472b6'],
                  });
                }
              }}
              aria-label="Favorite"
              className={`w-3.5 h-3.5 rounded-full ${
                isLiked ? 'bg-[#e11d48] scale-125' : 'bg-[#b91c1c]'
              } hover:opacity-80 transition-all cursor-pointer`}
              title="Favorite / Playlist"
            />

            {/* Previous Track Button */}
            <button
              onClick={() => {
                sound.playBoop();
                setProgress(0);
              }}
              aria-label="Previous"
              className="p-1 hover:text-black transition-colors focus:outline-none cursor-pointer"
              title="Previous"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Main Crimson Play Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-13 h-13 sm:w-14 sm:h-14 p-3.5 rounded-full bg-[#cc1d2f] hover:bg-[#b01424] text-white flex items-center justify-center shadow-md shadow-red-900/30 transform active:scale-95 transition cursor-pointer"
              title={isPlaying ? 'Pause song' : 'Play song'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current text-white" />
              ) : (
                <svg className="w-6 h-6 fill-current text-[#1f2937] ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track Button */}
            <button
              onClick={() => {
                sound.playBoop();
                setProgress(100);
              }}
              aria-label="Next"
              className="p-1 hover:text-black transition-colors focus:outline-none cursor-pointer"
              title="Next"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            {/* Tiny Red Right Dot Control (Repeat) */}
            <button
              onClick={() => {
                setIsRepeat(!isRepeat);
                sound.playPop();
              }}
              aria-label="Repeat"
              className={`w-3.5 h-3.5 rounded-full ${
                isRepeat ? 'bg-[#e11d48] scale-125' : 'bg-[#b91c1c]'
              } hover:opacity-80 transition-all cursor-pointer`}
              title="Repeat"
            />
          </div>

          {/* Scrubber Progress Bar */}
          <div
            onClick={handleScrubberClick}
            className="w-48 sm:w-56 mt-4 flex items-center justify-center relative cursor-pointer group py-2"
            title="Track Scrubber"
          >
            <div className="w-full h-[2.5px] bg-[#9e535e] rounded-full relative overflow-visible">
              {/* Active Track Progress */}
              <div
                className="absolute left-0 top-0 h-full bg-[#521b25] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
              {/* Scrubber Handle / Knob */}
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#4c1620] rounded-full border border-pink-200 group-hover:scale-125 transition-transform shadow"
                style={{ left: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        {/* END: Audio Controls Section */}

        {/* BEGIN: Bottom Left Sticker */}
        {/* Heart sticker with Hello Kitty and Spider-Man cuddling illustration */}
        <div
          onClick={handleKittySpideyClick}
          className="absolute left-4 sm:left-12 md:left-24 bottom-20 sm:bottom-16 md:bottom-14 z-30 transform -rotate-12 hover:rotate-0 transition-transform duration-300 drop-shadow-lg cursor-pointer"
          data-purpose="hello-kitty-spiderman-sticker"
          title="Click the cute Hello Kitty & Spider-Man cuddle! 🐱🕷️❤️"
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <svg className="w-full h-full filter drop-shadow-md overflow-visible" viewBox="0 0 200 190">
              {/* Romantic Heart Outline & Background Fill */}
              <path
                d="M 100,165 C 80,140 10,95 10,48 C 10,20 32,5 60,5 C 78,5 93,16 100,28 C 107,16 122,5 140,5 C 168,5 190,20 190,48 C 190,95 120,140 100,165 Z"
                fill="#ffecef"
                stroke="#d84d62"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
              />
              {/* Inner subtle border line for doodle sticker feel */}
              <path
                d="M 100,157 C 82,134 18,92 18,50 C 18,25 38,12 60,12 C 77,12 90,22 98,34 C 99,35 101,35 102,34 C 110,22 123,12 140,12 C 162,12 182,25 182,50 C 182,92 118,134 100,157 Z"
                fill="none"
                opacity="0.45"
                stroke="#f87171"
                strokeWidth="1.5"
              />
              {/* Hello Kitty and Spidey Group Inside Heart (Enlarged & Hugging) */}
              <g id="couple-characters" transform="translate(25, 42)">
                {/* Hello Kitty Character Left */}
                <g id="hello-kitty" transform="translate(0, 5)">
                  {/* Kitty Left Ear */}
                  <polygon
                    fill="#ffffff"
                    points="18,24 28,2 41,18"
                    stroke="#262626"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  {/* Kitty Right Ear */}
                  <polygon
                    fill="#ffffff"
                    points="64,18 78,2 86,24"
                    stroke="#262626"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  {/* Kitty Head Base */}
                  <ellipse cx="52" cy="42" fill="#ffffff" rx="40" ry="31" stroke="#262626" strokeWidth="3" />
                  {/* Red Bow */}
                  <g id="kitty-bow" transform="translate(22, 6)">
                    <circle cx="14" cy="14" fill="#e11d48" r="6" />
                    <ellipse
                      cx="5"
                      cy="10"
                      fill="#ef4444"
                      rx="8"
                      ry="5.5"
                      stroke="#991b1b"
                      strokeWidth="1.5"
                      transform="rotate(-15 5 10)"
                    />
                    <ellipse
                      cx="23"
                      cy="10"
                      fill="#ef4444"
                      rx="8"
                      ry="5.5"
                      stroke="#991b1b"
                      strokeWidth="1.5"
                      transform="rotate(15 23 10)"
                    />
                  </g>
                  {/* Kitty Eyes */}
                  <ellipse cx="36" cy="42" fill="#1e293b" rx="3.5" ry="5" />
                  <ellipse cx="68" cy="42" fill="#1e293b" rx="3.5" ry="5" />
                  {/* Nose */}
                  <ellipse cx="52" cy="51" fill="#f59e0b" rx="4.5" ry="3" />
                  {/* Left Whiskers */}
                  <line stroke="#262626" strokeLinecap="round" strokeWidth="2.5" x1="8" x2="26" y1="38" y2="40" />
                  <line stroke="#262626" strokeLinecap="round" strokeWidth="2.5" x1="7" x2="25" y1="47" y2="46" />
                  <line stroke="#262626" strokeLinecap="round" strokeWidth="2.5" x1="10" x2="27" y1="55" y2="52" />
                  {/* Kitty Body & Cute Blue Overalls */}
                  <path
                    d="M 32,71 C 32,64 72,64 72,71 L 76,88 C 76,91 28,91 28,88 Z"
                    fill="#38bdf8"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />
                  {/* Cute Little Hand Resting on Spidey */}
                  <ellipse cx="70" cy="66" fill="#ffffff" rx="6" ry="5" stroke="#262626" strokeWidth="2" />
                </g>
                {/* Spider-Man Character Right (Snuggling Close) */}
                <g id="spiderman" transform="translate(56, 16)">
                  {/* Spider-Man Head */}
                  <ellipse cx="46" cy="42" fill="#e11d48" rx="34" ry="36" stroke="#9f1239" strokeWidth="3" />
                  {/* Spider Web Patterns */}
                  <line stroke="#881337" strokeWidth="1.5" x1="46" x2="46" y1="6" y2="78" />
                  <line stroke="#881337" strokeWidth="1.5" x1="12" x2="80" y1="42" y2="42" />
                  <path d="M 28,24 Q 46,33 64,24" fill="none" stroke="#881337" strokeWidth="1.5" />
                  <path d="M 20,38 Q 46,50 72,38" fill="none" stroke="#881337" strokeWidth="1.5" />
                  <path d="M 24,56 Q 46,46 68,56" fill="none" stroke="#881337" strokeWidth="1.5" />
                  {/* Spider-Man Iconic Eyes */}
                  {/* Left Eye */}
                  <polygon
                    fill="#ffffff"
                    points="20,34 38,28 35,48"
                    stroke="#18181b"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  {/* Right Eye */}
                  <polygon
                    fill="#ffffff"
                    points="72,34 54,28 57,48"
                    stroke="#18181b"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  {/* Spider-Man Body Hint */}
                  <path
                    d="M 30,76 C 35,66 70,66 75,76 L 78,85 L 28,85 Z"
                    fill="#dc2626"
                    stroke="#9f1239"
                    strokeWidth="2"
                  />
                  <line stroke="#1e293b" strokeWidth="2" x1="46" x2="46" y1="75" y2="85" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        {/* END: Bottom Left Sticker */}

        {/* BEGIN: Navigation Arrow */}
        {/* Solid Crimson Red Right Arrow Button */}
        <aside className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30" data-purpose="next-page-navigation">
          <button
            onClick={handleNextClick}
            aria-label="Next Page"
            className="focus:outline-none transform hover:scale-110 active:scale-95 transition-transform p-2 group cursor-pointer"
            title="Next Keepsake 💖"
          >
            <svg
              className="w-12 h-14 sm:w-16 sm:h-18 fill-[#c51b2e] group-hover:fill-[#9f1222] transition-colors filter drop-shadow"
              viewBox="0 0 100 100"
            >
              {/* Stylized triangular arrow matching screenshot */}
              <polygon points="15,5 95,50 15,95 28,50" />
            </svg>
          </button>
        </aside>
        {/* END: Navigation Arrow */}
      </main>

      {/* Edit YouTube Video Modal */}
      {showEditModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowEditModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl p-6 sm:p-7 shadow-2xl bg-white border-4 border-rose-200 w-full max-w-md text-left flex flex-col animate-in zoom-in-95 duration-200 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Youtube className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#8b1829] font-['Fredoka']">
                    Change YouTube Song
                  </h3>
                  <p className="text-[11px] text-stone-500 font-normal">
                    Paste any YouTube song or romantic video link
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveYouTubeLink} className="mt-4 flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  YouTube Video Link or URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs text-stone-800 placeholder:text-stone-400 font-mono"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Supports standard watch links, youtu.be short links, shorts, or video IDs.
                </span>
              </div>

              {/* Live Preview if ID found */}
              {extractYouTubeId(inputUrl) && (
                <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200/80 flex items-center gap-3">
                  <div className="w-20 aspect-video rounded-lg overflow-hidden bg-black shrink-0 shadow-xs relative">
                    <img
                      src={`https://img.youtube.com/vi/${extractYouTubeId(inputUrl)}/mqdefault.jpg`}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-3 bg-red-600 rounded-xs flex items-center justify-center">
                        <Play className="w-2 h-2 text-white fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 block">
                      Video Detected ✓
                    </span>
                    <span className="text-[11px] text-stone-600 font-mono truncate block">
                      ID: {extractYouTubeId(inputUrl)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Song Title <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="e.g. Ellie Goulding - Love Me Like You Do"
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs text-stone-800 placeholder:text-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Artist / Subtitle <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={inputArtist}
                  onChange={(e) => setInputArtist(e.target.value)}
                  placeholder="e.g. For My Sweetheart 💖"
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs text-stone-800 placeholder:text-stone-400"
                />
              </div>

              {/* Actions */}
              <div className="mt-2 flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 px-4 rounded-full border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors cursor-pointer text-center font-['Fredoka']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !extractYouTubeId(inputUrl)}
                  className={`flex-1 py-2 px-4 rounded-full font-bold text-xs transition-all shadow cursor-pointer text-center font-['Fredoka'] flex items-center justify-center gap-1.5 ${
                    saveSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#cc1d2f] hover:bg-[#b01424] text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </>
                  ) : isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Music className="w-3.5 h-3.5" />
                      <span>Save &amp; Play Song</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
