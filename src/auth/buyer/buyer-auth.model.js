import { dbRepo } from '../../../Config/db.config.js';

class BuyerModel {
  #buyerRepository = dbRepo;

  // Auth Register
  register = async ({ name, email, password }) => {
    const query = `INSERT INTO buyers VALUES(DEFAULT, '${name}', '${email}', '${password}', 'buyer', null, null, null, null, 'photodefault.jpg')`;
    const buyerRegister = await this.#buyerRepository.query(query);
    return buyerRegister.rows;
  };
}

export default BuyerModel;
