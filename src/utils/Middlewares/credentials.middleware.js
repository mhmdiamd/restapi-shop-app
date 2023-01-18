import jwt from 'jsonwebtoken';
import { checkTokenError, checkTokenInDB } from '../../auth/token/token.service.js';
import HttpException from '../Exceptions/http.exceptions.js';

export function isYourCredentials(req, res, next) {
  const accessToken = req.user;
  checkTokenInDB(req.body.token)
    .then((response) => response[0].token)
    .then((refreshToken) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
        if (err) {
          checkTokenError(err).catch((err) => next(new HttpException(403, err.message)));
        }

        if (accessToken.role == payload.role && accessToken.id == payload.id) {
          const { iat, exp, ...user } = payload;
          req.user = user;
          return next();
        }

        res.status(403).send({
          statusCode: 403,
          message: 'Access denied!',
        });
      });
    })
    .catch((err) => {
      next(new HttpException(403, err.message));
    });
}
