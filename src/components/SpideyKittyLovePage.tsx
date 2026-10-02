import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Heart, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface SpideyKittyLovePageProps {
  onBack: () => void;
  onReplay: () => void;
  onViewKeepsake: () => void;
}

export const SpideyKittyLovePage: React.FC<SpideyKittyLovePageProps> = ({
  onBack,
  onReplay,
  onViewKeepsake,
}) => {
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const triggerVignetteSparkle = (x: number, y: number) => {
    sound.playSparkle();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#e11d48', '#fda4af', '#f472b6', '#ffffff'],
    });
  };

  const handleNextClick = () => {
    sound.playVictory();
    // Multi-stage grand celebration confetti
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#be123c', '#e11d48', '#ffb8ce', '#ffffff', '#ffd166'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setShowCelebrationModal(true);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 select-none overflow-x-hidden font-romantic relative"
      style={{
        backgroundColor: '#f3f8fc',
        backgroundImage: `
          linear-gradient(90deg, rgba(162, 206, 237, 0.45) 50%, transparent 50%),
          linear-gradient(rgba(162, 206, 237, 0.45) 50%, transparent 50%)
        `,
        backgroundSize: '56px 56px',
      }}
    >
      {/* Top Navigation: Back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-pink-200 text-[#2a3746] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Scrapbook Page Canvas */}
      <main
        className="relative w-full max-w-[1040px] aspect-[986/601] min-h-[580px] flex items-center justify-center overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        data-purpose="scrapbook-page"
      >
        {/* BEGIN: Floating Background Stars */}
        <div className="absolute inset-0 pointer-events-none z-0" data-purpose="decorative-stars">
          {/* Top Left Star */}
          <svg
            className="absolute top-[8%] left-[10%] w-9 h-9 fill-[#ffb8ce] opacity-85 rotate-[-8deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Center-Left Floating Star */}
          <svg
            className="absolute top-[18%] left-[37%] w-7 h-7 fill-[#ffb8ce] opacity-75 rotate-[14deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Top Right Star (High) */}
          <svg
            className="absolute top-[5%] right-[32%] w-10 h-10 fill-[#ffb8ce] opacity-85 rotate-[12deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Far Top-Right Star */}
          <svg
            className="absolute top-[13%] right-[8%] w-8 h-8 fill-[#ffb8ce] opacity-80 rotate-[-15deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Center-Right Mid Star */}
          <svg
            className="absolute top-[40%] right-[33%] w-9 h-9 fill-[#ffb8ce] opacity-80 rotate-[6deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Nav Button Under-Star */}
          <svg
            className="absolute top-[54%] right-[12%] w-10 h-10 fill-[#ffb8ce] opacity-75 rotate-[-10deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Bottom Center Star */}
          <svg
            className="absolute bottom-[9%] left-[49%] w-8 h-8 fill-[#ffb8ce] opacity-80 rotate-[18deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Bottom Far-Left Star */}
          <svg
            className="absolute bottom-[5%] left-[0%] w-7 h-7 fill-[#ffb8ce] opacity-85 rotate-[-20deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
          {/* Bottom Right Star */}
          <svg
            className="absolute bottom-[7%] right-[1%] w-8 h-8 fill-[#ffb8ce] opacity-80 rotate-[22deg] star-soft cursor-pointer pointer-events-auto"
            onClick={() => sound.playSparkle()}
            viewBox="0 0 24 24"
          >
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
          </svg>
        </div>
        {/* END: Floating Background Stars */}

        {/* BEGIN: Center Text Calligraphy */}
        <div
          className="relative z-10 text-center max-w-[540px] px-4 pointer-events-none select-none"
          data-purpose="center-message"
        >
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#2a3746] leading-[1.35] tracking-wide drop-shadow-sm font-romantic">
            Everyday i&apos;m
            <br />
            thankful i&apos;m lucky
            <br />
            enough to have you in
            <br />
            my life &lt;3
          </h1>
        </div>
        {/* END: Center Text Calligraphy */}

        {/* BEGIN: Top Left Corner */}
        {/* Upside-down Spiderman hanging from web kissing Hello Kitty looking up */}
        <div
          onClick={() => triggerVignetteSparkle(0.2, 0.25)}
          className="absolute top-0 left-2 sm:left-4 z-10 w-64 sm:w-72 h-80 sm:h-96 cursor-pointer hover:scale-105 transition-transform duration-300"
          data-purpose="top-left-vignette"
          title="Click the sweet upside-down kiss! 🕸️💋"
        >
          <svg className="w-full h-full" fill="none" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
            {/* Spider web line hanging from top screen ceiling */}
            <line stroke="#1f2937" strokeDasharray="2 1" strokeWidth="2.2" x1="45" x2="45" y1="0" y2="40" />
            {/* Upside down Spider-Man hanging */}
            <g transform="translate(45, 75) rotate(180)">
              {/* Upside-down Body & Legs wrapped on web */}
              <path
                d="M-8,-16 C-12,-35 -2,-45 8,-35 C15,-28 15,-14 6,-16"
                fill="#1e3a8a"
                stroke="#111"
                strokeWidth="2.5"
              />
              <path
                d="M-12,-20 Q-20,-10 -6,0 Q6,6 12,-10"
                fill="#e11d48"
                stroke="#111"
                strokeWidth="2"
              />
              <path d="M-5,-10 L5,-10 M-8,-5 L8,-5" stroke="#111" strokeWidth="1.2" />
              {/* Spiderman Head upside down */}
              <ellipse cx="0" cy="18" fill="#e11d48" rx="23" ry="26" stroke="#111" strokeWidth="2.8" />
              {/* Web lines on head */}
              <path
                d="M0,-8 L0,44 M-23,18 L23,18 M-16,4 C-7,10 7,10 16,4 M-19,30 C-9,24 9,24 19,30"
                stroke="#111"
                strokeWidth="1.2"
              />
              {/* White Mask Eyes with black bold contour */}
              <path
                d="M-17,14 C-16,7 -7,10 -2,16 C-7,22 -15,21 -17,14 Z"
                fill="#ffffff"
                stroke="#111"
                strokeWidth="2.4"
              />
              <path
                d="M17,14 C16,7 7,10 2,16 C7,22 15,21 17,14 Z"
                fill="#ffffff"
                stroke="#111"
                strokeWidth="2.4"
              />
            </g>
            {/* Hello Kitty looking up affectionately with cute dress */}
            <g transform="translate(130, 85)">
              {/* Dress & Body tilted up */}
              <path
                d="M-22,35 Q-28,62 -14,68 Q10,70 18,58 Q22,38 4,32 Z"
                fill="#fce7f3"
                stroke="#111"
                strokeWidth="2.5"
              />
              <path d="M-12,34 L10,34" stroke="#f472b6" strokeWidth="2" />
              {/* Cute feet */}
              <ellipse cx="-10" cy="70" fill="#fff" rx="7" ry="5" stroke="#111" strokeWidth="2" />
              <ellipse cx="6" cy="68" fill="#fff" rx="7" ry="5" stroke="#111" strokeWidth="2" />
              {/* Little paw reaching towards Spidey */}
              <path d="M-22,38 C-32,30 -30,22 -20,24" fill="#fff" stroke="#111" strokeWidth="2.5" />
              {/* Hello Kitty Head tilted up towards Spiderman */}
              <g transform="rotate(-15, -4, 4)">
                <ellipse cx="-4" cy="4" fill="#ffffff" rx="27" ry="21" stroke="#111" strokeWidth="2.8" />
                {/* Kitty Ears */}
                <path
                  d="M-26,-8 Q-32,-24 -15,-16"
                  fill="#fff"
                  stroke="#111"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                />
                <path
                  d="M10,-17 Q25,-25 22,-8"
                  fill="#fff"
                  stroke="#111"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                />
                {/* Eyes closed happily/smiling kissing */}
                <path
                  d="M-18,5 Q-14,0 -10,5"
                  fill="none"
                  stroke="#111"
                  strokeLinecap="round"
                  strokeWidth="2.6"
                />
                <path
                  d="M2,3 Q6,-2 10,3"
                  fill="none"
                  stroke="#111"
                  strokeLinecap="round"
                  strokeWidth="2.6"
                />
                {/* Yellow nose */}
                <ellipse cx="-4" cy="9" fill="#facc15" rx="3.5" ry="2.5" stroke="#111" strokeWidth="1.8" />
                {/* Whiskers */}
                <line stroke="#111" strokeLinecap="round" strokeWidth="2" x1="-24" x2="-32" y1="5" y2="4" />
                <line stroke="#111" strokeLinecap="round" strokeWidth="2" x1="-24" x2="-33" y1="10" y2="12" />
                <line stroke="#111" strokeLinecap="round" strokeWidth="2" x1="16" x2="24" y1="3" y2="2" />
                <line stroke="#111" strokeLinecap="round" strokeWidth="2" x1="15" x2="25" y1="8" y2="10" />
                {/* Pink Hair Bow */}
                <g transform="translate(-18, -16) rotate(-15)">
                  <circle cx="0" cy="0" fill="#f43f5e" r="4.5" stroke="#111" strokeWidth="2" />
                  <path d="M-1,-2 C-7,-10 -15,-4 -4,2 Z" fill="#fda4af" stroke="#111" strokeWidth="2" />
                  <path d="M2,-1 C8,-10 16,-4 4,2 Z" fill="#fda4af" stroke="#111" strokeWidth="2" />
                </g>
              </g>
            </g>
          </svg>
        </div>
        {/* END: Top Left Corner */}

        {/* BEGIN: Top Right Corner */}
        {/* Hello Kitty and Spiderman hugging affectionately with floating red heart */}
        <div
          onClick={() => triggerVignetteSparkle(0.8, 0.25)}
          className="absolute top-1 sm:top-3 right-1 sm:right-4 z-10 w-64 sm:w-72 h-72 sm:h-80 cursor-pointer hover:scale-105 transition-transform duration-300"
          data-purpose="top-right-vignette"
          title="Click the warm cuddle! ❤️"
        >
          <svg className="w-full h-full" fill="none" viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">
            {/* Floating Red Cartoon Heart with hand-drawn outline & white highlight */}
            <g className="float-slow" transform="translate(42, 8) rotate(-12)">
              <path
                d="M16,5 C10,-4 0,0 0,9 C0,18 16,28 16,28 C16,28 32,18 32,9 C32,0 22,-4 16,5 Z"
                fill="#dc2626"
                stroke="#111"
                strokeLinejoin="round"
                strokeWidth="2.6"
              />
              {/* White gloss highlight on heart */}
              <path
                d="M6,6 C4,10 5,14 7,16"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeWidth="2.2"
              />
            </g>
            {/* Couple hugging side-by-side */}
            {/* Spiderman (on right) */}
            <g transform="translate(112, 92)">
              {/* Spidey Body in blue & red suit */}
              <rect
                fill="#2563eb"
                height="34"
                rx="10"
                stroke="#111"
                strokeWidth="2.5"
                width="28"
                x="-14"
                y="24"
              />
              <path d="M-10,24 L10,24 L8,38 L-8,38 Z" fill="#dc2626" stroke="#111" strokeWidth="1.8" />
              {/* Spidey head (masked) */}
              <ellipse cx="0" cy="0" fill="#dc2626" rx="24" ry="26" stroke="#111" strokeWidth="2.8" />
              {/* Mask spider webs */}
              <path
                d="M0,-26 L0,26 M-24,0 L24,0 M-17,-16 Q0,-8 17,-16 M-19,16 Q0,8 19,16"
                stroke="#111"
                strokeWidth="1.3"
              />
              {/* Spider eyes */}
              <path
                d="M-17,-3 C-17,-11 -6,-9 -2,-2 C-7,4 -15,3 -17,-3 Z"
                fill="#fff"
                stroke="#111"
                strokeWidth="2.4"
              />
              <path
                d="M17,-3 C17,-11 6,-9 2,-2 C7,4 15,3 17,-3 Z"
                fill="#fff"
                stroke="#111"
                strokeWidth="2.4"
              />
              {/* Arm wrapping around Kitty */}
              <path
                d="M-14,32 C-26,30 -34,44 -20,48"
                fill="#dc2626"
                stroke="#111"
                strokeWidth="2.6"
              />
            </g>
            {/* Kitty in Spidey hoodie / cute buddy (on left hugging) */}
            <g transform="translate(68, 104)">
              {/* Kitty body */}
              <rect
                fill="#3b82f6"
                height="28"
                rx="8"
                stroke="#111"
                strokeWidth="2.4"
                width="24"
                x="-12"
                y="20"
              />
              {/* Hello Kitty Face with Spidey mask/cap */}
              <ellipse cx="0" cy="-2" fill="#ffffff" rx="23" ry="19" stroke="#111" strokeWidth="2.6" />
              {/* Spidey Hood cap on Kitty */}
              <path
                d="M-23,-6 C-22,-24 22,-24 23,-6 C14,-14 -14,-14 -23,-6 Z"
                fill="#dc2626"
                stroke="#111"
                strokeWidth="2.2"
              />
              <path d="M-22,-6 L22,-6" stroke="#111" strokeWidth="1.5" />
              {/* Kitty eyes smiling happily together */}
              <ellipse cx="-8" cy="1" fill="#111" rx="2.5" ry="3.5" />
              <ellipse cx="8" cy="1" fill="#111" rx="2.5" ry="3.5" />
              <ellipse cx="0" cy="5" fill="#facc15" rx="3" ry="2" stroke="#111" strokeWidth="1.4" />
              {/* Kitty whiskers */}
              <line stroke="#111" strokeWidth="1.8" x1="-18" x2="-26" y1="2" y2="1" />
              <line stroke="#111" strokeWidth="1.8" x1="-18" x2="-25" y1="6" y2="8" />
              {/* Hugging hand on Spidey */}
              <path
                d="M10,24 C18,22 26,28 22,36"
                fill="#ffffff"
                stroke="#111"
                strokeWidth="2.4"
              />
            </g>
          </svg>
        </div>
        {/* END: Top Right Corner */}

        {/* BEGIN: Bottom Left Corner */}
        {/* Cute pink hand-drawn heart badge framing Kitty and Spiderman together */}
        <div
          onClick={() => triggerVignetteSparkle(0.2, 0.75)}
          className="absolute bottom-1 sm:bottom-3 left-1 sm:left-3 z-10 w-64 sm:w-80 h-64 sm:h-80 cursor-pointer hover:scale-105 transition-transform duration-300"
          data-purpose="bottom-left-vignette"
          title="Click the cute couple heart badge! 💖"
        >
          <svg className="w-full h-full" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Pink Heart outer frame border */}
            <path
              d="M100,185 C40,140 10,105 10,65 C10,32 35,12 68,12 C83,12 95,20 100,28 C105,20 117,12 132,12 C165,12 190,32 190,65 C190,105 160,140 100,185 Z"
              fill="#ffe4e6"
              stroke="#f43f5e"
              strokeLinejoin="round"
              strokeWidth="6.5"
            />
            {/* Inner Clip for the couple inside the heart */}
            <g transform="translate(0, 0)">
              {/* Hello Kitty peeking from left */}
              <g transform="translate(68, 125)">
                <ellipse cx="0" cy="0" fill="#ffffff" rx="22" ry="18" stroke="#111" strokeWidth="2.6" />
                {/* Kitty Ears */}
                <path d="M-18,-10 L-22,-22 L-8,-16 Z" fill="#fff" stroke="#111" strokeWidth="2" />
                <path d="M8,-16 L22,-22 L18,-10 Z" fill="#fff" stroke="#111" strokeWidth="2" />
                {/* Red Hair Bow */}
                <circle cx="15" cy="-14" fill="#e11d48" r="4" stroke="#111" strokeWidth="1.8" />
                <ellipse cx="10" cy="-17" fill="#e11d48" rx="4" ry="2.8" stroke="#111" strokeWidth="1.4" />
                <ellipse cx="19" cy="-10" fill="#e11d48" rx="4" ry="2.8" stroke="#111" strokeWidth="1.4" />
                {/* Eyes & Nose */}
                <ellipse cx="-8" cy="2" fill="#111" rx="2.5" ry="3.5" />
                <ellipse cx="7" cy="2" fill="#111" rx="2.5" ry="3.5" />
                <ellipse cx="-0.5" cy="5.5" fill="#facc15" rx="3" ry="2" stroke="#111" strokeWidth="1.4" />
                {/* Cute blush */}
                <ellipse cx="-13" cy="6" fill="#fca5a5" rx="3" ry="1.5" />
                <ellipse cx="13" cy="6" fill="#fca5a5" rx="3" ry="1.5" />
              </g>
              {/* Spiderman peeking right next to Kitty */}
              <g transform="translate(118, 130)">
                <ellipse cx="0" cy="0" fill="#dc2626" rx="22" ry="24" stroke="#111" strokeWidth="2.6" />
                {/* Mask Web Lines */}
                <path
                  d="M0,-24 L0,24 M-22,0 L22,0 M-16,-14 Q0,-6 16,-14 M-16,14 Q0,6 16,14"
                  stroke="#111"
                  strokeWidth="1.2"
                />
                {/* Mask Eyes */}
                <path
                  d="M-16,-2 C-16,-10 -6,-8 -2,-1 C-7,4 -14,4 -16,-2 Z"
                  fill="#fff"
                  stroke="#111"
                  strokeWidth="2.2"
                />
                <path
                  d="M16,-2 C16,-10 6,-8 2,-1 C7,4 14,4 16,-2 Z"
                  fill="#fff"
                  stroke="#111"
                  strokeWidth="2.2"
                />
              </g>
            </g>
          </svg>
        </div>
        {/* END: Bottom Left Corner */}

        {/* BEGIN: Bottom Right Corner */}
        {/* Gym couple: Spiderman lifting Olympic barbell & Hello Kitty curling dumbbells */}
        <div
          onClick={() => triggerVignetteSparkle(0.75, 0.75)}
          className="absolute bottom-1 sm:bottom-2 right-1 sm:right-4 z-10 w-80 sm:w-[420px] h-60 sm:h-72 cursor-pointer hover:scale-105 transition-transform duration-300"
          data-purpose="bottom-right-vignette"
          title="Click the gym workout couple! 💪❤️"
        >
          <svg className="w-full h-full" fill="none" viewBox="0 0 290 190" xmlns="http://www.w3.org/2000/svg">
            {/* Gym Bench Press Rack in background */}
            <path
              d="M5,165 L22,165 M13,165 L13,142 L25,135 L25,165"
              stroke="#4b5563"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.5"
            />
            <rect fill="#6b7280" height="25" stroke="#111" strokeWidth="2" width="14" x="18" y="140" />
            {/* Spiderman Workout Character */}
            <g transform="translate(85, 105)">
              {/* Muscular body & legs standing wide */}
              <path
                d="M-14,25 L-16,55 L-7,55 L-6,34 L6,34 L7,55 L16,55 L14,25 Z"
                fill="#dc2626"
                stroke="#111"
                strokeWidth="2.5"
              />
              <path
                d="M-12,24 Q0,32 12,24 L10,34 L-10,34 Z"
                fill="#1d4ed8"
                stroke="#111"
                strokeWidth="2"
              />
              {/* Spidey Head with focused workout expression */}
              <ellipse cx="0" cy="-6" fill="#dc2626" rx="25" ry="27" stroke="#111" strokeWidth="2.8" />
              {/* Web details */}
              <path
                d="M0,-33 L0,21 M-25,-6 L25,-6 M-18,-18 Q0,-10 18,-18 M-18,8 Q0,0 18,8"
                stroke="#111"
                strokeWidth="1.3"
              />
              {/* Focused white eyes with black rim */}
              <path
                d="M-18,-7 C-18,-18 -6,-14 -1,-4 C-7,2 -16,1 -18,-7 Z"
                fill="#fff"
                stroke="#111"
                strokeWidth="2.6"
              />
              <path
                d="M18,-7 C18,-18 6,-14 1,-4 C7,2 16,1 18,-7 Z"
                fill="#fff"
                stroke="#111"
                strokeWidth="2.6"
              />
              {/* Powerful Arms holding Barbell */}
              <path
                d="M-18,12 C-26,20 -15,30 -6,22"
                fill="#dc2626"
                stroke="#111"
                strokeWidth="3"
              />
              <path d="M18,12 C26,20 15,30 6,22" fill="#dc2626" stroke="#111" strokeWidth="3" />
              {/* Olympic Barbell with heavy weight plates */}
              {/* Left Weights */}
              <rect
                fill="#4b5563"
                height="28"
                rx="2"
                stroke="#111"
                strokeWidth="2.2"
                width="8"
                x="-65"
                y="10"
              />
              <rect
                fill="#374151"
                height="36"
                rx="2"
                stroke="#111"
                strokeWidth="2.2"
                width="6"
                x="-56"
                y="6"
              />
              {/* Bar */}
              <line stroke="#111" strokeLinecap="round" strokeWidth="4.5" x1="-68" x2="68" y1="24" y2="24" />
              {/* Right Weights */}
              <rect
                fill="#374151"
                height="36"
                rx="2"
                stroke="#111"
                strokeWidth="2.2"
                width="6"
                x="50"
                y="6"
              />
              <rect
                fill="#4b5563"
                height="28"
                rx="2"
                stroke="#111"
                strokeWidth="2.2"
                width="8"
                x="57"
                y="10"
              />
            </g>
            {/* Hello Kitty curling pink/grey dumbbells beside him */}
            <g transform="translate(195, 122)">
              {/* Cute workout shorts/top */}
              <rect
                fill="#fbcfe8"
                height="22"
                rx="4"
                stroke="#111"
                strokeWidth="2"
                width="20"
                x="-10"
                y="16"
              />
              <ellipse cx="-5" cy="40" fill="#fff" rx="4" ry="3" stroke="#111" strokeWidth="1.8" />
              <ellipse cx="5" cy="40" fill="#fff" rx="4" ry="3" stroke="#111" strokeWidth="1.8" />
              {/* Hello Kitty Face */}
              <ellipse cx="0" cy="-4" fill="#ffffff" rx="21" ry="17" stroke="#111" strokeWidth="2.6" />
              {/* Kitty Ears */}
              <path d="M-17,-14 L-21,-25 L-8,-19 Z" fill="#fff" stroke="#111" strokeWidth="2" />
              <path d="M7,-19 L20,-25 L16,-14 Z" fill="#fff" stroke="#111" strokeWidth="2" />
              {/* Kitty Bow */}
              <circle cx="16" cy="-18" fill="#f43f5e" r="3.5" stroke="#111" strokeWidth="1.6" />
              <ellipse cx="11" cy="-21" fill="#fda4af" rx="3.5" ry="2.5" stroke="#111" strokeWidth="1.4" />
              <ellipse cx="20" cy="-14" fill="#fda4af" rx="3.5" ry="2.5" stroke="#111" strokeWidth="1.4" />
              {/* Eyes & Nose */}
              <ellipse cx="-7" cy="-2" fill="#111" rx="2.2" ry="3.2" />
              <ellipse cx="7" cy="-2" fill="#111" rx="2.2" ry="3.2" />
              <ellipse cx="0" cy="2" fill="#facc15" rx="2.8" ry="1.8" stroke="#111" strokeWidth="1.4" />
              {/* Whiskers */}
              <line stroke="#111" strokeWidth="1.6" x1="-15" x2="-22" y1="-2" y2="-4" />
              <line stroke="#111" strokeWidth="1.6" x1="-15" x2="-22" y1="2" y2="3" />
              <line stroke="#111" strokeWidth="1.6" x1="15" x2="22" y1="-2" y2="-4" />
              <line stroke="#111" strokeWidth="1.6" x1="15" x2="22" y1="2" y2="3" />
              {/* Arms curling 2 mini dumbbells */}
              {/* Left Dumbbell */}
              <g transform="translate(-18, 12)">
                <rect fill="#374151" height="14" rx="2" stroke="#111" strokeWidth="1.8" width="8" x="-4" y="-3" />
                <circle cx="0" cy="-3" fill="#4b5563" r="4.5" stroke="#111" strokeWidth="1.6" />
                <circle cx="0" cy="11" fill="#4b5563" r="4.5" stroke="#111" strokeWidth="1.6" />
                <circle cx="2" cy="4" fill="#fff" r="4" stroke="#111" strokeWidth="1.6" />
              </g>
              {/* Right Dumbbell */}
              <g transform="translate(18, 12)">
                <rect fill="#374151" height="14" rx="2" stroke="#111" strokeWidth="1.8" width="8" x="-4" y="-3" />
                <circle cx="0" cy="-3" fill="#4b5563" r="4.5" stroke="#111" strokeWidth="1.6" />
                <circle cx="0" cy="11" fill="#4b5563" r="4.5" stroke="#111" strokeWidth="1.6" />
                <circle cx="-2" cy="4" fill="#fff" r="4" stroke="#111" strokeWidth="1.6" />
              </g>
            </g>
            {/* Floor Dumbbells Set on bottom right corner */}
            <g transform="translate(242, 146)">
              <line stroke="#111" strokeWidth="3" x1="4" x2="4" y1="8" y2="20" />
              <circle cx="4" cy="6" fill="#374151" r="5" stroke="#111" strokeWidth="2" />
              <circle cx="4" cy="22" fill="#374151" r="5" stroke="#111" strokeWidth="2" />
              <line stroke="#111" strokeWidth="3" x1="16" x2="16" y1="6" y2="22" />
              <circle cx="16" cy="4" fill="#1f2937" r="6" stroke="#111" strokeWidth="2" />
              <circle cx="16" cy="24" fill="#1f2937" r="6" stroke="#111" strokeWidth="2" />
            </g>
          </svg>
        </div>
        {/* END: Bottom Right Corner */}

        {/* BEGIN: Navigation Forward Arrow */}
        {/* Crimson/deep red forward-pointing triangle arrow button below top-right illustration */}
        <aside className="absolute top-[49%] right-4 sm:right-7 z-30" data-purpose="navigation-control">
          <button
            onClick={handleNextClick}
            aria-label="Next scrapbook memory page"
            className="group relative flex items-center justify-center p-2 rounded-full transition-transform duration-200 hover:scale-125 active:scale-95 focus:outline-none cursor-pointer animate-next-arrow"
            data-purpose="next-page-button"
            type="button"
            title="Complete & Celebrate! 💖"
          >
            {/* Crimson Arrow SVG matching reference position & angle */}
            <svg
              className="w-10 sm:w-12 h-10 sm:h-12 drop-shadow-md transition-all duration-200"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hand-drawn styled deep red polygon arrow */}
              <path
                className="group-hover:fill-[#e11d48]"
                d="M8,8 L40,24 L8,40 L16,24 Z"
                fill="#be123c"
                stroke="#9f1239"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              {/* Inner soft highlight */}
              <path d="M11,14 L32,24 L11,34 L17,24 Z" fill="#e11d48" opacity="0.6" />
            </svg>
          </button>
        </aside>
        {/* END: Navigation Forward Arrow */}
      </main>

      {/* Grand Celebration Finale Modal */}
      {showCelebrationModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowCelebrationModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 font-sans"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl p-6 sm:p-8 shadow-2xl bg-white border-4 border-pink-200 w-11/12 max-w-md text-center flex flex-col items-center animate-in zoom-in-95 duration-200"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner">
              💑💖✨
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#b91c37] font-['Fredoka'] mb-2">
              Happy Boyfriend Day!
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mb-6 font-['Nunito'] leading-relaxed">
              Every day I&apos;m truly thankful and lucky to have you in my life. You make every memory
              sweeter and every day brighter! 🥰💝
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  onViewKeepsake();
                }}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#b91c37] hover:bg-[#9f122d] text-white font-bold text-xs sm:text-sm shadow cursor-pointer font-['Fredoka'] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Photo Keepsakes</span>
              </button>
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  onReplay();
                }}
                className="flex-1 py-2.5 px-4 rounded-full bg-pink-100 hover:bg-pink-200 text-[#b91c37] font-bold text-xs sm:text-sm border border-pink-300 cursor-pointer font-['Fredoka'] flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
