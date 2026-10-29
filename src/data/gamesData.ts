/**
 * Games dataset and configs for 6 Interactive Games
 * Designed for 5-6 year old preschool children
 */

export interface GameMetadata {
  slug: string;
  title: string;
  subTitle: string;
  icon: string;
  targetDomain: string;
  themeColor: string;
  instructionText: string;
}

export const GAMES_CATALOG: GameMetadata[] = [
  {
    slug: 'be-dem-hoa-ban',
    title: 'Bé Đếm Hoa Ban',
    subTitle: 'Đếm số lượng bông hoa nở rộ trong phạm vi 10',
    icon: '🌸',
    targetDomain: 'Phát triển nhận thức & Làm quen toán học',
    themeColor: '#FB789E',
    instructionText: 'Bé hãy nhìn kỹ những bông hoa ban đang nở và chọn số lượng đúng nhé!',
  },
  {
    slug: 'chu-cai-que-em',
    title: 'Chữ Cái Quê Em',
    subTitle: 'Làm quen chữ cái B, N, S, T, L qua hình ảnh thân thương',
    icon: '🔤',
    targetDomain: 'Phát triển ngôn ngữ & Tiếng Việt mầm non',
    themeColor: '#0D65C9',
    instructionText: 'Bé lắng nghe âm thanh và chọn chữ cái tương ứng với hình ảnh quê mình nhé!',
  },
  {
    slug: 'xay-ngoi-nha-cua-be',
    title: 'Xây Ngôi Nhà Của Bé',
    subTitle: 'Lắp ráp các hình khối tạo nên mái nhà sàn truyền thống',
    icon: '🏡',
    targetDomain: 'Phát triển nhận thức & Tư duy hình học',
    themeColor: '#FFCD53',
    instructionText: 'Chạm chọn hình khối rồi chạm vào vị trí phù hợp để dựng ngôi nhà sàn xinh đẹp!',
  },
  {
    slug: 'cho-phien-sac-mau',
    title: 'Chợ Phiên Sắc Màu',
    subTitle: 'Phân loại rau củ, so sánh to - nhỏ và nhiều - ít',
    icon: '🧺',
    targetDomain: 'Phát triển nhận thức & Phân loại tư duy',
    themeColor: '#FB789E',
    instructionText: 'Cùng Bạn Ban Nhỏ đi chợ phiên và chọn đúng các món nông sản tươi ngon!',
  },
  {
    slug: 'be-bao-ve-ban-lang-xanh',
    title: 'Bé Bảo Vệ Bản Làng Xanh',
    subTitle: 'Học cách yêu thiên nhiên, giữ sạch nguồn nước và bản làng',
    icon: '🌱',
    targetDomain: 'Tình cảm, kỹ năng xã hội & Bảo vệ môi trường',
    themeColor: '#72D8AB',
    instructionText: 'Bé chọn hành động thật tốt để bản làng Điện Biên luôn xanh sạch đẹp nhé!',
  },
  {
    slug: 'tim-duong-ve-ban',
    title: 'Tìm Đường Về Bản',
    subTitle: 'Đưa Bạn Ban Nhỏ vượt qua mê cung về với mái nhà sàn',
    icon: '🧭',
    targetDomain: 'Định hướng không gian & Giải quyết vấn đề',
    themeColor: '#0D65C9',
    instructionText: 'Dùng các nút mũi tên hoặc chạm ô liền kề để giúp Bạn Ban Nhỏ về nhà an toàn!',
  },
];

// Data for Game 2: Chữ cái quê em
export interface LetterItem {
  letter: string;
  word: string;
  meaning: string;
  emoji: string;
  hint: string;
}

export const LETTER_ITEMS: LetterItem[] = [
  { letter: 'B', word: 'Ban', meaning: 'Bông hoa ban trắng mùa xuân Điện Biên', emoji: '🌸', hint: 'B - Hoa Ban' },
  { letter: 'N', word: 'Núi', meaning: 'Dãy núi rừng Tây Bắc hùng vĩ xanh ngát', emoji: '⛰️', hint: 'N - Ngọn Núi' },
  { letter: 'S', word: 'Suối', meaning: 'Dòng suối Nậm Rốm chảy róc rách trong veo', emoji: '💧', hint: 'S - Dòng Suối' },
  { letter: 'T', word: 'Trâu', meaning: 'Chú trâu hiền lành chăm chỉ cày ruộng', emoji: '🐃', hint: 'T - Chú Trâu' },
  { letter: 'L', word: 'Lúa', meaning: 'Cây lúa nếp nương Mường Thanh hạt mẩy thơm', emoji: '🌾', hint: 'L - Cây Lúa' },
];

// Data for Game 4: Chợ phiên sắc màu
export interface MarketChallenge {
  id: number;
  question: string;
  audioPrompt: string;
  type: 'select-color' | 'compare-quantity' | 'pick-basket' | 'shape-item';
  items: {
    id: string;
    name: string;
    color: string;
    shape: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const MARKET_CHALLENGES: MarketChallenge[] = [
  {
    id: 1,
    question: 'Bé hãy tìm và chọn những quả có MÀU ĐỎ tươi rói nhé!',
    audioPrompt: 'Bé hãy tìm và chọn quả có màu đỏ tươi rói nhé!',
    type: 'select-color',
    items: [
      { id: 'm1', name: 'Quả ớt chuông đỏ', color: 'red', shape: 'bell', emoji: '🫑', isCorrect: true },
      { id: 'm2', name: 'Quả dưa chuột xanh', color: 'green', shape: 'long', emoji: '🥒', isCorrect: false },
      { id: 'm3', name: 'Quả táo đỏ ngọt', color: 'red', shape: 'round', emoji: '🍎', isCorrect: true },
      { id: 'm4', name: 'Củ khoai tây vàng', color: 'yellow', shape: 'oval', emoji: '🥔', isCorrect: false },
    ],
    explanation: 'Giỏi quá! Quả ớt chuông và quả táo có màu đỏ tươi bắt mắt!',
  },
  {
    id: 2,
    question: 'Bé nhìn xem đĩa nào có NHIỀU bắp ngô ngọt hơn?',
    audioPrompt: 'Đĩa nào có nhiều bắp ngô ngọt hơn vậy bé?',
    type: 'compare-quantity',
    items: [
      { id: 'm5', name: 'Đĩa A có 2 bắp ngô', color: 'yellow', shape: 'plate', emoji: '🌽🌽', isCorrect: false },
      { id: 'm6', name: 'Đĩa B có 5 bắp ngô', color: 'yellow', shape: 'plate', emoji: '🌽🌽🌽🌽🌽', isCorrect: true },
    ],
    explanation: 'Chính xác! 5 bắp ngô nhiều hơn 2 bắp ngô rất nhiều!',
  },
  {
    id: 3,
    question: 'Bé hãy chọn loại củ có HÌNH TRÒN xoe giúp cô nhé!',
    audioPrompt: 'Bé hãy chọn loại củ quả có hình tròn xoe giúp cô nhé!',
    type: 'shape-item',
    items: [
      { id: 'm7', name: 'Củ cà rốt dài', color: 'orange', shape: 'long', emoji: '🥕', isCorrect: false },
      { id: 'm8', name: 'Quả cà chua tròn', color: 'red', shape: 'round', emoji: '🍅', isCorrect: true },
      { id: 'm9', name: 'Bắp ngô dài', color: 'yellow', shape: 'long', emoji: '🌽', isCorrect: false },
    ],
    explanation: 'Hoan hô bé! Quả cà chua tròn xoe mọng nước thật đẹp!',
  },
];

// Data for Game 5: Bé bảo vệ bản làng xanh
export interface EcoChoice {
  id: number;
  situation: string;
  audioText: string;
  options: {
    id: string;
    text: string;
    emoji: string;
    isPositive: boolean;
    feedback: string;
  }[];
}

export const ECO_SCENARIOS: EcoChoice[] = [
  {
    id: 1,
    situation: 'Khi ăn xong quả chuối chín ở sân trường, bé sẽ làm gì với vỏ chuối?',
    audioText: 'Khi ăn xong quả chuối, con sẽ bỏ vỏ chuối vào đâu nhỉ?',
    options: [
      {
        id: 'e1',
        text: 'Bỏ vỏ chuối vào thùng rác của trường',
        emoji: '🗑️',
        isPositive: true,
        feedback: 'Đúng rồi con yêu! Bỏ rác vào thùng giúp sân trường mầm non luôn sạch sẽ và bạn bè không bị trượt ngã!',
      },
      {
        id: 'e2',
        text: 'Vứt vỏ chuối xuống bãi cỏ',
        emoji: '🌿',
        isPositive: false,
        feedback: 'Vứt rác ra cỏ sẽ làm bẩn môi trường và dễ làm người khác trượt ngã. Con nhớ bỏ vào thùng rác nhé!',
      },
    ],
  },
  {
    id: 2,
    situation: 'Khi rửa tay xong với xà phòng thơm, bé làm gì tiếp theo?',
    audioText: 'Rửa tay sạch xong rồi, bé cần làm gì với vòi nước?',
    options: [
      {
        id: 'e3',
        text: 'Vặn chặt khóa vòi nước lại',
        emoji: '🚰',
        isPositive: true,
        feedback: 'Bé rất ngoan! Tiết kiệm từng giọt nước sạch giúp bản làng luôn có nguồn nước mát để dùng!',
      },
      {
        id: 'e4',
        text: 'Để nước chảy tự do rồi chạy đi chơi',
        emoji: '💦',
        isPositive: false,
        feedback: 'Để nước chảy hoang phí sẽ làm cạn kiệt nguồn nước ngọt đấy. Bé nhớ tắt vòi nước sau khi rửa nhé!',
      },
    ],
  },
  {
    id: 3,
    situation: 'Thấy cây hoa ban non ở góc thiên nhiên bị héo vì trời nắng, bé nên làm gì?',
    audioText: 'Thấy cây non bị khát nước, bé sẽ làm gì để giúp cây?',
    options: [
      {
        id: 'e5',
        text: 'Lấy bình xịt tưới nước mát cho cây',
        emoji: '🪴',
        isPositive: true,
        feedback: 'Bé có tấm lòng yêu thiên nhiên tuyệt vời! Cây hoa non được uống nước sẽ xanh tốt và nở hoa xinh!',
      },
      {
        id: 'e6',
        text: 'Bẻ cành cây mang về chơi',
        emoji: '🍂',
        isPositive: false,
        feedback: 'Cây non cũng biết đau đấy! Chúng mình cùng cô tưới nước chăm sóc cây thay vì bẻ cành nhé!',
      },
    ],
  },
  {
    id: 4,
    situation: 'Cùng cô và các bạn đi dạo bên dòng suối Nậm Rốm, bé thấy bạn vứt vỏ bánh xuống suối:',
    audioText: 'Thấy bạn vô ý làm bẩn dòng suối, bé sẽ làm gì?',
    options: [
      {
        id: 'e7',
        text: 'Nhắc bạn nhặt lại bỏ vào thùng rác',
        emoji: '🤝',
        isPositive: true,
        feedback: 'Giỏi quá! Dòng suối trong xanh sẽ vui mừng vì có những người bạn nhỏ biết giữ gìn nguồn nước!',
      },
      {
        id: 'e8',
        text: 'Ném thêm nhiều rác xuống suối',
        emoji: '🌊',
        isPositive: false,
        feedback: 'Rác sẽ làm đàn cá không có chỗ bơi và nguồn nước bị ô nhiễm. Chúng mình cùng giữ suối sạch nhé!',
      },
    ],
  },
];
