import multer from 'multer';
import path from 'path';
import HttpException from './../src/utils/Exceptions/http.exceptions.js';

export const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images/Products');
  },
  filename: (req, file, cb) => {
    const imageName = new Date().getTime().toString();
    cb(null, file.fieldname + '-' + imageName + path.extname(file.originalname));
  },
});

export const multerStorage = (storage) => {
  const maxSize = 2 * 1000 * 1000;
  return multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      const acceptedTypeFile = ['jpg', 'png', 'jpeg'];
      // Get Extension file
      const extFile = path.extname(file.originalname).split('.')[1];
      if (!acceptedTypeFile.includes(extFile.toLowerCase())) {
        return cb(new HttpException(422, 'File should png or jpg! '));
      }
      cb(null, file);
    },
  });
};
