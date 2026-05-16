---
description: Viết test checklist thủ công cho bất kỳ module nào — bảng test case chi tiết từng bước, có Làm gì → Kỳ vọng → Kết quả ✅/❌, dùng 1 mình hoặc giao tester
---

# /5-test-manual — Workflow Viết Test Checklist Thủ Công

> Áp dụng cho: Discord Bot, Web App, API, Mobile App, Game, Dashboard...
> Nguyên tắc: **Người không biết code vẫn test được** — đọc là làm được, kết quả rõ ràng ✅/❌.

---

## PHẦN 1: ĐỌC FILE NÀY NHƯ THẾ NÀO?

File Checklist phải được viết theo nguyên tắc **từ tổng quan → chi tiết**. Người test sẽ đọc tuần tự:

1. **Mục tiêu & tầm nhìn** — hiểu hệ thống này sinh ra để làm gì, phục vụ ai
2. **Sơ đồ luồng** — hình dung luồng chạy của hệ thống trước khi test từng phần
3. **Checklist chi tiết** — test từng nhóm tính năng, từng case cụ thể
4. **Bảng tổng kết** — nghiệm thu đạt/không đạt để ký duyệt

---

## PHẦN 2: NGUYÊN TẮC TẦM NHÌN (BẮT BUỘC ĐẦU FILE)

> Mỗi file `test-checklist.md` PHẢI có phần này ở đầu. Người test (kể cả không biết code) phải hiểu được HỆ THỐNG ĐANG TEST LÀ GÌ và TẠI SAO phải test.

### Template Tầm Nhìn:

```markdown
# [Tên Dự Án] — Test Checklist Thủ Công

> **Tài liệu dành cho**: [QA Tester / Nhân sự quản lý / System Admin]
> **Phiên bản:** v[X] | **Ngày test:** [YYYY-MM-DD]

---

# PHẦN 1: MỤC TIÊU VÀ TẦM NHÌN

Trước khi test, người sử dụng cần hiểu rõ hệ thống này giải quyết vấn đề gì.

### Dành cho [Vai trò 1 — VD: CEO/Quản lý]
- **[Vấn đề 1]:** [Giải thích hệ thống giải quyết vấn đề gì cho vai trò này]
- **[Vấn đề 2]:** [...]

### Dành cho [Vai trò 2 — VD: Nhân viên/Người dùng]
- **[Vấn đề 1]:** [...]

### Tiêu chí Thành Công (Definition of Done)
Hệ thống được coi là hoạt động ĐÚNG khi:
- [ ] [Tiêu chí 1 — đo được, quan sát được]
- [ ] [Tiêu chí 2]
```

---

## PHẦN 3: NGUYÊN TẮC SƠ ĐỒ LUỒNG (BẮT BUỘC TRƯỚC CHECKLIST)

> Trước phần test case, PHẢI có ít nhất 1-2 sơ đồ Mermaid mô tả luồng hệ thống. Người test nhìn vào sơ đồ sẽ hiểu "tôi đang test cái gì, nó chạy ra sao".

### Quy tắc vẽ Mermaid (tương thích version 8.8.0):

```
✅ CHỈ dùng: graph TD / graph LR / sequenceDiagram
✅ Trong sequenceDiagram: chỉ dùng "participant" (KHÔNG dùng "actor")
✅ Bọc nhãn có ký tự đặc biệt bằng dấu ngoặc kép: "Nhãn (có dấu)"
✅ Ghi chú thời gian: Note over [A,B]: nội dung

❌ KHÔNG dùng: flowchart TD, mindmap, timeline
❌ KHÔNG dùng: autonumber, rect trong sequenceDiagram  
❌ KHÔNG dùng: %%{init: {'theme': 'base'}}%%
❌ KHÔNG dùng: ([...]) hoặc [(...)]) node shapes phức tạp
```

### Template 2 loại sơ đồ quan trọng nhất:

```markdown
### Luồng [Tính năng chính] — [Ví dụ: Báo cáo & Đánh giá]
```mermaid
sequenceDiagram
    participant A as [Tên vai trò A]
    participant B as [Tên vai trò B]
    participant C as [Hệ thống/AI]

    Note over A,B: [Mốc thời gian hoặc điều kiện]
    A->>B: [Hành động]
    B-->>A: [Phản hồi]
    Note over B,C: [Ghi chú tiếp theo]
    C->>A: [Kết quả cuối]
` `` ` (bỏ dấu cách)

### Luồng [Tính năng phụ] — [Ví dụ: Giao tiếp 2 chiều]
```mermaid
graph TD
    A["[Vai trò A]"] -->|[Hành động]| B{"[Bộ xử lý]"}
    B -->|[Kết quả 1]| C["[Đầu ra 1]"]
    B -->|[Kết quả 2]| D["[Đầu ra 2]"]
` `` ` (bỏ dấu cách)
```

---

## PHẦN 4: NHÓM TEST CASE BẮT BUỘC (THEO LOẠI DỰ ÁN)

### Nguyên tắc nhóm hóa test case

Test case phải nhóm theo **MỤC TIÊU NGHIỆP VỤ**, không nhóm theo file code hay tên hàm. Ví dụ:

| Sai (nhóm theo code) | Đúng (nhóm theo nghiệp vụ) |
|---|---|
| Nhóm A: handlers/relayA.js | Nhóm A: Giao tiếp CEO ↔ Nhân viên |
| Nhóm B: services/broadcast.js | Nhóm B: Thông báo & Triệu tập toàn đội |
| Nhóm C: scheduler.js | Nhóm C: Tự động hóa & Đôn đốc |

---

### DISCORD BOT — Các nhóm bắt buộc:

```
□ Nhóm 1: Tổng hợp, Đánh giá & Góp ý Nhân viên (AI/Cron)   ← NHÓM QUAN TRỌNG NHẤT
  - Bot tự động nhắc nhở ai chưa báo cáo
  - AI tổng hợp năng suất, gợi ý khen/phê bình cho CEO
  - Báo cáo KPI cuối tháng có xếp hạng

□ Nhóm 2: Giao tiếp CEO ↔ Nhân viên (Relay 2 chiều)
  - CEO gửi lệnh → nhân viên nhận đúng
  - Nhân viên báo cáo → CEO nhận kèm icon phân loại (🚨 Khẩn / 🏖️ Nghỉ / 📊 Báo cáo)
  - Truyền file tài liệu 2 chiều + lưu local

□ Nhóm 3: Thông báo chớp nhoáng (@all Broadcast)
  - @all / @all-dm / @all-channel
  - Báo cáo số người nhận thành công

□ Nhóm 4: Khảo sát (@poll)
  - Tạo poll, nhân viên vote, ghi nhận kết quả

□ Nhóm 5: Hẹn giờ nhắc việc (@nhắc)
  - Đặt lịch, nhắc đúng giờ, hủy lịch
  - Nhắc cá nhân / nhóm / toàn team

□ Nhóm 6: Standup Daily (tự động 9h sáng)
  - Bot tự hỏi 3 câu lúc 9h
  - Nhắc nhở 9h20 nếu chưa có ai
  - Tổng hợp gửi CEO lúc 9h30

□ Nhóm 7: Báo cáo MCP (Antigravity AI)
  - AI đọc kênh → tóm tắt → DM CEO
  - Fallback nếu bot offline

□ Nhóm 8: Slash Commands (/assign, /members, /status)

□ Nhóm 9: Chống sập, khôi phục dữ liệu (Edge Cases)
```

### WEB APP / DASHBOARD — Các nhóm bắt buộc:

```
□ Nhóm 1: Mục tiêu nghiệp vụ chính (VD: Quản lý nội dung / Giao dịch / Học tập)
□ Nhóm 2: Xác thực & Phân quyền (đăng nhập, role, token)
□ Nhóm 3: CRUD nghiệp vụ chính (tạo, xem, sửa, xóa)
□ Nhóm 4: Thông báo & Phản hồi người dùng
□ Nhóm 5: Điều hướng & Navigation
□ Nhóm 6: Edge cases (lỗi mạng, dữ liệu rỗng, giá trị cực đại)
```

### REST API — Các nhóm bắt buộc:

```
□ Nhóm 1: Luồng nghiệp vụ chính (VD: Đăng ký tài khoản → Xác minh → Sử dụng)
□ Nhóm 2: Authentication (JWT, refresh token, hết hạn)
□ Nhóm 3: Authorization (user A không đọc data user B)
□ Nhóm 4: CRUD endpoints (status code, body, header)
□ Nhóm 5: Validation (body sai, thiếu field, kiểu dữ liệu không đúng)
□ Nhóm 6: Error handling (404, 500, rate limit)
```

### MINI-GAME — Các nhóm bắt buộc:

```
□ Nhóm 1: Mục tiêu học tập của game (KPI giáo dục đạt chưa?)
□ Nhóm 2: Khởi động game (loading, state ban đầu)
□ Nhóm 3: Core gameplay (logic điểm, thắng/thua)
□ Nhóm 4: UI/UX (nút, animation, âm thanh)
□ Nhóm 5: Telemetry (dữ liệu gửi về SDK đúng không)
□ Nhóm 6: Edge cases (timeout, sai input, chơi lại)
```

---

## PHẦN 5: CHUẨN FORMAT MỘT TEST CASE

```markdown
### TC-[Nhóm][Số]: [Tên ngắn gọn mô tả rõ mục đích] [🔴/🟡/🟢 Mức độ]

**Điều kiện tiên quyết:** [Hệ thống phải ở trạng thái nào? Cần gì trước?]

**Hành động:**
1. [Ai / làm gì / ở đâu — cụ thể đến từng chữ, từng nút bấm]
2. [Bước tiếp theo nếu cần]

**Kỳ vọng:**
- [ ] [Quan sát được gì: màn hình, message, file, log...]
- [ ] [Quan sát ở đâu: kênh nào, URL nào, element nào]

**Kết quả:** ✅ / ❌
**Ghi chú:** _____
```

### Quy tắc viết HÀNH ĐỘNG:

| ✅ ĐỦ CHI TIẾT | ❌ QUÁ MƠ HỒ |
|---|---|
| `CEO DM Bot nội dung: @all Họp 9h ngày mai` | "Gõ lệnh broadcast" |
| "Bấm nút [Gửi] màu xanh ở góc phải form" | "Submit form" |
| `POST http://localhost:8000/api/users Body: {"name":"Test"}` | "Gọi API tạo user" |
| "Refresh trang → URL phải là `/dashboard`" | "Kiểm tra redirect" |

### Quy tắc viết KỲ VỌNG:

| ✅ ĐO ĐƯỢC | ❌ MƠ HỒ |
|---|---|
| "Bot trả DM bắt đầu bằng `📢 Thông báo từ`" | "Bot phản hồi đúng" |
| "HTTP 201, body có `id` là số nguyên dương" | "API trả về success" |
| "File `data/messages.json` tăng thêm 1 entry" | "Dữ liệu được lưu" |
| "CEO nhận DM có icon 🚨 và chữ KHẨN CẤP" | "CEO thấy tin nhắn" |

---

## PHẦN 6: PHÂN LOẠI MỨC ĐỘ TEST CASE

| Màu | Mức | Định nghĩa | Nếu FAIL |
|---|---|---|---|
| 🔴 | Critical | Tính năng cốt lõi, mất là không dùng được | Dừng test, fix ngay |
| 🟡 | High | Tính năng quan trọng, ảnh hưởng UX đáng kể | Fix trước khi release |
| 🟢 | Medium | Tính năng phụ trợ, có workaround | Ghi backlog |
| ⚪ | Low | Cosmetic, format, tiện ích | Làm sau |

**Ngưỡng đạt để release (nghiệm thu):**
```
✅ 100% Critical PASS
✅ ≥ 85% High PASS
✅ ≥ 60% Medium PASS
```

---

## PHẦN 7: TEMPLATE FILE TEST-CHECKLIST.MD ĐẦY ĐỦ

```markdown
# [Tên Dự Án] — Test Checklist Thủ Công

> **Tài liệu dành cho**: [QA Tester / Nhân sự / System Admin]
> **Phiên bản:** v[X] | **Ngày test:** [YYYY-MM-DD] | **Môi trường:** [Local/Staging/Prod]

---

# PHẦN 1: MỤC TIÊU VÀ TẦM NHÌN

[Giải thích hệ thống giải quyết vấn đề gì cho từng nhóm người dùng]

### Dành cho [Vai trò 1]
- **[Vấn đề A]:** [Giải thích]
- **[Vấn đề B]:** [...]

### Dành cho [Vai trò 2]
- **[Vấn đề A]:** [...]

---

# PHẦN 2: SƠ ĐỒ LUỒNG HỆ THỐNG

[1-2 biểu đồ Mermaid mô tả luồng chính — Safe Syntax 8.8.0]

---

# PHẦN 3: CHECKLIST CHI TIẾT

## Nhóm 1: [Tên nhóm nghiệp vụ quan trọng nhất]

*[Giải thích ngắn: nhóm này test cái gì, tại sao quan trọng]*

### TC-[X]01: [Tên case] [🔴 Critical]
...

## Nhóm 2: [...]

---

# PHẦN 4: BẢNG NGHIỆM THU TỔNG

| Hạng Mục | Số TC | PASS | FAIL | Ghi Chú |
|---|---|---|---|---|
| Nhóm 1 | N | | | |
| **TỔNG** | **N** | **N** | **N** | |

*(Ngưỡng duyệt: 100% Critical + ≥ 85% High)*

- [ ] ✅ APPROVED — Đạt tiêu chuẩn
- [ ] ❌ REJECT — Cần sửa và test lại

**Người test:** ___________ | **Ngày:** ___/___/2026
```

---

## PHẦN 8: CHECKLIST TRƯỚC KHI NỘP FILE

```
□ Có PHẦN 1 (Mục tiêu tầm nhìn) không? Ai đọc cũng hiểu hệ thống làm gì?
□ Có sơ đồ Mermaid (ít nhất 1 cái)? Dùng Safe Syntax 8.8.0?
□ Nhóm test case theo nghiệp vụ (không nhóm theo file code)?
□ Có nhóm "Đánh giá / Góp ý / Nhắc nhở" nếu hệ thống có tính năng quản lý?
□ Mỗi TC có đủ 4 phần: Điều kiện / Hành động / Kỳ vọng / Kết quả?
□ Hành động đủ chi tiết để người lạ làm theo không cần hỏi?
□ Kỳ vọng đo được bằng mắt thường (không mơ hồ)?
□ Đã phân đúng mức 🔴🟡🟢?
□ Có bảng nghiệm thu tổng kết cuối file?
□ Tiếng Việt chuẩn có dấu, UTF-8 không rụng chữ?
```

---

## PHẦN 9: BÁO CÁO SAU KHI HOÀN THÀNH

```
✅ XONG: Viết test checklist thủ công
📁 File: [project]/docs/test-checklist.md
📊 Tổng: [X] test cases / [Y] nhóm
   🔴 Critical: [N] cases
   🟡 High: [N] cases
   🟢 Medium: [N] cases
🔜 Bước tiếp: Chạy /5-test-auto trước → sau đó dùng checklist này test tay
```
