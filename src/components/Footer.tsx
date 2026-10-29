import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleClick = (tabId: string) => {
    soundManager.playClick();
    onNavigate(tabId);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-[#FFCD53] mt-12 py-10 px-4 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: App Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌸</span>
            <span className="font-black text-xl text-white tracking-wide">
              AI BẢN LÀNG EM
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Ứng dụng giáo dục tương tác và trợ lý AI sư phạm dành cho trẻ mẫu giáo 5–6 tuổi và cô giáo Lò Thị Phong.
          </p>
          <p className="text-xs text-amber-300 font-bold italic">
            "Mỗi em bé là một nhà khám phá – Mỗi bản làng là một kho tàng tri thức."
          </p>
        </div>

        {/* Col 2: School & Teacher Attribution */}
        <div className="space-y-2 text-xs">
          <h4 className="font-black text-white text-sm uppercase tracking-wider mb-2">
            Thông tin sư phạm:
          </h4>
          <p className="text-slate-300 font-medium">
            <strong className="text-amber-400">Giáo viên:</strong> Lò Thị Phong
          </p>
          <p className="text-slate-300 font-medium">
            <strong className="text-amber-400">Trường:</strong> Trường Mầm non Thanh Yên
          </p>
          <p className="text-slate-300 font-medium">
            <strong className="text-amber-400">Địa phương:</strong> Xã Thanh Yên, tỉnh Điện Biên
          </p>
          <p className="text-slate-300 font-medium">
            <strong className="text-amber-400">Năm học:</strong> 2026–2027 • Trẻ mẫu giáo 5–6 tuổi
          </p>
        </div>

        {/* Col 3: Navigation & Privacy */}
        <div className="space-y-2 text-xs">
          <h4 className="font-black text-white text-sm uppercase tracking-wider mb-2">
            Liên kết nhanh:
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'home', label: 'Trang chủ' },
              { id: 'kham-pha', label: 'Bản đồ khám phá' },
              { id: 'tro-choi', label: 'Thế giới trò chơi' },
              { id: 'tieng-anh', label: 'Bé vui Tiếng Anh' },
              { id: 'truyen-ke', label: 'Truyện kể mầm non' },
              { id: 'steam', label: 'Góc STEAM' },
              { id: 'soan-giao-an', label: 'Soạn giáo án AI' },
              { id: 'giao-vien', label: 'Góc Giáo viên' },
              { id: 'quyen-rieng-tu', label: 'Chính sách bảo mật' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Tuân thủ Luật Trẻ em 2016 & Nghị định 13/2023/NĐ-CP</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-800 text-center text-[11px] text-slate-500">
        © 2026–2027 AI Bản Làng Em – Bé khám phá Điện Biên kỳ diệu (Dien Bien Kids Explorer AI).
      </div>
    </footer>
  );
};
