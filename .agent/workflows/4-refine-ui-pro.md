---
description: Tinh chỉnh giao diện UI theo yêu cầu / mô tả của Mr Đào — BẮT BUỘC tham khảo Big Tech apps + áp dụng kỹ thuật từ frontend-layout-techniques.md. Dùng khi cần "polish", "fine-tune", "căn lại", "kéo to/nhỏ", "fit chiều ngang", "đẹp hơn"...
---

# 🎨 WORKFLOW: TINH CHỈNH GIAO DIỆN THEO Ý — CHUẨN PRO

> **Mục tiêu**: Khi Mr Đào gửi yêu cầu tinh chỉnh UI (text mô tả + screenshot), AI phải đề xuất giải pháp ĐẲNG CẤP BIG TECH — không "code đại" theo cảm tính.

---

## 🧭 KHI NÀO DÙNG WORKFLOW NÀY?

Triggers (Mr Đào gửi yêu cầu kiểu):
- "Căn lại khoảng cách"
- "Kéo to/nhỏ ra"  
- "Fit chiều ngang màn hình"
- "Tỉ lệ chưa cân đối"
- "Layout bị vỡ khi resize"
- "Đẹp hơn nhé"
- "Học hỏi app X làm..."
- "Cân đối khoa học"
- Screenshot + chỉ ra phần cần sửa

KHÔNG dùng cho:
- Đắp UI từ mockup gốc lần đầu → dùng `/4-frontend-mockup-fidelity`
- Tạo component mới → dùng `/4-code-frontend`
- Fix bug hiển thị → dùng `/6-fix-bug`

---

## 📋 QUY TRÌNH 6 BƯỚC

### BƯỚC 0 — STARTUP CHECKLIST (BẮT BUỘC)

```
✅ Đọc 2 file memory CỐT LÕI:
   1. .agent/memory/lessons-learned.md
      - L-38 (2026-05-14): inline style vs Tailwind arbitrary
      - L-40 (2026-05-15): L-38 chưa thành phản xạ — phải áp dụng NGAY TỪ LẦN ĐẦU
   2. .agent/memory/frontend-layout-techniques.md (14 chương kỹ thuật)
✅ Note các Big Tech principles đút kết trong workflow này (mục dưới)
✅ Khai báo workflow: `📋 Workflow: /4-refine-ui-pro | 📖 Memory: đã đọc L-38 + L-40`
```

### 🚨 TRIGGER WORDS L-38 + L-40 — KÍCH HOẠT INLINE STYLE NGAY TỪ LẦN ĐẦU

> ⚡ Workflow này CHÍNH XÁC là tình huống user dùng các trigger words dưới đây. Khi gặp **BẤT KỲ từ nào** → BẮT BUỘC `style={{}}` inline, KHÔNG dùng `px-[Xpx] py-[Ypx]` arbitrary.

| Nhóm | Trigger phrase |
|---|---|
| **Spacing** | "padding", "margin", "spacing", "khoảng cách" |
| **Edge** | "sát viền", "sát mép", "không thoáng" |
| **Adjustment** | "căn chỉnh", "căn lại", "căn cho đẹp" |
| **Sizing** | "to hơn", "nhỏ hơn", "rộng hơn", "cao hơn" |
| **Quality** | "pixel perfect", "giống mockup", "không giống mockup" |

#### Hiểu đúng ngữ cảnh "sát viền" (tránh sai như L-40):

| User nói | Ý nghĩa thật |
|---|---|
| "sát viền trái/phải" | padding ngang (`left/right`) |
| "sát viền trên/dưới" | padding dọc (`top/bottom`) |
| **"mọi cái sát viền"** | padding **TẤT CẢ 4 chiều** |
| **"bên trong phải to hơn"** | padding **tổng** (cả ngang + dọc) |

→ **Không chắc?** HỎI 1 câu xác nhận trước khi code. KHÔNG đoán → tốn extra turn như L-40.

#### Quy trình 3 bước khi sửa khoảng cách (BẮT BUỘC):

```
1. ✅ Hiểu đúng yêu cầu (hỏi nếu không chắc)
2. ✅ Inline style TỪ LẦN ĐẦU — KHÔNG bắt đầu bằng `px-[Xpx]` rồi đợi user báo "vẫn sát"
3. ✅ F12 → Computed verify padding thật trước khi báo done
```

#### ❌ ANTI-PATTERN cần tránh:
- Bắt đầu bằng `px-[Xpx]` → đợi user báo "không đổi" → mới chuyển inline (TỐN 1-2 turn — L-40)
- Đoán "sát viền" chỉ là ngang mà bỏ qua dọc → SAI ngữ cảnh
- Báo "done" chỉ vì TypeScript pass (không verify DOM)

### BƯỚC 1 — PHÂN LOẠI YÊU CẦU

Xác định LOẠI điều chỉnh để chọn đúng kỹ thuật + Big Tech reference:

| Loại yêu cầu | Trigger phrase | Tham khảo Big Tech | Chương `frontend-layout-techniques.md` |
|--------------|---------------|--------------------|-----------------------------------------|
| **Spacing** | "căn lại", "khoảng cách", "gọn lại", "chật quá" | Apple, Stripe | Ch.8 (margin/padding/gap) |
| **Sizing** | "kéo to", "nhỏ lại", "fit chiều ngang" | Linear, Vercel | Ch.2-3 (đơn vị + giới hạn) |
| **Responsive** | "trên mobile/tablet khác", "kéo cửa sổ vỡ" | Stripe, Tailwind | Ch.9, Ch.4 (media + container query) |
| **Alignment** | "căn giữa", "thẳng hàng", "ép trái/phải" | Apple, Figma | Ch.7 (align/justify/place) |
| **Container** | "bị tràn", "nội dung lệch", "bọc trong khung" | Discord, Slack | Ch.5 (positioning) |
| **Stacking** | "đè lên nhau", "cái này trên cái kia" | Linear, Notion | Ch.6 (z-index/stacking context) |
| **Color/Theme** | "đổi màu", "đậm/nhạt", "gradient" | Apple, Stripe | Ch.12 (shadow/gradient/filter) |
| **Animation** | "mượt hơn", "có hiệu ứng" | Apple, Linear | Ch.11 (transition/transform) |
| **Typography** | "chữ to", "chữ rõ hơn", "truncate" | Medium, Stripe | Ch.10 (line-height/letter-spacing) |
| **Layout vỡ** | "vỡ giao diện khi resize" | Tailwind, Linear | Ch.9 + Ch.4 (responsive + container) |
| **Children UI** | "cho trẻ con", "to hơn", "thân thiện" | Khan Academy Kids, Duolingo, Lingokids | Touch target + animation |

### BƯỚC 2 — THAM KHẢO BIG TECH APPS (BẮT BUỘC)

Phải reference ít nhất **1-2 Big Tech apps** đã làm pattern tương tự. CẤM "tự sáng tạo" không dựa vào reference.

#### 🏢 BIG TECH APPS — PATTERN LIBRARY

##### 📐 Layout & Spacing
| App | Đặc trưng | Khi học hỏi |
|-----|-----------|-------------|
| **Apple** | Generous whitespace, hairline border #E5E7EB, subtle shadows | UI Phụ Huynh (clean, premium) |
| **Stripe** | Limited palette, clean grid, hierarchy via size+weight | Form, dashboard |
| **Linear** | Dense yet readable, keyboard-first, subtle motion | Dashboard, lists |
| **Vercel** | Minimal, monospace accents, clean dark mode | Dev-facing UI |
| **Notion** | Card-based, drag-drop, sidebar tree | Content organization |
| **Figma** | Tool panels, contextual sidebar | Design tools |

##### 📱 Mobile-first
| App | Đặc trưng | Khi học hỏi |
|-----|-----------|-------------|
| **Instagram** | Bottom tab, story circles, swipe gestures | Phone navigation |
| **TikTok** | Vertical full-screen, side rail icons | Phone hero content |
| **Spotify** | Card carousel, gradient cover art | Card layouts |
| **WhatsApp** | Chat bubbles, status tabs | List interactions |

##### 💬 Communication
| App | Đặc trưng | Khi học hỏi |
|-----|-----------|-------------|
| **Discord** | 80px workspace + 240px channel sidebar + main | Multi-sidebar layout |
| **Slack** | Thin workspace switcher, channel groups | Sidebar hierarchy |
| **Telegram** | Light/dark themes, sticker packs | Theme switching |

##### 👶 Children's Education
| App | Đặc trưng | Khi học hỏi |
|-----|-----------|-------------|
| **Khan Academy Kids** | Mascot characters, BIG touch targets ≥60px, vibrant colors | UI Học Sinh IruKa |
| **Duolingo** | Streak counter, progress paths, celebration animations | Gamification |
| **Lingokids** | Cards 3:2 ratio, friendly fonts, simple icons | Card avatars |
| **ABCmouse** | Card-based learning, badge collection | Achievement systems |

##### 🎮 Games & Reward
| App | Đặc trưng | Khi học hỏi |
|-----|-----------|-------------|
| **Apple Game Center** | Achievement badges, leaderboard | Reward UI |
| **Nintendo Switch UI** | Tile-based, smooth transitions, sound feedback | Card grids |
| **Steam** | Game card hover effects, library grid | Game showcase |

### BƯỚC 3 — ÁP DỤNG KỸ THUẬT TỪ MEMORY

Tra cứu `.agent/memory/frontend-layout-techniques.md` theo bảng map ở Bước 1.

**RULE BẮT BUỘC**:
- ✅ Inline style cho arbitrary values (L-38): hex color, opacity số lẻ, padding lẻ, aspect-ratio
- ✅ Tailwind class cho preset chuẩn: `flex`, `mb-4`, `gap-2`, `hover:`
- ✅ Container queries (`cqi`) cho scaling theo cha
- ✅ `clamp(min, X, max)` cho responsive safe
- ✅ `flex-wrap` cho layout co giãn không vỡ
- ✅ `position: sticky` cho neo khi scroll
- ✅ `aspect-ratio` để khung giữ tỉ lệ

### BƯỚC 4 — ĐỀ XUẤT 2-3 PHƯƠNG ÁN

CẤM "code đại 1 phương án" rồi báo cáo. PHẢI đề xuất NHIỀU phương án với trade-off rõ ràng.

**TEMPLATE PROPOSAL**:

```markdown
📋 Phân tích yêu cầu: [Loại: spacing/sizing/responsive/...]

🎯 Big Tech reference:
- [App 1]: dùng pattern [X]
- [App 2]: dùng pattern [Y]

📚 Kỹ thuật áp dụng (frontend-layout-techniques.md):
- Chương [X.Y]: [Tên chương]
- Pattern cốt lõi: [vd "Container query + cqi"]

💡 ĐỀ XUẤT 3 PHƯƠNG ÁN:

### A. [Tên phương án] — học hỏi [Big Tech app]
Implementation:
\`\`\`jsx
<div style={{ ... }}>...</div>
\`\`\`
✅ Ưu: ...
❌ Nhược: ...

### B. [Tên phương án] — học hỏi [Big Tech app]
Implementation:
\`\`\`jsx
...
\`\`\`
✅ Ưu: ...
❌ Nhược: ...

### C. [Tên phương án] — học hỏi [Big Tech app]  
Implementation:
\`\`\`jsx
...
\`\`\`
✅ Ưu: ...
❌ Nhược: ...

👉 Em ưu tiên phương án [A/B/C] vì [lý do dựa trên context project]. Anh chọn?
```

### BƯỚC 5 — THỰC THI sau khi user duyệt

- Apply CHÍNH XÁC phương án user chọn
- Tuân thủ L-38 (inline style cho arbitrary)
- KHÔNG sửa lan ngoài scope
- Verify TypeScript compile

### BƯỚC 6 — VERIFY + BÁO CÁO

**Trước khi báo "done"**:
- [ ] F12 → DevTools → tab **Computed** → check 1-2 thuộc tính chính
- [ ] Test 3 viewport (phone 390px / tablet 820px / desktop 1440px)
- [ ] Resize browser kiểm tra responsive
- [ ] Accessibility check (touch target ≥44px cho người lớn, ≥60px cho trẻ con)

**Format báo cáo**:

```markdown
## ✅ XONG: [Tên thay đổi]

📁 **Files đã sửa**: [list]

🔧 **Thay đổi cụ thể**:
[Bảng before/after]

🎯 **Reference**: Học hỏi [Big Tech app] pattern X
📚 **Kỹ thuật**: [Tên kỹ thuật từ memory] - chương Y

⚠️ **Trade-off**: [explicit]

🧪 **HƯỚNG DẪN TEST**:
[Theo template `/0-gate` post-phase test guide]
```

---

## 🏆 BIG TECH UX PRINCIPLES (đút kết — luôn cân nhắc)

### 🍎 Apple Design Philosophy
- **Generous whitespace** (spacing > content density)
- **Hairline borders** (#E5E7EB, 1px subtle)
- **Subtle shadows** (offset Y > X, mờ lớn → ánh sáng mềm)
- **Smooth ease-out animations** (tự nhiên giống vật lý)
- **System fonts** (SF Pro) — readable, native
- **Touch target ≥44pt** (iOS HIG)

### 💳 Stripe Clean Style  
- **Limited color palette** (3-5 màu max + neutrals)
- **Hierarchy via size + weight** (KHÔNG dùng nhiều màu)
- **Clean grids** (8px base unit)
- **Subtle interactions** (hover scale 1.02, không lố)

### 📐 Linear Density Master
- **Dense yet readable** (12-14px font, 1.5 line-height)
- **Keyboard-first** (mọi action có shortcut)
- **Subtle motion** (200ms ease-out)
- **Dark mode native** (#1A1A1A, không pure black)

### 💬 Discord Multi-Sidebar
- **Workspace switcher 80px** (small, icons only)
- **Channel list 240-280px** (medium, with text)
- **Main 1fr** (large, content focus)
- **Right panel optional** (collapsible)

### 👶 Khan Academy Kids / Duolingo (cho UI Học Sinh IruKa)
- **BIG touch targets ≥60px** (trẻ ngón tay to)
- **VIBRANT but BALANCED** colors (≥3 màu primary chính)
- **CONSISTENT mascot/character** (xuất hiện ở mọi screen)
- **CLEAR progress feedback** (stars, levels, animations)
- **POSITIVE reinforcement** (celebration khi đúng, NEVER scold)
- **Simple, large fonts** (16-18px min, font-weight bold)
- **Avoid clutter** (1 hành động chính/màn hình)

---

## 🚫 ANTI-PATTERNS (KHÔNG được làm)

1. ❌ **"Code đại 1 phương án" rồi gửi user** → phải đề xuất 2-3 option
2. ❌ **Không reference Big Tech** → bị mất "đẳng cấp pro"
3. ❌ **Dùng Tailwind arbitrary cho color/size lẻ** (`text-[#FB923C]`, `text-[12.5px]`) → vi phạm L-38
4. ❌ **Báo "done" mà chưa verify DevTools** → có thể CSS không build
5. ❌ **Sửa lan ngoài scope** → mất kiểm soát
6. ❌ **Không cân nhắc trade-off** → user không biết ưu/nhược

---

## 📚 TÀI LIỆU LIÊN QUAN

- `.agent/memory/frontend-layout-techniques.md` — 14 chương kỹ thuật chi tiết
- `.agent/memory/lessons-learned.md` L-38 — Inline style vs Tailwind arbitrary
- `.agent/workflows/4-frontend-mockup-fidelity.md` — Khi đắp UI từ mockup
- `.agent/workflows/4-code-frontend.md` — Khi code component mới
- `.agent/workflows/6-fix-bug.md` — Khi fix bug

---

## 💡 VÍ DỤ THỰC TẾ

### Ví dụ 1: User nói "cho slot sticker cân đối hơn"

**Phân tích**:
- Loại: Sizing + Responsive
- Big Tech ref: Lingokids (card 3:2), Duolingo (sticker collection)
- Kỹ thuật: Ch.4 (Container Queries) + Ch.3 (clamp)

**Đề xuất**:
```
A. Mọi viewport dùng cqi cố định 55% slot — học Lingokids
   ✅ Đơn giản, tỉ lệ thống nhất
   ❌ Trên slot rất nhỏ có thể không rõ

B. clamp(min, cqi, max) — học Duolingo
   ✅ Min ensure visible, max prevent oversize
   ❌ Phức tạp hơn

C. Tỉ lệ khác nhau mỗi viewport — match mockup chính xác
   ✅ Khớp mockup 100%
   ❌ Khi resize giữa viewport có "jump"
```

### Ví dụ 2: User nói "fit chiều ngang phone"

**Phân tích**:
- Loại: Responsive + Sizing
- Big Tech ref: Instagram, TikTok (full-width)
- Kỹ thuật: Ch.9 (responsive) + Ch.4 (container query)

**Đề xuất**:
```
A. width: calc(100% - 28px) — học Instagram
   ✅ Có 14px margin 2 bên, fit mọi phone width
   ❌ Không cap max

B. max-width: 400px + mx-auto — học Stripe Mobile
   ✅ Đẹp trên tablet too (centered)
   ❌ Có thể không fit 100% phone Pro Max

C. Container query với phone breakpoint — học Linear
   ✅ Adapt theo container
   ❌ Phức tạp, overkill cho phone đơn giản
```

---

_File này: `.agent/workflows/4-refine-ui-pro.md`_
_Tạo: 2026-05-14 | IruKa Workspace_
_Tác giả: Claude Opus 4.7 (1M context) — sau khi học từ feedback Mr Đào về UI tinh chỉnh_
