import React, { useState } from 'react';
import { STEAM_ACTIVITIES, SteamActivity } from '../data/sampleData';
import { soundManager } from '../utils/audio';
import {
  Sparkles,
  Printer,
  ShieldAlert,
  Clock,
  Target,
  Layers,
  ChevronDown,
  ChevronUp,
  Volume2,
} from 'lucide-react';

export const SteamHub: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<SteamActivity | null>(null);

  const handleOpenActivity = (act: SteamActivity) => {
    soundManager.playClick();
    setSelectedActivity(selectedActivity?.id === act.id ? null : act);
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-3 border border-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>GÓC TRẢI NGHIỆM STEAM MẦM NON 5–6 TUỔI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D65C9] tracking-tight mb-3">
          HOẠT ĐỘNG SÁNG TẠO STEAM
        </h1>
        <p className="text-base sm:text-lg font-semibold text-slate-600">
          Khám phá khoa học, công nghệ, kỹ thuật, nghệ thuật và toán học từ thiên nhiên, bản làng Điện Biên với nguyên vật liệu an toàn, dễ tìm.
        </p>
      </div>

      {/* Activities Accordion / Cards List */}
      <div className="space-y-6">
        {STEAM_ACTIVITIES.map((act, index) => {
          const isOpen = selectedActivity?.id === act.id;

          return (
            <div
              key={act.id}
              className={`bg-white rounded-3xl border-4 transition-all duration-300 shadow-md ${
                isOpen ? 'border-[#0D65C9] ring-2 ring-blue-200' : 'border-[#FFCD53] hover:border-emerald-400'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => handleOpenActivity(act)}
                className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl shadow-inner shrink-0">
                    {act.icon}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Hoạt động {index + 1}
                      </span>
                      <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {act.timeEstimate}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-[#0D65C9]">
                      {act.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                      {act.targetDomain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick();
                      soundManager.speakVietnamese(
                        `Hoạt động trải nghiệm: ${act.title}. ${act.targetDomain}. Thời gian thực hiện: ${act.timeEstimate}. ${act.objectives.join('. ')}`
                      );
                    }}
                    className="p-2 sm:px-3 sm:py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-colors no-print"
                    title="Nghe cô đọc hướng dẫn hoạt động này"
                  >
                    <Volume2 className="w-4 h-4 text-pink-600" />
                    <span className="hidden sm:inline">Nghe đọc</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-colors no-print"
                    title="In hướng dẫn hoạt động này"
                  >
                    <Printer className="w-4 h-4 text-blue-600" />
                    <span className="hidden sm:inline">In hướng dẫn</span>
                  </button>
                  <div className="p-2 text-slate-400">
                    {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </div>

              {/* Detailed Expanded Body */}
              {isOpen && (
                <div className="p-5 sm:p-6 border-t-2 border-slate-100 space-y-6 animate-fadeIn">
                  {/* Objectives */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>Mục tiêu giáo dục:</span>
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1 font-semibold list-disc pl-5">
                      {act.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Materials */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-600" />
                      <span>Chuẩn bị học liệu & đồ dùng:</span>
                    </h4>
                    <ul className="text-sm text-amber-950 space-y-1 font-medium list-disc pl-5">
                      {act.materials.map((mat, i) => (
                        <li key={i}>{mat}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-amber-800 font-bold mt-2 italic">
                      💡 Vật liệu thay thế khi thiếu: {act.alternativeMaterials}
                    </p>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Các bước tổ chức cho trẻ:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {act.steps.map((st) => (
                        <div
                          key={st.order}
                          className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                              {st.order}
                            </span>
                            <h5 className="font-bold text-sm text-slate-900">
                              {st.title}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {st.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guiding Questions & Safety */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
                      <h5 className="font-black text-xs uppercase tracking-wider text-sky-900 mb-2">
                        Câu hỏi gợi mở của cô:
                      </h5>
                      <ul className="text-xs text-slate-700 font-semibold space-y-1 list-disc pl-4">
                        {act.guidingQuestions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                      <h5 className="font-black text-xs uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>Lưu ý an toàn cho trẻ:</span>
                      </h5>
                      <p className="text-xs text-rose-950 font-semibold leading-relaxed">
                        {act.safetyNotes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
