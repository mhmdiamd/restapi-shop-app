import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Errors/http.exceptions.js';

class ProductModel {
  #productRepository = dbRepo;

  // Get All Products Service
  getAllProduct = async ({ search, sortBy, sort, page, limit }) => {
    let query = '';
    if (search) {
      query = `
      SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id_category 
      INNER JOIN sellers ON products.id_seller = sellers.id_seller 
      WHERE products.description LIKE '%${search}%' AND 
      products.name_product LIKE '%${search}%'
      ORDER BY ${sortBy || 'id_product'} ${sort || 'DESC'} LIMIT ${limit || 10}`;
    } else {
      query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id_category 
      INNER JOIN sellers ON products.id_seller = sellers.id_seller 
      ORDER BY ${sortBy || 'id_product'} ${sort || 'DESC'} LIMIT ${limit || 10}`;
    }
    const products = await this.#productRepository.query(query);

    // Error if Product id not found!
    if (products.rowCount == 0) {
      throw new HttpException(404, `Categories not found!`);
    }

    const pagination = (products.rowCount * (limit || 10)) / (limit || 10);

    return {
      data: products.rows,
      page: page || 1,
      count: Number(limit) > products.rowCount ? products.rowCount : Number(limit) || products.rowCount,
      total: products.rowCount,
    };
  };

  // Get single category
  getProductById = async (id) => {
    const query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller 
    FROM products 
    INNER JOIN categories ON products.id_category = categories.id_category 
    INNER JOIN sellers ON products.id_seller = sellers.id_seller 
    WHERE id_product = '${id}'`;

    const product = await this.#productRepository.query(query);
    if (product.rowCount == 0) {
      throw new HttpException(404, `Products with ID ${id} is not found!`);
    }

    return product.rows[0];
  };

  // Create Product
  createProduct = async (data) => {
    const { name_product, price, color, size, stock, description, id_category, id_seller } = data;
    const query = `INSERT INTO products VALUES(DEFAULT, '${name_product}', ${price}, '${description}', ${stock},NULL, '${color}','${size}', ${id_category}, ${id_seller})`;
    const products = await this.#productRepository.query(query);
    return products.rows;
  };

  // DeleteProduct
  deleteProductById = async (id) => {
    const getProduct = await this.getProductById(id);
    const query = `DELETE FROM products WHERE id_product = ${id}`;
    const deletedProduct = await this.#productRepository.query(query);

    return deletedProduct.rows;
  };

  // Update Product By Id
  updateProductById = async (id, data) => {
    const getProduct = await this.getProductById(id);

    const { name_product, price, color, size, stock, description, rating } = data;
    const query = `UPDATE products SET name_product='${name_product}', rating='${rating}', price=${price}, color='${color}', size='${size}', stock=${stock}, description='${description}' WHERE id_product = '${id}'`;
    const updatedProduct = await this.#productRepository.query(query);

    return updatedProduct.rows;
  };
}

export default ProductModel;
