import { Router } from 'express';
import { isBuyer } from '../utils/Middlewares/auth.middleware.js';
import CartController from './cart.controller.js';

class CartRouter extends CartController {
  path = '/carts';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all Chart Router
    this.router.get(`${this.path}/`, this.getAllCart);

    // Get product by id Router
    this.router.get(`${this.path}/:id`, this.getCartById);

    // Get product by id_buyer Router
    this.router.get(`${this.path}/:id_buyer/buyers`, this.getCartByIdBuyer);

    // Create Chart Router
    this.router.post(`${this.path}/`, isBuyer, this.createCart);

    // Delete Chart Router
    this.router.delete(`${this.path}/:id`, this.deleteCartById);

    // Update Chart Router
    this.router.put(`${this.path}/:id`, this.updateCartById);
  }
}

export default CartRouter;
