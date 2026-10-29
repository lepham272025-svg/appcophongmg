import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Volume2, Award, Star, CheckCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { ECO_SCENARIOS, EcoChoice } from '../../data/gamesData';

interface GameEcoVillageProps {
  onBack: () => void;
}

export const GameEcoVillage: React.FC<GameEcoVillageProps> = ({ onBack }) => {
  const { addStar } = useApp();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isPositive: boolean; message: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const scenario: EcoChoice = ECO_SCENARIOS[currentIdx];

  const speakPrompt = () => {
    soundManager.speakVietnamese(`${scenario.situation} ${scenario.audioText}`);
  };

  const handleSelectOption = (opt: typeof scenario.options[0]) => {
    soundManager.playClick();
    if (opt.isPositive) {
      soundManager.playSuccessChime();
      setFeedback({
        isPositive: true,
        message: opt.feedback,
      });
      soundManager.speakVietnamese(opt.feedback);
      addStar(1);

      setTimeout(() => {
        if (currentIdx < ECO_SCENARIOS.length - 1) {
          setCurrentIdx(i => i + 1);
          setFeedback(null);
        } else {
          setIsGameOver(true);
          soundManager.playCelebrationFanfare();
        }
      }, 2500);
    } else {
      soundManager.playEncouragingChime();
      setFeedback({
        isPositive: false,
        message: opt.feedback,
      });
      soundManager.speakVietnamese(opt.feedback);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setFeedback(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-4 border-[#FFCD53]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bản đồ trò chơi</span>
        </button>

        <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1 rounded-xl">
          Tình huống {currentIdx + 1} / {ECO_SCENARIOS.length}
        </span>

        <button
          onClick={resetGame}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
          title="Chơi lại từ đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {isGameOver ? (
        <div className="text-center py-12 px-4 animate-fadeIn">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce text-white">
            <Award className="w-14 h-14" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            BÉ LÀ HIỆP SĨ BẢO VỆ BẢN LÀNG XANH!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
            Bé biết yêu thiên nhiên, giữ sạch nguồn nước và bảo vệ cảnh quan Điện Biên tươi đẹp!
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
              Chơi lại lần nữa
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
          {/* Situation Box */}
          <div className="bg-gradient-to-b from-emerald-50 to-teal-50 border-3 border-emerald-200 rounded-3xl p-5 mb-6 relative">
            <button
              onClick={speakPrompt}
              className="absolute top-4 right-4 p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-transform active:scale-90"
              title="Nghe giọng đọc tình huống"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <span className="text-4xl block mb-2">🌱</span>
            <h3 className="text-lg sm:text-xl font-black text-emerald-950 pr-12">
              {scenario.situation}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-1">
              Bé hãy chọn hành động đúng đắn và tốt nhất ở bên dưới nhé:
            </p>
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-2xl mb-4 text-center font-extrabold text-sm sm:text-base border-2 ${
                feedback.isPositive
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : 'bg-amber-100 text-amber-950 border-amber-300'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* 2 Big Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {scenario.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className="p-6 bg-white rounded-3xl border-3 border-[#FFCD53] hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-102 active:scale-95 flex flex-col items-center justify-center gap-3 text-center group"
              >
                <div className="text-6xl drop-shadow-sm group-hover:scale-110 transition-transform">
                  {opt.emoji}
                </div>
                <span className="text-base sm:text-lg font-black text-slate-800">
                  {opt.text}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Chạm để chọn
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
