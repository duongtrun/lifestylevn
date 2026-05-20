# Kế hoạch xây dựng trang Iruka Care

## Tổng quan

Xây dựng trang **Iruka Care** tại route `/he-sinh-thai/iruka-care`, kế thừa cấu trúc và layout từ trang **Iruka EDU** đã hoàn thành. Header & Footer được kế thừa tự động từ `layout.tsx` gốc — chỉ cần tạo thư mục route mới và các component nội dung.

**Nguyên tắc:** Tái sử dụng tối đa cấu trúc (layout, animation, responsive) từ Iruka EDU → chỉ thay ảnh + nội dung text cho phù hợp với Iruka Care.

---

## Đối chiếu: Iruka EDU → Iruka Care

Trang Iruka Care có **8 section** tương ứng gần như 1:1 với Iruka EDU:

| # | Section Iruka EDU | → Section Iruka Care | Mức kế thừa |
|---|---|---|---|
| 1 | **IrukaEduHero** | **IrukaCareHero** | 🟢 Clone 95% — thay ảnh banner, mascot, text |
| 2 | **IrukaEduAbout** | **IrukaCareAbout** | 🟢 Clone 95% — thay ảnh mascot, text |
| 3 | **IrukaEduWorkflow** | **IrukaCareWorkflow** | 🟢 Clone 90% — thay ảnh workflow, text |
| 4 | **IrukaEduTech** | **IrukaCareTech** | 🟢 Clone 90% — thay text, icon |
| 5 | **IrukaEduCoreContent** | **IrukaCareProducts** | 🟡 Thiết kế mới 60% — Layout dạng Timeline 2026-2027 |
| 6 | **IrukaEduPotential** | **IrukaCarePotential** | 🟢 Clone 95% — thay text |
| 7 | **IrukaEduMission** | **IrukaCareMission** | 🟢 Clone 90% — thay ảnh, text |
| 8 | **IrukaEduSlogan** | **IrukaCareSlogan** | 🟢 Clone 95% — thay text, logo |

---

## Cấu trúc file sẽ tạo

```
src/
├── app/he-sinh-thai/iruka-care/
│   └── page.tsx                    [NEW] — Trang chính
│
├── components/iruka-care/
│   ├── IrukaCareHero.tsx           [NEW]
│   ├── IrukaCareAbout.tsx          [NEW]
│   ├── IrukaCareWorkflow.tsx       [NEW]
│   ├── IrukaCareTech.tsx           [NEW]
│   ├── IrukaCareProducts.tsx       [NEW] — Timeline sản phẩm
│   ├── IrukaCarePotential.tsx      [NEW]
│   ├── IrukaCareMission.tsx        [NEW]
│   └── IrukaCareSlogan.tsx         [NEW]

public/
└── img_iruka_care/                 [NEW] — Thư mục ảnh riêng
```

---

## Kế hoạch thực hiện — 8 Scope nhỏ

### Scope 1: Chuẩn bị cấu trúc
- Tạo thư mục `public/img_iruka_care/`
- Tạo route `src/app/he-sinh-thai/iruka-care/page.tsx`
- Tạo thư mục `src/components/iruka-care/`

### Scope 2: IrukaCareHero — Banner + Câu chuyện thương hiệu
- Clone từ `IrukaEduHero.tsx`, thay text và ảnh (banner, mascot).

### Scope 3: IrukaCareAbout — "Là gì?" + "Vì sao xây dựng?"
- Clone từ `IrukaEduAbout.tsx`, thay text và mascot.

### Scope 4: IrukaCareWorkflow — Hoạt động như thế nào?
- Clone từ `IrukaEduWorkflow.tsx`, thay 4 bước workflow.

### Scope 5: IrukaCareTech — Nền tảng công nghệ
- Clone từ `IrukaEduTech.tsx`, thay nội dung 5 khối tech card.

### Scope 6: IrukaCareProducts — Bộ sản phẩm (Timeline)
- Thiết kế mới dạng Timeline 2 cột: 2026 (bên trái) và 2027 (bên phải).

### Scope 7: IrukaCarePotential + IrukaCareMission
- Clone từ `IrukaEduPotential.tsx` và `IrukaEduMission.tsx`.

### Scope 8: IrukaCareSlogan
- Clone từ `IrukaEduSlogan.tsx`, chốt trang và kiểm tra responsive toàn diện.

---

## Câu hỏi cho anh:
1. **Ảnh:** Anh có sẵn bộ ảnh cho Iruka Care chưa? Nếu chưa, em sẽ dùng tạm ảnh EDU để dàn khung trước nhé.
2. **Text:** Anh có sẵn nội dung cho Iruka Care không, hay em tự soạn nội dung giả định cho hợp lý?
3. **Timeline Sản phẩm:** Nội dung cho năm 2026 và 2027 anh muốn để chữ gì?
