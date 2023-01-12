import { dbRepo } from '../../../Config/db.config.js';
import HttpException from '../../utils/Exceptions/http.exceptions.js';
import bcrypt from 'bcryptjs';

class SellerModel {
  #authRepository = dbRepo;

  // Auth Register
  register = async ({ name, email, password }) => {
    const query = `INSERT INTO sellers VALUES(DEFAULT, '${name}', '${email}', '${password}', 'seller', null, null, null, null, 'photodefault.jpg')`;
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
    const { id, name, email, role } = findEmail.rows[0];
    return { id, name, email, role };
  };
}

export default SellerModel;
