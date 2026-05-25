import mammoth from 'mammoth';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docxPath = path.join(__dirname, '../news_recruit/achieve/nội dung thành tựu (1).docx');
const mdPath = path.join(__dirname, '../news_recruit/achieve/extracted.md');

console.log(`Reading DOCX from: ${docxPath}`);

mammoth.convertToMarkdown({ path: docxPath })
  .then((result) => {
    fs.writeFileSync(mdPath, result.value);
    console.log(`Success! Extracted markdown written to: ${mdPath}`);
    if (result.messages.length > 0) {
      console.log('Warnings:', result.messages);
    }
  })
  .catch((err) => {
    console.error('Error extracting text:', err);
  });
