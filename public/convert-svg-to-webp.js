const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = __dirname;
const SIZE_THRESHOLD_MB = 0.5; // Các file nặng hơn 0.5MB (500KB) sẽ bị convert
let count = 0;

const convertHeavySVGs = async (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      await convertHeavySVGs(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      const fileSizeMB = stat.size / (1024 * 1024);
      
      // Chỉ xử lý các file SVG nặng hơn threshold
      if (ext === '.svg' && fileSizeMB > SIZE_THRESHOLD_MB) {
        // Tạo đường dẫn file mới (.webp)
        const newFilePath = filePath.replace(/\.svg$/i, '.webp');
        
        try {
          // Dùng sharp để đọc SVG và render ra WebP
          await sharp(filePath, { unlimited: true })
            .webp({ quality: 80 })
            .toFile(newFilePath);
            
          count++;
          console.log(`✅ Đã convert: ${file} (${fileSizeMB.toFixed(2)} MB) -> ${path.basename(newFilePath)}`);
          
          // (Tuỳ chọn) Nếu bạn muốn tự động xoá file SVG gốc thì bỏ comment dòng bên dưới:
          // fs.unlinkSync(filePath); 
          
        } catch (error) {
          console.error(`❌ Lỗi khi convert ${file}:`, error.message);
        }
      }
    }
  }
};

console.log(`Bắt đầu quét và convert các file SVG nặng hơn ${SIZE_THRESHOLD_MB}MB...`);
convertHeavySVGs(targetDir).then(() => {
  console.log('-----------------------------------');
  console.log(`🎉 Hoàn thành! Đã tạo thành công ${count} file .webp siêu nhẹ.`);
  console.log('Lưu ý: Hãy vào code sửa đường dẫn ảnh từ .svg thành .webp nhé!');
  console.log('-----------------------------------');
});
