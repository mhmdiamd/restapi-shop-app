import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Errors/http.exceptions.js';

class ChartModel {
  #productRepository = dbRepo;

  // Get All Products Service
  getAllProduct = async ({ search, sortBy, sort, page, limit }) => {
    let query = '';
    if (search) {
      query = `
      SELECT * FROM products 
      INNER JOIN categories ON products.id_categories = categories.id_categories 
      WHERE products.description LIKE '%${search}%' AND 
      products.name_products LIKE '%${search}%'
      ORDER BY ${sortBy || 'id_products'} ${sort || 'DESC'} LIMIT ${limit || 10}`;
    } else {
      query = `SELECT * FROM products INNER JOIN 
      categories ON products.id_categories = categories.id_categories 
      ORDER BY ${sortBy || 'id_products'} ${sort || 'DESC'} LIMIT ${limit || 10}`;
    }
    const products = await this.#productRepository.query(query);

    // Error if Product id not found!
    if (products.rowCount == 0) {
      throw new HttpException(404, `Categories not found!`);
    }

    // const pagination = (products.rowCount * (limit || 10)) / (limit || 10);

    return {
      data: products.rows,
      page: page || 1,
      count: Number(limit) > products.rowCount ? products.rowCount : Number(limit) || products.rowCount,
      total: products.rowCount,
    };
  };

  // Get single category
  getProductById = async (id) => {
    const query = `SELECT * FROM products INNER JOIN 
    categories ON products.id_categories = categories.id_categories 
    WHERE id_products = '${id}'`;

    const product = await this.#productRepository.query(query);
    if (product.rowCount == 0) {
      throw new HttpException(404, `Products with ID ${id} is not found!`);
    }

    return product.rows[0];
  };

  // Create Product
  createProduct = async (data) => {
    const { name_products, price, color, size, stock, description, id_categories } = data;
    const query = `INSERT INTO products VALUES(DEFAULT, '${name_products}', ${price}, '${color}', '${size}', ${stock}, '${description}', ${id_categories})`;
    const products = await this.#productRepository.query(query);
    return products.rows;
  };

  // DeleteProduct
  deleteProductById = async (id) => {
    await this.getProductById(id);
    const query = `DELETE FROM products WHERE id_products = ${id}`;
    const deletedProduct = await this.#productRepository.query(query);

    return deletedProduct.rows;
  };

  // Update Product By Id
  updateProductById = async (id, data) => {
 await this.getProductById(id);

    const { name_products, price, color, size, stock, description } = data;
    const query = `UPDATE products SET name_products='${name_products}', price=${price}, color='${color}', size='${size}', stock=${stock}, description='${description}' WHERE id_products = '${id}'`;
    const updatedProduct = await this.#productRepository.query(query);

    return updatedProduct.rows;
  };
}

export default ChartModel;
