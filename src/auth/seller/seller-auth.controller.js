import HttpException from '../../utils/Exceptions/http.exceptions.js';
import SellerModel from './seller-auth.model.js';
import { generateRefreshToken, generateToken } from '../token.js';
import { sendEmailActivation } from '../../../Config/nodemailer.config.js';
import { successResponse } from '../../utils/Helpers/response.js';

class SellerAuthController {
  #sellerModel = new SellerModel();

  // User Register
  register = async (req, res, next) => {
    sendEmailActivation(req.user, 'seller')
      .then((response) => {
        successResponse(res, 200, 'Check your email for activation email!', {});
      })
      .catch((err) => {
        next(new HttpException(500, err.message));
      });
  };

  // User Login
  login = async (req, res, next) => {
    try {
      const userLogin = await this.#sellerModel.login(req.body);
      const accessToken = generateToken(userLogin);
      const refreshToken = generateRefreshToken(userLogin);

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: (1 / 2) * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Login success!',
        data: userLogin,
        token: refreshToken,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default SellerAuthController;
