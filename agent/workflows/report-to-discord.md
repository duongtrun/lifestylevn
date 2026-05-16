---
description: Tự động báo cáo kết quả tác vụ của Antigravity lên Discord sau khi hoàn thành task lớn
---

# Workflow: /report-to-discord

## Khi nào dùng workflow này?

Tự động gọi sau khi hoàn thành **task lớn** (không phải sửa lỗi nhỏ):
- Fix bug quan trọng
- Thêm tính năng mới
- Refactor một module
- Deploy thành công
- Hoàn thành một Epic

## Các bước thực hiện

### Bước 1 — Thu thập thông tin task vừa xong

Tổng hợp nội dung sau:
- **task_name**: Tên task ngắn gọn (≤ 80 ký tự)
- **files_changed**: Liệt kê các file đã tạo/sửa (đường dẫn tương đối từ workspace root)
- **result**: Kết quả ngắn gọn ("Fix thành công", "12/12 tests pass", "Deploy OK"...)
- **duration_min**: Ước tính số phút đã làm (tùy chọn)

### Bước 2 — Gọi MCP Tool `send_ai_report`

```
Gọi tool: discord → send_ai_report
  task_name: [tên task]
  files_changed: [danh sách file]
  result: [kết quả]
  duration_min: [số phút]
```

### Bước 3 — Xác nhận với người dùng

Sau khi gửi xong, báo cáo ngắn:
```
✅ Đã báo cáo lên Discord #ai-worklog:
   Task: [tên task]
   Kết quả: [kết quả]
```

## Quy tắc tự động kích hoạt

Antigravity **PHẢI** tự gọi workflow này sau khi:
1. Hoàn thành và xác nhận fix một bug (sau khi test xong)
2. Commit/push code thành công
3. Triển khai hoặc deploy xong
4. Hoàn thành một bước lớn trong kế hoạch đã duyệt

Antigravity **KHÔNG** cần gọi workflow này khi:
- Sửa typo, comment, format code
- Đang trong giữa một task chưa xong
- Task bị cancel hoặc rollback

## Ví dụ thực tế

```
Task vừa xong: Fix bug game loading timeout trong game-hub

→ Gọi send_ai_report:
  task_name: "Fix bug game loading timeout"
  files_changed: ["game-hub/lib/gameLoader.ts", "game-hub/api/game/[id]/route.ts"]
  result: "Đã tăng timeout từ 5s → 15s, handle lỗi gracefully"
  duration_min: 8
```
