import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const options = {
  overwrite: true,
};

export const uploadPhotoCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (err) {
    throw err;
  }
};

export const deletePhotoCloudinary = async (idFile) => {
  try {
    const result = await cloudinary.uploader.destroy(idFile, options);
    return result;
  } catch (err) {
    throw err;
  }
};
