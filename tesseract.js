// tesseract.js
import Tesseract from 'https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/+esm';

/**
 * Menjalankan OCR untuk mengekstrak ekspresi matematika dari gambar.
 * @param {File} file - Gambar yang dipilih oleh pengguna
 * @returns {Promise<string>} - Ekspresi matematika hasil ekstraksi
 */
export async function extractMathExpression(file) {
  const { data: { text } } = await Tesseract.recognize(file, 'eng', {
    logger: m => console.log(m)
  });

  console.log("Hasil mentah OCR:", text);

  // Bersihkan teks menjadi ekspresi matematika yang valid
  const cleaned = text
    .replace(/[^\d\+\-\*\/\.\(\)=×÷]/g, '') // hanya simbol matematika & angka
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/=/g, ''); // opsional hilangkan tanda '='

  return cleaned;
}