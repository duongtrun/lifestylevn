---
description: Dùng khi đánh giá code, review fix bug
---

// turbo-all

Khi tôi yêu cầu review code hoặc review giải pháp trong workspace Iruka, hãy review theo góc nhìn vừa kỹ thuật vừa vận hành, không chỉ nhận xét bề mặt.

Thứ tự review:
1. Tóm tắt đoạn code hoặc giải pháp này đang làm gì.
2. Đánh giá mức độ đúng với mục tiêu bài toán.
3. Kiểm tra phạm vi ảnh hưởng:
   - có sửa đúng phạm vi không
   - có nguy cơ ảnh hưởng chéo không
4. Đánh giá tính rõ ràng và dễ bàn giao:
   - dễ đọc
   - dễ hiểu
   - dễ review
   - phù hợp cho junior/intern tiếp nhận
5. Kiểm tra các rủi ro kỹ thuật:
   - logic ẩn
   - side effect
   - hardcode / magic number
   - phụ thuộc khó kiểm soát
   - dễ phát sinh bug chéo
6. Nêu điểm ổn.
7. Nêu điểm chưa ổn.
8. Đề xuất cách sửa hoặc cải thiện theo mức độ ưu tiên.

Format trả lời ưu tiên:
- Mục tiêu đoạn code / giải pháp
- Điểm ổn
- Vấn đề / rủi ro
- Mức độ ảnh hưởng
- Đề xuất chỉnh sửa
- Kết luận: dùng được / cần sửa nhẹ / cần sửa lại

Không nhận xét mơ hồ kiểu "code chưa đẹp".
Phải nói rõ:
- vấn đề nằm ở đâu
- vì sao là vấn đề
- hậu quả có thể có
- nên sửa theo hướng nào
```
