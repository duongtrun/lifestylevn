---
description: Tối ưu hiệu năng toàn hệ thống IruKa (BE + FE + Game Hub + Game SDK). Áp dụng playbook của Big Tech (Netflix, Meta, Google, Amazon, Vercel, Discord, Linear) — từ đo lường → phân tích bottleneck → fix theo priority impact/effort.
---

// turbo-all

# ⚡ WORKFLOW: TỐI ƯU HIỆU NĂNG TOÀN HỆ THỐNG IRUKA

> Áp dụng cho: **iruka-app** (Frontend phụ huynh/bé) · **iruka-edu-service** (Backend FastAPI) · **game-hub** (Platform game) · **game-sdk** (SDK Phaser)

## 🎯 Triết lý cốt lõi (học từ Big Tech)

> **Amazon (2006)**: Mỗi 100ms chậm hơn = giảm 1% doanh thu.
> **Google (2017)**: 53% user mobile bỏ trang nếu load > 3 giây.
> **Netflix**: Optimize cho 3G + low-end device, chứ KHÔNG phải iPhone 15 Pro.
> **Linear**: "Instant feels magical" — < 100ms cảm giác như không có độ trễ.

**Quy tắc vàng:**
1. **Đo trước, fix sau** — Không tối ưu thứ không phải bottleneck thật sự.
2. **Mobile-first + 3G-first** — Tối ưu cho thiết bị yếu, máy mạnh tự nhanh.
3. **Perceived performance** — Cảm giác nhanh quan trọng hơn nhanh thực sự (skeleton UI > spinner).
4. **80/20 rule** — 20% bottleneck gây 80% chậm. Tìm đúng 20% đó.

---

## 📊 KHI NÀO DÙNG WORKFLOW NÀY?

```
✅ User báo: "App lag", "Trang load chậm", "Chuyển tab thấy giật"
✅ Lighthouse Performance score < 85
✅ API P95 response > 500ms
✅ Sau khi user tăng đột biến (campaign, viral)
✅ Trước event lớn (race, thi đấu, ra mắt tính năng)
✅ Build production size tăng đột ngột (so với baseline)
✅ Người dùng bỏ trang giữa chừng (high bounce rate, low time on page)
```

---

## 🔄 QUY TRÌNH 5 BƯỚC (Big Tech Playbook)

```
┌────────────────────────────────────────────────────────────────┐
│  BƯỚC 1: ĐO LƯỜNG (Measure)                                    │
│  ────────────────────────────────────────────                  │
│  Mục tiêu: Có SỐ LIỆU CỤ THỂ, không phỏng đoán.                │
│                                                                │
│  🌐 Frontend (Web Vitals — chuẩn Google):                      │
│  • LCP (Largest Contentful Paint)  < 2.5s ← ảnh/text to nhất   │
│  • INP (Interaction to Next Paint) < 200ms ← thay FID từ 2024  │
│  • CLS (Cumulative Layout Shift)   < 0.1  ← layout có nhảy không│
│  • FCP (First Contentful Paint)    < 1.8s ← chữ đầu xuất hiện  │
│  • TTFB (Time To First Byte)       < 800ms ← server trả byte đầu│
│  • Bundle size mỗi route           < 200KB First Load JS       │
│                                                                │
│  🔧 Backend (FAANG benchmark):                                 │
│  • API P50 response       < 100ms                              │
│  • API P95 response       < 300ms                              │
│  • API P99 response       < 1000ms                             │
│  • DB query (đơn giản)    < 50ms                               │
│  • DB query (phức tạp)    < 200ms                              │
│  • Memory backend         < 512MB / pod                        │
│  • CPU sustained          < 60% (để chịu được spike)            │
│                                                                │
│  🎮 Game (Phaser):                                             │
│  • Game scene init        < 1s                                 │
│  • Asset load             < 2s tổng                            │
│  • FPS sustained          ≥ 30 (mobile yếu), ≥ 60 (mid-range)  │
│  • Memory game            < 100MB                              │
│                                                                │
│  ⚠️ Đo trên thiết bị THỰC: iPhone SE 1 (2016) / Android 4GB     │
│     Network throttle: Slow 4G (4 Mbps down / 3 Mbps up, 70ms)   │
│         ↓                                                       │
│                                                                │
│  BƯỚC 2: PHÂN TÍCH BOTTLENECK (Root Cause)                     │
│  ────────────────────────────────────────────                  │
│  AI phân tích 6 nhóm có thể:                                   │
│                                                                │
│  1. NETWORK: Quá nhiều API call song song? Waterfall? Cache    │
│     ngắn? Payload to? Không nén?                               │
│  2. RENDER: Component nặng, re-render thừa, layout shift,      │
│     missing memo, missing virtualization?                      │
│  3. JS EXECUTION: Hook chain dài, useEffect cascade, parsing   │
│     JSON to, code split sai?                                   │
│  4. ASSET: Image to chưa nén, font load chặn render, SVG/PNG   │
│     thay vì sprite, video không lazy?                          │
│  5. DATABASE: N+1 query, missing index, sequential scan,       │
│     connection pool nhỏ?                                       │
│  6. CACHING: Không cache, cache layer sai (chỗ nên cache       │
│     thì không, chỗ không nên thì cache)?                       │
│                                                                │
│  ⚠️ Giải thích bằng ngôn ngữ thường (rule CLAUDE.md 1.3):       │
│  ❌ "N+1 query do lazy loading SQLAlchemy"                      │
│  ✅ "Mỗi game trong list tạo 1 câu hỏi DB riêng → 100 games =  │
│     101 query. Tôi sẽ gộp thành 1 query."                      │
│         ↓                                                       │
│                                                                │
│  BƯỚC 3: ĐỀ XUẤT FIX (Plan + User Approve)                     │
│  ────────────────────────────────────────────                  │
│  AI lập bảng:                                                  │
│  | # | Fix | Impact | Effort | Risk | File |                   │
│  | 1 | ... | -200ms | 30 min | Low  | ... |                    │
│                                                                │
│  Rank theo impact/effort (lượm fruit thấp trước).              │
│  User duyệt → AI làm. Không OK → AI điều chỉnh.                │
│         ↓                                                       │
│                                                                │
│  BƯỚC 4: THỰC HIỆN FIX (Code)                                  │
│  ────────────────────────────────────────────                  │
│  • Fix từng phần, impactful nhất trước.                        │
│  • Sau mỗi fix → đo ngay → so sánh trước/sau.                  │
│  • Stop khi đã đạt mục tiêu (đừng over-optimize).               │
│         ↓                                                       │
│                                                                │
│  BƯỚC 5: ĐO LẠI + DOCUMENT (Verify + Share Knowledge)          │
│  ────────────────────────────────────────────                  │
│  • So sánh metric: trước → sau.                                │
│  • Lưu bài học vào .agent/memory/lessons-learned.md.           │
│  • Setup monitoring để phát hiện regression (Sentry, DataDog).  │
└────────────────────────────────────────────────────────────────┘
```

---

# 🌐 PHẦN A — TỐI ƯU FRONTEND (iruka-app + game-hub)

## A.1 — Caching Strategy (Học từ Vercel + Netflix)

### Cache layers (từ nhanh → chậm)

```
1. ⚡ Memory cache (TanStack Query in-memory)        — 0ms (instant)
2. 💾 Service Worker / IndexedDB                      — 5-20ms
3. 🌐 CDN edge cache (Vercel Edge / Cloudflare)       — 30-80ms
4. 🏢 Server-side cache (Redis)                       — 50-200ms
5. 🗄️ Database (origin)                                — 100-500ms
```

### TanStack Query staleTime cheatsheet (rule of thumb)

| Loại dữ liệu | staleTime | Lý do |
|---|---|---|
| **Static config** (subject list, age band) | `Infinity` | Không đổi runtime. Refresh khi deploy mới. |
| **User profile** (tên, avatar, settings) | 5-10 phút | Đổi rất ít. Re-fetch khi user explicit refresh. |
| **List data** (missions, sticker album) | 5 phút | Đổi sau action user (complete-game → invalidate). |
| **Suggest / Recommendation** | 60s | Có thuật toán, có thể đổi nhỏ. |
| **Realtime stats** (chat, notif count) | 0 (always fetch) | Hoặc dùng WebSocket. |
| **Image / Asset URL** | 1 giờ - Infinity | URL ít đổi, content có versioning. |

**Anti-pattern:** `staleTime: 0` cho mọi query → mỗi mount fetch lại → tốn API + chậm.

### Prefetch chiến lược (Netflix style)

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
// ✅ Prefetch in background khi idle (requestIdleCallback)
// ❌ Prefetch tất cả lúc page load → tốn bandwidth
```

---

## A.2 — Bundle Size (Học từ Vercel + Discord)

### Đo bundle

```bash
# Phân tích bundle Next.js
ANALYZE=true npm run build
# → Mở .next/analyze/client.html xem chunk nào to

# Source-map-explorer cho production
npx source-map-explorer build/static/js/*.js
```

### Targets per route (Vercel chuẩn)

| Page type | Target First Load JS |
|---|---|
| Landing page | < 100KB |
| Dashboard/CRUD | < 200KB |
| Heavy interactive (game, editor) | < 400KB |

### Top kỹ thuật giảm bundle

```typescript
// ✅ Dynamic import cho heavy component (Discord style)
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // nếu chỉ chạy client-side
});

// ✅ Tree-shaking: import named, KHÔNG import default toàn lib
import { format } from 'date-fns';           // 3KB
import _ from 'lodash';                       // 70KB ❌
import debounce from 'lodash/debounce';       // 2KB ✅
import { debounce } from 'lodash-es';         // 2KB ✅

// ✅ Replace heavy lib bằng modern alternative
moment.js (300KB)    → date-fns (12KB) hoặc dayjs (7KB)
axios (50KB)         → ky (7KB) hoặc native fetch (0KB)
react-icons all      → import từng icon (lucide-react)

// ✅ Server Component mặc định (Next.js 15)
// Chỉ thêm 'use client' khi cần useState/useEffect
// → giảm JS gửi xuống client 30-60%

// ❌ Anti-pattern
import * as Icons from 'lucide-react';        // 700KB toàn bộ icon!
import { Button } from '@mui/material';        // 90KB chỉ 1 button
```

---

## A.3 — React Performance (Học từ Meta + Linear)

### Render optimization (priority)

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

// 4. ✅ Stable key cho list — KHÔNG dùng index nếu list có thể reorder
{items.map(item => (
  <Item key={item.id} {...item} />   // ✅
  // <Item key={index} {...item} />  // ❌ — gây mount/unmount loop
))}

// 5. ✅ Virtual scroll cho list > 100 item (Linear style)
import { useVirtualizer } from '@tanstack/react-virtual';
// → Chỉ render row trong viewport, list 10K item vẫn mượt
```

### Anti-pattern phổ biến

```typescript
// ❌ Tạo object/array trong JSX → ref đổi mỗi render → memo vô dụng
<Child style={{ color: 'red' }} />    // bad
<Child data={items.filter(...)} />     // bad

// ✅
const childStyle = { color: 'red' };   // ngoài component
<Child style={childStyle} />

// ❌ useEffect cascade — set state này → trigger useEffect khác
useEffect(() => setA(b), [b]);
useEffect(() => setB(a), [a]);  // → infinite loop!

// ❌ Inline anonymous function trong list
{items.map(item => (
  <Item onClick={() => doSomething(item)} />  // tạo function mới mỗi render
))}

// ✅
const handleClick = useCallback((item) => doSomething(item), []);
{items.map(item => (
  <Item onClick={() => handleClick(item)} />
))}
```

### Rules of Hooks (lessons learned)

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

## A.4 — Critical Render Path (Học từ Google)

### Streaming SSR + Suspense (Next.js 15 + RSC)

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

### Resource hints (HTML head)

```html
<!-- ✅ Preconnect tới CDN/API trước khi fetch -->
<link rel="preconnect" href="https://api.iruka.vn" />
<link rel="preconnect" href="https://cdn.iruka.vn" crossorigin />

<!-- ✅ Preload critical assets (font, hero image) -->
<link rel="preload" href="/fonts/sn-pro.woff2" as="font" type="font/woff2" crossorigin />

<!-- ✅ DNS prefetch cho third-party (analytics, ads) -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

### Skeleton UI (Học từ Facebook + YouTube)

> **Perceived performance**: User chờ 1 giây thấy spinner cảm giác 3 giây. Cùng 1 giây thấy skeleton cảm giác 0.5 giây.

```tsx
// ✅ Skeleton có hình dạng tương tự UI thật
<div className="animate-pulse">
  <div className="h-12 w-full bg-gray-200 rounded" />  {/* header shape */}
  <div className="grid grid-cols-3 gap-4 mt-4">
    {Array(6).fill(0).map((_, i) => (
      <div key={i} className="h-40 bg-gray-200 rounded" />  // card shape
    ))}
  </div>
</div>

// ❌ Spinner trắng giữa màn → user tưởng đứng hình
```

---

## A.5 — Images & Media (Học từ Netflix)

```tsx
// ✅ next/image — tự động WebP + responsive + lazy
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  priority           // chỉ cho image above-the-fold
  placeholder="blur" // blur trong khi load
/>

// ✅ Image priority chỉ cho LCP element (hero, logo)
// Image khác → lazy load tự động

// ✅ Responsive với sizes
<Image
  src="/card.jpg"
  sizes="(max-width: 768px) 100vw, 33vw"
  // → mobile load size full, desktop load size 1/3
/>

// ✅ Image format: AVIF > WebP > JPG > PNG
// next/image tự convert nếu browser support

// ❌ <img> thuần — không lazy, không responsive, layout shift
// ❌ Image gốc 4K cho display 400px — tốn bandwidth 10×
```

### Video / Audio

```tsx
// ✅ Lazy load video — không autoplay
<video preload="metadata" poster="/poster.jpg">
  <source src="/video.mp4" type="video/mp4" />
</video>

// ✅ Audio sprite (YouTube/game pattern):
// 10 file audio nhỏ → 1 file audio sprite + timestamp map
// → Giảm HTTP request từ 10 xuống 1
```

---

## A.6 — CSS & Animation (Học từ Discord + Linear)

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

### Font loading

```tsx
// ✅ next/font — preload + swap + no layout shift
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// ❌ @import từ Google Fonts trong CSS → render-blocking
```

---

# 🔧 PHẦN B — TỐI ƯU BACKEND (iruka-edu-service)

## B.1 — Database (Học từ Discord + Stripe)

### Query optimization

```python
# ❌ N+1 query (case thực tế phổ biến nhất)
games = db.query(Game).all()           # 1 query
for g in games:
    owner = g.owner                     # N query (lazy load)

# ✅ Eager load với selectinload (SQLAlchemy 2.0)
from sqlalchemy.orm import selectinload
games = db.query(Game).options(
    selectinload(Game.owner),
    selectinload(Game.tags),
).all()
# → 1 query gốc + 1 query cho owner + 1 query cho tags = 3 query, không phải N+1

# ✅ Select chỉ column cần thiết (Stripe style)
result = db.execute(
    select(Game.id, Game.name, Game.thumbnail_url)  # không lấy description, content...
    .where(Game.is_active == True)
    .limit(20)
)
# → Giảm data transfer 60-80%
```

### Indexing strategy

```sql
-- ✅ Index cho foreign key (mặc định nên có)
CREATE INDEX idx_lessons_subject_id ON lessons(subject_id);

-- ✅ Composite index cho query thường xuyên
CREATE INDEX idx_sessions_child_status_date
ON learn_sessions(child_id, status, started_at DESC);
-- → Order quan trọng: equality columns trước, range/sort sau

-- ✅ Partial index cho condition cụ thể
CREATE INDEX idx_active_users ON users(email)
WHERE is_active = true;
-- → Index chỉ chứa active users → nhỏ hơn, nhanh hơn

-- ✅ Check query thực dùng index không
EXPLAIN ANALYZE SELECT ... ;
-- Tìm "Seq Scan" → cần index
-- Tìm "Index Scan" → OK
-- Tìm "Bitmap Heap Scan" → OK cho large result set
```

### Pagination (Học từ Twitter)

```python
# ❌ OFFSET pagination — chậm với page xa (10000 record)
SELECT * FROM games ORDER BY created_at DESC LIMIT 20 OFFSET 10000;
# → Scan 10020 row rồi bỏ 10000 = lãng phí

# ✅ Cursor pagination (chuẩn FAANG)
SELECT * FROM games
WHERE created_at < '2026-01-01T00:00:00'   # cursor từ last item của page trước
ORDER BY created_at DESC
LIMIT 20;
# → Chỉ scan đúng 20 row. Constant time O(1) cho mọi trang.
```

### Connection pool

```python
# ✅ asyncpg pool — chuẩn cao tải
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine(
    DATABASE_URL,
    pool_size=10,        # connection thường trực
    max_overflow=20,     # connection tạm khi peak
    pool_timeout=30,     # đợi tối đa khi pool đầy
    pool_recycle=3600,   # recycle sau 1h (tránh stale connection)
    pool_pre_ping=True,  # ping trước khi dùng connection
)
```

---

## B.2 — Caching Strategy (Học từ Reddit + Twitter)

### Cache layers (BE side)

```
1. ⚡ Application memory (functools.lru_cache, in-process)
2. 💾 Redis (shared across instances)
3. 🗄️ Database (origin)

# Pattern: Cache-aside (Reddit style)
async def get_user(user_id: str) -> User:
    # 1. Check Redis
    cached = await redis.get(f"user:{user_id}")
    if cached:
        return User.parse_raw(cached)

    # 2. Miss → DB
    user = await db.get(User, user_id)
    if user:
        # 3. Set cache (TTL 5 min)
        await redis.setex(f"user:{user_id}", 300, user.json())
    return user

# ✅ Invalidate khi update
async def update_user(user_id: str, data: dict):
    await db.update(User).where(User.id == user_id).values(**data)
    await redis.delete(f"user:{user_id}")
```

### Cache key conventions

```python
# ✅ Chi tiết → invalidate đúng
"game:catalog:age_3_4:viet_001:page_1"
"user:profile:{user_id}"
"session:active:{learner_id}"

# ❌ Quá rộng → cache invalid khó
"games"   # bad — invalidate 1 game phải clear toàn bộ
```

### TTL guideline

| Data type | TTL | Rationale |
|---|---|---|
| Static catalog | 1 hour - 1 day | Đổi khi admin push update |
| User profile | 5-10 phút | Cân bằng fresh vs cache hit |
| Realtime (notif count) | Không cache hoặc 5s | User expect realtime |
| Game state | Không cache | Mỗi session unique |
| Search result | 1-5 phút | Trade-off freshness |

---

## B.3 — FastAPI Best Practices (Học từ Sentry + GitHub)

```python
# ✅ Async endpoint cho I/O-bound task
@router.get("/lessons")
async def get_lessons(
    subject_id: str,
    db: AsyncSession = Depends(get_db),
):
    return await lesson_service.list(db, subject_id)

# ✅ Background task — không chặn response
from fastapi import BackgroundTasks

@router.post("/games/complete")
async def complete_game(
    body: CompleteGameReq,
    background_tasks: BackgroundTasks,
):
    result = await game_service.complete(body)
    # Side-effect không cần block response
    background_tasks.add_task(send_notification, body.user_id)
    background_tasks.add_task(update_analytics, body)
    return result

# ✅ Response model chỉ trả field cần thiết
class GameListItem(BaseModel):
    id: str
    name: str
    thumbnail_url: str
    # KHÔNG có description, content, tags... (tiết kiệm payload)

@router.get("/games", response_model=list[GameListItem])

# ✅ Streaming response cho file lớn
from fastapi.responses import StreamingResponse
@router.get("/export.csv")
async def export():
    return StreamingResponse(csv_generator(), media_type="text/csv")
# → Không load 100MB vào RAM
```

### JWT verify caching (case thực tế IruKa)

```python
# ❌ Decode JWT mỗi request → tốn CPU
@app.middleware
async def auth(request, call_next):
    token = request.headers.get("Authorization")
    user = jwt.decode(token, SECRET, algorithms=["HS256"])  # mỗi request!
    request.state.user = user

# ✅ Cache decoded user 60s (chuẩn Auth0)
@lru_cache(maxsize=10000)
def decode_jwt_cached(token: str) -> dict:
    return jwt.decode(token, SECRET, algorithms=["HS256"])
# → 1000 req/s × 1 user → 1 decode thay vì 1000
```

---

## B.4 — API Design (Học từ Stripe + GitHub)

```python
# ✅ Batch endpoint thay multiple call
# ❌ Client gọi N lần
GET /api/v1/games/{id}  × 10 lần

# ✅ 1 endpoint batch
POST /api/v1/games/batch
{ "ids": ["g1", "g2", ..., "g10"] }
# → 1 request thay 10 request

# ✅ GraphQL-like field selection
GET /api/v1/users/{id}?fields=name,avatar,email
# → Client kiểm soát payload size

# ✅ Compression (gzip / brotli)
# uvicorn --http-compress=brotli
# → JSON 100KB → 20KB qua wire

# ✅ HTTP/2 multiplexing
# nginx: listen 443 ssl http2;
# → 1 connection cho nhiều request song song

# ✅ Webhook + WebSocket thay polling
# Trước: Client poll mỗi 5s "có notif mới?" → 720 req/hour/user
# Sau: WebSocket push khi có notif → 0 req trừ khi có event
```

---

# 🎮 PHẦN C — TỐI ƯU GAME HUB + GAME SDK

## C.1 — Phaser Game Performance

### Asset loading optimization

```typescript
// ❌ Load từng asset riêng
this.load.image('cat', 'cat.png');
this.load.image('dog', 'dog.png');
// ... 50 lần — 50 HTTP request

// ✅ Texture atlas (sprite sheet)
this.load.atlas('animals', 'animals.png', 'animals.json');
// → 1 image + 1 json metadata = 2 request cho 50 sprite

// ✅ Audio sprite (YouTube pattern)
this.load.audioSprite('sounds', 'sounds.json', ['sounds.mp3', 'sounds.ogg']);

// ✅ Preload chỉ asset Scene 1, load Scene 2/3 khi cần
// → Reduce initial load 60-80%
```

### Render optimization

```typescript
// ✅ Object pool cho object sinh/diệt nhiều (bullet, particle)
const bulletPool = this.physics.add.group({
  classType: Bullet,
  maxSize: 30,
  active: false,
  visible: false,
});
// Lấy bullet: pool.getFirstDead() thay vì new Bullet()
// → Tránh GC pause

// ✅ Disable update cho object off-screen
sprite.body.enable = sprite.x > 0 && sprite.x < width;

// ✅ Reduce particle count trên mobile yếu
const particleCount = navigator.hardwareConcurrency >= 4 ? 100 : 30;
```

### Iframe communication (Game Hub ↔ Game SDK)

```typescript
// ❌ postMessage liên tục mỗi frame
setInterval(() => parent.postMessage(state, '*'), 16);  // 60 msg/s

// ✅ Throttle/batch message
let pendingMessages = [];
const sendBatched = throttle(() => {
  parent.postMessage({ batch: pendingMessages }, '*');
  pendingMessages = [];
}, 100);  // gửi 10 msg/s thay 60 msg/s
```

---

## C.2 — Game Hub (Next.js platform)

```tsx
// ✅ Iframe lazy load — không load game cho đến khi user click
<button onClick={() => setShowGame(true)}>Play</button>
{showGame && <iframe src={gameUrl} />}

// ✅ Iframe sandbox (security + performance isolation)
<iframe
  src={gameUrl}
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
/>

// ✅ Service Worker cache cho asset game
// → Lần thứ 2 load cùng game: instant từ disk cache
```

---

# 📋 CHECKLIST TRƯỚC DEPLOY (Big Tech standard)

### Frontend
- [ ] `next build` không warning bundle size lớn
- [ ] Lighthouse mobile ≥ 85 (Slow 4G + low-end CPU)
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Không có waterfall fetch (mở DevTools Network tab)
- [ ] Tất cả image dùng `next/image`
- [ ] Tất cả route lớn có Suspense boundary
- [ ] Skeleton UI cho mọi loading state > 200ms
- [ ] Không có console.log debug
- [ ] Source map đã upload Sentry (không expose source)
- [ ] Service Worker registered (PWA cache)

### Backend
- [ ] Không có N+1 query (test bằng `sqlalchemy_utils.QueryCounter`)
- [ ] Mọi list endpoint có LIMIT
- [ ] Index đã thêm cho fields query/filter thường xuyên
- [ ] Không có sync I/O trong async endpoint
- [ ] gzip/brotli compression bật
- [ ] CORS chỉ allow origin cần thiết
- [ ] Rate limit cho public endpoint (slowapi)
- [ ] Connection pool config phù hợp tải dự kiến
- [ ] JWT decode cached (LRU)
- [ ] Sentry / DataDog APM connected

### Game
- [ ] Asset đóng gói atlas + sprite
- [ ] Lazy load Scene > 1
- [ ] FPS ≥ 30 trên Android 4GB RAM
- [ ] Memory < 100MB trong DevTools Memory tab
- [ ] postMessage batched/throttled
- [ ] Audio context khởi tạo sau user gesture

---

# 🔧 CÔNG CỤ ĐO LƯỜNG

### Frontend

```bash
# Lighthouse (chuẩn Google)
npx lighthouse https://app.iruka.vn --view --preset=mobile

# Web Vitals real user monitoring
import { useReportWebVitals } from 'next/web-vitals';
useReportWebVitals((metric) => {
  // Send to Vercel Analytics / Sentry / DataDog
  analytics.track('web-vital', metric);
});

# Bundle analyzer
ANALYZE=true npm run build

# Coverage tab (Chrome DevTools)
# → Tìm CSS/JS unused → loại bỏ
```

### Backend

```bash
# Đo response time
curl -s -o /dev/null -w "Total: %{time_total}s\n" https://api.iruka.vn/v1/games

# Load test với k6 (chuẩn Grafana)
k6 run --vus 100 --duration 30s script.js

# pg_stat_statements (chậm query)
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 20;

# EXPLAIN với buffers
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT ...;

# Sentry Performance — distributed tracing
# DataDog APM — flame graph + slow query log
```

### Mobile testing thực

```bash
# Chrome DevTools → Performance tab
# • Network: Slow 4G
# • CPU: 4× slowdown
# • Device: iPhone SE (375×667)

# Lighthouse CI cho regression detection
# Vercel Speed Insights tự đo Real User Monitoring
```

---

# 📊 FORMAT BÁO CÁO TỐI ƯU (AI tạo)

```markdown
# ⚡ PERFORMANCE REPORT — [Tên tính năng] · [Ngày]

## SỐ LIỆU ĐO TRƯỚC
- **Web Vitals (mobile, Slow 4G):**
  - LCP: 3.2s ❌ (target < 2.5s)
  - INP: 380ms ❌ (target < 200ms)
  - CLS: 0.15 ❌ (target < 0.1)
- **API performance:**
  - GET /missions P95: 1200ms ❌ (target < 300ms)
  - DB queries per request: 47 ❌
- **Bundle size:**
  - First Load JS: 380KB ❌ (target < 200KB)

## BOTTLENECK PHÁT HIỆN
1. 🔴 **N+1 query** trong `/missions`: 47 queries → 1 query sau fix
2. 🔴 **Bundle**: moment.js (300KB) — không cần
3. 🟡 **No memo**: 18 SuggestCard re-render mỗi sub-tab switch
4. 🟢 **No skeleton**: spinner trắng kéo dài → user cảm giác lag

## FIX ÁP DỤNG
| # | Fix | Impact | File | Risk |
|---|---|---|---|---|
| 1 | selectinload() cho game.owner | -800ms | db/games.py | Low |
| 2 | Replace moment → date-fns | -290KB | package.json | Low |
| 3 | React.memo SuggestCard | -80ms tab switch | components/*.tsx | None |
| 4 | Skeleton UI thay spinner | Perceptual -500ms | page.tsx | None |

## SỐ LIỆU ĐO SAU
- **Web Vitals:**
  - LCP: 1.8s ✅ (-44%)
  - INP: 95ms ✅ (-75%)
  - CLS: 0.05 ✅
- **API:**
  - GET /missions P95: 180ms ✅ (-85%)
  - DB queries: 3 ✅ (-94%)
- **Bundle:** 195KB ✅ (-49%)

## REGRESSION GUARD
- Lighthouse CI threshold: Performance ≥ 85
- Sentry alert nếu API P95 > 500ms trong 5 phút
- pg_stat_statements monitor weekly review
```

---

# 🎯 ANTI-PATTERNS — Tránh phạm phải

### Frontend
- ❌ `useState` cho data từ server (dùng TanStack Query)
- ❌ `useEffect` để fetch trên mount (dùng `useQuery` với `enabled`)
- ❌ Inline object/function trong props của memo'd child
- ❌ `index` làm key cho list có thể reorder
- ❌ Import * từ icon library
- ❌ Image gốc 4K cho display 400px
- ❌ Spinner trắng giữa màn (thay bằng skeleton)
- ❌ `console.log` để debug production
- ❌ Animate width/height (dùng transform thay)

### Backend
- ❌ N+1 query (lazy load không có eager)
- ❌ Sync I/O trong async handler (`time.sleep`, `requests.get`)
- ❌ Trả full Model thay vì DTO/Response Schema
- ❌ Không có index cho FK/filter column
- ❌ OFFSET pagination cho list lớn (dùng cursor)
- ❌ Không cache static data
- ❌ JWT decode mỗi request (cache LRU)
- ❌ N+1 Redis call (dùng MGET)

### Game
- ❌ Load từng image riêng (dùng atlas)
- ❌ `new Object()` trong game loop (dùng pool)
- ❌ Update logic cho object off-screen
- ❌ postMessage 60 lần/giây từ iframe

---

# 📚 BÀI HỌC TỪ CÁC SỰ CỐ THỰC TẾ (Case History)

### Case 1 (2026-05): `/missions` lag chuyển tab
- **Bottleneck**: 10 API call song song + no memo + cache 30s
- **Fix**: Tăng staleTime 60s-5min + memo 7 component + skeleton UI thay spinner
- **Kết quả**: Lần 2 chuyển tab: 0.4-0.6s → < 0.1s

### Case 2 (Netflix 2009 — public case study)
- **Bottleneck**: Microservice spawning explosion → cascade slowness
- **Fix**: Circuit breaker (Hystrix) + bulkhead pattern
- **Kết quả**: P99 5s → 200ms

### Case 3 (Discord 2019)
- **Bottleneck**: 1 channel 1M+ message, MongoDB find chậm
- **Fix**: Migrate sang Cassandra + sharding by channel_id
- **Kết quả**: P99 query 2s → 80ms

### Case 4 (Vercel — Next.js 14)
- **Insight**: 30% bundle = node_modules chỉ dùng 5% feature
- **Fix**: Tree-shake aggressive + lazy hydration
- **Kết quả**: First Load JS giảm 40%

---

# 🚀 RULE TỐI ƯU HIỆU NĂNG (đúc kết)

1. **Đo trước, fix sau** — Không tối ưu thứ không phải bottleneck.
2. **Mobile-first + 3G-first** — Slow 4G + low CPU là benchmark thật.
3. **80/20 rule** — Tìm 20% gây 80% chậm.
4. **Perception > reality** — Skeleton > spinner; instant feedback > correctness.
5. **Cache aggressively** — Cache mọi thứ ít đổi; invalidate explicit khi đổi.
6. **Lazy by default** — Load khi cần, không load trước.
7. **Batch + dedupe** — Gộp request; tránh N+1.
8. **Index everything queried** — Mọi WHERE/ORDER BY/JOIN column.
9. **Profile, don't guess** — Có data thì fix, không có thì đo trước.
10. **Document & monitor** — Lưu metric trước/sau; alert khi regression.

> **Quy tắc thumb cuối**: Trẻ em / phụ huynh KHÔNG quan tâm "tại sao chậm". Chỉ quan tâm "có nhanh không". Mỗi 100ms anh tối ưu được = 1 cú click thêm của user.
