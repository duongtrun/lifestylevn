import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

// File: src/components/layout/Footer.tsx
// Luồng: Mọi trang
// Vai trò: Hiển thị thông tin công ty, liên hệ, bản đồ và bản quyền ở cuối trang.
// Dùng khi: Nằm cuối cùng của mọi trang (được gọi trong layout.tsx).

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      {/* Phần nội dung chính Footer — chia 3 cột */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">

          {/* ═══ Cột 1: Logo & Thông tin công ty ═══ */}
          <div className="space-y-5">
            {/* Logo công ty */}
            <Image
              src="/images/logo.svg"
              alt="Lifestyle Vietnam Logo"
              width={180}
              height={50}
              className="h-12 w-auto"
            />

            {/* Tên đầy đủ công ty */}
            <h3 className="text-[#98C04A] font-bold text-sm md:text-base leading-snug uppercase">
              Công ty TNHH Thương Mại Dịch Vụ<br />
              Lifestyle Việt Nam
            </h3>

            {/* Địa chỉ đăng ký kinh doanh */}
            <div className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
              <MapPin className="w-5 h-5 text-[#98C04A] mt-0.5 shrink-0" />
              <p>
                <span className="font-semibold text-gray-700">Địa chỉ ĐKKD:</span>{" "}
                LK66-No 02 Khu 27,28, Đường Lê Trọng Tấn, Phường Dương Nội, Quận Hà Đông, Thành Phố Hà Nội, Việt Nam
              </p>
            </div>
          </div>

          {/* ═══ Cột 2: Liên hệ ═══ */}
          <div className="space-y-5">
            <h3 className="text-[#98C04A] font-bold text-base md:text-lg uppercase tracking-wide">
              Liên hệ với chúng tôi
            </h3>

            {/* Số điện thoại */}
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#98C04A]/10 shrink-0">
                <Phone className="w-4 h-4 text-[#98C04A]" />
              </div>
              <Link href="tel:0906399666" className="hover:text-[#98C04A] transition-colors font-medium">
                0906 399 666
              </Link>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#98C04A]/10 shrink-0">
                <Mail className="w-4 h-4 text-[#98C04A]" />
              </div>
              <Link href="mailto:lifestylead.vn@gmail.com" className="hover:text-[#98C04A] transition-colors">
                lifestylead.vn@gmail.com
              </Link>
            </div>

            {/* Địa chỉ văn phòng */}
            <div className="flex items-start gap-3 text-gray-600 text-sm">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#98C04A]/10 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#98C04A]" />
              </div>
              <p className="leading-relaxed">
                P502, Tầng 5, Tòa NHS Trung Văn, TDP 16, đường Tố Hữu, Phường Đại Mỗ, Hà Nội
              </p>
            </div>

            {/* Mạng xã hội */}
            <div className="flex items-center gap-4 pt-2">
              {/* Facebook */}
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#98C04A]/10 text-[#98C04A] hover:bg-[#98C04A] hover:text-white transition-all duration-300 hover:scale-110">
                <FaFacebookF className="w-5 h-5" />
              </Link>
              {/* Google */}
              <Link href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="Google" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#98C04A]/10 text-[#98C04A] hover:bg-[#98C04A] hover:text-white transition-all duration-300 hover:scale-110">
                <FaGoogle className="w-5 h-5" />
              </Link>
              {/* LinkedIn */}
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#98C04A]/10 text-[#98C04A] hover:bg-[#98C04A] hover:text-white transition-all duration-300 hover:scale-110">
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ═══ Cột 3: Bản đồ ═══ */}
          <div className="space-y-5">
            <h3 className="text-[#98C04A] font-bold text-base md:text-lg uppercase tracking-wide">
              Bản đồ
            </h3>
            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <Link 
                href="https://www.google.com/maps/place/NHS+Complex+Trung+V%C4%83n/@20.9893507,105.7795463,922m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3135ad2a0c43458d:0x8524981e488d70b1!8m2!3d20.9893507!4d105.7821212!16s%2Fg%2F11s5d98hjr?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/images/map.svg"
                  alt="Bản đồ vị trí Lifestyle Việt Nam"
                  width={500}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ Thanh bản quyền phía dưới cùng ═══ */}
      <div className="w-full bg-[#98C04A] py-4">
        <p className="text-center text-white text-sm font-medium">
          © Lifestyle Việt Nam
        </p>
      </div>
    </footer>
  );
}
