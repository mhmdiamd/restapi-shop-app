import ProductModel from './product.model.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from './../utils/Helpers/response.js';
import { auth, createAndUpload, updatePhoto } from '../../Config/googleDrive.config.js';
import { deletePhotoCloudinary, uploadPhotoCloudinary } from '../../Config/cloudinary.config.js';

class ProductController {
  #productModel = new ProductModel();

  // Get all Product
  getAllProduct = async (req, res, next) => {
    const filter = req.query;
    try {
      const products = await this.#productModel.getAllProduct(filter);

      // seting redis before data response to client!
      const { data, ...other } = products;

      // Success Response
      successResponse(res, 200, 'Success get all Product!', { data, pagination: other });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Product By Id
  getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const product = await setOrGetCache(`api/v1/products/${id}`, async () => {
      //   return await this.#productModel.getProductById(id);
      // });

      const product = await this.#productModel.getProductById(id);

      successResponse(res, 200, 'Success get all Product!', product);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Product By Id Seller
  getProductByIdSeller = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    try {
      if (id != 'undefined') {
        const product = await this.#productModel.getProductByIdSeller(id);
        successResponse(res, 200, `Success get Products with id seller ${id}!`, product);
      }

      const product = await this.#productModel.getProductByIdSeller(user.id);
      successResponse(res, 200, `Success get Products with id seller ${user.id}!`, product);

      // Success Response
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Product By Id Seller
  getProductByIdCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const product = await setOrGetCache(`api/v1/products/${id}/sellers`, async () => {
      //   return await this.#productModel.getProductByIdSeller(id);
      // });
      const product = await this.#productModel.getProductByIdCategory(id);
      // Success Response
      successResponse(res, 200, `Success get Products with id category ${id}!`, product);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Create Product
  createProduct = async (req, res, next) => {
    // Get File
    const photo = req.file;

    if (!photo) {
      return res.status(403).send({
        status: 'failed',
        message: 'Please input the photo',
      });
    }


    try {
      // Upload to Google Drive
      const uploadPhoto = await createAndUpload(auth, photo);
      // Create file name
      const photoUrl = `https://drive.google.com/uc?id=${uploadPhoto.id}`;
      // Get Id user login
      const { id, store_name } = req.user;
      // merge data before send to model
      const data = { ...req.body, id_seller: id, store_name, photo: photoUrl };

      await this.#productModel.createProduct(data);
      // Success Response
      successResponse(res, 200, 'Success created Product!', { message: 'Product was created!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Product
  deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#productModel.deleteProductById(id);
      // Success Response
      successResponse(res, 200, 'Success created Product!', { message: 'Product Deleted' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Product By Id
  updateProductById = async (req, res, next) => {
    // Get File

    // Get Id user login
    const { id } = req.params;

    let photo = '';
    let photoUrl = undefined;

    // merge data before send to model
    try {
      if (req.file) {
        photo = req.file;
        const oldProduct = await this.#productModel.getProductById(id);

        const uploadPhoto = await uploadPhotoCloudinary(photo.path);
        photoUrl = uploadPhoto.secure_url;

        if (updatePhoto) {
          const photoLength = oldProduct.photo.split('/').length;
          const idFile = oldProduct.photo.split('/')[photoLength - 1].split('.')[0];
          await deletePhotoCloudinary(idFile);
        }
        
      }

      const data = { ...req.body, id_seller: id, photo: photoUrl };
      await this.#productModel.updateProductById(id, data);
      successResponse(res, 200, `Success Update Product with ID ${id}`, { message: 'Product Updated' });
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };
}

export default ProductController;
