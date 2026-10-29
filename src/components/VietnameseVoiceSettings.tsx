import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Settings,
  Languages,
} from 'lucide-react';
import { soundManager, SoundState } from '../utils/audio';

export const VietnameseVoiceSettings: React.FC = () => {
  const [soundState, setSoundState] = useState<SoundState>(soundManager.getState());
  const [viVoices, setViVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [testText, setTestText] = useState<string>(
    'Xin chào cô giáo Lò Thị Phong và các bạn nhỏ trường Mầm non Thanh Yên! Chúng mình cùng Bạn Ban Nhỏ khám phá Điện Biên kỳ diệu nhé!'
  );
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  useEffect(() => {
    const unsub = soundManager.subscribe((st) => {
      setSoundState(st);
    });

    const updateVoices = () => {
      const voices = soundManager.getAvailableVietnameseVoices();
      setViVoices(voices);
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      unsub();
    };
  }, []);

  const handleTestSpeech = () => {
    soundManager.playClick();
    setTestFeedback('Đang phát giọng đọc mẫu tiếng Việt...');
    const ok = soundManager.speakVietnamese(
      testText,
      () => {
        setTestFeedback('Phát âm thanh mẫu hoàn tất!');
        setTimeout(() => setTestFeedback(null), 3000);
      },
      (err) => {
        setTestFeedback(`Thông báo: ${err}`);
      }
    );
    if (!ok && !soundState.hasVietnameseVoice) {
      setTestFeedback('Đang kết nối dịch vụ đọc tiếng Việt...');
    }
  };

  const handleStop = () => {
    soundManager.playClick();
    soundManager.stopSpeaking();
    setTestFeedback(null);
  };

  const handlePauseResume = () => {
    soundManager.playClick();
    if (soundState.isPaused) {
      soundManager.resumeSpeaking();
    } else {
      soundManager.pauseSpeaking();
    }
  };

  const handleReplay = () => {
    soundManager.playClick();
    soundManager.replaySpeech();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-[#FFCD53] space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-900 px-3 py-1 rounded-full text-xs font-black uppercase mb-1.5 border border-pink-300">
            <Volume2 className="w-3.5 h-3.5 text-pink-600" />
            <span>CHUẨN ÂM THANH MẦM NON 5–6 TUỔI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D65C9]">
            CÀI ĐẶT GIỌNG ĐỌC TIẾNG VIỆT
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
            Bảo đảm 100% âm thanh tương tác, câu chuyện và Bạn Ban Nhỏ phát âm chuẩn tiếng Việt dịu dàng, trong sáng.
          </p>
        </div>

        {/* Global Sound Toggle */}
        <button
          onClick={() => soundManager.setMuted(!soundState.isMuted)}
          className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${
            soundState.isMuted
              ? 'bg-rose-100 text-rose-700 border-2 border-rose-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {soundState.isMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Âm thanh đang TẮT</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>Âm thanh đang BẬT</span>
            </>
          )}
        </button>
      </div>

      {/* Voice Status Diagnostic Card */}
      <div
        className={`p-5 rounded-2xl border-2 transition-all ${
          soundState.hasVietnameseVoice
            ? 'bg-emerald-50 border-emerald-300'
            : 'bg-amber-50 border-amber-300'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl text-white ${
                soundState.hasVietnameseVoice ? 'bg-emerald-600' : 'bg-amber-500'
              }`}
            >
              {soundState.hasVietnameseVoice ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-800">
                {soundState.hasVietnameseVoice
                  ? `Đã phát hiện ${viVoices.length} giọng đọc tiếng Việt trên thiết bị`
                  : 'Thiết bị chưa cài sẵn giọng đọc tiếng Việt của hệ điều hành'}
              </h3>
              <p className="text-xs font-semibold text-slate-600 mt-0.5 leading-relaxed">
                {soundState.hasVietnameseVoice
                  ? 'Hệ thống tự động sử dụng giọng tiếng Việt chuẩn, tuyệt đối không dùng giọng tiếng Anh để đọc lời thoại tiếng Việt.'
                  : 'Ứng dụng tự động chuyển tiếp sang giọng đọc AI tiếng Việt (Gemini Cloud) để luôn bảo đảm lời thoại tiếng Việt chuẩn.'}
              </p>
            </div>
          </div>

          <span
            className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-xl shrink-0 ${
              soundState.hasVietnameseVoice
                ? 'bg-emerald-200 text-emerald-900'
                : 'bg-amber-200 text-amber-900'
            }`}
          >
            {soundState.hasVietnameseVoice ? 'SẴN SÀNG' : 'DỰ PHÒNG CLOUD AI'}
          </span>
        </div>
      </div>

      {/* Voice Selection & Engine Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Voice Dropdown */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-blue-600" />
            <span>Giọng đọc tiếng Việt trên thiết bị</span>
          </label>
          <select
            value={soundState.selectedVoiceURI}
            onChange={(e) => soundManager.setSelectedVoice(e.target.value)}
            disabled={!soundState.hasVietnameseVoice}
            className="w-full bg-white border-2 border-slate-300 focus:border-blue-600 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-slate-800 outline-none disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">Tự động chọn giọng tiếng Việt tối ưu nhất</option>
            {viVoices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 font-medium">
            Gợi ý: Các giọng Google Tiếng Việt, Microsoft HoaiMy, hoặc Apple Linh/Mai mang lại ngữ điệu tự nhiên nhất.
          </p>
        </div>

        {/* Engine Priority */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-purple-600" />
            <span>Nguồn phát âm thanh (TTS Engine)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'auto', label: 'Tự động (Ưu tiên thiết bị)' },
              { id: 'webspeech', label: 'Web Speech (Thiết bị)' },
              { id: 'gemini', label: 'Gemini AI (Cloud)' },
            ].map((eng) => (
              <button
                key={eng.id}
                onClick={() => soundManager.setTtsEngine(eng.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-black transition-all border-2 text-center ${
                  soundState.ttsEngine === eng.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                {eng.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Ở chế độ Tự động, khi thiết bị có giọng tiếng Việt sẽ phát ngay lập tức không tốn dung lượng mạng.
          </p>
        </div>
      </div>

      {/* Speed, Pitch, Volume Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Speed */}
        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-black text-blue-900">
            <span>Tốc độ đọc (Rate)</span>
            <span className="bg-blue-200 px-2 py-0.5 rounded-lg">
              {soundState.speechRate.toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.05"
            value={soundState.speechRate}
            onChange={(e) => soundManager.setSpeechRate(parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between gap-1 pt-1">
            <button
              onClick={() => soundManager.setSpeechRate(0.8)}
              className="text-[10px] font-bold px-2 py-1 bg-white rounded-lg border border-blue-200 text-blue-800 hover:bg-blue-100"
            >
              Chậm (0.8x)
            </button>
            <button
              onClick={() => soundManager.setSpeechRate(0.88)}
              className="text-[10px] font-bold px-2 py-1 bg-blue-600 text-white rounded-lg shadow-xs"
            >
              Chuẩn 5–6T (0.88x)
            </button>
            <button
              onClick={() => soundManager.setSpeechRate(1.0)}
              className="text-[10px] font-bold px-2 py-1 bg-white rounded-lg border border-blue-200 text-blue-800 hover:bg-blue-100"
            >
              Nhanh (1.0x)
            </button>
          </div>
        </div>

        {/* Pitch */}
        <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-black text-pink-900">
            <span>Cao độ giọng (Pitch)</span>
            <span className="bg-pink-200 px-2 py-0.5 rounded-lg">
              {soundState.speechPitch.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.3"
            step="0.05"
            value={soundState.speechPitch}
            onChange={(e) => soundManager.setSpeechPitch(parseFloat(e.target.value))}
            className="w-full accent-pink-600 cursor-pointer"
          />
          <div className="flex justify-between gap-1 pt-1">
            <button
              onClick={() => soundManager.setSpeechPitch(0.95)}
              className="text-[10px] font-bold px-2 py-1 bg-white rounded-lg border border-pink-200 text-pink-800 hover:bg-pink-100"
            >
              Trầm ấm (0.95)
            </button>
            <button
              onClick={() => soundManager.setSpeechPitch(1.05)}
              className="text-[10px] font-bold px-2 py-1 bg-pink-600 text-white rounded-lg shadow-xs"
            >
              Dịu dàng (1.05)
            </button>
            <button
              onClick={() => soundManager.setSpeechPitch(1.2)}
              className="text-[10px] font-bold px-2 py-1 bg-white rounded-lg border border-pink-200 text-pink-800 hover:bg-pink-100"
            >
              Trong trẻo (1.2)
            </button>
          </div>
        </div>

        {/* Volume */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-black text-amber-900">
            <span>Âm lượng (Volume)</span>
            <span className="bg-amber-200 px-2 py-0.5 rounded-lg">
              {Math.round(soundState.speechVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={soundState.speechVolume}
            onChange={(e) => soundManager.setSpeechVolume(parseFloat(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <div className="flex justify-between gap-1 pt-1">
            <button
              onClick={() => soundManager.setSpeechVolume(0.5)}
              className="text-[10px] font-bold px-2 py-1 bg-white rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-100"
            >
              50%
            </button>
            <button
              onClick={() => soundManager.setSpeechVolume(0.8)}
              className="text-[10px] font-bold px-2 py-1 bg-white rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-100"
            >
              80%
            </button>
            <button
              onClick={() => soundManager.setSpeechVolume(1.0)}
              className="text-[10px] font-bold px-2 py-1 bg-amber-600 text-white rounded-lg shadow-xs"
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Test Voice & Audio Controls */}
      <div className="bg-gradient-to-r from-sky-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-purple-950 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Thử nghiệm giọng đọc mẫu trực tiếp</span>
          </h3>
          {soundState.isSpeaking && (
            <span className="flex items-center gap-1.5 text-xs font-black text-rose-600 bg-rose-100 px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>ĐANG PHÁT ÂM THANH</span>
            </span>
          )}
        </div>

        <textarea
          rows={2}
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          className="w-full p-3 bg-white rounded-xl border border-purple-200 text-xs sm:text-sm font-medium text-slate-800 focus:border-purple-600 outline-none resize-none"
          placeholder="Nhập nội dung tiếng Việt muốn thử nghiệm..."
        />

        {testFeedback && (
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 text-xs font-bold">
            {testFeedback}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTestSpeech}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>PHÁT THỬ GIỌNG ĐỌC</span>
          </button>

          {soundState.isSpeaking && (
            <>
              <button
                onClick={handlePauseResume}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                {soundState.isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Tiếp tục</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white" />
                    <span>Tạm dừng</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStop}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Dừng lại</span>
              </button>
            </>
          )}

          {soundState.lastSpokenText && (
            <button
              onClick={handleReplay}
              className="px-3.5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-300 flex items-center gap-1.5 transition-all"
              title="Phát lại câu vừa đọc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Phát lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Guide: How to install Vietnamese TTS on devices */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <h4 className="text-xs font-black uppercase text-slate-700 mb-2.5 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Hướng dẫn bật giọng đọc Tiếng Việt trên thiết bị của lớp học</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">🖥️ Máy tính Windows:</p>
            <p>
              Vào <b>Settings &gt; Time &amp; Language &gt; Speech &gt; Add voices</b>, chọn tìm và cài đặt <b>Vietnamese (Tiếng Việt - HoaiMy)</b>.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">📱 Điện thoại / Máy tính bảng Android:</p>
            <p>
              Vào <b>Cài đặt &gt; Khả năng tiếp cận &gt; Đầu ra chuyển văn bản thành giọng nói</b>, chọn dịch vụ của Google và tải gói giọng đọc Tiếng Việt.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">🍎 iPad / iPhone (iOS):</p>
            <p>
              Vào <b>Cài đặt &gt; Trợ năng &gt; Nội dung được đọc &gt; Giọng nói</b>, chọn <b>Tiếng Việt</b> và tải giọng <b>Linh</b> hoặc <b>Mai</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
