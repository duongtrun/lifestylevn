---
description: Dùng khi code UI IruKa
---

// turbo-all

Khi code frontend UI cho Iruka, phải giữ giao diện đồng bộ, thẳng hàng, cân đối và nhất quán. Phải có chú thích tiếng việt ở đầu trang code và các khu vực code để tôi hiểu được ý nghĩa các chức năng và các hàm.

Nguyên tắc bắt buộc:
- Khi sửa 1 phần, mà các phần khác có logic liên quan, bạn cần phải đề xuất sửa hết luồng liên qua.
- cỡ chữ phải theo hệ thống thống nhất, không dùng tùy hứng
- khoảng cách giữa các phần tử phải đều, có quy luật, không chỗ nhiều chỗ ít
- hình ảnh, icon, text, button, input, card phải căn chỉnh thẳng hàng, không xô lệch
- không để layout rời rạc, chắp vá, mỗi khu vực một kiểu
- không để text, ảnh hoặc component bị tràn, méo, giãn hoặc lệch tỉ lệ
- khi sửa UI, không làm vỡ layout hoặc ảnh hưởng màn khác không liên quan
- responsive phải ổn định, không vỡ bố cục khi đổi kích thước màn hình, ko vỡ text, tràn layout
- ưu tiên code giao diện sạch, gọn, dễ bảo trì, style nhất quán
- Khi code chú ý, phần nào người dùng dùng đến mới load không load toàn cục để trang ko bị quá nặng, tối ưu hiệu năng

Khi triển khai hoặc sửa UI, hãy luôn kiểm tra:
1. typography
2. spacing
3. alignment
4. image/icon ratio
5. layout consistency
6. responsive stability

Nếu phát hiện rủi ro ảnh hưởng các phần khác, phải cảnh báo trước khi sửa.

Cuối cùng để đạt:

Mục tiêu:
- Giao diện đồng bộ, cân đối, dễ dùng

Ràng buộc:
- Không phá layout cũ
- Không dùng style tùy hứng
- Phải giữ consistency

Định dạng:
1. Màn / phần cần làm
2. Vấn đề UI
3. Hướng sửa
4. Phạm vi ảnh hưởng
5. Code UI
6. Checklist kiểm tra

Checklist UI:
- typography
- spacing
- alignment
- image ratio
- responsive

Điều kiện thất bại:
- Cỡ chữ không thống nhất
- Layout lệch, spacing không đều
- UI rời rạc
- Vỡ responsive
```
---

## ⚠️ RULE BẮT BUỘC: Inline Style vs Tailwind Class

> 📖 Bài học gốc: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14) — TailwindCSS JIT không luôn build arbitrary classes
> 📖 Chi tiết đầy đủ: `.agent/workflows/4-frontend-mockup-fidelity.md` (section "INLINE STYLE vs TAILWIND CLASS")

### Quy tắc thumb (áp dụng KHI code UI mới):
- ✅ **DÙNG Tailwind preset chuẩn** cho layout/spacing/state: `flex`, `mb-4`, `gap-2`, `hover:`, `md:`
- ❌ **TRÁNH Tailwind arbitrary** dạng `text-[13px]`, `aspect-[308/211]`, `text-[#FB923C]`, `bg-[#FFF7ED]/70`, `max-w-[72px]`, `opacity-[0.55]`, `rounded-[14px]`
- ✅ **THAY THẾ bằng inline style**: `style={{ fontSize: 13, aspectRatio: '308 / 211', color: '#FB923C', maxWidth: 72, opacity: 0.55, borderRadius: 14 }}`

### Verify BẮT BUỘC sau code:
1. Hard reload + F12 → tab **Computed** (không phải Styles)
2. Check 1-2 thuộc tính chính (aspect-ratio / max-width / color)
3. Nếu sai → đổi sang inline NGAY trước khi báo done

### ❌ Không bao giờ giả định "TypeScript pass = UI đúng" — TS chỉ check syntax.
