import { dbRepo } from '../../../Config/db.config.js';

class SellerModel {
  #authRepository = dbRepo;

  // Auth Register
  register = async ({ name, email, password }) => {
    const query = `INSERT INTO sellers VALUES(DEFAULT, '${name}', '${email}', '${password}', 'seller')`;
    const userRegister = await this.#authRepository.query(query);
    return userRegister.rows;
  };
}

export default SellerModel;
