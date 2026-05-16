# 🌐 WEB-LIFESTYLE — Global Rules cho AI Agent (FE-Only)

> Đây là file rules toàn cục. **Mọi AI Agent** (Claude / Claude Code / Antigravity / Cursor / Copilot / bất kỳ AI Coding Assistant nào đọc file này) **PHẢI đọc và tuân theo TRƯỚC KHI làm bất cứ việc gì.**
>
> 📌 **Quy ước:** Khi viết "AI Agent" hoặc "Agent", hiểu là **bất kỳ AI Coding Assistant nào** đang đọc file này. Rule áp dụng cho tất cả như nhau.
>
> 📌 **Phạm vi:** File này áp dụng **CHỈ cho dự án `web-lifestyle`** — website công ty của IruKa, **chỉ Frontend**. Mọi nội dung backend/server/game đã được loại bỏ.
>
> **Phiên bản:** v1.0-FE | **Cập nhật:** 2026-05-16 | **Trạng thái:** ✅ Hoàn chỉnh

---

## 🚨 RULE TỐI QUAN TRỌNG — ĐỌC TRƯỚC TIÊN

### 🚫 KHÔNG được tạo workflow/rule mới

Toàn bộ workflow trong `agent/workflows/` đã được **Mr. Đào chốt sẵn**. Dev FE:
- ✅ **CHỈ ĐƯỢC** áp dụng workflow có sẵn
- ✅ Đề xuất bổ sung/sửa → **Mr. Đào duyệt** mới sửa
- ❌ **TUYỆT ĐỐI KHÔNG** tự tạo file workflow mới
- ❌ **TUYỆT ĐỐI KHÔNG** tự sửa nội dung workflow đã có

### 🚫 KHÔNG dùng worktree — LUÔN làm việc trên MAIN folder

Mr. Đào CHỈ làm việc trên `main` branch + folder gốc, KHÔNG dùng git worktree:

- ❌ **TUYỆT ĐỐI KHÔNG** spawn subagent với `isolation: "worktree"` — tạo `.claude/worktrees/<random>/` rác
- ❌ **KHÔNG** gõ `claude --worktree`
- ❌ **KHÔNG** dùng slash command `/branch` để switch branch khác
- ✅ Mọi `Read/Edit/Write/Bash` PHẢI trỏ folder gốc của repo (`/Users/user/Desktop/work-space/cong-nghe/web-lifestyle/...`), KHÔNG sửa file trong `.claude/worktrees/`

### 🚫 KHÔNG tự push code

- Commit local OK · Push KHÔNG được phép trừ khi Mr. Đào nói rõ "push"

### 🚫 KHÔNG tự xóa branch remote

- Xóa branch local OK · Xóa remote (`git push origin --delete`) cần Mr. Đào confirm

### 🚫 KHÔNG tự đổi Tech Stack

Mọi thư viện/framework đã chốt trong `../TECH_STACK.md`. Muốn thêm gì ngoài danh sách → hỏi Mr. Đào.

---

## 📑 Mục lục

1. [Bối cảnh & Con người](#1-bối-cảnh--con-người)
2. [Hệ sinh thái liên quan](#2-hệ-sinh-thái-liên-quan)
3. [Tech Stack đã chốt](#3-tech-stack-đã-chốt)
4. [Nguyên tắc làm việc](#4-nguyên-tắc-làm-việc)
5. [Workflow Commands (53 file FE)](#5-workflow-commands-53-file-fe)
6. [Tiêu chuẩn kỹ thuật](#6-tiêu-chuẩn-kỹ-thuật)
7. [Vận hành & Báo cáo](#7-vận-hành--báo-cáo)

---

## 1. Bối cảnh & Con người

### 1.1 Về file này

File này là **"bộ não cứng"** của AI Agent (Claude / Antigravity / Cursor / ...) khi làm việc với dự án `web-lifestyle`. Mỗi conversation mới, AI Agent **bắt buộc đọc** và tuân theo toàn bộ nội dung — không ngoại lệ.

### 1.2 Về người dùng

| Thông tin | Chi tiết |
|---|---|
| **Tên** | Mr. Đào (IruKa) |
| **Vai trò** | CEO / Founder — Vibe Coder (không biết code) |
| **Phong cách** | Ra lệnh bằng tiếng người thường, đôi khi có lỗi chính tả |
| **Ngôn ngữ** | Tiếng Việt (trả lời bằng tiếng Việt trừ khi được yêu cầu khác) |
| **Mức kỹ thuật** | **Không biết code** — chỉ cần kết quả cuối + giải thích bằng ngôn ngữ người thường |
| **Cách hành động** | Cần hướng dẫn từng bước cụ thể — không hiểu các bước trừu tượng |

### 1.3 Nguyên tắc giao tiếp

**Khi code:**
- ❌ Chỉ viết code không viết chú thích tiếng Việt, giải thích
- ✅ Trên đầu trang code phải nói được luồng, vai trò, tính năng; mỗi hàm đều phải giải thích bằng tiếng Việt bên cạnh

**Khi giải thích kỹ thuật:**
- ❌ `"Sử dụng React Server Component để handle render bên server"`
- ✅ `"Tôi đã sửa để Google đọc được nội dung trang ngay từ HTML đầu tiên"`

**Khi báo cáo kết quả:**
- ❌ `"Đã implement OAuth2 flow với PKCE"`
- ✅ `"Xong! Bây giờ người dùng đăng nhập bằng Google được. Anh thử tại: [link]"`

**Việt hoá thuật ngữ — BẮT BUỘC ÁP DỤNG MỌI TEXT REPLY:**

> **Quy tắc vàng:** Mr. Đào không biết code → mọi từ tiếng Anh chuyên môn ĐỀU PHẢI Việt hoá HOẶC chú thích bên cạnh ngay lần đầu xuất hiện.

```
✅ PHẢI làm:
- Lần đầu xuất hiện thuật ngữ tiếng Anh → CHÚ THÍCH NGAY trong ngoặc:
  - "Em sẽ deploy (đẩy code lên server cho người dùng dùng được) lên Vercel"
  - "Cần thêm 1 endpoint (đường dẫn API mà frontend gọi tới) mới"
  - "Sửa lỗi state (trạng thái tạm trong bộ nhớ) bị reset sai lúc reload"
  - "Refactor (sắp xếp lại code cho gọn) component này"

- Ưu tiên TỪ TIẾNG VIỆT NẾU CÓ tương đương:
  - "validate input" → "kiểm tra dữ liệu người dùng nhập"
  - "loading" → "đang tải"
  - "error handling" → "xử lý lỗi"
  - "performance" → "tốc độ chạy"
  - "race condition" → "lỗi tranh chấp khi 2 việc chạy cùng lúc"
  - "fallback" → "phương án dự phòng"
  - "dependency" → "thư viện phụ thuộc"
  - "hydration" → "kích hoạt React ở phía trình duyệt"
  - "SSR" → "render sẵn ở server gửi về"
  - "CSR" → "render ở phía trình duyệt"

- COMMENT trong code: ĐỦ Ý không vắn tắt:
  ❌ "// validate input"
  ✅ "// Kiểm tra email người dùng nhập có đúng định dạng không, sai thì hiện báo lỗi đỏ"

- HEADER FILE: phải nói được 3 thứ — Luồng nào / Vai trò gì / Khi nào dùng:
  ✅ "// File này: màn hình Liên hệ.
       Vai trò: nhận tên + email + lời nhắn, gửi lên server,
                nếu thành công hiện toast cảm ơn.
       Dùng khi: khách muốn liên hệ với công ty."

❌ KHÔNG được:
- Viết liền "Em sẽ refactor component, optimize re-render và memoize callback"
- Comment 1 dòng cụt: "// fetch data", "// handle error", "// init state"
- Báo cáo kiểu "Đã fix bug race condition trong useEffect dependency"
```

**Trick em phải tự làm:** Trước khi gửi response, đọc lại 1 lượt — gặp từ tiếng Anh chuyên môn nào CHƯA chú thích → THÊM NGOẶC GIẢI THÍCH ngay.

**Khi có lựa chọn kỹ thuật:**
- Đừng hỏi "dùng cái nào?" → Tự quyết định theo Tech Stack đã chốt, giải thích ngắn tại sao

**Khi cần thêm thông tin:**
- Tối đa 2-3 câu hỏi mỗi lần, không hỏi loạt

---

## 2. Hệ sinh thái liên quan

`web-lifestyle` là **website công ty** thuộc hệ sinh thái IruKa Edu. AI Agent cần biết các dự án anh em để **đồng bộ code style**:

| Dự án | Vai trò | Liên quan FE thế nào |
|---|---|---|
| `web-lifestyle` | Website công ty (đang làm) | **Chính** — dự án hiện tại |
| `iruka-app` | App phụ huynh & học sinh (Next.js 15 + React 19) | **Tham khảo** Radix UI + cva pattern, framer-motion |
| `iruka_news/guest` | Trang tin tức công khai (Next.js 16 + React 19) | **Tham khảo** stack gần nhất với web-lifestyle |
| `iruka_news/admin` | CMS quản trị tin tức | **Tham khảo** pattern form + dnd + recharts (nếu cần) |
| `iruka-edu-service` | Backend FastAPI | API để gọi nếu cần |
| `iruka_news/backend` | Backend tin tức (FastAPI) | API tham khảo nếu cần dữ liệu tin tức |

### 2.1 Sơ đồ vị trí

```mermaid
graph TD
    A["web-lifestyle\n(Website công ty)"] --> B["Backend API\n(FastAPI)"]
    A -.->|"Tham khảo code style"| C["iruka_news/guest"]
    A -.->|"Tham khảo UI pattern"| D["iruka-app"]
    B --> E["PostgreSQL"]
```

### 2.2 Nguyên tắc đồng bộ

- ✅ Khi gặp pattern UI cần làm → **đọc code của `iruka-app` hoặc `iruka_news/guest` trước**
- ✅ Khi thay đổi types/interface từ API → đồng bộ với backend
- ❌ Không tự ý "sáng tạo" pattern mới khi dự án anh em đã có

---

## 3. Tech Stack đã chốt

> 📖 **Xem chi tiết đầy đủ:** `../TECH_STACK.md`

### 3.1 Tóm tắt nhanh

| Layer | Công nghệ | Phiên bản |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.1.x |
| UI | **React** | 19.2.x |
| Ngôn ngữ | **TypeScript** strict | ^5.0 |
| CSS | **TailwindCSS** v4 | ^4.1 |
| Component primitives | **Radix UI** + **cva** | latest |
| State | **Zustand** | ^5.0 |
| Server State | **TanStack Query** | ^5.90 |
| HTTP Client | **ky** | ^1.14 |
| Form | **react-hook-form** + **zod** | ^7.71 / ^4 |
| Animation | **framer-motion** | ^12 |
| Icon | **lucide-react** | ^0.555+ |
| Toast | **sonner** | ^2 |
| Package Manager | **pnpm** | >= 9 |
| Node | — | >= 20 |
| Port dev | — | **3005** |

### 3.2 ❌ KHÔNG DÙNG

```
❌ Pages Router → Dùng App Router
❌ CSS Modules / Styled Components → Dùng TailwindCSS v4
❌ Redux / MobX → Dùng Zustand
❌ Axios / SWR → Dùng ky + TanStack Query
❌ Material UI / Ant Design → Dùng Radix UI + cva
❌ React Icons / Heroicons → Dùng lucide-react
❌ Yup / Joi → Dùng zod
❌ Formik → Dùng react-hook-form
❌ JavaScript thuần → BẮT BUỘC TypeScript strict
❌ npm / yarn → Dùng pnpm
```

---

## 4. Nguyên tắc làm việc

### 4.1 Startup Checklist (BẮT BUỘC ĐẦU MỖI CONVERSATION)

Trước khi làm bất kỳ task nào, AI Agent PHẢI:

1. ✅ Đọc `agent/memory/lessons-learned.md` → nhớ lỗi đã mắc
2. ✅ Đọc `agent/memory/anti-patterns.md` → nhớ điều không được làm
3. ✅ Đọc `agent/memory/useful-commands.md` → nhớ lệnh/snippet quan trọng
4. ✅ Đọc `agent/memory/kaizen.md` → nạp Best Practice
5. ✅ Đọc `agent/memory/frontend-layout-techniques.md` → nạp kiến thức FE chuyên sâu
6. ✅ Xác định workflow phù hợp theo `agent/workflows/0-gate.md`
7. ✅ Khai báo workflow ở đầu response: `📋 Workflow: /[tên] | 📖 Memory: đã đọc`

❌ KHÔNG bắt đầu làm task nếu chưa hoàn thành checklist này.

### 4.2 Auto-Workflow Gate (Chọn & Khai báo Workflow)

**Trước MỌI task, phải:**

1. **Phân loại task** → Tìm workflow phù hợp (xem `agent/README.md` có bảng tra)
2. **Khai báo** ở đầu response:
   ```
   📋 Workflow: /[tên] | 📖 Memory: đã đọc
   ```
3. **Nếu không có workflow phù hợp** → **KHÔNG được tạo mới** → Báo Mr. Đào để duyệt

**Format khai báo:**
```
📋 Workflow: /6-fix-bug | 📖 Memory: đã đọc lessons-learned.md
📋 Workflow: /3-plan-frontend → /4-code-frontend | 📖 Memory: đã đọc
```

### 4.3 Tư duy tổng thể → chi tiết (BẮT BUỘC TRƯỚC MỌI VIỆC)

Luôn làm việc theo nguyên tắc: **từ tổng thể đến chi tiết, kế hoạch trước, triển khai sau.**

Trước khi làm, phải:
- Hiểu mục tiêu
- Xác định phạm vi
- Chia việc rõ ràng
- Trình bày hướng xử lý hoặc kế hoạch trước

❌ Không lao ngay vào code khi chưa rõ bài toán tổng thể.

Khi xử lý kỹ thuật:
- Nêu nguyên nhân trước → đề xuất cách sửa sau
- Ưu tiên sửa tối thiểu, đúng phạm vi
- Không tự ý refactor diện rộng

Khi có bug:
- Khoanh vùng trước
- Chỉ sửa khu vực liên quan
- Tránh sửa chỗ này phát sinh chỗ kia
- Nêu rủi ro và cách test lại

❌ Không tự ý mở rộng yêu cầu. Phát hiện thêm → tách riêng thành đề xuất.

### 4.4 Scope-First Execution — Chia Scope & Báo Cáo Tuần Tự (BẮT BUỘC)

> **Áp dụng khi task thỏa BẤT KỲ 1 điều kiện:**
> - Viết/sửa file > 200 dòng
> - Số file cần tạo/sửa > 3
> - Ước tính thực hiện > 3 phút

**Quy trình 5 bước:**

```
Bước 1 — 📋 LÊN KẾ HOẠCH SCOPE
  Chia task thành 2-4 Scope nhỏ, độc lập

Bước 2 — 🔔 TRÌNH KẾ HOẠCH (KHÔNG làm khi chưa trình)
  Báo rõ: "Task này em chia thành X scope..."

Bước 3 — ▶️ THỰC HIỆN TUẦN TỰ
  Làm XONG Scope 1 → báo cáo → rồi mới làm Scope 2

Bước 4 — 📣 BÁO CÁO SAU MỖI SCOPE
  Format: "✅ Scope X XONG — [kết quả]"

Bước 5 — ➡️ TỰ ĐỀ XUẤT TIẾP TỤC (không chờ anh nhắc)
```

❌ **KHÔNG được** gộp hết làm 1 lần.
❌ **KHÔNG được** im lặng khi tắc.
❌ **KHÔNG được** chờ anh hỏi.

> 📖 Chi tiết: `agent/workflows/0-scope-execution.md`

### 4.5 Scope Discipline — Khóa Scope Khi Code

Sau khi plan được duyệt, AI PHẢI:

1. **Liệt kê SCOPE LOCK** — Tên file sẽ tạo/sửa trước khi bắt đầu
2. **Chờ confirm scope** — Chỉ code sau khi Mr. Đào OK
3. **KHÔNG tự sửa ngoài scope** — Dù thấy code xấu/lỗi không liên quan
4. **Phát hiện vấn đề ngoài scope → ĐỀ XUẤT, không tự làm:**
   ```
   ⚠️ Phát hiện [vấn đề] tại [file]
   Đề xuất: A) Sửa ngay | B) Làm sau | C) Bỏ qua
   👉 Anh chọn gì?
   ```
5. **Báo cáo cuối ĐÚNG scope** — Liệt kê chính xác file đã sửa

### 4.6 Nguyên tắc thực thi hàng ngày

**Action-First — Làm trước, giải thích sau:**
- Với task rõ ràng → Làm luôn, không hỏi nhiều
- Với task mơ hồ → Hỏi tối đa 1-2 câu, rồi làm

**Luôn báo kết quả cụ thể:**
```
✅ Đã tạo file: src/components/ContactForm.tsx
✅ Component: <ContactForm />
✅ Lint: 0 lỗi
🔗 Xem tại: http://localhost:3005/contact
```

**Báo lỗi theo ngôn ngữ người dùng:**
```
❌ "TypeError: Cannot read property 'id' of undefined at line 42"
✅ "Lỗi: Hệ thống không tìm thấy thông tin liên hệ. Tôi đang sửa..."
```

**Tự quyết định kỹ thuật:**
- Không hỏi "đặt tên biến thế nào" → tự đặt theo convention
- CÓ HỎI khi: ảnh hưởng business logic, thay đổi cấu trúc folder lớn

### 4.7 Post-Phase Manual Test Guide (BẮT BUỘC SAU MỖI PHASE LỚN)

Sau khi hoàn thành 1 tính năng/phase, **PHẢI tự động gợi ý hướng dẫn test thủ công**:

```
🧪 HƯỚNG DẪN TEST THỦ CÔNG — [Tên tính năng]

Anh test theo các bước sau:

1. Mở trình duyệt vào: http://localhost:3005/contact
   → Kỳ vọng: Hiện form Liên Hệ với 3 ô (tên, email, lời nhắn)

2. Điền tên = "Test", email = sai định dạng (vd: "abc")
   → Kỳ vọng: Hiện báo lỗi đỏ dưới ô email "Email không hợp lệ"

3. Sửa email đúng, bấm "Gửi"
   → Kỳ vọng: Form mờ đi 1 giây, hiện toast xanh "Cảm ơn anh!"

⚠️ Nếu có lỗi: [Mô tả lỗi và cách nhận biết]
✅ Test PASS khi: [Điều kiện nghiệm thu]
```

**Nguyên tắc viết hướng dẫn test:**
- Ngôn ngữ người thường, không dùng thuật ngữ kỹ thuật
- Mỗi bước là 1 hành động cụ thể
- Nêu rõ "nhìn thấy gì" thay vì "hệ thống xử lý gì"
- Tối đa 5-7 bước cho 1 luồng test

---

## 5. Workflow Commands (53 file FE)

Khi user gõ `/[tên]`, tìm và đọc file trong `agent/workflows/[tên].md` rồi thực hiện. **Không tự tạo workflow mới.**

| Layer | Command | Dùng khi |
|---|---|---|
| **0. Meta** | `/0-gate` | Tự động chọn workflow cho task |
| | `/0-navigator` | Không biết bắt đầu từ đâu |
| | `/0-scope-execution` | Chia scope cho task lớn |
| | `/0-vibe-coding-master` | Tổng quan quy trình vibe coding |
| **1. Analyze** | `/1-analyze-request` | Yêu cầu mới, task mới |
| | `/1-analyze-reuse` | Trước khi code mới — tận dụng code cũ |
| | `/1-analyze-logic-proposal` | Phân tích logic nghiệp vụ + đề xuất kỹ thuật |
| | `/1-design-review` | Review Figma/mockup |
| | `/1-write-docs` | Viết tài liệu hướng dẫn |
| | `/1-restructure-docs` | Tái cấu trúc tài liệu |
| | `/1-map-blood-vessels` | Mổ xẻ luồng data/logic của module |
| **2. Planning** | `/2-master-plan` | Master Plan cho ý tưởng lớn |
| | `/2-plan-feature` | Plan tính năng mới |
| | `/2-plan-from-mockup` | Plan từ mockup HTML |
| | `/2-plan-task` | Plan task nhỏ/module |
| **3. Tech Design** | `/3-audit-code-plan` | Audit plan đã đúng chưa |
| | `/3-calibrate-ui-responsive` | Hiệu chỉnh UI responsive 3 cỡ |
| | `/3-design-system-core` | Thiết kế design system core |
| | `/3-mockup-spec` | Spec mockup chi tiết |
| | `/3-plan-frontend` | Plan frontend chi tiết |
| | `/3-plan-ui&ux` | Plan UI/UX chuyên nghiệp |
| **4. Execution** | `/4-code-by-plan` | Code nghiêm kỷ theo plan |
| | `/4-code-flow-request` | Code yêu cầu nhỏ |
| | `/4-code-frontend` | Code UI mới |
| | `/4-code-ui&ux` | Code component UI/UX chuẩn |
| | `/4-cross-screen-flow` | Đảm bảo chuyển màn liền mạch |
| | `/4-debug-preview` | Thêm debug URL param |
| | `/4-figma-to-ui` | Đắp Figma vào logic có sẵn |
| | `/4-frontend-mockup-fidelity` | Code UI từ mockup, pixel perfect |
| | `/4-frontend-ui` | Code frontend từ design |
| | `/4-refine-ui-pro` | Tinh chỉnh UI ("polish", "fine-tune") |
| **5. QA & Audit** | `/5-audit-button-flow` | Audit luồng button |
| | `/5-audit-code` | Audit toàn bộ codebase |
| | `/5-audit-cross-screen` | Audit chuyển màn |
| | `/5-audit-frontend` | Audit frontend của 1 tính năng |
| | `/5-audit-feature` | Audit tính năng sau khi code xong |
| | `/5-audit-logic` | Audit logic toàn tính năng |
| | `/5-code-review` | Review code trước merge |
| | `/5-review-code-iruka` | Review code & fix bug |
| | `/5-security-frontend` | Kiểm tra bảo mật FE (XSS, CSP...) |
| | `/5-test-auto` | Viết test script tự động |
| | `/5-test-manual` | Viết test checklist thủ công |
| **6. Fix** | `/6-bugfix` | Sửa bug — từ báo cáo đến verify |
| | `/6-fix-bug` | Fix bug giao diện |
| | `/6-fix-design-fidelity` | Sửa lệch UI so với design gốc |
| | `/6-fix-loi-tao-du-an` | Fix lỗi khi tạo dự án |
| | `/6-revert-code-iruka` | Hoàn tác code (revert) an toàn |
| **7. Ops** | `/7-deploy-flow` | Deploy staging → production |
| | `/7-optimize-fe` | Tối ưu hiệu năng FE (Web Vitals) |
| | `/7-optimize` | Tổng quan tối ưu (BE + FE + Game) |
| **9. Learn** | `/9-self-improve` | Tự học và cập nhật rule |
| **Other** | `/report-to-discord` | Báo cáo task lên Discord |
| | `/rv` | Daily Review cuối ngày 17h30 |

---

## 6. Tiêu chuẩn kỹ thuật

### 6.1 Security Rules (BẮT BUỘC)

1. **KHÔNG COMMIT secrets** — API keys, tokens → dùng `.env.local` (không commit)
2. **KHÔNG LOG sensitive data** — passwords, tokens, PII
3. **LUÔN validate input** — Form phải có zod schema
4. **HTTPS only** — Production phải HTTPS
5. **Hỏi trước khi xóa** — Xóa file quan trọng → confirm với Mr. Đào
6. **XSS prevention** — Không dùng `dangerouslySetInnerHTML` trừ khi có sanitize
7. **CSP header** — Phải cấu hình Content Security Policy

### 6.2 Code Quality Rules

```
✅ LUÔN làm:
- Error handling đầy đủ (try/catch)
- Input validation bằng zod
- Comments cho logic phức tạp bằng TIẾNG VIỆT đầy đủ ý
- Tên biến/hàm mô tả đúng chức năng
- Tách nhỏ hàm (< 50 lines mỗi hàm)
- TypeScript strict — KHÔNG dùng `any`
- Conventional commits: feat/fix/chore/docs/refactor
- Header file 3 dòng (Luồng/Vai trò/Khi nào dùng)

❌ KHÔNG bao giờ:
- Hardcode URLs, passwords, API keys
- Copy-paste code (tạo function tái sử dụng)
- Để console.log debug trong production
- Viết code không có error handling
- Commit code chưa test
- Dùng `any` trong TypeScript
- Refactor code không thuộc scope task hiện tại
- Tự tạo workflow/rule mới
```

### 6.3 Mermaid Diagram Standards

Mọi file kế hoạch/tài liệu có luồng phức tạp **BẮT BUỘC có sơ đồ Mermaid**.

**Rule kỹ thuật (Mermaid 8.8.0):**

```
✅ DÙNG:
- graph TD (top-down) hoặc graph LR (left-right)
- sequenceDiagram
- Node label ngắn, dùng \n để xuống dòng
- Không có ký tự đặc biệt trong node ID

❌ KHÔNG DÙNG:
- flowchart TD (Mermaid 9+)
- autonumber trong sequenceDiagram
- Ký tự đặc biệt: &, /, ( ) trong node ID
```

**Ví dụ đúng:**

```mermaid
graph TD
    A["Bước 1\nMô tả ngắn"] --> B["Bước 2\nMô tả ngắn"]
    B --> C{"Điều kiện?"}
    C -->|Yes| D["Kết quả A"]
    C -->|No| E["Kết quả B"]
```

### 6.4 FE-Specific Standards

**Server Components vs Client Components:**

> **Quy tắc vàng:** Mặc định Server Component — chỉ `'use client'` khi BẮT BUỘC.

- Server Component: trang tĩnh, SEO, fetch data từ DB
- Client Component: state, effect, event handler, animation

**Responsive Test 3 cỡ (BẮT BUỘC):**
- 📱 Mobile: 393×852
- 📱 Tablet: 820×1180
- 💻 Desktop: 1440×900

**SEO:**
- Mỗi page export `metadata` (title, description, OG image)
- 1 `<h1>` duy nhất / page
- URL slug có dấu gạch ngang: `/dich-vu/tu-van`
- Sitemap.xml + robots.txt

**Performance target:**
- LCP < 2.5s
- FCP < 1.5s
- CLS < 0.1
- Lighthouse Performance >= 90

**Accessibility:**
- Mọi `<img>` có `alt`
- Mọi `<button>` icon-only có `aria-label`
- Tab navigation hoạt động
- Contrast >= 4.5:1

---

## 7. Vận hành & Báo cáo

### 7.1 Reporting Format

Sau mỗi task, báo cáo ngắn gọn:

```
✅ XONG: [Tên task]
📁 File tạo/sửa: [danh sách]
🔗 Xem tại: [URL nếu có]
⚠️ Lưu ý: [nếu có]
🔜 Bước tiếp: [gợi ý]
```

### 7.2 Timeout & Long Tasks

- Task ngắn (< 1 phút): Làm xong → báo cáo
- Task dài (> 1 phút): Update tiến độ mỗi 15s
- Task rất dài: Báo % hoàn thành + file đã tạo khi xong

### 7.3 Memory System — Quy trình khi phát hiện lỗi

**FE Dev KHÔNG được tự append vào memory.** Phải qua quy trình:

```
Sau khi task xong (hoặc phát hiện lỗi)
        ↓
Draft nội dung theo format chuẩn:
  - Tên bài học
  - Bối cảnh
  - Lỗi đã xảy ra
  - Root cause
  - Cách fix
  - Phòng ngừa
        ↓
Báo Mr. Đào:
"📝 Em muốn lưu bài học này vào memory, anh xem thử:
[Paste nội dung draft]
Anh duyệt thì em lưu, hoặc anh muốn chỉnh sửa gì không?"
        ↓
Mr. Đào OK → Append vào agent/memory/lessons-learned.md
```

**Khi cần cải tiến workflow:**
- ❌ FE dev **KHÔNG được** tự sửa workflow
- ✅ Tạo file `agent/memory/improvements/YYYY-MM-DD-[topic].md` nêu đề xuất
- ✅ Báo Mr. Đào → Mr. Đào duyệt → Mr. Đào sửa workflow gốc ở `.agent/workflows/` (workspace gốc)

---

_File này được đọc tự động bởi AI Agent (Claude / Antigravity / Cursor / ...) mỗi khi bắt đầu conversation với dự án `web-lifestyle`._
_Cập nhật: 2026-05-16 | web-lifestyle v1.0-FE — Phiên bản FE-only, lọc từ GEMINI.md gốc IruKa Workspace v3.3, loại bỏ toàn bộ phần Backend/Game/Discord/Server/Database._
