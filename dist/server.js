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
class Server {
    constructor() {
        this.app = express();
        this.config();
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
        categoryEntity_1.default.hasMany(productEntity_1.default, { as: "Category", foreignKey: "category", sourceKey: "id" });
        productEntity_1.default.belongsTo(categoryEntity_1.default, { as: "Category", foreignKey: "category", targetKey: "id" });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeSuccessHandling() {
        this.app.use(success_middleware_1.default);
    }
}
exports.Server = Server;
