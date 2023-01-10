import HttpException from '../utils/Errors/http.exceptions.js';
import SellerModel from './seller.model.js';

class SellerController {
  #sellerModel = new SellerModel();

  // Get all Seller
  getAllSeller = async (req, res, next) => {
    try {
      const sellers = await this.#sellerModel.getAllSeller();
      res.status(200).send({
        status: 'success',
        statusCode: 200,
        data: sellers,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Seller By Id
  getSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const seller = await this.#sellerModel.getSellerById(id);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: seller,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Seller
  deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const seller = await this.#sellerModel.deleteUserById(id);
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
  updateUserById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    try {
      const userUpdated = await this.#sellerModel.updateUserById(id, data);
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
