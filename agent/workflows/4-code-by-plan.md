---
description: Quy trình code nghiêm kỷ theo kế hoạch đã duyệt - không code lan, không sửa linh tinh
---

// turbo-all

# 📌 WORKFLOW: CODE THEO KẾ HOẠCH (PLAN-LOCK)

## Mục đích
Sau khi bạn **đã duyệt kế hoạch**, AI phải code ĐÚNG những gì đã được duyệt.
Không tự ý mở rộng, không sửa phần không liên quan, không "tiện tay sửa luôn".

---

## NGUYÊN TẮC CỐT LÕI

```
✅ Được phép:
- Code đúng task trong kế hoạch đã duyệt
- Hỏi khi có điều chưa rõ trong task đó
- Đề xuất (KHÔNG tự làm) khi phát hiện vấn đề liên quan

❌ KHÔNG được phép:
- Sửa file không nằm trong scope của task
- "Tiện tay refactor" code đang chạy tốt
- Thêm tính năng không có trong kế hoạch
- Thay đổi UI/UX của màn hình khác
- Sửa database schema ngoài task
- Xóa hoặc đổi tên biến/hàm không liên quan
```

---

## QUY TRÌNH SAU KHI KẾ HOẠCH ĐƯỢC DUYỆT

```
👑 Bạn: "OK, bắt đầu đi" / "Duyệt rồi, làm đi"
         │
         ▼
🤖 AI LẬP SCOPE LOCK (tự động)
──────────────────────────────
Trước khi code, AI liệt kê rõ:

📋 SCOPE CỦA TASK NÀY:
  ✅ Sẽ tạo/sửa:
     - /src/api/orders.js        (tạo mới)
     - /src/models/Order.js      (tạo mới)
     - /src/routes/api.js        (thêm route)
  🚫 KHÔNG đụng vào:
     - /src/api/users.js         (không liên quan)
     - /src/components/Header.js (không liên quan)
     - Database bảng users       (không liên quan)

Bạn xác nhận scope? → "OK" / "Thêm [X] vào scope"

         ▼
🤖 AI CODE TRONG SCOPE
──────────────────────
Làm đúng từng subtask theo thứ tự kế hoạch
Cập nhật tiến độ sau mỗi subtask xong

         ▼
🚨 NẾU PHÁT HIỆN VẤN ĐỀ NGOÀI SCOPE
──────────────────────────────────────
AI DỪNG LẠI và báo:

⚠️ PHÁT HIỆN VẤN ĐỀ NGOÀI SCOPE

Vấn đề: [Mô tả vấn đề tìm thấy]
Nằm tại: [File/Component bị ảnh hưởng]
Mức độ: 🔴 Nghiêm trọng / 🟡 Cần xử lý / 🟢 Có thể để sau

Đề xuất giải pháp:
  Option A: [Cách xử lý] — Mất thêm [thời gian]
  Option B: [Cách xử lý] — Mất thêm [thời gian]
  Option C: Ghi vào backlog, xử lý sau

👉 Bạn chọn gì?

[AI DỪNG, CHỜ QUYẾT ĐỊNH]

         ▼
👑 BẠN QUYẾT ĐỊNH
──────────────────
"Làm option A"    → AI mở rộng scope, tiếp tục
"Để sau"          → AI ghi backlog, tiếp tục task hiện tại
"Dừng lại làm bug này trước" → Chuyển sang /bugfix

         ▼
✅ HOÀN THÀNH TASK
───────────────────
AI báo cáo:
  ✅ XONG: [Tên task]
  📁 File đã tạo/sửa: [danh sách đúng scope]
  🚫 Không đụng vào: [file không liên quan]
  📋 Backlog issues: [danh sách vấn đề phát hiện nhưng để sau]
  🔗 Test tại: [URL]
  🔜 Task tiếp theo: [theo kế hoạch]
```

---

## DẤU HIỆU AI ĐANG "CODE LAN" (Bạn cần dừng lại)

Nếu thấy AI làm những điều này → **Dừng ngay, nhắc lại**:

| ⚡ Tín hiệu | 💬 Nói với AI |
|--------------|--------------|
| Sửa file không trong scope | "Dừng lại. Tại sao sửa file đó?" |
| Thêm tính năng không có trong plan | "Tính năng này không có trong kế hoạch" |
| Refactor code đang chạy tốt | "Đừng sửa code đang chạy" |
| Thay đổi UI màn hình khác | "Chỉ làm màn hình [X], không đụng màn hình [Y]" |
| Hỏi quá nhiều câu hỏi ngoài task | "Tập trung vào task hiện tại" |

---

## FORMAT ĐỀ XUẤT CHUẨN (AI dùng khi phát hiện vấn đề)

```
⚠️ PHÁT HIỆN VẤN ĐỀ LIÊN QUAN — CẦN QUYẾT ĐỊNH

📍 Vị trí: [file:line hoặc component]
🔍 Vấn đề: [Mô tả bằng tiếng người thường]
🎯 Ảnh hưởng: [Nếu không sửa thì điều gì xảy ra?]
📊 Mức độ: [🔴 Phải sửa ngay / 🟡 Nên sửa / 🟢 Cosmetic]

Đề xuất:
  A) [Giải pháp] — Thêm [X] phút vào task hiện tại
  B) [Giải pháp] — Tạo task mới trong sprint
  C) Ghi backlog, không xử lý ngay

👉 Bạn chọn A / B / C?
```

---

## BACKLOG FORMAT (AI tự động ghi khi chọn "để sau")

```markdown
# 📋 BACKLOG ISSUES — [Ngày phát hiện]

## 🟡 [Tên vấn đề]
- Phát hiện khi làm: [Task gốc]
- Vị trí: [file/component]
- Mô tả: [Chi tiết]
- Đề xuất sửa: [Cách sửa]
- Ưu tiên: High / Medium / Low
```

---

## RULE BẮT BUỘC (AI PHẢI TUÂN THEO)

1. **SCOPE LOCK trước khi code** — Luôn liệt kê file sẽ sửa, chờ confirm
2. **Một task một lúc** — Không làm song song 2 task khác nhau
3. **Hỏi trước khi mở rộng scope** — Không tự quyết sửa thêm
4. **Báo cáo vấn đề, không tự sửa** — Phát hiện issue ngoài scope → đề xuất, chờ duyệt
5. **Danh sách file chính xác** — Báo cáo cuối phải liệt kê ĐÚNG file đã sửa
6. **Không "refactor tiện tay"** — Code đang chạy tốt → không đụng vào
7. **Logic cũ phải giữ nguyên** — Chỉ thêm, không phá existing logic
