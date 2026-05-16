# 🗺️ IruKa Workflow Navigator

Chào CEO! Đây là bản đồ tra cứu nhanh hệ thống Workflow đã được quy hoạch theo phân lớp (0-7).
Khi cần thực hiện bước nào, anh chỉ cần gõ `/` + `[số]` + `[tên]` để gọi lệnh nhanh.

---

## 🏗️ Lớp 0: Meta & Master Gate
*Dùng để quản trị hệ thống và bao quát quy trình tổng.*
- `0-gate`: Cổng tự động kiểm soát workflow.
- `0-vibe-coding-master`: Tổng quan quy trình Vibe Coding từ ý tưởng đến Production.

## 🔍 Lớp 1: Phân tích & Đặc tả (Analyze & Spec)
*Dùng khi mới nhận Idea hoặc bản thảo thô từ người dùng.*
- `1-analyze-request`: Phân tích yêu cầu thô.
- `1-analyze-feature-iruka`: Phân tích sâu tính năng EdTech.
- `1-analyze-logic-proposal`: Quy trình phân tích logic nghiệp vụ và đề xuất giải pháp kỹ thuật theo tiêu chuẩn Big Tech (Design Doc/RFC).
- `1-analyze-reuse`: Kiểm tra khả năng tái sử dụng code cũ.
- `1-write-spec-iruka`: Viết BA/Spec chi tiết.
- `1-design-review`: Review thiết kế từ Figma/Mockup.

## 📝 Lớp 2: Lập kế hoạch Tổng thể (Planning)
*Dùng để hoạch định các đầu việc lớn (Master Plan).*
- `2-master-plan`: Lên kế hoạch dự án lớn.
- `2-plan-task`: Lên danh sách nhiệm vụ.
- `2-plan-feature`: Lên kế hoạch cho một tính năng cụ thể.

## 🛠️ Lớp 3: Thiết kế Kỹ thuật (Technical Design)
*Dùng để thiết kế chi tiết Backend/Frontend trước cửa ngõ coding.*
- `3-plan-backend`: Thiết kế database, API logic.
- `3-plan-frontend`: Thiết kế cấu trúc Component, State.
- `3-plan-ui&ux`: **(PREMIUM)** Thiết kế giao diện thông minh, hiện đại.
- `3-db-migration`: Lập kế hoạch thay đổi Database an toàn.
- `3-audit-code-plan`: Checklist kiểm tra kế hoạch đã chuẩn chưa.

## 💻 Lớp 4: Thực thi Code (Execution)
*Dùng để viết code thực tế dựa trên kế hoạch đã duyệt.*
- `4-code-by-plan`: Code nghiêm kỷ theo kế hoạch (Không sửa lan).
- `4-code-backend`: Triển khai Logic xử lý phía Server.
- `4-code-frontend`: Triển khai giao diện giao diện Iruka.
- `4-code-ui&ux`: **(PREMIUM)** Triển khai Component siêu mượt, responsive.
- `4-code-flow-request`: Xử lý nhanh các yêu cầu nhỏ.
- `4-frontend-ui`: Code UI từ Design.
- `4-backend-api`: Xây dựng Endpoint API.
- `4-add-mini-game`: Tạo Mini-game mới với Game SDK.

## 🛡️ Lớp 5: Kiểm định & Review (QA & Audit)
*Dùng để đánh giá chất lượng và bảo mật.*
- `5-audit-code`: Audit toàn bộ mã nguồn.
- `5-audit-discord-bot`: Audit toàn luồng Discord Bot — tình huống ngoại lai, logic ảnh hưởng, phương án xử lý.
- `5-audit-feature`: Test tính năng sau khi xong.
- `5-audit-frontend`: Kiểm tra giao diện & UX.
- `5-code-review`: Review mã nguồn trước khi merge.
- `5-review-code-iruka`: Đánh giá logic fix bug.
- `5-test-backend`: Kiểm tra API.
- `5-security-backend`: Kiểm tra lỗ hổng bảo mật Server.
- `5-security-frontend`: Kiểm tra an toàn phía Client.

## 🚑 Lớp 6: Sửa lỗi & Khôi phục (Fix & Revert)
*Dùng khi có sự cố hoặc bug phát sinh.*
- `6-bugfix`: Quy trình sửa bug chuẩn.
- `6-fix-bug`: Fix nhanh các lỗi hiển thị/logic.
- `6-fix-loi-tao-du-an`: Fix lỗi đặc thù khi khởi tạo.
- `6-fixbug-backend`: Sửa lỗi phía Server.
- `6-revert-code-iruka`: Hoàn tác (Undo) code về trạng thái an toàn 100%.

## 🚀 Lớp 7: Vận hành & Tối ưu (Ops & Speed)
*Dùng để đẩy sản phẩm ra thế giới và tăng tốc.*
- `7-deploy-flow`: Quy trình Deploy Staging/Production.
- `7-optimize`: Tối ưu hiệu năng, giảm giật lag.

---
*Lưu ý: Luôn ưu tiên Kế hoạch (Lớp 2, 3) trước khi Thực thi (Lớp 4).*
