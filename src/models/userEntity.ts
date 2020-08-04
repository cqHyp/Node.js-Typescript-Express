import sequelize from "../sql/dbConfig";
import { Sequelize, DataTypes } from "sequelize";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
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
        type: DataTypes.STRING
    },

    nickName: {
        type: DataTypes.STRING
    },

    gender: {
        type: DataTypes.NUMBER
    },

    language: {
        type: DataTypes.STRING
    },

    city: {
        type: DataTypes.STRING
    },

    province: {
        type: DataTypes.STRING
    },

    country: {
        type: DataTypes.STRING
    },

    avatarUrl: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.NUMBER,
        allowNull: false
    },

    company: {
        type: DataTypes.STRING
    },

    mobile: {
        type: DataTypes.NUMBER
    },

    address: {
        type: DataTypes.STRING
    },

    token: {
        type: DataTypes.STRING
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
