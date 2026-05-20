import Link from 'next/link';
import { MapPin, Coins, Briefcase, CalendarClock, ChevronRight } from 'lucide-react';
import type { WPJob } from '@/lib/wp-api';
import { decodeHtmlEntities } from '@/lib/wp-api';

interface JobCardProps {
  job: WPJob;
}

export default function JobCard({ job }: JobCardProps) {
  // Hàm bỏ dấu tiếng Việt để so sánh tên trường ACF cho chắc chắn
  const removeVietnameseDiacritics = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  };

  const findAcfValue = (keyword: string): string => {
    if (!job.acf) return '';
    const acf = job.acf as Record<string, string>;
    const normalizedKeyword = removeVietnameseDiacritics(keyword);
    const key = Object.keys(acf).find(k => removeVietnameseDiacritics(k).includes(normalizedKeyword));
    return key ? (acf[key] || '') : '';
  };

  const salary = findAcfValue('luong') || 'Thỏa thuận';
  const location = findAcfValue('diem') || 'TP. Hồ Chí Minh';
  const experience = findAcfValue('nghi') || 'Không yêu cầu';
  const deadline = findAcfValue('nop') || 'Đang mở';

  return (
    <Link 
      href={`/tuyen-dung/${job.slug}`}
      className="group block bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-4">
            Tuyển dụng gấp
          </div>
          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {decodeHtmlEntities(job.title.rendered.replace('[Tuyển dụng]', '').trim())}
          </h3>
        </div>

        {/* Info Badges */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Coins className="w-4 h-4 text-emerald-500" />
            <span className="truncate">{salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <span className="truncate">{experience}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <CalendarClock className="w-4 h-4 text-purple-500" />
            <span className="truncate">Hạn: {deadline}</span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-500 group-hover:text-blue-600 transition-colors">
            Xem chi tiết
          </span>
          <div className="w-8 h-8 rounded-full bg-neutral-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
