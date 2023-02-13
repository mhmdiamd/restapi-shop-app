import { Router } from 'express';
import { customerRegisterSchema } from '../auth.validation.js';
import { buyerEmailActivation } from '../emailActivation.js';
import CustomerAuthController from './customer-auth.controller.js';

class CustomerAuthRouter extends CustomerAuthController {
  path = '/auth/customers';
  router = Router();

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    // get all Route
    this.router.post(`${this.path}/register`, customerRegisterSchema, this.register);
    // get single category Route
    this.router.post(`${this.path}/login`, this.login);

    // Buyer Email Activation
    this.router.get(`/customers/verification/:token`, buyerEmailActivation);
  }
}

export default CustomerAuthRouter;
