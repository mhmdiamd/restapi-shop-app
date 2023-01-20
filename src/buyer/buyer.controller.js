import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import BuyerModel from './buyer.model.js';

class BuyerController {
  #buyerModel = new BuyerModel();
  #ENDPOINT = 'api/v1/buyers';

  // Get all Buyer
  getAllBuyer = async (req, res, next) => {
    try {
      const buyers = await this.#buyerModel.getAllBuyer();
      successResponse(res, 200, 'Get all Sellers success!', buyers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Buyer By Id
  getBuyerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const buyer = await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
        return await this.#buyerModel.getBuyerById(id);
      });
      successResponse(res, 200, `Get buyer with ID ${id} success!`, buyer);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Buyer
  deleteBuyerById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      await this.#buyerModel.deleteBuyerById(id);
      successResponse(res, 200, `Delete buyer with ID ${id} success!`, { message: 'Buyer Deleted!' });
      await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Buyer By Id
  updateBuyerById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const buyers = await this.#buyerModel.updateBuyerById(id, data);
      await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
        return buyers;
      });
      successResponse(res, 200, `Update buyer with ID ${id} success!`, { message: 'Buyer Updated!' });
      await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default BuyerController;
