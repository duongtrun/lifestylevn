# 🧠 IruKa AI Memory System

> Hệ thống ghi nhớ và tự cải tiến của Antigravity AI.  
> Đọc file này TRƯỚC KHI bắt đầu conversation để không lặp lỗi cũ.

---

## 📁 Cấu trúc

```
.agent/memory/
├── README.md               ← File này — hướng dẫn tổng quan
├── lessons-learned.md      ← Log lỗi đã gặp + cách fix (REVIEW bởi Mr. Đào)
├── anti-patterns.md        ← Những gì KHÔNG BAO GIỜ được làm trong IruKa
├── kaizen.md               ← Best Practice, Pattern thông minh tích lũy theo thời gian
└── improvements/           ← Lịch sử cải tiến workflow theo thời gian
    └── YYYY-MM-DD-topic.md
```

---

## 🔄 Quy trình khi phát hiện lỗi / bài học mới

```
Tôi phát hiện lỗi hoặc bài học mới
        ↓
Draft nội dung (lesson + root cause + fix + prevention)
        ↓
Báo Mr. Đào: "Tôi muốn lưu bài học này, anh xem có đồng ý không?"
        ↓
Mr. Đào duyệt → OK → Tôi append vào lessons-learned.md
        ↓
Nếu liên quan đến workflow → tạo file improvements/ tương ứng
```

---

## 📖 Quy trình đọc khi bắt đầu

Mỗi conversation mới, Antigravity PHẢI:
1. Đọc `lessons-learned.md` → nhớ những lỗi đã mắc
2. Đọc `anti-patterns.md` → nhớ những gì không được làm
3. Đọc `kaizen.md` → nạp Best Practice để làm TỐT HƠN
4. Kiểm tra `improvements/` nếu liên quan đến workflow đang dùng

---

## 📝 Format bài học (lessons-learned.md)

```
## [LỖI-XXX] Tên bài học ngắn gọn
- **Ngày:** YYYY-MM-DD
- **Bối cảnh:** Task đang làm gì
- **Lỗi đã xảy ra:** Mô tả lỗi
- **Root cause:** Tại sao xảy ra
- **Cách fix:** Đã làm gì
- **Phòng ngừa:** Lần sau phải làm gì khác
- **Trạng thái:** ✅ Đã duyệt bởi Mr. Đào
```

---

*Cập nhật: 2026-03-30 | IruKa Memory System v1.0*
