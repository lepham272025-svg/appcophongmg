import React from 'react';
import { MascotBanNho } from './MascotBanNho';
import { DienBienLandscape } from './DienBienLandscape';
import { useApp } from '../context/AppContext';
import { soundManager } from '../utils/audio';
import {
  Compass,
  Gamepad2,
  GraduationCap,
  BookOpen,
  Sparkles,
  Heart,
  Star,
  CheckCircle,
  Languages,
  FileEdit,
  ArrowRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tabId: string, payload?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { teacherAvatar, earnedStars, completedRegions } = useApp();

  const handleAction = (tabId: string) => {
    soundManager.playClick();
    onNavigate(tabId);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section with 2.5D Dien Bien Landscape */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-[#FFF6DF] border-b-4 border-[#FFCD53] pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-pink-200">
                <span className="text-xl">🌸</span>
                <span className="text-xs sm:text-sm font-black text-[#FB789E] uppercase tracking-wider">
                  Trường Mầm non Thanh Yên • Điện Biên (2026–2027)
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0D65C9] tracking-tight leading-tight">
                AI BẢN LÀNG EM
              </h1>

              <p className="text-xl sm:text-2xl font-black text-[#FB789E]">
                Bé khám phá Điện Biên kỳ diệu
              </p>

              <p className="text-base sm:text-lg font-semibold text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Cùng cô Phong khám phá quê hương qua những câu chuyện, trò chơi và hoạt động sáng tạo!
              </p>

              {/* Main Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5 pt-2">
                <button
                  onClick={() => handleAction('kham-pha')}
                  className="px-5 py-3.5 bg-gradient-to-r from-[#0D65C9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base flex items-center gap-2 border-2 border-white"
                >
                  <Compass className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                  <span>KHÁM PHÁ</span>
                </button>

                <button
                  onClick={() => handleAction('tro-choi')}
                  className="px-5 py-3.5 bg-gradient-to-r from-[#FB789E] to-rose-500 hover:from-rose-500 hover:to-pink-600 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base flex items-center gap-2 border-2 border-white"
                >
                  <Gamepad2 className="w-5 h-5 text-yellow-200" />
                  <span>TRÒ CHƠI</span>
                </button>

                <button
                  onClick={() => handleAction('tieng-anh')}
                  className="px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base flex items-center gap-2 border-2 border-amber-300"
                >
                  <Languages className="w-5 h-5 text-amber-300" />
                  <span>BÉ VUI TIẾNG ANH</span>
                </button>

                <button
                  onClick={() => handleAction('soan-giao-an')}
                  className="px-5 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base flex items-center gap-2 border-2 border-teal-200"
                >
                  <FileEdit className="w-5 h-5 text-yellow-200" />
                  <span>SOẠN GIÁO ÁN AI</span>
                </button>

                <button
                  onClick={() => handleAction('giao-vien')}
                  className="px-4 py-3.5 bg-white/95 hover:bg-white text-blue-900 font-extrabold rounded-2xl shadow-md border-2 border-blue-200 hover:border-blue-400 transition-all text-xs sm:text-sm flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  <span>GÓC GIÁO VIÊN</span>
                </button>
              </div>

              {/* Teacher Attribution Banner */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
                <img
                  src={teacherAvatar}
                  alt="Cô giáo Lò Thị Phong"
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#FFCD53] shadow-md"
                />
                <div className="text-left">
                  <p className="text-xs font-black text-slate-800">
                    Giáo viên thực hiện: Lò Thị Phong
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Trường Mầm non Thanh Yên – Xã Thanh Yên, tỉnh Điện Biên
                  </p>
                </div>
              </div>
            </div>

            {/* Right Mascot Hero Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border-4 border-[#FFCD53] shadow-xl max-w-md w-full">
                <MascotBanNho
                  size="lg"
                  message="Xin chào các bạn! Mình là Ban Nhỏ. Chúng mình cùng khám phá Điện Biên nhé!"
                  actionText="Khám phá Vườn Hoa Ban 🌸"
                  onActionClick={() => handleAction('kham-pha')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2.5D Scenic Vector Landscape */}
        <DienBienLandscape className="mt-2" />
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            HÀNH TRÌNH KHÁM PHÁ CÙNG BẠN BAN NHỎ
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-600">
            "Mỗi em bé là một nhà khám phá – Mỗi bản làng là một kho tàng tri thức."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Bản đồ */}
          <div
            onClick={() => handleAction('kham-pha')}
            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border-3 border-pink-300 hover:border-pink-500 transition-all cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <h3 className="text-xl font-black text-[#0D65C9] mb-1">
                6 Vùng Khám Phá
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                Từ Vườn Hoa Ban, Cánh đồng Mường Thanh đến Suối Nậm Rốm trong xanh.
              </p>
            </div>
            <span className="text-xs font-black text-pink-600 flex items-center gap-1">
              Khám phá ngay →
            </span>
          </div>

          {/* Card 2: Trò chơi */}
          <div
            onClick={() => handleAction('tro-choi')}
            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border-3 border-amber-300 hover:border-amber-500 transition-all cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                🎮
              </div>
              <h3 className="text-xl font-black text-[#0D65C9] mb-1">
                6 Trò Chơi Tương Tác
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                Đếm hoa ban, làm quen chữ cái quê em, lắp nhà sàn và tìm đường về bản.
              </p>
            </div>
            <span className="text-xs font-black text-amber-600 flex items-center gap-1">
              Chơi trò chơi →
            </span>
          </div>

          {/* Card 3: Truyện kể */}
          <div
            onClick={() => handleAction('truyen-ke')}
            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border-3 border-purple-300 hover:border-purple-500 transition-all cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                📖
              </div>
              <h3 className="text-xl font-black text-[#0D65C9] mb-1">
                Truyện Kể Điện Biên
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                Những câu chuyện thiếu nhi ấm áp với giọng đọc truyền cảm và câu hỏi gợi mở.
              </p>
            </div>
            <span className="text-xs font-black text-purple-600 flex items-center gap-1">
              Nghe kể chuyện →
            </span>
          </div>

          {/* Card 4: STEAM */}
          <div
            onClick={() => handleAction('steam')}
            className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border-3 border-emerald-300 hover:border-emerald-500 transition-all cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                ✨
              </div>
              <h3 className="text-xl font-black text-[#0D65C9] mb-1">
                Trải Nghiệm STEAM
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                Làm hoa ban giấy xốp, dựng mô hình nhà sàn và khám phá vật nổi - vật chìm.
              </p>
            </div>
            <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
              Xem hoạt động →
            </span>
          </div>
        </div>

        {/* 2 Special Spotlight Cards: English Corner & AI Lesson Planner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Spotlight 1: English Corner */}
          <div
            onClick={() => handleAction('tieng-anh')}
            className="group bg-gradient-to-br from-indigo-500 via-blue-600 to-pink-500 rounded-3xl p-6 sm:p-7 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 relative overflow-hidden border-3 border-amber-300"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-amber-300 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                    Mới: Song ngữ Việt – Anh
                  </span>
                  <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">
                    6 chủ đề • 4 trò chơi
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                  <span>🇬🇧</span>
                  <span>BÉ VUI TIẾNG ANH (ENGLISH CORNER)</span>
                </h3>
                <p className="text-sm text-blue-100 font-semibold leading-relaxed mb-4">
                  Cùng bạn Ban Nhỏ học từ vựng hoa ban, đếm số 1–10, khám phá sắc màu và chơi các mini-game phát âm chuẩn bản ngữ!
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="bg-white text-indigo-700 font-black text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md group-hover:scale-105 transition-transform">
                  <span>Khám phá Góc Tiếng Anh</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-3xl">🌸</span>
              </div>
            </div>
          </div>

          {/* Spotlight 2: AI Lesson Planner */}
          <div
            onClick={() => handleAction('soan-giao-an')}
            className="group bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 rounded-3xl p-6 sm:p-7 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 relative overflow-hidden border-3 border-teal-200"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-yellow-300 text-teal-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                    Trợ lý Giáo viên AI
                  </span>
                  <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">
                    Chuẩn Bộ GD&ĐT • Bảng 4 cột
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                  <span>📝</span>
                  <span>SOẠN KẾ HOẠCH BÀI DẠY AI</span>
                </h3>
                <p className="text-sm text-teal-100 font-semibold leading-relaxed mb-4">
                  Công cụ số hóa cho cô Lò Thị Phong: Soạn giáo án 5 bước sư phạm, tích hợp tiếng Anh, chỉnh sửa trực tiếp và xuất file Word .DOCX chuẩn Unicode.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="bg-white text-teal-800 font-black text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md group-hover:scale-105 transition-transform">
                  <span>Soạn giáo án ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-3xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Pedagogical Seal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FFCD53] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-3xl shrink-0">
              🛡️
            </div>
            <div>
              <h4 className="font-black text-lg text-slate-900">
                Môi Trường Số An Toàn Tuyệt Đối Cho Trẻ Mầm Non (5–6 Tuổi)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Không quảng cáo • Không thu thập dữ liệu cá nhân • Không dán nhãn trẻ • Tuân thủ Luật Trẻ em 2016 & Nghị định 13/2023/NĐ-CP.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleAction('quyen-rieng-tu')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm rounded-2xl shrink-0 transition-colors"
          >
            Xem chính sách bảo mật
          </button>
        </div>
      </section>
    </div>
  );
};
