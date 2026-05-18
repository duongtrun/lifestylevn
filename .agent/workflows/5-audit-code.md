---
description: Quy trình audit toàn bộ codebase - kiểm tra chất lượng, bảo mật, hiệu suất
---

# 🔍 WORKFLOW: AUDIT CODE

## Khi nào dùng?
- Trước khi launch sản phẩm
- Khi hệ thống chạy chậm bất thường
- Khi nhận được báo cáo lỗi nhiều
- Định kỳ mỗi Sprint/tháng

---

## CÁC LOẠI AUDIT

### 🔴 Audit Bảo Mật (Security Audit)
AI sẽ kiểm tra:
- SQL Injection vulnerabilities
- XSS (Cross-site scripting)
- API keys bị lộ trong code
- Quyền truy cập (Authorization)
- CORS configuration
- Sensitive data trong logs

**Lệnh:** `"Audit bảo mật toàn bộ hệ thống, báo cáo theo mức độ nghiêm trọng"`

---

### 🟡 Audit Hiệu Suất (Performance Audit)
AI sẽ kiểm tra:
- Database queries chậm (N+1 problem)
- API response time
- Memory leaks
- Unnecssary re-renders (Frontend)
- Bundle size quá lớn
- Missing indexes trong DB

**Lệnh:** `"Audit hiệu suất, tìm các điểm bottleneck"`

---

### 🟢 Audit Chất Lượng Code (Code Quality)
AI sẽ kiểm tra:
- Code trùng lặp (DRY violation)
- Hàm quá dài, quá phức tạp
- Thiếu error handling
- Thiếu comments/documentation
- Naming không nhất quán
- Dead code (code không dùng đến)

**Lệnh:** `"Audit chất lượng code, đề xuất cải thiện"`

---

### ⚪ Audit Dependency
AI sẽ kiểm tra:
- Packages lỗi thời (outdated)
- Packages có lỗ hổng bảo mật
- Packages không cần thiết

**Lệnh:** `"Kiểm tra dependencies, báo cáo packages cần update"`

---

## QUY TRÌNH AUDIT ĐẦY ĐỦ

```
BƯỚC 1: Chọn loại audit cần làm
         ↓
BƯỚC 2: AI scan toàn bộ codebase
         ↓
BƯỚC 3: AI tạo báo cáo theo format:
         🔴 CRITICAL (phải sửa ngay)
         🟡 WARNING  (sửa trong sprint này)
         🟢 INFO     (cải thiện khi có thời gian)
         ↓
BƯỚC 4: Bạn review báo cáo
         ↓
BƯỚC 5: Quyết định fix theo thứ tự ưu tiên
         ↓
BƯỚC 6: AI fix từng vấn đề một
         ↓
BƯỚC 7: AI tạo báo cáo "after fix"
```

---

## FORMAT BÁO CÁO AUDIT (AI sẽ tạo theo mẫu này)

```markdown
# 🔍 AUDIT REPORT — [Ngày]

## Tóm tắt
- Tổng vấn đề tìm thấy: X
- 🔴 Critical: X | 🟡 Warning: X | 🟢 Info: X

## 🔴 CRITICAL (Phải sửa ngay)
### [Tên vấn đề]
- File: path/to/file.js:42
- Mô tả: ...
- Nguy cơ: ...
- Cách sửa: ...

## 🟡 WARNING
...

## 🟢 INFO (Cải thiện khi có thời gian)
...
```

---

## RULE AUDIT

1. **Không bỏ qua Critical** — Phải sửa hết trước khi deploy
2. **Audit định kỳ** — Ít nhất 1 lần/tháng
3. **Lưu báo cáo** — AI sẽ lưu vào `/docs/audit/[date]-report.md`
4. **So sánh audit** — Audit sau phải ít vấn đề hơn audit trước
