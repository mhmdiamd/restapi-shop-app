import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import { generateRefreshToken, generateToken } from './token.js';
import jwt from 'jsonwebtoken';

export const getRefreshToken = async (req, res, next) => {
  const { token } = req.body;

  const oldRefreshToken = await dbRepo.query(`SELECT * FROM refresh_tokens WHERE token='${token}'`);

  if (!oldRefreshToken.rowCount) {
    return res.status(404).send({
      statusCode: 404,
      message: 'Token is invalid!',
    });
  }
  const isInvalidToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, payload) => {
    if (error.name == 'TokenExpiredError') {
      // console.log(error);
      await dbRepo.query(`DELETE FROM refresh_tokens WHERE token='${token}'`);
      return res.status(500).send({
        statusCode: 500,
        message: 'Token is Expired',
      });
    } else {
      const { iat, exp, ...user } = req.user;
      const newAccessToken = generateToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await dbRepo.query(`INSERT INTO refresh_tokens VALUES(DEFAULT, '${newRefreshToken}') `);
      await dbRepo.query(`DELETE FROM refresh_tokens WHERE token='${token}'`);

      successResponse(res, 200, 'Success Refresh Token!', {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
  });
};

export const createRefreshToken = async (token) => {
  return await dbRepo.query(`INSERT INTO refresh_tokens VALUES(DEFAULT, '${token}')`);
};
