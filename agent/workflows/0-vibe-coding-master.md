---
description: Tổng quan toàn bộ quy trình vibe coding từ ý tưởng đến production
---

# 🦁 VIBE CODING MASTER WORKFLOW
## Dành cho: Non-technical Founder / CEO không biết code

> **Nguyên tắc vàng:** Bạn nói bằng tiếng người, AI làm bằng code. Bạn chỉ cần QUYẾT ĐỊNH và REVIEW.

---

## 📋 QUY TRÌNH TỔNG QUAN (10 BƯỚC)

```
1. 💡 Ý TƯỞNG     → Mô tả bằng lời, AI hiểu
2. 📋 KẾ HOẠCH    → AI lên plan, bạn duyệt
3. 🎨 THIẾT KẾ    → AI/Figma tạo mockup, bạn OK
4. 🏗️ KIẾN TRÚC  → AI chọn tech stack, bạn confirm
5. 🗄️ DATABASE   → AI thiết kế DB, bạn review
6. ⚙️ BACKEND    → AI viết API, tự test
7. 🖥️ FRONTEND  → AI viết UI, bạn xem kết quả
8. 🔍 AUDIT      → AI tự review, báo lỗi
9. 🧪 TEST       → AI chạy test, báo kết quả
10. 🚀 DEPLOY    → AI deploy, bạn xem live
```

---

## 🔄 CÁC WORKFLOW CON (Slash Commands)

| Lệnh chính xác | File workflow | Dùng khi nào |
|---|---|---|
| `/master-plan` | master-plan.md | Ý tưởng lớn, dự án mới (> 1 tuần) |
| `/plan-feature` | plan-feature.md | Lên kế hoạch tính năng mới |
| `/code-by-plan` | code-by-plan.md | Code sau khi plan được duyệt |
| `/frontend-ui` | frontend-ui.md | Làm màn hình, component UI |
| `/backend-api` | backend-api.md | Viết API (FastAPI / Node.js) |
| `/design-review` | design-review.md | Review Figma / mockup |
| `/audit-feature` | audit-feature.md | Audit tính năng sau khi code xong |
| `/audit-code` | audit-code.md | Kiểm tra toàn bộ codebase |
| `/code-review` | code-review.md | Review code trước khi merge |
| `/bugfix` | bugfix.md | Sửa lỗi |
| `/deploy-flow` | deploy-flow.md | Đưa lên staging / production |
| `/add-mini-game` | add-mini-game.md | Tạo mini-game mới với game-sdk |
| `/db-migration` | db-migration.md | Thay đổi DB schema an toàn (Alembic) |
| `/security-backend` | security-backend.md | Kiểm tra bảo mật backend (FastAPI) |
| `/security-frontend` | security-frontend.md | Kiểm tra bảo mật frontend (Next.js) |
| `/optimize` | optimize.md | Tối ưu hiệu năng frontend + backend |

---

## ⚡ RULE QUAN TRỌNG NHẤT

1. **KHÔNG bao giờ tự sửa code** — luôn dùng lệnh workflow
2. **Mô tả kết quả mong muốn**, không mô tả cách làm
3. **Một lần một việc** — tránh giao quá nhiều cùng lúc
4. **Luôn review** trước khi deploy production
5. **Commit thường xuyên** — AI sẽ tự commit sau mỗi task

---

## 📌 THỨ TỰ ƯU TIÊN KHI CÓ VẤN ĐỀ

```
🔴 Production bị lỗi        → /bugfix ngay lập tức
🟠 Bug ảnh hưởng > 50% user → /bugfix trong ngày
🟡 Bug nhỏ, tính năng phụ   → /bugfix trong sprint này
🟢 Tính năng mới            → /plan-feature → đúng quy trình
⚪ Cải thiện nhỏ            → hỏi, rồi làm
```

---

## Thứ tự chuẩn cho 1 tính năng mới:
```
1. /plan-feature       → Lên kế hoạch, bạn duyệt
2. /backend-api        → Viết API (nếu cần)
3. /frontend-ui        → Viết giao diện
4. /audit-feature      → Kiểm tra 6 nhóm test cases
5. /security-backend   → Kiểm tra bảo mật API (nếu có API mới)
6. /security-frontend  → Kiểm tra bảo mật UI (nếu có form/auth mới)
7. /code-review        → Checklist trước merge
8. /deploy-flow        → Deploy staging → production
```
