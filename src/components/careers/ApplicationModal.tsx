'use client';

// File này: Component Modal chứa Form Ứng tuyển.
// Vai trò: Nút bấm "Ứng tuyển ngay" mở ra popup chứa ApplicationForm.
// Dùng khi: Thay thế nút "Ứng tuyển ngay" ở box bên phải trong trang chi tiết tuyển dụng.

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationForm from './ApplicationForm';

interface ApplicationModalProps {
  positionTitle: string;
}

export default function ApplicationModal({ positionTitle }: ApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[95vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Ứng tuyển vị trí</h3>
                <p className="text-sm text-blue-600 font-semibold mt-0.5 truncate max-w-[280px] sm:max-w-[320px]">
                  {positionTitle}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body (Scrollable if too tall) */}
            <div className="p-4 sm:p-5 overflow-y-auto">
              <ApplicationForm 
                positionTitle={positionTitle} 
                onSuccess={() => {
                  setTimeout(closeModal, 2000);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button 
        onClick={openModal}
        className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 py-3.5 rounded-xl font-bold hover:bg-neutral-50 transition-colors shadow-sm"
      >
        <Send className="w-5 h-5" />
        Ứng tuyển ngay
      </button>

      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
