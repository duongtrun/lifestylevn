import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const conversions = [
  {
    input: 'public/img_babego/babego_su_menh.png',
    output: 'public/img_babego/babego_su_menh.webp',
    type: 'png'
  },
  {
    input: 'public/img_babego/babego_su_menh_mobile.png',
    output: 'public/img_babego/babego_su_menh_mobile.webp',
    type: 'png'
  },
  {
    input: 'public/img_babego/babego_production1.svg',
    output: 'public/img_babego/babego_production1.webp',
    type: 'svg'
  },
  {
    input: 'public/img_babego/babego_production2.svg',
    output: 'public/img_babego/babego_production2.webp',
    type: 'svg'
  },
  {
    input: 'public/img_babego/babego_mascot.svg',
    output: 'public/img_babego/babego_mascot.webp',
    type: 'svg'
  }
];

async function run() {
  console.log('🚀 Starting Babego image optimization...');
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

      let processor = sharp(fullInputPath);
      if (item.type === 'svg') {
        // Resize large SVGs to 1000px width to ensure high clarity on all screen sizes while saving space
        processor = processor.resize(1000);
      }

      await processor
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
