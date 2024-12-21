import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://www.byrdonline.com:6379', // Update with your Redis server details
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
    await redisClient.connect();
})();

export default redisClient;