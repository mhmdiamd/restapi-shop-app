import HttpException from '../Exceptions/http.exceptions.js';
import jwt from 'jsonwebtoken';
import ProductModel from './../../product/product.model.js';

const productModel = new ProductModel();

// Authenticate Middleware
export const authCheck = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new HttpException(401, 'Unauthenticate, access denied!'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return next(new HttpException(403, 'Token is invalid'));
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

    if (req.user.id == idSellerProduct) {
      return next();
    }

    next(new HttpException(401, 'Unauthorized, you not have access!'));
  });
};

// is Buyer Middleware
export const isCustomer = async (req, res, next) => {
  if (req.user.role != 'customer') {
    return next(new HttpException(401, 'Unauthorized, you are not buyer!'));
  }
  next();
};

// is Seller Middleware
export const isSeller = async (req, res, next) => {
  authCheck(req, res, () => {
    console.log(req.user.role);
    if (req.user.role != 'seller') {
      return next(new HttpException(401, 'Unauthorized, you are not seller!'));
    }
    return next();
  });
};
