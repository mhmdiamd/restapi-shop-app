import HttpException from '../../utils/Exceptions/http.exceptions.js';
import BuyerModel from './buyer-auth.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from './../token.js';

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
    try {
      const userLogin = await this.#buyerModel.login(req.body);
      const accessToken = generateToken(userLogin);

      res.cookie('access_token', accessToken, {
        httpOnly: true,
      });

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Login success!',
        data: userLogin,
        accessToken,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default BuyerAuthController;
