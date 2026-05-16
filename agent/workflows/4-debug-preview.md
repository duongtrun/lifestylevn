# /4-debug-preview — Thêm Debug Preview URL Cho Màn Hình

> **Mục đích:** Cho phép xem nhanh bất kỳ màn hình nào trong app mà không cần đi qua toàn bộ luồng.  
> **An toàn tuyệt đối:** `isDev=false` ở Production → mọi debug code = vô hiệu hóa hoàn toàn.  
> **Áp dụng cho:** Next.js App Router với `useSearchParams()`.

---

## 🔵 Khi nào dùng workflow này?

Dùng khi anh nói:
- `"Thêm debug preview cho màn hình [tên]"`
- `"Tôi muốn xem nhanh màn hình [tên] không cần đi qua luồng"`
- `"Tạo preview URL cho màn [tên]"`
- `"/4-debug-preview [tên màn hình]"`

---

## 📋 Bước 0 — Phân tích file mục tiêu (BẮT BUỘC trước khi code)

Trước khi thêm bất kỳ dòng nào, AI phải đọc file và xác định:

```
✅ Checklist phân tích:
[ ] Tên component chính (function XxxContent)
[ ] Có dùng useSearchParams() chưa? (nếu chưa → phải thêm import)
[ ] Có guard redirect bằng useEffect không? (nếu có → áp Bước 3A)
[ ] Có guard render bằng if-return không? (nếu có → áp Bước 3B)
[ ] Có useEffect/hook phụ thuộc cờ (generating, isPending, v.v.)? (nếu có → áp Bước 4)
[ ] Màn hình có cần mock data không? (nếu dùng data từ API → phải tạo MOCK_DATA)
```

---

## 📋 Bước 1 — Đặt tên param theo chuẩn

| Loại màn hình | Param |
|---|---|
| Loading / AI đang xử lý | `preview_loading=1` |
| Kết quả / Report | `preview_snapshot=1` / `preview_report=1` |
| Màn hình lỗi | `preview_error=1` |
| Màn hình trống | `preview_empty=1` |
| Màn hình khác | `preview_[tên_ngắn]=1` |

**Quy tắc:** Luôn bắt đầu bằng `preview_` để phân biệt với param thật.

---

## 📋 Bước 2 — Khai báo biến debug (LUÔN có isDev guard)

Thêm ngay sau khi khai báo `useSearchParams()` hoặc các param khác:

```tsx
// ── DEBUG ONLY (dev only): ?preview_[tên]=1 → xem UI mà không cần luồng thật
// Chỉ hoạt động ở localhost (NODE_ENV=development) — TẮT HOÀN TOÀN khi deploy Production
// Tại Production: isDev = false → previewXxx = false → code chạy y hệt như cũ
const isDev = process.env.NODE_ENV === 'development';
const previewXxx = isDev && searchParams.get('preview_[tên]') === '1';
```

> ⚠️ **TUYỆT ĐỐI KHÔNG** khai báo thiếu `isDev &&`. Nếu thiếu, user thật có thể kích hoạt được.

---

## 📋 Bước 3A — Bypass guard redirect (useEffect)

Nếu component có `useEffect` tự redirect khi thiếu điều kiện:

```tsx
// TRƯỚC (code cũ)
useEffect(() => {
  if (!childId) router.replace('/onboarding/create-child');
}, [childId]);

// SAU (thêm debug)
useEffect(() => {
  if (previewXxx) return; // << debug mode: ở lại màn hình
  if (!childId) router.replace('/onboarding/create-child');
}, [childId, previewXxx]);
// ✅ An toàn: previewXxx=false ở Production → if bị bỏ qua, chạy như cũ
```

---

## 📋 Bước 3B — Bypass guard render (if-return block)

Nếu component có các block `if (!xxx) return <ErrorUI />`:

```tsx
// TRƯỚC (code cũ)
if (!snapshotId) return <ErrorUI />;
if (isLoading)   return <LoadingUI />;
if (error)       return <ErrorUI />;

// SAU (thêm debug)
if (!snapshotId && !previewXxx) return <ErrorUI />;   // ✅ &&false = không đổi ở Prod
if (isLoading && !previewXxx)   return <LoadingUI />;  // ✅ &&false = không đổi ở Prod
if ((error || !report) && !previewXxx) return <ErrorUI />; // ✅
```

---

## 📋 Bước 4 — Sửa useEffect animation/side-effect (nếu có)

Nếu màn hình cần preview có animation phụ thuộc vào cờ trạng thái (generating, isPending...):

```tsx
// TRƯỚC (code cũ)
useEffect(() => {
  if (!generating) {
    setFakeProgress(0);
    return;
  }
  // ... animation logic
}, [generating]);

// SAU (thêm debug)
useEffect(() => {
  if (!generating && !previewXxx) {  // << thêm && !previewXxx
    setFakeProgress(0);
    return;
  }
  // ... animation logic GIỮ NGUYÊN 100%
}, [generating, previewXxx]);
// ✅ An toàn: !previewXxx = !false = true ở Prod → !generating&&true = !generating (y hệt cũ)
```

---

## 📋 Bước 5 — Tạo MOCK_DATA (nếu màn hình dùng data từ API)

Nếu màn hình render data từ API (report, snapshot, list...), phải tạo mock data thực tế:

```tsx
// Đặt TRƯỚC function component, NGOÀI component (không tạo lại mỗi render)
const MOCK_[TÊN] = {
  // Phải có đủ cấu trúc để render TOÀN BỘ UI mà không bị null/lỗi
  field1: 'giá trị mẫu',
  field2: [...],
  // ...
};

// Trong component, dùng mock thay API khi preview:
const { data: dataRaw, isLoading, error } = useXxxHook(id, !!id && !previewXxx);
const data = previewXxx ? MOCK_[TÊN] : dataRaw;
// ✅ An toàn: previewXxx=false ở Prod → data = dataRaw (y hệt cũ)
```

---

## 📋 Bước 6 — Kiểm tra và báo cáo

Sau khi code xong, AI phải:

1. **Xác nhận 4 điểm an toàn Production** bằng bảng sau:

| Điều kiện trong code | Ở Production | Ở Localhost (có param) |
|---|---|---|
| `previewXxx` | Luôn `false` | `true` |
| Bước 3A: `if (previewXxx) return;` | Bị bỏ qua ✅ | Kích hoạt bypass |
| Bước 3B: `if (!xxx && !previewXxx)` | = `if (!xxx)` ✅ | Luôn false → không block |
| Bước 4: `if (!flag && !previewXxx)` | = `if (!flag)` ✅ | = false → animation chạy |

2. **Trả về URL test** để anh test ngay:
```
🔗 URL test: http://localhost:3003/[đường-dẫn]?preview_[tên]=1[&các-param-bổ-sung]
```

---

## 🧹 Dọn dẹp khi không cần nữa

Khi anh nói `"Bỏ debug preview [tên] đi"`, tìm và revert theo checklist:

```
[ ] Xóa 2 dòng khai báo isDev + previewXxx
[ ] Bước 3A: Xóa `if (previewXxx) return;` + xóa previewXxx khỏi deps array
[ ] Bước 3B: Bỏ `&& !previewXxx` khỏi tất cả if-guard
[ ] Bước 4: Bỏ `&& !previewXxx` khỏi useEffect + deps array
[ ] Bước 5: Xóa const MOCK_[TÊN] + dòng dùng mock
```

---

## 📖 Ví dụ thực tế đã áp dụng

| Màn hình | File | URL test |
|---|---|---|
| Loading AI phân tích | `survey/page.tsx` | `localhost:3003/onboarding/survey?subject_id=math&child_id=test&preview_loading=1` |
| Kết quả Snapshot | `snapshot-report/page.tsx` | `localhost:3003/onboarding/snapshot-report?preview_snapshot=1&child_name=Tubi&subject_id=math` |

---

## ⚠️ Những điều TUYỆT ĐỐI KHÔNG làm

```
❌ KHÔNG khai báo thiếu isDev guard: const previewXxx = searchParams.get(...) === '1'
❌ KHÔNG sửa bất kỳ logic nghiệp vụ nào khác ngoài 4 bước trên
❌ KHÔNG tạo mock data bằng cách import file mock riêng (giữ inline trong file)
❌ KHÔNG thêm preview vào các route có liên quan đến thanh toán / xác thực / dữ liệu nhạy cảm
```
