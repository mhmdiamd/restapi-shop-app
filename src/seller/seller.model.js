import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';

class SellerModel {
  #DB = dbRepo;

  // Get All Sellers Service
  getAllSeller = async () => {
    let query = 'SELECT id, name, phone, email, address, gender, birth_date, role, photo FROM sellers';
    const sellers = await this.#DB.query(query);

    // Error if sellers id not found!
    if (sellers.rowCount == 0) {
      throw new HttpException(404, `Seller not found!`);
    }

    return sellers.rows;
  };

  // Get single User
  getSellerById = async (id) => {
    const query = `SELECT id, name, email,phone, address, birth_date, gender, photo FROM sellers WHERE id = '${id}'`;

    const seller = await this.#DB.query(query);
    if (seller.rowCount == 0) {
      throw new HttpException(404, `Seller with ID ${id} is not found!`);
    }

    return seller.rows[0];
  };

  // Delete User
  deleteSellerById = async (id) => {
    await this.getSellerById(id);
    const query = `DELETE FROM sellers WHERE id = '${id}'`;
    const deletedUsers = await this.#DB.query(query);

    return deletedUsers.rows;
  };

  // Update Sellers by Id
  updateSellerById = async (id, data) => {
    await this.getSellerById(id);

    const { name, gender, phone, birth_date, address, photo } = data;
    const query = `UPDATE sellers SET name='${name}', phone='${phone}', birth_date=${`${birth_date}` || null}, gender=${`'${gender}'` || null}, address='${address}', photo='${photo}' WHERE id = '${id}'`;
    const updatedUser = await this.#DB.query(query);
    console.log(updatedUser);

    return await this.getSellerById(id);
  };
}

export default SellerModel;
