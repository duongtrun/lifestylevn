---
description: Quy trình Mổ xẻ và rà soát Mạch máu (Data/Logic Flow) của một module đưa vào PROJECT_MAP.md
---
# Workflow: Mổ xẻ Mạch Máu (Blood Vessels Map)

**Mục tiêu:** Truy vết luồng dữ liệu (Data flow) và luồng điều khiển (Logical flow) của một tính năng từ trên xuống dưới (End-to-End) ngóc ngách nhất và chép vào `PROJECT_MAP.md`.

## Các bước Máy/AI cần thực hiện:

1. **Tiếp nhận điểm mổ xẻ:** Xác định tính năng/module mà sếp muốn mổ xẻ (Phạm vi). Chạy công cụ tìm kiếm (`grep_search` hoặc `view_file`) để định vị ngọn nguồn.
2. **Dò đầu vào (Frontend/Cổng gọi):** Tìm các hàm sự kiện khởi tạo hành động.
   - Ghi chú lại View/Component và đường dẫn file khởi phát sự kiện.
3. **Dò đường truyền (Network/State/Bridge):** Tìm các ống dẫn truyền máu.
   - Redux/Zustand Store? Call API bằng `ky` hay `axios`? WebRTC hay Bridge postMessage?
4. **Dò lõi xử lý trung tâm (Backend/Engine):** Lần sang logic xử lý nhận và biểu diễn data.
   - Hàm Python xử lý (Service layer, Repository layer)? Thuật toán chấm điểm SDK?
5. **Dò kho chứa (Database/Storage):** Kết thúc mạch máu.
   - Tên bảng Database Models (`models.py`) hoặc Data log (Telemetry Data).
6. **Đóng gói Bản Đồ:** Mở tệp `PROJECT_MAP.md` và viết lại luồng mạch máu cực kì rõ ràng thành các gạch đầu dòng, có đính kèm đường dẫn thư mục File cho từng mắt xích.
