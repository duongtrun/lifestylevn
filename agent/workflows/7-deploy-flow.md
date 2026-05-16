---
description: Quy trình deploy ứng dụng - từ staging đến production an toàn
---

# 🚀 WORKFLOW: DEPLOY

## Khi nào dùng?
Trước mỗi lần đưa code lên server thật (staging hoặc production).

---

## CÁC MÔI TRƯỜNG

| Môi trường | Mục đích | Ai được deploy |
|-----------|---------|----------------|
| **Local** | Dev tự test | Dev |
| **Staging** | Test trước khi live | Manager+ |
| **Production** | User thật dùng | CEO only hoặc có approval |

---

## QUY TRÌNH DEPLOY AN TOÀN

```
BƯỚC 1: PRE-DEPLOY CHECKLIST (AI kiểm tra tự động)
───────────────────────────────────────────────────
// turbo
AI tự kiểm tra:
[ ] Tất cả tests pass?
[ ] Không có TODO/FIXME quan trọng còn sót?
[ ] Environment variables đã set?
[ ] Database migration đã sẵn sàng?
[ ] Không có console.log/debug code?
[ ] Dependencies đã cập nhật?
[ ] Build thành công?

Nếu có bất kỳ lỗi → DỪNG, báo cho bạn

         ↓
BƯỚC 2: DEPLOY STAGING (AI làm)
──────────────────────────────────
// turbo
AI tự:
- Push code lên staging
- Chạy database migrations
- Verify deployment thành công
- Chạy smoke tests

Báo cáo: "Staging đã live tại [URL]"

         ↓
BƯỚC 3: BẠN TEST TRÊN STAGING
───────────────────────────────
Bạn test trực tiếp trên staging:
- Thử các tính năng vừa làm
- Kiểm tra không có lỗi rõ ràng

Thời gian test tối thiểu: 15 phút

         ↓
BƯỚC 4: APPROVAL DEPLOY PRODUCTION
────────────────────────────────────
Bạn: "OK, deploy production đi"
(Nếu thấy lỗi: "Chưa deploy, sửa lỗi [X] trước")

         ↓
BƯỚC 5: DEPLOY PRODUCTION (AI làm)
────────────────────────────────────
// turbo
AI tự:
- Tag version release (v1.2.3)
- Deploy với zero-downtime strategy
- Chạy database migrations (nếu có)
- Health check sau deploy

         ↓
BƯỚC 6: POST-DEPLOY MONITORING (15 phút)
──────────────────────────────────────────
AI theo dõi:
- Error rate bình thường?
- Response time ổn?
- Database load OK?

Báo cáo sau 15 phút: "Deploy thành công, hệ thống ổn định"
Hoặc: "Phát hiện lỗi [X], recommend rollback"
```

---

## ROLLBACK KHI CÓ SỰ CỐ

```
Phát hiện lỗi nghiêm trọng sau deploy:

NGAY LẬP TỨC: "Rollback production đi!"
         ↓
AI tự động:
- Rollback về version trước
- Revert database migrations (nếu safe)
- Verify hệ thống đã về trạng thái cũ
- Báo cáo thời gian downtime

Sau đó: Fix lỗi → Deploy lại theo quy trình
```

---

## VERSIONING CHUẨN (Semantic Versioning)

```
v[MAJOR].[MINOR].[PATCH]

MAJOR: Thay đổi lớn, không tương thích ngược (v1.0.0 → v2.0.0)
MINOR: Tính năng mới, vẫn tương thích (v1.0.0 → v1.1.0)  
PATCH: Bug fix nhỏ (v1.0.0 → v1.0.1)

Hotfix: v1.0.0-hotfix.1
```

---

## DEPLOY CHECKLIST CUỐI

- [ ] Tests xanh hết?
- [ ] Staging đã test?
- [ ] Team được thông báo?
- [ ] Rollback plan sẵn sàng?
- [ ] Monitoring đang theo dõi?
- [ ] Backup DB gần nhất?

---

## RULE DEPLOY

1. **Không deploy thứ Sáu** — Cuối tuần không có ai fix lỗi
2. **Không deploy giờ cao điểm** — Sáng sớm hoặc tối muộn
3. **Staging trước, luôn luôn** — Không bao giờ deploy thẳng production
4. **Một tính năng mỗi deploy** — Dễ rollback khi có lỗi
5. **Communicate** — Báo team biết trước khi deploy
6. **Monitor sau deploy** — Không "deploy xong bỏ đó"

---

## 🗂️ LỆNH DEPLOY THEO TỪNG DỰ ÁN

### iruka-app (Next.js 15 / port 3003)
```bash
# Build production
npm run build

# Deploy Vercel (tự động qua git push)
git push origin main

# Deploy Docker thủ công
docker build -t iruka-app . && docker push gcr.io/[project]/iruka-app
```

### iruka-edu-service (FastAPI / Python)
```bash
# Build Docker production
docker build --target=production -t iruka-edu-service .

# Push GCR
docker tag iruka-edu-service gcr.io/[project]/iruka-edu-service
docker push gcr.io/[project]/iruka-edu-service

# Deploy Cloud Run
gcloud run deploy iruka-edu-service \
  --image gcr.io/[project]/iruka-edu-service \
  --platform managed

# Chạy Alembic migration sau deploy
alembic upgrade head
```

### game-sdk (@iruka-edu/mini-game-sdk)
```bash
# Build SDK
cd game-sdk && pnpm build

# Publish local (verdaccio — để test với game-hub)
pnpm publish --registry http://localhost:4873

# Publish npm (khi release chính thức)
pnpm publish --access public
```

### game-hub (Next.js)
```bash
# Sau khi game-sdk đã publish, cập nhật version
npm install @iruka-edu/mini-game-sdk@latest

# Build & deploy
npm run build
git push origin main  # Vercel auto-deploy
```

### irukaclaw (OpenClaw / Bun)
```bash
# Build
bun run build

# Deploy
docker build -t irukaclaw . && docker push gcr.io/[project]/irukaclaw
gcloud run deploy irukaclaw --image gcr.io/[project]/irukaclaw
```
