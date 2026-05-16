---
description: Quy trình tự học và cập nhật rule làm việc (Self-Improvement Mechanism)
---

# Quy trình tự cải tiến Workflow & Memory 🧠

Hệ thống AI (Antigravity) cần liên tục tiến hóa để bám sát thực tế làm việc của IruKa Workspace. Dùng workflow này khi:
- Nhận được lệnh rút kinh nghiệm từ Mr. Đào.
- Phát hiện một sai lầm/lặp lỗi cấu trúc, thiết kế, code logic, hoặc văn phong giao tiếp.
- Mr. Đào yêu cầu tạo file improvement để tự động cập nhật rule.

## Bước 1: Thu thập thông tin bài học
- Rà soát nguyên nhân gốc rễ (Root Cause) của vấn đề vừa xảy ra.
- Xác định xem là **Anti-pattern** (luật cấm làm), **Lesson learned** (bài học kỹ thuật/quy trình), **Useful command** (lệnh/snippet hay dở), hoặc **Kaizen** (cách làm thông minh hơn so với cách hắn hay dùng).

> **Phân biệt Kaizen vs Lesson Learned:**
> - *Lesson Learned:* "Tôi đã sai ở chỗ X, lần sau phải tránh."
> - *Kaizen:* "Tôi vừa tìm ra cách Y giúp code gọn hơn, làm nhanh hơn — lần sau áp dụng luôn."

## Bước 2: Lưu trữ vào Memory
Tùy thuộc vào bản chất thông tin, tự động đọc và ĐỀ XUẤT NỘI DUNG thay thế vào các file thích hợp sau:
- `.agent/memory/lessons-learned.md`
- `.agent/memory/anti-patterns.md`
- `.agent/memory/useful-commands.md`
- `.agent/memory/kaizen.md` ← *Ghi nhận nếu đây là một Pattern hay, Best Practice, cách làm thông minh hơn*

*(Nghĩ trước khi làm, hỏi ý kiến Mr. Đào xem đề xuất thêm có hợp lý không).*

## Bước 3: Tạo File Improvement (Cơ chế tiến hóa Workflow)
Nếu bài học này ảnh hưởng đến một luồng công việc hiện tại (ví dụ: luồng build UI, luồng tạo API), BẮT BUỘC phải tạo file lưu log cải tiến trong thư mục `.agent/memory/improvements/`.

**Quy tắc tạo file Improvement:**
1. Tạo file: `.agent/memory/improvements/YYYY-MM-DD-[topic-ngan-gon].md` (ví dụ: `2026-04-02-sync-ui-rules.md`)
2. Format file bắt buộc:
   ```markdown
   # Cải tiến: [Tên cải tiến]
   - **Ngày:** YYYY-MM-DD
   - **Workflow gốc bị ảnh hưởng:** (nếu có, vd: /4-code-ui&ux.md)
   
   ## 1. Vấn đề (Problem)
   Mô tả ngắn gọn vấn đề gặp phải.
   
   ## 2. Bài học (Lesson)
   Mô tả nguyên nhân và cách giải quyết chuẩn.
   
   ## 3. Cải tiến Đề xuất (Improvement)
   Rule mới nào sẽ được thêm vào workflow hiện tại hay GEMINI.md?
   ```

## Bước 4: Xin Phê Duyệt & Ghi Đè Workflow Thực Tế
- Trình bày tóm tắt cho Mr. Đào nội dung cải tiến.
- Nếu Mr. Đào nói "OK" hoặc "Duyệt", thay vì chỉ để lại file improvement, AI PHẢI **Ghi đè/cập nhật trực tiếp** vào file `.agent/workflows/[tên-workflow].md` tương ứng để áp dụng ngay lập tức cho các task tương lai.
