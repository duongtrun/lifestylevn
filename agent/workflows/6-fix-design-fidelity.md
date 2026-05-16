---
description: Sửa lệch giao diện thực tế so với thiết kế chuẩn (mockup HTML / Figma / hình PNG-JPG / PDF design) — audit (so sánh từng pixel) + fix luôn trong 1 luồng. Dùng khi đã code UI rồi nhưng nghi ngờ chưa giống 100% thiết kế gốc.
---

# 🔧 WORKFLOW: FIX DESIGN FIDELITY (Sửa Lệch So Với Thiết Kế Chuẩn)

## Khi nào dùng?

- Đã code xong UI nhưng Mr. Đào nhìn thấy lệch so với **thiết kế gốc** — bất kỳ nguồn nào (mockup HTML, Figma, hình PNG/JPG, PDF...)
- Cần check + fix nhanh để khớp thiết kế mà KHÔNG phải lên kế hoạch lớn
- Sau khi merge code từ nhiều nguồn, nghi ngờ UI bị drift (trôi lệch dần) khỏi thiết kế chuẩn

---

## 📦 Các loại nguồn THIẾT KẾ CHUẨN được hỗ trợ

| Loại nguồn               | Cách em đọc                                                                                       | Anh cần làm gì                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Mockup HTML/CSS**      | Đọc trực tiếp file `.html` bằng tool `Read` → trích class + inline style                          | Đưa đường dẫn file mockup (vd: `mockup/login.html`)                            |
| **Figma URL**            | Nếu có Figma MCP (plugin chuyên đọc Figma) đã connect → đọc trực tiếp. Nếu chưa → anh paste spec | Mở Figma → chọn frame → panel **Inspect** (Cmd+/) → copy CSS → paste vào prompt |
| **Hình PNG / JPG**       | Em xem được hình (LLM đa phương tiện — multimodal) → nhìn để trích màu, font, kích thước          | Đính kèm hình vào prompt hoặc đưa đường dẫn file local                         |
| **PDF thiết kế**         | Em đọc được PDF (tối đa 20 trang/lần) bằng tool `Read` với param `pages`                          | Đưa đường dẫn file PDF + số trang cần check                                    |
| **Sketch (.sketch)**     | ❌ Em không đọc được file Sketch native (định dạng độc quyền của Sketch app)                       | Anh export sang PNG/PDF/HTML trước → quay lại 3 cách trên                       |
| **Adobe XD / Photoshop** | ❌ Tương tự, không đọc được file `.xd` / `.psd` native                                            | Anh export sang PNG/PDF                                                        |

---

## 🆚 Phân biệt với các workflow khác

| Workflow                       | Tác dụng                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `/4-frontend-mockup-fidelity`  | **Code TỪ mockup HTML** lần đầu (chưa có code)                                    |
| `/4-figma-to-ui`               | **Code TỪ Figma** lần đầu (đắp UI Figma vào code có sẵn logic, không vỡ cấu trúc) |
| `/5-audit-frontend`            | Audit luồng màn hình + logic UX (không so từng pixel với thiết kế)                |
| **`/6-fix-design-fidelity`**   | **Đã có code → so 1-1 với THIẾT KẾ gốc (bất kỳ nguồn nào) → fix luôn chỗ lệch**   |

---

## INPUT BẮT BUỘC (Thiếu 1 trong 3 → KHÔNG được làm, phải hỏi anh)

1. **Nguồn thiết kế chuẩn** (1 trong các loại ở bảng trên):
   - Mockup HTML → đường dẫn file `.html`
   - Figma → URL Figma frame + Inspect spec anh đã paste vào prompt
   - Hình PNG/JPG → đính kèm hình hoặc đường dẫn file
   - PDF → đường dẫn file + số trang
2. **UI thực tế cần kiểm** — URL local (vd: `http://localhost:3003/login`) HOẶC đường dẫn file component code
3. **Phạm vi cần kiểm** — toàn màn / 1 khu vực cụ thể / 1 component (để khoá scope, không sửa lan)

---

## QUY TRÌNH 6 BƯỚC

### BƯỚC 0: PRE-FLIGHT CHECK L-38 + L-40 (BẮT BUỘC — KHÔNG được skip)

> 📖 **Bài học gốc:**
> - `.agent/memory/lessons-learned.md` **L-38** (2026-05-14) — Tailwind JIT không luôn build arbitrary classes
> - `.agent/memory/lessons-learned.md` **L-40** (2026-05-15) — L-38 chưa thành phản xạ → phải áp dụng NGAY TỪ LẦN ĐẦU

#### 🚨 TRIGGER WORDS — Khi user dùng BẤT KỲ từ nào → BẮT BUỘC dùng inline style NGAY:

| Nhóm | Trigger phrase |
|---|---|
| **Spacing** | "padding", "margin", "spacing", "khoảng cách" |
| **Edge** | "sát viền", "sát mép", "không thoáng" |
| **Adjustment** | "căn chỉnh", "căn lại", "căn cho đẹp" |
| **Sizing** | "to hơn", "nhỏ hơn", "rộng hơn", "cao hơn" |
| **Quality** | "pixel perfect", "giống mockup", "không giống mockup" |

#### 📖 Hiểu đúng ngữ cảnh "sát viền" (tránh sai như L-40):

| User nói | Ý nghĩa thật |
|---|---|
| "sát viền trái/phải" | padding ngang (`left/right`) |
| "sát viền trên/dưới" | padding dọc (`top/bottom`) |
| **"mọi cái sát viền"** | padding **TẤT CẢ 4 chiều** |
| **"bên trong phải to hơn"** | padding **tổng** (cả ngang + dọc) |

→ **Không chắc?** HỎI 1 câu xác nhận trước khi sang BƯỚC 1, KHÔNG đoán theo 1 hướng.

#### 🔍 Audit code hiện trạng — phát hiện Tailwind arbitrary CẦN CHUYỂN inline:

Trước khi sang BƯỚC 1, em phải grep code cần fix xem có dùng arbitrary classes không:

```bash
grep -n "px-\[\|py-\[\|p-\[\|m-\[\|w-\[\|h-\[\|text-\[#\|bg-\[#\|rounded-\[\|aspect-\[\|opacity-\[\|border-\[" <file_path>
```

Nếu CÓ → liệt kê các class đó ở Bước 3 (bảng so sánh lệch) và **mặc định đổi sang inline style** ở Bước 4, không cần chờ user yêu cầu.

#### ❌ ANTI-PATTERN cần tránh:
- Bắt đầu bằng `px-[Xpx]` → đợi user báo "vẫn sát" → mới chuyển inline (TỐN 1-2 turn — L-40)
- Đoán "sát viền" chỉ là ngang mà bỏ qua dọc → SAI ngữ cảnh
- Báo "done" chỉ vì TypeScript pass (không verify DOM)

#### ✅ Khai báo workflow trước khi sang Bước 1:
`📋 Workflow: /6-fix-design-fidelity | 📖 Memory: đã đọc L-38 + L-40`

---

### BƯỚC 1: TRÍCH DESIGN TOKENS TỪ NGUỒN THIẾT KẾ CHUẨN

Bất kể nguồn loại nào, em phải trích ra bảng spec sau làm **CHÂN LÝ DUY NHẤT** để so sánh:

- **Typography:** Font-family, font-size (px), font-weight, line-height, letter-spacing
- **Colors:** HEX/RGBA của background, text, border, shadow, gradient
- **Spacing:** padding/margin (8px, 12px, 16px, 20px, 24px...)
- **Layout:** width, height, gap, position (flex/grid), align/justify
- **Effects:** border-radius, box-shadow, transition timing, opacity
- **Assets:** SVG icon, image path, gradient stops

**Cách trích theo từng loại nguồn:**

| Nguồn        | Cách trích                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Mockup HTML  | `Read` file → parse `class`/`style` + bảng `<style>` ở `<head>`                                             |
| Figma        | Đọc spec anh paste (có sẵn font/size/color HEX trong Inspect panel của Figma) HOẶC dùng Figma MCP nếu connect |
| PNG/JPG      | Nhìn hình → trích bằng mắt + nếu cần chính xác pixel → anh dùng tool đo (DigitalColor Meter, Pixel Ruler) gửi giá trị cho em |
| PDF          | `Read` file PDF với param `pages` → trích text/spec từ trang đã chọn                                         |

> ⛔ KHÔNG được "đoán" giá trị — phải đọc trực tiếp từ nguồn. Nếu nguồn không đủ chi tiết (vd: PNG mờ, Figma chưa paste spec) → HỎI anh, không tự bịa.

### BƯỚC 2: ĐỌC CODE UI THỰC TẾ + KIỂM TRA HIỆN TRẠNG

- Đọc component code (`Read` tool) trong phạm vi đã khoá ở Input
- Liệt kê các class Tailwind + inline style đang dùng
- Mr. Đào tự mở browser xem UI thực tế — em CHỈ đọc code + verify (kiểm chứng) build (KHÔNG navigate browser thay anh, theo memory `feedback_no_self_test.md`)
- Đối chiếu từng dòng code với design tokens ở Bước 1

### BƯỚC 3: BẢNG SO SÁNH LỆCH (OUTPUT BẮT BUỘC — TRÌNH ANH TRƯỚC KHI SỬA)

| #   | Vị trí (file:dòng)             | Thiết kế gốc nói gì              | Thực tế đang là gì       | Mức lệch        | Mức độ |
| --- | ------------------------------ | -------------------------------- | ------------------------ | --------------- | ------ |
| 1   | Card.tsx:45 → Tiêu đề          | font-size 24px, weight 700       | 20px, weight 600         | -4px, -100 weight | P1     |
| 2   | Button.tsx:12 → Nền nút Submit | background `#FB923C` (từ Figma)  | `#F97316` (orange-500)   | sai 1 sắc độ    | P2     |
| 3   | Layout.tsx:30 → Gap            | gap 24px                         | gap 16px                 | -8px            | P1     |

**Phân loại mức độ (Priority — độ ưu tiên):**

- **P0 (Critical — sửa ngay):** Sai layout (vỡ hàng, lệch hẳn 1 khối), thiếu component, sai logic hiển thị (nút disabled mà thiết kế là enabled...)
- **P1 (Major — sửa sau P0):** Sai font-size/weight, sai màu chính (text/background brand), sai padding/gap > 8px, sai border-radius rõ ràng
- **P2 (Minor — sửa cuối):** Lệch < 4px, sai sắc độ 1-2 stop màu, animation timing khác chút

### BƯỚC 4: ĐỀ XUẤT CÁCH FIX CỤ THỂ (TRÌNH ANH DUYỆT TRƯỚC KHI SỬA)

| #   | File cần sửa             | Dòng | Code hiện tại               | Code mới (đề xuất)                                              |
| --- | ------------------------ | ---- | --------------------------- | --------------------------------------------------------------- |
| 1   | src/components/Card.tsx  | 45   | `text-xl font-semibold`     | `style={{ fontSize: 24, fontWeight: 700 }}`                     |
| 2   | src/components/Button.tsx| 12   | `bg-orange-500`             | `style={{ background: '#FB923C' }}`                             |
| 3   | src/layouts/Layout.tsx   | 30   | `gap-4`                     | `gap-6` (24px chuẩn preset Tailwind, không cần inline)          |

> ⚠️ **BẮT BUỘC TUÂN THỦ RULE INLINE STYLE** (xem `/4-frontend-mockup-fidelity` section "INLINE STYLE vs TAILWIND CLASS"):
>
> - Giá trị NGOÀI preset Tailwind → BẮT BUỘC inline `style={{}}`, KHÔNG dùng arbitrary class `text-[13px]`
> - Lý do: Tailwind JIT (Just-In-Time compiler — bộ biên dịch CSS theo nhu cầu) không luôn build hết arbitrary class → UI không update dù code đúng
> - Tham chiếu: `.agent/memory/lessons-learned.md` **L-38** (2026-05-14)

### BƯỚC 5: FIX TRONG SCOPE (Sau khi anh duyệt bảng Bước 4)

- **CHỈ sửa** các dòng/file đã liệt kê ở Bước 4
- **KHÔNG sửa ngoài scope** dù thấy code xấu chỗ khác (theo CLAUDE.md mục 4.5 — Scope Discipline)
- **Sau mỗi nhóm fix, verify (kiểm chứng) ngay:**
  1. Hard reload (Cmd/Ctrl + Shift + R) để xoá cache (bộ nhớ tạm trình duyệt)
  2. F12 → DevTools → tab **Computed** → check thuộc tính thực sự áp dụng (KHÔNG phải tab "Styles")
  3. Nếu vẫn không khớp → restart (khởi động lại) dev server: `Ctrl+C` rồi `npm run dev`
  4. CHỈ báo "done" cho anh SAU KHI verify qua DevTools — KHÔNG báo done chỉ vì TypeScript pass

- **Lưu ý quan trọng:** Em CHỈ verify được code compile và inline style đã thay đúng. Còn UI hiển thị ra giao diện đúng/đẹp ở browser → Mr. Đào tự kiểm (theo memory `feedback_no_self_test.md`)

---

## BÁO CÁO CUỐI (BẮT BUỘC FORMAT NÀY)

```
✅ XONG: Fix lệch thiết kế [tên màn / component]
📐 Nguồn thiết kế chuẩn: [Mockup HTML / Figma / PNG / PDF]
📊 Tổng kết:
  - Phát hiện: X điểm lệch (P0: a, P1: b, P2: c)
  - Đã fix: Y/X điểm
  - Chưa fix: Z điểm (lý do: ...)
📁 File đã sửa:
  - src/components/Card.tsx (dòng 45, 67)
  - src/components/Button.tsx (dòng 12)
🔍 Verify: Code compile pass, inline style đã thay đúng giá trị
   → Anh tự mở http://localhost:3003/... để kiểm UI có khớp thiết kế chưa
⚠️ Phát hiện thêm (ngoài scope, KHÔNG tự sửa):
  - [Nếu có vấn đề ngoài scope → ghi lại để anh quyết]
🔜 Bước tiếp:
  - Anh mở browser kiểm UI thực tế vs thiết kế gốc
  - Nếu còn lệch → báo em làm vòng 2 (loop quy trình từ Bước 1)
```

---

## ĐIỀU KIỆN THẤT BẠI (Workflow FAIL nếu)

- ❌ Không có nguồn thiết kế gốc làm chuẩn → không có gì để so → FAIL
- ❌ Bảng so sánh không cụ thể (chỉ ghi "có vẻ lệch", "trông không giống") → FAIL
- ❌ Không có file:dòng cụ thể trong bảng đề xuất fix → FAIL
- ❌ Sửa file ngoài bảng đề xuất Bước 4 → FAIL (sửa lan)
- ❌ Báo "done" mà chưa trình bảng so sánh + đề xuất fix cho anh duyệt → FAIL
- ❌ Dùng Tailwind arbitrary class (`text-[13px]`, `bg-[#FB923C]`) cho giá trị ngoài preset → FAIL (vi phạm L-38)
- ❌ "Đoán" giá trị từ thiết kế khi nguồn không rõ (PNG mờ, Figma chưa paste spec) → FAIL

---

## NGUYÊN TẮC VÀNG

1. **Thiết kế gốc là chân lý duy nhất** — Không tự ý "cải thiện" cho đẹp hơn thiết kế. Nếu thấy thiết kế có chỗ sai → ghi vào "Phát hiện thêm", HỎI anh, KHÔNG tự đổi
2. **Khoanh vùng nghiêm ngặt** — Phát hiện vấn đề ngoài scope → ghi "Phát hiện thêm", KHÔNG tự sửa (theo CLAUDE.md mục 4.5)
3. **Ưu tiên inline style cho giá trị ngoài preset Tailwind** — Tránh JIT miss (Tailwind không build arbitrary class)
4. **P0 fix trước P1, P1 fix trước P2** — Đừng sa đà vào pixel khi layout đang vỡ
5. **Mr. Đào tự test UI cuối** — Em báo "code đã thay đúng", anh là người mở browser kiểm UI có khớp thiết kế không (theo memory `feedback_no_self_test.md`)
6. **Nguồn nào trích cách đó** — Mockup thì đọc HTML, Figma thì đọc Inspect spec, hình PNG thì nhìn — không lẫn lộn cách trích giữa các loại nguồn

---

## CÁCH RA LỆNH CHO AI

**Cách 1 — Có mockup HTML:**
> "/6-fix-design-fidelity — thiết kế ở `mockup/login.html`, thực tế ở `http://localhost:3003/login`, phạm vi toàn màn. Check + fix luôn."

**Cách 2 — Có Figma:**
> "/6-fix-design-fidelity — Figma frame: [URL]. Em mở Figma → Inspect panel → đây là spec: [paste CSS]. Thực tế: `http://localhost:3003/dashboard`. Phạm vi: header + sidebar."

**Cách 3 — Có hình PNG/JPG:**
> "/6-fix-design-fidelity — [đính kèm hình design]. Thực tế: `http://localhost:3003/profile`. Phạm vi: card thông tin user."

**Cách 4 — Có PDF design:**
> "/6-fix-design-fidelity — thiết kế ở `design/spec.pdf` trang 3. Thực tế: `http://localhost:3003/settings`. Phạm vi: form đổi mật khẩu."

---

_Ghi chú: Workflow này là CẶP ĐÔI với 2 workflow code-from-design ở layer 4:_

- _`/4-frontend-mockup-fidelity` = Code TỪ mockup HTML (lần đầu)_
- _`/4-figma-to-ui` = Code TỪ Figma (lần đầu, đắp UI Figma vào code có sẵn logic)_
- _**`/6-fix-design-fidelity` = Fix code đã có VỀ đúng thiết kế gốc (audit + fix, bất kỳ nguồn nào)**_
