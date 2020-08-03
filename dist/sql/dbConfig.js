"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const config_1 = require("../config");
exports.base = (sql, data, callback) => {
    const db = mysql.createConnection(config_1.mysql_config);
    db.connect((err) => {
        if (err)
            throw err;
        console.log("数据库连接成功");
    });
    db.query(sql, data, (error, results, fields) => {
        if (error)
            throw error;
        callback(results);
    });
    db.end();
};
