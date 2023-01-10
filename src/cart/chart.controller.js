import HttpException from '../utils/Errors/http.exceptions.js';
import ChartModel from './chart.model.js';

class ChartController {
  #chartModel = new ChartModel();

  // Get all Product
  getAllProduct = async (req, res, next) => {
    const filter = req.query;
    try {
      const products = await this.#chartModel.getAllProduct(filter);
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
      const products = await this.#chartModel.getProductById(id);
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
    try {
     await this.#chartModel.createProduct(req.body);
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
      await this.#chartModel.deleteProductById(id);
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
      await this.#chartModel.updateProductById(id, data);
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

export default ChartController;
