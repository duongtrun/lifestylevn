// File này: Component Form Liên hệ
// Vai trò: Hiển thị form gồm Tên, SĐT, Nội dung yêu cầu với giao diện Glassmorphism mờ đục. Có validate dữ liệu đầu vào.
// Dùng khi: Nhúng vào trang /lien-he.

'use client';

import { useTransition, useState } from 'react';
import { submitContactForm } from '@/app/lien-he/actions';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; request?: string }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Hàm validate từng trường dữ liệu cụ thể
  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    if (name === 'fullName') {
      if (!value.trim()) {
        errorMsg = 'Vui lòng nhập họ và tên.';
      } else if (value.length > 50) {
        errorMsg = 'Họ và tên không được vượt quá 50 ký tự.';
      }
    } else if (name === 'phone') {
      if (!value.trim()) {
        errorMsg = 'Vui lòng nhập số điện thoại.';
      } else {
        const phoneRegex = /^(0|(?:\+84)|84)(3|5|7|8|9)\d{8}$/;
        if (!phoneRegex.test(value.trim())) {
          errorMsg = 'Số điện thoại không đúng định dạng Việt Nam (ví dụ: 0906399666).';
        }
      }
    } else if (name === 'request') {
      if (!value.trim()) {
        errorMsg = 'Vui lòng nhập nội dung yêu cầu.';
      } else if (value.trim().length < 20) {
        errorMsg = 'Nội dung yêu cầu phải chứa ít nhất 20 ký tự (hiện có ' + value.trim().length + ' ký tự).';
      }
    }
    return errorMsg;
  };

  // Hàm bắt sự kiện onChange để tracking validation real-time
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Chỉ tracking realtime nếu form đã từng bấm submit hoặc trường đó đang có lỗi
    if (hasSubmitted || errors[name as keyof typeof errors]) {
      const errorMsg = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: errorMsg || undefined
      }));
    }
  };

  // Xử lý gửi form bằng Server Action
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    setHasSubmitted(true); // Đánh dấu đã submit để kích hoạt tracking realtime
    setErrors({});

    const currentTarget = e.currentTarget;
    const formData = new FormData(currentTarget);
    
    const fullName = formData.get('fullName')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const request = formData.get('request')?.toString() || '';

    const newErrors: { fullName?: string; phone?: string; request?: string } = {};

    // Validate Họ và tên
    const fullNameError = validateField('fullName', fullName);
    if (fullNameError) newErrors.fullName = fullNameError;

    // Validate Số điện thoại
    const phoneError = validateField('phone', phone);
    if (phoneError) newErrors.phone = phoneError;

    // Validate Nội dung yêu cầu
    const requestError = validateField('request', request);
    if (requestError) newErrors.request = requestError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Gửi dữ liệu qua Server Action để lưu vào WordPress DB
    startTransition(async () => {
      const response = await submitContactForm(null, formData);
      
      if (!response.success && (response as any).field) {
        setErrors({ [(response as any).field]: response.message });
        setResult({ success: false, message: response.message });
      } else {
        setResult(response);
        // Nếu thành công thì reset form và reset trạng thái validate
        if (response.success) {
          currentTarget.reset();
          setHasSubmitted(false);
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] backdrop-blur-md"
    >
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
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-300 focus:ring-2 ${
                  errors.fullName 
                    ? 'border-red-400 bg-red-500/10 focus:ring-red-400/50' 
                    : 'border-white/20 bg-white/20 focus:bg-white/30 focus:ring-white/50'
                }`}
                placeholder="Nhập họ và tên (tối đa 50 ký tự)"
              />
              <AnimatePresence>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#ff5c5c] text-[13px] mt-1 font-semibold flex items-center gap-1 overflow-hidden"
                  >
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" /> {errors.fullName}
                  </motion.p>
                )}
              </AnimatePresence>
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
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-300 focus:ring-2 ${
                  errors.phone 
                    ? 'border-red-400 bg-red-500/10 focus:ring-red-400/50' 
                    : 'border-white/20 bg-white/20 focus:bg-white/30 focus:ring-white/50'
                }`}
                placeholder="Nhập số điện thoại"
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#ff5c5c] text-[13px] mt-1 font-semibold flex items-center gap-1 overflow-hidden"
                  >
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" /> {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cột Yêu cầu (thay thế cho cột Email cũ) */}
          <div className="space-y-2">
            <label htmlFor="request" className="text-sm font-medium text-white/90">
              Nội dung yêu cầu <span className="text-red-400">*</span>
            </label>
            <textarea
              id="request"
              name="request"
              required
              rows={4}
              onChange={handleInputChange}
              className={`w-full rounded-xl border px-4 py-3 text-white placeholder-white/50 outline-none transition-all duration-300 focus:ring-2 resize-none ${
                errors.request 
                  ? 'border-red-400 bg-red-500/10 focus:ring-red-400/50' 
                  : 'border-white/20 bg-white/20 focus:bg-white/30 focus:ring-white/50'
              }`}
              placeholder="Nhập nội dung yêu cầu của bạn (tối thiểu 20 ký tự)"
            />
            <AnimatePresence>
              {errors.request && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -5 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#ff5c5c] text-[13px] mt-1 font-semibold flex items-center gap-1 overflow-hidden"
                >
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" /> {errors.request}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Thông báo kết quả gửi form */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`flex items-center gap-2 rounded-lg p-4 text-sm font-medium ${result.success ? 'bg-green-500/20 text-green-100 border border-green-500/30' : 'bg-red-500/20 text-red-100 border border-red-500/30'}`}>
                  {result.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{result.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nút gửi */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#008BBD] px-6 py-4 text-white font-semibold shadow-lg transition-all hover:bg-[#007ba8] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <span>Gửi yêu cầu</span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
