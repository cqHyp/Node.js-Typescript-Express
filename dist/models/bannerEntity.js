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
        type: sequelize_1.DataTypes.STRING
    },
    imgUrl: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.SMALLINT
    },
    sortCode: {
        type: sequelize_1.DataTypes.INTEGER
    },
}, {
    freezeTableName: true
});
exports.default = Banner;
