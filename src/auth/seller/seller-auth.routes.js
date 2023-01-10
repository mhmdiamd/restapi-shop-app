import { Router } from 'express';
import { registerSchema } from '../auth.validation.js';
import SellerAuthController from './seller-auth..controller.js';

class SellerAuthRouter extends SellerAuthController {
  path = '/auth/sellers';
  router = Router();

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    // get all Route
    this.router.post(`${this.path}/register`, registerSchema, this.register);
    // get single category Route
    this.router.post(`${this.path}/login`, this.login);
  }
}

export default SellerAuthRouter;
