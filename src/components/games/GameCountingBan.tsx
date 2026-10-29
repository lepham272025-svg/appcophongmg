import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, ArrowLeft, Star, Award } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useApp } from '../../context/AppContext';

interface GameCountingBanProps {
  onBack: () => void;
}

export const GameCountingBan: React.FC<GameCountingBanProps> = ({ onBack }) => {
  const { addStar } = useApp();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [flowerCount, setFlowerCount] = useState<number>(3);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [flowers, setFlowers] = useState<{ id: number; top: number; left: number; rotation: number; scale: number }[]>([]);
  const [round, setRound] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const initRound = (diff = difficulty) => {
    let max = 5;
    let min = 1;
    if (diff === 'medium') {
      min = 3;
      max = 8;
    } else if (diff === 'hard') {
      min = 5;
      max = 10;
    }

    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    setFlowerCount(count);
    setSelectedNumber(null);
    setFeedback(null);

    // Generate non-overlapping pseudo-random coordinates
    const newFlowers = [];
    for (let i = 0; i < count; i++) {
      newFlowers.push({
        id: i,
        top: 15 + Math.random() * 65, // percentage
        left: 10 + Math.random() * 80, // percentage
        rotation: Math.floor(Math.random() * 360),
        scale: 0.85 + Math.random() * 0.35,
      });
    }
    setFlowers(newFlowers);

    // Generate 3 choices (1 correct, 2 plausible wrong choices)
    const choices = new Set<number>([count]);
    while (choices.size < 3) {
      const delta = Math.random() > 0.5 ? 1 : -1;
      let wrong = count + delta * (Math.floor(Math.random() * 3) + 1);
      if (wrong < 1) wrong = 1;
      if (wrong > 10) wrong = 10;
      choices.add(wrong);
    }
    const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  };

  useEffect(() => {
    initRound(difficulty);
  }, [difficulty]);

  const speakPrompt = () => {
    soundManager.speakVietnamese('Bé hãy đếm xem có bao nhiêu bông hoa ban đang nở trên sườn đồi nhé!');
  };

  const handleSelectNumber = (num: number) => {
    if (selectedNumber !== null) return; // Prevent multiple taps
    setSelectedNumber(num);

    if (num === flowerCount) {
      soundManager.playSuccessChime();
      setFeedback({
        isCorrect: true,
        message: 'Giỏi quá! Con đã đếm rất chính xác!',
      });
      soundManager.speakVietnamese('Giỏi quá! Con đã đếm rất chính xác!');
      addStar(1);

      setTimeout(() => {
        if (round >= 4) {
          setIsGameOver(true);
          soundManager.playCelebrationFanfare();
        } else {
          setRound(r => r + 1);
          initRound();
        }
      }, 1800);
    } else {
      soundManager.playEncouragingChime();
      setFeedback({
        isCorrect: false,
        message: 'Con thử đếm lại từng bông hoa nhé!',
      });
      soundManager.speakVietnamese('Con thử đếm lại từng bông hoa nhé!');
      setTimeout(() => {
        setSelectedNumber(null);
        setFeedback(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setRound(1);
    setIsGameOver(false);
    initRound();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-4 border-[#FFCD53]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bản đồ trò chơi</span>
        </button>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-2xl border border-amber-200">
          {(['easy', 'medium', 'hard'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundManager.playClick();
                setDifficulty(lvl);
                setRound(1);
                setIsGameOver(false);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                difficulty === lvl
                  ? 'bg-[#FB789E] text-white shadow-sm'
                  : 'text-amber-900 hover:bg-amber-100'
              }`}
            >
              {lvl === 'easy' ? 'Dễ (1-5)' : lvl === 'medium' ? 'Vừa (1-8)' : 'Thử thách (1-10)'}
            </button>
          ))}
        </div>

        {/* Round tracker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-slate-500 uppercase">Lượt {round}/4</span>
          <button
            onClick={resetGame}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main play arena */}
      {isGameOver ? (
        <div className="text-center py-12 px-4 animate-fadeIn">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-amber-300 to-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
            <Award className="w-14 h-14 text-amber-900" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            HOAN HÔ BÉ ĐÃ HOÀN THÀNH XUẤT SẮC!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
            Bé đếm hoa ban rất giỏi! Cô tặng bé thêm những ngôi sao chăm ngoan!
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-500 animate-pulse" />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-[#0D65C9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              Chơi thêm một lần nữa
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl transition-all"
            >
              Chọn trò chơi khác
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {/* Question / Instruction banner */}
          <div className="flex items-center justify-between gap-3 bg-pink-50 border-2 border-pink-200 rounded-2xl p-3 sm:p-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌸</span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-pink-900">
                  Bé hãy đếm xem có bao nhiêu bông hoa ban đang nở?
                </h3>
                <p className="text-xs text-pink-700 font-semibold">
                  Chạm vào từng bông hoa để đếm, rồi chọn số tương ứng ở bên dưới nhé!
                </p>
              </div>
            </div>
            <button
              onClick={speakPrompt}
              className="p-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl shadow-md transition-transform active:scale-90 shrink-0"
              title="Nghe hướng dẫn"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Spring meadow canvas with blooming flowers */}
          <div className="relative w-full h-64 sm:h-80 bg-gradient-to-b from-sky-100 via-emerald-50 to-emerald-100 rounded-3xl border-3 border-emerald-200 overflow-hidden shadow-inner mb-6">
            {/* Background grass hills */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute -bottom-10 -left-10 w-96 h-48 bg-emerald-300 rounded-full" />
              <div className="absolute -bottom-16 -right-10 w-96 h-56 bg-emerald-200 rounded-full" />
            </div>

            {/* Render Ban Flowers */}
            {flowers.map((flw, idx) => (
              <div
                key={flw.id}
                onClick={() => {
                  soundManager.playClick();
                  soundManager.speakVietnamese((idx + 1).toString());
                }}
                className="absolute cursor-pointer transition-transform duration-300 hover:scale-125 select-none active:scale-110"
                style={{
                  top: `${flw.top}%`,
                  left: `${flw.left}%`,
                  transform: `rotate(${flw.rotation}deg) scale(${flw.scale})`,
                }}
                title={`Hoa số ${idx + 1} (Bấm vào để đếm)`}
              >
                <div className="w-14 h-14 relative drop-shadow-md">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* 5 Petals */}
                    <ellipse cx="50" cy="20" rx="14" ry="18" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" />
                    <ellipse cx="78" cy="40" rx="14" ry="18" fill="#FFF0F5" stroke="#F472B6" strokeWidth="2.5" transform="rotate(72 78 40)" />
                    <ellipse cx="68" cy="78" rx="14" ry="18" fill="#FFF0F5" stroke="#F472B6" strokeWidth="2.5" transform="rotate(144 68 78)" />
                    <ellipse cx="32" cy="78" rx="14" ry="18" fill="#FFF0F5" stroke="#F472B6" strokeWidth="2.5" transform="rotate(216 32 78)" />
                    <ellipse cx="22" cy="40" rx="14" ry="18" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2.5" transform="rotate(288 22 40)" />
                    {/* Yellow center pistil */}
                    <circle cx="50" cy="50" r="11" fill="#FFCD53" stroke="#F59E0B" strokeWidth="2" />
                    {/* Little numbered badge to help visual counting */}
                    <text x="50" y="55" textAnchor="middle" fontSize="13" fontWeight="900" fill="#92400E">
                      {idx + 1}
                    </text>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback popup message */}
          {feedback && (
            <div
              className={`p-3 rounded-2xl mb-4 text-center font-extrabold text-base sm:text-lg animate-bounce ${
                feedback.isCorrect
                  ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
                  : 'bg-rose-100 text-rose-900 border-2 border-rose-300'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Big number selection buttons (Zero-pill, soft rounded rectangles) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {options.map((num) => {
              const isSelected = selectedNumber === num;
              return (
                <button
                  key={num}
                  onClick={() => handleSelectNumber(num)}
                  disabled={selectedNumber !== null}
                  className={`py-4 sm:py-6 rounded-3xl font-black text-3xl sm:text-4xl shadow-lg border-4 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? num === flowerCount
                        ? 'bg-emerald-500 border-emerald-600 text-white scale-105 shadow-emerald-200'
                        : 'bg-rose-500 border-rose-600 text-white'
                      : 'bg-gradient-to-b from-white to-amber-50 border-[#FFCD53] text-[#0D65C9] hover:bg-amber-100 hover:scale-102'
                  }`}
                >
                  <span>{num}</span>
                  <span className="text-xs font-bold text-slate-500">
                    {num === 1 ? '1 bông' : `${num} bông hoa`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
