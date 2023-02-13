import { Router } from 'express';
import { isCustomer } from '../utils/Middlewares/auth.middleware.js';
import CartController from './cart.controller.js';
import { authCheck } from './../utils/Middlewares/auth.middleware.js';

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
    this.router.get(`${this.path}/:id/customers`, authCheck, this.getCartByIdCustomer);

    // Create Chart Router
    this.router.post(`${this.path}/`, authCheck, isCustomer, this.createCart);

    // Delete Chart Router
    this.router.delete(`${this.path}/:id`, this.deleteCartById);

    // Delete Cart By Id Customer Router
    this.router.delete(`${this.path}/customers/:id`, authCheck, this.deleteCartByIdCustomer);

    // Update Chart Router
    this.router.put(`${this.path}/:id`, authCheck, this.updateCartById);
  }
}

export default CartRouter;
