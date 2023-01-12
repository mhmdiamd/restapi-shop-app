import jwt from 'jsonwebtoken';
import HttpException from '../utils/Exceptions/http.exceptions.js';

export function generateToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
}

export function generateRefreshToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
}
