import { Router } from 'express';
import { authCheck } from '../utils/Middlewares/auth.middleware.js';
import CategoryController from './category.controller.js';

class CategoryRouter extends CategoryController {
  path = '/categories';
  router = Router();

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
    this.router.post(`${this.path}`, this.createCategory);
    // Delete Route
    this.router.delete(`${this.path}/:id`, this.deleteCategoryById);
  }
}

export default CategoryRouter;
