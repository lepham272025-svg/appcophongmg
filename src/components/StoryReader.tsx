import React, { useState } from 'react';
import { SAMPLE_STORIES, StoryBook } from '../data/sampleData';
import { soundManager } from '../utils/audio';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Sparkles,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StoryReader: React.FC = () => {
  const { addStar } = useApp();
  const [activeStory, setActiveStory] = useState<StoryBook | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleSelectStory = (story: StoryBook) => {
    soundManager.playClick();
    setActiveStory(story);
    setCurrentPage(0);
    setIsReading(true);
    soundManager.speakVietnamese(`Mời các bé lắng nghe câu chuyện: ${story.title}`, () => {
      setIsReading(false);
    });
  };

  const handleBackToLibrary = () => {
    soundManager.playClick();
    soundManager.stopSpeaking();
    setIsReading(false);
    setIsPaused(false);
    setActiveStory(null);
  };

  const handleNextPage = () => {
    if (!activeStory) return;
    soundManager.playClick();
    soundManager.stopSpeaking();
    setIsReading(false);
    setIsPaused(false);
    if (currentPage < activeStory.pages.length - 1) {
      setCurrentPage(p => p + 1);
    } else {
      // Completed reading whole story
      soundManager.playCelebrationFanfare();
      soundManager.speakVietnamese('Bé đã đọc xong câu chuyện thật chăm chỉ! Cô khen ngợi con nhé!');
      addStar(2);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      soundManager.playClick();
      soundManager.stopSpeaking();
      setIsReading(false);
      setIsPaused(false);
      setCurrentPage(p => p - 1);
    }
  };

  const speakCurrentPage = () => {
    if (!activeStory) return;
    if (isReading) {
      soundManager.stopSpeaking();
      setIsReading(false);
      setIsPaused(false);
      return;
    }
    const page = activeStory.pages[currentPage];
    const fullText = `${page.text} ${page.dialogue || ''}`;
    setIsReading(true);
    setIsPaused(false);
    soundManager.speakVietnamese(fullText, () => {
      setIsReading(false);
      setIsPaused(false);
    });
  };

  const togglePauseResume = () => {
    soundManager.playClick();
    if (isPaused) {
      soundManager.resumeSpeaking();
      setIsPaused(false);
    } else {
      soundManager.pauseSpeaking();
      setIsPaused(true);
    }
  };

  const replayCurrentPage = () => {
    soundManager.playClick();
    speakCurrentPage();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {!activeStory ? (
        <div>
          {/* Library Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-3 border border-purple-300">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>THƯ VIỆN CÂU CHUYỆN BẢN LÀNG EM</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D65C9] tracking-tight mb-3">
              TRUYỆN KỂ MẦM NON ĐIỆN BIÊN
            </h1>
            <p className="text-base sm:text-lg font-semibold text-slate-600">
              Những câu chuyện ngắn ấm áp, trong sáng dạy bé tình yêu quê hương, lòng biết ơn và bảo vệ thiên nhiên bản làng.
            </p>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_STORIES.map((story) => (
              <div
                key={story.slug}
                onClick={() => handleSelectStory(story)}
                className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-4 border-[#FFCD53] hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-4xl mb-4 shadow-inner group-hover:scale-105 transition-transform">
                    {story.coverEmoji}
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200 mb-2 inline-block">
                    {story.theme}
                  </span>
                  <h3 className="text-xl font-black text-[#0D65C9] group-hover:text-purple-700 transition-colors mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                    {story.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs text-amber-800 font-bold mb-3">
                    Bài học: {story.moralLesson}
                  </p>
                  <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold rounded-2xl shadow-md text-sm flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>MỞ TRUYỆN ĐỌC CÙNG BÉ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Reading Book View */
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border-4 border-[#FFCD53] overflow-hidden">
          {/* Top Bar */}
          <div className="p-4 bg-purple-50 border-b-2 border-purple-100 flex items-center justify-between gap-3">
            <button
              onClick={handleBackToLibrary}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs sm:text-sm border border-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về thư viện truyện</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-purple-900 bg-purple-100 px-3 py-1 rounded-xl">
                Trang {currentPage + 1} / {activeStory.pages.length}
              </span>
            </div>
          </div>

          {/* Book Page Content */}
          <div className="p-6 sm:p-8">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-1">
                {activeStory.title}
              </h2>
              <p className="text-xs font-bold text-purple-700">
                {activeStory.theme}
              </p>
            </div>

            {/* Illustration Frame */}
            <div className="bg-gradient-to-b from-sky-50 via-purple-50 to-pink-50 rounded-3xl border-3 border-purple-200 p-6 sm:p-8 text-center mb-6 shadow-inner relative">
              {/* Audio Controls Bar */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {isReading && (
                  <button
                    onClick={togglePauseResume}
                    className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all"
                    title={isPaused ? 'Tiếp tục đọc' : 'Tạm dừng đọc'}
                    aria-label="Tạm dừng hoặc tiếp tục"
                  >
                    {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4 fill-white" />}
                  </button>
                )}

                <button
                  onClick={speakCurrentPage}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl shadow-md transition-all font-bold text-xs sm:text-sm ${
                    isReading
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  title="Nghe cô đọc truyện tiếng Việt"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isReading ? 'Dừng đọc' : 'Nghe đọc'}</span>
                </button>

                <button
                  onClick={replayCurrentPage}
                  className="p-2.5 rounded-2xl bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 shadow-sm transition-all"
                  title="Đọc lại trang này"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="text-6xl sm:text-7xl mb-4 animate-float-gentle select-none">
                {activeStory.coverEmoji}
              </div>

              {/* Scene description for visual imagination */}
              <div className="text-xs italic text-slate-500 mb-4 bg-white/70 py-1.5 px-3 rounded-xl inline-block border border-purple-100">
                🎨 Khung cảnh: {activeStory.pages[currentPage].illustrationText}
              </div>

              {/* Main story text */}
              <p className="text-base sm:text-xl font-bold text-slate-800 leading-relaxed mb-4 text-justify sm:text-center">
                {activeStory.pages[currentPage].text}
              </p>

              {/* Character dialogue if present */}
              {activeStory.pages[currentPage].dialogue && (
                <div className="bg-white/90 border-2 border-purple-300 rounded-2xl p-3 sm:p-4 text-sm sm:text-base font-black text-purple-900 shadow-sm max-w-lg mx-auto">
                  {activeStory.pages[currentPage].dialogue}
                </div>
              )}
            </div>

            {/* Page navigation buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-black rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Trang trước</span>
              </button>

              <div className="flex items-center gap-1.5">
                {activeStory.pages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentPage === i ? 'bg-purple-600 scale-125' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <span>
                  {currentPage === activeStory.pages.length - 1 ? 'Hoàn thành' : 'Trang sau'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Questions for thinking & extension activity */}
            <div className="mt-8 pt-6 border-t-2 border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <h4 className="font-black text-xs uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Câu hỏi gợi mở cho bé:</span>
                </h4>
                <ul className="text-xs text-slate-700 font-semibold space-y-1.5 list-disc pl-4">
                  {activeStory.questions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <h4 className="font-black text-xs uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Hoạt động trải nghiệm sau truyện:</span>
                </h4>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {activeStory.extensionActivity}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
