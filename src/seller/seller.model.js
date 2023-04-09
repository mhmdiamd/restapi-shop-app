import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';

class SellerModel {
  #DB = dbRepo;

  // Get All Sellers Service
  getAllSeller = async () => {
    let query = 'SELECT id, phone, store_name, photo, description FROM sellers';
    const sellers = await this.#DB.query(query);

    // Error if sellers id not found!
    if (sellers.rowCount == 0) {
      throw new HttpException(404, `Seller not found!`);
    }

    return sellers.rows;
  };

  // Get single User
  getSellerById = async (id) => {
    const query = `SELECT id, name, email,phone, store_name, address, photo, description FROM sellers WHERE id = '${id}'`;

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

    const { name, description, phone, address, photo, store_name } = data;
    console.log(typeof photo)
    const query = `UPDATE sellers SET name='${name}', phone='${phone}',  description=${description ? `'${description}'` : ''}, address='${address}',store_name='${store_name}' 
    ${photo ? `, photo='${photo}'` : ''}
    WHERE id = '${id}'`;
    const updatedUser = await this.#DB.query(query);
    console.log(updatedUser);

    return await this.getSellerById(id);
  };
}

export default SellerModel;
