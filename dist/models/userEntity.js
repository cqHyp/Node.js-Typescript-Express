"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const User = dbConfig_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    openid: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    unionid: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    nickName: {
        type: sequelize_1.DataTypes.STRING
    },
    gender: {
        type: sequelize_1.DataTypes.NUMBER
    },
    language: {
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        type: sequelize_1.DataTypes.STRING
    },
    province: {
        type: sequelize_1.DataTypes.STRING
    },
    country: {
        type: sequelize_1.DataTypes.STRING
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    company: {
        type: sequelize_1.DataTypes.STRING
    },
    mobile: {
        type: sequelize_1.DataTypes.NUMBER
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    token: {
        type: sequelize_1.DataTypes.STRING
    },
    session_key: {
        type: sequelize_1.DataTypes.STRING
    },
    session_key_updated_date: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    freezeTableName: true
});
exports.default = User;
