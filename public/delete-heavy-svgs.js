const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const SIZE_THRESHOLD_MB = 1; // Chỉ xóa các file SVG lớn hơn 1MB
let deletedCount = 0;
let totalDeletedSize = 0;

const deleteHeavySVGs = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      deleteHeavySVGs(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      const fileSizeMB = stat.size / (1024 * 1024);
      
      // Xóa nếu là file SVG và nặng hơn threshold
      if (ext === '.svg' && fileSizeMB > SIZE_THRESHOLD_MB) {
        try {
          fs.unlinkSync(filePath);
          deletedCount++;
          totalDeletedSize += fileSizeMB;
          console.log(`🗑️ Đã xóa: ${file} (${fileSizeMB.toFixed(2)} MB)`);
        } catch (error) {
          console.error(`❌ Lỗi khi xóa ${file}:`, error.message);
        }
      }
    }
  }
};

console.log(`Bắt đầu quét và xóa các file SVG nặng hơn ${SIZE_THRESHOLD_MB}MB...`);
deleteHeavySVGs(targetDir);
console.log('-----------------------------------');
console.log(`✅ Hoàn thành! Đã xóa ${deletedCount} file SVG.`);
console.log(`📉 Tổng dung lượng giải phóng: ${totalDeletedSize.toFixed(2)} MB`);
console.log('-----------------------------------');
