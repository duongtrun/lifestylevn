---
description: audit-frontend dùng khi kiểm tra các luồng màn hình lên kế hoạch
---

// turbo-all

Audit màn hình frontend phải gồm:

1. tổng quan màn
2. liệt kê toàn bộ flow (happy, error, edge) đầy đủ nhất.
3. kiểm tra UI thực tế : Đọc code + mô tả kết quả dự kiến
4. kiểm tra code hiện tại
5. so sánh UI vs logic
6. bảng đề xuất chỉnh sửa (bắt buộc)

Bảng phải có:
- Số thứ tự
- Flow
- logic
- Đang hiển thị cho user thế nào (nếu đã có code, chưa có thì đề xuất hiển thị ui,ux thế nào)
- vẽ sơ đồ luồng, vẽ mockup mermaid...

Điều kiện thất bại:
- thiếu flow
- không check UI
- không đọc code
- đề xuất không cụ thể
- không có bảng kế hoạch
- Bản kế hoạch thiếu logic ảnh hưởng liên quan, phương án xử lý để logic được đảm bảo.

Phải tạo thành bản kế hoạch triển khai để duyệt màn. Trong đó cần check kĩ, phần nào cần bổ sung backend, phần nào thuộc frontent. Backend thì phải làm full luồng từ db, repo, service, api...
---

## ⚠️ AUDIT CHECKLIST: Inline Style vs Tailwind Class

> 📖 Bài học gốc: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14)

### Khi audit code UI, BẮT BUỘC check:

1. **Scan các Tailwind arbitrary classes nguy hiểm** trong code:
   ```bash
   grep -rn "aspect-\[\|text-\[#\|bg-\[#.*\]/\|max-w-\[\|opacity-\[" src/ | head -20
   ```
2. **Verify từng arbitrary class** thực sự build thành CSS:
   - F12 → element panel → tab **Computed** → check thuộc tính tương ứng
   - Nếu trả về default value (auto/none/black) → class KHÔNG build → flag ngay
3. **Báo cáo audit** liệt kê:
   - Số class arbitrary phát hiện
   - Class nào KHÔNG build (cần đổi inline)
   - Đề xuất sửa từng chỗ

### Tiêu chí PASS audit FE:
- ✅ Không có Tailwind arbitrary classes với giá trị lẻ (color/opacity/decimal)
- ✅ TẤT CẢ pixel-perfect styling dùng inline `style={{}}` cho giá trị ngoài preset
- ✅ Đã verify qua DevTools Computed tab
