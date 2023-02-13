import CustomerModel from '../../customer/customer.model.js';
import SellerModel from '../../seller/seller.model.js';
import HttpException from '../../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../../utils/Helpers/response.js';
import { regenerateToken } from './token.service.js';
import jwt from 'jsonwebtoken';

export const getNewToken = async (req, res, next) => {
  const refreshToken = req.headers.authorization?.split(' ')[1];

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, payload) => {
    if (error) {
      return next(new HttpException(401, 'Token is Expired!'));
    }
    const { exp, iat, ...other } = payload;
    const { newAccessToken, newRefreshToken } = await regenerateToken(other, refreshToken);
    res.cookie('access_token', newAccessToken, {
      maxAge: (1 / 2) * 60 * 60 * 1000,
      httpOnly: true,
    });
    successResponse(res, 200, 'Success Refresh Token', {
      data: payload,
      token: newRefreshToken,
    });
  });
};

export const logout = async (req, res, next) => {
  res.cookie('access_token', { maxAge: 0 });
  res.status(200).send({
    message: 'Success Logout!',
  });
};

export const getMyData = async (req, res, next) => {
  const sellerModel = new SellerModel();
  const customerModel = new CustomerModel();
  const user = req.user;
  try {
    let data = '';  
    if (user.role == 'seller') {
      data = await sellerModel.getSellerById(user.id);
    } else {
      data = await customerModel.getCustomerById(user.id);
    }
    successResponse(res, 200, 'Success get user', { ...data, role: user.role });
  } catch (err) {
    console.log(err);
    next(new HttpException(err.status, err.message));
  }
};
