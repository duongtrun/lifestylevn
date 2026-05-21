"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, GraduationCap, Leaf, Baby, ArrowRight } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import clsx from "clsx";

// File này: Component Header (Thanh điều hướng)
// Vai trò: Chứa logo, các link menu chính và nút liên hệ. Dính trên cùng trang.
// Dùng khi: Ở tất cả các trang web của hệ sinh thái.

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo — bấm vào về trang chủ */}
        <Link 
          href="/"
          className="flex items-center group cursor-pointer"
          aria-label="Về trang chủ"
        >
          <Image 
            src="/images/logo.svg" 
            alt="Lifestyle Vietnam Logo" 
            width={160} 
            height={45} 
            className="h-10 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/gioi-thieu" className="text-lg font-medium text-gray-600 hover:text-primary transition-colors">
            Giới thiệu
          </Link>

          {/* Ecosystem Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-1 text-lg font-medium text-gray-600 hover:text-primary transition-colors outline-none data-[state=open]:text-primary group">
              Hệ sinh thái <ChevronDown className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                align="start"
                sideOffset={12}
                className="z-50 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <DropdownMenu.Item asChild>
                  <Link href="/he-sinh-thai/iruka-edu" className="flex items-center gap-3 p-2.5 rounded-xl outline-none cursor-pointer hover:bg-primary/5 group transition-all duration-200">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">IruKa Edu</div>
                      {/* <p className="text-xs text-gray-500 mt-0.5 leading-snug">Hệ thống giáo dục mầm non chuẩn quốc tế</p> */}
                    </div>
                  </Link>
                </DropdownMenu.Item>
                
                <DropdownMenu.Item asChild>
                  <Link href="/he-sinh-thai/iruka-care" className="flex items-center gap-3 p-2.5 rounded-xl outline-none cursor-pointer hover:bg-primary/5 group transition-all duration-200 mt-0.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">IruKa Care</div>
                      {/* <p className="text-xs text-gray-500 mt-0.5 leading-snug">Nông trại sinh thái & trải nghiệm thiên nhiên</p> */}
                    </div>
                  </Link>
                </DropdownMenu.Item>
                
                <DropdownMenu.Item asChild>
                  <Link href="/he-sinh-thai/babego" className="flex items-center gap-3 p-2.5 rounded-xl outline-none cursor-pointer hover:bg-primary/5 group transition-all duration-200 mt-0.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Baby className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">Babego</div>
                      {/* <p className="text-xs text-gray-500 mt-0.5 leading-snug">Sản phẩm và dịch vụ chăm sóc Mẹ & Bé</p> */}
                    </div>
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Link href="/dau-tu" className="text-lg font-medium text-gray-600 hover:text-primary transition-colors">
            Đầu tư
          </Link>
          <Link href="/tin-tuc" className="text-lg font-medium text-gray-600 hover:text-primary transition-colors">
            Tin tức
          </Link>
          <Link href="/tuyen-dung" className="text-lg font-medium text-gray-600 hover:text-primary transition-colors">
            Tuyển dụng
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            href="/lien-he" 
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            Liên hệ
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Lớp nền mờ phía sau (Backdrop Overlay) - Bấm ra ngoài để đóng menu di động */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-20 z-40 bg-black/30 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="relative z-50 md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-4">
          <Link 
            href="/gioi-thieu" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="block text-lg font-medium text-gray-600"
          >
            Giới thiệu
          </Link>
          <div className="space-y-2">
            <span className="block text-lg font-medium text-gray-600">Hệ sinh thái</span>
            <div className="pl-4 border-l-2 border-primary/20 space-y-3">
              <Link 
                href="/he-sinh-thai/iruka-edu" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block text-base text-gray-500 hover:text-primary"
              >
                IruKa Edu
              </Link>
              <Link 
                href="/he-sinh-thai/iruka-care" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block text-base text-gray-500 hover:text-primary"
              >
                IruKa Care
              </Link>
              <Link 
                href="/he-sinh-thai/babego" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block text-base text-gray-500 hover:text-primary"
              >
                Babego
              </Link>
            </div>
          </div>
          <Link 
            href="/dau-tu" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="block text-lg font-medium text-gray-600"
          >
            Đầu tư
          </Link>
          <Link 
            href="/tin-tuc" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="block text-lg font-medium text-gray-600"
          >
            Tin tức
          </Link>
          <Link 
            href="/tuyen-dung" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="block text-lg font-medium text-gray-600"
          >
            Tuyển dụng
          </Link>
          <Link 
            href="/lien-he" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="flex w-full h-11 items-center justify-center rounded-full bg-primary text-lg font-medium text-white mt-4"
          >
            Liên hệ
          </Link>
        </div>
      )}
    </header>
  );
}
