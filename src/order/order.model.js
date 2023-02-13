import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';

class OrderModel {
  #DB = dbRepo;

  // Get All Cart Service
  getAllOrder = async () => {
    let query = `SELECT * FROM orders`;
    const orders = await this.#DB.query(query);

    // Error if Cart id not found!
    if (orders.rowCount == 0) {
      throw new HttpException(404, `Orderss not found!`);
    }

    return orders.rows;
  };

  // Get single Cart
  getOrderById = async (id) => {
    const query = `SELECT * FROM orders WHERE orders.id='${id}'`;

    const order = await this.#DB.query(query);
    if (order.rowCount == 0) {
      throw new HttpException(404, `Order with ID ${id} is not found!`);
    }

    return order.rows[0];
  };

  // Get cart by id buyer
  getOrderByIdCustomer = async ({ id, status }) => {
    const id_customer = id;
    const query = `SELECT orders.*, products.id_seller as id_product, product_name, quantity, products.price as product_price, sa.address, sa.recipent_name, sa.recipent_phone, sa.as_address, sa.city_or_subdistrict,sa.postal_code FROM orders 
    INNER JOIN products ON orders.id_product = products.id 
    INNER JOIN shipping_address as sa ON orders.id_shipping_address = sa.id 
    WHERE orders.id_customer = '${id_customer}' ${status ? `AND orders.status = '${status}'` : ''} ORDER BY created_at desc`;

    const orders = await this.#DB.query(query);
    if (orders.rowCount == 0) {
      throw new HttpException(404, `Order with ID Customer ${id_customer} is not found!`);
    }

    return orders.rows;
  };

  // Get cart by id buyer
  getOrderByIdSeller = async ({ id, status }) => {
    const query = `SELECT orders.*, products.id_seller as id_seller, product_name, quantity, products.price as product_price, sa.address, sa.recipent_name, sa.recipent_phone, sa.as_address, sa.city_or_subdistrict,sa.postal_code FROM orders 
    INNER JOIN products ON orders.id_product = products.id 
    INNER JOIN shipping_address as sa ON orders.id_shipping_address = sa.id 
    WHERE id_seller = '${id}' ${status ? `AND orders.status = '${status}'` : `AND orders.status != 'cancel'`} ORDER BY created_at desc`;

    const orders = await this.#DB.query(query);
    if (orders.rowCount == 0) {
      throw new HttpException(404, `Order with ID Seller ${id_seller} is not found!`);
    }

    return orders.rows;
  };

  // Create Cart
  createOrder = async (data) => {
    const { id_product, price, id_shipping_address, id_customer, quantity } = data;
    const query = `INSERT INTO orders VALUES('${randomUUID()}', '${id_product}', ${price}, '${id_shipping_address}','${id_customer}','${quantity}', DEFAULT, DEFAULT, DEFAULT)`;
    const cart = await this.#DB.query(query);
    return cart.rows;
  };

  // Delete Cart
  deleteOrderById = async (id) => {
    await this.getOrderById(id);
    const query = `DELETE FROM orders WHERE id = '${id}'`;
    const deletedOrder = await this.#DB.query(query);
    return deletedOrder.rows;
  };

  // // Update Cart By Id
  updateOrderById = async (id, { status }) => {
    await this.getOrderById(id);

    const query = `UPDATE orders SET status='${status}' WHERE id='${id}'`;
    const updatedOrder = await this.#DB.query(query);

    return updatedOrder.rows[0];
  };
}

export default OrderModel;
