import { Router } from 'express';
import ProductController from './product.controller.js';
import { productSchema } from './product.validation.js';

class ProductRouter extends ProductController {
  path = '/products';
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
    this.router.post(`${this.path}/`, productSchema, this.createProduct);

    // Delete Product Router
    this.router.delete(`${this.path}/:id`, this.deleteProductById);

    // Update Product Router
    this.router.put(`${this.path}/:id`, productSchema, this.updateProductById);
  }
}

export default ProductRouter;
