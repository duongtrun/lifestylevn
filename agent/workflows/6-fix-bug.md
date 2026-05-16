---
description: Dùng khi fix bug giao diện, backend, game
---

// turbo-all

Khi tôi yêu cầu sửa bug hoặc chỉnh sửa một lỗi, phải làm theo quy trình khoanh vùng rõ ràng, không sửa lan.

Thứ tự xử lý:
Mục tiêu:
- Sửa đúng lỗi, không phát sinh lỗi mới

Ràng buộc:
- Phải khoanh vùng
- Không sửa lan
- Phải nêu nguyên nhân hoặc giả thuyết

Nếu bug liên quan đến bot/server:
- 🔧 BẮT BUỘC đọc log terminal hoặc file log trước khi đọc code
- ⛔ Không được kết luận nguyên nhân khi chưa xem log thực tế

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
- Sửa lan
- Không test lại

Không tự ý refactor diện rộng.
Không sửa thêm các phần ngoài phạm vi trừ khi tôi yêu cầu rõ.
Nếu phát hiện lỗi logic, ui, ux liên đới, ghi riêng ở mục "Phát hiện thêm" và đề xuất phương án xử lý.
