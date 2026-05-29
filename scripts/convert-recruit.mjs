import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const conversions = [
  {
    input: 'public/img_recruit/chu_dong_trach_nhiem_mobile.png',
    output: 'public/img_recruit/chu_dong_trach_nhiem_mobile.webp'
  },
  {
    input: 'public/img_recruit/chu_dong_trach_nhiem.png',
    output: 'public/img_recruit/chu_dong_trach_nhiem.webp'
  },
  {
    input: 'public/img_recruit/gan_ket_ho_tro_mobile.png',
    output: 'public/img_recruit/gan_ket_ho_tro_mobile.webp'
  },
  {
    input: 'public/img_recruit/recruit_banner_mobile.png',
    output: 'public/img_recruit/recruit_banner_mobile.webp'
  },
  {
    input: 'public/img_recruit/recruit_banner.png',
    output: 'public/img_recruit/recruit_banner.webp'
  },
  {
    input: 'public/img_recruit/ton_trong_minh_bach_mobile.png',
    output: 'public/img_recruit/ton_trong_minh_bach_mobile.webp'
  },
  {
    input: 'public/img_recruit/ton_trong_minh_bach.png',
    output: 'public/img_recruit/ton_trong_minh_bach.webp'
  }
];

async function run() {
  console.log('🚀 Starting Recruit image optimization...');
  for (const item of conversions) {
    const fullInputPath = path.resolve(item.input);
    const fullOutputPath = path.resolve(item.output);

    if (!fs.existsSync(fullInputPath)) {
      console.log(`⚠️ File not found: ${item.input}, skipping.`);
      continue;
    }

    try {
      const statsBefore = fs.statSync(fullInputPath);
      const sizeBeforeKb = (statsBefore.size / 1024).toFixed(1);

      await sharp(fullInputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(fullOutputPath);

      const statsAfter = fs.statSync(fullOutputPath);
      const sizeAfterKb = (statsAfter.size / 1024).toFixed(1);
      const savings = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);

      console.log(`✅ Converted: ${item.input} (${sizeBeforeKb} KB) ➡️ ${item.output} (${sizeAfterKb} KB) | Saved: ${savings}%`);

      // Delete the original source file to keep repo clean
      fs.unlinkSync(fullInputPath);
      console.log(`🗑️ Deleted old file: ${item.input}`);
    } catch (error) {
      console.error(`❌ Error converting ${item.input}:`, error);
    }
  }
  console.log('🎉 Optimization completed successfully!');
}

run();
