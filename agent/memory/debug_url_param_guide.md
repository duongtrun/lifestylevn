# 🧪 iruka-app — Debug URL Param (Xem Màn Hình Nhanh Không Cần Luồng Thật)

Tài liệu này hướng dẫn cách sử dụng kỹ thuật Preview UI bằng tham số URL để tăng tốc độ phát triển và kiểm tra giao diện mà không ảnh hưởng đến logic Production.

---

## 1. Vấn đề & Giải pháp

**Vấn đề:** Khi cần chỉnh sửa UI của một màn hình nằm sâu trong luồng (ví dụ: màn hình Loading sau khi nộp khảo sát), developer phải thực hiện lại toàn bộ các bước: Đăng nhập → Chọn môn → Làm khảo sát → Nộp → Xem kết quả. Việc này gây mất thời gian khi phải chỉnh sửa pixel-perfect.

**Giải pháp:** Thêm một tham số "ảo" (Debug Param) vào URL để cưỡng bức ứng dụng hiển thị màn hình mong muốn ngay lập tức, bỏ qua các bước kiểm tra (redirect) trung gian.

---

## 2. Quy trình thực hiện (4 bước an toàn)

Mẫu code dưới đây đảm bảo tính năng debug **chỉ hoạt động ở localhost** và **không thể kích hoạt trên môi trường Production**.

### Bước 1: Khai báo biến debug
Sử dụng `isDev` để bảo vệ, đảm bảo dù người dùng thật có gõ URL này trên web thật cũng không có tác dụng.

```tsx
// Chỉ bật ở localhost (NODE_ENV=development)
const isDev = process.env.NODE_ENV === 'development';
const previewLoading = isDev && searchParams.get('preview_loading') === '1';
```

### Bước 2: Bypass guard redirect
Ngăn không cho các hiệu ứng chuyển trang (redirect) tự động kích hoạt khi đang ở chế độ preview.

```tsx
useEffect(() => {
  if (previewLoading) return; // << Debug mode: ở lại màn hình để xem UI
  if (!childId) {
    router.replace('/onboarding/create-child');
  }
}, [childId, previewLoading]);
```

### Bước 3: Gắn điều kiện hiển thị UI
Thêm điều kiện `|| previewLoading` vào khối logic render giao diện.

```tsx
// Hiển thị màn hình loading khi AI đang xử lý HOẶC khi đang preview
if (generating || previewLoading) {
  const childName = currentChild?.full_name ?? 'Tubi'; // Fallback dữ liệu mẫu
  return <LoadingScreen childName={childName} />;
}
```

### Bước 4: Xử lý Side Effects (Animation)
Nếu màn hình có hiệu ứng (như thanh Progress bar), cần cho phép hiệu ứng chạy khi preview.

```tsx
useEffect(() => {
  // Chỉ reset về 0 khi không phải đang xử lý thật VÀ không phải đang preview
  if (!generating && !previewLoading) {
    setFakeProgress(0);
    return;
  }
  // Logic animation chạy bình thường...
}, [generating, previewLoading]);
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

Khi cần test màn hình Loading của khảo sát, truy cập URL:
`http://localhost:3003/onboarding/survey?preview_loading=1`

**Thông lệ đặt tên:**
- `preview_loading=1`
- `preview_report=1`
- `preview_empty=1`

---

## 5. Dọn dẹp (Clean up)

Sau khi hoàn tất việc chỉnh sửa UI, nếu muốn làm sạch code, chỉ cần tìm từ khóa `preview_` và xóa 4 điểm chạm đã nêu ở phần 2. Xóa các biến này không gây ảnh hưởng đến logic nghiệp vụ chính.
