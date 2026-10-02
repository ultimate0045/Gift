import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface WhyNoPageProps {
  onBackToGift: () => void;
}

export const WhyNoPage: React.FC<WhyNoPageProps> = ({ onBackToGift }) => {
  const [buttonState, setButtonState] = useState<'default' | 'thankyou'>('default');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSorryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRedirecting) return;

    sound.playForgive();
    setButtonState('thankyou');
    setIsRedirecting(true);

    // Burst of hearts and confetti
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#fca5c5', '#fed7e2', '#ffffff', '#22c55e', '#ff4d6d'],
    });

    // Automatically redirect to home without clicking any other button
    setTimeout(() => {
      onBackToGift();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center select-none overflow-hidden py-8 px-4 transition-all duration-500">
      {/* Background Gingham Layer (56px matching provided design) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: `
            linear-gradient(90deg, rgba(179, 212, 243, 0.45) 50%, transparent 50%),
            linear-gradient(rgba(179, 212, 243, 0.45) 50%, transparent 50%)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* BEGIN: Decorative Floating Stars from User Code */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" data-purpose="decorative-stars">
        {/* Top Left */}
        <svg
          className="star-shape absolute top-8 left-12 w-11 h-11 transform -rotate-12 opacity-85 cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            sound.playSparkle();
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Mid Left Upper */}
        <svg
          className="star-shape absolute top-28 left-20 w-12 h-12 transform rotate-12 opacity-90 cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            sound.playSparkle();
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Top Mid Center Left */}
        <svg className="star-shape absolute top-16 left-1/3 w-8 h-8 transform rotate-6 opacity-75" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Top Center Right */}
        <svg className="star-shape absolute top-4 right-1/3 w-12 h-12 transform -rotate-6 opacity-85" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Top Right */}
        <svg className="star-shape absolute top-12 right-12 w-11 h-11 transform rotate-15 opacity-80" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Mid Center Right */}
        <svg className="star-shape absolute top-48 right-[32%] w-10 h-10 transform -rotate-12 opacity-85" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Mid Right Far */}
        <svg className="star-shape absolute top-64 right-16 w-11 h-11 transform rotate-12 opacity-80" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Bottom Left */}
        <svg className="star-shape absolute bottom-24 left-24 w-12 h-12 transform -rotate-6 opacity-85" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Bottom Center Left */}
        <svg className="star-shape absolute bottom-8 left-[48%] w-12 h-12 transform rotate-12 opacity-85" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Bottom Right Near Edge */}
        <svg className="star-shape absolute bottom-12 right-24 w-10 h-10 transform -rotate-15 opacity-80" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>

        {/* Far Bottom Left Corner */}
        <svg className="star-shape absolute -bottom-3 -left-3 w-12 h-12 transform rotate-45 opacity-70" viewBox="0 0 24 24">
          <path d="M12 1.5l2.85 6.63 7.15.63-5.38 4.74 1.57 7-6.19-3.66-6.19 3.66 1.57-7-5.38-4.74 7.15-.63L12 1.5z" />
        </svg>
      </div>
      {/* END: Decorative Floating Stars */}

      {/* Main Stage Container */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 py-8 animate-in fade-in zoom-in-95 duration-300" data-purpose="interaction-screen">
        {/* Title Header */}
        <header className="mb-4 sm:mb-8 text-center" data-purpose="header-section">
          <h1 className="bubble-title text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide font-['Fredoka']">
            Why did you click NO!
          </h1>
        </header>

        {/* Character and Action Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12 mt-2 w-full" data-purpose="character-and-action-group">
          {/* Crying Character SVG Illustration with lively tear & sob animations */}
          <div
            onClick={() => {
              sound.playWhimper();
            }}
            title="Click to soothe the crying chibi"
            className="relative w-56 sm:w-64 md:w-72 flex justify-center items-center cursor-pointer anim-sob"
            data-purpose="crying-chibi-character"
          >
            <svg className="w-full h-auto drop-shadow-sm" fill="none" viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg">
              {/* Drop Arms / Shoulders behind */}
              <path d="M78 185 C65 195 62 225 72 238 C80 248 94 245 98 230 L98 200" fill="#fcfcfc" stroke="#2b2b2b" strokeLinejoin="round" strokeWidth="4.5" />
              <path d="M222 185 C235 195 238 225 228 238 C220 248 206 245 202 230 L202 200" fill="#fcfcfc" stroke="#2b2b2b" strokeLinejoin="round" strokeWidth="4.5" />
              {/* Body / Torso */}
              <path d="M96 210 L96 255 C96 268 106 270 114 270 C122 270 123 258 135 258 C165 258 166 270 174 270 C182 270 192 268 192 255 L192 210" fill="#fcfcfc" stroke="#2b2b2b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" />
              {/* Character Large Round Head */}
              <ellipse cx="145" cy="148" fill="#fcfcfc" rx="84" ry="76" stroke="#2b2b2b" strokeWidth="4.5" />
              {/* Soft Pink Cheeks */}
              <ellipse cx="94" cy="180" fill="#fca5a5" rx="9" ry="6" />
              <ellipse cx="196" cy="180" fill="#fca5a5" rx="9" ry="6" />
              {/* Sad Eyebrows */}
              <path d="M117 143 C120 137 127 137 129 140" fill="none" stroke="#2b2b2b" strokeLinecap="round" strokeWidth="3" />
              <path d="M173 143 C170 137 163 137 161 140" fill="none" stroke="#2b2b2b" strokeLinecap="round" strokeWidth="3" />
              {/* Left Eye with Highlights (Tears / Crying) */}
              <ellipse cx="119" cy="158" fill="#222222" rx="10" ry="12" />
              <circle cx="116" cy="153" fill="#ffffff" r="4.2" />
              <circle cx="123" cy="164" fill="#ffffff" r="2.2" />
              {/* Right Eye with Highlights (Tears / Crying) */}
              <ellipse cx="171" cy="158" fill="#222222" rx="10" ry="12" />
              <circle cx="168" cy="153" fill="#ffffff" r="4.2" />
              <circle cx="175" cy="164" fill="#ffffff" r="2.2" />
              
              {/* Left Tear Waterfall Flowing Down with gentle wave animation */}
              <g className="anim-tear">
                <path d="M110 167 C100 178 102 196 112 208 C116 202 120 206 122 201 C124 196 128 198 127 188 C127 178 124 170 120 167 Z" fill="#94d2f8" stroke="#5fb4e8" strokeLinejoin="round" strokeWidth="1.8" />
                <ellipse cx="110" cy="184" fill="#ffffff" opacity="0.8" rx="2.5" ry="5.5" transform="rotate(-15 110 184)" />
              </g>

              {/* Right Tear Waterfall Flowing Down with gentle wave animation */}
              <g className="anim-tear" style={{ animationDelay: '0.4s' }}>
                <path d="M180 167 C190 178 188 196 178 208 C174 202 170 206 168 201 C166 196 162 198 163 188 C163 178 166 170 170 167 Z" fill="#94d2f8" stroke="#5fb4e8" strokeLinejoin="round" strokeWidth="1.8" />
                <ellipse cx="180" cy="184" fill="#ffffff" opacity="0.8" rx="2.5" ry="5.5" transform="rotate(15 180 184)" />
              </g>

              {/* Hands Covering Mouth in Distress */}
              {/* Left Paw / Hand */}
              <path d="M125 212 C125 185 135 174 145 188 C144 198 143 216 142 220 Z" fill="#ffffff" stroke="#2b2b2b" strokeLinejoin="round" strokeWidth="3.5" />
              <path d="M136 178 C131 185 131 202 133 215" stroke="#2b2b2b" strokeLinecap="round" strokeWidth="2.5" />
              {/* Right Paw / Hand */}
              <path d="M165 212 C165 185 155 174 145 188 C146 198 147 216 148 220 Z" fill="#ffffff" stroke="#2b2b2b" strokeLinejoin="round" strokeWidth="3.5" />
              <path d="M154 178 C159 185 159 202 157 215" stroke="#2b2b2b" strokeLinecap="round" strokeWidth="2.5" />
              {/* Cute Front Body Outline joining hands */}
              <path d="M125 210 L125 250" stroke="#2b2b2b" strokeLinecap="round" strokeWidth="3.5" />
              <path d="M165 210 L165 250" stroke="#2b2b2b" strokeLinecap="round" strokeWidth="3.5" />
            </svg>
          </div>

          {/* Action Button: "I'm sorry" */}
          <div className="flex flex-col items-center justify-center gap-3 pt-2 md:pt-0" data-purpose="button-container">
            <button
              onClick={handleSorryClick}
              disabled={isRedirecting}
              className={`btn-sorry text-white font-extrabold text-lg sm:text-xl px-8 py-3.5 rounded-full tracking-wide shadow-md active:outline-none focus:outline-none cursor-pointer transition-all duration-300 font-['Fredoka'] ${
                buttonState === 'thankyou' ? '!bg-[#16a34a] shadow-emerald-500/40 scale-105' : ''
              }`}
              data-purpose="apology-action"
              id="sorry-button"
              type="button"
            >
              {buttonState === 'thankyou' ? 'Thank you! ❤️' : "I'm sorry"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
