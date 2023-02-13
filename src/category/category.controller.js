import HttpException from '../utils/Exceptions/http.exceptions.js';
import CategoryModel from './category.model.js';
import { successResponse } from './../utils/Helpers/response.js';

class CategoryController {
  #categoryModel = new CategoryModel();

  // Get all category
  getAllCategory = async (req, res, next) => {
    try {
      const categories = await this.#categoryModel.getAllCategory(req.query);
      const { data, ...other } = categories;

      // Success Response
      successResponse(res, 200, 'Success get all category!', { data, pagination: other });
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
    // Get File
    // const photo = req.file;

    // if (!photo) {
    //   return res.status(403).send({
    //     status: 'failed',
    //     message: 'Please input the photo',
    //   });
    // }

    // // Create file name
    // const photoUrl = `${process.env.HOST}${process.env.CATEGORY_UPLOAD_DIR}${photo.filename}`;
    // console.log(process.env.HOST);
    // // Get Id user login
    // // merge data before send to model
    // const data = { ...req.body, photo: photoUrl };
    // console.log(data);
    try {
      await this.#categoryModel.createCategory(req.body);

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
