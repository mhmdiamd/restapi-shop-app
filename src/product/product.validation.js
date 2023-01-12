import Joi from 'joi';
import HttpException from '../utils/Exceptions/http.exceptions.js';

// Register Schema validation
export async function productSchema(req, res, next) {
  const { id } = req.user;
  const data = { ...req.body, id_seller: id };
  const schema = Joi.object({
    name_product: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    stock: Joi.number().required(),
    rating: Joi.allow(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    id_category: Joi.required(),
    id_seller: Joi.required(),
  });

  await schema
    .validateAsync(data)
    .then((res) => next())
    .catch((err) => next(new HttpException(err.status, err.message)));
}
