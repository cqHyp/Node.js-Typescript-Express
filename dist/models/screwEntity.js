"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const Screw = dbConfig_1.default.define('screw', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        comment: "弹簧名称"
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        comment: "弹簧型号",
    },
    price: {
        type: sequelize_1.DataTypes.BIGINT,
        comment: "单价"
    },
    status: {
        type: sequelize_1.DataTypes.SMALLINT,
        comment: "商品状态 0：已下架、1：已上架"
    }
}, {
    freezeTableName: true
});
exports.default = Screw;
