import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Errors/http.exceptions.js';

class ProductModel {
  #productRepository = dbRepo;

  // Count Product
  #coutProducts = async () => {
    const count = `SELECT count(*) FROM 
    (SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id_category 
      INNER JOIN sellers ON products.id_seller = sellers.id_seller) as products`;
    const dataCount = await this.#productRepository.query(count);
    return dataCount.rows[0].count;
  };

  // Get All Products Service
  getAllProduct = async ({ search, sortBy, sort, page, limit }) => {
    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const offset = (page - 1) * limit;
    let query = '';

    if (search) {
      query = `
      SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id_category 
      INNER JOIN sellers ON products.id_seller = sellers.id_seller 
      WHERE products.name_product LIKE '%${search}%'
      ORDER BY ${sortBy || 'id_product'} ${sort || 'DESC'} LIMIT ${limit} OFFSET ${offset}`;
    } else {
      query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id_category 
      INNER JOIN sellers ON products.id_seller = sellers.id_seller 
      ORDER BY ${sortBy || 'id_product'} ${sort || 'DESC'} LIMIT ${limit} OFFSET ${offset}`;
    }
    const products = await this.#productRepository.query(query);
    const totalData = await this.#coutProducts();

    // Error if Product id not found!
    if (products.rowCount == 0) {
      throw new HttpException(404, `Products not found!`);
    }

    // Total Page
    const totalPage = Math.ceil(totalData / limit);

    return {
      data: products.rows,
      currentPage: page,
      totalPage,
      limit,
      count: products.rowCount,
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
    const query = `INSERT INTO products VALUES(DEFAULT, '${name_product}', ${price}, '${description}', ${stock},'${color}','${size}', ${id_category}, ${id_seller})`;

    const products = await this.#productRepository.query(query);
    return products.rows;
  };

  // DeleteProduct
  deleteProductById = async (id) => {
    // Check product is not found!
    await this.getProductById(id);

    // Query when product was found!
    const query = `DELETE FROM products WHERE id_product = ${id}`;
    const deletedProduct = await this.#productRepository.query(query);

    return deletedProduct.rows;
  };

  // Update Product By Id
  updateProductById = async (id, data) => {
    await this.getProductById(id);

    const { name_product, price, color, size, stock, description } = data;
    const query = `UPDATE products SET name_product='${name_product}', price=${price}, color='${color}', size='${size}', stock=${stock}, description='${description}' WHERE id_product = '${id}'`;
    const updatedProduct = await this.#productRepository.query(query);

    return updatedProduct.rows;
  };
}

export default ProductModel;
