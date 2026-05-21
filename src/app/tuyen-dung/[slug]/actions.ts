'use server';

import { getWpRequestDetails } from '@/lib/wp-api';

// File này: Server Actions xử lý form ứng tuyển (nộp CV).
// Vai trò: Nhận dữ liệu từ form ở client (bao gồm file CV), gọi API WordPress để lưu thông tin.
// Dùng khi: Người dùng bấm "Gửi ứng tuyển" trên trang chi tiết công việc.

export async function submitApplicationForm(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get('fullName')?.toString();
    const phone = formData.get('phone')?.toString();
    const email = formData.get('email')?.toString();
    const position = formData.get('position')?.toString();
    const cvFile = formData.get('cv-file') as File | null;

    // Validate cơ bản trên server
    if (!fullName || !phone || !email || !cvFile || cvFile.size === 0) {
      return { success: false, message: 'Vui lòng điền đầy đủ thông tin và đính kèm CV.' };
    }
    
    // Kiểm tra định dạng file (chỉ cho phép PDF)
    if (cvFile.type !== 'application/pdf') {
       return { success: false, message: 'Vui lòng chỉ tải lên file PDF.' };
    }
    
    // Kiểm tra dung lượng (giới hạn 5MB)
    if (cvFile.size > 5 * 1024 * 1024) {
       return { success: false, message: 'Dung lượng file CV không được vượt quá 5MB.' };
    }

    // URL của WordPress API và các headers cần thiết để đi qua tunnel
    const { url: wpApiUrl, headers: wpHeaders } = getWpRequestDetails();
    
    // Khởi tạo FormData mới đúng chuẩn mà Contact Form 7 yêu cầu
    const wpFormData = new FormData();
    // ID form tuyển dụng trên WordPress (Contact Form 7) — đã xác nhận bởi Mr. Đào
    const formId = '53'; 
    
    wpFormData.append('_wpcf7', formId); // ID của form
    wpFormData.append('_wpcf7_version', '5.9.3');
    wpFormData.append('_wpcf7_locale', 'vi');
    wpFormData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`); // Mã định danh form (bắt buộc)
    wpFormData.append('_wpcf7_container_post', '0');

    // Chuyển các field từ Next.js form sang (cần khớp tên biến trong WP)
    wpFormData.append('fullName', fullName);
    wpFormData.append('your-name', fullName);
    
    wpFormData.append('phone', phone);
    wpFormData.append('your-tel', phone);
    
    wpFormData.append('email', email);
    wpFormData.append('your-email', email);
    
    wpFormData.append('position', position || '');
    wpFormData.append('your-subject', `Ứng tuyển vị trí: ${position}`);
    
    // Đọc nội dung file CV thành dữ liệu nhị phân (binary)
    // Vì Server Actions của Next.js chuyển File thành mã hash nội bộ,
    // cần đọc lại nội dung thật (arrayBuffer) rồi tạo Blob mới để gửi đi đúng cách
    const fileBuffer = await cvFile.arrayBuffer();
    const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' });
    wpFormData.append('cv-file', fileBlob, cvFile.name);

    // Gửi request tới Contact Form 7 REST API
    const response = await fetch(`${wpApiUrl}/contact-form-7/v1/contact-forms/${formId}/feedback`, {
      method: 'POST',
      headers: wpHeaders,
      body: wpFormData,
    });

    const result = await response.json();

    if (!response.ok || result.status === 'validation_failed' || result.status === 'mail_failed') {
      console.error('Lỗi từ Contact Form 7 (Tuyển dụng):', result);
      // Nếu API trả về not found do ID form sai, báo lỗi thân thiện để anh dễ sửa
      if (result.code === 'rest_no_route' || response.status === 404) {
          return { success: false, message: 'Hệ thống chưa cấu hình form tuyển dụng (ID chưa đúng).' };
      }
      return { success: false, message: result.message || 'Lỗi khi gửi dữ liệu lên hệ thống.' };
    }

    return { success: true, message: 'Ứng tuyển thành công! HR IruKa sẽ liên hệ với bạn sớm.' };

  } catch (error) {
    console.error('Lỗi khi gửi form ứng tuyển:', error);
    return { success: false, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' };
  }
}
