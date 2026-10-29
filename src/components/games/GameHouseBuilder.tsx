import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Award, CheckCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useApp } from '../../context/AppContext';

interface GameHouseBuilderProps {
  onBack: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  shapeType: 'triangle' | 'rectangle-body' | 'rectangle-pillars' | 'square' | 'circle';
  label: string;
  color: string;
  placed: boolean;
}

export const GameHouseBuilder: React.FC<GameHouseBuilderProps> = ({ onBack }) => {
  const { addStar } = useApp();
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const initialShapes: ShapeItem[] = [
    { id: 'pillars', name: 'Cột nhà sàn', shapeType: 'rectangle-pillars', label: 'Hình Trụ / Chữ Nhật', color: '#854D0E', placed: false },
    { id: 'body', name: 'Thân sàn nhà', shapeType: 'rectangle-body', label: 'Hình Chữ Nhật Ngang', color: '#D97706', placed: false },
    { id: 'roof', name: 'Mái nhà che mưa', shapeType: 'triangle', label: 'Hình Tam Giác', color: '#B45309', placed: false },
    { id: 'window', name: 'Cửa sổ đón gió', shapeType: 'square', label: 'Hình Vuông', color: '#451A03', placed: false },
    { id: 'sun', name: 'Mặt trời ban mai', shapeType: 'circle', label: 'Hình Tròn', color: '#F59E0B', placed: false },
  ];

  const [shapes, setShapes] = useState<ShapeItem[]>(initialShapes);

  const isCompleted = shapes.every(s => s.placed);

  const speakGuide = () => {
    soundManager.speakVietnamese('Bé hãy chạm chọn hình khối ở bên dưới, rồi chạm vào đúng vị trí trên ngôi nhà sàn nhé!');
  };

  const handleSelectShape = (shape: ShapeItem) => {
    if (shape.placed) return;
    soundManager.playClick();
    setSelectedShapeId(shape.id);
    setFeedback(`Bé đã chọn "${shape.name}" (${shape.label}). Hãy chạm vào vị trí khớp trên khung nhà nhé!`);
    soundManager.speakVietnamese(`Bé đã chọn ${shape.name}`);
  };

  const handleSlotClick = (targetSlotId: string) => {
    if (!selectedShapeId) {
      setFeedback('Bé hãy chọn một hình khối ở danh sách bên dưới trước nhé!');
      soundManager.speakVietnamese('Bé hãy chọn một hình khối ở bên dưới trước nhé!');
      return;
    }

    if (selectedShapeId === targetSlotId) {
      // Correct placement
      soundManager.playSuccessChime();
      const updated = shapes.map(s => s.id === targetSlotId ? { ...s, placed: true } : s);
      setShapes(updated);
      setSelectedShapeId(null);
      setFeedback('Giỏi quá! Bé đã lắp ráp đúng vị trí!');
      soundManager.speakVietnamese('Tuyệt vời! Bé lắp đúng vị trí rồi!');

      if (updated.every(s => s.placed)) {
        setTimeout(() => {
          soundManager.playCelebrationFanfare();
          addStar(2);
        }, 600);
      }
    } else {
      soundManager.playEncouragingChime();
      setFeedback('Vị trí này chưa khớp với hình khối bé đang cầm, bé thử chạm vào ô khác xem sao nhé!');
      soundManager.speakVietnamese('Chưa đúng hình này rồi, con thử vị trí khác nhé!');
    }
  };

  const resetGame = () => {
    setShapes(initialShapes);
    setSelectedShapeId(null);
    setFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-4 border-[#FFCD53]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bản đồ trò chơi</span>
        </button>

        <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Đã lắp {shapes.filter(s => s.placed).length} / {shapes.length} phần</span>
        </span>

        <button
          onClick={resetGame}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
          title="Xây lại từ đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {isCompleted ? (
        <div className="text-center py-10 px-4 animate-fadeIn">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce text-white">
            <Award className="w-14 h-14" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9] mb-2">
            HOAN HÔ BÉ ĐÃ XÂY XONG NGÔI NHÀ SÀN!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600 mb-6">
            Ngôi nhà sàn Điện Biên của bé thật khang trang, vững chãi và ấm cúng!
          </p>

          {/* Finished House Display */}
          <div className="w-64 sm:w-80 mx-auto p-4 bg-gradient-to-b from-sky-100 to-emerald-100 rounded-3xl border-3 border-amber-300 shadow-md mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
              <circle cx="170" cy="30" r="18" fill="#F59E0B" />
              {/* Roof */}
              <polygon points="100,30 20,90 180,90" fill="#B45309" stroke="#78350F" strokeWidth="3" />
              {/* Khau cut */}
              <line x1="90" y1="20" x2="110" y2="35" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
              <line x1="110" y1="20" x2="90" y2="35" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
              {/* Body */}
              <rect x="35" y="90" width="130" height="50" fill="#D97706" stroke="#78350F" strokeWidth="3" rx="2" />
              {/* Window */}
              <rect x="85" y="105" width="30" height="25" fill="#451A03" rx="2" />
              {/* Pillars */}
              <rect x="45" y="140" width="12" height="45" fill="#854D0E" rx="2" />
              <rect x="85" y="140" width="12" height="45" fill="#854D0E" rx="2" />
              <rect x="125" y="140" width="12" height="45" fill="#854D0E" rx="2" />
              <rect x="150" y="140" width="12" height="45" fill="#854D0E" rx="2" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-[#0D65C9] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-extrabold rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              Xây dựng lại
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl transition-all"
            >
              Về thế giới trò chơi
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {/* Guide banner */}
          <div className="flex items-center justify-between gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 sm:p-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏡</span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-amber-900">
                  Chạm chọn hình bên dưới rồi chạm vào vị trí khớp trên khung nhà!
                </h3>
                <p className="text-xs text-amber-700 font-semibold">
                  Hỗ trợ cả chạm chọn trên màn hình cảm ứng điện thoại và máy tính bảng.
                </p>
              </div>
            </div>
            <button
              onClick={speakGuide}
              className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl shadow-md shrink-0"
              title="Nghe hướng dẫn"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {feedback && (
            <div className="p-2.5 rounded-xl mb-3 text-center text-xs sm:text-sm font-bold bg-blue-50 text-blue-900 border border-blue-200">
              {feedback}
            </div>
          )}

          {/* Construction Blueprint Arena */}
          <div className="w-full h-72 sm:h-84 bg-gradient-to-b from-sky-50 via-sky-100 to-amber-50 rounded-3xl border-3 border-dashed border-sky-300 relative p-4 flex flex-col items-center justify-center mb-6 overflow-hidden select-none shadow-inner">
            <svg viewBox="0 0 300 240" className="w-full max-w-sm h-full">
              {/* Slot 5: Sun (Circle) */}
              <g
                onClick={() => handleSlotClick('sun')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {shapes.find(s => s.id === 'sun')?.placed ? (
                  <circle cx="255" cy="40" r="22" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
                ) : (
                  <circle
                    cx="255"
                    cy="40"
                    r="22"
                    fill="#FEF3C7"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                  />
                )}
                {!shapes.find(s => s.id === 'sun')?.placed && (
                  <text x="255" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">
                    Hình tròn
                  </text>
                )}
              </g>

              {/* Slot 3: Roof (Triangle) */}
              <g
                onClick={() => handleSlotClick('roof')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {shapes.find(s => s.id === 'roof')?.placed ? (
                  <polygon points="150,25 40,85 260,85" fill="#B45309" stroke="#78350F" strokeWidth="3" />
                ) : (
                  <polygon
                    points="150,25 40,85 260,85"
                    fill="#FDE68A"
                    stroke="#B45309"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                )}
                {!shapes.find(s => s.id === 'roof')?.placed && (
                  <text x="150" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400E">
                    Hình tam giác (Mái nhà)
                  </text>
                )}
              </g>

              {/* Slot 2: Body (Rectangle) */}
              <g
                onClick={() => handleSlotClick('body')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {shapes.find(s => s.id === 'body')?.placed ? (
                  <rect x="55" y="85" width="190" height="60" fill="#D97706" stroke="#78350F" strokeWidth="3" rx="3" />
                ) : (
                  <rect
                    x="55"
                    y="85"
                    width="190"
                    height="60"
                    fill="#FEF3C7"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    rx="3"
                  />
                )}
                {!shapes.find(s => s.id === 'body')?.placed && (
                  <text x="150" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B45309">
                    Hình chữ nhật (Thân nhà)
                  </text>
                )}
              </g>

              {/* Slot 4: Window (Square) - inside Body */}
              <g
                onClick={() => handleSlotClick('window')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {shapes.find(s => s.id === 'window')?.placed ? (
                  <rect x="130" y="100" width="40" height="32" fill="#451A03" rx="2" />
                ) : (
                  <rect
                    x="130"
                    y="100"
                    width="40"
                    height="32"
                    fill="#FDF2F8"
                    stroke="#831843"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    rx="2"
                  />
                )}
                {!shapes.find(s => s.id === 'window')?.placed && (
                  <text x="150" y="120" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#831843">
                    Hình vuông
                  </text>
                )}
              </g>

              {/* Slot 1: Pillars (Rectangle Pillars) */}
              <g
                onClick={() => handleSlotClick('pillars')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {shapes.find(s => s.id === 'pillars')?.placed ? (
                  <g>
                    <rect x="68" y="145" width="14" height="65" fill="#854D0E" rx="3" />
                    <rect x="115" y="145" width="14" height="65" fill="#854D0E" rx="3" />
                    <rect x="170" y="145" width="14" height="65" fill="#854D0E" rx="3" />
                    <rect x="218" y="145" width="14" height="65" fill="#854D0E" rx="3" />
                  </g>
                ) : (
                  <g>
                    <rect x="68" y="145" width="14" height="65" fill="#E2E8F0" stroke="#854D0E" strokeWidth="2" strokeDasharray="4 3" />
                    <rect x="115" y="145" width="14" height="65" fill="#E2E8F0" stroke="#854D0E" strokeWidth="2" strokeDasharray="4 3" />
                    <rect x="170" y="145" width="14" height="65" fill="#E2E8F0" stroke="#854D0E" strokeWidth="2" strokeDasharray="4 3" />
                    <rect x="218" y="145" width="14" height="65" fill="#E2E8F0" stroke="#854D0E" strokeWidth="2" strokeDasharray="4 3" />
                    <text x="150" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350F">
                      Cột chống nhà sàn
                    </text>
                  </g>
                )}
              </g>
            </svg>
          </div>

          {/* Palette of Shapes to Choose */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-extrabold uppercase text-slate-500 mb-3 text-center">
              Khay hình khối xây dựng (Chạm để chọn):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {shapes.map((shape) => {
                const isSelected = selectedShapeId === shape.id;
                return (
                  <button
                    key={shape.id}
                    onClick={() => handleSelectShape(shape)}
                    disabled={shape.placed}
                    className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                      shape.placed
                        ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md scale-105 ring-2 ring-amber-400'
                        : 'bg-white border-[#FFCD53] hover:bg-amber-50 hover:scale-102'
                    }`}
                  >
                    {/* Visual miniature icon of shape */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      {shape.shapeType === 'triangle' && (
                        <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-amber-700" />
                      )}
                      {shape.shapeType === 'rectangle-body' && (
                        <div className="w-9 h-5 bg-amber-600 rounded-sm" />
                      )}
                      {shape.shapeType === 'rectangle-pillars' && (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-7 bg-amber-800 rounded-sm" />
                          <div className="w-1.5 h-7 bg-amber-800 rounded-sm" />
                          <div className="w-1.5 h-7 bg-amber-800 rounded-sm" />
                        </div>
                      )}
                      {shape.shapeType === 'square' && (
                        <div className="w-6 h-6 bg-amber-950 rounded-sm" />
                      )}
                      {shape.shapeType === 'circle' && (
                        <div className="w-7 h-7 bg-amber-500 rounded-full" />
                      )}
                    </div>

                    <span className="text-xs font-bold text-slate-800">
                      {shape.name}
                    </span>

                    {shape.placed && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                        <CheckCircle className="w-3 h-3" /> Đã đặt
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
