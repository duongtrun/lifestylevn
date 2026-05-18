---
description: Quy trình hoàn tác (revert) code đảm bảo 100% nguyên trạng như trước khi thực thi lệnh bị sai hoặc hiểu lầm.
---

# 🔄 Workflow Hoàn Tác Code (Revert)

Quy trình này áp dụng khi AI (Antigravity/Claw) hiểu nhầm lệnh người dùng hoặc phát sinh lỗi trầm trọng sau một lệnh sửa đổi (refactor/update), yêu cầu phải quay ngược lại thời gian và hoàn nguyên chính xác 100% trạng thái code ngay lúc trước khi lệnh đó được thực thi.

## ⛔ Điều kiện bắt buộc (Nguyên tắc lõi)
- Phải đảm bảo **chính xác từng dòng code (100% identical)** so với trạng thái cũ. KHÔNG được phỏng đoán hoặc viết lại theo trí nhớ của AI.
- Ưu tiên sử dụng `git` (nếu đang trong Git repo) hoặc lịch sử chỉnh sửa (file metadata/IDE rollback) làm nguồn tham khảo ground truth.

---

## 🏗️ Các bước triển khai

### Mục tiêu:
Khôi phục dự án về thời điểm an toàn gần nhất một cách khoa học.

### Điệu kiện thất bại:
- File không đồng nhất 100% với lúc trước đó.
- Lỗi import, biến chưa khai báo sót lại do revert không sạch.
- Phá hỏng các file không liên quan đến lệnh vừa bị huỷ.

### 📝 Trình tự (Checklist thực thi):

**1. Xác định phạm vi ảnh hưởng (Scope Detection)**
- Rà soát lịch sử lệnh thay đổi (`diff_block`, `multi_replace_file_content`, file creation) mà AI vừa thực hiện do hiểu sai ý.
- Lập danh sách CHÍNH XÁC các files đã bị chạm vào. Trình Danh sách này ra báo cáo cho user xem.

**2. Tìm Ground Truth (File gốc chuẩn xác)**
- Nếu có VCS (`git`), sử dụng `git diff` hoặc `git checkout -- <file>` cho từng file. Hoặc dùng `git reflog` và `git reset --hard` nếu có commit gần nhất.
- Nếu không có commit cụ thể, truy cập vào `metadata` lịch sử (từ Terminal hoặc AppData) để đọc lại dữ liệu dòng cũ. Hoặc check lại phần log (overview.txt) đã sinh ra khi AI phân tích lệnh trước đó.
- Nếu có file mới được tạo ở lệnh sai lầm này 👉 Xoá file.

**3. Khôi phục (Revert Execution)**
- Chạy thay thế đoạn code thừa bằng đúng đoạn code cũ qua công cụ sửa mã (`replace_file_content` hoặc `multi_replace_file_content`).
- Chú ý những khoảng trắng, dấu ngoặc, biến môi trường.

**4. Xác minh sau khi đổi (Verification / Audit)**
- Review lại diff của repo bằng lệnh `git status` hoặc `git diff` để đảm bảo không còn file nào bị dơ (dirty/modified file) liên quan đến lệnh hiểu sai đấy.
- Chạy lệnh build kiểm tra nháp (VD: `npm run build` hoặc linting check) nếu đó là thay đổi về logic phức tạp để đảm bảo app đã biên dịch thông thuận, API hoạt động bình thường.

**5. Báo cáo (Reporting)**
- Sau khi hoàn thành, báo cho User bằng câu lệnh: *"✅ Đã Rollback 100%. Mọi thứ đã quay về điểm lưu trữ an toàn trước đó, mời anh kiểm tra lại giao diện. Anh có thể đưa ra lệnh mới!"*

---

> 💡 **Mẹo:** Trong trường hợp thao tác quá phức tạp, AI cần chủ động cảnh báo user nên dùng lệnh `git stash` hoặc tạo một `branch nháp` trước khi thực thiện những kế hoạch có rủi ro hiểu nhầm cao.
