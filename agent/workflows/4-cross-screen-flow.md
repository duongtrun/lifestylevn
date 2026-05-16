---
description: Khi code 1 màn hình mới HOẶC sửa màn hình hiện có — đảm bảo UI/UX/Logic liên thông đồng nhất với các màn khác. Trẻ em qua lại giữa các nút/tab/màn THUẬN TIỆN, KHÔNG ĐỨT MẠCH, KHÔNG CỞI ĐỒ THAY 1 BỘ MỚI Ở MỖI MÀN.
---

// turbo-all

Khi tag workflow này, AI agent PHẢI tuân theo NGUYÊN TẮC "MỘT APP — KHÔNG NHIỀU APP" — toàn bộ các màn hình trong iruka-app (Học liệu / Nhiệm vụ / Thành tích / Phụ huynh / Game / Profile / Onboarding ...) phải nhìn, cảm, hành xử như 1 sản phẩm duy nhất.

## 🎯 TRIẾT LÝ CỐT LÕI

> Trẻ em không biết "đây là route /missions, kia là /learn/today" — chúng chỉ thấy "App IruKa". Khi đổi từ tab Học liệu sang tab Nhiệm vụ, KHÔNG được phép thấy:
>   • Logo khác.
>   • Tên bé khác (Mai Phương ↔ Bé).
>   • Sidebar màu khác.
>   • Subject đang chọn khác.
>   • Nav items khác thứ tự.
>   • Quay lại bị reset state.

## 🔒 6 NHÓM RÀNG BUỘC BẮT BUỘC

### 1. State đồng bộ (Zustand single source of truth)

✅ PHẢI:
- `currentChild` đọc từ `useChildStore` — TẤT CẢ màn dùng chung
- `currentSubject` đọc từ `useChildStore.use.currentSubject()` — đổi 1 màn → các màn khác cập nhật reactive
- `learnSessionId` từ `useLearnSessionStore` — KHÔNG tạo session riêng cho từng màn
- `activeSubTab` / overlay flags từ `useEngagementStore` — KHÔNG state local riêng

❌ KHÔNG:
- Tự `useState` để lưu childId / subjectId / sessionId trong 1 màn
- Hardcode tên bé / avatar / subject thay vì đọc store
- Bỏ qua persist hydration → redirect sớm khi store chưa load

### 2. Component shared (KHÔNG copy-paste)

✅ PHẢI tận dụng (priority order):
1. **Check trước** ở `features/learn/layouts/desktop|tablet/` (`TabletSidebar`, `DesktopSidebar`, `DesktopRightPanel`, `TabletBottomNav`) — đây là **mẫu vàng** đã có sẵn cho mọi tab.
2. Nếu CHƯA có → tạo trong `features/<feature>/components/shared/` và export để các tab khác reuse.
3. Avatar / Logo / Subject pill / Profile button → bắt buộc đồng nhất giữa các tab.

❌ KHÔNG:
- Tạo `MissionsSidebar` / `LearnSidebar` / `AchievementSidebar` riêng cho mỗi tab.
- Hardcode logo 🐬 emoji ở 1 tab và `<Image src="/Logo.svg" />` ở tab khác.
- Tự viết Nav items list ở mỗi tab → phải import từ `features/learn/nav-tabs.ts` (`NAV_TABS` single source).

### 3. Navigation đồng nhất

✅ PHẢI:
- Mọi nav item dùng `NAV_TABS` const từ `features/learn/nav-tabs.ts`
- Tab active detect bằng `useActiveTab()` hook (`features/learn/hooks/useActiveTab.ts`)
- Bottom nav (Phone/Tablet) = Sidebar nav (Desktop) — cùng 4 tab, cùng thứ tự, cùng href
- Click `Tiếp tục bài học dở` ở tab Nhiệm vụ → router.push `/learn/today?autoStart=lessonId&subject=X` (giữ subject context)
- Click avatar → mở **cùng 1** `ProfileOverlay` (KHÔNG mỗi tab 1 popup khác)
- Click subject pill → mở **cùng 1** `SubjectDropdown` (Phone) HOẶC click inline subject ở sidebar (Tablet/Desktop) → cùng action `setCurrentSubject`

❌ KHÔNG:
- Tự kiểm `pathname.startsWith('/missions')` để gán active → dùng `useActiveTab` thay
- Quên truyền `subject` qua URL khi navigate → user về `/learn/today` mất subject
- Tự viết nav items hardcode → khi sản phẩm đổi 1 route, miss tab

### 4. UI Tokens đồng nhất (Brand consistency)

✅ PHẢI giống nhau giữa các màn:
- **Logo IruKa**: `<Image src="/images/illustrations/Logo.svg" width={220} height={70} />` — không emoji 🐬 + text
- **Avatar**: full URL từ `child.avatar?.startsWith('http') ? avatar : ${CDN_BASE}${avatar}`. Fallback `/images/avatars/Girl.svg`
- **Tên bé**: pattern fallback `nickname ?? full_name ?? name ?? 'Bé'`
- **Tuổi**: `getAgeBandLabel(getAgeBandId(child.birth_date))` từ `features/learn/learn.utils`
- **Tên môn**: `SUBJECT_DISPLAY[subjectId].name` (NEVER hardcode "Tiếng Việt")
- **Màu ocean**: `#04A4FF` (light) → `#0077CC` (dark) — KHÔNG tự pick hex khác
- **Star gold**: `linear-gradient(135deg, #FFC83D, #FFAA00)` 
- **Border radius**: rounded-xl (12px) cho card, rounded-2xl (16px) cho section, rounded-full cho pill
- **Font weight**: extrabold (800) cho tên / black (900) cho heading
- **Pulse-dot animation**: 2s ease-in-out infinite (giống mọi nơi)

### 5. Logic transition trơn tru

✅ PHẢI:
- **Resume CTA**: bài đang dở phải hiện được ở MỌI tab có sidebar (Tablet/Desktop). Click → giữ `subject` + `autoStart` lesson_id.
- **Subject switch**: đổi môn ở 1 tab → tab khác tự cập nhật queryKey reactive → refetch đúng dữ liệu mới
- **Profile overlay**: từ bất kỳ avatar (Phone header / Tablet sidebar / Desktop sidebar) → mở cùng 1 overlay full-screen, cùng data
- **Loading state**: spinner ocean #04A4FF + text "Đang chuẩn bị..." — đồng nhất mọi tab
- **Error state**: header ⚠️ + message BE + nút "Thử lại" — đồng nhất
- **Back button**: phải về đúng tab trước, không reset đến root

### 6. Touch + accessibility cho trẻ em

✅ PHẢI:
- Mọi button / nav item / card tap target ≥ 44×44px (tay trẻ nhỏ)
- Active state có feedback (scale-95 / bg-white-20 / ring-2)
- Active animation < 200ms (trẻ không kiên nhẫn chờ)
- Text contrast WCAG AA (xanh ocean → trắng có contrast 4.5:1)
- Icon + label đi kèm (không icon-only — trẻ chưa đọc giỏi vẫn nhận icon)

## 🧰 CHECKLIST 18 ĐIỂM TRƯỚC KHI COMMIT

Trước khi gửi diff, AI phải tự rà đủ 18 điểm sau. KHÔNG đủ → KHÔNG commit.

| # | Mục | OK? |
|---|---|---|
| 1 | `currentChild` đọc từ `useChildStore` (không hardcode/local state) | ☐ |
| 2 | `currentSubject` đọc từ `useChildStore` + có subject fallback | ☐ |
| 3 | `learnSessionId` đọc từ `useLearnSessionStore` (không tạo session riêng) | ☐ |
| 4 | Tên bé dùng pattern `nickname → full_name → name → 'Bé'` | ☐ |
| 5 | Avatar URL có CDN_BASE fallback | ☐ |
| 6 | Logo dùng `Logo.svg` (không emoji) | ☐ |
| 7 | Tên môn từ `SUBJECT_DISPLAY[id].name` | ☐ |
| 8 | Tuổi từ `getAgeBandLabel(getAgeBandId(birth_date))` | ☐ |
| 9 | Nav items import từ `NAV_TABS` (không hardcode) | ☐ |
| 10 | Tab active detect bằng `useActiveTab()` | ☐ |
| 11 | Sidebar/Header REUSE từ `features/learn/layouts/` (Tablet/Desktop) | ☐ |
| 12 | Click avatar → `useEngagementStore.openProfileOverlay` (shared overlay) | ☐ |
| 13 | Click subject inline → `setCurrentSubject` (KHÔNG state local) | ☐ |
| 14 | Resume CTA giữ subject context khi navigate | ☐ |
| 15 | Loading/Error UI dùng spinner ocean + message Việt | ☐ |
| 16 | Touch target ≥ 44px, có active feedback | ☐ |
| 17 | Hook PHẢI gọi TRƯỚC mọi early-return (Rules of Hooks) | ☐ |
| 18 | Hard reload `/missions` + 3 tab khác → KHÔNG có lỗi đỏ console | ☐ |

## 🚨 ĐIỀU KIỆN THẤT BẠI (auto-reject)

- Tự tạo Sidebar riêng cho 1 tab thay vì reuse — **REJECT**.
- Hardcode tên bé / subject thay vì đọc store — **REJECT**.
- Quên truyền subject param khi navigate sang tab khác — **REJECT**.
- Logo / màu / font khác giữa các tab — **REJECT**.
- Test thủ công thấy "nháy" tên/avatar/môn khi chuyển tab — **REJECT**.
- Console có lỗi React "change in the order of Hooks" — **REJECT**.

## 🎯 MỤC TIÊU CUỐI

Sau khi AI code xong 1 màn theo workflow này, bé/phụ huynh:

- **KHÔNG thấy** khác biệt branding giữa các tab.
- **KHÔNG mất** subject đang chọn khi chuyển tab.
- **KHÔNG bị bắt** click thêm 1-2 nút thừa để vào lại bài học dở.
- **NHẬN RA** ngay đây là 1 sản phẩm (không phải 4 sản phẩm khác nhau lồng vào).

> Quy tắc thumb: **Trẻ em chuyển tab xong vẫn cảm thấy "vẫn đang ở app IruKa" — không phải "lạc sang app khác".**
