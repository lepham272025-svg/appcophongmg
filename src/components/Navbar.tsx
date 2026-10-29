import React from 'react';
import {
  Home,
  MapPin,
  Gamepad2,
  BookOpen,
  Sparkles,
  GraduationCap,
  Tv,
  Volume2,
  VolumeX,
  Star,
  ShieldCheck,
  Languages,
  FileEdit,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { tvMode, setTvMode, soundEnabled, setSoundEnabled, earnedStars } = useApp();

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, color: 'text-sky-600' },
    { id: 'kham-pha', label: 'Khám phá', icon: MapPin, color: 'text-pink-600' },
    { id: 'tro-choi', label: 'Trò chơi', icon: Gamepad2, color: 'text-amber-600' },
    { id: 'tieng-anh', label: 'Tiếng Anh', icon: Languages, color: 'text-indigo-600' },
    { id: 'truyen-ke', label: 'Truyện kể', icon: BookOpen, color: 'text-purple-600' },
    { id: 'steam', label: 'Góc STEAM', icon: Sparkles, color: 'text-emerald-600' },
    { id: 'soan-giao-an', label: 'Soạn giáo án', icon: FileEdit, color: 'text-teal-600' },
    { id: 'giao-vien', label: 'Giáo viên', icon: GraduationCap, color: 'text-blue-700' },
  ];

  const handleTabClick = (tabId: string) => {
    soundManager.playClick();
    setCurrentTab(tabId);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) soundManager.playClick();
  };

  const toggleTv = () => {
    soundManager.playClick();
    setTvMode(!tvMode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-4 border-[#FFCD53]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Logo & Branding */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          title="Về Trang chủ"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#FB789E] to-rose-300 flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform border-2 border-white">
            <span className="text-2xl select-none">🌸</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#0D65C9]">
                AI BẢN LÀNG EM
              </span>
              <span className="hidden md:inline-block bg-pink-100 text-pink-700 font-extrabold text-[11px] px-2 py-0.5 rounded-full border border-pink-200">
                2026–2027
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
              Bé khám phá Điện Biên kỳ diệu
            </p>
          </div>
        </div>

        {/* Navigation Items (Responsive) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0D65C9] text-white shadow-md scale-105'
                    : 'text-slate-700 hover:bg-amber-100/70 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right utility toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Star counter for kid motivation */}
          <div
            className="flex items-center gap-1 bg-amber-50 border-2 border-[#FFCD53] text-amber-900 font-black px-2.5 py-1 rounded-2xl text-xs sm:text-sm shadow-sm"
            title="Số ngôi sao khích lệ bé đã đạt được!"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-spin-slow" />
            <span>{earnedStars}</span>
          </div>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-2xl transition-all border-2 ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                : 'bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100'
            }`}
            title={soundEnabled ? 'Âm thanh: Đang Bật (Bấm để tắt)' : 'Âm thanh: Đang Tắt (Bấm để bật)'}
            aria-label="Chuyển chế độ âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Classroom TV Mode Toggle */}
          <button
            onClick={toggleTv}
            className={`p-2 rounded-2xl transition-all border-2 ${
              tvMode
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title={tvMode ? 'Chế độ TV/Màn hình lớn: Đang Bật' : 'Chiếu lên TV/Màn hình lớn lớp học'}
            aria-label="Chế độ TV lớp học"
          >
            <Tv className="w-5 h-5" />
          </button>

          {/* Privacy Link */}
          <button
            onClick={() => handleTabClick('quyen-rieng-tu')}
            className="hidden sm:flex items-center gap-1 p-2 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
            title="Chính sách bảo vệ dữ liệu trẻ em"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden xl:inline">Bảo mật</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around bg-white border-t border-slate-200 py-1.5 px-1 shadow-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-[#0D65C9] font-black scale-105'
                  : 'text-slate-600'
              }`}
            >
              <div
                className={`p-1 rounded-xl ${
                  isActive ? 'bg-sky-100' : 'bg-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
