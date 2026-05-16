---
description: Audit tính năng sau khi code xong - kiểm tra logic, hành vi đúng/sai qua các trường hợp thực tế, giả định, và hiếm gặp
---

# 🧪 WORKFLOW: AUDIT TÍNH NĂNG (FEATURE AUDIT)

## Mục đích
Sau khi code xong 1 tính năng, KHÔNG deploy ngay.
Phải đi qua bộ kiểm tra đầy đủ: đúng luồng → sai luồng → biên giới → tấn công → hiếm gặp.

> **Nguyên tắc:** Code chạy được ≠ Code đúng. Kiểm tra mọi trường hợp trước khi user thấy.

---

## CÁCH GỌI WORKFLOW NÀY

Nói với AI:
```
"Audit tính năng [tên tính năng] cho tôi.
Mô tả: [tính năng làm gì]
File liên quan: [file đã code]"
```

AI sẽ tự động chạy toàn bộ 6 nhóm kiểm tra bên dưới.

---

## 6 NHÓM KIỂM TRA (Theo thứ tự)

---

### 🟢 NHÓM 1: HAPPY PATH — Trường Hợp Thông Thường

> User làm đúng mọi thứ, hệ thống phải trả kết quả đúng.

**Câu hỏi AI sẽ kiểm tra:**
```
✓ User làm đúng từng bước → kết quả có đúng như mô tả không?
✓ Dữ liệu trả về có đủ, đúng format không?
✓ UI hiển thị đúng thông tin không?
✓ Thời gian phản hồi có chấp nhận được không? (< 2 giây)
✓ Sau khi thành công, state hệ thống có cập nhật đúng không?
```

**Ví dụ — Tính năng "Đăng nhập":**
```
✅ TC-01: Email + password đúng → đăng nhập thành công, redirect dashboard
✅ TC-02: Nhớ session, F5 vẫn còn đăng nhập
✅ TC-03: Avatar, tên hiển thị đúng sau đăng nhập
✅ TC-04: Response time < 1 giây
```

**Format báo cáo:**
```
[TC-01] ✅ PASS | Email đúng → Login thành công
[TC-02] ✅ PASS | Session còn sau F5
[TC-03] ❌ FAIL | Tên user hiển thị "undefined" → BUG FOUND
```

---

### 🔴 NHÓM 2: NEGATIVE PATH — Trường Hợp Sai Đầu Vào

> User cố tình hoặc vô tình nhập sai → hệ thống phải xử lý đúng, không crash.

**Câu hỏi AI sẽ kiểm tra:**
```
✓ Để trống field bắt buộc → có báo lỗi rõ ràng không?
✓ Nhập sai định dạng (email không có @, số âm...) → validation hoạt động?
✓ Nhập quá dài (10,000 ký tự) → hệ thống có bị crash không?
✓ Nhập ký tự đặc biệt (', ", <script>) → có escape đúng không?
✓ Gửi form 2 lần nhanh → có tạo 2 bản ghi không?
```

**Ví dụ — Tính năng "Đăng nhập":**
```
✅ TC-05: Email bỏ trống → "Email không được để trống"
✅ TC-06: Password sai → "Sai mật khẩu, còn 4 lần thử"
✅ TC-07: Email không tồn tại → "Tài khoản không tồn tại"
❌ TC-08: Nhập 10,000 ký tự vào email → SERVER CRASH → BUG CRITICAL
✅ TC-09: Nhập <script>alert(1)</script> → escaped, không chạy
✅ TC-10: Click "Đăng nhập" 5 lần nhanh → chỉ gọi API 1 lần
```

---

### 🟡 NHÓM 3: BOUNDARY CASES — Trường Hợp Biên Giới

> Test ngay tại giới hạn của hệ thống — nơi bug thường ẩn nhất.

**Câu hỏi AI sẽ kiểm tra:**
```
✓ Đúng tại giới hạn tối thiểu (min) → hoạt động không?
✓ Đúng tại giới hạn tối đa (max) → hoạt động không?
✓ Vượt quá 1 đơn vị (max+1) → bị chặn đúng không?
✓ Dữ liệu rỗng vs null vs undefined → xử lý đúng không?
✓ Số 0 và số âm → xử lý đúng không?
```

**Ví dụ — Tính năng "Đặt hàng số lượng":**
```
✅ TC-11: Số lượng = 1 (min) → OK
✅ TC-12: Số lượng = 99 (max) → OK
❌ TC-13: Số lượng = 100 (max+1) → Phải báo lỗi, nhưng lại cho đặt → BUG
✅ TC-14: Số lượng = 0 → "Số lượng phải lớn hơn 0"
✅ TC-15: Số lượng = -5 → "Số lượng không hợp lệ"
❌ TC-16: Số lượng = 99.5 (số thập phân) → Hệ thống nhận, tạo đơn 99.5 cái → BUG
```

---

### 🟠 NHÓM 4: CONCURRENT & TIMING — Trường Hợp Đồng Thời

> Điều gì xảy ra khi nhiều người dùng cùng lúc, hoặc network chập chờn.

**Câu hỏi AI sẽ kiểm tra:**
```
✓ 2 user cùng mua hàng cuối cùng trong kho → ai được, ai không?
✓ Request bị timeout → UI xử lý thế nào? (spinner mãi hay báo lỗi?)
✓ Mất mạng giữa chừng → data có bị corrupt không?
✓ Gọi API khi token hết hạn → có tự refresh không?
✓ Action kéo dài → user bấm back/close → state có nhất quán không?
```

**Ví dụ — Tính năng "Đặt vé concert":**
```
✅ TC-17: Ghế trống, đặt bình thường → OK
❌ TC-18: 2 user cùng đặt ghế A1 cuối cùng → cả 2 đặt thành công → BUG CRITICAL (oversell)
✅ TC-19: Mạng chậm 10 giây → UI hiển thị loading, không trắng màn hình
❌ TC-20: Mất mạng sau khi trừ tiền nhưng trước khi confirm vé → tiền mất, không có vé → BUG CRITICAL
✅ TC-21: Token hết hạn giữa chừng → tự redirect login, sau đó quay lại
```

---

### 🔵 NHÓM 5: PERMISSION & SECURITY — Trường Hợp Quyền Truy Cập

> Ai được làm gì, ai không được làm gì.

**Câu hỏi AI sẽ kiểm tra:**
```
✓ User chưa đăng nhập truy cập trang cần auth → redirect login không?
✓ User thường truy cập trang Admin → bị chặn không?
✓ User A xem/sửa data của User B → bị chặn không?
✓ Gọi API trực tiếp không qua UI → có bị chặn không? (IDOR)
✓ Token giả mạo → bị reject không?
✓ Overwrite ID trong request → có sửa được record người khác không?
```

**Ví dụ — Tính năng "Xem đơn hàng":**
```
✅ TC-22: Chưa login, vào /orders → redirect /login
✅ TC-23: Login user thường, vào /admin → 403 Forbidden
❌ TC-24: Login user A, đổi orderId=USER_B_ORDER_ID trong URL → thấy đơn của B → BUG CRITICAL (IDOR)
✅ TC-25: Gọi GET /api/orders với token giả → 401 Unauthorized
❌ TC-26: PUT /api/orders/123 với userId khác trong body → xử lý được → BUG
```

---

### ⚪ NHÓM 6: RARE & WEIRD CASES — Trường Hợp Ít Gặp

> Những tình huống kỳ lạ mà user thật sự làm (bạn sẽ ngạc nhiên).

**Câu hỏi AI sẽ kiểm tra:**
```
✓ Emoji trong text field → lưu và hiển thị đúng không?
✓ Copy-paste nội dung lạ từ Word (có ký tự ẩn) → crash không?
✓ Timezone khác → ngày giờ có hiển thị đúng không?
✓ Màn hình rất nhỏ (320px) hoặc rất lớn (4K) → UI có vỡ không?
✓ User zoom browser lên 200% → UI có dùng được không?
✓ Dùng tab để navigate → có hoạt động không?
✓ Bấm nút Back sau khi submit → có submit lại không?
✓ Để tab đó 2 giờ rồi dùng → session hết hạn xử lý thế nào?
✓ Copy link chia sẻ với người khác → có vào được không?
✓ Dùng autofill của browser → conflict không?
```

**Ví dụ — Tính năng "Tạo bình luận":**
```
✅ TC-27: Nhập emoji 🎉🔥💯 → lưu và hiển thị đúng
❌ TC-28: Paste từ Word có ký tự "\u200b" (zero-width space) → hiển thị lỗi → BUG
✅ TC-29: Timezone Singapore vs VN → timestamp hiển thị theo local time
❌ TC-30: Màn hình 320px (điện thoại cũ) → nút Submit bị che khuất → BUG UI
✅ TC-31: Zoom 200% → vẫn dùng được
❌ TC-32: Bấm Back sau submit → form submit lần 2, tạo 2 bình luận → BUG
✅ TC-33: Tab sau 3 tiếng → hết session, hiển thị "Phiên đã hết, đăng nhập lại"
```

---

## 📊 FORMAT BÁO CÁO AUDIT TÍNH NĂNG

AI sẽ tạo file: `/docs/audit/[feature-name]-audit-YYYY-MM-DD.md`

```markdown
# 🧪 FEATURE AUDIT: [Tên tính năng]
Ngày audit: [date] | Người audit: Antigravity AI
Code đã review: [danh sách file]

## Tóm tắt
- Tổng test cases: X
- ✅ PASS: X
- ❌ FAIL: X  
- ⚠️ WARNING: X

## Kết luận: ✅ READY TO DEPLOY / ❌ CẦN SỬA TRƯỚC

---

## Nhóm 1: Happy Path
| ID | Test Case | Kết quả | Ghi chú |
|----|-----------|---------|---------|
| TC-01 | [mô tả] | ✅ PASS | |
| TC-02 | [mô tả] | ❌ FAIL | Bug: [mô tả] |

## Nhóm 2: Negative Path
...

## Nhóm 3: Boundary Cases  
...

## Nhóm 4: Concurrent & Timing
...

## Nhóm 5: Permission & Security
...

## Nhóm 6: Rare & Weird Cases
...

---

## 🐛 BUGS FOUND (Cần sửa trước deploy)

### 🔴 CRITICAL (Phải sửa ngay)
- TC-18: [Mô tả bug] | File: [file:line] | Cách sửa: [...]

### 🟡 MAJOR (Sửa trong sprint này)
- TC-30: [Mô tả bug] | ...

### 🟢 MINOR (Backlog)
- TC-28: [Mô tả bug] | ...

---

## ✅ CHECKLIST DEPLOYMENT
- [ ] Tất cả CRITICAL bugs đã fix
- [ ] MAJOR bugs đã fix hoặc có plan
- [ ] Regression test: tính năng cũ không bị ảnh hưởng
- [ ] CEO/Manager đã review báo cáo
- [ ] Approved to deploy: _____ | Ngày: _____
```

---

## THANG ĐO KẾT QUẢ

| Kết quả Audit | Ý nghĩa | Hành động |
|--------------|---------|-----------|
| 0 FAIL | ✅ Tuyệt vời | Deploy được ngay |
| Chỉ có MINOR FAIL | 🟡 Chấp nhận được | Deploy, ghi backlog |
| Có MAJOR FAIL | 🟠 Cần sửa | Fix MAJOR trước, rồi deploy |
| Có CRITICAL FAIL | 🔴 Không deploy | Fix hết CRITICAL mới deploy |
| Có Security FAIL | ⛔ Nguy hiểm | Dừng tất cả mọi thứ, fix ngay |

---

## RULE FEATURE AUDIT

1. **Audit BẮT BUỘC trước mỗi deploy** — Không merge, không deploy nếu chưa audit
2. **AI audit trước, người review sau** — AI chạy 6 nhóm, bạn đọc summary
3. **CRITICAL = Không thương lượng** — Không deploy khi còn CRITICAL bug
4. **Security fail = Dừng tất cả** — Lỗi bảo mật nguy hiểm hơn mọi deadline
5. **Lưu báo cáo** — Mỗi audit có file riêng, tạo lịch sử
6. **So sánh theo thời gian** — Audit lần 2 phải ít bug hơn lần 1
7. **Regression test** — Luôn kiểm tra tính năng CŨ không bị break

---

## FORMAT GỌI WORKFLOW NÀY

```
"Audit tính năng [X] cho tôi
File đã code: [danh sách file]
Mô tả: User có thể [làm gì], kết quả phải [là gì]"
```
