'use server';

// File này: Server Actions xử lý form liên hệ.
// Vai trò: Nhận dữ liệu từ form ở client, gọi API WordPress để lưu thông tin.
// Dùng khi: Người dùng bấm "Gửi yêu cầu" trên form /lien-he.

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get('fullName')?.toString();
    const phone = formData.get('phone')?.toString();
    const request = formData.get('request')?.toString();

    // Kiểm tra dữ liệu người dùng nhập có trống hay không trên server (phương án dự phòng)
    if (!fullName || !phone || !request) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin.' };
    }

    // URL của WordPress API (Đường dẫn kết nối đến hệ thống WordPress)
    const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';
    
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
    
    wpFormData.append('request', request); // Dùng trường request thay cho email cũ theo Contact Form 7 mới

    // Gửi request (yêu cầu gọi API) tới Contact Form 7 REST API
    const response = await fetch(`${wpApiUrl}/contact-form-7/v1/contact-forms/49/feedback`, {
      method: 'POST',
      body: wpFormData,
    });

    const result = await response.json();

    if (!response.ok || result.status === 'validation_failed' || result.status === 'mail_failed') {
      console.error('Lỗi từ Contact Form 7:', result);
      return { success: false, message: result.message || 'Lỗi khi gửi dữ liệu lên hệ thống.' };
    }

    return { success: true, message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm.' };

  } catch (error) {
    console.error('Lỗi khi gửi form liên hệ:', error);
    return { success: false, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' };
  }
}
