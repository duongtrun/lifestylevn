---
description: Kiểm tra kế hoạch thực hiện đúng chưa.
---

Mục tiêu:
- Kiểm tra việc triển khai có đúng kế hoạch đã duyệt hay không
- Phát hiện sai lệch giữa plan và code/UI thực tế
- Đưa ra danh sách chỉnh sửa cụ thể để đưa hệ thống về đúng kế hoạch

Ràng buộc:
- phải bám kế hoạch đã duyệt làm chuẩn
- không đánh giá cảm tính
- phải kiểm tra cả UI, logic và code
- không bỏ qua test thực tế
- mọi kết luận phải có dẫn chứng (code hoặc UI)

---

Bước thực hiện:

1. Tóm tắt kế hoạch đã duyệt:
- mục tiêu
- các flow chính
- yêu cầu UI/UX
- logic chính

---

2. Xác định phạm vi audit:
- màn hình / module
- file / component / API liên quan

---

3. Kiểm tra triển khai thực tế:

3.1. Kiểm tra flow:
- từng flow trong kế hoạch đã được implement chưa
- có flow nào:
  + thiếu
  + sai logic
  + phát sinh ngoài plan

3.2. Kiểm tra UI:
- UI có đúng thiết kế/kế hoạch không
- có lệch:
  + layout
  + spacing
  + trạng thái (loading, error…)

3.3. Kiểm tra code:
- code có bám đúng logic plan không
- có:
  + code thừa
  + logic dư
  + xử lý thiếu case
- có thay đổi ngoài phạm vi không

---

4. Test thực tế:
- test từng flow (happy path, error, edge case)
- test hành vi user thực tế
- ghi nhận:
  + kết quả đúng/sai
  + bug phát sinh

---

5. So sánh Plan vs Thực tế:
- phần nào đúng
- phần nào sai
- phần nào thiếu
- phần nào phát sinh ngoài kế hoạch

---

6. Bảng audit chi tiết (bắt buộc):

Cột:
- STT
- Hạng mục (Flow/UI/Logic)
- Theo kế hoạch
- Thực tế
- Vấn đề
- Nguyên nhân
- Hướng sửa
- Phạm vi ảnh hưởng
- Mức độ (High/Medium/Low)
- Rủi ro

---

7. Kế hoạch chỉnh sửa:
- nhóm các vấn đề theo:
  + UI
  + logic
  + flow
- đề xuất thứ tự sửa
- phần nào cần duyệt trước

---

8. Checklist sau khi sửa:
- tất cả flow đúng plan
- không phát sinh lỗi mới
- không ảnh hưởng phần khác
- UI ổn định
- code sạch, không dư thừa

---

Điều kiện thất bại:
- không bám kế hoạch làm chuẩn
- không test thực tế
- không so sánh plan vs thực tế
- đánh giá chung chung, không có dẫn chứng
- không có bảng audit chi tiết
- không đề xuất hướng sửa cụ thể
