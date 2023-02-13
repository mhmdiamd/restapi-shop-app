import { Router } from 'express';
import ProductController from './product.controller.js';
import { authCheck, isSeller, isYourPoduct } from './../utils/Middlewares/auth.middleware.js';
import { multerStorage } from '../../Config/multer.config.js';
// import { productSchema } from './product.validation.js';
import { useStorage } from './../../Config/multer.config.js';

class ProductRouter extends ProductController {
  path = '/products';
  router = Router();
  upload = multerStorage(useStorage('Products'));

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
    this.router.get(`${this.path}/:id/sellers`, authCheck, this.getProductByIdSeller);

    // Get product by id Category Router
    this.router.get(`${this.path}/categories/:id`, this.getProductByIdCategory);

    // Create Product Router
    this.router.post(`${this.path}/`, authCheck, isSeller, this.upload.single('photo'), this.createProduct);

    // Delete Product Router
    this.router.delete(`${this.path}/:id`, authCheck, this.deleteProductById);

    // Update Product Router
    this.router.put(`${this.path}/:id`, authCheck, isSeller, this.upload.single('photo'), this.updateProductById);
  }
}

export default ProductRouter;
