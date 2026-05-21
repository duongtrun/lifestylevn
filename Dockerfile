# File này: Cấu hình Docker để đóng gói toàn bộ Frontend Next.js (web-lifestyle) thành 1 image siêu nhẹ (standalone).
# Vai trò: Dùng để chạy thử nghiệm môi trường Production hoặc Deploy lên server thật (VPS, AWS, etc.)
# Dùng khi: Cần build production nghiệm thu cuối cùng hoặc triển khai code.

# --- BƯỚC 1: KHỞI TẠO BASE ---
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Cài đặt phiên bản pnpm 9 ổn định (tránh lỗi tương thích bản mới với Node 20)
RUN npm install -g pnpm@9

# --- BƯỚC 2: CÀI ĐẶT THƯ VIỆN (DEPENDENCIES) ---
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Cài đặt thư viện theo đúng lock file, không thay đổi version
RUN pnpm install --frozen-lockfile

# --- BƯỚC 3: BUILD MÃ NGUỒN (BUILDER) ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Tắt thu thập dữ liệu viễn trắc (telemetry) của Next.js để tăng tốc
ENV NEXT_TELEMETRY_DISABLED 1
# Chạy lệnh build production (đã có output: 'standalone' trong next.config.ts)
RUN pnpm run build

# --- BƯỚC 4: CHẠY PRODUCTION CHÍNH THỨC (RUNNER) ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Tạo user không có quyền root để tăng tính bảo mật (Security best practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy thư mục tĩnh (public) và thư mục standalone từ bước Builder
COPY --from=builder /app/public ./public
# Tự động gán quyền cho user nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Chuyển sang user bảo mật
USER nextjs

# Mở cổng 3005 (khớp với cấu hình dev hiện tại)
EXPOSE 3005
ENV PORT 3005
ENV HOSTNAME "0.0.0.0"

# Lệnh khởi động server khi container chạy
CMD ["node", "server.js"]
