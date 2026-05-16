# 📐 Workflow: /2-plan-from-mockup
# Lên Kế Hoạch Triển Khai Từ File Mockup
> **Dùng khi:** Đã có file mockup (HTML/Figma/ảnh) và cần lên plan + chia scope để code đúng ngay lần đầu
> **Output:** File `PLAN.md` với đủ: phân tích màn hình, scope, rủi ro, phân quyền, luồng dữ liệu

---

## Bước 0 — CHUẨN BỊ ĐẦU VÀO
Trước khi làm gì, phải xác định đủ 3 thứ này:

```
□ 1. File mockup ở đâu? (đường dẫn cụ thể)
□ 2. Dự án đang dùng tech stack gì? (Next.js / FastAPI / ...)
□ 3. Đây là tính năng mới hoàn toàn hay bổ sung vào hệ thống cũ?
```

Nếu thiếu bất kỳ mục nào → hỏi anh trước, không tiến tiếp.

---

## Bước 1 — ĐỌC & PHÂN TÍCH MOCKUP

### 1A. Liệt kê tất cả màn hình / form / tab
Đọc file mockup từ trên xuống dưới. Lập bảng:

| STT | Tên màn hình / Tab | Mô tả ngắn | Người dùng nào thấy |
|-----|-------------------|------------|---------------------|
| 1   | ...               | ...        | Admin / Manager / User |

### 1B. Xác định các thành phần giao diện (Component)
Liệt kê các khối UI lặp lại hoặc đặc biệt cần tạo riêng:

```
Ví dụ:
- Bảng điểm (EvalTable)
- Card thống kê (StatsCard)
- Form tạo mới (CreateForm)
- Nút quyết định (DecisionPanel)
- Khối chữ ký (SignatureBlock)
```

### 1C. Xác định luồng chính (User Flow)
Vẽ luồng người dùng làm gì theo trình tự thực tế:

```
Ví dụ:
Admin tạo form → Nhân viên nhận thông báo → Nhân viên điền → Submit
→ Manager chấm điểm → Kết luận → Nhân viên xem kết quả
```

### 1D. Xác định dữ liệu cần lưu
Nhìn vào từng ô input, dropdown, textarea trong mockup → liệt kê:

```
Bảng cần có:
- users (ai?)
- [tên chức năng] (lưu cái gì?)
- ...

Quan hệ:
- users 1 → N evaluations
- ...
```

---

## Bước 2 — PHÂN QUYỀN (ROLE & PERMISSION)

Xác định có bao nhiêu loại người dùng và ai được làm gì:

| Quyền hạn | Role A | Role B | Role C |
|-----------|--------|--------|--------|
| Tạo mới   | ✅     | ❌     | ❌     |
| Xem toàn bộ | ✅   | ❌     | ❌     |
| Chỉ xem của mình | ❌ | ✅   | ✅     |
| Phê duyệt | ❌     | ✅     | ❌     |
| ...       | ...    | ...    | ...    |

> ⚠️ Chú ý: Phân quyền phải khớp với những gì hiển thị trong mockup. Màn hình nào chỉ dành cho role nào → ghi rõ.

---

## Bước 3 — TRẠNG THÁI DỮ LIỆU (STATUS FLOW)

Nếu có form/task/request cần duyệt → bắt buộc vẽ vòng đời trạng thái:

```
VÍ DỤ:
DRAFT → SUBMITTED → UNDER_REVIEW → COMPLETED → ACKNOWLEDGED
                                 ↘ REJECTED

Ngoài luồng chính:
- CANCELLED (bị hủy bởi Admin)
- EXPIRED (quá hạn)
```

> Ghi rõ: Ai có quyền chuyển từ trạng thái nào sang trạng thái nào.

---

## Bước 4 — CHIA SCOPE

**Nguyên tắc chia scope:**
- Mỗi scope phải chạy được độc lập sau khi hoàn thành
- Scope sau KHÔNG thể bắt đầu khi scope trước chưa xong
- Mỗi scope tối đa 1-2 tuần

**Template chia scope chuẩn:**

```
SCOPE 1 — [Tên] (Nền tảng)
  Mục tiêu: ...
  Làm gì:
    - [ ] ...
  File tạo mới:
    - src/...
  PASS khi: ...

SCOPE 2 — [Tên] (Core Feature)
  Mục tiêu: ...
  Làm gì:
    - [ ] ...
  File tạo mới:
    - src/...
  PASS khi: ...

SCOPE 3 — [Tên] (Duyệt / Dashboard)
  ...

SCOPE 4 — [Tên] (Hoàn thiện / Deploy)
  ...
```

> Thông thường sẽ có 3-5 scope. Không chia quá nhỏ (dưới 3 scope) cũng không quá lớn (trên 6 scope).

---

## Bước 5 — ĐÁNH GIÁ RỦI RO

Với mỗi rủi ro, điền bảng sau:

```
⚠️ Rủi ro [N]: [Tình huống xảy ra]
Khả năng xảy ra: Cao / Trung bình / Thấp
Mức độ ảnh hưởng: Cao / Trung bình / Thấp
Cách xử lý:
  → [Giải pháp cụ thể trong code/logic]
```

**Các rủi ro phổ biến cần kiểm tra với MỌI dự án:**

| # | Rủi ro thường gặp | Cần xử lý? |
|---|------------------|------------|
| 1 | User điền dở rồi tắt → mất dữ liệu | Nếu có form dài |
| 2 | 2 người cùng sửa 1 record → xung đột | Nếu nhiều người dùng |
| 3 | Người dùng không biết có việc cần làm | Nếu có luồng duyệt |
| 4 | Dữ liệu liên quan bị cũ/sai | Nếu lấy từ user profile |
| 5 | Phân quyền bị bypass | Luôn luôn cần kiểm tra |
| 6 | Xóa dữ liệu nhầm | Nếu có nút xóa |
| 7 | Form không phù hợp thực tế công việc | Nếu có tiêu chí tùy chỉnh |

---

## Bước 6 — DANH SÁCH API ENDPOINT

Liệt kê tất cả API cần viết, dựa trên mockup:

| Method | Endpoint | Ai gọi | Làm gì |
|--------|----------|--------|--------|
| GET    | /api/... | ...    | ...    |
| POST   | /api/... | ...    | ...    |
| PUT    | /api/... | ...    | ...    |
| DELETE | /api/... | ...    | ...    |

---

## Bước 7 — OUTPUT CUỐI (File PLAN.md)

Sau khi hoàn thành Bước 1–6, tổng hợp lại thành 1 file duy nhất:

```
📄 File: [tên-dự-án]/PLAN.md

Nội dung gồm:
✅ Phân tích màn hình (Bước 1)
✅ Phân quyền (Bước 2)
✅ Trạng thái dữ liệu (Bước 3)
✅ Scope chi tiết (Bước 4)
✅ Rủi ro & xử lý (Bước 5)
✅ Danh sách API (Bước 6)
```

**Sau khi tạo PLAN.md:**
→ Trình anh xem và chờ duyệt
→ Không code khi chưa được duyệt
→ Khi anh OK → áp dụng `/4-code-by-plan` để triển khai theo từng scope

---

## Checklist tự kiểm tra trước khi trình plan

```
□ Đã liệt kê đủ tất cả màn hình trong mockup?
□ Đã xác định đủ role và phân quyền?
□ Đã có status flow nếu có luồng duyệt?
□ Mỗi scope có mục tiêu rõ ràng và PASS condition cụ thể?
□ Đã kiểm tra 7 rủi ro phổ biến?
□ Đã liệt kê đủ API endpoint?
□ File PLAN.md đã được tạo và trình anh duyệt?
```

---

*Workflow này áp dụng cho MỌI dự án có file mockup. Không cần chỉnh sửa theo dự án cụ thể.*
