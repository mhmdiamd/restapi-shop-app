import HttpException from '../../utils/Exceptions/http.exceptions.js';
import SellerModel from './seller-auth.model.js';
import bcrypt from 'bcryptjs';
import { generateRefreshToken, generateToken } from '../token.js';
import multer from 'multer';
import { createRefreshToken } from '../refreshToken.js';

class SellerAuthController {
  #sellerModel = new SellerModel();

  // User Register
  register = async (req, res, next) => {
    const userPassword = req.user.password;

    // Hasing password
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(userPassword, salt);

    const user = { ...req.user, password };
    console.log(user);
    try {
      await this.#sellerModel.register(user);
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
    try {
      const userLogin = await this.#sellerModel.login(req.body);
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

export default SellerAuthController;
