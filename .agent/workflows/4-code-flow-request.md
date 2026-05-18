---
description: Code theo yêu cầu nhỏ
---

// turbo-all

Khi tôi yêu cầu code theo mục tiêu tôi yêu cầu.

Thứ tự xử lý:
Mục tiêu:
- Sửa đúng lỗi, không phát sinh lỗi mới

Ràng buộc:
- Phải khoanh vùng, Logic nào liên quan phải đồng bộ thông suốt, ko sửa logic sau mà hỏng logic khác.
- Không sửa lan
- Phải nêu nguyên nhân hoặc giả thuyết

Định dạng:
1. Mô tả lỗi
2. Nguyên nhân / giả thuyết
3. Khu vực ảnh hưởng
4. Hướng sửa
5. Rủi ro
6. Code sửa
7. Checklist test

Điều kiện thất bại:
- Không xác định nguyên nhân
- Không khoanh vùng
- Sửa lan, logic khác bị hỏng, bị sai.
- Không test lại

Không tự ý refactor diện rộng.
Không sửa thêm các phần ngoài phạm vi trừ khi tôi yêu cầu rõ.
Nếu phát hiện lỗi logic, ui, ux liên đới, ghi riêng ở mục "Phát hiện thêm" và đề xuất phương án xử lý.
