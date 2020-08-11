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

    shopId: {
        type: DataTypes.INTEGER,
        references: {
            model: "shop",
            key: "id"
        },
        comment: "门店id"
    }
}, {
    freezeTableName: true
})

export default Admin