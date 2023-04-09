import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';

class CustomerModel {
  #DB = dbRepo;

  // Get All Customer Service
  getAllCustomer = async () => {
    let query = 'SELECT id, name, phone, email, address, gender, birth_date, role, photo FROM customers';
    const customers = await this.#DB.query(query);

    // Error if customers id not found!
    if (customers.rowCount == 0) {
      throw new HttpException(404, `customers not found!`);
    }

    return customers.rows;
  };

  // Get single User
  getCustomerById = async (id) => {
    const query = `SELECT id, name, email,phone, address, birth_date, gender, photo FROM customers WHERE id = '${id}'`;

    const buyer = await this.#DB.query(query);
    if (buyer.rowCount == 0) {
      throw new HttpException(404, `Buyer with ID ${id} is not found!`);
    }

    return buyer.rows[0];
  };

  // Delete User
  deleteCustomerById = async (id) => {
    await this.getCustomerById(id);
    const query = `DELETE FROM customers WHERE id = '${id}'`;
    const deletedCustomer = await this.#DB.query(query);

    return deletedCustomer.rows;
  };

  // Update Customer by Id
  updateCustomerById = async (id, data) => {
    await this.getCustomerById(id);

    const { name, gender, phone, birth_date, address, photo } = data;
    const query = `UPDATE customers SET 
    name='${name}', 
    phone=${phone ? `'${phone}'` : null}, 
    birth_date=${`${birth_date}` || null}, 
    gender=${`${gender == 'null' ? null : gender}`}, 
    address=${address ? address : null}, 
    ${photo ? `, photo='${photo}'` : ''}
    WHERE id = '${id}'`;
    const updatedCustomer = await this.#DB.query(query);

    return await this.getCustomerById(id);
  };
}

export default CustomerModel;
