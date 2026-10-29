/**
 * Vietnamese Text Normalizer for Speech Synthesis (Preschool 5-6 Years Old)
 * Tailored for Dien Bien Preschool "AI Bản Làng Em" - Cô Lò Thị Phong
 */

// Mapping of single digits to Vietnamese words
const DIGIT_WORDS: Record<string, string> = {
  '0': 'không',
  '1': 'một',
  '2': 'hai',
  '3': 'ba',
  '4': 'bốn',
  '5': 'năm',
  '6': 'sáu',
  '7': 'bảy',
  '8': 'tám',
  '9': 'chín',
  '10': 'mười',
};

/**
 * Normalizes Vietnamese text before feeding it to Web Speech API or Gemini TTS.
 * Converts symbols, numbers, ranges, acronyms, and removes visual-only emojis.
 */
export function normalizeVietnameseForSpeech(rawText: string): string {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;

  // 1. Remove URLs and links
  text = text.replace(/https?:\/\/\S+/gi, '');

  // 2. Remove emojis and special pictograms
  text = text.replace(
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu,
    ' '
  );

  // 3. Remove Markdown syntax (bold, italic, headers, bullet points, code blocks)
  text = text.replace(/```[\s\S]*?```/g, ' ');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/^[\*\-\+]\s+/gm, '');
  text = text.replace(/^\d+\.\s+/gm, '');
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // 4. Normalize preschool age & school year patterns
  text = text.replace(/5\s*[-–—]\s*6\s*tuổi/gi, 'năm đến sáu tuổi');
  text = text.replace(/2026\s*[-–—]\s*2027/g, 'hai nghìn không trăm hai mươi sáu, hai nghìn không trăm hai mươi bảy');
  text = text.replace(/2026/g, 'hai nghìn không trăm hai mươi sáu');
  text = text.replace(/2027/g, 'hai nghìn không trăm hai mươi bảy');

  // 5. Educational and Local Acronyms
  text = text.replace(/\bAI\b/g, 'A-I');
  text = text.replace(/\bSTEAM\b/gi, 'học tập trải nghiệm xì-tem');
  text = text.replace(/\bSTEM\b/gi, 'xì-tem');
  text = text.replace(/\bPIN\b/gi, 'pin');
  text = text.replace(/\bPII\b/gi, 'thông tin cá nhân');
  text = text.replace(/\bSQL\b/gi, 'ét-quy-en');
  text = text.replace(/\bAPI\b/gi, 'A-P-I');
  text = text.replace(/\.docx?\b/gi, 'tài liệu văn bản');

  // 6. Common number ranges (e.g. 1-10 -> một đến mười)
  text = text.replace(/\b1\s*[-–—]\s*10\b/g, 'một đến mười');
  text = text.replace(/\b1\s*[-–—]\s*5\b/g, 'một đến năm');
  text = text.replace(/\b3\s*[-–—]\s*5\b/g, 'ba đến năm');
  text = text.replace(/\b2\s*[-–—]\s*3\b/g, 'hai đến ba');

  // 7. Small quantity numbers (e.g. "3 bông hoa" -> "ba bông hoa")
  const countableNouns = [
    'bông hoa', 'cánh hoa', 'chú bướm', 'chú chim', 'chú cá', 'ngôi sao',
    'bạn', 'trẻ', 'bé', 'trang', 'khu vực', 'trò chơi', 'bước', 'phút', 'ngày', 'năm'
  ];
  for (const noun of countableNouns) {
    for (let n = 1; n <= 10; n++) {
      const reg = new RegExp(`\\b${n}\\s+${noun}\\b`, 'gi');
      text = text.replace(reg, `${DIGIT_WORDS[String(n)]} ${noun}`);
    }
  }

  // 8. Clean up extra punctuation, brackets, hyphens
  text = text.replace(/[\[\]\(\)\{\}\<\>"]/g, ' ');
  text = text.replace(/\s*[-–—]+\s*/g, ', ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}
