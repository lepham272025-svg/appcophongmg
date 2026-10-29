import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  FileText,
  Users,
  CheckCircle,
  Copy,
  Printer,
  Download,
  AlertCircle,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Lock,
  Unlock,
  Eye,
  Database,
  Calendar,
  Layers,
  Award,
  Volume2,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useApp } from '../context/AppContext';
import { AiLessonPlanner } from './AiLessonPlanner';
import { VietnameseVoiceSettings } from './VietnameseVoiceSettings';

export const TeacherPortal: React.FC = () => {
  const { teacherAvatar, setTeacherAvatar } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('dienbien_teacher_auth') === 'true';
    }
    return false;
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  const handleLogin = (pinToTest?: string) => {
    const pin = pinToTest || pinInput;
    if (pin === '1234') {
      soundManager.playSuccessChime();
      setIsAuthenticated(true);
      setPinError(null);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('dienbien_teacher_auth', 'true');
      }
    } else {
      soundManager.playEncouragingChime();
      setPinError('Mã PIN chưa chính xác (Mã mặc định là: 1234)');
    }
  };

  const handleLogout = () => {
    soundManager.playClick();
    setIsAuthenticated(false);
    setPinInput('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('dienbien_teacher_auth');
    }
  };

  const [activeTab, setActiveTab] = useState<
    'overview' | 'ai-studio' | 'speech-settings' | 'materials' | 'classes' | 'evidence' | 'database'
  >('ai-studio');

  // AI Tool Subtabs: 1. Lesson, 2. Story, 3. Quiz, 4. Feedback
  const [aiTool, setAiTool] = useState<'lesson' | 'story' | 'quiz' | 'feedback'>('lesson');

  // AI Connection State
  const [aiStatus, setAiStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Đang kiểm tra kết nối AI...',
  });

  // 1. Lesson Plan State
  const [lessonForm, setLessonForm] = useState({
    topic: 'Hoa ban Điện Biên và mùa xuân bản em',
    ageGroup: '5-6 tuổi',
    domain: 'Phát triển nhận thức',
    objectives: 'Nhận biết đặc điểm hoa ban 5 cánh, đếm số lượng trong phạm vi 10, yêu mến thiên nhiên',
    duration: '30-35 phút',
    groupSize: '25-30 trẻ',
    materials: 'Hoa ban thật, giấy xốp màu, thẻ số 1-10, nhạc bài hát',
    environment: 'Trong lớp học và góc thiên nhiên',
  });
  const [lessonResult, setLessonResult] = useState<any>(null);
  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);

  // 2. Story State
  const [storyForm, setStoryForm] = useState({
    topic: 'Bạn Ban Nhỏ đi thăm cánh đồng Mường Thanh',
    characters: 'Bạn Ban Nhỏ, Bé Lò Văn An, Bác Nông Dân',
    setting: 'Bản làng Thanh Yên và dòng suối Nậm Rốm',
    educationalGoal: 'Dạy trẻ lòng biết ơn công sức bác nông dân và trân trọng hạt gạo',
    length: '4 trang',
    moralLesson: 'Yêu thương quê hương và trân trọng hạt gạo dẻo thơm',
  });
  const [storyResult, setStoryResult] = useState<any>(null);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  // 3. Quiz State
  const [quizForm, setQuizForm] = useState({
    topic: 'Thiên nhiên và nếp sống bản làng Điện Biên',
    difficulty: 'Vừa sức (5-6 tuổi)',
    count: 4,
  });
  const [quizResult, setQuizResult] = useState<any[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  // 4. Feedback State
  const [feedbackForm, setFeedbackForm] = useState({
    observationNotes: 'Bé nhiệt tình tham gia đếm hoa ban nhưng đôi khi nhầm số 6 và số 9. Rất hòa đồng, chia sẻ bút màu với bạn.',
    domain: 'Phát triển nhận thức & Kỹ năng xã hội',
  });
  const [feedbackSuggestions, setFeedbackSuggestions] = useState<string[]>([]);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  // Check health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(data => {
        if (data.aiAvailable) {
          setAiStatus({
            connected: true,
            message: 'Đã kết nối AI Studio server thành công (@google/genai)',
          });
        } else {
          setAiStatus({
            connected: false,
            message: 'Chưa cấu hình API key AI. Hệ thống đang vận hành chế độ học liệu mẫu chuẩn sư phạm Điện Biên.',
          });
        }
      })
      .catch(() => {
        setAiStatus({
          connected: false,
          message: 'Không thể kết nối máy chủ AI. Đang sử dụng dữ liệu sư phạm mẫu.',
        });
      });
  }, []);

  // Handle Generate Lesson Plan
  const handleGenerateLesson = async () => {
    soundManager.playClick();
    setIsGeneratingLesson(true);
    try {
      const res = await fetch('/api/ai/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lessonForm),
      });
      const json = await res.json();
      setLessonResult(json);
      soundManager.playSuccessChime();
    } catch {
      soundManager.playEncouragingChime();
    } finally {
      setIsGeneratingLesson(false);
    }
  };

  // Handle Generate Story
  const handleGenerateStory = async () => {
    soundManager.playClick();
    setIsGeneratingStory(true);
    try {
      const res = await fetch('/api/ai/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyForm),
      });
      const json = await res.json();
      setStoryResult(json);
      soundManager.playSuccessChime();
    } catch {
      soundManager.playEncouragingChime();
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // Handle Generate Quiz
  const handleGenerateQuiz = async () => {
    soundManager.playClick();
    setIsGeneratingQuiz(true);
    try {
      const res = await fetch('/api/ai/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizForm),
      });
      const json = await res.json();
      setQuizResult(json.data || []);
      soundManager.playSuccessChime();
    } catch {
      soundManager.playEncouragingChime();
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Handle Generate Pedagogical Feedback
  const handleGenerateFeedback = async () => {
    soundManager.playClick();
    setIsGeneratingFeedback(true);
    try {
      const res = await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackForm),
      });
      const json = await res.json();
      setFeedbackSuggestions(json.suggestions || []);
      soundManager.playSuccessChime();
    } catch {
      soundManager.playEncouragingChime();
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  // Export CSV for Evidence
  const exportCsv = () => {
    soundManager.playClick();
    const rows = [
      ['Ngày', 'Hoạt động', 'Số trẻ tham gia', 'Lĩnh vực', 'Ghi chú sư phạm', 'Phân loại'],
      ['2026-10-20', 'Khám phá hoa ban 5 cánh', '26/28', 'Nhận thức', 'Trẻ hào hứng đếm cánh hoa', 'DỮ LIỆU GIẢ LẬP – KHÔNG PHẢI KẾT QUẢ THỰC NGHIỆM'],
      ['2026-10-22', 'Lắp ráp mô hình nhà sàn', '27/28', 'Thẩm mỹ & STEAM', 'Trẻ nhận biết hình tam giác mái nhà', 'DỮ LIỆU GIẢ LẬP – KHÔNG PHẢI KẾT QUẢ THỰC NGHIỆM'],
      ['2026-10-25', 'Trò chơi Bé bảo vệ bản làng xanh', '28/28', 'Kỹ năng xã hội', 'Trẻ thực hành bỏ rác đúng nơi', 'DỮ LIỆU GIẢ LẬP – KHÔNG PHẢI KẾT QUẢ THỰC NGHIỆM'],
    ];
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'minh-chung-trien-khai-ban-lang-em.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FFCD53] text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 border-2 border-blue-200 rounded-3xl flex items-center justify-center text-blue-700 shadow-inner">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0D65C9] mb-1">
            GÓC GIÁO VIÊN BẢO MẬT
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-6">
            Khu vực quản trị dành riêng cho cô giáo Lò Thị Phong (Trường Mầm non Thanh Yên). Vui lòng nhập mã PIN để quản lý học liệu và sổ theo dõi trẻ.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(null); }}
                placeholder="Nhập mã PIN (Mặc định: 1234)"
                className="w-full text-center text-2xl tracking-widest font-black py-3 px-4 rounded-2xl border-2 border-slate-300 focus:border-blue-600 outline-none"
                autoFocus
              />
              {pinError && (
                <p className="mt-2 text-xs font-bold text-rose-600 animate-bounce">
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#0D65C9] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black rounded-2xl shadow-lg transition-transform active:scale-95 text-sm sm:text-base"
            >
              MỞ KHÓA BẢO MẬT
            </button>

            <button
              type="button"
              onClick={() => handleLogin('1234')}
              className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold rounded-2xl text-xs transition-colors"
            >
              Mở nhanh chế độ Giáo viên (Mã PIN: 1234)
            </button>
          </form>

          <p className="mt-6 text-[11px] text-slate-400 font-medium leading-relaxed">
            🛡️ Tuân thủ Luật Trẻ em 2016: Dữ liệu quan sát học sinh được phân quyền bảo mật, không để trẻ em hoặc người ngoài tự ý truy cập.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Teacher Profile Banner */}
      <div className="bg-gradient-to-r from-[#0D65C9] to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={teacherAvatar}
            alt="Cô giáo Lò Thị Phong"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-[#FFCD53] shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black">
                Cô giáo: Lò Thị Phong
              </h1>
              <span className="bg-[#FFCD53] text-amber-950 font-black text-xs px-3 py-1 rounded-full">
                Năm học 2026–2027
              </span>
            </div>
            <p className="text-sm font-semibold text-blue-100 mb-1">
              Trường Mầm non Thanh Yên – Xã Thanh Yên, tỉnh Điện Biên
            </p>
            <p className="text-xs italic text-blue-200">
              "Mỗi em bé là một nhà khám phá – Mỗi bản làng là một kho tàng tri thức."
            </p>
          </div>
        </div>

        {/* Change Avatar / Profile Status / Logout */}
        <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const url = prompt('Nhập đường dẫn hình ảnh đại diện của cô (hoặc ảnh minh họa sư phạm có quyền sử dụng):', teacherAvatar);
                if (url) setTeacherAvatar(url);
              }}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl text-xs backdrop-blur-sm transition-all"
            >
              Đổi ảnh đại diện
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 shadow-sm"
              title="Khóa an toàn và đăng xuất"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Khóa an toàn</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100 bg-black/20 px-3 py-1.5 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Khu vực quản trị bảo mật (Zero-PII)</span>
          </div>
        </div>
      </div>

      {/* AI Connection Status Notification Banner */}
      <div
        className={`p-4 rounded-2xl mb-6 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold border-2 ${
          aiStatus.connected
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
            : 'bg-amber-50 text-amber-900 border-amber-300'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Sparkles className={`w-5 h-5 ${aiStatus.connected ? 'text-emerald-600' : 'text-amber-600'}`} />
          <span>{aiStatus.message}</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-lg bg-white/70">
          {aiStatus.connected ? 'API Online' : 'Chế độ sư phạm chuẩn'}
        </span>
      </div>

      {/* Teacher Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b-2 border-slate-200 pb-3">
        {[
          { id: 'ai-studio', label: 'Trợ lý AI của Cô Phong', icon: Sparkles },
          { id: 'speech-settings', label: 'Cài đặt giọng đọc tiếng Việt', icon: Volume2 },
          { id: 'overview', label: 'Tổng quan & Số liệu', icon: Layers },
          { id: 'materials', label: 'Quản lý học liệu', icon: FileText },
          { id: 'classes', label: 'Lớp học & Quan sát trẻ', icon: Users },
          { id: 'evidence', label: 'Minh chứng & Báo cáo', icon: Award },
          { id: 'database', label: 'Cơ sở dữ liệu (SQL)', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                isActive
                  ? 'bg-[#0D65C9] text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AI STUDIO */}
      {activeTab === 'ai-studio' && (
        <div className="space-y-6">
          {/* Sub-tools switch */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'lesson', label: '1. AI Tạo Kế hoạch bài dạy', icon: FileText },
              { id: 'story', label: '2. AI Kể chuyện sáng tạo', icon: BookOpen },
              { id: 'quiz', label: '3. AI Tạo câu hỏi & trò chơi', icon: HelpCircle },
              { id: 'feedback', label: '4. AI Phản hồi sư phạm', icon: MessageSquare },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  soundManager.playClick();
                  setAiTool(tool.id as any);
                }}
                className={`p-3 rounded-2xl font-black text-xs sm:text-sm border-2 text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                  aiTool === tool.id
                    ? 'bg-amber-100 border-[#FFCD53] text-amber-950 shadow-sm scale-102'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{tool.label}</span>
              </button>
            ))}
          </div>

          {/* Subtool 1: AI Lesson Plan */}
          {aiTool === 'lesson' && (
            <div className="pt-2">
              <AiLessonPlanner />
            </div>
          )}

          {/* Subtool 2: AI Story Generator */}
          {aiTool === 'story' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200">
                <h3 className="text-lg font-black text-purple-700 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Thông số Sáng tác truyện thiếu nhi</span>
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chủ đề câu chuyện:</label>
                    <input
                      type="text"
                      value={storyForm.topic}
                      onChange={e => setStoryForm({ ...storyForm, topic: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nhân vật:</label>
                    <input
                      type="text"
                      value={storyForm.characters}
                      onChange={e => setStoryForm({ ...storyForm, characters: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mục tiêu giáo dục:</label>
                    <input
                      type="text"
                      value={storyForm.educationalGoal}
                      onChange={e => setStoryForm({ ...storyForm, educationalGoal: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Bài học rút ra:</label>
                    <input
                      type="text"
                      value={storyForm.moralLesson}
                      onChange={e => setStoryForm({ ...storyForm, moralLesson: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <button
                    onClick={handleGenerateStory}
                    disabled={isGeneratingStory}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>{isGeneratingStory ? 'Đang sáng tác truyện...' : 'AI SÁNG TÁC TRUYỆN MẦM NON'}</span>
                  </button>
                </div>
              </div>

              {/* Story Output */}
              <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-purple-300 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-black text-purple-950 mb-3 pb-2 border-b border-slate-200">
                    Bản thảo câu chuyện mầm non
                  </h4>
                  {storyResult ? (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 text-xs sm:text-sm">
                      <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
                        <h4 className="font-black text-purple-950 text-base mb-1">{storyResult.data.title}</h4>
                        <p className="text-xs text-purple-800 font-semibold">{storyResult.data.summary}</p>
                      </div>

                      {storyResult.data.pages?.map((p: any, i: number) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <span className="font-bold text-purple-900 block mb-1">Trang {p.pageNumber}:</span>
                          <p className="text-slate-800 mb-1.5">{p.text}</p>
                          {p.dialogue && (
                            <p className="italic text-purple-950 bg-white p-2 rounded-lg border border-purple-100">
                              {p.dialogue}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-slate-400">
                      <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="font-bold text-sm">Chưa có truyện nào được tạo.</p>
                      <p className="text-xs">Cô hãy bấm nút "AI Sáng tác truyện mầm non" nhé.</p>
                    </div>
                  )}
                </div>

                {storyResult && (
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => alert('Đã xuất bản truyện vào thư viện truyện của trẻ!')}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>DUYỆT VÀ XUẤT BẢN VÀO THƯ VIỆN BÉ</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subtool 3: AI Quiz Generator */}
          {aiTool === 'quiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200">
                <h3 className="text-lg font-black text-amber-700 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Thông số Tạo câu hỏi tương tác</span>
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chủ đề câu hỏi:</label>
                    <input
                      type="text"
                      value={quizForm.topic}
                      onChange={e => setQuizForm({ ...quizForm, topic: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Độ khó:</label>
                    <select
                      value={quizForm.difficulty}
                      onChange={e => setQuizForm({ ...quizForm, difficulty: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white"
                    >
                      <option>Dễ (Nhận biết đơn giản)</option>
                      <option>Vừa sức (5-6 tuổi)</option>
                      <option>Thử thách (Tư duy & so sánh)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateQuiz}
                    disabled={isGeneratingQuiz}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-black rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>{isGeneratingQuiz ? 'Đang tạo câu hỏi...' : 'AI TẠO BỘ CÂU HỎI TƯƠNG TÁC'}</span>
                  </button>
                </div>
              </div>

              {/* Quiz Preview */}
              <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-amber-300">
                <h4 className="text-base font-black text-amber-950 mb-3 pb-2 border-b border-slate-200">
                  Bộ câu hỏi đã tạo ({quizResult.length} câu)
                </h4>
                {quizResult.length > 0 ? (
                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 text-xs sm:text-sm">
                    {quizResult.map((q, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <span className="font-black text-blue-900 block mb-1">
                          Câu {i + 1}: {q.question}
                        </span>
                        <div className="space-y-1 mb-2">
                          {q.options?.map((opt: string, optI: number) => (
                            <div
                              key={optI}
                              className={`p-1.5 rounded-lg text-xs font-semibold ${
                                optI === q.correctIndex ? 'bg-emerald-100 text-emerald-900 font-bold' : 'bg-white text-slate-700'
                              }`}
                            >
                              {opt} {optI === q.correctIndex && '✓ (Đáp án đúng)'}
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] text-emerald-800 font-bold italic">
                          Giải thích khích lệ: {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400">
                    <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-sm">Chưa có câu hỏi nào.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subtool 4: AI Feedback Assistant */}
          {aiTool === 'feedback' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200">
                <h3 className="text-lg font-black text-emerald-700 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Hỗ trợ Nhận xét sư phạm chuẩn mực</span>
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Ghi chú quan sát thực tế của cô (Tối giản dữ liệu cá nhân):
                    </label>
                    <textarea
                      rows={4}
                      value={feedbackForm.observationNotes}
                      onChange={e => setFeedbackForm({ ...feedbackForm, observationNotes: e.target.value })}
                      placeholder="Ví dụ: Bé biết đếm trong phạm vi 10, rất khéo léo gấp cánh hoa ban, tích cực giúp bạn..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Lĩnh vực phát triển:</label>
                    <input
                      type="text"
                      value={feedbackForm.domain}
                      onChange={e => setFeedbackForm({ ...feedbackForm, domain: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    🛡️ Tuân thủ bảo vệ trẻ: AI chỉ gợi ý cách diễn đạt động viên tích cực, tuyệt đối không suy đoán bệnh lý, rối loạn hay dán nhãn năng lực cố định.
                  </p>

                  <button
                    onClick={handleGenerateFeedback}
                    disabled={isGeneratingFeedback}
                    className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>{isGeneratingFeedback ? 'Đang gợi ý lời nhận xét...' : 'AI GỢI Ý CÁCH DIỄN ĐẠT ĐỘNG VIÊN'}</span>
                  </button>
                </div>
              </div>

              {/* Feedback Suggestions */}
              <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-emerald-300">
                <h4 className="text-base font-black text-emerald-950 mb-3 pb-2 border-b border-slate-200">
                  Gợi ý nhận xét sư phạm khích lệ
                </h4>
                {feedbackSuggestions.length > 0 ? (
                  <div className="space-y-3 text-xs sm:text-sm">
                    {feedbackSuggestions.map((sug, i) => (
                      <div key={i} className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-950 font-medium leading-relaxed">
                        {sug}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-sm">Chưa có gợi ý nhận xét.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Simulation Demo Banner */}
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-center font-black text-rose-800 text-xs sm:text-sm uppercase tracking-wider">
            ⚠️ BẢNG ĐIỀU KHIỂN ĐANG TRONG CHẾ ĐỘ MÔ PHỎNG – CÁC SỐ LIỆU ĐƯỢC ĐÁNH DẤU RÕ RÀNG
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border-3 border-sky-300 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Hoạt động đã tạo</span>
              <p className="text-3xl font-black text-[#0D65C9] mt-1">12</p>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">
                DỮ LIỆU GIẢ LẬP
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border-3 border-emerald-300 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Học liệu đã duyệt</span>
              <p className="text-3xl font-black text-emerald-600 mt-1">8</p>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">
                DỮ LIỆU GIẢ LẬP
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border-3 border-purple-300 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Buổi học đã ghi nhận</span>
              <p className="text-3xl font-black text-purple-600 mt-1">16</p>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">
                DỮ LIỆU GIẢ LẬP
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border-3 border-pink-300 shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase">Mã trẻ theo dõi (Zero-PII)</span>
              <p className="text-3xl font-black text-pink-600 mt-1">28</p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-2">
                Ẩn danh: Bé 01 - Bé 28
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MATERIALS MANAGEMENT */}
      {activeTab === 'materials' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200">
          <h3 className="text-lg font-black text-[#0D65C9] mb-4">
            Kho học liệu & Kế hoạch đã thẩm định của Cô giáo Lò Thị Phong
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Khám phá hoa ban 5 cánh và số lượng trong phạm vi 10', domain: 'Nhận thức', status: 'Đã xuất bản', date: '2026-10-15' },
              { title: 'Truyện kể: Bạn Ban Nhỏ tìm mùa xuân', domain: 'Ngôn ngữ', status: 'Đã xuất bản', date: '2026-10-18' },
              { title: 'Mô hình nhà sàn bản em từ hộp giấy tái chế', domain: 'STEAM & Thẩm mỹ', status: 'Đã duyệt', date: '2026-10-21' },
              { title: 'Thí nghiệm Vật nổi - Vật chìm suối Nậm Rốm', domain: 'Khoa học', status: 'Đã duyệt', date: '2026-10-24' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">Lĩnh vực: {item.domain} | Ngày cập nhật: {item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                    {item.status}
                  </span>
                  <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl">
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CLASS & CHILD DEVELOPMENT OBSERVATIONS */}
      {activeTab === 'classes' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-black text-[#0D65C9] mb-1">
              Theo dõi sự phát triển của trẻ theo 5 lĩnh vực (Bộ GD&ĐT)
            </h3>
            <p className="text-xs text-slate-500 font-semibold mb-4">
              🛡️ Nguyên tắc bảo mật: Chỉ sử dụng mã định danh (Bé 01, Bé 02), không công khai họ tên hay hình ảnh nhận diện.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3 rounded-l-xl">Mã định danh</th>
                  <th className="p-3">Nhóm</th>
                  <th className="p-3">Thể chất</th>
                  <th className="p-3">Nhận thức</th>
                  <th className="p-3">Ngôn ngữ</th>
                  <th className="p-3">Tình cảm - KNXH</th>
                  <th className="p-3 rounded-r-xl">Thẩm mỹ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[
                  { code: 'Bé 01', group: 'Nhóm Hoa Ban', tc: 'Thể hiện độc lập', nt: 'Đang phát triển', nn: 'Thể hiện độc lập', xh: 'Thể hiện độc lập', tm: 'Đang phát triển' },
                  { code: 'Bé 02', group: 'Nhóm Cánh Đồng', tc: 'Đang phát triển', nt: 'Cần hỗ trợ', nn: 'Đang phát triển', xh: 'Thể hiện độc lập', tm: 'Thể hiện độc lập' },
                  { code: 'Bé 03', group: 'Nhóm Rừng Xanh', tc: 'Thể hiện độc lập', nt: 'Thể hiện độc lập', nn: 'Thể hiện độc lập', xh: 'Thể hiện độc lập', tm: 'Thể hiện độc lập' },
                  { code: 'Bé 04', group: 'Nhóm Dòng Suối', tc: 'Đang phát triển', nt: 'Đang phát triển', nn: 'Cần hỗ trợ', xh: 'Đang phát triển', tm: 'Đang phát triển' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-amber-50/50">
                    <td className="p-3 font-bold text-blue-900">{row.code}</td>
                    <td className="p-3 text-slate-500">{row.group}</td>
                    <td className="p-3"><span className="text-emerald-700 font-semibold">{row.tc}</span></td>
                    <td className="p-3"><span className={row.nt === 'Cần hỗ trợ' ? 'text-rose-600 font-bold' : 'text-slate-700'}>{row.nt}</span></td>
                    <td className="p-3"><span className={row.nn === 'Cần hỗ trợ' ? 'text-rose-600 font-bold' : 'text-slate-700'}>{row.nn}</span></td>
                    <td className="p-3"><span className="text-emerald-700">{row.xh}</span></td>
                    <td className="p-3"><span className="text-slate-700">{row.tm}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: EVIDENCE & COMPETITION REPORT */}
      {activeTab === 'evidence' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-black text-[#0D65C9]">
                Minh chứng triển khai thực tế & Báo cáo dự thi
              </h3>
              <p className="text-xs text-slate-500">
                Lớp Lá (5-6 tuổi) – Trường Mầm non Thanh Yên, huyện Điện Biên
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportCsv}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Xuất file CSV</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>In báo cáo</span>
              </button>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 text-xs text-amber-900 font-semibold">
            📌 <strong>Quy định minh chứng:</strong> Báo cáo phân biệt rạch ròi giữa dữ liệu mô phỏng demo và dữ liệu thật được ghi nhận. Không tự ý tạo kết quả thành tích giả như "95% tiến bộ" nếu chưa có kiểm chứng thực nghiệm.
          </div>

          {/* Activity Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Ngày</th>
                  <th className="p-3">Hoạt động</th>
                  <th className="p-3">Trẻ tham gia</th>
                  <th className="p-3">Nội dung ghi nhận</th>
                  <th className="p-3">Phân loại dữ liệu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="p-3 font-bold text-slate-600">2026-10-20</td>
                  <td className="p-3 font-bold text-blue-900">Khám phá hoa ban 5 cánh</td>
                  <td className="p-3">26 / 28 bé</td>
                  <td className="p-3 text-slate-600">Trẻ quan sát cánh hoa, đếm số cánh, tập tạo hình hoa giấy xốp.</td>
                  <td className="p-3"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">DỮ LIỆU GIẢ LẬP</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-600">2026-10-22</td>
                  <td className="p-3 font-bold text-blue-900">Lắp ráp mô hình nhà sàn</td>
                  <td className="p-3">27 / 28 bé</td>
                  <td className="p-3 text-slate-600">Trẻ nhận diện khối hình tam giác, hình chữ nhật, làm khau cút.</td>
                  <td className="p-3"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">DỮ LIỆU GIẢ LẬP</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-600">2026-10-25</td>
                  <td className="p-3 font-bold text-blue-900">Bảo vệ bản làng xanh & suối</td>
                  <td className="p-3">28 / 28 bé</td>
                  <td className="p-3 text-slate-600">Trẻ thực hành bỏ rác vào thùng, tiết kiệm nước khi rửa tay.</td>
                  <td className="p-3"><span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">DỮ LIỆU GIẢ LẬP</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: DATABASE (SQL) */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border-3 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-[#0D65C9]">
                Cấu trúc Cơ sở dữ liệu PostgreSQL & Supabase (RLS Policies)
              </h3>
              <p className="text-xs text-slate-500">
                10 bảng dữ liệu chuẩn hóa, kích hoạt Row Level Security và Zero-PII bảo vệ quyền riêng tư trẻ em.
              </p>
            </div>
            <button
              onClick={() => {
                const element = document.createElement('a');
                element.setAttribute('href', '/src/data/schema.sql');
                element.setAttribute('download', 'schema_dienbien_kids.sql');
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Tải file migration .sql</span>
            </button>
          </div>

          <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-xs font-mono max-h-[450px] overflow-y-auto leading-relaxed">
            <p className="text-slate-400">-- 10 Bảng cơ sở dữ liệu đã thiết kế sẵn sàng:</p>
            <p>1. teacher_profiles (Hồ sơ giáo viên Lò Thị Phong)</p>
            <p>2. classes (Lớp Mẫu giáo Lớn 5-6 tuổi)</p>
            <p>3. learner_codes (Mã trẻ ẩn danh Bé 01, Bé 02 - Không lưu PII)</p>
            <p>4. learning_activities (Kế hoạch bài dạy / hoạt động khám phá)</p>
            <p>5. game_sessions (Lượt chơi trò chơi & sao khích lệ)</p>
            <p>6. teacher_observations (Quan sát 5 lĩnh vực phát triển)</p>
            <p>7. published_stories (Thư viện truyện kể mầm non)</p>
            <p>8. ai_drafts (Lịch sử tạo giáo án/truyện AI)</p>
            <p>9. evidence_records (Minh chứng triển khai thực tế & dự thi)</p>
            <p>10. audit_logs (Nhật ký kiểm toán an ninh bảo mật)</p>
            <p className="mt-2 text-yellow-300">-- Đã cấu hình Row Level Security (RLS) cho tất cả các bảng.</p>
          </div>
        </div>
      )}

      {/* TAB: CÀI ĐẶT GIỌNG ĐỌC TIẾNG VIỆT */}
      {activeTab === 'speech-settings' && <VietnameseVoiceSettings />}
    </div>
  );
};
