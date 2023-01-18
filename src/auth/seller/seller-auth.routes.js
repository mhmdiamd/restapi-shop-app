import { Router } from 'express';
import { registerSchema } from '../auth.validation.js';
import SellerAuthController from './seller-auth.controller.js';
import multer from 'multer';
import { authCheck } from '../../utils/Middlewares/auth.middleware.js';
import { generateRefreshToken, generateToken } from './../token.js';
import { getRefreshToken } from '../refreshToken.js';

class SellerAuthRouter extends SellerAuthController {
  path = '/auth/sellers';
  router = Router();
  upload = multer();

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    // get all Route
    this.router.post(`${this.path}/register`, this.upload.any(), registerSchema, this.register);
    // get single category Route
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`/auth/refresh-token`, authCheck, getRefreshToken);
  }
}

export default SellerAuthRouter;
