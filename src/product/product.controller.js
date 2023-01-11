import ProductModel from './product.model.js';
import HttpException from '../utils/Errors/http.exceptions.js';
import { successResponse } from './../utils/Helpers/response.js';

class ProductController {
  #productModel = new ProductModel();

  // Get all Product
  getAllProduct = async (req, res, next) => {
    const filter = req.query;
    try {
      const products = await this.#productModel.getAllProduct(filter);
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
      const product = await this.#productModel.getProductById(id);

      // Success Response
      successResponse(res, 200, 'Success get all Product!', product);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Create Product
  createProduct = async (req, res, next) => {
    try {
      const createProduct = await this.#productModel.createProduct(req.body);

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
      const product = await this.#productModel.deleteProductById(id);

      // Success Response
      successResponse(res, 200, 'Success created Product!', { message: 'Product Deleted' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Updae Product By Id
  updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const productUpdated = await this.#productModel.updateProductById(id, data);
      successResponse(res, 200, `Success Update Product with ID ${id}`, { message: 'Product Updated' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default ProductController;
