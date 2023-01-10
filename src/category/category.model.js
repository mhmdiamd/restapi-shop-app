import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Errors/http.exceptions.js';

class CategoryModel {
  #categoriesRepository = dbRepo;

  // Get All Category
  getAllCategory = async () => {
    const query = `SELECT * FROM categories`;
    const categories = await this.#categoriesRepository.query(query);
    return categories.rows;
  };

  // Get single category
  getCategoryById = async (id) => {
    const query = `SELECT * FROM categories WHERE id_category = '${id}'`;
    const category = await this.#categoriesRepository.query(query);

    if (category.rowCount == 0) {
      throw new HttpException(404, `Categories with ID ${id} is not found!`);
    }

    return category.rows[0];
  };

  // Create category
  createCategory = async ({ name_categories }) => {
    const query = `INSERT INTO categories VALUES(DEFAULT, '${name_categories}')`;
    const categories = await this.#categoriesRepository.query(query);
    return categories.rows;
  };

  // delete category by id
  deleteCategoryById = async (id) => {
    const getCategory = await this.getCategoryById(id);
    const query = `DELETE FROM categories WHERE id_category = ${id}`;
    const deletedCategories = await this.#categoriesRepository.query(query);

    return deletedCategories.rows;
  };
}

export default CategoryModel;
