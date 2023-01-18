import HttpException from '../../utils/Exceptions/http.exceptions.js';
import BuyerModel from './buyer-auth.model.js';
import bcrypt from 'bcryptjs';
import { generateRefreshToken, generateToken } from '../token.js';
import { successResponse } from '../../utils/Helpers/response.js';
import { createRefreshToken } from '../token/token.service.js';
import { token } from 'morgan';

class BuyerAuthController {
  #buyerModel = new BuyerModel();

  // User Register
  register = async (req, res, next) => {
    const userPassword = req.user.password;

    // Hasing password
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(userPassword, salt);

    const user = { ...req.user, password };
    try {
      await this.#buyerModel.register(user);
      successResponse(res, 200, 'Register Success please Login!', { message: 'Register success!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // User Login
  login = async (req, res, next) => {
    try {
      const userLogin = await this.#buyerModel.login(req.body);
      const accessToken = generateToken(userLogin);
      const refreshToken = generateRefreshToken(userLogin);

      res.cookie('access_token', accessToken, {
        httpOnly: true,
      });

      await createRefreshToken(refreshToken);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Login success!',
        data: userLogin,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default BuyerAuthController;
