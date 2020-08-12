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
const rateLimit = require("express-rate-limit");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.api();
        this.initApiLimit();
        this.initSqlConfig();
        this.initializeErrorHandling();
        this.initializeSuccessHandling();
    }
    static bootstrap() {
        return new Server();
    }
    api() {
    }
    initApiLimit() {
        const smsLimiter = rateLimit({
            windowMs: 5 * 60 * 1000,
            max: 1,
            message: "短信验证码已发送，五分钟后可重新获取"
        });
        this.app.use(smsLimiter);
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
