// src/helpers/imageHelper.js
const sharp = require('sharp');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// 🔴 Nuevo límite: 3 MB
const FILE_SIZE_LIMIT = 3 * 1024 * 1024; // 3 MB

/**
 * Recibe un base64 (dataURL) y un nombre base, valida tamaño y tipo,
 * y devuelve { buffer, contentType, filename } listo para subir a S3.
 *
 * @param {string} imageData - dataURL tipo "data:image/png;base64,..."
 * @param {string} [imageName] - nombre base para el archivo
 */
function processImage(imageData, imageName = 'image') {
  if (!imageData) {
    throw new Error('No se recibió ninguna imagen');
  }

  const matches = imageData.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);

  if (!matches) {
    throw new Error('Formato de imagen inválido. Debe ser un data URL (base64).');
  }

  const contentType = matches[1];
  const base64Data = matches[2];

  if (!ALLOWED_MIME_TYPES.includes(contentType)) {
    throw new Error('Tipo de imagen no permitido. Usa JPG, PNG, GIF o WEBP.');
  }

  const buffer = Buffer.from(base64Data, 'base64');

  if (buffer.length > FILE_SIZE_LIMIT) {
    throw new Error('Imagen demasiado grande, máximo 3MB.');
  }

  // Podés procesar con sharp si querés redimensionar/comprimir
  const extension = contentType.split('/')[1] || 'png';
  const safeBaseName = imageName.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'image';
  const filename = `${safeBaseName}_${Date.now()}.${extension}`;

  return { buffer, contentType, filename };
}

module.exports = {
  processImage,
};
