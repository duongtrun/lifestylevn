---
description: Quy trình phân tích logic nghiệp vụ và đề xuất giải pháp kỹ thuật theo tiêu chuẩn Big Tech (Design Doc/RFC).
---

# 🧠 Quy trình Phân tích Logic & Đề xuất Giải pháp (Logic Analysis & Proposal)

Workflow này được sử dụng khi cần thay đổi logic lõi, tối ưu hóa quy trình phức tạp hoặc giải quyết các bài toán hóc búa mang tính hệ thống.

---

## ⚡ BƯỚC 1: QUAN SÁT & TRUY VẾT (Discovery)
Trước khi đề xuất, phải hiểu "gốc rễ":
- **Bài toán:** Vấn đề thực sự đang gặp phải là gì? (Why?)
- **Logic hiện tại:** Vẽ lại luồng xử lý hiện tại (Step-by-step). Chỉ ra chính xác dòng code hoặc function liên quan.
- **Điểm nghẽn (Pain Points):** Tại sao logic cũ không còn hiệu quả? (Bug, chậm, khó mở rộng, lỗi thời).

## ⚡ BƯỚC 2: PHÂN TÍCH ĐỐI CHIẾU (Benchmarking)
Tham khảo cách các "ông lớn" (Google, Meta, Amazon) xử lý bài toán tương tự:
- **Best Practices:** Các pattern phổ biến (Adapter, Factory, Event-driven, v.v.).
- **Tiêu chuẩn:** Tính bảo mật, hiệu năng (Performance), và khả năng chịu tải.

## ⚡ BƯỚC 3: ĐỀ XUẤT GIẢI PHÁP (Drafting Solutions)
Cung cấp ít nhất 2 phương án (Phòng cách Product Manager của Big Tech):
- **Phương án A (Tối ưu):** Giải quyết triệt để, hiện đại, nhưng có thể tốn thời gian.
- **Phương án B (Nhanh gọn):** Fix nhanh, giải quyết vấn đề trước mắt (Quick Win).
- **So sánh:** Ưu điểm (Pros) & Nhược điểm (Cons).

## ⚡ BƯỚC 4: ĐÁNH GIÁ ẢNH HƯỞNG (Impact Assessment)
Đánh giá theo quy tắc "Hiệu ứng cánh bướm":
- **Side Effects:** Sửa chỗ này có làm hỏng chỗ kia không? (Backward compatibility).
- **Database:** Có cần migrate data không?
- **Security:** Có tạo ra lỗ hổng mới không?

## ⚡ BƯỚC 5: TRÌNH DUYỆT (RFC - Request for Comments)
Báo cáo cho CEO theo định dạng:
1. **Tóm lược:** Vấn đề trong 2 câu.
2. **Luồng logic mới:** (Vẽ Mermaid diagram nếu cần).
3. **Tại sao chọn phương án này:** (Rationale).
4. **Kế hoạch kiểm thử:** (Làm sao biết nó đúng?).

---

## ❌ ĐIỀU KIỆN THẤT BẠI
- Đề xuất giải pháp mà chưa hiểu logic cũ.
- Không nêu được rủi ro/ảnh hưởng diện rộng.
- Chỉ đưa ra 1 phương án duy nhất (áp đặt).
- Không giải thích được "Tại sao" (Why) lại chọn cách đó.

---
*Tham chiếu: Google Design Doc & Amazon PR/FAQ Style.*
