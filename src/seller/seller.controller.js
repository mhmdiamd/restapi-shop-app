import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import SellerModel from './seller.model.js';

class SellerController {
  #sellerModel = new SellerModel();

  // Get all Seller
  getAllSeller = async (req, res, next) => {
    try {
      const sellers = await this.#sellerModel.getAllSeller();
      successResponse(res, 200, 'Get all Sellers success!', sellers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Seller By Id
  getSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const seller = await this.#sellerModel.getSellerById(id);
      successResponse(res, 200, `Get seller with ID ${id} success!`, seller);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Seller
  deleteSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#sellerModel.deleteSellerById(id);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Seller Deleted',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Seller By Id
  updateSellerById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.#sellerModel.updateSellerById(id, data);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Seller Updated',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default SellerController;
