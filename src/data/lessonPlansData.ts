/**
 * Detailed Kindergarten Lesson Plan Schema and Generators
 * Teacher: Lò Thị Phong - Trường Mầm non Thanh Yên, Điện Biên (2026-2027)
 * Compliant with MOET preschool standards and Thông tư 50/2020/TT-BGDĐT
 */

export interface ActivityStep {
  stepName: string;
  duration: string;
  teacherActivity: string;
  childActivity: string;
  integratedContent: string;
  guidingQuestions?: string[];
  observationCriteria?: string;
}

export interface EnglishVocabItem {
  word: string;
  meaning: string;
  phonetic: string;
  context: string;
}

export interface EnglishIntegrationDetails {
  enabled: boolean;
  wordCount: number;
  level: string; // 'Làm quen' | 'Củng cố'
  format: string; // 'Tranh ảnh' | 'Trò chơi' | 'Vận động' | 'Câu chuyện'
  timeEstimate: string; // '2-4 phút'
  vocabulary: EnglishVocabItem[];
  modelSentence: string;
  teacherPrompt: string;
  expectedChildResponse: string;
  practiceActivity: string;
  pronunciationTips: string;
}

export interface LessonPlanData {
  id: string;
  title: string;
  theme: string;
  subTheme: string;
  ageGroup: string;
  developmentalArea: string;
  activityType: string;
  durationMinutes: number;
  date: string;
  teacher: string;
  school: string;
  objectives: {
    knowledge: string[];
    skills: string[];
    attitude: string[];
    english?: string[];
  };
  materials: {
    teacher: string[];
    children: string[];
    space: string;
  };
  activitySteps: ActivityStep[];
  englishIntegration?: EnglishIntegrationDetails;
  assessment: string[];
  differentiation: {
    supportChildren: string;
    advancedChildren: string;
    offlineFallback: string;
  };
  followUpActivities: {
    cornerActivity: string;
    outdoorActivity: string;
    familyCoordination: string;
  };
  safetyNotes: string;
  teacherNotes: string;
  status: 'draft' | 'approved' | 'published';
  sourceType: 'ai_generated' | 'template';
}

// 1. Kế hoạch mẫu chuẩn mực theo Section VI: "Khám phá hoa ban quê em"
export const SAMPLE_LESSON_PLAN: LessonPlanData = {
  id: 'lesson-hoa-ban-dien-bien',
  title: 'Khám phá hoa ban quê em',
  theme: 'Quê hương – Đất nước – Bản làng Điện Biên',
  subTheme: 'Mùa hoa ban nở rộ trên sườn đồi bản em',
  ageGroup: 'Mẫu giáo lớn (5–6 tuổi)',
  developmentalArea: 'Phát triển nhận thức',
  activityType: 'Khám phá khoa học',
  durationMinutes: 25,
  date: new Date().toISOString().split('T')[0],
  teacher: 'Lò Thị Phong',
  school: 'Trường Mầm non Thanh Yên, huyện Điện Biên',
  objectives: {
    knowledge: [
      'Trẻ nhận biết được tên gọi, đặc điểm cấu tạo nổi bật của hoa ban (5 cánh hoa mềm mại, có hoa ban trắng và hoa ban phớt hồng).',
      'Trẻ biết hoa ban nở rộ vào mùa xuân (tháng 3) và là biểu tượng thiên nhiên tươi đẹp của núi rừng Điện Biên quê em.',
    ],
    skills: [
      'Rèn luyện kỹ năng quan sát, so sánh hình dáng, màu sắc và đếm số lượng cánh hoa trong phạm vi 10.',
      'Phát triển ngôn ngữ mạch lạc, trả lời câu hỏi tự tin và phối hợp hoạt động nhóm nhịp nhàng.',
    ],
    attitude: [
      'Giáo dục trẻ tình yêu thiên nhiên, niềm tự hào về cảnh sắc bản làng quê hương Điện Biên.',
      'Ý thức chăm sóc, bảo vệ cây hoa, không ngắt hoa bẻ cành bừa bãi.',
    ],
    english: [
      'Trẻ được làm quen và nhận biết tự nhiên 5 từ tiếng Anh: Flower, Pink, White, Tree, Green.',
      'Hứng thú lắng nghe câu hỏi giao tiếp ngắn: "What color is it?" và tự tin phản hồi từ chỉ màu sắc.',
    ],
  },
  materials: {
    teacher: [
      'Cành hoa ban thật (hoặc ảnh chụp sắc nét hoa ban trắng/hồng nở tại xã Thanh Yên).',
      'Mô hình Bạn Ban Nhỏ, máy tính/ti vi lớp học chiếu hình ảnh sinh động.',
      'Thẻ tranh từ vựng tiếng Anh song ngữ (Flower, Pink, White, Tree, Green).',
      'Nhạc bài hát "Hoa ban trắng" và âm thanh tiếng chim hót vui tươi.',
    ],
    children: [
      'Mỗi trẻ 1 khay đồ dùng: giấy xốp màu trắng, hồng, sáp màu, kéo an toàn đầu tròn, hồ dán.',
      'Bộ thẻ số chấm tròn từ 1 đến 10.',
    ],
    space: 'Lớp học rộng rãi, thoáng mát, góc thiên nhiên có chậu cây xanh sạch sẽ.',
  },
  activitySteps: [
    {
      stepName: 'Hoạt động 1: Ổn định và gây hứng thú',
      duration: '3 phút',
      teacherActivity: 'Cô cho cả lớp vận động nhẹ nhàng theo bài hát "Mùa hoa ban nở". Đưa nhân vật hoạt hình Bạn Ban Nhỏ xuất hiện chào các bé.',
      childActivity: 'Trẻ hào hứng múa hát theo cô, tươi cười vẫy tay chào Bạn Ban Nhỏ.',
      integratedContent: 'Âm nhạc mầm non, tạo không khí vui tươi, gắn kết tình cảm cô trò.',
      guidingQuestions: [
        'Các con vừa hát bài hát về loài hoa gì?',
        'Bạn Ban Nhỏ hôm nay mang điều bất ngờ gì đến với lớp Lá A1 chúng mình nhỉ?',
      ],
      observationCriteria: '100% trẻ vui vẻ, tập trung chú ý lên cô và Bạn Ban Nhỏ.',
    },
    {
      stepName: 'Hoạt động 2: Khám phá đặc điểm hoa ban & Lồng ghép Tiếng Anh',
      duration: '8 phút',
      teacherActivity: 'Cô đưa hoa ban cho trẻ chuyền tay sờ cánh hoa mềm, ngửi hương thơm dịu. Gợi mở trẻ đếm 5 cánh hoa. Lồng ghép 5 từ vựng tiếng Anh qua thẻ tranh trực quan và cử chỉ tay.',
      childActivity: 'Trẻ quan sát, sờ cánh hoa, đếm to 1, 2, 3, 4, 5 cánh. Chú ý lắng nghe cô phát âm tiếng Anh, thích thú chỉ vào tranh và nhắc lại từ "Flower", "Pink", "White".',
      integratedContent: 'Tiếng Anh mầm non (Thông tư 50/2020): Flower (Hoa), Pink (Hồng), White (Trắng), Tree (Cây), Green (Xanh lá). Câu hỏi: "What color is it?" – Trẻ nói "Pink!"',
      guidingQuestions: [
        'Bông hoa ban có mấy cánh hoa vậy các con?',
        'Cánh hoa ban có màu gì? What color is it?',
        'Mùi hương của hoa ban như thế nào?',
      ],
      observationCriteria: 'Trẻ đếm đúng 5 cánh hoa; tự tin nhắc lại từ tiếng Anh khi có hứng thú.',
    },
    {
      stepName: 'Hoạt động 3: Trò chơi củng cố "Đếm hoa ban vui nhộn"',
      duration: '5 phút',
      teacherActivity: 'Cô tổ chức trò chơi tương tác trên màn hình: Hoa ban bay nhẹ, khi cô hô hiệu lệnh "Kết chùm 5 bông!", trẻ nhanh chóng cầm thẻ số 5 hoặc kết nhóm 5 bạn. Đếm số đếm tiếng Anh: "One, two, three, four, five".',
      childActivity: 'Trẻ vận động nhanh nhẹn, tìm đúng nhóm và cùng nhau đếm số lượng hoa.',
      integratedContent: 'Làm quen với toán (đếm trong phạm vi 10) & vận động nhanh nhẹn.',
      guidingQuestions: [
        'Nhóm của con đã có đủ 5 bạn hoa ban chưa?',
        'Chúng mình cùng đếm bằng tiếng Anh nào: One, two, three...!',
      ],
      observationCriteria: 'Trẻ nhận biết nhanh thẻ số, hợp tác vui vẻ cùng bạn.',
    },
    {
      stepName: 'Hoạt động 4: Trải nghiệm sáng tạo làm hoa ban',
      duration: '6 phút',
      teacherActivity: 'Cô hướng dẫn trẻ về bàn thực hành dùng giấy xốp mềm miết cong cánh hoa, dán 5 cánh hoa xung quanh nhụy vàng đính lên cành cây khô.',
      childActivity: 'Trẻ khéo léo dùng ngón tay gấp, dán cánh hoa, tự do lựa chọn màu hoa trắng hoặc phớt hồng.',
      integratedContent: 'Hoạt động tạo hình & STEAM tái chế cành cây khô sân trường.',
      guidingQuestions: [
        'Con chọn làm hoa ban màu hồng hay màu trắng?',
        'Con dán mấy cánh hoa để bông hoa nở tròn xòe đẹp?',
      ],
      observationCriteria: 'Rèn luyện vận động tinh của ngón tay, trẻ hoàn thành sản phẩm.',
    },
    {
      stepName: 'Hoạt động 5: Nhận xét, tuyên dương và kết thúc',
      duration: '3 phút',
      teacherActivity: 'Cô cho trẻ mang cành hoa ban lên cắm vào góc trưng bày mùa xuân. Khen ngợi nỗ lực của từng nhóm trẻ, nhắc lại từ tiếng Anh thân thương.',
      childActivity: 'Trẻ ngắm nhìn sản phẩm chung của lớp, khoanh tay chào tạm biệt Bạn Ban Nhỏ.',
      integratedContent: 'Giáo dục cảm xúc tích cực, lòng tự hào về sản phẩm của bản thân và bạn bè.',
      guidingQuestions: [
        'Hôm nay các con thấy lớp mình có cành hoa ban đẹp không?',
        'Về nhà con sẽ kể cho bố mẹ nghe về điều kỳ diệu gì của hoa ban?',
      ],
      observationCriteria: 'Trẻ vui tươi, tự hào về bông hoa tự tay làm ra.',
    },
  ],
  englishIntegration: {
    enabled: true,
    wordCount: 5,
    level: 'Làm quen tự nhiên',
    format: 'Tranh ảnh trực quan & Trò chơi nghe chỉ tranh',
    timeEstimate: '3-4 phút (lồng ghép nhịp nhàng trong hoạt động 2 và 3)',
    vocabulary: [
      { word: 'Flower', meaning: 'Bông hoa', phonetic: '/ˈflaʊ.ər/', context: 'Chỉ bông hoa ban' },
      { word: 'Pink', meaning: 'Màu hồng', phonetic: '/pɪŋk/', context: 'Màu cánh hoa ban hồng' },
      { word: 'White', meaning: 'Màu trắng', phonetic: '/waɪt/', context: 'Màu cánh hoa ban trắng' },
      { word: 'Tree', meaning: 'Cây', phonetic: '/triː/', context: 'Cây hoa ban trong rừng' },
      { word: 'Green', meaning: 'Màu xanh lá', phonetic: '/ɡriːn/', context: 'Màu của lá cây' },
    ],
    modelSentence: 'What color is it? - It is pink!',
    teacherPrompt: 'Cô cầm bông hoa màu hồng lên hỏi: "Look! What color is it?"',
    expectedChildResponse: 'Trẻ reo lên: "Pink!" hoặc chỉ vào tranh màu hồng.',
    practiceActivity: 'Trò chơi "Listen and Touch": Cô phát âm từ tiếng Anh, trẻ chạm nhanh vào bức tranh tương ứng.',
    pronunciationTips: 'Phát âm to, rõ, âm đuôi nhẹ nhàng, không ép trẻ phát âm tuyệt đối chuẩn.',
  },
  assessment: [
    'Trẻ hứng thú tham gia các hoạt động từ đầu đến cuối.',
    'Trẻ nhận biết và nói được hoa ban có 5 cánh, màu trắng hoặc hồng.',
    'Trẻ đếm đúng số lượng trong phạm vi 5–10.',
    'Trẻ có phản xạ thích thú khi nghe từ tiếng Anh (Flower, Pink, White).',
  ],
  differentiation: {
    supportChildren: 'Với trẻ còn nhút nhát, cô cho trẻ bắt cặp cùng bạn tự tin hơn và dùng thẻ trực quan có số chấm tròn gợi ý.',
    advancedChildren: 'Khuyến khích trẻ đếm số lượng hoa nhiều hơn (6-10 bông) và nhắc lại câu mẫu tiếng Anh.',
    offlineFallback: 'Sử dụng hoàn toàn cành hoa ban thật, tranh vẽ tay và thẻ số bìa các-tông.',
  },
  followUpActivities: {
    cornerActivity: 'Góc nghệ thuật: Tô màu tranh vườn hoa ban Điện Biên; Góc xây dựng: Xây hàng rào quanh cây hoa ban.',
    outdoorActivity: 'Quan sát cây xanh và hoa ban nở ngoài sân Trường Mầm non Thanh Yên.',
    familyCoordination: 'Phụ huynh cùng bé đố vui về các loài hoa nở mùa xuân khi đi trên đường làng.',
  },
  safetyNotes: 'Kéo cắt giấy có đầu tròn, hồ dán an toàn không độc hại, nhắc trẻ rửa sạch tay sau khi dán hoa.',
  teacherNotes: 'Lớp học diễn ra sôi nổi, trẻ rất thích thú khi nhân vật Bạn Ban Nhỏ xuất hiện.',
  status: 'approved',
  sourceType: 'template',
};

// 2. Trình tạo Kế hoạch Bài dạy Động cơ bản (Fallback thông minh không bị lỗi "Hoa ban" cố định)
export function generateDynamicLessonPlan(params: {
  topic: string;
  subTheme?: string;
  ageGroup?: string;
  domain?: string;
  activityType?: string;
  durationMinutes?: number;
  teacher?: string;
  school?: string;
  enableEnglish?: boolean;
}): LessonPlanData {
  const topic = params.topic.trim() || 'Cây lúa quê em';
  const duration = params.durationMinutes || 25;
  const domain = params.domain || 'Phát triển nhận thức';
  const actType = params.activityType || 'Khám phá khoa học';
  const enableEnglish = params.enableEnglish ?? false;

  // Tính toán thời lượng từng bước khớp 100% tổng thời gian
  // Ví dụ 25 phút: 3 + 8 + 5 + 6 + 3 = 25
  // Ví dụ 30 phút: 4 + 10 + 6 + 7 + 3 = 30
  // Ví dụ 20 phút: 2 + 7 + 4 + 5 + 2 = 20
  const step1Min = Math.max(2, Math.round(duration * 0.12));
  const step2Min = Math.round(duration * 0.32);
  const step3Min = Math.round(duration * 0.20);
  const step5Min = Math.max(2, Math.round(duration * 0.12));
  const step4Min = duration - (step1Min + step2Min + step3Min + step5Min);

  // Từ vựng tiếng Anh theo chủ đề linh hoạt
  let vocabList: EnglishVocabItem[] = [
    { word: 'Plant', meaning: 'Cây cối', phonetic: '/plænt/', context: `Cây trong chủ đề ${topic}` },
    { word: 'Green', meaning: 'Màu xanh lá', phonetic: '/ɡriːn/', context: 'Màu sắc thiên nhiên' },
    { word: 'Water', meaning: 'Nước', phonetic: '/ˈwɔː.tər/', context: 'Tưới nước cho cây' },
    { word: 'Sun', meaning: 'Mặt trời', phonetic: '/sʌn/', context: 'Ánh nắng mặt trời' },
    { word: 'Happy', meaning: 'Vui vẻ', phonetic: '/ˈhæp.i/', context: 'Bé vui học bài' },
  ];

  if (topic.toLowerCase().includes('lúa') || topic.toLowerCase().includes('gạo') || topic.toLowerCase().includes('mường thanh')) {
    vocabList = [
      { word: 'Rice', meaning: 'Cây lúa / Hạt gạo', phonetic: '/raɪs/', context: 'Hạt gạo Điện Biên dẻo thơm' },
      { word: 'Green', meaning: 'Màu xanh', phonetic: '/ɡriːn/', context: 'Cánh đồng lúa non' },
      { word: 'Yellow', meaning: 'Màu vàng', phonetic: '/ˈjel.oʊ/', context: 'Mùa lúa chín vàng' },
      { word: 'Water', meaning: 'Nước', phonetic: '/ˈwɔː.tər/', context: 'Nước suối tưới ruộng' },
      { word: 'Farmer', meaning: 'Bác nông dân', phonetic: '/ˈfɑːr.mɚ/', context: 'Bác nông dân cấy lúa' },
    ];
  } else if (topic.toLowerCase().includes('nhà') || topic.toLowerCase().includes('bản')) {
    vocabList = [
      { word: 'House', meaning: 'Ngôi nhà', phonetic: '/haʊs/', context: 'Mái nhà sàn ấm cúng' },
      { word: 'Mountain', meaning: 'Ngọn núi', phonetic: '/ˈmaʊn.tən/', context: 'Dãy núi Tây Bắc' },
      { word: 'Tree', meaning: 'Cây xanh', phonetic: '/triː/', context: 'Cây xanh quanh bản' },
      { word: 'Family', meaning: 'Gia đình', phonetic: '/ˈfæm.əl.i/', context: 'Gia đình sum vầy bên bếp lửa' },
      { word: 'Door', meaning: 'Cửa ra vào', phonetic: '/dɔːr/', context: 'Cửa nhà sàn đón gió' },
    ];
  } else if (topic.toLowerCase().includes('suối') || topic.toLowerCase().includes('nước') || topic.toLowerCase().includes('môi trường')) {
    vocabList = [
      { word: 'River', meaning: 'Dòng suối / Sông', phonetic: '/ˈrɪv.ɚ/', context: 'Dòng suối Nậm Rốm' },
      { word: 'Water', meaning: 'Nước mát', phonetic: '/ˈwɔː.tər/', context: 'Nguồn nước sạch bản làng' },
      { word: 'Clean', meaning: 'Sạch sẽ', phonetic: '/kliːn/', context: 'Giữ môi trường sạch đẹp' },
      { word: 'Fish', meaning: 'Con cá', phonetic: '/fɪʃ/', context: 'Đàn cá bơi dưới suối' },
      { word: 'Tree', meaning: 'Cây xanh', phonetic: '/triː/', context: 'Trồng thêm cây xanh' },
    ];
  }

  return {
    id: `lesson-${Date.now()}`,
    title: `Hoạt động: "${topic}"`,
    theme: 'Bản làng Điện Biên tươi đẹp',
    subTheme: params.subTheme || `Khám phá và trải nghiệm ${topic}`,
    ageGroup: params.ageGroup || 'Mẫu giáo lớn (5–6 tuổi)',
    developmentalArea: domain,
    activityType: actType,
    durationMinutes: duration,
    date: new Date().toISOString().split('T')[0],
    teacher: params.teacher || 'Lò Thị Phong',
    school: params.school || 'Trường Mầm non Thanh Yên, huyện Điện Biên',
    objectives: {
      knowledge: [
        `Trẻ biết tên gọi, đặc điểm nổi bật và ý nghĩa của "${topic}" đối với đời sống quê hương Điện Biên.`,
        `Trẻ nhận biết mối liên hệ gần gũi giữa thiên nhiên, con người và bản sắc bản làng thân thương.`,
      ],
      skills: [
        `Rèn luyện kỹ năng quan sát tinh tế, so sánh, phân loại và diễn đạt ý kiến tự tin.`,
        `Phát triển kỹ năng hợp tác nhóm, chia sẻ đồ dùng và thực hành khéo léo của đôi bàn tay.`,
      ],
      attitude: [
        `Trẻ vui vẻ, hào hứng tham gia các hoạt động cùng cô giáo và các bạn trong lớp.`,
        `Hình thành tình cảm yêu mến, trân trọng và giữ gìn nét đẹp văn hóa, thiên nhiên bản làng.`,
      ],
      english: enableEnglish ? [
        `Trẻ nhận biết tự nhiên các từ tiếng Anh quen thuộc: ${vocabList.map(v => v.word).join(', ')}.`,
        `Hứng thú tham gia trò chơi nghe và chỉ tranh song ngữ cùng Bạn Ban Nhỏ.`,
      ] : undefined,
    },
    materials: {
      teacher: [
        `Tranh ảnh trực quan, mẫu vật thật hoặc video sinh động về "${topic}".`,
        'Mô hình Bạn Ban Nhỏ dẫn dắt câu chuyện.',
        'Nhạc không lời nhẹ nhàng phù hợp hoạt động mầm non.',
        enableEnglish ? 'Bộ thẻ tranh từ vựng tiếng Anh song ngữ rõ nét.' : 'Thẻ hình ảnh minh họa.',
      ],
      children: [
        'Vật liệu thực hành an toàn: giấy màu, sáp vẽ, đất nặn hoặc nguyên vật liệu thiên nhiên tái chế.',
        'Khay đựng đồ dùng chia đều cho các nhóm.',
      ],
      space: 'Lớp học sạch sẽ, bố trí nhóm hình chữ U hoặc vòng tròn ấm cúng.',
    },
    activitySteps: [
      {
        stepName: 'Hoạt động 1: Ổn định và gây hứng thú',
        duration: `${step1Min} phút`,
        teacherActivity: `Cô cùng trẻ đọc bài thơ/hát bài hát vui nhộn hướng vào chủ đề "${topic}". Đưa Bạn Ban Nhỏ xuất hiện khơi gợi tò mò của trẻ.`,
        childActivity: 'Trẻ cùng cô vận động, chăm chú lắng nghe và hào hứng trò chuyện cùng Bạn Ban Nhỏ.',
        integratedContent: 'Âm nhạc hoặc thơ ca mầm non tạo tâm lý phấn khởi.',
        guidingQuestions: [
          `Các con có biết hôm nay Bạn Ban Nhỏ mang đến điều bí mật gì về "${topic}" không?`,
        ],
        observationCriteria: 'Trẻ tập trung chú ý, sẵn sàng bước vào bài học.',
      },
      {
        stepName: `Hoạt động 2: Khám phá kiến thức trọng tâm "${topic}"`,
        duration: `${step2Min} phút`,
        teacherActivity: `Cô đưa đồ dùng trực quan về "${topic}" cho trẻ quan sát, sờ, ngửi và trò chuyện. Gợi mở trẻ nhận xét đặc điểm cấu tạo, màu sắc, lợi ích. ${enableEnglish ? 'Lồng ghép từ vựng tiếng Anh qua hình ảnh sinh động.' : ''}`,
        childActivity: `Trẻ hào hứng tương tác, thảo luận cùng bạn và trả lời câu hỏi của cô. ${enableEnglish ? 'Lắng nghe và thích thú nhắc lại từ tiếng Anh theo cô.' : ''}`,
        integratedContent: enableEnglish ? `Tiếng Anh mầm non: ${vocabList.slice(0, 3).map(v => `${v.word} (${v.meaning})`).join(', ')}` : 'Giáo dục tình yêu quê hương bản làng.',
        guidingQuestions: [
          `Con thấy "${topic}" có những đặc điểm gì đặc biệt?`,
          'Con hãy kể cho cô và các bạn nghe cảm nhận của con nhé!',
        ],
        observationCriteria: 'Trẻ tích cực phát biểu, nhận biết được các đặc điểm cơ bản.',
      },
      {
        stepName: 'Hoạt động 3: Trò chơi củng cố kiến thức',
        duration: `${step3Min} phút`,
        teacherActivity: `Cô phổ biến luật chơi và hướng dẫn trò chơi liên quan đến "${topic}". Khích lệ tất cả các bé cùng tham gia sôi nổi.`,
        childActivity: 'Trẻ nhanh nhẹn tham gia chơi theo nhóm, cổ vũ bạn bè nhiệt tình.',
        integratedContent: 'Phát triển vận động nhanh nhẹn và tư duy phản xạ.',
        guidingQuestions: ['Đội nào sẽ tìm được đáp án nhanh và chính xác nhất nào?'],
        observationCriteria: 'Trẻ hiểu luật chơi, tuân thủ lượt chơi và biết chia sẻ cùng bạn.',
      },
      {
        stepName: 'Hoạt động 4: Trải nghiệm thực hành sáng tạo',
        duration: `${step4Min} phút`,
        teacherActivity: `Cô hướng dẫn trẻ về bàn thực hành tạo hình hoặc làm thí nghiệm nhỏ gắn liền với "${topic}". Cô đi từng nhóm động viên, hỗ trợ trẻ còn lúng túng.`,
        childActivity: 'Trẻ say sưa dùng đôi tay khéo léo để cắt, dán, nặn hoặc xếp đặt tạo thành sản phẩm riêng của mình.',
        integratedContent: 'Phát triển thẩm mỹ, tư duy STEAM và tính kiên trì.',
        guidingQuestions: ['Con đang làm chi tiết gì đấy? Sản phẩm của con thật sáng tạo!'],
        observationCriteria: 'Trẻ say sưa hoạt động, hoàn thành sản phẩm theo khả năng của mình.',
      },
      {
        stepName: 'Hoạt động 5: Nhận xét, tuyên dương và kết thúc',
        duration: `${step5Min} phút`,
        teacherActivity: 'Cô cho trẻ trưng bày sản phẩm lên kệ, mời 2-3 trẻ chia sẻ cảm nghĩ. Cô nhận xét khích lệ tinh thần cả lớp.',
        childActivity: 'Trẻ vui vẻ ngắm nhìn thành quả của mình và các bạn, thu dọn đồ dùng gọn gàng.',
        integratedContent: 'Giáo dục nếp sống ngăn nắp, biết trân trọng công sức của mình và bạn bè.',
        guidingQuestions: ['Hôm nay con thích nhất điều gì trong giờ học khám phá cùng cô?'],
        observationCriteria: '100% trẻ vui vẻ, có ý thức cất dọn đồ chơi cùng cô.',
      },
    ],
    englishIntegration: enableEnglish ? {
      enabled: true,
      wordCount: vocabList.length,
      level: 'Làm quen tự nhiên',
      format: 'Tranh ảnh trực quan & Trò chơi nghe chỉ tranh',
      timeEstimate: '2-4 phút lồng ghép nhịp nhàng',
      vocabulary: vocabList,
      modelSentence: `I love ${vocabList[0].word}!`,
      teacherPrompt: `Cô chỉ vào tranh và nói: "Look! This is a ${vocabList[0].word}!"`,
      expectedChildResponse: `Trẻ vui vẻ nhắc lại: "${vocabList[0].word}!"`,
      practiceActivity: 'Trò chơi "Listen and Point": Trẻ lắng nghe âm thanh và chỉ tay vào hình tương ứng.',
      pronunciationTips: 'Cô phát âm rõ ràng, tốc độ vừa phải, kết hợp ánh mắt và nụ cười động viên trẻ.',
    } : undefined,
    assessment: [
      'Trẻ hứng thú tham gia các bước hoạt động của bài dạy.',
      `Trẻ nhận biết và mô tả được đặc điểm nổi bật của "${topic}".`,
      'Trẻ hoàn thành sản phẩm trải nghiệm thực hành.',
      enableEnglish ? 'Trẻ vui vẻ có phản xạ khi nghe từ tiếng Anh.' : 'Trẻ giao tiếp tự tin cùng cô và bạn.',
    ],
    differentiation: {
      supportChildren: 'Cô ngồi cạnh hướng dẫn tỉ mỉ từng bước, dùng câu hỏi ngắn và khen ngợi sự cố gắng nhỏ nhất của trẻ.',
      advancedChildren: 'Gợi mở trẻ sáng tạo thêm các chi tiết mới và chia sẻ câu chuyện của mình trước cả lớp.',
      offlineFallback: 'Sử dụng triệt để vật liệu tự nhiên sẵn có trong khuôn viên trường và đồ dùng tái chế.',
    },
    followUpActivities: {
      cornerActivity: `Góc phân vai: Đóng vai gia đình hoặc bác nông dân chăm sóc ${topic}; Góc nghệ thuật: Vẽ tiếp tranh.`,
      outdoorActivity: 'Quan sát thiên nhiên xung quanh khuôn viên Trường Mầm non Thanh Yên.',
      familyCoordination: 'Phụ huynh hỏi chuyện bé về bài học ở trường để tăng cường gắn kết gia đình.',
    },
    safetyNotes: 'Đồ dùng sạch sẽ, không góc nhọn nguy hiểm, đảm bảo an toàn tuyệt đối cho trẻ.',
    teacherNotes: 'Kế hoạch đã được kiểm duyệt sư phạm mầm non Điện Biên.',
    status: 'approved',
    sourceType: 'template',
  };
}
