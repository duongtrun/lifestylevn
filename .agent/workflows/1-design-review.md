---
description: Quy trình review và làm việc với Figma/design - từ mockup đến handoff cho dev
---

# 🎨 WORKFLOW: DESIGN REVIEW & FIGMA

## Khi nào dùng?
Khi có file Figma/mockup/ảnh thiết kế cần chuyển thành code, hoặc cần review design trước khi làm.

---

## CÁCH CUNG CẤP DESIGN CHO AI

### Option 1: Mô tả bằng lời
```
"Màn hình login gồm:
- Logo ở trên cùng, canh giữa
- Form đăng nhập: email + password
- Nút 'Đăng nhập' màu xanh, full width
- Link 'Quên mật khẩu' bên phải
- Divider 'hoặc'
- Nút 'Đăng nhập với Google'
- Link 'Chưa có tài khoản? Đăng ký'"
```

### Option 2: Paste link Figma
```
"Đây là link Figma: [link]
Hãy review và code theo design"
```

### Option 3: Upload ảnh/screenshot
Kéo thả ảnh vào Antigravity → AI tự nhận diện layout

---

## QUY TRÌNH DESIGN → CODE

```
BƯỚC 1: NHẬN DESIGN (Bạn cung cấp)
─────────────────────────────────────
- Figma link / Screenshot / Mô tả

         ↓
BƯỚC 2: AI PHÂN TÍCH DESIGN
──────────────────────────────
// turbo  
AI tự:
- Nhận diện các components
- Xác định layout (grid/flex)
- Đọc màu sắc, font, spacing
- Liệt kê state cần xử lý
- Hỏi về responsive behavior

         ↓
BƯỚC 3: BẠN XÁC NHẬN
───────────────────────
AI tóm tắt: "Tôi hiểu design như thế này..."
Bạn: "Đúng rồi" hoặc "Sửa chỗ này..."

         ↓
BƯỚC 4: AI CODE THEO DESIGN
──────────────────────────────
// turbo
Pixel-perfect từ design ra code

         ↓
BƯỚC 5: SO SÁNH DESIGN vs CODE
───────────────────────────────
Bạn xem kết quả trên browser
Feedback: "Nút hơi cao quá", "Font nhỏ hơn"
AI điều chỉnh
```

---

## DESIGN REVIEW CHECKLIST

### 🎨 Visual Accuracy
- [ ] Màu sắc đúng với design system?
- [ ] Font family và size đúng?
- [ ] Spacing (margin/padding) nhất quán?
- [ ] Border radius, shadow đúng?
- [ ] Icon đúng và có label?

### 📐 Layout
- [ ] Layout đúng trên tất cả breakpoints?
- [ ] Alignment nhất quán?
- [ ] Grid system được dùng đúng?

### 🔄 Interactions
- [ ] Hover states có không?
- [ ] Focus states rõ ràng?
- [ ] Transition/animation mượt?
- [ ] Click/tap feedback?

### 🌐 Cross-browser
- [ ] Chrome ✓
- [ ] Safari ✓
- [ ] Firefox ✓
- [ ] Mobile iOS ✓
- [ ] Mobile Android ✓

---

## DESIGN TOKENS CẦN XÁC ĐỊNH TRƯỚC

Nói với AI để thiết lập 1 lần, dùng mãi:
```
"Hệ thống design của tôi:
- Primary color: #[hex]
- Secondary color: #[hex]
- Font chính: [tên font]
- Border radius chuẩn: [px]
- Spacing unit: [px]
- Breakpoints: mobile=[px], tablet=[px], desktop=[px]"
```

---

## RULE DESIGN

1. **Design System trước** — Xác định tokens 1 lần, dùng mãi
2. **Component library** — Mỗi element dùng chung component
3. **Feedback sớm** — Review ngay sau bước 4, không đợi xong hết
4. **Responsive bắt buộc** — Không accept UI chỉ đẹp trên desktop
5. **Dark mode plan** — Hỏi từ đầu có cần không, tránh làm lại sau
