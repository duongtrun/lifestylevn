# ⚡ Kaizen Log — Best Practice tích lũy (FE Only)

> **Kaizen (改善):** Cải tiến liên tục — không phải sửa sai, mà là làm tốt hơn mỗi ngày.
>
> File này lưu các **Best Practice, Trick hay, Pattern thông minh** đúc kết qua công việc thực tế FE.
>
> AI Agent / FE Dev PHẢI đọc file này trước khi bắt đầu task để kế thừa tinh hoa từ các phiên trước.

---

## 🎯 Khác biệt Kaizen vs Lessons Learned

| | Lessons Learned | Kaizen |
|---|---|---|
| **Mục tiêu** | Tránh lặp lỗi cũ | Làm tốt hơn chủ động |
| **Câu hỏi** | "Tôi đã sai gì?" | "Tôi có thể làm gọn hơn không?" |
| **Tông điệu** | Phòng thủ | Tấn công / Tiến hoá |
| **Ghi nhận** | Sau khi có lỗi | Sau khi hoàn thành tốt |

---

## 📋 Index

| ID | Tiêu đề | Domain | Trạng thái |
|----|---------|--------|------------|
| K-FE-01 | "Xây mới — Đập cũ" — Pattern nâng cấp Component/Library an toàn | Frontend / Refactor | Active |
| K-FE-02 | "Mổ xẻ - Sao chép - Biến tấu" — Quy trình code component mới chuẩn | Frontend / Component | Active |

---

## 📝 Chi tiết Kaizen

### [K-FE-01] "Xây mới — Đập cũ" — Pattern nâng cấp Component/Library an toàn

- **Domain:** Frontend / Refactor
- **Đúc kết từ:** Quy trình thay 1 thư viện UI cũ bằng thư viện mới

**Pattern chuẩn:** Khi chuyển từ component cũ sang component mới (ví dụ thay button HTML thuần sang component Button cva, thay react-icons sang lucide-react):

```
Bước 1 → Tạo component / cài thư viện mới
Bước 2 → NGAY LẬP TỨC: grep toàn project tìm tàn dư cũ
          Ví dụ:
            grep -r "react-icons" src/
            grep -r "<button class=" src/
            grep -r "import.*old-component" src/
Bước 3 → Xoá sạch import cũ + tag/class cũ
Bước 4 → Verify: chỉ còn 1 nguồn duy nhất
          - 1 cách import icon (lucide-react)
          - 1 cách render button (component Button)
Bước 5 → Build + test responsive 3 cỡ
```

**Lý do quan trọng:** Nếu bỏ qua Bước 2-3, UI sẽ tồn tại 2 hệ song song — bundle phình to, style không đồng nhất, dev sau dễ dùng nhầm cái cũ.

**Checklist nhanh khi nâng cấp UI library:**

- [ ] Grep các class/component/import cũ
- [ ] Kiểm tra `src/**/*.{tsx,ts,css}`
- [ ] Xác nhận chỉ còn 1 nguồn duy nhất
- [ ] Bundle size không phình to bất thường (`pnpm build` → check `.next/static/chunks/`)

---

### [K-FE-02] "Mổ xẻ - Sao chép - Biến tấu" — Quy trình code component mới chuẩn

- **Domain:** Frontend / Component
- **Đúc kết từ:** Khi viết component mới không tham khảo component cũ → đặt tên prop, cấu trúc, thứ tự khác chuẩn dự án

**Vấn đề cốt lõi:** Khi AI/dev viết một component mới từ đầu, dễ tự đặt ra cấu trúc props, naming, file structure **khác với chuẩn dự án** — dẫn đến code không đồng nhất, dev sau bối rối, refactor mất thời gian.

**Pattern chuẩn — BẮT BUỘC 3 bước trước khi viết component mới:**

```
Bước 1 — MỔ XẺ (Dissect)
  Tìm component tương tự gần nhất trong project (vd Button khi viết IconButton)
  Đọc TUẦN TỰ: file gốc → file types → file index
  Liệt kê:
    - Cấu trúc props (interface, optional/required)
    - Cách dùng cva (variants, size)
    - Cách dùng forwardRef
    - Cách export (named vs default)
    - File location (ui/, sections/, shared/)

Bước 2 — SAO CHÉP (Clone)
  Copy y chang cấu trúc khung sườn từ component mẫu:
    - Header file 3 dòng (Luồng/Vai trò/Khi nào dùng)
    - Import order (React → libs → components → utils → types)
    - Cách định nghĩa variants với cva
    - Cách dùng cn() để merge class
    - Pattern forwardRef + displayName
  CHỈ ĐỔI phần riêng (tên component, variants riêng)

Bước 3 — BIẾN TẤU (Customize)
  Sau khi cấu trúc đúng → thêm logic riêng
  Test ngay sau mỗi lớp biến tấu, KHÔNG viết hết rồi mới test
```

**Component mẫu chuẩn của web-lifestyle để tham khảo:**

| Component | Lý do tham khảo |
|---|---|
| `Button` trong `components/ui/` | Chuẩn cva + forwardRef + variants |
| `Card` trong `components/ui/` | Chuẩn compound component (Card.Header, Card.Body) |
| `ContactForm` trong `components/sections/` | Chuẩn dùng react-hook-form + zod |

**Dấu hiệu bỏ qua K-FE-02:**

- Component mới có cấu trúc props khác lạ so với component khác
- Naming convention khác (vd `onSubmit` vs `onSubmitForm`)
- Không có header file 3 dòng
- Không dùng cva khi cần variants
- Quên `forwardRef` cho component cần ref (input, button)

---

## 📌 Hướng dẫn ghi Kaizen mới

> Kaizen được ghi NGAY KHI phát hiện — không cần đợi cuối ngày.
> AI / FE Dev đề xuất → Mr. Đào duyệt → Mr. Đào append vào file này.

**Format chuẩn một điểm Kaizen:**

```markdown
### [K-FE-XX] Tên gọi ngắn — mô tả phong cách

- **Domain:** Lĩnh vực áp dụng (UI / State / Performance / SEO / ...)
- **Đúc kết từ:** Mô tả ngắn task gốc

**Pattern chuẩn / Trick hay:**
[Mô tả kỹ thuật/cách làm thông minh hơn]

**Lý do:** [Tại sao cách này tốt hơn cách cũ]

**Code mẫu (nếu có):**
\`\`\`tsx
// ...
\`\`\`
```

---

## 🚫 KHÔNG được làm gì với file này

- ❌ Tự append kaizen khi chưa được Mr. Đào duyệt
- ❌ Sửa nội dung kaizen cũ (chỉ Mr. Đào sửa)
- ❌ Xoá kaizen cũ — kể cả khi nghĩ nó hết relevant
- ❌ Copy kaizen từ dự án khác (BE, Game) vào đây — file này CHỈ DÀNH CHO FE

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Kaizen — Phiên bản FE-only*
