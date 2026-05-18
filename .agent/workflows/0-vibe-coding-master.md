---
description: Tổng quan toàn bộ quy trình vibe coding cho FE từ ý tưởng đến production (FE Only)
---

# 🦁 VIBE CODING MASTER WORKFLOW (FE Only)
## Dành cho: Non-technical Founder / CEO không biết code + FE Dev

> **Nguyên tắc vàng:** Bạn nói bằng tiếng người, AI làm bằng code. Bạn chỉ cần QUYẾT ĐỊNH và REVIEW.

---

## 📋 QUY TRÌNH TỔNG QUAN (8 BƯỚC) — FE

```
1. 💡 Ý TƯỞNG     → Mô tả bằng lời, AI/FE Dev hiểu
2. 📋 KẾ HOẠCH    → AI lên plan, bạn duyệt
3. 🎨 THIẾT KẾ    → Figma / mockup, bạn OK
4. 🏗️ COMPONENT  → AI/FE Dev xác định component cần làm
5. 🖥️ CODE UI    → AI/FE Dev viết UI, bạn xem kết quả
6. 🔍 AUDIT      → AI/FE Dev tự review, báo lỗi
7. 🧪 TEST       → AI/FE Dev chạy test, báo kết quả (responsive 3 cỡ)
8. 🚀 DEPLOY     → Deploy lên Vercel, bạn xem live
```

---

## 🔄 CÁC WORKFLOW CON (Slash Commands FE)

| Lệnh | File workflow | Dùng khi nào |
|---|---|---|
| `/2-master-plan` | 2-master-plan.md | Ý tưởng lớn, dự án mới (> 1 tuần) |
| `/2-plan-feature` | 2-plan-feature.md | Lên kế hoạch tính năng mới |
| `/2-plan-from-mockup` | 2-plan-from-mockup.md | Plan từ mockup HTML có sẵn |
| `/3-plan-frontend` | 3-plan-frontend.md | Thiết kế cấu trúc FE chi tiết |
| `/3-plan-ui&ux` | 3-plan-ui&ux.md | Thiết kế UI/UX chuyên nghiệp |
| `/3-design-system-core` | 3-design-system-core.md | Thiết kế Design System |
| `/3-mockup-spec` | 3-mockup-spec.md | Spec mockup đầy đủ state |
| `/4-code-by-plan` | 4-code-by-plan.md | Code sau khi plan được duyệt |
| `/4-code-frontend` | 4-code-frontend.md | Làm màn hình, component UI |
| `/4-figma-to-ui` | 4-figma-to-ui.md | Đắp Figma vào logic có sẵn |
| `/4-frontend-mockup-fidelity` | 4-frontend-mockup-fidelity.md | Code pixel-perfect từ mockup HTML |
| `/4-refine-ui-pro` | 4-refine-ui-pro.md | Tinh chỉnh UI ("polish") |
| `/1-design-review` | 1-design-review.md | Review Figma / mockup |
| `/5-audit-feature` | 5-audit-feature.md | Audit tính năng sau khi code xong |
| `/5-audit-frontend` | 5-audit-frontend.md | Audit luồng FE của 1 tính năng |
| `/5-code-review` | 5-code-review.md | Review code trước khi merge |
| `/5-security-frontend` | 5-security-frontend.md | Kiểm tra bảo mật FE (XSS, CSP) |
| `/5-test-manual` | 5-test-manual.md | Viết checklist test thủ công |
| `/5-test-auto` | 5-test-auto.md | Viết test script tự động |
| `/6-bugfix` | 6-bugfix.md | Sửa lỗi |
| `/6-fix-design-fidelity` | 6-fix-design-fidelity.md | Sửa lệch UI so với design |
| `/7-deploy-flow` | 7-deploy-flow.md | Đưa lên Vercel staging / production |
| `/7-optimize-fe` | 7-optimize-fe.md | Tối ưu hiệu năng FE (Web Vitals) |

---

## ⚡ RULE QUAN TRỌNG NHẤT

1. **KHÔNG bao giờ tự sửa code** — luôn dùng lệnh workflow
2. **Mô tả kết quả mong muốn**, không mô tả cách làm
3. **Một lần một việc** — tránh giao quá nhiều cùng lúc
4. **Luôn review** trước khi deploy production
5. **KHÔNG tự push** lên main — phải có Mr. Đào duyệt
6. **KHÔNG tự tạo workflow mới** — FE Dev chỉ dùng workflow có sẵn

---

## 📌 THỨ TỰ ƯU TIÊN KHI CÓ VẤN ĐỀ

```
🔴 Production bị lỗi        → /6-bugfix ngay lập tức
🟠 Bug ảnh hưởng > 50% user → /6-bugfix trong ngày
🟡 Bug nhỏ, tính năng phụ   → /6-bugfix trong sprint này
🟢 Tính năng mới            → /2-plan-feature → đúng quy trình
⚪ Cải thiện nhỏ            → hỏi, rồi làm
```

---

## 🛤️ Thứ tự chuẩn cho 1 tính năng mới (FE)

```
1. /1-analyze-request          → Hiểu rõ yêu cầu
2. /2-plan-feature             → Lên kế hoạch, bạn duyệt
3. /3-plan-frontend (hoặc /3-plan-ui&ux)
                               → Thiết kế kỹ thuật FE
4. /4-code-frontend            → Viết giao diện
5. /5-audit-frontend           → Audit FE
6. /5-security-frontend        → Kiểm tra bảo mật FE
7. /5-code-review              → Checklist trước merge
8. /5-test-manual              → Viết test thủ công cho Mr. Đào
9. /7-deploy-flow              → Deploy staging → production
```

---

## 🛤️ Thứ tự chuẩn khi đắp Figma vào logic có sẵn

```
1. /1-design-review            → Review Figma
2. /3-mockup-spec              → Spec mockup đầy đủ
3. /4-figma-to-ui              → Đắp Figma vào (không vỡ cấu trúc)
4. /6-fix-design-fidelity      → Audit + fix lệch nếu có
5. /5-audit-frontend           → Audit luồng
6. /7-deploy-flow              → Deploy
```

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Vibe Coding Master — Phiên bản FE-only*
