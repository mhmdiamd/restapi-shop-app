import HttpException from '../utils/Errors/http.exceptions.js';
import CategoryModel from './category.model.js';
import { successResponse } from './../utils/Helpers/response.js';

class CategoryController {
  #categoryModel = new CategoryModel();

  // Get all category
  getAllCategory = async (req, res, next) => {
    try {
      const categories = await this.#categoryModel.getAllCategory();

      // Success Response
      successResponse(res, 200, 'Success get all category!', categories);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get single category
  getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await this.#categoryModel.getCategoryById(id);

      // Success Response
      successResponse(res, 200, `Success get category with ID ${id}!`, category);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Created category
  createCategory = async (req, res, next) => {
    const data = req.body;
    try {
      await this.#categoryModel.createCategory(data);

      // Success Response
      successResponse(res, 200, `Success create category!`, { message: 'Category Created!' });
    } catch (err) {
      next(new HttpException(400, err.message));
    }
  };

  // Delete Category
  deleteCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#categoryModel.deleteCategoryById(id);

      // Success Response
      successResponse(res, 200, `Success delete category!`, { message: 'Category Deleted!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default CategoryController;
