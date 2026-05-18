# 🗺️ Web Lifestyle Workflow Navigator (FE Only)

> Bản đồ tra cứu nhanh hệ thống Workflow đã được quy hoạch theo phân lớp (0-9).
> Khi cần thực hiện bước nào, gõ `/` + `[số]` + `[tên]` để gọi lệnh nhanh.
>
> **Phạm vi:** Chỉ Frontend cho dự án `web-lifestyle`. Mọi workflow Backend / Game / Server đã được loại bỏ.

---

## 🏗️ Lớp 0: Meta & Master Gate

*Dùng để quản trị hệ thống và bao quát quy trình tổng.*

- `0-gate`: Cổng tự động kiểm soát workflow — tra cứu workflow phù hợp cho task
- `0-navigator`: Điều hướng khi không biết bắt đầu từ đâu (file này)
- `0-scope-execution`: Chia scope và thực thi tuần tự khi task lớn
- `0-vibe-coding-master`: Tổng quan quy trình Vibe Coding từ ý tưởng đến Production

## 🔍 Lớp 1: Phân tích & Đặc tả (Analyze & Spec)

*Dùng khi mới nhận yêu cầu hoặc bản thảo thô.*

- `1-analyze-request`: Phân tích yêu cầu thô
- `1-analyze-logic-proposal`: Phân tích logic nghiệp vụ và đề xuất giải pháp kỹ thuật theo tiêu chuẩn Big Tech (Design Doc/RFC)
- `1-analyze-reuse`: Kiểm tra khả năng tái sử dụng code/component cũ
- `1-map-blood-vessels`: Mổ xẻ mạch máu data/logic flow của một module
- `1-design-review`: Review thiết kế từ Figma/Mockup
- `1-write-docs`: Viết tài liệu hướng dẫn / đào tạo
- `1-restructure-docs`: Tái cấu trúc tài liệu cũ thành dễ đọc

## 📝 Lớp 2: Lập kế hoạch Tổng thể (Planning)

*Dùng để hoạch định các đầu việc lớn (Master Plan).*

- `2-master-plan`: Lên kế hoạch dự án lớn
- `2-plan-feature`: Lên kế hoạch cho một tính năng cụ thể
- `2-plan-from-mockup`: Lên plan từ mockup HTML có sẵn
- `2-plan-task`: Lên danh sách nhiệm vụ chi tiết

## 🛠️ Lớp 3: Thiết kế Kỹ thuật (Technical Design)

*Dùng để thiết kế chi tiết Frontend trước cửa ngõ coding.*

- `3-plan-frontend`: Thiết kế cấu trúc Component, State, Routing
- `3-plan-ui&ux`: **(PREMIUM)** Thiết kế giao diện thông minh, hiện đại
- `3-design-system-core`: Thiết kế Design System (color token, typography, component)
- `3-mockup-spec`: Spec mockup chi tiết để dev code chuẩn ngay lần đầu
- `3-calibrate-ui-responsive`: Hiệu chỉnh UI responsive cho 3 cỡ màn (mobile/tablet/desktop)
- `3-audit-code-plan`: Checklist kiểm tra kế hoạch đã chuẩn chưa

## 💻 Lớp 4: Thực thi Code (Execution)

*Dùng để viết code thực tế dựa trên kế hoạch đã duyệt.*

- `4-code-by-plan`: Code nghiêm kỷ theo kế hoạch (Không sửa lan)
- `4-code-frontend`: Triển khai giao diện theo plan
- `4-code-ui&ux`: **(PREMIUM)** Triển khai Component siêu mượt, responsive
- `4-code-flow-request`: Xử lý nhanh các yêu cầu nhỏ
- `4-frontend-ui`: Code UI từ Design
- `4-figma-to-ui`: Đắp Figma vào logic có sẵn (không vỡ cấu trúc cũ)
- `4-frontend-mockup-fidelity`: Code UI từ mockup HTML pixel perfect
- `4-refine-ui-pro`: Tinh chỉnh UI ("polish", "fine-tune", "đẹp hơn")
- `4-cross-screen-flow`: Đảm bảo chuyển màn liền mạch giữa nhiều screen
- `4-debug-preview`: Thêm debug URL param để xem nhanh màn hình

## 🛡️ Lớp 5: Kiểm định & Review (QA & Audit)

*Dùng để đánh giá chất lượng và bảo mật.*

- `5-audit-code`: Audit toàn bộ mã nguồn
- `5-audit-feature`: Test tính năng sau khi xong
- `5-audit-frontend`: Kiểm tra giao diện & UX của 1 tính năng
- `5-audit-cross-screen`: Audit chuyển đổi giữa các màn hình
- `5-audit-button-flow`: Audit luồng nút bấm
- `5-audit-logic`: Audit toàn bộ logic của 1 tính năng
- `5-code-review`: Review mã nguồn trước khi merge
- `5-review-code-iruka`: Đánh giá logic fix bug
- `5-security-frontend`: Kiểm tra an toàn phía Client (XSS, CSP, ...)
- `5-test-manual`: Viết checklist test thủ công từng bước
- `5-test-auto`: Viết test script tự động (PASS/FAIL không cần UI)

## 🚑 Lớp 6: Sửa lỗi & Khôi phục (Fix & Revert)

*Dùng khi có sự cố hoặc bug phát sinh.*

- `6-bugfix`: Quy trình sửa bug chuẩn
- `6-fix-bug`: Fix nhanh các lỗi hiển thị/logic FE
- `6-fix-design-fidelity`: Sửa lệch UI so với design gốc (mockup/Figma)
- `6-fix-loi-tao-du-an`: Fix lỗi đặc thù khi khởi tạo dự án
- `6-revert-code-iruka`: Hoàn tác (Undo) code về trạng thái an toàn 100%

## 🚀 Lớp 7: Vận hành & Tối ưu (Ops & Speed)

*Dùng để đẩy sản phẩm ra thế giới và tăng tốc.*

- `7-deploy-flow`: Quy trình Deploy lên Vercel staging/production
- `7-optimize-fe`: Tối ưu hiệu năng Frontend (Web Vitals, bundle size, render)

## 🧠 Lớp 9: Tự cải tiến (Learn & Sync)

- `9-self-improve`: Tự học và cập nhật rule làm việc

## Other

- `rv`: Rà soát đúc kết bài học cuối ngày (Daily Review)
- `report-to-discord`: Báo cáo kết quả task lên Discord

---

*Lưu ý: Luôn ưu tiên Kế hoạch (Lớp 2, 3) trước khi Thực thi (Lớp 4).*

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Navigator — Phiên bản FE-only*
