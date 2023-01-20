import { Router } from 'express';
import { authCheck } from '../../utils/Middlewares/auth.middleware.js';
import { isYourCredentials } from '../../utils/Middlewares/credentials.middleware.js';
import { getNewToken } from './token.controller.js';

class TokenRouter {
  path = '/auth/refresh-token';
  router = Router();

  constructor() {
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    this.router.post(`${this.path}`, authCheck, isYourCredentials, getNewToken);

  }
}

export default TokenRouter;
