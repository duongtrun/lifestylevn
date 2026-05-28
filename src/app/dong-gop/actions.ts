'use server';

// File này: Server Action xử lý gửi bài viết đóng góp của thành viên kèm tệp tin hình ảnh tải lên từ máy
// Vai trò: Tiếp nhận thông tin bài viết tự do từ FormData, upload hình ảnh lên WordPress REST API (/wp/v2/media),
//          đóng gói kèm Tên + SĐT của người gửi vào nội dung, sau đó gửi yêu cầu tạo bài viết mới ở trạng thái "Chờ duyệt" (Pending)
//          gán kèm ID ảnh đại diện chính (featured_media) sang WordPress.
// Dùng khi: Người dùng gửi bài viết từ trang /dong-gop.

import { z } from 'zod';
import { getWpRequestDetails } from '@/lib/wp-api';

// Schema xác thực dữ liệu gửi lên (không bao gồm File vì File được validate trực tiếp)
const ContributionSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  phone: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, 'Số điện thoại không đúng định dạng Việt Nam'),
  title: z.string().min(5, 'Tiêu đề bài viết phải có ít nhất 5 ký tự'),
  category: z.string().min(1, 'Vui lòng chọn danh mục bài viết'),
  content: z.string().min(20, 'Nội dung bài viết đóng góp phải có ít nhất 20 ký tự'),
});

// Hàm phụ trợ: Mã hóa các ký tự đặc biệt để ngăn chặn tấn công tiêm mã độc XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function submitContribution(formData: FormData) {
  try {
    // 1. Thu thập dữ liệu từ FormData
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('imageFile') as File | null;
    const publishMode = (formData.get('publishMode') as string) || 'anonymous'; // Mặc định là ẩn danh nếu không truyền

    // 2. Kiểm tra tính hợp lệ của dữ liệu text
    const validatedData = ContributionSchema.parse({
      fullName,
      phone,
      title,
      category,
      content,
    });

    // 3. Lấy thông số cấu hình WordPress API từ biến môi trường
    const { url: cleanWpApiUrl, headers: tunnelHeaders } = getWpRequestDetails();
    const username = process.env.WP_AUTH_USERNAME;
    const appPassword = process.env.WP_AUTH_APPLICATION_PASSWORD;

    // 4. Nếu không cấu hình tài khoản WordPress hoặc đang tắt, kích hoạt chế độ Giả lập thành công (Mock Success)
    if (!username || !appPassword) {
      console.warn(
        '⚠️ Chưa cấu hình biến môi trường WP_AUTH_USERNAME hoặc WP_AUTH_APPLICATION_PASSWORD.\n' +
        'Kích hoạt chế độ Giả lập thành công (Mock Success Flow) để chạy thử giao diện.'
      );
      
      // Chờ 1.5 giây để giả lập kết nối mạng
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        message: 'Gửi bài viết đóng góp kèm hình ảnh thành công! (Chế độ giả lập)',
        isMock: true,
      };
    }

    // 5. Mã hóa thông tin đăng nhập Basic Auth cho WordPress REST API
    const wpCredentials = Buffer.from(`${username}:${appPassword}`).toString('base64');
    
    // Gộp headers của tunnel (nếu có) và headers xác thực WordPress
    // Lưu ý: Nếu sử dụng LocalWP Live Link (có Basic Auth của tunnel), 
    // việc ghi đè header Authorization bằng WordPress credentials có thể khiến request bị chặn ở cổng Live Link (lỗi 401).
    // Khuyến khích sử dụng Localtunnel (loca.lt) hoặc Ngrok không cài basic auth để tính năng này hoạt động ổn định.
    const requestHeaders: Record<string, string> = {
      ...tunnelHeaders,
      'Authorization': `Basic ${wpCredentials}`,
    };

    // 6. Xử lý UPLOAD FILE HÌNH ẢNH LÊN WORDPRESS trước (nếu người dùng có tải ảnh lên)
    let mediaId: number | undefined = undefined;
    let uploadedImageUrl: string | undefined = undefined;

    if (imageFile && imageFile.size > 0) {
      try {
        console.log(`⏳ Bắt đầu tải ảnh từ máy lên WordPress: ${imageFile.name} (${imageFile.size} bytes)`);
        
        // Đọc dữ liệu nhị phân từ File đối tượng
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Gọi API WordPress /wp/v2/media để upload ảnh
        const mediaRes = await fetch(`${cleanWpApiUrl}/wp/v2/media`, {
          method: 'POST',
          headers: {
            'Content-Disposition': `attachment; filename="${encodeURIComponent(imageFile.name)}"`,
            'Content-Type': imageFile.type || 'image/jpeg',
            ...requestHeaders,
          },
          body: buffer,
          signal: AbortSignal.timeout(12000), // Cho phép upload trong tối đa 12 giây
        });

        if (mediaRes.ok) {
          const mediaObj = await mediaRes.json();
          mediaId = mediaObj.id;
          uploadedImageUrl = mediaObj.source_url;
          console.log(`✅ Upload ảnh thành công! Media ID: ${mediaId}, URL: ${uploadedImageUrl}`);
        } else {
          const errorText = await mediaRes.text();
          console.error(`❌ WordPress báo lỗi upload ảnh: ${mediaRes.status} - ${errorText}`);
          // Vẫn tiếp tục tạo bài viết không có ảnh để không làm đứt mạch gửi bài của người dùng
        }
      } catch (uploadError) {
        console.error('❌ Lỗi trong quá trình upload ảnh sang WordPress:', uploadError);
      }
    }

    // 6.5 Làm sạch dữ liệu văn bản để phòng ngừa tấn công tiêm mã độc XSS
    const escapedFullName = escapeHtml(fullName || '');
    const escapedPhone = escapeHtml(phone || '');
    const escapedCategory = escapeHtml(category || '');
    const escapedTitle = escapeHtml(title || '');
    const escapedContent = escapeHtml(content || '');

    // 7. Chuẩn bị nội dung bài viết đóng góp
    // Khối thông tin Admin-only (chỉ Admin WP nhìn thấy, Next.js sẽ tự động lọc bỏ khi hiển thị công khai)
    const adminMetaBlock = `
      <!-- contribution-meta-start -->
      <div class="contribution-admin-meta" style="background: rgba(251, 146, 60, 0.08); padding: 16px; border-left: 4px solid #FF8C42; margin-bottom: 24px; border-radius: 4px;">
        <strong>👤 Người đóng góp:</strong> ${escapedFullName}<br/>
        <strong>📞 Số điện thoại:</strong> ${escapedPhone}<br/>
        <strong>📂 Danh mục đề xuất:</strong> ${escapedCategory}<br/>
        <strong>🔒 Chế độ đăng:</strong> ${publishMode === 'public' ? 'Công khai (hiện tên)' : 'Ẩn danh'}<br/>
        <strong>📅 Thời gian gửi:</strong> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
      </div>
      <!-- contribution-meta-end -->
    `;

    // Khối thông tin tác giả công khai (hiển thị trên giao diện Next.js)
    const authorDisplayName = publishMode === 'public' ? escapedFullName : 'Ẩn danh';
    const publicAuthorBlock = `
      <!-- contribution-author-start -->
      <p class="contribution-author" style="color: #6b7280; font-size: 14px; font-style: italic; margin-bottom: 16px;">✍️ Tác giả: <strong>${authorDisplayName}</strong></p>
      <!-- contribution-author-end -->
    `;

    const formattedContent = `
      ${adminMetaBlock}
      ${publicAuthorBlock}
      
      <p>${escapedContent.replace(/\n/g, '<br/>')}</p>
      
      ${uploadedImageUrl ? `<br/><img src="${uploadedImageUrl}" alt="${escapedTitle}" style="max-width: 100%; height: auto; border-radius: 8px;"/>` : ''}
    `;

    // 7.5 Phân loại Chuyên mục & Thẻ (Tags) cho WordPress
    let categoryId: number | undefined = undefined;
    if (category === 'Sự kiện nổi bật') {
      categoryId = 4; // ID danh mục "Sự kiện"
    } else if (category === 'Dinh dưỡng & tiêu hóa') {
      categoryId = 5; // ID danh mục "Dinh dưỡng & tiêu hóa"
    } else if (category === 'Sức khỏe & vệ sinh') {
      categoryId = 6; // ID danh mục "Sức khỏe & vệ sinh"
    } else if (category === 'Giáo dục') {
      categoryId = 14; // ID danh mục "Giáo dục"
    } else {
      // Tìm hoặc tạo chuyên mục "Góp ý" (slug: gop-y) cho các lựa chọn khác
      try {
        const catRes = await fetch(`${cleanWpApiUrl}/wp/v2/categories?slug=gop-y`, {
          headers: requestHeaders,
        });
        if (catRes.ok) {
          const catList = await catRes.json();
          if (catList.length > 0) {
            categoryId = catList[0].id;
          } else {
            const createCatRes = await fetch(`${cleanWpApiUrl}/wp/v2/categories`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...requestHeaders,
              },
              body: JSON.stringify({ name: 'Góp ý', slug: 'gop-y' }),
            });
            if (createCatRes.ok) {
              const newCat = await createCatRes.json();
              categoryId = newCat.id;
            }
          }
        }
      } catch (catError) {
        console.error('❌ Lỗi khi tự động xử lý chuyên mục "Góp ý":', catError);
      }
    }

    // Tự động tìm hoặc tạo thẻ (tag) "Góp ý" (slug: gop-y) để gắn vào bài viết
    let tagId: number | undefined = undefined;
    try {
      const tagSearchRes = await fetch(`${cleanWpApiUrl}/wp/v2/tags?slug=gop-y`, {
        headers: requestHeaders,
      });
      if (tagSearchRes.ok) {
        const tagsList = await tagSearchRes.json();
        if (tagsList.length > 0) {
          tagId = tagsList[0].id;
        } else {
          const tagCreateRes = await fetch(`${cleanWpApiUrl}/wp/v2/tags`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...requestHeaders,
            },
            body: JSON.stringify({ name: 'Góp ý', slug: 'gop-y' }),
          });
          if (tagCreateRes.ok) {
            const createdTag = await tagCreateRes.json();
            tagId = createdTag.id;
          }
        }
      }
    } catch (tagError) {
      console.error('❌ Lỗi khi tự động xử lý thẻ "Góp ý":', tagError);
    }

    // 8. Gọi REST API WordPress để tạo bài viết mới ở trạng thái 'pending' (Chờ duyệt)
    const postBody: Record<string, any> = {
      title: `[Đóng góp] ${escapedTitle}`,
      content: formattedContent,
      status: 'pending', // Trạng thái "Chờ duyệt" cực kỳ an toàn
      excerpt: publishMode === 'public'
        ? `Bài viết đóng góp từ thành viên ${escapedFullName}.`
        : `Bài viết đóng góp ẩn danh.`,
    };

    // Nếu có ID chuyên mục, liên kết vào bài viết
    if (categoryId) {
      postBody.categories = [categoryId];
    }

    // Nếu có ID thẻ "Góp ý", gắn vào bài viết
    if (tagId) {
      postBody.tags = [tagId];
    }

    // Nếu có ID ảnh đại diện chính, liên kết
    if (mediaId) {
      postBody.featured_media = mediaId;
    }

    const res = await fetch(`${cleanWpApiUrl}/wp/v2/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...requestHeaders,
      },
      body: JSON.stringify(postBody),
      signal: AbortSignal.timeout(8000), // Timeout sau 8 giây
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`WordPress REST API trả về lỗi: ${res.status} - ${errorText}`);
    }

    const createdPost = await res.json();
    console.log(`✅ Đã tạo thành công bài viết đóng góp ID ${createdPost.id} trong WordPress.`);

    return {
      success: true,
      message: 'Bài viết của bạn đã được gửi thành công và đang chờ Admin duyệt!',
      isMock: false,
      postId: createdPost.id,
      mediaId: mediaId,
    };

  } catch (error: any) {
    console.error('❌ Lỗi khi gửi bài viết đóng góp sang WordPress:', error);
    
    // Nếu gặp lỗi và chúng ta đã cấu hình WP, trả về lỗi thật
    const username = process.env.WP_AUTH_USERNAME;
    const appPassword = process.env.WP_AUTH_APPLICATION_PASSWORD;
    if (username && appPassword) {
      return {
        success: false,
        message: `Không thể gửi bài viết lên WordPress: ${error.message || 'Lỗi kết nối server'}`,
        isMock: false,
      };
    }
    
    // Chỉ fallback sang giả lập khi hoàn toàn chưa cấu hình API credentials
    return {
      success: true,
      message: 'Đã lưu lại bài viết của bạn dưới dạng dữ liệu dự phòng! Cảm ơn bạn đóng góp.',
      isMock: true,
      error: error.message || 'Lỗi không xác định',
    };
  }
}
