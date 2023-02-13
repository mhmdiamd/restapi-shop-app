import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import CustomerModel from './customer.model.js';

class CustomerController {
  #customerModel = new CustomerModel();
  #ENDPOINT = 'api/v1/customers';

  // Get all Customer
  getAllCustomer = async (req, res, next) => {
    try {
      const customers = await this.#customerModel.getAllCustomer();
      successResponse(res, 200, 'Get all Customer success!', customers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Customer By Id
  getCustomerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const customer = await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return await this.#customerModel.getCustomerById(id);
      // });

      const customer = await this.#customerModel.getCustomerById(id);
      successResponse(res, 200, `Get customer with ID ${id} success!`, customer);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Customer
  deleteCustomerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#customerModel.deleteCustomerById(id);
      successResponse(res, 200, `Delete customer with ID ${id} success!`, { message: 'Customer Deleted!' });
      await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Customer By Id
  updateCustomerById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const customer = await this.#customerModel.updateCustomerById(id, data);
      await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
        return customer;
      });
      successResponse(res, 200, `Update customer with ID ${id} success!`, { message: 'Customer Updated!' });
      await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default CustomerController;
