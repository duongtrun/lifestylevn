const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

// 1. Quét toàn bộ file trong một thư mục
function getAllFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file === 'node_modules') continue;
      
      const filePath = path.join(dir, file);
      try {
        if (fs.statSync(filePath).isDirectory()) {
          getAllFiles(filePath, fileList);
        } else {
          fileList.push(filePath);
        }
      } catch (err) {
        // Bỏ qua các file lỗi (như symlink hỏng)
      }
    }
  } catch (err) {
    console.warn('Không thể đọc thư mục:', dir);
  }
  return fileList;
}

console.log('🔍 Đang quét thư mục public...');
const allPublicFiles = getAllFiles(publicDir);

// 2. Phân chia svg và webp
const webpFiles = new Set();
const svgFiles = [];

allPublicFiles.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.webp') {
    webpFiles.add(file);
  } else if (ext === '.svg') {
    svgFiles.push(file);
  }
});

// 3. Tạo danh sách các thay thế
// Chỉ thay thế những file .svg CÓ tồn tại file .webp tương ứng
const replacements = [];

svgFiles.forEach(svgPath => {
  const parsed = path.parse(svgPath);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
  
  if (webpFiles.has(webpPath)) {
    // Chuyển đổi thành đường dẫn tĩnh bắt đầu bằng / (chuẩn của Next.js public)
    // Ví dụ: public\img\logo.svg -> /img/logo.svg
    let relativeSvgUrl = '/' + path.relative(publicDir, svgPath).split(path.sep).join('/');
    let relativeWebpUrl = '/' + path.relative(publicDir, webpPath).split(path.sep).join('/');
    
    replacements.push({
      oldUrl: relativeSvgUrl,
      newUrl: relativeWebpUrl
    });
  }
});

console.log(`✅ Tìm thấy ${svgFiles.length} file .svg và ${webpFiles.size} file .webp`);
console.log(`✅ Lọc được ${replacements.length} file .svg có phiên bản .webp để thay thế.`);

if (replacements.length === 0) {
  console.log('Không có gì để thay thế. Kết thúc.');
  process.exit(0);
}

// 4. Quét và thay thế trong src
function updateSrcFiles(dir) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      updatedCount += updateSrcFiles(filePath);
    } else {
      const ext = path.extname(filePath).toLowerCase();
      // Các đuôi file cần quét
      if (['.tsx', '.ts', '.jsx', '.js', '.css', '.json'].includes(ext)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanged = false;

        replacements.forEach(({ oldUrl, newUrl }) => {
          // Escape ký tự đặc biệt của URL để đưa vào Regex
          const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(escapeRegExp(oldUrl), 'g');
          
          if (regex.test(content)) {
            content = content.replace(regex, newUrl);
            hasChanged = true;
          }
        });

        if (hasChanged) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`📝 Đã cập nhật file: ${path.relative(__dirname, filePath)}`);
          updatedCount++;
        }
      }
    }
  }
  return updatedCount;
}

console.log('\n🔍 Đang quét và thay thế code trong thư mục src...');
const updatedFilesCount = updateSrcFiles(srcDir);

console.log(`\n🎉 HOÀN TẤT! Đã cập nhật đuôi .webp thành công cho ${updatedFilesCount} file trong src.`);
