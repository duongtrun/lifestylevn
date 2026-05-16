---
description: Viết test script tự động cho bất kỳ module nào — chạy node test.js ra báo cáo PASS/FAIL, không cần người, không cần UI
---

# /5-test-auto — Workflow Viết Test Script Tự Động

> Áp dụng cho: Util function, Hook, Form validator, API client wrapper, Format helper, Service module...
> Nguyên tắc: **Không cần khởi động dev server, không cần UI, không cần người** — chỉ cần `node test.js` là ra báo cáo.

---

## 📋 BƯỚC 1 — Xác định phạm vi test

Trước khi viết bất kỳ dòng test nào, trả lời 4 câu hỏi:

| Câu hỏi | Ví dụ |
|---------|-------|
| **Test cái gì?** | Util function / Hook / Form validator / API client / Format helper |
| **Input là gì?** | String, JSON object, HTTP Request, function call |
| **Output kỳ vọng là gì?** | Giá trị trả về, side effect, file được tạo, message được gửi |
| **Không cần test gì?** | UI, Network thật, External API (mock thay thế) |

### Tạo danh sách test cases trước khi code:

```
□ Happy path: Input đúng → Output đúng
□ Edge case: Input rỗng / null / undefined
□ Edge case: Input sai kiểu / sai format
□ Edge case: Giá trị biên (max, min, 0, -1)
□ Error case: Xử lý lỗi đúng không?
```

---

## 🏗️ BƯỚC 2 — Cấu trúc file test chuẩn

### Tên file và vị trí:

```
[project]/
└── tests/
    ├── test.js              ← Entry point chạy tất cả
    ├── [module-1].test.js   ← Test cho từng module
    └── [module-2].test.js
```

### Template file test chuẩn (không cần framework):

```javascript
/**
 * [Tên dự án] — Test Script Tự Động
 * ==============================================
 * Chạy: node tests/test.js
 * Không cần: server, database, token, UI
 * ==============================================
 */

// ── Engine test đơn giản (không cần jest/mocha) ──────────
let passed = 0;
let failed = 0;
const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: '✅ PASS' });
    passed++;
  } catch (e) {
    results.push({ name, status: '❌ FAIL', error: e.message });
    failed++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    results.push({ name, status: '✅ PASS' });
    passed++;
  } catch (e) {
    results.push({ name, status: '❌ FAIL', error: e.message });
    failed++;
  }
}

// ── Hàm assertion ────────────────────────────────────────
function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, label = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertContains(str, substring, label = '') {
  if (!String(str).includes(substring)) {
    throw new Error(`${label}: "${str}" không chứa "${substring}"`);
  }
}

function assertThrows(fn, expectedMsg = '') {
  try { fn(); throw new Error('Expected to throw but did not'); }
  catch (e) {
    if (e.message === 'Expected to throw but did not') throw e;
    if (expectedMsg && !e.message.includes(expectedMsg)) {
      throw new Error(`Expected error "${expectedMsg}", got "${e.message}"`);
    }
  }
}

// ══════════════════════════════════════════════════════════
// [NHÓM TEST — Đặt tên theo module đang test]
// ══════════════════════════════════════════════════════════
// const { functionName } = require('../path/to/module');

// test('Tên test case', () => {
//   const result = functionName(input);
//   assertEqual(result, expected, 'label');
// });

// ── Báo cáo kết quả ─────────────────────────────────────
async function runAll() {
  // Chạy tất cả test groups ở đây...

  // In báo cáo
  const line = '═'.repeat(55);
  console.log('\n' + line);
  console.log('  📊 Test Report — [Tên dự án]');
  console.log(line);
  results.forEach(r => {
    const err = r.error ? ` → ${r.error}` : '';
    console.log(`  ${r.status.padEnd(12)} ${r.name}${err}`);
  });
  console.log('─'.repeat(55));
  const total = passed + failed;
  const rate = total > 0 ? Math.round((passed / total) * 100) : 0;
  console.log(`  ✅ PASS: ${passed}  |  ❌ FAIL: ${failed}  |  Tổng: ${total}  |  Tỷ lệ: ${rate}%`);
  console.log(line + '\n');
  if (failed > 0) process.exit(1);
}

runAll();
```

---

## 🔧 BƯỚC 3 — Xử lý phụ thuộc bên ngoài (Mock)

Khi module cần test có phụ thuộc vào **HTTP API, LocalStorage, SessionStorage, Cookie**... → Dùng mock thay thế.

### Pattern Mock chuẩn:

```javascript
// ── Mock HTTP Client ─────────────────────────────────────
const mockHttp = {
  get: async (url) => ({ status: 200, data: { id: 1, name: 'Test' } }),
  post: async (url, body) => ({ status: 201, data: { ...body, id: 99 } }),
};

// ── Mock LocalStorage ────────────────────────────────────
const mockLocalStorage = {
  _store: {},
  setItem: (key, value) => { mockLocalStorage._store[key] = String(value); },
  getItem: (key) => mockLocalStorage._store[key] || null,
  removeItem: (key) => { delete mockLocalStorage._store[key]; },
  clear: () => { mockLocalStorage._store = {}; },
};

// ── Mock window.fetch ────────────────────────────────────
const mockFetch = (responseData, status = 200) =>
  async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => responseData,
    text: async () => JSON.stringify(responseData),
  });

// ── Mock Next.js useRouter ───────────────────────────────
const mockRouter = {
  _pushed: [],
  push: (url) => { mockRouter._pushed.push(url); },
  replace: (url) => { mockRouter._pushed.push(url); },
  back: () => {},
  pathname: '/',
};
```

### Quy tắc mock:
- ✅ Mock **interface** — không mock **implementation**
- ✅ Mock **trả về đúng shape** data thật
- ❌ Không mock chính module đang test

---

## 📊 BƯỚC 4 — Viết test theo độ ưu tiên

### Thứ tự viết:

```
1. 🔴 Critical — Core logic (tính toán, phân loại, transform)
2. 🟡 High     — Data flow (lưu, đọc, validate)
3. 🟢 Medium   — Helper functions, parsing
4. ⚪ Low      — Format, display (tuỳ chọn)
```

### Ví dụ phân loại cho các loại dự án:

| Loại module FE | 🔴 Critical | 🟡 High |
|---|------------|---------|
| Util / Helper | formatDate, slugify, parseQuery | truncate, debounce, throttle |
| Form Validator | zod schema rules cốt lõi | error message format |
| API Client | base URL prefix, auth header | retry logic, timeout |
| Custom Hook | core return value, side effects | cleanup, edge cases |
| Format/Parse | money, phone, address parse | display variants |

---

## ✅ BƯỚC 5 — Checklist trước khi báo cáo

```
□ Đã test ít nhất 1 Happy Path cho mỗi tính năng?
□ Đã test ít nhất 1 Edge Case cho mỗi tính năng critical?
□ Không có test nào kết nối mạng thật / DB thật / API thật?
□ Chạy `node tests/test.js` không throw crash ngoài dự kiến?
□ FAIL test có thông báo lỗi đủ rõ để biết sửa chỗ nào?
□ File test có comment giải thích mỗi nhóm test làm gì?
□ Thêm test mới không phá test cũ?
```

---

## 🚀 BƯỚC 6 — Chạy và đọc kết quả

```bash
# Chạy toàn bộ test
node tests/test.js

# Chạy 1 module riêng
node tests/classifier.test.js
```

### Đọc báo cáo:

```
═══════════════════════════════════════════════════════
  📊 Test Report — IruKa Bot
═══════════════════════════════════════════════════════
  ✅ PASS      Classifier: "khẩn" → URGENT
  ✅ PASS      Classifier: tin nhắn thường → ACK
  ❌ FAIL      Scheduler: thứ 6 16h → cron đúng → expected "0 16 * * 5", got "0 16 * * 6"
  ✅ PASS      Storage: lưu và đọc lại messages
───────────────────────────────────────────────────────
  ✅ PASS: 3  |  ❌ FAIL: 1  |  Tổng: 4  |  Tỷ lệ: 75%
═══════════════════════════════════════════════════════
```

→ FAIL: đọc thông báo → tìm đúng file/hàm → fix → chạy lại.

---

## 📌 Báo cáo sau khi hoàn thành

```
✅ XONG: Viết test script tự động
📁 File: [project]/tests/test.js
📊 Kết quả: [X]/[Y] PASS | Tỷ lệ: [Z]%
⚠️ FAIL: [Liệt kê tên test nếu có]
🔜 Bước tiếp: Fix FAIL → chạy lại → PASS hết → chạy /5-test-manual để test tay
```
