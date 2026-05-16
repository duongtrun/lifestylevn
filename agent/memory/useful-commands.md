# 📦 Useful Commands & Database Operations

File này lưu trữ các câu lệnh SQL, Terminal hoặc giải thuật quan trọng được sử dụng trong dự án IruKa, giúp tra cứu nhanh và đảm bảo thực thi đúng quy trình.

---

## 🚀 Infrastructure & Backend Startup

### 1. Kết nối Database (SSH Tunnel)

Chạy lệnh này ở bất kỳ terminal nào để chuyển hướng cổng Database từ server về máy local (Port 5432).

```bash
ssh -N -L 5432:127.0.0.1:5432 mrdao.iruka
```

### 2. Khởi chạy Backend Services

Di chuyển vào thư mục backend và thực thi script khởi tạo.

```bash
# Di chuyển vào thư mục (Nếu chưa ở đó)
cd iruka-edu-service/python-backend

# Chạy script khởi động
./start.sh
```

### 3. Server Deploy (SSH)

Lệnh truy cập vào production server để thực hiện deploy các dịch vụ frontend hoặc backend.

```bash
ssh mrdao.iruka
```

---

## 🗄️ Database Operations (PostgreSQL)

### 1. Xóa Game khỏi Database (Bypass Foreign Key constraints)

Quy trình này dùng để xóa triệt để một hoặc nhiều Game khi gặp lỗi ràng buộc khóa ngoại (Foreign Key) giữa các bảng `games`, `game_versions` và `qc_report_logs`.

```sql
BEGIN;

-- 1. DROP 4 FK constraints không có CASCADE (Để tạm thời ngắt liên kết)
ALTER TABLE games DROP CONSTRAINT IF EXISTS games_last_version_id_fkey;
ALTER TABLE games DROP CONSTRAINT IF EXISTS games_live_version_id_fkey;
ALTER TABLE qc_report_logs DROP CONSTRAINT IF EXISTS qc_report_logs_game_version_id_fkey;
ALTER TABLE qc_report_logs DROP CONSTRAINT IF EXISTS qc_report_logs_game_id_fkey;

-- 2. NULL hoá các cột FK trên bảng games để tránh tham chiếu lỗi
UPDATE games
SET last_version_id = NULL, live_version_id = NULL
WHERE game_id IN (
    'com.iruka.kieutung-test-paint-con-bao',
    'com.iruka.dao2',
    'com.iruka.quoc-hung-test-buil',
    'com.iruka.daoa',
    'com.iruka.dao12',
    'com.iruka.dao1234',
    'com.iruka.dao10',
    'com.iruka.dao1-',
    'com.iruka.dao26'
);

-- 3. Xóa dữ liệu trong bảng game_versions
DELETE FROM game_versions
WHERE id IN (
    '3f07622a-e5d9-4441-9036-6826093c6b31',
    '0b1c0f0b-47c6-46c9-aa35-696631577ebd',
    '66475819-4527-4610-8950-1944fb0dc1af',
    'a61b5a16-b480-4727-a9ce-3e19cf06e908',
    '76980cb3-f4c6-4dbc-87bc-ed39d66324d0',
    'f98744fe-a319-4c38-a62c-99b5d8c156cb',
    'b003018e-5a00-44ce-bc78-bc75a98d1026',
    '111e1b56-3098-408d-8ebd-9f9f84f19f16',
    'a3d375c4-449e-45c7-9fb3-63c46b1d054d'
);

-- 4. Xóa dữ liệu trong bảng games
DELETE FROM games
WHERE game_id IN (
    'com.iruka.kieutung-test-paint-con-bao',
    'com.iruka.dao2',
    'com.iruka.quoc-hung-test-buil',
    'com.iruka.daoa',
    'com.iruka.dao12',
    'com.iruka.dao1234',
    'com.iruka.dao10',
    'com.iruka.dao1-',
    'com.iruka.dao26'
);

-- 5. Khôi phục lại các Foreign Key (Restore FKs)
-- Sử dụng NOT VALID cho qc_report_logs để giữ lại các bản ghi mồ côi nếu cần
ALTER TABLE games
    ADD CONSTRAINT games_last_version_id_fkey
    FOREIGN KEY (last_version_id) REFERENCES game_versions(id);

ALTER TABLE games
    ADD CONSTRAINT games_live_version_id_fkey
    FOREIGN KEY (live_version_id) REFERENCES game_versions(id);

ALTER TABLE qc_report_logs
    ADD CONSTRAINT qc_report_logs_game_version_id_fkey
    FOREIGN KEY (game_version_id) REFERENCES game_versions(id)
    NOT VALID;

ALTER TABLE qc_report_logs
    ADD CONSTRAINT qc_report_logs_game_id_fkey
    FOREIGN KEY (game_id) REFERENCES games(id)
    NOT VALID;

-- 6. Kiểm tra lại (Verify)
SELECT 'game_versions_remaining' AS label, COUNT(*) AS cnt FROM game_versions
WHERE id IN (
    '3f07622a-e5d9-4441-9036-6826093c6b31','0b1c0f0b-47c6-46c9-aa35-696631577ebd',
    '66475819-4527-4610-8950-1944fb0dc1af','a61b5a16-b480-4727-a9ce-3e19cf06e908',
    '76980cb3-f4c6-4dbc-87bc-ed39d66324d0','f98744fe-a319-4c38-a62c-99b5d8c156cb',
    'b003018e-5a00-44ce-bc78-bc75a98d1026','111e1b56-3098-408d-8ebd-9f9f84f19f16',
    'a3d375c4-449e-45c7-9fb3-63c46b1d054d'
)
UNION ALL
SELECT 'games_remaining', COUNT(*) FROM games
WHERE game_id IN (
    'com.iruka.kieutung-test-paint-con-bao','com.iruka.dao2','com.iruka.quoc-hung-test-buil',
    'com.iruka.daoa','com.iruka.dao12','com.iruka.dao1234','com.iruka.dao10',
    'com.iruka.dao1-','com.iruka.dao26'
);

-- Nếu cnt = 0 cho cả 2 dòng trên -> Thực thi COMMIT
COMMIT;
-- Nếu có lỗi -> ROLLBACK;
```

---

## 🦀 IrukaClaw (OpenClaw) Startup

Các lệnh siêu tốc để khởi chạy tự động hệ sinh thái IrukaClaw (UI + Gateway) ở dưới nền (background) cực kỳ tiện lợi nhờ IruKa Aliases.

### 1. Khởi chạy IrukaClaw (Tự động Build UI & Bật Gateway)

Bất kể bạn đang đứng ở thư mục nào trong Terminal, chỉ cần gõ:

```bash
start-claw
```

Lệnh này sẽ:
1. Nhảy vào thư mục `irukaclaw`
2. Tự động Build UI (`pnpm run ui:build`)
3. Chạy Server dưới nền (Port `18789`)
4. In ra đường link:
   - **Dashboard**: `http://127.0.0.1:18789/`
   - **Chat**: `http://127.0.0.1:18789/chat?session=main`

> 💡 *Terminal sẽ rảnh tay để bạn làm việc khác mà không bị treo!*

### 2. Dừng IrukaClaw (Stop)

Nếu muốn thoát/tắt hoàn toàn tiến trình ngầm của OpenClaw nhằm giải phóng bộ nhớ, chỉ cần gõ lệnh:

```bash
stop-claw
```

---

## 🤖 API & Bot Tokens

Lưu trữ các Token quan trọng dùng trong quá trình test và dev.

### Discord

- **Discord Bot (iMac Home):** `MTQ4NTY2NDQxNjU2ODcwOTE2MQ.GPLvxg.I2NSDkkpizHk4YnYH2Urp_TzHKtDzOYopBhbhA`

---

## 📦 Phát hành & Cài đặt Game SDK (Local Verdaccio)

Quy trình tự động hóa để build SDK nội bộ và đẩy lên thư viện lập trình viên giả lập trên máy tính cá nhân (Verdaccio). 

### 1. Khởi động Thư viện Local (Verdaccio)

Nếu thư viện chưa bật, cần khởi động nó thông qua Docker:

```bash
cd /Users/user/Desktop/work-space/cong-nghe/game-sdk/_verdaccio_host_local
docker-compose up -d
```
*Truy cập giao diện thư viện tại: `http://localhost:4873`*

### 2. Thiết lập Đăng nhập (Chỉ làm 1 lần đầu)

Đứng tại thư mục `game-sdk`, chạy lệnh sau để tự động đăng nhập npm/pnpm vào Verdaccio:

```bash
cd /Users/user/Desktop/work-space/cong-nghe/game-sdk
./scripts/setup-local-registry.sh
```

### 3. Build & Phát hành SDK lên Local

Chỉ cần chạy lệnh sau, Tool sẽ tự động Tăng phiên bản (version bump), Build code TypeScript, và đẩy lên `http://localhost:4873`:

```bash
cd /Users/user/Desktop/work-space/cong-nghe/game-sdk
./scripts/release-local.sh -p library/iruka-core-sdk --local
```
- `-p library/iruka-core-sdk`: Chỉ định folder SDK cần build.
- `--local`: Ra lệnh cho bot đẩy vào localhost và BỎ QUA tạo commit/tag trên Git.

### 4. Tải về & Cài đặt vào các Game (hoặc App) khác

Sau khi SDK lên thư viện, ở bất kỳ dự án nào ngoài monorepo muốn tải về bản mới nhất vừa build, chạy:

**Dùng pnpm:**
```bash
pnpm add @iruka-edu/mini-game-sdk@latest --registry http://localhost:4873
```
**Dùng npm:**
```bash
npm install @iruka-edu/mini-game-sdk@latest --registry http://localhost:4873
```

---

## 🤖 Discord Bot — discord-bot/

### Quét đồng bộ hóa toàn bộ Role (Discord Role Sync)

Lệnh dùng để quét toàn bộ dữ liệu từ `members.json` và đồng bộ hóa cấp Role (phòng ban) hàng loạt lên server Discord. Dùng 1 lần duy nhất khi khối lượng nhân viên chưa có Role nhiều hoặc khi đổi cấu trúc phân quyền lớn.

```bash
node scripts/sync-roles.js
```

### Restart bot đúng cách (tránh 2 instance chạy song song)

> ⚠️ KHÔNG dùng `pkill` đơn thuần rồi start ngay — process cũ chưa kịp chết sẽ gây 2 bot cùng chạy → mỗi tin nhắn bị nhân đôi.

```bash
# Bước 1: Kill TRIỆT ĐỂ tất cả process bot cũ
kill -9 $(lsof -ti :18790) 2>/dev/null; pkill -9 -f "node bot.js"

# Bước 2: Đợi 2 giây rồi mới start lại
sleep 2 && npm run dev
```

**Nguyên nhân lỗi 2 tin nhắn:** Mỗi Discord event (tin nhắn nhân viên) bị cả 2 instance xử lý → gửi 2 reply về CEO.

### Kiểm tra process bot đang chạy

```bash
lsof -i :18790,18791,18792 | grep node
```

### Port mặc định

| Port | Dùng cho |
|------|----------|
| `18790` | MCP API HTTP server (Antigravity ↔ Bot) |
| `18792` | MCP fallback port |

### Quản lý LaunchAgent (chạy ngầm khi mở máy)

> Bot được cài LaunchAgent tại `~/Library/LaunchAgents/com.iruka.discordbot.plist`  
> Bot là **dịch vụ nền macOS** — giống Windows Service. Mỗi khi bị `kill`, macOS tự restart lại → **KHÔNG dùng `pkill` đơn thuần để tắt hẳn**, phải dùng `launchctl`.

#### ⚡ Tắt / Bật nhanh (cách đơn giản nhất)

```bash
# 🔴 TẮT bot local hoàn toàn (dừng + ngăn tự khởi động lại)
launchctl unload ~/Library/LaunchAgents/com.iruka.discordbot.plist

# 🟢 BẬT lại bot local
launchctl load ~/Library/LaunchAgents/com.iruka.discordbot.plist

# ✅ Kiểm tra đã tắt chưa (ra trống = tắt thành công)
ps aux | grep -E "nodemon|bot\.js" | grep -v grep
```

#### 🔧 Cách nâng cao (macOS Ventura+)

> Từ macOS Ventura trở lên, dùng `bootstrap`/`bootout` thay cho `load`/`unload`.

```bash
# Bật LaunchAgent (kích hoạt bot chạy ngầm, tự khởi động khi mở máy)
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.iruka.discordbot.plist

# Tắt LaunchAgent (dừng bot + hủy tự khởi động)
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.iruka.discordbot.plist

# Kiểm tra trạng thái service (có PID = đang chạy, "-" = đã tắt)
launchctl list | grep iruka

# Xem log bot real-time
tail -f ~/Library/Logs/iruka-discord-bot/bot.log

# Xem log lỗi real-time
tail -f ~/Library/Logs/iruka-discord-bot/bot-error.log

# Test crash recovery: kill bot thủ công, sau 10s LaunchAgent tự bật lại
kill -9 $(pgrep -f "node.*bot\.js") && echo "Đã kill — chờ 10s để LaunchAgent hồi sinh..."
sleep 10 && pgrep -af "node.*bot\.js" && echo "✅ Bot đã tự hồi sinh"
```

**Vị trí file:**
| File | Đường dẫn |
|------|-----------|
| LaunchAgent plist | `~/Library/LaunchAgents/com.iruka.discordbot.plist` |
| Log bình thường | `~/Library/Logs/iruka-discord-bot/bot.log` |
| Log lỗi | `~/Library/Logs/iruka-discord-bot/bot-error.log` |

### Cơ chế xử lý rủi ro & Edge Cases của LaunchAgent

Hệ thống LaunchAgent của Discord bot đã được tính toán kỹ để chạy cực kỳ "lì lợm":
- **Kháng Crash (Crash Recovery)**: Cấu hình `KeepAlive SuccessfulExit=false` và `ThrottleInterval = 10`. Nếu bot chết do lỗi logic hoặc mất kết nối, macOS sẽ tự động gọi hồi sinh nó sau 10 giây, tránh vòng lặp khởi động liên tục gây ngốn CPU.
- **Kháng mất mạng (Network Delay)**: Khi mở máy, nếu wifi/LAN chưa kết nối liền, bot lỗi đăng nhập sẽ crash. Sau 10s LaunchAgent kéo dậy, quá trình lặp lại đến khi mạng thông.
- **Kháng lỗi môi trường (Environment)**: 
    - Lệnh gọi chạy được ghim cứng là `/opt/homebrew/bin/node` nên không bao giờ sợ lỗi mất biến môi trường `PATH`.
    - `WorkingDirectory` cũng trỏ thẳng và cứng vào thư mục root của dự án, đảm bảo thư viện `dotenv` luôn bắt trúng file `.env`.
- **Tự động cập nhật code (Hot-reload)**: Lệnh startup sử dụng cờ `/opt/homebrew/bin/node --watch bot.js`. Bất kỳ khi nào nhấn `Ctrl+S` sửa file JS thì bot sẽ tự động lập tức khởi động lại mà không cần phải gọi lệnh LaunchAgent reload bằng tay.
- **Single Instance Guard vs `--watch`**: Cơ chế ngăn ngừa 2 con bot chạy đè (`pgrep -f "node.*bot.js"`) được bổ sung khả năng lọc bỏ ID của chính mình (`process.pid`). Nhờ đó, nó tương thích hoàn toàn 100% với `--watch` (do watch chạy trên cùng 1 process node).

---

## 🎮 Game Build — Nén file để Upload lên Game Hub

### ⚠️ KHÔNG bấm chuột phải "Compress" trên macOS

Nén bằng macOS sẽ tự động nhét **`__MACOSX`** và **`.DS_Store`** vào trong — Game Hub sẽ **từ chối upload**.

### ✅ Nén tự động & Chuẩn xác (Khuyên dùng)

Hệ thống đã được cài đặt lệnh `pack` tự động để lấy version từ `sdk-info.json` và nén sạch các file không cần thiết.

**BƯỚC 1:** (Tùy chọn) Cập nhật version trong file `dist/sdk-info.json`.

**BƯỚC 2:** Chạy lệnh build 
```bash
pnpm run build
```

**BƯỚC 3:** Chạy lệnh đóng gói
```bash
pnpm run pack
```

Lệnh `pnpm run pack` này sẽ tự động:
1. Đọc tên game và version từ `sdk-info.json`.
2. Chạy lệnh zip vô hình bên trong thư mục `dist`.
3. Tẩy chay toàn bộ các rác macOS như `.DS_Store` hay `__MACOSX`.
4. Sinh ra thẳng 1 file nén có tên đính kèm version (VD: `dist/pronounce-v2_v1.0.0.zip`) với dung lượng nhỏ (≈5.4MB).

Anh chỉ cần lấy file `.zip` đó mang lên Game Hub upload là trơn tru 100%.

### 🔎 Kiểm tra file zip bằng tay (Nếu rảnh)

```bash
# Đếm số entry __MACOSX — phải ra 0 mới đúng
zipinfo dist/pronounce-v2_v1.0.0.zip | grep "__MACOSX" | wc -l
```

> ✅ **Upload được** khi `__MACOSX` entries = **0**
## ☁️ Các Gói Đăng Ký AI / Cloud Miễn Phí (IruKa Có Thể Dùng)

> Cập nhật: 2026-04-18 | Nguồn: Tổng hợp từ tài liệu chính thức Google, Anthropic, Vertex AI

---

### 🟢 1. Google AI Studio — Gemini API Key MIỄN PHÍ

- **Link:** [aistudio.google.com](https://aistudio.google.com)
- **Cần thẻ tín dụng:** ❌ Không
- **Nhận được:** API Key gọi Gemini miễn phí (~15 requests/phút)
- **Dùng cho:** Cắm vào `iruka-edu-service`, `discord-bot`, `irukaclaw` để gọi AI
- **Model miễn phí:** Gemini 1.5 Flash, Gemini 1.5 Pro (giới hạn quota)
- **Lưu ý:** Dữ liệu có thể được Google dùng để cải thiện model

```bash
# Lấy API Key tại: https://aistudio.google.com/app/apikey
# Cắm vào .env:
GEMINI_API_KEY=your_api_key_here
```

---

### 🟡 2. Google Cloud Free Trial — $300 Credits (90 ngày)

- **Link:** [console.cloud.google.com](https://console.cloud.google.com)
- **Cần thẻ tín dụng:** ✅ Có (chỉ để xác minh, KHÔNG tự động trừ tiền)
- **Nhận được:** $300 credits dùng trong 90 ngày
- **Dùng cho:** Gọi Vertex AI Gemini API + Deploy Cloud Run + Cloud SQL
- **Lưu ý an toàn:**
  - Google KHÔNG tự động trừ tiền khi hết trial
  - Chỉ bị tính phí nếu tự tay bấm "Upgrade to Paid"
  - Có thể **khóa thẻ trên app ngân hàng** sau khi đăng ký để an tâm tuyệt đối
  - Phí xác minh ~$1 sẽ được hoàn lại sau vài ngày

**Model Vertex AI có thể dùng bằng $300 này:**

| Nhóm | Models |
|---|---|
| Gemini Pro | Gemini 3.1 Pro, Gemini 3 Pro, Gemini 2.5 Pro |
| Gemini Flash | Gemini 3 Flash, Gemini 2.5 Flash, Gemini 2.0 Flash |
| Gemini Flash-Lite | Gemini 3.1 Flash-Lite (rẻ nhất, nhanh nhất) |
| Partner - Claude | Claude Opus 4.7, Claude Sonnet 4.6, Claude Haiku 4.5 |
| Partner - Llama | Llama 4 Maverick, Llama 4 Scout |
| Partner - DeepSeek | DeepSeek V3.2, DeepSeek R1 |
| Tạo ảnh | Imagen 3, Imagen 4 |
| Tạo video | Veo 2, Veo 3 |
| Tạo nhạc | Lyria 2, Lyria 3 |

```python
# Gọi Gemini qua Vertex AI trong iruka-edu-service:
import vertexai
from vertexai.generative_models import GenerativeModel

vertexai.init(project="YOUR_PROJECT_ID", location="asia-southeast1")
model = GenerativeModel("gemini-1.5-flash")  # Rẻ nhất
response = model.generate_content("Nội dung cần xử lý")
```

---

### 🔵 3. Google One AI Premium — 1 tháng miễn phí

- **Link:** [one.google.com/about/ai-premium](https://one.google.com/about/ai-premium)
- **Cần thẻ tín dụng:** ✅ Có (nhớ hủy trước khi hết 1 tháng)
- **Nhận được:** Gemini Advanced (mạnh nhất) + 2TB Google Drive
- **Giá gốc:** ~700.000đ/tháng sau khi hết trial
- **Dùng cho:** Cá nhân dùng Gemini Advanced trong web/app, tích hợp Gmail, Docs

---

### 🚀 4. Google for Startups — Lên tới $350,000 Credits

- **Link:** [cloud.google.com/startup](https://cloud.google.com/startup)
- **Cần thẻ tín dụng:** ❌ Không (dạng grant)
- **Có 2 gói:**

| Gói | Credits | Điều kiện |
|---|---|---|
| **Start** | $2,000 (1 năm) | Chưa nhận funding VC, startup < 5 tuổi |
| **Scale** | $200,000 (2 năm) + $150k AI bonus | Đã nhận Pre-seed → Series A |

- **Checklist Apply Gói Start (IruKa làm được ngay):**
  - [ ] Website irukaedu.com public, có mô tả sản phẩm rõ ràng
  - [ ] Email công ty @irukaedu.com (không dùng @gmail)
  - [ ] Tài khoản Google Cloud tạo bằng email công ty
  - [ ] Tạo Billing Account → lấy Billing ID
  - [ ] Vào cloud.google.com/startup → Apply → Chờ 7-14 ngày

---

### 🤖 5. Anthropic Claude API — $5 Credits Miễn Phí

- **Link:** [console.anthropic.com](https://console.anthropic.com)
- **Cần thẻ tín dụng:** ❌ Không
- **Nhận được:** ~$5 credits để test/prototype Claude API
- **Sau khi hết:** Phải trả phí pay-as-you-go
- **Lưu ý:** Không có free tier vĩnh viễn như Google AI Studio

---

### 💬 6. Claude.ai Chat — Miễn Phí Không Giới Hạn Thời Gian

- **Link:** [claude.ai](https://claude.ai)
- **Cần thẻ tín dụng:** ❌ Không
- **Nhận được:** Chat với Claude 3.5 Sonnet/Haiku
- **Giới hạn:** ~15-40 tin nhắn/5 tiếng (tùy server load)
- **Dùng cho:** Chat tay để hỏi AI, không phải để cắm vào code

---

### 📊 Tổng Hợp Nhanh

| # | Dịch vụ | Cần thẻ | Nhận gì | Tốt nhất cho |
|---|---|---|---|---|
| 1 | Google AI Studio | ❌ | API Key Gemini miễn phí | Dev, cắm vào code ngay |
| 2 | Google Cloud Trial | ✅ (chỉ xác minh) | $300 / 90 ngày | Vertex AI + mọi model |
| 3 | Google One Premium | ✅ (1 tháng) | Gemini Advanced | Dùng cá nhân |
| 4 | Google for Startups Start | ❌ | $2,000 / 1 năm | Deploy app IruKa |
| 5 | Google for Startups Scale | ❌ | $200,000 / 2 năm | Khi có funding |
| 6 | Claude API | ❌ | $5 credits | Test Claude API |
| 7 | Claude.ai Chat | ❌ | Chat unlimited | Hỏi AI thủ công |

---

*Cập nhật lần cuối: 2026-04-18*
---

## 🔗 AG Antigravity — Đồng bộ Config 15 Clone

### Nguyên lý hoạt động
- 15 clone AG (ag-1 → ag-10, ag-oreca, ag-orecateam, ag-ultra, ag-babego, ag-lifestyle) dùng **symlink** trỏ về settings của app gốc
- Sửa settings trong **AG gốc** (`Antigravity.app`) → tất cả clone nhận ngay, không cần làm gì thêm
- Login session của từng AG vẫn **độc lập** (khác account)

### File được share (symlink về app gốc)
| File | Vị trí gốc |
|---|---|
| `settings.json` | `~/Library/Application Support/Antigravity/User/settings.json` |
| `keybindings.json` | `~/Library/Application Support/Antigravity/User/keybindings.json` |
| `snippets/` | `~/Library/Application Support/Antigravity/User/snippets/` |

### Chạy lại sync (khi thêm AG mới hoặc reset)
```bash
bash /Users/user/Desktop/work-space/cong-nghe/antigravity-moi/sync_ag_configs.sh
```

### Kiểm tra symlink đang hoạt động
```bash
for clone in ag-1 ag-2 ag-3 ag-4 ag-5 ag-6 ag-7 ag-8 ag-9 ag-10 ag-oreca ag-orecateam ag-ultra ag-babego ag-lifestyle; do
  target="/Users/user/.gemini/profiles/$clone/User/settings.json"
  [ -L "$target" ] && echo "✅ $clone OK" || echo "❌ $clone BROKEN"
done
```

### Thêm AG mới vào hệ thống
1. Tạo app clone mới (chạy setup script)
2. Thêm tên profile vào mảng `CLONES` trong file `sync_ag_configs.sh`
3. Chạy lại script sync

> ⚠️ **Lưu ý:** Chỉ sửa MCP servers trong **AG gốc** (Antigravity.app) — không sửa trong các clone vì sẽ bị ghi đè khi sync.

---

## 🧪 iruka-app — Debug URL Param (Xem Màn Hình Nhanh Không Cần Luồng Thật)

> **Mục đích:** Tái hiện màn hình cần kiểm tra trong trình duyệt mà **không cần đi qua toàn bộ luồng** (không cần tạo bé, không cần bắt đầu khảo sát, không cần đăng nhập...).  
> **An toàn:** Chỉ kích hoạt khi có param đặc biệt trong URL → user thật không bao giờ thấy.

---

### Quy trình thực hiện (4 bước — ĐẦY ĐỦ & AN TOÀN)

> ⚠️ **Nguyên tắc vàng:** Mọi thay đổi theo pattern này đều KHÔNG ảnh hưởng logic Production.
> Lý do: `isDev = false` ở Production → `previewXxx` luôn = `false` → code chạy y hệt trước khi thêm.

---

**Bước 1 — Khai báo biến debug (BẮT BUỘC có `isDev` guard):**
```tsx
// ── DEBUG ONLY (dev only): ?preview_[tên]=1 → xem UI mà không cần luồng thật
// Chỉ hoạt động ở localhost (NODE_ENV=development) — TẮT HOÀN TOÀN khi deploy Production
// Tại Production: isDev = false → previewLoading = false → code chạy y hệt như cũ
const isDev = process.env.NODE_ENV === 'development';
const previewLoading = isDev && searchParams.get('preview_loading') === '1';
```

**Bước 2 — Bypass guard redirect khi có param:**
```tsx
useEffect(() => {
  if (previewLoading) return; // << debug mode, bỏ qua redirect
  if (!childId) {
    router.replace('/onboarding/create-child');
  }
}, [childId, previewLoading]);
// ✅ An toàn: previewLoading = false ở Production → if bị bỏ qua, chạy như cũ
```

**Bước 3 — Gắn điều kiện vào block màn hình cần preview:**
```tsx
// Thêm || previewLoading vào block hiển thị UI cần xem
if (generating || previewLoading) {
  const childName = currentChild?.full_name ?? 'Tubi'; // fallback tên khi preview
  return ( ... ); // Render màn hình cần xem
}
// ✅ An toàn: previewLoading = false ở Production → || false không thay đổi gì
```

**Bước 4 (QUAN TRỌNG) — Sửa các useEffect/hook phụ thuộc vào cờ `generating`:**

> Nếu màn cần preview có animation/logic nằm trong useEffect kiểm tra `generating`,
> phải thêm `|| previewLoading` vào điều kiện ngắt sớm — để khi preview, animation vẫn chạy.

```tsx
// Ví dụ: fakeProgress animation
useEffect(() => {
  if (!generating && !previewLoading) {  // << Thêm && !previewLoading vào đây
    setFakeProgress(0);
    return;
  }
  // ... phần animation bên dưới giữ nguyên 100%
}, [generating, previewLoading]);
// ✅ An toàn: !previewLoading = !false = true ở Production → !generating && true = !generating (y hệt cũ)
```

**Mở trình duyệt và truy cập URL:**
```
http://localhost:3003/onboarding/survey?subject_id=math&child_id=test&preview_loading=1
```

---

### Bảng tóm tắt: ảnh hưởng ở từng môi trường

| Điều kiện code | Ở Production (`isDev=false`) | Ở Localhost (`isDev=true`, có param) |
|---|---|---|
| `previewLoading` | Luôn = `false` | = `true` |
| `if (previewLoading) return;` | Bị bỏ qua (an toàn) | Kích hoạt → bypass redirect |
| `if (generating \|\| previewLoading)` | = `if (generating)` (y hệt cũ) | Luôn = `true` → Hiện màn hình |
| `if (!generating && !previewLoading)` | = `if (!generating)` (y hệt cũ) | = `false` → Animation chạy |

---

### Quy tắc đặt tên param

| Màn hình cần xem | Param đề xuất |
|---|---|
| Loading / AI đang xử lý | `?preview_loading=1` |
| Màn hình kết quả (Report) | `?preview_report=1` |
| Màn hình lỗi (Error state) | `?preview_error=1` |
| Màn hình trống (Empty state) | `?preview_empty=1` |

**Quy tắc chung:** Luôn bắt đầu bằng `preview_` để dễ phân biệt với param thật.

---

### Dọn dẹp sau khi test xong (nếu muốn clean code)

Tìm và xóa/revert các dòng sau:
```tsx
// 1. Xóa 2 dòng khai báo
const isDev = process.env.NODE_ENV === 'development';
const previewLoading = isDev && searchParams.get('preview_loading') === '1';

// 2. Xóa return trong useEffect redirect
if (previewLoading) return;
// Và xóa previewLoading khỏi array dependency: [childId, previewLoading] → [childId]

// 3. Bỏ || previewLoading trong điều kiện render
if (generating || previewLoading) { → if (generating) {

// 4. Bỏ && !previewLoading trong useEffect animation
if (!generating && !previewLoading) { → if (!generating) {
// Và xóa previewLoading khỏi array dependency: [generating, previewLoading] → [generating]
```

---

### Ví dụ thực tế đã áp dụng

| File | Param | URL test | Ngày |
|---|---|---|---|
| `survey/page.tsx` | `preview_loading=1` | `localhost:3003/onboarding/survey?subject_id=math&child_id=test&preview_loading=1` | 2026-04-18 |
| `snapshot-report/page.tsx` | `preview_snapshot=1` | `localhost:3003/onboarding/snapshot-report?preview_snapshot=1&child_name=Tubi&subject_id=math` | 2026-04-18 |

---

### 🗣️ Cách anh ra lệnh để em làm tính năng này

Khi anh muốn thêm tính năng xem nhanh một màn hình nào đó, chỉ cần nói theo 1 trong các cách sau:

| Câu lệnh của anh | Em sẽ làm gì |
|---|---|
| `"Thêm debug preview cho màn hình [tên]"` | Thêm đủ 4 bước theo pattern trên |
| `"Tôi muốn xem nhanh màn hình [tên] mà không cần đi qua luồng"` | Phân tích luồng → Thêm debug param phù hợp |
| `"Tạo preview URL cho màn [tên]"` | Thêm code + trả về URL test ngay |
| `"Bỏ cái debug preview đi, không cần nữa"` | Xoá sạch theo đúng checklist Dọn dẹp bên trên |

**⚠️ Em LUÔN dùng `isDev && ...` cho mọi debug param. Không bao giờ để lọt ra Production.**

---

## ☁️ Google Cloud Platform (GCP) — Tài khoản & API Key

> **Ngày ghi:** 2026-04-18 | Nguồn: Phiên làm việc thực tế với Mr. Đào

---

### 1. Cách lấy $300 Tín dụng Miễn phí từ Google Cloud

**Quá trình thực tế đã làm:**

Mr. Đào có tài khoản `lifestylead.vn` chưa từng kích hoạt GCP. Trong phiên này, dùng ảnh chụp màn hình để hướng dẫn từng bước qua GCP Console.

**Quy trình đúng (từng bước):**

```
1. Truy cập: https://cloud.google.com/free
2. Bấm "Get started for free"
3. Đăng nhập tài khoản Google cần kích hoạt
4. Chọn quốc gia: Vietnam → Đồng ý điều khoản
5. Bước thanh toán:
   - Chọn loại tài khoản: "Individual" (cá nhân)
   - Điền thông tin thẻ VISA CREDIT (❌ Debit không được)
   - Google chỉ charge $1 tạm thời để xác thực, hoàn lại ngay
6. Nhận $300 tín dụng, hiệu lực 90 ngày
```

**⚠️ Lưu ý quan trọng:**
- Mỗi tài khoản Google **chỉ nhận $300 một lần duy nhất**
- `orecacrazy@gmail.com` và `lifestylead.vn` là **2 ví tiền độc lập**
- Tài khoản `orecacrazy` đang là **Paid Account** (~80-90k VNĐ/tháng cho IP Public)
- Tài khoản `lifestylead.vn` có $300 (tài khoản mới kích hoạt)
- Sau 90 ngày hoặc hết $300: Google hỏi lại, **KHÔNG tự trừ tiền thẻ**
- VM e2-micro (RAM 1GB, 30GB SSD) vẫn nằm trong **Always Free Tier** → không trừ $300

---

### 2. Tạo Google API Key để dùng cho các dịch vụ

**Truy cập:**
```
https://console.cloud.google.com
→ APIs & Services
→ Credentials
→ + Create Credentials
→ API Key
```

**Enable API cần dùng:**
```
APIs & Services → Library → tìm tên API → Enable
```

**Các API thường dùng trong IruKa:**

| API | Dùng cho | Có trừ $300? |
|---|---|---|
| Generative Language API (Gemini) | AI chat, tóm tắt báo cáo bot | Có free quota: 15 req/phút |
| Google Sheets API v4 | Đẩy báo cáo lên Sheet tự động | ❌ Miễn phí |
| Google Calendar API | Lịch họp, nhắc nhở | ❌ Miễn phí |

---

### 3. Cắm API Key vào Discord Bot

**Bước 1 — Thêm vào `.env` trên GCP Server:**
```bash
ssh -i ~/.ssh/iruka_gcp orecacrazy@34.28.61.240
nano ~/discord-bot/.env
# Thêm dòng:
GOOGLE_API_KEY=AIzaSy...your_key_here
```

**Bước 2 — Restart bot để load env mới:**
```bash
pm2 restart iruka-discord-bot
```

**Bước 3 — Dùng trong code bot (ví dụ Gemini AI):**
```javascript
// services/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function ask(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}
module.exports = { ask };
```

**Install package:**
```bash
cd ~/discord-bot && npm install @google/generative-ai
```

---

### 4. Thông tin tài khoản GCP IruKa (2026-04-18)

| Thông tin | Giá trị |
|---|---|
| IP Server Production | `34.28.61.240` |
| Username SSH | `orecacrazy` |
| SSH Key (máy nhà) | `~/.ssh/iruka_gcp` |
| Thư mục Bot | `/home/orecacrazy/discord-bot` |
| Lệnh restart bot | `pm2 restart iruka-discord-bot` |
| Tài khoản có $300 | `lifestylead.vn` |
| Tài khoản chạy Bot | `orecacrazy@gmail.com` (Paid, ~80k/tháng) |

---

---

## 🤖 LiteLLM Proxy — Quản Lý API Key AI cho Cả Team

> **Mục tiêu:** Từ 1 API Key gốc (Gemini, Claude, GPT...) → Tạo nhiều Virtual Key cấp cho anh em → Thống kê được số token từng người dùng.
> **Cập nhật:** 2026-04-21 | Nguồn: Nghiên cứu thực tế + cộng đồng LiteLLM GitHub

---

### LiteLLM là gì?

LiteLLM là "trạm trung chuyển AI" (LLM Gateway) mã nguồn mở lớn nhất hiện nay (~14k sao GitHub). Sếp cắm 1 API Key gốc vào, nó cho sếp tạo ra nhiều "Virtual Key" con để phân phát cho anh em. Mỗi Virtual Key có thể cài giới hạn ngân sách riêng, và sếp xem được bảng thống kê token từng người trên Dashboard.

**Link GitHub:** [github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)
**Stars:** ~14,000+ (Lớn nhất trong loại)
**Ngôn ngữ:** Python | **License:** MIT (Miễn phí hoàn toàn)

---

### Điểm Mạnh & Điểm Yếu so với đối thủ (2026)

| | LiteLLM | Bifrost | Portkey/Helicone |
|---|---|---|---|
| Hỗ trợ nhà CC AI | 100+ (nhiều nhất) | 15+ | 100+ |
| Virtual Key + Budget Limit | ✅ Hoàn hảo | ⚠️ Đang phát triển | ✅ Nhưng SaaS (tính phí) |
| Dashboard thống kê token | ✅ Có | ❌ Chưa có | ✅ Nhưng SaaS |
| Tốc độ | Khá (đủ dùng) | Cực nhanh (50x hơn LiteLLM) | Phụ thuộc mạng SaaS |
| Tự host (data không ra ngoài) | ✅ Docker | ✅ Docker/Go | ❌ Data đi qua server họ |
| Chi phí | **$0 (Open Source)** | **$0** | Free tier giới hạn |

**➡️ Kết luận:** LiteLLM là lựa chọn tốt nhất cho IruKa vì cần Virtual Key + Budget + Dashboard, tự host trên Oracle Free VM, và budget $0.

---

### Kiến trúc hoạt động (Dễ hiểu)

```
[Anh em Dev]
   └─► Gọi API bằng Virtual Key con (vk-xxx)
           ↓
     [LiteLLM Proxy] ← Chạy trên Oracle VM (Free)
       • Kiểm tra Virtual Key hợp lệ không?
       • Đếm token, ghi vào PostgreSQL
       • Kiểm tra có vượt budget không?
           ↓
     [API Key Gốc]
       • Gemini (lifestylead.vn)
       • Claude (Vertex AI)
       • Groq, OpenAI...
           ↓
     [AI trả kết quả về cho Dev]

[Sếp] ← Vào Dashboard xem thống kê từng người
```

---

### Cài đặt nhanh trên Oracle Free VM (Docker)

**Bước 1 — SSH vào máy Oracle:**
```bash
ssh ubuntu@<oracle-vm-ip>
```

**Bước 2 — Tạo file config:**
```yaml
# litellm_config.yaml
model_list:
  - model_name: gemini-flash       # Tên nội bộ sếp đặt
    litellm_params:
      model: gemini/gemini-2.0-flash
      api_key: os.environ/GEMINI_API_KEY   # Lấy từ .env

  - model_name: claude-sonnet
    litellm_params:
      model: vertex_ai/claude-sonnet@20241022
      vertex_project: "your-project-id"

litellm_settings:
  success_callback: ["langfuse"]   # Ghi log (tùy chọn)

general_settings:
  master_key: sk-iruka-master-2026  # Key của sếp (giữ bí mật)
  database_url: "postgresql://user:pass@localhost:5432/litellm"
```

**Bước 3 — Chạy bằng Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'
services:
  litellm:
    image: ghcr.io/berriai/litellm:main-stable
    ports:
      - "4000:4000"
    volumes:
      - ./litellm_config.yaml:/app/config.yaml
    environment:
      GEMINI_API_KEY: "AIza..."      # Key gốc của sếp
      DATABASE_URL: "postgresql://..."
    command: --config /app/config.yaml --port 4000

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: litellm
      POSTGRES_USER: litellm_user
      POSTGRES_PASSWORD: mat_khau_manh
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

```bash
# Khởi chạy
docker-compose up -d

# Kiểm tra đang chạy
curl http://localhost:4000/health
```

---

### Quản lý Virtual Key cho từng người

```bash
# Truy cập Dashboard UI
http://<oracle-vm-ip>:4000/ui

# Hoặc dùng API để tạo Virtual Key
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer sk-iruka-master-2026" \
  -H "Content-Type: application/json" \
  -d '{
    "key_alias": "key-cho-backend-team",   # Tên dễ nhớ
    "max_budget": 5,                        # Giới hạn $5/tháng
    "budget_duration": "30d",              # Reset mỗi 30 ngày
    "models": ["gemini-flash", "claude-sonnet"],  # Chỉ được dùng model nào
    "metadata": {"team": "backend", "user": "Hoang"}
  }'

# Response trả về:
# { "key": "sk-vk-Hoang-xxxx", ... } → Gửi key này cho Hoàng xài
```

---

### Anh em Dev dùng Virtual Key như thế nào?

Anh em **không cần biết** API Key gốc là gì. Họ chỉ cần thay URL và dùng Virtual Key là xong:

```python
# Python (iruka-edu-service)
import openai

client = openai.OpenAI(
    api_key="sk-vk-Hoang-xxxx",           # Virtual Key của từng người
    base_url="http://<oracle-ip>:4000"     # Trỏ vào LiteLLM thay vì Google
)

response = client.chat.completions.create(
    model="gemini-flash",
    messages=[{"role": "user", "content": "Xin chào!"}]
)
```

```javascript
// Node.js (discord-bot)
import OpenAI from 'openai';

const ai = new OpenAI({
  apiKey: 'sk-vk-Bot-xxxx',
  baseURL: 'http://<oracle-ip>:4000'
});
```

> ✅ Code anh em không cần thay đổi gì nhiều! Chỉ đổi `apiKey` và `baseURL` là xong.

---

### Xem thống kê trên Dashboard

Sau khi chạy, sếp vào địa chỉ:
```
http://<oracle-vm-ip>:4000/ui
```

Dashboard cho sếp thấy:
- Số Token từng Virtual Key đã dùng
- Chi phí quy đổi ra USD
- Ai đang vượt ngưỡng budget
- Lịch sử request (nếu bật log)

---

### So sánh nhanh với giải pháp SaaS (Portkey/Helicone)

| Tiêu chí | LiteLLM (Self-host) | Portkey/Helicone (SaaS) |
|---|---|---|
| Chi phí | **$0** | Free: 10k-100k req/tháng, sau đó tính phí |
| Data privacy | ✅ Data ở máy mình | ❌ Data qua server của họ |
| Setup | Cần cài Docker (~30 phút) | Chỉ đăng ký web (5 phút) |
| Phù hợp với | Team >3 người, data nhạy cảm | Prototype nhanh, test thử |

---

### Lộ trình triển khai cho IruKa

```
Tuần này: Dựng Oracle Cloud VM (Always Free, 24GB RAM)
    ↓
Cài Docker + LiteLLM + PostgreSQL lên Oracle VM
    ↓
Tạo Virtual Key cho: Backend Team / Bot Team / Mobile Team
    ↓
Anh em thay base_url trong code → Dùng ngay
    ↓
Sếp vào Dashboard xem thống kê hàng tuần
```

---

*Cập nhật lần cuối: 2026-04-21*

---

## 🎭 iruka-app — Demo Mode & Tài khoản Test

> **Mục đích:** Dùng để test giao diện học sinh (dashboard, bản đồ bài học, session...) mà không cần data thật từ backend.  
> **Cập nhật:** 2026-04-24

### Cách kích hoạt Demo Mode

Thêm `?demo=1` vào cuối URL bất kỳ của app:

```
http://localhost:3003/child/dashboard?demo=1
http://localhost:3003/login?demo=1
```

Hoặc đặt trong `.env.local` để bật toàn bộ app (cần restart dev server):

```env
NEXT_PUBLIC_DEMO_MODE=true
```

---

### 📧 Tài khoản Demo (MSW Mock)

| Thông tin | Giá trị |
|---|---|
| **Email** | `demo@iruka.edu.vn` |
| **Password** | Bất kỳ (nhập gì cũng được) |
| **Nhân vật** | Bé Đào — `DEMO_CHILD_ID: 6258ee73-5aa1-4022-a7aa-8b073f492d5f` |
| **Môn học** | Tiếng Việt (`viet_001`) |
| **Nhóm tuổi** | 3-4 tuổi (`age_band: 34`) |
| **Streak** | 5 ngày liên tiếp |
| **Tiến độ** | 19/31 bài (8 mastered 🏆, 8 completed ✅, 3 needs_support ⚠️, 1 in_progress ▶) |

> **Lưu ý:** Khi Demo Mode bật, Console trình duyệt sẽ hiện:  
> `🎭 IruKa Demo Mode ACTIVE`  
> `👤 Email: demo@iruka.edu.vn | Password: (bất kỳ)`

---

### Kiểm tra nhanh sau khi bật Demo Mode

1. Mở DevTools → Console → thấy dòng `🎭 IruKa Demo Mode ACTIVE` → ✅ OK
2. Dashboard hiện Streak 5 ngày, 19/31 bài → ✅ OK
3. Bấm vào bài đang học (bài 19 — Chữ N) → tạo được session giả → ✅ OK

---

*Cập nhật lần cuối: 2026-04-24*

### 🎭 Tài khoản Demo Mode (IruKa App)

Chế độ Demo cho phép hiển thị dữ liệu giả lập (mock data) mà không cần backend.

- **Email:** `demo@iruka.edu.vn`
- **Mật khẩu:** Bất kỳ (Hệ thống sẽ tự bỏ qua khi bật Demo Mode)
- **Tham số URL:** Thêm `?demo=1` vào cuối bất kỳ đường dẫn nào (vd: `http://localhost:3003/child/dashboard?demo=1`)
- **Tác dụng:** Tự động mock Auth token và Child session, cho phép truy cập thẳng vào ứng dụng.

