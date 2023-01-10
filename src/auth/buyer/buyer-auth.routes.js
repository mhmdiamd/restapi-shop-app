import { Router } from 'express';
import { registerSchema } from '../auth.validation.js';
import BuyerAuthController from './buyer-auth..controller.js';

class BuyerAuthRouter extends BuyerAuthController {
  path = '/auth/buyers';
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

export default BuyerAuthRouter;
