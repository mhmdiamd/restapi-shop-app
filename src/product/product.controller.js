import ProductModel from './product.model.js';
import HttpException from '../utils/Errors/http.exceptions.js';

class ProductController {
  #productModel = new ProductModel();

  // Get all Product
  getAllProduct = async (req, res, next) => {
    const filter = req.query;
    try {
      const products = await this.#productModel.getAllProduct(filter);
      const { data, ...other } = products;
      res.status(200).send({
        status: 'success',
        statusCode: 200,
        data,
        ...other,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Product By Id
  getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const products = await this.#productModel.getProductById(id);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: products,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Create Product
  createProduct = async (req, res, next) => {
    console.log(req.body);
    try {
      const createProduct = await this.#productModel.createProduct(req.body);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        messgae: 'Product was created!',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Product
  deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await this.#productModel.deleteProductById(id);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Product Deleted',
      });
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
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Product Updated',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default ProductController;
