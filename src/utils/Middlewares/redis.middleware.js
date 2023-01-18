import client from '../../../Config/redis.js';
import { successResponse } from './../Helpers/response.js';

const redisMiddleware = {
  getCache: async (req, res, next) => {
    // const value = await client.get('key');
    // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows));
    const { id } = req.params;
    const product = await client.client.get(`api/v1/products/${id}`);
    if (product) {
      console.log('get from redis');
      return res.send('Get data success from redis');
    }
    next();
  },

  clearCache: async (req, res, next) => {
    const { id } = req.params;
    await client.client.DEL(`api/v1/products/${id}`);
    next();
  },
};

export default redisMiddleware;
