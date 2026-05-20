// File này: Component Form Liên hệ
// Vai trò: Hiển thị form gồm Tên, SĐT, Email với giao diện Glassmorphism mờ đục. Có validate dữ liệu đầu vào.
// Dùng khi: Nhúng vào trang /lien-he.

'use client';

import { useTransition, useState } from 'react';
import { submitContactForm } from '@/app/lien-he/actions';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  // Xử lý gửi form bằng Server Action
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    const formData = new FormData(e.currentTarget);
    
    // Gửi dữ liệu qua Server Action để lưu vào WordPress DB
    startTransition(async () => {
      const response = await submitContactForm(null, formData);
      setResult(response);
      
      // Nếu thành công thì reset form
      if (response.success) {
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] backdrop-blur-md">
      {/* Background ánh sáng bên trong để tạo hiệu ứng Glassmorphism đẹp hơn */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-400/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Gửi yêu cầu</h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Chúng tôi luôn sẵn sàng hợp tác cùng phụ huynh, đối tác và nhà đầu tư để kiến tạo nên một hệ sinh thái Mẹ & Bé bền vững, nhân văn và hiện đại.
          </p>
        </div>

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cột Họ và tên */}
            <div className="flex-1 space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-white/90">
                Họ và tên <span className="text-red-400">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:bg-white/30 focus:ring-2 focus:ring-white/50"
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Cột Số điện thoại */}
            <div className="flex-1 space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-white/90">
                Số điện thoại <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:bg-white/30 focus:ring-2 focus:ring-white/50"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          {/* Cột Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/90">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:bg-white/30 focus:ring-2 focus:ring-white/50"
              placeholder="Nhập email của bạn"
            />
          </div>

          {/* Thông báo kết quả gửi form */}
          {result && (
            <div className={`flex items-center gap-2 rounded-lg p-4 text-sm font-medium ${result.success ? 'bg-green-500/20 text-green-100 border border-green-500/30' : 'bg-red-500/20 text-red-100 border border-red-500/30'}`}>
              {result.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span>{result.message}</span>
            </div>
          )}

          {/* Nút gửi */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#008BBD] px-6 py-4 text-white font-semibold shadow-lg transition-all hover:bg-[#007ba8] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <span>Gửi yêu cầu</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
