import React, { useState } from 'react';
import { REGIONS_DATA, RegionData } from '../data/sampleData';
import { soundManager } from '../utils/audio';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Volume2,
  Sparkles,
  CheckCircle,
  Gamepad2,
  X,
  Star,
  Compass,
} from 'lucide-react';

interface ExplorationMapProps {
  onSelectGame: (gameSlug: string) => void;
}

export const ExplorationMap: React.FC<ExplorationMapProps> = ({ onSelectGame }) => {
  const { completedRegions, markRegionCompleted, addStar } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const handleOpenRegion = (region: RegionData) => {
    soundManager.playClick();
    setSelectedRegion(region);
    setQuizAnswer(null);
    setQuizFeedback(null);
    soundManager.speakVietnamese(`Chào mừng bé đến với ${region.title}! ${region.subTitle}`);
  };

  const handleCloseModal = () => {
    soundManager.playClick();
    setSelectedRegion(null);
  };

  const handleAnswerQuiz = (index: number) => {
    if (!selectedRegion) return;
    setQuizAnswer(index);
    if (index === selectedRegion.quickQuiz.correctIndex) {
      soundManager.playSuccessChime();
      setQuizFeedback(`Giỏi quá! ${selectedRegion.quickQuiz.explanation}`);
      soundManager.speakVietnamese(`Đúng rồi! ${selectedRegion.quickQuiz.explanation}`);
      markRegionCompleted(selectedRegion.id);
    } else {
      soundManager.playEncouragingChime();
      setQuizFeedback('Chưa đúng rồi, bé hãy thử chọn lại một đáp án khác xem nhé!');
      soundManager.speakVietnamese('Chưa đúng rồi, bé thử chọn lại nhé!');
    }
  };

  const speakText = (text: string) => {
    soundManager.speakVietnamese(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-3 border border-pink-300">
          <Compass className="w-4 h-4 text-pink-600 animate-spin-slow" />
          <span>BẢN ĐỒ PHIÊU LƯU 6 KHU VỰC ĐIỆN BIÊN</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D65C9] tracking-tight mb-2">
          BẢN ĐỒ KHÁM PHÁ ĐIỆN BIÊN
        </h1>
        <p className="text-base sm:text-lg font-semibold text-slate-600">
          Chạm vào từng khu vực trên bản đồ để cùng Bạn Ban Nhỏ tìm hiểu thiên nhiên, văn hóa và nhận những bông hoa khích lệ rực rỡ!
        </p>
      </div>

      {/* Map Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONS_DATA.map((region, idx) => {
          const isDone = completedRegions.includes(region.id);

          return (
            <div
              key={region.id}
              onClick={() => handleOpenRegion(region)}
              className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-4 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              style={{ borderColor: region.themeColor }}
            >
              {/* Region Number & Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-3xl shadow-inner border-2 border-amber-200">
                  {region.icon}
                </div>

                {isDone ? (
                  <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>ĐÃ KHÁM PHÁ</span>
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-600 font-extrabold text-xs px-3 py-1 rounded-full">
                    Khu vực {idx + 1}
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-black text-[#0D65C9] group-hover:text-pink-600 transition-colors mb-1">
                  {region.title}
                </h3>
                <p className="text-xs font-bold text-slate-500 mb-2">
                  {region.subTitle}
                </p>
                <p className="text-sm text-slate-600 line-clamp-2 font-medium">
                  "{region.mascotGreeting}"
                </p>
              </div>

              {/* Action Button */}
              <button
                className="w-full py-2.5 px-4 rounded-2xl font-black text-white text-sm shadow-md transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: region.themeColor }}
              >
                <MapPin className="w-4 h-4" />
                <span>BÉ KHÁM PHÁ NGAY</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Region Exploration Modal */}
      {selectedRegion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-4 border-[#FFCD53] relative">
            {/* Modal Header */}
            <div
              className="p-5 sm:p-6 text-white rounded-t-2xl relative flex items-center justify-between"
              style={{ backgroundColor: selectedRegion.themeColor }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedRegion.icon}</span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    {selectedRegion.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold opacity-95">
                    {selectedRegion.subTitle}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-2xl transition-all"
                title="Đóng cửa sổ"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {/* Mascot Greeting */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌸</span>
                  <p className="text-sm sm:text-base font-bold text-amber-950">
                    "{selectedRegion.mascotGreeting}"
                  </p>
                </div>
                <button
                  onClick={() => speakText(selectedRegion.mascotGreeting)}
                  className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm shrink-0"
                  title="Nghe Bạn Ban Nhỏ nói"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* 3 Knowledge Flashcards */}
              <div>
                <h4 className="text-base font-black text-[#0D65C9] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>3 Điều Kỳ Diệu Bé Khám Phá:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedRegion.cards.map((card, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-pink-300 transition-colors"
                    >
                      <div>
                        <span className="text-2xl mb-2 block">{card.icon}</span>
                        <h5 className="font-bold text-sm text-slate-800 mb-1">
                          {card.title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {card.description}
                        </p>
                      </div>
                      <button
                        onClick={() => speakText(card.audioText)}
                        className="mt-3 py-1.5 px-2 bg-white hover:bg-pink-50 border border-slate-200 text-slate-700 hover:text-pink-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                        title="Nghe đọc thẻ này"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe đọc</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Interactive Quiz */}
              <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm sm:text-base font-black text-sky-950">
                    Câu đố Bạn Ban Nhỏ dành cho bé:
                  </h4>
                  <button
                    onClick={() => speakText(selectedRegion.quickQuiz.question)}
                    className="p-1.5 bg-sky-600 text-white rounded-lg"
                    title="Nghe câu đố"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm font-bold text-slate-700 mb-3">
                  {selectedRegion.quickQuiz.question}
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedRegion.quickQuiz.options.map((opt, optIdx) => {
                    const isSelected = quizAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswerQuiz(optIdx)}
                        className={`p-3 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all ${
                          isSelected
                            ? optIdx === selectedRegion.quickQuiz.correctIndex
                              ? 'bg-emerald-500 border-emerald-600 text-white'
                              : 'bg-rose-500 border-rose-600 text-white'
                            : 'bg-white border-sky-200 text-slate-800 hover:bg-sky-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizFeedback && (
                  <p className="mt-3 text-xs sm:text-sm font-black text-center text-emerald-800 bg-white p-2 rounded-xl border border-emerald-200 animate-bounce">
                    {quizFeedback}
                  </p>
                )}
              </div>

              {/* STEAM connection & Related Game */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-amber-700">Trải nghiệm STEAM: </span>
                  {selectedRegion.steamPrompt.title} – {selectedRegion.steamPrompt.description}
                </div>

                <button
                  onClick={() => {
                    handleCloseModal();
                    onSelectGame(selectedRegion.relatedGameSlug);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0D65C9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-extrabold rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm flex items-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>CHƠI TRÒ CHƠI LIÊN QUAN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
