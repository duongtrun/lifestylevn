---
description: Review code trước khi merge - checklist TypeScript, Security, Performance, Git
---

# 🔎 WORKFLOW: CODE REVIEW TRƯỚC KHI MERGE

## Khi nào dùng?
Trước mỗi lần merge vào `main`/`dev`. Sau khi `/audit-feature` pass, dùng `/code-review` để kiểm tra code quality.

> **Thứ tự đúng:** Code xong → `/audit-feature` (test hành vi) → `/code-review` (kiểm tra code) → Merge

---

## CÁCH GỌI WORKFLOW NÀY

Nói với AI:
```
"/code-review cho [tên feature / file]"
hoặc
"Review code trước khi merge [branch]"
```

AI sẽ tự động chạy toàn bộ 5 nhóm checklist.

---

## 5 NHÓM CHECKLIST

---

### 📘 NHÓM 1: TYPESCRIPT & CODE QUALITY

```
✓ Không có `any` — Dùng type cụ thể hoặc `unknown`
✓ Không có `@ts-ignore` / `@ts-nocheck` không có lý do
✓ Interface/Type được export nếu dùng ở nhiều nơi
✓ Hàm < 50 lines — Nếu dài hơn, phải tách nhỏ
✓ Tên biến/hàm mô tả đúng chức năng (không viết tắt mơ hồ)
✓ Không có dead code (code không được gọi đến)
✓ Không có console.log/debugger còn sót lại
✓ Không có TODO/FIXME chưa giải quyết trong code production
✓ Pure functions cho business logic (không side effects ẩn)
✓ Imports được organize (không import thừa)
```

---

### 🔐 NHÓM 2: SECURITY

```
✓ Không hardcode: URL, API key, password, token, secret
✓ Input validation đầy đủ trước khi xử lý
✓ SQL queries dùng parameterized (không string concatenation)
✓ API endpoints có auth check đúng (JWT verified)
✓ Authorization check: user chỉ xem được data của mình
✓ Sensitive data không xuất hiện trong response/log
✓ File upload có validate type & size
✓ CORS config không quá rộng (không phải *)
✓ Error messages không leak stack trace ra client
✓ Không eval() hoặc innerHTML với dữ liệu từ user
```

---

### ⚡ NHÓM 3: PERFORMANCE

```
Frontend:
✓ Không có N+1 render (useEffect chạy vòng lặp vô tận)
✓ Memo/useMemo/useCallback dùng đúng chỗ (không dùng thừa)
✓ Images có lazy loading
✓ List dài có virtualization (react-virtual / tanstack virtual)
✓ Bundle size không tăng quá nhiều (check với next analyze)

Backend:
✓ Không có N+1 query (dùng JOIN hoặc batch query)
✓ Database indexes đã thêm cho fields hay query
✓ Response pagination cho list APIs (không trả all records)
✓ Caching khi cần (Redis / in-memory)
✓ Async operations không blocking event loop
```

---

### 🧪 NHÓM 4: TESTS & ERROR HANDLING

```
✓ Happy path có test
✓ Error/edge cases có test (null, empty, undefined)
✓ Try/catch đầy đủ — Không có unhandled promise rejection
✓ Error messages rõ ràng, có thể debug được
✓ HTTP status codes đúng (200/201/400/401/403/404/500)
✓ Tất cả tests xanh: npm test / pytest / vitest run
✓ Không test bị skip (describe.skip / test.skip) vô lý
✓ Mock data không hardcode vào production code
```

---

### 📝 NHÓM 5: GIT & COMMIT CONVENTION

```
✓ Branch name đúng convention:
  feat/[feature-name]
  fix/[bug-description]
  chore/[task-name]
  refactor/[what-refactored]

✓ Commit messages đúng Conventional Commits:
  feat: thêm tính năng đăng nhập Google
  fix: sửa lỗi không load ảnh trên iOS
  chore: cập nhật dependencies
  docs: thêm API documentation

✓ Mỗi commit là 1 logical unit (không mix nhiều thứ)
✓ Không commit file không liên quan (.DS_Store, .env, node_modules)
✓ .gitignore đã cover đủ
✓ PR description mô tả rõ: làm gì, tại sao, test thế nào
```

---

## FORMAT BÁO CÁO REVIEW

AI sẽ tạo báo cáo theo mẫu:

```markdown
# 🔎 CODE REVIEW: [Tên feature/branch]
Ngày review: [date] | Reviewer: Antigravity AI
Files reviewed: [danh sách]

## Tóm tắt
- Tổng vấn đề: X
- 🔴 Phải sửa trước merge: X
- 🟡 Nên sửa: X
- 🟢 Gợi ý cải thiện: X
- **Kết luận: ✅ APPROVED / ❌ CẦN SỬA**

---

## 🔴 PHẢI SỬA TRƯỚC MERGE
### [Tên vấn đề]
- File: path/to/file.ts:42
- Vấn đề: [mô tả]
- Cách sửa: [hướng dẫn cụ thể]

## 🟡 NÊN SỬA
...

## 🟢 GỢI Ý
...
```

---

## THANG ĐO KẾT QUẢ

| Kết quả Review | Ý nghĩa | Hành động |
|---|---|---|
| 0 vấn đề đỏ | ✅ Approved | Merge được |
| Chỉ có vàng/xanh | 🟡 Conditional | Fix yellow nếu kịp, rồi merge |
| Có vấn đề đỏ | 🔴 Changes Requested | Fix hết đỏ, review lại |
| Có Security issue | ⛔ Blocked | Dừng tất cả, fix ngay |

---

## RULE CODE REVIEW

1. **Review TRƯỚC merge, không phải sau** — Catch vấn đề sớm, tiết kiệm thời gian sửa
2. **Security = Non-negotiable** — Không merge nếu còn security issue
3. **Không review của chính mình** — AI review, Mr. Đào approve là đủ
4. **Fix trong scope** — Chỉ fix vấn đề trong feature đang review
5. **Lưu báo cáo** — Tất cả review report lưu vào `/docs/reviews/`
