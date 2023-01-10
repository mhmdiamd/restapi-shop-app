import { dbRepo } from '../../../Config/db.config.js';

class BuyerModel {
  #buyerRepository = dbRepo;

  // Auth Register
  register = async ({ name, email, password }) => {
    const query = `INSERT INTO buyers VALUES(DEFAULT, '${name}',null, '${email}', '${password}', null, null, null, null, 'buyer')`;
    const userRegister = await this.#buyerRepository.query(query);
    return userRegister.rows;
  };
}

export default BuyerModel;
