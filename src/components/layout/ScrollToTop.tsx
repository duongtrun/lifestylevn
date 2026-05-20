'use client';

// File: src/components/layout/ScrollToTop.tsx
// Vai trò: Nút cuộn lên đầu trang, xuất hiện khi cuộn xuống > 200px.

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] p-3 bg-primary text-white rounded-full shadow-xl hover:bg-primary/90 transition-all duration-300 hover:scale-110 flex items-center justify-center animate-in fade-in slide-in-from-bottom-4"
      aria-label="Cuộn lên đầu trang"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}
