-- ====================================================================
-- CƠ SỞ DỮ LIỆU ỨNG DỤNG "AI BẢN LÀNG EM" (2026-2027)
-- Giáo viên: Lò Thị Phong - Trường Mầm non Thanh Yên, Điện Biên
-- Tuân thủ: Luật Trẻ em 2016 & Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân
-- ====================================================================

-- 1. BẢNG HỒ SƠ GIÁO VIÊN (Không lưu căn cước, số điện thoại riêng tư công khai)
CREATE TABLE IF NOT EXISTS teacher_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE, -- Liên kết với Supabase Auth
    full_name VARCHAR(120) NOT NULL DEFAULT 'Lò Thị Phong',
    school_name VARCHAR(255) NOT NULL DEFAULT 'Trường Mầm non Thanh Yên',
    district VARCHAR(100) NOT NULL DEFAULT 'Huyện Điện Biên',
    province VARCHAR(100) NOT NULL DEFAULT 'Tỉnh Điện Biên',
    academic_year VARCHAR(20) NOT NULL DEFAULT '2026-2027',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BẢNG LỚP HỌC MẦM NON
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
    class_name VARCHAR(100) NOT NULL DEFAULT 'Lớp Mẫu giáo Lớn A1 (5-6 tuổi)',
    age_group VARCHAR(50) NOT NULL DEFAULT '5-6 tuổi',
    total_learners INT DEFAULT 25,
    academic_year VARCHAR(20) DEFAULT '2026-2027',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BẢNG MÃ ĐỊNH DANH TRẺ (QUY TẮC BẢO VỆ DỮ LIỆU: ZERO-PII)
-- TUYỆT ĐỐI KHÔNG LƯU: Tên thật đầy đủ, ngày sinh chi tiết, địa chỉ nhà, số CCCD, khuôn mặt
CREATE TABLE IF NOT EXISTS learner_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    anonymous_code VARCHAR(20) NOT NULL, -- Ví dụ: "Bé 01", "Bé 02", "Bé 03"
    group_name VARCHAR(50) DEFAULT 'Nhóm Hoa Ban',
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_learner_in_class UNIQUE (class_id, anonymous_code)
);

-- 4. BẢNG HOẠT ĐỘNG GIÁO DỤC (KẾ HOẠCH BÀI DẠY / KHÁM PHÁ)
CREATE TABLE IF NOT EXISTS learning_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(100) NOT NULL, -- Nhận thức, Thẩm mỹ, Ngôn ngữ, Thể chất, Tình cảm - Kỹ năng xã hội
    topic VARCHAR(150) NOT NULL,
    duration VARCHAR(50) DEFAULT '30-35 phút',
    objectives JSONB,
    preparation JSONB,
    main_steps JSONB,
    status VARCHAR(30) DEFAULT 'draft', -- 'draft', 'approved', 'published', 'archived'
    is_ai_assisted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BẢNG PHIÊN CHƠI & HOÀN THÀNH NHIỆM VỤ (CHỈ GHI LƯỢT CHƠI VÀ SAO KHÍCH LỆ)
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_slug VARCHAR(100) NOT NULL,
    learner_code_id UUID REFERENCES learner_codes(id) ON DELETE SET NULL,
    stars_earned INT DEFAULT 1,
    difficulty VARCHAR(20) DEFAULT 'medium',
    played_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BẢNG QUAN SÁT SỰ PHÁT TRIỂN CỦA TRẺ (5 LĨNH VỰC BỘ GD&ĐT)
CREATE TABLE IF NOT EXISTS teacher_observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
    learner_code_id UUID REFERENCES learner_codes(id) ON DELETE CASCADE,
    observation_date DATE DEFAULT CURRENT_DATE,
    domain VARCHAR(100) NOT NULL,
    status_rating VARCHAR(50) NOT NULL, -- 'can_ho_tro', 'dang_phat_trien', 'the_hien_doc_lap'
    teacher_note TEXT,
    pedagogical_adjustment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BẢNG TRUYỆN KỂ VÀ HỌC LIỆU XUẤT BẢN
CREATE TABLE IF NOT EXISTS published_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    cover_image_url TEXT,
    summary TEXT,
    content_pages JSONB NOT NULL,
    reflection_questions JSONB,
    extension_activity TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BẢNG BẢN NHÁP VÀ TRUY VẤN AI (LƯU LỊCH SỬ TẠO GIÁO ÁN/TRUYỆN/CÂU HỎI)
CREATE TABLE IF NOT EXISTS ai_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
    draft_type VARCHAR(50) NOT NULL, -- 'lesson_plan', 'story', 'quiz', 'feedback'
    input_prompt JSONB NOT NULL,
    output_result JSONB NOT NULL,
    status VARCHAR(30) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BẢNG MINH CHỨNG THỰC TẾ & BÁO CÁO DỰ THI
CREATE TABLE IF NOT EXISTS evidence_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE,
    record_date DATE DEFAULT CURRENT_DATE,
    activity_name VARCHAR(255) NOT NULL,
    attendees_count INT DEFAULT 0,
    active_participants_count INT DEFAULT 0,
    notes TEXT,
    evidence_type VARCHAR(50) DEFAULT 'activity_log',
    is_verified BOOLEAN DEFAULT TRUE,
    data_classification VARCHAR(30) DEFAULT 'verified_data', -- 'verified_data', 'simulation_demo'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BẢNG NHẬT KÝ KIỂM TOÁN AN NINH (AUDIT LOGS)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action_type VARCHAR(100) NOT NULL,
    details JSONB,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KÍCH HOẠT ROW LEVEL SECURITY (RLS) TRÊN TẤT CẢ CÁC BẢNG
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE published_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- POLICIES: Giáo viên chỉ có thể xem và chỉnh sửa dữ liệu thuộc về tài khoản của mình
CREATE POLICY teacher_profiles_policy ON teacher_profiles
    FOR ALL USING (auth_user_id = auth.uid());

CREATE POLICY learning_activities_policy ON learning_activities
    FOR ALL USING (teacher_id IN (SELECT id FROM teacher_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY published_stories_public_read ON published_stories
    FOR SELECT USING (is_published = true);
