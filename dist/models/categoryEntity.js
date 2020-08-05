"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const Category = dbConfig_1.default.define('category', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        comment: "分类标题"
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
        comment: "分类简述"
    },
    sortCode: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "权重"
    },
}, {
    freezeTableName: true
});
exports.default = Category;
