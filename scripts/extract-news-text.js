const mammoth = require('mammoth');
const path = require('path');
const fs = require('fs');

const docxPath = path.join(__dirname, '../news_recruit/news/ND web cũ.docx');
const outputPath = path.join(__dirname, '../news_recruit/news_extracted_text.txt');

console.log(`Extracting raw text from: ${docxPath}`);

// We configure mammoth to ignore images entirely to avoid huge base64 strings and memory limit issues
const options = {
    ignoreEmptyParagraphs: false,
    convertImage: mammoth.images.imgElement(function(image) {
        return Promise.resolve({
            src: "" // empty image source
        });
    })
};

mammoth.convertToMarkdown({ path: docxPath }, options)
  .then((result) => {
    fs.writeFileSync(outputPath, result.value);
    console.log(`Success! Extracted raw text written to: ${outputPath}`);
    console.log(`Warnings count: ${result.messages.length}`);
  })
  .catch((err) => {
    console.error('Error extracting text:', err);
  });
