# ⚡ Kaizen Log — IruKa AI Continuous Improvement

> **Kaizen (改善):** Cải tiến liên tục — không phải sửa sai, mà là làm tốt hơn mỗi ngày.
> File này lưu các **Best Practice, Trick hay, Pattern thông minh** được đúc kết qua công việc thực tế.
> Antigravity PHẢI đọc file này trước khi bắt đầu task để kế thừa tinh hoa từ các phiên làm việc trước.

---

## 🎯 Khác biệt Kaizen vs Lessons Learned

| | Lessons Learned | Kaizen |
|---|---|---|
| **Mục tiêu** | Tránh lặp lỗi cũ | Làm tốt hơn chủ động |
| **Câu hỏi** | "Tôi đã sai gì?" | "Tôi có thể làm gọn hơn không?" |
| **Tông điệu** | Phòng thủ | Tấn công / Tiến hóa |
| **Ghi nhận** | Sau khi có lỗi | Sau khi hoàn thành tốt |

---

## 📋 Index

| ID | Tiêu đề | Domain | Ngày | Trạng thái |
|----|---------|--------|------|------------|
| K-01 | Xoá tàn dư HTML/CSS cũ khi nâng cấp lên SDK/Framework mới | Frontend / UI | 2026-04-06 | Active |
| K-02 | Mổ xẻ game mẫu đầu tiên trước khi viết game mới | Game SDK | 2026-04-06 | Active |

---

## 📝 Chi Tiết Kaizen

### [K-01] "Xây mới — Đập cũ" — Pattern nâng cấp SDK/Framework an toàn

- **Ngày:** 2026-04-06
- **Domain:** Frontend / UI (Game SDK)
- **Đúc kết từ task:** Tích hợp DOM Buttons SDK v2 vào `game_pronounce`

**Pattern chuẩn:** Khi chuyển từ UI tĩnh (HTML hardcode) sang UI động (SDK/Framework inject):

```
Bước 1 → Cài API mới (createDOMButtons / Component mới...)
Bước 2 → NGAY LẬP TỨC: grep toàn project tìm tàn dư cũ
          Ví dụ: grep -r "btn-" . --include="*.html" --include="*.css"
Bước 3 → Xóa sạch HTML tag + CSS style cũ
Bước 4 → Verify: chỉ còn 1 nguồn render duy nhất
```

**Lý do quan trọng:** Nếu bỏ qua Bước 2-3, UI sẽ render **double** — xuất hiện cùng lúc 2 nút/component xếp chồng lên nhau gây loạn giao diện.

**Checklist nhanh khi nâng cấp UI:**
- [ ] Grep các class/ID cũ (`btn-`, `ui-btn`, `old-component`)
- [ ] Kiểm tra `index.html`, `*.css`, `style.css`
- [ ] Xác nhận chỉ còn 1 nguồn render duy nhất (SDK hoặc code — chọn 1)

---

### [K-02] "Mổ xẻ - Sao chép - Biến tấu" — Quy trình làm game mới chứng khỏi sai logic

- **Ngày:** 2026-04-06
- **Domain:** Game SDK
- **Đúc kết từ task:** Làm game template `game_pronounce` bị sai logic SDK vì code “mướt” không tham khảo game mẫu chạy được

**Vấn đề cốt lõi:** Khi AI viết một game template mới từ đầu, nó dễ tự đặt ra các cấu trúc hàm, tên biến, thứ tự gọi *khác với chuẩn SDK* — dẫn đến sai logic âm thầm, khó debug sau.

**Pattern chuẩn — BẮt buộc 3 bước trước khi viết game mới:**

```
Bước 1 — MỔ XẺ� (Dissect)
  Tìm game mẫu gần nhất đang chạy đúng (g_trace, o_speak_game, game_drag...)
  Đọc TUẦN TỰ: main.ts → SceneBase.ts → Scene chính
  Liệt kê toàn bộ hàm SDK được gọi và THỨ TỰ gọi chúnh xác

Bước 2 — SAO CHÉP (Clone)
  Copy y chang cấu trúc khủng vần từ game mẫu:
    - cấu hình Phaser (transparent canvas)
    - cách gọi createDOMButtons
    - cách dùng irukaTool.bg.changeBackground
    - thứ tự khởi tạo scene (create → setupSDK → setupUI → startGame)
  CHỈ ĐỔI phần logic game (nội dung game)

Bước 3 — BIẾN TẤU (Customize)
  Sau khi cấu trúc đúng rồi mới đem logic riêng của game mới đặt vào
  Test ngay sau mỗi lớp biến tấu, không viết hết rồi mới test
```

**Game mẫu chuẩn của IruKa để tham khảo (theo độ ưu tiên):**

| Game | Lý do chọn để tham khảo |
|---|---|
| `game_trace` | Chuẩn SDK v2 mới nhất — luôn tham khảo đầu tiên |
| `o_speak_game` | Chuẩn cho game phát âm / ghi âm (VoiceClient) |
| `game_drag` | Chuẩn cho game kéo thả |

**Dấu hiệu bị sị khi đã bỏ qua K-02:**
- Background bị cắt (lẹm 2 bên)
- Double nút render
- Canvas không transparent
- DOM Buttons không hiện
- VoiceClient session bị leak khi thoát game

---

## 📌 Hướng dẫn ghi nhận Kaizen mới

> Kaizen được ghi NGAY KHI phát hiện — không cần đợi cuối ngày.
> AI đề xuất → Anh Đào duyệt → Ghi vào file này.

**Format chuẩn một điểm Kaizen:**

```markdown
### [K-XX] Tên gọi ngắn — mô tả phong cách

- **Ngày:** YYYY-MM-DD
- **Domain:** Lĩnh vực áp dụng
- **Đúc kết từ task:** Mô tả ngắn task gốc

**Pattern chuẩn / Trick hay:**
[Mô tả kỹ thuật/cách làm thông minh hơn]

**Lý do:** [Tại sao cách này tốt hơn cách cũ]
```

---

*Cập nhật lần cuối: 2026-04-06 | Phiên bản: 1.1 | IruKa Kaizen System*
