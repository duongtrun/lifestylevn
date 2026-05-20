// File này: Khu vực tìm kiếm + hiển thị danh sách vị trí tuyển dụng.
// Vai trò: Nhận mảng jobs từ Server Component, cho phép người dùng
//          gõ keyword để lọc nhanh vị trí theo tên, địa điểm, kinh nghiệm.
//          Hiển thị grid các JobCard tương ứng.
// Dùng khi: Được nhúng vào trang /tuyen-dung, bao bọc toàn bộ phần
//           danh sách vị trí đang mở.

'use client';

import { useState, useMemo } from 'react';
import { Search, BriefcaseBusiness, X } from 'lucide-react';
import JobCard from '@/components/careers/JobCard';
import type { WPJob } from '@/lib/wp-api';
import { decodeHtmlEntities } from '@/lib/wp-api';

interface JobSearchSectionProps {
  jobs: WPJob[];
}

/**
 * Bỏ dấu tiếng Việt để so sánh chuỗi không phân biệt dấu.
 * Ví dụ: "Hồ Chí Minh" → "Ho Chi Minh"
 */
function removeVietnameseDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/**
 * Lấy giá trị trường ACF theo keyword (chống lỗi do tên trường có dấu tiếng Việt).
 * Tương tự logic trong JobCard, dùng lại ở đây để lấy địa điểm, kinh nghiệm khi lọc.
 */
function findAcfValue(job: WPJob, keyword: string): string {
  if (!job.acf) return '';
  const acf = job.acf as Record<string, string>;
  const normalizedKeyword = removeVietnameseDiacritics(keyword);
  const key = Object.keys(acf).find((k) =>
    removeVietnameseDiacritics(k).includes(normalizedKeyword)
  );
  return key ? acf[key] || '' : '';
}

export default function JobSearchSection({ jobs }: JobSearchSectionProps) {
  // State lưu từ khóa tìm kiếm người dùng nhập vào ô search
  const [searchQuery, setSearchQuery] = useState('');

  // Lọc danh sách jobs mỗi khi searchQuery thay đổi.
  // So sánh keyword (đã bỏ dấu, lowercase) với:
  //   - Tên vị trí (title)
  //   - Địa điểm (ACF field chứa "diem")
  //   - Kinh nghiệm (ACF field chứa "nghi")
  const filteredJobs = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return jobs;

    // Chuẩn hóa keyword: bỏ dấu + lowercase để tìm không phân biệt
    const normalizedQuery = removeVietnameseDiacritics(trimmed).toLowerCase();

    return jobs.filter((job) => {
      // Chuẩn hóa tên vị trí
      const title = removeVietnameseDiacritics(
        decodeHtmlEntities(job.title.rendered)
      ).toLowerCase();

      // Chuẩn hóa địa điểm
      const location = removeVietnameseDiacritics(
        findAcfValue(job, 'diem')
      ).toLowerCase();

      // Chuẩn hóa kinh nghiệm
      const experience = removeVietnameseDiacritics(
        findAcfValue(job, 'nghi')
      ).toLowerCase();

      // Trùng 1 trong 3 trường thì hiện
      return (
        title.includes(normalizedQuery) ||
        location.includes(normalizedQuery) ||
        experience.includes(normalizedQuery)
      );
    });
  }, [jobs, searchQuery]);

  return (
    <section className="container mx-auto px-4 max-w-6xl pb-24">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* === Header: tiêu đề + số lượng === */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900">
            Vị trí đang mở
          </h2>
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium">
            {filteredJobs.length} vị trí
          </span>
        </div>

        {/* === Ô tìm kiếm ===
            Input có icon kính lúp bên trái, nút X để xóa keyword khi đang có text */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm vị trí theo tên, địa điểm, kinh nghiệm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          {/* Nút X xóa nhanh keyword — chỉ hiện khi đang có text */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* === Danh sách kết quả === */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BriefcaseBusiness className="w-8 h-8 text-neutral-400" />
            </div>
            {searchQuery ? (
              <>
                {/* Khi search không tìm thấy kết quả */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Không tìm thấy vị trí phù hợp
                </h3>
                <p className="text-neutral-500">
                  Thử tìm với từ khóa khác hoặc{' '}
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    xem tất cả vị trí
                  </button>
                </p>
              </>
            ) : (
              <>
                {/* Khi không có vị trí nào (API trả rỗng) */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Hiện chưa có vị trí trống
                </h3>
                <p className="text-neutral-500">
                  Vui lòng quay lại sau hoặc gửi hồ sơ về email tuyển dụng của
                  chúng tôi.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
