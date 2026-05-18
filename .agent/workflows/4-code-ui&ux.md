---
description: Triển khai code Component Front-end siêu chuẩn UI/UX.
---

// turbo-all

Quy trình code UI/UX nối tiếp sau khi kế hoạch đã được duyệt. Mục tiêu là tạo ra giao diện Premium, sắc nét, tương tác mượt mà và không bao giờ phá vỡ bố cục tổng thể.

**Nguyên tắc bắt buộc khi Code UI/UX:**
- **Bóc Tách & Tái sử dụng:** Bóc rời các UI phức tạp thành Sub-Component (vd: `TeamCard.tsx`). Đừng nhồi nhét code JSX thành một file siêu to khổng lồ.
- **Micro-Interactions (Tương tác nhỏ):** Luôn thêm hiệu ứng chuyển vùng như `transition-all duration-200`, `hover:shadow-md`, `active:scale-95` vào các nút bấm và Card để tạo trải nghiệm "mượt" và "xịn".
- **Responsive Tuyệt Đối:** Sử dụng hệ thống Tailwind Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) và Flexbox. TUYỆT ĐỐI không để text bị tràn, hay khung layout bị vỡ đè lên nhau trên màn hình nhỏ.
- **Ngăn chặn Xung Đột Không Gian:** 
  - Suy nghĩ kỹ về không gian bao quanh (Margin/Padding). 
  - Khéo léo dùng `stopPropagation()` tránh lỗi click lồng nhau.
  - Sử dụng cơ chế cuộn trong (`overflow-y-auto`, `max-h-[50vh]`) thay vì dùng `h-full` cứng ngắc ép vỡ các bảng Table bên dưới.
- **Chuẩn Mực Token:** Chỉ dùng bảng màu tự nhiên của Tailwind (vd: `slate-50`, `indigo-600`), bo góc `rounded-xl`, `rounded-2xl`. Hạn chế tô màu đậm lòe loẹt, nên dùng nền nhạt và viền màu tinh tế.

**Định dạng Xử lý:**
1. **Khóa Scope UI**
   - *Xác nhận những file sẽ chỉnh sửa.*
2. **Triển khai Bố Cục (Layout Foundation)**
   - *Nêu sơ qua hệ grid/flex sẽ đặt.*
3. **Triển khai Tương Tác (Interactivity & Animation)**
   - *Nêu các phần hiệu ứng hoặc state toggle (Collapsible).*
4. **Viết Code**
   - *Gửi đoạn code mới, clean.*
5. **Checklist tự động kiểm định**
   - [ ] Giao diện có tràn trên Phone/iPad không?
   - [ ] Rê chuột (Hover) có cảm biến phản hồi không?
   - [ ] Phần tử mới thêm có đẩy vỡ các container xung quanh không?

**Điều kiện thất bại:**
- Code chạy được nhưng trông "rẻ tiền", tĩnh như một file HTML năm 2005.
- Layout bị xô lệch, chữ bị tràn mất viền.
- Đổi một file UI làm hỏng lây sang CSS của các màn hình không liên quan.

---

## ⚠️ RULE BẮT BUỘC: Inline Style vs Tailwind Class

> 📖 Bài học gốc: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14)
> 📖 Chi tiết: `.agent/workflows/4-frontend-mockup-fidelity.md` section "INLINE STYLE vs TAILWIND CLASS"

### Tóm tắt:
- ✅ Layout/spacing chuẩn preset → Tailwind class
- ❌ Arbitrary value (text-[13px], aspect-[X/Y], text-[#color], max-w-[Xpx], opacity-[0.55]...) → KHÔNG dùng
- ✅ Thay bằng `style={{ fontSize, aspectRatio, color, maxWidth, opacity }}`

### Verify: F12 → tab **Computed** → check thuộc tính chính → đổi inline nếu sai. KHÔNG báo done chỉ vì TypeScript pass.
