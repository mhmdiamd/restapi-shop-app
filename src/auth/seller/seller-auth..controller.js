import HttpException from '../../utils/Errors/http.exceptions.js';
import { registerSchema } from '../auth.validation.js';
import SellerModel from './seller-auth.model.js';

class SellerAuthController {
  #sellerModel = new SellerModel();

  // User Register
  register = async (req, res, next) => {
    const user = req.user;
    try {
      const newSeller = await this.#sellerModel.register(user);
      res.status(200).json({
        status: 'success',
        statusCode: 201,
        message: 'Register success!',
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // User Login
  login = async (req, res, next) => {
    const data = req.body;
  };
}

export default SellerAuthController;
