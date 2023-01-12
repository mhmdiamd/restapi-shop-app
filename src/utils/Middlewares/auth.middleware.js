import HttpException from '../Exceptions/http.exceptions.js';
import jwt from 'jsonwebtoken';

export const authCheck = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new HttpException(401, 'Unauthenticate, you not have access!'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      next(new HttpException(403, 'token is not valid!'));
    }
    req.user = payload;
    next();
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
