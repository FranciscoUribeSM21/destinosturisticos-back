// utils/gcpUpload.js
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
// Parseamos la variable de entorno
const credentials = JSON.parse(process.env.GCP_KEY);

const storage = new Storage({
  projectId: credentials.project_id,
  credentials, // usamos directamente la info de GCP_KEY
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

/**
 * Sube un archivo temporal a GCP y devuelve la URL pública
 * @param {Express.Multer.File} file
 * @returns {Promise<string>} URL pública del archivo
 */
const uploadImageToGCP = async (file) => {
  const destination = `${Date.now()}_${file.originalname}`;
  await bucket.upload(file.path, {
    destination,
    contentType: file.mimetype,
    public: true, // hace pública la imagen
  });
  // Borra el archivo temporal
  fs.unlinkSync(file.path);
  return `https://storage.googleapis.com/${bucket.name}/${destination}`;
};

module.exports = { uploadImageToGCP };
