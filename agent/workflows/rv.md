---
description: Quy trình rà soát và đúc kết bài học cuối ngày (Daily Review) lúc 17h30
---

# 📅 Workflow: Daily Review (/8-daily-review)

Đây là quy trình bắt buộc thực hiện vào **17:30 hàng ngày** (hoặc khi kết thúc ngày làm việc) để đảm bảo hệ thống Memory luôn được cập nhật và AI không lặp lại lỗi cũ.

## Mục tiêu:
- Tổng hợp toàn bộ lỗi (bug), bài học kinh nghiệm trong ngày.
- Ghi nhận các lệnh terminal, SQL, hoặc snippet hữu ích.
- Cập nhật danh sách các hành vi/quy trình không được làm (Anti-patterns).

## Các bước thực hiện:

### 1. Quét lịch sử hội thoại
AI tự động đọc lại các yêu cầu và phản hồi trong ngày hôm nay để xác định:
- Đâu là những chỗ Mr. Đào phải nhắc nhở hoặc sửa lỗi.
- Đâu là những giải pháp kỹ thuật mới được áp dụng thành công.
- Các lệnh quan trọng đã chạy thành công trong terminal hoặc database.

### 2. Phân loại và Soạn Draft
AI lập một bản danh sách tạm thời (Draft) chia làm **4 mục**:
- **Lessons Learned:** "Hôm nay tôi đã học được rằng...", "Lỗi X xảy ra do Y, cách fix là Z".
- **Anti-patterns:** "KHÔNG ĐƯỢC làm việc A khi đang thực hiện việc B", "Tránh sử dụng thư viện X cho mục đích Y".
- **Useful Commands:** Các lệnh SSH, DB migration, lệnh xóa dữ liệu đặc thù,...
- **Kaizen:** "Hôm nay tôi phát hiện cách làm X thông minh hơn là Y vì...", "Pattern Z giúp code gọn hơn trong trường hợp...".

### 3. Trình duyệt & Phê duyệt (BẮT BUỘC)
AI gửi bản Draft này cho Mr. Đào với câu hỏi:
*"Dưới đây là tổng kết bài học hôm nay của tôi. Anh xem có cần chỉnh sửa hay bổ sung gì không?"*

> [!IMPORTANT]
> TUYỆT ĐỐI KHÔNG ĐƯỢC tự ý dùng tool `write_to_file` hay `replace_file_content` để sửa Memory khi chưa nhận được xác nhận "Duyệt" cho chính bản Draft vừa gửi.

### 4. Cập nhật Memory
Sau khi Mr. Đào xem Draft và đồng ý ("Duyệt", "Lưu đi", "OK"), AI mới tiến hành append vào các file:
- `agent/memory/lessons-learned.md`
- `agent/memory/anti-patterns.md`
- `agent/memory/useful-commands.md`
- `agent/memory/kaizen.md` ← *Ghi Best Practice & Pattern mới phát hiện hôm nay*

### 5. Tự động hoá tiến hoá (Self-Improvement)
Nếu có bài học nào làm thay đổi cách thực hiện một Workflow hiện có, AI sẽ ĐỀ XUẤT (không tự sửa) thay đổi cho Mr. Đào duyệt. **FE Dev không được tự sửa workflow.**

---
*Ghi chú: Gõ lệnh này vào cuối ngày để tối ưu hoá bộ não của AI cho ngày mai.*
