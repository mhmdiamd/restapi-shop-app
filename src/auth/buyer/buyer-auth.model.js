import { dbRepo } from '../../../Config/db.config.js';
import HttpException from '../../utils/Exceptions/http.exceptions.js';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

class BuyerModel {
  #buyerRepository = dbRepo;

  // Auth Register
  register = async ({ name, email, password }) => {
    const query = `INSERT INTO buyers VALUES('${randomUUID()}', '${name}', '${email}', '${password}', DEFAULT, null, null, null, null, DEFAULT)`;
    const buyerRegister = await this.#buyerRepository.query(query);
    return buyerRegister.rows;
  };

  // Login
  login = async (data) => {
    const queryFindEmail = `SELECT * FROM buyers WHERE email='${data.email}'`;
    const findEmail = await this.#buyerRepository.query(queryFindEmail);

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

export default BuyerModel;
