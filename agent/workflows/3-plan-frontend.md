---
description: Lên kế hoạch triển khai Frontend / UI.
---

// turbo-all

Khi xử lý Frontend, luôn phải lên kế hoạch trước khi code. Tư duy từ tổng thể (Architecture/Layout) đến chi tiết (Component/Logic). Các thuật ngữ kỹ thuật (tiếng Anh) phải được giải thích bằng tiếng Việt bên cạnh.

**Bắt buộc trước khi làm:**
- Hiểu rõ bài toán từ góc độ trải nghiệm người dùng (UX) và giao diện (UI), đứng dưới góc độ người dùng để đề xuất kế hoạch sao cho ui đẹp, ux thông minh.
- Phải vẽ sơ đồ luồng dữ liệu (Data Flow) và Sơ đồ Cấu trúc Component bằng Mermaid. 
- Phải vẽ giao diện dạng Mockup và Wireframe để hình dung các khối sắp xếp.
- Chỉ rõ phần nào tái sử dụng (Reusable), phần nào code mới.
- Xác định rõ mối liên hệ với Backend (API nào, Đã có hay chưa, Data schema là gì?).
- Khoanh vùng chính xác các file và thư mục sẽ bị ảnh hưởng, không tự ý sửa đổi các màn hình/component không liên quan.

**Format Báo cáo Kế Hoạch Ưu Tiên:**
1. **Mục tiêu tính năng** (Feature Goal)
2. **Sơ đồ Cấu trúc & Luồng dữ liệu** (Architecture Diagram)
   - *Bắt buộc dùng Mermaid vẽ Component logic. *, vẽ ux hiển thị.
3. **Phạm vi Backend liên quan** (Backend Dependencies)
   - *Tính năng này gọi API nào?*
   - *API cần chức năng gì từ Backend, đã có sẵn (Ready) hay cần sửa?*
4. **Cấu trúc Frontend & Phạm vi ảnh hưởng**
   - *Danh sách Component mới phân rã (Breakdown).*
   - *Danh sách File/Module sẽ bị chỉnh sửa và rủi ro ảnh hưởng hệ thống cũ.*
5. **Hướng xử lý / Logic UI** (Implementation Plan)
6. **Đề xuất tư duy dài hạn component nào có thể xây dựng thành dùng chung, lưu đúng forder để sau làm các công việc khác có thể tận dụng**
7. **Rủi ro & Điểm cần duyệt**
   - *Các rủi ro rò rỉ dữ liệu, lỗi responsive, v.v.*
8. **Chia phase các việc làm thật sự rõ ràng**
  - * Hướng dẫn cụ thể nên làm bao nhiêu phase trước, bao nhiêu phase sau, nên làm chia làm bao nhiêu giai đoạn vì tùy tình hình năng lực từng agent làm việc khác nhau .v.*

> **Lưu ý:** Không nhảy vào viết code Typescript/React ngay. Phải dùng lệnh chạy `/plan-frontend` để trình bày theo format này, đợi User duyệt "OK" rồi mới bắt đầu dùng quy trình code!