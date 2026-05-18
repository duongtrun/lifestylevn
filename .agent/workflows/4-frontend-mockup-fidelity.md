---
description: Quy trình code UI từ Mockup HTML — Đảm bảo độ trung thực 100% (Pixel Perfect) về font, size, màu sắc, khoảng cách và logic
---

# 🎨 WORKFLOW: FRONTEND MOCKUP FIDELITY (PIXEL PERFECT)

## Khi nào dùng?
Dùng khi có file mockup HTML/CSS (`.html`) và cần chuyển đổi sang mã nguồn dự án (Next.js/React) với yêu cầu **giống hệt 100%** từ chi tiết nhỏ nhất.

---

## QUY TRÌNH THỰC HIỆN

### BƯỚC 1: QUÉT & TRÍCH XUẤT DESIGN TOKENS
AI phải đọc file mockup HTML và trích xuất bảng thông số kỹ thuật:
- **Typography:** Font-family, Font-size (px), Font-weight, Line-height, Letter-spacing.
- **Colors:** Mã màu HEX/RGBA của Background, Text, Border, Shadow, Gradients.
- **Spacing:** Quy tắc Padding/Margin (8px, 12px, 16px...).
- **Assets:** Logo SVG, Icons, Border-radius, Box-shadow.

### BƯỚC 2: PHÂN TÁCH CẤU TRÚC (DECOMPOSITION)
Chia mockup thành các khối độc lập để triển khai tuần tự:
- **Layout:** Header, Sidebar, Footer, Main Content area.
- **Components:** Cards, Buttons, Form Inputs, Tables, Modals.
- **Interactive:** Tab, Rating Stars, Hover effects, Animations.

### BƯỚC 3: TRIỂN KHAI CODE (HIGH FIDELITY)
Khi viết code, AI BẮT BUỘC tuân thủ:
1. **Font & Size:** Sử dụng đúng class Tailwind tương ứng hoặc mã CSS `font-size`, `font-weight` chính xác từ mockup. Không dùng size mặc định nếu mockup có thông số riêng.
2. **Spacing:** Khoảng cách giữa các phần tử phải khớp tuyệt đối (ví dụ: `gap-4` vs `gap-6`).
3. **Logic:** Chuyển đổi các script JS thuần trong mockup sang hooks React (`useState`, `useEffect`) mà không làm thay đổi hành vi người dùng.
4. **Styles:** Đảm bảo các thuộc tính như `box-shadow`, `backdrop-filter`, `border-color` mờ/đậm đều phải khớp.

### BƯỚC 4: RÀ SOÁT & ĐỐI CHIẾU (FIDELITY AUDIT)
Sau khi code xong, AI tự kiểm tra:
- [ ] **Màu sắc:** Có bị sai sắc độ do Dark/Light mode không? (Ép cứng `color-scheme` nếu cần).
- [ ] **Trọng lượng chữ:** Bôi đậm/nhạt có đúng `font-weight: 700/800/900` không?
- [ ] **Căn lề:** Các bảng, khối có bị lệch pixel nào so với mockup không?
- [ ] **Responsive:** Khi thu nhỏ, bố cục có giữ được "vibe" của bản thiết kế không?

---

## NGUYÊN TẮC VÀNG

1. **Pixel-Perfect First:** Ưu tiên giống thiết kế nhất có thể. **Khi Tailwind preset không đủ → BẮT BUỘC dùng inline `style={{}}` thay vì Tailwind arbitrary `text-[13px]`** (xem section dưới — RULE INLINE STYLE).
2. **No Placeholders:** Không dùng ảnh mẫu, phải dùng đúng asset từ mockup.
3. **Logic Integrity:** Nếu mockup có hiệu ứng hover mượt mà, code thực tế phải có `transition` tương ứng.
4. **Clean Code:** Giống giao diện nhưng code bên dưới phải sạch, phân tác component rõ ràng, không viết bừa bãi.

---

## ⚠️ INLINE STYLE vs TAILWIND CLASS — RULE BẮT BUỘC

> 📖 **Bài học gốc:**
> - `.agent/memory/lessons-learned.md` **L-38** (2026-05-14) — Tailwind JIT không luôn build arbitrary classes → UI không update dù code đúng.
> - `.agent/memory/lessons-learned.md` **L-40** (2026-05-15) — L-38 chưa thành phản xạ → phải áp dụng inline style NGAY TỪ LẦN ĐẦU, không đợi user báo "vẫn sát".

### 🚨 TRIGGER WORDS — Khi user dùng BẤT KỲ từ nào → BẮT BUỘC dùng inline style NGAY:

| Nhóm | Trigger phrase |
|---|---|
| **Spacing** | "padding", "margin", "spacing", "khoảng cách" |
| **Edge** | "sát viền", "sát mép", "không thoáng" |
| **Adjustment** | "căn chỉnh", "căn lại", "căn cho đẹp" |
| **Sizing** | "to hơn", "nhỏ hơn", "rộng hơn", "cao hơn" |
| **Quality** | "pixel perfect", "giống mockup", "không giống mockup" |

### 📖 Hiểu đúng ngữ cảnh "sát viền" (tránh đoán sai như L-40):

| User nói | Ý nghĩa thật |
|---|---|
| "sát viền trái/phải" | padding ngang (`left/right`) |
| "sát viền trên/dưới" | padding dọc (`top/bottom`) |
| **"mọi cái sát viền"** | padding **TẤT CẢ 4 chiều** |
| **"bên trong phải to hơn"** | padding **tổng** (cả ngang + dọc) |

→ **Không chắc?** HỎI 1 câu xác nhận trước khi code, KHÔNG đoán theo 1 hướng.

### Quy tắc 80/20:
- **80% style** → Tailwind class **CHUẨN PRESET** (`flex`, `mb-4`, `gap-2`, `text-lg`, `font-bold`...)
- **20% còn lại** (giá trị NGOÀI preset Tailwind) → BẮT BUỘC inline `style={{}}`

### ❌ KHÔNG dùng Tailwind arbitrary classes cho các trường hợp sau:

| Loại | ❌ Sai (Tailwind arbitrary) | ✅ Đúng (Inline style) |
|------|------|------|
| Aspect-ratio | `aspect-[308/211]` | `style={{ aspectRatio: '308 / 211' }}` |
| Kích thước lẻ | `max-w-[72px]`, `text-[13px]` | `style={{ maxWidth: 72, fontSize: 13 }}` |
| Hex color | `text-[#FB923C]` | `style={{ color: '#FB923C' }}` |
| Opacity số lẻ | `opacity-[0.55]` | `style={{ opacity: 0.55 }}` |
| Bg với opacity | `bg-[#FFF7ED]/70` | `style={{ background: 'rgba(255,247,237,0.7)' }}` |
| Padding lẻ | `px-[22px] py-[18px]` | `style={{ padding: '18px 22px' }}` |
| Border-width lẻ | `border-[1.5px]` | `style={{ borderWidth: 1.5 }}` |
| Border-radius lẻ | `rounded-[14px]` | `style={{ borderRadius: 14 }}` |
| Box-shadow tùy chỉnh | `shadow-[0_2px_6px_rgba(0,0,0,0.05)]` | `style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}` |

### ✅ GIỮ LẠI Tailwind class cho:
- **Layout primitives**: `flex`, `grid`, `flex-col`, `items-center`, `justify-center`, `relative`, `absolute`
- **Spacing chuẩn preset**: `mb-6`, `gap-2`, `p-4`, `mt-1.5` (số chia hết cho 0.5 trong preset)
- **Display**: `block`, `hidden`, `inline-flex`
- **Responsive prefix**: `md:flex-row`, `lg:grid-cols-3`, `xl:gap-4`
- **Interactive states**: `hover:bg-blue-500`, `active:scale-95`, `disabled:opacity-50`, `group-hover:translate-y-1`

### 🔍 BƯỚC VERIFY BẮT BUỘC sau khi code (KHÔNG được skip):

1. **Hard reload** trang (Cmd/Ctrl + Shift + R) để clear cache
2. **F12 → DevTools** → click vào element vừa code
3. Mở tab **Computed** (KHÔNG phải tab "Styles") — xem giá trị thực tế CSS đang áp dụng
4. Check 1-2 thuộc tính chính của mockup spec:
   - `aspect-ratio` có ra `308 / 211` không? (hay là `auto`?)
   - `max-width` có ra `72px` không? (hay là `none`?)
   - `color` có ra `rgb(251, 146, 60)` không? (hay là default đen?)
5. Nếu trả về **`auto` / `none` / default** → class arbitrary KHÔNG build → ĐỔI SANG INLINE NGAY (không cần chờ user báo)
6. CHỈ báo "done" cho user **SAU KHI** verify qua DevTools — KHÔNG báo done chỉ vì TypeScript pass

### 🚫 KHÔNG bao giờ giả định:
- "TypeScript pass → UI sẽ đúng" → SAI, TS chỉ check syntax, không kiểm CSS có build không
- "Tailwind v4 hỗ trợ arbitrary value → chắc chắn build được" → SAI, có nhiều edge case (color/opacity/decimal value) JIT miss
- "Hard reload là đủ" → SAI, đôi khi cần restart dev server hoàn toàn (`Ctrl+C` rồi `npm run dev` lại)

---

## CÁCH RA LỆNH CHO AI

Nói với AI kèm theo file mockup:
> "Sử dụng workflow **/4-frontend-mockup-fidelity** để triển khai file [tên file]. Yêu cầu bám sát từng pixel, đúng font chữ [tên font], màu sắc và các hiệu ứng hover."

---
*Ghi chú: Workflow này bổ trợ cho /4-frontend-ui nhưng tập trung vào độ chi tiết visual.*
