import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Iruka Web Lifestyle",
  description: "Kiến tạo hệ sinh thái Mẹ và Bé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${manrope.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {/* Khoảng đệm bù cho header cố định (fixed) — cao bằng đúng header h-20 = 80px */}
        <div className="h-20" />
        {children}
        <ScrollToTop />
        <Footer />
        {/* Hiển thị thông báo toast (pop-up nhỏ góc màn hình) cho toàn bộ website */}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
