import React from 'react';
import { ShieldCheck, Lock, EyeOff, UserCheck, HeartHandshake, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => {
          soundManager.playClick();
          onBack();
        }}
        className="mb-6 flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl text-sm border border-slate-200 shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay về trang trước</span>
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-4 border-emerald-400 space-y-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-3 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            CHÍNH SÁCH BẢO MẬT & QUYỀN RIÊNG TƯ TRẺ EM
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Ứng dụng "AI Bản Làng Em" – Trường Mầm non Thanh Yên, Điện Biên (2026–2027)
          </p>
        </div>

        {/* Commitment Badge */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
          <HeartHandshake className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
            Chúng tôi cam kết tuân thủ tuyệt đối <strong>Luật Trẻ em 2016</strong> và <strong>Nghị định 13/2023/NĐ-CP</strong> của Chính phủ Việt Nam về bảo vệ dữ liệu cá nhân. Trẻ mầm non được vui chơi, học tập trong môi trường số an toàn, lành mạnh, không có nguy cơ lộ lọt dữ liệu riêng tư.
          </p>
        </div>

        {/* 6 Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-black text-slate-900 text-sm">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>1. Trẻ không cần đăng ký tài khoản</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Các bé tham gia trò chơi, nghe truyện cùng cô hoàn toàn tự do, không yêu cầu tạo tài khoản, không khai báo thông tin cá nhân.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-black text-slate-900 text-sm">
              <EyeOff className="w-4 h-4 text-rose-600" />
              <span>2. Tuyệt đối không thu thập dữ liệu nhạy cảm</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Không thu thập số CCCD, địa chỉ nhà, số điện thoại, ngày sinh chi tiết của trẻ hay cha mẹ.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-black text-slate-900 text-sm">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>3. Không ghi âm, quay video, định vị</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Ứng dụng không kích hoạt micro, camera hay GPS tự động. Không có tính năng nhận diện khuôn mặt hay phân tích cảm xúc từ hình ảnh.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-black text-slate-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>4. Quản lý ẩn danh (Zero-PII)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Khi giáo viên cần theo dõi tiến độ hoạt động, trẻ chỉ được gán mã ẩn danh như "Bé 01", "Bé 02", không công khai kết quả so sánh giữa các trẻ.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-black text-slate-900 text-sm">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>5. Không dùng dữ liệu trẻ để huấn luyện AI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Dữ liệu của trẻ không bao giờ được gửi tới các API bên ngoài hay dùng để huấn luyện mô hình học máy.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2 font-black text-slate-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>6. Bảo vệ danh tính giáo viên</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Không hiển thị số căn cước, ngày sinh, địa chỉ nhà hay số điện thoại cá nhân của cô giáo Lò Thị Phong trên giao diện công khai.
            </p>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          Mọi thắc mắc về quyền riêng tư xin liên hệ Hội đồng Sư phạm Trường Mầm non Thanh Yên, huyện Điện Biên, tỉnh Điện Biên.
        </div>
      </div>
    </div>
  );
};
