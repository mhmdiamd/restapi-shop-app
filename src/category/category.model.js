import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';

class CategoryModel {
  #categoriesRepository = dbRepo;

  // Count Product
  #countCategories = async (search) => {
    const count = `SELECT count(*) FROM categories ${search ? "where name LIKE '%" + search + "%'" : ''}`;
    const dataCount = await this.#categoriesRepository.query(count);
    return dataCount.rows[0].count;
  };

  // Get All Category
  getAllCategory = async ({ search, limit, page, sort, sortBy }) => {
    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const offset = (page - 1) * limit;
    let query = '';
    let totalData = '';

    if (search) {
      totalData = await this.#countCategories(search);
      query = `SELECT * FROM categories where name LIKE '%${search}%' ORDER BY 
      ${sortBy || 'id'} ${sort || 'desc'} LIMIT ${limit} OFFSET ${offset}`;
    } else {
      totalData = await this.#countCategories();
      query = `SELECT * FROM categories ORDER BY ${sortBy || 'id'} ${sort || 'desc'} LIMIT ${limit}`;
    }

    const categories = await this.#categoriesRepository.query(query);

    // Error if Product id not found!
    if (categories.rowCount == 0) {
      throw new HttpException(404, `Categories not found!`);
    }

    // Total Page
    const totalPage = Math.ceil(totalData / limit);

    return {
      data: categories.rows,
      currentPage: page,
      totalPage,
      limit,
    };
  };

  // Get single category
  getCategoryById = async (id) => {
    console.log(id);
    const query = `SELECT * FROM categories WHERE id = '${id}'`;
    const category = await this.#categoriesRepository.query(query);

    if (category.rowCount == 0) {
      throw new HttpException(404, `Categories with ID ${id} is not found!`);
    }

    return category.rows[0];
  };

  // Create category
  createCategory = async ({ name, photo, background_color }) => {
    const query = `INSERT INTO categories VALUES(DEFAULT, '${name}', '${photo}', '${background_color}')`;
    const categories = await this.#categoriesRepository.query(query);
    return categories.rows;
  };

  // delete category by id
  deleteCategoryById = async (id) => {
    await this.getCategoryById(id);
    const query = `DELETE FROM categories WHERE id = ${id}`;
    const deletedCategories = await this.#categoriesRepository.query(query);

    return deletedCategories.rows;
  };
}

export default CategoryModel;
