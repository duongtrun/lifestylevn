---
description: Fix lỗi tạo dự án
---

// turbo-all

Mục tiêu:
- tìm đúng lỗi khi chạy ./dev.sh hoặc ./start.sh

Ràng buộc:
- phải dựa log
- không sửa lan
- debug theo từng bước script

Thứ tự:
1. mô tả lỗi + bước bị fail
2. phân tích các bước trong script
3. khoanh vùng (env / dependency / config / service / port / permission)
4. nêu nguyên nhân hoặc giả thuyết
5. cách kiểm tra
6. hướng sửa
7. lệnh cần chạy
8. checklist verify

Checklist:
- version môi trường
- dependency
- .env/config
- service (DB, Redis…)
- port
- cache/build
- permission script

Điều kiện thất bại:
- không xác định được bước lỗi
- không đọc log
- fix kiểu thử sai
- không verify lại
