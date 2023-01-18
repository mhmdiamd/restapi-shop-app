import HttpException from '../../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../../utils/Helpers/response.js';
  import { regenerateToken } from './token.service.js';

export const getNewToken = async (req, res, next) => {
  const { token } = req.body;
  const user = req.user;
  try {
    const { newAccessToken, newRefreshToken } = await regenerateToken(user, token);
    successResponse(res, 200, 'Success Refresh Token', {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(new HttpException(err.status, err.message));
  }
};
