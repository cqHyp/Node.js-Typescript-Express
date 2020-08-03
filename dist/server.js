"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const body = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const index_1 = require("./routes/index");
const mongoose = require("mongoose");
const mysql = require("mysql");
const config_1 = require("./config");
const error_middleware_1 = require("./middleware/error.middleware");
const success_middleware_1 = require("./middleware/success.middleware");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.api();
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
    setMongoConfig() {
        mongoose.connect(config_1.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }
    setMysqlConfig() {
        const db = mysql.createConnection(config_1.mysql_config);
        db.connect((err) => {
            if (err)
                throw err;
            console.log("数据库连接成功");
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeSuccessHandling() {
        this.app.use(success_middleware_1.default);
    }
}
exports.Server = Server;
