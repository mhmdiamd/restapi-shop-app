import ProductModel from './product.model.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from './../utils/Helpers/response.js';
import { clearRedisCache, setOrGetCache } from '../../Config/redis.js';

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
      const product = await setOrGetCache(`api/v1/products/${id}`, async () => {
        return await this.#productModel.getProductById(id);
      });

      successResponse(res, 200, 'Success get all Product!', product);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Product By Id Seller
  getProductByIdSeller = async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await setOrGetCache(`api/v1/products/${id}/sellers`, async () => {
        return await this.#productModel.getProductByIdSeller(id);
      });

      // Success Response
      successResponse(res, 200, `Success get Products with id seller ${id}!`, product);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Create Product
  createProduct = async (req, res, next) => {
    // Get File
    const photo = req.file;
    // Create file name
    const photoUrl = `${process.env.HOST}:${process.env.PORT}${process.env.PRODUCT_UPLOAD_DIR}${photo.filename}`;
    // Get Id user login
    const { id } = req.user;
    // merge data before send to model
    const data = { ...req.body, id_seller: id, photo: photoUrl };

    try {
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
      await clearRedisCache(`api/v1/products/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Product By Id
  updateProductById = async (req, res, next) => {
    // Get File
    const photo = req.file;
    // Create file name
    const photoUrl = `${process.env.HOST}:${process.env.PORT}${process.env.PRODUCT_UPLOAD_DIR}${photo.filename}`;
    // Get Id user login
    const { id } = req.params;
    // merge data before send to model
    const data = { ...req.body, id_seller: id, photo: photoUrl };

    try {
      await this.#productModel.updateProductById(id, data);

      successResponse(res, 200, `Success Update Product with ID ${id}`, { message: 'Product Updated' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default ProductController;
