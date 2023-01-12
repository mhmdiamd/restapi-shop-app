import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';

class BuyerModel {
  #DB = dbRepo;

  // Get All Buyer Service
  getAllBuyer = async () => {
    let query = 'SELECT id, name, phone, email, address gender, birth_date, role, photo FROM buyers';
    const buyers = await this.#DB.query(query);

    // Error if buyers id not found!
    if (buyers.rowCount == 0) {
      throw new HttpException(404, `Categories not found!`);
    }

    return buyers.rows;
  };

  // Get single User
  getBuyerById = async (id) => {
    const query = `SELECT id, name, email,phone, address, birth_date, gender, photo FROM buyers WHERE id = '${id}'`;

    const buyer = await this.#DB.query(query);
    if (buyer.rowCount == 0) {
      throw new HttpException(404, `Buyer with ID ${id} is not found!`);
    }

    return buyer.rows[0];
  };

  // Delete User
  deleteBuyerById = async (id) => {
    await this.getBuyerById(id);
    const query = `DELETE FROM buyers WHERE id = ${id}`;
    const deletedBuyer = await this.#DB.query(query);

    return deletedBuyer.rows;
  };

  // Update Buyer by Id
  updateBuyerById = async (id, data) => {
    await this.getBuyerById(id);

    const { name, gender, phone, birth_date, address, photo } = data;
    const query = `UPDATE buyers SET 
    name='${name}', 
    phone=${phone ? phone : null}, 
    birth_date='${birth_date}', 
    gender='${gender || 'man'}', 
    address=${address ? address : null}, 
    photo='${photo}' 
    WHERE id = '${id}'`;
    const updatedBuyer = await this.#DB.query(query);

    return updatedBuyer.rows;
  };
}

export default BuyerModel;
