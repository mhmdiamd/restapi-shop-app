import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';
import { auth, deletePhoto, updatePhoto } from './../../Config/googleDrive.config.js';
import { deletePhotoCloudinary } from '../../Config/cloudinary.config.js';

class ProductModel {
  #productRepository = dbRepo;

  setFilter(filter, tableName) {
    let query = '';

    const toArray = (data) => {
      const dataArray = [];
      if (typeof data != 'object') {
        dataArray.push(data);
        return dataArray;
      } else {
        return data;
      }
    };

    const queryCheck = (attr) => {
      toArray(filter[attr]).forEach((dataArr) => {
        if (query) {
          query += `AND ${tableName}.${attr} ILIKE '%${dataArr}%' `;
        } else {
          query += `where ${tableName}.${attr} ILIKE '%${dataArr}%' `;
        }
      });
    };

    for (let attr in filter) {
      if (filter[attr]) {
        queryCheck(attr);
      }
    }

    return query;
  }

  // Count Product
  #countProducts = async (search) => {
    const count = `SELECT count(*) FROM 
    (SELECT products.*,categories.name as name_category, sellers.name as name_seller 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id 
      INNER JOIN sellers ON products.id_seller = sellers.id) as products 
      ${search ? "where products.product_name ILIKE '%" + search + "%'" : ''}`;
    const dataCount = await this.#productRepository.query(count);
    return dataCount.rows[0].count;
  };

  // Get All Products Service
  getAllProduct = async ({ search, sortBy, sort, page, limit, color, category, size, id_seller, id_category }) => {
    const filter = { color, category, size, id_seller, id_category };
    const queryFilter = this.setFilter(filter, 'products');
    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const offset = (page - 1) * limit;
    let query = '';
    let totalData = '';

    if (search) {
      totalData = await this.#countProducts(search);
      query = `
      SELECT products.*,categories.name as name_category, sellers.name as name_seller, sellers.store_name
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id 
      INNER JOIN sellers ON products.id_seller = sellers.id 
      ${queryFilter ? `${queryFilter} AND products.product_name ILIKE '%${search}%'` : `WHERE products.product_name ILIKE '%${search}%'`}
      ORDER BY ${sortBy || 'id'} ${sort || 'DESC'} LIMIT ${limit} OFFSET ${offset}`;
    } else {
      totalData = await this.#countProducts();

      query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller, sellers.store_name 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id 
      INNER JOIN sellers ON products.id_seller = sellers.id ${queryFilter}
      ORDER BY ${sortBy || 'id'} ${sort || 'DESC'} LIMIT ${limit} OFFSET ${offset}`;
    }
    const products = await this.#productRepository.query(query);

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
    };
  };

  // Get single category
  getProductById = async (id) => {
    const query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller,sellers.store_name
    FROM products 
    INNER JOIN categories ON products.id_category = categories.id 
    INNER JOIN sellers ON products.id_seller = sellers.id 
    WHERE products.id = '${id}'`;

    const product = await this.#productRepository.query(query);
    if (product.rowCount == 0) {
      throw new HttpException(404, `Products with ID ${id} is not found!`);
    }

    return product.rows[0];
  };

  // Get Product by id Seller
  getProductByIdSeller = async (id) => {
    const query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller, sellers.store_name 
    FROM products 
    INNER JOIN categories ON products.id_category = categories.id 
    INNER JOIN sellers ON products.id_seller = sellers.id 
    WHERE products.id_seller = '${id}'`;

    const products = await this.#productRepository.query(query);
    if (products.rowCount == 0) {
      throw new HttpException(404, `Products with ID seller ${id} is not found!`);
    }

    return products.rows;
  };

  // Get Product by id Seller
  getProductByIdCategory = async (id) => {
    const query = `SELECT products.*,categories.name as name_category, sellers.name as name_seller, sellers.store_name 
      FROM products 
      INNER JOIN categories ON products.id_category = categories.id 
      INNER JOIN sellers ON products.id_seller = sellers.id 
      WHERE products.id_category = '${id}'`;

    const products = await this.#productRepository.query(query);
    if (products.rowCount == 0) {
      throw new HttpException(404, `Products with ID category ${id} is not found!`);
    }

    return products.rows;
  };

  // Create Product
  createProduct = async (data) => {
    console.log(randomUUID());
    const { product_name, price, color, size, stock, description, id_category, id_seller, photo, condition } = data;
    const query = `INSERT INTO products VALUES('${randomUUID()}', '${product_name}', '${description}',
    ${Number(price)}, '${color}', '${size}',  ${Number(stock)}, '${id_category}', '${id_seller}', '${photo}','${condition}')`;

    const products = await this.#productRepository.query(query);
    return products.rows;
  };

  // DeleteProduct
  deleteProductById = async (id) => {
    // Check product is not found!
    const product = await this.getProductById(id);
    const photoLength = product.photo.split('/').length;
    const idFile = product.photo.split('/')[photoLength - 1].split('.')[0];
    if (product) {
      try {
        await deletePhotoCloudinary(idFile);
      } catch (err) {
        throw err;
      }
    }

    // Query when product was found!
    const query = `DELETE FROM products WHERE id = '${id}'`;
    const deletedProduct = await this.#productRepository.query(query);

    return deletedProduct.rows;
  };

  // Update Product By Id
  updateProductById = async (id, data) => {
    const { product_name, price, color, size, stock, description, id_category, photo, condition } = data;

    const query = `UPDATE products SET product_name='${product_name}', price=${price}, color='${color}', size='${size}', stock=${stock}, description='${description}',condition='${condition}', id_category=${id_category} ${
      photo ? `, photo='${photo}'` : ''
    } WHERE id = '${id}'`;

    const updatedProduct = await this.#productRepository.query(query);
    // // Delete old Photo when photo was updated!
    // if (updatedProduct && photo) {
    //   deletePhoto(`Public/Images/Products`, oldProduct);
    // }

    return updatedProduct.rows;
  };
}

export default ProductModel;
