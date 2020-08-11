"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../sql/dbConfig");
const sequelize_1 = require("sequelize");
const Shop = dbConfig_1.default.define("shop", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shopName: {
        type: sequelize_1.DataTypes.STRING,
        comment: "门店名称"
    },
    shopNumber: {
        type: sequelize_1.DataTypes.STRING,
        comment: "门店编号"
    },
    shopAddress: {
        type: sequelize_1.DataTypes.STRING,
        comment: "门店地址"
    },
    license_url: {
        type: sequelize_1.DataTypes.STRING,
        comment: "营业执照照片"
    },
    legal_person_name: {
        type: sequelize_1.DataTypes.STRING,
        comment: "法人姓名"
    },
    legal_mobile: {
        type: sequelize_1.DataTypes.STRING,
        comment: "法人手机号"
    },
    legal_idcard_number: {
        type: sequelize_1.DataTypes.STRING,
        comment: "法人身份证号码",
    },
    legal_hometown: {
        type: sequelize_1.DataTypes.STRING,
        comment: "法人籍贯"
    },
    legal_idcard_front: {
        type: sequelize_1.DataTypes.STRING,
        comment: "法人身份证正面（国徽）"
    },
    legal_idcard_back: {
        type: sequelize_1.DataTypes.STRING,
        comment: "法人身份证反面（人脸）"
    }
}, {
    freezeTableName: true
});
exports.default = Shop;
