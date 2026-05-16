---
description: Lên Master Plan cho ý tưởng lớn - từ nghiên cứu thị trường đến kế hoạch triển khai toàn diện
---

# 🗺️ WORKFLOW: MASTER PLAN

## Mục đích
Trước khi bắt tay làm BẤT KỲ dự án hay tính năng lớn nào, phải có Master Plan.
Đây là bản kế hoạch bao quát nhất — từ ý tưởng → nghiên cứu → thiết kế → triển khai → đo lường.

> **Nguyên tắc:** Một giờ lên kế hoạch tốt = tiết kiệm mười giờ code lại.

---

## KHI NÀO CẦN MASTER PLAN?

| Tình huống | Cần Master Plan? |
|-----------|-----------------|
| Xây dựng sản phẩm mới | ✅ Bắt buộc |
| Tính năng lớn (> 1 tuần làm) | ✅ Bắt buộc |
| Thay đổi kiến trúc hệ thống | ✅ Bắt buộc |
| Tính năng nhỏ, rõ ràng | ❌ Dùng /plan-feature |
| Bug fix | ❌ Dùng /bugfix |

---

## QUY TRÌNH MASTER PLAN (7 GIAI ĐOẠN)

---

### 🔍 GIAI ĐOẠN 1: MÔ TẢ Ý TƯỞNG GỐC

**Bạn làm — Nói với AI:**
```
Ý tưởng: [Mô tả bằng lời đơn giản nhất có thể]
Vấn đề muốn giải quyết: [Người dùng đang gặp khó khăn gì?]
Người dùng mục tiêu: [Ai sẽ dùng sản phẩm/tính năng này?]
Cảm hứng: [Bạn thấy ai đó làm rồi? Bạn tự nghĩ ra? Link tham khảo?]
Mục tiêu thành công: [Bạn biết mình thành công khi nào?]
```

**Ví dụ tốt:**
> "Ý tưởng: App giao đồ ăn từ nhà hàng gần nhà đến văn phòng.
> Vấn đề: Nhân viên văn phòng không có thời gian ra ăn trưa, gọi Grab Food thì lâu.
> Người dùng: Nhân viên văn phòng tại các toà nhà văn phòng TP.HCM.
> Cảm hứng: Thấy Grab Food nhưng tập trung nhà hàng gần văn phòng hơn.
> Thành công: 100 đơn/ngày trong tháng đầu."

---

### 🌐 GIAI ĐOẠN 2: NGHIÊN CỨU & PHÂN TÍCH THỊ TRƯỜNG

// turbo
**AI làm tự động:**

#### 2.1 Nghiên cứu giải pháp đã tồn tại
```
AI sẽ phân tích:
□ Đối thủ trực tiếp (cùng thị trường, cùng vấn đề)
□ Đối thủ gián tiếp (giải quyết cùng vấn đề, khác cách)
□ Giải pháp thay thế (user đang tự giải quyết bằng cách gì?)
□ Sản phẩm tham khảo nước ngoài
```

#### 2.2 Phân tích đối thủ theo bảng
```
| Đối thủ | Điểm mạnh | Điểm yếu | Cơ hội cho mình |
|---------|-----------|----------|-----------------|
| [A]     | ...       | ...      | ...             |
| [B]     | ...       | ...      | ...             |
```

#### 2.3 Đánh giá thị trường
```
- Thị trường có đủ lớn không?
- Xu hướng đang tăng hay giảm?
- Barrier to entry (rào cản gia nhập)?
- Ai đang thắng và tại sao?
```

#### 2.4 Kết luận: Nên làm theo hướng nào?
```
Option A: [Làm khác biệt hoàn toàn] — Rủi ro cao, tiềm năng cao
Option B: [Cải thiện giải pháp hiện có] — Rủi ro thấp, dễ ra thị trường
Option C: [Ngách cụ thể trong thị trường lớn] — Khuyến nghị nhất
```

---

### 🎯 GIAI ĐOẠN 3: XÁC ĐỊNH MỤC TIÊU RÕ RÀNG

**AI đề xuất, bạn điều chỉnh:**

#### 3.1 Mục tiêu SMART
```
Specific   (Cụ thể):    [Làm gì chính xác?]
Measurable (Đo được):   [Con số cụ thể là bao nhiêu?]
Achievable (Khả thi):   [Có đủ nguồn lực không?]
Relevant   (Liên quan): [Phù hợp với direction công ty?]
Time-bound (Thời hạn):  [Deadline cụ thể?]
```

**Ví dụ:**
```
❌ Xấu: "Làm app giao đồ ăn thành công"
✅ Tốt: "Đạt 100 đơn/ngày và 4.5★ rating trong 3 tháng đầu tại Q.1 TP.HCM"
```

#### 3.2 Phân tầng mục tiêu
```
🏆 Mục tiêu cuối cùng (6-12 tháng):
   [Sản phẩm ở đâu, doanh thu bao nhiêu, user bao nhiêu]

🎯 Mục tiêu trung hạn (3 tháng):
   [Milestone cụ thể để biết đang đi đúng đường]

✅ Mục tiêu ngắn hạn (1 tháng - MVP):
   [Phiên bản tối thiểu đủ để validate ý tưởng]
```

#### 3.3 KPIs đo lường thành công
```
| KPI | Hiện tại | Mục tiêu 1T | Mục tiêu 3T | Cách đo |
|-----|----------|-------------|-------------|---------|
| ... | ...      | ...         | ...         | ...     |
```

---

### 💡 GIAI ĐOẠN 4: Ý TƯỞNG TỐI ƯU & GIẢI PHÁP

#### 4.1 Unique Value Proposition (Điểm khác biệt)
```
AI đề xuất: "Sản phẩm này tốt hơn/khác hơn đối thủ ở chỗ:
[1 câu duy nhất mô tả tại sao user chọn bạn thay vì người khác]"

Ví dụ: "Chỉ giao trong 30 phút, từ nhà hàng trong tòa nhà của bạn"
```

#### 4.2 Core Features (Tính năng cốt lõi MVP)
```
MUST HAVE (MVP - phải có ngay):
  □ [Tính năng 1] — Lý do: không có thì product không hoạt động
  □ [Tính năng 2] — Lý do: ...

SHOULD HAVE (Phase 2):
  □ [Tính năng 3] — Lý do: tăng retention
  □ [Tính năng 4] — ...

NICE TO HAVE (Phase 3+):
  □ [Tính năng 5] — Khi đã có user base
  □ [Tính năng 6] — ...

KHÔNG LÀM (và tại sao):
  □ [Tính năng X] — Lý do loại bỏ
```

#### 4.3 Tech Stack đề xuất
```
| Layer | Lựa chọn | Lý do |
|-------|----------|-------|
| Backend | ... | ... |
| Frontend | ... | ... |
| Database | ... | ... |
| Auth | ... | ... |
| Deploy | ... | ... |
| Monitoring | ... | ... |
```

---

### ⚡ GIAI ĐOẠN 5: PHƯƠNG ÁN TRIỂN KHAI

#### 5.1 Lộ trình theo Phase

```
PHASE 0 — VALIDATION (Tuần 1-2): TRƯỚC KHI CODE
───────────────────────────────────────────────────
Mục tiêu: Validate ý tưởng với chi phí thấp nhất

Hành động:
□ Tạo landing page + form đăng ký
□ Phỏng vấn 10 potential users
□ Xây mockup, test với user thật
□ Quyết định: tiến hành hay pivot?

Kết quả mong muốn: [X] người đăng ký / [Y]% nói sẽ dùng

─────────────────────────────────────────────────────
PHASE 1 — MVP (Tuần 3-6): BẢN TỐI THIỂU
─────────────────────────────────────────────────────
Mục tiêu: Product hoạt động, đủ để user thật dùng

Features:
□ [Feature 1]
□ [Feature 2]
□ [Feature 3]

Milestone: [X] user đầu tiên / [Y] giao dịch đầu tiên

─────────────────────────────────────────────────────
PHASE 2 — GROWTH (Tháng 2-3): MỞ RỘNG
─────────────────────────────────────────────────────
Mục tiêu: Scale user, cải thiện retention

Features:
□ [Feature 4]
□ [Feature 5]
□ Optimization dựa trên feedback

─────────────────────────────────────────────────────
PHASE 3 — SCALE (Tháng 4+): NHÂN RỘNG
─────────────────────────────────────────────────────
Mục tiêu: Tăng trưởng bền vững

□ Thêm kênh acquisition
□ Features nâng cao
□ Team expansion
```

#### 5.2 Resource Plan (Nguồn lực)
```
| Resource | Cần gì | Có sẵn | Gap |
|----------|--------|--------|-----|
| Dev | ... | AI + 1 dev | ... |
| Design | ... | AI | ... |
| Budget | ... | ... | ... |
| Time | ... | ... | ... |
```

---

### 🚨 GIAI ĐOẠN 6: PHÂN TÍCH RỦI RO & TÁC ĐỘNG

#### 6.1 Risk Matrix
```
| Rủi ro | Khả năng xảy ra | Mức độ ảnh hưởng | Cách giảm thiểu |
|--------|----------------|-----------------|-----------------|
| Technical debt | 🟡 Trung bình | 🟡 Trung bình | Code review, audit định kỳ |
| Competitor copy | 🔴 Cao | 🟡 Trung bình | Move fast, lock users |
| Scope creep | 🔴 Cao | 🔴 Cao | Strict /code-by-plan workflow |
| [Rủi ro khác] | ... | ... | ... |
```

#### 6.2 Tác động đến hệ thống hiện tại
```
AI phân tích:

□ Ảnh hưởng đến codebase hiện tại:
  - Cần sửa/mở rộng: [danh sách]
  - Không ảnh hưởng: [danh sách]
  - Có thể break: [danh sách — cần cẩn thận]

□ Ảnh hưởng đến database:
  - Schema mới: [tables/fields]
  - Migration risk: [đánh giá]

□ Ảnh hưởng đến performance:
  - Tải thêm: [ước tính]
  - Cần scale: [khi nào]

□ Ảnh hưởng đến team/quy trình:
  - Workflow mới cần: [...]
  - Training cần: [...]
```

#### 6.3 Dependencies (Phụ thuộc)
```
□ Third-party services cần: [list]
□ APIs bên ngoài: [list] 
□ Điều kiện tiên quyết: [list]
□ Có thể block bởi: [list]
```

---

### 📊 GIAI ĐOẠN 7: MASTER PLAN DOCUMENT

**AI tự động tạo file `/docs/master-plan/[feature-name]-YYYY-MM-DD.md` gồm:**

```markdown
# 🗺️ MASTER PLAN: [Tên dự án/tính năng]
Phiên bản: 1.0 | Ngày: [date] | Tác giả: Mr. Đào

## Executive Summary (Tóm tắt cho CEO - 5 dòng)
[Ý tưởng là gì, tại sao làm, kết quả mong muốn]

## Market Research
[Kết quả nghiên cứu giai đoạn 2]

## Mục tiêu & KPIs  
[Kết quả giai đoạn 3]

## Giải pháp đề xuất
[Kết quả giai đoạn 4]

## Lộ trình triển khai
[Kết quả giai đoạn 5]

## Risk Analysis
[Kết quả giai đoạn 6]

## Decision Log (Quyết định & lý do)
[Ghi lại mỗi quyết định quan trọng + lý do]

## Approval
- [ ] CEO duyệt: _____ | Ngày: _____
```

---

## ✅ CHECKLIST MASTER PLAN TRƯỚC KHI DUYỆT

**AI tự check, bạn review:**

```
□ Đã nghiên cứu giải pháp tương tự chưa?
□ Mục tiêu có SMART không (đo được, có deadline)?
□ MVP có đủ nhỏ để validate nhanh không?
□ Rủi ro kỹ thuật đã được identify?
□ Tác động đến hệ thống hiện tại đã phân tích?
□ Tech stack phù hợp và đã chọn lý do?
□ Resource (thời gian, người, budget) có realistic không?
□ KPI để biết thành công/thất bại đã rõ?
□ Phase 0 validation có trước khi code không?
□ Decision log đã ghi không?
```

---

## RULE MASTER PLAN

1. **Research trước, code sau** — Không bao giờ code khi chưa có Master Plan cho dự án lớn
2. **Phase 0 bắt buộc** — Validate với user thật trước khi invest thời gian code
3. **1 page executive summary** — CEO phải đọc 5 dòng là hiểu
4. **Living document** — Update Master Plan khi có thay đổi lớn
5. **Decision log** — Ghi lại MỌI quyết định quan trọng và lý do
6. **Revisit sau Phase 1** — So sánh thực tế vs kế hoạch, điều chỉnh

---

## FORMAT GỌI WORKFLOW NÀY

```
"Tôi có ý tưởng: [mô tả]
Người dùng mục tiêu: [ai]
Vấn đề giải quyết: [gì]
Lên Master Plan cho tôi"
```

→ AI sẽ tự động đi qua đủ 7 giai đoạn và tạo file Master Plan.
