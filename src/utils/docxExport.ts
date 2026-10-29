/**
 * DOCX Exporter for Kindergarten Lesson Plans
 * Uses 'docx' library to generate real Word files with Unicode Vietnamese and 4-column tables.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
} from 'docx';
import { LessonPlanData } from '../data/lessonPlansData';

export async function exportLessonPlanToDocx(plan: LessonPlanData) {
  // Create table rows for the 4-column timeline
  const tableHeader = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        width: { size: 15, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: 'Thời gian', bold: true })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 35, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: 'Hoạt động của cô', bold: true })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: 'Hoạt động của trẻ', bold: true })], alignment: AlignmentType.CENTER })],
      }),
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: 'Nội dung lồng ghép', bold: true })], alignment: AlignmentType.CENTER })],
      }),
    ],
  });

  const stepRows = plan.activitySteps.map(step => {
    return new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: step.stepName, bold: true }),
                new TextRun({ text: `\n(${step.duration})`, italics: true }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: step.teacherActivity })] }),
            ...(step.guidingQuestions && step.guidingQuestions.length > 0
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({ text: '\n* Câu hỏi gợi mở: ', bold: true }),
                      new TextRun({ text: step.guidingQuestions.join('; ') }),
                    ],
                  }),
                ]
              : []),
          ],
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: step.childActivity })] })],
        }),
        new TableCell({
          children: [
            new Paragraph({ children: [new TextRun({ text: step.integratedContent || 'Tích hợp sư phạm' })] }),
          ],
        }),
      ],
    });
  });

  const timelineTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [tableHeader, ...stepRows],
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            children: [
              new TextRun({ text: plan.school.toUpperCase(), bold: true, size: 22 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'KẾ HOẠCH TỔ CHỨC HOẠT ĐỘNG GIÁO DỤC', bold: true, size: 28, color: '0D65C9' }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Giáo viên thực hiện: ${plan.teacher} | Độ tuổi: ${plan.ageGroup}`, italics: true, size: 20 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: '' }), // spacing

          // I. THÔNG TIN HOẠT ĐỘNG
          new Paragraph({
            children: [new TextRun({ text: 'I. THÔNG TIN HOẠT ĐỘNG', bold: true, size: 24, color: '0D65C9' })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Chủ đề: ', bold: true }),
              new TextRun({ text: plan.theme }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Tên hoạt động: ', bold: true }),
              new TextRun({ text: plan.title, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Lĩnh vực phát triển: ', bold: true }),
              new TextRun({ text: plan.developmentalArea }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Thời lượng: ', bold: true }),
              new TextRun({ text: `${plan.durationMinutes} phút` }),
            ],
          }),
          new Paragraph({ text: '' }),

          // II. MỤC TIÊU
          new Paragraph({
            children: [new TextRun({ text: 'II. MỤC TIÊU HOẠT ĐỘNG', bold: true, size: 24, color: '0D65C9' })],
          }),
          new Paragraph({ children: [new TextRun({ text: '1. Kiến thức:', bold: true })] }),
          ...plan.objectives.knowledge.map(k => new Paragraph({ children: [new TextRun({ text: `  - ${k}` })] })),
          new Paragraph({ children: [new TextRun({ text: '2. Kỹ năng:', bold: true })] }),
          ...plan.objectives.skills.map(s => new Paragraph({ children: [new TextRun({ text: `  - ${s}` })] })),
          new Paragraph({ children: [new TextRun({ text: '3. Thái độ:', bold: true })] }),
          ...plan.objectives.attitude.map(a => new Paragraph({ children: [new TextRun({ text: `  - ${a}` })] })),
          ...(plan.objectives.english
            ? [
                new Paragraph({ children: [new TextRun({ text: '4. Làm quen Tiếng Anh (Lồng ghép):', bold: true })] }),
                ...plan.objectives.english.map(e => new Paragraph({ children: [new TextRun({ text: `  - ${e}` })] })),
              ]
            : []),
          new Paragraph({ text: '' }),

          // III. CHUẨN BỊ
          new Paragraph({
            children: [new TextRun({ text: 'III. CHUẨN BỊ', bold: true, size: 24, color: '0D65C9' })],
          }),
          new Paragraph({ children: [new TextRun({ text: '1. Đồ dùng của cô: ', bold: true }), new TextRun({ text: plan.materials.teacher.join('; ') })] }),
          new Paragraph({ children: [new TextRun({ text: '2. Đồ dùng của trẻ: ', bold: true }), new TextRun({ text: plan.materials.children.join('; ') })] }),
          new Paragraph({ children: [new TextRun({ text: '3. Địa điểm, không gian: ', bold: true }), new TextRun({ text: plan.materials.space })] }),
          new Paragraph({ text: '' }),

          // IV. TIẾN TRÌNH HOẠT ĐỘNG
          new Paragraph({
            children: [new TextRun({ text: 'IV. TIẾN TRÌNH HOẠT ĐỘNG (BẢNG 4 CỘT)', bold: true, size: 24, color: '0D65C9' })],
          }),
          timelineTable,
          new Paragraph({ text: '' }),

          // V. LỒNG GHÉP TIẾNG ANH (NẾU CÓ)
          ...(plan.englishIntegration && plan.englishIntegration.enabled
            ? [
                new Paragraph({
                  children: [new TextRun({ text: 'V. NỘI DUNG LỒNG GHÉP TIẾNG ANH', bold: true, size: 24, color: '0D65C9' })],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: '• Từ vựng trọng tâm: ', bold: true }),
                    new TextRun({
                      text: plan.englishIntegration.vocabulary.map(v => `${v.word} (${v.meaning} - ${v.phonetic})`).join(', '),
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: '• Mẫu câu ngắn: ', bold: true }),
                    new TextRun({ text: plan.englishIntegration.modelSentence }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: '• Lời hướng dẫn của cô: ', bold: true }),
                    new TextRun({ text: plan.englishIntegration.teacherPrompt }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: '• Phản hồi của trẻ: ', bold: true }),
                    new TextRun({ text: plan.englishIntegration.expectedChildResponse }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: '• Hoạt động luyện tập: ', bold: true }),
                    new TextRun({ text: plan.englishIntegration.practiceActivity }),
                  ],
                }),
                new Paragraph({ text: '' }),
              ]
            : []),

          // VI. ĐÁNH GIÁ & ĐIỀU CHỈNH
          new Paragraph({
            children: [new TextRun({ text: 'VI. ĐÁNH GIÁ & ĐIỀU CHỈNH SƯ PHẠM', bold: true, size: 24, color: '0D65C9' })],
          }),
          new Paragraph({ children: [new TextRun({ text: '1. Tiêu chí quan sát: ', bold: true }), new TextRun({ text: plan.assessment.join('; ') })] }),
          new Paragraph({ children: [new TextRun({ text: '2. Hỗ trợ trẻ cần nâng đỡ: ', bold: true }), new TextRun({ text: plan.differentiation.supportChildren })] }),
          new Paragraph({ children: [new TextRun({ text: '3. Phương án khi thiếu thiết bị/mất mạng: ', bold: true }), new TextRun({ text: plan.differentiation.offlineFallback })] }),
          new Paragraph({ text: '' }),

          // VII. HOẠT ĐỘNG NỐI TIẾP
          new Paragraph({
            children: [new TextRun({ text: 'VII. HOẠT ĐỘNG NỐI TIẾP', bold: true, size: 24, color: '0D65C9' })],
          }),
          new Paragraph({ children: [new TextRun({ text: '• Hoạt động góc: ', bold: true }), new TextRun({ text: plan.followUpActivities.cornerActivity })] }),
          new Paragraph({ children: [new TextRun({ text: '• Hoạt động ngoài trời: ', bold: true }), new TextRun({ text: plan.followUpActivities.outdoorActivity })] }),
          new Paragraph({ children: [new TextRun({ text: '• Phối hợp gia đình: ', bold: true }), new TextRun({ text: plan.followUpActivities.familyCoordination })] }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const cleanTitle = plan.title.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '-').replace(/-+/g, '-');
  const fileName = `Giao-an-${cleanTitle}.docx`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
