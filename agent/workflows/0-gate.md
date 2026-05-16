---
description: Meta-workflow — Tự động gắn workflow vào mọi task trước khi thực hiện
---

# 🤖 Auto-Workflow Gate

> **QUAN TRỌNG:** Đây là meta-workflow. Antigravity PHẢI chạy workflow này TRƯỚC MỌI TASK.

---

## Mục tiêu

Đảm bảo mọi task đều có workflow phù hợp trước khi thực hiện.  
Nếu chưa có → đề xuất viết workflow mới → Mr. Đào duyệt → mới làm task.

---

## Bước 1: Phân loại task → Chọn workflow đúng

| Loại task | Workflow phù hợp |
|-----------|-----------------|
| **📚 PHÂN TÍCH & KHẢO SÁT** | |
| Câu hỏi / giải thích / phân tích yêu cầu | `/1-analyze-request` |
| Phân tích tính năng theo góc giáo dục IruKa | `/1-analyze-feature-iruka` |
| Phân tích logic nghiệp vụ + đề xuất kỹ thuật | `/1-analyze-logic-proposal` |
| Tận dụng lại code/component từ module khác | `/1-analyze-reuse` |
| Mổ xẻ mạch máu data/logic flow một module | `/1-map-blood-vessels` |
| Rà soát phân quyền / vai trò (role audit) | `/1-audit-role` |
| Review design từ Figma | `/1-design-review` |
| Viết tài liệu BA / spec tính năng | `/1-write-spec-iruka` |
| Viết hướng dẫn / tài liệu đào tạo | `/1-write-docs` |
| Tái cấu trúc sắp xếp lại file tài liệu cũ | `/1-restructure-docs` |
| Săn tài nguyên miễn phí (API Key, Server, Token) từ BigTech | `/1-hunt-free-resources` |
| Apply chương trình khuyến mãi Startup (AWS, GCP, Microsoft...) | `/1-apply-startup-programs` |
| **📋 LÊN KẾ HOẠCH** | |
| Ý tưởng lớn / chiến lược sản phẩm | `/2-master-plan` |
| Tính năng mới (ý tưởng → task list) | `/2-plan-feature` |
| Kế hoạch chung / lên module | `/2-plan-task` |
| Kế hoạch tính năng tiếp theo cho app | `/2-plan-next-feature-app` |
| **🏗️ THIẾT KẾ KỸ THUẬT** | |
| Thiết kế mockup đầy đủ state (sẵn sàng code) | `/3-mockup-spec` |
| Kế hoạch triển khai backend | `/3-plan-backend` |
| Kế hoạch triển khai frontend / UI | `/3-plan-frontend` |
| Kế hoạch UI/UX chuyên nghiệp | `/3-plan-ui&ux` |
| Kế hoạch Game SDK | `/3-plan-game-sdk` |
| Kế hoạch AI Brain / logic AI | `/3-plan-ai-brain` |
| Thiết kế DB / migration | `/3-db-migration` |
| Design System / token / component | `/3-design-system-core` |
| Kiểm tra kế hoạch đã duyệt | `/3-audit-code-plan` |
| Hiệu chỉnh UI responsive | `/3-calibrate-ui-responsive` |
| **⚙️ TRIỂN KHAI CODE** | |
| Code theo kế hoạch đã duyệt nghiêm kỷ | `/4-code-by-plan` |
| Code backend (FastAPI) | `/4-code-backend` |
| Code API endpoint backend | `/4-backend-api` |
| Code frontend / UI IruKa | `/4-code-frontend` |
| Code UI component chuẩn UX | `/4-code-ui&ux` |
| Code từ design Figma sang code | `/4-figma-to-ui` |
| Code UI từ mockup HTML (pixel perfect) | `/4-frontend-mockup-fidelity` |
| Code frontend/UI từ design → component hoàn chỉnh | `/4-frontend-ui` |
| Code Game SDK | `/4-code-game-sdk` |
| Tạo Game Template mẫu | `/4-code-template-sdk` |
| Thêm mini-game mới | `/4-add-mini-game` |
| Yêu cầu nhỏ / nhanh | `/4-code-flow-request` |
| Thêm debug URL param để xem nhanh màn hình | `/4-debug-preview` |
| **🔍 KIỂM TRA & AUDIT** | |
| Audit tính năng sau khi code xong | `/5-audit-feature` |
| Audit toàn bộ codebase | `/5-audit-code` |
| Audit Discord Bot (tình huống ngoại lai, edge case) | `/5-audit-discord-bot` |
| Audit luồng màn hình frontend | `/5-audit-frontend` |
| Audit Game Template sau porting | `/5-audit-game-template` |
| Audit Game UI/UX toàn diện | `/5-audit-game-uiux` |
| Audit SDK v2 (từ ngoài vào trong) | `/5-audit-sdk` |
| Audit luồng nút bấm / button flow | `/5-audit-button-flow` |
| Review code trước merge | `/5-code-review` |
| Đánh giá code / review fix bug | `/5-review-code-iruka` |
| Bảo mật enterprise-grade | `/5-security-audit-enterprise` |
| Bảo mật backend | `/5-security-backend` |
| Bảo mật frontend | `/5-security-frontend` |
| Viết test script tự động (PASS/FAIL không cần UI) | `/5-test-auto` |
| Viết checklist test thủ công từng bước | `/5-test-manual` |
| Kiểm tra backend API | `/5-test-backend` |
| Kiểm tra Game SDK | `/5-test-game-sdk` |
| Test UI giao diện học sinh | `/test-ui-hoc-sinh` |
| Test UI giao diện phụ huynh | `/test-ui-phu-huynh` |
| Test UX theo góc nhìn học sinh (trẻ 5-10 tuổi) | `/test-ux-hoc-sinh` |
| Test UX theo góc nhìn phụ huynh | `/test-ux-phu-huynh` |
| **🔧 SỬA LỖI & REVERT** | |
| Fix bug giao diện, backend, game | `/6-fix-bug` |
| Fix bug backend | `/6-fixbug-backend` |
| Fix lỗi UI/UX game mini | `/6-fix-game-ui` |
| Fix lỗi tạo dự án | `/6-fix-loi-tao-du-an` |
| Quy trình sửa bug đầy đủ | `/6-bugfix` |
| Hoàn tác (revert) code về trạng thái cũ | `/6-revert-code-iruka` |
| **🚀 VẬN HÀNH** | |
| Deploy lên staging / production | `/7-deploy-flow` |
| Tối ưu hiệu năng frontend / backend | `/7-optimize` |
| **🧠 TỰ CẢI TIẾN** | |
| Rà soát đúc kết bài học cuối ngày | `/rv` |
| Tự học và cập nhật rule làm việc | `/9-self-improve` |
| Đồng bộ danh sách workflow vào GEMINI.md | `/9-sync-workflows` |
| Báo cáo kết quả lên Discord | `/report-to-discord` |
| **🏢 TỔ CHỨC & NHÂN SỰ** | |
| Tái cấu trúc bộ phận, sắp xếp công việc nhân viên | `/hr-role-reset` |
| Tái cấu trúc doanh nghiệp (sơ đồ, phân vai, phân quyền) | `/org-restructure` |
| **🔄 META** | |
| Tổng quan quy trình vibe coding từ đầu đến cuối | `/0-vibe-coding-master` |
| Điều hướng không biết bắt đầu từ đâu | `/0-navigator` |
| Task lớn cần chia scope và thực thi tuần tự | `/0-scope-execution` |

---

## Bước 2: Kiểm tra workflow tồn tại

```
Workflow tìm được → Có trong danh sách?
├── CÓ → Tiếp tục bước 3
└── KHÔNG → Tiếp tục bước "Tạo workflow mới"
```

---

## Bước 3: Khai báo workflow đang dùng (BẮT BUỘC)

Ở đầu mỗi response, thêm dòng:

```
📋 Workflow: /[tên-workflow] | 📖 Memory: đã đọc lessons-learned.md
```

Ví dụ thực tế:
```
📋 Workflow: /fix-bug | 📖 Memory: đã đọc lessons-learned.md
```

---

## Bước 4: Thực hiện theo workflow đã chọn

Đọc file workflow và làm đúng theo các bước được định nghĩa.

---

## Bước 5 (nếu không có workflow): Tạo workflow mới

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
🆕 Tôi chưa có workflow cho task này.
Đề xuất tạo workflow: /[tên-mới]

[Paste nội dung draft]

👉 Anh duyệt workflow này thì tôi sẽ lưu lại và làm task luôn.
```

3. **Chờ duyệt** → Lưu file `.agent/workflows/[tên].md` → Thực hiện task

---

## Nguyên tắc chọn workflow

### Ưu tiên theo mức độ:
1. Match CHÍNH XÁC loại task → dùng ngay
2. Gần nhất → dùng + note điều chỉnh
3. Không có gì phù hợp → đề xuất tạo mới

### Khi task ghép nhiều loại:
- Chọn workflow tổng quát nhất
- Hoặc chọn 2 workflow và khai báo cả 2

Ví dụ: Task vừa design vừa code frontend:
```
📋 Workflow: /design-review → /code-frontend | 📖 Memory: đã đọc
```

---

## Kết nối với Memory System

Sau mỗi task hoàn thành:
1. Nếu có lỗi xảy ra → Draft bài học → Hỏi Mr. Đào có muốn lưu không
2. Nếu workflow thiếu bước nào → Đề xuất cải tiến workflow

---

*Cập nhật: 2026-04-22 | Auto-Workflow Gate v2.0 — Đồng bộ đầy đủ 76 workflows*
