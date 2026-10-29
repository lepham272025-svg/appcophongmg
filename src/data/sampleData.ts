/**
 * Sample Educational Data for "AI Bản Làng Em"
 * Teacher: Lò Thị Phong - Trường Mầm non Thanh Yên, Điện Biên (2026-2027)
 */

export interface RegionData {
  id: string;
  title: string;
  subTitle: string;
  themeColor: string;
  bgGradient: string;
  icon: string;
  mascotGreeting: string;
  cards: {
    title: string;
    description: string;
    audioText: string;
    icon: string;
  }[];
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  steamPrompt: {
    title: string;
    description: string;
  };
  relatedGameSlug: string;
}

export const REGIONS_DATA: RegionData[] = [
  {
    id: 'vuon-hoa-ban',
    title: 'Vườn Hoa Ban',
    subTitle: 'Sắc hoa trắng hồng giữa mây trời Điện Biên',
    themeColor: '#FB789E',
    bgGradient: 'from-pink-100 to-rose-50',
    icon: '🌸',
    mascotGreeting: 'Chào các bạn! Mình là Ban Nhỏ đây! Các bạn có biết hoa ban nở rộ vào mùa nào không? Hãy cùng đếm những cánh hoa xinh đẹp nhé!',
    cards: [
      {
        title: 'Bông hoa 5 cánh xinh xắn',
        description: 'Mỗi bông hoa ban thường có 5 cánh hoa mềm mại, có loại hoa ban màu trắng tinh khôi và hoa ban phớt hồng dịu dàng.',
        audioText: 'Mỗi bông hoa ban thường có 5 cánh hoa mềm mại, có sắc trắng tinh khôi hoặc màu phớt hồng dịu dàng.',
        icon: '🌺',
      },
      {
        title: 'Mùa hoa ban nở đón xuân',
        description: 'Khi mùa xuân về trên khắp các sườn đồi Điện Biên vào tháng 3, hoa ban bung nở trắng muốt như những dải lụa bồng bềnh.',
        audioText: 'Vào tháng ba mùa xuân, hoa ban bung nở trắng muốt khắp sườn đồi bản làng Điện Biên quê em.',
        icon: '☀️',
      },
      {
        title: 'Biểu tượng tình yêu bản làng',
        description: 'Hoa ban gắn liền với truyền thuyết nàng Ban chung thủy, là biểu tượng tình yêu trong sáng và lòng hiếu thảo của người dân vùng cao.',
        audioText: 'Hoa ban là biểu tượng đẹp của lòng hiếu thảo và tình yêu trong sáng của đồng bào Tây Bắc.',
        icon: '🕊️',
      },
    ],
    quickQuiz: {
      question: 'Bông hoa ban thường có mấy cánh hoa vậy bé?',
      options: ['3 cánh hoa', '5 cánh hoa', '8 cánh hoa'],
      correctIndex: 1,
      explanation: 'Giỏi quá! Hoa ban thường có 5 cánh xòe tròn như bàn tay nhỏ bé của em đấy!',
    },
    steamPrompt: {
      title: 'Gấp và cắt hoa ban 5 cánh',
      description: 'Dùng giấy xốp màu trắng hoặc hồng, gấp cánh hoa và dán nhụy vàng để trang trí góc lớp học.',
    },
    relatedGameSlug: 'be-dem-hoa-ban',
  },
  {
    id: 'canh-dong-muong-thanh',
    title: 'Cánh Đồng Mường Thanh',
    subTitle: 'Cánh đồng lúa lòng chảo trù phú nhất Tây Bắc',
    themeColor: '#FFCD53',
    bgGradient: 'from-amber-100 to-yellow-50',
    icon: '🌾',
    mascotGreeting: 'Oa! Cánh đồng Mường Thanh vàng rực thơm ngát! Hạt gạo Điện Biên dẻo ngon nhất trần đời đấy!',
    cards: [
      {
        title: 'Cánh đồng lớn nhất Tây Bắc',
        description: '"Nhất Thanh, nhì Lò, tam Than, tứ Tấc" – Cánh đồng Mường Thanh là cánh đồng rộng lớn nhất vùng Tây Bắc nước ta.',
        audioText: 'Cánh đồng Mường Thanh quê hương Điện Biên là cánh đồng rộng lớn nhất vùng núi rừng Tây Bắc.',
        icon: '🌾',
      },
      {
        title: 'Hạt gạo Điện Biên dẻo thơm',
        description: 'Từ cây lúa nước, các bác nông dân chăm bón tạo nên hạt gạo tám thơm, nếp nương dẻo ngọt nấu xôi ngũ sắc thơm lừng.',
        audioText: 'Hạt gạo Điện Biên trắng ngần thơm dẻo, được nấu thành những đĩa xôi nếp nương thơm lừng.',
        icon: '🍚',
      },
      {
        title: 'Bác nông dân và chú trâu',
        description: 'Từ sáng sớm, các bác nông dân chăm chỉ cày ruộng, cấy lúa, làm cỏ để cho chúng mình những bát cơm thơm ngon mỗi ngày.',
        audioText: 'Bác nông dân cần mẫn lao động trên đồng, dạy chúng mình biết trân trọng từng hạt cơm dẻo.',
        icon: '🐃',
      },
    ],
    quickQuiz: {
      question: 'Sản phẩm nào thơm ngon nổi tiếng được làm từ lúa gạo Mường Thanh?',
      options: ['Xôi nếp nương dẻo thơm', 'Kẹo cao su', 'Nước ngọt có ga'],
      correctIndex: 0,
      explanation: 'Chính xác! Gạo Điện Biên nấu xôi nếp nương thơm lừng, ai ăn một lần cũng nhớ mãi!',
    },
    steamPrompt: {
      title: 'Làm tranh cánh đồng bằng hạt gạo',
      description: 'Dùng hạt gạo nhuộm màu thực phẩm và lá cây khô để tạo hình cánh đồng lúa chín vàng.',
    },
    relatedGameSlug: 'chu-cai-que-em',
  },
  {
    id: 'nui-rung-xanh',
    title: 'Núi Rừng Xanh',
    subTitle: 'Rừng cây đại ngàn và tiếng chim ca ríu rít',
    themeColor: '#72D8AB',
    bgGradient: 'from-emerald-100 to-teal-50',
    icon: '🌲',
    mascotGreeting: 'Cùng hít thở không khí trong lành của núi rừng Điện Biên nào! Hãy yêu quý và bảo vệ từng tán cây ngọn cỏ nhé!',
    cards: [
      {
        title: 'Lá phổi xanh của bản làng',
        description: 'Rừng cây xanh che chở bản làng, chắn gió bão, giữ đất không bị sạt lở và mang lại nguồn không khí mát lành trong vắt.',
        audioText: 'Rừng cây xanh che chở bản làng, giữ đất, giữ nguồn nước và làm sạch không khí cho chúng mình.',
        icon: '🌳',
      },
      {
        title: 'Thế giới muông thú quen thuộc',
        description: 'Trong rừng có chim họa mi hót líu lo, chú sóc nhỏ chuyền cành, bướm bay rập rờn bên những khóm hoa dại.',
        audioText: 'Rừng xanh là ngôi nhà ấm áp của những chú sóc nhanh nhẹn, chim hót líu lo và hoa rừng khoe sắc.',
        icon: '🐿️',
      },
      {
        title: 'Em yêu và bảo vệ rừng',
        description: 'Chúng mình cùng nhau trồng cây xanh, không bẻ cành hái hoa, không vứt rác bừa bãi khi đi dã ngoại.',
        audioText: 'Bé nhớ không bẻ cành cây, cùng cô chăm sóc cây xanh ở trường mầm non thật tươi tốt nhé!',
        icon: '🌱',
      },
    ],
    quickQuiz: {
      question: 'Hành động nào giúp bảo vệ núi rừng quê em luôn xanh tươi?',
      options: ['Trồng thêm cây xanh', 'Bẻ cành cây non', 'Vứt túi nilon vào rừng'],
      correctIndex: 0,
      explanation: 'Bé thật tuyệt vời! Trồng và chăm sóc cây xanh giúp rừng luôn tươi tốt và đón nhiều loài chim về làm tổ!',
    },
    steamPrompt: {
      title: 'Gieo hạt và làm nhật ký mầm xanh',
      description: 'Gieo hạt đỗ vào chậu bông ẩm và theo dõi từng ngày mầm cây vươn lên đón ánh nắng.',
    },
    relatedGameSlug: 'be-bao-ve-ban-lang-xanh',
  },
  {
    id: 'ngoi-nha-ban-em',
    title: 'Ngôi Nhà Bản Em',
    subTitle: 'Mái nhà sàn ấm cúng và bếp lửa hồng',
    themeColor: '#0D65C9',
    bgGradient: 'from-blue-100 to-sky-50',
    icon: '🏡',
    mascotGreeting: 'Mời bạn ghé thăm ngôi nhà sàn xinh xắn của đồng bào dân tộc Thái! Cầu thang có thanh khau cút đón khách quý!',
    cards: [
      {
        title: 'Kiến trúc nhà sàn độc đáo',
        description: 'Nhà sàn làm từ gỗ rừng và mái ngói hoặc mái lá, sàn nhà cao ráo giúp tránh ẩm ướt và thoáng mát vào mùa hè.',
        audioText: 'Nhà sàn là kiểu nhà truyền thống ấm cúng của đồng bào Thái ở Điện Biên, sàn nhà cao ráo và thoáng mát.',
        icon: '🪵',
      },
      {
        title: 'Khau cút trên nóc nhà',
        description: 'Khau cút là hai thanh gỗ bắt chéo hình chữ X uốn cong trên đỉnh nóc nhà sàn, biểu tượng của sự may mắn, bình yên.',
        audioText: 'Thanh khau cút uốn cong trên nóc nhà sàn là nét văn hóa đặc trưng, mang lại may mắn cho gia đình.',
        icon: '✨',
      },
      {
        title: 'Bếp lửa ấm sum vầy',
        description: 'Giữa nhà sàn là bếp lửa luôn đỏ hồng, nơi cả gia đình quây quần sau một ngày lao động, ông bà kể chuyện cho các cháu nghe.',
        audioText: 'Bếp lửa nhà sàn là nơi ông bà cha mẹ quây quần, kể cho em nghe những câu chuyện cổ tích ngọt ngào.',
        icon: '🔥',
      },
    ],
    quickQuiz: {
      question: 'Nhà sàn truyền thống được dựng cao khỏi mặt đất để làm gì?',
      options: ['Để tránh ẩm ướt và mát mẻ', 'Để chứa nước mưa', 'Để trượt tuyết'],
      correctIndex: 0,
      explanation: 'Đúng rồi! Nhà sàn dựng cao giúp không gian khô ráo, tránh thú dữ và đón gió mát lành mùa hè!',
    },
    steamPrompt: {
      title: 'Lắp ráp mô hình nhà sàn từ hộp giấy',
      description: 'Tận dụng hộp sữa, que kem gỗ để dựng cột nhà, sàn gỗ và mái ngói hình tam giác.',
    },
    relatedGameSlug: 'xay-ngoi-nha-cua-be',
  },
  {
    id: 'phien-cho-sac-mau',
    title: 'Phiên Chợ Sắc Màu',
    subTitle: 'Nông sản ngọt lành và nụ cười rạng rỡ',
    themeColor: '#FB789E',
    bgGradient: 'from-rose-100 to-pink-50',
    icon: '🧺',
    mascotGreeting: 'Chợ phiên rực rỡ quá các bạn ơi! Có măng tre, bí ngô, rau cải non và trang phục thổ cẩm nhiều màu sắc!',
    cards: [
      {
        title: 'Rau củ quả tươi ngon',
        description: 'Bà con mang đến chợ những bó rau xanh mướt, quả dưa chuột giòn ngọt, măng ngọt hái trên nương đồi.',
        audioText: 'Chợ phiên có nhiều rau củ quả tươi ngon như bí đỏ, dưa ngọt, măng rừng và rau cải non.',
        icon: '🥦',
      },
      {
        title: 'Sắc màu thổ cẩm rực rỡ',
        description: 'Những chiếc khăn piêu, váy áo hoa văn dệt tay tinh xảo với màu đỏ, xanh, vàng, tím như cầu vồng trên nương.',
        audioText: 'Khăn piêu và áo thổ cẩm của các bà, các mẹ có hoa văn rực rỡ như bảy sắc cầu vồng.',
        icon: '🧣',
      },
      {
        title: 'Kỹ năng giao tiếp lịch sự',
        description: 'Khi đi chợ cùng người lớn, bé nhớ mỉm cười chào hỏi "Dạ, con chào cô chú", và nói "Con cảm ơn" khi nhận đồ.',
        audioText: 'Khi đi chợ cùng cô và mẹ, bé luôn biết chào hỏi lễ phép và nói lời cảm ơn ấm áp.',
        icon: '🤝',
      },
    ],
    quickQuiz: {
      question: 'Khi nhận được quả táo từ cô bán hàng ở chợ phiên, bé nên nói lời gì?',
      options: ['"Con cảm ơn cô ạ!"', 'Không nói gì rồi chạy đi', '"Con không cần!"'],
      correctIndex: 0,
      explanation: 'Bé thật ngoan ngoãn! Biết nói lời cảm ơn là em bé lịch sự được mọi người yêu quý!',
    },
    steamPrompt: {
      title: 'Tập phân loại rau củ theo màu sắc',
      description: 'Xếp đồ chơi củ cà rốt cam, quả ớt chuông đỏ, rau bắp cải xanh vào đúng 3 chiếc giỏ xinh.',
    },
    relatedGameSlug: 'cho-phien-sac-mau',
  },
  {
    id: 'dong-suoi-trong-xanh',
    title: 'Dòng Suối Trong Xanh',
    subTitle: 'Dòng suối Nậm Rốm hiền hòa tắm mát bản em',
    themeColor: '#0D65C9',
    bgGradient: 'from-cyan-100 to-blue-50',
    icon: '💧',
    mascotGreeting: 'Tiếng suối Nậm Rốm chảy róc rách vui tai! Nước suối tưới mát cho cánh đồng và mang lại nguồn sống trong lành!',
    cards: [
      {
        title: 'Dòng suối Nậm Rốm thân thương',
        description: 'Dòng suối Nậm Rốm uốn lượn quanh thung lũng Mường Thanh, cung cấp nước ngọt tưới tiêu cho những ruộng lúa xanh ngát.',
        audioText: 'Suối Nậm Rốm thân thương chảy hiền hòa qua cánh đồng Mường Thanh nuôi dưỡng cây lúa tốt tươi.',
        icon: '🌊',
      },
      {
        title: 'Thí nghiệm Vật nổi - Vật chìm',
        description: 'Thả chiếc lá khô nhẹ trôi bồng bềnh trên mặt nước (vật nổi), viên sỏi tròn lăn tăm rơi xuống đáy suối (vật chìm).',
        audioText: 'Lá cây khô nhẹ nên nổi bồng bềnh trên mặt nước, viên sỏi nặng hơn nên chìm xuống đáy.',
        icon: '⛵',
      },
      {
        title: 'Giữ gìn nguồn nước sạch',
        description: 'Không bao giờ ném rác, túi nilon xuống dòng suối; luôn tắt vòi nước sau khi rửa tay để tiết kiệm từng giọt nước quý.',
        audioText: 'Chúng mình cùng nhắc nhau không vứt rác xuống suối và luôn tiết kiệm từng giọt nước sạch.',
        icon: '🚰',
      },
    ],
    quickQuiz: {
      question: 'Vật nào sau đây khi thả vào chậu nước sẽ nổi bồng bềnh?',
      options: ['Chiếc lá khô', 'Viên sỏi đá to', 'Chìa khóa kim loại'],
      correctIndex: 0,
      explanation: 'Chính xác! Chiếc lá khô rất nhẹ nên nổi bồng bềnh như chiếc thuyền nhỏ trên mặt nước!',
    },
    steamPrompt: {
      title: 'Thí nghiệm thả thuyền giấy',
      description: 'Gấp những chiếc thuyền giấy nhỏ và cùng cô thả vào chậu nước xem chiếc thuyền nổi ra sao.',
    },
    relatedGameSlug: 'tim-duong-ve-ban',
  },
];

// 3 Storybooks for Kindergarten
export interface StoryBook {
  slug: string;
  title: string;
  summary: string;
  coverEmoji: string;
  theme: string;
  moralLesson: string;
  pages: {
    pageNumber: number;
    illustrationText: string;
    text: string;
    dialogue?: string;
  }[];
  questions: string[];
  extensionActivity: string;
}

export const SAMPLE_STORIES: StoryBook[] = [
  {
    slug: 'ban-nho-tim-mua-xuan',
    title: 'Bạn Ban Nhỏ Tìm Mùa Xuân',
    summary: 'Chuyến phiêu lưu đáng yêu của Bạn Ban Nhỏ thức dậy sau giấc ngủ đông để gọi mùa xuân về bản.',
    coverEmoji: '🌸',
    theme: 'Mùa xuân & Hoa ban Điện Biên',
    moralLesson: 'Niềm vui của sự sẻ chia và tình bạn ấm áp',
    pages: [
      {
        pageNumber: 1,
        illustrationText: 'Núi rừng Điện Biên còn mờ sương sớm, Bạn Ban Nhỏ cựa mình thức dậy trên cành cây cao.',
        text: 'Trên đỉnh đồi lộng gió ở xã Thanh Yên, có một nụ hoa ban bé xíu đang say giấc ngủ. Khi chú chim họa mi cất tiếng hót véo von, bạn mở to đôi mắt tròn xoe.',
        dialogue: 'Bạn Ban Nhỏ thì thầm: "Ôi, gió ấm đã thổi về rồi, mùa xuân đã đến bản làng chưa nhỉ?"',
      },
      {
        pageNumber: 2,
        illustrationText: 'Bạn Ban Nhỏ xòe năm cánh hoa trắng muốt đón tia nắng vàng rực rỡ.',
        text: 'Ông mặt trời từ từ nhô lên sau dãy núi xa, tỏa những tia nắng ấm áp xuống thung lũng. Bạn Ban Nhỏ sung sướng bung nở 5 cánh hoa trắng tinh khôi.',
        dialogue: 'Bạn Ban Nhỏ reo vui: "Nắng xuân ấm quá! Mình sẽ đi gọi các bạn hoa khác cùng nở nào!"',
      },
      {
        pageNumber: 3,
        illustrationText: 'Khắp các sườn đồi, hàng ngàn bông hoa ban cùng nhau bung nở, các em bé bản làng vui mừng múa xòe.',
        text: 'Nghe tiếng gọi của Bạn Ban Nhỏ, khắp núi rừng Điện Biên, muôn ngàn bông hoa ban trắng, hoa ban hồng đồng loạt bừng tỉnh. Cả bản làng như được khoác chiếc áo hoa lộng lẫy.',
        dialogue: 'Các bạn nhỏ lớp Lá reo hò: "Hoa ban nở rồi! Mùa xuân tươi đẹp đã về bản em rồi!"',
      },
      {
        pageNumber: 4,
        illustrationText: 'Bạn Ban Nhỏ mỉm cười giữa vòng tay yêu thương của cô giáo và các bé mầm non.',
        text: 'Bạn Ban Nhỏ bay xuống sân Trường Mầm non Thanh Yên, đậu trên tay cô giáo Lò Thị Phong. Cô và các bé cùng múa xòe hoa đón chào một năm học mới tràn ngập niềm vui và tiếng cười.',
        dialogue: 'Cô Phong mỉm cười: "Chào mùa xuân tươi đẹp, chúc các con luôn chăm ngoan, khỏe mạnh!"',
      },
    ],
    questions: [
      'Bạn Ban Nhỏ thức dậy nhờ tiếng hót của loài chim nào?',
      'Bông hoa ban của bạn có mấy cánh hoa và màu sắc thế nào?',
      'Khi hoa ban nở rộ, các bạn nhỏ ở trường mầm non đã làm gì?',
    ],
    extensionActivity: 'Bé vẽ Bạn Ban Nhỏ với 5 cánh hoa và đôi mắt cười thật tươi nhé!',
  },
  {
    slug: 'hat-lua-nho-muong-thanh',
    title: 'Hạt Lúa Nhỏ và Cánh Đồng Mường Thanh',
    summary: 'Hành trình từ hạt thóc nảy mầm thành bông lúa trĩu hạt mang lại bát cơm dẻo thơm.',
    coverEmoji: '🌾',
    theme: 'Cánh đồng & Lao động sản xuất',
    moralLesson: 'Biết ơn công sức của bác nông dân và trân quý hạt cơm',
    pages: [
      {
        pageNumber: 1,
        illustrationText: 'Một hạt thóc vàng nhỏ nằm ngoan ngoãn trong lòng đất mẹ màu mỡ ở cánh đồng Mường Thanh.',
        text: 'Nằm êm ái dưới lòng đất phù sa cánh đồng Mường Thanh, Hạt Lúa Nhỏ được tắm những giọt nước mát từ dòng suối Nậm Rốm. Hạt lúa khẽ vươn mình tách vỏ, nhú lên một chiếc mầm xanh biếc.',
        dialogue: 'Hạt Lúa Nhỏ nói: "Chào đất mẹ, con sẽ lớn thật nhanh để giúp ích cho đời!"',
      },
      {
        pageNumber: 2,
        illustrationText: 'Bác nông dân đang cấy lúa, chú trâu hiền thong dong trên bờ ruộng.',
        text: 'Mỗi ngày, bác nông dân ra đồng chăm sóc, bắt sâu, nhổ cỏ cho cây lúa. Dưới ánh nắng vàng rực rỡ và những cơn mưa rào, cây lúa lớn nhanh như thổi, phủ một màu xanh mướt mát khắp cánh đồng.',
        dialogue: 'Cây lúa rì rào: "Cảm ơn bác nông dân đã chăm sóc chúng cháu chu đáo!"',
      },
      {
        pageNumber: 3,
        illustrationText: 'Cả cánh đồng Mường Thanh ngả màu vàng ươm, bông lúa uốn cong trĩu hạt.',
        text: 'Thu sang, cánh đồng lúa chuyển sang màu vàng óng ả. Từng bông lúa uốn cong trĩu hạt, tỏa hương thơm ngào ngạt khắp không gian.',
        dialogue: 'Bác nông dân quệt mồ hôi cười rạng rỡ: "Năm nay lúa Mường Thanh lại được mùa to rồi bà con ơi!"',
      },
      {
        pageNumber: 4,
        illustrationText: 'Bát cơm trắng ngần bốc khói nghi ngút trên mâm cơm gia đình ấm cúng.',
        text: 'Hạt Lúa Nhỏ giờ đã hóa thành những hạt gạo Điện Biên trắng ngần, nấu thành bát cơm thơm dẻo cho các bé ăn ngon miệng. Bé nhớ ăn hết suất cơm và không để rơi vãi hạt nào nhé.',
        dialogue: 'Bé mầm non khoanh tay: "Con cảm ơn bác nông dân, cơm ngon và dẻo lắm ạ!"',
      },
    ],
    questions: [
      'Hạt Lúa Nhỏ được nuôi dưỡng nhờ dòng nước của suối nào?',
      'Khi chín, cánh đồng lúa Mường Thanh có màu gì?',
      'Vì sao khi ăn cơm, bé cần ăn hết suất và không làm rơi hạt cơm?',
    ],
    extensionActivity: 'Thử nghiệm sờ và ngửi hương thơm của hạt gạo Điện Biên tại góc khám phá.',
  },
  {
    slug: 'dong-suoi-biet-giu-sach',
    title: 'Dòng Suối Biết Giữ Sạch',
    summary: 'Bài học ý nghĩa về việc bảo vệ nguồn nước trong mát cho bản làng xanh tươi.',
    coverEmoji: '💧',
    theme: 'Môi trường & Dòng nước',
    moralLesson: 'Giữ gìn vệ sinh nguồn nước và môi trường sống',
    pages: [
      {
        pageNumber: 1,
        illustrationText: 'Dòng suối Nậm Rốm nước trong vắt, đàn cá tung tăng bơi lội dưới làn nước mát.',
        text: 'Từ ngọn núi cao, dòng suối Nậm Rốm chảy về bản làng róc rách vui tươi. Nước suối trong vắt nhìn thấy rõ từng hòn sỏi cuội tròn xoe và đàn cá nhỏ bơi lội tung tăng.',
        dialogue: 'Dòng suối cất tiếng hát: "Róc rách, róc rách, tôi mang nước mát đến cho muôn loài!"',
      },
      {
        pageNumber: 2,
        illustrationText: 'Một túi nilon ai đó vô ý vứt xuống suối khiến đàn cá con hoảng hốt bơi tránh.',
        text: 'Một hôm, có ai đó vô ý vứt một chiếc túi rác xuống dòng suối. Nước suối bị nghẽn lại, đàn cá con không có chỗ vui chơi, cây cỏ ven suối ủ rũ buồn bã.',
        dialogue: 'Chú cá nhỏ khóc: "Ai đã vứt rác làm dòng nước của chúng mình bị bẩn thế này?"',
      },
      {
        pageNumber: 3,
        illustrationText: 'Các bạn nhỏ lớp mầm non cầm kẹp rác cùng cô giáo nhặt sạch bờ suối.',
        text: 'Bạn Ban Nhỏ thấy vậy liền rủ các bạn nhỏ Trường Mầm non Thanh Yên cùng mang thùng rác ra. Các bé cẩn thận nhặt túi rác bỏ đúng nơi quy định, dòng nước lại được khơi thông trong lành.',
        dialogue: 'Các bé vui mừng: "Dòng suối sạch rồi! Đàn cá ơi ra bơi cùng chúng mình nhé!"',
      },
      {
        pageNumber: 4,
        illustrationText: 'Dòng suối lấp lánh ánh mặt trời, đôi bờ hoa nở rộ chào đón đàn bướm.',
        text: 'Dòng suối Nậm Rốm lại lấp lánh như dát bạc dưới ánh nắng. Các bé mầm non cùng nhau hứa sẽ luôn bảo vệ nguồn nước, không vứt rác bừa bãi và biết tiết kiệm nước mỗi ngày.',
        dialogue: 'Dòng suối reo vang: "Cảm ơn các bạn nhỏ Điện Biên ngoan ngoãn và đáng yêu!"',
      },
    ],
    questions: [
      'Điều gì đã làm dòng suối bị bẩn và buồn bã?',
      'Bạn Ban Nhỏ và các bạn học sinh đã làm gì để giúp dòng suối?',
      'Ở trường và ở nhà, con làm gì để tiết kiệm và bảo vệ nguồn nước sạch?',
    ],
    extensionActivity: 'Thực hành vặn vừa đủ vòi nước khi rửa tay và tắt vòi ngay sau khi rửa xong.',
  },
];

// 5 Hands-on Kindergarten STEAM Activities
export interface SteamActivity {
  id: string;
  title: string;
  icon: string;
  targetDomain: string;
  timeEstimate: string;
  objectives: string[];
  materials: string[];
  steps: {
    order: number;
    title: string;
    description: string;
  }[];
  guidingQuestions: string[];
  safetyNotes: string;
  alternativeMaterials: string;
}

export const STEAM_ACTIVITIES: SteamActivity[] = [
  {
    id: 'steam-1',
    title: 'Làm bông hoa ban bằng giấy mềm',
    icon: '🌸',
    targetDomain: 'Phát triển thẩm mỹ & vận động tinh',
    timeEstimate: '25-30 phút',
    objectives: [
      'Trẻ nhận biết hình dáng bông hoa ban 5 cánh.',
      'Rèn luyện sự khéo léo của các ngón tay qua thao tác gấp, miết và dán.',
      'Phát triển tính kiên nhẫn và cảm xúc thẩm mỹ.',
    ],
    materials: [
      'Giấy xốp màu trắng hoặc phớt hồng cắt sẵn thành hình cánh hoa.',
      'Giấy màu vàng làm nhụy hoa.',
      'Cành cây khô nhặt trong sân trường sạch sẽ.',
      'Hồ dán hoặc băng dính xốp 2 mặt, kéo an toàn mũi tròn.',
    ],
    steps: [
      {
        order: 1,
        title: 'Quan sát mẫu hoa ban',
        description: 'Cô cho trẻ đếm 5 cánh hoa và quan sát nhụy hoa vàng nhỏ xíu ở giữa.',
      },
      {
        order: 2,
        title: 'Gấp và tạo độ cong cánh hoa',
        description: 'Trẻ dùng ngón tay vuốt nhẹ mép cánh hoa giấy xốp để cánh hoa cong tự nhiên như hoa thật.',
      },
      {
        order: 3,
        title: 'Dán cánh hoa và gắn nhụy',
        description: 'Trẻ dán 5 cánh hoa xòe đều xung quanh nhụy hoa vàng.',
      },
      {
        order: 4,
        title: 'Đính hoa lên cành cây khô',
        description: 'Cùng cô đính các bông hoa ban lên cành cây khô để tạo thành một cành hoa ban mùa xuân.',
      },
    ],
    guidingQuestions: [
      'Con thấy cánh hoa ban của con có màu gì? Con đã đếm đủ 5 cánh chưa?',
      'Khi dán cánh hoa, con dán xòe tròn như thế nào cho đẹp?',
      'Con muốn đặt cành hoa ban này ở góc nào trong lớp chúng mình?',
    ],
    safetyNotes: 'Sử dụng kéo an toàn đầu tròn dưới sự hướng dẫn của cô, không ngậm hồ dán vào miệng.',
    alternativeMaterials: 'Có thể thay thế giấy xốp bằng giấy ăn mềm, vải vụn hoặc đĩa giấy tái chế.',
  },
  {
    id: 'steam-2',
    title: 'Thiết kế mô hình bản làng bằng hộp giấy tái chế',
    icon: '🏡',
    targetDomain: 'Phát triển nhận thức & tư duy không gian',
    timeEstimate: '35 phút',
    objectives: [
      'Trẻ nhận biết các hình khối: khối chữ nhật (thân nhà), khối tam giác (mái nhà), hình trụ (cột nhà).',
      'Phát triển trí tưởng tượng về không gian bản làng Điện Biên với nhà sàn, cây xanh và đường đi.',
      'Giáo dục ý thức tái sử dụng vỏ hộp sữa để bảo vệ môi trường.',
    ],
    materials: [
      'Vỏ hộp sữa giấy đã rửa sạch phơi khô.',
      'Que kem gỗ hoặc ống hút giấy làm cột nhà sàn.',
      'Bìa các-tông gấp đôi làm mái nhà hình tam giác.',
      'Sáp màu, hồ dán, đất nặn nặn thêm cây xanh và hoa.',
    ],
    steps: [
      {
        order: 1,
        title: 'Tạo thân và mái nhà sàn',
        description: 'Dán bìa các-tông gập tam giác lên phía trên vỏ hộp sữa để tạo thành mái nhà.',
      },
      {
        order: 2,
        title: 'Gắn cột nhà nâng cao sàn',
        description: 'Dán 4 que gỗ ở 4 góc để nâng ngôi nhà cao khỏi mặt đất theo đúng kiểu nhà sàn.',
      },
      {
        order: 3,
        title: 'Vẽ trang trí khau cút và hoa văn',
        description: 'Dùng bút sáp vẽ hai thanh khau cút chữ X trên nóc nhà và cửa sổ nhỏ xinh.',
      },
      {
        order: 4,
        title: 'Xếp đặt bản làng em',
        description: 'Cả nhóm ghép các ngôi nhà lại cùng các chậu cây nặn bằng đất để tạo thành mô hình bản làng Thanh Yên.',
      },
    ],
    guidingQuestions: [
      'Mái nhà sàn của con có dạng hình khối gì?',
      'Vì sao nhà sàn lại có 4 chiếc cột chống cao thế này?',
      'Con thấy bản làng của chúng mình cùng nhau xây dựng có đẹp không?',
    ],
    safetyNotes: 'Vỏ hộp sữa phải được khử trùng sạch sẽ và để khô hoàn toàn trước khi cho trẻ thao tác.',
    alternativeMaterials: 'Hộp bánh quy, hộp trà nhỏ hoặc các khối gỗ xây dựng đồ chơi có sẵn trong lớp.',
  },
  {
    id: 'steam-3',
    title: 'Khám phá Vật nổi – Vật chìm bên dòng suối',
    icon: '⛵',
    targetDomain: 'Phát triển nhận thức & khoa học khám phá',
    timeEstimate: '25 phút',
    objectives: [
      'Trẻ nhận biết và phân biệt được vật nào nổi, vật nào chìm trong nước.',
      'Khơi gợi tính tò mò, khám phá và đưa ra dự đoán trước khi làm thí nghiệm.',
      'Học kỹ năng diễn đạt kết quả quan sát khoa học đơn giản.',
    ],
    materials: [
      'Chậu nước sạch trong suốt.',
      'Các đồ vật tự nhiên: lá cây khô, cành củi nhỏ, viên sỏi suối, quả thông, nắp chai nhựa, thuyền giấy.',
      'Khay đựng phân loại: Khay "Vật nổi" (dán hình đám mây) và Khay "Vật chìm" (dán hình đáy biển).',
    ],
    steps: [
      {
        order: 1,
        title: 'Quan sát và dự đoán',
        description: 'Cô cầm chiếc lá và viên sỏi, hỏi trẻ: "Đố các con khi thả vào nước, bạn nào sẽ bơi nổi, bạn nào sẽ chìm xuống?"',
      },
      {
        order: 2,
        title: 'Trẻ tự tay thực hành thả vật',
        description: 'Từng bé nhẹ nhàng thả một vật vào chậu nước và reo lên khi quan sát hiện tượng xảy ra.',
      },
      {
        order: 3,
        title: 'Vớt vật và phân loại vào 2 khay',
        description: 'Trẻ dùng kẹp vớt lá (vật nổi) để vào khay mây, vớt sỏi (vật chìm) để vào khay đáy nước.',
      },
      {
        order: 4,
        title: 'Tổng kết và bài học giữ sạch suối',
        description: 'Cô giải thích ngắn: vật nhẹ hơn nước sẽ nổi, vật nặng hơn nước sẽ chìm. Dặn dò không vứt đồ chìm hay rác nổi xuống làm nghẽn dòng suối quê hương.',
      },
    ],
    guidingQuestions: [
      'Vì sao viên sỏi lại chìm xuống đáy chậu vậy con?',
      'Chiếc thuyền giấy bồng bềnh trên mặt nước giống gì?',
      'Nếu nhiều rác bị vứt xuống suối thì điều gì sẽ xảy ra?',
    ],
    safetyNotes: 'Không cho trẻ nghịch té nước vào mắt bạn, lau khô sàn nhà sau khi hoàn thành để tránh trơn trượt.',
    alternativeMaterials: 'Có thể dùng đồ chơi nhựa, nút chai bấc, thìa inox có sẵn trong góc học tập.',
  },
  {
    id: 'steam-4',
    title: 'Gieo hạt mầm lúa và sổ nhật ký mầm xanh',
    icon: '🌱',
    targetDomain: 'Phát triển nhận thức & tình cảm với thiên nhiên',
    timeEstimate: '20 phút thực hành + 5 ngày quan sát',
    objectives: [
      'Trẻ biết cây lúa nảy mầm từ hạt thóc nhờ có đất ẩm, nước và ánh nắng.',
      'Hình thành thói quen chăm sóc cây và quan sát sự lớn lên mỗi ngày.',
      'Biết trân trọng mầm sống của thiên nhiên Điện Biên.',
    ],
    materials: [
      'Hạt thóc giống nếp nương Điện Biên đã ngâm nước ấm qua đêm.',
      'Cốc giấy hoặc vỏ trứng sạch làm chậu gieo.',
      'Bông y tế hoặc đất dinh dưỡng tơi xốp.',
      'Bình xịt nước tia nhỏ, giấy vẽ ghi nhật ký nảy mầm.',
    ],
    steps: [
      {
        order: 1,
        title: 'Chuẩn bị ổ ấm cho hạt thóc',
        description: 'Trẻ lót một lớp bông gòn mềm mại vào đáy cốc giấy và xịt một chút nước ẩm.',
      },
      {
        order: 2,
        title: 'Gieo hạt thóc vào chậu',
        description: 'Mỗi trẻ đếm 5 hạt thóc đặt đều lên lớp bông ẩm.',
      },
      {
        order: 3,
        title: 'Đặt ở nơi có ánh nắng dịu',
        description: 'Mang chậu cây ra góc thiên nhiên ngoài hành lang lớp học có ánh nắng ấm.',
      },
      {
        order: 4,
        title: 'Theo dõi và vẽ nhật ký hàng ngày',
        description: 'Mỗi ngày đến lớp, trẻ tưới 1 giọt nước và cùng cô quan sát chiếc mầm trắng nhú ra rồi chuyển thành lá mạ xanh.',
      },
    ],
    guidingQuestions: [
      'Con thấy hạt thóc cần những điều kiện gì để nảy mầm thành cây?',
      'Chiếc mầm nhỏ có màu gì vào ngày đầu tiên? Sang ngày thứ ba thì sao?',
      'Khi chăm sóc cây mỗi ngày, con cảm thấy như thế nào?',
    ],
    safetyNotes: 'Dặn trẻ rửa tay bằng xà phòng sau khi chạm vào đất và hạt mầm.',
    alternativeMaterials: 'Có thể thay hạt thóc bằng hạt đỗ xanh, đỗ đen rất nhanh nảy mầm.',
  },
  {
    id: 'steam-5',
    title: 'Tranh cánh đồng Mường Thanh bằng vật liệu tái sử dụng',
    icon: '🎨',
    targetDomain: 'Phát triển thẩm mỹ & khéo léo',
    timeEstimate: '30-35 phút',
    objectives: [
      'Trẻ phối hợp các chất liệu: hạt gạo, lá cây khô, len thừa để tạo bức tranh cánh đồng mùa lúa chín.',
      'Biết sắp xếp bố cục: bầu trời phía trên, núi xanh ở giữa, ruộng bậc thang lúa vàng ở dưới.',
      'Khơi dậy niềm tự hào về vẻ đẹp trù phú của quê hương Điện Biên.',
    ],
    materials: [
      'Giấy bìa các-tông A4 cứng cáp.',
      'Hạt gạo trắng và hạt gạo đã nhuộm màu thực phẩm vàng nghệ.',
      'Lá cây khô rụng trong sân trường, len sợi vụn màu xanh lá.',
      'Keo sữa hoặc keo dán an toàn, cọ quét keo nhỏ.',
    ],
    steps: [
      {
        order: 1,
        title: 'Vẽ phác thảo các dải ruộng',
        description: 'Cô hướng dẫn trẻ dùng bút chì màu vẽ các đường lượn sóng tượng trưng cho ruộng lúa Mường Thanh.',
      },
      {
        order: 2,
        title: 'Quét keo và rắc hạt gạo vàng',
        description: 'Trẻ quét keo vào dải ruộng và rắc đều những hạt gạo vàng thơm tạo thành cánh đồng lúa chín.',
      },
      {
        order: 3,
        title: 'Dán dãy núi và đám mây',
        description: 'Dán những chiếc lá cây khô hình tam giác làm dãy núi xa và bông gòn trắng làm mây trời.',
      },
      {
        order: 4,
        title: 'Trưng bày triển lãm góc lớp',
        description: 'Cùng nhau đặt tên cho bức tranh và chia sẻ với các bạn về cánh đồng quê em.',
      },
    ],
    guidingQuestions: [
      'Cánh đồng trong tranh của con lúc này là mùa lúa chín hay lúa non?',
      'Con đã dùng những vật liệu gì để tạo nên bức tranh này?',
      'Con sẽ tặng bức tranh này cho ai khi mang về nhà?',
    ],
    safetyNotes: 'Nhắc trẻ không cho hạt gạo vào mũi, tai hay miệng khi làm tranh.',
    alternativeMaterials: 'Vỏ trấu, hạt đỗ vàng, giấy báo cũ xé vụn hoặc cát màu.',
  },
];
