import HttpException from '../utils/Exceptions/http.exceptions.js';
import { successResponse } from '../utils/Helpers/response.js';
import CartModel from './cart.model.js';

class CartController {
  #cartModel = new CartModel();

  // Get all Cart
  getAllCart = async (req, res, next) => {
    const filter = req.query;
    try {
      const carts = await this.#cartModel.getAllCart(filter);
      res.status(200).send({
        status: 'success',
        statusCode: 200,
        data: carts,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Cart By Id
  getCartById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const cart = await this.#cartModel.getCartById(id);
      successResponse(res, 200, `Success get cart with ID ${id}`, cart);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Cart By Id
  getCartByIdBuyer = async (req, res, next) => {
    const { id_buyer } = req.params;
    try {
      const carts = await this.#cartModel.getCartByIdBuyer(id_buyer);
      successResponse(res, 200, `Success get cart with ID Buyer ${id_buyer}`, carts);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Create Cart
  createCart = async (req, res, next) => {
    try {
      await this.#cartModel.createCart(req.body);
      successResponse(res, 200, `Success create cart!`, { messgae: 'Cart was created!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Cart
  deleteCartById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#cartModel.deleteCartById(id);
      successResponse(res, 200, `Success updated cart with ID ${id}`, { message: 'Cart Updated!' });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Updae Cart By Id
  updateCartById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.#cartModel.updateCartById(id, data);
      successResponse(res, 200, `Success updated cart with ID ${id}`, { message: 'Cart updated!' });

      // res.status(200).json({
      //   status: 'success',
      //   statusCode: 200,
      //   message: 'Cart Updated',
      // });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default CartController;
