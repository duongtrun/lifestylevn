# 🚫 Anti-Patterns — IruKa Workspace

> Những điều Antigravity AI KHÔNG BAO GIỜ được làm trong IruKa.
> Đọc bắt buộc trước mỗi task quan trọng.

---

## 🔴 TUYỆT ĐỐI KHÔNG (Gây hại hệ thống)

| #      | Anti-Pattern                                                             | Lý do                                            | Thay bằng                                                   |
| ------ | ------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------ |
| AP-001 | Sửa DB schema trực tiếp không qua Alembic                            | Mất lịch sử migration, không rollback được | Viết Alembic migration file                                 |
| AP-002 | Hardcode API keys / secrets trong code                                   | Security breach, bị lộ lên git                 | Dùng .env + .env.example                                    |
| AP-003 | console.log() sensitive data (token, password)                           | Log leak, vi phạm bảo mật                      | Log ID không nhạy cảm                                     |
| AP-004 | Tự refactor diện rộng khi đang fix bug nhỏ                          | Gây regression, mất kiểm soát scope           | Chỉ sửa đúng chỗ cần, ghi chú phần cần refactor sau |
| AP-005 | Xóa file/data mà không confirm user                                   | Mất dữ liệu không phục hồi được          | Hỏi confirm trước khi xóa                                |
| AP-006 | Code vào thư mục deprecated (iruka-app-frontend, iruka-mini-game-sdk) | Công sức lãng phí, không được deploy      | Dùng iruka-app và game-sdk                                 |
| AP-008 | Tự động dùng AI Browser Subagent để mở web test                       | Không khả thi khi có âm ау/micro/UI phức tạp | Xây dựng xong báo cáo để User tự test trên trình duyệt thật |
| AP-009 | **Tự ý mở trình duyệt / browser subagent khi chưa được phép**       | Làm phiền màn hình, gián đoạn công việc Mr. Đào | Chỉ mở trình duyệt khi user nói rõ "mở browser", "xem trang", "demo trên web". **KHÔNG được tự ý mở để check DOM/visuals khi chưa xin phép.** |
| AP-008 | Tự chạy `git commit` / `git add` / `git push`                       | Mr. Đào dùng lệnh `iruka` để quản lý git — AI không được can thiệp vào git workflow | Chỉ viết/sửa file. Không chạy bất kỳ lệnh git nào |
| AP-018 | **Format Date không truyền `timeZone: 'Asia/Ho_Chi_Minh'`** (vd `new Date(ts).toLocaleString('vi-VN')`) | GCP server chạy UTC → hiển thị giờ UTC trong DM/Embed/Footer thay vì giờ VN (lệch 7 giờ). Người Việt nhìn vào không hiểu, gây nhầm lẫn nghiêm trọng cho HR/CEO/NV | **BẮT BUỘC**: `new Date(ts).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })` cho mọi Date format server-side. Webapp client-side cũng nên thêm cho consistency (browser timezone có thể khác VN) |

---

## 🟠 NGUY HIỂM (Dễ gây ra bug / rủi ro cao)

| #      | Anti-Pattern                                            | Lý do                           | Thay bằng                             |
| ------ | ------------------------------------------------------- | -------------------------------- | -------------------------------------- |
| AP-007 | Dùng `any` trong TypeScript                          | Mất type safety, bug khó debug | Dùng đúng type hoặc `unknown`    |
| AP-008 | Không có error handling trong API call                | App crash không hiểu lý do    | try/catch + error state đầy đủ     |
| AP-009 | Thay đổi API response format mà không báo frontend | Frontend crash                   | Báo frontend cần update types        |
| AP-010 | Copy-paste code block thay vì tạo function            | Code trùng lặp, khó maintain  | Extract thành shared function/hook    |
| AP-011 | Sửa chỗ A mà không kiểm tra ảnh hưởng đến B   | Cascade bug                      | Trước khi sửa, kiểm tra dependency |
| AP-012 | Tự chạy lệnh git nằm trong câu lệnh dài dạng `&& git push`         | Lách rule bằng cách ghép vào cuối lệnh khác, vẫn là vi phạm | Tách riêng, không ghép git vào lệnh bất kỳ |

---

## 🟡 NÊN TRÁNH (Best practice)

| #      | Anti-Pattern                                         | Lý do                                              | Thay bằng                            |
| ------ | ---------------------------------------------------- | --------------------------------------------------- | ------------------------------------- |
| AP-012 | Hỏi quá nhiều câu hỏi kỹ thuật với Mr. Đào | Anh không biết code, sẽ không trả lời được | Tự quyết định theo best practice  |
| AP-013 | Giải thích bằng jargon kỹ thuật                 | Mr. Đào không hiểu                              | Dùng ngôn ngữ đời thường       |
| AP-014 | Commit mà không ghi conventional commit message    | Khó trace lịch sử                                | feat/fix/chore/docs/refactor: mô tả |
| AP-015 | Làm task mà không khai báo workflow đang dùng  | Không minh bạch, khó review                      | Khai báo workflow ở đầu response  |
| AP-016 | **Dùng dữ liệu giả (mock data) trong Mockup/Preview**  | Mockup hiển thị sai sự thật, không phản ánh đúng luồng thật | Dùng dữ liệu thật từ API/DB — child_id thật, bài học thật |
| AP-017 | **Mockup dùng UI/UX giả (cắt bớt, tắp lược) khác UI/UX thật**  | Anh nhìn mockup tưởng OK nhưng khi dùng thật lại khác — gây mất niềm tin | Mockup phải render chính xác component thật, đúng flow thật, không "rút gọn" UI |

---

## 📝 Ghi chú

Mỗi anti-pattern mới cần:....

1. Draft nội dung
2. Báo Mr. Đào review
3. Được duyệt mới thêm vào đây

---

*Cập nhật lần cuối: 2026-04-22 | IruKa Anti-Patterns v1.2 — AP-016/017 Mockup phải dùng dữ liệu thật + UI thật*
