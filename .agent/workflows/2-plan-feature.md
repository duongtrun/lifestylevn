---
description: Lên kế hoạch cho tính năng mới - từ ý tưởng đến task list
---

# 📋 WORKFLOW: LÊN KẾ HOẠCH TÍNH NĂNG MỚI

## Khi nào dùng?
Mỗi khi bạn muốn xây dựng tính năng mới, dù nhỏ hay lớn.

---

## BƯỚC 1: MÔ TẢ Ý TƯỞNG (Bạn làm)

Nói với AI theo format này:
```
"Tôi muốn thêm tính năng [X].
Người dùng sẽ [hành động].
Kết quả họ nhận được là [kết quả].
Ví dụ cụ thể: [ví dụ thực tế]."
```

**Ví dụ tốt:**
> "Tôi muốn thêm tính năng đăng nhập bằng Google.
> Người dùng click nút 'Đăng nhập với Google'.
> Kết quả: họ tự động có tài khoản, không cần điền form.
> Ví dụ: giống như cách Notion cho đăng nhập."

**Ví dụ xấu:**
> "Làm OAuth Google" ← Quá kỹ thuật, thiếu context

---

## BƯỚC 2: AI LÊN PLAN (AI làm, bạn review)

// turbo
AI sẽ tự động tạo:
- [ ] Danh sách tính năng cần làm
- [ ] Ước tính thời gian
- [ ] Rủi ro tiềm ẩn
- [ ] Tech stack đề xuất
- [ ] Thứ tự ưu tiên

**Bạn cần review:**
- Tính năng có đúng ý không?
- Thứ tự ưu tiên hợp lý không?
- Có tính năng nào bỏ sót không?

---

## BƯỚC 3: PHÂN RÃ TASK (AI làm)

// turbo
AI tự chia thành:
```
Epic: [Tên tính năng lớn]
├── Task 1: Database schema
│   ├── Subtask: Tạo bảng users
│   └── Subtask: Tạo migration
├── Task 2: Backend API  
│   ├── Subtask: POST /api/auth/google
│   └── Subtask: Xử lý callback
├── Task 3: Frontend UI
│   ├── Subtask: Nút đăng nhập
│   └── Subtask: Loading state
└── Task 4: Test & Deploy
```

---

## BƯỚC 4: XÁC NHẬN VÀ BẮT ĐẦU (Bạn làm)

Nếu đồng ý: **"OK, bắt đầu đi"**
Nếu cần sửa: **"Sửa lại: [điểm cần thay đổi]"**
Nếu muốn ưu tiên: **"Làm Task 2 trước"**

---

## CHECKLIST TRƯỚC KHI BẮT ĐẦU CODE

- [ ] Mục đích tính năng rõ ràng?
- [ ] Ai sẽ dùng tính năng này?
- [ ] Tính năng này ảnh hưởng gì đến hệ thống hiện tại?
- [ ] Deadline có không?
- [ ] Cần design Figma không?
- [ ] Môi trường test đã sẵn sàng?

---

## RULE CỦA WORKFLOW NÀY

1. **Không skip bước 1** — Mô tả rõ trước khi AI làm
2. **Luôn review plan** trước khi cho AI code
3. **Một Epic một lúc** — Không làm quá nhiều song song
4. **Ghi lại quyết định** — Tại sao chọn cách này, không phải cách khác
