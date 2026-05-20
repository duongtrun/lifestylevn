'use client';

// File này: Component form ứng tuyển (nộp CV).
// Vai trò: Giao diện form ứng tuyển, gửi file CV qua API Route /api/apply
//          (không dùng Server Actions vì Server Actions chuyển File thành hash).
// Dùng khi: Nhúng vào trong Modal hoặc Popup ở trang chi tiết tuyển dụng.

import { useState, useRef } from 'react';
import { Loader2, UploadCloud, FileText, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationFormProps {
  positionTitle: string;
  onSuccess?: () => void;
}

export default function ApplicationForm({ positionTitle, onSuccess }: ApplicationFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Xử lý khi user chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Kiểm tra định dạng file phía client cho nhanh
      if (file.type !== 'application/pdf') {
        toast.error('Vui lòng chỉ tải lên file định dạng PDF');
        return;
      }
      
      // Kiểm tra dung lượng file — giới hạn 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước file vượt quá giới hạn 5MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // Xử lý kéo thả file vào vùng upload
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Xử lý khi thả file vào vùng upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (file.type !== 'application/pdf') {
        toast.error('Vui lòng chỉ tải lên file định dạng PDF');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước file vượt quá giới hạn 5MB');
        return;
      }
      
      setSelectedFile(file);
      // Đồng bộ file đã kéo thả vào ô input ẩn
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  // Xử lý gửi form — gọi API Route /api/apply thay vì Server Actions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    const form = e.currentTarget;
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement)?.value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim();

    if (!fullName) {
      toast.error('Vui lòng điền Họ và tên');
      return;
    }
    if (!phone) {
      toast.error('Vui lòng điền Số điện thoại');
      return;
    }
    if (!email) {
      toast.error('Vui lòng điền Email liên hệ');
      return;
    }
    if (!selectedFile) {
      toast.error('Vui lòng đính kèm CV (Hồ sơ năng lực) của bạn');
      return;
    }

    // Tạo FormData chứa tất cả thông tin + file CV gốc
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('position', positionTitle);
    formData.append('cv-file', selectedFile); // File gốc, không bị hash

    setIsPending(true);

    try {
      // Gọi API Route — file được gửi nguyên vẹn qua multipart/form-data
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Reset form sau khi gửi thành công
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        formRef.current?.reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Field ẩn để gửi vị trí ứng tuyển */}
        <input type="hidden" name="position" value={positionTitle} />

        <div className="space-y-3">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-700 mb-1.5">
              Họ và tên <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              disabled={isPending}
              placeholder="Nguyễn Văn A"
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-neutral-900 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Số điện thoại <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                disabled={isPending}
                placeholder="09xx xxx xxx"
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-neutral-900 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Email liên hệ <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                disabled={isPending}
                placeholder="email@example.com"
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-neutral-900 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Vùng tải file CV */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              CV / Hồ sơ năng lực <span className="text-rose-500">*</span>
            </label>
            
            <input
              type="file"
              id="cv-file"
              name="cv-file"
              accept=".pdf,application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isPending}
              className="hidden"
            />
            
            <div 
              className={`w-full border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                selectedFile 
                  ? 'border-blue-500 bg-blue-50/50' 
                  : 'border-neutral-300 hover:border-blue-400 hover:bg-neutral-50'
              } ${isPending ? 'opacity-60 pointer-events-none' : 'cursor-pointer'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {selectedFile ? (
                  <motion.div 
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 mb-0.5 line-clamp-1">{selectedFile.name}</p>
                      <p className="text-sm text-neutral-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • PDF
                      </p>
                    </div>
                    <button 
                      type="button" 
                      className="text-sm text-rose-500 font-medium hover:text-rose-600 mt-2 flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      <X className="w-4 h-4" /> Bỏ chọn file
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-file"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 mb-0.5">Nhấn để tải lên hoặc kéo thả file</p>
                      <p className="text-sm text-neutral-500">Chỉ hỗ trợ PDF, tối đa 5MB</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-[0_4px_12px_rgb(37,99,235,0.2)]"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang gửi hồ sơ...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Gửi hồ sơ ứng tuyển
            </>
          )}
        </button>
      </form>
    </div>
  );
}
