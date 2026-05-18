---
description: Quy trình sửa bug - từ báo cáo lỗi đến fix và verify
---

# 🐛 WORKFLOW: BUGFIX

## Khi nào dùng?
Khi có lỗi được báo cáo từ user, từ monitoring, hoặc bạn tự phát hiện.

---

## PHÂN LOẠI BUG THEO MỨC ĐỘ

### 🔴 P0 — CRITICAL (Làm ngay, trong 1 giờ)
- Production sập hoàn toàn
- User không đăng nhập được
- Mất dữ liệu người dùng
- Lỗ hổng bảo mật nghiêm trọng

### 🟠 P1 — HIGH (Trong ngày hôm nay)
- Tính năng chính bị lỗi
- Ảnh hưởng >50% user
- Thanh toán bị lỗi

### 🟡 P2 — MEDIUM (Trong sprint này)
- Tính năng phụ bị lỗi
- UI hiển thị sai
- Ảnh hưởng <10% user

### 🟢 P3 — LOW (Backlog)
- Lỗi nhỏ về UX
- Text sai chính tả
- Animation không mượt

---

## QUY TRÌNH XỬ LÝ BUG

```
BƯỚC 1: MÔ TẢ BUG (Bạn làm)
─────────────────────────────
Nói với AI:
"Bug: [Mô tả lỗi]
Bước tái hiện: [Làm gì để lỗi xảy ra]
Kết quả hiện tại: [Thấy gì]
Kết quả mong muốn: [Phải như thế nào]
Môi trường: [Production/Staging/Local]
Mức độ: [P0/P1/P2/P3]"

         ↓
BƯỚC 2: AI ĐIỀU TRA (AI làm tự động)
─────────────────────────────────────
AI sẽ:
- 🔧 Đọc error logs (terminal / file log) lấy chính xác thông báo lỗi
- 🔧 Kiểm tra log bot để tái hiện luồng bug
- Tìm đoạn code liên quan
- Phân tích nguyên nhân gốc rễ
- Đề xuất 1-3 cách sửa

⛔ KHÔNG được kết luận nguyên nhân bug khi chưa đọc log thực tế

         ↓
BƯỚC 3: BẠN CHỌN CÁCH SỬA
──────────────────────────
AI trình bày options:
Option A: [Mô tả] — Nhanh nhưng có risk là...
Option B: [Mô tả] — An toàn hơn, mất thêm 30 phút
Option C: [Mô tả] — Tối ưu nhất, nhưng cần refactor...

Bạn chọn: "Làm theo option A"

         ↓
BƯỚC 4: AI SỬA VÀ TEST
──────────────────────
AI tự:
- Sửa code
- Viết test case cho bug này
- Chạy test
- Báo cáo kết quả

         ↓
BƯỚC 5: VERIFY (Bạn kiểm tra)
────────────────────────────
- Xác nhận bug đã hết chưa
- Không có side effects không?

         ↓
BƯỚC 6: DEPLOY & MONITOR
─────────────────────────
AI deploy → Theo dõi 15 phút → Báo cáo
```

---

## FORMAT MÔ TẢ BUG CHUẨN

```
🐛 BUG REPORT

Tiêu đề: [Mô tả ngắn gọn]
Mức độ: P0/P1/P2/P3
Môi trường: Production / Staging / Local

Bước tái hiện:
1. Vào trang [URL]
2. Click [nút gì]
3. Nhập [dữ liệu gì]

Kết quả hiện tại: [Thấy gì]
Kết quả mong muốn: [Phải như thế nào]

Screenshot/Video: [đính kèm nếu có]
Error message: [copy paste lỗi nếu có]
```

---

## RULE BUGFIX

1. **P0 bỏ hết việc khác** — Fix ngay, không trì hoãn
2. **Root cause trước** — Hiểu nguyên nhân trước khi sửa
3. **Viết test** — Mỗi bug fix phải có test case để không tái phát
4. **Document** — Ghi lại bug, nguyên nhân, cách sửa
5. **Hotfix riêng** — P0/P1 không chờ next sprint, deploy ngay
6. **Postmortem P0** — Sau khi fix xong, phân tích tại sao xảy ra
7. **Log trước, code sau** — Phải đọc log terminal/server lấy lỗi chính xác trước khi mở code
8. **Verify sau fix** — Sau khi fix, chạy lại luồng (test script hoặc thủ công) để xác nhận bug đã hết
