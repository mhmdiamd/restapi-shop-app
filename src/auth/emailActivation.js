import jwt from 'jsonwebtoken';
import SellerModel from './seller/seller-auth.model.js';
import bcrypt from 'bcryptjs';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import BuyerModel from './buyer/buyer-auth.model.js';
import { successResponse } from '../utils/Helpers/response.js';

const sellerModel = new SellerModel();
const buyerModel = new BuyerModel();

export const sellerEmailActivation = async (req, res, next) => {
  const { token } = req.params;
  jwt.verify(token, process.env.EMAIL_ACTIVATION_TOKEN, async (err, user) => {
    if (err) {
      return next(new HttpException(500, err.message));
    }
    try {
      var salt = bcrypt.genSaltSync(10);
      var password = bcrypt.hashSync(user.password, salt);
      user = { ...user, password };

      await sellerModel.register(user);

      successResponse(res, 201, 'Register success!', {});
    } catch (err) {
      if (err.message.includes('duplicate')) {
        next(new HttpException(err.status, 'Email has already taken!'));
      }
      next(new HttpException(err.status, err.message));
    }
  });
};

export const buyerEmailActivation = async (req, res, next) => {
  const { token } = req.params;
  jwt.verify(token, process.env.EMAIL_ACTIVATION_TOKEN, async (err, user) => {
    if (err) {
      return next(new HttpException(500, err.message));
    }
    try {
      var salt = bcrypt.genSaltSync(10);
      var password = bcrypt.hashSync(user.password, salt);
      user = { ...user, password };

      await buyerModel.register(user);

      successResponse(res, 201, 'Register success!', {});
    } catch (err) {
      if (err.message.includes('duplicate')) {
        next(new HttpException(err.status, 'Email has already taken!'));
      }

      next(new HttpException(err.status, err.message));
    }
  });
};
