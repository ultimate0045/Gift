import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Camera, Check, CheckCheck, Copy, Globe, Image as ImageIcon, Link, RefreshCcw, Sparkles, Trash2, Upload, X } from 'lucide-react';
import { PHOTO_SLOTS, PhotoSlotInfo, fileToDataUrl, useCustomPhotos } from '../utils/photoStore';
import { sound } from '../utils/sound';

interface PhotoCustomizerModalProps {
  isOpen: boolean;
  initialSlotId?: string;
  onClose: () => void;
}

export const PhotoCustomizerModal: React.FC<PhotoCustomizerModalProps> = ({
  isOpen,
  initialSlotId = 'youre-my-main',
  onClose,
}) => {
  const { getUrl, isCustom, setPhoto, resetPhoto, resetAll, exportJSON, photos } = useCustomPhotos();
  const [selectedSlotId, setSelectedSlotId] = useState<string>(initialSlotId);
  const [activeTab, setActiveTab] = useState<'selected' | 'all' | 'hosting'>('selected');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentSlot =
    PHOTO_SLOTS.find((s) => s.id === selectedSlotId) || PHOTO_SLOTS[0];
  const currentUrl = getUrl(currentSlot.id);
  const hasCustom = isCustom(currentSlot.id);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    try {
      if (files.length === 1) {
        const dataUrl = await fileToDataUrl(files[0]);
        setPhoto(currentSlot.id, dataUrl);
      } else {
        // Multi-file upload: assign starting from current category or slot
        let targetList: string[];
        if (currentSlot.id.startsWith('keepsake-')) {
          // If in Keepsake category, map into keepsake slots 1-12 sequentially
          targetList = Array.from({ length: 12 }, (_, idx) => `keepsake-${idx + 1}`);
        } else if (currentSlot.id.startsWith('film-')) {
          targetList = ['film-1', 'film-2', 'film-3', 'film-4'];
        } else {
          targetList = [
            'youre-my-main',
            'film-1',
            'film-2',
            'film-3',
            'film-4',
            ...PHOTO_SLOTS.filter(
              (s) => !['youre-my-main', 'film-1', 'film-2', 'film-3', 'film-4'].includes(s.id)
            ).map((s) => s.id),
          ];
        }

        const startIdx = Math.max(0, targetList.indexOf(currentSlot.id));
        for (let i = 0; i < files.length; i++) {
          const targetSlotId = targetList[(startIdx + i) % targetList.length];
          const dataUrl = await fileToDataUrl(files[i]);
          setPhoto(targetSlotId, dataUrl);
        }
      }

      sound.playVictory();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fda4af', '#f472b6', '#ffffff'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPhoto(currentSlot.id, urlInput.trim());
    setUrlInput('');
    sound.playVictory();
    confetti({
      particleCount: 30,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fbcfe8', '#ffffff'],
    });
  };

  const handleResetCurrent = () => {
    resetPhoto(currentSlot.id);
    sound.playPop();
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all photos back to the original default pictures?')) {
      resetAll();
      sound.playPop();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none font-sans"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-pink-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-['Fredoka'] tracking-wide">
                Add Your Own Photos
              </h3>
              <p className="text-xs text-pink-100 font-['Nunito']">
                Upload pictures from your phone or laptop to personalize your scrapbook!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap border-b border-pink-100 bg-pink-50/50 px-4 pt-2 gap-1">
          <button
            onClick={() => setActiveTab('selected')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold font-['Fredoka'] rounded-t-xl transition-colors cursor-pointer ${
              activeTab === 'selected'
                ? 'bg-white text-rose-600 shadow-xs border-t-2 border-rose-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📸 Upload Selected
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold font-['Fredoka'] rounded-t-xl transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-rose-600 shadow-xs border-t-2 border-rose-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🖼️ All Slots ({PHOTO_SLOTS.length})
          </button>
          <button
            onClick={() => setActiveTab('hosting')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold font-['Fredoka'] rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hosting'
                ? 'bg-white text-rose-600 shadow-xs border-t-2 border-rose-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>Option 1: Bake into Website</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-800">
          {activeTab === 'selected' ? (
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Photo Preview Card */}
              <div className="flex flex-col items-center gap-2 w-full md:w-56 shrink-0">
                <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-4 border-pink-200 shadow-md bg-neutral-100 group">
                  <img
                    src={currentUrl}
                    alt={currentSlot.name}
                    className="w-full h-full object-cover"
                  />
                  {hasCustom && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                      <Check className="w-3 h-3" />
                      <span>Customized</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-rose-600 font-['Fredoka'] block">
                    {currentSlot.category}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 block truncate max-w-[200px]">
                    {currentSlot.name}
                  </span>
                </div>
              </div>

              {/* Upload & Replace Controls */}
              <div className="flex-1 w-full space-y-4">
                {/* Slot Selector Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 font-['Fredoka']">
                    Choose Which Photo Slot To Replace:
                  </label>
                  <select
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium cursor-pointer"
                  >
                    {PHOTO_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        [{slot.category}] — {slot.name} {isCustom(slot.id) ? '★ (Custom)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Button */}
                <div className="border-2 border-dashed border-pink-300 rounded-2xl p-4 bg-pink-50/40 text-center hover:bg-pink-50/70 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload-input"
                  />
                  <label
                    htmlFor="file-upload-input"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-rose-600 font-['Fredoka'] block">
                        {isProcessing ? 'Processing & saving image(s)...' : 'Upload Photo(s) from Device'}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {currentSlot.id.startsWith('keepsake-')
                          ? 'Tip: Select all 12 photos at once to populate the entire Keepsake Collage in one click!'
                          : currentSlot.id.startsWith('film-')
                          ? 'Tip: Select up to 4 photos to fill the whole film strip at once!'
                          : 'Select 1 photo for this slot, or select multiple photos to fill slots in order!'}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Paste URL Option */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 font-['Fredoka']">
                    Or Paste an Image URL:
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="https://example.com/our-photo.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium"
                      />
                    </div>
                    <button
                      onClick={handleApplyUrl}
                      disabled={!urlInput.trim()}
                      className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Reset button */}
                {hasCustom && (
                  <div className="pt-2">
                    <button
                      onClick={handleResetCurrent}
                      className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      <span>Reset this slot back to original default photo</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'all' ? (
            /* All Photo Slots Grid */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-pink-100">
                <span className="text-xs font-bold text-slate-500">
                  Click any slot to replace or customize its photo
                </span>
                <button
                  onClick={handleResetAll}
                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>

              {/* Grouped by Category */}
              {(["You're My Frame", 'Film Strip (Dear Love)', 'Keepsake Collage'] as const).map(
                (category) => {
                  const slotsInCategory = PHOTO_SLOTS.filter((s) => s.category === category);
                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-bold text-rose-600 font-['Fredoka'] flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4" />
                        <span>{category}</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {slotsInCategory.map((slot) => {
                          const url = getUrl(slot.id);
                          const custom = isCustom(slot.id);
                          return (
                            <div
                              key={slot.id}
                              onClick={() => {
                                setSelectedSlotId(slot.id);
                                setActiveTab('selected');
                              }}
                              className="group relative rounded-xl overflow-hidden border-2 border-pink-200 hover:border-rose-400 bg-neutral-50 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col p-1.5"
                            >
                              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-200 mb-1.5 relative">
                                <img
                                  src={url}
                                  alt={slot.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                {custom && (
                                  <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                                    Custom
                                  </div>
                                )}
                              </div>
                              <span className="text-[11px] font-semibold text-slate-700 truncate block">
                                {slot.name}
                              </span>
                              <span className="text-[9px] text-rose-500 font-bold group-hover:underline">
                                Click to replace ✎
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            /* Option 1: Hosting & Permanent Baking Tab */
            <div className="space-y-5">
              {/* Option 1 Overview Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-pink-200 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-rose-700 font-['Fredoka']">
                      Option 1 Selected: Bake Photos into Website
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      By embedding your photos directly into the website's project code,{' '}
                      <strong className="text-rose-600">
                        anyone who opens your hosted link (including your boyfriend on his phone)
                      </strong>{' '}
                      will immediately see YOUR romantic photos automatically without having to upload or log in!
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Copy Action */}
              <div className="p-4 rounded-2xl bg-white border border-pink-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 font-['Fredoka'] uppercase tracking-wider">
                      Current Custom Photos:
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-rose-600">
                      {Object.keys(photos).length} of {PHOTO_SLOTS.length} slots customized
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {Object.keys(photos).length > 0
                      ? 'You have photos uploaded in browser memory ready to bake into code!'
                      : 'Upload some photos in the 📸 Upload tab or paste links below.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const json = exportJSON();
                    navigator.clipboard.writeText(json);
                    setHasCopied(true);
                    sound.playVictory();
                    confetti({
                      particleCount: 30,
                      spread: 50,
                      origin: { y: 0.6 },
                      colors: ['#e11d48', '#fda4af', '#ffffff'],
                    });
                    setTimeout(() => setHasCopied(false), 3000);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow cursor-pointer transition-all active:scale-95 shrink-0"
                >
                  {hasCopied ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-emerald-200" />
                      <span>Copied Config to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>📋 Copy Photo Config for Chat</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3 Simple Ways to Provide Your Photos */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-['Fredoka']">
                  How To Give Us Your Photos (Choose Any):
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <span>1️⃣ In Chat (Easiest)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Upload your photos right in this chat or paste their links (Google Drive, Imgur, Discord, etc.), and tell me which slot to put them in!
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <span>2️⃣ Upload &amp; Copy</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Use the <strong>📸 Upload</strong> tab to select pictures from your phone/laptop, then click <strong>Copy Photo Config</strong> and paste it into our chat!
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <span>3️⃣ Public Images Folder</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      Place your image files in the project folder at <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/public/images/</code> as <code className="text-rose-600">youre-my-main.jpg</code>, etc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Slots Reference Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-700 font-['Fredoka']">
                    All Photo Slots Reference:
                  </h5>
                  <span className="text-[11px] text-slate-400">
                    Click any slot to customize immediately
                  </span>
                </div>
                <div className="max-h-48 overflow-y-auto border border-pink-100 rounded-xl divide-y divide-pink-50 bg-white">
                  {PHOTO_SLOTS.map((slot) => {
                    const custom = isCustom(slot.id);
                    return (
                      <div
                        key={slot.id}
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          setActiveTab('selected');
                        }}
                        className="p-2 sm:px-3 flex items-center justify-between text-xs hover:bg-pink-50/60 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {slot.id}
                          </span>
                          <span className="font-medium text-slate-700">{slot.name}</span>
                          <span className="text-[10px] text-rose-400 font-semibold hidden sm:inline">
                            ({slot.category})
                          </span>
                        </div>
                        <div>
                          {custom ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                              ✓ Custom Ready
                            </span>
                          ) : (
                            <span className="text-[11px] text-rose-500 font-bold hover:underline">
                              Replace ✎
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-pink-50/70 p-3 sm:p-4 border-t border-pink-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            ✨ Your photos are saved automatically in your browser.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow cursor-pointer font-['Fredoka'] ml-auto transition-colors"
          >
            Done &amp; Enjoy! 💖
          </button>
        </div>
      </div>
    </div>
  );
};
