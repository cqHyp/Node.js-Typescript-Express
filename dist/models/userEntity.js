"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const User = dbConfig_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: sequelize_1.DataTypes.STRING,
        comment: "姓名",
        defaultValue: ""
    },
    nickName: {
        type: sequelize_1.DataTypes.STRING,
        comment: "昵称",
        defaultValue: ""
    },
    gender: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "性别 0：未知、1：男、2：女",
        defaultValue: 0
    },
    language: {
        type: sequelize_1.DataTypes.STRING,
        comment: "语言",
        defaultValue: ""
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        comment: "市",
        defaultValue: ""
    },
    province: {
        type: sequelize_1.DataTypes.STRING,
        comment: "省",
        defaultValue: ""
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        comment: "国家",
        defaultValue: ""
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        comment: "头像地址",
        defaultValue: ""
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        comment: "密码"
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        comment: "邮箱",
        defaultValue: ""
    },
    status: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "状态 0：禁用、 1：正常",
        defaultValue: 1
    },
    company: {
        type: sequelize_1.DataTypes.STRING,
        comment: "公司",
        defaultValue: ""
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        comment: "手机号",
        defaultValue: ""
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        comment: "地址",
        defaultValue: ""
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ""
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
