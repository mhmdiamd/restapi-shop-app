import { Router } from 'express';
import { registerSchema } from '../auth.validation.js';
import SellerAuthController from './seller-auth.controller.js';
import multer from 'multer';
import { sellerEmailActivation } from '../emailActivation.js';
import { authCheck } from '../../utils/Middlewares/auth.middleware.js';
import { getMyData } from '../token/token.controller.js';

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
    this.router.post(`${this.path}/register`, registerSchema, this.register);

    // get single category Route
    this.router.post(`${this.path}/login`, this.login);

    // User Verification
    this.router.get(`/sellers/verification/:token`, sellerEmailActivation);
  }
}

export default SellerAuthRouter;
