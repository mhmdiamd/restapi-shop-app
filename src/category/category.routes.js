import { Router } from 'express';
import { authCheck } from '../utils/Middlewares/auth.middleware.js';
import CategoryController from './category.controller.js';
import { multerStorage, useStorage } from './../../Config/multer.config.js';

class CategoryRouter extends CategoryController {
  path = '/categories';
  router = Router();
  upload = multerStorage(useStorage('Categories'));

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    // get all Route
    this.router.get(`${this.path}`, this.getAllCategory);
    // get single category Route
    this.router.get(`${this.path}/:id`, this.getCategoryById);
    // create Route
    this.router.post(`${this.path}`, this.upload.single('photo'), this.createCategory);
    // Delete Route
    this.router.delete(`${this.path}/:id`,this.deleteCategoryById);
  }
}

export default CategoryRouter;
