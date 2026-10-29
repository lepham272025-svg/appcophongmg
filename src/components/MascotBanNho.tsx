import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useApp } from '../context/AppContext';

interface MascotBanNhoProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showBubble?: boolean;
  onActionClick?: () => void;
  actionText?: string;
}

export const MascotBanNho: React.FC<MascotBanNhoProps> = ({
  message = 'Xin chào các bạn! Mình là Bạn Ban Nhỏ. Chúng mình cùng khám phá Điện Biên nhé!',
  size = 'md',
  showBubble = true,
  onActionClick,
  actionText,
}) => {
  const { soundEnabled } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = soundManager.subscribe((st) => {
      if (!st.isSpeaking) {
        setIsSpeaking(false);
      }
    });
    return unsub;
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      soundManager.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    soundManager.playClick();
    setIsSpeaking(true);
    const success = soundManager.speakVietnamese(message, () => {
      setIsSpeaking(false);
    });
    if (!success) {
      setIsSpeaking(false);
    }
  };

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 md:w-36 md:h-36',
    lg: 'w-44 h-44 md:w-52 md:h-52',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 relative select-none">
      {/* Animated Cartoon Flower Mascot */}
      <div
        className={`relative ${sizeClasses[size]} cursor-pointer group transition-transform duration-300 hover:scale-105`}
        onClick={handleSpeak}
        title="Bấm vào Bạn Ban Nhỏ để nghe bạn nói chuyện nhé!"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl animate-float-gentle"
        >
          {/* Defs for soft gradients and glow */}
          <defs>
            <linearGradient id="banPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFF0F5" />
              <stop offset="100%" stopColor="#FB789E" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <radialGradient id="sunPistil" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="80%" stopColor="#FFCD53" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>

          {/* 5 Ban Petals */}
          {/* Top Petal (Distinctive purple-pink veins in Dien Bien Ban Flower) */}
          <path
            d="M 100,100 C 70,25 130,25 100,100"
            fill="url(#banPetalGrad)"
            stroke="#F472B6"
            strokeWidth="3"
          />
          {/* Top Right Petal */}
          <path
            d="M 100,100 C 170,40 185,100 100,100"
            fill="url(#banPetalGrad)"
            stroke="#F472B6"
            strokeWidth="3"
          />
          {/* Bottom Right Petal */}
          <path
            d="M 100,100 C 160,170 110,185 100,100"
            fill="url(#banPetalGrad)"
            stroke="#F472B6"
            strokeWidth="3"
          />
          {/* Bottom Left Petal */}
          <path
            d="M 100,100 C 90,185 40,170 100,100"
            fill="url(#banPetalGrad)"
            stroke="#F472B6"
            strokeWidth="3"
          />
          {/* Top Left Petal */}
          <path
            d="M 100,100 C 15,100 30,40 100,100"
            fill="url(#banPetalGrad)"
            stroke="#F472B6"
            strokeWidth="3"
          />

          {/* Center Mascot Head */}
          <circle cx="100" cy="100" r="42" fill="url(#sunPistil)" stroke="#F59E0B" strokeWidth="3" />

          {/* Rosy Cheeks */}
          <circle cx="78" cy="108" r="8" fill="#FB789E" opacity="0.6" />
          <circle cx="122" cy="108" r="8" fill="#FB789E" opacity="0.6" />

          {/* Eyes (Big friendly preschool anime eyes) */}
          <circle cx="82" cy="94" r="6" fill="#1E293B" />
          <circle cx="84" cy="92" r="2.2" fill="#FFFFFF" />
          <circle cx="118" cy="94" r="6" fill="#1E293B" />
          <circle cx="120" cy="92" r="2.2" fill="#FFFFFF" />

          {/* Cute Smile */}
          <path
            d="M 88,105 Q 100,118 112,105"
            fill="none"
            stroke="#831843"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Little green hands waving */}
          <path
            d="M 52,118 C 30,105 32,85 46,95 C 44,110 52,118 52,118"
            fill="url(#leafGrad)"
            stroke="#10B981"
            strokeWidth="2"
            className="animate-wiggle"
            style={{ transformOrigin: '52px 118px' }}
          />
          <path
            d="M 148,118 C 170,110 168,90 154,100 C 156,110 148,118 148,118"
            fill="url(#leafGrad)"
            stroke="#10B981"
            strokeWidth="2"
          />

          {/* Tiny cute feet */}
          <ellipse cx="88" cy="150" rx="9" ry="5" fill="#FFCD53" stroke="#F59E0B" strokeWidth="2" />
          <ellipse cx="112" cy="150" rx="9" ry="5" fill="#FFCD53" stroke="#F59E0B" strokeWidth="2" />
        </svg>

        {/* Talking sound wave indicator */}
        {isSpeaking && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-pink-500 items-center justify-center text-white text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </span>
        )}
      </div>

      {/* Speech Bubble */}
      {showBubble && (
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 shadow-lg border-3 border-[#FFCD53] max-w-sm relative group">
          {/* Arrow pointing to mascot */}
          <div className="hidden sm:block absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-[#FFCD53]" />

          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FB789E] mb-1 flex items-center gap-1">
                <span>Bạn Ban Nhỏ nói:</span>
              </p>
              <p className="text-sm md:text-base font-semibold text-[#1E293B] leading-relaxed">
                "{message}"
              </p>
            </div>

            {/* Audio Button */}
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-2xl transition-all shadow-sm shrink-0 ${
                isSpeaking
                  ? 'bg-[#FB789E] text-white animate-pulse'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
              }`}
              title="Bé bấm để nghe Bạn Ban Nhỏ đọc nhé!"
              aria-label="Nghe đọc tiếng Việt"
            >
              {isSpeaking ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {actionText && onActionClick && (
            <button
              onClick={onActionClick}
              className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-[#0D65C9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
