# 📋 Kế Hoạch Xây Dựng Trang Babego (`/he-sinh-thai/babego`)

> **Ngày tạo:** 2026-05-18 13:45  
> **Trạng thái:** ⏳ Chờ duyệt  
> **Người yêu cầu:** Mr. Đào

---

## 🎨 Phân tích bố cục trang từ thiết kế (ảnh)

Trang Babego có **tông màu xanh lá cây** chủ đạo, thiên nhiên, tươi tắn. Bố cục từ trên xuống gồm **8 section chính**:

```
┌──────────────────────────────────────────┐
│  1. HERO BANNER                          │
│     Nền lá cây xanh, mascot Babego giữa │
│     Logo "BABEGO" + tagline              │
│     Sản phẩm sữa xung quanh             │
│     Các badge: FOS, OPO, KẼM, CANXI...  │
├──────────────────────────────────────────┤
│  2. CÂU CHUYỆN THƯƠNG HIỆU              │
│     Khung trắng bo tròn đè lên banner   │
│     Logo Babego + text giới thiệu        │
├──────────────────────────────────────────┤
│  3. RA ĐỜI BABEGO (Timeline)            │
│     Mốc 2019 bên trái + 2023 bên phải   │
│     Ảnh sản phẩm + text giải thích       │
├──────────────────────────────────────────┤
│  4. THÀNH TỰU VÀ GIẢI THƯỞNG            │
│     Timeline ngang: 2021 → 2022 → 2023  │
│     → 2024 với chấm tròn + mô tả        │
├──────────────────────────────────────────┤
│  5. SẢN PHẨM NỔI BẬT (2 khối zigzag)   │
│     Khối 1: Ảnh trái + text phải         │
│     Khối 2: Text trái + ảnh phải         │
├──────────────────────────────────────────┤
│  6. LỢI THẾ CẠNH TRANH                  │
│     Grid 6 thẻ (icon + tiêu đề + mô tả) │
├──────────────────────────────────────────┤
│  7. TẦM NHÌN, SỨ MỆNH & CAM KẾT        │
│     Tabs chuyển đổi (kế thừa EDU/CARE)  │
│     Ảnh nền + overlay + text trắng       │
├──────────────────────────────────────────┤
│  8. SLOGAN CUỐI TRANG                    │
│     Khung viền vẽ tay + Logo Babego      │
│     + câu slogan cảm xúc                │
└──────────────────────────────────────────┘
```

---

## 🎨 Bảng màu chủ đạo Babego

| Tên | Mã màu | Dùng ở đâu |
|---|---|---|
| **Xanh lá đậm** | `#2D7A3A` hoặc `#1B5E20` | Nền hero, tiêu đề chính |
| **Xanh lá sáng** | `#4CAF50` hoặc `#66BB6A` | Button, accent, badge |
| **Vàng ấm** | `#FFB300` hoặc `#F9A825` | Highlight, logo text |
| **Trắng** | `#FFFFFF` | Nền section, chữ trên nền tối |
| **Xám đậm** | `#333333` | Body text |

> ⚠️ **Lưu ý:** Cần anh xác nhận mã màu chính xác — em đang ước lượng từ ảnh thiết kế.

---

## ♻️ Component kế thừa được từ Iruka EDU / Iruka Care

| Component gốc | Dùng cho Babego | Cần thay đổi gì |
|---|---|---|
| `IrukaEduHero.tsx` | **BabegoHero** | Đổi ảnh nền, mascot, màu xanh lá, thêm badge sản phẩm |
| `IrukaEduHero.tsx` (phần câu chuyện) | **BabegoStory** | Đổi nội dung text, giữ nguyên layout khung trắng đè lên banner |
| `IrukaCareProduct.tsx` | **BabegoTimeline** | Đổi từ dọc sang ngang, thay nội dung mốc thời gian |
| `IrukaEduAbout.tsx` | **BabegoProduct** | Kế thừa layout zigzag (ảnh trái-text phải, đổi bên) |
| `IrukaCarePotential.tsx` | **BabegoAdvantage** | Đổi thành grid 6 thẻ, thay màu xanh lá |
| `IrukaEduMission.tsx` / `IrukaCareMission.tsx` | **BabegoMission** | Kế thừa nguyên layout tabs, đổi nội dung + màu |
| `IrukaEduSlogan.tsx` / `IrukaCareSlogan.tsx` | **BabegoSlogan** | Đổi logo, text, giữ layout khung viền |

---

## 📦 Chi tiết từng Scope

### Scope 1 — Tạo route + Hero Banner + Câu chuyện thương hiệu
**Mục tiêu:** Tạo trang `/he-sinh-thai/babego` và 2 phần đầu tiên

**File tạo/sửa:**
- `[NEW]` `src/app/he-sinh-thai/babego/page.tsx` — File trang chính
- `[NEW]` `src/components/babego/BabegoHero.tsx` — Hero Banner + Câu chuyện

**Chi tiết thiết kế Hero:**
- Nền: Ảnh lá cây xanh gradient (cần file `banner_babego.svg` hoặc placeholder)
- Giữa: Mascot Babego (chú bò sữa/nhân vật hoạt hình) + logo "BABEGO"
- Xung quanh: Các hộp sữa sản phẩm
- Góc: Các badge nhỏ (FOS, OPO, KẼM, CANXI ĐA TỰ NHIÊN)
- Tagline: "DINH DƯỠNG CHO BÉ YÊU, VỮNG BƯỚC TƯƠNG LAI"
- Phía dưới đè lên: Khung trắng bo tròn "Câu chuyện thương hiệu" (kế thừa layout từ IrukaEduHero)

**Kế thừa từ:** `IrukaEduHero.tsx` — giữ nguyên cấu trúc banner + khung trắng đè lên

---

### Scope 2 — Ra đời Babego (Timeline dọc)
**Mục tiêu:** Section hiển thị 2 cột mốc lớn: 2019 (khởi đầu) và 2023 (phát triển)

**File tạo/sửa:**
- `[NEW]` `src/components/babego/BabegoOrigin.tsx`

**Chi tiết thiết kế:**
- Mốc **2019** bên trái: Ảnh sản phẩm Babego + text giải thích ra đời
- Mốc **2023** bên phải: Ảnh sản phẩm mới + text phát triển
- Đường kẻ dọc ở giữa nối 2 mốc
- Ảnh sản phẩm góc trên bên phải (background trang trí)

**Kế thừa từ:** Layout mới, tham khảo `IrukaCareProduct.tsx` cho timeline dọc

---

### Scope 3 — Thành tựu và Giải thưởng (Timeline ngang)
**Mục tiêu:** Dải timeline ngang hiển thị thành tựu qua các năm

**File tạo/sửa:**
- `[NEW]` `src/components/babego/BabegoAchievement.tsx`

**Chi tiết thiết kế (từ ảnh):**
- Thanh timeline ngang với 4 mốc: **2021 → 2022 → 2023 → 2024**
- Mỗi mốc: Chấm tròn + năm + mô tả ngắn bên dưới
- Nền trắng, chữ xám đậm

**Nội dung (cần anh xác nhận):**
- 2021: ?
- 2022: ?
- 2023: ?
- 2024: ?

---

### Scope 4 — Sản phẩm nổi bật (2 khối zigzag)
**Mục tiêu:** Giới thiệu 2 dòng sản phẩm chính với layout xen kẽ

**File tạo/sửa:**
- `[NEW]` `src/components/babego/BabegoProduct.tsx`

**Chi tiết thiết kế:**
- **Khối 1:** Ảnh sản phẩm (hộp sữa Babego) bên trái + text mô tả bên phải
  - Tiêu đề: "Babego – Cốm bổ sung dưỡng chất cho bé"
  - Nội dung: Mô tả công dụng, thành phần
- **Khối 2:** Text mô tả bên trái + ảnh sản phẩm bên phải
  - Tiêu đề: "Hướng tới – Cá nhân hoá dinh dưỡng cho bé"
  - Nội dung: Mô tả chiến lược phát triển

**Kế thừa từ:** `IrukaEduAbout.tsx` — layout zigzag (mascot trái + text phải, rồi đổi bên)

---

### Scope 5 — Lợi thế cạnh tranh
**Mục tiêu:** Grid hiển thị 6 lợi thế cạnh tranh của Babego

**File tạo/sửa:**
- `[NEW]` `src/components/babego/BabegoAdvantage.tsx`

**Chi tiết thiết kế (từ ảnh):**
- Tiêu đề nền xanh lá bám sát lề trái: "Lợi thế cạnh tranh của Babego"
- 6 thẻ xếp dạng grid (3 cột × 2 hàng trên desktop, 1 cột trên mobile)
- Mỗi thẻ: Icon + tiêu đề + mô tả ngắn
- Nền trắng, viền nhẹ, shadow khi hover

**Nội dung 6 thẻ (cần anh xác nhận):**
1. Thị trường lớn, nhu cầu cao
2. Sản phẩm đạt chuẩn quốc tế
3. Công nghệ nano & sinh học
4. Hệ thống phân phối rộng
5. Đội ngũ R&D mạnh
6. Hệ sinh thái hỗ trợ lẫn nhau

**Kế thừa từ:** `IrukaCarePotential.tsx` — đổi từ 5 thẻ viền sang 6 thẻ grid

---

### Scope 6 — Tầm nhìn, Sứ mệnh & Cam kết
**Mục tiêu:** Section tabs chuyển đổi nội dung (giống EDU/CARE)

**File tạo/sửa:**
- `[NEW]` `src/components/babego/BabegoMission.tsx`

**Chi tiết thiết kế:**
- Tiêu đề: "Tầm nhìn, sứ mệnh & Cam kết của Babego"
- 3 tab: Tầm nhìn | Sứ mệnh | Cam kết của iruKa
- Ảnh nền + overlay gradient tối + text trắng (kế thừa EDU/CARE)
- Khối trang trí xanh lá 2 bên (thay vì xanh dương của EDU)

**Kế thừa từ:** `IrukaEduMission.tsx` — **gần như nguyên xi**, chỉ đổi:
- Nội dung text 3 tab
- Ảnh nền 3 tab
- Màu khối trang trí: `#2D7A3A` thay `#008BBD`

---

### Scope 7 — Slogan cuối trang
**Mục tiêu:** Khung slogan kết thúc trang

**File tạo/sửa:**
- `[NEW]` `src/components/babego/BabegoSlogan.tsx`

**Chi tiết thiết kế:**
- Logo Babego ở giữa
- Tiêu đề: "VINH DƯỢC – ĐỐI TÁC UY TÍN – DỊCH VỤ TỐT NHẤT"
- Text phụ: "Giải cứu mẹ" + năm
- Khung viền vẽ tay (kế thừa layout Slogan của EDU/CARE)

**Kế thừa từ:** `IrukaCareSlogan.tsx` — đổi logo, text, giữ layout

---

### Scope 8 — Tạo thư mục ảnh + Kết nối Header
**Mục tiêu:** Chuẩn bị tài nguyên và kiểm tra điều hướng

**File tạo/sửa:**
- `[NEW]` `public/img_babego/` — Thư mục chứa ảnh Babego
- `[VERIFY]` `src/components/layout/Header.tsx` — Kiểm tra link `/he-sinh-thai/babego`

---

## 📁 Tổng hợp file sẽ tạo mới

| File | Scope | Vai trò | Kế thừa từ |
|---|---|---|---|
| `src/app/he-sinh-thai/babego/page.tsx` | 1 | Trang chính | — |
| `src/components/babego/BabegoHero.tsx` | 1 | Hero Banner + Câu chuyện | `IrukaEduHero` |
| `src/components/babego/BabegoOrigin.tsx` | 2 | Ra đời Babego (2019→2023) | Mới |
| `src/components/babego/BabegoAchievement.tsx` | 3 | Timeline thành tựu ngang | Mới |
| `src/components/babego/BabegoProduct.tsx` | 4 | 2 khối zigzag sản phẩm | `IrukaEduAbout` |
| `src/components/babego/BabegoAdvantage.tsx` | 5 | Grid 6 lợi thế cạnh tranh | `IrukaCarePotential` |
| `src/components/babego/BabegoMission.tsx` | 6 | Tabs Tầm nhìn/Sứ mệnh | `IrukaEduMission` |
| `src/components/babego/BabegoSlogan.tsx` | 7 | Slogan cuối trang | `IrukaCareSlogan` |

---

## 🔢 Thứ tự triển khai đề xuất

```
Scope 8 (Tạo thư mục ảnh)
    ↓
Scope 1 (Hero + Câu chuyện)  ← LÀM ĐẦU TIÊN — khung sống của trang
    ↓
Scope 2 (Ra đời Babego)
    ↓
Scope 3 (Thành tựu)
    ↓
Scope 4 (Sản phẩm nổi bật)
    ↓
Scope 5 (Lợi thế cạnh tranh)
    ↓
Scope 6 (Tầm nhìn/Sứ mệnh)  ← kế thừa gần nguyên xi
    ↓
Scope 7 (Slogan cuối)         ← kế thừa gần nguyên xi
```

---

## ❓ Câu hỏi cần anh trả lời trước khi bắt đầu

1. **Ảnh tài nguyên:** Anh đã có sẵn các file ảnh/SVG cho Babego chưa (banner, mascot, sản phẩm, logo)? Nếu có thì upload vào `public/img_babego/` giúp em nhé.
2. **Mã màu chính xác:** Màu xanh lá chính của Babego là mã nào? Em ước lượng khoảng `#2D7A3A` nhưng cần anh xác nhận.
3. **Nội dung text:** Các mốc timeline (2021-2024), nội dung 6 lợi thế cạnh tranh, text tầm nhìn/sứ mệnh/cam kết — anh có sẵn nội dung chuẩn hay em dùng nội dung trong ảnh thiết kế?
4. **Nội dung sản phẩm:** 2 khối sản phẩm nổi bật — tên sản phẩm, mô tả cụ thể là gì?
