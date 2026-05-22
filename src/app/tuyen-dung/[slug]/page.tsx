import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getJobBySlug, decodeHtmlEntities } from '@/lib/wp-api';
import { MapPin, Coins, Briefcase, CalendarClock, ChevronLeft, Send, CheckCircle2 } from 'lucide-react';
import ApplicationModal from '@/components/careers/ApplicationModal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: 'Không tìm thấy tin tuyển dụng' };
  
  return {
    title: `${decodeHtmlEntities(job.title.rendered.replace('[Tuyển dụng]', '').trim())} | Tuyển dụng IruKa`,
    description: `IruKa Group đang tuyển dụng vị trí ${decodeHtmlEntities(job.title.rendered.replace('[Tuyển dụng]', '').trim())}. Xem ngay để không bỏ lỡ cơ hội!`,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  
  if (!job) {
    notFound();
  }

  // Hàm bỏ hết dấu tiếng Việt để so sánh tên trường cho chắc chắn
  // (WordPress tạo tên trường bị lẫn lộn dấu, ví dụ: "mức_luong", "mo_tả_cong_việc_jd")
  const removeVietnameseDiacritics = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  };

  // Tìm giá trị ACF bằng cách bỏ dấu cả tên trường lẫn từ khóa rồi so sánh
  const findAcfValue = (keyword: string): string => {
    if (!job.acf) return '';
    const acf = job.acf as Record<string, string>;
    const normalizedKeyword = removeVietnameseDiacritics(keyword);
    const key = Object.keys(acf).find(k => removeVietnameseDiacritics(k).includes(normalizedKeyword));
    return key ? (acf[key] || '') : '';
  };

  // Lấy dữ liệu thông tin ngắn từ ACF
  const salary = findAcfValue('luong') || 'Thỏa thuận';
  const location = findAcfValue('diem') || 'TP. Hồ Chí Minh';
  const experience = findAcfValue('nghi') || 'Không yêu cầu';
  const deadline = findAcfValue('nop') || 'Đang mở';

  // Lấy dữ liệu nội dung dài từ các Form ACF
  const jdText = findAcfValue('cong_viec') || '';
  const requirementsText = findAcfValue('ung_vien') || '';
  const benefitsText = findAcfValue('quyen_loi') || '';
  const contactText = findAcfValue('lien_he') || '';
  
  // Nếu có điền form nào thì cờ này bật lên
  const hasAcfContent = jdText || requirementsText || benefitsText || contactText;

  return (
    <main className="min-h-screen bg-neutral-50 pt-28 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link 
          href="/tuyen-dung" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái: Nội dung JD (Chiếm 2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {/* Job Header */}
              <div className="mb-10 pb-8 border-b border-neutral-100">
                <div className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-sm font-semibold rounded-full mb-4">
                  Tuyển dụng HOT
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight mb-6">
                  {decodeHtmlEntities(job.title.rendered.replace('[Tuyển dụng]', '').trim())}
                </h1>
                
                {/* Mobile Badges (Chỉ hiện trên mobile, desktop có cột phải) */}
                <div className="grid grid-cols-2 gap-4 lg:hidden mb-6">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-3 rounded-xl">
                    <Coins className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="font-medium truncate">{salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 p-3 rounded-xl">
                    <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <span className="font-medium truncate">{location}</span>
                  </div>
                </div>
              </div>

              {/* Job Content (HTML từ WordPress hoặc từ Form ACF) */}
              {hasAcfContent ? (
                <div className="prose prose-lg prose-neutral max-w-none 
                  prose-headings:text-neutral-900 prose-headings:font-bold prose-headings:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-700
                  prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-neutral-600 prose-ul:my-4 prose-li:my-1
                  prose-li:marker:text-blue-500">
                  
                  {jdText && (
                    <>
                      <h3>Mô tả công việc</h3>
                      <div dangerouslySetInnerHTML={{ __html: jdText }} />
                    </>
                  )}
                  
                  {requirementsText && (
                    <>
                      <h3>Yêu cầu ứng viên</h3>
                      <div dangerouslySetInnerHTML={{ __html: requirementsText }} />
                    </>
                  )}

                  {benefitsText && (
                    <>
                      <h3>Quyền lợi được hưởng</h3>
                      <div dangerouslySetInnerHTML={{ __html: benefitsText }} />
                    </>
                  )}

                  {contactText && (
                    <>
                      <h3>Thông tin liên hệ</h3>
                      <div dangerouslySetInnerHTML={{ __html: contactText }} />
                    </>
                  )}
                </div>
              ) : (
                <div 
                  className="wp-content prose prose-lg prose-neutral max-w-none 
                  prose-headings:text-neutral-900 prose-headings:font-bold prose-headings:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-700
                  prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-neutral-600 prose-ul:my-4 prose-li:my-1
                  prose-li:marker:text-blue-500"
                  dangerouslySetInnerHTML={{ __html: job.content.rendered }}
                />
              )}
            </div>
          </div>

          {/* Cột phải: Box Thông tin & Apply (Chiếm 1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Box Thông Tin */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-900 mb-6">Tổng quan công việc</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Coins className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-0.5">Mức lương</p>
                      <p className="font-semibold text-neutral-900">{salary}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-0.5">Địa điểm làm việc</p>
                      <p className="font-semibold text-neutral-900">{location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-0.5">Kinh nghiệm</p>
                      <p className="font-semibold text-neutral-900">{experience}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <CalendarClock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-0.5">Hạn nộp hồ sơ</p>
                      <p className="font-semibold text-neutral-900">{deadline}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box Hành động Apply */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20">
                <h3 className="text-xl font-bold mb-2">Sẵn sàng gia nhập?</h3>
                <p className="text-blue-100 text-sm mb-6">Hãy gửi ngay CV (Hồ sơ năng lực) của bạn cho chúng tôi nhé!</p>
                
                <ApplicationModal positionTitle={decodeHtmlEntities(job.title.rendered.replace('[Tuyển dụng]', '').trim())} />
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Phản hồi kết quả trong 3 ngày làm việc</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
