---
description: Audit chuyển đổi GIỮA các màn hình trong app — đảm bảo UI/UX/Logic liên thông đồng nhất, trẻ em qua lại các tab/nút THUẬN TIỆN, KHÔNG ĐỨT MẠCH. Dùng sau khi code 1 tính năng chéo nhiều màn, hoặc khi nghi ngờ các tab không khớp nhau.
---

// turbo-all

Audit chuyển đổi cross-screen phải xét: TRẺ EM bấm 1 nút ở tab A → sang tab B → cảm nhận "vẫn 1 app" hay "lạc sang app khác".

## 🎯 PHẠM VI AUDIT

Khi tag workflow này, anh chỉ rõ scope: 2 hoặc nhiều màn liên quan (vd `/learn/today ↔ /missions`, `/missions ↔ /achievements`, `/parent/home ↔ /learn/today`). Nếu không chỉ rõ → AI tự liệt kê toàn bộ tab có thể chuyển qua lại + audit từng cặp.

## 🧰 QUY TRÌNH 6 BƯỚC

### Bước 1 — Liệt kê màn hình trong scope

Lập bảng tổng quan:

| # | Route | File page | Layout viewport | Sidebar dùng | Header dùng | Bottom nav |
|---|---|---|---|---|---|---|
| ... |

→ Phát hiện ngay: tab nào dùng Sidebar khác, layout khác → highlight.

### Bước 2 — Map matrix 12 thành phần shared

Bắt buộc check 12 thành phần sau xem các tab có dùng CÙNG source hay tạo bản copy:

| # | Element | Single source | Tab A dùng | Tab B dùng | Đồng nhất? |
|---|---|---|---|---|---|
| 1 | Logo | `/images/illustrations/Logo.svg` | ... | ... | ✅/❌ |
| 2 | Avatar component | `<img src={fullURL} ...>` pattern | ... | ... | |
| 3 | Tên bé fallback | `nickname → full_name → name → 'Bé'` | | | |
| 4 | Tuổi label | `getAgeBandLabel(getAgeBandId(birth_date))` | | | |
| 5 | Subject icon + name | `SUBJECT_DISPLAY[id]` | | | |
| 6 | Nav items | `NAV_TABS` const | | | |
| 7 | Tab active detection | `useActiveTab()` | | | |
| 8 | Sidebar layout | `features/learn/layouts/desktop|tablet/...` | | | |
| 9 | Profile overlay | `useEngagementStore.openProfileOverlay` | | | |
| 10 | Subject dropdown | `useEngagementStore.toggleSubjectDropdown` HOẶC sidebar inline | | | |
| 11 | Color tokens | Ocean `#04A4FF/#0077CC`, Star `#FFC83D/#FFAA00` | | | |
| 12 | Loading/Error UI | Spinner ocean + Vietnamese message | | | |

### Bước 3 — Kiểm tra state đồng bộ Zustand

| State | Store | Dùng đúng ở tab A? | Dùng đúng ở tab B? | Reactive khi đổi? |
|---|---|---|---|---|
| `currentChild` | `useChildStore` | | | |
| `currentSubject` | `useChildStore` | | | |
| `learnSessionId` | `useLearnSessionStore` | | | |
| `activeSubTab` | `useEngagementStore` (nếu có) | | | |
| `celebrationQueue` | `useEngagementStore` | | | |

Edge case: tab A đổi subject → tab B remount có thấy subject mới ngay? (subjectId vào queryKey TanStack Query đúng cách).

### Bước 4 — Trace từng nút chuyển tab

Liệt kê MỌI nút có thể bấm để chuyển sang tab khác. Mỗi nút phải có 4 cột:

| # | Vị trí | Hành động | Target route | Param truyền | Behavior khi quay lại | Status |
|---|---|---|---|---|---|---|
| 1 | Bottom nav "Học liệu" | Click | `/learn/today` | (none) | Giữ subject | |
| 2 | Sidebar "TIẾP TỤC" | Click | `/learn/today?autoStart=X&subject=Y` | autoStart + subject | Auto vào bài | |
| 3 | Hero CTA "Chơi" | Click | `play_url` | gameId, sessionId | (Game route) | |
| ... |

Báo ❌ nếu:
- Quên truyền subject → user về tab khác bị reset.
- Click `Resume` không tự `autoStart` lesson.
- Nút có cùng action ở 2 tab nhưng dẫn 2 nơi khác.

### Bước 5 — Test journey thực tế (5 luồng tối thiểu)

Liệt kê 5 luồng phổ biến nhất của trẻ + check end-to-end:

1. **Bé vào app lần đầu** → onboarding → learn/today → missions → achievements (xem có nhớ progress không)
2. **Bé học dở bài** → tab Nhiệm vụ (Resume CTA phải hiện) → click → quay lại đúng bài
3. **Bé đổi môn ở tab Học liệu** → chuyển sang tab Nhiệm vụ → môn vẫn đúng
4. **Bé tap avatar ở tab Phone/Tablet/Desktop** → ProfileOverlay shared mở cùng UI + cùng data
5. **Phụ huynh chuyển trang Quản lý bé** → quay về tab bé → subject + progress giữ nguyên

Mỗi luồng có bảng:

| Step | Hành động | Kỳ vọng | Thực tế | Status |
|---|---|---|---|---|

### Bước 6 — Scoring report

Tổng kết 1 trang:

```markdown
## SCORE: <%>/100

### Tổng quan
- Pixel consistency: <%> ✅/⚠️/❌
- State sync: <%> 
- Navigation flow: <%> 
- Brand/UI tokens: <%> 
- Touch & UX cho trẻ: <%>

### Gap CRITICAL (auto-block release)
- [ ] ...

### Gap HIGH (sprint hiện tại)
- [ ] ...

### Gap MEDIUM/LOW (backlog)
- [ ] ...

### Đề xuất fix (cùng file:line)
| # | Vấn đề | File:Line | Mức độ | Phương án |
|---|---|---|---|---|

### Kết luận
✅ "1 app" hay ❌ "nhiều app lồng vào nhau"?
```

## 🚨 ĐIỀU KIỆN THẤT BẠI

- Thiếu bảng matrix 12 thành phần shared — **REJECT**.
- Không trace từng nút chuyển tab — **REJECT**.
- Không test 5 journey end-to-end — **REJECT**.
- Đề xuất fix không có `file:line` — **REJECT**.
- Không có scoring final (% / 100) — **REJECT**.

## 📚 CASE HISTORY (tham chiếu cho lần audit tiếp)

- **Case 2026-05-13** (`/missions` sidebar): em đã tạo Sidebar Tablet/Desktop RIÊNG trong `engagement/components/` thay vì reuse `features/learn/layouts/`. Logo emoji 🐬 thay vì SVG IruKa; width 252px thay vì 280px; meta line "Bé đang học" rỗng. → Fix: REUSE thẳng `learn/layouts/desktop|tablet/Sidebar`, xoá bản copy.
- **Case 2026-05-13** (Rules of Hooks): `useCallback handleResume` đặt sau early-return → React báo "change in the order of Hooks". → Fix: di chuyển TẤT CẢ hook lên TRƯỚC mọi `if (...) return`.

## 🎯 MỤC TIÊU CUỐI

Sau khi anh đọc report, anh phải biết NGAY:
- Tab nào ĐÃ liên thông tốt.
- Tab nào CÒN đứt mạch — đứt ở chỗ nào (file:line cụ thể).
- Fix theo Plan A / B / C / D nào (em đề xuất kèm).
- Sau fix, trẻ em sẽ "cảm thấy 1 app" hay không.

> Quy tắc thumb cho mọi audit: **Đặt mình vào vị trí trẻ 4 tuổi đang cầm iPad — bé bấm 5 nút bất kỳ, có thấy luồng mượt như xem cuốn sách lật trang hay không?**
