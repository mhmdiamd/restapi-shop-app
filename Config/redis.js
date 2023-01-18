import Redis from 'redis';

const redisClient = Redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

export function setOrGetCache(key, cb) {
  return new Promise(async (resolve, reject) => {
    const dataCache = await redisClient.get(key);
    if (dataCache) {
      console.log('Hit From redis');
      return resolve(JSON.parse(dataCache));
    }

    const freshData = await cb();
    redisClient.setEx(key, 60 * 60, JSON.stringify(freshData));
    resolve(freshData);
  });
}

export async function clearRedisCache(key) {
  await redisClient.DEL(key);
}
