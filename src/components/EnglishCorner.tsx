import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Sparkles,
  Star,
  RotateCcw,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Headphones,
  Award,
  Layers,
  Gamepad2,
  Music,
} from 'lucide-react';
import { ENGLISH_CATEGORIES, EnglishWord, EnglishCategory } from '../data/englishData';
import { soundManager } from '../utils/audio';
import { useApp } from '../context/AppContext';

type EnglishMode = 'vocab' | 'game-listen' | 'game-color' | 'game-count' | 'game-adventure';

export const EnglishCorner: React.FC = () => {
  const { addStar, tvMode } = useApp();
  const [currentMode, setCurrentMode] = useState<EnglishMode>('vocab');
  const [selectedCategory, setSelectedCategory] = useState<string>('flowers-colors');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);

  // Game 1: Listen and Choose state
  const [listenGameRound, setListenGameRound] = useState<number>(1);
  const [listenTarget, setListenTarget] = useState<EnglishWord | null>(null);
  const [listenOptions, setListenOptions] = useState<EnglishWord[]>([]);
  const [listenScore, setListenScore] = useState<number>(0);
  const [listenFeedback, setListenFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Game 2: Color Magic state
  const colorFlowers = [
    { colorEn: 'White', colorVi: 'Trắng', hex: '#FFFFFF', border: '#CBD5E1', icon: '🤍' },
    { colorEn: 'Pink', colorVi: 'Hồng', hex: '#FB789E', border: '#F43F5E', icon: '💖' },
    { colorEn: 'Yellow', colorVi: 'Vàng', hex: '#FFCD53', border: '#EAB308', icon: '💛' },
    { colorEn: 'Green', colorVi: 'Xanh lá', hex: '#72D8AB', border: '#10B981', icon: '💚' },
    { colorEn: 'Blue', colorVi: 'Xanh dương', hex: '#38BDF8', border: '#0284C7', icon: '💙' },
    { colorEn: 'Red', colorVi: 'Đỏ', hex: '#F87171', border: '#DC2626', icon: '❤️' },
  ];
  const [colorTarget, setColorTarget] = useState(colorFlowers[1]);
  const [colorFeedback, setColorFeedback] = useState<string | null>(null);

  // Game 3: Count with Ban state
  const countObjects = [
    { nameEn: 'flowers', nameVi: 'bông hoa', icon: '🌸' },
    { nameEn: 'butterflies', nameVi: 'chú bướm', icon: '🦋' },
    { nameEn: 'birds', nameVi: 'chú chim', icon: '🐦' },
    { nameEn: 'fish', nameVi: 'chú cá', icon: '🐟' },
    { nameEn: 'stars', nameVi: 'ngôi sao', icon: '⭐' },
  ];
  const [countNumber, setCountNumber] = useState<number>(4);
  const [countObj, setCountObj] = useState(countObjects[0]);
  const [countFeedback, setCountFeedback] = useState<boolean | null>(null);
  const [countedTaps, setCountedTaps] = useState<number>(0);

  // Game 4: Adventure state
  const adventureSteps = [
    {
      id: 1,
      titleVi: 'Trạm 1: Cánh đồng Mường Thanh',
      titleEn: 'Stop 1: Muong Thanh Field',
      descVi: 'Bé hãy tìm từ "Cánh đồng lúa" trong tiếng Anh nhé!',
      targetEn: 'Rice field',
      targetVi: 'Cánh đồng lúa',
      icon: '🌾',
      options: ['Rice field', 'Mountain', 'River'],
    },
    {
      id: 2,
      titleVi: 'Trạm 2: Đèo Pha Đin mộng mơ',
      titleEn: 'Stop 2: Pha Din Mountain Pass',
      descVi: 'Ngọn núi hùng vĩ tiếng Anh gọi là gì nhỉ?',
      targetEn: 'Mountain',
      targetVi: 'Ngọn núi',
      icon: '⛰️',
      options: ['Stream', 'Mountain', 'Village'],
    },
    {
      id: 3,
      titleVi: 'Trạm 3: Rừng Hoa Ban trắng hồng',
      titleEn: 'Stop 3: Ban Flower Forest',
      descVi: 'Bông hoa ban mùa xuân tiếng Anh là gì?',
      targetEn: 'Ban flower',
      targetVi: 'Hoa ban',
      icon: '🌸',
      options: ['Sun', 'Ban flower', 'Leaf'],
    },
    {
      id: 4,
      titleVi: 'Trạm 4: Ngôi nhà sàn ấm cúng',
      titleEn: 'Stop 4: Cozy Stilt House',
      descVi: 'Bé chào cô giáo và mọi người thế nào bằng tiếng Anh?',
      targetEn: 'Hello',
      targetVi: 'Xin chào',
      icon: '🛖',
      options: ['Goodbye', 'Hello', 'Thank you'],
    },
    {
      id: 5,
      titleVi: 'Trạm 5: Vòng múa xòe đoàn kết',
      titleEn: 'Stop 5: Xoe Dance Circle',
      descVi: 'Cùng nắm tay nhau múa xòe thật vui vẻ!',
      targetEn: 'Dance',
      targetVi: 'Múa xòe',
      icon: '💃',
      options: ['Dance', 'Listen', 'Smile'],
    },
  ];
  const [adventureStepIndex, setAdventureStepIndex] = useState<number>(0);
  const [adventureFinished, setAdventureFinished] = useState<boolean>(false);
  const [adventureError, setAdventureError] = useState<boolean>(false);

  // Setup initial Listen Game
  useEffect(() => {
    initNewListenRound();
  }, []);

  const initNewListenRound = () => {
    const allWords = ENGLISH_CATEGORIES.flatMap(c => c.words);
    const target = allWords[Math.floor(Math.random() * allWords.length)];
    const distractors = allWords.filter(w => w.id !== target.id);
    const shuffledDistractors = [...distractors].sort(() => 0.5 - Math.random()).slice(0, 2);
    const choices = [target, ...shuffledDistractors].sort(() => 0.5 - Math.random());

    setListenTarget(target);
    setListenOptions(choices);
    setListenFeedback(null);

    // Speak prompt in sequential bilingual voice
    setTimeout(() => {
      soundManager.speakSegments([
        { lang: 'vi', text: 'Bé hãy tìm hình của từ:' },
        { lang: 'en', text: target.en },
      ]);
    }, 300);
  };

  const handleListenPick = (picked: EnglishWord) => {
    if (!listenTarget) return;
    if (picked.id === listenTarget.id) {
      soundManager.playCelebration();
      setListenFeedback('correct');
      setListenScore(prev => prev + 1);
      addStar(1);
      soundManager.speakSegments([
        { lang: 'vi', text: `Chính xác rồi! Bé cùng đọc theo cô nhé:` },
        { lang: 'en', text: picked.en },
        { lang: 'vi', text: `Có nghĩa là: ${picked.vi}. Bé giỏi lắm!` },
      ]);
      setTimeout(() => {
        setListenGameRound(prev => prev + 1);
        initNewListenRound();
      }, 2200);
    } else {
      soundManager.playEncouragingChime();
      setListenFeedback('wrong');
      soundManager.speakSegments([
        { lang: 'vi', text: 'Con thử lại nhé! Hãy lắng nghe lại từ:' },
        { lang: 'en', text: listenTarget.en },
      ]);
    }
  };

  // Color Magic handler
  const initNewColorRound = () => {
    const target = colorFlowers[Math.floor(Math.random() * colorFlowers.length)];
    setColorTarget(target);
    setColorFeedback(null);
    soundManager.speakSegments([
      { lang: 'vi', text: 'Bé hãy chọn bông hoa ban màu:' },
      { lang: 'en', text: target.colorEn },
    ]);
  };

  const handleColorPick = (flower: typeof colorFlowers[0]) => {
    if (flower.colorEn === colorTarget.colorEn) {
      soundManager.playCelebration();
      setColorFeedback(`Chính xác! ${flower.colorEn} là màu ${flower.colorVi}!`);
      addStar(1);
      soundManager.speakSegments([
        { lang: 'vi', text: `Tuyệt vời! Bé chọn đúng hoa ban màu ${flower.colorVi} rồi! Cùng đọc nhé:` },
        { lang: 'en', text: flower.colorEn },
      ]);
      setTimeout(() => {
        initNewColorRound();
      }, 2200);
    } else {
      soundManager.playEncouragingChime();
      setColorFeedback(`Đây là màu ${flower.colorVi}. Bé hãy tìm màu ${colorTarget.colorVi} (${colorTarget.colorEn}) nhé!`);
      soundManager.speakSegments([
        { lang: 'vi', text: `Bé chọn hoa màu ${flower.colorVi} rồi. Con hãy tìm màu:` },
        { lang: 'en', text: colorTarget.colorEn },
      ]);
    }
  };

  // Count handler
  const initNewCountRound = () => {
    const newNum = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const newObj = countObjects[Math.floor(Math.random() * countObjects.length)];
    setCountNumber(newNum);
    setCountObj(newObj);
    setCountFeedback(null);
    setCountedTaps(0);
    soundManager.speakSegments([
      { lang: 'vi', text: `Bé hãy đếm xem có bao nhiêu ${newObj.nameVi} nhé!` },
    ]);
  };

  const handleTapCountItem = (index: number) => {
    soundManager.playClick();
    const currentCount = index + 1;
    setCountedTaps(Math.max(countedTaps, currentCount));
    const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const word = numberWords[index] || String(currentCount);
    soundManager.speakEnglish(word);
  };

  const handlePickCountNumber = (num: number) => {
    if (num === countNumber) {
      soundManager.playCelebration();
      setCountFeedback(true);
      addStar(1);
      const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
      soundManager.speakSegments([
        { lang: 'vi', text: `Chính xác rồi! Có tất cả ${num} ${countObj.nameVi}! Trong tiếng Anh là:` },
        { lang: 'en', text: numberWords[num - 1] },
      ]);
      setTimeout(() => {
        initNewCountRound();
      }, 2400);
    } else {
      soundManager.playEncouragingChime();
      setCountFeedback(false);
      soundManager.speakSegments([
        { lang: 'vi', text: `Chưa đúng rồi! Bé hãy bấm vào từng hình để đếm lại nhé!` },
      ]);
    }
  };

  // Adventure handler
  const handleAdventurePick = (opt: string) => {
    const currentStop = adventureSteps[adventureStepIndex];
    if (opt === currentStop.targetEn) {
      soundManager.playCelebration();
      setAdventureError(false);
      addStar(2);
      soundManager.speakSegments([
        { lang: 'vi', text: `Tuyệt vời! Bé đã vượt qua ${currentStop.titleVi}! Cùng đọc lại từ:` },
        { lang: 'en', text: currentStop.targetEn },
      ]);

      if (adventureStepIndex < adventureSteps.length - 1) {
        setTimeout(() => {
          setAdventureStepIndex(prev => prev + 1);
        }, 1800);
      } else {
        setTimeout(() => {
          setAdventureFinished(true);
        }, 1800);
      }
    } else {
      soundManager.playEncouragingChime();
      setAdventureError(true);
      soundManager.speakSegments([
        { lang: 'vi', text: `Con thử lại nhé, từ tiếng Anh đúng là:` },
        { lang: 'en', text: currentStop.targetEn },
      ]);
    }
  };

  const currentCategoryData = ENGLISH_CATEGORIES.find(c => c.id === selectedCategory) || ENGLISH_CATEGORIES[0];

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-6 py-6 transition-all ${tvMode ? 'scale-[1.02]' : ''}`}>
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-6 border-4 border-amber-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl shadow-inner border-2 border-white/50">
              🇬🇧
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-300 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Song ngữ Việt - Anh
                </span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  Dành cho trẻ 5–6 tuổi
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black mt-1 tracking-tight">
                BÉ VUI TIẾNG ANH (ENGLISH CORNER)
              </h1>
              <p className="text-sm sm:text-base text-blue-100 font-semibold mt-0.5">
                Khám phá bản làng Điện Biên qua các từ vựng và câu chuyện song ngữ vui nhộn!
              </p>
            </div>
          </div>

          {/* Quick Audio Intro Greeting */}
          <button
            onClick={() => {
              soundManager.speakSegments([
                { lang: 'vi', text: 'Chào mừng các bé đến với góc Tiếng Anh bản làng Điện Biên!' },
                { lang: 'en', text: 'Welcome to the English Corner! Let us explore together!' },
              ]);
            }}
            className="flex items-center gap-2 bg-white text-blue-700 hover:bg-amber-100 font-black px-4 py-3 rounded-2xl shadow-lg transform active:scale-95 transition-all text-sm shrink-0"
          >
            <Volume2 className="w-5 h-5 text-pink-600 animate-pulse" />
            <span>Nghe bé Ban chào bạn</span>
          </button>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200">
        {[
          { id: 'vocab', label: '📚 Thư viện Từ vựng', desc: '6 chủ đề bản làng' },
          { id: 'game-listen', label: '🎧 Trò chơi: Nghe & Chọn', desc: 'Luyện tai tinh' },
          { id: 'game-color', label: '🎨 Sắc màu kỳ diệu', desc: 'Màu hoa ban' },
          { id: 'game-count', label: '🔢 Đếm cùng bé Ban', desc: 'Số đếm 1-10' },
          { id: 'game-adventure', label: '🗺️ Hành trình bản làng', desc: 'Khám phá 5 chặng' },
        ].map(mode => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => {
                soundManager.playClick();
                setCurrentMode(mode.id as EnglishMode);
              }}
              className={`flex-1 min-w-[150px] p-3 rounded-xl font-black text-xs sm:text-sm text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border border-slate-200'
              }`}
            >
              <div className="font-extrabold">{mode.label}</div>
              <div className={`text-[11px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {mode.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* MODE 1: VOCABULARY FLASHCARDS */}
      {currentMode === 'vocab' && (
        <div className="space-y-6">
          {/* Category Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {ENGLISH_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 shadow-md scale-105'
                      : 'bg-white border-slate-200 hover:border-amber-200'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-1">{cat.icon}</span>
                  <span className="font-black text-xs sm:text-sm text-slate-800">{cat.titleVi}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{cat.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Category Banner */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCategoryData.icon}</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-800">
                  Chủ đề: {currentCategoryData.titleVi} ({currentCategoryData.titleEn})
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{currentCategoryData.descriptionVi}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.speakSegments([
                    { lang: 'vi', text: `Chủ đề ${currentCategoryData.titleVi}. Hãy cùng nghe và phát âm theo cô nhé!` },
                    { lang: 'en', text: currentCategoryData.titleEn },
                  ]);
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all"
              >
                <Headphones className="w-4 h-4" />
                <span>Nghe giới thiệu</span>
              </button>
            </div>
          </div>

          {/* Word Flashcards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategoryData.words.map(word => {
              const isActive = activeWordId === word.id;
              return (
                <div
                  key={word.id}
                  className={`bg-white rounded-3xl p-5 border-3 transition-all hover:shadow-lg flex flex-col justify-between ${
                    isActive ? 'border-blue-500 ring-4 ring-blue-100 shadow-md' : 'border-slate-200'
                  }`}
                >
                  {/* Card Header & Icon */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-slate-100"
                        style={{ backgroundColor: `${word.color}25` }}
                      >
                        {word.icon}
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                          {word.phonetic}
                        </span>
                        <span className="text-[11px] font-bold text-amber-600 mt-1">5–6 tuổi</span>
                      </div>
                    </div>

                    {/* Word Titles */}
                    <div className="mb-3">
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        {word.en}
                      </h3>
                      <p className="text-base font-bold text-blue-600 mt-0.5">{word.vi}</p>
                    </div>

                    {/* Example sentence */}
                    <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60 mb-4">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-0.5">
                        <span>Câu mẫu:</span>
                        <button
                          onClick={() => {
                            soundManager.speakEnglish(word.exampleSentenceEn);
                          }}
                          className="text-[11px] text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe câu</span>
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 italic">"{word.exampleSentenceEn}"</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{word.exampleSentenceVi}</p>
                    </div>
                  </div>

                  {/* Audio Actions */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100">
                    {/* 1. English Pronunciation */}
                    <button
                      onClick={() => {
                        setActiveWordId(word.id);
                        soundManager.speakEnglish(word.en);
                      }}
                      className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 transition-all font-bold text-xs"
                      title="Phát âm tiếng Anh chuẩn bản ngữ"
                    >
                      <span className="text-base mb-0.5">🇬🇧</span>
                      <span className="text-[10px] leading-tight">Tiếng Anh</span>
                    </button>

                    {/* 2. Vietnamese Pronunciation */}
                    <button
                      onClick={() => {
                        setActiveWordId(word.id);
                        soundManager.speakVietnamese(word.vi);
                      }}
                      className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-pink-50 text-pink-800 hover:bg-pink-100 transition-all font-bold text-xs"
                      title="Phát âm tiếng Việt chuẩn"
                    >
                      <span className="text-base mb-0.5">🇻🇳</span>
                      <span className="text-[10px] leading-tight">Tiếng Việt</span>
                    </button>

                    {/* 3. Bilingual Mode */}
                    <button
                      onClick={() => {
                        setActiveWordId(word.id);
                        soundManager.speakSegments([
                          { lang: 'vi', text: `${word.vi}, tiếng Anh là:` },
                          { lang: 'en', text: word.en },
                        ]);
                      }}
                      className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition-all font-bold text-xs border border-amber-200"
                      title="Nghe giải nghĩa song ngữ"
                    >
                      <span className="text-base mb-0.5">✨</span>
                      <span className="text-[10px] leading-tight">Song ngữ</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: GAME 1 - LISTEN AND CHOOSE */}
      {currentMode === 'game-listen' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl max-w-3xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎧</span>
              <h2 className="text-lg sm:text-xl font-black text-slate-800">
                TRÒ CHƠI: NGHE VÀ CHỌN HÌNH ĐÚNG
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Vòng: {listenGameRound}</span>
              <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-black text-xs flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{listenScore} điểm</span>
              </span>
            </div>
          </div>

          <div className="py-2">
            <p className="text-sm sm:text-base font-bold text-slate-600 mb-3">
              Bé hãy bấm vào loa để nghe từ tiếng Anh, sau đó chọn đúng bức hình nhé!
            </p>

            {/* Big Audio Replay Button */}
            <button
              onClick={() => {
                if (listenTarget) {
                  soundManager.speakSegments([
                    { lang: 'vi', text: 'Bé hãy tìm hình của từ:' },
                    { lang: 'en', text: listenTarget.en },
                  ]);
                }
              }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-8 h-8 animate-bounce" />
              <span>Bé bấm vào đây để nghe lại từ</span>
            </button>
          </div>

          {/* Feedback banner */}
          {listenFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 font-black text-sm flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Chính xác! Bé đã nhận được 1 ngôi sao may mắn! 🌟</span>
            </div>
          )}
          {listenFeedback === 'wrong' && (
            <div className="p-3 bg-rose-100 border border-rose-300 rounded-2xl text-rose-900 font-bold text-sm">
              Chưa chính xác rồi. Bé hãy bấm vào loa nghe lại và chọn lại nhé!
            </div>
          )}

          {/* 3 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {listenOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleListenPick(opt)}
                className="bg-amber-50/60 hover:bg-amber-100/90 border-3 border-amber-200 hover:border-blue-400 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-sm group"
              >
                <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-5xl shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                  {opt.icon}
                </div>
                <div className="text-center">
                  <div className="text-lg font-black text-slate-800">{opt.vi}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{opt.en}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Skip / Next */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => initNewListenRound()}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <span>Đổi câu hỏi khác</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: GAME 2 - COLOR MAGIC */}
      {currentMode === 'game-color' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-pink-300 shadow-xl max-w-3xl mx-auto text-center space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-800 flex items-center justify-center gap-2">
              <span>🌸</span> SẮC MÀU HOA BAN KỲ DIỆU (COLOR MAGIC) <span>🌸</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Khám phá sắc màu hoa ban Điện Biên qua từ vựng tiếng Anh
            </p>
          </div>

          {/* Color Prompt */}
          <div className="bg-pink-50 p-4 rounded-3xl border-2 border-pink-200 inline-block px-8">
            <div className="text-xs font-bold text-pink-700 uppercase mb-1">Thử thách của bé:</div>
            <div className="text-2xl sm:text-3xl font-black text-pink-900 flex items-center justify-center gap-2">
              <span>Find the</span>
              <span className="underline decoration-pink-500">{colorTarget.colorEn}</span>
              <span>flower!</span>
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-1">
              (Bé hãy tìm bông hoa màu {colorTarget.colorVi})
            </div>
            <button
              onClick={() => {
                soundManager.speakSegments([
                  { lang: 'vi', text: 'Bé hãy chọn bông hoa màu:' },
                  { lang: 'en', text: colorTarget.colorEn },
                ]);
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe phát âm màu</span>
            </button>
          </div>

          {/* Feedback message */}
          {colorFeedback && (
            <div className="p-3 bg-amber-100 border border-amber-300 rounded-2xl text-amber-950 font-bold text-sm">
              {colorFeedback}
            </div>
          )}

          {/* Blooming Flowers on Branch */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            {colorFlowers.map(flower => (
              <button
                key={flower.colorEn}
                onClick={() => handleColorPick(flower)}
                className="p-5 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-2 shadow-sm"
                style={{
                  backgroundColor: `${flower.hex}30`,
                  borderColor: flower.border,
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md border-2 border-white"
                  style={{ backgroundColor: flower.hex }}
                >
                  🌸
                </div>
                <div className="text-center">
                  <div className="text-lg font-black text-slate-800">{flower.colorEn}</div>
                  <div className="text-xs font-bold text-slate-500">Màu {flower.colorVi}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 4: GAME 3 - COUNT WITH BAN */}
      {currentMode === 'game-count' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl max-w-3xl mx-auto text-center space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-800 flex items-center justify-center gap-2">
              <span>🔢</span> ĐẾM CÙNG BÉ BAN (COUNT WITH BAN) <span>🔢</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Bé hãy bấm vào từng hình để nghe đếm bằng tiếng Anh, sau đó chọn số lượng đúng nhé!
            </p>
          </div>

          {/* Visual Items to Count */}
          <div className="bg-gradient-to-b from-sky-50 to-amber-50 p-6 rounded-3xl border-2 border-amber-200">
            <div className="text-xs font-bold text-slate-500 mb-3">
              Bấm vào từng hình để đếm (Đã đếm: {countedTaps}/{countNumber})
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
              {Array.from({ length: countNumber }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTapCountItem(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md transition-all transform hover:scale-110 active:scale-95 border-2 ${
                    idx < countedTaps
                      ? 'bg-amber-300 border-amber-500 scale-105'
                      : 'bg-white border-slate-200'
                  }`}
                  title={`Bấm để đếm số ${idx + 1}`}
                >
                  <span>{countObj.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {countFeedback === true && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 font-black text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Đúng rồi! Bé nhận được 1 ngôi sao! 🌟</span>
            </div>
          )}
          {countFeedback === false && (
            <div className="p-3 bg-rose-100 border border-rose-300 rounded-2xl text-rose-900 font-bold text-sm">
              Chưa đúng rồi! Bé hãy bấm vào từng hình để đếm lại nhé!
            </div>
          )}

          {/* Number Choices: 1 through 10 */}
          <div>
            <div className="text-xs font-black text-slate-600 uppercase mb-2">
              Có tất cả bao nhiêu {countObj.nameVi}? (Chọn số bên dưới):
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n}
                  onClick={() => handlePickCountNumber(n)}
                  className="py-3 rounded-2xl font-black text-lg bg-white border-2 border-slate-300 hover:border-amber-400 hover:bg-amber-100 text-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: GAME 4 - ADVENTURE QUEST */}
      {currentMode === 'game-adventure' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="text-center border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
              <span>🗺️</span> HÀNH TRÌNH BẢN LÀNG SONG NGỮ (ENGLISH ADVENTURE) <span>🗺️</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Cùng bạn Ban Nhỏ vượt qua 5 trạm dừng chân lịch sử và phong cảnh Điện Biên
            </p>
          </div>

          {!adventureFinished ? (
            <div className="space-y-6">
              {/* Stepper Progress */}
              <div className="flex items-center justify-between gap-1">
                {adventureSteps.map((step, idx) => {
                  const isDone = idx < adventureStepIndex;
                  const isCurrent = idx === adventureStepIndex;
                  return (
                    <div key={step.id} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 border-indigo-700 text-white scale-110 shadow-md ring-4 ring-indigo-100'
                            : 'bg-slate-100 border-slate-300 text-slate-400'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-1 hidden sm:block">
                        Trạm {idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Current Stop Card */}
              {(() => {
                const currentStop = adventureSteps[adventureStepIndex];
                return (
                  <div className="bg-gradient-to-b from-indigo-50/70 to-blue-50/70 p-6 rounded-3xl border-2 border-indigo-200 text-center space-y-4">
                    <div className="text-5xl">{currentStop.icon}</div>
                    <div>
                      <h3 className="text-xl font-black text-indigo-950">{currentStop.titleVi}</h3>
                      <p className="text-xs font-bold text-indigo-700">{currentStop.titleEn}</p>
                    </div>

                    <div className="bg-white/80 p-4 rounded-2xl border border-indigo-100 max-w-md mx-auto">
                      <p className="text-sm font-bold text-slate-700">{currentStop.descVi}</p>
                      <button
                        onClick={() => {
                          soundManager.speakSegments([
                            { lang: 'vi', text: currentStop.descVi },
                            { lang: 'en', text: currentStop.targetEn },
                          ]);
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Nghe cô Ban hướng dẫn</span>
                      </button>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto">
                      {currentStop.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleAdventurePick(opt)}
                          className="p-4 rounded-2xl font-black text-sm bg-white border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm text-slate-800"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {adventureError && (
                      <p className="text-xs font-bold text-rose-600">
                        Chưa chính xác rồi, bé hãy chọn lại nhé!
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Adventure Finished Certificate */
            <div className="bg-gradient-to-b from-amber-50 to-pink-50 p-8 rounded-3xl border-4 border-amber-400 text-center space-y-5">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg border-4 border-white animate-bounce">
                🏆
              </div>
              <div>
                <span className="bg-pink-100 text-pink-700 font-black text-xs px-3 py-1 rounded-full uppercase">
                  Chứng chỉ hoàn thành xuất sắc
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  NHÀ THÁM HIỂM SONG NGỮ TÍ HON
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Chúc mừng bé đã vượt qua toàn bộ 5 trạm dừng chân khám phá Điện Biên và học được rất nhiều từ vựng tiếng Anh kỳ diệu!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setAdventureFinished(false);
                    setAdventureStepIndex(0);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all"
                >
                  Chơi lại từ đầu
                </button>
                <button
                  onClick={() => setCurrentMode('vocab')}
                  className="px-5 py-2.5 bg-white border-2 border-slate-300 hover:bg-slate-50 text-slate-700 font-black text-xs sm:text-sm rounded-xl transition-all"
                >
                  Xem thêm từ vựng
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
