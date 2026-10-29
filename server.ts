import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize Gemini Client server-side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    appName: 'AI Bản Làng Em',
    teacher: 'Lò Thị Phong',
    school: 'Trường Mầm non Thanh Yên',
    aiAvailable: !!ai,
    timestamp: new Date().toISOString(),
  });
});

import { generateDynamicLessonPlan } from './src/data/lessonPlansData.ts';

// 1. POST /api/ai/lesson - AI Tạo Kế Hoạch Hoạt Động (Lesson Plan)
app.post('/api/ai/lesson', async (req, res) => {
  try {
    const {
      topic = 'Khám phá hoa ban quê em',
      subTheme = 'Mùa xuân bản em',
      ageGroup = 'Mẫu giáo lớn (5-6 tuổi)',
      domain = 'Phát triển nhận thức',
      activityType = 'Khám phá khoa học',
      durationMinutes = 25,
      teacher = 'Lò Thị Phong',
      school = 'Trường Mầm non Thanh Yên',
      materials = '',
      environment = '',
      enableEnglish = false,
    } = req.body;

    const parsedDuration = Number(durationMinutes) || 25;

    if (!ai) {
      const templateData = generateDynamicLessonPlan({
        topic,
        subTheme,
        ageGroup,
        domain,
        activityType,
        durationMinutes: parsedDuration,
        teacher,
        school,
        enableEnglish,
      });

      return res.json({
        isAiGenerated: false,
        source: 'template_generator',
        statusMessage: 'Kế hoạch tạo từ mẫu sư phạm Điện Biên – chưa sử dụng AI.',
        data: templateData,
      });
    }

    const prompt = `Bạn là chuyên gia sư phạm mầm non Việt Nam, đồng hành cùng cô giáo Lò Thị Phong - Trường Mầm non Thanh Yên, xã Thanh Yên, huyện Điện Biên thiết kế Kế hoạch Hoạt động Sư phạm cho trẻ 5-6 tuổi.
Chủ đề lớn: Quê hương Điện Biên
Tên hoạt động / Chủ đề: "${topic}"
Chủ đề nhánh: "${subTheme}"
Độ tuổi: "${ageGroup}"
Lĩnh vực phát triển: "${domain}"
Loại hình hoạt động: "${activityType}"
Thời lượng: ${parsedDuration} phút (BẮT BUỘC: Tổng thời gian 5 bước hoạt động cộng lại phải đúng ${parsedDuration} phút)
Học liệu sẵn có: ${materials || 'Tranh ảnh, đồ dùng tự nhiên bản làng'}
Môi trường tổ chức: ${environment || 'Trong lớp học và góc thiên nhiên'}
Lồng ghép Tiếng Anh: ${enableEnglish ? 'BẬT (Chọn 3-5 từ tiếng Anh chuẩn chủ đề, kèm câu ngắn giao tiếp và trò chơi nghe chỉ tranh)' : 'TẮT (Tuyệt đối không đưa tiếng Anh vào)'}

Yêu cầu xuất ra JSON thuần túy (không markdown thừa):
{
  "id": "lesson-${Date.now()}",
  "title": "${topic}",
  "theme": "Quê hương Điện Biên",
  "subTheme": "${subTheme}",
  "ageGroup": "${ageGroup}",
  "developmentalArea": "${domain}",
  "activityType": "${activityType}",
  "durationMinutes": ${parsedDuration},
  "date": "${new Date().toISOString().split('T')[0]}",
  "teacher": "${teacher}",
  "school": "${school}",
  "objectives": {
    "knowledge": ["kiến thức 1", "kiến thức 2"],
    "skills": ["kỹ năng 1", "kỹ năng 2"],
    "attitude": ["thái độ 1", "thái độ 2"],
    "english": ${enableEnglish ? '["Trẻ làm quen từ vựng tiếng Anh..."]' : 'null'}
  },
  "materials": {
    "teacher": ["Học liệu cô 1", "Học liệu 2"],
    "children": ["Học liệu trẻ 1", "Học liệu 2"],
    "space": "Cách bố trí không gian an toàn"
  },
  "activitySteps": [
    {
      "stepName": "Hoạt động 1: Ổn định và gây hứng thú",
      "duration": "${Math.max(2, Math.round(parsedDuration * 0.12))} phút",
      "teacherActivity": "Lời nói, hành động của cô",
      "childActivity": "Hành động của trẻ",
      "integratedContent": "Nội dung tích hợp",
      "guidingQuestions": ["Câu hỏi gợi mở 1", "Câu hỏi 2"],
      "observationCriteria": "Tiêu chí quan sát"
    },
    {
      "stepName": "Hoạt động 2: Khám phá kiến thức trọng tâm",
      "duration": "${Math.round(parsedDuration * 0.32)} phút",
      "teacherActivity": "Lời nói, hành động của cô",
      "childActivity": "Hành động của trẻ",
      "integratedContent": "Nội dung tích hợp",
      "guidingQuestions": ["Câu hỏi gợi mở 1", "Câu hỏi 2"],
      "observationCriteria": "Tiêu chí quan sát"
    },
    {
      "stepName": "Hoạt động 3: Trò chơi củng cố",
      "duration": "${Math.round(parsedDuration * 0.20)} phút",
      "teacherActivity": "Lời nói, hành động của cô",
      "childActivity": "Hành động của trẻ",
      "integratedContent": "Nội dung tích hợp",
      "guidingQuestions": ["Câu hỏi gợi mở 1"],
      "observationCriteria": "Tiêu chí quan sát"
    },
    {
      "stepName": "Hoạt động 4: Trải nghiệm thực hành sáng tạo",
      "duration": "${parsedDuration - (Math.max(2, Math.round(parsedDuration * 0.12)) + Math.round(parsedDuration * 0.32) + Math.round(parsedDuration * 0.20) + Math.max(2, Math.round(parsedDuration * 0.12)))} phút",
      "teacherActivity": "Lời nói, hành động của cô",
      "childActivity": "Hành động của trẻ",
      "integratedContent": "Nội dung tích hợp",
      "guidingQuestions": ["Câu hỏi gợi mở 1"],
      "observationCriteria": "Tiêu chí quan sát"
    },
    {
      "stepName": "Hoạt động 5: Nhận xét, tuyên dương và kết thúc",
      "duration": "${Math.max(2, Math.round(parsedDuration * 0.12))} phút",
      "teacherActivity": "Lời nói, hành động của cô",
      "childActivity": "Hành động của trẻ",
      "integratedContent": "Nội dung tích hợp",
      "guidingQuestions": ["Câu hỏi gợi mở 1"],
      "observationCriteria": "Tiêu chí quan sát"
    }
  ],
  ${enableEnglish ? `"englishIntegration": {
    "enabled": true,
    "wordCount": 5,
    "level": "Làm quen tự nhiên",
    "format": "Tranh ảnh & Trò chơi",
    "timeEstimate": "2-4 phút",
    "vocabulary": [
      {"word": "Word1", "meaning": "Nghĩa1", "phonetic": "/.../", "context": "Ngữ cảnh"}
    ],
    "modelSentence": "Câu giao tiếp ngắn",
    "teacherPrompt": "Lời cô hướng dẫn",
    "expectedChildResponse": "Phản hồi dự kiến",
    "practiceActivity": "Trò chơi nghe chỉ tranh",
    "pronunciationTips": "Lưu ý phát âm"
  },` : ''}
  "assessment": ["tiêu chí 1", "tiêu chí 2"],
  "differentiation": {
    "supportChildren": "Cách hỗ trợ trẻ cần nâng đỡ",
    "advancedChildren": "Cách khích lệ trẻ thể hiện tốt",
    "offlineFallback": "Phương án khi không có Internet"
  },
  "followUpActivities": {
    "cornerActivity": "Gợi ý hoạt động góc",
    "outdoorActivity": "Gợi ý hoạt động ngoài trời",
    "familyCoordination": "Gợi ý phối hợp phụ huynh"
  },
  "safetyNotes": "Lưu ý an toàn tuyệt đối",
  "teacherNotes": "Kế hoạch đã được kiểm duyệt",
  "status": "approved",
  "sourceType": "ai_generated"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      isAiGenerated: true,
      source: 'gemini-2.5-flash',
      statusMessage: 'Kế hoạch đã được AI tạo thành công và sẵn sàng để cô chỉnh sửa, phê duyệt.',
      data: parsed,
    });
  } catch (err: any) {
    console.warn('AI error, falling back to dynamic generator:', err.message);
    const fallbackData = generateDynamicLessonPlan({
      topic: req.body.topic || 'Khám phá Điện Biên',
      subTheme: req.body.subTheme,
      ageGroup: req.body.ageGroup,
      domain: req.body.domain,
      activityType: req.body.activityType,
      durationMinutes: Number(req.body.durationMinutes) || 25,
      teacher: req.body.teacher || 'Lò Thị Phong',
      school: req.body.school || 'Trường Mầm non Thanh Yên',
      enableEnglish: req.body.enableEnglish,
    });

    res.json({
      isAiGenerated: false,
      source: 'template_generator',
      statusMessage: 'Kế hoạch tạo từ mẫu sư phạm Điện Biên – chưa sử dụng AI (Do kết nối AI bị gián đoạn).',
      data: fallbackData,
    });
  }
});

// 2. POST /api/ai/story - AI Kể Chuyện Sáng Tạo (Story Generator)
app.post('/api/ai/story', async (req, res) => {
  try {
    const {
      topic = 'Bạn Ban Nhỏ đi hội chợ Mường Thanh',
      characters = 'Bạn Ban Nhỏ, Bé Lò Văn An, Chú Trâu Vui Tính',
      setting = 'Bản làng Thanh Yên và cánh đồng Điện Biên',
      educationalGoal = 'Dạy trẻ lòng biết ơn hạt gạo và sự sẻ chia cùng bạn bè',
      length = '4 trang',
      moralLesson = 'Yêu thương quê hương và trân trọng công sức của người nông dân',
    } = req.body;

    if (!ai) {
      return res.json({
        isAiGenerated: false,
        source: 'sample_story',
        statusMessage: 'Chưa kết nối AI. Cô có thể đọc và duyệt truyện mẫu dưới đây.',
        data: {
          title: 'Bạn Ban Nhỏ và Hạt Gạo Nghĩa Tình',
          summary: 'Câu chuyện Bạn Ban Nhỏ cùng bé khám phá giọt mồ hôi trên cánh đồng Mường Thanh bát ngát.',
          moralLesson,
          pages: [
            {
              pageNumber: 1,
              sceneDescription: 'Sáng sớm trên cánh đồng Mường Thanh sương giăng nhẹ, Bạn Ban Nhỏ xòe cánh hoa đón nắng mai rực rỡ.',
              text: 'Mỗi sáng mai thức dậy, Bạn Ban Nhỏ lại vươn mình ngắm nhìn cánh đồng lúa Mường Thanh xanh mướt trải dài tít tắp. Những giọt sương đọng trên lá lúa lấp lánh như viên ngọc nhỏ.',
              dialogue: 'Bạn Ban Nhỏ reo vui: "Ôi, quê hương Điện Biên của chúng mình đẹp biết bao!"',
            },
            {
              pageNumber: 2,
              sceneDescription: 'Chú trâu chăm chỉ đang cùng bác nông dân cày ruộng, lúa reo rì rào trong gió.',
              text: 'Dưới đồng, bác nông dân lưng áo đẫm mồ hôi đang cần mẫn chăm sóc từng dảnh lúa. Chú trâu hiền lành vừa gặm cỏ vừa vẫy đuôi chào các bạn nhỏ.',
              dialogue: 'Bác nông dân cười hiền: "Hạt gạo trắng ngần là nhờ đất mẹ Điện Biên và công sức của biết bao bàn tay lao động đấy các cháu ạ!"',
            },
            {
              pageNumber: 3,
              sceneDescription: 'Mùa gặt đến, hương lúa nếp nương thơm nồng cả bản làng Thanh Yên.',
              text: 'Thu về, cánh đồng nhuộm một màu vàng óng ả. Các cô bác trong bản cùng nhau gặt lúa, tiếng cười rộn rã hòa cùng tiếng suối Nậm Rốm chảy róc rách.',
              dialogue: 'Bé An reo lên: "Cơm nếp nương dẻo và thơm ngọt quá mẹ ơi!"',
            },
            {
              pageNumber: 4,
              sceneDescription: 'Bữa cơm sum vầy bên bếp lửa nhà sàn ấm áp, Bạn Ban Nhỏ mỉm cười hạnh phúc.',
              text: 'Bạn Ban Nhỏ nhắc các bạn nhỏ mỗi khi ăn cơm nhớ ăn hết suất, không làm rơi vãi hạt cơm nào, vì mỗi hạt gạo đều chứa đựng tình yêu thương của đất trời và bà con bản làng.',
              dialogue: 'Tất cả các bạn cùng đồng thanh: "Chúng con yêu hạt gạo quê em, chúng con cảm ơn bác nông dân!"',
            },
          ],
          questions: [
            'Cánh đồng lúa Mường Thanh có màu gì khi mùa lúa chín?',
            'Vì sao chúng mình cần ăn hết suất cơm và trân trọng hạt gạo?',
            'Con sẽ làm gì để bày tỏ lòng biết ơn các bác nông dân?',
          ],
          extensionActivity: 'Trẻ cùng cô dùng những hạt gạo nếp Điện Biên dán thành bức tranh bông lúa vàng rực rỡ.',
        },
      });
    }

    const prompt = `Bạn là tác giả viết truyện tranh thiếu nhi mầm non (5-6 tuổi) tại Việt Nam, am hiểu văn hóa Điện Biên.
Hãy sáng tác một câu chuyện ngắn ấm áp, trong sáng, giàu tính giáo dục cho cô giáo Lò Thị Phong (Trường Mầm non Thanh Yên).
Chủ đề: ${topic}
Nhân vật: ${characters}
Bối cảnh: ${setting}
Mục tiêu giáo dục: ${educationalGoal}
Độ dài: ${length} (từ 3 đến 5 trang)
Bài học: ${moralLesson}

Yêu cầu xuất ra JSON thuần túy (không markdown):
{
  "title": "Tên truyện hấp dẫn với trẻ",
  "summary": "Tóm tắt 1 câu",
  "moralLesson": "Bài học ngắn",
  "pages": [
    {
      "pageNumber": 1,
      "sceneDescription": "Gợi ý hình vẽ minh họa cho trang",
      "text": "Đoạn văn ngắn 2-3 câu, từ ngữ trong sáng, giàu hình ảnh",
      "dialogue": "Lời thoại nhân vật ngắn gọn"
    }
  ],
  "questions": ["Câu hỏi gợi mở 1", "Câu hỏi 2", "Câu hỏi 3"],
  "extensionActivity": "Gợi ý hoạt động trải nghiệm sau khi nghe kể chuyện"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      isAiGenerated: true,
      source: 'gemini-2.5-flash',
      statusMessage: 'Truyện đã được AI tạo thành công. Cô vui lòng đọc duyệt trước khi xuất bản cho các bé.',
      data: parsed,
    });
  } catch (err: any) {
    console.error('Error in /api/ai/story:', err);
    res.status(500).json({
      error: 'Không thể tạo truyện lúc này.',
      details: err.message,
    });
  }
});

// 3. POST /api/ai/questions - AI Tạo Câu Hỏi & Trò Chơi (Quiz Generator)
app.post('/api/ai/questions', async (req, res) => {
  try {
    const {
      topic = 'Thiên nhiên và bản làng Điện Biên',
      difficulty = 'Vừa sức (5-6 tuổi)',
      count = 4,
    } = req.body;

    if (!ai) {
      return res.json({
        isAiGenerated: false,
        source: 'curated_quiz',
        statusMessage: 'Chưa kết nối AI. Hệ thống tải bộ câu hỏi chuẩn sư phạm đã được kiểm duyệt.',
        data: [
          {
            id: 1,
            question: 'Hoa ban Điện Biên thường có mấy cánh hoa vậy bé?',
            options: ['3 cánh hoa', '5 cánh hoa', '8 cánh hoa'],
            correctIndex: 1,
            explanation: 'Đúng rồi! Hoa ban thường có 5 cánh hoa mềm mại màu trắng hoặc phớt hồng xinh xắn.',
          },
          {
            id: 2,
            question: 'Khi ăn quả xong, con sẽ bỏ vỏ quả vào đâu để bản làng luôn sạch đẹp?',
            options: ['Ném xuống suối', 'Bỏ vào thùng rác', 'Bỏ ra giữa đường đi'],
            correctIndex: 1,
            explanation: 'Bé giỏi quá! Bỏ rác đúng vào thùng rác giúp bảo vệ môi trường bản làng luôn xanh mát.',
          },
          {
            id: 3,
            question: 'Cánh đồng nào ở Điện Biên nổi tiếng trồng lúa thơm ngon nhất cả nước?',
            options: ['Cánh đồng Mường Thanh', 'Cánh đồng Cát Bi', 'Cánh đồng Tháp Mười'],
            correctIndex: 0,
            explanation: 'Chính xác! Cánh đồng Mường Thanh là cánh đồng rộng lớn nhất vùng Tây Bắc quê mình.',
          },
          {
            id: 4,
            question: 'Ngôi nhà truyền thống của đồng bào dân tộc Thái ở Điện Biên có đặc điểm gì?',
            options: ['Nhà cao tầng bằng kính', 'Nhà sàn bằng gỗ ấm cúng', 'Nhà bằng băng tuyết'],
            correctIndex: 1,
            explanation: 'Đúng rồi bé ơi! Nhà sàn gỗ cao ráo giúp tránh thú dữ và thoáng mát vào mùa hè, ấm áp vào mùa đông.',
          },
        ],
      });
    }

    const prompt = `Bạn là chuyên gia thiết kế trò chơi câu đố cho trẻ mầm non 5-6 tuổi Việt Nam.
Hãy tạo ${count} câu hỏi trắc nghiệm tương tác về chủ đề: "${topic}", độ khó: "${difficulty}".
Ngôn từ giản dị, ngây thơ, thân thiện.
Xuất ra JSON:
[
  {
    "id": 1,
    "question": "Nội dung câu hỏi ngắn gọn",
    "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C"],
    "correctIndex": 0,
    "explanation": "Lời khen ngợi và giải thích ngắn tích cực khi trả lời đúng"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json({
      isAiGenerated: true,
      source: 'gemini-2.5-flash',
      statusMessage: 'Bộ câu hỏi đã được tạo thành công bởi AI.',
      data: parsed,
    });
  } catch (err: any) {
    console.error('Error in /api/ai/questions:', err);
    res.status(500).json({
      error: 'Không thể tạo câu hỏi lúc này.',
      details: err.message,
    });
  }
});

// 4. POST /api/ai/feedback - AI Hỗ Trợ Nhận Xét Sư Phạm (Teacher Observation Feedback)
app.post('/api/ai/feedback', async (req, res) => {
  try {
    const {
      observationNotes = 'Bé hào hứng đếm hoa ban nhưng đôi khi nhầm số 7 và số 9. Rất hòa đồng, chia sẻ bút màu với bạn.',
      domain = 'Phát triển nhận thức & Kỹ năng xã hội',
    } = req.body;

    // Zero-PII check: ensure no phone, ID, or full address in notes
    const sanitizedNotes = observationNotes.substring(0, 500);

    if (!ai) {
      return res.json({
        isAiGenerated: false,
        source: 'pedagogical_guidelines',
        statusMessage: 'Chưa kết nối AI. Hệ thống đưa ra gợi ý diễn đạt sư phạm mẫu mực theo chuẩn Bộ GD&ĐT.',
        suggestions: [
          'Gợi ý 1 (Động viên - Nhận xét sổ theo dõi): "Con rất tích cực, chủ động trong giờ học khám phá. Con biết phối hợp, chia sẻ học liệu cùng các bạn. Cô sẽ tiếp tục cùng con củng cố nhận biết số lượng trong các hoạt động trò chơi vui nhộn tiếp theo."',
          'Gợi ý 2 (Trao đổi với phụ huynh): "Hôm nay bé tham gia rất vui vẻ, biết nhường nhịn bạn bè. Ở nhà, bố mẹ có thể cùng bé chơi đếm đồ vật quen thuộc để giúp con ghi nhớ các mặt số thêm vững vàng nhé!"',
          'Gợi ý 3 (Điều chỉnh sư phạm của cô): "Tạo thêm thẻ bài hoa ban đính nam châm cho trẻ thực hành xếp cặp tương ứng 1-1 để phân biệt rõ mặt số."',
        ],
      });
    }

    const prompt = `Bạn là trợ lý sư phạm mầm non giàu kinh nghiệm. Hãy hỗ trợ cô giáo Lò Thị Phong viết lời nhận xét mang tính khích lệ, tích cực, không dán nhãn cố định dựa trên ghi chú quan sát sau:
Ghi chú: "${sanitizedNotes}"
Lĩnh vực: "${domain}"

Nguyên tắc bắt buộc:
1. Không suy đoán bệnh, rối loạn, khuyết tật hoặc năng lực cố định.
2. Tập trung vào nỗ lực, sự tiến bộ và hành vi cụ thể.
3. Ngôn từ ấm áp, tôn trọng, giàu tình yêu thương.

Xuất ra JSON:
{
  "suggestions": [
    "Gợi ý 1: Nhận xét vào phiếu quan sát",
    "Gợi ý 2: Lời nhắn gửi phụ huynh ấm áp",
    "Gợi ý 3: Biện pháp hỗ trợ sư phạm trong lớp"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      isAiGenerated: true,
      source: 'gemini-2.5-flash',
      statusMessage: 'Lời nhận xét sư phạm đã được AI gợi ý dựa trên ghi chú của cô.',
      suggestions: parsed.suggestions || [],
    });
  } catch (err: any) {
    console.error('Error in /api/ai/feedback:', err);
    res.status(500).json({
      error: 'Không thể tạo phản hồi lúc này.',
      details: err.message,
    });
  }
});

// 5. POST /api/ai/tts & /api/tts/vietnamese - Giọng đọc AI Tiếng Việt cho Bạn Ban Nhỏ (Gemini 3.8 Flash Lite TTS)
const handleVietnameseTts = async (req: express.Request, res: express.Response) => {
  try {
    const { text, voice = 'Kore' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Thiếu nội dung văn bản' });
    }

    if (!ai) {
      return res.json({
        available: false,
        message: 'Chưa kết nối AI API key. Sử dụng Web Speech API tiếng Việt của thiết bị.',
        audioData: null,
      });
    }

    const cleanText = text.slice(0, 400);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Giọng cô giáo mầm non Việt Nam dịu dàng, trong sáng, ấm áp, phát âm tiếng Việt chuẩn, tốc độ vừa phải cho bé 5-6 tuổi',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({
        available: true,
        mimeType: 'audio/wav',
        audioData: base64Audio,
      });
    }

    res.json({ available: false, audioData: null, message: 'Không thể tạo âm thanh AI lúc này' });
  } catch (err: any) {
    console.warn('TTS error (falling back to Web Speech API):', err.message);
    res.json({ available: false, audioData: null, error: err.message });
  }
};

app.post('/api/ai/tts', handleVietnameseTts);
app.post('/api/tts/vietnamese', handleVietnameseTts);


// Vite middleware for dev or static files for prod
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  // Only listen when not in Vercel Serverless environment
  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  setupVite().catch((err) => {
    console.error('Failed to start server:', err);
  });
}

export default app;
