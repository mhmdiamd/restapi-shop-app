import HttpException from '../utils/Errors/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import BuyerModel from './buyer.model.js';

class BuyerController {
  #buyerModel = new BuyerModel();

  // Get all Buyer
  getAllBuyer = async (req, res, next) => {
    try {
      const sellers = await this.#buyerModel.getAllBuyer();
      successResponse(res, 200, 'Get all Sellers success!', sellers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Buyer By Id
  getBuyerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const buyer = await this.#buyerModel.getBuyerById(id);
      successResponse(res, 200, `Get buyer with ID ${id} success!`, buyer);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Buyer
  deleteBuyerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#buyerModel.deleteBuyerById(id);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Buyer Deleted',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Buyer By Id
  updateBuyerById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.#buyerModel.updateBuyerById(id, data);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Buyer Updated',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default BuyerController;
