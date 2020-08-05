import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    openid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    unionid: {
        type: DataTypes.STRING
    },

    name: {
        type: DataTypes.STRING,
        comment: "姓名",
        defaultValue: ""
    },

    nickName: {
        type: DataTypes.STRING,
        comment: "昵称",
        defaultValue: ""
    },

    gender: {
        type: DataTypes.SMALLINT,
        comment: "性别 0：未知、1：男、2：女",
        defaultValue: 0
    },

    language: {
        type: DataTypes.STRING,
        comment: "语言",
        defaultValue: ""
    },

    city: {
        type: DataTypes.STRING,
        comment: "市",
        defaultValue: ""
    },

    province: {
        type: DataTypes.STRING,
        comment: "省",
        defaultValue: ""
    },

    country: {
        type: DataTypes.STRING,
        comment: "国家",
        defaultValue: ""
    },

    avatarUrl: {
        type: DataTypes.STRING,
        comment: "头像地址",
        defaultValue: ""
    },

    password: {
        type: DataTypes.STRING,
        comment: "密码"
    },

    email: {
        type: DataTypes.STRING,
        comment: "邮箱",
        defaultValue: ""
    },

    status: {
        type: DataTypes.SMALLINT,
        comment: "状态 0：禁用、 1：正常",
        defaultValue: 1
    },

    company: {
        type: DataTypes.STRING,
        comment: "公司",
        defaultValue: ""
    },

    mobile: {
        type: DataTypes.STRING,
        comment: "手机号",
        defaultValue: ""
    },

    address: {
        type: DataTypes.STRING,
        comment: "地址",
        defaultValue: ""
    },

    token: {
        type: DataTypes.STRING,
        defaultValue: ""
    },

    session_key: {
        type: DataTypes.STRING
    },

    session_key_updated_date: {
        type: DataTypes.DATE
    }

}, {
    freezeTableName: true
});

export default User
