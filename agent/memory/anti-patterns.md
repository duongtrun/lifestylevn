# 🚫 Anti-Patterns — Web Lifestyle (FE Only)

> Những điều AI Agent / FE Dev **KHÔNG BAO GIỜ** được làm trong dự án `web-lifestyle`.
> Đọc bắt buộc trước mỗi task quan trọng.

---

## 🔴 TUYỆT ĐỐI KHÔNG (Gây hại hệ thống)

| # | Anti-Pattern | Lý do | Thay bằng |
|---|---|---|---|
| AP-001 | Hardcode API keys / secrets / token trong code | Lộ secret khi commit lên git, có thể bị khai thác | Dùng `.env.local` + `.env.example` |
| AP-002 | `console.log` dữ liệu nhạy cảm (token, password, PII) | Log bị lộ ra console production, vi phạm bảo mật | Chỉ log ID không nhạy cảm |
| AP-003 | Tự refactor diện rộng khi đang fix bug nhỏ | Gây regression, mất kiểm soát scope, PR khổng lồ khó review | Chỉ sửa đúng chỗ cần, ghi chú phần cần refactor sau |
| AP-004 | Xoá file/data không confirm Mr. Đào | Mất dữ liệu không phục hồi được | Hỏi confirm trước khi xoá |
| AP-005 | Tự ý mở trình duyệt / browser subagent test UI khi chưa được phép | Làm phiền màn hình, gián đoạn công việc Mr. Đào | Chỉ mở trình duyệt khi user nói rõ "mở browser", "xem trang". Mr. Đào TỰ test UI |
| AP-006 | Tự chạy `git commit` / `git add` / `git push` không được yêu cầu | Mr. Đào quản lý git workflow — AI không được can thiệp | Chỉ viết/sửa file. Không chạy lệnh git khi chưa được phép |
| AP-007 | Tự tạo workflow / rule mới trong `agent/workflows/` | FE dev chỉ được dùng workflow có sẵn, Mr. Đào duyệt mới thêm | Đề xuất workflow mới qua chat → Mr. Đào duyệt → mới thêm |
| AP-008 | Tự append vào `lessons-learned.md` / `kaizen.md` / `anti-patterns.md` | File memory cần Mr. Đào duyệt | Draft nội dung → báo Mr. Đào → duyệt mới append |
| AP-009 | Tự đổi tech stack (thêm thư viện ngoài `TECH_STACK.md`) | Phá vỡ đồng bộ với hệ sinh thái IruKa | Hỏi Mr. Đào trước khi cài thư viện ngoài danh sách |

---

## 🟠 NGUY HIỂM (Dễ gây bug / rủi ro cao cho FE)

| # | Anti-Pattern | Lý do | Thay bằng |
|---|---|---|---|
| AP-010 | Dùng `any` trong TypeScript | Mất type safety, bug khó debug, runtime crash | Dùng đúng type hoặc `unknown` rồi narrow |
| AP-011 | Không có error handling trong API call (`apiClient.get()` không bọc try/catch) | App crash trắng màn hình, user không biết lỗi gì | Bọc try/catch + hiển thị toast/error UI thân thiện |
| AP-012 | Copy-paste code block thay vì tạo function/hook tái sử dụng | Code trùng lặp, sửa 1 chỗ quên chỗ khác | Tách thành shared function / hook / component |
| AP-013 | Sửa component A mà không kiểm tra component khác đang import nó | Cascade bug — A đổi prop làm B/C/D vỡ ngầm | Trước khi sửa, grep tìm các nơi đang dùng |
| AP-014 | Dùng `dangerouslySetInnerHTML` không sanitize | Lỗ hổng XSS — khách có thể inject script độc | Render data bình thường, hoặc sanitize bằng DOMPurify trước |
| AP-015 | Quên `'use client'` khi dùng useState/useEffect/event handler | Build lỗi "You're importing a component that needs useState" | Thêm `'use client'` ở đầu file CLient Component |
| AP-016 | Lạm dụng `'use client'` cho mọi component | Mất lợi thế SSR, SEO kém, bundle phình to | Mặc định Server Component, chỉ `'use client'` khi BẮT BUỘC |
| AP-017 | Dùng `<img>` thuần thay vì `next/image` | Không tự optimize, không lazy load, CLS xấu | Luôn dùng `next/image` cho ảnh nội dung |
| AP-018 | Format Date không truyền `timeZone: 'Asia/Ho_Chi_Minh'` | Browser của khách có thể ở múi giờ khác, hiển thị sai giờ Việt Nam | `new Date(ts).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })` |
| AP-019 | Để `console.log` debug trong code production | Spam console của khách, lộ logic nội bộ | Xoá hết trước khi commit, hoặc dùng `if (process.env.NODE_ENV === 'development')` |

---

## 🟡 NÊN TRÁNH (Best practice)

| # | Anti-Pattern | Lý do | Thay bằng |
|---|---|---|---|
| AP-020 | Hỏi quá nhiều câu hỏi kỹ thuật với Mr. Đào | Anh không biết code, không trả lời được | Tự quyết định theo best practice + Tech Stack đã chốt |
| AP-021 | Giải thích bằng jargon kỹ thuật tiếng Anh | Mr. Đào không hiểu | Việt hoá thuật ngữ + chú thích trong ngoặc lần đầu |
| AP-022 | Commit message không theo Conventional Commits | Khó trace lịch sử, PR khó review | `feat:` / `fix:` / `chore:` / `docs:` / `refactor:` + mô tả tiếng Việt |
| AP-023 | Làm task mà không khai báo workflow đang dùng | Không minh bạch, khó review quy trình | Khai báo workflow ở đầu response: `📋 Workflow: /[tên]` |
| AP-024 | Mockup dùng UI cắt rút gọn khác UI thật | Mr. Đào nhìn mockup tưởng OK, khi dùng thật mới phát hiện khác | Mockup phải render đúng component thật, đúng flow thật |
| AP-025 | Quên test responsive 3 cỡ (mobile 393 / tablet 820 / desktop 1440) | Layout vỡ khi user mở trên thiết bị thật | BẮT BUỘC test cả 3 cỡ trước khi báo cáo xong |
| AP-026 | Để Lighthouse Performance < 90 mà vẫn báo xong | LCP > 2.5s → user bỏ trang, mất khách | Kiểm tra Lighthouse trước khi nghiệm thu, fix nếu < 90 |
| AP-027 | Quên export `metadata` cho page | SEO kém, Google không hiểu trang nói gì | Mỗi `page.tsx` phải export `metadata` (title + description + OG) |
| AP-028 | Quên `alt` cho ảnh, `aria-label` cho button icon-only | A11Y kém, screen reader đọc sai | Mọi `<Image>` có `alt`, mọi `<button>` icon có `aria-label` |

---

## 📝 Ghi chú

Mỗi anti-pattern mới cần:
1. Draft nội dung
2. Báo Mr. Đào review
3. Được duyệt mới thêm vào đây

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Anti-Patterns — Phiên bản FE-only*
