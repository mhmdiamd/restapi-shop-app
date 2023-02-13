import { dbRepo } from '../../../Config/db.config.js';
import HttpException from '../../utils/Exceptions/http.exceptions.js';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { sendEmailActivation } from '../../../Config/nodemailer.config.js';

class SellerModel {
  #authRepository = dbRepo;

  // Auth Register
  register = async ({ name, email, password, store_name, phone }) => {
    const query = `INSERT INTO sellers(id, name, email, password, store_name, phone,  description, address, role, photo) VALUES('${randomUUID()}', '${name}', '${email}', '${password}','${store_name}', '${phone}', null, null,DEFAULT, DEFAULT)`;
    const userRegister = await this.#authRepository.query(query);
    return userRegister.rows;
  };

  // Login
  login = async (data) => {
    const queryFindEmail = `SELECT * FROM sellers WHERE email='${data.email}'`;
    const findEmail = await this.#authRepository.query(queryFindEmail);

    if (findEmail.rowCount == 0) {
      throw new HttpException(401, 'Unauthenticated');
    }

    const isValidPassword = bcrypt.compareSync(data.password, findEmail.rows[0].password);
    if (!isValidPassword) {
      throw new HttpException(401, 'Email or Password is invalid!');
    }

    const { id, name, role, store_name, photo } = findEmail.rows[0];
    return { id, name, role, store_name, photo };
  };
}

export default SellerModel;
