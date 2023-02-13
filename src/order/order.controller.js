import { uploadPhotoCloudinary } from '../../Config/cloudinary.config.js';
import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import OrderModel from './order.model.js';

class OrderController {
  #orderModel = new OrderModel();

  // Get Cart By Id
  getOrderByIdCustomer = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.query;
    try {
      if (id != 'undefined') {
        const orders = await this.#orderModel.getOrderByIdCustomer({ id, status });
        successResponse(res, 200, `Success get cart with ID Customer ${id}`, orders);
      } else {
        const orders = await this.#orderModel.getOrderByIdCustomer({ id: req.user.id, status });
        successResponse(res, 200, `Success get cart with ID Customer ${req.user.id}`, orders);
      }
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Cart By Id
  getOrderByIdSeller = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.query;

    try {
      if (id != 'undefined') {
        const orders = await this.#orderModel.getOrderByIdSeller({ id, status });
        successResponse(res, 200, `Success get cart with ID Seller ${id}`, orders);
      } else {
        const orders = await this.#orderModel.getOrderByIdSeller({ id: req.user.id, status });
        successResponse(res, 200, `Success get cart with ID Seller ${req.user.id}`, orders);
      }
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Create Cart
  createOrder = async (req, res, next) => {
    console.log(req.body);
    try {
      await this.#orderModel.createOrder(req.body);
      successResponse(res, 200, `Success create Order!`, { messgae: 'Order was created!' });
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Cart
  deleteOrderById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
      await this.#orderModel.deleteOrderById(id);
      successResponse(res, 200, `Success deleted Order with ID ${id}`, { message: 'Order Deleted!' });
    } catch (err) {
      console.log(err);

      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Cart By Id Customer
  deleteCartByIdCustomer = async (req, res, next) => {
    const { id } = req.user;
    try {
      await this.#orderModel.deleteCartByIdCustomer(id);
      successResponse(res, 200, `Success delete cart with ID Customer ${id}`, { message: 'Cart delete!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Updae Cart By Id
  updateOrderById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.#orderModel.updateOrderById(id, data);
      successResponse(res, 200, `Success updated Order with ID ${id}`, { message: 'Order updated!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}



export default OrderController;
