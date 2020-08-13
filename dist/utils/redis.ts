import * as redis from "redis";
import { redis_config } from "../config"

const _createClient = () => {
    // 如果使用
    // redis.createClient();
    // 表示默认配置 localhost:6379
    const client = redis.createClient(redis_config.port, redis_config.hostname);
    //记录redis错误
    client.on("error", function (err) {
        console.log("redis error: " + err);
    });

    client.on("connect", function() {
        console.log("redis connected!!!!!!!!")
    })
    return client;
};
export const redisClient = _createClient();

export function setItem(key: string, value: string, exprires: number) {
    redisClient.set(key, value);
    //设置过期 单位：秒
    if (exprires) {
        redisClient.expire(key, exprires);
    }
}
export async function getItem(key: string) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
            }
            resolve(val);
        })
    })
}
// module.exports = {
//     redisClient,
//     setItem,
//     getItem
// };