"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const tUser = dbConfig_1.default.define('t_user', {
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        comment: "姓名",
        defaultValue: ""
    },
    indate: {
        type: sequelize_1.DataTypes.STRING,
        comment: "入职年月",
        defaultValue: ""
    },
    isactive: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "1-在职，0-离职",
        defaultValue: 1
    },
    dailyA: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "是否参与迭代功能测试 1-是，0-否",
        defaultValue: 1
    },
    dailyB: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "是否参与接口自动化测试 1-是，0-否",
        defaultValue: 0
    },
    dailyC: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "是否参与UI自动化测试 1-是，0-否",
        defaultValue: 0
    },
    dailyD: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "是否参与其他工作 1-是，0-否",
        defaultValue: 1
    },
    memo: {
        type: sequelize_1.DataTypes.STRING,
        comment: "备注",
        defaultValue: ""
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        comment: "密码",
        defaultValue: "123456"
    },
}, {
    freezeTableName: true
});
exports.default = tUser;
