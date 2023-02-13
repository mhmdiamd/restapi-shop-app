import { Router } from 'express';
import { authCheck } from '../../utils/Middlewares/auth.middleware.js';
import { isYourCredentials } from '../../utils/Middlewares/credentials.middleware.js';
import { getMyData, getNewToken, logout } from './token.controller.js';

class TokenRouter {
  path = '/auth/refresh-token';
  router = Router();

  constructor() {
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    this.router.get(`${this.path}`, getNewToken);

    // Logout Authenticate
    this.router.post(`/auth/logout`, authCheck, logout);

    // Get data me
    this.router.get(`/me`, authCheck, getMyData);
  }
}

export default TokenRouter;
