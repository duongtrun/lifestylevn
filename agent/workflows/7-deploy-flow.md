---
description: Quy trình deploy ứng dụng web-lifestyle từ staging đến production an toàn (FE Only)
---

# 🚀 WORKFLOW: DEPLOY (FE Only — Vercel)

## Khi nào dùng?
Trước mỗi lần đưa code lên server thật (staging hoặc production).

---

## CÁC MÔI TRƯỜNG

| Môi trường | URL | Mục đích | Ai được deploy |
|-----------|-----|---------|----------------|
| **Local** | `http://localhost:3005` | Dev tự test | FE Dev |
| **Staging** | `https://staging.<domain>` | Test trước khi live | FE Dev (auto qua git push) |
| **Production** | `https://<domain>` | User thật dùng | Mr. Đào approval |

---

## QUY TRÌNH DEPLOY AN TOÀN

```
BƯỚC 1: PRE-DEPLOY CHECKLIST (AI / FE Dev kiểm tra)
─────────────────────────────────────────────────────
[ ] pnpm build thành công, không warning?
[ ] pnpm lint pass 0 lỗi?
[ ] Không có TODO/FIXME quan trọng còn sót?
[ ] Không có console.log/debug code?
[ ] Environment variables đã set trong Vercel (qua dashboard)?
[ ] Đã test responsive 3 cỡ (393 / 820 / 1440)?
[ ] Lighthouse Performance >= 90?
[ ] Mỗi page có metadata (title + description + OG)?

Nếu có bất kỳ lỗi → DỪNG, fix trước khi deploy

         ↓
BƯỚC 2: DEPLOY STAGING (tự động qua git)
──────────────────────────────────────────
git push origin develop      # Vercel auto-deploy lên staging

Vercel:
- Build tự động trên cloud
- Preview URL: https://web-lifestyle-git-develop-<team>.vercel.app
- Notify khi build xong

Báo cáo: "Staging đã live tại [URL preview]"

         ↓
BƯỚC 3: MR. ĐÀO TEST TRÊN STAGING
───────────────────────────────────
Mr. Đào test trực tiếp trên staging:
- Thử các tính năng vừa làm
- Kiểm tra responsive 3 cỡ
- Kiểm tra animation mượt
- Kiểm tra form submit, validate
- Kiểm tra SEO (title, description hiện đúng)

Thời gian test tối thiểu: 15 phút

         ↓
BƯỚC 4: APPROVAL DEPLOY PRODUCTION
────────────────────────────────────
Mr. Đào: "OK, deploy production đi"
(Nếu có lỗi: "Chưa deploy, sửa lỗi [X] trước")

         ↓
BƯỚC 5: DEPLOY PRODUCTION
───────────────────────────
Cách 1 — Merge PR vào main (Vercel auto-deploy):
  git checkout main
  git merge --no-ff develop
  git push origin main         # Vercel auto-deploy production

Cách 2 — Promote preview lên production trong Vercel dashboard:
  vercel.com/<team>/web-lifestyle → Deployments
  → Chọn preview đã test OK → "Promote to Production"

         ↓
BƯỚC 6: POST-DEPLOY MONITORING (15 phút)
──────────────────────────────────────────
FE Dev / AI theo dõi:
- Vercel Analytics: error rate, Core Web Vitals
- Sentry (nếu có): JS error mới
- Google Search Console: index status

Báo cáo sau 15 phút:
  ✅ "Deploy thành công, hệ thống ổn định"
  hoặc
  ⚠️ "Phát hiện lỗi [X], recommend rollback"
```

---

## ROLLBACK KHI CÓ SỰ CỐ

```
Phát hiện lỗi nghiêm trọng sau deploy:

NGAY LẬP TỨC báo Mr. Đào: "Phát hiện lỗi nghiêm trọng [X], cần rollback"

         ↓
Cách rollback (Vercel — < 30 giây):
1. Vào vercel.com/<team>/web-lifestyle → Deployments
2. Tìm deployment trước (commit cũ đang ổn định)
3. Bấm "..." → "Promote to Production"
4. Vercel tự revert routing trỏ về deployment cũ
5. Verify hệ thống đã về trạng thái cũ

         ↓
Sau đó: Fix lỗi → Test lại trên staging → Deploy theo quy trình
```

> ✅ **Vercel rollback là instant** — không có downtime, không cần build lại.

---

## VERSIONING CHUẨN (Semantic Versioning)

```
v[MAJOR].[MINOR].[PATCH]

MAJOR: Thay đổi lớn, không tương thích ngược (v1.0.0 → v2.0.0)
MINOR: Tính năng mới, vẫn tương thích (v1.0.0 → v1.1.0)
PATCH: Bug fix nhỏ (v1.0.0 → v1.0.1)

Hotfix: v1.0.0-hotfix.1
```

Tag version qua git khi deploy production:
```bash
git tag -a v1.2.3 -m "Release v1.2.3 — thêm form liên hệ"
git push origin v1.2.3
```

---

## DEPLOY CHECKLIST CUỐI

- [ ] `pnpm build` thành công?
- [ ] `pnpm lint` 0 lỗi?
- [ ] Staging đã test?
- [ ] Mr. Đào đã duyệt?
- [ ] Lighthouse >= 90?
- [ ] Responsive 3 cỡ OK?
- [ ] Rollback plan sẵn sàng (Vercel deployment cũ vẫn còn)?

---

## RULE DEPLOY

1. **Không deploy thứ Sáu** — Cuối tuần không có ai fix lỗi
2. **Không deploy giờ cao điểm** — Sáng sớm hoặc tối muộn
3. **Staging trước, luôn luôn** — Không bao giờ deploy thẳng production
4. **Một tính năng mỗi deploy** — Dễ rollback khi có lỗi
5. **Communicate** — Báo Mr. Đào biết trước khi deploy
6. **Monitor sau deploy** — Không "deploy xong bỏ đó"
7. **KHÔNG tự push lên main** — Phải có Mr. Đào duyệt

---

## 🗂️ LỆNH DEPLOY CHO web-lifestyle (Vercel)

### Build & test local trước khi deploy

```bash
# Build production local
pnpm build

# Chạy production build local để test
pnpm start

# Mở http://localhost:3005 kiểm tra
```

### Deploy staging (auto qua git push)

```bash
# Đảm bảo đang ở branch develop
git checkout develop

# Push lên remote → Vercel auto-deploy lên staging
git push origin develop
```

### Deploy production (qua merge vào main)

```bash
# CHỜ Mr. Đào duyệt trước, KHÔNG tự push
# Sau khi được duyệt:

git checkout main
git merge --no-ff develop -m "release: v1.2.3 — [mô tả ngắn]"
git tag -a v1.2.3 -m "Release v1.2.3"

# Push lên remote (cần Mr. Đào nói "push" mới được)
git push origin main --tags
```

### Vercel CLI (tuỳ chọn)

```bash
# Cài Vercel CLI (1 lần)
pnpm add -g vercel

# Login
vercel login

# Deploy preview thủ công
vercel

# Deploy production thủ công (cần permission)
vercel --prod
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

- **Environment variables**: Set qua Vercel dashboard (Settings → Environment Variables), **KHÔNG** commit `.env.local` lên git
- **Build output**: Vì `next.config.ts` có `output: 'standalone'` nên Vercel tự handle
- **Domain custom**: Set qua Vercel dashboard (Settings → Domains)
- **Preview deployment**: Mỗi PR/branch sẽ có URL preview riêng — chia sẻ link đó cho Mr. Đào test trước khi merge

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Deploy Flow — Vercel only*
