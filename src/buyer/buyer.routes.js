import { Router } from 'express';
import BuyerController from './buyer.controller.js';

class BuyerRouter extends BuyerController {
  path = '/buyers';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}/`, this.getAllBuyer);

    // Get User by id Router
    this.router.get(`${this.path}/:id`, this.getBuyerById);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteBuyerById);

    // Update User Router
    this.router.put(`${this.path}/:id`, this.updateBuyerById);
  }
}

export default BuyerRouter;
