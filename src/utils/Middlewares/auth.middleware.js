import HttpException from '../Exceptions/http.exceptions.js';
import jwt from 'jsonwebtoken';
import ProductModel from './../../product/product.model.js';

const productModel = new ProductModel();

// Authenticate Middleware
export const authCheck = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new HttpException(401, 'Unauthenticate, you not have access!'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return next(new HttpException(403, 'token is not valid!'));
    }
    req.user = payload;
    return next();
  });
};

export const isUser = async (req, res, next) => {
  authCheck(req, res, () => {
    if (req.user.id == req.params.id) {
      return next();
    }

    next(new HttpException(401, 'Unauthorized, you not have access!'));
  });
};

// Check if is your product!
export const isYourPoduct = async (req, res, next) => {
  authCheck(req, res, async () => {
    const idSellerProduct = await productModel
      .getProductById(req.params.id)
      .then((res) => res.id_seller)
      .catch((err) => next(new HttpException(err.status, err.message)));

    console.log(idSellerProduct);
    if (req.user.id == idSellerProduct) {
      return next();
    }

    next(new HttpException(401, 'Unauthorized, you not have access!'));
  });
};

export const isBuyer = async (req, res, next) => {
  authCheck(req, res, next, () => {
    if (req.user.role != 'buyer') {
      return next(new HttpException(401, 'Unauthorized, you are not buyer!'));
    }
    return next();
  });
};
