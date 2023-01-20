import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.RD_HOST,
  port: process.env.RD_PORT,
  password: process.env.RD_PASSWORD,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export function setOrGetCache(key, cb) {
  return new Promise(async (resolve, reject) => {
    const dataCache = await redisClient.get(key);
    if (dataCache) {
      console.log('Hit From redis');
      return resolve(JSON.parse(dataCache));
    }
    cb()
      .then((res) => {
        redisClient.set(key, JSON.stringify(res), 'ex', 180);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function clearRedisCache(key) {
  await redisClient.del(key);
}
