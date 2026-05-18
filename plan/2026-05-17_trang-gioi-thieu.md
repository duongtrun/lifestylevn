# 📋 Kế Hoạch Xây Dựng Trang Giới Thiệu (`/gioi-thieu`)

> **Ngày tạo:** 2026-05-17 15:20  
> **Cập nhật lần cuối:** 2026-05-17 15:20  
> **Trạng thái:** ⏳ Chờ duyệt  
> **Người yêu cầu:** Mr. Đào

---

## 🗺️ Tổng quan cấu trúc trang (từ trên xuống dưới theo thiết kế)

```
┌──────────────────────────────────────────┐
│  1. Hero Banner — "VỀ CHÚNG TÔI"        │
│     (ảnh nền nhóm người đang họp)        │
├──────────────────────────────────────────┤
│  2. About Section ♻️ TÁI SỬ DỤNG        │
│     (Logo Lifestyle + mô tả công ty)     │
├──────────────────────────────────────────┤
│  3. Timeline / Cột mốc phát triển       │
│     2021 → 2024 → 2025                  │
├──────────────────────────────────────────┤
│  4. Thành tựu đạt được ♻️ TÁI SỬ DỤNG   │
│     (Băng chuyền ảnh thành tựu)          │
├──────────────────────────────────────────┤
│  5. Giá trị cốt lõi                     │
│     (Lưới hình lục giác / tổ ong)        │
├──────────────────────────────────────────┤
│  6. Tầm nhìn, Sứ mệnh & Triết lý       │
│     (Zigzag layout ảnh + text)           │
├──────────────────────────────────────────┤
│  7. Hệ sinh thái + Đội ngũ lãnh đạo    │
│     + CTA cuối trang                     │
└──────────────────────────────────────────┘
```

---

## ♻️ Component tái sử dụng được

| Component hiện có | Dùng ở trang Giới thiệu | Cần sửa gì? |
|---|---|---|
| `AboutSection.tsx` | Section 2 — Logo + mô tả công ty | Không sửa, dùng nguyên |
| `AchievementSection.tsx` | Section 4 — Băng chuyền thành tựu | Không sửa, dùng nguyên |

---

## 📦 Chi tiết từng Scope

### Scope 1 — Tạo route + Hero Banner
**Mục tiêu:** Tạo trang `/gioi-thieu` và phần Banner đầu tiên

**File tạo/sửa:**
- `[NEW]` `src/app/gioi-thieu/page.tsx` — File trang chính
- `[NEW]` `src/components/about/AboutHero.tsx` — Banner "VỀ CHÚNG TÔI"

**Nội dung:**
- Ảnh nền toàn màn hình (placeholder trước, anh thay sau)
- Chữ "VỀ CHÚNG TÔI" to, trắng, canh giữa
- Breadcrumb nhỏ: Trang chủ > Giới thiệu

---

### Scope 2 — Ghép About + Timeline
**Mục tiêu:** Ghép phần Giới thiệu công ty (tái sử dụng) + Dòng thời gian cột mốc

**File tạo/sửa:**
- `[MODIFY]` `src/app/gioi-thieu/page.tsx` — Thêm 2 section
- `[NEW]` `src/components/about/TimelineSection.tsx` — Dòng thời gian

**Nội dung Timeline (từ thiết kế):**
- **2021:** Thành lập công ty / khởi đầu hành trình
- **2024:** Mở rộng hệ sinh thái / mốc phát triển
- **2025:** Tầm nhìn / mục tiêu hiện tại
- Thiết kế: Đường dọc ở giữa, các mốc xen kẽ trái-phải, animation cuộn

---

### Scope 3 — Ghép Achievement (tái sử dụng)
**Mục tiêu:** Đưa phần Thành tựu đạt được vào trang

**File tạo/sửa:**
- `[MODIFY]` `src/app/gioi-thieu/page.tsx` — Import `AchievementSection`

**Nội dung:** Dùng nguyên component băng chuyền đã có.

---

### Scope 4 — Giá trị cốt lõi (Hexagonal Grid)
**Mục tiêu:** Lưới hình lục giác hiển thị các giá trị cốt lõi

**File tạo/sửa:**
- `[NEW]` `src/components/about/CoreValuesSection.tsx`

**Nội dung (từ thiết kế):**
- Các ô hình lục giác xếp kiểu tổ ong
- Mỗi ô: icon + tiêu đề giá trị (VD: "Chất lượng", "Đổi mới", "An toàn"...)
- Nền ảnh phong cảnh thiên nhiên phía sau

---

### Scope 5 — Tầm nhìn, Sứ mệnh & Triết lý kinh doanh
**Mục tiêu:** Section trình bày 3 khối: Tầm nhìn / Sứ mệnh / Triết lý

**File tạo/sửa:**
- `[NEW]` `src/components/about/VisionMissionSection.tsx`

**Nội dung:**
- 3 khối zigzag (ảnh xen kẽ trái/phải) + text mô tả
- Tone màu xanh + nâu chủ đạo

---

### Scope 6 — Hệ sinh thái + Đội ngũ lãnh đạo
**Mục tiêu:** Giới thiệu hệ sinh thái + Đội ngũ

**File tạo/sửa:**
- `[NEW]` `src/components/about/LeadershipSection.tsx` — Thẻ nhân sự
- `[MODIFY]` `src/app/gioi-thieu/page.tsx` — Ghép thêm sections

**Nội dung:**
- Hệ sinh thái: Tái sử dụng hoặc biến thể đơn giản
- Đội ngũ: Grid thẻ (ảnh + tên + chức danh)

---

### Scope 7 — CTA cuối trang + Kết nối Header
**Mục tiêu:** Phần kết thúc trang + đảm bảo menu link đúng

**File tạo/sửa:**
- `[NEW]` `src/components/about/AboutCTA.tsx` — Logo lớn + slogan + nút
- `[VERIFY]` `src/components/layout/Header.tsx` — Kiểm tra link `/gioi-thieu`

---

## 📁 Tổng hợp file sẽ tạo mới

| File | Scope | Vai trò |
|---|---|---|
| `src/app/gioi-thieu/page.tsx` | 1 | Trang chính, ghép các section |
| `src/components/about/AboutHero.tsx` | 1 | Banner "Về chúng tôi" |
| `src/components/about/TimelineSection.tsx` | 2 | Dòng thời gian 2021→2025 |
| `src/components/about/CoreValuesSection.tsx` | 4 | Lưới giá trị cốt lõi |
| `src/components/about/VisionMissionSection.tsx` | 5 | Tầm nhìn, Sứ mệnh |
| `src/components/about/LeadershipSection.tsx` | 6 | Đội ngũ lãnh đạo |
| `src/components/about/AboutCTA.tsx` | 7 | CTA kết thúc trang |

---

## ❓ Câu hỏi cần anh trả lời trước khi bắt đầu

1. Nội dung mốc **2021, 2024, 2025** — anh có sẵn chưa hay em viết tạm?
2. Tên cụ thể các **giá trị cốt lõi** (trong mấy ô lục giác) là gì?
3. Thông tin **đội ngũ lãnh đạo** (tên, chức danh, ảnh) — anh có sẵn hay em placeholder?
