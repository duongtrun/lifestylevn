# 🎨 KỸ THUẬT SẮP XẾP GIAO DIỆN — GIẢI THÍCH ĐƠN GIẢN

> **Cho người không biết code.** Mỗi thuật ngữ kỹ thuật đều ghi chú tiếng Việt dễ hiểu kèm ví dụ đời thường.
>
> Phiên bản: 2026-05-14 | Áp dụng cho project IruKa.

---

## 📑 Mục lục

1. [Cách XẾP CÁC KHỐI vào trang — Flex & Grid](#1-cách-xếp-các-khối-vào-trang)
2. [Đơn vị đo kích thước — px, %, em, vw, cqi](#2-đơn-vị-đo-kích-thước)
3. [Giới hạn kích thước — min, max, tỉ lệ, kẹp](#3-giới-hạn-kích-thước)
4. [Co giãn theo CÁI BAO CHỨA — Container Queries](#4-co-giãn-theo-cái-bao-chứa)
5. [Cách ĐẶT phần tử ở vị trí mong muốn](#5-cách-đặt-phần-tử-ở-vị-trí-mong-muốn)
6. [Xếp TẦNG LỚP — cái nào đè cái nào](#6-xếp-tầng-lớp)
7. [Căn chỉnh — TRÊN-DƯỚI, TRÁI-PHẢI, GIỮA](#7-căn-chỉnh)
8. [Khoảng cách — Lề trong, lề ngoài, khe hở](#8-khoảng-cách)
9. [Tự đổi giao diện theo MÀN HÌNH lớn-nhỏ](#9-tự-đổi-giao-diện-theo-màn-hình)
10. [Chữ — Khoảng dòng, khoảng chữ, cắt chữ dài](#10-chữ)
11. [Hiệu ứng CHUYỂN ĐỘNG mượt](#11-hiệu-ứng-chuyển-động)
12. [Hiệu ứng ĐẸP MẮT — Bóng, gradient, kính mờ](#12-hiệu-ứng-đẹp-mắt)
13. [Kỹ thuật MỚI 2024+ — Anchor, View Transition, :has()](#13-kỹ-thuật-mới)
14. [BẢNG GỢI Ý — Khi nào dùng kỹ thuật nào](#14-bảng-gợi-ý)

---

## 1. Cách XẾP CÁC KHỐI vào trang

Hai cách chính để xếp khối lên trang web: **Flex** và **Grid**.

### 1.1 Flex (Flexbox) — Xếp khối theo MỘT chiều

**Ví dụ đời thường**: Như xếp ghế trong rạp chiếu phim — chỉ xếp theo **HÀNG NGANG** hoặc **CỘT DỌC**, không xếp lưới ô.

**Khi dùng**:
- Hàng nút bấm (Đăng nhập | Đăng ký)
- Header trang web (Logo - Title - Nút bấm)
- Body 1 thẻ card xếp dọc (Tiêu đề trên - Mô tả giữa - Nút dưới)

```jsx
// Xếp HÀNG NGANG (mặc định)
<div className="flex items-center justify-between gap-4">
  <Logo />           {/* trái */}
  <Title />          {/* giữa */}
  <Button />         {/* phải */}
</div>

// Xếp CỘT DỌC
<div className="flex flex-col gap-3">
  <Header />
  <Body />
  <Footer />
</div>
```

**Các từ khoá quan trọng**:
- `flex-1` (giãn ra hết chỗ): khối này tự kéo dài chiếm hết khoảng trống còn lại — như cây thước co duỗi
- `flex-shrink-0` (cấm co lại): khối này KHÔNG co lại khi thiếu chỗ — như cây cột vững chắc
- `items-center` (căn giữa theo chiều ngang/dọc khác): căn các khối nằm giữa theo trục PHỤ
- `justify-between` (chia đều có khoảng): khối đầu tiên ép sát mép trái, khối cuối ép sát mép phải, ở giữa chia đều

### 1.2 Grid — Xếp khối theo LƯỚI 2 chiều

**Ví dụ đời thường**: Như lưới ô bàn cờ vua — chia thành ô vuông theo cả HÀNG NGANG và CỘT DỌC.

**Khi dùng**:
- Lưới sản phẩm (3 sản phẩm 1 hàng, nhiều hàng)
- Dashboard có nhiều ô thông tin
- Gallery ảnh (nhiều ảnh xếp đều)
- Calendar (7 cột × 5-6 hàng)

```jsx
// Lưới 3 cột đều
<div className="grid grid-cols-3 gap-4">
  {cards.map(c => <Card />)}
</div>

// Lưới responsive — tự thêm/bớt cột theo kích thước màn hình
<div
  className="grid gap-4"
  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
>
  {/* auto-fill = tự thêm cột mới khi đủ chỗ
     minmax(220px, 1fr) = mỗi cột tối thiểu 220px, tối đa = 1 phần đều */}
</div>
```

### 1.3 Flex hay Grid — Khi nào dùng cái nào?

| Tình huống | Dùng | Lý do |
|-----------|------|-------|
| Hàng nút bấm ngang | Flex | 1 chiều, đơn giản |
| Thẻ card body xếp dọc | Flex-col | Stack thứ tự trên-dưới |
| Lưới 5×3 sản phẩm | Grid | Cần 2 chiều đều |
| Lưới sản phẩm responsive | Grid + `auto-fill` | Tự thêm/bớt cột |
| Nav bar (thanh điều hướng) | Flex | Items biến động |
| Lịch tháng | Grid 7 cột | Cố định 7 cột |

---

## 2. Đơn vị đo kích thước

### 2.1 Bảng đầy đủ các đơn vị đo

| Đơn vị | Tiếng Việt — Ý nghĩa | Khi dùng | Ví dụ |
|--------|----------------------|----------|-------|
| `px` | **Điểm ảnh** — cố định cứng | Viền, icon nhỏ, kích thước chính xác | `border: 1px solid` |
| `%` | **Phần trăm** của cha trực tiếp | Width khi cha có size rõ ràng | `width: 50%` |
| `rem` | **Tỉ lệ với chữ gốc trang** (root) | Font-size, khoảng cách chính | `font-size: 1.5rem` (= 1.5 lần font gốc) |
| `em` | **Tỉ lệ với chữ cha** | Padding/margin theo text | `padding: 0.5em` |
| `vw` | **1% chiều ngang màn hình** (viewport width) | Banner full chiều ngang | `width: 100vw` |
| `vh` | **1% chiều cao màn hình** | Modal full chiều cao | `height: 100vh` |
| `svh` | **Chiều cao nhỏ nhất** (an toàn cho mobile có thanh nav) | Layout phone | `h-svh` |
| `dvh` | **Chiều cao thay đổi** (khi thanh nav ẩn/hiện) | Adapt mượt | `h-dvh` |
| `cqi` | **1% chiều ngang container cha** (NEW!) | Scale theo cha — bài học IruKa | `font-size: 55cqi` |
| `fr` | **Phần chia** trong Grid (Fractional) | Chia tỉ lệ cột/hàng | `1fr 2fr 1fr` (cột 1:2:1) |

### 2.2 Quy tắc CHỌN ĐƠN VỊ phù hợp

```
✅ NÊN DÙNG:
- px       → border, shadow, icon nhỏ < 24px (chính xác nhất)
- rem      → font-size, spacing chính (THEO sở thích user trong cài đặt)
- %        → width khi cha có kích thước rõ ràng
- vw/vh    → hero section (banner đầu trang) full chiều ngang
- cqi      → scale theo container cha (cha phải khai báo container-type)
- fr       → chia cột/hàng trong Grid

❌ HẠN CHẾ DÙNG:
- em        → dễ bị NHÂN LÊN khi lồng nhau (vd: 1.2em × 1.2em × 1.2em = 1.73em → bự bất ngờ)
- vh trên mobile → thanh nav che → dùng svh an toàn hơn
```

---

## 3. Giới hạn kích thước

### 3.1 Min / Max — Đặt giới hạn TỐI THIỂU và TỐI ĐA

**Ví dụ đời thường**: Như cái áo size co giãn — co tối thiểu xuống S, giãn tối đa lên L, không quá khỏi giới hạn.

```jsx
// Slot không co dưới 52px, không vượt 72px
<div style={{ minWidth: 52, maxWidth: 72 }}>...</div>

// Đoạn text đọc thoải mái nhất khoảng 65 ký tự
<p className="max-w-prose">Long text...</p>

// Modal cao tối đa 80% chiều cao màn hình
<div className="max-h-[80vh] overflow-y-auto">...</div>
```

**Khi nào dùng**:
- `min-w` (rộng tối thiểu): phòng case content nhỏ làm khối co lại quá nhỏ
- `max-w` (rộng tối đa): phòng case content quá dài làm khối giãn ra xấu
- LUÔN PHẢI có ít nhất 1 trong 2 cho khối có thể co giãn

### 3.2 Aspect Ratio (Tỉ lệ ngang/cao) — Giữ tỉ lệ hình dạng

**Ví dụ đời thường**: Như tivi 16:9 — chiều ngang luôn gấp 1.78 lần chiều cao, dù to hay nhỏ.

```jsx
// Khung video tỉ lệ 16:9 (chuẩn TV)
<div className="aspect-video">
  <iframe src="..." />
</div>

// Khung VUÔNG 1:1 (avatar, slot sticker)
<div className="aspect-square">
  <img src="..." />
</div>

// Khung tùy chỉnh 308:211 (mockup IruKa thumbnail card)
<div style={{ aspectRatio: '308 / 211' }}>
  <img className="w-full h-full object-cover" />
</div>
```

**Bài học từ project IruKa (L-38)**: TailwindCSS class `aspect-[308/211]` đôi khi không hoạt động → dùng `style={{}}` trực tiếp để chắc chắn áp dụng.

### 3.3 Clamp — Kẹp giá trị trong khoảng [min, mong muốn, max]

**Ví dụ đời thường**: Như cái khóa van nước — chỉ cho chảy ít nhất là A, mong muốn B, tối đa C, không quá khỏi giới hạn.

```css
/* Cỡ chữ co giãn theo màn hình NHƯNG min 16, max 24 */
font-size: clamp(16px, 4vw, 24px);

/* Khối rộng: ít nhất 280px, ưa thích 50%, tối đa 600px */
width: clamp(280px, 50%, 600px);
```

**Khi nào dùng**: Khi muốn responsive (tự co giãn) nhưng cần giới hạn an toàn — emoji, font, container.

---

## 4. Co giãn theo CÁI BAO CHỨA — Container Queries

### 4.1 Container Query là gì?

**Ví dụ đời thường**: Trước đây nhà thiết kế nội thất chỉ biết "kích thước phòng" (viewport — màn hình). Bây giờ có **CÁI HỘP** (container) — đồ trong hộp tự co giãn theo hộp, kể cả hộp đặt ở phòng to hay nhỏ.

```jsx
// Cha (slot) khai báo MÌNH LÀ container
<div style={{ containerType: 'inline-size', width: 80 }}>
  {/* Con: kích thước = X% chiều ngang CHA TRỰC TIẾP */}
  <span style={{ fontSize: '55cqi' }}>🐱</span>
  {/* fontSize = 55% × 80 = 44px */}
</div>
```

### 4.2 Các đơn vị Container Query

| Đơn vị | Tiếng Việt | Ý nghĩa |
|--------|-----------|---------|
| `cqi` | container query **inline size** | 1% chiều ngang cha (theo hướng đọc) |
| `cqb` | container query **block size** | 1% chiều cao cha |
| `cqw` | container query **width** | 1% chiều rộng cha |
| `cqh` | container query **height** | 1% chiều cao cha |
| `cqmin` | container query **min** | Lấy min(width, height) |
| `cqmax` | container query **max** | Lấy max(width, height) |

### 4.3 Container Query với rule `@container`

**Ví dụ đời thường**: "Khi cái hộp này rộng hơn 400px, thì chữ trong hộp này to lên" — không quan trọng hộp đặt ở phòng nào.

```jsx
<div style={{ containerType: 'inline-size' }} className="card">
  <div className="card-title">...</div>
</div>

<style>
/* Khi container cha rộng >= 400px, đổi style chữ */
@container (min-width: 400px) {
  .card-title { font-size: 24px; }
}
</style>
```

**Ưu / Nhược điểm**:
- ✅ Khối "biết" mình đang ở khung to hay nhỏ → tự thích nghi
- ❌ Phức tạp hơn media query (luật cũ theo viewport)
- ⚠️ **Tương thích trình duyệt**: Chrome 105+, Safari 16+, Firefox 110+ (từ 2022)

### 4.4 Áp dụng trong project IruKa (L-38)

```jsx
// Slot sticker — emoji tự scale theo slot
<div style={{
  containerType: 'inline-size',
  minWidth: 52,    // phòng squish (bị bóp) quá nhỏ
  maxWidth: 72,
  aspectRatio: '1',
}}>
  <span style={{ fontSize: '55cqi' }}>🐱</span>
</div>
```

---

## 5. Cách ĐẶT phần tử ở vị trí mong muốn

### 5.1 Các loại Position (Định vị)

**Ví dụ đời thường**:
- `static` = đặt theo hàng lối tự nhiên (như xếp ghế trong rạp)
- `relative` = đặt theo hàng tự nhiên NHƯNG có thể nhích lên/xuống vài cm
- `absolute` = NHẢY KHỎI hàng, gắn vào cái thùng có đánh dấu sẵn (parent có position)
- `fixed` = ghim cứng vào màn hình (không cuộn theo nội dung)
- `sticky` = bình thường thì ở chỗ tự nhiên, nhưng KHI CUỘN qua thì DÍNH luôn vào mép trên (như sticker dính)

| Loại | Hành vi | Khi dùng |
|------|---------|----------|
| `static` (mặc định) | Theo hàng tự nhiên | Hầu hết phần tử |
| `relative` | Theo hàng, nhích tý được | Cha của absolute (làm điểm tựa) |
| `absolute` | Bay khỏi hàng, gắn vào cha gần nhất có position | Badge góc, dropdown, overlay |
| `fixed` | Ghim cứng vào màn hình, cuộn không thay đổi | Modal, sticky header, FAB |
| `sticky` | Vừa relative vừa fixed — dính khi cuộn qua | Header bảng, tiêu đề section |

### 5.2 Ví dụ Badge ở góc thumbnail (IruKa)

```jsx
{/* Cha CẦN position: relative để con absolute neo đúng vào cha */}
<div className="relative">
  <img src="thumb.png" />

  {/* Badge "+2⭐" ở góc PHẢI TRÊN */}
  <span className="absolute right-2 top-2 ...">
    +2⭐
  </span>

  {/* 🔒 ở góc PHẢI DƯỚI */}
  <span className="absolute right-2 bottom-2 ...">
    🔒
  </span>
</div>
```

### 5.3 Sticky — Dính khi cuộn qua

**Ví dụ đời thường**: Như khi bạn cuộn xuống đọc bảng dài — tiêu đề bảng (Tên, Tuổi, Lương) DÍNH lên đầu để luôn nhìn thấy.

```jsx
{/* Header dính trên cùng khi cuộn xuống */}
<header className="sticky top-0 z-50 bg-white shadow">
  <nav>...</nav>
</header>

{/* Cột đầu của bảng dính bên trái */}
<table>
  <td className="sticky left-0 bg-white">Tên</td>
  <td>Giá trị</td>
</table>
```

### 5.4 Inset — Viết tắt top/right/bottom/left

**Ví dụ đời thường**: Như nói "căn cách mép 0 cả 4 chiều" → viết gọn `inset-0`.

```jsx
// Cách cũ:
<div className="absolute top-0 right-0 bottom-0 left-0">...</div>

// Cách mới (inset-0 = tất cả 4 chiều = 0):
<div className="absolute inset-0">...</div>

// Inset-x = trái + phải
<div className="absolute inset-x-0 top-0">...</div>
```

---

## 6. Xếp TẦNG LỚP

### 6.1 Z-index — Tầng cao đè tầng thấp

**Ví dụ đời thường**: Như xếp giấy A4 chồng lên nhau — tờ trên đè lên tờ dưới. Số `z` càng to càng LÊN TRÊN.

```jsx
{/* Z càng cao càng LÊN TRÊN */}
<div className="z-10">Layer 1</div>      {/* dưới */}
<div className="z-20">Layer 2</div>      {/* giữa */}
<div className="z-50">Modal</div>        {/* trên cùng */}
```

### 6.2 Stacking Context (Vùng xếp tầng riêng) — QUY TẮC QUAN TRỌNG

**Ví dụ đời thường**: Tưởng tượng có 2 cái hộp riêng biệt, mỗi hộp có "tầng lớp" riêng. Cây bút trong hộp A KHÔNG cạnh tranh tầng với cây bút trong hộp B — chúng ở 2 thế giới khác nhau.

**Stacking context được tạo khi**:
- `position: relative/absolute` + `z-index ≠ auto` (không phải mặc định)
- `position: fixed/sticky`
- `opacity < 1` (mờ một chút thôi cũng tạo context mới!)
- `transform: ≠ none`
- `filter: ≠ none`
- `isolation: isolate` (cô lập có chủ đích)

### 6.3 Mẹo dùng z-index trong project lớn

```jsx
// ❌ Tránh: hard-code z-index lung tung
<div className="z-[9999]">Modal</div>

// ✅ Dùng SCALE NHẤT QUÁN trong project
// z-0:    nền cơ bản
// z-10:   nội dung nâng nhẹ
// z-20:   dropdown
// z-30:   sticky header
// z-40:   tooltip (chữ hiện khi rê chuột)
// z-50:   modal/dialog (cửa sổ pop-up)
// z-[60]: toast notification (thông báo bay) — cao nhất, hiếm dùng
```

### 6.4 Isolation — Cô lập KHÔNG dùng z-index

**Ví dụ đời thường**: "Cho cái khối này vào cái hộp riêng — bên trong nó muốn xếp tầng gì thì xếp, không ảnh hưởng bên ngoài."

```jsx
{/* Cô lập một section khỏi xếp tầng bên ngoài */}
<div className="isolate">
  {/* Z-index của con không thoát ra ngoài */}
  <div className="absolute z-50">...</div>
</div>
```

---

## 7. Căn chỉnh

### 7.1 Trong Flex

**Trục chính (main axis)** = hướng xếp các khối (flex-row → ngang, flex-col → dọc)
**Trục phụ (cross axis)** = vuông góc với trục chính

```jsx
<div className="flex">  {/* xếp hàng ngang */}
  {/* Trục CHÍNH = ngang, trục PHỤ = dọc */}
  <Items />
</div>

// justify-* (chỉnh theo trục CHÍNH)
justify-start      // ép TRÁI
justify-center     // GIỮA
justify-end        // ép PHẢI
justify-between    // ĐẦU + CUỐI, ở giữa chia đều khoảng
justify-around     // cách đều có lề ngoài
justify-evenly     // cách đều không lề

// items-* (chỉnh theo trục PHỤ — mỗi khối)
items-start        // ép TRÊN
items-center       // GIỮA (chiều dọc)
items-end          // ép DƯỚI
items-stretch      // GIÃN full chiều cao (mặc định)
items-baseline     // căn theo đáy chữ

// self-* override cho 1 khối cụ thể
self-end           // khối này riêng ép xuống
```

### 7.2 Trong Grid

```jsx
<div className="grid grid-cols-3">
  // Giống Flex nhưng có thêm shortcut:
  place-items-center   // = items + justify cùng lúc (TIẾT KIỆM dòng code)
  place-content-center // căn cả group items
</div>

// Cho 1 ô cụ thể:
justify-self-end       // ô này ép phải trong cell
align-self-center      // ô này căn giữa dọc trong cell
place-self-center      // cả 2 cùng lúc
```

### 7.3 Căn GIỮA — Cách đơn giản nhất

**3 cách căn 1 khối VÀO GIỮA cha**:

```jsx
// 1. FLEX (chuẩn nhất hiện nay)
<div className="flex items-center justify-center">...</div>

// 2. GRID (1 dòng gọn)
<div className="grid place-items-center">...</div>

// 3. ABSOLUTE + TRANSFORM (kỹ thuật cũ)
<div className="relative">
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    ...
  </div>
</div>
```

---

## 8. Khoảng cách

### 8.1 Margin (lề ngoài) vs Padding (lề trong)

```
┌─────────────────────────────────┐
│ margin (KHOẢNG TRỐNG BÊN NGOÀI) │
│  ┌───────────────────────────┐  │
│  │  border (viền)            │  │
│  │  ┌─────────────────────┐  │  │
│  │  │ padding (LỀ BÊN TRONG)│  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   NỘI DUNG    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Quy tắc**:
- `margin` (**lề ngoài** — khoảng cách BÊN NGOÀI viền): tạo khoảng cách giữa khối với khối khác
- `padding` (**lề trong** — khoảng cách BÊN TRONG viền): khoảng cách giữa viền và nội dung
- `margin` có thể **âm** (vd `-mt-4`): kéo khối lên trên 16px — dùng cẩn thận
- `margin` có **collapsing** (gộp lề): 2 div liên tiếp đều có `mt-4` và `mb-4` → khoảng cách = max(16, 16) = **16px** (KHÔNG phải 32px như nghĩ)

### 8.2 Gap (khe hở) — Khoảng cách trong Flex/Grid (KHUYÊN dùng nhất)

**Ví dụ đời thường**: Như xếp chai trên kệ — gap là khoảng trống GIỮA các chai. Không cần tính lề ngoài của từng chai.

```jsx
// ❌ Cũ: dùng margin giữa các con (phải xét chai cuối không có margin)
<div className="flex">
  <Item className="mr-4" />
  <Item className="mr-4" />
  <Item />  {/* chai cuối không có margin */}
</div>

// ✅ Mới: dùng gap (đơn giản, không cần xét chai cuối)
<div className="flex gap-4">
  <Item />
  <Item />
  <Item />
</div>

// Grid: gap-x + gap-y khác nhau
<div className="grid grid-cols-3 gap-x-4 gap-y-2">
  ...
</div>
```

### 8.3 Space-x / space-y — Khoảng cách giữa các con

```jsx
{/* Tự thêm margin-left vào các con từ thứ 2 trở đi */}
<div className="flex space-x-4">
  <Item /> <Item /> <Item />
</div>
```

**Khác `gap`**: `space-x` tạo margin (có thể bị collapsing), `gap` là khoảng cách thuần.

---

## 9. Tự đổi giao diện theo MÀN HÌNH

### 9.1 Media Query (Luật theo màn hình) — Dựa vào VIEWPORT (kích thước cửa sổ)

**Ví dụ đời thường**: "Khi cửa sổ rộng hơn 768px thì làm A, không thì làm B."

```jsx
{/* Mobile-first: mặc định mobile, breakpoint override */}
<div className="text-sm md:text-base lg:text-lg">
  Mobile: 14px → Tablet: 16px → Desktop: 18px
</div>

{/* Ẩn trên mobile, hiện trên desktop */}
<div className="hidden md:block">Chỉ hiện ≥768px</div>

{/* Hiện trên mobile, ẩn trên desktop */}
<div className="block md:hidden">Chỉ hiện <768px</div>
```

### 9.2 Tailwind Breakpoints (mốc kích thước mặc định)

| Tên | Width tối thiểu | Thiết bị tham khảo |
|-----|----------------|---------------------|
| `sm` | 640px | Phone landscape (xoay ngang) |
| `md` | 768px | Tablet dọc |
| `lg` | 1024px | Tablet ngang / Laptop nhỏ |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop lớn |

### 9.3 Mobile-first vs Desktop-first

**Mobile-first**: viết code **CHO ĐIỆN THOẠI TRƯỚC**, rồi override cho tablet/desktop.
**Desktop-first**: viết code **CHO DESKTOP TRƯỚC**, rồi override cho mobile (KHÔNG khuyên dùng — khó maintain).

```css
/* ✅ MOBILE-FIRST (khuyên dùng) */
.button { padding: 8px; }          /* mobile mặc định */
@media (min-width: 768px) {
  .button { padding: 12px; }        /* tablet+ override */
}

/* ❌ DESKTOP-FIRST (cũ, khó duy trì) */
.button { padding: 12px; }         /* desktop mặc định */
@media (max-width: 767px) {
  .button { padding: 8px; }         /* mobile override */
}
```

### 9.4 Pattern Responsive thường gặp

```jsx
{/* Lưới sản phẩm — số cột tự đổi theo width */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items}
</div>

{/* Đổi hướng xếp theo viewport */}
<div className="flex flex-col md:flex-row gap-4">
  <Main />
  <Side />
</div>

{/* Font responsive với clamp (không cần media query) */}
<h1 style={{ fontSize: 'clamp(24px, 5vw, 48px)' }}>...</h1>
```

---

## 10. Chữ

### 10.1 Line-height (khoảng dòng) — Khoảng cách giữa các dòng văn bản

**Ví dụ đời thường**: Như viết tay — bạn để khoảng cách giữa các dòng để đọc đỡ chật.

```jsx
// Số tuyệt đối (px) — KHÔNG khuyên (không scale theo font-size)
<p style={{ fontSize: 16, lineHeight: '24px' }}>...</p>

// Số tỉ lệ (KHUYẾN NGHỊ) — tự scale theo font-size
<p style={{ fontSize: 16, lineHeight: 1.5 }}>...</p>
// Line-height = 16 × 1.5 = 24px

// Tailwind preset
className="leading-tight"   /* 1.25 — tiêu đề */
className="leading-normal"  /* 1.5 — body */
className="leading-relaxed" /* 1.625 — đoạn dài */
className="leading-none"    /* 1.0 — emoji, icon (TRÁNH text dài, đọc rất tức mắt) */
```

### 10.2 Letter-spacing (khoảng chữ — tracking) — Khoảng cách giữa các CHỮ CÁI

**Khi dùng**: text in HOA cần thoáng hơn (vì chữ hoa to hơn chữ thường).

```jsx
<p className="uppercase tracking-wider text-xs">
  BỘ STICKER TUẦN NÀY
</p>

// tracking-tight  = -0.025em (chữ SÁT hơn — dùng cho tiêu đề lớn)
// tracking-normal = 0 (mặc định)
// tracking-wide   = 0.025em
// tracking-wider  = 0.05em (cho TEXT HOA nhỏ)
// tracking-widest = 0.1em
```

### 10.3 Truncate / Line-clamp — Cắt chữ dài quá

**Ví dụ đời thường**: Khi viết title của bài báo dài, chỉ hiện 1-2 dòng, phần còn lại "..." để bỏ.

```jsx
// Cắt 1 dòng (kèm dấu ...)
<p className="truncate">Một câu rất rất dài...</p>

// Cắt N dòng
<p className="line-clamp-2">Đoạn dài cắt còn 2 dòng...</p>
<p className="line-clamp-3">...</p>
```

**Yêu cầu**: cha phải có WIDTH cố định để biết khi nào cắt.

### 10.4 Font-feature-settings — Tính năng nâng cao của font

```jsx
// Số có dấu thập phân thẳng cột (cho bảng giá)
<table style={{ fontFeatureSettings: '"tnum"' }}>
  <td>1,234.50</td>
  <td>9,876.00</td>
</table>
```

---

## 11. Hiệu ứng CHUYỂN ĐỘNG

### 11.1 Transition (chuyển trạng thái mượt)

**Ví dụ đời thường**: Khi bật đèn — không phải bật cái sáng ngay 100%, mà sáng dần lên trong 0.3 giây.

```jsx
{/* Hover thì phóng to từ 1.0 → 1.05 trong 200ms */}
<button className="transition-transform duration-200 hover:scale-105">
  Hover me
</button>

{/* Đổi nhiều properties cùng lúc */}
<div className="transition-all duration-300 ease-in-out hover:bg-blue-500 hover:shadow-lg">
  ...
</div>
```

**Đường cong tăng tốc (easing)**:
- `ease-linear` (tuyến tính): tốc độ ĐỀU (cứng nhắc, ít tự nhiên)
- `ease-in`: CHẬM lúc đầu → NHANH lúc cuối
- `ease-out` (CHUẨN NHẤT): NHANH lúc đầu → CHẬM lúc cuối → tự nhiên giống vật lý
- `ease-in-out`: CHẬM-NHANH-CHẬM (như ô tô chạy)

### 11.2 Transform (biến hình) — Phép biến đổi KHÔNG ảnh hưởng layout

**Ví dụ đời thường**: Khi cô gái xoay trước gương — chỉ thị giác thấy cô xoay, nhưng vị trí chỗ đứng KHÔNG đổi (đồ vật xung quanh không bị xê dịch).

```jsx
{/* Translate (di chuyển) — KHÔNG tạo reflow (vẽ lại layout) */}
<div className="hover:-translate-y-1">Hover thì BAY LÊN 4px</div>

{/* Scale (phóng to/nhỏ) */}
<div className="hover:scale-110">Hover thì TO HƠN 10%</div>

{/* Rotate (xoay) */}
<div className="hover:rotate-12">Hover thì NGHIÊNG 12 độ</div>

{/* Kết hợp */}
<div className="transform hover:-translate-y-1 hover:scale-105">
  Bay lên + To hơn
</div>
```

**Quan trọng**: `transform` + `opacity` là 2 thuộc tính **GPU-accelerated** (chạy bằng card đồ họa) → mượt 60fps. Tránh animate `width/height/top/left` vì gây **reflow** (vẽ lại layout = giật, lag).

### 11.3 Animation — Lặp lại theo keyframes

**Ví dụ đời thường**: Như đoạn vũ điệu — mỗi khoảnh khắc (keyframe) làm 1 tư thế khác nhau, lặp lại.

```jsx
// Định nghĩa các tư thế (keyframes)
<style jsx>{`
  @keyframes stickerPop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.18); }   /* phồng lên 1.18 */
    70%  { transform: scale(0.96); }   /* hơi co lại */
    100% { transform: scale(1); }      /* về vị trí ban đầu */
  }
`}</style>

// Áp dụng
<div style={{ animation: 'stickerPop 0.7s ease-out' }}>
  Sticker vừa unlock 🎉
</div>
```

---

## 12. Hiệu ứng ĐẸP MẮT

### 12.1 Box-shadow (đổ bóng)

**Ví dụ đời thường**: Như cái card đặt trên bàn — có bóng đổ phía dưới giúp nó "nổi" lên khỏi mặt phẳng.

```jsx
{/* Bóng mỏng phía dưới (card lift effect) */}
<div className="shadow-md">...</div>

{/* Bóng bự (modal, popup) */}
<div className="shadow-2xl">...</div>

{/* Bóng tùy chỉnh */}
<div style={{ boxShadow: '0 4px 12px rgba(251,146,60,0.4)' }}>
  Bóng cam mềm
</div>

{/* Nhiều bóng chồng lên nhau (layering) */}
<div style={{
  boxShadow: `
    0 1px 2px rgba(0,0,0,0.05),
    0 4px 12px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.5)
  `,
}}>...</div>
```

**Mẹo chuyên sâu** (từ sách "Refactoring UI"):
- Bóng tự nhiên: offset Y > X (vì ánh sáng từ TRÊN xuống)
- Bóng càng MỜ + LỚN → càng giống ÁNH SÁNG MỀM tự nhiên
- Tránh shadow đen `rgba(0,0,0,1)` thuần → dùng `rgba(0,0,0,0.1-0.15)` mềm

### 12.2 Gradient (chuyển màu)

**Ví dụ đời thường**: Như khi mặt trời lặn — bầu trời chuyển từ vàng → cam → đỏ → tím dần. Đó là gradient.

```jsx
{/* Linear (thẳng) — 135deg = chéo */}
<div style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B1A)' }}>
  Card warmup (chuyển cam từ sáng → đậm)
</div>

{/* Radial (tròn) — glow ở góc */}
<div style={{
  background: 'radial-gradient(circle at top right, rgba(255,200,61,0.28) 0%, transparent 65%)'
}}>
  Hiệu ứng ÁNH SÁNG góc phải trên
</div>

{/* Tailwind */}
<div className="bg-gradient-to-br from-orange-100 to-orange-200">
  ...
</div>
```

### 12.3 Filter — Hiệu ứng kiểu Photoshop

**Ví dụ đời thường**: Như filter Instagram — biến ảnh từ màu sang đen trắng, hoặc làm mờ.

```jsx
{/* Grayscale (biến xám) */}
<img className="grayscale">...</img>
<img style={{ filter: 'grayscale(0.6)' }}>...</img>  // 60% xám

{/* Blur (mờ) */}
<div style={{ filter: 'blur(8px)' }}>...</div>

{/* Drop shadow (đổ bóng cho img/svg — KHÁC box-shadow) */}
<span style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
  🔒
</span>

{/* Brightness (độ sáng) / Contrast (độ tương phản) */}
<img style={{ filter: 'brightness(1.2) contrast(1.1)' }}>...</img>

{/* Kết hợp */}
<img style={{ filter: 'grayscale(0.5) blur(2px) brightness(0.9)' }}>
  Trạng thái DISABLED (vô hiệu hoá)
</img>
```

### 12.4 Backdrop-filter — Hiệu ứng KÍNH MỜ (glassmorphism)

**Ví dụ đời thường**: Như khi bạn để miếng kính mờ trước ảnh — ảnh sau kính bị mờ đi nhưng vẫn nhìn thấy lờ mờ. Giống nav bar iOS/macOS hiện nay.

```jsx
<div style={{
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(20px) saturate(180%)',  // làm mờ phía sau + tăng saturate
}}>
  Nav bar trong suốt như iOS/macOS
</div>
```

### 12.5 Opacity (độ mờ)

**Ví dụ đời thường**: Như khi pha màu nước — pha thêm nước → màu nhạt đi, nhưng vẫn còn màu.

```jsx
{/* Mờ cả khối (kể cả con) */}
<div className="opacity-50">Mờ 50%</div>

{/* Mờ CHỈ background (giữ chữ rõ) — DÙNG rgba thay vì opacity */}
<div style={{ background: 'rgba(0,0,0,0.5)' }}>
  Chữ vẫn 100% rõ ✅
</div>

{/* Bài học IruKa: nếu muốn 🔒 icon RÕ khi cha MỜ → tách opacity ra span riêng */}
```

---

## 13. Kỹ thuật MỚI 2024+

### 13.1 Subgrid (lưới con kế thừa lưới cha)

**Ví dụ đời thường**: Lưới ô bàn cờ chính có 8×8 ô. Mỗi ô có lưới nhỏ kế thừa từ cha → không cần tự định nghĩa lưới mới.

```jsx
{/* Cha: lưới 3 cột */}
<div className="grid grid-cols-3 gap-4">
  {/* Con: kế thừa cột của cha (KHÔNG tự tạo lưới mới) */}
  <article className="grid grid-cols-subgrid col-span-3 gap-4">
    <h3>Title</h3>
    <p>Description</p>
    <button>CTA</button>
  </article>
</div>
```

**Hỗ trợ trình duyệt**: Chrome 117+, Safari 16+, Firefox 71+.

### 13.2 Anchor Positioning — Neo khối A vào khối B (NEW 2024)

**Ví dụ đời thường**: "Cho cái tooltip này LUÔN xuất hiện DƯỚI cái nút kia" — kể cả khi nút di chuyển.

```css
/* Khối A — đặt tên anchor */
.button {
  anchor-name: --my-button;
}

/* Khối B (tooltip) neo vào A */
.tooltip {
  position: absolute;
  position-anchor: --my-button;
  top: anchor(--my-button bottom);   /* ngay dưới A */
  left: anchor(--my-button center);  /* căn giữa A */
}
```

**Hỗ trợ**: Chrome 125+ (4/2024). Khá mới, dùng cẩn thận.

### 13.3 View Transitions — Animation CHUYỂN TRANG mượt

**Ví dụ đời thường**: Khi nhấn link chuyển trang — thay vì giật khô, trang cũ MỜ DẦN và trang mới HIỆN DẦN (như xem video).

```jsx
// JS: bật smooth transition giữa các route Next.js
document.startViewTransition(() => {
  router.push('/new-page');
});

// CSS: tùy chỉnh animation
::view-transition-old(root) { animation: fade-out 0.3s; }
::view-transition-new(root) { animation: fade-in 0.3s; }
```

### 13.4 Logical Properties — Hỗ trợ ngôn ngữ phải-trái (RTL)

**Ví dụ đời thường**: Tiếng Việt/Anh đọc TRÁI → PHẢI. Tiếng Ả Rập/Do Thái đọc PHẢI → TRÁI. Logical properties tự đảo cho 2 hướng.

```css
/* ❌ Cũ: chỉ đúng với hướng đọc trái-phải (Việt, Anh) */
margin-left: 10px;
padding-right: 20px;

/* ✅ Mới: tự đảo cho phải-trái (Ả Rập) */
margin-inline-start: 10px;   /* trái với LTR, phải với RTL */
padding-inline-end: 20px;    /* phải với LTR, trái với RTL */

/* Tailwind */
className="ms-2 me-4 ps-3 pe-5"
```

### 13.5 :has() — Selector "CHA có chứa CON"

**Ví dụ đời thường**: "Nếu form có chứa input bị lỗi → đổi màu nút submit."

```css
/* Card có chứa .featured → đổi style cha */
.card:has(.featured) {
  border: 2px solid gold;
}

/* Form KHÔNG có input lỗi → đổi style nút submit */
form:not(:has(input.error)) button[type=submit] {
  background: green;
}
```

### 13.6 Scroll-snap — Cuộn theo MỐC

**Ví dụ đời thường**: Như slide PowerPoint — bạn cuộn → tự dừng đúng ở slide tiếp theo (không lưng chừng giữa).

```jsx
<div className="flex overflow-x-auto snap-x snap-mandatory">
  {cards.map(c => (
    <div className="snap-center w-full flex-shrink-0">
      <Card />
    </div>
  ))}
</div>
```

---

## 14. BẢNG GỢI Ý

### 14.1 Khi cần SẮP XẾP phần tử

| Tình huống | Kỹ thuật |
|-----------|----------|
| Hàng/cột 1 chiều | Flex |
| Lưới 2 chiều | Grid |
| Phủ lên khối khác (vd: badge ở góc) | Position absolute + z-index |
| Theo cửa sổ (vd: modal) | Position fixed |
| Dính khi cuộn qua | Position sticky |

### 14.2 Khi cần KÍCH THƯỚC

| Tình huống | Kỹ thuật |
|-----------|----------|
| Cố định (vd: viền 2px) | px |
| Tỉ lệ với cha | % |
| Tỉ lệ với chữ root (an toàn theo user setting) | rem |
| Tỉ lệ với cửa sổ trình duyệt | vw / vh / svh |
| Tỉ lệ với container cha (CHÍNH XÁC nhất) | cqi / cqb |
| Có giới hạn min-max | clamp(min, X, max) |
| Giữ tỉ lệ ngang/cao cố định | aspect-ratio |

### 14.3 Khi cần CĂN GIỮA

| Tình huống | Kỹ thuật |
|-----------|----------|
| 1 phần tử trong cha | `flex items-center justify-center` |
| Nhiều phần tử + đều khoảng | `flex justify-between` / `gap` |
| Nội dung trong ô grid | `place-items-center` |
| Absolute 1 phần tử vào giữa | `inset-0 m-auto` HOẶC `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` |

### 14.4 Khi cần RESPONSIVE (tự đổi theo màn hình)

| Tình huống | Kỹ thuật |
|-----------|----------|
| Đổi layout theo CỬA SỔ trình duyệt | Media query (`md:`, `lg:`) |
| Đổi theo CONTAINER cha (component dùng nhiều nơi) | Container query (`@container`) |
| Số cột tự thêm/bớt theo width | Grid `auto-fill` + `minmax` |
| Font scale theo viewport có giới hạn | `clamp()` |
| Ảnh nhiều size theo màn hình | `picture` + `srcset` |

### 14.5 Khi cần HIỆU ỨNG

| Tình huống | Kỹ thuật |
|-----------|----------|
| Hover smooth | `transition` |
| Lặp đi lặp lại (loading, pulse) | `animation` + `@keyframes` |
| Mượt 60fps (KHÔNG giật) | `transform` + `opacity` (chạy bằng GPU) |
| Bóng nâng card | `box-shadow` (Y > X, mờ lớn) |
| Kính mờ iOS | `backdrop-filter: blur()` |

---

## 📚 Tài liệu tham khảo (đọc thêm)

1. **CSS Tricks** — https://css-tricks.com (kỹ thuật CSS thực chiến)
2. **Refactoring UI** (Adam Wathan + Steve Schoger) — sách dạy designer-cho-coder, RẤT đáng đọc cho người không học design
3. **MDN Web Docs** — https://developer.mozilla.org/en-US/docs/Web/CSS (tài liệu chính thức)
4. **Tailwind CSS Docs** — https://tailwindcss.com/docs (utility-first reference)
5. **web.dev** — https://web.dev (Google's best practices)

## 🎯 Áp dụng cho project IruKa

- **Layout chính**: dùng `Flex flex-col` cho card + `Grid` cho pool sections
- **Khoảng cách**: dùng `gap` (KHÔNG dùng margin giữa các con)
- **Responsive**: viết **mobile-first** (mobile trước, override cho tablet/desktop)
- **Scale theo container**: dùng **cqi units** với `containerType: 'inline-size'` (xem bài học L-38)
- **Inline style**: dùng cho giá trị KHÔNG CHUẨN của Tailwind (xem bài học L-38) — màu hex, padding lẻ, opacity số lẻ
- **Pixel-perfect**: dùng `style={{}}` thay vì Tailwind arbitrary `bg-[#...]`, `text-[Xpx]`

---

## 🗒️ Bảng từ điển thuật ngữ Anh → Việt

| Tiếng Anh | Tiếng Việt |
|-----------|-----------|
| **Layout** | Bố cục, cách xếp |
| **Flex** | Hệ thống xếp theo 1 chiều (ngang HOẶC dọc) |
| **Grid** | Hệ thống xếp theo lưới 2 chiều |
| **Container** | Cái bao chứa, khung |
| **Viewport** | Cửa sổ trình duyệt (vùng hiện ra trên màn hình) |
| **Position** | Định vị, đặt vị trí |
| **Absolute** | Bay khỏi hàng, gắn vào cha có position |
| **Relative** | Ở chỗ tự nhiên nhưng có thể nhích |
| **Fixed** | Ghim cứng vào màn hình |
| **Sticky** | Dính (bình thường relative, dính khi cuộn qua) |
| **Z-index** | Số tầng xếp lớp (cao đè thấp) |
| **Stacking context** | Vùng xếp tầng riêng biệt |
| **Margin** | Lề ngoài (khoảng cách bên ngoài viền) |
| **Padding** | Lề trong (khoảng cách bên trong viền) |
| **Gap** | Khe hở (khoảng cách giữa các con trong Flex/Grid) |
| **Border** | Viền |
| **Border-radius** | Bo góc (cong viền) |
| **Aspect ratio** | Tỉ lệ chiều ngang/cao |
| **Min/Max width** | Rộng tối thiểu / tối đa |
| **Clamp** | Kẹp giá trị trong khoảng [min, X, max] |
| **Responsive** | Tự đổi giao diện theo kích thước màn hình |
| **Media query** | Luật áp dụng theo kích thước cửa sổ |
| **Container query** | Luật áp dụng theo kích thước cha (container) |
| **Breakpoint** | Mốc kích thước để đổi giao diện |
| **Mobile-first** | Viết code cho mobile trước |
| **Transform** | Biến đổi hình dạng (translate/scale/rotate) |
| **Transition** | Chuyển trạng thái mượt |
| **Animation** | Hoạt hình lặp lại theo keyframes |
| **Keyframes** | Các khoảnh khắc trong animation |
| **Easing** | Đường cong tăng tốc của animation |
| **Box-shadow** | Bóng đổ ngoài khối |
| **Drop-shadow** | Bóng đổ theo HÌNH DẠNG (cho img/svg trong suốt) |
| **Gradient** | Chuyển màu mượt |
| **Filter** | Hiệu ứng kiểu Photoshop (grayscale, blur...) |
| **Backdrop-filter** | Hiệu ứng KÍNH MỜ trên nền sau |
| **Opacity** | Độ mờ (0-1) |
| **Truncate** | Cắt text dài |
| **Line-clamp** | Cắt text dài theo N dòng |
| **Letter-spacing** | Khoảng cách giữa các chữ cái |
| **Line-height** | Khoảng cách giữa các dòng |
| **Subgrid** | Lưới con kế thừa cha |
| **Anchor positioning** | Neo phần tử A vào phần tử B |
| **View transitions** | Animation chuyển trang mượt |
| **Logical properties** | Thuộc tính tự đảo cho ngôn ngữ RTL |
| **Scroll-snap** | Cuộn theo mốc cố định |

---

_Tài liệu này: `.agent/memory/frontend-layout-techniques.md`_
_Cập nhật: 2026-05-14 | IruKa Workspace_
