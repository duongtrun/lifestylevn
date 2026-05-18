---
description: Quy trình bảo mật frontend - kiểm tra XSS, data exposure, auth flow, dependencies và CSP cho Next.js
---

# 🛡️ WORKFLOW: BẢO MẬT FRONTEND

> Áp dụng cho: `iruka-app` (Next.js 15 / React 19 / TailwindCSS v4 / Zustand)

## Khi nào dùng?
- Trước khi deploy lên production / staging
- Sau khi thêm form mới, trang mới, hoặc flow auth mới
- Khi tích hợp third-party script/library
- Định kỳ mỗi Sprint
- Khi nhận phản hồi về data bị lộ hoặc hành vi bất thường

---

## CÁCH GỌI WORKFLOW NÀY

Nói với AI:
```
"/security-frontend — kiểm tra toàn bộ iruka-app"
hoặc
"/security-frontend cho trang [login | payment | profile | game]"
```

AI sẽ tự scan và trả về báo cáo theo format chuẩn dưới đây.

---

## QUY TRÌNH KIỂM TRA (AI tự thực hiện)

```
BƯỚC 1: SCAN XSS — Cross-Site Scripting
──────────────────────────────────────────
AI kiểm tra:
- Không dùng dangerouslySetInnerHTML với dữ liệu từ user/API
- Không dùng eval(), new Function(), document.write()
- User-generated content (tên, mô tả) được escape trước khi render
- Rich text editor (nếu có) dùng DOMPurify để sanitize

         ↓
BƯỚC 2: SCAN AUTH & SESSION
─────────────────────────────
AI kiểm tra:
- Token (JWT) lưu ở httpOnly cookie chứ không phải localStorage
- Không đọc/ghi token ở client-side JS (ai lấy được JS = lấy được token)
- Protected routes có middleware check auth trước khi render
- Logout xóa sạch token + Zustand state + cache TanStack Query
- Không để route admin accessible với user thường

         ↓
BƯỚC 3: SCAN ENV & SECRETS
────────────────────────────
AI kiểm tra:
- Biến NEXT_PUBLIC_* chỉ chứa data public (URL, app name, analytics ID)
- Không có secret key, service account, DB password trong NEXT_PUBLIC_*
- Không log access token, user data ra console
- .env.local không commit vào git

         ↓
BƯỚC 4: SCAN HTTP REQUESTS (ky / fetch)
──────────────────────────────────────────
AI kiểm tra:
- Mọi request đến backend đều qua HTTPS trên production
- Không build URL bằng string concat với input user (dùng URLSearchParams)
- Error response từ API không hiển thị thẳng raw message ra UI
- Credentials (cookie) chỉ gửi đến same-origin hoặc trusted backends

         ↓
BƯỚC 5: SCAN FORM & USER INPUT
─────────────────────────────────
AI kiểm tra:
- react-hook-form + zod validate phía client trước khi gửi lên
- Form không cho submit nhiều lần liên tiếp (disable button khi loading)
- File upload: validate type + size trước khi POST (không chỉ rely vào server)
- Search, filter: không inject giá trị thẳng vào URL query mà không encode

         ↓
BƯỚC 6: SCAN DEPENDENCIES
────────────────────────────
AI kiểm tra:
- npm audit — package nào có known vulnerability?
- Các package nào không còn maintain (last publish > 2 năm)?
- Không dùng package lạ, ít sao, không quen tên
- Lock file (package-lock.json) commit đầy đủ

         ↓
BƯỚC 7: SCAN NEXT.JS CONFIG & HEADERS
───────────────────────────────────────
AI kiểm tra:
- next.config.js có cấu hình CSP (Content-Security-Policy) không?
- X-Frame-Options: DENY (chặn clickjacking)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Không có rewrites/proxy leak internal API upstream
```

---

## CHECKLIST BẢO MẬT FRONTEND

### ⚡ XSS Prevention
- [ ] Không dùng `dangerouslySetInnerHTML` — nếu có, phải qua `DOMPurify.sanitize()`
- [ ] Không dùng `eval()` hoặc `new Function()`
- [ ] User content (tên, bio) được render qua React (tự escape) không qua innerHTML

### 🔑 Auth & Session
- [ ] JWT lưu trong `httpOnly; Secure; SameSite=Strict` cookie
- [ ] Zustand store không serialize token ra localStorage
- [ ] Middleware Next.js chặn route bảo vệ trước khi render page
- [ ] `queryClient.clear()` + cookie xóa khi logout

### 🌍 Environment Variables
- [ ] `NEXT_PUBLIC_*` chỉ chứa: API public URL, app name, GA ID
- [ ] Không bao giờ đặt trong `NEXT_PUBLIC_*`: service key, payment secret, DB URL
- [ ] `.env.local` có trong `.gitignore`
- [ ] `.env.example` tồn tại và đủ key (không có giá trị thật)

### 🌐 HTTP & Network
- [ ] Base URL API đọc từ `NEXT_PUBLIC_API_URL` (không hardcode)
- [ ] `ky` instance configured với `credentials: 'include'` cho cookie flow
- [ ] Error từ API parse cẩn thận, chỉ hiển thị user-friendly message
- [ ] Không log response data chứa token hoặc PII ra console

### 📝 Form & Input
- [ ] Zod schema validate đầy đủ: type, min/max length, format
- [ ] Submit button disabled khi `isSubmitting` = true
- [ ] File upload check: `file.type`, `file.size` trước khi upload
- [ ] Redirect sau login dùng whitelist (không redirect đến URL tùy ý từ query param)

### 📦 Dependencies
- [ ] `npm audit` — 0 critical, 0 high vulnerabilities
- [ ] Không có package dev trong dependencies (chỉ trong devDependencies)
- [ ] `package-lock.json` hoặc `yarn.lock` được commit

### 🏗️ Next.js Config
- [ ] `next.config.js` có `headers()` với security headers
- [ ] `images.domains` chỉ whitelist domain cụ thể (không dùng `remotePatterns: '*'`)
- [ ] `output: 'standalone'` nếu deploy bằng Docker

---

## VÍ DỤ NEXT.JS SECURITY HEADERS

```js
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.trusted.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https://storage.iruka.edu.vn",
      "connect-src 'self' https://api.iruka.edu.vn",
      "font-src 'self' https://fonts.gstatic.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```

---

## CÁC LỖ HỔNG PHỔ BIẾN TRONG IRUKA-APP (NEXT.JS)

| Lỗ hổng | Ví dụ | Cách sửa |
|---------|--------|----------|
| Token trong localStorage | `localStorage.setItem('token', jwt)` | Dùng httpOnly cookie từ backend |
| Open redirect | `router.push(searchParams.get('redirect'))` | Whitelist redirect URL |
| XSS qua API data | `<div dangerouslySetInnerHTML={{ __html: user.bio }}` | Dùng `DOMPurify.sanitize(user.bio)` |
| Secret trong NEXT_PUBLIC | `NEXT_PUBLIC_STRIPE_SECRET=sk_live_xxx` | Chỉ để `NEXT_PUBLIC_STRIPE_PK` - public key |
| Unprotected API route | `/api/admin/users` không check session | Thêm `getServerSession()` check |
| Lộ dữ liệu qua React DevTools | `console.log(user)` trong component | Xóa tất cả log trong production |

---

## FORMAT BÁO CÁO (AI tạo sau khi scan)

```markdown
# 🛡️ SECURITY REPORT — Frontend [Ngày]

## Tóm tắt
- Scope: [trang / module kiểm tra]
- Tổng lỗ hổng: X
- 🔴 Critical (phải sửa ngay): X
- 🟡 Warning (sửa trong tuần): X
- 🟢 Info (ghi nhận): X

---

## 🔴 CRITICAL — Phải sửa trước khi deploy

### [Tên lỗ hổng]
- File: `app/(auth)/login/page.tsx:35`
- Vấn đề: [mô tả cụ thể]
- Nguy cơ: [hậu quả nếu bị khai thác]
- Cách sửa: [gợi ý code fix]

## 🟡 WARNING
...

## 🟢 INFO
...
```

---

## RULE BẢO MẬT FRONTEND

1. **Không bao giờ tin tưởng dữ liệu từ user** — Validate cả client lẫn server
2. **Token không thuộc về JavaScript** — httpOnly cookie, không localStorage
3. **NEXT_PUBLIC = Public** — Mọi thứ đặt ở đây đều công khai, coi như không có bí mật
4. **Audit dependencies trước mỗi deploy** — `npm audit` phải sạch
5. **Security headers luôn bật** — Không tốn thêm effort, bảo vệ rất nhiều
6. **Không merge nếu còn lỗ hổng Critical** — Dù tính năng mới hay đẹp đến đâu
