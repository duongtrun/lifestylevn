'use client';

// File này: Trang Đóng góp bài viết tự do (/dong-gop)
// Vai trò: Hiển thị form gồm Tên, SĐT, Tiêu đề, Nội dung bài viết cho người dùng đóng góp tự do và ẩn danh.
//          Giao diện Glassmorphism mờ ảo cao cấp kết hợp hiệu ứng Framer Motion.
// Dùng khi: Người dùng truy cập đường dẫn /dong-gop từ nút "Góp ý của bạn" ở trang tin tức.

import { useTransition, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, Heading, ListFilter, FileText, Send, CheckCircle2, AlertCircle, Loader2, Upload, X } from 'lucide-react';
import { submitContribution } from './actions';

export default function ContributionPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string; isMock?: boolean } | null>(null);
  const [errorValidation, setErrorValidation] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [isDragActive, setIsDragActive] = useState(false); // Quản lý trạng thái đang kéo file trên ô tải ảnh

  // Hàm dùng chung: Kiểm tra và nạp file ảnh hiển thị preview
  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrorValidation('Kích thước hình ảnh phải nhỏ hơn 5MB.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrorValidation('Tệp tin phải là hình ảnh (jpg, png, webp...).');
      return;
    }
    setSelectedFile(file);
    setErrorValidation(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Xử lý khi người dùng chọn file từ cửa sổ chọn tệp tin của máy
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Xử lý sự kiện kéo file lướt qua ô (hiện hiệu ứng drag active)
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Xử lý sự kiện thả file ảnh vào ô kéo thả
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Xóa ảnh đã chọn và đặt lại giá trị ô input
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Xử lý gửi form đóng góp
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    setErrorValidation(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;

    // Validate dữ liệu cơ bản ở phía client
    if (fullName.trim().length < 2) {
      setErrorValidation('Họ và tên phải có ít nhất 2 ký tự.');
      return;
    }
    if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone)) {
      setErrorValidation('Số điện thoại không đúng định dạng Việt Nam.');
      return;
    }
    if (title.trim().length < 5) {
      setErrorValidation('Tiêu đề bài viết phải có ít nhất 5 ký tự.');
      return;
    }
    if (!category) {
      setErrorValidation('Vui lòng chọn danh mục bài viết đóng góp.');
      return;
    }
    if (content.trim().length < 20) {
      setErrorValidation('Nội dung bài viết phải có ít nhất 20 ký tự.');
      return;
    }

    // Truyền file ảnh vào FormData
    if (selectedFile) {
      formData.set('imageFile', selectedFile);
    } else {
      formData.delete('imageFile');
    }

    // Gọi Server Action để gửi bài sang WordPress
    startTransition(async () => {
      const response = await submitContribution(formData);

      setResult(response);

      if (response.success) {
        (e.target as HTMLFormElement).reset();
        setSelectedFile(null);
        setImagePreviewUrl(null);
      }
    });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#008BBD] via-[#005F83] to-[#003B52] pb-24 pt-28 overflow-hidden">
      {/* Các hạt bụi sáng lấp lánh ở nền tạo chiều sâu */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#008BBD]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        
        {/* Nút quay lại trang Tin tức */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Quay lại trang Tin tức</span>
          </Link>
        </motion.div>

        {/* Tiêu đề & Giới thiệu */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            ĐÓNG GÓP BÀI VIẾT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto leading-relaxed text-sm md:text-base"
          >
            Chia sẻ những câu chuyện, kiến thức bổ ích hoặc góp ý của bạn về hệ sinh thái Mẹ & Bé. Bài viết của bạn sẽ được gửi tới Admin duyệt trước khi đăng tải chính thức.
          </motion.p>
        </div>

        {/* Khối Form Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-lg"
        >
          {/* Lớp phủ sáng nội bộ */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#008BBD]/10 blur-3xl rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* THÔNG TIN NGƯỜI ĐĂNG BÀI */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2 border-b border-white/10 pb-2 text-base">
                <span>👤 Thông tin người gửi (Bảo mật với Admin)</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Họ và tên */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-white/90 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-white/70" />
                    Họ và tên <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:bg-white/25 focus:ring-2 focus:ring-[#008BBD]/50"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                {/* Số điện thoại */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white/90 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-white/70" />
                    Số điện thoại <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:bg-white/25 focus:ring-2 focus:ring-[#008BBD]/50"
                    placeholder="0987654321"
                  />
                </div>
              </div>
            </div>

            {/* NỘI DUNG BÀI VIẾT */}
            <div className="space-y-4">
              {/* Tiêu đề bài viết */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-white/90 flex items-center gap-1.5">
                  <Heading className="w-4 h-4 text-white/70" />
                  Tiêu đề bài viết <span className="text-red-400">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:bg-white/25 focus:ring-2 focus:ring-[#008BBD]/50"
                  placeholder="Nhập tiêu đề thu hút người đọc"
                />
              </div>

              {/* Danh mục đóng góp */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-white/90 flex items-center gap-1.5">
                  <ListFilter className="w-4 h-4 text-white/70" />
                  Chuyên mục đề xuất <span className="text-red-400">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-white outline-none transition-all focus:bg-white/25 focus:ring-2 focus:ring-[#008BBD]/50 [&>option]:bg-[#003B52]"
                >
                  <option value="" disabled className="text-white/40">Chọn chuyên mục bài viết của bạn</option>
                  <option value="Sự kiện nổi bật">Sự kiện nổi bật</option>
                  <option value="Dinh dưỡng & tiêu hóa">Dinh dưỡng & tiêu hóa</option>
                  <option value="Sức khỏe & vệ sinh">Sức khỏe & vệ sinh</option>
                  <option value="Góp ý / Khác">Ý kiến đóng góp khác</option>
                </select>
              </div>

              {/* Nội dung bài viết */}
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium text-white/90 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-white/70" />
                  Nội dung chi tiết <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={8}
                  className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-3 text-white placeholder-white/40 outline-none transition-all focus:bg-white/25 focus:ring-2 focus:ring-[#008BBD]/50 resize-none leading-relaxed"
                  placeholder="Viết chia sẻ chi tiết hoặc ý kiến phản hồi của bạn tại đây (tối thiểu 20 ký tự)..."
                />
              </div>

              {/* Tải hình ảnh minh họa từ máy (Tùy chọn) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/90 flex items-center gap-1.5">
                  <span>🖼️ Hình ảnh minh họa (Tùy chọn)</span>
                </label>
                
                {/* Hộp Drag & Drop Glassmorphism */}
                {!imagePreviewUrl ? (
                  <div
                    onClick={() => document.getElementById('imageFile')?.click()}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`w-full rounded-2xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group active:scale-[0.99] ${
                      isDragActive 
                        ? 'border-white/80 bg-white/20 scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                        : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <input
                      id="imageFile"
                      name="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform text-white/70">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-white font-medium text-sm">
                      {isDragActive ? 'Thả ảnh vào đây ngay!' : 'Nhấp để tải ảnh lên từ máy hoặc kéo thả vào đây'}
                    </p>
                    <p className="text-white/50 text-xs">Hỗ trợ JPG, PNG, WEBP tối đa 5MB</p>
                  </div>
                ) : (
                  /* Xem trước hình ảnh (Image Preview) bọc trong Motion để giảm giật nảy giao diện (CLS) */
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative rounded-2xl border border-white/20 bg-white/10 p-3 flex flex-col gap-3"
                  >
                    <div className="relative aspect-video w-full max-h-[250px] md:max-h-[320px] rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
                      <img
                        src={imagePreviewUrl}
                        alt="Xem trước ảnh tải lên"
                        className="w-full h-full object-contain"
                      />
                      {/* Nút xóa ảnh */}
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 z-10"
                        title="Xóa ảnh này"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/60 px-1">
                      <span className="truncate max-w-[70%]">📁 {selectedFile?.name}</span>
                      <span>⚖️ {(selectedFile!.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Báo lỗi validate phía client */}
            {errorValidation && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl p-4 text-sm font-medium bg-red-500/20 text-red-100 border border-red-500/30"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorValidation}</span>
              </motion.div>
            )}

            {/* Báo kết quả gửi bài viết */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-start gap-3 rounded-xl p-4 text-sm font-medium ${
                  result.success
                    ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                    : 'bg-red-500/20 text-red-100 border border-red-500/30'
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold block mb-0.5">
                    {result.success ? 'Gửi thành công!' : 'Có lỗi xảy ra'}
                  </span>
                  <span className="text-white/80">{result.message}</span>
                  {result.isMock && (
                    <span className="block mt-1.5 text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full w-max">
                      Chế độ chạy thử giả lập
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* Nút gửi bài viết */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF8C42] hover:bg-[#e07530] px-6 py-4 text-white font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-base md:text-lg group"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Đang xử lý gửi bài viết...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Gửi bài đóng góp</span>
                </>
              )}
            </button>

          </form>
        </motion.div>

      </div>
    </main>
  );
}
