"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const SMSCode = dbConfig_1.default.define("SMSCode", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        comment: "手机号"
    },
    code: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "短信验证码"
    }
}, {
    freezeTableName: true
});
exports.default = SMSCode;
