---
description: Quy trình đắp Giao Diện Figma vào code đã có sẵn logic (Không làm cấu trúc cũ bị vỡ ngầm)
---

# Workflow: /4-figma-to-ui
# Đắp Giao Diện Figma Vào Code Đã Có Logic

> **Áp dụng khi:** Logic đã có sẵn (hooks, state, handlers, API calls), chỉ cần thay/nâng cấp phần UI/giao diện.
> **Mục tiêu:** Đắp UI chuẩn theo Figma mà KHÔNG làm hỏng logic, UX flow đang chạy tốt, nếu phát hiện logic sai phải báo cáo đề duyệt mới chỉnh sửa.
Yêu cầu trước khi code là phải xuất đủ asset bên figma lưu trước rồi mới đến code.

---

## Tổng quan luồng

```
Bước 1: Phong tỏa logic  →  Bước 2: Đọc Figma  →  Bước 3: So sánh  →  Bước 4: Kế hoạch scope
→  Bước 5: Code UI an toàn  →  Bước 6: Kiểm tra  →  Bước 7: Báo cáo
```

---

## Bước 1 — 🔒 PHONG TỎA LOGIC (BẮT BUỘC TRƯỚC KHI SỬA)

**Mục tiêu:** Xác định chính xác ranh giới "vùng cấm" và "vùng được phép sửa".

### 1.1 — Đọc file cần sửa, phân loại từng dòng

Mở file `page.tsx` (hoặc component cần sửa), đọc từ đầu đến cuối, chia thành 2 vùng:

**🚫 VÙNG CẤM — KHÔNG ĐƯỢC SỬA:**
- Tất cả `import` liên quan đến hooks, API, store, utils
- Khai báo state: `useState`, `useRef`, `useStore`, `useRouter`...
- Tất cả handlers/functions xử lý nghiệp vụ: `onSubmit`, `handleBlur`, `classifyError`...
- Tất cả gọi hook: `useForm`, `useQuery`, `useChildStore`...
- Các biến derived từ state: `identifierHasError`, `passwordValid`...
- Logic guard/redirect: `if (!currentChild) return ...`
- `export default function ...` (chỉ giữ nguyên, không thêm prop)

**✅ VÙNG ĐƯỢC PHÉP SỬA:**
- Toàn bộ phần `return ( ... )` — tức là JSX render
- Các class CSS / className
- Thêm wrapper div để bố cục
- Thêm animation (framer-motion) quanh elements đã có
- Import thêm icon, Image, motion... (chỉ UI)
- Tách JSX ra `_components/` (nhưng props phải y chang)

### 1.2 — Ghi ra SCOPE LOCK trước khi làm

```
🔒 SCOPE LOCK — Trang Login:
- KHÔNG đụng: state, hooks, handlers, imports logic (dòng 1-280)
- CHỈ sửa: phần return() từ dòng 281 đến cuối
- File được phép tạo mới: _components/LoginHeader.tsx, _components/LoginForm.tsx
```

---

## Bước 2 — 🎨 ĐỌC FIGMA VÀ LẤY THÔNG SỐ THIẾT KẾ

**Dùng MCP Figma:** `mcp_figma-desktop_get_design_context` với đúng `nodeId`.

### 2.1 — Lấy design context

```
Thực hiện:
1. get_design_context(nodeId) → lấy code mẫu + metadata
2. get_screenshot(nodeId) → lấy ảnh visual để đối chiếu
```

### 2.2 — Ghi lại các thông số cần dùng

Sau khi đọc Figma, liệt kê ra:

| Thông số | Giá trị từ Figma |
|---|---|
| Màu chính (brand) | `#04A4FF` |
| Màu text placeholder | `#A5A6A9` |
| Font chính | `SN Pro` / Inter / ... |
| Border radius input | `18px` |
| Height input | `56px` |
| Shadow button | `inset 0 -4px 0 rgba(0,0,0,0.15)` |
 cần phải kiểm soát kĩ kihcs thước font, khoảng cách,kích thước các ô, các nút bẩm, tương quan tỉ lệ, bằng nhau, khác nhau bao nhiêu lần để mà đưa vào cho đúng.
| ... | ... |

### 2.3 — Đối chiếu với Design Token đang có trong project

Kiểm tra xem project có `globals.css` hay `tailwind.config` với design tokens chưa:
- Nếu có → dùng token (ví dụ: `var(--color-brand-400)`)
- Nếu không → dùng giá trị hex trực tiếp tạm thời, ghi chú để sync sau

---

## Bước 3 — 🔍 SO SÁNH FIGMA VS CODE HIỆN TẠI

Lập bảng so sánh chi tiết TRƯỚC KHI code:

| Phần UI | Figma | Code hiện tại | Cần đổi? |
|---|---|---|---|
| Header background | `#04A4FF`, height 189px | Có ✅ | Không |
| Logo vị trí | Absolute, tràn ra header | Có ✅ | Không |
| Input border | 2px `#A5A6A9`, radius 18px | Có ✅ | Nhỏ |
| Button shadow | inset -4px rgba(0,0,0,0.15) | Chưa có ⚠️ | Cần thêm |
| Font | SN Pro SemiBold | Chưa rõ ⚠️ | Kiểm tra |
| Social: Apple icon | Không có trong Figma | Code có Apple | Bỏ đi |

**Quy tắc khi so sánh:**
- ✅ Giống rồi → **KHÔNG SỬA** (tránh rủi ro)
- ⚠️ Khác nhỏ → **SỬA CÓ KIỂM SOÁT** (ghi rõ dòng nào đổi gì)
- ❌ Khác lớn (cấu trúc) → **TẠO FILE MỚI**, giữ nguyên file gốc

---

## Bước 4 — 📋 LÊN KẾ HOẠCH SỬA (CHIA SCOPE NHỎ)

Không sửa hết 1 lần. Chia theo từng phần UI độc lập:

**Ví dụ cho trang Login:**

| Scope | Nội dung | Rủi ro logic |
|---|---|---|
| Scope 1 | Đổi màu + font header, button shadow | Không có |
| Scope 2 | Tách `LoginHeader.tsx` ra file riêng | Không có (props tĩnh) |
| Scope 3 | Tách `LoginForm.tsx` — truyền props từ page | Cần test handlers |
| Scope 4 | Polish: animation, hover, spacing | Không có |

---

## Bước 5 — 🛠️ CODE UI AN TOÀN

### 5.1 — Quy tắc VÀNG khi viết UI

```
✅ LUÔN làm:
- Nhận props từ ngoài vào (không tự gọi hook bên trong component UI mới)
- Giữ nguyên tên function handler (onSubmit, onChange, onBlur)
- Giữ nguyên {...register('field')} spread — KHÔNG viết lại
- Giữ nguyên disabled={isLoading} trên inputs và button
- Giữ nguyên aria-label, htmlFor (accessibility)
- Comment rõ dòng nào lấy từ Figma

❌ KHÔNG bao giờ:
- Xóa {...register(...)} hay {...field} trong input
- Thay đổi type="submit" thành type="button"
- Bỏ disabled={isLoading} trên button
- Thêm useState mới trong component UI (business logic)
- Đổi tên props khi truyền vào _components
- Xóa error message display (dù design không có)
```

### 5.2 — Pattern tách component UI an toàn

**Trước (tất cả trong page.tsx):**
```tsx
// page.tsx — logic trên đây
return (
  <div className="old-class">
    <input {...register('identifier')} className="old-input" />
    {errors.identifier && <p>{errors.identifier.message}</p>}
  </div>
)
```

**Sau (tách ra _components/):**
```tsx
// page.tsx — logic GIỮ NGUYÊN 100%
return (
  <LoginForm
    register={register}          // ← truyền thẳng, không bọc thêm
    errors={errors}              // ← giữ nguyên
    isLoading={isLoading}        // ← giữ nguyên
    onSubmit={handleSubmit(onSubmit)}  // ← giữ nguyên
    onIdentifierBlur={handleIdentifierBlur}  // ← giữ nguyên
    showPassword={showPassword}
    onTogglePassword={() => setShowPassword(p => !p)}
  />
)

// _components/LoginForm.tsx — CHỈ UI
type Props = {
  register: UseFormRegister<LoginInput>
  errors: FieldErrors<LoginInput>
  isLoading: boolean
  onSubmit: FormEventHandler
  onIdentifierBlur: () => void
  showPassword: boolean
  onTogglePassword: () => void
}
export function LoginForm({ register, errors, isLoading, onSubmit, ...rest }: Props) {
  return (
    <form onSubmit={onSubmit}>
      {/* Chỉ UI ở đây */}
    </form>
  )
}
```

### 5.3 — Mapping Figma → Tailwind class

Khi convert Figma code sang Tailwind:

| Figma giá trị | Tailwind class | Ghi chú |
|---|---|---|
| `border-radius: 18px` | `rounded-[18px]` | |
| `height: 56px` | `h-14` hoặc `h-[56px]` | |
| `font-weight: 600` | `font-semibold` | |
| `#04A4FF` | `text-[var(--color-brand-400)]` | Dùng token nếu có |
| `inset 0 -4px ...` | `shadow-[inset_0_-4px_...]` | |
| `gap: 22px` | `gap-[22px]` | |
| `opacity: 40%` | `opacity-40` | |

Đảm bảo vào figma xuất toàn bộ asset cần thiết lưu vào public đặt tên phù hợp rồi mới code.

---

## Bước 6 — ✅ KIỂM TRA SAU KHI SỬA

### 6.1 — Kiểm tra visual (bắt buộc)

```
1. Chạy dev server: npm run dev
2. Mở browser → vào trang vừa sửa
3. So sánh với screenshot Figma (để 2 cửa sổ cạnh nhau)
4. Kiểm tra responsive (mobile 390px)
```

### 6.2 — Kiểm tra logic KHÔNG bị ảnh hưởng

Chạy qua từng case logic đã có:

| Case kiểm tra | Kết quả mong đợi |
|---|---|
| Submit form trống | Hiện lỗi validation inline |
| Nhập SĐT/email sai định dạng | Hiện lỗi định dạng |
| Blur khỏi ô identifier | Gọi API check account |
| Click button Submit | Button disabled + spinner |
| Đăng nhập thành công | Redirect đúng trang |
| Social login (Google) | Mở URL Google OAuth |

### 6.3 — Kiểm tra không có TypeScript error

```bash
npx tsc --noEmit
```

Phải 0 error mới được xem là XONG.

---

## Bước 7 — 📣 BÁO CÁO KẾT QUẢ

Sau khi xong, báo cáo theo format:

```
✅ Đã đắp UI từ Figma cho trang [Tên trang]

📁 Files đã tạo/sửa:
- MODIFIED: app/(auth)/login/page.tsx (chỉ phần return())
- CREATED: app/(auth)/login/_components/LoginHeader.tsx
- CREATED: app/(auth)/login/_components/LoginForm.tsx

🎨 Thay đổi visual:
- Button có shadow inset theo đúng Figma
- Apple icon đã xóa (không có trong design)
- Font đã cập nhật sang SN Pro

🔒 Logic giữ nguyên 100%:
- Tất cả handlers: onSubmit, handleIdentifierBlur, handleSocialLogin
- Tất cả state: isLoading, showPassword, checkStatus, notFoundPrompt
- Tất cả hooks: useForm, useRouter, useAuthStore

🧪 Đã kiểm tra:
- Submit trống: ✅ Vẫn hiện lỗi
- Spinner loading: ✅ Vẫn hiện khi submit
- Social login: ✅ Vẫn gọi đúng API

🔗 Xem tại: http://localhost:3003/login
```

---

## ⚠️ Các bẫy thường gặp (Không được mắc)

| Bẫy | Hậu quả | Cách tránh |
|---|---|---|
| Xóa `{...register('field')}` | Form không submit được | Luôn giữ spread này |
| Quên `disabled={isLoading}` trên button | User có thể bấm 2 lần | Copy từ code gốc |
| Đổi `type="submit"` thành `type="button"` | Enter không submit được | Kiểm tra type |
| Thêm `onClick` vào button thay vì dùng `onSubmit` form | Logic onSubmit không chạy | Dùng `onSubmit` của form |
| Bỏ error message vì Figma không có | Bug UX — user không biết lỗi gì | Error message LUÔN giữ lại |
| Đổi cấu trúc HTML quá nhiều | Accessibility bị vỡ | Chỉ thêm wrapper, không xóa |
| Import thêm hook bên trong `_components/` UI | Trộn lẫn logic vào UI | UI chỉ nhận props, không gọi hook |

---

## Checklist nhanh trước khi commit

```
□ Đã đọc Figma và có screenshot
□ Đã lập bảng so sánh Figma vs code hiện tại
□ Đã xác định rõ VÙNG CẤM và VÙNG ĐƯỢC SỬA
□ Logic handlers KHÔNG bị đổi tên hay xóa
□ {...register()} KHÔNG bị xóa hay viết lại
□ disabled={isLoading} vẫn còn trên button
□ Đã chạy dev server và kiểm tra visual
□ Đã test ít nhất 3 case logic (submit, lỗi, thành công)
□ npx tsc --noEmit → 0 error
□ Đã báo cáo đúng format
```
---

## ⚠️ RULE BẮT BUỘC: Inline Style vs Tailwind Class

> 📖 Bài học gốc: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14)
> 📖 Chi tiết: `.agent/workflows/4-frontend-mockup-fidelity.md` section "INLINE STYLE vs TAILWIND CLASS"

### Đặc biệt quan trọng cho Figma → UI vì:
Figma thường có giá trị **ngẫu nhiên** (font 13.5px, radius 18px, color #FB923C, padding 17px 22px...) — RẤT dễ bị Tailwind JIT miss khi build.

### Quy tắc:
- ❌ KHÔNG ép giá trị Figma vào Tailwind arbitrary: `text-[13.5px]`, `rounded-[18px]`, `text-[#FB923C]`, `px-[17px]`
- ✅ ĐỔI ngay sang inline: `style={{ fontSize: 13.5, borderRadius: 18, color: '#FB923C', padding: '17px 22px' }}`
- ✅ Vẫn dùng Tailwind class cho layout (`flex`, `gap-2`, `mb-4`) — KHÔNG đụng đến chỗ chuẩn preset.

### Verify BẮT BUỘC sau khi đắp Figma xong:
1. F12 → tab **Computed** → check 3-5 element quan trọng nhất
2. So giá trị CSS thực tế với Figma inspect panel
3. Nếu lệch → đổi class arbitrary sang inline style NGAY
4. Báo done CHỈ KHI đã verify qua DevTools
