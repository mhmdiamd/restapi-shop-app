import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import ShippingAddressModel from './shippingAddress.model.js';

class ShippingAddressController {
  #shippingAddressModel = new ShippingAddressModel();
  #ENDPOINT = 'api/v1/customers';

  // Get all Customer
  getAllShippingAddress = async (req, res, next) => {
    try {
      const customers = await this.#shippingAddressModel.getAllShippingAddress();
      successResponse(res, 200, 'Get all Customer success!', customers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Shipping Address By Id Customer
  getShippingAddressByIdCustomer = async (req, res, next) => {
    const { id } = req.params;

    try {
      console.log(req.user.id);
      if (id != 'undefined') {
        const shippingAddress = await this.#shippingAddressModel.getShippingAddressByIdCustomer(id);
        successResponse(res, 200, `Get customer with ID ${id} success!`, shippingAddress);
      } else {
        const shippingAddress = await this.#shippingAddressModel.getShippingAddressByIdCustomer(req.user.id);
        successResponse(res, 200, `Get customer with ID ${req.user.id} success!`, shippingAddress);
      }
      // const customer = await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return await this.#shippingAddressModel.getCustomerById(id);
      // });
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Customer
  deleteShippingAddressById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#shippingAddressModel.deleteShippingAddressById(id);
      successResponse(res, 200, `Delete Shipping Address with ID ${id} success!`, { message: 'Shipping Address Deleted!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Shipping Address By Id
  createShippingAddress = async (req, res, next) => {
    const data = req.body;
    const { id } = req.user;
    try {
      if (data.status) {
        const dataAddress = await this.#shippingAddressModel.getShippingAddressByIdCustomer(req.user.id);
        const getDataWithStatus1 = dataAddress?.filter((data) => data.status == 1);

        // Update Old Address with status == 1
        await this.#shippingAddressModel.updateShippingAddressById(getDataWithStatus1[0].id, { ...getDataWithStatus1[0], status: 0 });
      }
      await this.#shippingAddressModel.createShippingAddress({ ...data, id_customer: id });
      // await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return customer;
      // });
      successResponse(res, 200, `Success created Shipping Address!`, { message: 'Shipping Address Created!' });
    } catch (err) {
      if (err.status == 404) {
        await this.#shippingAddressModel.createShippingAddress({ ...data, id_customer: id });
      }
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Customer By Id
  updateShippingAddressById = async (req, res, next) => {
    const { id } = req.params;
    const data = { ...req.body, id_customer: req.user.id };
    try {
      if (data.status) {
        const dataAddress = await this.#shippingAddressModel.getShippingAddressByIdCustomer(req.user.id);
        const getDataWithStatus1 = dataAddress?.filter((data) => data.status == 1);

        // Update Old Address with status == 1
        if (getDataWithStatus1[0]) {
          await this.#shippingAddressModel.updateShippingAddressById(getDataWithStatus1[0].id, { ...getDataWithStatus1[0], status: 0 });
        }
      }
      if (id) {
        await this.#shippingAddressModel.updateShippingAddressById(id, data);
      }
      // await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return customer;
      // });
      successResponse(res, 200, `Update Shipping Address with ID ${id} success!`, { message: 'Shipping Address Updated!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default ShippingAddressController;
