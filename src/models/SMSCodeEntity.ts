import sequelize from "../sql/dbConfig";
import { DataTypes } from "sequelize";

const SMSCode = sequelize.define("SMSCode", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    mobile: {
        type: DataTypes.STRING,
        comment: "手机号"
    },

    code: {
        type: DataTypes.INTEGER,
        comment: "短信验证码"
    }

}, {
    freezeTableName: true
})

export default SMSCode