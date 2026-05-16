# 📚 Lessons Learned — IruKa AI Memory

> File này lưu các bài học từ lỗi thực tế trong quá trình làm việc.  
> **CHỈ ghi sau khi Mr. Đào duyệt. KHÔNG tự ghi mà chưa được duyệt.**

---

## Cách đọc file này

- Đọc từ trên xuống dưới trước mỗi task
- Ưu tiên các bài học có cùng domain với task đang làm
- Mỗi bài học có **Phòng ngừa** → áp dụng ngay

---

## 📋 Index

| ID | Tiêu đề | Domain | Ngày | Agent gây lỗi | Trạng thái |
|----|---------|--------|------|---------------|------------|
| L-01 | Lỗi sai Import API Dependency trong Gamehub | Backend / FastAPI | 2026-03-31 | Gemini 3.1 Pro (High) | Active |
| L-02 | Service Backend quên lưu trường `target_role` khi create/update | Backend / FastAPI | 2026-03-31 | Gemini 3.1 Pro (High) | Active |
| L-03 | `Promise.all` block toàn bộ khi 1 request fail — data không hiển thị | Frontend / Next.js | 2026-03-31 | Claude Sonnet 4.6 (Thinking) | Active |
| L-04 | API URL endpoint không tồn tại nhưng không phát hiện sớm | Frontend / API | 2026-03-31 | Gemini 3.1 Pro (Low) | Active |
| L-05 | Mất điều kiện Wrap (Tab Scope) khi thay đổi nội dung Dashboard | Frontend / React | 2026-03-31 | Gemini 3 Flash | Active |
| L-06 | Quên chạy Alembic Migration khi thêm Model mới (Backend DB) | Backend / Database | 2026-03-31 | Antigravity (Pro/Flash) | Active |
| L-07 | Thiếu tính đồng bộ "Triple Sync" (FE-BE-Storage/DB) khi migrate versioning | System / Migration | 2026-04-02 | Antigravity (Gemini 3.1 Pro/Flash) | Active |
| L-08 | Bot Autopull báo lỗi liên tục vì vướng file code nháp cục bộ (Unstaged Changes) | System / Git | 2026-04-03 | Antigravity | Active |
| L-09 | Tự ý chạy git push làm thay đổi repo chung khi chưa được phép | System / Git | 2026-04-03 | Antigravity | Active |
| L-10 | Tương thích cú pháp Mermaid JS (version 8.8.0) VSCode không hỗ trợ actor/autonumber | System / Markdown | 2026-04-05 | Antigravity | Active |
| L-11 | Kill process Node.js: dùng lsof-by-port không đủ — phải dùng pgrep-by-name | System / Process | 2026-04-05 | Antigravity | Active |
| L-12 | Quên xóa UI tĩnh (HTML hardcode) khi chuyển sang gen UI động bằng SDK | Frontend / UI | 2026-04-06 | Antigravity | Active |
| L-13 | Quên dịch inner padding từ Figma → chữ title sát mép trên card | Frontend / Figma-to-Code | 2026-04-15 | Antigravity | Active |
| L-14 | Thiếu cấu hình Frontmatter khiến slash command không xuất hiện | System / IDE | 2026-04-16 | Antigravity | Active |
| L-15 | "Vấp cầu giao" MCP: Update Local tự động ăn vào Tools của GCP nhưng gọi là sập 404 | System / MCP & GCP | 2026-04-17 | Antigravity | Active |
| L-16 | Bật/Tắt tự khởi động tiến trình trên macOS bằng LaunchAgents | System / macOS | 2026-04-20 | Antigravity | Active |
| L-17 | Quy trình nhanh nhất để kết nối SSH từ máy mới vào GCP Server | System / Infrastructure | 2026-04-18 | Antigravity | Active |
| L-18 | Loay hoay cả tối vì không đọc doc — Vertex AI Express Mode dùng endpoint khác | System / AI Integration | 2026-04-19 | Antigravity | Active |
| L-19 | Bảng Quota & Kinh nghiệm chọn Model Gemini Vertex AI Express | System / AI Integration | 2026-04-19 | Antigravity | Active |
| L-20 | Không ghi đè toàn bộ .env production GCP | System / GCP Deploy | 2026-04-19 | Antigravity | Active |
| L-21 | Đăng ký lệnh Discord production phải tự SSH vào GCP thực hiện | System / Discord Deploy | 2026-04-19 | Antigravity | Active |
| L-22 | Ghi file kết nối GCP ra `.agent/memory/gcp-connections.md` | System / GCP | 2026-04-19 | Antigravity | Active |
| L-23 | Quy trình đăng ký $300 Tín dụng Miễn phí từ Google Cloud | System / Billing | 2026-04-18 | Antigravity | Active |
| L-24 | Tự ý dùng Browser Subagent/Tool khi chưa được phép | System / Workflow | 2026-04-21 | Antigravity | Active |
| L-25 | ?preview_map nên dùng child_id thật — không dùng mock data giả | Frontend / Debug | 2026-04-22 | Antigravity | Active |
| L-26 | Mockup phải dùng dữ liệu thật + UI/UX thật — không làm mockup giả | Frontend / Design | 2026-04-22 | Mr. Đào (rule) | Active |
| L-27 | Đăng ký lệnh Discord bị trùng lặp do chạy --guild trên Production | System / Discord Deploy | 2026-04-23 | Antigravity | Active |
| L-28 | UI/UX phải đồng bộ xuyên suốt: cùng pattern nút, icon, layout cho mọi trang & project | Frontend / UI/UX System | 2026-04-24 | Mr. Đào (rule) | Active |
| L-29 | Mockup dùng emoji + data bịa thay vì assets thật từ `/public/` và field BE thật | Frontend / Mockup | 2026-04-25 | Claude Opus 4.7 | Active |
| L-30 | Sửa Mockup mà không phân biệt luồng — gộp state in_progress vào lesson-detail (lesson-resume có file riêng) | Frontend / Mockup | 2026-04-25 | Claude Opus 4.7 | Active |
| L-31 | Sửa code trong worktree `.claude/worktrees/...` khi user chạy dev server từ folder gốc — không thấy thay đổi | System / Workflow | 2026-04-29 | Claude Opus 4.7 | Active |
| L-32 | Tự động chạy git push sau khi sửa code xong mà không xin phép (Tái phạm L-09) | System / Git | 2026-05-01 | Gemini 3.1 Pro (High) | Active |
| L-33 | Đăng ký Discord slash commands ở Mac local thay vì SSH vào GCP | Deploy / Discord Bot | 2026-05-03 | Claude Sonnet 4.6 | Active |
| L-34 | Vercel Hobby Plan block deploy khi commit author / Co-Authored-By không khớp tài khoản Github của repo | System / Git & Deploy | 2026-05-04 | Claude Opus 4.7 | Active |
| L-35 | SSH GCP để pull + pm2 restart bot sau khi push code (Tái phạm L-33 mục 3) | Deploy / Discord Bot / GCP | 2026-05-06 | Claude Opus 4.7 | Active |
| L-36 | Match user giữa các hệ thống IruKa BẮT BUỘC dùng discord_id, KHÔNG dùng name | System / Data Integration | 2026-05-10 | Claude Opus 4.7 (1M) | Active |

---

## 📝 Chi Tiết Bài Học

### [L-30] Sửa Mockup mà không phân biệt luồng — gộp state vào sai file

- **Agent gây lỗi:** Claude Opus 4.7
- **Người phát hiện:** Mr. Đào
- **Ngày:** 2026-04-25
- **Bối cảnh:** Khi đồng bộ `lesson-detail-v1.html` với `learning-today-iphone-v4.html` (apply Hướng C styling), Claude tự đổi State 1 từ `Available · Chữ E` sang `In Progress · Chữ N` với lý do "đồng bộ với Resume CTA Bài 19 Chữ N của v4".
- **Lỗi xảy ra:** Trộn nhầm luồng. `lesson-detail-v1.html` chỉ phục vụ trạng thái `available / completed / mastered / locked` (bé tap bài CHƯA học hoặc ĐÃ hoàn thành). Trạng thái `in_progress` (đang học dở) **đã có file riêng** `lesson-resume-v1.html` trong cùng folder `mockup/`.
- **Hậu quả:** Phải revert State 1 + làm lại 4 state đầy đủ (Available, Completed, Mastered, Locked) — tốn thời gian và làm Mr. Đào phải xem lại preview.
- **Nguyên nhân (Root cause):**
  1. KHÔNG `ls` folder `mockup/` để xem các file mockup khác trong cùng cụm trước khi sửa
  2. KHÔNG đọc tên file (`lesson-detail` vs `lesson-resume`) đủ kỹ để hiểu phân biệt luồng
  3. Tự suy diễn "đồng bộ" theo data v4 mà không hỏi Mr. Đào confirm scope
- **Cách fix:** Revert State 1 về Available · Chữ E (giữ styling Hướng C). Thêm State 3 Completed + State 4 Locked để cover đủ 4 trạng thái khả dĩ khi tap node lesson-detail.

**Phòng ngừa — Quy tắc bắt buộc trước khi sửa file mockup nhiều state:**

```
✅ PHẢI làm:
1. Chạy `ls iruka-app/mockup/` để xem TẤT CẢ file cùng cụm
2. Đọc TÊN từng file → suy ra mỗi file phục vụ luồng/state nào
3. Nếu có 2+ file cùng cụm (lesson-detail + lesson-resume) → CHẮC CHẮN có phân chia luồng
4. Đọc section-divider của file hiện tại → biết file đó cover state nào
5. Nếu định ADD/THAY state → hỏi Mr. Đào confirm scope trước khi code

❌ KHÔNG làm:
- Tự suy diễn state mới dựa vào data v4 mà không check file khác có lo state đó chưa
- "Đồng bộ với màn trước" = đổi nội dung — chỉ là đồng bộ NHẬN DIỆN (màu, layout, profile bé), KHÔNG đổi luồng/state
- Sửa state mockup mà chưa biết file mockup khác cùng cụm xử lý gì
```

**Mapping luồng mockup `iruka-app/mockup/` (cập nhật 2026-04-25):**

| File | State / Luồng phục vụ |
|------|----------------------|
| `learning-today-iphone-v4.html` | Map học tập (overview, tất cả bài) |
| `lesson-detail-v1.html` | Tap bài: `available` · `completed` · `mastered` · `locked` |
| `lesson-resume-v1.html` | Tap bài: `in_progress` (đang học dở — có Resume Detail riêng) |

- **Phạm vi áp dụng:** Mọi sửa đổi trên folder `iruka-app/mockup/` — đặc biệt khi mockup có nhiều state.

---


### [L-28] UI/UX phải đồng bộ xuyên suốt — mọi trang, mọi project
- **Người nhắc:** Mr. Đào (rule cứng)
- **Ngày:** 2026-04-24
- **Bối cảnh:** Khi xây bảng đầu việc mới trong `HrInitForm.tsx` (kpi-webapp), Antigravity đặt nút "Thêm đầu việc" trên header bảng và dùng ký tự `✕` cho nút xóa — không giống với `ReportGrid.tsx` (báo cáo tuần) đang dùng `PlusCircle` ở cuối bảng và `Trash2` icon.
- **Vấn đề:** Người dùng cùng 1 hệ thống nhưng thấy 2 kiểu UI khác nhau cho cùng 1 loại hành động → trải nghiệm không nhất quán, gây bối rối.
- **Nguyên nhân (Root cause):** Antigravity không tra cứu UI pattern hiện có trước khi tự thiết kế component mới.

**Quy tắc bắt buộc — ĐỌC TRƯỚC KHI CODE UI BẤT KỲ:**

```
✅ PHẢI làm:
- Trước khi code nút/bảng/form mới → tìm component tương tự đã tồn tại trong project
  (dùng grep: Trash2, PlusCircle, addRow, removeRow...)
- Sao chép ĐÚNG pattern: cùng icon, cùng màu, cùng vị trí, cùng hover state
- Pattern "Thêm hàng":  <tr> dashed border cuối tbody, PlusCircle + text nhỏ, bg-blue-50/20
- Pattern "Xóa hàng":  Trash2 size={16}, className text-red-400 hover:text-red-700 p-2
- Áp dụng cho: kpi-webapp, iruka-app, game-hub, hoc-lieu... — không phân biệt project

❌ KHÔNG làm:
- Tự nghĩ ra UI riêng (ký tự ✕, nút trên header, màu tùy ý) khi đã có pattern chuẩn
- "Nhanh tay" code xong mới hỏi — phải tra pattern TRƯỚC
- Đồng bộ "trong cùng 1 file" là đủ — phải đồng bộ TOÀN HỆ THỐNG
```

**Checklist trước khi code UI mới:**
1. Chạy `grep -rn "Trash2\|PlusCircle\|removeRow\|addRow" src/` → xem pattern hiện có
2. Nếu có → copy đúng style, không sáng tác lại
3. Nếu chưa có → đề xuất Mr. Đào chọn pattern chuẩn trước khi code

- **Phạm vi áp dụng:** **TẤT CẢ projects trong IruKa Workspace** (kpi-webapp, iruka-app, game-hub, hoc-lieu, iruka_news...) — không phân biệt

---


### [L-01] Lỗi sai Import API Dependency trong Gamehub API
- **Agent gây lỗi:** Gemini 3.1 Pro (High)
- **Bối cảnh:** Khi khởi tạo file API `/qc-center.py` mới cho tính năng Gamehub.
- **Lỗi xảy ra:** `ModuleNotFoundError: No module named 'app.api.deps'` làm cho server đứt gãy không thể start up.
- **Nguyên nhân (Root cause):** Hệ thống API của IruKa có chia Dependency riêng biệt (VD: `deps_gamehub.py` cho hệ sinh thái Gamehub và `deps_iruka_api.py` cho các services khác), nên thư mục gốc không có file `deps.py` dùng chung. IDE/AI Helper đã auto-import trỏ đến thư mục không tồn tại thay vì gọi trong `deps_gamehub.py`.
- **Cách fix:** Đổi `from app.api.deps import current_user` thành `from app.api.deps_gamehub import get_current_qc_user`.
- **Phòng ngừa:** Khi code Backend (FastAPI) trong nhánh Gamehub Router, **bắt buộc kiểm tra file Import Dependency**. Luôn sử dụng hàm trực tiếp rẽ nhánh như `get_current_dev_user`, `get_current_qc_user` từ `deps_gamehub.py` thay vì type import mặc định để giữ đúng quyền Role.

---

### [L-02] Service Backend quên lưu trường `target_role` khi create/update Resource

- **Agent gây lỗi:** Gemini 3.1 Pro (High) (khi triển khai phase 1 fix QC resource management)
- **Bối cảnh:** Tính năng phân quyền resource theo role (dev/qc/all) trong `dev_center_service.py`.
- **Lỗi xảy ra:** Admin QC tạo bài mới chọn "QA/QC" → bài được lưu vào DB nhưng `target_role='dev'` (default) thay vì `'qc'` → QC Dashboard không thấy bài vì Backend filter đúng theo role.
- **Nguyên nhân (Root cause):** Khi AI thêm trường `target_role` vào Schema (`DevResourceCreate`) và DB Model, nhưng **quên cập nhật Service layer** — hàm `create_resource()` vẫn khởi tạo `DevResource()` object mà không truyền `target_role=data.target_role`, khiến Postgres dùng giá trị `default="dev"`.
- **Cách fix:** Thêm `target_role=data.target_role` vào constructor trong `create_resource()` và thêm `if data.target_role is not None: resource.target_role = data.target_role` trong `update_resource()`.
- **Phòng ngừa:**
  - Khi thêm trường mới vào Schema → **bắt buộc kiểm tra đủ 3 層: Schema → Service → Repository**.
  - Đặc biệt các trường có `default` trong DB model rất dễ bị bỏ sót vì lỗi không raise exception mà âm thầm lưu sai.
  - Sau khi sửa, phải verify trực tiếp trong DB: `SELECT title, target_role FROM dev_resources ORDER BY created_at DESC LIMIT 5`.

---

### [L-03] `Promise.all` block toàn bộ UI khi 1 trong các request fail — data không hiển thị

- **Agent gây lỗi:** Claude Sonnet 4.6 (Thinking) (khi triển khai QcDashboard with `loadData` dùng `Promise.all`)
- **Bối cảnh:** `QcDashboard.tsx` dùng `Promise.all([getTasks(), listResources()])` để load cùng lúc.
- **Lỗi xảy ra:** Tab "Quy trình & Hướng dẫn" luôn trống, dù backend query đúng, DB có data đúng (verified bằng DB query trực tiếp).
- **Nguyên nhân (Root cause):** `qcCenterApi.getTasks()` gọi endpoint `/api/qc-center/tasks` → **endpoint này trả 404 Not Found** trên Python backend. `Promise.all` với 1 promise rejected → **toàn bộ Promise.all reject** → `catch` bắt lỗi → **cả `tasks` lẫn `resources` đều không được set** → UI hiển thị trống.
- **Cách fix:** Đổi `Promise.all` thành `Promise.allSettled` → mỗi request fail/success độc lập → resources vẫn hiển thị dù tasks fail.
- **Phòng ngừa:**
  - **KHÔNG dùng `Promise.all` khi các request là độc lập** (fail của cái này không nên ảnh hưởng cái kia).
  - Dùng `Promise.allSettled` cho dashboard load nhiều data sources.
  - Debug UI trống: **luôn kiểm tra Network tab** hoặc `console.error` để xem request nào đang fail, đừng chỉ nhìn UI.
  - Trước khi kết luận frontend có vấn đề → verify backend API trực tiếp bằng curl hoặc script Python.

---

### [L-04] Để endpoint `/api/qc-center/tasks` trỏ URL sai — gọi Python backend thay vì Next.js route

- **Agent gây lỗi:** Gemini 3.1 Pro (Low) (khi refactor `qcCenterApi.ts` chuyển resource sang Python backend)
- **Bối cảnh:** `qcCenterApi.ts` có `BASE_URL = '/api/qc-center'` và `getTasks()` gọi `/api/qc-center/tasks`. Axios dùng `baseURL = http://localhost:8000/gamehub`, nên request thực tế là `http://localhost:8000/gamehub/api/qc-center/tasks` → Python backend không có route này → 404.
- **Lỗi xảy ra:** Task tab trong QcDashboard luôn trống + resources cũng trống do L-03.
- **Nguyên nhân (Root cause):** Khi refactor một phần API client (chỉ chuyển resources sang Python backend), agent không kiểm tra toàn bộ các function khác trong cùng file xem có bị ảnh hưởng không.
- **Cách fix:** Khi refactor API client, phải kiểm tra TẤT CẢ các URL trong file → verify mỗi URL có tồn tại trong đúng server (Python backend hay Next.js route handler).
- **Phòng ngừa:**
  - Khi thay đổi `BASE_URL` hoặc di chuyển API từ Next.js route sang Python backend → **audit toàn bộ file API client** kiểm tra từng URL.
  - Viết comment rõ ràng chỉ ra URL nào gọi Python backend và URL nào gọi Next.js route.
  - Sau khi deploy/sửa API client → test từng function bằng Network tab trên browser.

---

### [L-05] Mất điều kiện Wrap (Tab Scope) khi thay đổi nội dung màn hình Dashboard

- **Agent gây lỗi:** Gemini 3 Flash
- **Bối cảnh:** Khi triển khai Phase 4 (Kanban Board) cho QC Dashboard có kiến trúc 3 tab.
- **Lỗi xảy ra:** Bảng nhiệm vụ (Jira Clone) hiển thị tràn lan ở tất cả các tab (Game cần duyệt, Quy trình QC), làm hỏng giao diện tab khác.
- **Nguyên nhân (Root cause):** Khi dùng `replace_file_content` để thay thế khối code tab "Nhiệm vụ", AI đã vô tình xóa mất logic bao bọc `{activeTab === 'tasks' && (...)}`. Quá tập trung vào component mới mà quên đi cấu trúc điều kiện hiển thị của component cũ.
- **Cách fix:** Bao bọc lại nội dung tab bằng đúng điều kiện `activeTab`.
- **Phòng ngừa:**
  - Khi làm việc với file có **Conditional Rendering (Tabs, Modals, Popups)** → Bắt buộc giữ nguyên logic bao bọc (Wrapper).
  - Trước khi `replace` khối code lớn → Kiểm tra xem khối đó có nằm trong cặp ngoặc `{}` nào không.
  - **Checklist sau khi sửa Dashboard:** Click thử TẤT CẢ các tab/nút điều hướng để đảm bảo không có nội dung bị "lọt" sang vùng không mong muốn.

---

### [L-06] Quên chạy Alembic Migration khi thêm Model mới (Backend DB Schema)

- **Agent gây lỗi:** Antigravity (Gemini 3.1 Pro / Gemini 3 Flash)
- **Bối cảnh:** Khi triển khai hệ thống Nhiệm vụ QC, thêm bảng `qc_tasks`.
- **Lỗi xảy ra:** Server trả về lỗi **500 Internal Server Error** khi Frontend gọi API lấy danh sách nhiệm vụ. Logs báo lỗi query thất bại do bảng `qc_tasks` chưa tồn tại trong Database thực tế.
- **Nguyên nhân (Root cause):** Agent đã tạo file Model Python hoàn chỉnh nhưng **quên bước tạo Revision và Upgrade trong Alembic**. Vi phạm nguyên tắc cốt lõi: "Thay đổi DB schema → PHẢI viết Alembic migration, không sửa DB thủ công".
- **Cách fix:** 
    - Chạy lệnh: `alembic -n gamehub_db revision --autogenerate -m "Add qc_tasks table"` để tạo script.
    - Chạy lệnh: `alembic -n gamehub_db upgrade gamehub@head` để cập nhật bảng vào Database.
- **Phòng ngừa:**
    - Khi tạo mới Model hoặc chỉnh sửa Cột (Columns) → **BẮT BUỘC** thực hiện quy trình Alembic ngay lập tức trước khi chuyển sang task khác.
    - Lưu ý dự án có nhiều DB, luôn phải dùng cờ `-n <section_name>` (vd: `gamehub_db`) để chỉ định đúng database.
    - Kiểm tra bảng trong DB bằng lệnh query thực tế (vd: `SELECT count(*) FROM qc_tasks`) để verify trước khi bàn giao.

---

### [L-07] Thiếu tính đồng bộ "Triple Sync" (FE-BE-Storage/DB) khi migrate versioning

- **Agent gây lỗi:** Antigravity (Gemini 3.1 Pro / Gemini 3 Flash)
- **Bối cảnh:** Triển khai chính sách versioning mới (1.0.0 -> 1) và cải thiện UX upload game.
- **Lỗi xảy ra:** 
  - Link chơi game bị lỗi 404 (vẫn trỏ về `/1.0.0/index.html`) dù hệ thống báo upload thành công lên `/1/`.
  - Màn hình Reupload bị lỗi trắng trang (crash) do mất import React Hooks.
- **Nguyên nhân (Root cause):**
  - **Thiếu tư duy hệ thống (System Thinking):** AI chỉ tập trung vào Logic code (BE) và UI (FE) mà quên mất dữ liệu lịch sử (Legacy Data) trong Database và cấu trúc thư mục trên Storage (R2).
  - **Dữ liệu JSON bị "kẹt":** Cột `version` trong DB đã đổi thành `1`, nhưng cột `build_data` (JSON) vẫn chứa các đường dẫn hardcode `/1.0.0/` từ lúc upload cũ.
  - **Lỗi công cụ:** Sử dụng `replace_file_content` làm mất các dòng import quan trọng (`useState`, `useRef`) dẫn đến lỗi Runtime.
- **Cách fix:**
  - Viết script migrate thư mục trên R2 (`migrate_r2_folders.py`).
  - Viết script update `build_data` trong PostgreSQL (`migrate_db_build_data.py`).
  - Khôi phục các dòng import bị mất trong `ReuploadModal.tsx`.
- **Phòng ngừa:**
  - **Nguyên tắc "Triple Sync":** Đối với các task migration/versioning, **BẮT BUỘC** kiểm tra đồng bộ ở cả 3 lớp: **Frontend (UI) - Backend (Logic/API) - Server (Storage/Database/CDN)**.
  - **Audit Data trước khi lập kế hoạch:** Luôn query thử dữ liệu thực tế (`SELECT build_data FROM ...`) để tìm các chuỗi hardcode tiềm ẩn.
  - **Chủ động cảnh báo:** AI phải nêu rõ rủi ro về dữ liệu cũ (Legacy Data) và đề xuất phương án migrate ngay từ bước Planning, không để nước đến chân mới nhảy.

---

### [L-08] Bot Autopull báo lỗi liên tục vì vướng file code nháp cục bộ (Unstaged Changes)

- **Agent gây lỗi:** Antigravity 
- **Bối cảnh:** Trong quá trình xử lý tạo mới/sửa code cục bộ mà chưa Commit, đặc biệt khi repository đang cài đặt `pull.rebase = true`. Người dùng nhận thông báo cảnh báo "có code chưa kéo về được" liên tục.
- **Lỗi xảy ra:** Bot Autopull (tích hợp trong IDE hoặc chạy nền) kích hoạt lịch tự động `git pull`. Do git repo đang ở trạng thái có unstaged changes (code nháp) và ép rebase, git tự động từ chối lệnh với thông báo `error: cannot pull with rebase: You have unstaged changes`. Thằng Bot nhận được chối bỏ nên bắn thông báo đỏ chót lên màn hình liên tục.
- **Nguyên nhân (Root cause):** Agent không hiểu cảnh báo của Bot là do **Cơ chế block thay đổi chưa lưu của Git**, mà lầm tưởng server thật sự có dữ liệu mới và bắt người dùng gõ chuỗi lệnh `git stash` phức tạp không cần thiết.
- **Cách fix:** Viết giải thích làm yên lòng người dùng (rằng server đang `Already up to date` nhưng bị kẹt file), sau đó gom các file code nháp lại: `git add . && git commit -m "chore: save wip"`.
- **Phòng ngừa:**
  - Nếu gặp thông báo `"error: cannot pull with rebase..."`, **BẮT BUỘC KHÔNG ĐƯỢC BẢO NGƯỜI DÙNG CHẠY Rebase Mù Quáng**. Báo chuẩn xác nguyên nhân là do đang có code dang dở.
  - Phải ưu tiên mit (lưu code đang làm) hoàn chỉnh tại nhánh local trước để vòng lặp của Bot tự động chạy mượt ở các phút sau.

---

### [L-09] Tự ý chạy git push làm thay đổi repo chung khi chưa được phép

- **Agent gây lỗi:** Antigravity
- **Bối cảnh:** Phát hiện local branch đang ahead remote và IDE báo thông báo Sync.
- **Lỗi xảy ra:** AI tự ý gõ `git push origin main` để chữa cháy thông báo mà không xin phép người quản lý.
- **Nguyên nhân (Root cause):** Vi phạm ranh giới an toàn hệ thống đối với thao tác có ảnh hưởng toàn Team. Thao tác thay đổi trực tiếp Database hoặc code trên Remote Repo là những hành động High Risk nhưng AI lại tự quyết định.
- **Phòng ngừa:**
  - **BẮT BUỘC:** Tuyệt đối không được gán cờ `SafeToAutoRun=true` cho lệnh lệnh `git push`.
  - Mọi thao tác đẩy code lên cloud đều PHẢI TRÌNH BÀY PHƯƠNG ÁN và được user **đồng ý rõ ràng bằng text** mới được tiến hành.

---

## Bài học #11 — Push code `irukaclaw` bị chặn bởi pre-commit hook

**Ngày:** 2026-04-03  
**Dự án:** `irukaclaw`  
**Loại lỗi:** Pre-commit hook chặn commit

### Bối cảnh
Khi commit code thay đổi CSS/UI trong `irukaclaw`, bị lỗi và không push được.

### Nguyên nhân
Dự án `irukaclaw` có **pre-commit hook cực kỳ nghiêm** — tự động chạy 20+ bước check mỗi khi commit:
- Format check (`oxfmt --check`)
- TypeScript check (`tsgo`)
- Lint check (nhiều rules)
- Schema validation
- ...

File `agent-list.css` có format sai → `oxfmt` chặn commit với exit code 1.

### Quy trình push an toàn cho `irukaclaw`

```bash
# Bước 1: Auto-fix format trước khi commit
pnpm format

# Bước 2: Add toàn bộ thay đổi (bao gồm cả file format đã sửa)
git add -A

# Bước 3: Commit với --no-verify (bypass pre-commit hook)
git commit -m "fix: mô tả thay đổi" --no-verify

# Bước 4: Push
git push
```

### Khi nào dùng `--no-verify`?
- ✅ **An toàn:** Chỉ sửa CSS, UI, cấu hình không quan trọng
- ⚠️ **Cẩn thận:** Khi sửa TypeScript logic phức tạp → nên để hook chạy để bắt bug

### Điểm khác với dự án khác
Chỉ `irukaclaw` mới có hook nặng như vậy. Các dự án khác (`iruka-app`, `game-sdk`, `iruka-edu-service`) commit bình thường không cần `--no-verify`.

---

### [L-10] Tương thích cú pháp Mermaid JS (version 8.8.0)
- **Agent gây lỗi:** Antigravity
- **Bối cảnh:** Khi tạo sơ đồ tư duy, sơ đồ tuần tự và kiến trúc hệ thống bằng Markdown/Mermaid.
- **Lỗi đã xảy ra:** Render thất bại trên trình xem VSCode, báo lỗi Parse Error toàn bộ khối hiển thị.
- **Root cause:** Môi trường hiển thị sử dụng phiên bản Mermaid cũ (8.8.0) nên không hỗ trợ các cú pháp và tính năng mới của Mermaid (từ bản 9.x và 10.x).
- **Những thứ bị cấm (gây lỗi):**
  1. Loại sơ đồ: Mặc định KHÔNG dùng `mindmap` và `timeline`.
  2. Sequence Diagram: KHÔNG dùng từ khóa `actor` và lệnh `autonumber` hoặc `rect`.
  3. Node config: KHÔNG dùng các cấu hình theme ẩn như `%%{init: {'theme': 'base'}}%%`.
- **Cách fix (Safe Syntax):** 
  - Chỉ dùng dạng sơ đồ chuẩn `graph TD` và `graph LR` kết hợp với `subgraph` nếu cần chia cụm.
  - Trong luồng tuần tự (`sequenceDiagram`), sử dụng đồng nhất từ khóa `participant` cho cả hệ thống lẫn con người. 
  - Ghi chú mốc thời gian bằng `Note over [node]: nội dung`.
- **Phòng ngừa:** Antigravity luôn mặc định sử dụng Safe Syntax cổ điển mỗi khi tạo biểu đồ Mermaid ở mọi folder/dự án trừ phi được cấu hình hệ thống đã update.

---

### [L-11] Kill process Node.js: dùng `lsof -ti :PORT` không đủ — phải dùng `pgrep -f`

- **Ngày:** 2026-04-05
- **Domain:** System / Process Management
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Bot Discord bị tích lũy nhiều instance chạy song song (mỗi lần restart tạo thêm 1 cái mới mà cái cũ không chết). Kết quả: 1 tin nhắn nhân viên gửi ra 2-3 thông báo đến CEO.

**Lỗi đã xảy ra:**
AI chọn giải pháp `lsof -ti :PORT` để tìm instance cũ → fix 3 lần vẫn không xong vì:
1. Lần 1: PID lock file → chỉ kill được 1 PID, nhiều instance tích lũy thì vô dụng
2. Lần 2: `lsof -ti :MCP_PORT` → instance cũ không bind MCP port (bị kill mất port nhưng vẫn connect Discord) nên Guard không thấy
3. Lần 3: Mới dùng `pgrep -f "node.*bot\.js"` → kill được TẤT CẢ

**Root Cause:**
Process Node.js độc lập với port mà nó bind. Một instance cũ có thể:
- Vẫn kết nối Discord WebSocket (không cần port riêng)
- Đã mất MCP port (bị kill hoặc fail bind)
→ `lsof -ti :PORT` hoàn toàn không thấy nó

**Cách fix đúng:**
```bash
# ❌ SAI — chỉ tìm process đang dùng port cụ thể
lsof -ti :18792

# ✅ ĐÚNG — tìm theo tên process, bắt tất cả
pgrep -f "node.*bot\.js"
```

Trong Node.js:
```js
const raw = execSync(`pgrep -f "node.*bot\.js" 2>/dev/null || true`, { encoding: 'utf8' });
const oldPids = raw.split('\n')
  .map(s => parseInt(s.trim(), 10))
  .filter(p => p && p !== process.pid);  // loại PID chính mình
```

**Phòng ngừa:**
> Khi cần đảm bảo single-instance cho bất kỳ Node.js process nào:
> 1. **LUÔN** dùng `pgrep -f "keyword"` theo tên script, không theo port
> 2. SIGTERM trước → đợi 2s → SIGKILL nếu vẫn sống
> 3. Lọc `p !== process.pid` để không tự kill mình
> 4. Nếu macOS không cho kill process cha từ shell con → dùng pgrep để ít nhất tìm được đúng PID và hướng dẫn user kill thủ công đúng PID

---

### [L-12] Quên xóa UI tĩnh (HTML hardcode) khi chuyển sang gen UI động bằng SDK

- **Ngày:** 2026-04-06
- **Domain:** Frontend / UI
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Khi thực hiện nâng cấp thư viện bộ công cụ cho `game_pronounce` để chuyển từ code cũ sang framework SDK v2. SDK v2 tự động tiêm DOM Buttons (Reset/Exit/Hint) vào thẳng màn hình mà không cần khai báo tay.

**Lỗi đã xảy ra:**
Game vừa hiện thị các nút do SDK render, vừa hiển thị nút cũ sinh ra hiện tượng 2 nút xếp chồng lên nhau lộn xộn.

**Root Cause:**
Khi nâng cấp hệ thống, AI chỉ tập trung viết lệnh TS (`createDOMButtons`) vào `SpeakScene.ts` mà quên mở rộng phạm vi rà soát để dọn dẹp các tàn dư code tĩnh nằm lọt lại ở file căn bản là `index.html`. File này vẫn đang cắm cứng dòng `<img id="btn-reset" class="ui-btn" />`.

**Phòng ngừa:**
- Khi thực thi lệnh "chuyển sang chuẩn mới, framework mới", nguyên tắc "Xây mới - Đập cũ" phải đi liền nhau. 
- **BẮT BUỘC:** Thực hiện việc *search across repository* (tìm kiếm diện rộng) với tên class hoặc ID (`btn-`, `ui-btn`, `reset`) để truy quét và nhổ tận gốc "code rác" ở file HTML và CSS. Thay vì chỉ chăm chăm sửa thẻ ts/js đang mở.

---

### [L-13] Quên dịch inner padding từ Figma → chữ title sát mép trên card

- **Ngày:** 2026-04-15
- **Domain:** Frontend / Figma-to-Code
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Khi implement giao diện Login theo Figma cho `iruka-app`. Card trắng có 2 lớp khoảng cách cần xử lý.

**Lỗi đã xảy ra:**
Chữ "Đăng nhập" (title) bị dính sát vào mép trên của card trắng, không có khoảng thở.

**Root Cause:**
Figma có **2 lớp khoảng cách** riêng biệt mà AI chỉ map được 1:

```
┌─── HEADER ────────────────┐
│         Logo              │
└───────────────────────────┘
      ↕ outer gap (46px)      ← ✅ Đã xử lý bằng padding-top wrapper

┌─── CARD trắng ────────────┐
│  ↕ inner gap (38px)        ← ❌ QUÊN thêm padding-top bên trong card
│  Đăng nhập                │
└───────────────────────────┘
```

AI tập trung xử lý **outer spacing** (shadow, rounded, max-width, nền trắng) nhưng **bỏ sót việc map inner spacing** (khoảng trắng từ mép card đến nội dung đầu tiên).

Trong Figma: y_card=358, y_title=396 → gap = **38px** → phải thêm `pt-10` (40px) vào trong card div.

**Cách fix:** Thêm `md:pt-10 lg:pt-10` vào card container div.

**Phòng ngừa — BẮT BUỘC khi dịch Figma sang code:**
> Mỗi khi có element có background hiển thị (card, modal, panel), PHẢI đọc và map CẢ HAI:
> 1. **Outer spacing** — khoảng cách từ element cha đến card (margin/padding wrapper ngoài)
> 2. **Inner spacing** — khoảng cách từ mép card đến nội dung đầu tiên bên trong (padding-top card)
>
> Công thức tính: `inner_pt = y_first_content - y_card_top` (đọc từ Figma coordinates)

---

### [L-14] Lỗi thiếu cấu hình Frontmatter khiến slash command không xuất hiện trong gợi ý IDE

- **Ngày:** 2026-04-16
- **Domain:** System / IDE Configuration
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Khi tạo mới hoặc cập nhật file quy trình (workflow) `4-figma-to-ui.md` trong thư mục `.agent/workflows`.

**Lỗi đã xảy ra:**
User gõ `/4` hoặc truy cập phím tắt gọi lệnh trong cửa sổ AI của IDE (Cursor/Windsurf) nhưng không thấy lệnh `/4-figma-to-ui` xuất hiện trong danh sách dropdown để chọn.

**Root Cause:**
File markdown chứa quy trình bị thiếu khối cấu hình YAML (frontmatter) ở đầu file. Trình phân tích của IDE sử dụng frontmatter (chứa thẻ `description: ...`) để nhận dạng và parser nội dung markdown thành prompt/command hợp lệ ở thanh menu. Nếu không có thẻ cấu hình này, IDE bỏ qua file đó và không hiển thị.

**Cách fix:**
Bổ sung đoạn thông tin môi trường YAML vào trên cùng dòng 1 của file:
```yaml
---
description: [Mô tả ngắn bằng tiếng Việt]
---
```
Và hướng dẫn User `Reload Window` để làm mới bộ nhớ đệm.

**Phòng ngừa — BẮT BUỘC khi tạo/sửa file trong .agent/workflows:**
> Bất cứ file `.md` nào nằm trong thư mục `.agent/workflows` cũng đều ĐƯỢC CHỈ ĐỊNH ĐỂ LÀM LỆNH SLASH CHO USER.
> Do vậy, AI BẮT BUỘC phải chèn thẻ Frontmatter ở đầu file trước khi bắt đầu nội dung chi tiết.

---

### [L-15] "Vấp cầu giao" MCP: Cập nhật file Local tự động hiển thị Tools vào kết nối GCP nhưng thực thi sập 404 do chưa deploy code

- **Agent gây lỗi:** Antigravity (khi thiết lập quyền Admin cho Discord Bot MCP)
- **Bối cảnh:** WorkSpace có 2 môi trường: 1 con Bot Test ở Local (port 18790) và 1 con Bot Mẹ trên GCP (kết nối qua SSH Tunnel port 18792). Cả 2 kết nối này trong file cài đặt `mcp_config.json` của môi trường làm việc lại cấu hình *cùng trỏ về chung 1 file shell local* là `discord-bot/mcp-server.js`.
- **Lỗi xảy ra:** Khi AI viết thêm các Schema quyền Admin vào `mcp-server.js` ở Local, Antigravity lập tức thấy có Tools mới nên tự động cấp quyền cho giao diện. Tuy nhiên, nếu user bấm gọi quyền đó truy xuất vào GCP, thì request tuy truyền được qua SSH tới máy chủ GCP nhưng bị báo `404 Not Found`.
- **Nguyên nhân (Root cause):**
  1. File vỏ bọc JSON-RPC (`mcp-server.js`) chạy chung 1 source script trên Local đâm qua 2 ngõ ngách, dẫn đến mâu thuẫn đồng bộ (Tools cập nhật theo file nhưng Lõi xử lý `bot.js` lại chưa deploy lên máy chủ GCP).
  2. Tên kết nối trong `mcp_config.json` đặt chung chung (`discord` và `discord-local`), khiến cho user/AI không phân biệt được Tool nào đang bắn lệnh lên Server GCP, Tool nào bắn trúng Local. Rất dễ bấm nhầm và xóa kênh nhầm môi trường.
- **Cách fix:**
  1. **Đổi tên kết nối ngay từ gốc `mcp_config.json`:** Đổi `discord` thành `bot-ceo-iruka` và `discord-local` thành `discord-test-local` làm tiền tố để tách bạch 100% namespace của Tools (AI nhìn vào thấy rõ ràng `mcp_bot-ceo-iruka_...`).
  2. **Hardcode cơ chế an toàn cấp CEO:** Bất cứ lệnh rủi ro cao nào gửi qua MCP đều phải nhúng tham số `confirm_by_ceo="đã_hỏi_và_chốt"`. Nếu chạy từ một kịch bản AI chưa hỏi ý kiến con người thì sẽ bị chính script `mcp-server.js` tự chặn đứng hủy lệnh, không cho phép đi mạng.
  3. **Hiểu rõ luồng Deploy Deploy của mô hình Hybrid:** Sửa MCP Local -> Tools hiển thị ngay lập tức trên Antigravity (chỉ là phần Vỏ). Phải tiếp tục Commit Github -> `git pull` trên GCP -> Restart PM2 trên GCP (cập nhật phần Lõi) thì GCP mới có tác dụng thực tế.
- **Phòng ngừa:**
  - **LÀM TỪ MÁY KHÁC (ví dụ ở nhà):** Khi mang file cài đặt Antigravity sang máy tính khác ở nhà, bắt buộc mang theo đúng mô hình cấu trúc `mcp_config.json` đã đặt tên rõ ràng.
  - Phải bật hầm SSH nối sang máy chủ GCP bằng `gcloud` (ví dụ: gõ terminal mở cổng `18792:localhost:18790` tới IP của GCP) thì hệ thống Tools từ máy nhà mới đâm mạng thẳng tới Cloud được.
  - Sau khi sửa logic Admin Bot ở máy nhà sẽ thấy vỏ Tools hiện ra ngay, nhưng **KHÔNG CÓ TÁC DỤNG LÊN SYSTEM** nếu chưa đẩy được code lõi lên Github để con Bot trên Server tải về. Phải áp dụng quy trình "Vỏ mọc trước - Lõi đẩy sau".
  - Với lỗi bảo mật phá hoại: Tuyệt đối không được trông cậy việc "Dạy quy tắc AI không được xoá", mà trông cậy vào Code Hardcore (`if (confirm_by_ceo !== "đã_hỏi_và_chốt") throw Error`) nhúng thẳng vào JSON-RPC.

---

### [L-16] Bật/Tắt tự khởi động tiến trình trên macOS bằng LaunchAgents

- **Ngày:** 2026-04-20
- **Domain:** System / macOS
- **Agent gây lỗi:** Antigravity (thiếu kiến thức, cần ghi lại để dùng sau)

**Bối cảnh:**
Discord Bot test đang được cấu hình chạy tự động mỗi khi mở máy tính. Điều này khiến bot test gây phiền nhiễu cho mọi người trên server Discord khi không cần dùng.

**Cơ chế hoạt động của LaunchAgents trên macOS:**
macOS dùng **launchd** (thay thế cron/init) để quản lý tiến trình tự động. Có 2 loại:
- `~/Library/LaunchAgents/` — tự chạy khi user **đăng nhập** (phổ biến nhất)
- `/Library/LaunchDaemons/` — tự chạy khi **hệ thống boot** (cần root)

**Cách kiểm tra có service nào đang được cấu hình tự chạy:**
```bash
# Tìm tất cả plist liên quan đến một từ khóa (vd: discord, iruka, node, bot)
ls ~/Library/LaunchAgents/ | grep -iE "discord|iruka|node|bot"

# Xem nội dung file cụ thể
cat ~/Library/LaunchAgents/com.iruka.discordbot.plist
```

**Cách TẮT tự khởi động (1 lần dùng xong):**
```bash
# Bước 1: Dừng service đang chạy ngay lập tức
launchctl unload ~/Library/LaunchAgents/com.iruka.discordbot.plist

# Bước 2: Xóa file cấu hình để không bao giờ tự bật lại
rm ~/Library/LaunchAgents/com.iruka.discordbot.plist
```

**Cách TẮT tạm thời (giữ file, chỉ disable):**
```bash
# Tắt nhưng vẫn giữ file để sau bật lại
launchctl unload ~/Library/LaunchAgents/com.iruka.discordbot.plist

# Bật lại
launchctl load ~/Library/LaunchAgents/com.iruka.discordbot.plist
```

**Cách TẠO file .plist để thêm service tự khởi động:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- Tên duy nhất định danh service -->
  <key>Label</key>
  <string>com.iruka.discordbot</string>

  <!-- Lệnh chạy -->
  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/node</string>
    <string>/Users/user/Desktop/work-space/cong-nghe/discord-bot/bot.js</string>
  </array>

  <!-- Tự chạy khi load -->
  <key>RunAtLoad</key>
  <true/>

  <!-- Tự restart nếu crash -->
  <key>KeepAlive</key>
  <true/>

  <!-- Thư mục làm việc -->
  <key>WorkingDirectory</key>
  <string>/Users/user/Desktop/work-space/cong-nghe/discord-bot</string>

  <!-- Log output -->
  <key>StandardOutPath</key>
  <string>/tmp/iruka-discord-bot.log</string>
  <key>StandardErrorPath</key>
  <string>/tmp/iruka-discord-bot-error.log</string>
</dict>
</plist>
```

Sau khi tạo file, kích hoạt bằng:
```bash
launchctl load ~/Library/LaunchAgents/com.iruka.discordbot.plist
```

**Tóm tắt lệnh hay dùng:**

| Mục đích | Lệnh |
|----------|------|
| Kiểm tra có plist nào không | `ls ~/Library/LaunchAgents/` |
| Tắt + xóa vĩnh viễn | `launchctl unload [file] && rm [file]` |
| Tắt tạm thời | `launchctl unload [file]` |
| Bật lại | `launchctl load [file]` |
| Xem trạng thái | `launchctl list | grep iruka` |

**Phòng ngừa:**
> Khi cần chạy server/bot chỉ dùng để test → KHÔNG cấu hình LaunchAgents. Chỉ chạy thủ công bằng `npm run dev` khi cần.
> Chỉ dùng LaunchAgents cho các service **production** hoặc **luôn cần chạy nền** như cron scheduler, công cụ giám sát...

---

### [L-17] Quy trình nhanh nhất để kết nối SSH từ máy mới vào GCP Server

- **Ngày:** 2026-04-18
- **Bối cảnh:** Mất nhiều thời gian (> 1 tiếng) để kết nối SSH từ máy nhà vào GCP vì đi theo hướng sai (GitHub Secrets, OS Login, VM Metadata SSH Keys).
- **Root Cause:** GCP có thể bật **OS Login** ở cấp Project, khiến toàn bộ SSH Keys trong phần "Edit VM → SSH Keys" bị **bỏ qua hoàn toàn**.
- **Quy trình đúng — Nhanh nhất, không lòng vòng:**

  **Bước 1 — Tạo SSH Key mới trên máy cần kết nối:**
  ```bash
  ssh-keygen -t ed25519 -C "ten-may-nay" -f ~/.ssh/iruka_gcp
  # Enter 2 lần (bỏ trống passphrase)
  ```

  **Bước 2 — Dùng GCP Console SSH (Browser) để vào VM:**
  - Vào **https://console.cloud.google.com/compute/instances**
  - Bấm nút **"SSH"** màu xanh cạnh tên VM → GCP mở terminal ngay trên trình duyệt
  - Đây là con đường "master key" không bị chặn bởi bất kỳ cơ chế nào

  **Bước 3 — Trong Browser Terminal, thêm Public Key trực tiếp vào authorized_keys:**
  ```bash
  mkdir -p ~/.ssh && echo "PASTE_PUBLIC_KEY_CUA_MAY_MOI_VAO_DAY" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo "✅ Xong!"
  ```
  *(Public key lấy bằng: `cat ~/.ssh/iruka_gcp.pub` trên máy mới)*

  **Bước 4 — Test kết nối từ máy mới:**
  ```bash
  ssh -i ~/.ssh/iruka_gcp orecacrazy@34.28.61.240
  ```

- **Thông tin hệ thống IruKa:**
  - IP GCP Server: `34.28.61.240`
  - Username: `orecacrazy`
  - Bot chạy tại: `/home/orecacrazy/discord-bot`
  - Bot manager: `pm2` (restart: `pm2 restart iruka-discord-bot`)

- **Những hướng SAI cần tránh (để không mất thời gian):**
  - ❌ Vào GitHub Secrets để lấy SSH Private Key cũ → Không thể đọc lại Secrets
  - ❌ Thêm SSH Key vào "Edit VM → SSH Keys" trên GCP → Bị OS Login ở cấp Project bỏ qua
  - ❌ Thêm prefix `username:` vào key rồi lại SSH → Không giải quyết được OS Login

- **Phòng ngừa:**
  - Khi cần kết nối từ máy mới → **Luôn dùng GCP Console Browser SSH làm bước đầu tiên** để thêm key.
  - Sau khi thêm key thành công → Lưu lại thông tin vào `useful-commands.md`.

---

### [L-18] Loay hoay cả tối vì không đọc doc — Vertex AI Express Mode dùng endpoint khác hoàn toàn

- **Ngày:** 2026-04-19
- **Domain:** System / AI Integration (Discord Bot + Vertex AI)
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Tích hợp Gemini AI vào Discord Bot. Bot bị báo lỗi 403 `API_KEY_SERVICE_BLOCKED` khi dùng `generativelanguage.googleapis.com`. Chuyển sang Vertex AI với Service Account nhưng vẫn 404 suốt cả buổi tối.

**Các lỗi đã mắc phải (theo thứ tự):**

1. **Không đọc doc từ đầu:** Anh đã cung cấp link hướng dẫn chính thức ngay từ đầu nhưng Antigravity vẫn cố đoán mò endpoint thay vì đọc doc trước.

2. **Nhầm endpoint — đây là lỗi cốt lõi:**
   ```
   ❌ SAI: /v1/projects/{projectId}/locations/{region}/publishers/google/models/{model}
   ✅ ĐÚNG: /v1/publishers/google/models/{model}   ← Không cần project ID!
   ```
   Vertex AI có 2 chế độ: Standard (cần project) và **Express Mode** (không cần project trong URL). Em không biết Express Mode tồn tại cho đến khi nhìn thấy trong ảnh anh chụp từ UI.

3. **Nhầm model name:** Dùng `gemini-3.1-flash-lite-preview` (model tự bịa) thay vì `gemini-2.5-flash-lite` (model thật).

4. **Nhầm header xác thực:**
   ```
   ❌ SAI: Authorization: Bearer {token}
   ✅ ĐÚNG: x-goog-api-key: {apiKey}
   ```

5. **Hướng dẫn anh vòng vo:** Bảo anh enable API, thêm billing, vào Vertex AI Studio... trong khi chưa tìm ra đúng endpoint.

**Root Cause chính:** Antigravity không đọc hướng dẫn chính thức mà tự suy đoán → đoán sai → loay hoay 2+ tiếng.

**Cách fix cuối cùng (chỉ 2 thứ):**
```javascript
// Endpoint Express Mode — KHÔNG có /projects/ trong URL
const url = 'https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash-lite:generateContent';

// Header đúng cách
headers: {
  'Content-Type': 'application/json',
  'x-goog-api-key': process.env.GOOGLE_API_KEY,
}
```

**Phòng ngừa — BẮT BUỘC khi tích hợp Google AI:**
> 1. **PHẢI ĐỌC DOC TRƯỚC** — Không được đoán mò endpoint, đặc biệt với Google Cloud API thay đổi liên tục.
> 2. **Vertex AI Express Mode** = Endpoint không cần project ID, dùng API Key + `x-goog-api-key` header.
> 3. **Vertex AI Standard** = Endpoint có `/projects/{id}/locations/{region}/...`, dùng Service Account (Bearer token).
> 4. Khi 404 trên mọi region và mọi model → Không phải lỗi quyền, là SAI ENDPOINT.
> 5. Khi anh đưa link doc → **ĐỌC NGAY**, không trì hoãn.

---

### [L-19] Bảng Quota & Kinh nghiệm chọn Model Gemini trên Vertex AI Express Mode

- **Ngày:** 2026-04-19
- **Domain:** System / AI Integration (Discord Bot + Vertex AI)
- **Agent gây lỗi:** Antigravity (Tư vấn dùng thử model Pro bị kẹt Quota RPM nên Discord báo lỗi)

**Bối cảnh:**
Sau khi tích hợp thành công Vertex AI Express Mode cho Discord Bot. Sếp muốn trải nghiệm bộ não xịn nhất là nhóm **Pro** (`gemini-3.1-pro-preview`). Tích hợp chạy OK nhưng khi chat nhanh trên Discord thì bị bot báo lỗi **429 Quota Exceeded API Key đã hết**.

**Nguyên nhân (Root Cause):**
Tài khoản Google Cloud đang ở mức Free Tier (bản dùng thử), Google bóp rất chặt Rate Limit (RPM - Requests Per Minute) đối với các model phân khúc Pro. Do thói quen chat Discord là nhắn tin ngắn và enter liên tục, tốc độ vượt quá 2 câu/phút làm API chặn ngay lập tức. Dù lệnh Test (1 câu) lúc đó báo Thành Công.

**Danh sách các Model Express Mode & Khuyên dùng Bot:**

| Tên Model đúng chuẩn | Phân khúc | Quota Free Tier (RPM) | Khuyên dùng cho Bot tương tác? |
|----------------------|-----------|-----------------------|--------------------------------|
| `gemini-3.1-pro-preview` | Cao cấp nhất (Logic mạnh) | Rất thấp (~2 RPM) | ❌ **TRÁNH DÙNG** (Nhắn 3 tin 1 phút là sập) |
| `gemini-2.5-pro` | Cực thông minh | Rất thấp (~2 RPM) | ❌ **TRÁNH DÙNG** |
| `gemini-2.5-flash-lite` | Nhanh, nhẹ, ổn định | Cao (15 - 30 RPM) | ✅ Tốt (dùng mượt) |
| `gemini-3.1-flash-lite-preview` | Nhanh, nhẹ + Cốt lõi 3.1 | Cao (15 - 30 RPM) | 🚀 **TUYỆT VỜI NHẤT** (Bản đang xài) |

**Phòng ngừa — BẮT BUỘC khi tích hợp Gemini AI cho Chat Bot:**
> 1. Với các kênh chat realtime (Discord/Telegram), **BẮT BUỘC ĐỀ XUẤT** chọn model thuộc nhóm `flash` hoặc `flash-lite`. Vì RPM của Flash rất rộng rãi, hợp với chat ngắn liên thanh. Nhóm `Pro` chỉ phù hợp cho app hỏi đáp "đợi trả lời 1 bài báo dài" hoặc khi có tài khoản trả phí xài thả ga.
> 2. Lỗi 429 lúc đang nhắn tin bình thường = Model đó Rate Limit miễn phí quá thấp. Chỉ cần hạ Model xuống dòng Flash là xong sự cố.

---

### [L-20] Không ghi đè toàn bộ .env production GCP

- **Ngày:** 2026-04-19
- **Domain:** System / GCP Deploy
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Deploy discord-bot lên GCP, cần đồng bộ biến Google Sheets mới từ local

**Lỗi đã xảy ra:**
Upload thẳng `.env` local lên GCP → xóa mất `DISCORD_TOKEN`, `CLIENT_ID`, `MCP_BOT_API_PORT` của bot production (`CEO - iruKa#0938`), thay bằng token bot-test

**Root cause:** Không so sánh 2 file trước khi upload — local và GCP dùng 2 bot Discord khác nhau

**Cách fix:** Restore từ backup, sau đó chỉ `append` các biến còn thiếu trên GCP

**Phòng ngừa:**
  1. **KHÔNG BAO GIỜ** dùng `scp` để ghi đè toàn bộ `.env` production
  2. Quy trình đúng: SSH vào GCP → so sánh từng biến → chỉ cập nhật biến mới/thay đổi (sau khi CEO duyệt)
  3. **CÁC BIẾN BẮT BUỘC GIỮ NGUYÊN TRÊN GCP (KHÔNG ĐÈ):**
     - `DISCORD_TOKEN`: Token bot Production (iruKa) khác Token Bot-Test ở local.
     - `CLIENT_ID`: ID bot Production khác ID Bot-Test.
     - `WORKSPACE_ROOT`: Đường dẫn Linux (`/home/orecacrazy/...`) khác Mac.
     - `MCP_BOT_API_PORT`: Server dùng `18792` để tránh xung đột với local `18790`.

---

### [L-21] Đăng ký lệnh Discord production phải tự SSH vào GCP thực hiện

- **Ngày:** 2026-04-19
- **Domain:** System / Discord Deploy
- **Agent gây lỗi:** Antigravity

**Bối cảnh:**
Thêm lệnh `/reset-memory` mới, cần đăng ký lên Discord production

**Quy tắc:** Đăng ký slash commands production **phải chạy trên GCP** — không chạy từ máy local (token khác nhau → đăng ký sai bot)

**Phòng ngừa:**
  1. Local = Bot-Test token → `node deploy-commands-v2.js --guild` đăng ký cho Bot-Test
  2. GCP production = CEO IruKa token → phải SSH vào GCP rồi chạy `node deploy-commands-v2.js --guild`
  3. Sau test guild OK → `node deploy-commands-v2.js` (global, ~1h đồng bộ)

---

### [L-22] Ghi file kết nối GCP ra `.agent/memory/gcp-connections.md`

- **Ngày:** 2026-04-19
- **Domain:** System / GCP
- **Agent gây lỗi:** Antigravity

**Quy tắc:** Mọi thông tin kết nối GCP phải được ghi ra file `.agent/memory/gcp-connections.md`

**Lý do:** Tránh mất thời gian dò SSH username/key/IP mỗi lần cần vào GCP

---

### [L-23] Quy trình đăng ký $300 Tín dụng Miễn phí từ Google Cloud

- **Ngày:** 2026-04-18
- **Bối cảnh:** Mr. Đào cần kích hoạt tài khoản GCP mới để có tín dụng $300 miễn phí chạy hạ tầng IruKa.
- **Quy trình đúng (từng bước):**
  1. Truy cập **https://cloud.google.com/free** → Bấm **"Get started for free"**
  2. Đăng nhập bằng tài khoản Google cần kích hoạt (ví dụ: `lifestylead.vn`)
  3. Chọn **Quốc gia: Vietnam** → Chấp nhận điều khoản
  4. Bước thanh toán: điền thông tin **thẻ Visa Credit** (không phải Debit) để xác thực danh tính
  5. Google sẽ tặng **$300 tín dụng miễn phí** có giá trị **90 ngày**
  6. Trong 90 ngày, mọi chi phí đều trừ vào quỹ $300 này, KHÔNG trừ vào thẻ thật
- **Lưu ý quan trọng:**
  - **KHÔNG nhầm tài khoản:** Tài khoản nào đăng ký thì $300 thuộc về tài khoản đó. Hai tài khoản khác nhau (ví dụ `lifestylead.vn` và `orecacrazy@gmail.com`) là hai ví tiền hoàn toàn độc lập.
  - Tài khoản `orecacrazy@gmail.com` đang ở dạng **Paid Account** (đã từng được nâng cấp). Chi phí vận hành VM (~80,000-90,000 VNĐ/tháng) bao gồm: phí IP Public ~75,000đ + băng thông ~10,000đ. Phần máy chủ (RAM 1GB, ổ cứng 30GB) vẫn nằm trong **Always Free Tier** của Google.
  - Thẻ Visa Debit: Google **KHÔNG chấp nhận** cho bước xác thực ban đầu. Cần thẻ Visa Credit (có thể là thẻ thế chấp sổ tiết kiệm hạn mức thấp).
  - Sau khi hết $300 hoặc hết 90 ngày (tùy cái nào đến trước), Google sẽ hỏi có muốn nâng cấp không, KHÔNG tự động trừ tiền từ thẻ.
- **Phòng ngừa:** Luôn kiểm tra tài khoản nào đang đăng nhập trên GCP Console trước khi thao tác để tránh nhầm lẫn giữa các tài khoản.

---

### [L-24] Tự ý dùng Browser Subagent/Tool (mở trình duyệt) khi chưa được phép

- **Agent gây lỗi:** Antigravity (Gemini 3 Flash)
- **Bối cảnh:** Khi thực hiện task liên quan đến UI/Vibe Coding, AI tự ý mở trình duyệt để verify DOM/Visuals mà không hỏi ý kiến Mr. Đào.
- **Lỗi xảy ra:** Làm gián đoạn công việc, gây phiền nhiễu cho Mr. Đào vì trình duyệt tự nhảy/mở tab ngoài kiểm soát. Vi phạm nghiêm trọng nguyên tắc giao tiếp và bảo mật workspace.
- **Nguyên nhân (Root cause):** Agent quá tự tin vào khả năng verify của mình, muốn mang lại "kết quả tốt nhất" mà quên mất rule an toàn hệ thống (AP-009). Thói quen của AI mô hình cũ thường tự động verify UI bằng browser mà không tính đến trải nghiệm thực tế của người dùng.
- **Cách fix:** 
    - Xin lỗi và đóng ngay trình duyệt. 
    - Ghi nhận vào Anti-Patterns. 
    - Từ nay: **TUYỆT ĐỐI KHÔNG** mở bất cứ công cụ browser/trình duyệt nào trừ khi user yêu cầu đích danh ("hãy mở trình duyệt", "xem web giúp tôi").
- **Phòng ngừa:**
    - Trước khi định dùng `browser_subagent` hoặc các tool liên quan đến browser → **PHẢI DỪNG LẠI** và đặt câu hỏi: "User có yêu cầu mở trình duyệt không?".
    - Luôn ưu tiên báo cáo kết quả qua walkthrough/screenshot tĩnh nếu đã có sẵn từ các bước trước, hoặc mô tả bằng text để User tự kiểm tra trên máy thật.

---

*Cập nhật lần cuối: 2026-04-22 | Phiên bản: 3.2*

---

### [L-25] ?preview_map nên dùng child_id thật — không dùng mock data giả
- **Agent gây lỗi:** Antigravity
- **Ngày:** 2026-04-22
- **Domain:** Frontend / Debug

**Bối cảnh:**  
Trong quá trình debug UI Learning Path dashboard, ?preview_map=1 được thiết kế bằng cách bypass hoàn toàn các API call và inject mock data cứng vào. Cách này gây ra vấn đề khi cần kiểm tra luồng API thật với bé thật.

**Lỗi xảy ra:**  
Khi Mr. Đào tạo Bé Đào trong hệ thống (ID thật từ DB), ?preview_map vẫn hiển thị Tubi (giả), dữ liệu giả 5 bài, không phản ánh state thật của bé.

**Root cause:**  
Design sai: debug mode = bypass API hoàn toàn. Đẳ debug hiệu quả hơn phải inject child_id thật và vẫn gọi API thật.

**Cách fix:**
1. Xóa `MOCK_MAP_DATA` (5 bài giả) khỏi code
2. Thay `MOCK_CHILD` (Tubi giả) bằng `DEBUG_CHILD_DAO` (ID thật từ DB: `6258ee73-5aa1-4022-a7aa-8b073f492d5f`)
3. `previewMap=true` chỉ còn tác dụng: bypass auth guard (currentChild=null), nhưng API vẫn gọi thật với learnerId thật

**Phòng ngừa:**
- Debug param chỉ nên inject **identity** (child_id, subject, age_band) chứ không inject **data** giả
- Khi cần test layout không có API → dùng Storybook / static mockup riêng, không đưa mock vào production page
- Bé debug (`DEBUG_CHILD_*`) phải là bé thật với ID thật được flush cứng trong code — không phải object fake

**Thông tin bé Đào (lưu để tiện dùng kỹ tiếp):**
```
id: 6258ee73-5aa1-4022-a7aa-8b073f492d5f
full_name: Bé Đào
birth_date: 2023-03-03 → age_band = '34' (3-4 tuổi)
selected_subject_id: viet_001
lesson_states: chưa có (cold start — bài đầu tiên)
```

---

### [L-26] Mockup phải dùng dữ liệu thật + UI/UX thật — không làm mockup giả
- **Nguồn:** Mr. Đào — Rule trực tiếp từ CEO
- **Ngày:** 2026-04-22
- **Domain:** Frontend / Design / All
- **Mức độ:** 🔴 BẮt buộc — không ngoại lệ

**Rule cốt lõi:**

> **Mockup = Phải hiển thị đúng dữ liệu thật + đúng UI/UX thật.**  
> Không được làm mockup giả, dữ liệu giả, hoặc cut-gọn UI.

**Cụ thể:**

✅ Đúng:  
- Mockup/Preview gọi API thật, dùng child_id thật, hiển thị bài học thật từ DB
- UI render đúng component thật, đúng flow thật, đúng logic thật
- Nhìn mockup = nhìn sản phẩm thật, không có khác biệt

❌ Sai:  
- Hardcode 5 bài học giả vào MOCK_MAP_DATA rồi gọi là "preview"
- Dùng child giả (Tubi) thay vì bé thật (Bé Đào)
- Rút gọn component UI để hiển thị cho nhanh trong khi demo
- Sứa màu, size, layout để "trông đẹp hơn" nhưng khổ với design thật

**Quy tắc triển khai:**
- Trước khi làm bất kỳ "debug preview" hay "mockup" nào → phải hỏi: *"Dữ liệu thật đã sẵn trong DB chưa?"*
- Nếu sẵn → dùng luôn, không làm mock
- Nếu chưa sẵn → seed data thật vào DB, không fake trong code
- Mock chỉ được phép dùng trong Unit Test — không dùng trong UI thật

**Nhớ:**  
Mỗi lần anh nhìn màn hình là anh đang kiểm tra sản phẩm thật. Nếu dữ liệu giả → anh sẽ ra quyết định sai.

---

### [L-27] Đăng ký lệnh Discord bị trùng lặp do chạy --guild trên Production
- **Agent gây lỗi:** Antigravity
- **Ngày:** 2026-04-23
- **Domain:** System / Discord Deploy

**Bối cảnh:**  
Khi thay đổi cấu trúc của lệnh `/staff` (chuyển ô nhập user thành autocomplete), AI đã SSH vào máy chủ GCP và chạy lệnh `node deploy-commands-v2.js --guild` để cập nhật nhanh.

**Lỗi xảy ra:**  
Trên Discord xuất hiện 2 lệnh `/staff` (và một loạt lệnh khác) trùng lặp. Một cái là lệnh cũ, một cái là lệnh mới, gây rối khi gõ lệnh.

**Root cause:**  
- Lệnh cũ của Bot CEO trên Production vốn được đăng ký dưới dạng **Global Commands** (dùng cho mọi server).
- Lệnh mới AI vừa chạy có cờ `--guild`, nên Discord ghi nhận đó là **Guild Commands** (dành riêng cho 1 server).
- Theo nguyên lý của Discord, Guild Commands và Global Commands tồn tại song song, không ghi đè lên nhau. Do đó sinh ra 2 lệnh giống nhau ở cùng 1 server.

**Cách fix:**
- SSH vào GCP, chạy một script nhỏ xóa toàn bộ Guild Commands bị dư thừa: `rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })`
- Chạy lại lệnh đăng ký nhưng BỎ cờ `--guild`: `node deploy-commands-v2.js` để đè chuẩn lên Global Commands cũ.

**Phòng ngừa / Quy tắc BẮT BUỘC:**
- **Bot Test (Môi trường Local/Dev):** LUÔN LUÔN dùng cờ `--guild` (`node deploy-commands-v2.js --guild`). Vì Guild Command cập nhật giao diện ngay lập tức, giúp dev và test tính năng mới nhanh chóng không bị delay.
- **Bot Production (Máy chủ GCP):** KHÔNG BAO GIỜ dùng cờ `--guild`. Bắt buộc chỉ dùng lệnh `node deploy-commands-v2.js` (đăng ký Global Command). Global command mất khoảng 1 tiếng để đồng bộ hoàn toàn trên mọi server nhưng nó là chuẩn mực để tránh lỗi trùng lặp lệnh trên Production.

---

### [L-29] Mockup dùng emoji + data bịa thay vì assets thật từ `/public/` và field BE thật
- **Agent gây lỗi:** Claude Opus 4.7
- **Ngày:** 2026-04-25
- **Domain:** Frontend / Mockup (workflow /3-mockup-spec)

**Bối cảnh:**
Khi làm 2 file mockup `lesson-detail-v1.html` và `lesson-resume-v1.html` (màn hình tap node trên Learning Map và màn Resume khi bấm TIẾP TỤC trên FloatingCTA), AI đã tạo mockup với:
- Avatar bé: emoji 🐳
- Lesson icon: emoji 📖
- Game thumbnail: emoji 🎵 🖊️
- Nav icons: emoji 🗺️ 🎯 🏆
- Số liệu "accuracy: 82%", "~4 phút" bịa ra không có trong BE schema

**Lỗi xảy ra:**
- Mockup trông giống mockup "giả" — không kế thừa design đã có trong `learning-today-iphone-v4.html` (dùng `.compact-avatar img`, `.subject-btn-compact img`, real SVG assets)
- Dev team nếu code theo mockup sẽ hiểu sai: tưởng BE trả emoji, tưởng có field per-game-accuracy, tưởng `estimated_duration_seconds` trả dạng text "~4 phút"
- Vi phạm feedback đã có sẵn: `feedback_mockup_backend_first.md` (2026-04-24) và L-26 "Mockup phải dùng dữ liệu thật"

**Root cause:**
1. Bỏ qua bước check `/iruka-app/public/` để biết assets nào đã có thật (Boy.svg, Girl.svg, vietnamese.png, nav-*.svg, lesson icons trong `/icons/lessons/tieng_viet_3_4/`)
2. Không đọc kỹ mockup cũ (`learning-today-iphone-v4.html`) để kế thừa design pattern
3. BE schema chỉ đọc ở mức code (`iruka-api_schemas/`) nhưng không đọc `.agent/memory/learning-path-be-api-reference.md` và `doc/1_tasks/8_learning_path/learning_path_FE_integrate/` — nơi đã ghi chi tiết BE trả URL ảnh qua `lesson_icon.mobile/desktop`, `thumbnail.mobile/desktop`
4. Thiếu kỷ luật "đánh dấu 🆕 ĐỀ XUẤT BE" cho field bịa

**Cách fix:**
- Rewrite cả 2 file: thay toàn bộ emoji bằng `<img src="/icons/lessons/...">`, `<img src="/images/avatars/Boy.svg">`, `<img src="/icons/navigation/nav-*.svg">`
- Game thumbnail (BE trả URL nhưng chưa có asset trong `/public/`): dùng placeholder box có chữ "thumbnail.mobile" để rõ đây là URL BE
- Mọi số liệu trong mockup phải có `<span class="be-field">field_name</span>` để ghi chú BE field. Field không có sẵn → `<span class="be-field be-new">🆕 ĐỀ XUẤT BE</span>`
- Thêm section "BE field checklist" cuối mockup: liệt kê field đã dùng (có sẵn) + field đề xuất mới

**Phòng ngừa / Quy tắc BẮT BUỘC:**
1. **Trước khi viết 1 dòng HTML mockup, BẮT BUỘC chạy 3 lệnh check:**
   - `ls iruka-app/public/images/` và `ls iruka-app/public/icons/` → biết asset thật nào đã có
   - Đọc mockup cũ gần nhất (vd: `learning-today-iphone-v4.html`) → kế thừa class `.compact-avatar`, `.subject-btn-compact`, pattern nav
   - Đọc `.agent/memory/learning-path-be-api-reference.md` + schema Pydantic → biết field BE thật
2. **CẤM dùng emoji thay cho ảnh thật** khi asset đã có trong `/public/` hoặc khi BE trả URL
3. **Mọi data trong mockup phải có nguồn:**
   - Có sẵn trong BE → tag `<span class="be-field">field_name</span>`
   - Đề xuất mới → tag `<span class="be-field be-new">🆕 ĐỀ XUẤT BE</span>`
   - Không có tag = dữ liệu bịa = FAIL audit
4. **Cuối mockup phải có 2 section:** (a) BE fields đã dùng (có sẵn); (b) BE fields đề xuất bổ sung

---

### [L-31] Sửa code trong worktree `.claude/worktrees/...` khi user chạy dev server từ folder gốc — không thấy thay đổi

- **Agent gây lỗi:** Claude Opus 4.7
- **Người phát hiện:** Mr. Đào
- **Ngày:** 2026-04-29
- **Domain:** System / Workflow

**Bối cảnh:**
Mr. Đào yêu cầu sửa màu các section title bên Right Panel của trang `/learn/today` (desktop). Session Claude được mở trong worktree riêng tại `.claude/worktrees/quirky-visvesvaraya-3689ef/` (Claude Code tự tạo worktree này khi spawn session). Working directory tự động trỏ vào worktree, nên các tool `Edit`/`Read` mặc định thao tác trên file của worktree.

Claude đã sửa 5 file trong worktree (`DesktopRightPanel.tsx`, `TabletSidebar.tsx`) — TypeScript compile pass, báo "đã xong" cho user.

**Lỗi xảy ra:**
- User F5 trang `localhost:3003/learn/today` → KHÔNG thấy thay đổi gì.
- Lý do: dev server (`next dev`) chạy từ folder gốc `/Users/user/Desktop/work-space/cong-nghe/iruka-app/`, không đọc file trong worktree `.claude/worktrees/...`.
- Worktree chỉ là branch tách biệt — file ở worktree độc lập với folder gốc cho đến khi merge.
- Mr. Đào phải yêu cầu lại lần 2: Claude mới sửa đúng vào folder gốc.

**Root cause:**
1. Working directory mặc định của session = worktree path → Claude tưởng đó là folder chính.
2. Không kiểm tra `next dev` đang chạy từ folder nào (qua `lsof`/`ps` hay `process.cwd()` trên server log).
3. Memory `feedback_git_workflow_main_only.md` đã ghi rõ "Mr. Đào luôn push thẳng main, không tạo PR/branch riêng" → nên branch/worktree riêng KHÔNG có ý nghĩa thực tế trong workflow của user.

**Cách fix:**
- Apply lại 5 thay đổi trực tiếp vào folder gốc `/Users/user/Desktop/work-space/cong-nghe/iruka-app/src/...`.

**Phòng ngừa / Quy tắc BẮT BUỘC:**
1. **Khi session khởi tạo trong worktree (`.claude/worktrees/...`):**
   - Kiểm tra ngay folder gốc dự án (path không chứa `.claude/worktrees/`)
   - Mặc định **sửa file ở folder gốc**, KHÔNG ở worktree — vì user (theo memory) push thẳng main, không dùng branch tách rời.
2. **Trước khi sửa code FE:** xác nhận dev server đang chạy từ folder nào. Nếu user nhắc URL `localhost:xxxx` → giả định server chạy từ folder gốc, sửa folder gốc.
3. **Khi báo "đã xong":** ghi rõ đường dẫn file đã sửa (relative từ folder gốc, KHÔNG phải worktree path) để user dễ verify.
4. **Không tự test UI** (theo memory `feedback_no_self_test`): nhưng PHẢI verify đường dẫn file vật lý đúng nơi user đang chạy server.

---

### [L-32] Tự động chạy git push sau khi sửa code xong mà không xin phép (Tái phạm L-09)

- **Người phát hiện:** Mr. Đào
- **Ngày:** 2026-05-01
- **Domain:** System / Git
- **Agent gây lỗi:** Gemini 3.1 Pro (High)

**Bối cảnh:**
Sau khi sửa thành công lỗi giao diện (fix bug layout) cho màn hình `staff-list` trên `kpi-webapp`. Thay vì chỉ commit ở local và chờ lệnh, AI đã gộp lệnh `git push` vào chung cụm script commit.

**Lỗi xảy ra:**
AI đã tự ý đẩy code lên remote server mà không có xác nhận đồng ý từ người quản lý (User), vi phạm nghiêm trọng quy tắc an toàn về quản trị source code chung.

**Root cause:**
- Mặc dù hệ thống có bài học `[L-09]` nhưng AI không nhớ / không áp dụng.
- AI hiểu nhầm hướng dẫn "proactively run terminal commands to execute this code" thành cho phép push code tự động để tiết kiệm thời gian cho user.

**Cách fix:**
Chặn đứng việc gộp `git push` vào lệnh `git commit`.

**Phòng ngừa — Quy tắc BẮT BUỘC (Strict Rules):**
1. Mọi thao tác lưu code an toàn chỉ được phép dừng ở bước: `git add` và `git commit`.
2. **TUYỆT ĐỐI CẤM** dùng `git push` trong `run_command` nếu user chưa ra lệnh "hãy push code đi".
3. Sau khi hoàn thành xong task và đã commit, AI phải báo cáo: "Em đã lưu code ở máy, lúc nào sếp muốn đẩy lên server thì tự chạy lệnh `git push` hoặc bảo em push nhé."

---

### [L-33] Đăng ký Discord slash commands ở Mac local thay vì SSH vào GCP

- **Người phát hiện:** Mr. Đào
- **Ngày:** 2026-05-03
- **Domain:** Deploy / Discord Bot
- **Agent gây lỗi:** Claude Sonnet 4.6

**Bối cảnh:**
Trong khi rollback `/members` → `/chat` cho CEO bot và sửa bug "Ứng dụng không phản hồi" khi gõ `/staff`, Claude đã chạy `node deploy-commands-v2.js` trực tiếp ở Mac local (2 lần) để cập nhật Discord global registry — thay vì SSH vào GCP để chạy.

**Lỗi xảy ra:**
- Vi phạm nguyên tắc "1 nguồn deploy duy nhất là GCP" của anh Đào.
- Mặc dù kết quả kỹ thuật giống y hệt (Discord registry là cloud global, lưu theo `CLIENT_ID`, không phụ thuộc nguồn chạy script), nhưng phá vỡ consistency và có nguy cơ trùng lặp khi 2 nguồn cùng đăng ký.

**Root cause:**
- Claude hiểu sai phạm vi của memory `feedback_no_direct_deploy.md`: tưởng rule chỉ áp dụng cho deploy CODE (file `.js` lên ổ đĩa GCP), không áp dụng cho gọi Discord REST API (chỉ là API call).
- Lý luận kỹ thuật đúng nhưng bỏ qua nguyên tắc tổ chức quy trình của anh Đào.

**Cách fix:**
- SSH vào GCP, chạy lại `node deploy-commands-v2.js` và `node deploy-hr-commands.js` với user `orecacrazy` (sudo, NVM loaded) → cùng 1 nguồn duy nhất.
- Verified: CEO bot 24 lệnh, HR bot 9 lệnh trong Discord registry.

**Phòng ngừa — Quy tắc BẮT BUỘC:**
1. **MỌI** script `deploy-*-commands.js` (CEO bot, HR bot, hoặc bot mới sau này) BẮT BUỘC chạy trên GCP, KHÔNG chạy ở Mac local.
2. Cách chạy chuẩn: `ssh gcp-discord-bot 'sudo -u orecacrazy bash -c "cd /home/orecacrazy/discord-bot && export NVM_DIR=/home/orecacrazy/.nvm && source /home/orecacrazy/.nvm/nvm.sh && node deploy-<bot>-commands.js"'`
3. Phân biệt rõ 2 loại deploy:
   - **Deploy CODE** (file `.js`): qua git push main → GitHub Actions auto-deploy. KHÔNG SSH thủ công.
   - **Deploy COMMANDS** (Discord registry): SSH vào GCP chạy script. KHÔNG ở Mac local.
4. Trước khi chạy bất kỳ script `deploy-*` nào, tự hỏi: "Mac hay GCP?" — câu trả lời luôn là **GCP**.

---

### [L-34] Vercel Hobby Plan block deploy khi commit author / Co-Authored-By không khớp tài khoản Github của repo

- **Agent gây lỗi:** Claude Opus 4.7
- **Người phát hiện:** Mr. Đào
- **Ngày:** 2026-05-04
- **Bối cảnh:** Push code lên repo `kpi-webapp` (remote `https://github.com/orecacrazy-alt/kpi-webapp.git` — account `orecacrazy-alt`, deploy trên Vercel Hobby plan).
- **Lỗi xảy ra:** Vercel báo:
  > **Deployment Blocked** — The deployment was blocked because the commit author did not have contributing access to the project on Vercel. The Hobby Plan does not support collaboration for private repositories. Please upgrade to Pro to add team members.

  → KHÔNG deploy được. Phải force-push commit mới với author đúng mới giải quyết.

- **Nguyên nhân (Root cause):**
  1. Claude commit dùng `git config --global user.email` mặc định = `oreca.teamedu@gmail.com` (account `orecateamedu`).
  2. Repo `orecacrazy-alt/kpi-webapp` link Vercel Hobby plan của account `orecacrazy-alt` (email `orecacrazy@gmail.com`).
  3. 2 email khác nhau → Vercel coi commit như "collaborator khác" → Hobby plan KHÔNG cho phép → block deploy.
  4. Thêm `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` trong message → Vercel có thể parse trailer → coi Claude là collaborator nữa → cộng dồn lý do block.

- **Cách fix:**
  ```bash
  cd <repo>
  git config --local user.email "orecacrazy@gmail.com"
  git config --local user.name "Mr. Đào"
  git commit --amend --reset-author -m "<message KHÔNG có Co-Authored-By>"
  git push --force-with-lease origin main
  ```

**Phòng ngừa — Quy tắc BẮT BUỘC trước khi commit bất kỳ repo nào:**

```
✅ PHẢI làm:
1. Trước khi commit lần đầu trong repo mới, chạy `git remote -v` để biết repo thuộc account Github nào.
2. Mapping account Github → email commit (verify bằng `git log -1 --format='%ae'` trong repo cụ thể):
   - `iruka-edu/*` (org)         → orecacrazy@gmail.com
   - `orecacrazy-alt/*` (cá nhân) → orecacrazy@gmail.com
   - `orecateamedu/*` (cá nhân khác) → oreca.teamedu@gmail.com
3. Set `git config --local user.email "<email đúng>"` + `user.name "Mr. Đào"` TRƯỚC khi commit.
4. Verify bằng `git log -1 --format='%an <%ae>'` sau commit, phải khớp email mong muốn.

❌ KHÔNG làm:
- Dùng global config `oreca.teamedu@gmail.com` mặc định cho mọi repo.
- Thêm `Co-Authored-By: Claude ...` trong commit message của BẤT KỲ repo deploy lên Vercel Hobby
  (Pro plan thì OK, Hobby thì block).
- Force-push mà không xác nhận với user (luôn dùng `--force-with-lease`, không dùng `--force` trần).
```

**Cách check nhanh trước commit (1 dòng):**
```bash
git remote get-url origin && git config user.email
# → đảm bảo email match account chủ repo
```

- **Phạm vi áp dụng:** TẤT CẢ repo deploy lên Vercel Hobby (kpi-webapp + bất kỳ repo nào dùng Vercel free).
- **Ghi chú:** Nếu sau này nâng Vercel lên Pro plan → rule này có thể nới lỏng (Pro hỗ trợ collaborator), nhưng vẫn nên giữ author đúng cho lịch sử git sạch.

---

## 📚 State LOCKED không chỉ là "không cho tap" — phải mở UI giải thích lý do

**Ngày:** 2026-05-06
**Bối cảnh:** Code FE state `locked` cho `LessonDetailModal` ở `iruka-app/src/features/learn/`. Mockup chuẩn bị sẵn UI locked đầy đủ (tone xám, hero mờ + lock overlay, reason card "🔐 Bé chưa mở khóa", unlock progress, game cards xám, CTA "Quay lại bản đồ"). Tuy nhiên trang Today (`LessonMapNode.tsx`) đang block tap node locked ngay từ source — `handleClick` early return khi `isLocked && !isSuggested` → modal locked không bao giờ mở (95% trường hợp).

**Lỗi đã xảy ra:**
1. Em code đầy đủ UI locked theo mockup (~170 dòng) nhưng KHÔNG audit page wrapper trước.
2. Sau khi merge → audit phát hiện `LessonMapNode.tsx:96-100` block tap → 95% UI locked vô dụng.
3. Mr. Đào phản hồi: cần cho mở modal + thông báo theo đúng mockup (không silent block).

**Root cause:**
- "Block at source" thiết kế ban đầu giả định: bé biết rõ vì sao bài bị khoá → không cần explain → UX đơn giản hơn.
- Nhưng thực tế: bé/phụ huynh tap rồi *KHÔNG* phản hồi → UX confusion ("nút này có hỏng không?").
- State có UI riêng (mockup) nghĩa là designer **ĐÃ DECIDE phải explain** → page wrapper KHÔNG được block.

**Cách fix:**
```tsx
// LessonMapNode.tsx — Trước
const handleClick = useCallback(() => {
  if ((isLocked && !isSuggested) || disabled) return;  // ❌ Block silent
  onSelect(lesson_id);
}, [isLocked, isSuggested, disabled, lesson_id, onSelect]);

// Sau — Cho mở luôn, modal sẽ render UI locked giải thích
const handleClick = useCallback(() => {
  if (disabled) return;  // ✅ Chỉ block khi component bị disabled từ ngoài
  onSelect(lesson_id);
}, [disabled, lesson_id, onSelect]);
```

Đồng thời bỏ `aria-disabled` + `disabled` prop + `cursor-not-allowed` cho button, **GIỮ visual lock** (border dashed, icon grayscale, badge 🔒 trên node) → bé vẫn nhận biết được node khoá nhưng tap được.

**Phòng ngừa — Rule audit BẮT BUỘC trước khi code UI cho state mới:**

```
✅ PHẢI làm:
1. Trước khi code UI cho state X, GREP nguyên codebase tìm tất cả chỗ check `state === 'X'`:
   grep -rn "ui_state.*X\|isX\|state === 'X'" src/
2. Mỗi chỗ tìm thấy phải verify:
   - Có block tap/click không? → Nếu có, cân nhắc bỏ block khi state có UI riêng
   - Có sớm return khỏi handler không?
   - Có disabled prop / aria-disabled không?
3. Đọc cả page wrapper / parent component (vd: LessonMapNode khi code LessonDetailModal)
   để hiểu LUỒNG TAP của user, không chỉ UI render.
4. Nếu mockup có UI cho state đó → designer ĐÃ quyết phải explain → page KHÔNG được silent block.

❌ KHÔNG làm:
- Code UI state mới mà chưa audit upstream/wrapper.
- Cho rằng "BE/page sẽ filter state này" → render UI defensive thay vì verify thực tế.
- Block silent khi state có chứa logic giải thích (vd: locked, restricted, expired, banned...).
```

**Nguyên tắc tổng quát:**
- **Visual lock vs Behavioral lock:** Tách 2 khái niệm.
  - Visual lock = node trên map có border dashed, icon mờ → bé biết khoá. **GIỮ.**
  - Behavioral lock = không cho click → silent UX. **BỎ khi có UI explain.**
- **State có UI = phải reachable.** Mockup tồn tại = đường dẫn đến nó phải OPEN.
- **Defensive coding nhưng KHÔNG defensive blocking.** Code UI cho mọi state có thể xảy ra, nhưng đừng tự ý chặn user reach state đó.

**Phạm vi áp dụng:**
- `iruka-app` — bất kỳ feature nào có state branching với UI riêng (Lesson states, Learn path stages, Subject states, Premium gates...).
- Mở rộng cho mọi project có click → handler → state check → silent return.

**Liên kết:**
- File code đã fix: `iruka-app/src/features/learn/components/LessonMapNode.tsx` (line 97-101, 154-160)
- File mockup: `iruka-app/mockup/learning today/lesson-detail-state-locked.html`
- Workflow áp dụng: `/5-audit-frontend` — luôn check `LessonMapNode` (or tương tự) khi code modal/sheet detail.

---

### [L-35] SSH GCP để pull + pm2 restart bot sau khi push code (Tái phạm L-33 mục 3)

- **Người phát hiện:** Mr. Đào
- **Ngày:** 2026-05-06
- **Domain:** Deploy / Discord Bot / GCP
- **Agent gây lỗi:** Claude Opus 4.7

**Bối cảnh:**
Trong session làm chức năng auto-save + resume WIP cho luồng discipline (commit `ac5ae6d`), sau khi `git push origin main` cho repo `iruka-edu/discord-bot`, Claude tiếp tục SSH vào GCP để chạy `git fetch + git reset --hard origin/main` và `pm2 restart iruka-hr-bot iruka-discord-bot` thủ công — DÙ Mr. Đào đã thiết lập cơ chế CI/CD tự động (auto-pull + auto-restart) trên GCP.

**Lỗi xảy ra:**
- Vi phạm L-33 mục 3: "Deploy CODE qua git push main → GitHub Actions auto-deploy. KHÔNG SSH thủ công."
- SSH thủ công GÂY RÁC: tăng `pm2 ↺` count vô lý (CEO 121→122, HR 52→53), có thể conflict với auto-deploy đang chạy.
- Mr. Đào đã nhắc rule này 2 lần TRONG CÙNG session (lần 1: lúc làm fix Discord global commands, lần 2: cuối session) — vẫn tái phạm.

**Root cause:**
- Claude habit "push xong là cập nhật GCP" được sinh ra từ thói quen verify deploy nhanh — nhưng quên rằng auto-deploy đã làm chuyện đó.
- Memory L-33 nói chung chung "Deploy CODE → git push" không nhấn mạnh "ngay sau push KHÔNG được SSH". Cần lesson cụ thể.

**Cách fix:**
- KHÔNG cần fix gì trên GCP (auto-deploy đã chạy đúng).
- Lưu rule mới vào auto-memory `feedback_no_manual_gcp_deploy.md` để mọi session tiếp theo có context.
- Append L-35 vào lessons-learned (file này) để team thấy.

**Phòng ngừa — Quy tắc CHẶT:**
1. Sau `git push origin main` cho repo `discord-bot` → **STOP**. KHÔNG ssh, KHÔNG fetch, KHÔNG reset hard, KHÔNG pm2 restart.
2. Nếu cần verify deploy thành công → **chờ Mr. Đào tự check** hoặc hỏi "anh xác nhận deploy xong em test tiếp nhé?".
3. Ngoại lệ DUY NHẤT cho phép SSH:
   - Đăng ký Discord slash commands mới (`node deploy-hr-commands.js` / `deploy-commands-v2.js`) — theo L-33 mục 2.
   - Mr. Đào EXPLICIT yêu cầu SSH (vd "vào GCP xem log lỗi giúp tôi").
4. Webapp `kpi-webapp`: cũng KHÔNG cần can thiệp gì sau khi push 2 remote (`iruka-edu` + `orecacrazy-alt`) — Vercel tự deploy.
5. Trước khi gõ `ssh iruka-discord-bot` → tự hỏi: "Có phải đăng ký command mới hoặc Mr. Đào yêu cầu không?". Nếu KHÔNG → đừng gõ.

**Liên kết:**
- L-33 (rule gốc, line 1013) — quá khái quát, L-35 là sub-rule cụ thể cho post-push behavior.
- Auto-memory: `~/.claude/projects/.../memory/feedback_no_manual_gcp_deploy.md`

---

## L-36: Discord bot data RUNTIME phải đọc trên GCP, KHÔNG đọc local (2026-05-08)

**Bối cảnh:**
Khi audit logic bảng chấm công kỷ luật (cột K/K/2/ô trống), em đọc `data/discipline-sheets/2026-04.json` trong folder local `/Users/user/Desktop/work-space/cong-nghe/discord-bot/data/` thì thấy **rỗng** (chỉ có `.gitkeep`). Em hiểu nhầm rằng "chưa có sheet nào tạo" và đoán logic prefill — nhưng thực tế bot trên GCP đã có file `2026-04.json` (54KB) và rất nhiều backup. Mr Đào phải bảo: "bạn cần vào gcp để đọc, sau ghi vào bài học data discord phải đọc trên gcp".

**Lỗi đã xảy ra:**
- Em đoán data flow chỉ dựa vào code, không cross-check với data thật → kết luận audit thiếu chính xác.
- Em search `joinedAt` cho Hoàng Bảo Long bằng `grep` → không thấy do search không chuẩn → suýt kết luận sai là "members.json không có joinedAt".
- Khi vào GCP đọc `discipline-sheets/2026-04.json` thật → mới thấy bug chính xác (Bảo Long có `prefillSources.notYet=[01..06]` nhưng `days[1..6]=K` → confirm bug overwrite).

**Root cause:**
- Local folder `discord-bot/data/` là **dev/test data** hoặc snapshot cũ.
- Bot **production chạy trên GCP** (`34.28.61.240:~/discord-bot/data/`) — đó mới là nơi:
  - `members.json` thật (có thể khác local nếu HR sync qua slash command).
  - `discipline-sheets/<month>.json` thật (sheet HR đã upload Excel + sửa cell).
  - `leave-requests.json`, `holidays.json`, `daily-leaves.json` thật.
- Local `.gitkeep` chỉ để giữ folder structure khi commit code.

**Cách fix:**
- KHÔNG đọc data runtime ở `discord-bot/data/` local → luôn SSH GCP đọc:
```bash
ssh -i ~/.ssh/google_compute_engine -o StrictHostKeyChecking=no orecacrazy@34.28.61.240 \
  "cat ~/discord-bot/data/<file>.json"
```
- Hoặc dùng python3 để parse + filter trên GCP rồi chỉ in field cần (tiết kiệm token):
```bash
ssh ... "cd ~/discord-bot && python3 -c \"
import json
with open('data/discipline-sheets/2026-04.json') as f: sheet = json.load(f)
# print field cần thôi
\""
```

**Phòng ngừa:**
1. **Trước khi audit logic bot Discord** → tự hỏi: "Data này runtime hay static?"
   - Static (code, schema, mockup, `.env.example`, plan markdown) → đọc local OK.
   - Runtime (`data/*.json`, `logs/`, file HR upload, file cron generate) → SSH GCP.
2. **Khi user phản ánh bug discipline/leave/holiday** → mặc định SSH GCP đọc trước, KHÔNG đoán theo local.
3. **List file runtime BẮT BUỘC đọc trên GCP** (cập nhật khi có thêm):
   - `data/members.json` (HR đồng bộ qua `/refresh-members`)
   - `data/discipline-sheets/<YYYY-MM>.json` + backup
   - `data/leave-requests.json` + backup
   - `data/holidays.json`, `data/daily-leaves.json`, `data/shift-changes.json`
   - `data/leave-snapshot-*.json`
   - `data/standup-draft.json`, `data/meetings.json`, `data/polls.json`, `data/messages.json`
   - `data/files/`, `data/holiday-uploads/`, `data/exports/`
4. **Khi cần edit data runtime** (vd HR fix tay 1 cell sai) → ưu tiên dùng API/slash command. Nếu BẮT BUỘC sửa file → SSH GCP, backup trước (`cp file.json file.json.bak.<ts>`), edit, rồi `pm2 restart` nếu cần.

**Liên kết:**
- L-35 (line 1180): KHÔNG ssh sau push code (deploy auto). L-36 này khác — SSH để **đọc data runtime**, không phải deploy.
- `gcp-connections.md`: chi tiết SSH key + IP các bot.

---

## L-37: VM GCP iruka chạy timezone UTC — PM2 cron phải tự convert (2026-05-09)

**Bối cảnh:**
Khi setup auto-restart 3 bot mỗi tuần CN 02:00 sáng giờ VN, em set cron `0 2 * * 0` mặc định nghĩ là giờ VN. Mr Đào hỏi lại "giờ VN hay UTC?" — em SSH check thì phát hiện VM đang `Etc/UTC (UTC+0)` → cron `0 2 * * 0` thực tế = **02:00 UTC = 09:00 sáng CN giờ VN** (giờ làm việc, sai). Phải fix chuyển sang `0 19 * * 6` (T7 19:00 UTC = CN 02:00 VN).

**Lỗi đã xảy ra:**
- Set cron PM2 `--cron-restart` mà không kiểm tra timezone VM trước.
- Báo cho user "02:00 CN giờ VN" trong khi thực tế là 02:00 UTC = 09:00 VN.

**Root cause:**
- VM GCP `34.28.61.240` (iruka-bot) chạy `timedatectl` = `Etc/UTC (UTC, +0000)`.
- PM2 cron-restart không có option `--timezone`, dùng default OS timezone → UTC.
- Discord.js `cron.schedule(..., { timezone })` (như trong `services/scheduler-hr.js`) CHỈ áp dụng cho cron INTERNAL trong code, KHÔNG áp dụng cho PM2 cron-restart.

**Cách fix:**
Convert cron expression sang UTC trước khi set:
```
VN time → UTC time = VN - 7 giờ
VN 02:00 CN → UTC 19:00 T7 (ngày hôm trước)
Cron: '0 19 * * 6'   (phút=0, giờ=19, * * thứ=6=T7)
```

Stagger 3 bot cách 3 phút:
```bash
pm2 restart iruka-discord-bot --cron-restart='0 19 * * 6'   # 02:00 VN CN
pm2 restart iruka-hr-bot      --cron-restart='3 19 * * 6'   # 02:03 VN CN
pm2 restart iruka-tech-bot    --cron-restart='6 19 * * 6'   # 02:06 VN CN
pm2 save
```

**Phòng ngừa:**
1. **Trước khi set bất kỳ cron PM2 nào** trên GCP iruka VM → CHẠY check timezone:
   ```bash
   ssh GCP → timedatectl | grep 'Time zone'
   ```
2. **Cron table convert nhanh** (UTC+7 = VN):
   | Giờ VN muốn | Cron UTC tương ứng |
   |---|---|
   | T2-T6 09:00 VN | `0 2 * * 1-5` (T2-T6 02:00 UTC) |
   | T2-T6 18:00 VN | `0 11 * * 1-5` (T2-T6 11:00 UTC) |
   | CN 02:00 VN | `0 19 * * 6` (T7 19:00 UTC) ⚠️ note T7 UTC vì lệch ngày |
   | CN 09:00 VN | `0 2 * * 0` (CN 02:00 UTC) |
3. **Lệch ngày**: nếu giờ VN < 7 sáng → cron UTC sẽ rơi vào ngày HÔM TRƯỚC (vd CN 02:00 VN → T7 19:00 UTC).
4. **Internal bot cron** (vd `scheduler-hr.js`): KHÔNG cần convert vì code đã dùng `{ timezone: 'Asia/Ho_Chi_Minh' }`. Chỉ PM2 cron-restart mới cần convert.
5. **Alternative fix lâu dài**: Set VM timezone về VN qua `sudo timedatectl set-timezone Asia/Ho_Chi_Minh`. Nhưng có thể ảnh hưởng log timestamp + scheduler internal đang assume UTC. KHÔNG khuyến nghị làm trên VM đang chạy production.

**Liên kết:**
- L-36 (line 1210): SSH check data runtime trên GCP.
- File `services/scheduler-hr.js`: code mẫu cron internal có timezone VN.

---

### [L-36] Match user giữa các hệ thống IruKa BẮT BUỘC dùng discord_id, KHÔNG dùng name

- **Người phát hiện:** Mr. Đào (Tùng Dev báo bug)
- **Ngày:** 2026-05-10
- **Domain:** System / Data Integration / KPI
- **Agent gây lỗi (logic gốc):** không rõ — bug có sẵn từ trước
- **Agent fix:** Claude Opus 4.7 (1M context)

**Bối cảnh:**
Tùng (Dev) báo bug: vào trang `/weekly` tuần 19, bảng "BÁO CÁO TUẦN TRƯỚC" trống không, dù Sheet KPI có 8 dòng KH tuần 19 mà Tùng đã đặt từ tuần 18. Em probe production GAS phát hiện 6/16 nhân viên đều bị cùng bug — KHÔNG riêng Tùng.

**Lỗi xảy ra:**
- Sheet KPI Data lưu tên NGẮN (gọi quen miệng): "Kiều Tùng", "Trần Khánh Linh", "Đinh Ngọc Ánh", "Phạm Hiếu", "Nhật Minh", "Nguyễn Hùng".
- `data/members.json` của bot lưu tên ĐẦY ĐỦ (theo CCCD/Discord): "Kiều Thanh Tùng", "Trần Thị Khánh Linh", "Đinh Thị Ngọc Ánh", "Phạm Minh Hiếu", "Cao Nhật Minh", "Nguyễn Quốc Hùng".
- Discord bot `/weekly` gửi `applicantName = memData.name` (đầy đủ) → URL `?name=Kiều Thanh Tùng`.
- GAS query Sheet bằng exact match `row[0] === reqName` → KHÔNG match "Kiều Tùng" → trả `tasks=[]` → form trống.

**Root cause:**
Hai hệ thống dùng `name` làm khóa nối, nhưng `name` KHÔNG đồng bộ giữa Sheet (cũ, viết tắt) và members.json (chuẩn hoá sau này).

**Cách fix (đã apply 2026-05-10):**
1. Migrate Sheet KPI: thêm cột S = `discord_id`, backfill 221 rows từ `data/members.json` (script `scripts/migrate-kpi-add-discord-id.js`, manual map 6 NV mismatch).
2. Sửa GAS code (`docs/Gas/gasweeklynew.js`): thêm helper `rowMatchesUser(row, name, discord_id)` — ưu tiên match `discord_id`, fallback match `name`. Áp dụng cho cả 4 chỗ: `doGet DEFAULT`, `doGet action=result`, `doPost xóa row cũ`, `doPost action=approve`. `doPost append` thêm cột S = body.discord_id.
3. Sửa webapp `kpi-webapp/src/app/api/kpi/route.ts`: forward `discord_id` từ URL bot sang GAS.
4. Bot KHÔNG sửa — đã gửi discord_id sẵn từ trước.

Verify sau fix: 6/6 NV mismatch trả về tasks > 0 (tổng 17 tasks + 7 planTasks load đúng).

**Phòng ngừa — Quy tắc bắt buộc cho mọi tích hợp data IruKa:**

```
✅ KHI VIẾT logic nối 2 hệ thống IruKa (Sheet ↔ members.json ↔ Bot ↔ Webapp ↔ FastAPI ↔ GAS):
1. DÙNG discord_id làm khóa chính (BẤT BIẾN — không đổi suốt đời NV)
2. name CHỈ ĐỂ HIỂN THỊ — KHÔNG dùng để match
3. Mọi bảng dữ liệu lưu user info phải có cột discord_id từ ngày 1
4. Khi onboard NV mới: bot sinh discord_id → ghi vào tất cả hệ thống ngay

✅ KHI THIẾT KẾ schema mới (Sheet, DB, JSON):
- Bao giờ cũng có column/field `discord_id` cho user
- KHÔNG được phép có user record mà chỉ có name không có id
- Foreign key giữa các bảng phải dùng id, không dùng name

❌ KHÔNG bao giờ:
- Match user 2 hệ thống bằng name (kể cả tên đầy đủ — vẫn có thể đổi)
- Tin tưởng name là unique (có thể trùng tên giữa 2 NV, hoặc đổi sau này)
- Lưu user record không có discord_id
```

**Trade-off đã cân nhắc:**
- Phương án thay alternative `kpiName` (alias) → bị từ chối vì khi đổi tên members.json hoặc onboard NV mới cần nhớ thêm alias → fragile.
- Phương án fuzzy match name (Levenshtein) → bị từ chối vì có thể match lầm 2 NV trùng họ.
- → Phương án dùng `discord_id` là **self-healing**: anh đổi tên Sheet hay members.json bao nhiêu lần cũng OK.

**Phạm vi áp dụng:**
- Toàn bộ hệ thống IruKa Edu: discord-bot, kpi-webapp, iruka-edu-service, iruka-app, game-hub, hoc-lieu, iruka_news.
- Đặc biệt: bất kỳ tích hợp nào với Google Sheets (KPI weekly, monthly, evaluation).

**Liên kết:**
- Plan gốc: `discord-bot/docs/plan/fix-kpi-weekly-name-mismatch.md`
- GAS code mới: `discord-bot/docs/Gas/gasweeklynew.js`
- GAS code cũ (backup): `discord-bot/docs/Gas/gasweeklyold.js`
- Migrate script: `discord-bot/scripts/migrate-kpi-add-discord-id.js`

---

## L-38: TailwindCSS arbitrary classes KHÔNG luôn được build — phải dùng inline style cho critical styling (2026-05-14)

**Bối cảnh:**
Khi đắp UI từ mockup HTML vào React component (iruka-app `/missions` page), em viết các class arbitrary của TailwindCSS như `aspect-[308/211]`, `max-w-[72px]`, `text-[#FB923C]`, `bg-[#FFF7ED]/70`, `opacity-[0.55]`, `text-[24px]`, `rounded-[14px]`... để khớp pixel-perfect mockup. Code save thành công, TypeScript pass, không lỗi. Nhưng sau khi hard reload, UI **KHÔNG ĐỔI** — slot sticker vẫn giãn full width thay vì max 72px, dấu "?" vẫn đen thay vì cam, khung gradient vẫn aspect cũ.

Mr Đào báo "tôi chưa thấy thay đổi gì trên thực tế so với mockup" sau khi em sửa nhiều lần → mới phát hiện ra Tailwind không build các class arbitrary đó.

**Lỗi đã xảy ra:**
- Lặp đi lặp lại nhiều lần: em sửa class `aspect-[Xpx/Ypx]`, `text-[#color]`, `max-w-[Xpx]` → UI không update → em tưởng do cache → bảo user hard reload → vẫn không đổi → em sửa tiếp → vẫn không đổi.
- Mất ~3-4 lượt sửa cho cùng 1 lỗi (lệch khung avatar 308/211, lệch slot sticker 72px, sai màu locked "?").
- User mệt mỏi vì phải báo đi báo lại "vẫn chưa thấy thay đổi" trong nhiều turn liên tiếp.

**Root cause:**
TailwindCSS JIT compiler **không scan đủ** tất cả arbitrary classes trong code khi:
1. **Class arbitrary phức tạp**: dạng `aspect-[308/211]`, `bg-[#FFF7ED]/70`, `opacity-[0.55]` — JIT phân tích regex/AST có thể miss
2. **Dev server cache**: class mới thêm vào trong session đang chạy, JIT không invalidate được
3. **Tailwind v4 vẫn còn beta** với 1 số edge case arbitrary value chưa stable
4. **Build production**: PurgeCSS có thể xóa class không nhận diện được dạng `[Xpx/Ypx]`

→ Hệ quả: class render trong DOM (em thấy `class="aspect-[308/211]"` trong HTML) nhưng **CSS rule không tồn tại** trong stylesheet → browser bỏ qua class đó → UI giữ default.

**Cách phát hiện sớm:**
1. Mở DevTools → F12 → Inspect element → tab "Styles" → check xem class arbitrary có được liệt kê với rule CSS thật không
2. Tìm trong DevTools Console: `getComputedStyle($0).aspectRatio` → nếu trả về `"auto"` thay vì `"308 / 211"` → Tailwind không build class
3. Search class trong file CSS cuối cùng (`globals.css` compiled): `grep "aspect-\\[308" .next/static/css/*.css` → không thấy = không build

**Cách fix triệt để:**
**DÙNG INLINE STYLE `style={{}}` cho TẤT CẢ critical styling**:
- ✅ Kích thước cố định: `width`, `height`, `maxWidth`, `aspectRatio`
- ✅ Màu sắc hex: `color`, `background`, `borderColor`
- ✅ Padding/margin với giá trị lẻ: `padding: '18px 22px'`
- ✅ Font-size, font-weight ngoài chuẩn Tailwind: `fontSize: 24, fontWeight: 900`
- ✅ Opacity số lẻ: `opacity: 0.55`
- ✅ Box-shadow tùy chỉnh: `boxShadow: '0 2px 6px rgba(0,0,0,0.05)'`

**GIỮ LẠI Tailwind class cho**:
- Layout primitives: `flex`, `flex-col`, `grid`, `items-center`, `justify-center`
- Spacing chuẩn: `mb-6`, `gap-2`, `p-4`
- Responsive: `md:`, `lg:`, `xl:`
- States: `hover:`, `active:`, `disabled:`

**Phòng ngừa khi đắp mockup HTML → React (workflow /4-frontend-mockup-fidelity):**

1. **NGAY TỪ ĐẦU**, khi đọc spec mockup và thấy giá trị NGOÀI Tailwind preset (vd `padding: 18px 22px`, `border-radius: 14px`, `font-size: 24px`, `color: #FB923C`) → **viết thẳng inline style**, KHÔNG cố ép vào `text-[24px]` / `rounded-[14px]`.

2. **Quy tắc thumb 80/20**:
   - 80% style đặt được bằng class chuẩn → dùng className
   - 20% còn lại (kích thước/màu CHÍNH XÁC theo mockup) → dùng style inline
   - KHÔNG vì 1 dòng inline style mà chuyển hết về inline — tốn bundle

3. **Template chuẩn cho card pixel-perfect**:
   ```jsx
   <div
     className="relative flex items-center overflow-hidden border-solid"
     style={{
       padding: '18px 22px',     // mockup spec: padding tùy chỉnh
       borderRadius: 18,          // mockup spec: radius tùy chỉnh
       borderWidth: 1.5,          // mockup spec: 1.5px
       borderColor: '#FED7AA',    // hex color
       gap: 22,                   // gap tùy chỉnh
       background: 'linear-gradient(...)',
     }}
   >
   ```

4. **Verify ngay sau khi code**:
   - Hard reload trang
   - Inspect element → check 1-2 thuộc tính chính (vd: `aspectRatio` của khung, `maxWidth` của slot)
   - Nếu thuộc tính trả về sai → biết ngay là class arbitrary không build → đổi sang inline ngay (không chờ user báo)

5. **KHÔNG bao giờ giả định "TypeScript pass → UI sẽ đúng"** — TS chỉ check syntax, không kiểm tra Tailwind class có được build thành CSS hay không.

**Đề xuất kaizen workflow:**
Cập nhật `.agent/workflows/4-frontend-mockup-fidelity.md` thêm rule:
- "Khi spec mockup có giá trị NGOÀI default Tailwind preset → mặc định dùng inline style ngay"
- "Sau khi code xong, MỞ DevTools verify 1-2 thuộc tính trước khi báo done cho user"

**Liên kết:**
- File mockup gốc: `iruka-app/mockup/nhiem-vu/v2-states/state-1-ready.html` (line 426-439 spec `.dt-sticker`)
- File code đã fix bằng inline style: 
  - `iruka-app/src/features/engagement/components/desktop/DesktopStickerStrip.tsx`
  - `iruka-app/src/features/engagement/components/desktop/DesktopSuggestCard.tsx`
  - `iruka-app/src/features/engagement/components/tablet/TabletSuggestCard.tsx`
- Workflow áp dụng: `/4-frontend-mockup-fidelity`

---

## L-39: Tách rõ DATA vs CODE — Data Discord runtime EDIT trực tiếp GCP, Code DEPLOY qua git (2026-05-15)

**Bối cảnh:**
Mr Đào nhờ thêm field `githubUsernameAlts` vào record của Vũ Ngọc Đào trong `members.json` để gom 2 GitHub account `orecateamedu` + `orecacrazy-alt` thành 1 trong báo cáo git-report 18h của Tech bot.

Em làm theo phản xạ cũ: edit file local `/Users/user/Desktop/work-space/cong-nghe/discord-bot/data/members.json` trước, định bụng sẽ deploy qua git push.

**Lỗi đã xảy ra:**
- Mr Đào ngắt em ngay: *"Data trên gcp mới nhất, data local bị outdate, nên bạn phải vào trực tiếp gcp để thêm vào members.js, còn các file khác phải qua con đường deploy."*
- Em đã edit local rồi → nếu deploy qua git push → sẽ ĐÈ MẤT các thay đổi runtime mới hơn trên GCP (vd: leave balance update, members onboard tuần này, attendance log...).
- May là chưa push — em revert kịp local trước khi gây thiệt hại.

**Root cause:**
1. **Em LẪN giữa "data" và "code"** — đối xử cả 2 như cùng 1 loại file → push cùng nhau qua git.
2. **Quên rằng data file (members/leaves/attendance/salary/discipline...) là MUTABLE runtime** — Discord bot ghi liên tục mỗi khi NV xin nghỉ, chấm công, vi phạm... Local copy có thể outdate vài giờ → vài ngày.
3. **Lesson L-36 (2026-05-08) đã ghi đúng nguyên tắc "data runtime phải đọc trên GCP"** nhưng L-36 chỉ nói về ĐỌC. Em chưa internalize phần GHI — vẫn theo phản xạ "sửa local rồi push".

**Cách phát hiện sớm:**
- Trước khi định edit BẤT KỲ file nào trong `discord-bot/data/`, em hỏi mình:
  - File này có được bot ghi thường xuyên không? (members.json: có · leaves.json: có · attendance.json: có · salary-*: có · disciplines-*: có · members-snapshot: có · backups/: có)
  - Đây là data hay là code? Nếu có data mutation → KHÔNG edit local.
- Hoặc check thời gian sửa: `ssh iruka-discord-bot "stat -c '%y' /home/orecacrazy/discord-bot/data/members.json"` — nếu mới sửa < 24h và local cũ hơn → confirm local outdate.

**Cách fix triệt để — Workflow chuẩn cho 2 loại file:**

| Loại file | Vị trí gốc | Cách edit | Cách deploy |
|---|---|---|---|
| **CODE** (`*.js`, `commands/`, `services/`, `package.json`) | Local repo | Edit local | `git push` → auto-pull GCP → `pm2 restart` |
| **DATA RUNTIME** (`data/*.json`) — members, leaves, attendance, salary, disciplines, snapshots | **GCP** (`/home/orecacrazy/discord-bot/data/`) | SSH GCP edit trực tiếp | Không deploy — đã apply tại chỗ |
| **DATA SEED** (vd `config/*.example.json`, `templates/*`) | Local repo | Edit local | `git push` (đây là template, không phải runtime) |

**Quy trình SSH edit DATA RUNTIME trên GCP (an toàn):**

```bash
# Bước 1: Test SSH thông
ssh iruka-discord-bot "whoami && ls /home/orecacrazy/discord-bot/data/<file>.json"

# Bước 2: Tìm tool có sẵn (jq là tốt nhất cho JSON; node fallback)
ssh iruka-discord-bot "which jq python3 && ls /home/orecacrazy/.nvm/versions/node/*/bin/node"

# Bước 3: Backup TRƯỚC khi sửa (đặt suffix có ngày để dễ rollback)
ssh iruka-discord-bot "cp /home/orecacrazy/discord-bot/data/<file>.json /home/orecacrazy/discord-bot/data/<file>.json.bak.before-<change>-$(date +%Y-%m-%d)"

# Bước 4: Edit qua jq (atomic write tmp + mv)
ssh iruka-discord-bot "cd /home/orecacrazy/discord-bot && jq '<jq-expression>' data/<file>.json > data/<file>.json.tmp && mv data/<file>.json.tmp data/<file>.json"

# Bước 5: Verify
ssh iruka-discord-bot "jq '<verify-path>' /home/orecacrazy/discord-bot/data/<file>.json"

# Bước 6: Bot HOT-RELOADS data tự động khi có require/readFile mới → KHÔNG cần restart
#   Trừ khi data được cache trong memory (vd module._membersCache) → cần restart bot
ssh iruka-discord-bot "pm2 restart <process-name>"  # chỉ khi cần
```

**Ví dụ jq commands hay dùng:**
- Add field: `jq '.<key>.<subkey> = "value"' f.json`
- Add field array: `jq '.<key>.<arrField> = ["a","b"]' f.json`
- Append to array: `jq '.<key>.<arrField> += ["new"]' f.json`
- Delete field: `jq 'del(.<key>.<subkey>)' f.json`
- Update conditional: `jq '(.<key> | select(.foo == "bar")) |= (.baz = "qux")' f.json`

**Phòng ngừa cho lần sau:**
1. **NGAY KHI nhận yêu cầu sửa file** — em phân loại trước:
   - Bot đọc file này runtime? → DATA → SSH GCP
   - File này được bot ghi vào không? → DATA RUNTIME → SSH GCP
   - File này chỉ ở dev time (code, config template, schema)? → CODE → edit local
2. **Tránh phản xạ `Edit /Users/user/.../data/...`** — luôn pause 1 nhịp tự hỏi "file này live ở đâu?"
3. **Mở memory L-36 + L-39 đọc lại khi bắt đầu task discord-bot** — đặc biệt khi nhắc đến members/leaves/attendance/salary/disciplines.
4. **Nếu lỡ edit local data** — revert ngay với git checkout / git diff để xem có thay đổi gì khác, đừng tiếp tục push.

**Liên kết:**
- L-36 (2026-05-08): Discord bot data RUNTIME phải đọc trên GCP
- File code có liên quan: `discord-bot/services/githubDailyDigest.js` (lookup canonical username qua _findMemberByGithub)
- SSH alias: `iruka-discord-bot` (GCP IAP tunnel, user `orecacrazy`)
- Path data GCP: `/home/orecacrazy/discord-bot/data/`
- Backup tạo lần này: `members.json.bak.before-alts-2026-05-15`
- Workflow áp dụng: `/6-fix-bug` (khi sửa data) + `/7-deploy-flow` (khi deploy code)

---

## L-40: L-38 chưa thành phản xạ — phải áp dụng inline style NGAY từ lần đầu sửa padding, không đợi user nhắc (2026-05-15)

**Bối cảnh:**
Đang sửa Ribbon Desktop tab Thành tích (`iruka-app/src/features/engagement/components/shared/AchievementRibbon.tsx`) trong tab `/achievements`. Mr. Đào báo "trophy sát viền trái, pie 7% sát viền phải" → em sửa `px-[22px]` → `px-[32px] py-[20px]` (vẫn dùng Tailwind arbitrary). Mr. Đào báo lại "vẫn sát, bên trong phải to hơn nữa, trong memory tôi đã lưu bài học rồi, bạn lục lại". Em mở memory L-38 mới nhớ → đổi sang `style={{ padding: '32px 40px' }}` inline. Đến lúc này anh mới hài lòng.

**Lỗi đã xảy ra:**
- L-38 đã có từ 2026-05-14 với cảnh báo rất rõ: "padding lẻ → DÙNG INLINE STYLE NGAY"
- Em đã đọc memory đầu conversation (theo Rule 4.1 Startup Checklist)
- NHƯNG khi gặp tình huống cụ thể "sửa padding", em vẫn phản xạ viết `px-[Xpx]` arbitrary
- Mất 1 turn extra để Mr. Đào nhắc "lục memory" — đáng ra phải áp dụng L-38 từ lần đầu
- Cộng dồn còn 1 lỗi nữa: lần đầu em hiểu nhầm yêu cầu — anh nói "sát viền" nghĩa là **chiều dọc** (top/bottom) chứ không chỉ chiều ngang → em chỉ tăng `px` mà bỏ qua `py`

**Root cause:**
1. **Memory đọc nhưng chưa thành phản xạ context-aware**: Rule 4.1 yêu cầu đọc memory đầu conversation, nhưng khi gặp tình huống cụ thể (sửa padding), em không tự động liên tưởng L-38
2. **Hiểu nhầm trigger word "sát viền"**: tiếng Việt "sát viền" có thể nghĩa cả 4 chiều — em chỉ fix ngang mà không hỏi rõ hoặc đoán theo nhiều hướng
3. **Không có pattern matching cho từ khóa UI**: thiếu rule "khi user nói 'padding/spacing/sát/căn chỉnh' → PHẢI dùng inline style ngay"

**Cách fix triệt để (CHECKLIST khi user yêu cầu sửa khoảng cách):**

```
✅ BƯỚC 1 — Hiểu đúng yêu cầu trước khi code:
  - "Sát viền trái/phải"   → padding-left/right
  - "Sát viền trên/dưới"   → padding-top/bottom
  - "Mọi cái sát viền"     → padding TẤT CẢ 4 chiều (cả ngang lẫn dọc)
  - "Bên trong phải to hơn"→ padding tổng (cả 4 chiều)
  - Không chắc → HỎI 1 câu xác nhận trước khi code

✅ BƯỚC 2 — Áp dụng L-38 ngay (KHÔNG đợi user báo "vẫn sát"):
  - DÙNG `style={{ padding: 'Xpx Ypx' }}` inline TỪ LẦN ĐẦU
  - KHÔNG dùng `px-[Xpx] py-[Ypx]` (Tailwind arbitrary — có thể JIT không build)
  - Nếu code cũ đang dùng arbitrary → đổi luôn sang inline, không đợi user phát hiện

✅ BƯỚC 3 — Verify trước khi báo done:
  - F12 → Inspect → tab Computed → check giá trị padding thật
  - Nếu trả về sai → đổi inline ngay
```

**Trigger words BẮT BUỘC kích hoạt L-38 + L-40:**
- "padding", "margin", "spacing", "khoảng cách"
- "sát viền", "sát mép", "sát edge", "không thoáng"
- "căn chỉnh", "căn cho đẹp", "căn lại"
- "to hơn", "nhỏ hơn", "rộng hơn", "cao hơn"
- "pixel perfect", "giống mockup", "không giống mockup"

→ Khi user dùng BẤT KỲ từ nào trong list trên → STOP, mở memory L-38 + L-40, dùng inline style ngay.

**Phòng ngừa workflow:**
1. Cập nhật `/6-fix-design-fidelity` thêm BƯỚC 0: "Nếu code đang dùng Tailwind arbitrary cho padding/margin → đổi sang inline style TRƯỚC KHI sửa kích thước"
2. Cập nhật `/4-frontend-mockup-fidelity` thêm reminder L-40 ở đầu workflow
3. Khi gặp yêu cầu sửa khoảng cách lần 2 cho cùng 1 element → STOP code, check memory ngay (đừng tiếp tục đoán)

**Liên kết:**
- L-38 (2026-05-14): Bài học gốc về Tailwind arbitrary không build thành CSS
- File code đã fix lần này: `iruka-app/src/features/engagement/components/shared/AchievementRibbon.tsx`
- Workflow áp dụng: `/6-fix-design-fidelity` + `/4-frontend-mockup-fidelity`
- Thời gian tốn extra: 1 turn (đáng ra fix trong lần đầu nếu nhớ L-38)
