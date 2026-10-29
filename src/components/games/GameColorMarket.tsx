import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Volume2, Award, Star } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { MARKET_CHALLENGES, MarketChallenge } from '../../data/gamesData';

interface GameColorMarketProps {
  onBack: () => void;
}

export const GameColorMarket: React.FC<GameColorMarketProps> = ({ onBack }) => {
  const { addStar } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const challenge: MarketChallenge = MARKET_CHALLENGES[currentStep];

  const speakPrompt = () => {
    soundManager.speakVietnamese(challenge.audioPrompt);
  };

  const handleSelectItem = (item: typeof challenge.items[0]) => {
    soundManager.playClick();

    if (challenge.type === 'select-color') {
      // multi-select or single
      if (item.isCorrect) {
        soundManager.playSuccessChime();
        setFeedback({
          isCorrect: true,
          message: `Đúng rồi! ${item.name} là quả màu đỏ!`,
        });
        soundManager.speakVietnamese(`Đúng rồi! ${item.name} là màu đỏ!`);
        addStar(1);
        setTimeout(() => nextChallenge(), 1800);
      } else {
        soundManager.playEncouragingChime();
        setFeedback({
          isCorrect: false,
          message: `${item.name} có màu khác rồi, con tìm quả có màu đỏ tươi nhé!`,
        });
        soundManager.speakVietnamese('Con tìm quả có màu đỏ tươi nhé!');
      }
    } else {
      // single choice compare or shape
      if (item.isCorrect) {
        soundManager.playSuccessChime();
        setFeedback({
          isCorrect: true,
          message: challenge.explanation,
        });
        soundManager.speakVietnamese(challenge.explanation);
        addStar(1);
        setTimeout(() => nextChallenge(), 1800);
      } else {
        soundManager.playEncouragingChime();
        setFeedback({
          isCorrect: false,
          message: 'Bé quan sát kỹ lại một chút nhé!',
        });
        soundManager.speakVietnamese('Bé quan sát kỹ lại một chút nhé!');
      }
    }
  };

  const nextChallenge = () => {
    setFeedback(null);
    setSelectedIds([]);
    if (currentStep < MARKET_CHALLENGES.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setIsGameOver(true);
      soundManager.playCelebrationFanfare();
    }
  };

  const resetGame = () => {
    setCurrentStep(0);
    setSelectedIds([]);
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

        <span className="bg-pink-100 text-pink-800 font-extrabold text-xs px-3 py-1 rounded-xl">
          Nhiệm vụ {currentStep + 1} / {MARKET_CHALLENGES.length}
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
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce text-white">
            <Award className="w-14 h-14" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            BÉ ĐI CHỢ PHIÊN THẬT GIỎI!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
            Bé đã nhận biết màu sắc, số lượng và hình dạng các loại nông sản quê em rất xuất sắc!
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
          {/* Challenge Prompt */}
          <div className="flex items-center justify-between gap-3 bg-rose-50 border-2 border-rose-200 rounded-3xl p-4 sm:p-5 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧺</span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-rose-950">
                  {challenge.question}
                </h3>
                <p className="text-xs text-rose-700 font-semibold mt-0.5">
                  Chạm vào món đồ bé chọn ở bên dưới nhé!
                </p>
              </div>
            </div>
            <button
              onClick={speakPrompt}
              className="p-3 bg-[#FB789E] hover:bg-pink-600 text-white rounded-2xl shadow-md shrink-0 transition-transform active:scale-90"
              title="Nghe giọng đọc câu hỏi"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

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

          {/* Market Stalls Grid */}
          <div className={`grid gap-4 sm:gap-6 ${challenge.items.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
            {challenge.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="p-5 sm:p-6 bg-gradient-to-b from-white to-amber-50/60 rounded-3xl border-3 border-[#FFCD53] hover:border-pink-400 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-103 active:scale-95 flex flex-col items-center justify-center gap-3 text-center group"
              >
                <div className="text-5xl sm:text-6xl drop-shadow-sm group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <span className="text-sm sm:text-base font-extrabold text-slate-800">
                  {item.name}
                </span>
                <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
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
