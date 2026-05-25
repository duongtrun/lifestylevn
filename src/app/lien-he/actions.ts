'use server';

import { getWpRequestDetails } from '@/lib/wp-api';

// File này: Server Actions xử lý form liên hệ.
// Vai trò: Nhận dữ liệu từ form ở client, gọi API WordPress để lưu thông tin.
// Dùng khi: Người dùng bấm "Gửi yêu cầu" trên form /lien-he.

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get('fullName')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const request = formData.get('request')?.toString() || '';

    // Kiểm tra và validate Họ và tên
    if (!fullName.trim()) {
      return { success: false, message: 'Vui lòng nhập họ và tên.', field: 'fullName' };
    }
    if (fullName.length > 50) {
      return { success: false, message: 'Họ và tên không được vượt quá 50 ký tự.', field: 'fullName' };
    }

    // Kiểm tra và validate Số điện thoại (định dạng Việt Nam)
    if (!phone.trim()) {
      return { success: false, message: 'Vui lòng nhập số điện thoại.', field: 'phone' };
    }
    const phoneRegex = /^(0|(?:\+84)|84)(3|5|7|8|9)\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      return { success: false, message: 'Số điện thoại không đúng định dạng Việt Nam.', field: 'phone' };
    }

    // Kiểm tra và validate Nội dung yêu cầu (ít nhất 20 ký tự)
    if (!request.trim()) {
      return { success: false, message: 'Vui lòng nhập nội dung yêu cầu.', field: 'request' };
    }
    if (request.trim().length < 20) {
      return { success: false, message: 'Nội dung yêu cầu phải chứa ít nhất 20 ký tự.', field: 'request' };
    }

    // URL của WordPress API (Đường dẫn kết nối đến hệ thống WordPress) và các headers cần thiết để đi qua tunnel
    const { url: wpApiUrl, headers: wpHeaders } = getWpRequestDetails();
    
    // Khởi tạo FormData mới đúng chuẩn mà Contact Form 7 yêu cầu
    const wpFormData = new FormData();
    wpFormData.append('_wpcf7', '49'); // ID của form
    wpFormData.append('_wpcf7_version', '5.9.3');
    wpFormData.append('_wpcf7_locale', 'vi');
    wpFormData.append('_wpcf7_unit_tag', 'wpcf7-f49-p0-o1'); // Mã định danh form (bắt buộc)
    wpFormData.append('_wpcf7_container_post', '0');

    // Chuyển các field (trường thông tin) từ Next.js form sang (cần khớp tên biến trong WordPress)
    // Lưu ý: Nếu trong WordPress anh đặt là [text* your-name] thì ở đây phải là your-name
    // Tạm thời truyền cả 2 kiểu để chắc chắn WordPress nhận được
    wpFormData.append('fullName', fullName);
    wpFormData.append('your-name', fullName);
    
    wpFormData.append('phone', phone);
    wpFormData.append('your-tel', phone);
    wpFormData.append('tel-phone', phone); // Một số template dùng tên này
    
    // Gửi email mặc định/đại diện để tránh lỗi validate bắt buộc nhập email trên WordPress CF7
    wpFormData.append('email', 'no-reply@lifestyle.vn');
    wpFormData.append('your-email', 'no-reply@lifestyle.vn');
    
    wpFormData.append('request', request); // Dùng trường request thay cho email cũ theo Contact Form 7 mới
    wpFormData.append('your-message', request); // Đề phòng WP CF7 cấu hình dùng [textarea your-message]
    wpFormData.append('message', request);

    // Gửi request (yêu cầu gọi API) tới Contact Form 7 REST API
    const response = await fetch(`${wpApiUrl}/contact-form-7/v1/contact-forms/49/feedback`, {
      method: 'POST',
      headers: wpHeaders,
      body: wpFormData,
    });

    const result = await response.json();

    if (!response.ok || result.status === 'validation_failed' || result.status === 'mail_failed') {
      console.error('Lỗi từ Contact Form 7:', result);
      
      let errorMessage = result.message || 'Lỗi khi gửi dữ liệu lên hệ thống.';
      if (result.status === 'validation_failed' || errorMessage.toLowerCase().includes('one or more fields')) {
        errorMessage = 'Một hoặc nhiều thông tin có lỗi. Vui lòng kiểm tra và thử lại.';
      } else if (result.status === 'mail_failed' || errorMessage.toLowerCase().includes('error trying to send')) {
        errorMessage = 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.';
      }
      
      return { success: false, message: errorMessage };
    }

    return { success: true, message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm.' };

  } catch (error) {
    console.error('Lỗi khi gửi form liên hệ:', error);
    return { success: false, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' };
  }
}
