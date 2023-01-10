import { Router } from 'express';
import ChartController from './chart.controller';

class ProductRouter extends ChartController {
  path = '/charts';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all Product Router
    this.router.get(`${this.path}/`, this.getAllProduct);

    // Get product by id Router
    this.router.get(`${this.path}/:id`, this.getProductById);

    // Create Product Router
    this.router.post(`${this.path}/`, this.createProduct);

    // Delete Product Router
    this.router.delete(`${this.path}/:id`, this.deleteProductById);

    // Update Product Router
    this.router.put(`${this.path}/:id`, this.updateProductById);
  }
}

export default ProductRouter;
