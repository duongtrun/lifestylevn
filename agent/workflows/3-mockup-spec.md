---
description: Xây dựng Mockup Spec đầy đủ từ yêu cầu tính năng — đảm bảo AI agent có thể code hoàn hảo ngay lần đầu
---

# 🖼️ WORKFLOW: /3-mockup-spec
## Thiết Kế Mockup Đầy Đủ — Từ Yêu Cầu Đến Spec Sẵn Sàng Code

> **Áp dụng khi:** Có yêu cầu tính năng mới và cần thiết kế màn hình trước khi code.
> **Mục tiêu:** Tạo ra bản spec mockup đầy đủ đến mức AI agent đọc vào là code được ngay — không cần hỏi lại.
> **Output:** 1 file `.md` chứa toàn bộ thông tin màn hình + 1 file `.html` mockup tương tác được.

---

## 🚨 NGUYÊN TẮC VÀNG — BACKEND-FIRST MOCKUP

**Mọi mockup BẮT BUỘC xây cốt lõi dựa trên data backend thật đang trả về.**

- ✅ **Trước khi vẽ 1 element nào** → phải research schema Pydantic ở `python-backend/app/schemas/iruka_api_schemas/` hoặc endpoint tương ứng để biết field nào có sẵn.
- ❌ **KHÔNG được tự bịa** field / trạng thái / số liệu cho "đẹp" nếu backend chưa trả.
- 🆕 **Nếu muốn đề xuất data mới** (BE chưa có): ghi chú rõ **`🆕 ĐỀ XUẤT BE`** ngay tại chỗ đề xuất trong mockup + tổng hợp danh sách ở cuối spec. Format:

  ```
  🆕 ĐỀ XUẤT BE BỔ SUNG
  | Field | Kiểu | Endpoint cần thêm | Lý do UX |
  |---|---|---|---|
  | `subject.mastered_count` | int | GET /children/{id}/achievements/subjects | Hiện số bài "Nhớ giỏi" per môn trong dropdown |
  ```

- Khi bàn giao cho Mr. Đào duyệt, **báo cáo tách bạch 2 phần**:
  1. "Dữ liệu hiện có từ BE" → mockup đang dùng
  2. "Đề xuất BE bổ sung" → cần BE team làm trước khi code frontend

**Lý do:** Tránh bịa trạng thái giả (vd: locked subject trong khi BE thực tế là available) — sẽ làm sai UX và khiến devteam code theo logic sai.

---

## Tổng quan luồng

```
Bước 1: Thu thập yêu cầu
  → Bước 2: Liệt kê màn hình & trạng thái
    → Bước 3: Xác định Design System
      → Bước 4: Vẽ Mockup HTML tương tác
        → Bước 5: Viết Interaction Spec
          → Bước 6: Kiểm tra & Duyệt
            → Bước 7: Xuất bàn giao cho Code
```

---

## Bước 1 — 📋 THU THẬP YÊU CẦU (BẮT BUỘC HỎI ĐỦ)

Trước khi vẽ bất cứ thứ gì, AI phải hỏi đủ 5 câu hỏi này. Nếu Mr. Đào chưa cung cấp → hỏi ngay.

### 1.1 — 5 Câu hỏi bắt buộc

| # | Câu hỏi | Ví dụ trả lời |
|---|---|---|
| Q1 | **Tính năng này dùng cho ai?** | Phụ huynh / Học sinh / Admin / Dev |
| Q2 | **Người dùng làm gì trên màn hình này?** | Đăng nhập, xem điểm, mua khóa học, chơi game... |
| Q3 | **Có màn hình Figma thiết kế sẵn không?** | Có link Figma / Không có / Có ảnh chụp |
| Q4 | **Tính năng này kết nối API nào?** | API đăng nhập, API lấy danh sách game... |
| Q5 | **Có flow đặc biệt nào cần xử lý?** | Lỗi mạng, tài khoản bị khóa, chưa có tài khoản... |

### 1.2 — Nếu có Figma

Đọc Figma ngay bằng MCP:
```
1. get_design_context(nodeId) → lấy layout + code mẫu
2. get_screenshot(nodeId) → lấy ảnh visual
```
Ghi lại: màu, font, spacing, tên component.

### 1.3 — Nếu không có Figma

Áp dụng IruKa Design System mặc định (xem Bước 3).

---

## Bước 2 — 🗂️ LIỆT KÊ ĐẦY ĐỦ MÀN HÌNH & TRẠNG THÁI

Đây là bước quan trọng nhất. AI phải tự suy luận **TẤT CẢ** trạng thái có thể xảy ra.

### 2.1 — Format liệt kê State

Với mỗi màn hình, liệt kê theo bảng:

| State ID | Tên trạng thái | Kích hoạt bởi | Hiển thị gì | Hành động có thể làm |
|---|---|---|---|---|
| S-01 | Default / Trống | Mở màn hình lần đầu | Form trống, nút mờ | Nhập liệu |
| S-02 | Đang nhập | User gõ vào ô | Input có viền xanh | Tiếp tục gõ, blur |
| S-03 | Hợp lệ | Blur khỏi ô, định dạng đúng | Icon ✓ xanh | Submit |
| S-04 | Lỗi định dạng | Blur, sai định dạng | Icon ✗ đỏ + text lỗi | Sửa lại |
| S-05 | Loading | Click submit | Button spinner + disabled | Chờ |
| S-06 | Lỗi server | API trả lỗi | Toast đỏ / inline error | Thử lại |
| S-07 | Thành công | API trả 200 | Redirect / animation | — |

### 2.2 — Checklist State thường bị quên

Trước khi kết thúc bước này, AI **BẮT BUỘC** tự kiểm tra:

```
□ Trạng thái trống (chưa có dữ liệu)
□ Trạng thái loading (đang gọi API)
□ Trạng thái lỗi validation (client-side)
□ Trạng thái lỗi server (API trả lỗi)
□ Trạng thái lỗi mạng (offline / timeout)
□ Trạng thái thành công
□ Trạng thái disabled (user chưa đủ quyền / chưa điền đủ)
□ Trạng thái tài khoản đặc biệt (bị khóa, chưa đăng ký...)
□ Edge case: nhập quá dài, ký tự đặc biệt, copy-paste
```

---

## Bước 3 — 🎨 XÁC ĐỊNH DESIGN SYSTEM

### 3.1 — IruKa Design Tokens (mặc định)

Nếu không có Figma, dùng bảng này:

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-brand-400` | `#04A4FF` | Màu chính, button, link, title |
| `--color-brand-500` | `#0090E0` | Button hover |
| `--color-error` | `#FF6259` | Lỗi, border đỏ, text cảnh báo |
| `--color-success` | `#84cc16` | Hợp lệ, icon check xanh lá |
| `--color-gray-900` | `#191A1F` | Text chính |
| `--color-gray-300` | `#A5A6A9` | Placeholder, text phụ |
| `--color-gray-100` | `#D2D3D4` | Border mặc định |
| Font chính | `SN Pro` | Tất cả text |
| Border radius input | `18px` | Input, button |
| Height input | `56px` | Input fields |
| Shadow button | `inset 0 -4px 0 rgba(0,0,0,0.15)` | Button primary |

### 3.2 — Component Pattern IruKa

| Component | Pattern chuẩn |
|---|---|
| Input mặc định | Border 2px `#A5A6A9`, radius 18px, height 56px |
| Input hợp lệ | Border 2px `#04A4FF` + icon ✓ |
| Input lỗi | Border 2px `#FF6259` + icon ✗ + text lỗi bên dưới |
| Button primary | Background `#04A4FF`, text trắng, radius 18px, shadow inset |
| Button disabled | Opacity 40%, không clickable |
| Toast lỗi | Dùng `sonner` toast |
| Icon | `lucide-react` (không dùng icon custom nếu có thể) |

---

## Bước 4 — 🖌️ VẼ MOCKUP HTML TƯƠNG TÁC

### 4.1 — Yêu cầu bắt buộc của file mockup

File HTML mockup phải đảm bảo:

```
✅ Tất cả nút bấm PHẢI CÓ onClick làm gì đó (hiện state, alert, chuyển tab)
✅ Tất cả input PHẢI có placeholder + validation inline (JS thuần)
✅ Phải có nút/tab để chuyển giữa các State (S-01, S-02, S-03...)
✅ Màu sắc phải đúng Design System IruKa
✅ Layout phải giống thiết kế thật (mobile 390px hoặc desktop)
✅ Có chú thích tên State đang hiển thị (VD: "State: S-03 — Input hợp lệ")
✅ Responsive cơ bản
```

### 4.2 — Template HTML mockup chuẩn

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mockup: [Tên tính năng] — IruKa</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* IruKa Design Tokens */
    :root {
      --color-brand: #04A4FF;
      --color-brand-hover: #0090E0;
      --color-error: #FF6259;
      --color-success: #84cc16;
      --color-gray-300: #A5A6A9;
      --color-gray-900: #191A1F;
    }

    /* ── State Switcher (thanh điều hướng nhanh) ── */
    .state-switcher {
      position: fixed;
      top: 0; left: 0; right: 0;
      background: #1e1e2e;
      color: white;
      padding: 8px 16px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      z-index: 9999;
      font-size: 12px;
    }
    .state-btn {
      padding: 4px 10px;
      background: #313244;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid transparent;
    }
    .state-btn.active {
      background: #04A4FF;
      border-color: #04A4FF;
    }
    .state-label {
      position: fixed;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      z-index: 9999;
    }
  </style>
</head>
<body class="bg-gray-100" style="padding-top: 48px;">

  <!-- ── STATE SWITCHER ── -->
  <div class="state-switcher">
    <span style="opacity:0.5">States:</span>
    <div class="state-btn active" onclick="showState('s01')">S-01 Default</div>
    <div class="state-btn" onclick="showState('s02')">S-02 Nhập liệu</div>
    <div class="state-btn" onclick="showState('s03')">S-03 Hợp lệ</div>
    <div class="state-btn" onclick="showState('s04')">S-04 Lỗi</div>
    <div class="state-btn" onclick="showState('s05')">S-05 Loading</div>
    <div class="state-btn" onclick="showState('s06')">S-06 Thành công</div>
  </div>

  <!-- ── MÀN HÌNH MOCKUP ── -->
  <div class="flex justify-center py-8">
    <div style="width:390px; min-height:844px; background:white; border-radius:24px; overflow:hidden; position:relative; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">

      <!-- Paste nội dung từng State vào đây -->
      <div id="state-s01" class="state-view">
        <!-- State S-01: Default -->
      </div>

      <div id="state-s02" class="state-view hidden">
        <!-- State S-02: Đang nhập -->
      </div>

      <!-- ... -->

    </div>
  </div>

  <!-- STATE LABEL -->
  <div class="state-label" id="state-label">State: S-01 — Default</div>

  <script>
    const stateNames = {
      s01: 'S-01 — Default / Trống',
      s02: 'S-02 — Đang nhập',
      s03: 'S-03 — Input hợp lệ',
      s04: 'S-04 — Lỗi validation',
      s05: 'S-05 — Loading',
      s06: 'S-06 — Thành công',
    };

    function showState(id) {
      document.querySelectorAll('.state-view').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.state-btn').forEach(el => el.classList.remove('active'));
      document.getElementById('state-' + id)?.classList.remove('hidden');
      document.querySelector(`[onclick="showState('${id}')"]`)?.classList.add('active');
      document.getElementById('state-label').textContent = 'State: ' + stateNames[id];
    }
  </script>
</body>
</html>
```

### 4.3 — Checklist Mockup trước khi submit

```
□ Mỗi State đều xem được (có State Switcher)
□ Tất cả button có phản hồi khi click (không có nút chết)
□ Input có validation khi blur (hiện lỗi inline)
□ Button submit disabled khi form chưa hợp lệ
□ Màu sắc đúng IruKa Design System
□ Font SN Pro hoặc Inter (fallback)
□ Có State Label hiển thị tên state đang xem
□ Mobile 390px hiển thị đẹp
□ Không có text placeholder như "[CONTENT HERE]"
```

---

## Bước 5 — 📝 VIẾT INTERACTION SPEC

Sau khi mockup HTML xong, viết spec mô tả logic cho từng element. Đây là "hướng dẫn code" cho AI.

### 5.1 — Format Interaction Spec

```markdown
## Interaction Spec: [Tên màn hình]

### Elements & Hành vi

| Element | Loại | Hành vi | Ghi chú |
|---|---|---|---|
| Ô "Số điện thoại" | Input text | Blur → gọi API check account | Cache kết quả, không gọi lại nếu value giống |
| Ô "Mật khẩu" | Input password | Toggle show/hide bằng icon eye | Icon: lucide EyeOff/Eye |
| Link "Quên mật khẩu?" | Link | Navigate → /forgot-password | Không reload trang |
| Nút "Đăng nhập" | Button submit | Disabled khi form chưa hợp lệ | Opacity 40% khi disabled |
| Nút Google | Button | Gọi apiGoogleStart() → redirect | Hiện toast nếu lỗi |
| Nút Facebook | Button | Gọi apiFacebookStart() → redirect | Hiện toast nếu lỗi |
| Link "Đăng ký ngay" | Link | Navigate → /register | |

### Validation Rules

| Field | Rule | Message lỗi |
|---|---|---|
| Số điện thoại | 10 số, bắt đầu 0 | "Số điện thoại không hợp lệ" |
| Email | Đúng định dạng email | "Email không hợp lệ" |
| Mật khẩu | Tối thiểu 6 ký tự | "Mật khẩu tối thiểu 6 ký tự" |

### API Calls

| Trigger | API | Thành công | Thất bại |
|---|---|---|---|
| Blur identifier | GET /auth/check-account | checkStatus = 'found' | checkStatus = 'not_found' + hiện prompt |
| Submit form | POST /auth/login | Redirect theo role | classifyLoginError() |

### Error Messages (từ Backend)

| Backend message | Hiển thị cho user | Field |
|---|---|---|
| "Người dùng không tồn tại" | "Số điện thoại chưa có tài khoản" | identifier |
| "Thông tin xác thực không hợp lệ" | "Sai mật khẩu" | password |
| "bị khoá" | "Tài khoản đã bị khoá" | identifier |
| Network error | Toast: "Không có kết nối mạng" | toast |
```

---

## Bước 6 — ✅ KIỂM TRA & DUYỆT VỚI Mr. ĐÀO

Trước khi bàn giao cho code, trình Mr. Đào kiểm tra:

### 6.1 — Checklist duyệt

```
□ Xem mockup HTML trên trình duyệt (mobile view 390px)
□ Click qua tất cả State — có hiểu không?
□ Tất cả nút bấm có phản hồi không?
□ Màu sắc, logo, font có đúng IruKa không?
□ Flow người dùng có logic không? (từ trống → điền → submit → thành công)
□ Có thiếu state nào không?
```

### 6.2 — Câu hỏi confirm với Mr. Đào

```
"Anh ơi, mockup đã có đủ [X] trạng thái:
- S-01: Default
- S-02: Đang nhập
- S-03: Hợp lệ
...

Anh thấy có thiếu trạng thái nào không?
Có nút/tính năng nào muốn thêm không?
→ Duyệt thì em bắt đầu code ngay."
```

---

## Bước 7 — 🚀 XUẤT BÀN GIAO CHO CODE

Khi mockup đã được duyệt, chuẩn bị đầy đủ để đưa vào `/4-figma-to-ui` hoặc `/4-code-frontend`.

### 7.1 — Package bàn giao gồm

```
📁 [tên-tính-năng]/
├── mockup.html          ← File HTML tương tác đầy đủ
├── spec.md              ← Interaction spec (Bước 5)
└── assets/              ← Ảnh, icon nếu có
```

### 7.2 — Câu lệnh để AI code

Khi bàn giao cho AI code, dùng câu lệnh này:

```
"Dùng workflow /4-figma-to-ui để code màn hình [tên tính năng].
- Mockup: [đường dẫn mockup.html]
- Spec: [đường dẫn spec.md]
- File cần sửa: [app/path/page.tsx]
- Giữ nguyên: logic, hooks, API calls hiện tại
- Chỉ thay: phần return() theo mockup"
```

### 7.3 — Báo cáo kết thúc

```
✅ Mockup Spec HOÀN THÀNH: [Tên tính năng]

📊 Thống kê:
- Số màn hình: X
- Số trạng thái: X states
- Số elements tương tác: X buttons, X inputs

📁 Files đã tạo:
- mockup/[tên]/mockup.html
- mockup/[tên]/spec.md

✅ Đã duyệt bởi Mr. Đào: [ngày]

⏭️ Bước tiếp theo: Dùng /4-figma-to-ui để code
```

---

## ⚡ CHECKLIST NHANH (Dùng trước khi bàn giao)

```
□ Đã hỏi đủ 5 câu hỏi yêu cầu (Bước 1)
□ **Đã research backend schema — mockup core 100% dùng field BE thật**
□ **Đã tách phần "🆕 ĐỀ XUẤT BE" (nếu có) khỏi phần data hiện có**
□ Đã liệt kê đủ states (ít nhất: trống, nhập, lỗi, loading, thành công)
□ Đã kiểm tra 9-point State Checklist (Bước 2.2)
□ Màu sắc đúng IruKa Design System
□ Mockup HTML: tất cả nút có phản hồi
□ Mockup HTML: có State Switcher
□ Mockup HTML: input có validation inline
□ Đã viết Interaction Spec đủ (elements, validation, API, errors)
□ Đã trình Mr. Đào duyệt
□ Files đã lưu vào đúng thư mục
```

---

## 🔗 Workflow liên quan

| Workflow | Khi nào dùng tiếp |
|---|---|
| `/4-figma-to-ui` | Sau khi mockup duyệt → code UI vào project |
| `/4-frontend-mockup-fidelity` | Khi cần pixel-perfect từ mockup |
| `/4-code-frontend` | Khi cần code tính năng mới hoàn toàn |
| `/2-plan-feature` | Nếu tính năng phức tạp cần plan kỹ hơn |

---

*Tạo: 2026-04-16 | IruKa Workspace v1.0 | /3-mockup-spec*
