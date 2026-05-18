# 📚 LESSONS LEARNED — Bài học rút ra (FE Only)

> File này lưu các bài học FE đã rút ra trong quá trình làm dự án `web-lifestyle`.
>
> ⚠️ **FE Dev KHÔNG được tự append vào file này.** Khi phát hiện lỗi mới hoặc bài học mới:
> 1. Draft theo format dưới đây
> 2. Báo Mr. Đào duyệt
> 3. Mr. Đào OK → mới được append

---

## 📋 Bảng index

| ID | Tên bài học | Lĩnh vực | Ngày | Trạng thái |
|----|-------------|----------|------|------------|
| _Chưa có bài học nào — FE dev sẽ append khi gặp lỗi và được duyệt_ |

---

## 📝 Format chuẩn (BẮT BUỘC)

Khi draft bài học mới, dùng format này:

```markdown
### [FE-XX] Tên bài học ngắn gọn

- **ID:** FE-XX (số tăng dần)
- **Domain:** UI / State / Performance / SEO / A11Y / Form / Animation / ...
- **Ngày:** YYYY-MM-DD
- **AI Agent đã làm:** [Claude / Cursor / ...]
- **Trạng thái:** Active

**Bối cảnh:**
[Đang làm tính năng gì, ở màn hình nào, mục tiêu là gì]

**Lỗi đã xảy ra:**
[Mô tả lỗi cụ thể — hiện tượng nhìn thấy, không phải trace kỹ thuật]

**Root cause (nguyên nhân gốc):**
[Tại sao lỗi xảy ra — phải đào đến gốc, không dừng ở "đã sửa"]

**Cách fix:**
1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

**Phòng ngừa lần sau:**
- [Quy tắc rút ra để không tái phạm]
- [Quy tắc rút ra để không tái phạm]

**Code mẫu (nếu có):**
```tsx
// Code đúng
```

**Liên quan workflow:** /[tên-workflow]
```

---

## 🎯 Lĩnh vực thường gặp lỗi (FE)

Khi viết bài học, phân loại vào 1 trong các lĩnh vực:

| Lĩnh vực | Ví dụ lỗi |
|---|---|
| **UI** | Layout vỡ ở mobile, button không click được, modal đè lên nhau |
| **State** | State không update, race condition khi gọi API song song, Zustand store không persist |
| **Performance** | LCP > 3s, bundle size phình to, re-render quá nhiều |
| **SEO** | Metadata thiếu, sitemap sai, structured data lỗi |
| **A11Y** | Tab navigation đứt, contrast thấp, screen reader đọc sai |
| **Form** | Validation thiếu, submit nhiều lần, file upload không hoạt động |
| **Animation** | Giật lag trên mobile, animation chồng chéo, không tắt được prefers-reduced-motion |
| **Build/Deploy** | Lỗi `pnpm build`, `next start` không chạy, image optimization sai |
| **TypeScript** | Type lỗi runtime, generic phức tạp, infer sai |
| **Routing** | App Router redirect sai, dynamic route conflict, Server vs Client mixing |

---

## 🚫 KHÔNG được làm gì với file này

- ❌ Tự append bài học khi chưa được Mr. Đào duyệt
- ❌ Sửa nội dung bài học cũ (chỉ Mr. Đào sửa)
- ❌ Xoá bài học cũ — kể cả khi nghĩ nó hết relevant
- ❌ Copy bài học từ dự án khác (BE, Game, Discord) vào đây — file này CHỈ DÀNH CHO FE

---

_File template — sẽ append theo thời gian khi FE dev gặp lỗi và Mr. Đào duyệt._
