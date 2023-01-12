import { Router } from 'express';
import ProductController from './product.controller.js';
import { productSchema } from './product.validation.js';
import { authCheck, isUser } from './../utils/Middlewares/auth.middleware.js';

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

    // Get product by id Seller Router
    this.router.get(`${this.path}/:id/sellers`, this.getProductByIdSeller);

    // Create Product Router
    this.router.post(`${this.path}/`, authCheck, productSchema, this.createProduct);

    // Delete Product Router
    this.router.delete(`${this.path}/:id`, this.deleteProductById);

    // Update Product Router
    this.router.put(`${this.path}/:id`, this.updateProductById);
  }
}

export default ProductRouter;
