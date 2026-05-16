---
description: Quy trình kiểm tra, phân tích và tận dụng lại Code/Component từ các module khác trước khi code mới.
---

# ♻️ Workflow: /analyze-reuse

> **Mục tiêu:** Tránh việc "phát minh lại bánh xe" (DRY - Don't Repeat Yourself). Trước khi code một màn hình, tính năng, hoặc component mới, AI PHẢI chạy workflow này để quét toàn bộ codebase xem có module nào tương tự để tận dụng lại hay không.

---

## Bước 1: Xác định nhu cầu thực tế
Trước khi tìm kiếm, AI và User cần xác định rõ:
- Giao diện (UI) cần xây dựng giống với cái nào đã có? (Ví dụ: Giống dạng danh sách thẻ của Dev-Center không?)
- Logic (Data/API) cần dùng là gì? (Ví dụ: Có cần hook fetch data danh sách game không?)

## Bước 2: Quét (Scan) hệ thống hiện hành
Sử dụng các công cụ tìm kiếm (`list_dir`, `grep_search`) rà soát các thư mục dùng chung:
- `src/components/`: Các UI Component cơ bản (Button, Modal, Tab, Table tự chia).
- `src/features/`: Các module đã hoàn thiện (Ví dụ: `games`, `auth`, `dashboard`).
- `src/hooks/` & `src/lib/`: Logic nghiệp vụ dùng chung.

## Bước 3: Đánh giá & Phân loại Code tái sử dụng
Sau khi quét, AI phải lập một danh sách (Báo cáo) gửi cho User với các mục sau:

### 🟢 1. Tận dụng 100% (Dùng ngay, không cần sửa)
- **Tên Component / Hàm:** (vd: `useGames` hook)
- **Vị trí:** `src/features/games/hooks/useGames.ts`
- **Cách dùng:** Import trực tiếp và truyền params phù hợp.

### 🟡 2. Tận dụng UI / Layout (Cần truyền thêm Props)
- **Tên Component:** (vd: `GameCard.tsx`)
- **Vấn đề:** Đang fix cứng chức năng cho Dev.
- **Cách sửa để dùng chung:** Bổ sung thêm props `showQCAction?: boolean`, gỡ bỏ logic fix cứng, biến thành component linh hoạt (Dumb component).

### 🟠 3. Không xài được UI nhưng copy được Logic
- **Tên tham khảo:** (vd: Logic upload file của `upload` feature)
- **Cách làm:** Tự xây UI mới, nhưng copy toàn bộ phần `try/catch` xử lý Firebase/S3 từ thư mục kia sang.

---

## Bước 4: Chốt phương án tái cấu trúc (Refactor)
Nếu việc tái sử dụng yêu cầu phải **sửa đổi file gốc của module khác** (Trường hợp 2 ở trên), AI PHẢI:
1. Thông báo rõ Rủi ro: *"Việc sửa `GameCard` có thể ảnh hưởng đến màn hình của Dev."*
2. Xin phép User: *"Tôi sẽ refactor nó thành component dùng chung, anh có đồng ý không?"*
3. Chỉ tiến hành sau khi User gật đầu.

---

## 🎉 Báo cáo đầu ra chuẩn (Mẫu)
Khi gọi lệnh `/analyze-reuse`, response của AI luôn phải có format:
```markdown
✅ **Phân tích tái sử dụng cho tính năng: [Tên tính năng]**

**1. Các UI Components có thể dùng lại:**
- `[Tên]` (từ thư mục abc): Sẽ tái sử dụng 100%.

**2. Các Hooks / Logic tái sử dụng:**
- `[Tên Hook]` (từ thư mục xyz): Tái sử dụng để fetch dữ liệu.

**3. Đề xuất Refactor nhỏ (Nếu có):**
- Đề xuất thêm props `xyz` vào component `abc` để dùng chung. Xin phép User.

👉 **Kết luận:** Tận dụng được [X]% code. Tiến hành lên kế hoạch Plan Task luôn nhé?
```
