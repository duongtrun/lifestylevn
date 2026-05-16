---
description: Quy trình chia Scope và thực thi tuần tự — áp dụng khi task lớn để tránh bị tắc, timeout hoặc làm lộn xộn không kiểm soát được
---

# /0-scope-execution — Quy Trình Chia Scope & Thực Thi Tuần Tự

> **Khi nào BẮT BUỘC dùng workflow này?**
> Thỏa BẤT KỲ 1 điều kiện: file > 200 dòng / items > 10 / file > 3 / ước tính > 3 phút

---

## TẠI SAO PHẢI CHIA SCOPE?

| Vấn đề khi làm 1 lần | Hậu quả |
|---|---|
| File quá dài → bị timeout giữa chừng | Dữ liệu mất, phải làm lại từ đầu |
| Không có checkpoint → không biết đang ở đâu | CEO không biết tiến độ |
| Lỗi xảy ra ở cuối mới phát hiện | Phải revert toàn bộ |
| AI tắc không biết hỏi ai | Im lặng, CEO tưởng đang chạy |

---

## BƯỚC 1: PHÂN TÍCH VÀ LÊN KẾ HOẠCH SCOPE

Trước khi làm bất cứ điều gì, phân tích task và lên kế hoạch:

### Câu hỏi cần trả lời:

```
1. Task này có bao nhiêu phần lớn? (VD: Phần A, B, C)
2. Mỗi phần chia thành bao nhiêu unit nhỏ? (VD: Phần A có 5 TC)
3. Phần nào phụ thuộc phần nào? (Phần B cần kết quả Phần A mới làm được)
4. Scope nào nặng nhất? (Ưu tiên làm trước để phát hiện vấn đề sớm)
```

### Công thức chia Scope lý tưởng:

```
Tổng khối lượng → Chia đều 2-4 Scope
Mỗi Scope: 5-15 phút thực thi, 50-150 dòng viết
Scope cuối: Luôn chứa phần kết (Bảng tổng kết, verify, cleanup)
```

### Template bảng Scope Plan:

```
Em chia thành [X] scope:

| Scope | Nội dung | Ước lượng | Phụ thuộc |
|-------|----------|-----------|-----------|
| 1     | [Mô tả]  | [N items] | Không     |
| 2     | [Mô tả]  | [N items] | Scope 1   |
| 3     | [Mô tả]  | [N items] | Scope 2   |

→ Bắt đầu Scope 1 ngay...
```

---

## BƯỚC 2: THỰC HIỆN TUẦN TỰ

### Nguyên tắc vàng:

```
✅ Làm XONG 100% Scope 1 → Báo cáo → Mới bắt đầu Scope 2
❌ KHÔNG bắt đầu Scope 2 trong khi Scope 1 chưa xong
❌ KHÔNG gộp 2 scope vào 1 lần thực hiện
```

### Khi thực hiện mỗi Scope:

```
[Đang làm Scope X/Y]
├── Làm từng item trong scope
├── Nếu gặp vấn đề → báo ngay (xem Bước 3b)
└── Hoàn thành → báo cáo (xem Bước 3a)
```

---

## BƯỚC 3A: BÁO CÁO SAU MỖI SCOPE (Bình thường)

Format bắt buộc sau khi xong mỗi Scope:

```
✅ Scope [X]/[Tổng] XONG
📁 Đã hoàn thành: [liệt kê items/files đã làm]
📊 Kết quả: [X items] — [tóm tắt ngắn điều đã đạt]
⏳ Tiếp theo: Scope [X+1] — [mô tả nội dung sẽ làm]
   → Anh cho phép em làm tiếp không?
```

**Ví dụ thực tế:**
```
✅ Scope 1/3 XONG
📁 Đã hoàn thành: Phần 1 (Tầm nhìn) + Phần 2 (Sơ đồ Mermaid) + Nhóm 1 + Nhóm 2
📊 Kết quả: 11 TC đầu — Đã có đầy đủ header, diagram, và 2 nhóm test case Critical
⏳ Tiếp theo: Scope 2 — Nhóm 3 (Broadcast), Nhóm 4 (Poll), Nhóm 5 (Nhắc nhở)
   → Anh cho phép em làm tiếp không?
```

---

## BƯỚC 3B: BÁO CÁO KHI BỊ TẮC (Khẩn cấp)

Khi gặp vấn đề **bất kể nhỏ hay lớn**, KHÔNG được im lặng. Báo ngay theo format:

```
⚠️ Em đang bị tắc ở Scope [X]
🔍 Vấn đề: [Mô tả vấn đề cụ thể — cái gì không làm được]
❓ Lý do: [Thiếu thông tin / Không rõ yêu cầu / Lỗi kỹ thuật / Cần quyết định]
💡 Đề xuất:
   A) [Phương án 1 — Làm thế này]
   B) [Phương án 2 — Làm thế kia]
   C) Chờ anh hướng dẫn thêm
→ Anh chọn phương án nào?
```

**Ví dụ thực tế:**
```
⚠️ Em đang bị tắc ở Scope 2
🔍 Vấn đề: Không biết số port MCP server cần test (18790 hay khác?)
❓ Lý do: Thiếu thông tin từ file .env
💡 Đề xuất:
   A) Dùng port 18790 mặc định trong discord-mcp-server-plan.md
   B) Anh xác nhận port thực tế đang dùng
→ Anh chọn phương án nào?
```

---

## BƯỚC 4: TỰ ĐỘNG ĐỀ XUẤT TIẾP TỤC

AI **KHÔNG ĐƯỢC chờ** anh hỏi "làm đến đâu rồi". Sau mỗi Scope phải chủ động:

```
Nếu còn scope tiếp theo:
→ Báo cáo xong → Hỏi xin phép → KHÔNG tự chạy luôn Scope tiếp theo
→ Đợi anh gật đầu (dù chỉ là "ok" hay "tiếp đi")

Nếu là Scope cuối:
→ Báo cáo TỔNG KẾT toàn bộ task
→ Liệt kê tất cả files đã tạo/sửa
→ Gợi ý bước tiếp theo (test, deploy, review...)
```

---

## BƯỚC 5: BÁO CÁO TỔNG KẾT (Scope Cuối)

Khi hoàn thành Scope cuối, báo cáo đầy đủ:

```
✅ XONG TOÀN BỘ — [Tên task]

📁 Files đã tạo/sửa:
   - [file1] — [mô tả thay đổi]
   - [file2] — [mô tả thay đổi]

📊 Kết quả:
   - Tổng: [X items/TC/lines]
   - 🔴 Critical: [N]
   - 🟡 High: [N]
   - 🟢 Medium: [N]

🔗 Xem tại: [link/path nếu có]
⚠️ Lưu ý: [điều gì cần anh biết — nếu có]
🔜 Bước tiếp: [gợi ý action tiếp theo]
```

---

## CHECKLIST TỰ KIỂM TRA (Trước khi bắt đầu task lớn)

```
□ Task này có thỏa tiêu chí "Task Lớn" không? (file>200 / items>10 / file>3 / >3 phút)
□ Đã chia thành 2-4 Scope chưa?
□ Đã trình kế hoạch Scope cho anh chưa? (KHÔNG làm khi chưa trình)
□ Mỗi Scope có kích thước hợp lý (5-15 phút)? Không quá lớn, không quá nhỏ?
□ Đã xác định thứ tự ưu tiên và phụ thuộc giữa các Scope?
```

---

## VÍ DỤ THỰC TẾ — FULL FLOW

```
Anh Đào: "Viết test-checklist.md đầy đủ cho discord-bot"

[AI phân tích]
→ Tổng ước lượng: ~700 dòng / 44 TC → Task Lớn → Phải chia Scope

Em chia thành 3 scope:
| Scope 1 | Phần 1+2 + Nhóm 1+2         | 11 TC | ~150 dòng |
| Scope 2 | Nhóm 3+4+5                  | 15 TC | ~200 dòng |
| Scope 3 | Nhóm 6-9 + Bảng nghiệm thu | 18 TC | ~300 dòng |
→ Bắt đầu Scope 1 ngay...

[THỰC HIỆN SCOPE 1]
... [viết file] ...

✅ Scope 1/3 XONG
📁 Đã hoàn thành: Phần 1, 2, Nhóm 1, Nhóm 2
📊 Kết quả: 11 TC — Header + Sơ đồ Mermaid + 2 nhóm đầu
⏳ Tiếp theo: Scope 2 — Nhóm 3 (Broadcast), 4 (Poll), 5 (Nhắc nhở)
   → Anh cho phép em làm tiếp không?

Anh Đào: "ok tiếp đi"

[THỰC HIỆN SCOPE 2]
...
```

---

*Workflow tạo: 2026-04-05 | Áp dụng cho: Antigravity + tất cả agents trong IruKa Workspace*
