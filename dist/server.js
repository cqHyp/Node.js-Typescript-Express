"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const body = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const index_1 = require("./routes/index");
const error_middleware_1 = require("./middleware/error.middleware");
const success_middleware_1 = require("./middleware/success.middleware");
const productEntity_1 = require("./models/productEntity");
const categoryEntity_1 = require("./models/categoryEntity");
const dbConfig_1 = require("./sql/dbConfig");
const shopEntity_1 = require("./models/shopEntity");
const adminEntity_1 = require("./models/adminEntity");
const HttpException_1 = require("../dist/exceptions/HttpException");
const redis_1 = require("./utils/redis");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.initIntercept();
        this.routes();
        this.api();
        this.initSqlConfig();
        this.initializeErrorHandling();
        this.initializeSuccessHandling();
    }
    static bootstrap() {
        return new Server();
    }
    api() {
    }
    initIntercept() {
        this.app.all("/*", function (req, res, next) {
            let key = req.ip + "_" + req.url;
            redis_1.redisClient.get(key, (err, val) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (!val) {
                        redis_1.redisClient.set(key, JSON.stringify({ body: req.body, query: req.query }));
                        redis_1.redisClient.expire(key, 1);
                        next();
                    }
                    else {
                        next(new HttpException_1.default(500, -1, "请求太频繁，请稍后再试"));
                    }
                }
            });
        });
    }
    config() {
        this.app.use(cors());
        this.app.use(body.json());
        this.app.use(body.urlencoded({ extended: false }));
        this.app.use(logger('dev'));
    }
    routes() {
        this.app.use(index_1.default);
    }
    initSqlConfig() {
        dbConfig_1.default.sync({ force: false });
        categoryEntity_1.default.hasMany(productEntity_1.default, { as: "Category", foreignKey: "category", sourceKey: "id" });
        productEntity_1.default.belongsTo(categoryEntity_1.default, { as: "Category", foreignKey: "category", targetKey: "id" });
        shopEntity_1.default.hasMany(adminEntity_1.default, { as: "shop", foreignKey: "shopId", sourceKey: "id" });
        adminEntity_1.default.belongsTo(shopEntity_1.default, { as: "shop", foreignKey: "shopId", targetKey: "id" });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeSuccessHandling() {
        this.app.use(success_middleware_1.default);
    }
}
exports.Server = Server;
