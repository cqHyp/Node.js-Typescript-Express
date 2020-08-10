import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const Admin = sequelize.define("admin", {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    account: {
        type: DataTypes.STRING,
        unique: true,
        comment: "账号"
    },

    mobile: {
        type: DataTypes.STRING,
        unique: true,
        comment: "手机号"
    },

    password: {
        type: DataTypes.STRING,
        comment: "密码"
    },

    shop_name: {
        type: DataTypes.STRING,
        comment: "门店名称"
    },

    license_url: {
        type: DataTypes.STRING,
        comment: "营业执照照片"
    },

    legal_person_name: {
        type: DataTypes.STRING,
        comment: "法人姓名"
    },

    legal_mobile: {
        type: DataTypes.STRING,
        comment: "法人手机号"
    },

    legal_idcard_number: {
        type: DataTypes.STRING,
        comment: "法人身份证号码",
    },

    legal_hometown: {
        type: DataTypes.STRING,
        comment: "法人籍贯"
    },

    legal_idcard_front: {
        type: DataTypes.STRING,
        comment: "法人身份证正面（国徽）"
    },

    legal_idcard_back: {
        type: DataTypes.STRING,
        comment: "法人身份证反面（人脸）"
    }
})

export default Admin