import jwt from 'jsonwebtoken';

export function generateToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
}

export function generateRefreshToken(data) {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '3h',
  });
}
