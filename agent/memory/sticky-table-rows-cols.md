# 📌 BÀI HỌC: Cố định hàng & cột trong bảng (Sticky Header + Frozen Columns)

> Kỹ thuật làm bảng dài & rộng có header trên + cột trái dính cố định khi cuộn — giống tính năng "Freeze Panes" của Excel.

---

## 🎯 Mục tiêu (giống Excel "Freeze Panes")

Khi bảng có nhiều hàng + nhiều cột (ví dụ 50 dòng × 31 cột):
- **Cuộn DỌC** → header (STT, Tiêu đề, cột 1-31, ...) **GIỮ NGUYÊN ở trên cùng**
- **Cuộn NGANG** → các cột đầu (STT/Tên/Loại) **GIỮ NGUYÊN bên trái**
- **Góc trên trái** (giao của 2 vùng sticky) → **GIỮ NGUYÊN cả 2 chiều**

---

## 🧱 Pattern 4 lớp (4-Layer Recipe)

### Lớp 1: Wrapper là scroll container

```css
.bang-wrap {
  overflow-x: auto;                     /* cuộn ngang trong bảng */
  overflow-y: auto;                     /* cuộn dọc trong bảng */
  max-height: calc(100vh - 320px);      /* giới hạn chiều cao = tạo vùng cuộn dọc */
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}
```

**⚠️ QUAN TRỌNG**:
- `position: sticky` của child sẽ stick theo **scroll container gần nhất**
- Nếu wrapper KHÔNG có overflow → sticky stick theo viewport (toàn trang)
- Nếu wrapper có `overflow: hidden` ngầm → sticky **không hoạt động** ❌
- Phải có `max-height` + `overflow: auto` để wrapper trở thành scroll container

### Lớp 2: Table dùng `border-collapse: separate`

```css
.bang {
  border-collapse: separate;            /* KHÔNG dùng collapse */
  border-spacing: 0;                     /* nhưng spacing = 0 nhìn vẫn như collapse */
}
```

**Lý do**: `border-collapse: collapse` sẽ **mất border** ở các sticky cells khi cuộn (border bị cắt). Dùng `separate + spacing 0` là workaround chuẩn.

### Lớp 3: Sticky HÀNG (header) — top stacking

Bảng có 3 hàng header (rowSpan=2 cho cột chính + rowSpan tiêu đề + cột con + nhãn):

```css
.bang thead th {
  position: sticky;
  background: #B7E5EE;                   /* opaque, không transparent */
  z-index: 5;                            /* base layer cho thead body cells */
}
/* Mỗi hàng có top khác nhau để xếp chồng không đè nhau */
.bang thead tr:nth-child(1) th { top: 0;    height: 24px; }
.bang thead tr:nth-child(2) th { top: 24px; height: 22px; }
.bang thead tr:nth-child(3) th { top: 46px; height: 20px; }
/* Tổng header: 24+22+20 = 66px luôn dính trên cùng khi cuộn dọc */
```

### Lớp 4: Sticky CỘT (frozen left) — left stacking

3 cột đầu (STT / Tên / Loại) freeze:

```css
/* Cột STT — left:0, width:30 */
.bang .col-stt {
  position: sticky;
  left: 0;
  width: 30px; min-width: 30px;
  z-index: 3;                            /* body sticky cell */
  background: white;                     /* opaque, không lộ data sau */
}
/* Cột Tên — left:30 (sau STT), width:170 */
.bang .col-ten {
  position: sticky;
  left: 30px;                            /* = width của STT */
  width: 170px; min-width: 170px;
  z-index: 3;
  background: white;
}
/* Cột Loại — left:200 (30+170), width:70 */
.bang .col-loai {
  position: sticky;
  left: 200px;
  width: 70px; min-width: 70px;
  z-index: 3;
  background: white;
  border-right: 2px solid #94A3B8;       /* viền đậm phân ranh giới đứng-yên/trượt */
}
```

**Công thức**: `left của cột N` = sum width của các cột sticky **TRƯỚC** nó (1 → N-1).

---

## 🏗️ Z-INDEX HIERARCHY (quan trọng)

Khi sticky-header + sticky-column gặp nhau ở **góc trên trái**, cần z-index cao nhất để không bị che:

```
Layer 7+  →  Header sticky-corner (sticky top + sticky left): STT-th, Tên-th, Loại-th
Layer 5   →  Header sticky-top thường: cột 1-31, meta cols
Layer 3   →  Body sticky-left thường: STT-cell, Tên-cell, Loại-cell mỗi dòng
Layer 1   →  Body cells regular (cột giá trị + meta totals)
```

```css
/* Body sticky-left cell */
.bang .col-stt  { z-index: 3; }
.bang .col-ten  { z-index: 3; }
.bang .col-loai { z-index: 3; }

/* Header sticky body cells (chỉ sticky-top) */
.bang thead th  { z-index: 5; }

/* Header sticky-corner (sticky top + sticky left) — z-index CAO NHẤT */
.bang th.col-stt  { z-index: 7; }
.bang th.col-ten  { z-index: 7; }
.bang th.col-loai { z-index: 7; }
```

**Quy tắc**: layer cao hơn 2 đơn vị mỗi khi thêm sticky direction (3 → 5 → 7).

---

## 🐛 LỖI THƯỜNG GẶP

### Bug 1: "Sticky không hoạt động"

**Nguyên nhân thường gặp:**
- Wrapper KHÔNG có `overflow: auto` hoặc `overflow: scroll`
- Parent có `overflow: hidden` chặn sticky
- thead `display: block` (mất context table)

**Fix**: thêm `overflow: auto` + `max-height` cho wrapper.

### Bug 2: "Header chồng lên nhau khi cuộn"

**Nguyên nhân**: 3 hàng thead cùng `top: 0` → đè nhau.

**Fix**: tính `top` riêng cho mỗi hàng (= sum height của các hàng phía trên).

### Bug 3: "Sticky cell bị transparent, lộ data sau khi cuộn"

**Nguyên nhân**: Cell không có background opaque.

**Fix**: set `background: white` (hoặc màu cụ thể) cho mọi sticky cell. KHÔNG dùng `transparent` hay `inherit`.

### Bug 4: "Border của sticky cell biến mất"

**Nguyên nhân**: `border-collapse: collapse` cắt border khi sticky cuộn.

**Fix**: đổi sang `border-collapse: separate; border-spacing: 0;`.

### Bug 5: "Sticky column bị nhảy khi cuộn ngang"

**Nguyên nhân**: width column không cố định (table-layout: auto + content khác nhau).

**Fix**: set `width + min-width + max-width` cùng giá trị cho sticky cell. Hoặc dùng `table-layout: fixed`.

### Bug 6: "Header trên + cột trái cùng sticky → góc trên trái bị che"

**Nguyên nhân**: z-index không đủ cao cho header-corner.

**Fix**: tăng z-index của các th sticky-corner (vd 7) > thead body cells (5) > body sticky cells (3).

### Bug 7: "selector nth-child match nhầm row 2 (day numbers)"

**Nguyên nhân**: dùng `thead th:nth-child(N)` áp cho row có rowSpan/colSpan → match sai row 2/3.

**Fix**: dùng class names rõ ràng (`.col-stt`, `.col-ten`, `.col-loai`...) thay vì nth-child.

---

## ✅ CHECKLIST TRIỂN KHAI

- [ ] Wrapper `overflow: auto` + `max-height` (vd `calc(100vh - 320px)`)
- [ ] Table `border-collapse: separate` + `border-spacing: 0`
- [ ] Mỗi hàng thead có `top` riêng (top stacking)
- [ ] Mỗi cột sticky có `left` riêng (left stacking — sum width trước nó)
- [ ] Mọi sticky cell có background **opaque** (không transparent)
- [ ] Z-index hierarchy: corner > header > body (vd 7 > 5 > 3)
- [ ] Class names rõ ràng (KHÔNG dùng nth-child cho rowSpan/colSpan tables)
- [ ] Border phải đậm trên cột sticky cuối → phân ranh giới "đứng yên" vs "trượt"
- [ ] Test: cuộn dọc → header ở trên, cuộn ngang → 3 cột bên trái, cuộn cả 2 → góc trái-trên giữ nguyên

---

## 🎓 GHI NHỚ NGẮN

> **Sticky table = wrapper scroll container + cells dán theo top/left của wrapper, không phải viewport**
>
> 4 lớp: **Wrapper** (overflow auto) → **Table** (separate border) → **Sticky rows** (top stacking) → **Sticky cols** (left stacking)
>
> Z-index: **corner > header > body sticky** (7 > 5 > 3)

---

*Phiên bản: v1.0-FE | Cập nhật: 2026-05-16 | Web Lifestyle Sticky Table Pattern*
