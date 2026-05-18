# 🔧 USEFUL COMMANDS — Lệnh & Snippet hay dùng (FE Only)

> File này lưu các lệnh shell / snippet thường dùng khi làm FE dự án `web-lifestyle`.
>
> ⚠️ Chỉ chứa lệnh **liên quan Frontend**. Không có lệnh SSH server / SQL / Docker production.

---

## 📑 Mục lục

1. [Khởi tạo dự án](#1-khởi-tạo-dự-án)
2. [Lệnh dev hàng ngày](#2-lệnh-dev-hàng-ngày)
3. [Quản lý package](#3-quản-lý-package)
4. [Git cơ bản](#4-git-cơ-bản)
5. [Build & Test](#5-build--test)
6. [Performance & Audit](#6-performance--audit)
7. [Debug](#7-debug)
8. [Snippet code hay dùng](#8-snippet-code-hay-dùng)

---

## 1. Khởi tạo dự án

```bash
# Tạo dự án Next.js 16 mới (chỉ chạy 1 lần duy nhất)
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint

# Cài thư viện chuẩn (xem chi tiết trong TECH_STACK.md)
pnpm add zustand @tanstack/react-query ky react-hook-form zod \
  @hookform/resolvers framer-motion lucide-react sonner \
  clsx tailwind-merge class-variance-authority js-cookie use-debounce

# Cài Radix UI cần dùng
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-slot

# Cài dev dependencies
pnpm add -D @types/js-cookie msw rimraf eslint eslint-config-next
```

---

## 2. Lệnh dev hàng ngày

```bash
pnpm dev          # Chạy dev server (port 3005)
pnpm build        # Build production
pnpm start        # Chạy production build
pnpm lint         # Kiểm tra lỗi code
pnpm lint:fix     # Tự fix lỗi format
pnpm clean        # Xoá .next + out (khi gặp lỗi build cache)
```

### Mở dev server ở port khác (khi 3005 đã chiếm)

```bash
pnpm dev -- -p 3006
```

### Kill process đang chiếm port

```bash
# Tìm PID
lsof -i :3005
# Kill
kill -9 <PID>
```

---

## 3. Quản lý package

```bash
# Cài thêm thư viện mới
pnpm add <tên-thư-viện>

# Cài dev dependency
pnpm add -D <tên-thư-viện>

# Gỡ thư viện
pnpm remove <tên-thư-viện>

# Cập nhật 1 thư viện lên latest
pnpm up <tên-thư-viện> --latest

# Check thư viện đã cài
pnpm list

# Check security vulnerability
pnpm audit

# Fix vulnerability tự động
pnpm audit --fix
```

> ⚠️ **TUYỆT ĐỐI KHÔNG**: `npm install` hoặc `yarn add` — chỉ dùng `pnpm` để giữ lock file thống nhất.

---

## 4. Git cơ bản

```bash
# Tạo branch mới
git checkout -b feat/contact-form

# Commit theo Conventional Commits
git add src/components/ContactForm.tsx
git commit -m "feat: thêm form liên hệ ở trang Contact"

# Xem branch hiện tại
git branch --show-current

# Xem status sạch hay bẩn
git status

# Xem diff
git diff
git diff --staged    # Xem những gì đã add nhưng chưa commit
```

### ❌ KHÔNG được làm

```bash
# ❌ KHÔNG tự push — phải hỏi Mr. Đào trước
git push

# ❌ KHÔNG force push
git push -f

# ❌ KHÔNG xoá branch remote
git push origin --delete <branch>

# ❌ KHÔNG amend commit đã push
git commit --amend
```

---

## 5. Build & Test

```bash
# Build production (kiểm tra trước khi merge)
pnpm build

# Chạy production build local để test
pnpm build && pnpm start

# Kiểm tra bundle size
pnpm build && ls -lh .next/static/chunks/

# Phân tích bundle (cài thêm @next/bundle-analyzer nếu cần)
ANALYZE=true pnpm build
```

---

## 6. Performance & Audit

### Lighthouse (đo Web Vitals)

```bash
# Cài lighthouse global
npm install -g lighthouse

# Đo trang local
lighthouse http://localhost:3005 --view

# Đo production
lighthouse https://lifestyle.iruka.edu.vn --view

# Chỉ check performance
lighthouse http://localhost:3005 --only-categories=performance --view
```

### Đo nhanh từ Chrome DevTools

1. Mở Chrome → F12 → tab **Lighthouse**
2. Chọn Mobile / Desktop
3. Bấm Analyze
4. Mục tiêu:
   - Performance >= 90
   - SEO >= 95
   - Accessibility >= 90
   - LCP < 2.5s
   - CLS < 0.1

---

## 7. Debug

### Bật React DevTools

- Cài extension: https://react.dev/learn/react-developer-tools
- Mở DevTools → tab **Components** / **Profiler**

### Bật TanStack Query DevTools

```tsx
// Trong layout.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Render:
{process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
```

### Bật Zustand DevTools (Redux DevTools)

```tsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useUiStore = create(
  devtools(
    (set) => ({ /* ... */ }),
    { name: 'UI Store' }  // Hiện trong Redux DevTools
  )
);
```

### Debug URL Param

Xem `debug_url_param_guide.md` để thêm `?debug=ten-man` vào URL — xem nhanh màn hình không cần đi qua luồng thật.

### Console nhanh trong code

```typescript
// Dùng tạm khi dev, NHỚ XOÁ TRƯỚC KHI COMMIT
console.log('🔵 [ContactForm] data:', data);
console.error('🔴 [ContactForm] error:', err);
console.warn('🟡 [ContactForm] missing:', field);
console.table(arrayData);   // In bảng cho array of object
console.time('fetch');      // Đo thời gian
console.timeEnd('fetch');
```

---

## 8. Snippet code hay dùng

### Snippet 1: cn util (gộp class Tailwind)

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Snippet 2: ky client instance

```typescript
// src/lib/api/client.ts
import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  retry: { limit: 2 },
});
```

### Snippet 3: Zustand store mẫu

```typescript
// src/stores/ui-store.ts
import { create } from 'zustand';

interface UiState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
}));
```

### Snippet 4: TanStack Query hook mẫu

```typescript
// src/hooks/use-posts.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => apiClient.get('posts').json(),
    staleTime: 60_000, // 1 phút
  });
}
```

### Snippet 5: react-hook-form + zod

```typescript
// src/components/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên'),
  email: z.string().email('Email không hợp lệ'),
  message: z.string().min(10, 'Lời nhắn tối thiểu 10 ký tự'),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <p>{errors.name.message}</p>}
      {/* ... */}
    </form>
  );
}
```

### Snippet 6: framer-motion fade-in khi scroll

```tsx
'use client';

import { motion } from 'framer-motion';

export function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### Snippet 7: Metadata SEO mẫu

```typescript
// src/app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu — IruKa Lifestyle',
  description: 'IruKa là công ty công nghệ giáo dục, mang đến trải nghiệm học tập tốt nhất cho trẻ em.',
  openGraph: {
    title: 'Giới thiệu — IruKa Lifestyle',
    description: 'Công ty công nghệ giáo dục hàng đầu',
    images: ['/og-about.jpg'],
  },
};
```

---

## 🚫 LỆNH CẤM

```bash
❌ npm install / yarn add        → Phải dùng pnpm
❌ rm -rf node_modules            → Dùng pnpm clean / pnpm install --force
❌ git push                       → Phải hỏi Mr. Đào trước
❌ git push -f / --force          → Tuyệt đối cấm
❌ sudo <bất kỳ lệnh nào>         → KHÔNG cần sudo cho FE
❌ Xoá .env.local từ remote       → Đó là file Mr. Đào giữ
```

---

_File này được FE dev tham khảo hàng ngày. Có lệnh hay phát hiện thêm → báo Mr. Đào duyệt mới append._
