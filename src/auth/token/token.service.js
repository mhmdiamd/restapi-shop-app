import { generateRefreshToken, generateToken } from '../token.js';
import { dbRepo } from '../../../Config/db.config.js';

export const createRefreshToken = async (token) => {
  return await dbRepo.query(`INSERT INTO refresh_tokens VALUES(DEFAULT, '${token}')`);
};

export async function checkTokenInDB(token) {
  const getToken = await dbRepo.query(`SELECT * FROM refresh_tokens WHERE token='${token}'`);
  if (!getToken.rowCount) {
    throw { message: 'Token is Invalid!' };
  }
  return getToken.rows;
}

export async function checkTokenError(error, token) {
  switch (error.name) {
    case 'TokenExpiredError':
      await dbRepo.query(`DELETE FROM refresh_tokens WHERE token='${token}'`);
      throw { message: 'Token is Expired' };
  }
}

export async function regenerateToken(user, oldToken) {
  const newAccessToken = generateToken(user);
  const newRefreshToken = generateRefreshToken(user);

  await dbRepo.query(`INSERT INTO refresh_tokens VALUES(DEFAULT, '${newRefreshToken}')`);
  await dbRepo.query(`DELETE FROM refresh_tokens WHERE token='${oldToken}'`);

  return { newAccessToken, newRefreshToken };
}
