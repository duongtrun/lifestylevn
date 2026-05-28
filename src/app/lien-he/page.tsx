// File này: Trang Liên hệ
// Vai trò: Hiển thị form liên hệ (bọc trong style glassmorphism) và các thông tin liên hệ khác của IruKa.
// Dùng khi: Khách hàng truy cập /lien-he để gửi yêu cầu hợp tác, tư vấn.

import ContactForm from '@/components/contact/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Liên hệ | IruKa Group',
  description: 'Gửi yêu cầu hợp tác và liên hệ với IruKa Group.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center py-20 px-4">
      {/* Hình nền mờ phía sau toàn trang để tránh đơn điệu */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_about_us/bg_su_menh.webp"
          alt="Hình nền liên hệ"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        {/* Lớp phủ gradient để làm dịu background và tôn lên form */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-500/20" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          
          {/* Cột trái: Thông tin liên hệ */}
          <div className="w-full md:w-5/12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
              Kết nối cùng IruKa
            </h1>
            <p className="text-lg text-white/90 mb-10 leading-relaxed drop-shadow-sm">
              Chúng tôi luôn trân trọng mọi cơ hội hợp tác và phản hồi từ quý đối tác, 
              khách hàng và các bậc phụ huynh. Hãy để lại thông tin, IruKa sẽ liên hệ lại trong thời gian sớm nhất.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Trụ sở chính</h3>
                  <p className="text-white/80 mt-1">P502, Tầng 5, Tòa NHS Trung Văn, TDP 16, đường Tố Hữu, Phường Đại Mỗ, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Điện thoại</h3>
                  <p className="text-white/80 mt-1">0906 399 666</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-white/80 mt-1">lifestylead.vn@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Form liên hệ Glassmorphism */}
          <div className="w-full md:w-7/12 max-w-2xl">
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  );
}
