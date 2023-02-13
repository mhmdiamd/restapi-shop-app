import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';

class CartModel {
  #DB = dbRepo;

  // Get All Cart Service
  getAllCart = async () => {
    let query = `SELECT carts.*,products.product_name, customers.name as buyer_name, customers.email FROM carts 
      INNER JOIN products ON carts.id_product = products.id
      INNER JOIN customers ON carts.id_customer = customers.id`;
    const carts = await this.#DB.query(query);

    // Error if Cart id not found!
    if (carts.rowCount == 0) {
      throw new HttpException(404, `Cart not found!`);
    }

    return carts.rows;
  };

  // Get single Cart
  getCartById = async (id) => {
    const query = `SELECT carts.*,products.product_name, customers.name as buyer_name, customers.email FROM carts 
    INNER JOIN products ON carts.id_product = products.id
    INNER JOIN customers ON carts.id_customer = customers.id
    WHERE carts.id='${id}'`;

    const cart = await this.#DB.query(query);
    if (cart.rowCount == 0) {
      throw new HttpException(404, `Cart with ID ${id} is not found!`);
    }

    return cart.rows[0];
  };

  // Get cart by id buyer
  getCartByIdCustomer = async (id_customer) => {
    const query = `SELECT carts.*,products.product_name, products.photo as photo_product, customers.name as customer_name, sellers.store_name as store_name, products.price, customers.email FROM carts 
    INNER JOIN products ON carts.id_product = products.id
    INNER JOIN sellers ON products.id_seller = sellers.id
    INNER JOIN customers ON carts.id_customer = customers.id
    WHERE carts.id_customer='${id_customer}'`;

    const carts = await this.#DB.query(query);
    if (carts.rowCount == 0) {
      throw new HttpException(404, `Cart with ID Customer ${id_customer} is not found!`);
    }

    return carts.rows;
  };

  // Create Cart
  createCart = async (data) => {
    const findProduct = await this.getCartByIdCustomer(data.id_customer)
      .then((res) => res.find((cart) => cart.id_product == data.id_product && cart.color == data.color && cart.size == data.size))
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));

    if (findProduct) {
      const updateCart = await this.updateCartById(findProduct.id, { quantity: findProduct.quantity + data.quantity });
      return updateCart;
    } else {
      const { id_customer, id_product, quantity, size, color } = data;
      const query = `INSERT INTO carts VALUES('${randomUUID()}', '${id_customer}', '${id_product}', ${quantity || 1}, '${size}', '${color}' )`;
      const cart = await this.#DB.query(query);
      return cart.rows;
    }
  };

  // Delete Cart
  deleteCartById = async (id) => {
    await this.getCartById(id);
    const query = `DELETE FROM carts WHERE id = '${id}'`;
    const deletedCart = await this.#DB.query(query);
    return deletedCart.rows;
  };

  // Delete Cart By Id Customer
  deleteCartByIdCustomer = async (id) => {
    console.log(`tes`, id);
    await this.getCartByIdCustomer(id);
    const query = `DELETE FROM carts WHERE id_customer = '${id}'`;
    const deletedCart = await this.#DB.query(query);
    return deletedCart.rows;
  };

  // Update Cart By Id
  updateCartById = async (id, { quantity }) => {
    await this.getCartById(id);

    const query = `UPDATE carts SET quantity=${quantity} WHERE id='${id}'`;
    const updatedCart = await this.#DB.query(query);

    return updatedCart.rows[0];
  };
}

export default CartModel;
