# 🧪 Debug URL Param — Xem màn hình nhanh không cần đi qua luồng thật

> Kỹ thuật Preview UI bằng tham số URL để tăng tốc phát triển và kiểm tra giao diện, **không ảnh hưởng logic Production**.

---

## 1. Vấn đề & Giải pháp

**Vấn đề:** Khi cần chỉnh UI một màn hình nằm sâu trong luồng (ví dụ: trang Cảm ơn sau khi gửi form liên hệ), dev phải làm lại toàn bộ các bước: vào trang Liên hệ → điền form → submit → xem trang cảm ơn. Tốn thời gian khi cần chỉnh pixel-perfect nhiều lần.

**Giải pháp:** Thêm một tham số "ảo" (Debug Param) vào URL để cưỡng bức ứng dụng hiển thị màn hình mong muốn ngay lập tức, **bỏ qua các bước kiểm tra trung gian**.

---

## 2. Quy trình thực hiện (4 bước an toàn)

Mẫu code dưới đây đảm bảo tính năng debug **chỉ hoạt động ở localhost** và **không thể kích hoạt trên Production**.

### Bước 1: Khai báo biến debug

Dùng `isDev` để bảo vệ — dù người dùng thật có gõ URL này trên web Production cũng không có tác dụng.

```tsx
'use client';

import { useSearchParams } from 'next/navigation';

const isDev = process.env.NODE_ENV === 'development';
const searchParams = useSearchParams();
const previewThankYou = isDev && searchParams.get('preview_thank_you') === '1';
```

### Bước 2: Bypass guard redirect

Ngăn các hiệu ứng chuyển trang tự động kích hoạt khi đang ở chế độ preview.

```tsx
useEffect(() => {
  if (previewThankYou) return; // Debug mode: ở lại màn hình để xem UI

  // Logic redirect thật
  if (!hasSubmittedForm) {
    router.replace('/contact');
  }
}, [hasSubmittedForm, previewThankYou]);
```

### Bước 3: Gắn điều kiện hiển thị UI

Thêm điều kiện `|| previewThankYou` vào khối logic render giao diện.

```tsx
// Hiển thị màn hình Cảm ơn khi form đã submit thật HOẶC đang preview
if (hasSubmittedForm || previewThankYou) {
  const userName = userInfo?.name ?? 'Anh/Chị'; // Fallback dữ liệu mẫu khi preview
  return <ThankYouScreen userName={userName} />;
}
```

### Bước 4: Xử lý hiệu ứng phụ (Animation)

Nếu màn hình có animation (vd fade-in confetti), cho phép animation chạy khi preview.

```tsx
useEffect(() => {
  // Reset animation về 0 khi không phải submit thật VÀ không phải preview
  if (!hasSubmittedForm && !previewThankYou) {
    setConfettiActive(false);
    return;
  }
  // Logic animation chạy bình thường
  setConfettiActive(true);
}, [hasSubmittedForm, previewThankYou]);
```

---

## 3. Tại sao cách làm này an toàn tuyệt đối?

| Môi trường | `isDev` | `preview_xxx=1` | Kết quả |
|---|---|---|---|
| **Production** | `false` | Có gõ vào URL | Biến debug luôn = `false` (Logic cũ giữ nguyên 100%) |
| **Localhost** | `true` | Không gõ | Biến debug = `false` (Luồng chạy bình thường) |
| **Localhost** | `true` | Có gõ | **Kích hoạt chế độ Preview UI** |

---

## 4. Cách sử dụng

Khi cần test màn hình "Cảm ơn" sau khi submit form liên hệ:

```
http://localhost:3005/contact?preview_thank_you=1
```

**Thông lệ đặt tên (snake_case):**

- `preview_thank_you=1` — màn hình cảm ơn
- `preview_loading=1` — màn hình đang xử lý
- `preview_error=1` — màn hình báo lỗi
- `preview_empty=1` — màn hình trống (chưa có dữ liệu)
- `preview_success=1` — màn hình thành công

---

## 5. Áp dụng cho nhiều màn hình khác nhau

### Ví dụ: Toggle nhiều state cùng lúc

```tsx
const previewLoading = isDev && searchParams.get('state') === 'loading';
const previewError = isDev && searchParams.get('state') === 'error';
const previewEmpty = isDev && searchParams.get('state') === 'empty';
```

URL gọi:
```
http://localhost:3005/blog?state=loading
http://localhost:3005/blog?state=error
http://localhost:3005/blog?state=empty
```

---

## 6. Dọn dẹp (Clean up)

Sau khi hoàn tất chỉnh UI:

- Nếu muốn giữ lại debug param (để dev sau dùng tiếp) → **giữ nguyên** (an toàn vì có `isDev` chặn)
- Nếu muốn xoá → tìm từ khoá `preview_` và xoá 4 điểm chạm ở Bước 1-4

> ✅ **Khuyến nghị:** Giữ lại các debug param — vì có `isDev` chặn nên không có rủi ro trên Production, và lần sau dev khác dùng tiếp được.

---

## 7. ❌ KHÔNG được làm

- ❌ Tạo debug param **không có** `isDev` chặn → Khách có thể truy cập màn hình ẩn trên Production
- ❌ Dùng debug param để **bypass authentication** thật trên Production → Lỗ hổng bảo mật nghiêm trọng
- ❌ Hardcode dữ liệu fake quá phức tạp trong preview → khó maintain, dùng `fallback` ngắn gọn

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Debug URL Param Guide*
