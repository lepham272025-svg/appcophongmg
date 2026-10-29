import React, { useState } from 'react';
import { ArrowLeft, Volume2, RotateCcw, Award, Star } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import { LETTER_ITEMS, LetterItem } from '../../data/gamesData';

interface GameLettersProps {
  onBack: () => void;
}

export const GameLetters: React.FC<GameLettersProps> = ({ onBack }) => {
  const { addStar } = useApp();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const currentItem = LETTER_ITEMS[currentIndex];

  // Generate 3 choices (including correct letter)
  const getOptions = (target: LetterItem): string[] => {
    const letters = ['B', 'N', 'S', 'T', 'L'];
    const otherLetters = letters.filter(l => l !== target.letter);
    const shuffledOthers = otherLetters.sort(() => Math.random() - 0.5).slice(0, 2);
    return [target.letter, ...shuffledOthers].sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState<string[]>(() => getOptions(currentItem));

  const speakCurrentItem = () => {
    soundManager.speakVietnamese(`Chữ ${currentItem.letter}, trong từ ${currentItem.word}. ${currentItem.meaning}`);
  };

  const handleSelectOption = (letter: string) => {
    if (selectedLetter !== null) return;
    setSelectedLetter(letter);

    if (letter === currentItem.letter) {
      soundManager.playSuccessChime();
      setFeedback({
        isCorrect: true,
        message: `Đúng rồi! Chữ ${currentItem.letter} trong từ "${currentItem.word}"!`,
      });
      soundManager.speakVietnamese(`Đúng rồi! Chữ ${currentItem.letter} trong từ ${currentItem.word}! Bé giỏi lắm!`);
      addStar(1);

      setTimeout(() => {
        if (currentIndex < LETTER_ITEMS.length - 1) {
          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          setOptions(getOptions(LETTER_ITEMS[nextIdx]));
          setSelectedLetter(null);
          setFeedback(null);
        } else {
          setIsGameOver(true);
          soundManager.playCelebrationFanfare();
        }
      }, 1800);
    } else {
      soundManager.playEncouragingChime();
      setFeedback({
        isCorrect: false,
        message: `Con thử nhìn kỹ lại chữ cái của "${currentItem.word}" nhé!`,
      });
      soundManager.speakVietnamese(`Con thử lắng nghe và chọn lại nhé!`);
      setTimeout(() => {
        setSelectedLetter(null);
        setFeedback(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedLetter(null);
    setFeedback(null);
    setIsGameOver(false);
    setOptions(getOptions(LETTER_ITEMS[0]));
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

        <span className="bg-sky-100 text-sky-800 font-extrabold text-xs px-3 py-1 rounded-xl">
          Chữ {currentIndex + 1} / {LETTER_ITEMS.length}
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
        <div className="text-center py-12 px-4">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce text-white">
            <Award className="w-14 h-14" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            BÉ LÀM QUEN CHỮ CÁI THẬT GIỎI!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
            Bé đã nhận biết xuất sắc các chữ cái B, N, S, T, L gắn liền với quê hương Điện Biên!
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
          {/* Prompt card with visual illustration */}
          <div className="bg-gradient-to-b from-sky-50 to-blue-50 border-3 border-sky-200 rounded-3xl p-6 text-center relative mb-6 shadow-sm">
            <button
              onClick={speakCurrentItem}
              className="absolute top-4 right-4 p-2.5 bg-[#0D65C9] hover:bg-blue-700 text-white rounded-2xl shadow-md transition-transform active:scale-90"
              title="Nghe phát âm chữ cái và từ"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <div className="text-6xl sm:text-7xl mb-3 select-none animate-float-gentle">
              {currentItem.emoji}
            </div>

            <div className="text-2xl sm:text-3xl font-black text-[#0D65C9] tracking-wide mb-1">
              {currentItem.word}
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-md mx-auto">
              {currentItem.meaning}
            </p>

            <div className="mt-4 inline-block bg-white px-4 py-1.5 rounded-2xl border border-sky-200 text-xs sm:text-sm font-bold text-sky-800">
              Chữ cái nào bắt đầu cho từ <span className="text-rose-600 font-black">"{currentItem.word}"</span> vậy bé?
            </div>
          </div>

          {/* Feedback banner */}
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

          {/* Letter Choices */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {options.map((letter) => {
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => handleSelectOption(letter)}
                  disabled={selectedLetter !== null}
                  className={`py-6 sm:py-8 rounded-3xl font-black text-4xl sm:text-5xl shadow-lg border-4 transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? letter === currentItem.letter
                        ? 'bg-emerald-500 border-emerald-600 text-white scale-105 shadow-emerald-200'
                        : 'bg-rose-500 border-rose-600 text-white'
                      : 'bg-white border-[#FFCD53] text-[#0D65C9] hover:bg-amber-50 hover:scale-102'
                  }`}
                >
                  <span>{letter}</span>
                  <span className="text-xs font-bold text-slate-400">
                    Chữ {letter}
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
