import { Router } from 'express';
import SellerController from './seller.controller.js';

class SellerRouter extends SellerController {
  path = '/sellers';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}/`, this.getAllSeller);

    // Get User by id Router
    this.router.get(`${this.path}/:id`, this.getSellerById);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteUserById);

    // Update User Router
    this.router.put(`${this.path}/:id`, this.updateUserById);
  }
}

export default SellerRouter;
