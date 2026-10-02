import React from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react';
import { sound } from '../utils/sound';

interface BouquetData {
  id: string;
  name: string;
  message: string;
  emoji: string;
  image: string;
  alt: string;
}

const BOUQUETS: BouquetData[] = [
  {
    id: 'red-roses',
    name: 'Romantic Red Roses',
    message: 'A dozen deep red roses tied with heartfelt devotion ❤️🌹',
    emoji: '🌹',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGARo6smBSrlZDbopiDXRJlxWvPkyYCbaZFOJr_5a3rytYnejVHJFStGKVFWQ8NOwKu7XyiQceqAUCxbw2TnJhRIsTd92WbbtpI1NJ0YGyytQ3S3P-7EI7QUDcM-w_nfmCvzl7m8cBGILxER4vuorVyI7ArflT-Bm7GfmvgRZZUUcquAG1BxHMCmOB14brEuOXeO6sm0yDi1IxvOZ06G-0kPUNRTABH7jBLPji8wrSdKm7dvsJFRbc',
    alt: 'An isolated bouquet of vibrant red roses wrapped in natural brown kraft paper tied with a shiny red ribbon bow',
  },
  {
    id: 'pastel-harmony',
    name: 'Pastel Rose Harmony',
    message: 'Soft pink garden roses with calming lavender sprigs 🌸✨',
    emoji: '🌸',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTv4fhQYxm1ioSb92sopzuzF5vMqyLkPbsAC6yioNiae3NvfLkn1dW6yvswM22_C76qKfhVzndSH1WKAG0XDZju2UBoT0iXLydWV5XsRLuehGNEQdl2dreCLYykQpan7Z2jjLoQucE-f3JonuoO6zwt91XMCicVyFR0vTk4dkbEuA1-km9rM8zHBIJTQIg13-vuhGPfwfhbibr1dSXqXB5EqiPcOZc1u1JKAGJ5suJVTStd8Yzdf6B',
    alt: 'An isolated bouquet of soft pink roses and delicate white wildflowers and lavender wrapped in light brown kraft craft paper tied with a pastel pink ribbon bow',
  },
  {
    id: 'sunny-blossom',
    name: 'Sunny Spring Blossom',
    message: 'Cheerful yellow daffodils and fresh pink tulips tied with rustic twine 🌼🌷',
    emoji: '🌼',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6mxmyu3WTaetNy_g93Pl68sJhGTBEDt5Mz8pdgZstawm70ijvpZhwqB2b_j71VimK6S5KLIe0jVFOrkmLMF6FXMZ6K_DU5vmUe0QZ96096Bwuxjts8Ri31UpkpuP_7SyqD-FMaMeiPSdAweV0Pl2Ot49fysNFWcXhSR3H7jU8lA0gZVeG7wuywo60vDB_-YVckrzY1bpK4LXw6TVfSHibSqvZUfIT_wfi2mlCzPzeYUmpJLj9zjfB',
    alt: 'An isolated bouquet of bright yellow daffodils, pink tulips, and white narcissus blossoms wrapped in brown kraft paper tied with rustic twine string bow',
  },
];

interface BouquetPageProps {
  onBack: () => void;
  onOpenCard: () => void;
  onOpenScrapbook: () => void;
  onOpenKeepsake: () => void;
  onOpenSong: () => void;
}

export const BouquetPage: React.FC<BouquetPageProps> = ({
  onBack,
  onOpenCard,
  onOpenScrapbook,
  onOpenKeepsake,
  onOpenSong,
}) => {
  const handleBouquetClick = (_bouquet: BouquetData, index: number) => {
    sound.playVictory();

    // Burst of floral celebration confetti
    confetti({
      particleCount: 60,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#b8233e', '#fca5bc', '#fed7e2', '#ffd166', '#ffffff'],
    });

    // 1st Bouquet: Happy Boyfriend's Day Spidey & Kitty Card
    if (index === 0) {
      onOpenCard();
      return;
    }

    // 2nd Bouquet: Scrapbook Dear Love Animated Letter
    if (index === 1) {
      onOpenScrapbook();
      return;
    }

    // 3rd Bouquet: Love You Keepsake with sliding entrance animation
    if (index === 2) {
      onOpenKeepsake();
      return;
    }
  };

  return (
    <div
      className="gingham-bg min-h-screen w-full relative flex flex-col justify-between items-center overflow-x-hidden selection:bg-pink-200"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: `
          linear-gradient(90deg, rgba(162, 210, 255, 0.42) 50%, transparent 50%),
          linear-gradient(rgba(162, 210, 255, 0.42) 50%, transparent 50%)
        `,
        backgroundSize: '64px 64px',
      }}
    >
      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200 text-[#b8233e] text-xs sm:text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* BEGIN: Background Ambient Stars */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" data-purpose="decorative-stars-layer">
        <svg
          className="absolute top-6 left-8 sm:left-14 w-10 h-10 text-pink-300 floating-star star-delay-1 opacity-90 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute top-8 right-24 sm:right-36 w-11 h-11 text-pink-300 floating-star star-delay-2 opacity-85 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute top-28 right-6 sm:right-10 w-12 h-12 text-pink-300 floating-star star-delay-4 opacity-80 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute top-24 left-1/4 -translate-x-12 w-8 h-8 text-pink-300 floating-star star-delay-3 opacity-75 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute top-64 right-[32%] w-9 h-9 text-pink-300 floating-star star-delay-1 opacity-70 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute bottom-10 left-1/2 -translate-x-6 w-11 h-11 text-pink-300 floating-star star-delay-2 opacity-85 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute bottom-6 right-28 w-11 h-11 text-pink-300 floating-star star-delay-3 opacity-90 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>

        <svg
          className="absolute top-96 right-10 w-10 h-10 text-pink-300 floating-star star-delay-4 opacity-80 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.9 6.8L22 9.7l-5.3 4.8 1.6 7.3L12 18l-6.3 3.8 1.6-7.3L2 9.7l7.1-.9L12 2z" />
        </svg>
      </div>
      {/* END: Background Ambient Stars */}

      {/* BEGIN: Main Page Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center flex-grow animate-in fade-in zoom-in-95 duration-300">
        <header className="text-center mb-6 sm:mb-12 mt-4" data-purpose="header-section">
          <h1 className="bubbly-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal drop-shadow-sm select-none">
            Click on any bouquet to open
          </h1>
        </header>

        {/* Bouquets Row Section */}
        <section
          className="w-full flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-6 lg:gap-10 my-auto"
          data-purpose="bouquets-container"
        >
          {BOUQUETS.map((bouquet, index) => (
            <React.Fragment key={bouquet.id}>
              <button
                onClick={() => handleBouquetClick(bouquet, index)}
                className="bouquet-card group relative p-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 rounded-3xl cursor-pointer"
                data-msg={bouquet.message}
                data-name={bouquet.name}
                data-purpose="bouquet-option"
                type="button"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative w-56 sm:w-64 md:w-56 lg:w-68 aspect-square flex items-center justify-center">
                  <img
                    alt={bouquet.alt}
                    className="transparent-blend w-full h-full object-contain pointer-events-none drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                    src={bouquet.image}
                  />
                </div>
              </button>

              {/* Arrow on right side of middle bouquet (index === 1) */}
              {index === 1 && (
                <div className="flex items-center justify-center -my-2 md:my-0 -mx-1 sm:mx-1 z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playVictory();
                      onOpenSong();
                    }}
                    aria-label="Open song that reminds me of you"
                    title="Song that reminds me of you 🎵"
                    type="button"
                    className="group relative flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-rose-50 border-2 border-rose-300 shadow-md hover:shadow-xl hover:scale-120 active:scale-95 transition-all duration-300 cursor-pointer animate-next-arrow"
                  >
                    <svg
                      className="w-8 h-9 sm:w-10 sm:h-12 fill-[#c51b2e] group-hover:fill-[#9f1222] transition-colors filter drop-shadow-sm"
                      viewBox="0 0 100 100"
                    >
                      <polygon points="15,5 95,50 15,95 28,50" />
                    </svg>
                    <span className="absolute -top-7 whitespace-nowrap bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-['Fredoka'] shadow">
                      Our Song 🎵
                    </span>
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </section>
      </main>
    </div>
  );
};
