# 🎬 WEB-LIFESTYLE — Tổng hợp Animation, Transition & Lazy Loading

> **Phiên bản:** v1.0 | **Cập nhật:** 2026-05-25 | **Dự án:** web-lifestyle
>
> **Mục đích:** Tài liệu này tổng hợp **toàn bộ** các pattern animation, transition và lazy loading đang sử dụng trong dự án, giúp dev dễ tra cứu, tái sử dụng và đảm bảo đồng nhất.

---

## 📑 Mục lục

1. [Thư viện sử dụng](#1-thư-viện-sử-dụng)
2. [Framer Motion — Animation Patterns](#2-framer-motion--animation-patterns)
3. [Tailwind CSS — Transition & Hover Effects](#3-tailwind-css--transition--hover-effects)
4. [Embla Carousel — Slider & Autoplay](#4-embla-carousel--slider--autoplay)
5. [Lazy Loading & Dynamic Import](#5-lazy-loading--dynamic-import)
6. [Bảng tổng hợp theo Component](#6-bảng-tổng-hợp-theo-component)
7. [Quy tắc chung](#7-quy-tắc-chung)

---

## 1. Thư viện sử dụng

| Thư viện | Vai trò | Phiên bản |
|---|---|---|
| **framer-motion** | Animation chính (fade, slide, scale, tab transition, scroll reveal) | ^12.x |
| **Tailwind CSS** | CSS transition, hover effect, micro-interaction | ^4 |
| **embla-carousel-react** | Slider/Carousel cuộn ngang | ^8.6 |
| **embla-carousel-autoplay** | Plugin tự động chạy slide | ^8.6 |

---

## 2. Framer Motion — Animation Patterns

### 2.1 🔹 Fade-In từ dưới lên (Scroll Reveal)

> **Pattern phổ biến nhất** — Dùng cho tiêu đề section, card, block nội dung.
> Chỉ chạy **1 lần** khi phần tử lọt vào viewport (`viewport={{ once: true }}`).

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Nội dung */}
</motion.div>
```

**Các biến thể thường gặp:**

| Biến thể | `initial` | `whileInView` / `animate` | `transition` | Dùng ở |
|---|---|---|---|---|
| Fade-in nhẹ | `opacity: 0, y: 20` | `opacity: 1, y: 0` | `duration: 0.5` | Hero, tiêu đề |
| Fade-in mạnh | `opacity: 0, y: 30–40` | `opacity: 1, y: 0` | `duration: 0.5–0.7` | Card, section |
| Fade-in từ trên | `opacity: 0, y: -20` | `opacity: 1, y: 0` | `duration: 0.6–0.7` | Tiêu đề section |

**Component sử dụng:**
- `Hero.tsx` — Fade-in text + CTA button
- `EcosystemSection.tsx` (home) — Tiêu đề + card hệ sinh thái
- `NewsSection.tsx` — Card tin tức
- `AboutSection.tsx` — Block giới thiệu
- `LeadershipSection.tsx` — Thông tin lãnh đạo
- `CoreValuesSection.tsx` — Card giá trị cốt lõi
- `BabegoMission.tsx` — Tiêu đề section
- `InvestHero.tsx`, `InvestOpportunity.tsx`, `InvestAdvantage.tsx`, `InvestDetails.tsx`
- `IrukaEduHero.tsx`, `IrukaEduMission.tsx`, `IrukaEduAbout.tsx`, `IrukaEduPotential.tsx`
- `IrukaCareHero.tsx`, `IrukaCareMission.tsx`, `IrukaCareAbout.tsx`, `IrukaCarePotential.tsx`
- `BabegoHero.tsx`, `BabegoOrigin.tsx`, `BabegoProduct.tsx`, `BabegoAchievement.tsx`
- `CareersHero.tsx`, `ContactForm.tsx`

---

### 2.2 🔹 Fade-In từ trái/phải (Slide Horizontal)

> Dùng cho layout **2 cột** — ảnh bên trái slide từ trái, text bên phải slide từ phải (hoặc ngược lại).

```tsx
{/* Cột trái — slide từ trái */}
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* Ảnh */}
</motion.div>

{/* Cột phải — slide từ phải */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
>
  {/* Text */}
</motion.div>
```

**Component sử dụng:**
- `AboutSection.tsx` (home) — Ảnh trái `x: -50`, Text phải `x: 50`
- `AboutIntroSection.tsx` — Ảnh `x: -30`, Text `x: 30`
- `LeadershipSection.tsx` — Avatar `x: -30`, Info `x: 30`

---

### 2.3 🔹 Staggered Children (Xuất hiện lần lượt)

> Nhiều phần tử con xuất hiện tuần tự, mỗi cái cách nhau 1 khoảng `delay`.

```tsx
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
  >
    {/* Card */}
  </motion.div>
))}
```

**Component sử dụng:**
- `NewsSection.tsx` — Card tin tức: `delay: idx * 0.1`
- `EcosystemSection.tsx` (home) — Card hệ sinh thái: `delay: index * 0.15`
- `Hero.tsx` — 3 block text: delay `0`, `0.1`, `0.2`

---

### 2.4 🔹 AnimatePresence + Tab Switching (Chuyển tab mượt)

> Dùng khi có **tab/pill navigation** — nội dung cũ exit, nội dung mới enter.

#### Pattern 1: Slide content (đơn giản)

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    {/* Nội dung tab */}
  </motion.div>
</AnimatePresence>
```

**Component sử dụng:**
- `BabegoMission.tsx` — Tab Tầm nhìn / Sứ mệnh / Cam kết
- `VisionMissionSection.tsx` — Tab Tầm nhìn / Sứ mệnh / Triết lý

#### Pattern 2: Slide content + Background (Variants phức tạp)

```tsx
// Định nghĩa variants riêng
const contentVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'easeIn' } },
};

const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.35 } },
};

// Sử dụng
<AnimatePresence mode="wait">
  <motion.div
    key={`bg-${activeTab}`}
    variants={bgVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <Image ... />
  </motion.div>
</AnimatePresence>

<AnimatePresence mode="wait">
  <motion.div
    key={`content-${activeTab}`}
    variants={contentVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {/* Text card */}
  </motion.div>
</AnimatePresence>
```

**Component sử dụng:**
- `VisionMissionSection.tsx` — Ảnh nền zoom + Text card slide

#### Pattern 3: Directional Slide (có hướng trái/phải)

```tsx
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : direction < 0 ? -50 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : direction > 0 ? -50 : 0,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 }
    }
  })
};

// Sử dụng
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={activeIdx}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
  >
    {/* Nội dung slide */}
  </motion.div>
</AnimatePresence>
```

**Component sử dụng:**
- `DifferenceSection.tsx` — "Sự Khác Biệt" slider 5 tab

---

### 2.5 🔹 Scale on Enter (Phóng to khi xuất hiện)

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.4 }}
>
  {/* Hình ảnh */}
</motion.div>
```

**Component sử dụng:**
- `BabegoMission.tsx` — Hình nền tab chuyển đổi
- `CoreValuesSection.tsx` — Card giá trị cốt lõi: `initial: scale: 0.85`

---

### 2.6 🔹 Layout Animation (Animated Tab Pill)

> Dùng `layoutId` để animate thanh active tab trượt mượt giữa các nút.

```tsx
{isActive && (
  <motion.div
    layoutId="activeTabPill"
    className="absolute inset-0 bg-white rounded-full -z-10 shadow-md"
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
  />
)}
```

**Component sử dụng:**
- `DifferenceSection.tsx` — Thanh pill active chạy theo tab

---

### 2.7 🔹 Progress Bar Animation (Thanh tiến trình)

```tsx
<motion.div
  className="h-full bg-gradient-to-r ..."
  initial={{ width: 0 }}
  animate={{ width: "100%" }}
  transition={{ duration: 0.8, delay: 0.2 }}
/>
```

**Component sử dụng:**
- `DifferenceSection.tsx` — Thanh gạch dưới mỗi tab content

---

### 2.8 🔹 Hover Scale (Phóng to khi hover)

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.5 }}
>
  {/* Card / Ảnh */}
</motion.div>

{/* Hoặc nhẹ hơn */}
<motion.div
  whileHover={{ y: -4, scale: 1.005 }}
>
  {/* Card */}
</motion.div>

{/* Hoặc với hover lift */}
<motion.div
  whileHover={{ y: -10, transition: { duration: 0.3 } }}
>
  {/* Card */}
</motion.div>
```

**Component sử dụng:**
- `AboutSection.tsx` — Ảnh `whileHover: scale: 1.05`
- `EcosystemSection.tsx` (home) — Card: `whileHover: y: -4, scale: 1.005`
- `EcosystemSection.tsx` (about) — Card: `whileHover: y: -10`
- `CoreValuesSection.tsx` — Card: `whileHover: scale: 1.05, zIndex: 30`
- `AboutIntroSection.tsx` — Ảnh: `whileHover: scale: 1.04`

---

## 3. Tailwind CSS — Transition & Hover Effects

### 3.1 🔸 transition-colors (Đổi màu mượt)

```tsx
className="text-gray-600 hover:text-primary transition-colors"
```

**Dùng ở:**
- `Header.tsx` — Tất cả link navigation
- `Footer.tsx` — Link liên hệ, email

---

### 3.2 🔸 transition-all + duration (Đa hiệu ứng)

```tsx
className="transition-all duration-300 hover:scale-110"
className="hover:bg-primary/90 transition-all shadow-xl"
```

**Dùng ở:**
- `Footer.tsx` — Icon mạng xã hội: `hover:scale-110 duration-300`
- `ScrollToTop.tsx` — Nút scroll top: `hover:scale-110 duration-300`
- `Hero.tsx` — CTA button: `hover:scale-105 transition-all`
- `Header.tsx` — Dropdown items: `transition-all duration-200`

---

### 3.3 🔸 transition-transform (Xoay/dịch chuyển)

```tsx
className="group-hover:translate-x-1 transition-transform"
className="group-data-[state=open]:rotate-180 transition-transform"
className="transition-transform group-hover:scale-105"
```

**Dùng ở:**
- `Hero.tsx` — Mũi tên CTA: `group-hover:translate-x-1`
- `Header.tsx` — Chevron dropdown: `rotate-180 transition-transform`
- `Header.tsx` — Logo: `group-hover:scale-105`

---

### 3.4 🔸 transition-colors duration-300 (Icon/Button hover)

```tsx
className="bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300"
```

**Dùng ở:**
- `Header.tsx` — Icon các mục dropdown (IruKa Edu, Babego, IruKa Care)

---

### 3.5 🔸 CSS Image Hover Zoom

```tsx
className="object-cover transition-transform duration-700 group-hover:scale-105"
```

**Dùng ở:**
- `DifferenceSection.tsx` — Ảnh minh họa mỗi tab

---

### 3.6 🔸 Floating Badge Hover

```tsx
className="transition-all duration-300 hover:scale-110 hover:rotate-3"
```

**Dùng ở:**
- `DifferenceSection.tsx` — Badge icon floating

---

### 3.7 🔸 Glow Background Dynamic

```tsx
className="opacity-20 blur-[80px] transition-all duration-1000"
style={{
  background: `radial-gradient(circle at 50% 50%, ${activeItem.glowBg} 0%, transparent 60%)`
}}
```

**Dùng ở:**
- `DifferenceSection.tsx` — Quầng sáng phía sau card chính, đổi màu theo tab active

---

### 3.8 🔸 Dots Navigation Transition

```tsx
className={`h-2 rounded-full transition-all duration-300 ${
  isActive ? 'bg-[#008bbd] w-6' : 'bg-[#008bbd]/30 w-2'
}`}
```

**Dùng ở:**
- `DifferenceSection.tsx` — Mobile dots indicator

---

## 4. Embla Carousel — Slider & Autoplay

### 4.1 🔵 Setup cơ bản

```tsx
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, align: 'start' },
  [Autoplay({ delay: 3000, stopOnInteraction: false })]
);
```

### 4.2 🔵 Navigation callbacks

```tsx
const scrollPrev = useCallback(() => {
  if (emblaApi) emblaApi.scrollPrev();
}, [emblaApi]);

const scrollNext = useCallback(() => {
  if (emblaApi) emblaApi.scrollNext();
}, [emblaApi]);
```

### 4.3 🔵 Dot indicator tracking

```tsx
const [selectedIndex, setSelectedIndex] = useState(0);
const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

const onSelect = useCallback(() => {
  if (!emblaApi) return;
  setSelectedIndex(emblaApi.selectedScrollSnap());
}, [emblaApi]);

useEffect(() => {
  if (!emblaApi) return;
  setScrollSnaps(emblaApi.scrollSnapList());
  emblaApi.on('select', onSelect);
  emblaApi.on('reInit', onSelect);
}, [emblaApi, onSelect]);
```

### 4.4 🔵 Component sử dụng

| Component | Loại slider | Autoplay | Loop |
|---|---|---|---|
| `NewsSection.tsx` (home) | Tin tức nổi bật | ✅ 3000ms | ✅ |
| `AchievementSection.tsx` | Thành tựu công ty | ❌ | ✅ |
| `NewsCategorySlider.tsx` | Tin theo danh mục | ✅ | ✅ |
| `NewsEventsGroupSlider.tsx` | Sự kiện nổi bật | ✅ 3000ms | ✅ |

---

## 5. Lazy Loading & Dynamic Import

### 5.1 🟢 Next.js `next/dynamic` (Code Splitting)

> Dùng `next/dynamic` để tải component chỉ khi cần, giảm bundle size ban đầu.

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Đang tải...</div>,
  ssr: false, // Tắt SSR nếu component chỉ chạy trên client
});
```

**Component sử dụng:**
- `DifferenceSection.tsx` — Dynamic import `Variants` type
- `CareersHero.tsx` — Dynamic import component

### 5.2 🟢 Next.js Image Lazy Loading

> `next/image` **tự động lazy load** tất cả ảnh theo mặc định. Chỉ cần set `priority` cho ảnh above-the-fold (phần đầu tiên người dùng nhìn thấy).

```tsx
{/* Ảnh TRÊN fold — tải ngay */}
<Image src="/hero.jpg" alt="Hero" fill priority />

{/* Ảnh DƯỚI fold — tự động lazy load */}
<Image src="/feature.jpg" alt="Feature" fill />
```

**Quy tắc áp dụng trong dự án:**
- `priority` được set cho: Hero banner, ảnh tab active đầu tiên
- Tất cả ảnh khác: tự động lazy load bởi Next.js

### 5.3 🟢 React.lazy + Suspense (Chưa sử dụng)

> Hiện tại dự án **chưa sử dụng** `React.lazy` + `Suspense`. Tất cả component được import trực tiếp hoặc qua `next/dynamic`.

---

## 6. Bảng tổng hợp theo Component

### 🏠 Home Page

| Component | Animation | Transition CSS | Carousel |
|---|---|---|---|
| `Hero.tsx` | ✅ Fade-in stagger (3 block) | ✅ hover:scale-105, translate-x | ❌ |
| `AboutSection.tsx` | ✅ Slide trái/phải, hover scale | ❌ | ❌ |
| `DifferenceSection.tsx` | ✅ AnimatePresence, Variants, layoutId, progress bar | ✅ glow, image zoom, dots | ❌ |
| `EcosystemSection.tsx` | ✅ Fade-in stagger, hover lift | ❌ | ❌ |
| `AchievementSection.tsx` | ❌ | ❌ | ✅ Embla |
| `NewsSection.tsx` | ✅ Fade-in stagger | ❌ | ✅ Embla + Autoplay |

### 📖 About Page

| Component | Animation | Transition CSS | Carousel |
|---|---|---|---|
| `AboutIntroSection.tsx` | ✅ Slide trái/phải, hover scale | ❌ | ❌ |
| `VisionMissionSection.tsx` | ✅ AnimatePresence, bgVariants, contentVariants | ❌ | ❌ |
| `CoreValuesSection.tsx` | ✅ Fade-in, hover scale + zIndex | ❌ | ❌ |
| `LeadershipSection.tsx` | ✅ Fade-in, slide trái/phải | ❌ | ❌ |
| `TimelineSection.tsx` | ✅ Fade-in, AnimatePresence | ❌ | ❌ |
| `EcosystemSection.tsx` | ✅ Fade-in stagger, hover lift | ❌ | ❌ |

### 🍼 Babego Page

| Component | Animation | Transition CSS | Carousel |
|---|---|---|---|
| `BabegoHero.tsx` | ✅ Fade-in | ❌ | ❌ |
| `BabegoOrigin.tsx` | ✅ Fade-in | ❌ | ❌ |
| `BabegoMission.tsx` | ✅ AnimatePresence (tab + bg), scale | ❌ | ❌ |
| `BabegoProduct.tsx` | ✅ Fade-in | ❌ | ❌ |
| `BabegoAdvantage.tsx` | ✅ Fade-in | ❌ | ❌ |
| `BabegoAchievement.tsx` | ✅ Fade-in | ❌ | ❌ |
| `BabegoSlogan.tsx` | ✅ Fade-in | ❌ | ❌ |

### 📰 News Page

| Component | Animation | Transition CSS | Carousel |
|---|---|---|---|
| `NewsHero.tsx` | ✅ Fade-in | ❌ | ❌ |
| `NewsCategorySlider.tsx` | ❌ | ❌ | ✅ Embla + Autoplay |
| `NewsEventsGroupSlider.tsx` | ❌ | ❌ | ✅ Embla + Autoplay |

### 🏗 Layout

| Component | Animation | Transition CSS |
|---|---|---|
| `Header.tsx` | ✅ AnimatePresence (mobile menu) | ✅ transition-colors, rotate, scale |
| `Footer.tsx` | ❌ | ✅ hover:scale-110, transition-colors |
| `ScrollToTop.tsx` | ❌ | ✅ hover:scale-110, animate-in |

### 💼 Invest / IruKa Edu / IruKa Care / Careers / Contact

| Module | Pattern chung |
|---|---|
| Invest (4 components) | ✅ Fade-in scroll reveal |
| IruKa Edu (8 components) | ✅ Fade-in scroll reveal |
| IruKa Care (8 components) | ✅ Fade-in scroll reveal |
| Careers (2 components) | ✅ Fade-in, AnimatePresence (modal) |
| Contact (1 component) | ✅ Fade-in |

---

## 7. Quy tắc chung

### ✅ PHẢI TUÂN THỦ

1. **Scroll reveal** — Luôn dùng `viewport={{ once: true }}` để animation chỉ chạy **1 lần**
2. **Duration** — Giữ trong khoảng `0.3s – 0.8s`, không quá lâu
3. **Ease** — Ưu tiên `easeOut` cho enter, `easeIn` cho exit
4. **Stagger delay** — Khoảng `0.1 – 0.15s` giữa các item
5. **Tab switching** — Luôn dùng `AnimatePresence mode="wait"` để đợi exit xong mới enter
6. **Image priority** — Chỉ set `priority` cho ảnh above-the-fold (Hero, banner)
7. **Hover** — Scale nhẹ (`1.02 – 1.05`), duration `200 – 500ms`

### ❌ KHÔNG ĐƯỢC LÀM

1. ❌ Animation **lòe loẹt, chớp tắt, nhảy nhót** — phải mượt mà chuyên nghiệp
2. ❌ Dùng `viewport={{ once: false }}` — animation lặp lại khi scroll gây rối mắt
3. ❌ Duration > 1s cho fade-in — người dùng phải chờ quá lâu
4. ❌ `priority` cho tất cả ảnh — chỉ ảnh đầu trang mới cần
5. ❌ Animation ở Server Component — `framer-motion` chỉ chạy ở Client (`'use client'`)

---

## 📌 TÓM TẮT NHANH — Copy & Paste

### Fade-in cơ bản (dùng nhiều nhất):
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
```

### Tab switching cơ bản:
```tsx
<AnimatePresence mode="wait">
  <motion.div key={activeTab}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  />
</AnimatePresence>
```

### Hover scale cơ bản:
```tsx
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.3 }}
```

### Tailwind hover button:
```tsx
className="hover:bg-primary/90 hover:scale-105 transition-all duration-300"
```

---

_Tài liệu này là nguồn tham khảo chính thức về animation/transition/lazy-loading của dự án web-lifestyle._
