"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = exports.setItem = exports.redisClient = void 0;
const redis = require("redis");
const config_1 = require("../config");
const _createClient = () => {
    const client = redis.createClient(config_1.redis_config.port, config_1.redis_config.hostname);
    client.on("error", function (err) {
        console.log("redis error: " + err);
    });
    client.on("connect", function () {
        console.log("redis connected!!!!!!!!");
    });
    return client;
};
exports.redisClient = _createClient();
function setItem(key, value, exprires) {
    exports.redisClient.set(key, value);
    if (exprires) {
        exports.redisClient.expire(key, exprires);
    }
}
exports.setItem = setItem;
function getItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            exports.redisClient.get(key, (err, val) => {
                if (err) {
                    reject(err);
                }
                resolve(val);
            });
        });
    });
}
exports.getItem = getItem;
