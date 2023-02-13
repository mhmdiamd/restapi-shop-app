import { Router } from 'express';
import { isUser } from '../utils/Middlewares/auth.middleware.js';
import SellerController from './seller.controller.js';
import { multerStorage, useStorage } from './../../Config/multer.config.js';
class SellerRouter extends SellerController {
  path = '/sellers';
  router = Router();
  upload = multerStorage(useStorage('Profiles/Sellers'));

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}/`, this.getAllSeller);

    // Get User by id Router
    this.router.get(`${this.path}/:id`, this.getSellerById);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteSellerById);

    // Update User Router
    this.router.put(`${this.path}/:id`, this.upload.single('photo'), this.updateSellerById);
  }
}

export default SellerRouter;
