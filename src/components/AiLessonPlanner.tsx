import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  Download,
  Copy,
  RotateCcw,
  Volume2,
  CheckCircle,
  AlertCircle,
  Plus,
  BookOpen,
  Edit3,
  Save,
  Globe,
  Layers,
  Clock,
  Calendar,
  Users,
  Compass,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import {
  LessonPlanData,
  SAMPLE_LESSON_PLAN,
  generateDynamicLessonPlan,
} from '../data/lessonPlansData';
import { exportLessonPlanToDocx } from '../utils/docxExport';

export const AiLessonPlanner: React.FC = () => {
  // Input Form State
  const [formData, setFormData] = useState({
    teacher: 'Lò Thị Phong',
    school: 'Trường Mầm non Thanh Yên',
    ageGroup: 'Mẫu giáo lớn (5–6 tuổi)',
    date: new Date().toISOString().split('T')[0],
    theme: 'Quê hương Điện Biên tươi đẹp',
    subTheme: 'Mùa hoa ban nở rộ trên sườn đồi bản em',
    topic: 'Khám phá hoa ban quê em',
    activityType: 'Khám phá khoa học',
    durationMinutes: 25,
    groupSize: '25-28 trẻ',
    environment: 'Trong lớp học và góc thiên nhiên',
    domain: 'Phát triển nhận thức',
    objectivesNote: '',
    materialsNote: '',
    enableEnglish: true,
    englishWordCount: 5,
    englishLevel: 'Làm quen tự nhiên',
    englishFormat: 'Tranh ảnh trực quan & Trò chơi',
  });

  // Generator & Plan State
  const [currentPlan, setCurrentPlan] = useState<LessonPlanData>(SAMPLE_LESSON_PLAN);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>({
    type: 'success',
    text: 'Đã sẵn sàng kế hoạch mẫu chuẩn: "Khám phá hoa ban quê em" (25 phút, lồng ghép tiếng Anh). Cô có thể chỉnh sửa, in hoặc tạo mới!',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editablePlan, setEditablePlan] = useState<LessonPlanData>(SAMPLE_LESSON_PLAN);
  const [savedPlans, setSavedPlans] = useState<LessonPlanData[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('dienbien_saved_lesson_plans');
        return stored ? JSON.parse(stored) : [SAMPLE_LESSON_PLAN];
      } catch {
        return [SAMPLE_LESSON_PLAN];
      }
    }
    return [SAMPLE_LESSON_PLAN];
  });
  const [showSavedList, setShowSavedList] = useState<boolean>(false);

  // Sync editable plan whenever current plan changes
  useEffect(() => {
    setEditablePlan(currentPlan);
  }, [currentPlan]);

  // Save plans to local storage
  const persistPlans = (plans: LessonPlanData[]) => {
    setSavedPlans(plans);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dienbien_saved_lesson_plans', JSON.stringify(plans));
    }
  };

  // Generate Lesson Plan Handler
  const handleGeneratePlan = async () => {
    if (!formData.topic.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập tên hoạt động hoặc chủ đề bài dạy!' });
      soundManager.playEncouragingChime();
      return;
    }

    soundManager.playClick();
    setIsLoading(true);
    setStatusMessage({ type: 'info', text: `Đang kết nối AI sư phạm soạn kế hoạch cho hoạt động "${formData.topic}"...` });

    try {
      const res = await fetch('/api/ai/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: formData.topic,
          subTheme: formData.subTheme,
          ageGroup: formData.ageGroup,
          domain: formData.domain,
          activityType: formData.activityType,
          durationMinutes: Number(formData.durationMinutes) || 25,
          teacher: formData.teacher,
          school: formData.school,
          materials: formData.materialsNote,
          environment: formData.environment,
          enableEnglish: formData.enableEnglish,
          englishSettings: {
            wordCount: formData.englishWordCount,
            level: formData.englishLevel,
            format: formData.englishFormat,
          },
        }),
      });

      const json = await res.json();

      if (json && json.data) {
        setCurrentPlan(json.data);
        setStatusMessage({
          type: 'success',
          text: json.statusMessage || (json.isAiGenerated ? 'Kế hoạch đã được AI tạo thành công!' : 'Kế hoạch tạo từ mẫu sư phạm Điện Biên – chưa sử dụng AI.'),
        });
        soundManager.playSuccessChime();
      } else {
        throw new Error('Dữ liệu trả về không hợp lệ');
      }
    } catch (err: any) {
      console.warn('Fallback to local dynamic generator:', err);
      const fallback = generateDynamicLessonPlan({
        topic: formData.topic,
        subTheme: formData.subTheme,
        ageGroup: formData.ageGroup,
        domain: formData.domain,
        activityType: formData.activityType,
        durationMinutes: Number(formData.durationMinutes) || 25,
        teacher: formData.teacher,
        school: formData.school,
        enableEnglish: formData.enableEnglish,
      });
      setCurrentPlan(fallback);
      setStatusMessage({
        type: 'info',
        text: 'Kế hoạch tạo từ mẫu sư phạm Điện Biên – chưa sử dụng AI (Mạng ngoại tuyến hoặc API chưa kết nối).',
      });
      soundManager.playSuccessChime();
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  // Load Sample Flower Plan
  const handleLoadSample = () => {
    soundManager.playClick();
    setCurrentPlan(SAMPLE_LESSON_PLAN);
    setFormData({
      teacher: 'Lò Thị Phong',
      school: 'Trường Mầm non Thanh Yên',
      ageGroup: 'Mẫu giáo lớn (5–6 tuổi)',
      date: new Date().toISOString().split('T')[0],
      theme: 'Quê hương Điện Biên tươi đẹp',
      subTheme: 'Mùa hoa ban nở rộ trên sườn đồi bản em',
      topic: 'Khám phá hoa ban quê em',
      activityType: 'Khám phá khoa học',
      durationMinutes: 25,
      groupSize: '25-28 trẻ',
      environment: 'Trong lớp học và góc thiên nhiên',
      domain: 'Phát triển nhận thức',
      objectivesNote: '',
      materialsNote: '',
      enableEnglish: true,
      englishWordCount: 5,
      englishLevel: 'Làm quen tự nhiên',
      englishFormat: 'Tranh ảnh trực quan & Trò chơi',
    });
    setStatusMessage({ type: 'success', text: 'Đã tải thành công Kế hoạch bài dạy mẫu: "Khám phá hoa ban quê em"!' });
  };

  // Save plan to local collection
  const handleSavePlan = () => {
    soundManager.playClick();
    const existingIdx = savedPlans.findIndex(p => p.id === currentPlan.id);
    let updated: LessonPlanData[];
    if (existingIdx >= 0) {
      updated = [...savedPlans];
      updated[existingIdx] = currentPlan;
    } else {
      updated = [currentPlan, ...savedPlans];
    }
    persistPlans(updated);
    setStatusMessage({ type: 'success', text: `Đã lưu kế hoạch "${currentPlan.title}" vào danh sách học liệu của cô!` });
    soundManager.playStarChime();
  };

  // Duplicate plan
  const handleDuplicatePlan = () => {
    soundManager.playClick();
    const duplicated: LessonPlanData = {
      ...currentPlan,
      id: `lesson-${Date.now()}`,
      title: `${currentPlan.title} (Bản sao)`,
      status: 'draft',
    };
    setCurrentPlan(duplicated);
    setStatusMessage({ type: 'info', text: 'Đã nhân bản kế hoạch mới. Cô có thể chỉnh sửa nội dung và lưu lại.' });
  };

  // Export to Word (.docx)
  const handleExportWord = async () => {
    soundManager.playClick();
    try {
      await exportLessonPlanToDocx(currentPlan);
      setStatusMessage({ type: 'success', text: 'Đã xuất file Word (.docx) chuẩn bảng 4 cột và font Unicode tiếng Việt!' });
      soundManager.playSuccessChime();
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Không thể xuất file Word: ' + err.message });
    }
  };

  // Print / PDF
  const handlePrint = () => {
    soundManager.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Copy full plan text
  const handleCopy = () => {
    soundManager.playClick();
    const text = `
TRƯỜNG MẦM NON THANH YÊN
KẾ HOẠCH TỔ CHỨC HOẠT ĐỘNG GIÁO DỤC
GIÁO VIÊN: ${currentPlan.teacher}
Lớp: ${currentPlan.ageGroup} | Thời lượng: ${currentPlan.durationMinutes} phút

I. THÔNG TIN HOẠT ĐỘNG:
- Tên hoạt động: ${currentPlan.title}
- Lĩnh vực: ${currentPlan.developmentalArea}
- Loại hình: ${currentPlan.activityType}

II. MỤC TIÊU:
1. Kiến thức:
${currentPlan.objectives.knowledge.map(k => ` - ${k}`).join('\n')}
2. Kỹ năng:
${currentPlan.objectives.skills.map(s => ` - ${s}`).join('\n')}
3. Thái độ:
${currentPlan.objectives.attitude.map(a => ` - ${a}`).join('\n')}
${currentPlan.objectives.english ? `4. Tiếng Anh lồng ghép:\n${currentPlan.objectives.english.map(e => ` - ${e}`).join('\n')}` : ''}

III. TIẾN TRÌNH HOẠT ĐỘNG:
${currentPlan.activitySteps.map(s => `[${s.stepName} - ${s.duration}]\n+ Hoạt động cô: ${s.teacherActivity}\n+ Hoạt động trẻ: ${s.childActivity}\n+ Lồng ghép: ${s.integratedContent}`).join('\n\n')}

IV. ĐÁNH GIÁ:
${currentPlan.assessment.map(a => ` - ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setStatusMessage({ type: 'success', text: 'Đã sao chép toàn bộ kế hoạch vào bộ nhớ tạm (Clipboard)!' });
  };

  // English pronunciation helper using Bilingual Voice Engine
  const playEnglishWord = (word: string) => {
    soundManager.playClick();
    soundManager.speakEnglish(word);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0D65C9] via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl no-print">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>CÔNG CỤ SƯ PHẠM MẦM NON 5–6 TUỔI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              TRỢ LÝ SOẠN KẾ HOẠCH BÀI DẠY AI
            </h1>
            <p className="text-sm sm:text-base font-semibold text-blue-100 max-w-2xl">
              Đồng hành cùng cô Lò Thị Phong trong hành trình sáng tạo hoạt động giáo dục mầm non tại Trường Mầm non Thanh Yên, Điện Biên.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleLoadSample}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem Kế hoạch mẫu (Hoa Ban)</span>
            </button>
            <button
              onClick={() => setShowSavedList(!showSavedList)}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4" />
              <span>Kế hoạch đã lưu ({savedPlans.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm font-bold border-2 no-print ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
              : statusMessage.type === 'error'
              ? 'bg-rose-50 text-rose-950 border-rose-300'
              : 'bg-blue-50 text-blue-950 border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : statusMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Saved plans drawer / list */}
      {showSavedList && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border-3 border-amber-300 no-print animate-fadeIn">
          <h3 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Danh sách Kế hoạch bài dạy đã lưu:</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedPlans.map(plan => (
              <div
                key={plan.id}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentPlan(plan);
                  setShowSavedList(false);
                  setStatusMessage({ type: 'success', text: `Đã mở kế hoạch: "${plan.title}"!` });
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  plan.id === currentPlan.id
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                    {plan.developmentalArea}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{plan.durationMinutes} phút</span>
                </div>
                <h4 className="font-black text-sm text-slate-900 line-clamp-1">{plan.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{plan.date} • {plan.activityType}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main 2-column Grid: Input Form on the Left, Lesson Output on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-md border-3 border-[#FFCD53] space-y-4 no-print">
          <div className="pb-3 border-b-2 border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-black text-[#0D65C9] flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Thông số Hoạt động Giáo dục</span>
            </h2>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Mầm non 5–6 tuổi
            </span>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 text-xs sm:text-sm">
            {/* Tên hoạt động */}
            <div>
              <label className="font-extrabold text-slate-800 block mb-1">
                Tên hoạt động / Chủ đề bài dạy: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={e => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Ví dụ: Khám phá hoa ban quê em, Cây lúa Mường Thanh..."
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-300 focus:border-blue-600 font-bold outline-none shadow-sm"
              />
            </div>

            {/* Chủ đề lớn & Chủ đề nhánh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Chủ đề lớn:</label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={e => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Chủ đề nhánh:</label>
                <input
                  type="text"
                  value={formData.subTheme}
                  onChange={e => setFormData({ ...formData, subTheme: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            {/* Lĩnh vực phát triển */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Lĩnh vực phát triển:</label>
              <select
                value={formData.domain}
                onChange={e => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
              >
                <option>Phát triển nhận thức</option>
                <option>Phát triển thẩm mỹ</option>
                <option>Phát triển ngôn ngữ</option>
                <option>Phát triển tình cảm và kỹ năng xã hội</option>
                <option>Phát triển thể chất</option>
              </select>
            </div>

            {/* Loại hình hoạt động */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Loại hình hoạt động:</label>
              <select
                value={formData.activityType}
                onChange={e => setFormData({ ...formData, activityType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
              >
                <option>Khám phá khoa học</option>
                <option>Khám phá xã hội</option>
                <option>Làm quen với toán</option>
                <option>Làm quen chữ cái</option>
                <option>Làm quen văn học</option>
                <option>Kể chuyện</option>
                <option>Hoạt động tạo hình</option>
                <option>Giáo dục âm nhạc</option>
                <option>Hoạt động vận động</option>
                <option>Hoạt động ngoài trời</option>
                <option>Hoạt động STEAM</option>
                <option>Giáo dục kỹ năng sống</option>
                <option>Khám phá văn hóa địa phương</option>
                <option>Làm quen với tiếng Anh</option>
              </select>
            </div>

            {/* Thời lượng & Ngày tổ chức */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Thời lượng (phút):</label>
                <select
                  value={formData.durationMinutes}
                  onChange={e => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                >
                  <option value={20}>20 phút</option>
                  <option value={25}>25 phút (Chuẩn)</option>
                  <option value={30}>30 phút</option>
                  <option value={35}>35 phút</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ngày tổ chức:</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            {/* Điều kiện lớp học */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Điều kiện lớp học:</label>
              <select
                value={formData.environment}
                onChange={e => setFormData({ ...formData, environment: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
              >
                <option>Trong lớp học và góc thiên nhiên</option>
                <option>Màn hình tivi / Smart TV trình chiếu</option>
                <option>Hoạt động ngoài sân trường</option>
                <option>Không có thiết bị công nghệ (Trực quan mẫu vật)</option>
              </select>
            </div>

            {/* Tùy chọn lồng ghép tiếng Anh (Section III.2) */}
            <div className="bg-pink-50/70 border-2 border-pink-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#FB789E]" />
                  <span className="font-black text-slate-900 text-xs sm:text-sm">
                    LỒNG GHÉP TIẾNG ANH:
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setFormData({ ...formData, enableEnglish: !formData.enableEnglish });
                  }}
                  className={`w-14 h-7 rounded-full transition-colors relative ${
                    formData.enableEnglish ? 'bg-[#FB789E]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-transform ${
                      formData.enableEnglish ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {formData.enableEnglish && (
                <div className="pt-2 border-t border-pink-200 space-y-2.5 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-slate-700 text-[11px] block">Số lượng từ vựng:</label>
                      <select
                        value={formData.englishWordCount}
                        onChange={e => setFormData({ ...formData, englishWordCount: Number(e.target.value) })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-pink-300 font-bold bg-white text-xs"
                      >
                        <option value={3}>3 từ</option>
                        <option value={4}>4 từ</option>
                        <option value={5}>5 từ (Khuyên dùng)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 text-[11px] block">Mức độ:</label>
                      <select
                        value={formData.englishLevel}
                        onChange={e => setFormData({ ...formData, englishLevel: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-pink-300 font-bold bg-white text-xs"
                      >
                        <option>Làm quen tự nhiên</option>
                        <option>Củng cố phản xạ</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-[11px] text-pink-700 font-semibold leading-relaxed">
                    💡 Gợi ý: Lồng ghép nhẹ nhàng 2–4 phút qua tranh ảnh và trò chơi nghe chỉ tranh, phát âm bằng giọng đọc tiếng Anh chuẩn.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className="w-full mt-2 py-4 bg-gradient-to-r from-[#0D65C9] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-black rounded-2xl shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 text-base"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              <span>{isLoading ? 'ĐANG TẠO KẾ HOẠCH BÀI DẠY...' : 'AI TẠO KẾ HOẠCH BÀI DẠY'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Complete Official Educational Plan Display */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-[#FFCD53] space-y-6">
          {/* Action Toolbar on Top */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100 no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                {currentPlan.sourceType === 'ai_generated' ? 'Tạo bởi AI Studio' : 'Mẫu chuẩn sư phạm Điện Biên'}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {currentPlan.durationMinutes} phút
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors"
                title="Chỉnh sửa nội dung kế hoạch"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Xong sửa' : 'Chỉnh sửa'}</span>
              </button>

              <button
                onClick={handleSavePlan}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-colors shadow-sm"
                title="Lưu kế hoạch vào máy"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu lại</span>
              </button>

              <button
                onClick={handleExportWord}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-colors shadow-sm"
                title="Tải tệp Microsoft Word (.docx)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Word</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors"
                title="In / Lưu PDF"
              >
                <Printer className="w-3.5 h-3.5 text-blue-600" />
                <span>In / PDF</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                title="Sao chép nội dung"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={handleDuplicatePlan}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
                title="Nhân bản kế hoạch"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Lesson Plan Content Body */}
          <div className="printable-plan text-slate-800 space-y-6">
            {/* Header of official preschool document */}
            <div className="text-center space-y-1 pb-4 border-b-2 border-slate-200">
              <p className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-slate-700">
                {currentPlan.school}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0D65C9] uppercase tracking-tight">
                KẾ HOẠCH TỔ CHỨC HOẠT ĐỘNG GIÁO DỤC
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 italic">
                Giáo viên thực hiện: <strong className="text-slate-900">{currentPlan.teacher}</strong> • Lớp: <strong>{currentPlan.ageGroup}</strong>
              </p>
            </div>

            {/* I. THÔNG TIN HOẠT ĐỘNG */}
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#0D65C9] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span>I. THÔNG TIN HOẠT ĐỘNG</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-600">Chủ đề lớn: </span>
                  <span className="font-semibold text-slate-900">{currentPlan.theme}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Chủ đề nhánh: </span>
                  <span className="font-semibold text-slate-900">{currentPlan.subTheme}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Tên hoạt động: </span>
                  <span className="font-black text-blue-900">{currentPlan.title}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Lĩnh vực phát triển: </span>
                  <span className="font-semibold text-slate-900">{currentPlan.developmentalArea}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Loại hình hoạt động: </span>
                  <span className="font-semibold text-slate-900">{currentPlan.activityType}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Thời lượng: </span>
                  <span className="font-black text-emerald-700">{currentPlan.durationMinutes} phút</span>
                </div>
              </div>
            </div>

            {/* II. MỤC TIÊU */}
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#0D65C9] uppercase tracking-wide mb-2">
                II. MỤC TIÊU HOẠT ĐỘNG
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-slate-900">1. Kiến thức:</h4>
                  <ul className="list-disc pl-5 text-slate-700 font-medium space-y-1">
                    {currentPlan.objectives.knowledge.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">2. Kỹ năng:</h4>
                  <ul className="list-disc pl-5 text-slate-700 font-medium space-y-1">
                    {currentPlan.objectives.skills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">3. Thái độ:</h4>
                  <ul className="list-disc pl-5 text-slate-700 font-medium space-y-1">
                    {currentPlan.objectives.attitude.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
                {currentPlan.objectives.english && (
                  <div className="bg-pink-50 p-2.5 rounded-xl border border-pink-200">
                    <h4 className="font-bold text-pink-900">4. Làm quen Tiếng Anh (Lồng ghép):</h4>
                    <ul className="list-disc pl-5 text-pink-950 font-medium space-y-0.5">
                      {currentPlan.objectives.english.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* III. CHUẨN BỊ */}
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#0D65C9] uppercase tracking-wide mb-2">
                III. CHUẨN BỊ ĐỒ DÙNG, HỌC LIỆU
              </h3>
              <div className="space-y-1.5 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p>
                  <strong className="text-slate-900">1. Đồ dùng của cô: </strong>
                  <span className="text-slate-700">{currentPlan.materials.teacher.join('; ')}</span>
                </p>
                <p>
                  <strong className="text-slate-900">2. Đồ dùng của trẻ: </strong>
                  <span className="text-slate-700">{currentPlan.materials.children.join('; ')}</span>
                </p>
                <p>
                  <strong className="text-slate-900">3. Địa điểm, không gian: </strong>
                  <span className="text-slate-700">{currentPlan.materials.space}</span>
                </p>
              </div>
            </div>

            {/* IV. TIẾN TRÌNH HOẠT ĐỘNG (BẢNG 4 CỘT) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-sm sm:text-base text-[#0D65C9] uppercase tracking-wide">
                  IV. TIẾN TRÌNH HOẠT ĐỘNG (BẢNG 4 CỘT)
                </h3>
                <span className="text-[11px] font-bold text-slate-500">
                  Tổng thời gian: {currentPlan.durationMinutes} phút
                </span>
              </div>

              <div className="overflow-x-auto border-2 border-slate-300 rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-[#0D65C9] text-white font-black uppercase text-[11px]">
                    <tr>
                      <th className="p-3 border-r border-blue-400 w-1/6">Thời gian</th>
                      <th className="p-3 border-r border-blue-400 w-2/5">Hoạt động của cô</th>
                      <th className="p-3 border-r border-blue-400 w-1/4">Hoạt động của trẻ</th>
                      <th className="p-3 w-1/5">Nội dung lồng ghép</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentPlan.activitySteps.map((step, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                        <td className="p-3 align-top border-r border-slate-200 font-bold text-blue-900">
                          <div>{step.stepName}</div>
                          <span className="inline-block mt-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px] font-extrabold">
                            {step.duration}
                          </span>
                        </td>
                        <td className="p-3 align-top border-r border-slate-200 text-slate-800 leading-relaxed font-medium">
                          <p>{step.teacherActivity}</p>
                          {step.guidingQuestions && step.guidingQuestions.length > 0 && (
                            <div className="mt-2 text-xs text-blue-800 bg-blue-50/80 p-2 rounded-xl border border-blue-200">
                              <span className="font-black block mb-0.5">💬 Câu hỏi gợi mở:</span>
                              <ul className="list-disc pl-4 space-y-0.5">
                                {step.guidingQuestions.map((q, qi) => (
                                  <li key={qi}>{q}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </td>
                        <td className="p-3 align-top border-r border-slate-200 text-slate-700 leading-relaxed font-medium">
                          {step.childActivity}
                        </td>
                        <td className="p-3 align-top text-slate-600 leading-relaxed text-xs font-semibold">
                          {step.integratedContent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* V. TÍCH HỢP TIẾNG ANH (NẾU ĐƯỢC BẬT) */}
            {currentPlan.englishIntegration && currentPlan.englishIntegration.enabled && (
              <div className="bg-pink-50/60 border-2 border-pink-300 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-pink-200">
                  <h3 className="font-black text-sm sm:text-base text-pink-900 uppercase tracking-wide flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#FB789E]" />
                    <span>V. NỘI DUNG LỒNG GHÉP TIẾNG ANH (THÔNG TƯ 50/2020)</span>
                  </h3>
                  <span className="text-xs font-bold text-pink-700">
                    {currentPlan.englishIntegration.timeEstimate}
                  </span>
                </div>

                {/* Vocabulary Cards with Audio Buttons */}
                <div>
                  <h4 className="font-extrabold text-xs text-slate-700 uppercase mb-2">
                    Từ vựng quen thuộc (Bấm loa để nghe giọng đọc tiếng Anh chuẩn):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {currentPlan.englishIntegration.vocabulary.map((vocab, vi) => (
                      <div
                        key={vi}
                        className="p-3 bg-white rounded-2xl border-2 border-pink-200 shadow-sm flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-base text-pink-700">{vocab.word}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{vocab.phonetic}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700">{vocab.meaning}</p>
                        </div>
                        <button
                          onClick={() => playEnglishWord(vocab.word)}
                          className="p-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-xl transition-transform active:scale-90 shrink-0"
                          title={`Nghe phát âm từ tiếng Anh "${vocab.word}"`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model dialogue & teacher guide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                  <div className="bg-white p-3 rounded-2xl border border-pink-200">
                    <span className="font-black text-slate-900 block mb-1">Mẫu câu giao tiếp ngắn:</span>
                    <p className="text-pink-800 font-bold text-sm">"{currentPlan.englishIntegration.modelSentence}"</p>
                    <button
                      onClick={() => playEnglishWord(currentPlan.englishIntegration!.modelSentence)}
                      className="mt-2 text-[11px] font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe câu mẫu</span>
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-pink-200">
                    <span className="font-black text-slate-900 block mb-1">Hoạt động luyện tập:</span>
                    <p className="text-slate-700 font-medium">{currentPlan.englishIntegration.practiceActivity}</p>
                  </div>
                </div>
              </div>
            )}

            {/* VI. ĐÁNH GIÁ & ĐIỀU CHỈNH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">
                  VI. ĐÁNH GIÁ (TIÊU CHÍ QUAN SÁT TRẺ):
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-700 font-medium space-y-1">
                  {currentPlan.assessment.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-2">
                  VII. ĐIỀU CHỈNH SƯ PHẠM:
                </h4>
                <div className="text-xs text-slate-700 font-medium space-y-1">
                  <p><strong>• Trẻ cần hỗ trợ:</strong> {currentPlan.differentiation.supportChildren}</p>
                  <p><strong>• Trẻ thể hiện tốt:</strong> {currentPlan.differentiation.advancedChildren}</p>
                  <p><strong>• Khi mất mạng/offline:</strong> {currentPlan.differentiation.offlineFallback}</p>
                </div>
              </div>
            </div>

            {/* VIII. HOẠT ĐỘNG NỐI TIẾP */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-slate-700 space-y-1">
              <h4 className="font-black text-xs uppercase tracking-wider text-amber-900 mb-1">
                VIII. HOẠT ĐỘNG NỐI TIẾP:
              </h4>
              <p><strong>• Hoạt động góc:</strong> {currentPlan.followUpActivities.cornerActivity}</p>
              <p><strong>• Hoạt động ngoài trời:</strong> {currentPlan.followUpActivities.outdoorActivity}</p>
              <p><strong>• Phối hợp gia đình:</strong> {currentPlan.followUpActivities.familyCoordination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
