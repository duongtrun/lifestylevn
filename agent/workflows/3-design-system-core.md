# WORKFLOW: ĐỊNH HÌNH KIẾN TRÚC DESIGN SYSTEM & LAYOUT (CHUẨN CTO)

> Slash command: /3-design-system-core
> Mô tả: Quy trình 5 bước định hình toàn bộ kiến trúc Design System, Responsive và Layout
> cho một WebApp - từ màu sắc, cỡ chữ, khoảng cách đến cách tổ chức component.
> Áp dụng khi khởi tạo dự án mới HOẶC tái cơ cấu trúc UI quy mô lớn.

---

## TRIẾT LÝ CÔNG NGHỆ (Philosophy)

Tại các tập đoàn công nghệ lớn (Google, Apple, Meta...), UI không bao giờ được xây
dựng bằng cách gõ mã màu #FF0000 hay cỡ chữ 15px rải rác từng file. Toàn bộ UI được
xây dựng từ một hệ thống biến (Variable System) duy nhất - gọi là Design System.

Nguyên tắc cốt lõi:
- SINGLE SOURCE OF TRUTH: Mọi thông số (màu, chữ, khoảng cách) phải xuất phát từ
  một nơi duy nhất. Đổi ở đó, toàn bộ thay.
- SCALABILITY: Designer đổi màu brand -> Dev chỉ sửa 1 biến -> 1000 component tự đổi.
- MOBILE-FIRST: Viết CSS cho màn nhỏ nhất trước, sau đó ghi đè lên màn lớn.
- NO MAGIC NUMBERS: Cấm tuyệt đối việc gõ cứng kích thước tùy tiện trong component.

Quy trình này chia hệ thống thành 5 TẦNG KẾ THỪA. KHÔNG AI được code Màn Hình (Tầng 5)
khi chưa chốt xong Tokens (Tầng 1).

---

## BƯỚC 1 - ĐỌC HIỂU YÊU CẦU

Trước khi bắt đầu bất kỳ tầng nào, AI phải xác định:
- [ ] Dự án đang sử dụng framework gì? (Next.js, Vite, React thường?)
- [ ] CSS framework là gì? (Tailwind v4, v3, CSS thường?)
- [ ] Đã có file thiết kế Figma chưa? Cung cấp link để hút màu chính xác.
- [ ] Màu Brand chính thức là gì? (xanh, tím, cam...)
- [ ] Font chữ có yêu cầu riêng không? Nếu không có, dùng Inter (Google Fonts).
- [ ] Ứng dụng này dành cho ai? (Trẻ em -> chữ to, màu rực; Doanh nghiệp -> trang nhã)

---

## TẦNG 1: DESIGN TOKENS (NGUỒN CHÂN LÝ)

File cần sửa/tạo: src/styles/global.css hoặc tailwind.config.ts

### 1.1. Bộ Màu (Color Tokens)

Không đặt tên theo thị giác. Đặt tên theo NGỮ NGHĨA:

BRAND COLORS (Màu chính của công ty, thay đổi theo Figma):
  --color-brand-50:  (Nền sáng nhất - dùng làm nền phía sau)
  --color-brand-100: (Hover nhẹ - badge, tag)
  --color-brand-300: (Trạng thái trung gian)
  --color-brand-500: (MÀU CHÍNH - nút bấm, link, icon active)
  --color-brand-600: (Hover của nút chính)
  --color-brand-700: (Active/Pressed - khi bấm giữ)
  --color-brand-900: (Chữ trên nền sáng, trạng thái đậm nhất)

NEUTRAL COLORS (Xám - dùng cho khung, viền, chữ):
  --color-gray-50:  (Nền ngoài của trang)
  --color-gray-100: (Nền card, panel)
  --color-gray-200: (Đường kẻ, khung viền input)
  --color-gray-400: (Placeholder text)
  --color-gray-500: (Chữ mờ, ghi chú)
  --color-gray-700: (Chữ phụ)
  --color-gray-900: (Chữ chính, đậm nhất)

SEMANTIC COLORS (Màu có ý nghĩa - KHÔNG dùng brand color thay thế):
  --color-success: xanh lá    (Thành công, OK, Checkmark)
  --color-warning: vàng/cam   (Cảnh báo, cần chú ý)
  --color-error:   đỏ         (Lỗi, thất bại, xóa)
  --color-info:    xanh lam   (Thông tin, ghi chú)

SURFACE COLORS (Nền và đường kẻ):
  --color-bg:      Nền ngoài trang (thường là gray-50)
  --color-surface: Nền card/panel (thường là trắng)
  --color-border:  Đường kẻ (thường là gray-200)

### 1.2. Hệ Thống Chữ (Typography Scale)

Font Family (theo độ ưu tiên):
  --font-sans: 'Inter', 'SN Pro', system-ui, sans-serif
  --font-mono: 'JetBrains Mono', monospace  (chỉ dùng cho code)

Cỡ chữ (7 bậc - KHÔNG được dùng số khác):
  --text-xs:   12px  (Caption, nhãn phụ, ghi chú nhỏ)
  --text-sm:   14px  (Chữ phụ trợ, helper text)
  --text-base: 16px  (Body chuẩn - KHÔNG để nhỏ hơn trên mobile, iOS sẽ tự zoom)
  --text-lg:   18px  (Body lớn, sub-heading nhỏ)
  --text-xl:   20px  (Sub-heading)
  --text-2xl:  24px  (Heading màn hình)
  --text-3xl:  30px  (Display / Hero title)

Font Weight (4 bậc):
  --font-normal:   400  (Văn bản thường)
  --font-medium:   500  (Nhãn, button text)
  --font-semibold: 600  (Tiêu đề card, label quan trọng)
  --font-bold:     700  (Heading trang, số liệu nổi bật)

Line Height:
  --leading-tight:  1.25  (Heading - ngắn gọn)
  --leading-normal: 1.5   (Body - đủ để đọc)
  --leading-loose:  1.75  (Đoạn văn dài - báo, blog)

### 1.3. Hệ Thống Khoảng Cách (Spacing - Lưới 4-Point)

QUY TẮC CỨNG: Mọi giá trị margin/padding/gap PHẢI là bội số của 4px.
Nghĩa là: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px. KHÔNG có 15px, 17px, 22px.

Bảng giá trị chuẩn:
  --space-1:  4px   (Khoảng cách sát, nhãn icon)
  --space-2:  8px   (Khoảng cách giữa icon và chữ)
  --space-3:  12px  (Padding trong nhãn nhỏ)
  --space-4:  16px  (PADDING GỐC - padding trang mobile, khoảng cách dòng)
  --space-5:  20px
  --space-6:  24px  (Khoảng cách giữa section nhỏ)
  --space-8:  32px  (Khoảng cách giữa card)
  --space-10: 40px
  --space-12: 48px  (Khoảng cách giữa section lớn)
  --space-16: 64px  (Khoảng cách hệ thống macro)

### 1.4. Bo Góc & Bóng Đổ (Shape Tokens)

Border Radius (Bo góc):
  --radius-sm:   6px    (Input, Tag nhỏ, Badge)
  --radius-md:   12px   (Card, Dialog, Dropdown)
  --radius-lg:   20px   (Panel lớn, Bottom Sheet)
  --radius-xl:   28px   (Modal, Drawer)
  --radius-full: 9999px (Pill button, Avatar tròn)

Box Shadow (Bóng đổ - từ ít đến nhiều):
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.08)          (Card phẳng)
  --shadow-md:    0 4px 20px rgba(0,0,0,0.06)         (Card nổi)
  --shadow-lg:    0 8px 40px rgba(0,0,0,0.08)         (Modal dialog)
  --shadow-brand: 0 4px 16px rgba(BRAND_COLOR,0.28)   (Nút chính có glow)

---

## TẦNG 2: BREAKPOINTS (ĐIỂM GÃY - LUẬT CO GIÃN)

Sử dụng sẵn breakpoint của Tailwind. KHÔNG tự tạo thêm.

  sm:  640px  (Điện thoại ngang / Phablet)
  md:  768px  (Tablet đứng - iPad Mini, Samsung Tab)
  lg:  1024px (Laptop nhỏ, Tablet ngang)
  xl:  1280px (Desktop chuẩn)
  2xl: 1536px (Màn HD, 4K)

QUY TẮC VIẾT CODE (Mobile-First):
  - Không có tiền tố = Áp dụng cho Mobile (nhỏ nhất).
  - Có tiền tố md: = Ghi đè khi màn hình >= 768px.
  - Ví dụ:
      <div class="flex-col md:flex-row text-base md:text-lg lg:text-xl">
    Dịch: "Mặc định xếp dọc, từ iPad xếp ngang, chữ lớn dần theo màn hình."

---

## TẦNG 3: LAYOUT SYSTEM (HỆ THỐNG VỎ BỌC)

QUY TẮC VÀNG: Không bao giờ đổ nội dung thẳng ra màn hình.
Mọi nội dung PHẢI được đựng trong Khung Chứa quy chuẩn.

### 3.1. Container (Thùng giới hạn nội dung)

Chỉ định chiều rộng tối đa để trên màn 4K chữ không bị kéo dài hết màn:
  Mobile  (dưới 768px):  width: 100%, padding-x: 16px
  Tablet  (768px+):      max-width: 720px, căn giữa (mx-auto), padding-x: 24px
  Desktop (1024px+):     max-width: 1120px, căn giữa (mx-auto), padding-x: 32px

### 3.2. Page Layout Wrappers (Vỏ Bọc Cấp Cao)

Mỗi loại trang có 1 vỏ riêng. Dev không tự thiết kế vỏ mới:
  AuthLayout:        Màn chưa đăng nhập (Login, Register, OTP, Quên Mật Khẩu)
                     Mobile: 1 cột, form ở giữa
                     Desktop: 2 cột (50/50) - Tranh/brand trái, Form phải
  OnboardingLayout:  Luồng khảo sát, chào mừng
                     Trắng tinh, full screen, chỉ có logo và progress bar trên
  AppLayout:         Trang nội dung sau đăng nhập
                     Mobile: Bottom Tab Bar
                     Desktop: Sidebar trái + Header trên + Nội dung cuộn giữa
  ChildLayout:       Giao diện dành cho trẻ em
                     Full screen, font to, màu rực rỡ, nhiều hình ảnh

---

## TẦNG 4: ATOMIC COMPONENTS (BỘ LINH KIỆN LẮP RÁP)

Sau khi có Tầng 1, 2, 3, mới bắt đầu xây linh kiện.
Mỗi component chỉ làm 1 việc. Tự dùng Token, tự responsive.

CẤP 1 - ATOMS (Tế bào - nhỏ nhất, không thể chia nhỏ hơn):
  Button     -> Primary / Secondary / Ghost / Destructive
                Mỗi biến thể: Normal, Hover, Active, Disabled, Loading
  Input      -> Default / Focused / Error / Success / Disabled
  Checkbox   -> Unchecked / Checked / Indeterminate / Disabled
  Badge      -> Xanh lá / Vàng / Đỏ / Xám (có size sm và md)
  Avatar     -> Có fallback initial khi không có ảnh, có size (sm, md, lg, xl)
  Separator  -> Đường kẻ ngang đơn giản
  Skeleton   -> Giữ chỗ khi đang tải dữ liệu

CẤP 2 - MOLECULES (Phân tử - gộp atoms lại):
  SearchBox       = Input + Icon search (có debounce)
  FormField       = Label + Input + Helper text + Error message
  PasswordInput   = Input + Nút hiện/ẩn mật khẩu
  OtpInput        = 6 ô Input riêng biệt, tự động focus ô tiếp theo

CẤP 3 - ORGANISMS (Cơ quan - khối phức tạp):
  Header          = Logo + Nav + Avatar/CTA
  BottomTabBar    = 4-5 nút tab cho mobile
  Sidebar         = Nav menu cho desktop
  NotificationItem = Avatar + Nội dung + Thời gian
  LessonCard      = Ảnh + Tiêu đề + Progress + Nút hành động

QUY TẮC THÀNH PHẦN:
  - Component KHÔNG được tự quyết định vị trí của nó (không dùng margin để đẩy ra ngoài).
  - Thằng Cha bọc nó sẽ quyết định tọa độ.
  - Component nhỏ -> bỏ càng ít state càng tốt, nhận prop từ ngoài vào.

---

## TẦNG 5: PAGE ASSEMBLY (LẮP RÁP MÀN HÌNH)

Chỉ đến bước này mới bắt đầu code từng màn hình cụ thể.
Mỗi màn hình = Chọn Layout đúng + Nhồi Organisms vào + Gọi API.

Ví dụ cấu trúc màn đăng nhập:
  LoginPage (page component)
    AuthLayout           <- Vỏ bọc xử lý 2 cột trên Desktop
      LoginForm          <- Organism (bao gồm cả FormField, Button...)
        FormField        <- Molecule
          Input          <- Atom
        Button           <- Atom

---

## CHECKLIST KIÊN ĐỊNH TRƯỚC KHI MERGE CODE (CTO Gate)

Tầng 1 - Tokens:
  [ ] Không có HEX hardcode nào trong component (vd: color: #4A90E2) -> REJECT ngay.
  [ ] Có phải sửa 1 biến là toàn bộ Theme đổi màu không?
  [ ] Có phải sửa 1 biến là toàn bộ khoảng cách đổi theo không?
  [ ] Không có giá trị khoảng cách lẻ (vd: 15px, 22px)?

Tầng 2 - Responsive:
  [ ] Kéo màn hình từ 1400px xuống 375px có bị vỡ layout không?
  [ ] Trên màn 375px (iPhone SE) có bị tràn nội dung ngang không?
  [ ] Trên màn 768px (iPad) có hiển thị đúng layout Tablet không?

Tầng 3 - Layout:
  [ ] Nội dung trên màn 4K có bị kéo dài hết màn không? (Phải có Container giới hạn)
  [ ] Safe Area trên iOS (tai thỏ, thanh điều hướng) đã được xử lý chưa?
  [ ] Padding tối thiểu so với mép màn trên Mobile đạt 16px chưa?

Tầng 4 - Components:
  [ ] Nút bấm trên Mobile có đạt kích thước tay chạm tối thiểu 44x44px không?
  [ ] Mọi trạng thái component (Hover, Disabled, Loading) đã có chưa?
  [ ] Form có hiển thị lỗi rõ ràng khi người dùng gõ sai không?

---

## VÍ DỤ ÁP DỤNG THỰC TẾ (Cho dự án dùng Tailwind v4)

Sử dụng CSS Variables trong globals.css:

  :root {
    --color-brand-500: hsl(214, 84%, 46%);
    --color-gray-900:  hsl(221, 40%, 9%);
    --color-surface:   hsl(0, 0%, 100%);
    --font-sans: 'Inter', system-ui, sans-serif;
    --radius-md: 12px;
    --shadow-md: 0 4px 20px rgba(0,0,0,0.06);
  }

Trong Tailwind v4, khai báo vào @theme inline:

  @theme inline {
    --color-brand-500: hsl(214, 84%, 46%);
    --font-sans: 'Inter', system-ui, sans-serif;
    --radius-md: 12px;
  }

Trong component TSX:

  ĐÚNG: <div className="bg-brand-500 text-gray-900 p-4 rounded-md" />
  KHÔNG ĐÚNG: <div style={{ background: "#1E56A0", padding: "15px" }} />
