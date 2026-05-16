---
description: 
---

# /5-audit-button-flow
> Audit logic nút bấm trong luồng màn hình — kiểm tra nút Quay lại, Tiếp tục, Xác nhận, Đăng ký và kiểm tra xem kích thước vị trí ổn ko
> Góc nhìn: người dùng thực tế — "Bấm nút này tôi mong đợi gì?"

---

## 🎯 KHI NÀO DÙNG
- Hoàn thành code 1 luồng màn hình (đăng ký, đăng nhập, quên mật khẩu, onboarding...)
- Sau khi fix bug nút bấm
- Trước khi demo cho khách

---

## ✅ QUY TRÌNH AUDIT

### Bước 1 — Liệt kê tất cả nút trong luồng
Duyệt từng màn hình theo thứ tự flow. Với mỗi nút, ghi lại:

| Màn hình | Tên nút | Vị trí | Hành vi hiện tại |
|---|---|---|---|
| Bước 1 | Quay lại | Header trái | ? |
| Bước 1 | Tiếp tục | Cuối form | ? |
| ... | ... | ... | ... |

---

### Bước 2 — Đánh giá từng nút theo góc nhìn người dùng

Với mỗi nút, đặt câu hỏi:

**1. Kỳ vọng người dùng khi bấm?**
> "Tôi đang ở Bước 2, bấm Quay lại → tôi mong về Bước 1"

**2. Hành vi thực tế có khớp không?**
> Nếu code lùi về trang Login thay vì Bước 1 → ❌ Sai

**3. Trạng thái sau khi bấm có đúng không?**
> Form có bị xóa không? State còn giữ không? Dữ liệu vừa nhập mất không?

**4. Nút có bị disable/hidden đúng lúc không?**
> Nút "Tiếp tục" khi form chưa điền → nên disabled, không nên ẩn hoàn toàn

---

### Bước 3 — Phân loại lỗi

| Loại | Ví dụ | Mức độ |
|---|---|---|
| **Điểm đến sai** | Bấm Quay lại ở B3 → về Login thay vì B2 | 🔴 Critical |
| **Mất dữ liệu** | Bấm Quay lại → xóa OTP đã nhập | 🟠 High |
| **Disabled sai** | Nút Submit enable dù form trống | 🟡 Medium |
| **Text sai ý nghĩa** | Nút "Xác nhận" nhưng thực ra là "Hủy" | 🟡 Medium |
| **Thiếu nút** | Step 2 không có nút "Gửi lại OTP" | 🟠 High |
| **Nút thừa** | Hiện nút "Đăng ký ngay" ở cả màn OTP | 🟡 Medium |

---

### Bước 4 — Đề xuất sửa (đúng scope)

Format đề xuất:
```
❌ Bug: [Màn hình] – Nút [Tên] → [Hành vi sai]
✅ Fix: Nên → [Hành vi đúng]
📂 File: [path]
```

Ví dụ:
```
❌ Bug: ForgotPassword B3 – Nút Quay lại → push('/login')
✅ Fix: Nên setStep(1) để user nhập lại SĐT/Email
📂 File: src/app/(auth)/forgot-password/page.tsx
```

---

### Bước 5 — Báo cáo & Đề xuất

Trình bày kết quả theo bảng tổng hợp:

| # | Màn hình | Nút | Vấn đề | Đề xuất | Ưu tiên |
|---|---|---|---|---|---|
| 1 | FP-B3 | Quay lại | Về Login thay vì B1 | setStep(1) | 🔴 |
| 2 | Register-B2 | Tiếp tục | Cho phép submit khi OTP trống | Validate trước | 🟠 |

→ Trình cho anh duyệt → Fix theo scope đã khoanh

---

## 📏 TIÊU CHUẨN ĐÚNG/SAI

### Nút Quay lại
- Bước 1 → Về trang trước (Login / Trang chủ)
- Bước 2+ → Về bước ngay trước đó (B3→B2, B2→B1)
- **KHÔNG ĐƯỢC** nhảy nhiều bước (B3 → Login thẳng)
- Trừ trường hợp đặc biệt: OTP hết hạn phải về B1 để nhập lại SĐT

### Nút Tiếp tục / Submit
- Chỉ active khi form đã điền đủ và hợp lệ
- Khi loading → disabled + hiện spinner
- Khi thành công → navigate đúng bước tiếp
- Khi lỗi → hiện thông báo, KHÔNG navigate

### Nút hành động đặc biệt (VD: "Đăng ký ngay")
- Chỉ hiện khi đúng điều kiện (VD: tài khoản chưa tồn tại)
- Tự ẩn lại khi điều kiện không còn
- Dẫn đúng đường (có kèm prefill nếu có)

---

## ⚡ CHECKLIST NHANH

```
[ ] Mỗi nút bấm xong → đúng điểm đến
[ ] Không mất dữ liệu người dùng vừa nhập
[ ] Disabled đúng lúc, không block vô lý
[ ] Text nút phản ánh đúng hành động
[ ] Không có nút "chết" (bấm không phản hồi)
[ ] Flow 1 chiều: tiến → không thể quay về bước đã qua nếu không có nút
[ ] Nút đặc biệt chỉ hiện đúng context
```
