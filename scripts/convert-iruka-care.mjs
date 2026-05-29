import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const conversions = [
  {
    input: 'public/img_iruka_care/irukacare_tam_nhin.png',
    output: 'public/img_iruka_care/irukacare_tam_nhin.webp'
  },
  {
    input: 'public/img_iruka_care/irukacare_tam_nhin_mobile.png',
    output: 'public/img_iruka_care/irukacare_tam_nhin_mobile.webp'
  },
  {
    input: 'public/img_iruka_care/irukacare_su_menh.png',
    output: 'public/img_iruka_care/irukacare_su_menh.webp'
  },
  {
    input: 'public/img_iruka_care/irukacare_su_menh_mobile.png',
    output: 'public/img_iruka_care/irukacare_su_menh_mobile.webp'
  },
  {
    input: 'public/img_iruka_care/irukacare_cam_ket.png',
    output: 'public/img_iruka_care/irukacare_cam_ket.webp'
  },
  {
    input: 'public/img_iruka_care/irukacare_cam_ket_mobile.png',
    output: 'public/img_iruka_care/irukacare_cam_ket_mobile.webp'
  }
];

async function run() {
  console.log('🚀 Starting Iruka Care image optimization...');
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
