import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import NodeFormData from 'form-data';
import { getWpRequestDetails } from '@/lib/wp-api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const cvFile = formData.get('cv-file');
    
    // DEBUGGING LOGS
    console.log('--- DEBUG INFO ---');
    if (cvFile instanceof File) {
      console.log('Is File:', true);
      console.log('File name:', cvFile.name);
      console.log('File type:', cvFile.type);
      console.log('File size:', cvFile.size);
      
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      console.log('First 100 bytes:', buffer.slice(0, 100).toString('utf-8'));
    } else {
      console.log('Is File:', false);
      console.log('Type of cvFile:', typeof cvFile);
      console.log('Value:', cvFile);
    }
    console.log('------------------');

    const fullName = formData.get('fullName')?.toString();
    const phone = formData.get('phone')?.toString();
    const email = formData.get('email')?.toString();
    const position = formData.get('position')?.toString();

    if (!cvFile || !(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ success: false, message: 'Vui lòng đính kèm CV.' }, { status: 400 });
    }

    const { url: wpApiUrl, headers: wpHeaders } = getWpRequestDetails();
    const formId = '53';

    const wpFormData = new NodeFormData();
    wpFormData.append('_wpcf7', formId);
    wpFormData.append('_wpcf7_version', '5.9.3');
    wpFormData.append('_wpcf7_locale', 'vi');
    wpFormData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);
    wpFormData.append('_wpcf7_container_post', '0');

    wpFormData.append('fullName', fullName || 'Test');
    wpFormData.append('your-name', fullName || 'Test');
    wpFormData.append('phone', phone || '0123456789');
    wpFormData.append('your-tel', phone || '0123456789');
    wpFormData.append('email', email || 'test@test.com');
    wpFormData.append('your-email', email || 'test@test.com');
    wpFormData.append('position', position || '');
    wpFormData.append('your-subject', `Ứng tuyển vị trí: ${position}`);

    const arrayBuffer = await cvFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    wpFormData.append('cv-file', buffer, {
      filename: cvFile.name || 'cv.pdf',
      contentType: cvFile.type || 'application/pdf',
    });

    const response = await axios.post(
      `${wpApiUrl}/contact-form-7/v1/contact-forms/${formId}/feedback`,
      wpFormData,
      {
        headers: {
          ...wpFormData.getHeaders(),
          ...wpHeaders,
          'Accept': 'application/json'
        },
        validateStatus: () => true 
      }
    );

    const result = response.data;
    console.log('WP Response:', result);

    if (response.status !== 200 || result.status === 'validation_failed' || result.status === 'mail_failed') {
      return NextResponse.json({ 
        success: false, 
        message: result.message || 'Lỗi khi gửi dữ liệu.',
        invalidFields: result.invalid_fields || []
      }, { status: response.status === 200 ? 400 : response.status });
    }

    return NextResponse.json({ success: true, message: 'Gửi CV thành công! HR IruKa sẽ liên hệ với bạn sớm nhất.' });

  } catch (error) {
    console.error('Lỗi Axios khi gửi form ứng tuyển:', error);
    return NextResponse.json({ success: false, message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }, { status: 500 });
  }
}
