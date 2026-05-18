---
description: Meta-workflow — Tự động gắn workflow vào mọi task trước khi thực hiện (FE Only)
---

# 🤖 Auto-Workflow Gate (FE Only)

> **QUAN TRỌNG:** Đây là meta-workflow. AI Agent / FE Dev PHẢI chạy workflow này TRƯỚC MỌI TASK.

---

## Mục tiêu

Đảm bảo mọi task đều có workflow phù hợp trước khi thực hiện.
**FE Dev KHÔNG được tự tạo workflow mới** — nếu chưa có → đề xuất → Mr. Đào duyệt → mới làm task.

---

## Bước 1: Phân loại task → Chọn workflow đúng

| Loại task | Workflow phù hợp |
|-----------|-----------------|
| **📚 PHÂN TÍCH & KHẢO SÁT** | |
| Câu hỏi / giải thích / phân tích yêu cầu | `/1-analyze-request` |
| Phân tích logic nghiệp vụ + đề xuất kỹ thuật | `/1-analyze-logic-proposal` |
| Tận dụng lại code/component từ module khác | `/1-analyze-reuse` |
| Mổ xẻ mạch máu data/logic flow một module | `/1-map-blood-vessels` |
| Review design từ Figma | `/1-design-review` |
| Viết hướng dẫn / tài liệu đào tạo | `/1-write-docs` |
| Tái cấu trúc sắp xếp lại file tài liệu cũ | `/1-restructure-docs` |
| **📋 LÊN KẾ HOẠCH** | |
| Ý tưởng lớn / chiến lược sản phẩm | `/2-master-plan` |
| Tính năng mới (ý tưởng → task list) | `/2-plan-feature` |
| Plan từ mockup HTML có sẵn | `/2-plan-from-mockup` |
| Kế hoạch chung / lên module | `/2-plan-task` |
| **🏗️ THIẾT KẾ KỸ THUẬT** | |
| Thiết kế mockup đầy đủ state (sẵn sàng code) | `/3-mockup-spec` |
| Kế hoạch triển khai frontend / UI | `/3-plan-frontend` |
| Kế hoạch UI/UX chuyên nghiệp | `/3-plan-ui&ux` |
| Design System / token / component | `/3-design-system-core` |
| Kiểm tra kế hoạch đã duyệt | `/3-audit-code-plan` |
| Hiệu chỉnh UI responsive 3 cỡ | `/3-calibrate-ui-responsive` |
| **⚙️ TRIỂN KHAI CODE** | |
| Code theo kế hoạch đã duyệt nghiêm kỷ | `/4-code-by-plan` |
| Code frontend / UI | `/4-code-frontend` |
| Code UI component chuẩn UX | `/4-code-ui&ux` |
| Code từ design Figma sang code | `/4-figma-to-ui` |
| Code UI từ mockup HTML (pixel perfect) | `/4-frontend-mockup-fidelity` |
| Code frontend/UI từ design → component hoàn chỉnh | `/4-frontend-ui` |
| Tinh chỉnh UI ("polish", "fine-tune") | `/4-refine-ui-pro` |
| Đảm bảo chuyển màn liền mạch | `/4-cross-screen-flow` |
| Yêu cầu nhỏ / nhanh | `/4-code-flow-request` |
| Thêm debug URL param để xem nhanh màn hình | `/4-debug-preview` |
| **🔍 KIỂM TRA & AUDIT** | |
| Audit tính năng sau khi code xong | `/5-audit-feature` |
| Audit toàn bộ codebase | `/5-audit-code` |
| Audit luồng màn hình frontend | `/5-audit-frontend` |
| Audit chuyển màn | `/5-audit-cross-screen` |
| Audit logic toàn tính năng | `/5-audit-logic` |
| Audit luồng nút bấm / button flow | `/5-audit-button-flow` |
| Review code trước merge | `/5-code-review` |
| Đánh giá code / review fix bug | `/5-review-code-iruka` |
| Bảo mật frontend (XSS, CSP, ...) | `/5-security-frontend` |
| Viết test script tự động (PASS/FAIL không cần UI) | `/5-test-auto` |
| Viết checklist test thủ công từng bước | `/5-test-manual` |
| **🔧 SỬA LỖI & REVERT** | |
| Fix bug giao diện | `/6-fix-bug` |
| Quy trình sửa bug đầy đủ | `/6-bugfix` |
| Sửa lệch UI so với design gốc | `/6-fix-design-fidelity` |
| Fix lỗi tạo dự án | `/6-fix-loi-tao-du-an` |
| Hoàn tác (revert) code về trạng thái cũ | `/6-revert-code-iruka` |
| **🚀 VẬN HÀNH** | |
| Deploy lên Vercel staging / production | `/7-deploy-flow` |
| Tối ưu hiệu năng frontend (Web Vitals) | `/7-optimize-fe` |
| **🧠 TỰ CẢI TIẾN** | |
| Rà soát đúc kết bài học cuối ngày | `/rv` |
| Tự học và cập nhật rule làm việc | `/9-self-improve` |
| Báo cáo kết quả lên Discord | `/report-to-discord` |
| **🔄 META** | |
| Tổng quan quy trình vibe coding từ đầu đến cuối | `/0-vibe-coding-master` |
| Điều hướng không biết bắt đầu từ đâu | `/0-navigator` |
| Task lớn cần chia scope và thực thi tuần tự | `/0-scope-execution` |

---

## Bước 2: Kiểm tra workflow tồn tại

```
Workflow tìm được → Có trong danh sách trên?
├── CÓ → Tiếp tục bước 3
└── KHÔNG → Báo Mr. Đào, KHÔNG tự tạo workflow mới
```

---

## Bước 3: Khai báo workflow đang dùng (BẮT BUỘC)

Ở đầu mỗi response, thêm dòng:

```
📋 Workflow: /[tên-workflow] | 📖 Memory: đã đọc lessons-learned.md
```

Ví dụ thực tế:
```
📋 Workflow: /6-fix-bug | 📖 Memory: đã đọc
📋 Workflow: /3-plan-frontend → /4-code-frontend | 📖 Memory: đã đọc
```

---

## Bước 4: Thực hiện theo workflow đã chọn

Đọc file workflow và làm đúng theo các bước được định nghĩa.

---

## Bước 5 (nếu không có workflow): KHÔNG tự tạo

> ⚠️ **FE Dev TUYỆT ĐỐI KHÔNG được tự tạo workflow mới.**

Nếu không tìm được workflow phù hợp:

1. **Draft workflow** với format chuẩn:
   ```markdown
   ---
   description: [Mô tả ngắn gọn]
   ---

   ## Mục tiêu
   ## Bước 1: ...
   ## Bước 2: ...
   ## Checklist
   ## Báo cáo
   ```

2. **Trình Mr. Đào**:
   ```
   🆕 Em chưa có workflow cho task này.
   Đề xuất tạo workflow: /[tên-mới]

   [Paste nội dung draft]

   👉 Anh duyệt workflow này thì em sẽ lưu lại và làm task luôn.
   ```

3. **Chờ duyệt** → Mr. Đào lưu file `agent/workflows/[tên].md` → FE Dev thực hiện task

---

## Nguyên tắc chọn workflow

### Ưu tiên theo mức độ:
1. Match CHÍNH XÁC loại task → dùng ngay
2. Gần nhất → dùng + note điều chỉnh
3. Không có gì phù hợp → đề xuất Mr. Đào tạo mới

### Khi task ghép nhiều loại:
- Chọn workflow tổng quát nhất
- Hoặc chọn 2 workflow và khai báo cả 2

Ví dụ: Task vừa design vừa code frontend:
```
📋 Workflow: /1-design-review → /4-code-frontend | 📖 Memory: đã đọc
```

---

## Kết nối với Memory System

Sau mỗi task hoàn thành:
1. Nếu có lỗi xảy ra → Draft bài học → **Hỏi Mr. Đào có muốn lưu không**
2. Nếu workflow thiếu bước nào → Đề xuất cải tiến → Mr. Đào duyệt → Mr. Đào sửa

> ⚠️ **FE Dev KHÔNG được tự append memory hoặc tự sửa workflow.**

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Auto-Workflow Gate — Phiên bản FE-only (52 workflow)*
