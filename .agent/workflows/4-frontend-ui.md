---
description: Quy trình code frontend/UI - từ design đến component hoàn chỉnh
---

# 🖥️ WORKFLOW: FRONTEND / UI

## Khi nào dùng?
Khi cần làm màn hình mới, component UI, hoặc sửa giao diện.

---

## CÁCH MÔ TẢ YÊU CẦU UI (Bạn làm)

Nói với AI theo format:
```
"Tôi cần màn hình [tên màn hình].
Người dùng thấy: [mô tả layout, các thành phần chính]
Người dùng làm được: [các hành động có thể thực hiện]  
Trạng thái: [trạng thái loading/empty/error trông như thế nào]
Tham khảo: [link/ảnh UI tương tự nếu có]"
```

**Ví dụ tốt:**
> "Tôi cần màn hình danh sách đơn hàng.
> Thấy: list đơn hàng có ảnh sản phẩm, tên, ngày đặt, tổng tiền, badge trạng thái.
> Làm được: lọc theo trạng thái, tìm kiếm, click vào xem chi tiết.
> Trạng thái: loading skeleton, empty state 'Chưa có đơn hàng', error state.
> Tham khảo: giống trang đơn hàng của Shopee."

---

## QUY TRÌNH AI VIẾT FRONTEND

```
BƯỚC 1: PHÂN TÍCH & WIREFRAME (AI đề xuất)
────────────────────────────────────────────
AI tạo:
- Wireframe ASCII/text mô tả layout
- Danh sách components cần tạo
- State management plan
- API calls cần thiết

Bạn duyệt: Layout đúng chưa?

         ↓
BƯỚC 2: THIẾT KẾ COMPONENT (AI làm)
──────────────────────────────────────
// turbo
AI viết theo thứ tự nhỏ → lớn:
1. Atomic components (Button, Input, Badge)
2. Molecule components (SearchBar, OrderCard)
3. Organism components (OrderList, FilterPanel)
4. Page/Screen component (OrdersPage)

         ↓
BƯỚC 3: KẾT NỐI API (AI làm)
───────────────────────────────
// turbo
AI tự:
- Viết API calls
- Xử lý loading state
- Xử lý error state
- Xử lý empty state
- Cache data nếu cần

         ↓
BƯỚC 4: RESPONSIVE & ACCESSIBILITY (AI làm)
─────────────────────────────────────────────
// turbo
AI tự kiểm tra:
- Mobile, tablet, desktop
- Dark mode (nếu có)
- Keyboard navigation
- Screen reader basics

         ↓
BƯỚC 5: BẠN REVIEW TRỰC QUAN
──────────────────────────────
Bạn xem trên browser → Feedback
"Nút hơi nhỏ", "Màu không đúng brand", etc.
AI sửa tức thì
```

---

## CHECKLIST UI CHUẨN

### 🎨 Visual
- [ ] Đúng màu sắc brand
- [ ] Font nhất quán
- [ ] Spacing hợp lý (không quá chật, không quá rộng)
- [ ] Icon có label text (không chỉ icon)
- [ ] Contrast đủ (text phải đọc được)

### 📱 Responsive
- [ ] Mobile (375px) ✓
- [ ] Tablet (768px) ✓
- [ ] Desktop (1440px) ✓
- [ ] Không bị overflow ngang

### ⚡ UX States
- [ ] Loading state (skeleton/spinner)
- [ ] Empty state (hình ảnh + text gợi ý)
- [ ] Error state (message + nút retry)
- [ ] Success state (feedback rõ ràng)
- [ ] Disabled state (visual khác biệt)

### ♿ Accessibility
- [ ] Alt text cho ảnh
- [ ] ARIA labels cho buttons
- [ ] Tab order hợp lý
- [ ] Form labels đầy đủ

---

## UI PATTERNS CHUẨN

### Loading
```
❌ Sai: Màn hình trắng khi loading
✅ Đúng: Skeleton placeholder giống layout thật
```

### Empty State
```
❌ Sai: Chỗ trống, không có gì
✅ Đúng: Ảnh minh họa + text + CTA button
"Chưa có đơn hàng nào. Mua sắm ngay! →"
```

### Error State  
```
❌ Sai: "Error 500"
✅ Đúng: "Có lỗi xảy ra. Thử lại" + nút Retry
```

### Form Validation
```
❌ Sai: Báo lỗi sau khi submit
✅ Đúng: Báo lỗi ngay khi blur khỏi field
```

---

## RULE FRONTEND

1. **Mobile First** — Làm mobile trước, scale lên desktop
2. **Component tái sử dụng** — Tránh copy-paste
3. **Không hardcode màu** — Dùng design tokens/variables
4. **Performance** — Lazy load ảnh, code split routes
5. **Không logic trong UI** — Business logic thuộc về services/hooks

---

## ⚠️ RULE BẮT BUỘC: Inline Style vs Tailwind Class

> 📖 Bài học gốc: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14)
> 📖 Chi tiết: `.agent/workflows/4-frontend-mockup-fidelity.md` section "INLINE STYLE vs TAILWIND CLASS"

### Quy tắc 80/20:
- ✅ Layout/spacing chuẩn preset → Tailwind class (`flex`, `mb-4`, `gap-2`, `hover:`, `md:`)
- ❌ Giá trị lẻ ngoài preset → KHÔNG dùng `text-[13px]`, `text-[#FB923C]`, `max-w-[72px]`, `aspect-[X/Y]`, `bg-[#color]/X`, `rounded-[14px]`, `opacity-[0.55]`
- ✅ THAY bằng inline: `style={{ fontSize: 13, color: '#FB923C', maxWidth: 72, aspectRatio: '308/211', background: 'rgba(...)', borderRadius: 14, opacity: 0.55 }}`

### Verify BẮT BUỘC sau code:
F12 → tab **Computed** (KHÔNG phải Styles) → check 1-2 thuộc tính chính → nếu sai thì đổi inline NGAY trước khi báo done.
