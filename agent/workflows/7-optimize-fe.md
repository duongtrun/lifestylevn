---
description: Tối ưu hiệu năng FRONTEND IruKa (iruka-app · game-hub UI · Next.js + React + TanStack Query). Playbook học từ Vercel · Meta · Google · Netflix · Linear · Discord. 5 bước: đo Web Vitals → phân tích bottleneck → fix theo impact/effort → verify. Tập trung: bundle size · React render · TanStack cache · Critical render path · Skeleton UI · Images.
---

// turbo-all

# ⚡ WORKFLOW: TỐI ƯU HIỆU NĂNG FRONTEND

> Áp dụng cho: **iruka-app** (App phụ huynh/bé Next.js 15) · **game-hub** (Platform Next.js) · **hoc-lieu** · **iruka_news** · các trang Next.js khác

## 🎯 Triết lý cốt lõi

> **Google (2017)**: 53% user mobile bỏ trang nếu load > 3 giây.
> **Amazon (2006)**: Mỗi 100ms chậm hơn = giảm 1% doanh thu.
> **Linear**: "Instant feels magical" — < 100ms cảm giác như không có độ trễ.
> **Netflix**: Optimize cho 3G + low-end device, chứ KHÔNG phải iPhone 15 Pro.

**Quy tắc vàng:**
1. **Đo trước, fix sau** — không tối ưu thứ không phải bottleneck thật.
2. **Mobile-first + 3G-first** — Slow 4G + iPhone SE là benchmark thật.
3. **Perceived performance** — Skeleton UI > spinner; cảm giác nhanh quan trọng hơn nhanh thật.
4. **80/20 rule** — 20% bottleneck gây 80% chậm.

---

## 📊 KHI NÀO DÙNG WORKFLOW NÀY?

```
✅ User báo: "App lag", "Trang load chậm", "Chuyển tab thấy giật"
✅ Lighthouse Performance < 85
✅ LCP > 2.5s · INP > 200ms · CLS > 0.1
✅ Bundle First Load JS > 200KB
✅ Sau khi user tăng đột biến (campaign, viral)
✅ Trước event lớn (race, thi đấu, ra mắt tính năng)
```

---

## 🔄 QUY TRÌNH 5 BƯỚC

```
BƯỚC 1: ĐO LƯỜNG (Measure)
─────────────────────────────────
Web Vitals chuẩn Google:
• LCP (Largest Contentful Paint)  < 2.5s ← ảnh/text to nhất
• INP (Interaction to Next Paint) < 200ms ← thay FID từ 2024
• CLS (Cumulative Layout Shift)   < 0.1  ← layout có nhảy không
• FCP (First Contentful Paint)    < 1.8s ← chữ đầu xuất hiện
• TTFB (Time To First Byte)       < 800ms ← server trả byte đầu
• First Load JS per route          < 200KB

⚠️ Đo trên: iPhone SE 1 (2016) / Android 4GB
   Network: Slow 4G (4 Mbps down, 70ms RTT)
   CPU: 4× slowdown

         ↓
BƯỚC 2: PHÂN TÍCH BOTTLENECK
─────────────────────────────────
6 nhóm có thể:
1. NETWORK: Quá nhiều API call song song? Waterfall? Cache ngắn?
2. RENDER: Re-render thừa, missing memo, missing virtualization?
3. JS EXECUTION: Hook chain dài, useEffect cascade, parsing JSON to?
4. ASSET: Image to chưa nén, font chặn render, SVG/PNG thay vì sprite?
5. CACHING: TanStack staleTime sai, không có Service Worker?
6. CRITICAL PATH: Streaming SSR chưa dùng, Suspense boundary thiếu?

         ↓
BƯỚC 3: ĐỀ XUẤT FIX (User Approve)
─────────────────────────────────
Bảng rank impact/effort:
| # | Fix | Impact | Effort | Risk | File |

         ↓
BƯỚC 4: THỰC HIỆN (Fix theo priority)
         ↓
BƯỚC 5: ĐO LẠI + DOCUMENT
─────────────────────────────────
So sánh trước/sau, lưu vào memory.
```

---

# 1️⃣ CACHING STRATEGY (Học từ Vercel + Netflix)

## Cache layers FE (từ nhanh → chậm)

```
1. ⚡ Memory cache (TanStack Query in-memory)    — 0ms (instant)
2. 💾 Service Worker / IndexedDB                 — 5-20ms
3. 🌐 CDN edge cache (Vercel Edge / Cloudflare)  — 30-80ms
4. 🏢 Server response cache (Redis)              — 50-200ms
5. 🗄️ Database origin                             — 100-500ms
```

## TanStack Query staleTime cheatsheet

| Loại dữ liệu | staleTime | Lý do |
|---|---|---|
| Static config (subject list, age band) | `Infinity` | Không đổi runtime |
| User profile (tên, avatar, settings) | 5-10 phút | Đổi rất ít |
| List data (missions, sticker album) | 5 phút | Đổi sau action user (có invalidate explicit) |
| Suggest / Recommendation | 60s | Có thuật toán, có thể đổi nhỏ |
| Realtime stats (chat, notif count) | 0 hoặc WebSocket | User expect realtime |
| Image / Asset URL | 1 giờ - Infinity | URL ít đổi, content có versioning |

**Anti-pattern:** `staleTime: 0` cho mọi query → mỗi mount fetch lại → tốn API + chậm.

## Prefetch chiến lược (Netflix style)

```typescript
// ✅ Prefetch khi user hover link (intent signal)
<Link
  href="/missions"
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['eng', 'suggest', 'screen', subjectId],
      queryFn: () => apiGetSuggestScreen(subjectId),
      staleTime: 60_000,
    });
  }}
>

// ✅ Prefetch khi viewport gần link (Intersection Observer)
// ✅ Prefetch background khi browser idle (requestIdleCallback)
// ❌ Prefetch tất cả lúc page load → tốn bandwidth
```

---

# 2️⃣ BUNDLE SIZE (Học từ Vercel + Discord)

## Đo bundle

```bash
# Bundle analyzer Next.js
ANALYZE=true npm run build
# → Mở .next/analyze/client.html xem chunk nào to

# Source-map-explorer cho production
npx source-map-explorer build/static/js/*.js
```

## Target per route (Vercel chuẩn)

| Page type | Target First Load JS |
|---|---|
| Landing page | < 100KB |
| Dashboard/CRUD | < 200KB |
| Heavy interactive (game, editor) | < 400KB |

## Top kỹ thuật giảm bundle

```typescript
// ✅ Dynamic import cho heavy component (Discord style)
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // chỉ chạy client-side
});

// ✅ Tree-shaking: import named, KHÔNG import default toàn lib
import { format } from 'date-fns';            // 3KB
import _ from 'lodash';                        // 70KB ❌
import debounce from 'lodash/debounce';        // 2KB ✅
import { debounce } from 'lodash-es';          // 2KB ✅

// ✅ Replace heavy lib bằng modern alternative
moment.js (300KB)    → date-fns (12KB) hoặc dayjs (7KB)
axios (50KB)         → ky (7KB) hoặc native fetch (0KB)
react-icons all      → import từng icon (lucide-react)

// ✅ Server Component mặc định (Next.js 15)
// Chỉ thêm 'use client' khi cần useState/useEffect
// → giảm JS gửi xuống client 30-60%

// ❌ Anti-pattern
import * as Icons from 'lucide-react';         // 700KB toàn bộ!
import { Button } from '@mui/material';         // 90KB chỉ 1 button
```

---

# 3️⃣ REACT PERFORMANCE (Học từ Meta + Linear)

## Render optimization

```typescript
// 1. ✅ React.memo cho component nhận props ổn định
const SuggestCard = memo(SuggestCardImpl);
// → Tránh re-render khi parent state đổi mà card không liên quan

// 2. ✅ useCallback cho handler truyền vào memo'd child
const handlePlay = useCallback((card) => {
  router.push(card.play_url);
}, [router]);

// 3. ✅ useMemo cho compute nặng (filter list > 100 item)
const filteredMissions = useMemo(
  () => missions.filter(m => !m.is_completed),
  [missions]
);

// 4. ✅ Stable key cho list — KHÔNG dùng index nếu list reorder được
{items.map(item => (
  <Item key={item.id} {...item} />    // ✅
  // <Item key={index} {...item} />   // ❌ gây mount/unmount loop
))}

// 5. ✅ Virtual scroll cho list > 100 item (Linear style)
import { useVirtualizer } from '@tanstack/react-virtual';
// → Chỉ render row trong viewport, list 10K item vẫn mượt
```

## Anti-pattern phổ biến

```typescript
// ❌ Tạo object/array trong JSX → ref đổi mỗi render → memo vô dụng
<Child style={{ color: 'red' }} />     // bad
<Child data={items.filter(...)} />      // bad

// ✅ Đặt ngoài component hoặc useMemo
const childStyle = { color: 'red' };
<Child style={childStyle} />

// ❌ useEffect cascade — set state này → trigger useEffect khác → loop
useEffect(() => setA(b), [b]);
useEffect(() => setB(a), [a]);

// ❌ Inline anonymous function trong list
{items.map(item => (
  <Item onClick={() => doSomething(item)} />  // function mới mỗi render
))}
```

## Rules of Hooks (lessons learned IruKa)

```
✅ Hook PHẢI gọi cùng số lượng + cùng thứ tự mỗi render
✅ TẤT CẢ hook đặt TRƯỚC mọi early-return
❌ KHÔNG conditional gọi hook (if/else, try/catch)

// Sai (case thực tế đã gặp):
if (loading) return <Spinner />;          // early return
const handleX = useCallback(...);          // ❌ hook sau early return!

// Đúng:
const handleX = useCallback(...);          // hook trước
if (loading) return <Spinner />;          // early return
```

---

# 4️⃣ CRITICAL RENDER PATH (Học từ Google)

## Streaming SSR + Suspense (Next.js 15 + RSC)

```tsx
// ✅ Stream UI sớm — không đợi data chậm chặn UI nhanh
<Suspense fallback={<HeaderSkeleton />}>
  <SlowHeader />
</Suspense>
<Suspense fallback={<MainSkeleton />}>
  <SlowMain />
</Suspense>
// → Header render xong → main render sau, không chặn nhau
```

## Resource hints (HTML head)

```html
<!-- ✅ Preconnect tới CDN/API trước khi fetch -->
<link rel="preconnect" href="https://api.iruka.vn" />
<link rel="preconnect" href="https://cdn.iruka.vn" crossorigin />

<!-- ✅ Preload critical assets (font, hero image) -->
<link rel="preload" href="/fonts/sn-pro.woff2" as="font" type="font/woff2" crossorigin />

<!-- ✅ DNS prefetch cho third-party (analytics, ads) -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

## Skeleton UI (Học từ Facebook + YouTube)

> **Perceived performance**: User chờ 1 giây thấy spinner = cảm giác 3 giây.
> Cùng 1 giây thấy skeleton = cảm giác 0.5 giây.

```tsx
// ✅ Skeleton có hình dạng tương tự UI thật
<div className="animate-pulse">
  <div className="h-12 w-full bg-gray-200 rounded" />
  <div className="grid grid-cols-3 gap-4 mt-4">
    {Array(6).fill(0).map((_, i) => (
      <div key={i} className="h-40 bg-gray-200 rounded" />
    ))}
  </div>
</div>

// ❌ Spinner trắng giữa màn → user tưởng đứng hình
```

---

# 5️⃣ IMAGES & MEDIA (Học từ Netflix)

```tsx
// ✅ next/image — tự động WebP + responsive + lazy
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  priority           // chỉ cho image above-the-fold (LCP)
  placeholder="blur" // blur trong khi load
/>

// ✅ Responsive với sizes
<Image
  src="/card.jpg"
  sizes="(max-width: 768px) 100vw, 33vw"
  // → mobile load full, desktop load 1/3
/>

// ✅ Image format: AVIF > WebP > JPG > PNG
// next/image tự convert nếu browser support

// ❌ <img> thuần — không lazy, không responsive, layout shift
// ❌ Image gốc 4K cho display 400px — tốn bandwidth 10×
```

## Video / Audio

```tsx
// ✅ Lazy load video — không autoplay
<video preload="metadata" poster="/poster.jpg">
  <source src="/video.mp4" type="video/mp4" />
</video>

// ✅ Audio sprite: 10 file mp3 → 1 file + timestamp map → 1 request
```

---

# 6️⃣ CSS & ANIMATION (Học từ Discord + Linear)

```css
/* ✅ Animate transform + opacity (GPU accelerated) */
.card { transition: transform 0.2s, opacity 0.2s; }
.card:hover { transform: translateY(-2px); opacity: 0.95; }

/* ❌ Animate width/height/top/left → layout reflow → chậm */
.bad { transition: width 0.2s; }

/* ✅ will-change cho animation phức tạp — báo browser optimize */
.animated { will-change: transform; }
/* ⚠️ Đừng lạm dụng — tốn memory GPU */

/* ✅ contain: layout — isolate component */
.card { contain: layout style paint; }
/* → browser biết card này không ảnh hưởng layout ngoài */
```

## Font loading

```tsx
// ✅ next/font — preload + swap + no layout shift
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// ❌ @import từ Google Fonts trong CSS → render-blocking
```

---

# 📋 CHECKLIST TRƯỚC DEPLOY (FE)

- [ ] `next build` không warning bundle size lớn
- [ ] Lighthouse mobile ≥ 85 (Slow 4G + low-end CPU)
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Không có waterfall fetch (mở DevTools Network tab)
- [ ] Tất cả image dùng `next/image`
- [ ] Tất cả route lớn có Suspense boundary
- [ ] Skeleton UI cho mọi loading state > 200ms
- [ ] Không có `console.log` debug
- [ ] Source map đã upload Sentry (không expose source)
- [ ] Service Worker registered (PWA cache)
- [ ] All hooks trước early-return (Rules of Hooks)

---

# 🔧 CÔNG CỤ ĐO LƯỜNG

```bash
# Lighthouse (chuẩn Google)
npx lighthouse https://app.iruka.vn --view --preset=mobile

# Bundle analyzer
ANALYZE=true npm run build

# Web Vitals real user monitoring
import { useReportWebVitals } from 'next/web-vitals';
useReportWebVitals((metric) => {
  analytics.track('web-vital', metric);
});

# Chrome DevTools Performance tab
# • Network: Slow 4G
# • CPU: 4× slowdown
# • Device: iPhone SE (375×667)

# Coverage tab — tìm CSS/JS unused → loại bỏ
```

---

# 🎯 ANTI-PATTERNS — Frontend

- ❌ `useState` cho data từ server (dùng TanStack Query)
- ❌ `useEffect` để fetch trên mount (dùng `useQuery` với `enabled`)
- ❌ Inline object/function trong props của memo'd child
- ❌ `index` làm key cho list có thể reorder
- ❌ Import * từ icon library
- ❌ Image gốc 4K cho display 400px
- ❌ Spinner trắng giữa màn (thay bằng skeleton)
- ❌ `console.log` để debug production
- ❌ Animate width/height (dùng transform thay)
- ❌ `staleTime: 0` cho mọi query
- ❌ Hook gọi sau early-return (vi phạm Rules of Hooks)

---

# 📚 CASE HISTORY

### Case IruKa 2026-05: `/missions` lag chuyển tab
- **Bottleneck**: 10 API call song song + no memo + cache 30s
- **Fix**: Tăng staleTime 60s-5min + memo 7 component + skeleton UI thay spinner
- **Kết quả**: Lần 2 chuyển tab: 0.4-0.6s → < 0.1s

### Case Vercel — Next.js 14 (2024)
- **Insight**: 30% bundle = node_modules chỉ dùng 5% feature
- **Fix**: Tree-shake aggressive + lazy hydration
- **Kết quả**: First Load JS giảm 40%

### Case Linear (2022)
- **Philosophy**: "Instant" — mọi action phản hồi < 100ms
- **Pattern**: Optimistic UI + local state mirror server state
- **Kết quả**: Cảm giác như native app dù là web

---

# 🚀 RULE FRONTEND OPTIMIZATION (đúc kết)

1. **Đo trước, fix sau** — Không tối ưu thứ không phải bottleneck.
2. **Mobile-first + 3G-first** — Slow 4G + low CPU là benchmark thật.
3. **80/20 rule** — Tìm 20% gây 80% chậm.
4. **Perception > reality** — Skeleton > spinner.
5. **Cache aggressively** — Cache mọi thứ ít đổi; invalidate explicit khi đổi.
6. **Lazy by default** — Load khi cần, không load trước.
7. **Memo + useCallback** cho component nặng + child memo'd.
8. **Server Component** mặc định, chỉ `'use client'` khi thật cần.
9. **Profile, don't guess** — Có data thì fix.
10. **Hook trước early-return** — luật vàng React.

> **Quy tắc thumb**: Mỗi 100ms anh tối ưu được = 1 cú click thêm của user.
