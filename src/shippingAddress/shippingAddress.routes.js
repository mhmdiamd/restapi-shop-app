import { Router } from 'express';
import { authCheck } from '../utils/Middlewares/auth.middleware.js';
import ShippingAddressController from './shippingAddress.controller.js';

class ShippingAddressRouter extends ShippingAddressController {
  path = '/shipping-address';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}`, this.getAllShippingAddress);
    this.router.post(`${this.path}`, authCheck, this.createShippingAddress);

    // Get User by id Router
    this.router.get(`${this.path}/customers/:id`, authCheck, this.getShippingAddressByIdCustomer);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteShippingAddressById);

    // Update User Router
    this.router.put(`${this.path}/:id`, authCheck, this.updateShippingAddressById);
  }
}

export default ShippingAddressRouter;
