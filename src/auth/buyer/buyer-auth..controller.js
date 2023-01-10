import HttpException from '../../utils/Errors/http.exceptions.js';
import BuyerModel from './buyer-auth.model.js';

class BuyerAuthController {
  #buyerModel = new BuyerModel();

  // User Register
  register = async (req, res, next) => {
    const user = req.user;
    try {
      const newBuyer = await this.#buyerModel.register(user);
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

export default BuyerAuthController;
