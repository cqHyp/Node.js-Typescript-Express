"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const Product = dbConfig_1.default.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        comment: "商品名称"
    },
    price: {
        type: sequelize_1.DataTypes.BIGINT,
        comment: "原价",
        defaultValue: null
    },
    discountPrice: {
        type: sequelize_1.DataTypes.BIGINT,
        comment: "折扣价格(真实)",
        defaultValue: null
    },
    subTitle: {
        type: sequelize_1.DataTypes.STRING,
        comment: "副标题"
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        comment: "商品详情富文本"
    },
    thumb: {
        type: sequelize_1.DataTypes.STRING,
        comment: "商品预览图"
    },
    imgArray: {
        type: sequelize_1.DataTypes.STRING,
        comment: "商品轮播图id数组"
    },
    category: {
        type: sequelize_1.DataTypes.INTEGER,
        comment: "分类id",
        references: {
            model: "category",
            key: "id"
        }
    },
    status: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "商品状态 0：已下架、1：已上架"
    }
}, {
    freezeTableName: true
});
exports.default = Product;
