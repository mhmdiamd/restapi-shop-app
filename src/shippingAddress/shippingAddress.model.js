import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';

class ShippingAddressModel {
  #DB = dbRepo;

  // Get All Shipping Address Service
  getAllShippingAddress = async () => {
    let query = 'SELECT * FROM shipping_address';
    const shippingAddress = await this.#DB.query(query);

    // Error if shippingAddress id not found!
    if (shippingAddress.rowCount == 0) {
      throw new HttpException(404, `shippingAddress not found!`);
    }

    return shippingAddress.rows;
  };

  // Get single User
  getShippingAddressById = async (id) => {
    const query = `SELECT * from shipping_address WHERE id = '${id}'`;

    const shippingAddress = await this.#DB.query(query);
    if (shippingAddress.rowCount == 0) {
      throw new HttpException(404, `Shipping Address with ID ${id} is not found!`);
    }

    return shippingAddress.rows[0];
  };

  getShippingAddressByIdCustomer = async (id) => {
    const query = `SELECT * FROM shipping_address WHERE id_customer = '${id}' ORDER BY status DESC`;

    const shippingAddress = await this.#DB.query(query);
    if (shippingAddress.rowCount == 0) {
      throw new HttpException(404, `Shipping Address with ID ${id} is not found!`);
    }

    return shippingAddress.rows;
  };

  // Create category
  createShippingAddress = async ({ as_address, recipent_name, recipent_phone, address, postal_code, city_or_subdistrict, id_customer, status }) => {
    const query = `INSERT INTO shipping_address(id, as_address, recipent_name, recipent_phone, address, postal_code, city_or_subdistrict, id_customer, status) VALUES('${randomUUID()}', '${as_address}', '${recipent_name}', '${recipent_phone}', '${address}', '${postal_code}', '${city_or_subdistrict}', '${id_customer}', '${
      status ? status : 0
    }')`;
    const shippingAddress = await this.#DB.query(query);
    return shippingAddress.rows;
  };

  // Delete User
  deleteShippingAddressById = async (id) => {
    await this.getShippingAddressById(id);

    const query = `DELETE FROM shipping_address WHERE id = '${id}'`;
    const deletedShippingAddress = await this.#DB.query(query);

    return deletedShippingAddress.rows;
  };

  // Update Shipping Address by Id
  updateShippingAddressById = async (id, data) => {
    await this.getShippingAddressById(id);

    const { as_address, recipent_name, recipent_phone, address, postal_code, city_or_subdistrict, id_customer, status } = data;

    const query = `UPDATE shipping_address SET 
    as_address='${as_address}', 
    recipent_name='${recipent_name}', 
    recipent_phone='${recipent_phone}', 
    address='${address}', 
    postal_code=${postal_code}, 
    city_or_subdistrict='${city_or_subdistrict}', 
    id_customer='${id_customer}', 
    status=${status}
    WHERE id = '${id}'`;
    const updatedShippingAddress = await this.#DB.query(query);

    return await this.getShippingAddressById(id);
  };
}

export default ShippingAddressModel;
