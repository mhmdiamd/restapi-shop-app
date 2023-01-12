import Joi from 'joi';
import HttpException from '../utils/Exceptions/http.exceptions.js';

// Register Schema validation
export async function registerSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().min(3).required(),
  });

  await schema
    .validateAsync(req.body)
    .then((res) => {
      req.user = res;
      next();
    })
    .catch((err) => next(new HttpException(err.status, err.message)));
}

// Login Schema validation
export async function loginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required(),
  });

  await schema
    .validateAsync(req.body)
    .then((res) => {
      req.user = res;
      next();
    })
    .catch((err) => next(new HttpException(err.status, err.message)));
}
