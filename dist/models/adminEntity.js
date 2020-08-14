"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const Admin = dbConfig_1.default.define("admin", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        comment: "账号"
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        comment: "手机号"
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        comment: "头像"
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        comment: "密码"
    },
    shopId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "shop",
            key: "id"
        },
        comment: "门店id"
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        comment: "登录验证信息"
    }
}, {
    freezeTableName: true
});
exports.default = Admin;
