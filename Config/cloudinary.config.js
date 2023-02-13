import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'dlm6eh9tl',
  api_key: '587554187347974',
  api_secret: 'ukYOHVHKUf-sgf7ir73WKuLmh5Q',
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
