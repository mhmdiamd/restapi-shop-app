import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';

class CartModel {
  #DB = dbRepo;

  // Get All Cart Service
  getAllCart = async () => {
    let query = `SELECT carts.*,products.name_product, buyers.name as buyer_name, buyers.email FROM carts 
      INNER JOIN products ON carts.id_product = products.id
      INNER JOIN buyers ON carts.id_buyer = buyers.id`;
    const carts = await this.#DB.query(query);

    // Error if Cart id not found!
    if (carts.rowCount == 0) {
      throw new HttpException(404, `Cart not found!`);
    }

    return carts.rows;
  };

  // Get single Cart
  getCartById = async (id) => {
    console.log(id);
    const query = `SELECT carts.*,products.name_product, buyers.name as buyer_name, buyers.email FROM carts 
    INNER JOIN products ON carts.id_product = products.id
    INNER JOIN buyers ON carts.id_buyer = buyers.id
    WHERE carts.id=${id}`;

    const cart = await this.#DB.query(query);
    if (cart.rowCount == 0) {
      throw new HttpException(404, `Cart with ID ${id} is not found!`);
    }

    return cart.rows[0];
  };

  // Get cart by id buyer
  getCartByIdBuyer = async (id_buyer) => {
    const query = `SELECT carts.*,products.name_product, buyers.name as buyer_name, buyers.email FROM carts 
    INNER JOIN products ON carts.id_product = products.id
    INNER JOIN buyers ON carts.id_buyer = buyers.id
    WHERE carts.id_buyer=${id_buyer}`;

    const carts = await this.#DB.query(query);
    if (carts.rowCount == 0) {
      throw new HttpException(404, `Cart with ID Buyer ${id} is not found!`);
    }

    return carts.rows;
  };

  // Create Cart
  createCart = async (data) => {
    const { id_buyer, id_product, quantity } = data;
    const query = `INSERT INTO carts VALUES(DEFAULT, ${id_buyer}, ${id_product}, ${quantity || 1})`;
    const cart = await this.#DB.query(query);
    return cart.rows;
  };

  // Delete Cart
  deleteCartById = async (id) => {
    await this.getCartById(id);
    const query = `DELETE FROM carts WHERE id = ${id}`;
    const deletedCart = await this.#DB.query(query);

    return deletedCart.rows;
  };

  // Update Cart By Id
  updateCartById = async (id, { quantity }) => {
    await this.getCartById(id);

    const query = `UPDATE carts SET quantity=${quantity} WHERE id=${id}`;
    const updatedCart = await this.#DB.query(query);

    return updatedCart.rows[0];
  };
}

export default CartModel;
