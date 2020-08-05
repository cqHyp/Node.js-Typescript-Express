"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const Banner = dbConfig_1.default.define('banner', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        comment: "标题"
    },
    imgUrl: {
        type: sequelize_1.DataTypes.STRING,
        comment: "图片地址"
    },
    type: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "类型 1：默认"
    },
    sortCode: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "权重"
    },
}, {
    freezeTableName: true
});
exports.default = Banner;
