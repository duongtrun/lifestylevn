# Workflow: /3-calibrate-ui-responsive
# AI Tự Đề Xuất Cải Thiện UI — Typography · Spacing · Icon · Layout

> **Áp dụng khi:**
> - Màn hình đã code xong, logic đang chạy tốt
> - Thiết kế Figma gốc **chưa chuyên nghiệp** hoặc thiếu chính xác
> - Cần AI **tự đề xuất cải thiện** theo tiêu chuẩn UI/UX thực tế — không phụ thuộc Figma
>
> **Mục tiêu:** AI đứng vai trò Senior UI Designer, nhìn màn hình hiện tại rồi **tự phát hiện và đề xuất** các điều chỉnh cụ thể để đạt chuẩn app chuyên nghiệp.

---

## 🎯 Góc Nhìn Bắt Buộc Trước Khi Phân Tích

AI phải đặt mình vào 2 góc nhìn song song:

### Góc nhìn 1 — Người dùng thực tế IruKa

| Nhóm | Hành vi | Kỳ vọng UI |
|---|---|---|
| **Trẻ em 5–10 tuổi** | Nhìn màn hình từ xa, tay nhỏ, chưa đọc thành thạo | Chữ to, icon to, màu tươi, không rối |
| **Mẹ hướng dẫn con** | Cầm điện thoại 1 tay, mắt nhìn con + màn hình | Rõ ràng, không cần đọc kỹ vẫn hiểu |
| **Mẹ dùng một mình** | Đọc báo cáo, nhìn nhanh tiến độ | Hierarchy rõ, contrast tốt, thông tin phân tầng |

### Góc nhìn 2 — Tiêu chuẩn App Chuyên Nghiệp

| Nguồn | Áp dụng cho IruKa |
|---|---|
| **Apple HIG** | Touch target ≥ 44pt, spacing hài hoà, typography scale |
| **Material Design 3** | Type scale (Display → Body), 8px grid, elevation |
| **Duolingo Kids** | Font ≥ 18px, icon 32–48px, padding rộng, màu sắc có hệ thống |
| **Khan Academy Kids** | Ít element/màn, white space nhiều, focus rõ ràng |
| **WCAG 2.1 AA** | Contrast ≥ 4.5:1 text thường, ≥ 3:1 text lớn |

---

## Bước 1 — 📸 CHỤP VÀ PHÂN TÍCH MÀN HÌNH HIỆN TẠI

### 1.1 — Chụp screenshot

Dùng browser tool chụp màn hình đang chạy ở 3 kích thước:
```
Chrome DevTools → Toggle Device:
  - Mobile:  430px (iPhone 14 Pro Max)
  - Tablet:  820px (iPad Air)
  - Desktop: 1280px (MacBook 14")
```

### 1.2 — Đọc code hiện tại

Mở file component/page cần review, ghi lại **các giá trị đang dùng**:

| Khu vực | className hiện tại | Giá trị thực |
|---|---|---|
| Tiêu đề | `text-[20px] font-semibold` | 20px / 600 |
| Subtitle | `text-[12px] font-bold` | 12px / 700 |
| Body text | `text-[16px] font-medium` | 16px / 500 |
| Icon/Image | `w-[240px] h-[240px]` | 240×240px |
| Gap chính | `gap-8` | 32px |
| Padding | `px-6` | 24px |
| ... | ... | ... |

---

## Bước 2 — 🔍 AI TỰ PHÂN TÍCH VẤN ĐỀ

> AI nhìn screen + đọc code → **tự phát hiện** vấn đề theo checklist dưới đây.
> Không so Figma. So với **tiêu chuẩn thực tế**.

### 2.1 — Checklist phân tích Typography

```
□ Font size body có ≥ 16px không? (Chuẩn: 16–18px)
□ Font size heading có đủ nổi bật so với body không? (tỷ lệ ≥ 1.25x)
□ Line-height có đủ thoáng không? (Chuẩn: 1.4–1.6 lần font-size)
□ Font weight có tạo hierarchy rõ không? (400/500/600/700)
□ Letter-spacing có cần thiết ở heading không? (0.01em–0.02em)
□ Trên tablet/desktop: font có scale lên không hay giữ nguyên mobile?
□ Text có contrast đủ WCAG AA không?
```

### 2.2 — Checklist phân tích Spacing & Layout

```
□ Padding ngoài cùng có đủ thở không? (Chuẩn mobile: 16–24px)
□ Gap giữa các section có nhất quán theo bội số 8 không? (8/16/24/32/40/48)
□ Các element cùng cấp có spacing đều nhau không?
□ Trên desktop: content có bị kéo giãn full-width không? (Nên max-width + center)
□ Safe-area top/bottom đã tính chưa? (iOS notch, Android nav)
□ Content có bị che khuất bởi fixed element nào không?
```

### 2.3 — Checklist phân tích Icon & Image

```
□ Icon touch target có ≥ 44×44px không? (Apple HIG)
□ Image/mascot có đủ lớn để nhìn thấy rõ không?
□ Image có bị vỡ, mờ, pixelated không? (Cần SVG hoặc @2x/@3x)
□ Icon visual size có cân xứng với text bên cạnh không?
□ Trên tablet/desktop: image có scale tương ứng không?
```

### 2.4 — Checklist phân tích Visual Hierarchy

```
□ Nhìn màn hình 3 giây: có biết ngay đâu là tiêu đề, đâu là action không?
□ Phần quan trọng nhất có nổi bật nhất không?
□ Màu sắc có quá nhiều (>3 màu chính) gây rối mắt không?
□ Khoảng trắng (white space) có đủ cho mắt nghỉ không?
□ Alignment nhất quán: left-align body, center-align CTA?
```

---

## Bước 3 — 📋 LẬP BẢNG ĐỀ XUẤT CẢI THIỆN

> AI tự lập bảng này, trình anh duyệt **trước khi sửa code**.

```
📊 BÁO CÁO PHÂN TÍCH UI — [Tên màn hình]

| # | Khu vực | Vấn đề phát hiện | Đề xuất sửa | Lý do (chuẩn nào) | Ưu tiên |
|---|---|---|---|---|---|
| 1 | Body text | 16px đúng mobile nhưng tablet/desktop giữ nguyên | mobile 16px / md:18px / lg:20px | Apple HIG scale | 🔴 Cao |
| 2 | Mascot trên tablet | 240px — không scale lên | md:280px / lg:340px | cân xứng viewport | 🟡 Trung |
| 3 | Header counter | 12px trắng/mờ — khó đọc | giữ 12px mobile / md:14px | WCAG AA | 🟡 Trung |
| 4 | Desktop layout | Content kéo giãn full 1280px | max-w-[560px] mx-auto | UX tập trung | 🔴 Cao |
| 5 | Progress track | height 12px ok mobile | md:h-[14px] lg:h-[16px] | nhìn thấy rõ hơn | 🟢 Thấp |

⚠️ Tổng: X vấn đề (A cao / B trung / C thấp)
```

---

## Bước 4 — ⏳ CHỜ ANH DUYỆT

> **KHÔNG sửa code khi chưa có duyệt.** Trình bảng đề xuất → chờ feedback.

Format trình duyệt:
```
Em phân tích xong màn hình [tên], phát hiện [X] điểm cần cải thiện.

Anh xem bảng đề xuất bên dưới, cho em biết:
A) Làm hết → Em sửa theo thứ tự ưu tiên
B) Làm một số → Anh chọn số nào
C) Không làm → Giữ nguyên

[Bảng đề xuất]
```

---

## Bước 5 — 🛠️ THỰC THI SAU KHI ĐƯỢC DUYỆT

### 5.1 — Nguyên tắc sửa an toàn

```
✅ LUÔN:
  - Mobile-first: viết class mobile trước, rồi md: rồi lg:
  - Dùng bội số 8px cho spacing (8/16/24/32/40/48/64)
  - Giữ tỷ lệ: khi scale lên, scale đều tất cả (font/icon/gap)
  - Comment lý do từng thay đổi

❌ KHÔNG:
  - Sửa logic, handler, state
  - Tự ý thay màu nằm ngoài danh sách đề xuất đã duyệt
  - Refactor cấu trúc JSX khi không cần thiết
```

### 5.2 — Pattern responsive chuẩn

```tsx
{/* ── Typography Scale ── */}
// Heading: 20 / 24 / 28
className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold"

// Body: 16 / 18 / 20
className="text-[16px] md:text-[18px] lg:text-[20px] font-medium"

// Helper: 12 / 13 / 14
className="text-[12px] md:text-[13px] lg:text-[14px]"

{/* ── Spacing Scale (bội số 8) ── */}
// Gap section: 32 / 40 / 48
className="gap-8 md:gap-10 lg:gap-12"

// Padding ngoài: 24 / 32 / 40
className="px-6 md:px-8 lg:px-10"

{/* ── Image/Icon Scale ── */}
// Mascot: 200 / 260 / 320
className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px]"

{/* ── Container Desktop Focused ── */}
// Content không kéo giãn full-width trên desktop
className="w-full max-w-full md:max-w-[480px] lg:max-w-[560px] mx-auto"
```

### 5.3 — Scale Reference Table (App Trẻ Em)

| Thành phần | Mobile | Tablet | Desktop | Ghi chú |
|---|---|---|---|---|
| **Display** (tiêu đề lớn) | 24px | 28px | 32px | font-bold |
| **Heading** (tiêu đề section) | 20px | 24px | 28px | font-semibold |
| **Body** (nội dung chính) | 16px | 18px | 20px | font-medium/regular |
| **Caption** (phụ, nhãn) | 12px | 13px | 14px | font-medium, opacity |
| **Touch target tối thiểu** | 44px | 44px | 44px | Apple HIG bắt buộc |
| **Icon visual** | 24px | 28px | 32px | trong 44px target |
| **Mascot/Illustration** | ~200px | ~260px | ~320px | ~50% chiều rộng |
| **Gap giữa section** | 32px | 40px | 48px | bội số 8 |
| **Gap trong section** | 16px | 20px | 24px | bội số 8 |
| **Padding ngoài** | 24px | 32px | 40px | px-6 / px-8 / px-10 |
| **Progress bar height** | 12px | 14px | 16px | nhìn thấy rõ |
| **Max-width content** | 100% | 480px | 560px | center aligned |

---

## Bước 6 — ✅ XÁC NHẬN KẾT QUẢ

### 6.1 — Test 3 màn hình

```
Sau khi sửa xong, chụp screenshot 3 kích thước:
1. 430px → Mobile
2. 820px → Tablet
3. 1280px → Desktop

Dùng debug URL param để vào thẳng màn hình cần test:
http://localhost:3003/[path]?preview_[màn]=1
```

### 6.2 — Self-review checklist trước khi báo cáo

```
□ 3 screenshot đã chụp
□ Nhìn 3 giây vào từng màn: hierarchy rõ không?
□ Font scale lên tablet/desktop: thấy sự khác biệt không?
□ Mascot/icon to vừa phải, không bé tí hay chiếm cả màn?
□ Desktop không bị full-width giãn xấu?
□ Logic vẫn chạy bình thường (không đụng handler)
□ 0 TypeScript error
```

### 6.3 — Format báo cáo cuối

```
✅ Đã cải thiện UI cho màn hình [Tên]

📊 Đã xử lý [X]/[Y] điểm đề xuất:
  ✅ #1: Scale font body (16 → 16/18/20)
  ✅ #4: Desktop max-width (full → 560px centered)
  ⏭️ #3: Counter size — đã ổn, bỏ qua

📐 Files sửa:
  MODIFIED: [path/to/page.tsx] — chỉ className, không đụng logic

🖼️ Kết quả visual:
  [screenshot mobile]
  [screenshot tablet]
  [screenshot desktop]

🧪 Test: localhost:3003/[path]?preview_[màn]=1
```

---

## ⚠️ Nguyên Tắc Vàng

> **Figma kém ≠ không có chuẩn.**
> Khi Figma không đáng tin → AI dùng tiêu chuẩn Apple HIG + Material Design + thực tế app lớn làm chuẩn thay thế.
> Nhưng LUÔN trình đề xuất trước, không tự ý sửa.

---

## ⚠️ RULE BẮT BUỘC: Inline Style vs Tailwind Class

> 📖 Bài học gốc: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14)
> 📖 Chi tiết: `.agent/workflows/4-frontend-mockup-fidelity.md` section "INLINE STYLE vs TAILWIND CLASS"

### Đặc biệt cho responsive calibration:
- ✅ Responsive prefix Tailwind chuẩn (`md:`, `lg:`, `xl:`) → DÙNG (build OK)
- ❌ Responsive với arbitrary value: `md:text-[13px]`, `lg:max-w-[820px]` → CÓ THỂ không build
- ✅ Dùng inline style với matchMedia hoặc CSS @media: `style={{ fontSize: window.innerWidth >= 768 ? 13 : 12 }}` HOẶC tạo CSS class trong globals.css

### Verify ở MỖI breakpoint (mobile/tablet/desktop):
1. Resize trình duyệt sang từng breakpoint
2. F12 → tab **Computed** check thuộc tính responsive
3. Đảm bảo class arbitrary build đúng ở MỌI breakpoint trước khi báo done
