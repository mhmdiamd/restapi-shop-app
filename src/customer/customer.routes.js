import { Router } from 'express';
import CustomerController from './customer.controller.js';

class CustomerRouter extends CustomerController {
  path = '/customers';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}/`, this.getAllCustomer);

    // Get User by id Router
    this.router.get(`${this.path}/:id`, this.getCustomerById);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteCustomerById);

    // Update User Router
    this.router.put(`${this.path}/:id`, this.updateCustomerById);
  }
}

export default CustomerRouter;
