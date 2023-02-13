import { Router } from 'express';
import { isCustomer, isSeller } from '../utils/Middlewares/auth.middleware.js';
import { authCheck } from '../utils/Middlewares/auth.middleware.js';
import OrderController from './order.controller.js';

class OrderRouter extends OrderController {
  path = '/orders';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get product by id Customer Router
    this.router.get(`${this.path}/customers/:id`, authCheck, this.getOrderByIdCustomer);

    // Get product by id Seller Router
    this.router.get(`${this.path}/sellers/:id`, authCheck, this.getOrderByIdSeller);

    // Create Chart Router
    this.router.post(`${this.path}/`, authCheck, isCustomer, this.createOrder);

    // Delete Cart By Id Customer Router
    this.router.delete(`${this.path}/:id`, authCheck, isSeller, this.deleteOrderById);

    // Update Chart Router
    this.router.put(`${this.path}/:id`, authCheck, this.updateOrderById);
  }
}

export default OrderRouter;
