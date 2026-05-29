import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesToConvert = [
  'public/images/tam_nhin.png',
  'public/images/tam_nhin_mobile.png',
  'public/images/su_menh.png',
  'public/images/su_menh_mobile.png',
  'public/images/triet_li.png',
  'public/images/triet_li_mobile.png',
  'public/invest_img/commitment.png',
  'public/invest_img/how.png',
  'public/invest_img/tam_nhin_dai_han.png',
  'public/invest_img/opportunity.png',
  'public/invest_img/transformation.png'
];

async function convert() {
  console.log('🚀 Starting PNG to WebP conversion and optimization...');
  for (const imgPath of imagesToConvert) {
    const fullPath = path.resolve(imgPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ File not found: ${imgPath}, skipping.`);
      continue;
    }

    const dirName = path.dirname(fullPath);
    const extName = path.extname(fullPath);
    const baseName = path.basename(fullPath, extName);
    const outputPath = path.join(dirName, `${baseName}.webp`);

    try {
      const statsBefore = fs.statSync(fullPath);
      const sizeBeforeMb = (statsBefore.size / (1024 * 1024)).toFixed(2);

      await sharp(fullPath)
        .webp({ quality: 80, effort: 6 }) // 80 quality is visually identical but extremely optimized
        .toFile(outputPath);

      const statsAfter = fs.statSync(outputPath);
      const sizeAfterMb = (statsAfter.size / (1024 * 1024)).toFixed(2);
      const ratio = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);

      console.log(`✅ Converted: ${imgPath} (${sizeBeforeMb}MB) ➡️ ${baseName}.webp (${sizeAfterMb}MB) | Saved: ${ratio}%`);
      
      // Optionally delete the old PNG to keep the repo clean
      fs.unlinkSync(fullPath);
      console.log(`🗑️ Deleted old PNG: ${imgPath}`);
    } catch (error) {
      console.error(`❌ Error converting ${imgPath}:`, error);
    }
  }
  console.log('🎉 Optimization completed successfully!');
}

convert();
